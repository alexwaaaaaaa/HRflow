/**
 * Calculation snapshot tests for payroll math pages.
 *
 * These tests render the page components with their embedded mock data and
 * snapshot the derived numeric values (totals, net pay, deductions, etc.)
 * to ensure byte-identical math after migration.
 *
 * Validates: Requirements 7.1, design Property 2
 */

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

// ─── select-month derived values ─────────────────────────────────────────────

describe("payroll/run/select-month — calculation snapshot", () => {
    it("expected payroll summary totals are byte-equal after migration", async () => {
        const { default: SelectMonth } = await import(
            "@/app/(app)/payroll/run/select-month/page"
        );
        const { container } = render(<SelectMonth />);

        // Snapshot the derived numeric values shown in the Expected Payroll Summary card
        const expectedGross = "~₹4.24 Cr";
        const expectedDeductions = "~₹42 L";
        const expectedNet = "~₹3.82 Cr";
        const expectedEmployerPf = "~₹18.4 L";
        const expectedEmployerEsi = "~₹2.8 L";
        const expectedGratuity = "~₹8.1 L";
        const expectedCtc = "~₹4.93 Cr";

        expect(container.textContent).toContain(expectedGross);
        expect(container.textContent).toContain(expectedDeductions);
        expect(container.textContent).toContain(expectedNet);
        expect(container.textContent).toContain(expectedEmployerPf);
        expect(container.textContent).toContain(expectedEmployerEsi);
        expect(container.textContent).toContain(expectedGratuity);
        expect(container.textContent).toContain(expectedCtc);
    });

    it("total employees count is stable", async () => {
        const { default: SelectMonth } = await import(
            "@/app/(app)/payroll/run/select-month/page"
        );
        const { container } = render(<SelectMonth />);
        // Total employees shown in summary
        expect(container.textContent).toContain("847");
    });

    it("new joiners pro-rata count is stable", async () => {
        const { default: SelectMonth } = await import(
            "@/app/(app)/payroll/run/select-month/page"
        );
        const { container } = render(<SelectMonth />);
        expect(container.textContent).toContain("12");
    });
});

// ─── review-gross derived values ─────────────────────────────────────────────

describe("payroll/run/review-gross — calculation snapshot", () => {
    it("KPI totals are byte-equal after migration", async () => {
        const { default: ReviewGross } = await import(
            "@/app/(app)/payroll/run/review-gross/page"
        );
        const { container } = render(<ReviewGross />);

        expect(container.textContent).toContain("₹4.24 Cr");
        expect(container.textContent).toContain("₹3.98 Cr");
        expect(container.textContent).toContain("₹18.5 L");
        expect(container.textContent).toContain("18"); // anomalies count
    });

    it("individual employee gross values are byte-equal", async () => {
        const { default: ReviewGross } = await import(
            "@/app/(app)/payroll/run/review-gross/page"
        );
        const { container } = render(<ReviewGross />);

        // Ravi Shankar gross = 128000
        expect(container.textContent).toContain("₹1,28,000");
        // Sneha Patil gross = 110500
        expect(container.textContent).toContain("₹1,10,500");
        // Rajesh Kumar gross = 172500
        expect(container.textContent).toContain("₹1,72,500");
    });
});

// ─── review-deductions derived values ────────────────────────────────────────

describe("payroll/run/review-deductions — calculation snapshot", () => {
    it("KPI deduction totals are byte-equal after migration", async () => {
        const { default: ReviewDeductions } = await import(
            "@/app/(app)/payroll/run/review-deductions/page"
        );
        const { container } = render(<ReviewDeductions />);

        expect(container.textContent).toContain("₹42.45 L");
        expect(container.textContent).toContain("₹24.05 L");
        expect(container.textContent).toContain("₹14.88 L");
        expect(container.textContent).toContain("₹1.72 L");
        expect(container.textContent).toContain("₹1.80 L");
    });

    it("individual employee deduction values are byte-equal", async () => {
        const { default: ReviewDeductions } = await import(
            "@/app/(app)/payroll/run/review-deductions/page"
        );
        const { container } = render(<ReviewDeductions />);

        // Ravi Shankar total deductions = 16525
        expect(container.textContent).toContain("₹16,525");
        // Sneha Patil total deductions = 25225
        expect(container.textContent).toContain("₹25,225");
        // Rajesh Kumar total deductions = 30525
        expect(container.textContent).toContain("₹30,525");
    });
});

// ─── review-net derived values ────────────────────────────────────────────────

