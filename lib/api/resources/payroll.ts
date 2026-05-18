/**
 * Payroll API resource — query keys + typed stubs.
 * Replace stub bodies with real `api.get/post` calls when backend is ready.
 */

import { z } from "zod";

export const PayrollRunStatusSchema = z.enum([
    "draft", "attendance_locked", "computed", "under_review",
    "approved", "disbursed", "rolled_back",
]);
export type PayrollRunStatus = z.infer<typeof PayrollRunStatusSchema>;

export const PayrollRunSchema = z.object({
    id: z.string().uuid(),
    orgId: z.string().uuid(),
    month: z.number().int().min(1).max(12),
    year: z.number().int().min(2000),
    status: PayrollRunStatusSchema,
    employeeCount: z.number(),
    grossAmount: z.string(), // decimal string
    netAmount: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});
export type PayrollRun = z.infer<typeof PayrollRunSchema>;

export const payrollKeys = {
    all: ["payroll"] as const,
    runs: () => [...payrollKeys.all, "runs"] as const,
    run: (id: string) => [...payrollKeys.all, "run", id] as const,
    current: () => [...payrollKeys.all, "current"] as const,
};

export async function getCurrentPayrollRun(): Promise<PayrollRun | null> {
    // TODO: return api.get("/v1/payroll/current", { schema: PayrollRunSchema.nullable() });
    return null;
}

export async function listPayrollRuns(): Promise<PayrollRun[]> {
    // TODO: return api.get("/v1/payroll/runs", { schema: z.array(PayrollRunSchema) });
    return [];
}
