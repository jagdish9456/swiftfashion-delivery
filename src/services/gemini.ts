import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');

export const generateResponse = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};

export const generateProductRecommendations = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    // Parse the response to get product recommendations
    return JSON.parse(response);
  } catch (error) {
    console.error("Error generating product recommendations:", error);
    throw error;
  }
};

export const generateContextualResponse = async (prompt: string, products: any[], previousResponse: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const context = `Previous response: ${previousResponse}\nProducts: ${JSON.stringify(products)}`;
    const fullPrompt = `${context}\nUser: ${prompt}`;
    const result = await model.generateContent(fullPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating contextual response:", error);
    throw error;
  }
};

export const generateImageOverlay = async (userImage: string, productImage: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([
      { inlineData: { data: userImage, mimeType: "image/jpeg" } },
      { inlineData: { data: productImage, mimeType: "image/jpeg" } }
    ]);
    return [result.response.text()]; // Return as array to match expected type
  } catch (error) {
    console.error("Error generating image overlay:", error);
    throw error;
  }
};