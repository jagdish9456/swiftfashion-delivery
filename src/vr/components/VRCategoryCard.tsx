import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

interface VRCategoryCardProps {
  name: string;
  image: string;
  position: [number, number, number];
  categoryId: string;
}

export const VRCategoryCard = ({ name, image, position, categoryId }: VRCategoryCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const texture = new THREE.TextureLoader().load(image);

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const handleClick = () => {
    navigate(`/vr-category/${categoryId}`);
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        scale={hovered ? 1.2 : 1}
      >
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial 
          map={texture}
          color={new THREE.Color(0.5, 0, 0.5)}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, -1.2, 0]}
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
  );
};