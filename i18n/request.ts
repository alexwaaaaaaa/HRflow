import { getRequestConfig } from "next-intl/server";
import { resolveLocale } from "@/lib/i18n/request";

/**
 * next-intl server-side config. Loaded by `next-intl/plugin` which
 * registers it via `next.config.ts`. For each request, returns the
 * resolved locale + the corresponding messages bundle.
 *
 * Translation files live in `messages/<locale>.json`. Adding a new locale:
 *   1. Add the code to `LOCALES` in `lib/i18n/config.ts`.
 *   2. Drop `messages/<locale>.json`.
 *   3. No code changes here — `import()` resolves at runtime.
 */
export default getRequestConfig(async () => {
    const locale = await resolveLocale();
    const messages = (
        await import(`@/messages/${locale}.json`)
    ).default;
    return { locale, messages };
});
