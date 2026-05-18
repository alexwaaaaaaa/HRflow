"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    employeeKeys,
    listEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    type ListEmployeesParams,
    type CreateEmployeeInput,
} from "@/lib/api/resources/employees";
import { useToast } from "@/components/ui/Toast";

/**
 * Paginated employee list with search + filter support.
 *
 * @example
 *   const { data, isLoading } = useEmployees({ search: "Priya", status: "active" });
 */
export function useEmployees(params: ListEmployeesParams = {}) {
    return useQuery({
        queryKey: employeeKeys.list(params),
        queryFn: () => listEmployees(params),
        staleTime: 60_000, // employee list is relatively stable
    });
}

/**
 * Single employee detail.
 */
export function useEmployee(id: string) {
    return useQuery({
        queryKey: employeeKeys.detail(id),
        queryFn: () => getEmployee(id),
        enabled: !!id,
    });
}

/**
 * Create employee mutation with toast feedback.
 */
export function useCreateEmployee() {
    const qc = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: (input: CreateEmployeeInput) => createEmployee(input),
        onSuccess: (employee) => {
            qc.invalidateQueries({ queryKey: employeeKeys.lists() });
            toast.show({
                variant: "success",
                title: "Employee added",
                description: `${employee.firstName} ${employee.lastName} has been added.`,
            });
        },
        onError: (err) => {
            toast.show({
                variant: "danger",
                title: "Failed to add employee",
                description: err instanceof Error ? err.message : "An unexpected error occurred.",
            });
        },
    });
}

/**
 * Update employee mutation with toast feedback.
 */
export function useUpdateEmployee(id: string) {
    const qc = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: (input: Partial<CreateEmployeeInput>) => updateEmployee(id, input),
        onSuccess: (employee) => {
            qc.invalidateQueries({ queryKey: employeeKeys.detail(id) });
            qc.invalidateQueries({ queryKey: employeeKeys.lists() });
            toast.show({
                variant: "success",
                title: "Employee updated",
                description: `${employee.firstName} ${employee.lastName} has been updated.`,
            });
        },
        onError: (err) => {
            toast.show({
                variant: "danger",
                title: "Failed to update employee",
                description: err instanceof Error ? err.message : "An unexpected error occurred.",
            });
        },
    });
}