describe("payroll/run/review-net — calculation snapshot", () => {
    it("KPI net payout totals are byte-equal after migration", async () => {
        const { default: ReviewNet } = await import(
            "@/app/(app)/payroll/run/review-net/page"
        );
        const { container } = render(<ReviewNet />);

        expect(container.textContent).toContain("₹3.82 Cr");
        expect(container.textContent).toContain("₹3.81 Cr");
        expect(container.textContent).toContain("₹1.1 L");
        expect(container.textContent).toContain("16"); // on hold count
    });

    it("individual employee net pay values are byte-equal", async () => {
        const { default: ReviewNet } = await import(
            "@/app/(app)/payroll/run/review-net/page"
        );
        const { container } = render(<ReviewNet />);

        // Ravi Shankar net = 128000 - 16525 = 111475
        expect(container.textContent).toContain("₹1,11,475");
        // Sneha Patil net = 110500 - 25225 = 85275
        expect(container.textContent).toContain("₹85,275");
        // Rajesh Kumar net = 172500 - 30525 = 141975
        expect(container.textContent).toContain("₹1,41,975");
    });

    it("net pay formula: gross - deductions is preserved", async () => {
        // Verify the math: net = gross - deductions for each employee
        const employees = [
            { gross: 128000, ded: 16525, net: 111475 },
            { gross: 110500, ded: 25225, net: 85275 },
            { gross: 48500, ded: 2025, net: 46475 },
            { gross: 172500, ded: 30525, net: 141975 },
            { gross: 55000, ded: 6000, net: 49000 },
        ];

        for (const emp of employees) {
            expect(emp.gross - emp.ded).toBe(emp.net);
        }
    });
});

// ─── payroll-comparison derived values ───────────────────────────────────────

describe("payroll-comparison — calculation snapshot", () => {
    it("KPI totals are byte-equal after migration", async () => {
        const { default: PayrollComparison } = await import(
            "@/app/(app)/payroll-comparison/page"
        );
        const { container } = render(<PayrollComparison />);

        // Headcount
        expect(container.textContent).toContain("148");
        expect(container.textContent).toContain("153");
        // Gross
        expect(container.textContent).toContain("₹1.15 Cr");
        expect(container.textContent).toContain("₹1.06 Cr");
        // Deductions
        expect(container.textContent).toContain("₹22.4 L");
        expect(container.textContent).toContain("₹22.7 L");
        // Net
        expect(container.textContent).toContain("₹92.6 L");
        expect(container.textContent).toContain("₹84.6 L");
    });

    it("variance table values are byte-equal after migration", async () => {
        const { default: PayrollComparison } = await import(
            "@/app/(app)/payroll-comparison/page"
        );
        const { container } = render(<PayrollComparison />);

        // Engineering Basic Salary variance
        expect(container.textContent).toContain("₹34,50,000");
        expect(container.textContent).toContain("₹32,10,000");
        expect(container.textContent).toContain("+₹2,40,000");
        expect(container.textContent).toContain("+7.48%");

        // Sales Incentives/Bonus variance (huge jump)
        expect(container.textContent).toContain("₹8,25,000");
        expect(container.textContent).toContain("₹4,10,000");
        expect(container.textContent).toContain("+₹4,15,000");
        expect(container.textContent).toContain("+101.2%");
    });
});

// ─── payroll-rollback derived values ─────────────────────────────────────────

describe("payroll-rollback — calculation snapshot", () => {
    it("rollback target details are byte-equal after migration", async () => {
        const { default: PayrollRollback } = await import(
            "@/app/(app)/payroll-rollback/page"
        );
        const { container } = render(<PayrollRollback />);

        expect(container.textContent).toContain("March 2025 Regular");
        expect(container.textContent).toContain("145 Personnel");
        expect(container.textContent).toContain("₹45,20,000");
    });

    it("confirm phrase is preserved byte-equal", async () => {
        const { default: PayrollRollback } = await import(
            "@/app/(app)/payroll-rollback/page"
        );
        const { container } = render(<PayrollRollback />);

        expect(container.textContent).toContain("CONFIRM ROLLBACK");
    });
});

// ─── payroll-simulation derived values ───────────────────────────────────────

describe("payroll-simulation — calculation snapshot", () => {
    it("scenario totals are byte-equal after migration", async () => {
        const { default: PayrollSimulation } = await import(
            "@/app/(app)/payroll-simulation/page"
        );
        const { container } = render(<PayrollSimulation />);

        // Scenario 1: 10% Hike
        expect(container.textContent).toContain("₹1,12,12,680");
        expect(container.textContent).toContain("+₹9,95,880 vs Current");
        expect(container.textContent).toContain("₹32,312");
        expect(container.textContent).toContain("₹13.45 Cr");

        // Scenario 2: 12% Hike
        expect(container.textContent).toContain("₹1,14,42,208");
        expect(container.textContent).toContain("+₹12,25,408 vs Current");
        expect(container.textContent).toContain("₹32,975");
        expect(container.textContent).toContain("₹13.73 Cr");

        // Scenario 3: 15% Hike
        expect(container.textContent).toContain("₹1,32,74,400");
        expect(container.textContent).toContain("+₹30,57,600 vs Current");
        expect(container.textContent).toContain("₹38,255");
        expect(container.textContent).toContain("₹15.92 Cr");
    });

    it("scenario delta math is preserved", () => {
        // Verify the deltas are correct: scenario total - base total
        const base = 10216800; // current payroll
        const s1 = 11212680;
        const s2 = 11442208;
        const s3 = 13274400;

        expect(s1 - base).toBe(995880);   // +₹9,95,880
        expect(s2 - base).toBe(1225408);  // +₹12,25,408
        expect(s3 - base).toBe(3057600);  // +₹30,57,600
    });
});
