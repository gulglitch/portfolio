import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Avatar } from './Avatar';
import { Suspense } from 'react';

interface SceneProps {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}

export function Scene({ mousePosition, scrollProgress }: SceneProps) {
  // Keep avatar visible at all times - no fade out
  const avatarOpacity = 1;

  console.log('Scene rendering - scrollProgress:', scrollProgress, 'opacity:', avatarOpacity);

  return (
    <Canvas
      shadows
      style={{ 
        width: '100%',
        height: '100%',
        background: 'transparent',
        opacity: avatarOpacity,
        visibility: 'visible',
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease-out'
      }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      {/* Fixed Camera - Face Level (Like Reference Portfolio) */}
      <PerspectiveCamera 
        makeDefault 
        position={[0, 1.8, 4.5]}  // Face-level, close position
        fov={22}  // Narrow FOV for telephoto effect
        near={0.1}
        far={1000}
      />
      
      {/* Lighting Setup */}
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.2}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0088ff" />
      <pointLight position={[10, 0, -10]} intensity={0.4} color="#00ff88" />
      <pointLight position={[0, 5, 2]} intensity={0.3} color="#ffffff" />
      
      {/* Avatar with intro animation */}
      <Suspense fallback={
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#00ff88" />
        </mesh>
      }>
        <Avatar mousePosition={mousePosition} scrollProgress={scrollProgress} />
      </Suspense>
      
      {/* TEST CUBE - To verify 3D rendering works */}
      <mesh position={[2, 0, 0]} visible={true}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ff0088" emissive="#ff0088" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Ground shadow */}
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2.5} 
        far={4}
      />
      
      {/* Environment lighting */}
      <Environment preset="city" />
    </Canvas>
  );
}
