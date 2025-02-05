import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface VRRestaurantCardProps {
  name: string;
  image: string;
  position: [number, number, number];
}

export const VRRestaurantCard = ({ name, image, position }: VRRestaurantCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial 
          color={hovered ? "hotpink" : "orange"}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
      <group position={[0, -0.8, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          renderOrder={1}
        >
          {name}
        </Text>
      </group>
    </group>
  );
};
