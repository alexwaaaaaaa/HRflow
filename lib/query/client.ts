import { QueryClient, type DefaultOptions } from "@tanstack/react-query";

/**
 * Centralised TanStack Query defaults.
 *
 * Tuned for HRflow's read patterns:
 *   - HR data changes infrequently (employees, payroll components, policies).
 *   - Operational data needs near-real-time freshness (attendance, approvals).
 *
 * Per-query overrides (via `useQuery({ staleTime, refetchInterval, … })`)
 * should still be used in those operational pages.
 */
export const defaultQueryOptions = {
    queries: {
        // Treat data as fresh for 30s by default — covers form-roundtrips,
        // tab focus, etc., without hammering the API.
        staleTime: 30_000,
        // Keep cached results for 5 minutes so back-navigation feels instant.
        gcTime: 5 * 60_000,
        // Network resilience without thundering-herd retries.
        retry: (failureCount, error) => {
            if (
                typeof error === "object" &&
                error !== null &&
                "status" in error &&
                typeof (error as { status: unknown }).status === "number"
            ) {
                const status = (error as { status: number }).status;
                // Don't retry on auth / not-found / validation errors.
                if (status === 401 || status === 403 || status === 404 || status === 422) {
                    return false;
                }
            }
            return failureCount < 2;
        },
        refetchOnWindowFocus: false,
    },
    mutations: {
        retry: 0,
    },
} satisfies DefaultOptions;

/**
 * Factory used by both server and client to build a fresh QueryClient
 * per-request (server) or per-app-instance (client).
 *
 * Server-side: creating per-request prevents leaking caches between users.
 * Client-side: a single instance is fine for the lifetime of the tab.
 */
export function makeQueryClient() {
    return new QueryClient({ defaultOptions: defaultQueryOptions });
}
