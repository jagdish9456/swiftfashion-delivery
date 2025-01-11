import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { VRCategoryCard } from './VRCategoryCard';
import { VRNavigation } from './VRNavigation';
import { VRErrorBoundary } from './VRErrorBoundary';
import { categories } from '@/data/category.json';
import * as THREE from 'three';

const Background = () => {
  const texture = useTexture('https://media.istockphoto.com/id/1219824966/video/a-fashionistas-haven.jpg?s=640x640&k=20&c=J1CFL-ZA46Fz9hS8EVNP0VvdkgcASXGDmsn0WbG2ztU=');
  
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[30, 15]} />
      <meshBasicMaterial map={texture} opacity={0.7} transparent />
    </mesh>
  );
};

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

  const categoryPositions = [
    [-4, 2, 0], [0, 2, 0], [4, 2, 0],
    [-4, 0, 0], [0, 0, 0], [4, 0, 0],
    [-4, -2, 0], [0, -2, 0], [4, -2, 0]
  ];

  return (
    <div className="h-screen w-screen">
      <VRErrorBoundary>
        <Canvas
          camera={{ 
            position: [0, 0, 6],
            fov: 60,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Background />
            
            {categories.slice(0, 9).map((category, index) => (
              <VRCategoryCard
                key={category.id}
                name={category.name}
                image={category.image}
                position={categoryPositions[index] as [number, number, number]}
                categoryId={category.id}
              />
            ))}
            
            <VRNavigation />
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              enableRotate={true}
              minDistance={4}
              maxDistance={8}
              minPolarAngle={Math.PI/3}
              maxPolarAngle={2*Math.PI/3}
              makeDefault
            />
          </Suspense>
        </Canvas>
      </VRErrorBoundary>
    </div>
  );
};