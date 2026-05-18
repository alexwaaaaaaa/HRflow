/**
 * Session helpers — placeholder until the real auth backend lands.
 *
 * The middleware checks `cookies.get(SESSION_COOKIE)` so any flow that wants
 * to simulate a logged-in state (e.g. the LoginForm in demo mode) can call
 * `setDemoSession()` to drop a non-secret marker cookie.
 *
 * In production:
 *   - The backend issues a signed JWT / opaque session ID via Set-Cookie
 *     (HttpOnly, Secure, SameSite=Lax).
 *   - The frontend never reads the cookie value — middleware just checks
 *     presence; protected pages call `/v1/me` to load the user.
 */

export const SESSION_COOKIE_NAME =
    typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ?? "hrflow_session"
        : "hrflow_session";

/**
 * Set a non-sensitive marker cookie so middleware lets the user through.
 * For prototype use only — real sessions are issued by the backend.
 */
export function setDemoSession(): void {
    if (typeof document === "undefined") return;
    const thirtyDays = 60 * 60 * 24 * 30;
    document.cookie = `${SESSION_COOKIE_NAME}=demo; Path=/; Max-Age=${thirtyDays}; SameSite=Lax`;
}

/**
 * Clear the session cookie (sign out). Real backends should also invalidate
 * the server-side session; this helper just clears the browser side.
 */
export function clearSession(): void {
    if (typeof document === "undefined") return;
    document.cookie = `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}
