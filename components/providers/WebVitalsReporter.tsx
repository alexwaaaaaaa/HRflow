"use client";

import { useEffect } from "react";
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";
import { trackEvent } from "@/lib/observability";

/**
 * Reports Core Web Vitals to the observability layer.
 *
 * Metrics captured:
 *   - LCP   Largest Contentful Paint (perceived load)
 *   - CLS   Cumulative Layout Shift  (visual stability)
 *   - INP   Interaction to Next Paint (responsiveness — replaces FID)
 *   - FCP   First Contentful Paint
 *   - TTFB  Time to First Byte
 *
 * Each metric is forwarded via `trackEvent` so when the analytics SDK is
 * wired (PostHog / GA4 / DataDog RUM), the data flows automatically without
 * touching this file.
 *
 * Mounted once at the root via `Providers`.
 */
export default function WebVitalsReporter() {
    useEffect(() => {
        const send = (m: Metric) => {
            trackEvent("web_vital", {
                name: m.name,
                value: m.value,
                rating: m.rating,
                id: m.id,
                navigationType: m.navigationType,
                delta: m.delta,
            });
        };
        onCLS(send);
        onINP(send);
        onLCP(send);
        onFCP(send);
        onTTFB(send);
    }, []);
    return null;
}
