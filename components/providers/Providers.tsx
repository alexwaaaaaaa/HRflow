"use client";

import { ToastProvider } from "@/components/ui/Toast";
import QueryProvider from "./QueryProvider";
import WebVitalsReporter from "./WebVitalsReporter";
import ObservabilityBootstrap from "./ObservabilityBootstrap";

/**
 * Single client-side provider tree.
 *
 * Order:
 *   ObservabilityBootstrap (init Sentry/PostHog before anything else)
 *   QueryProvider          <- network state
 *     ToastProvider        <- notifications (consumed by mutation onError handlers)
 *
 * `WebVitalsReporter` is a side-effect-only component (returns null) that
 * captures Core Web Vitals once on mount.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ObservabilityBootstrap />
            <QueryProvider>
                <ToastProvider>
                    <WebVitalsReporter />
                    {children}
                </ToastProvider>
            </QueryProvider>
        </>
    );
}
