export type TryOnProvider = 'gemini' | 'fashn';

interface TryOnConfig {
  provider: TryOnProvider;
  fashnApiKey?: string;
}

// Default configuration
const config: TryOnConfig = {
  provider: 'gemini',
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