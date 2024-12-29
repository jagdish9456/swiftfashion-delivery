import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API with hardcoded key
export const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

export const getImageModel = () => genAI.getGenerativeModel({ model: "gemini-pro-vision" });
export const getTextModel = () => genAI.getGenerativeModel({ model: "gemini-pro" });