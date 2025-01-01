interface CachedImage {
  images: string[];
  timestamp: number;
}

class ImageCache {
  private cache = new Map<string, CachedImage>();
  private readonly CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds

  generateKey(userImage: string, productImage: string): string {
    return `${userImage.slice(0, 100)}-${productImage.slice(0, 100)}`;
  }

  get(key: string): string[] | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.CACHE_EXPIRY) {
      this.cache.delete(key);
      return null;
    }

    return cached.images;
  }

  set(key: string, images: string[]): void {
    this.cache.set(key, {
      images,
      timestamp: Date.now()
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const imageCache = new ImageCache();