"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { makeQueryClient } from "@/lib/query/client";

/**
 * Wraps the app in a TanStack Query provider.
 *
 * The QueryClient is held in `useState` so it survives Fast Refresh and
 * isn't reconstructed on every render. We deliberately do NOT memoise it
 * across the server/client boundary — the server should produce a fresh
 * client per request, and the client just needs one stable instance.
 *
 * Devtools are conditionally mounted only in development.
 */
export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [client] = useState<QueryClient>(() => makeQueryClient());

    return (
        <QueryClientProvider client={client}>
            {children}
            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
            )}
        </QueryClientProvider>
    );
}
