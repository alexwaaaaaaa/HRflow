"use client";

import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value`. Useful for search inputs that hit
 * the API — bind directly to the input and pass the returned value to
 * `useQuery` / `useEffect`.
 *
 * @example
 *   const [q, setQ] = useState("");
 *   const debouncedQ = useDebouncedValue(q, 300);
 *   const { data } = useQuery({ queryKey: ["search", debouncedQ], ... });
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(t);
    }, [value, delayMs]);

    return debounced;
}
