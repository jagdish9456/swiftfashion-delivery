import { toast } from 'sonner';

interface FashnTryOnOptions {
  nsfw_filter?: boolean;
  cover_feet?: boolean;
  adjust_hands?: boolean;
  restore_background?: boolean;
  restore_clothes?: boolean;
  garment_photo_type?: 'auto' | 'flat-lay' | 'model';
  long_top?: boolean;
  mode?: 'performance' | 'balanced' | 'quality';
  seed?: number;
  num_samples?: number;
}

const DEFAULT_OPTIONS: FashnTryOnOptions = {
  nsfw_filter: true,
  mode: 'balanced',
  num_samples: 1,
  seed: 42,
};

class FashnTryOnService {
  private readonly API_URL = 'https://api.fashn.ai/v1';
  private apiKey: string | undefined;

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async generateTryOnImage(
    userImage: File,
    productImage: string,
    category: 'tops' | 'bottoms' | 'one-pieces' = 'tops',
    options: FashnTryOnOptions = {}
  ): Promise<string[]> {
    if (!this.apiKey) {
      toast.error('Fashn.ai API key not configured');
      return [];
    }

    try {
      const userImageBase64 = await this.fileToBase64(userImage);
      
      const response = await fetch(`${this.API_URL}/run`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model_image: userImageBase64,
          garment_image: productImage,
          category,
          ...DEFAULT_OPTIONS,
          ...options,
        }),
      });

      if (!response.ok) {
        throw new Error(`Fashn.ai API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Poll for status until complete
      const finalResult = await this.pollStatus(result.id);
      return finalResult.images || [];
    } catch (error: any) {
      console.error('Error generating try-on image:', error);
      toast.error(error.message || 'Failed to generate try-on images');
      return [];
    }
  }

  private async pollStatus(id: string): Promise<any> {
    const maxAttempts = 30;
    const interval = 2000;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await fetch(`${this.API_URL}/status/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to check status');
      }

      const result = await response.json();
      
      if (result.status === 'completed') {
        return result;
      } else if (result.status === 'failed') {
        throw new Error(result.error || 'Generation failed');
      }

      await new Promise(resolve => setTimeout(resolve, interval));
      attempts++;
    }

    throw new Error('Timeout waiting for result');
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

export const fashnTryOnService = new FashnTryOnService();