import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text, useTexture } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { VRRestaurantCard } from './VRRestaurantCard';
import { VRNavigation } from './VRNavigation';
import { VRErrorBoundary } from './VRErrorBoundary';
import { VRShowroom } from './VRShowroom';
import { VRCategoryMenu } from './VRCategoryMenu';
import categoryData from '@/data/category.json';

export const VRScene = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen">
      <VRErrorBoundary>
        <Canvas
          camera={{ position: [0, 2, 8], fov: 75 }}
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
            
            <VRShowroom />
            <VRCategoryMenu 
              categories={categoryData.categories}
              onSelectCategory={setSelectedCategory}
            />
            
            <OrbitControls 
              enableZoom={true} 
              enablePan={true} 
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 4}
              makeDefault
            />
          </Suspense>
        </Canvas>
      </VRErrorBoundary>
    </div>
  );
};