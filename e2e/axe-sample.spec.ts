/**
 * Axe-core sample scan — runs on a representative set of migrated pages
 * to identify serious/critical violations before the full scan.
 * Temporary file — delete after full scan.
 */

import fs from "node:fs";
import path from "node:path";

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Representative sample of migrated pages (one per key module)
const SAMPLE_ROUTES = [
  // Reference pages (gold standard)
  "/my-leave",
  "/my-leave/apply",
  "/my-profile",
  "/recruitment/candidates",
  "/recruitment/jobs",
  "/settings/users",
  "/compliance/dashboard",
  "/tax/declarations",
  "/reports/dashboard",
  "/onboarding/dashboard",
  // Other migrated modules
  "/attendance/dashboard",
  "/attendance/log",
  "/employees",
  "/leave/dashboard",
  "/leave/approvals",
  "/payroll/dashboard",
  "/payroll/payslips/bulk",
  "/performance/dashboard",
  "/okr/dashboard",
  "/lms/dashboard",
  "/feedback/dashboard",
  "/helpdesk/dashboard",
  "/reimbursements/dashboard",
  "/finance/dashboard",
  "/fnf/dashboard",
  "/multi-entity/dashboard",
  "/settings/page",
  "/settings/api-keys",
  "/settings/approval-matrix",
  "/settings/audit-log",
  "/ai/smart-onboarding",
  "/ai/attrition-risk",
  "/ai/nl-query",
  "/bgv/dashboard",
  "/hybrid/wfh/request",
  "/it/dashboard",
  "/super-admin/dashboard",
  "/notifications/dashboard",
  "/ess/payslips",
];

function pathToSlug(urlPath: string): string {
  return urlPath
    .replace(/^\//, "")
    .replace(/\//g, "__")
    .replace(/[[\]]/g, "_")
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "root";
}

function ensureReportDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

for (const routePath of SAMPLE_ROUTES) {
  test(`a11y — ${routePath}`, async ({ page }) => {
    await page.goto(routePath, { waitUntil: "domcontentloaded" });
    // Brief pause to allow client-side rendering to complete
    await page.waitForTimeout(1000);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const reportDir = path.join(__dirname, "..", "playwright-report", "axe");
    ensureReportDir(reportDir);

    const slug = pathToSlug(routePath);
    const reportFile = path.join(reportDir, `sample__${slug}.json`);
    fs.writeFileSync(
      reportFile,
      JSON.stringify(
        {
          route: routePath,
          timestamp: new Date().toISOString(),
          violations: results.violations,
          passes: results.passes.length,
          incomplete: results.incomplete.length,
        },
        null,
        2,
      ),
    );

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    if (blocking.length > 0) {
      console.log(`\n[${routePath}] ${blocking.length} serious/critical violations:`);
      for (const v of blocking) {
        console.log(`  - [${v.impact}] ${v.id}: ${v.description}`);
        for (const node of v.nodes.slice(0, 2)) {
          console.log(`    HTML: ${node.html.substring(0, 120)}`);
        }
      }
    }

    expect(
      blocking,
      `Axe found ${blocking.length} serious/critical violation(s) on ${routePath}:\n` +
        JSON.stringify(blocking, null, 2),
    ).toEqual([]);
  });
}
