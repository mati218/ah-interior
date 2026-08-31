"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Shapes() {
  return (
    <>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[0.6, 0.1, 0]} scale={0.9}>
          <torusGeometry args={[1, 0.32, 64, 128]} />
          <MeshDistortMaterial
            color="#b8925a"
            roughness={0.25}
            metalness={0.3}
            distort={0.15}
            speed={1.5}
          />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={1.6}>
        <mesh position={[-1, -0.7, -1]} scale={0.45}>
          <sphereGeometry args={[1, 48, 48]} />
          <MeshDistortMaterial
            color="#f7f3ec"
            roughness={0.5}
            metalness={0.1}
            distort={0.25}
            speed={1}
          />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[1.2, -1, -0.6]} scale={0.28}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#2b2622" roughness={0.4} metalness={0.4} />
        </mesh>
      </Float>
    </>
  );
}

export function Hero3D() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <Shapes />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
