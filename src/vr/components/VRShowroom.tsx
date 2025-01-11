import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const VRShowroom = () => {
  // Using a placeholder showroom background image
  const texture = useTexture('https://images.unsplash.com/photo-1487958449943-2429e8be8625');
  
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial 
          color="#1A1F2C"
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>

      {/* Main wall with showroom background */}
      <mesh position={[0, 8, -20]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial 
          map={texture}
          color="#221F26"
          opacity={0.9}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Side walls */}
      <mesh position={[-20, 8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial 
          color="#1A1F2C"
          metalness={0.2}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[20, 8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial 
          color="#1A1F2C"
          metalness={0.2}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Mannequins (simplified as geometric shapes) */}
      {[-5, 0, 5].map((x, index) => (
        <group key={index} position={[x, -1, -15]}>
          {/* Body */}
          <mesh castShadow>
            <capsuleGeometry args={[0.3, 1.5, 4, 8]} />
            <meshStandardMaterial color="#444" metalness={0.2} roughness={0.8} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#444" metalness={0.2} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Lighting */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      
      {/* Additional ambient lighting for better visibility */}
      <ambientLight intensity={0.4} />
      
      {/* Point lights for dramatic effect */}
      {[-10, 0, 10].map((x, index) => (
        <pointLight
          key={index}
          position={[x, 8, -10]}
          intensity={0.5}
          distance={20}
          decay={2}
        />
      ))}
    </group>
  );
};