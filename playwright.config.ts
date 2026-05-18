import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for HRflow E2E tests.
 *
 * Run locally:        npx playwright test
 * Run a single file:  npx playwright test e2e/login.spec.ts
 * Run with UI:        npx playwright test --ui
 *
 * Cross-browser + mobile coverage so we catch regressions on the surfaces
 * Indian HRMS users actually live on (Chrome desktop, Safari iPhone, Chrome
 * Android).
 */

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: process.env.CI ? "github" : [["list"], ["html", { open: "never" }]],
    timeout: 30_000,

    use: {
        baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3000",
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "mobile-chrome",
            use: { ...devices["Pixel 7"] },
        },
        {
            name: "mobile-safari",
            use: { ...devices["iPhone 14"] },
        },
    ],

    webServer: {
        command: "npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
