import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Preload } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { VRNavigation } from './VRNavigation';
import { VRErrorBoundary } from './VRErrorBoundary';
import { VRShowroom } from './VRShowroom';
import { VRCategoryMenu } from './VRCategoryMenu';
import categoryData from '@/data/category.json';

export const VRScene = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <VRErrorBoundary>
      <Canvas
        camera={{ 
          position: [0, 1.6, 3], // Adjusted for better human-height perspective
          fov: 70,               // Slightly wider field of view
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
        dpr={[1, 2]}
        shadows
      >
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          
          <group position={[0, 0, 0]}>
            <VRShowroom />
            <VRCategoryMenu 
              categories={categoryData.categories}
              onSelectCategory={setSelectedCategory}
            />
            <VRNavigation />
          </group>
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
            maxDistance={10}
            minDistance={2}
            makeDefault
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </VRErrorBoundary>
  );
};