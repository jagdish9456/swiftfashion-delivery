import { GoogleGenerativeAI } from "@google/generative-ai";
import products from "../data/product-all.json";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyB0fTl03Ez3vnW0IZzWXDpdmI7qbVHHHMw"); // Replace with your API key

export const generateProductRecommendations = async (userInput: string, conversationHistory: Array<{ role: string, content: string }> = []) => {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Format conversation history and system prompt
    const systemPrompt = `You are Quickkyy, a helpful AI shopping assistant for a clothing store. 
    Analyze the conversation history and user's input to recommend products.
    Consider these attributes: brand, material, type, color, season, price range, style, and specific details.
    Even if the match isn't perfect, try to return at least 2-3 relevant products.
    The response should be a valid JSON array of strings containing only the product IDs.
    
    Available products: ${JSON.stringify(products.products.map(p => ({
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
      `User: ${userInput}\nAssistant: Please provide product recommendations as a JSON array of product IDs.`
    ]);

    const response = result.response;
    const text = response.text();

    // Extract JSON array from response
    try {
      // Find the first occurrence of a JSON array in the response
      const match = text.match(/\[.*?\]/);
      if (!match) return [];
      
      const recommendedIds = JSON.parse(match[0]);
      return products.products.filter(product => 
        recommendedIds.includes(product.id)
      );
    } catch (e) {
      console.error("Failed to parse Gemini response:", e);
      return [];
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

// Helper function for generating contextual responses
export const generateContextualResponse = async (
  userInput: string, 
  products: any[], 
  previousResponse?: string
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are Quickkyy, a helpful and concise AI shopping assistant.
    Previous response (if any): ${previousResponse || 'None'}
    Current products being shown: ${JSON.stringify(products.slice(0, 3))}
    User input: ${userInput}
    
    Please provide a brief, natural response about the products. Keep it conversational but concise.
    If discussing specific products, mention key details like price, material, or brand.
    If no products are available, suggest alternatives or ask for clarification.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Ensure response is not too long
    return response.split('.')[0] + '.';
  } catch (error) {
    console.error("Error generating contextual response:", error);
    return "I'm sorry, I couldn't process that request. Could you try again?";
  }
};
