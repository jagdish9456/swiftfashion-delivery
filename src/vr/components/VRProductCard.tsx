import { Text } from '@react-three/drei';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';

interface VRProductCardProps {
  name: string;
  image: string;
  position: [number, number, number];
  productId: string;
}

export const VRProductCard = ({ name, image, position, productId }: VRProductCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const texture = useLoader(TextureLoader, image);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  // Apply filter effects to texture
  texture.encoding = THREE.sRGBEncoding;
  texture.needsUpdate = true;

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial transparent opacity={0.8} map={texture} />
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