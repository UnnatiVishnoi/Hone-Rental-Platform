import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useRef, Suspense, useMemo, useState } from "react";
import type { Group, Mesh } from "three";
import { PerfOverlay, PerfSampler, type PerfStats } from "@/components/PerfHUD";

function Building({
  position,
  height,
  width = 0.9,
  depth = 0.9,
  accent = false,
}: {
  position: [number, number, number];
  height: number;
  width?: number;
  depth?: number;
  accent?: boolean;
}) {
  return (
    <group position={position}>
      {/* Main tower body */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={accent ? "#1a2f28" : "#0f1f1a"}
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>
      {/* Window stripes — emissive, cheap */}
      <mesh position={[0, height / 2, depth / 2 + 0.001]}>
        <planeGeometry args={[width * 0.85, height * 0.92]} />
        <meshStandardMaterial
          color="#0a1612"
          emissive={accent ? "#d4b265" : "#7a9b8e"}
          emissiveIntensity={accent ? 0.6 : 0.35}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh position={[0, height / 2, -depth / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width * 0.85, height * 0.92]} />
        <meshStandardMaterial
          color="#0a1612"
          emissive={accent ? "#d4b265" : "#7a9b8e"}
          emissiveIntensity={accent ? 0.5 : 0.3}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      {/* Crown */}
      {accent && (
        <mesh position={[0, height + 0.12, 0]}>
          <boxGeometry args={[width * 0.4, 0.24, depth * 0.4]} />
          <meshStandardMaterial
            color="#d4b265"
            metalness={1}
            roughness={0.2}
            emissive="#d4b265"
            emissiveIntensity={0.4}
          />
        </mesh>
      )}
    </group>
  );
}

function Skyline() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.25;
    }
  });

  const buildings = useMemo(
    () =>
      [
        { pos: [0, 0, 0], h: 3.4, w: 1.0, d: 1.0, accent: true },
        { pos: [-1.6, 0, -0.4], h: 2.4, w: 0.85, d: 0.85, accent: false },
        { pos: [1.6, 0, -0.6], h: 2.0, w: 0.8, d: 0.8, accent: false },
        { pos: [-2.8, 0, -1.2], h: 1.5, w: 0.7, d: 0.7, accent: false },
        { pos: [2.8, 0, -1.0], h: 1.7, w: 0.7, d: 0.7, accent: true },
        { pos: [0.2, 0, 1.4], h: 1.2, w: 0.6, d: 0.6, accent: false },
      ] as const,
    [],
  );

  return (
    <group ref={ref}>
      {buildings.map((b, i) => (
        <Building
          key={i}
          position={b.pos as [number, number, number]}
          height={b.h}
          width={b.w}
          depth={b.d}
          accent={b.accent}
        />
      ))}
      {/* Base plate */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5, 48]} />
        <meshStandardMaterial color="#0a1612" metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  );
}

function GoldOrb({ position }: { position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.5;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color="#d4b265"
          metalness={1}
          roughness={0.18}
          emissive="#d4b265"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

export function Hero3D() {
  const [stats, setStats] = useState<PerfStats | null>(null);
  return (
    <div className="relative size-full">
      <Canvas
        camera={{ position: [5, 3.2, 6], fov: 36 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <directionalLight
            position={[6, 9, 4]}
            intensity={1.6}
            color="#fff4d4"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-4, 2, -2]} color="#2d8a6e" intensity={2.5} />

          <Skyline />

          <GoldOrb position={[-2.2, 2.4, 1.2]} />
          <GoldOrb position={[2.4, 2.8, 0.6]} />
          <GoldOrb position={[0.4, 3.6, -1.4]} />

          <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
          <Environment preset="city" />

          <PerfSampler onSample={setStats} />
        </Suspense>
      </Canvas>
      <PerfOverlay stats={stats} />
    </div>
  );
}
