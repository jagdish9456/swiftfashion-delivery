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

      {/* Category Cards with increased spacing */}
      {categories.map((category, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return (
          <VRCategoryCard
            key={category.id}
            name={category.name}
            image={category.image}
            position={[
              (col - 1) * 4, // Increased horizontal gap
              1 - row * 2.5,  // Increased vertical gap
              -2
            ]}
            categoryId={category.id}
          />
        );
      })}
      
      <VRNavigation />
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

export const VRScene = () => {
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
        style={{ background: '#1a1a1a' }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <VRContent />
        </Suspense>
      </Canvas>
    </div>
  );
};
