/**
 * HRflow HTTP client — minimal, dependency-free wrapper around `fetch`.
 *
 * Why this exists:
 *   The 1,098 page UI prototype currently inlines every dataset as a `const
 *   data = [...]` array. When the backend lands, every page will need to read
 *   from a real API. Centralising fetch logic in one place means:
 *     - one place to handle auth headers, session refresh, error envelopes
 *     - one place to swap mock <-> live mode
 *     - typed responses via Zod (when callers provide a schema)
 *
 * Usage:
 *   const employees = await api.get<Employee[]>("/v1/employees");
 *   const created   = await api.post<Employee>("/v1/employees", payload);
 *
 *   // With Zod validation:
 *   const me = await api.get("/v1/me", { schema: MeSchema });
 */

import type { z } from "zod";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "";

export class ApiError extends Error {
    constructor(
        public status: number,
        public code: string,
        message: string,
        public details?: unknown
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export interface RequestOptions<T> {
    /** Optional Zod schema — response is parsed and validated when provided. */
    schema?: z.ZodType<T>;
    /** Extra headers; merged with defaults (Content-Type, auth). */
    headers?: Record<string, string>;
    /** AbortSignal for cancellation (e.g. React Query). */
    signal?: AbortSignal;
    /** Override base URL (rare — useful for third-party endpoints). */
    baseUrl?: string;
}

async function request<T>(
    method: string,
    path: string,
    body: unknown,
    opts: RequestOptions<T> = {}
): Promise<T> {
    const url = `${opts.baseUrl ?? BASE_URL}${path}`;
    const headers: Record<string, string> = {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...opts.headers,
    };

    let response: Response;
    try {
        response = await fetch(url, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            credentials: "include", // send session cookie
            signal: opts.signal,
        });
    } catch (cause) {
        // Network error — distinguish from HTTP errors
        throw new ApiError(0, "NETWORK_ERROR", "Network request failed", cause);
    }

    const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
    const payload = isJson ? await response.json().catch(() => null) : null;

    if (!response.ok) {
        const code =
            (payload as { code?: string } | null)?.code ?? `HTTP_${response.status}`;
        const message =
            (payload as { message?: string } | null)?.message ?? response.statusText;
        throw new ApiError(response.status, code, message, payload);
    }

    if (opts.schema) {
        const result = opts.schema.safeParse(payload);
        if (!result.success) {
            throw new ApiError(
                response.status,
                "SCHEMA_MISMATCH",
                "Response did not match expected schema",
                result.error.issues
            );
        }
        return result.data;
    }

    return payload as T;
}

export const api = {
    get: <T>(path: string, opts?: RequestOptions<T>) =>
        request<T>("GET", path, undefined, opts),
    post: <T>(path: string, body?: unknown, opts?: RequestOptions<T>) =>
        request<T>("POST", path, body, opts),
    put: <T>(path: string, body?: unknown, opts?: RequestOptions<T>) =>
        request<T>("PUT", path, body, opts),
    patch: <T>(path: string, body?: unknown, opts?: RequestOptions<T>) =>
        request<T>("PATCH", path, body, opts),
    delete: <T>(path: string, opts?: RequestOptions<T>) =>
        request<T>("DELETE", path, undefined, opts),
};

export type Api = typeof api;
