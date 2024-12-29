import { GoogleGenerativeAI } from "@google/generative-ai";
import { getTextModel, queuedGenerateContent } from "./geminiConfig";

export const generateResponse = async (prompt: string) => {
  try {
    const model = getTextModel();
    const result = await queuedGenerateContent(model, prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};

export const generateProductRecommendations = async (prompt: string) => {
  try {
    const model = getTextModel();
    const result = await queuedGenerateContent(model, prompt);
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
    const model = getTextModel();
    const context = `Previous response: ${previousResponse}\nProducts: ${JSON.stringify(products)}`;
    const fullPrompt = `${context}\nUser: ${prompt}`;
    const result = await queuedGenerateContent(model, fullPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating contextual response:", error);
    throw error;
  }
};

export const generateImageOverlay = async (userImage: string, productImage: string) => {
  try {
    const model = getTextModel();
    const result = await queuedGenerateContent(model, [
      { inlineData: { data: userImage, mimeType: "image/jpeg" } },
      { inlineData: { data: productImage, mimeType: "image/jpeg" } }
    ]);
    return [result.response.text()]; // Return as array to match expected type
  } catch (error) {
    console.error("Error generating image overlay:", error);
    throw error;
  }
};