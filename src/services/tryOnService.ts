import { RunwareService, GenerateImageParams } from './runwareService';

class TryOnService {
  private runwareService: RunwareService;

  constructor(apiKey: string) {
    this.runwareService = new RunwareService(apiKey);
  }

  async generateTryOnImage(userImage: File, productImage: string): Promise<string[]> {
    try {
      // Convert user image to base64
      const userImageBase64 = await this.fileToBase64(userImage);
      
      const params: GenerateImageParams = {
        positivePrompt: `Generate a realistic virtual try-on image showing a person wearing the clothing item. User image: ${userImageBase64}, Product image: ${productImage}`,
        model: "runware:100@1",
        numberResults: 3, // Generate 3 variations
        outputFormat: "WEBP",
        CFGScale: 7.5,
        strength: 0.8,
      };

      const results = await this.runwareService.generateImage(params);
      return Array.isArray(results) ? results.map(r => r.imageURL) : [results.imageURL];
    } catch (error) {
      console.error('Error generating try-on image:', error);
      throw error;
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

export const tryOnService = new TryOnService(process.env.RUNWARE_API_KEY || '');