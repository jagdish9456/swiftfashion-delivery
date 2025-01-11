import { Text } from '@react-three/drei';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

type Category = {
  id: string;
  name: string;
  image: string;
};

type VRCategoryMenuProps = {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
};

export const VRCategoryMenu = ({ categories, onSelectCategory }: VRCategoryMenuProps) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <group position={[0, 4, -2]}>
      {categories.slice(0, 9).map((category, index) => {
        const x = (index % 3 - 1) * 2;
        const y = -Math.floor(index / 3) * 1.5;
        
        return (
          <group 
            key={category.id} 
            position={[x, y, 0]}
            onClick={() => handleCategoryClick(category.id)}
            onPointerOver={() => setHoveredIndex(index)}
            onPointerOut={() => setHoveredIndex(null)}
          >
            <mesh castShadow>
              <planeGeometry args={[1.5, 1]} />
              <meshStandardMaterial 
                color={hoveredIndex === index ? "#9b87f5" : "#7c6bd6"}
                metalness={0.5}
                roughness={0.5}
                transparent
                opacity={0.9}
              >
                <primitive attach="map" object={new THREE.TextureLoader().load(category.image)} />
              </meshStandardMaterial>
            </mesh>
            <group position={[0, 0, 0.1]}>
              <Text
                position={[0, 0, 0]}
                fontSize={0.15}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.3}
                renderOrder={1}
              >
                {category.name}
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
};