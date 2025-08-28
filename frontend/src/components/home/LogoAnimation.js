import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center, Sparkles, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Revolutionary 3D Logo with Morphing Geometry
const MorphingLogo = () => {
  const groupRef = useRef();
  const coreRef = useRef();
  const ringsRef = useRef([]);
  const particlesRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Initial dramatic entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Phase 1: Core materialization
    tl.fromTo(coreRef.current?.scale, 
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" }
    )
    // Phase 2: Rings emergence
    .fromTo(ringsRef.current,
      { 
        scale: 0,
        rotation: { x: 0, y: 0, z: 0 }
      },
      { 
        scale: 1,
        rotation: { x: Math.PI / 4, y: Math.PI / 6, z: 0 },
        duration: 2,
        stagger: 0.3,
        ease: "back.out(1.7)"
      }, "-=1")
    // Phase 3: Particle explosion
    .to({}, {
      duration: 0.1,
      onComplete: () => setAnimationPhase(1)
    });

    return () => tl.kill();
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Core pulsing and rotation
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.3;
      coreRef.current.rotation.y = time * 0.5;
      
      // Breathing effect
      const breathe = 1 + Math.sin(time * 2) * 0.1;
      coreRef.current.scale.setScalar(breathe);
    }

    // Rings orbital motion
    ringsRef.current.forEach((ring, index) => {
      if (ring) {
        const offset = index * Math.PI * 0.66;
        ring.rotation.x = time * (0.5 + index * 0.2) + offset;
        ring.rotation.y = time * (0.3 + index * 0.15) + offset;
        ring.rotation.z = time * (0.2 + index * 0.1) + offset;
        
        // Hover effect
        if (isHovered) {
          ring.position.x = Math.sin(time * 2 + offset) * 0.5;
          ring.position.y = Math.cos(time * 2 + offset) * 0.3;
        } else {
          ring.position.x = Math.sin(time * 0.5 + offset) * 0.1;
          ring.position.y = Math.cos(time * 0.5 + offset) * 0.05;
        }
      }
    });

    // Particle system animation
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        const particleTime = time + index * 0.1;
        particle.position.x = Math.sin(particleTime * 0.8) * (2 + Math.sin(particleTime * 0.3));
        particle.position.y = Math.cos(particleTime * 0.6) * (1.5 + Math.cos(particleTime * 0.4));
        particle.position.z = Math.sin(particleTime * 0.4) * 1;
        
        // Particle rotation
        particle.rotation.x = particleTime * 2;
        particle.rotation.y = particleTime * 1.5;
        
        // Size pulsing
        const pulse = 1 + Math.sin(particleTime * 3) * 0.3;
        particle.scale.setScalar(pulse * 0.1);
      }
    });

    // Global group rotation
    groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Central Core - Morphing Sphere */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.6}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive="#3730a3"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbital Rings */}
      {[...Array(3)].map((_, index) => (
        <mesh
          key={`ring-${index}`}
          ref={(el) => (ringsRef.current[index] = el)}
          position={[0, 0, 0]}
        >
          <torusGeometry args={[1.2 + index * 0.4, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={['#06b6d4', '#8b5cf6', '#f59e0b'][index]}
            metalness={0.9}
            roughness={0.1}
            emissive={['#0891b2', '#7c3aed', '#d97706'][index]}
            emissiveIntensity={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Floating Particles */}
      {[...Array(20)].map((_, index) => (
        <mesh
          key={`particle-${index}`}
          ref={(el) => (particlesRef.current[index] = el)}
          position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
          ]}
        >
          <octahedronGeometry args={[0.05]} />
          <meshStandardMaterial
            color={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][index % 5]}
            metalness={1}
            roughness={0}
            emissive={['#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706'][index % 5]}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

// Holographic Text Component
const HolographicText = () => {
  const textRef = useRef();
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.elapsedTime;
      textRef.current.position.y = Math.sin(time * 1.5) * 0.1;
      
      // Holographic shimmer effect
      if (textRef.current.material) {
        textRef.current.material.emissiveIntensity = 0.3 + Math.sin(time * 4) * 0.2;
      }
    }
  });

  if (!textVisible) return null;

  return (
    <Center position={[0, -2.5, 0]}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.3}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
      >
        TECHTORNIX
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          emissive="#4f46e5"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </Text3D>
    </Center>
  );
};

// Energy Field Background
const EnergyField = () => {
  const fieldRef = useRef();

  useFrame((state) => {
    if (fieldRef.current) {
      const time = state.clock.elapsedTime;
      fieldRef.current.rotation.x = time * 0.1;
      fieldRef.current.rotation.y = time * 0.15;
      fieldRef.current.rotation.z = time * 0.05;
    }
  });

  return (
    <mesh ref={fieldRef} position={[0, 0, -3]}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshStandardMaterial
        color="#1e1b4b"
        transparent
        opacity={0.1}
        wireframe
        emissive="#312e81"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const LogoAnimation = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        className="w-full h-full"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Advanced Lighting System */}
        <ambientLight intensity={0.2} color="#4338ca" />
        
        {/* Key Light */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          color="#60a5fa"
          castShadow
        />
        
        {/* Fill Lights */}
        <pointLight position={[-3, 2, 4]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[3, -2, 2]} intensity={0.6} color="#06b6d4" />
        <pointLight position={[0, 0, -5]} intensity={0.4} color="#f59e0b" />
        
        {/* Rim Light */}
        <spotLight
          position={[0, 5, 0]}
          angle={Math.PI / 3}
          penumbra={0.5}
          intensity={1}
          color="#ec4899"
          target-position={[0, 0, 0]}
        />

        {/* Background Energy Field */}
        <EnergyField />
        
        {/* Main Logo */}
        <MorphingLogo />
        
        {/* Holographic Text */}
        <HolographicText />
        
        {/* Enhanced Sparkles */}
        <Sparkles
          count={150}
          scale={[10, 10, 10]}
          size={2}
          speed={0.3}
          opacity={0.8}
          color="#ffffff"
        />
        
        {/* Interactive Controls - Disabled for Header */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
      
      {/* Futuristic UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner HUD Elements */}
        <div className="absolute top-4 left-4">
          <div className="w-12 h-12 border-2 border-cyan-400/60 rounded-tl-xl">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse ml-1 mt-1"></div>
          </div>
        </div>
        
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 border-2 border-purple-400/60 rounded-tr-xl">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse ml-8 mt-1"></div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <div className="w-12 h-12 border-2 border-blue-400/60 rounded-bl-xl">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse ml-1 mt-8"></div>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <div className="w-12 h-12 border-2 border-orange-400/60 rounded-br-xl">
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse ml-8 mt-8"></div>
          </div>
        </div>
        
        {/* Central Status Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20">
          <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-cyan-400/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-cyan-300 font-mono">SYSTEM ONLINE</span>
          </div>
        </div>
        
        {/* Scanning Lines Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
};

export default LogoAnimation;
