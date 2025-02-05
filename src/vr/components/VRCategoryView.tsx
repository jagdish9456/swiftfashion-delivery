import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text, useProgress, Html } from '@react-three/drei';
import { Suspense, useEffect, useState, useCallback } from 'react';
import { VRProductCard } from './VRProductCard';
import { VRErrorBoundary } from './VRErrorBoundary';
import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Chunk size for loading products
const CHUNK_SIZE = 4;

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

// Loading indicator component
function LoadingScreen() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-xl">
        Loading... {progress.toFixed(2)}%
      </div>
    </Html>
  );
}

// Optimized texture loading
const useOptimizedTexture = (url: string) => {
  const texture = useLoader(TextureLoader, url);
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      
      // Dispose texture when component unmounts
      return () => {
        texture.dispose();
      };
    }
  }, [texture]);
  
  return texture;
};

// Chunk renderer component
const ChunkRenderer = ({ chunk }: { chunk: typeof dummyProducts }) => {
  return (
    <>
      {chunk.map((product) => (
        <VRProductCard
          key={product.id}
          name={product.name}
          image={product.image}
          position={product.position}
          productId={product.id}
        />
      ))}
    </>
  );
};

const VRContent = () => {
  const [visibleChunk, setVisibleChunk] = useState(0);
  const { camera } = useThree();

  // Load background textures optimally
  const backgroundTexture = useOptimizedTexture("https://images.unsplash.com/photo-1441986300917-64674bd600d8");
  const leftTexture = useOptimizedTexture("https://images.unsplash.com/photo-1490481651871-ab68de25d43d");
  const rightTexture = useOptimizedTexture("https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc");
  const topTexture = useOptimizedTexture("https://images.unsplash.com/photo-1469334031218-e382a71b716b");
  const bottomTexture = useOptimizedTexture("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04");

  // Calculate chunks
  const chunks = Array.from({ length: Math.ceil(dummyProducts.length / CHUNK_SIZE) }, (_, i) =>
    dummyProducts.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
  );

  // Optimize camera movement
  const handleCameraMove = useCallback(() => {
    const newChunk = Math.floor((-camera.position.y + 2) / 4);
    setVisibleChunk(Math.max(0, Math.min(newChunk, chunks.length - 1)));
  }, [camera.position.y, chunks.length]);

  useEffect(() => {
    handleCameraMove();
  }, [handleCameraMove]);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      
      {/* Background walls with optimized textures */}
      <group>
        <mesh position={[0, 0, -5]} renderOrder={-1}>
          <planeGeometry args={[20, 10]} />
          <meshBasicMaterial map={backgroundTexture} transparent opacity={0.8} />
        </mesh>
        
        <mesh position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial map={leftTexture} transparent opacity={0.8} />
        </mesh>
        
        <mesh position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial map={rightTexture} transparent opacity={0.8} />
        </mesh>
        
        <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 10]} />
          <meshBasicMaterial map={topTexture} transparent opacity={0.8} />
        </mesh>
        
        <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 10]} />
          <meshBasicMaterial map={bottomTexture} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Render only visible chunk and adjacent chunks for smooth transitions */}
      {chunks.map((chunk, index) => (
        Math.abs(index - visibleChunk) <= 1 && (
          <Suspense key={index} fallback={<LoadingScreen />}>
            <ChunkRenderer chunk={chunk} />
          </Suspense>
        )
      ))}
      
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
        onChange={handleCameraMove}
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
        <Suspense fallback={<LoadingScreen />}>
          <VRContent />
        </Suspense>
      </Canvas>
    </div>
  );
};
