import { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AvatarProps {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}

export function Avatar({ mousePosition, scrollProgress }: AvatarProps) {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);
  const neckRef = useRef<THREE.Object3D | null>(null);
  const { scene, animations } = useGLTF('/models/hijabi-avatar.glb');
  const { actions, mixer } = useAnimations(animations, group);
  const [introComplete, setIntroComplete] = useState(false);

  // Current rotation values for smooth interpolation
  const currentRotation = useRef({ headX: 0, headY: 0, bodyY: 0 });

  console.log('Avatar component rendering - scene loaded:', !!scene);

  useEffect(() => {
    console.log('Avatar mounted - starting setup');
    
    // Play any existing animations from GLB
    if (actions) {
      const animationNames = Object.keys(actions);
      animationNames.forEach(name => {
        if (actions[name]) {
          actions[name].play();
        }
      });
    }

    // Find head/neck bones for precise tracking
    scene.traverse((child) => {
      const name = child.name.toLowerCase();
      if (name.includes('head') && !headRef.current) {
        headRef.current = child;
        console.log('Found head bone:', child.name);
      }
      if (name.includes('neck') && !neckRef.current) {
        neckRef.current = child;
        console.log('Found neck bone:', child.name);
      }
    });

    // Intro Animation - Character reveals itself (like reference)
    if (group.current) {
      console.log('Setting up static avatar - NO ANIMATION');
      // Set static position: centered and moved upwards
      group.current.position.set(0, 0.5, 0); 
      group.current.scale.set(1.8, 1.8, 1.8);
      group.current.visible = true;
      
      // Enable tracking immediately
      setIntroComplete(true);
      console.log('Avatar ready - tracking enabled');
    }
  }, [actions, scene]);

  // Enhanced mouse tracking - always active
  useFrame(() => {
    if (!introComplete) return; // Only wait for intro to complete

    if (group.current) {
      // Target rotations based on mouse position
      const targetBodyY = mousePosition.x * 0.3;
      
      // Smooth interpolation for body rotation
      currentRotation.current.bodyY = THREE.MathUtils.lerp(
        currentRotation.current.bodyY,
        targetBodyY,
        0.05
      );
      
      group.current.rotation.y = currentRotation.current.bodyY;
      
      // Subtle body tilt
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        mousePosition.x * 0.03,
        0.03
      );
    }

    // Head tracking (more responsive than body)
    if (headRef.current && introComplete) {
      const targetHeadY = mousePosition.x * 0.4;
      const targetHeadX = -mousePosition.y * 0.3;
      
      // Smooth interpolation for head rotation
      currentRotation.current.headY = THREE.MathUtils.lerp(
        currentRotation.current.headY,
        targetHeadY,
        0.1
      );
      currentRotation.current.headX = THREE.MathUtils.lerp(
        currentRotation.current.headX,
        targetHeadX,
        0.1
      );
      
      headRef.current.rotation.y = currentRotation.current.headY;
      headRef.current.rotation.x = currentRotation.current.headX;
    }

    // Neck tracking (subtle support movement)
    if (neckRef.current && introComplete) {
      neckRef.current.rotation.y = THREE.MathUtils.lerp(
        neckRef.current.rotation.y,
        mousePosition.x * 0.2,
        0.08
      );
      neckRef.current.rotation.x = THREE.MathUtils.lerp(
        neckRef.current.rotation.x,
        -mousePosition.y * 0.15,
        0.08
      );
    }

    // Update animation mixer
    if (mixer) {
      mixer.update(0.01);
    }
  });

  return (
    <group ref={group} visible={true}>
      <primitive 
        object={scene}
        visible={true}
        scale={1}
      />
      {/* Rim light for character highlighting */}
      <pointLight 
        position={[0, 1, -2]} 
        intensity={0.6} 
        color="#00ff88" 
        distance={5}
      />
      {/* Fill light from front */}
      <pointLight 
        position={[0, 0, 3]} 
        intensity={0.4} 
        color="#ffffff" 
        distance={6}
      />
    </group>
  );
}

// Preload the model for faster initial load
useGLTF.preload('/models/hijabi-avatar.glb');
