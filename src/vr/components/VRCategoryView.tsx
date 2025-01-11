import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VRErrorBoundary } from './VRErrorBoundary';
import { VRProductCard } from './VRProductCard';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const dummyProducts = [
  { id: '1', name: 'Product 1', image: '/placeholder.svg', position: [-4, 2, -2] as [number, number, number] },
  { id: '2', name: 'Product 2', image: '/placeholder.svg', position: [0, 2, -2] as [number, number, number] },
  { id: '3', name: 'Product 3', image: '/placeholder.svg', position: [4, 2, -2] as [number, number, number] },
  { id: '4', name: 'Product 4', image: '/placeholder.svg', position: [-4, 0, -2] as [number, number, number] },
  { id: '5', name: 'Product 5', image: '/placeholder.svg', position: [0, 0, -2] as [number, number, number] },
  { id: '6', name: 'Product 6', image: '/placeholder.svg', position: [4, 0, -2] as [number, number, number] },
  { id: '7', name: 'Product 7', image: '/placeholder.svg', position: [-4, -2, -2] as [number, number, number] },
  { id: '8', name: 'Product 8', image: '/placeholder.svg', position: [0, -2, -2] as [number, number, number] },
  { id: '9', name: 'Product 9', image: '/placeholder.svg', position: [4, -2, -2] as [number, number, number] }
];

// Separate component for the VR content to handle Suspense
const VRContent = () => {
  const backgroundTexture = useLoader(TextureLoader, "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop");
  backgroundTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Background */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial map={backgroundTexture} />
      </mesh>

      {/* Product Cards */}
      {dummyProducts.map((product) => (
        <VRProductCard
          key={product.id}
          name={product.name}
          image={product.image}
          position={product.position}
          productId={product.id}
        />
      ))}
      
      <OrbitControls 
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        makeDefault
      />
    </>
  );
};

// Loading component
const LoadingScreen = () => {
  return (
    <Text
      position={[0, 0, 0]}
      fontSize={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      Loading...
    </Text>
  );
};

export const VRCategoryView = () => {
  const { categoryId } = useParams();

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
          <Suspense fallback={<LoadingScreen />}>
            <VRContent />
          </Suspense>
        </Canvas>
      </VRErrorBoundary>
    </div>
  );
};