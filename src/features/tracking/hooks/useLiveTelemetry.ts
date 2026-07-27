"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchLivePositions } from "@/features/tracking/services/telemetryApi";

const POLL_INTERVAL_MS = 5000;

export function useLiveTelemetry() {
  return useQuery({
    queryKey: ["telemetry", "live-positions"],
    queryFn: fetchLivePositions,
    refetchInterval: POLL_INTERVAL_MS,
    // The endpoint doesn't exist yet (proposed, not merged) — retrying
    // a 404 repeatedly is just noise. Once it's real, this can come out.
    retry: false,
  });
}