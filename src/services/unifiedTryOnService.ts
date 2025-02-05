import { tryOnService as geminiTryOnService } from './tryOnService';
import { fashnTryOnService } from './fashnTryOnService';
import { tryOnConfig, TryOnProvider } from './tryOnConfig';
import { toast } from 'sonner';

class UnifiedTryOnService {
  async generateTryOnImage(userImage: File, productImage: string): Promise<string[]> {
    const provider = tryOnConfig.getProvider();
    
    try {
      switch (provider) {
        case 'gemini':
          return await geminiTryOnService.generateTryOnImage(userImage, productImage);
        
        case 'fashn':
          const apiKey = tryOnConfig.getFashnApiKey();
          if (!apiKey) {
            toast.error('Fashn.ai API key not configured');
            return [];
          }
          fashnTryOnService.setApiKey(apiKey);
          return await fashnTryOnService.generateTryOnImage(userImage, productImage);
        
        default:
          toast.error('Invalid try-on provider configured');
          return [];
      }
    } catch (error: any) {
      console.error('Error in unified try-on service:', error);
      toast.error(error.message || 'Failed to generate try-on images');
      return [];
    }
  }

  setProvider(provider: TryOnProvider) {
    tryOnConfig.setProvider(provider);
  }

  setFashnApiKey(apiKey: string) {
    tryOnConfig.setFashnApiKey(apiKey);
  }
}

export const unifiedTryOnService = new UnifiedTryOnService();
