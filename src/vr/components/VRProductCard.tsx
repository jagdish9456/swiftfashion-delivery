import { Text } from '@react-three/drei';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { useRef, useState, useTransition } from 'react';
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
  const [isPending, startTransition] = useTransition();

  // Smooth animation for hover effect
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
      meshRef.current.scale.lerp(new THREE.Vector3(
        hovered ? 1.1 : 1,
        hovered ? 1.1 : 1,
        hovered ? 1.1 : 1
      ), 0.1);
    }
  });

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
      >
        <boxGeometry args={[2, 2, 0.2]} />
        <meshPhongMaterial
          map={texture}
          transparent
          opacity={0.9}
          color="#D6BCFA"
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