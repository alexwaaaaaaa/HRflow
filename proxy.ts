import { NextResponse, type NextRequest } from "next/server";

/**
 * HRflow auth proxy (Next.js 16.2+).
 *
 * Renamed from `middleware` per the new convention:
 *   - File:           middleware.ts → proxy.ts
 *   - Function name:  export function middleware → export function proxy
 *
 * Protects authenticated routes by checking for the session cookie. Designed
 * to be **opt-in via env flag** so the static UI demo can keep running until
 * a backend is wired in:
 *
 *   AUTH_ENFORCE=1   → enforce login redirects (production / staging)
 *   AUTH_ENFORCE=0   → no-op pass-through (current dev / demo state)
 *
 * Protected paths:
 *   - Anything under `/(app)` and `/(dashboard)` route groups
 *   - Excludes `/(auth)` and `/(setup)` so users can sign in / onboard
 */

const PUBLIC_PREFIXES = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/verify-otp",
    "/verify-2fa",
    "/setup-2fa",
    "/magic-link",
    "/sso",
    "/account-locked",
    "/session-expired",
    "/active-sessions",
    "/login-history",
    "/first-login",
    // Setup wizard — accessible without an authenticated session
    "/welcome",
    "/company-details",
    "/company-tax",
    "/branding",
    "/departments",
    "/designations",
    "/statutory",
    "/bank-account",
    "/setup-payroll",
    "/invite-team",
    "/data-retention",
    "/locale",
    "/complete",
    // Public candidate-facing portal
    "/candidate",
];

const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME || "hrflow_session";

function isPublicPath(pathname: string): boolean {
    if (pathname === "/") return true;
    return PUBLIC_PREFIXES.some(
        (p) => pathname === p || pathname.startsWith(`${p}/`)
    );
}

export function proxy(request: NextRequest) {
    // Feature-flagged: skip the entire check during prototype demos.
    if (process.env.AUTH_ENFORCE !== "1") {
        return NextResponse.next();
    }

    const { pathname, search } = request.nextUrl;

    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    const session = request.cookies.get(SESSION_COOKIE);
    if (session?.value) {
        return NextResponse.next();
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    // Preserve the original destination so the post-login redirect can return.
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static  (static files)
         * - _next/image   (image optimisation)
         * - favicon.ico   (favicon)
         * - any file with an extension (.svg, .png, .jpg, etc.)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
    ],
};
