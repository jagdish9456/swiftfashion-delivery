import { GoogleGenerativeAI } from "@google/generative-ai";
import { requestQueue } from '../utils/requestQueue';

// Array of API keys
const API_KEYS = [
  "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw",
  "AIzaSyArzeOPhgc7CrEo76nRR4dkgGD0iCmbSqo",
  "AIzaSyDTZ2yWh_e_2TTrrw9PxYKaXsKDXYzfe2k",
  "AIzaSyCsuMLXO46y4LvoNw1bkjYrft8rGoVVhDI"
];

let currentKeyIndex = 0;

const getNextApiKey = () => {
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  console.log(`Rotating to next API key (index: ${currentKeyIndex})`);
  return API_KEYS[currentKeyIndex];
};

export const getCurrentGenAI = () => new GoogleGenerativeAI(API_KEYS[currentKeyIndex]);

export const rotateApiKey = () => {
  const newKey = getNextApiKey();
  return new GoogleGenerativeAI(newKey);
};

export const getImageModel = () => getCurrentGenAI().getGenerativeModel({ model: "gemini-pro-vision" });
export const getTextModel = () => getCurrentGenAI().getGenerativeModel({ model: "gemini-pro" });

// Wrap model generation with request queue and key rotation
export const queuedGenerateContent = async (model: any, content: any) => {
  let attempts = 0;
  const maxAttempts = API_KEYS.length;

  while (attempts < maxAttempts) {
    try {
      const response = await requestQueue.add(async () => {
        return await model.generateContent(content);
      });
      return response;
    } catch (error: any) {
      attempts++;
      console.log(`Attempt ${attempts} failed with key ${currentKeyIndex}`);
      
      if (error?.status === 429 || error?.status === 403) {
        if (attempts < maxAttempts) {
          console.log(`Rotating API key and retrying...`);
          model = rotateApiKey().getGenerativeModel({ 
            model: model.modelName 
          });
          continue;
        }
      }
      throw error;
    }
  }
  throw new Error("All API keys exhausted");
};