import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { loadOptimizedTexture } from '../utils/imageOptimizer';

interface VRCategoryCardProps {
  name: string;
  image: string;
  position: [number, number, number];
  categoryId: string;
}

export const VRCategoryCard = ({ name, image, position, categoryId }: VRCategoryCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const navigate = useNavigate();
  const { camera } = useThree();

  useEffect(() => {
    let mounted = true;
    
    const loadTexture = async () => {
      try {
        const loadedTexture = await loadOptimizedTexture(image);
        if (mounted) {
          setTexture(loadedTexture);
        }
      } catch (error) {
        console.error('Error loading texture:', error);
      }
    };

    loadTexture();

    return () => {
      mounted = false;
      if (texture) {
        texture.dispose();
      }
    };
  }, [image]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
      meshRef.current.scale.lerp(
        new THREE.Vector3(hovered ? 1.1 : 1, hovered ? 1.1 : 1, hovered ? 1.1 : 1),
        0.1
      );
    }
  });

  if (!texture) return null;

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => navigate(`/vr-category/${categoryId}`)}
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