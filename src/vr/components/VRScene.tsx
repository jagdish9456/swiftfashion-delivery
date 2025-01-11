import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { VRCategoryCard } from './VRCategoryCard';
import { VRNavigation } from './VRNavigation';
import { VRErrorBoundary } from './VRErrorBoundary';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const categories = [
  {
    id: 'formal-wear',
    name: "Formal Wear",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    position: [-4, 2, -2] as [number, number, number]
  },
  {
    id: 'casual-wear',
    name: "Casual Wear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    position: [0, 2, -2] as [number, number, number]
  },
  {
    id: 'ethnic-wear',
    name: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    position: [4, 2, -2] as [number, number, number]
  },
  {
    id: 'sportswear',
    name: "Sportswear",
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078",
    position: [-4, 0, -2] as [number, number, number]
  },
  {
    id: 'winter-wear',
    name: "Winter Wear",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
    position: [0, 0, -2] as [number, number, number]
  },
  {
    id: 'summer-wear',
    name: "Summer Wear",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    position: [4, 0, -2] as [number, number, number]
  },
  {
    id: 'accessories',
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
    position: [-4, -2, -2] as [number, number, number]
  },
  {
    id: 'footwear',
    name: "Footwear",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
    position: [0, -2, -2] as [number, number, number]
  },
  {
    id: 'designer-wear',
    name: "Designer Wear",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
    position: [4, -2, -2] as [number, number, number]
  }
];

export const VRScene = () => {
  useEffect(() => {
    const enterFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    };

    enterFullscreen();

    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, []);

  const backgroundTexture = useLoader(TextureLoader, "https://media.istockphoto.com/id/1219824966/video/a-fashionistas-haven.jpg");
  backgroundTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <div className="h-screen w-screen">
      <VRErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            
            {/* Background */}
            <mesh position={[0, 0, -5]}>
              <planeGeometry args={[20, 10]} />
              <meshBasicMaterial map={backgroundTexture} />
            </mesh>

            {/* Category Cards */}
            {categories.map((category) => (
              <VRCategoryCard
                key={category.id}
                name={category.name}
                image={category.image}
                position={category.position}
                categoryId={category.id}
              />
            ))}
            
            <VRNavigation />
            <OrbitControls 
              enableZoom={true}
              minDistance={3}
              maxDistance={10}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              makeDefault
            />
          </Suspense>
        </Canvas>
      </VRErrorBoundary>
    </div>
  );
};
