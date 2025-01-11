import { Text } from '@react-three/drei';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { useRef, useState, useTransition } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { TextureLoader } from 'three';

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
  const { camera } = useThree();
  const texture = useLoader(TextureLoader, image);
  const [isPending, startTransition] = useTransition();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  const handleClick = () => {
    startTransition(() => {
      navigate(`/vr-category/${categoryId}`);
    });
  };

  // Apply filter effects to texture
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }

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
        <meshBasicMaterial 
          map={texture} 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
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