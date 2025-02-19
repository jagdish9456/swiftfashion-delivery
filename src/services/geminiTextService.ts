import { getCurrentGenAI, rotateApiKey } from './geminiConfig';
import { retryWithBackoff } from '../utils/retryUtils';
import { requestQueue } from '../utils/requestQueue';
import products from "../data/product-all.json";

const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 3000;

const generateProductRecommendations = async (userInput: string, conversationHistory: Array<{ role: string, content: string }> = []) => {
  let currentRetry = 0;
  let currentDelay = INITIAL_RETRY_DELAY;

  while (currentRetry < MAX_RETRIES) {
    try {
      // Initialize the model with current API key
      let model = getCurrentGenAI().getGenerativeModel({ model: "gemini-pro" });

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

      // Generate response using request queue
      const result = await requestQueue.add(async () => {
        try {
          const response = await model.generateContent([
            systemPrompt,
            conversationContext,
            `User: ${userInput}\nAssistant: Provide product recommendations as a JSON array of product IDs only.`
          ]);
          return response;
        } catch (error: any) {
          if (error?.status === 429) {
            console.log(`Rate limited. Rotating API key... (Attempt ${currentRetry + 1}/${MAX_RETRIES})`);
            model = rotateApiKey().getGenerativeModel({ model: "gemini-pro" });
            throw error; // Throw to trigger retry
          }
          throw error;
        }
      });

      const response = result.response;
      const text = response.text();
      
      console.log("Gemini raw response:", text);

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

        // Fallback: search by keywords
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

    } catch (error: any) {
      if (error?.status === 429 || error?.code === 429) {
        currentRetry++;
        if (currentRetry < MAX_RETRIES) {
          console.log(`Rate limit hit. Waiting ${currentDelay}ms before retry ${currentRetry}/${MAX_RETRIES}`);
          await new Promise(resolve => setTimeout(resolve, currentDelay));
          currentDelay *= 2; // Exponential backoff
          continue;
        }
      }
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  }

  throw new Error("Max retries reached for Gemini API call");
};

const generateContextualResponse = async (
  userInput: string, 
  products: any[], 
  previousResponse?: string
) => {
  let currentRetry = 0;
  let currentDelay = INITIAL_RETRY_DELAY;

  while (currentRetry < MAX_RETRIES) {
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

      const result = await requestQueue.add(async () => {
        try {
          const response = await model.generateContent(prompt);
          return response;
        } catch (error: any) {
          if (error?.status === 429) {
            console.log(`Rate limited. Rotating API key... (Attempt ${currentRetry + 1}/${MAX_RETRIES})`);
            model = rotateApiKey().getGenerativeModel({ model: "gemini-pro" });
            throw error;
          }
          throw error;
        }
      });

      const response = result.response.text();
      return response.split('.').slice(0, 2).join('.') + '.';

    } catch (error: any) {
      if (error?.status === 429 || error?.code === 429) {
        currentRetry++;
        if (currentRetry < MAX_RETRIES) {
          console.log(`Rate limit hit. Waiting ${currentDelay}ms before retry ${currentRetry}/${MAX_RETRIES}`);
          await new Promise(resolve => setTimeout(resolve, currentDelay));
          currentDelay *= 2;
          continue;
        }
      }
      console.error("Error generating contextual response:", error);
      return "I'm sorry, I couldn't process that request. Could you try again?";
    }
  }

  return "I apologize, but I'm having trouble responding right now. Please try again in a moment.";
};

export { generateProductRecommendations, generateContextualResponse };
