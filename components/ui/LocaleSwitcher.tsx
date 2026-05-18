"use client";

import { useState, useTransition } from "react";
import { Globe } from "lucide-react";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/config";

const COOKIE_NAME = "hrflow_locale";

/**
 * Locale switcher — sets the `hrflow_locale` cookie + reloads the page so
 * server components re-render with the new translations. Designed to live
 * inside the user profile dropdown / settings page.
 *
 * For now this is a controlled React component without route-level locale
 * routing (e.g. `/[locale]/dashboard`) — keeps the existing 1,098-route
 * URL space intact. When the team is ready, we can add a `[locale]` group
 * for SEO-friendly localised URLs.
 */
export default function LocaleSwitcher({ initialLocale }: { initialLocale: Locale }) {
    const [locale, setLocale] = useState<Locale>(initialLocale);
    const [isPending, startTransition] = useTransition();

    const handleChange = (next: Locale) => {
        if (next === locale) return;
        setLocale(next);
        // 1-year cookie; SameSite=Lax so it travels on top-level navigations.
        const oneYear = 60 * 60 * 24 * 365;
        document.cookie = `${COOKIE_NAME}=${next}; Path=/; Max-Age=${oneYear}; SameSite=Lax`;
        startTransition(() => {
            // Hard reload so server components pick up the new locale.
            window.location.reload();
        });
    };

    return (
        <div className="inline-flex items-center gap-2">
            <Globe size={14} className="text-[#7a8fa6]" aria-hidden="true" />
            <label htmlFor="locale-switch" className="sr-only">
                Choose language
            </label>
            <select
                id="locale-switch"
                value={locale}
                onChange={(e) => handleChange(e.target.value as Locale)}
                disabled={isPending}
                className="rounded-md border border-[#1A2A3A] bg-[#0D1928] px-2 py-1 text-xs text-[#c8d8e8] outline-none transition-colors hover:border-[#1e3048] focus:border-[#00e5a0] disabled:opacity-50"
            >
                {LOCALES.map((l) => (
                    <option key={l} value={l}>
                        {LOCALE_LABELS[l]}
                    </option>
                ))}
            </select>
        </div>
    );
}
