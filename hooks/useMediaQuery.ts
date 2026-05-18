"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * SSR-safe `matchMedia` hook.
 *
 * On the server we always return `false` to avoid hydration mismatch.
 * After mount we read the live media-query state and re-render whenever
 * it changes.
 *
 * @example
 *   const isMobile = useMediaQuery("(max-width: 768px)");
 */
export function useMediaQuery(query: string): boolean {
    // useSyncExternalStore is the correct primitive here — it tells React
    // we're subscribing to a browser API and avoids the stale-state race
    // that a useState/useEffect pair has on hydration.
    const subscribe = (callback: () => void) => {
        if (typeof window === "undefined") return () => {};
        const mql = window.matchMedia(query);
        mql.addEventListener("change", callback);
        return () => mql.removeEventListener("change", callback);
    };

    const getSnapshot = () => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(query).matches;
    };

    return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Convenience wrappers for common breakpoints. */
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () => useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const usePrefersReducedMotion = () =>
    useMediaQuery("(prefers-reduced-motion: reduce)");

/**
 * Legacy, useEffect-based variant kept for backwards compatibility with
 * code that doesn't yet use the React 18 sync external store API.
 */
export function useMediaQueryLegacy(query: string): boolean {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia(query);
        const onChange = () => setMatches(mql.matches);
        onChange();
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [query]);
    return matches;
}
