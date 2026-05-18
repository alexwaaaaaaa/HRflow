"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home, HeadphonesIcon } from "lucide-react";
import { captureException } from "@/lib/observability";

interface RouteErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
    /** Where the "Go home" link should send the user. */
    homeHref?: string;
}

/**
 * Shared route-level error UI used by every `error.tsx` boundary.
 *
 * Responsibilities:
 *   - Surface the error to the user with a recovery affordance (`reset()`).
 *   - Log to the observability sink via `captureException`.
 *   - Show the digest in production so support can correlate logs.
 */
export default function RouteError({ error, reset, homeHref = "/dashboard" }: RouteErrorProps) {
    useEffect(() => {
        captureException(error, { source: "route-error", digest: error.digest });
    }, [error]);

    return (
        <div
            role="alert"
            className="flex min-h-[60vh] items-center justify-center px-6 py-12"
        >
            <div className="w-full max-w-md rounded-2xl border border-[#1A2A3A] bg-[#0D1928] p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(239,68,68,0.1)]">
                    <AlertTriangle className="h-6 w-6 text-[#ef4444]" aria-hidden="true" />
                </div>
                <h1 className="text-xl font-semibold text-white">Something went wrong</h1>
                <p className="mt-2 text-sm text-[#7a8fa6]">
                    An unexpected error occurred while loading this page. Try again, or
                    return to your dashboard. If the problem persists, contact support
                    with the reference below.
                </p>

                {error.digest && (
                    <p className="mt-4 rounded-lg bg-[#04080f] px-3 py-2 font-mono text-xs text-[#3d5166]">
                        ref:{" "}
                        <span className="text-[#7a8fa6]" data-testid="error-digest">
                            {error.digest}
                        </span>
                    </p>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#00e5a0] px-4 text-sm font-semibold text-[#04080f] transition-colors hover:bg-[#00cc8e]"
                    >
                        <RefreshCcw className="h-4 w-4" aria-hidden="true" /> Try again
                    </button>
                    <Link
                        href={homeHref}
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#1A2A3A] bg-[#0f1c2e] px-4 text-sm text-[#c8d8e8] transition-colors hover:border-[#1e3048] hover:text-white"
                    >
                        <Home className="h-4 w-4" aria-hidden="true" /> Go to dashboard
                    </Link>
                    <Link
                        href="/helpdesk/raise"
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#1A2A3A] px-4 text-sm text-[#7a8fa6] transition-colors hover:text-white"
                    >
                        <HeadphonesIcon className="h-4 w-4" aria-hidden="true" /> Contact
                        support
                    </Link>
                </div>
            </div>
        </div>
    );
}
