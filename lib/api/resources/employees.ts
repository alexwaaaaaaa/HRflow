/**
 * Employee API resource.
 *
 * All functions return typed promises. Pages should call these via
 * `useQuery` / `useMutation` from TanStack Query rather than calling
 * them directly, so results are cached and deduplicated.
 *
 * TODO: replace mock returns with real `api.get/post` calls once the
 * backend is wired. The function signatures and return types should NOT
 * change — only the implementation body.
 */

import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const EmployeeStatusSchema = z.enum([
    "active", "inactive", "on_leave", "terminated", "probation",
]);
export type EmployeeStatus = z.infer<typeof EmployeeStatusSchema>;

export const EmployeeSchema = z.object({
    id: z.string().uuid(),
    orgId: z.string().uuid(),
    employeeCode: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    mobile: z.string().optional(),
    designation: z.string().optional(),
    department: z.string().optional(),
    location: z.string().optional(),
    grade: z.string().optional(),
    managerId: z.string().uuid().optional(),
    status: EmployeeStatusSchema,
    dateOfJoining: z.string(), // ISO date
    dateOfBirth: z.string().optional(),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
    pan: z.string().optional(),
    aadhaarLast4: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});
export type Employee = z.infer<typeof EmployeeSchema>;

export const EmployeeListResponseSchema = z.object({
    data: z.array(EmployeeSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
});
export type EmployeeListResponse = z.infer<typeof EmployeeListResponseSchema>;

export const CreateEmployeeSchema = EmployeeSchema.omit({
    id: true, orgId: true, createdAt: true, updatedAt: true,
});
export type CreateEmployeeInput = z.infer<typeof CreateEmployeeSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Query keys — centralised so invalidation is consistent
// ─────────────────────────────────────────────────────────────────────────────

export const employeeKeys = {
    all: ["employees"] as const,
    lists: () => [...employeeKeys.all, "list"] as const,
    list: (filters: ListEmployeesParams) =>
        [...employeeKeys.lists(), filters as Record<string, unknown>] as const,
    details: () => [...employeeKeys.all, "detail"] as const,
    detail: (id: string) => [...employeeKeys.details(), id] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// API functions
// ─────────────────────────────────────────────────────────────────────────────

// import { api } from "@/lib/api/client"; // uncomment when backend is ready

export interface ListEmployeesParams {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: EmployeeStatus;
    department?: string;
    location?: string;
}

export async function listEmployees(
    _params: ListEmployeesParams = {}
): Promise<EmployeeListResponse> {
    // TODO: return api.get("/v1/employees", { schema: EmployeeListResponseSchema });
    // Returning empty mock so the type contract is established.
    return { data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
}

export async function getEmployee(id: string): Promise<Employee> {
    // TODO: return api.get(`/v1/employees/${id}`, { schema: EmployeeSchema });
    throw new Error(`getEmployee(${id}) not yet implemented`);
}

export async function createEmployee(_input: CreateEmployeeInput): Promise<Employee> {
    // TODO: return api.post("/v1/employees", input, { schema: EmployeeSchema });
    throw new Error("createEmployee not yet implemented");
}

export async function updateEmployee(
    id: string,
    _input: Partial<CreateEmployeeInput>
): Promise<Employee> {
    // TODO: return api.patch(`/v1/employees/${id}`, input, { schema: EmployeeSchema });
    throw new Error(`updateEmployee(${id}) not yet implemented`);
}
