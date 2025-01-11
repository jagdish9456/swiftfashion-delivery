import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { VRProductCard } from './VRProductCard';
import { VRErrorBoundary } from './VRErrorBoundary';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

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

const VRContent = () => {
  const backgroundTexture = useLoader(TextureLoader, "https://images.unsplash.com/photo-1441986300917-64674bd600d8");
  const leftTexture = useLoader(TextureLoader, "https://images.unsplash.com/photo-1490481651871-ab68de25d43d");
  const rightTexture = useLoader(TextureLoader, "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc");
  const topTexture = useLoader(TextureLoader, "https://images.unsplash.com/photo-1469334031218-e382a71b716b");
  const bottomTexture = useLoader(TextureLoader, "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04");

  [backgroundTexture, leftTexture, rightTexture, topTexture, bottomTexture].forEach(texture => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      
      {/* Background walls */}
      <group>
        {/* Back wall */}
        <mesh position={[0, 0, -5]} renderOrder={-1}>
          <planeGeometry args={[20, 10]} />
          <meshBasicMaterial map={backgroundTexture} transparent opacity={0.8} />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial map={leftTexture} transparent opacity={0.8} />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial map={rightTexture} transparent opacity={0.8} />
        </mesh>
        
        {/* Top wall */}
        <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 10]} />
          <meshBasicMaterial map={topTexture} transparent opacity={0.8} />
        </mesh>
        
        {/* Bottom wall */}
        <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 10]} />
          <meshBasicMaterial map={bottomTexture} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Product Cards with increased spacing */}
      {dummyProducts.map((product, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return (
          <VRProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            position={[
              (col - 1) * 4, // Increased horizontal gap
              1 - row * 2.5,  // Increased vertical gap
              -2
            ]}
            productId={product.id}
          />
        );
      })}
      
      <OrbitControls 
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        makeDefault
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
      />
    </>
  );
};

export const VRCategoryView = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <VRContent />
        </Suspense>
      </Canvas>
    </div>
  );
};
