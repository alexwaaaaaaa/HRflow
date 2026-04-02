"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

interface ChartWrapperProps {
    children: React.ReactNode;
    height?: number | string;
    width?: number | string;
}

/**
 * ChartWrapper — renders children only on the client side.
 * Prevents recharts width(-1)/height(-1) SSR errors during static build.
 */
export function ChartWrapper({ children, height = "100%", width = "100%" }: ChartWrapperProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ width, height: typeof height === "number" ? height : undefined, minHeight: typeof height === "number" ? height : 200 }} />;
    }

    return <>{children}</>;
}
