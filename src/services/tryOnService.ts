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
        toast.error("Failed to generate try-on images");
        return [];
      }

      return results;
    } catch (error) {
      console.error('Error generating try-on image:', error);
      toast.error("An error occurred while generating try-on images");
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