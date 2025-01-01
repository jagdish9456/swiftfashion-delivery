export type TryOnProvider = 'gemini' | 'fashn';

interface TryOnConfig {
  provider: TryOnProvider;
  fashnApiKey?: string;
}

// Default configuration
const config: TryOnConfig = {
  provider: 'fashn', // Changed default to fashn,
  fashnApiKey: 'fa-cmcVumUEd6iE-EH5qutXJRkSl45DJHA0srUzc'
};

export const tryOnConfig = {
  getProvider: (): TryOnProvider => config.provider,
  setProvider: (provider: TryOnProvider) => {
    config.provider = provider;
  },
  setFashnApiKey: (apiKey: string) => {
    config.fashnApiKey = apiKey;
  },
  getFashnApiKey: () => config.fashnApiKey,
};