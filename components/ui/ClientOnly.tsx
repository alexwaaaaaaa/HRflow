"use client";
import { useEffect, useState, ReactNode } from "react";

/**
 * Renders children only on the client-side, preventing SSR hydration of
 * components that require a DOM (like Recharts) and causing -1 dimension warnings.
 */
export default function ClientOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // Standard SSR mount-gate; setting state in this effect is intentional
        // because we MUST re-render after hydration to swap fallback → children.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);
    if (!mounted) return <>{fallback ?? null}</>;
    return <>{children}</>;
}
