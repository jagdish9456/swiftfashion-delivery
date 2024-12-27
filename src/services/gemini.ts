import { GoogleGenerativeAI } from "@google/generative-ai";
import products from "../data/product-all.json";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyB0fTl03Ez3vnW0IZzWXDpdmI7qbVHHHMw");

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
    })))}
    
    Response format: Return a valid JSON array containing only the product IDs of recommended items.`;

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