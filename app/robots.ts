import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://hrflow.example.com";
    return {
        rules: [
            {
                userAgent: "*",
                disallow: [
                    "/api/",
                    "/(app)/",
                    "/(dashboard)/",
                    "/(setup)/",
                    "/super-admin/",
                ],
                allow: ["/login", "/forgot-password", "/help", "/candidate"],
            },
        ],
        sitemap: `${base}/sitemap.xml`,
        host: base,
    };
}
