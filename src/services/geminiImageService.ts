import { getCurrentGenAI, rotateApiKey } from './geminiConfig';
import { retryWithBackoff } from '../utils/retryUtils';
import { imageCache } from '../utils/imageCache';
import { requestQueue } from '../utils/requestQueue';
import { toast } from 'sonner';

export const generateImageOverlay = async (userImage: string, productImage: string): Promise<string[]> => {
  try {
    const cacheKey = imageCache.generateKey(userImage, productImage);
    
    // Check cache first
    const cachedImages = imageCache.get(cacheKey);
    if (cachedImages) {
      console.log('Returning cached result');
      return cachedImages;
    }

    // Initialize the model with current API key
    let model = getCurrentGenAI().getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare the prompt
    const prompt = `Generate a realistic virtual try-on image by overlaying the product on the user's image. 
    Follow these steps:
    1. Analyze the user's pose and body position
    2. Identify key points (shoulders, chest, waist)
    3. Scale and position the product image appropriately
    4. Blend the edges naturally
    5. Adjust lighting and shadows for realism
    
    Generate 3 variations with slightly different positioning and lighting.`;

    // Queue the API request with key rotation support
    const result = await requestQueue.add(async () => {
      return retryWithBackoff(async () => {
        try {
          const response = await model.generateContent([
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

          if (!response || !response.response) {
            throw new Error("Empty response from API");
          }

          return response;
        } catch (error: any) {
          console.error("Gemini API error:", error);
          
          if (error?.status === 429) {
            model = rotateApiKey().getGenerativeModel({ model: "gemini-1.5-flash" });
            toast.error("Rate limit reached. Retrying with new API key...");
            throw error; // Throw to trigger retry with new key
          }
          
          if (error?.status === 404) {
            toast.error("API model not found. Please contact support.");
            throw new Error("Invalid API model configuration");
          }

          throw error;
        }
      }, 3, 5000, 30000); // max 3 retries, starting at 5s delay, max 30s delay
    });

    const response = await result.response;
    const generatedImages = response.text().split(",");
    const processedImages = generatedImages.map(img => `data:image/jpeg;base64,${img.trim()}`);

    // Cache the result
    imageCache.set(cacheKey, processedImages);

    return processedImages;
  } catch (error: any) {
    console.error("Error in generateImageOverlay:", error);
    
    if (error?.status === 429 || error?.code === 429) {
      toast.error("Service is temporarily busy. Please try again in a few minutes.");
    } else if (error?.status === 400) {
      toast.error("Invalid image format. Please try with a different image.");
    } else if (error?.status === 404) {
      toast.error("API configuration error. Please contact support.");
    } else {
      toast.error("Failed to generate try-on images. Please try again later.");
    }
    
    throw error;
  }
};