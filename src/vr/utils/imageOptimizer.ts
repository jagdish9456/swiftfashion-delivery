import { TextureLoader } from 'three';
import * as THREE from 'three';

const COMPRESSED_IMAGE_SIZE = '&w=400&q=75'; // Limit width to 400px and quality to 75%

export const optimizeImageUrl = (url: string): string => {
  if (url.includes('unsplash.com')) {
    return `${url}${COMPRESSED_IMAGE_SIZE}`;
  }
  return url;
};

export const loadOptimizedTexture = async (url: string): Promise<THREE.Texture> => {
  const loader = new TextureLoader();
  const optimizedUrl = optimizeImageUrl(url);
  
  return new Promise((resolve, reject) => {
    loader.load(
      optimizedUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        resolve(texture);
      },
      undefined,
      reject
    );
  });
};