"use client";

import React, { useEffect, useState } from "react";

interface ChartMountGateProps {
    children: React.ReactNode;
    height?: number | string;
    width?: number | string;
}

/**
 * Mount-gate for Recharts charts that already provide their own sizing.
 *
 * Renamed from the previous `ChartWrapper` named export (in
 * `chart-wrapper.tsx`) to eliminate filename casing-collision risk on
 * case-insensitive filesystems (macOS) versus the default-exported
 * `ChartWrapper` in `./ChartWrapper.tsx`.
 *
 * **When to use which:**
 *  - `ChartWrapper` (default export, `./ChartWrapper.tsx`): mount-gate **plus**
 *    a sized `ResponsiveContainer`. Use when your `<BarChart />` is the direct
 *    child.
 *  - `ChartMountGate` (named export, this file): mount-gate **only**. Use when
 *    you already render a `ResponsiveContainer` (or set explicit
 *    `width`/`height`) inside.
 *
 * Distinct filenames + distinct exports means imports can never collide on any
 * filesystem.
 */
export function ChartMountGate({
    children,
    height = "100%",
    width = "100%",
}: ChartMountGateProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // SSR mount-gate. State must flip after hydration to render children.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div
                aria-hidden="true"
                style={{
                    width,
                    height: typeof height === "number" ? height : undefined,
                    minHeight: typeof height === "number" ? height : 200,
                }}
            />
        );
    }

    return <>{children}</>;
}

/**
 * Backwards-compat alias for the old named export. Deprecated — use
 * `ChartMountGate` directly. Will be removed once all callers migrate.
 *
 * @deprecated Use `ChartMountGate` instead.
 */
export const ChartWrapper = ChartMountGate;
