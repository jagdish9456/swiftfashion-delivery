import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VRErrorBoundary } from './VRErrorBoundary';
import * as THREE from 'three';

const dummyClothes = Array(9).fill(null).map((_, i) => ({
  id: `dummy-${i}`,
  name: `Clothing Item ${i + 1}`,
  image: '/placeholder.svg'
}));

const ClothingItem = ({ position, name, image }: { position: [number, number, number], name: string, image: string }) => {
  const texture = new THREE.TextureLoader().load(image);
  
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
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

  // Define positions as tuples of exactly 3 numbers
  const itemPositions: [number, number, number][] = [
    [-4, 2, 0],
    [0, 2, 0],
    [4, 2, 0],
    [-4, 0, 0],
    [0, 0, 0],
    [4, 0, 0],
    [-4, -2, 0],
    [0, -2, 0],
    [4, -2, 0]
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
            
            {dummyClothes.map((item, index) => (
              <ClothingItem
                key={item.id}
                position={itemPositions[index]}
                name={item.name}
                image={item.image}
              />
            ))}
            
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