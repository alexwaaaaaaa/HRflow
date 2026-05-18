import { test, expect } from "@playwright/test";

/**
 * Critical user flow: Apply for leave.
 *
 * Verifies the multi-step form on `/my-leave/apply`:
 *   - Step 1 fields render and validate
 *   - Stepper advances when required fields are filled
 *   - Step 3 review surfaces the entered values
 *   - Submit shows the success toast
 */

test.describe("Apply for leave", () => {
    test("happy path: fill step 1 → review → submit shows success", async ({ page }) => {
        // Demo session — login form is mocked.
        await page.goto("/login");
        await page.getByLabel(/work email/i).fill("priya@techcorp.com");
        await page.getByLabel(/^password$/i).fill("password123");
        await page.getByRole("button", { name: /^sign in$/i }).click();
        await page.waitForURL(/\/dashboard/);

        await page.goto("/my-leave/apply");
        await expect(page.getByRole("heading", { name: /apply for leave/i })).toBeVisible();

        // Step 1: leave details
        await page.getByLabel(/leave type/i).selectOption({ index: 0 });
        await page.getByLabel(/reason for leave/i).fill("Family function — outstation travel");
        await page.getByRole("button", { name: /^continue$/i }).click();

        // Step 2: documents (privilege leave doesn't require proof)
        await expect(page.getByText(/no document required/i)).toBeVisible();
        await page.getByRole("button", { name: /^review$/i }).click();

        // Step 3: review
        await expect(page.getByRole("heading", { name: /review.*confirm/i })).toBeVisible();
        await expect(page.getByText(/family function/i)).toBeVisible();

        // Submit
        await page.getByRole("button", { name: /submit application/i }).click();
        await expect(page.getByText(/leave applied/i)).toBeVisible({ timeout: 5000 });
    });

    test("step 1 disables continue when reason is too short", async ({ page }) => {
        await page.goto("/login");
        await page.getByLabel(/work email/i).fill("priya@techcorp.com");
        await page.getByLabel(/^password$/i).fill("password123");
        await page.getByRole("button", { name: /^sign in$/i }).click();
        await page.waitForURL(/\/dashboard/);

        await page.goto("/my-leave/apply");
        await page.getByLabel(/reason for leave/i).fill("hi");
        await expect(page.getByRole("button", { name: /^continue$/i })).toBeDisabled();
    });
});
