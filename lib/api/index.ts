/**
 * Public surface of the HRflow API layer.
 *
 * Pages should import from `@/lib/api` (this file), never from individual
 * modules. That gives us one place to swap mock <-> live mode and to evolve
 * the client without rippling changes across the app.
 *
 * Future structure:
 *   lib/api/
 *     client.ts       <- low-level fetch wrapper
 *     index.ts        <- this barrel (public surface)
 *     resources/
 *       employees.ts  <- domain-specific helpers (typed)
 *       payroll.ts
 *       ...
 *     schemas/
 *       employee.ts   <- Zod schemas shared between client + server
 */

export { api, ApiError } from "./client";
export type { Api, RequestOptions } from "./client";
export * from "./resources";
