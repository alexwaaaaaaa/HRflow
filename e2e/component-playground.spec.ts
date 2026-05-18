import { test, expect } from "@playwright/test";

/**
 * Smoke test: the component playground at /_dev/components renders every
 * primitive without errors. Treats console.error as a test failure so
 * design-system regressions show up in CI.
 */

test("component playground renders cleanly", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/login");
    await page.getByLabel(/work email/i).fill("priya@techcorp.com");
    await page.getByLabel(/^password$/i).fill("password123");
    await page.getByRole("button", { name: /^sign in$/i }).click();
    await page.waitForURL(/\/dashboard/);

    await page.goto("/_dev/components");

    await expect(page.getByRole("heading", { name: /component playground/i })).toBeVisible();
    await expect(page.getByRole("region", { name: /buttons/i }).or(page.locator("section#buttons"))).toBeVisible();
    await expect(page.locator("section#badges")).toBeVisible();
    await expect(page.locator("section#inputs")).toBeVisible();
    await expect(page.locator("section#toggles")).toBeVisible();
    await expect(page.locator("section#toasts")).toBeVisible();
    await expect(page.locator("section#theme")).toBeVisible();

    // Trigger a toast to verify provider wiring.
    await page.getByRole("button", { name: /show success/i }).click();
    await expect(page.getByText(/saved/i).first()).toBeVisible();

    // Filter out third-party noise (e.g. dev-only React Query devtools).
    const meaningful = consoleErrors.filter(
        (e) => !/(devtools|hydration|extension)/i.test(e)
    );
    expect(meaningful).toEqual([]);
});
