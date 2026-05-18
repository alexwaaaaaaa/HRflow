import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

const COOKIE_NAME = "hrflow_locale";

/**
 * Resolve the active locale for an incoming request.
 *
 * Priority:
 *   1. `hrflow_locale` cookie (user-selected from a switcher)
 *   2. `Accept-Language` header (browser preference)
 *   3. `DEFAULT_LOCALE`
 *
 * Server components can call this; client components should use
 * `useLocale()` from next-intl which reads the same cookie.
 */
export async function resolveLocale(): Promise<Locale> {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get(COOKIE_NAME)?.value;
    if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

    const headerStore = await headers();
    const accept = headerStore.get("accept-language") ?? "";
    const first = accept.split(",")[0]?.split("-")[0]?.trim();
    if (first && isLocale(first)) return first;

    return DEFAULT_LOCALE;
}

export const LOCALE_COOKIE = COOKIE_NAME;
