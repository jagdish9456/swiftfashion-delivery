import { getCurrentGenAI, rotateApiKey, queuedGenerateContent } from './geminiConfig';
import { retryWithBackoff } from '../utils/retryUtils';
import products from "../data/product-all.json";

export const generateProductRecommendations = async (userInput: string) => {
  try {
    let model = getCurrentGenAI().getGenerativeModel({ model: "gemini-pro" });

    const systemPrompt = `You are Quickkyy, a knowledgeable and friendly AI shopping assistant for a fashion store. 
    Your role is to analyze customer requests and recommend the most suitable products.
    
    Guidelines for recommendations:
    - Focus on understanding the customer's style preferences, occasion, and specific needs
    - Consider factors like brand, material, type, color, season, price range, and style
    - Provide 2-5 relevant products even if they don't match all criteria perfectly
    - Be specific about why each product matches their needs
    - If asked about product details, provide accurate information about materials, care instructions, and styling tips
    
    IMPORTANT: Your response MUST be a valid JSON array containing ONLY product IDs, for example: ["1", "2", "3"]
    Do not include any explanations or additional text in your response.
    
    Here are the available products: ${JSON.stringify(products.products.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      brand: p.brand,
      price: p.price,
      tags: p.tags
    })))}`;

    const result = await retryWithBackoff(async () => {
      return queuedGenerateContent(model, [systemPrompt, userInput]);
    });

    const response = result.response;
    const text = response.text();
    
    try {
      // First attempt: direct JSON parse
      const parsed = JSON.parse(text.trim());
      if (Array.isArray(parsed)) {
        const recommendedProducts = products.products.filter(product => 
          parsed.includes(product.id)
        );
        if (recommendedProducts.length > 0) {
          return recommendedProducts;
        }
      }
    } catch (e) {
      console.log("Direct JSON parse failed, trying regex");
    }

    // Second attempt: regex extraction
    const match = text.match(/\[.*?\]/);
    if (match) {
      const extracted = JSON.parse(match[0]);
      if (Array.isArray(extracted)) {
        const recommendedProducts = products.products.filter(product => 
          extracted.includes(product.id)
        );
        if (recommendedProducts.length > 0) {
          return recommendedProducts;
        }
      }
    }

    // Fallback: search by keywords
    const searchTerms = userInput.toLowerCase().split(' ');
    const fallbackProducts = products.products.filter(product => {
      const searchableText = `${product.name} ${product.description} ${product.tags?.join(' ')}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });

    return fallbackProducts.slice(0, 5);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

export const generateContextualResponse = async (
  userInput: string, 
  products: any[], 
  previousResponse?: string
) => {
  try {
    let model = getCurrentGenAI().getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are Quickkyy, a helpful and engaging AI shopping assistant.
    Context:
    - Previous response: ${previousResponse || 'None'}
    - Current products being shown: ${JSON.stringify(products.slice(0, 3))}
    - User input: ${userInput}
    
    Guidelines for your response:
    1. Be conversational but concise (1-2 sentences)
    2. When discussing specific products:
       - Highlight key features (price, material, brand)
       - Explain why they match the user's needs
       - Suggest styling tips when relevant
    3. If no products are available:
       - Ask clarifying questions
       - Suggest alternative search terms
       - Help narrow down preferences
    4. Always maintain a helpful and friendly tone
    
    Please provide a natural, engaging response that helps the customer make informed decisions.`;

    const result = await retryWithBackoff(async () => {
      return queuedGenerateContent(model, prompt);
    });

    const response = result.response.text();
    return response.split('.').slice(0, 2).join('.') + '.';
  } catch (error) {
    console.error("Error generating contextual response:", error);
    throw error;
  }
};