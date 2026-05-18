"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveContainer } from "recharts";

interface ChartWrapperProps {
    children: React.ReactNode;
    /**
     * Tailwind height utility classes. Defaults to a responsive set.
     * Examples: "h-full", "h-64", "h-64 md:h-80 lg:h-96".
     */
    height?: string;
}

/**
 * Default-exported `ChartWrapper`.
 *
 * Wraps a Recharts chart in a sized `ResponsiveContainer` and gates rendering
 * on the client to avoid Recharts' SSR width(-1)/height(-1) warnings during
 * static export.
 *
 * Use this when the direct child is a chart (e.g. `<BarChart />`,
 * `<AreaChart />`, `<LineChart />`) without its own `ResponsiveContainer`.
 *
 * For mount-gating only (when the consumer already provides sizing), see the
 * `ChartMountGate` named export in `./ChartMountGate.tsx` or use `ClientOnly`.
 */
export default function ChartWrapper({
    children,
    height = "h-64 md:h-80 lg:h-96",
}: ChartWrapperProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Standard SSR mount-gate. The state flip is intentional and required
        // to swap from skeleton fallback to the actual chart on hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div
                aria-hidden="true"
                className={`w-full rounded-lg animate-pulse bg-[#1A2A3A] ${height}`}
            />
        );
    }

    return (
        <div className={`w-full ${height}`}>
            <ResponsiveContainer width="100%" height="100%">
                {/* Recharts' generic types collide with React.ReactNode here.
                    Cast is safe because consumers pass a single chart element. */}
                {children as React.ReactElement}
            </ResponsiveContainer>
        </div>
    );
}
