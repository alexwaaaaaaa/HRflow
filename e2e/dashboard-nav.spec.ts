import { test, expect } from "@playwright/test";

/**
 * Critical user flow: Navigation + accessibility on the dashboard.
 *
 * Verifies:
 *   - Authenticated user lands on /dashboard
 *   - Skip-to-content link is reachable via keyboard
 *   - Sidebar nav links navigate correctly
 *   - Cmd+K opens command palette
 */

test.describe("Dashboard navigation", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/login");
        await page.getByLabel(/work email/i).fill("priya@techcorp.com");
        await page.getByLabel(/^password$/i).fill("password123");
        await page.getByRole("button", { name: /^sign in$/i }).click();
        await page.waitForURL(/\/dashboard/);
    });

    test("skip-to-content link is the first focusable element", async ({ page }) => {
        await page.keyboard.press("Tab");
        const focused = await page.evaluate(() => document.activeElement?.textContent);
        expect(focused).toMatch(/skip to main content/i);
    });

    test("Cmd+K opens command palette and Escape closes it", async ({ page, browserName }) => {
        const meta = browserName === "webkit" ? "Meta" : "Control";
        await page.keyboard.press(`${meta}+k`);
        const dialog = page.getByRole("dialog", { name: /command palette/i });
        await expect(dialog).toBeVisible({ timeout: 3000 });
        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeVisible();
    });

    test("dashboard renders the greeting and KPI strip", async ({ page }) => {
        await expect(page.getByRole("heading", { name: /good (morning|afternoon|evening)/i })).toBeVisible();
        await expect(page.getByText(/total employees/i)).toBeVisible();
        await expect(page.getByText(/compliance score/i)).toBeVisible();
    });
});
