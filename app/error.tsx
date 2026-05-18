"use client";

import RouteError from "@/components/error/RouteError";

/**
 * Root-level error boundary — catches anything bubbling up past the
 * route-group boundaries. Should rarely render in production but acts as
 * the last line of defence.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <RouteError error={error} reset={reset} homeHref="/dashboard" />;
}
