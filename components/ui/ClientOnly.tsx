"use client";
import { useEffect, useState, ReactNode } from "react";

/**
 * Renders children only on the client-side, preventing SSR hydration of
 * components that require a DOM (like Recharts) and causing -1 dimension warnings.
 */
export default function ClientOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return <>{fallback ?? null}</>;
    return <>{children}</>;
}
