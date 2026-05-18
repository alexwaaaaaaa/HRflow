import { NextResponse } from "next/server";

/**
 * Liveness probe. Returns 200 with a small JSON envelope so reverse
 * proxies and uptime monitors can confirm the app is running. Keep it
 * cheap — no DB calls, no external lookups. A separate `/api/ready`
 * route should later perform the readiness probe (DB ping, Redis ping).
 */
export const dynamic = "force-static";
export const runtime = "nodejs";

export function GET() {
    return NextResponse.json(
        {
            status: "ok",
            service: "hrflow-frontend",
            version: process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0",
            timestamp: new Date().toISOString(),
        },
        {
            status: 200,
            headers: {
                "Cache-Control": "no-store, max-age=0",
                "Content-Type": "application/json",
            },
        }
    );
}
