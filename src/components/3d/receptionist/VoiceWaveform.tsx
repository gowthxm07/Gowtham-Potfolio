"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { smoothStep } from "@/lib/storyTimeline";

interface VoiceWaveformProps {
  subProgress: number;
}

export function VoiceWaveform({ subProgress }: VoiceWaveformProps) {
  const groupRef = useRef<THREE.Group>(null);
  const barsGroupRef = useRef<THREE.Group>(null);
  const pulsePacketRef = useRef<THREE.Mesh>(null);

  // Active during conversation: subProgress 0.18 -> 0.85
  const barCount = 14;
  const barMeshRefs = useMemo(() => Array.from({ length: barCount }, () => ({ current: null as THREE.Mesh | null })), [barCount]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Modulate bars to simulate speech acoustic waveform
    const time = state.clock.elapsedTime * 4.5;
    barMeshRefs.forEach((ref, idx) => {
      if (ref.current) {
        const offset = idx * 0.45;
        const wave = Math.sin(time + offset) * 0.4 + Math.cos(time * 0.7 + offset * 0.8) * 0.3;
        const targetScaleY = Math.max(0.15, 0.4 + wave * 0.45);
        ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, targetScaleY, 6.0, delta);
      }
    });

    // Traveling audio pulse packet along signal vector
    if (pulsePacketRef.current) {
      const packetX = -0.5 + ((time * 0.6) % 1.0) * 1.0;
      pulsePacketRef.current.position.x = packetX;
    }
  });

  const isResponsePhase = subProgress >= 0.52;

  return (
    <group ref={groupRef} position={[-0.55, 0.05, 0]}>
      {/* 01. AUDIO CARRIER BEAM (Connecting Phone to AI Core) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.05, 0.008, 0.004]} />
        <meshBasicMaterial color="#22c55e" opacity={0.4} transparent />
      </mesh>

      {/* Traveling Data Packet Node */}
      <mesh ref={pulsePacketRef} position={[0, 0, 0.01]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color="#86efac" />
      </mesh>

      {/* 02. EQUALIZER / WAVEFORM BARS */}
      <group ref={barsGroupRef} position={[0, 0, 0.01]}>
        {Array.from({ length: barCount }).map((_, i) => {
          const posX = (i - (barCount - 1) / 2) * 0.065;
          return (
            <mesh
              key={i}
              ref={(el) => {
                barMeshRefs[i].current = el;
              }}
              position={[posX, 0, 0]}
            >
              <boxGeometry args={[0.024, 0.38, 0.008]} />
              <meshStandardMaterial
                color={isResponsePhase ? "#4ade80" : "#22c55e"}
                emissive={isResponsePhase ? "#4ade80" : "#22c55e"}
                emissiveIntensity={0.65}
                roughness={0.2}
              />
            </mesh>
          );
        })}
      </group>

      {/* Waveform Technical Header */}
      <Text
        position={[0, 0.28, 0.02]}
        fontSize={0.03}
        color="#86efac"
        anchorX="center"
        anchorY="bottom"
        letterSpacing={0.06}
      >
        {isResponsePhase ? "AI SYNTHESIS // Piper TTS" : "VOICE TRANSCRIBE // Whisper.cpp"}
      </Text>

      {/* Waveform Telemetry Footnote */}
      <Text
        position={[0, -0.28, 0.02]}
        fontSize={0.022}
        color="#9ca3af"
        anchorX="center"
        anchorY="top"
        letterSpacing={0.04}
      >
        {"ACOUSTIC STREAM: 16kHz PCM → INTENT"}
      </Text>
    </group>
  );
}
