"use client";

import { useEffect } from "react";
import { initObservability } from "@/lib/observability";

/**
 * Side-effect-only component that initialises Sentry + PostHog on mount.
 * Safe to render once at the root via `Providers`.
 */
export default function ObservabilityBootstrap() {
    useEffect(() => {
        initObservability();
    }, []);
    return null;
}
