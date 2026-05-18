import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * Strong default security headers. Apply to every route.
 *
 * Notes:
 *   - We deliberately do NOT set CSP here yet. CSP needs per-route nonces
 *     (Next 16 supports them) and inline-style allowances for our existing
 *     `style={{}}` usage. Add CSP once inline styles are migrated.
 *   - HSTS is only meaningful over HTTPS — production deploys should
 *     enable it. Kept out of dev to avoid breaking localhost tooling.
 */
const securityHeaders: { key: string; value: string }[] = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
    },
    { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,

    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            { protocol: "https", hostname: "ui-avatars.com" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "i.pravatar.cc" },
            { protocol: "https", hostname: "upload.wikimedia.org" },
        ],
    },

    experimental: {
        // Reduce bundled icon imports — only the lucide icons actually used
        // get bundled. Saves ~80kb on routes that import many icons.
        optimizePackageImports: ["lucide-react", "recharts", "date-fns"],
    },

    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
            {
                source: "/api/:path*",
                headers: [
                    ...securityHeaders,
                    { key: "Cache-Control", value: "no-store, max-age=0" },
                ],
            },
        ];
    },

    async redirects() {
        return [
            // --- Module Root Redirects ---
            { source: "/ai", destination: "/ai/smart-onboarding", permanent: false },
            { source: "/bgv", destination: "/bgv/dashboard", permanent: false },
            { source: "/compliance", destination: "/compliance/dashboard", permanent: false },
            { source: "/documents", destination: "/documents/repository", permanent: false },
            { source: "/engagement", destination: "/engagement/rr/dashboard", permanent: false },
            { source: "/feedback", destination: "/feedback/dashboard", permanent: false },
            { source: "/finance", destination: "/finance/dashboard", permanent: false },
            { source: "/fnf", destination: "/fnf/dashboard", permanent: false },
            { source: "/helpdesk", destination: "/helpdesk/dashboard", permanent: false },
            { source: "/hybrid", destination: "/hybrid/wfh/request", permanent: false },
            { source: "/it", destination: "/it/dashboard", permanent: false },
            { source: "/leave", destination: "/leave/dashboard", permanent: false },
            { source: "/lms", destination: "/lms/dashboard", permanent: false },
            { source: "/okr", destination: "/okr/dashboard", permanent: false },
            { source: "/onboarding", destination: "/onboarding/dashboard", permanent: false },
            { source: "/org-chart", destination: "/org-chart/tree", permanent: false },
            { source: "/performance", destination: "/performance/dashboard", permanent: false },
            { source: "/recruitment", destination: "/recruitment/dashboard", permanent: false },
            { source: "/reports", destination: "/reports/dashboard", permanent: false },
        ];
    },
};

export default withNextIntl(nextConfig);
