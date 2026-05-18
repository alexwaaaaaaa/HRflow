import { test, expect } from "@playwright/test";

/**
 * Critical user flow: Sign in.
 *
 * The login form is mocked (any valid email + 8-character password works
 * pre-backend), so this verifies the form contract, validation, and the
 * post-success redirect to /dashboard.
 */

test.describe("Login flow", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/login");
    });

    test("renders the login form with key affordances", async ({ page }) => {
        await expect(page).toHaveTitle(/Sign in.*HRFlow|HRFlow/i);
        await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
        await expect(page.getByLabel(/work email/i)).toBeVisible();
        await expect(page.getByLabel(/^password$/i)).toBeVisible();
        await expect(page.getByRole("button", { name: /^sign in$/i })).toBeVisible();
        await expect(page.getByRole("link", { name: /forgot password/i })).toBeVisible();
    });

    test("client-side validation blocks submission with bad input", async ({ page }) => {
        await page.getByLabel(/work email/i).fill("not-an-email");
        await page.getByLabel(/^password$/i).fill("short");
        await page.getByRole("button", { name: /^sign in$/i }).click();
        await expect(page.getByText(/please enter a valid email/i)).toBeVisible();
        await expect(page.getByText(/at least 8 characters/i)).toBeVisible();
    });

    test("successful sign-in redirects to /dashboard", async ({ page }) => {
        await page.getByLabel(/work email/i).fill("priya@techcorp.com");
        await page.getByLabel(/^password$/i).fill("password123");
        await page.getByRole("button", { name: /^sign in$/i }).click();
        await page.waitForURL(/\/dashboard$/, { timeout: 10_000 });
        await expect(page).toHaveURL(/\/dashboard/);
    });

    test("password visibility toggle reveals the field", async ({ page }) => {
        const pwField = page.getByLabel(/^password$/i);
        await pwField.fill("password123");
        await expect(pwField).toHaveAttribute("type", "password");
        await page.getByRole("button", { name: /show password/i }).click();
        await expect(pwField).toHaveAttribute("type", "text");
        await page.getByRole("button", { name: /hide password/i }).click();
        await expect(pwField).toHaveAttribute("type", "password");
    });

    test("safe redirect honours ?next= when same-origin", async ({ page }) => {
        await page.goto("/login?next=/employees");
        await page.getByLabel(/work email/i).fill("priya@techcorp.com");
        await page.getByLabel(/^password$/i).fill("password123");
        await page.getByRole("button", { name: /^sign in$/i }).click();
        await page.waitForURL(/\/employees$/, { timeout: 10_000 });
    });

    test("safe redirect ignores cross-origin ?next=", async ({ page }) => {
        await page.goto("/login?next=https%3A%2F%2Fevil.example.com%2Fphish");
        await page.getByLabel(/work email/i).fill("priya@techcorp.com");
        await page.getByLabel(/^password$/i).fill("password123");
        await page.getByRole("button", { name: /^sign in$/i }).click();
        await page.waitForURL(/\/dashboard$/, { timeout: 10_000 });
    });
});
