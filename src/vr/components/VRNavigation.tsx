import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const VRNavigation = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#9b87f5"
          roughness={0.5}
          metalness={0.5}
          emissive="#6b4ff5"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};