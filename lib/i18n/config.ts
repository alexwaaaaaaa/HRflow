/**
 * Internationalisation configuration.
 *
 * Indian HRMS context: English is the default for admin / HR users; Hindi
 * is the most-requested second locale; further regional locales (Marathi,
 * Tamil, Telugu, Bengali, Gujarati) can be added by:
 *   1. Append the locale code to `LOCALES`.
 *   2. Drop a `messages/<locale>.json` file with translated keys.
 *
 * The default locale is English so any missing translation falls back
 * gracefully — no broken UI for new locales.
 */

export const LOCALES = ["en", "hi"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
    en: "English",
    hi: "हिन्दी",
};

export const LOCALE_DIRECTIONS: Record<Locale, "ltr" | "rtl"> = {
    en: "ltr",
    hi: "ltr",
};

export function isLocale(value: string): value is Locale {
    return (LOCALES as readonly string[]).includes(value);
}
