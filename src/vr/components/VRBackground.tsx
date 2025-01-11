import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { loadOptimizedTexture } from '../utils/imageOptimizer';

const backgroundImages = {
  main: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  left: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  right: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
  top: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
  bottom: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
};

export const VRBackground = () => {
  const [textures, setTextures] = useState<Record<string, THREE.Texture | null>>({});

  useEffect(() => {
    let mounted = true;
    const loadTextures = async () => {
      const loadedTextures: Record<string, THREE.Texture> = {};
      
      for (const [key, url] of Object.entries(backgroundImages)) {
        try {
          loadedTextures[key] = await loadOptimizedTexture(url);
        } catch (error) {
          console.error(`Error loading ${key} texture:`, error);
        }
      }
      
      if (mounted) {
        setTextures(loadedTextures);
      }
    };

    loadTextures();

    return () => {
      mounted = false;
      Object.values(textures).forEach(texture => {
        if (texture) texture.dispose();
      });
    };
  }, []);

  if (!Object.values(textures).every(Boolean)) return null;

  return (
    <group>
      <mesh position={[0, 0, -5]} renderOrder={-1}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial map={textures.main} transparent opacity={0.8} />
      </mesh>
      
      <mesh position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial map={textures.left} transparent opacity={0.8} />
      </mesh>
      
      <mesh position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial map={textures.right} transparent opacity={0.8} />
      </mesh>
      
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial map={textures.top} transparent opacity={0.8} />
      </mesh>
      
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial map={textures.bottom} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};