import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { loadOptimizedTexture } from '../utils/imageOptimizer';

const backgroundImages = {
  main: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=50",
  left: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=50",
  right: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&q=50",
  top: "https://www.nerolac.com/sites/default/files/2023-05/fibre-ceilings.webp?w=800&q=50",
  bottom: "https://www.warmup.com/wp-content/uploads/carpet-flooring.jpg?w=800&q=50"
};

export const VRBackground = () => {
  const [textures, setTextures] = useState<Record<string, THREE.Texture | null>>({});

  useEffect(() => {
    let mounted = true;
    const loadTextures = async () => {
      const loadedTextures: Record<string, THREE.Texture> = {};
      
      for (const [key, url] of Object.entries(backgroundImages)) {
        try {
          const texture = await loadOptimizedTexture(url);
          if (texture) {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            loadedTextures[key] = texture;
          }
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
      // Cleanup textures
      Object.values(textures).forEach(texture => {
        if (texture) texture.dispose();
      });
    };
  }, []);

  if (!Object.values(textures).every(Boolean)) return null;

  return (
    <group>
      {/* Main (back) wall */}
      <mesh position={[0, 0, -5]} renderOrder={-1}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial 
          map={textures.main!} 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Left wall */}
      <mesh position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial 
          map={textures.left!} 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Right wall */}
      <mesh position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial 
          map={textures.right!} 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Top wall */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial 
          map={textures.top!} 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Bottom wall */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial 
          map={textures.bottom!} 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
