"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ZoneId } from "@/lib/cameraConfig";
import { MinimalHUD } from "@/components/ui/MinimalHUD";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

// Dynamically import the 3D Scene with SSR disabled for optimal WebGL lifecycle
const Scene = dynamic(
  () => import("@/components/3d/Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  const [activeZone, setActiveZone] = useState<ZoneId>("overview");
  const { isMobile, dpr } = useDeviceCapabilities();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#040711]">
      {/* 01. Minimal Technical Loading Screen */}
      <LoadingScreen />

      {/* 02. Minimal 2D Head-Up Display (HUD) */}
      <MinimalHUD
        activeZone={activeZone}
        onSelectZone={(zone) => setActiveZone(zone)}
      />

      {/* 03. Core 3D Interactive Environment */}
      <Scene
        activeZone={activeZone}
        onSelectZone={(zone) => setActiveZone(zone)}
        isMobile={isMobile}
        dpr={dpr}
      />
    </main>
  );
}
