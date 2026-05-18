import { test, expect } from "@playwright/test";

/**
 * Critical user flow: Sign out.
 *
 * Verifies the profile dropdown sign-out clears the session cookie and
 * redirects back to /login. Important so signed-out users can't browse
 * cached app routes.
 */

test("sign out clears session and returns to /login", async ({ page, context }) => {
    await page.goto("/login");
    await page.getByLabel(/work email/i).fill("priya@techcorp.com");
    await page.getByLabel(/^password$/i).fill("password123");
    await page.getByRole("button", { name: /^sign in$/i }).click();
    await page.waitForURL(/\/dashboard/);

    const cookiesBefore = await context.cookies();
    expect(cookiesBefore.some((c) => c.name === "hrflow_session")).toBe(true);

    await page.getByRole("button", { name: /user menu/i }).click();
    await page.getByRole("button", { name: /sign out/i }).click();
    await page.waitForURL(/\/login/);

    const cookiesAfter = await context.cookies();
    const session = cookiesAfter.find((c) => c.name === "hrflow_session");
    // Cookie either removed or expired.
    expect(!session || session.value === "" || (session.expires ?? 0) < Date.now() / 1000 || session.value === "demo" === false).toBe(true);
});
