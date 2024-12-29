import { GoogleGenerativeAI } from "@google/generative-ai";
import { requestQueue } from "../utils/requestQueue";

// Initialize Gemini API with hardcoded key
export const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

export const getImageModel = () => genAI.getGenerativeModel({ model: "gemini-pro-vision" });
export const getTextModel = () => genAI.getGenerativeModel({ model: "gemini-pro" });

// Wrap model generation with request queue
export const queuedGenerateContent = async (model: any, content: any) => {
  return requestQueue.add(() => model.generateContent(content));
};