import { getImageModel } from './geminiConfig';
import { retryWithBackoff } from '../utils/retryUtils';
import { imageCache } from '../utils/imageCache';
import { requestQueue } from '../utils/requestQueue';

export const generateImageOverlay = async (userImage: string, productImage: string): Promise<string[]> => {
  try {
    const cacheKey = imageCache.generateKey(userImage, productImage);
    
    // Check cache first
    const cachedImages = imageCache.get(cacheKey);
    if (cachedImages) {
      console.log('Returning cached result');
      return cachedImages;
    }

    // Initialize the model
    const model = getImageModel();

    // Prepare the prompt
    const prompt = `Generate a realistic virtual try-on image by overlaying the product on the user's image. 
    Follow these steps:
    1. Analyze the user's pose and body position
    2. Identify key points (shoulders, chest, waist)
    3. Scale and position the product image appropriately
    4. Blend the edges naturally
    5. Adjust lighting and shadows for realism
    
    Generate 3 variations with slightly different positioning and lighting.`;

    // Queue the API request
    const result = await requestQueue.add(async () => {
      return retryWithBackoff(async () => {
        return model.generateContent([
          prompt,
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: userImage.split(",")[1]
            }
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: productImage.split(",")[1]
            }
          }
        ]);
      });
    });

    const response = await result.response;
    const generatedImages = response.text().split(",");
    const processedImages = generatedImages.map(img => `data:image/jpeg;base64,${img.trim()}`);

    // Cache the result
    imageCache.set(cacheKey, processedImages);

    return processedImages;
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    
    if (error?.status === 429 || error?.code === 429) {
      throw new Error("Service is temporarily busy. Please try again in a few minutes.");
    } else if (error?.status === 400) {
      throw new Error("Invalid image format. Please try with a different image.");
    } else {
      throw new Error("Failed to generate try-on images. Please try again later.");
    }
  }
};