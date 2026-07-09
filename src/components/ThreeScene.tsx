import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function NeuralPoints() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const points = new Float32Array(600 * 3);
    for (let i = 0; i < points.length; i += 3) {
      points[i] = (Math.random() - 0.5) * 7;
      points[i + 1] = (Math.random() - 0.5) * 4;
      points[i + 2] = (Math.random() - 0.5) * 4;
    }
    return points;
  }, []);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.08;
      ref.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.12;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#67e8f9" size={0.018} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

function GeometryCluster() {
  return (
    <group>
      {[
        [-1.4, 0.2, 0],
        [1.1, -0.35, -0.4],
        [0.05, 0.9, 0.25]
      ].map((position, index) => (
        <Float key={index} speed={1.4 + index * 0.25} rotationIntensity={0.35} floatIntensity={0.55}>
          <mesh position={position as [number, number, number]}>
            {index === 0 ? <icosahedronGeometry args={[0.42, 1]} /> : <octahedronGeometry args={[0.34, 0]} />}
            <meshStandardMaterial color={index === 1 ? '#f43f5e' : '#7c3aed'} emissive={index === 2 ? '#06b6d4' : '#7c3aed'} emissiveIntensity={0.45} roughness={0.28} metalness={0.7} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 48 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 4]} intensity={1.7} color="#67e8f9" />
      <pointLight position={[-3, -1, 2]} intensity={1.4} color="#fb7185" />
      <NeuralPoints />
      <GeometryCluster />
    </Canvas>
  );
}
