import type { MetadataRoute } from "next";

/**
 * Sitemap covers ONLY public-facing routes. Authenticated app routes are
 * intentionally excluded — they require a session and shouldn't be
 * crawled.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://hrflow.example.com";
    const now = new Date();

    return [
        { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${base}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/forgot-password`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
        { url: `${base}/help`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
        { url: `${base}/candidate/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
        { url: `${base}/candidate/apply`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    ];
}
