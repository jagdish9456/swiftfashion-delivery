import { GoogleGenerativeAI } from "@google/generative-ai";
import { requestQueue } from '../utils/requestQueue';

// Array of API keys
const API_KEYS = [
  "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw",
  "AIzaSyArzeOPhgc7CrEo76nRR4dkgGD0iCmbSqo",
  "AIzaSyDTZ2yWh_e_2TTrrw9PxYKaXsKDXYzfe2k",
  "AIzaSyCsuMLXO46y4LvoNw1bkjYrft8rGoVVhDI"
  // Add more API keys here
];

let currentKeyIndex = 0;

const getNextApiKey = () => {
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return API_KEYS[currentKeyIndex];
};

export const getCurrentGenAI = () => new GoogleGenerativeAI(API_KEYS[currentKeyIndex]);

export const rotateApiKey = () => {
  const newKey = getNextApiKey();
  console.log(`Rotating to next API key (index: ${currentKeyIndex})`);
  return new GoogleGenerativeAI(newKey);
};

export const getImageModel = () => getCurrentGenAI().getGenerativeModel({ model: "gemini-pro-vision" });
export const getTextModel = () => getCurrentGenAI().getGenerativeModel({ model: "gemini-pro" });

// Wrap model generation with request queue and key rotation
export const queuedGenerateContent = async (model: any, content: any) => {
  return requestQueue.add(() => model.generateContent(content));
};