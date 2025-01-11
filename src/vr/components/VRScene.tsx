import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { Suspense, lazy } from 'react';
import { VRErrorBoundary } from './VRErrorBoundary';
import { VRCategoryCard } from './VRCategoryCard';
import { VRBackground } from './VRBackground';

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

const CategoryCards = () => {
  return (
    <group>
      {categories.map((category, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return (
          <Suspense 
            key={category.id} 
            fallback={
              <Text
                position={[(col - 1) * 4, 1 - row * 2.5, -2]}
                fontSize={0.2}
                color="white"
              >
                Loading...
              </Text>
            }
          >
            <VRCategoryCard
              name={category.name}
              image={category.image}
              position={[
                (col - 1) * 4,
                1 - row * 2.5,
                -2
              ]}
              categoryId={category.id}
            />
          </Suspense>
        );
      })}
    </group>
  );
};

const VRContent = () => {
  return (
    <group>
      <Environment preset="sunset" />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      
      <Suspense fallback={null}>
        <VRBackground />
      </Suspense>

      <CategoryCards />
      
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
    </group>
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
      Loading VR Experience...
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
        <VRErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
            <VRContent />
          </Suspense>
        </VRErrorBoundary>
      </Canvas>
    </div>
  );
};
