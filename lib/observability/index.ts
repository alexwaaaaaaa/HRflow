/**
 * Single observability surface — Sentry + PostHog.
 *
 * Wraps both SDKs so the rest of the codebase imports from one place.
 * Both SDKs activate **only when their DSN/key env vars are set**, so the
 * codebase ships safely without third-party calls leaking in dev.
 *
 * Env vars (all optional):
 *   NEXT_PUBLIC_SENTRY_DSN          — enables Sentry browser SDK
 *   NEXT_PUBLIC_POSTHOG_KEY         — enables PostHog browser SDK
 *   NEXT_PUBLIC_POSTHOG_HOST        — defaults to https://us.posthog.com
 *
 * Usage from anywhere in the app:
 *   captureException(err, { userId, route });
 *   trackEvent("payroll_run_started", { runId });
 *   identify(userId, { email, role });
 */

import posthog from "posthog-js";
import * as Sentry from "@sentry/nextjs";

interface ErrorContext {
    [key: string]: unknown;
}

const isProd = process.env.NODE_ENV === "production";
const isBrowser = typeof window !== "undefined";

// ─────────────────────────────────────────────────────────────────────────────
// Initialisation
// ─────────────────────────────────────────────────────────────────────────────

let initialised = false;

/**
 * Idempotent — safe to call multiple times. Reads env at runtime so dev
 * builds with empty env vars cleanly skip third-party initialisation.
 */
export function initObservability(): void {
    if (initialised || !isBrowser) return;
    initialised = true;

    const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (sentryDsn) {
        Sentry.init({
            dsn: sentryDsn,
            environment: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
            release: process.env.NEXT_PUBLIC_APP_VERSION,
            // Tracing disabled by default — opt in via env when needed.
            tracesSampleRate: 0,
            // Replay disabled by default; enable for paid plans.
            replaysSessionSampleRate: 0,
            replaysOnErrorSampleRate: 0,
        });
    }

    const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (phKey) {
        posthog.init(phKey, {
            api_host:
                process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.posthog.com",
            person_profiles: "identified_only",
            capture_pageview: true,
            capture_pageleave: true,
            autocapture: false,
            disable_session_recording: !isProd,
        });
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public surface
// ─────────────────────────────────────────────────────────────────────────────

export function captureException(error: unknown, context?: ErrorContext): void {
    if (!isProd) {
        console.error("[observability] error", error, context);
    }
    if (initialised && process.env.NEXT_PUBLIC_SENTRY_DSN) {
        Sentry.captureException(error, { extra: context });
    }
}

export function captureMessage(
    message: string,
    level: "info" | "warning" | "error" = "info",
    context?: ErrorContext
): void {
    if (!isProd) {
        console.log(`[observability] ${level}`, message, context);
    }
    if (initialised && process.env.NEXT_PUBLIC_SENTRY_DSN) {
        Sentry.captureMessage(message, { level, extra: context });
    }
}

export function trackEvent(
    name: string,
    properties?: Record<string, unknown>
): void {
    if (!isProd) {
        console.log(`[observability] event`, name, properties);
    }
    if (initialised && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.capture(name, properties);
    }
}

export function identify(
    userId: string,
    traits?: Record<string, unknown>
): void {
    if (!initialised || !isBrowser) return;
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.identify(userId, traits);
    }
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
        Sentry.setUser({
            id: userId,
            email: traits?.email as string | undefined,
            username: traits?.username as string | undefined,
        });
    }
}

export function resetIdentity(): void {
    if (!initialised || !isBrowser) return;
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) posthog.reset();
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) Sentry.setUser(null);
}
