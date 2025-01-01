import { RunwareService, GenerateImageParams } from './runwareService';

export class TryOnService {
  private runwareService: RunwareService;

  constructor(apiKey: string) {
    this.runwareService = new RunwareService(apiKey);
  }

  async generateTryOnImages(userImage: string, productImage: string): Promise<string[]> {
    try {
      const params: GenerateImageParams = {
        positivePrompt: `Generate a realistic try-on image showing a person wearing the clothing item. Reference person: ${userImage}, Reference clothing: ${productImage}. Maintain natural lighting, proper fit, and realistic fabric texture.`,
        numberResults: 3,
        CFGScale: 7,
        strength: 0.8,
      };

      const results = await Promise.all([
        this.runwareService.generateImage(params),
        this.runwareService.generateImage({ ...params, seed: Math.random() * 1000000 }),
        this.runwareService.generateImage({ ...params, seed: Math.random() * 1000000 })
      ]);

      return results.map(result => result.imageURL);
    } catch (error) {
      console.error('Error generating try-on images:', error);
      throw error;
    }
  }
}