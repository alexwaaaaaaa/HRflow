"use client";

import RouteError from "@/components/error/RouteError";

export default function AppError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <RouteError error={error} reset={reset} homeHref="/dashboard" />;
}
