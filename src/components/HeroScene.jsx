import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function CricketBall() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.5;
    ref.current.rotation.y = state.clock.elapsedTime * 0.8;
  });

  const seamGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 32 }, (_, i) => {
        const t = (i / 32) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(t) * 0.52,
          Math.sin(t * 2) * 0.05,
          Math.sin(t) * 0.52
        );
      })
    );
    return new THREE.TubeGeometry(curve, 64, 0.015, 8, false);
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshStandardMaterial color="#cc0000" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh geometry={seamGeometry}>
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function CricketStumps() {
  return (
    <group position={[2.5, -0.8, 0]}>
      {[0, 0.2, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.0, 8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0.2, 0.95, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.04]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>
    </group>
  );
}

function CricketBat() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    ref.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
  });

  return (
    <group ref={ref} position={[-2, -0.5, 0.5]} rotation={[0.3, 0.5, 0.2]}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.8, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.7, 0.04]} />
        <meshStandardMaterial color="#c49a6c" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.18, 0.06, 0.05]} />
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Particles() {
  const ref = useRef();
  const count = 50;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#10b981" size={0.04} transparent opacity={0.6} />
    </points>
  );
}

function StadiumLights() {
  return (
    <>
      <pointLight position={[3, 4, 2]} intensity={0.8} color="#fff5e6" />
      <pointLight position={[-3, 4, -2]} intensity={0.6} color="#fff5e6" />
      <spotLight position={[0, 5, 0]} intensity={0.4} color="#10b981" angle={0.6} penumbra={0.8} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <StadiumLights />
      <CricketBall />
      <CricketStumps />
      <CricketBat />
      <Particles />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
