import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { VRRestaurantCard } from './VRRestaurantCard';
import { VRNavigation } from './VRNavigation';
import { VRErrorBoundary } from './VRErrorBoundary';

const restaurants = [
  {
    id: 1,
    name: "Pizza Hut",
    image: "/lovable-uploads/bc5a7aa2-424a-4b9b-82c9-423b3da8ef4a.png",
    position: [-2, 0, 0] as [number, number, number]
  },
  {
    id: 2,
    name: "Dominos Pizza",
    image: "/lovable-uploads/bc5a7aa2-424a-4b9b-82c9-423b3da8ef4a.png",
    position: [0, 0, 0] as [number, number, number]
  },
  {
    id: 3,
    name: "Burger King",
    image: "/lovable-uploads/bc5a7aa2-424a-4b9b-82c9-423b3da8ef4a.png",
    position: [2, 0, 0] as [number, number, number]
  }
];

export const VRScene = () => {
  return (
    <div className="h-screen w-screen">
      <VRErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
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
            
            {restaurants.map((restaurant) => (
              <VRRestaurantCard
                key={restaurant.id}
                name={restaurant.name}
                image={restaurant.image}
                position={restaurant.position}
              />
            ))}
            
            <VRNavigation />
            <OrbitControls 
              enableZoom={true} 
              enablePan={true} 
              enableRotate={true}
              makeDefault
            />
          </Suspense>
        </Canvas>
      </VRErrorBoundary>
    </div>
  );
};