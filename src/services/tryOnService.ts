import { toast } from "sonner";
import { generateImageOverlay } from "./gemini";

export interface TryOnResult {
  imageURL: string;
  success: boolean;
  error?: string;
}

class TryOnService {
  async generateTryOnImage(userImage: File, productImage: string): Promise<string[]> {
    try {
      // Convert user image to base64
      const userImageBase64 = await this.fileToBase64(userImage);
      
      // Generate overlay using Gemini API
      const results = await generateImageOverlay(userImageBase64, productImage);
      
      if (!results || results.length === 0) {
        toast.error("Failed to generate try-on images. Please try again.");
        return [];
      }

      return results;
    } catch (error: any) {
      console.error('Error generating try-on image:', error);
      
      if (error?.status === 429 || error?.code === 429) {
        toast.error("Service is busy. Please wait a few minutes and try again.");
      } else if (error?.status === 400) {
        toast.error("Please try with a different image format.");
      } else {
        toast.error(error.message || "An error occurred while generating try-on images");
      }
      
      return [];
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}

// Export a singleton instance
export const tryOnService = new TryOnService();
