"use client";

import { useState, useCallback } from "react";

export type SpatialZoneId =
  | "identity"
  | "projects"
  | "skills"
  | "achievements"
  | "contact";

export function useActiveZone(defaultZone: SpatialZoneId = "identity") {
  const [activeZone, setActiveZone] = useState<SpatialZoneId>(defaultZone);

  const navigateToZone = useCallback((zone: SpatialZoneId) => {
    setActiveZone(zone);
  }, []);

  return { activeZone, navigateToZone };
}
