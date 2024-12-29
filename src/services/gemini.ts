import { GoogleGenerativeAI } from "@google/generative-ai";
import products from "../data/product-all.json";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export const generateProductRecommendations = async (userInput: string, conversationHistory: Array<{ role: string, content: string }> = []) => {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Format conversation history and system prompt
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
      shortDescription: p.shortDescription,
      brand: p.brand,
      categoryId: p.categoryId,
      subcategoryId: p.subcategoryId,
      attributes: p.attributes,
      price: p.price,
      tags: p.tags
    })))}`;

    // Combine conversation history with current input
    const conversationContext = conversationHistory
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    // Generate response
    const result = await model.generateContent([
      systemPrompt,
      conversationContext,
      `User: ${userInput}\nAssistant: Provide product recommendations as a JSON array of product IDs only.`
    ]);

    const response = result.response;
    const text = response.text();
    
    console.log("Gemini raw response:", text); // Debug log

    // Extract JSON array from response
    try {
      // First attempt: direct JSON parse
      try {
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
        console.log("Direct JSON parse failed, trying regex", e);
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

      // If no products found, search by keywords in product names and descriptions
      const searchTerms = userInput.toLowerCase().split(' ');
      const fallbackProducts = products.products.filter(product => {
        const searchableText = `${product.name} ${product.description} ${product.tags?.join(' ')}`.toLowerCase();
        return searchTerms.some(term => searchableText.includes(term));
      });

      return fallbackProducts.slice(0, 5);
    } catch (e) {
      console.error("Failed to parse Gemini response:", e);
      return [];
    }
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
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Ensure response is not too long
    return response.split('.').slice(0, 2).join('.') + '.';
  } catch (error) {
    console.error("Error generating contextual response:", error);
    return "I'm sorry, I couldn't process that request. Could you try again?";
  }
};

export const generateImageOverlay = async (userImage: string, productImage: string): Promise<string[]> => {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Prepare the prompt
    const prompt = `Generate a realistic virtual try-on image by overlaying the product on the user's image. 
    Follow these steps:
    1. Analyze the user's pose and body position
    2. Identify key points (shoulders, chest, waist)
    3. Scale and position the product image appropriately
    4. Blend the edges naturally
    5. Adjust lighting and shadows for realism
    
    Generate 3 variations with slightly different positioning and lighting.`;

    // Call Gemini API
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: userImage.split(",")[1] // Remove the data:image/jpeg;base64, prefix
        }
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: productImage.split(",")[1]
        }
      }
    ]);

    const response = await result.response;
    const generatedImages = response.text().split(",");

    // Process and return the generated images
    return generatedImages.map(img => `data:image/jpeg;base64,${img.trim()}`);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
