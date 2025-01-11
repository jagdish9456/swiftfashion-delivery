import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const VRShowroom = () => {
  const texture = useTexture('https://media.istockphoto.com/id/1219824966/video/a-fashionistas-haven.jpg?s=640x640&k=20&c=J1CFL-ZA46Fz9hS8EVNP0VvdkgcASXGDmsn0WbG2ztU=');
  
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#1A1F2C"
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>

      {/* Main wall with showroom background */}
      <mesh position={[0, 4, -10]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial 
          map={texture}
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Side walls */}
      <mesh position={[-10, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial 
          color="#1A1F2C"
          metalness={0.2}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[10, 4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial 
          color="#1A1F2C"
          metalness={0.2}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Mannequins */}
      {[-3, 0, 3].map((x, index) => (
        <group key={index} position={[x, -1, -8]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.3, 1.5, 4, 8]} />
            <meshStandardMaterial color="#444" metalness={0.2} roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#444" metalness={0.2} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Enhanced Lighting */}
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={1.5}
        castShadow
      />
      
      <ambientLight intensity={0.6} />
      
      {/* Accent lights */}
      {[-5, 0, 5].map((x, index) => (
        <pointLight
          key={index}
          position={[x, 6, -5]}
          intensity={0.8}
          distance={15}
          decay={2}
        />
      ))}
    </group>
  );
};