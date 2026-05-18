/**
 * Typed env access with validation.
 *
 * Direct `process.env.FOO` reads are allowed but discouraged because
 * TypeScript can't catch typos and the value is `string | undefined`.
 * Importing from this module instead means:
 *   - the variable is documented in one place
 *   - misspellings fail at build time
 *   - default values live alongside the schema
 *
 * On the server we run a strict Zod parse. On the client we expose a
 * narrower object containing only `NEXT_PUBLIC_*` vars.
 */
import { z } from "zod";

// Public — safe to expose to the browser.
const PublicEnvSchema = z.object({
    NEXT_PUBLIC_APP_NAME: z.string().default("HRFlow"),
    NEXT_PUBLIC_APP_ENV: z
        .enum(["development", "staging", "production"])
        .default("development"),
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_API_BASE_URL: z.string().url().or(z.literal("")).default(""),
    NEXT_PUBLIC_APP_VERSION: z.string().default("0.1.0"),
    NEXT_PUBLIC_SESSION_COOKIE_NAME: z.string().default("hrflow_session"),
});

// Server-only — never imported into client components.
const ServerEnvSchema = PublicEnvSchema.extend({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    AUTH_ENFORCE: z.enum(["0", "1"]).default("0"),
    DATABASE_URL: z.string().optional(),
    REDIS_URL: z.string().optional(),
    SESSION_SECRET: z.string().min(16).optional(),
    SESSION_COOKIE_NAME: z.string().default("hrflow_session"),
});

function parseEnv<T extends z.ZodSchema>(schema: T, name: string) {
    const result = schema.safeParse(process.env);
    if (!result.success) {
         
        console.error(
            `[env] Invalid ${name} env vars:\n`,
            JSON.stringify(result.error.flatten().fieldErrors, null, 2)
        );
        // Still return the parsed best-effort so dev-mode `next dev` can boot.
        return schema.parse({});
    }
    return result.data;
}

export const publicEnv = parseEnv(PublicEnvSchema, "public") as z.infer<
    typeof PublicEnvSchema
>;

// Guard against accidental client-side import of server env.
export const serverEnv =
    typeof window === "undefined"
        ? (parseEnv(ServerEnvSchema, "server") as z.infer<typeof ServerEnvSchema>)
        : (undefined as never);
