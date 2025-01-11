import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const VRShowroom = () => {
  const texture = useTexture('/lovable-uploads/showroom-background.jpg');
  
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial 
          color="#1A1F2C"
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 8, -20]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial 
          map={texture}
          color="#221F26"
          opacity={0.9}
          transparent
        />
      </mesh>

      {/* Lighting */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
    </group>
  );
};