"use client";

import React from "react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ── Types ─────────────────────────────────────────────────────────────────────
type ProofStatus = "Review In Progress" | "Submitted" | "Verified" | "Not Submitted";

interface EmployeeProof {
    id: string;
    name: string;
    dept: string;
    submitted: number;
    verified: number;
    pending: number;
    status: ProofStatus;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const EMPLOYEES: EmployeeProof[] = [
    { id: "EMP-0428", name: "Priya Mehta", dept: "Marketing", submitted: 4, verified: 3, pending: 1, status: "Review In Progress" },
    { id: "EMP-0848", name: "Rahul Sharma", dept: "Engineering", submitted: 5, verified: 0, pending: 5, status: "Submitted" },
    { id: "EMP-0193", name: "Rohan Desai", dept: "Sales", submitted: 2, verified: 2, pending: 0, status: "Verified" },
    { id: "EMP-0056", name: "Kavya Reddy", dept: "Engineering", submitted: 3, verified: 1, pending: 2, status: "Review In Progress" },
    { id: "EMP-0012", name: "Arjun Nair", dept: "Product", submitted: 0, verified: 0, pending: 0, status: "Not Submitted" },
];

const STATUS_VARIANT: Record<ProofStatus, "info" | "warning" | "success" | "neutral"> = {
    "Review In Progress": "info",
    Submitted: "warning",
    Verified: "success",
    "Not Submitted": "neutral",
};

const COLUMNS: Column<EmployeeProof>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (emp) => (
            <div>
                <p className="text-sm font-medium text-white">{emp.name}</p>
                <p className="text-xs text-[#8899AA]">{emp.id}</p>
            </div>
        ),
        sortable: true,
        sortValue: (emp) => emp.name,
    },
    {
        key: "dept",
        label: "Department",
        render: (emp) => <span className="text-sm text-white">{emp.dept}</span>,
    },
    {
        key: "submitted",
        label: "Total Proofs",
        align: "center",
        render: (emp) => <span className="text-sm text-white">{emp.submitted}</span>,
    },
    {
        key: "verified",
        label: "Verified",
        align: "center",
        render: (emp) => <span className="text-sm text-[#00E5A0]">{emp.verified}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (emp) => (
            <div className="flex items-center gap-2">
                <Badge variant={STATUS_VARIANT[emp.status]}>{emp.status}</Badge>
                {emp.pending > 0 && emp.status !== "Not Submitted" && (
                    <span className="text-xs text-red-400">({emp.pending} pending)</span>
                )}
            </div>
        ),
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (emp) =>
            emp.status === "Submitted" || emp.status === "Review In Progress" ? (
                <Button size="sm" href={`/tax/proof-review/${emp.id}`}>Review Items</Button>
            ) : (
                <Button variant="secondary" size="sm" disabled>
                    View
                </Button>
            ),
    },
];

export default function ProofVerificationDashboard() {
    return (
        <Page
            title="Investment Proof Verifications"
            subtitle="Review and approve employee submitted documents for final TDS calculation"
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Proof Review" },
            ]}
            maxWidth="1200px"
            actions={
                <select
                    aria-label="Select financial year"
                    className="bg-[#0D1928] border border-[#1A2A3A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00E5A0]"
                >
                    <option>FY 2024-25</option>
                    <option>FY 2023-24</option>
                </select>
            }
        >
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card padding="md">
                        <p className="text-sm text-[#8899AA] mb-2">Total Employees (Old Regime)</p>
                        <p className="text-2xl font-bold text-white">358</p>
                    </Card>
                    <Card padding="md">
                        <p className="text-sm text-[#8899AA] mb-2">Submitted by</p>
                        <p className="text-2xl font-bold text-white">311</p>
                    </Card>
                    <Card padding="md" className="bg-[#FFB800]/5 border border-[#FFB800]/20">
                        <p className="text-sm text-[#FFB800] mb-2">Pending HR Review</p>
                        <p className="text-2xl font-bold text-[#FFB800]">47</p>
                    </Card>
                    <Card padding="md" className="bg-[#00E5A0]/5 border border-[#00E5A0]/20">
                        <p className="text-sm text-[#00E5A0] mb-2">Verification Complete</p>
                        <p className="text-2xl font-bold text-[#00E5A0]">182</p>
                    </Card>
                </div>

                {/* Table */}
                <Card padding="none">
                    <DataTable<EmployeeProof>
                        data={EMPLOYEES}
                        columns={COLUMNS}
                        rowKey={(emp) => emp.id}
                        searchable
                        searchPlaceholder="Search employee..."
                        aria-label="Investment Proof Verifications"
                        emptyTitle="No employees found"
                    />
                </Card>
            </div>
        </Page>
    );
}
