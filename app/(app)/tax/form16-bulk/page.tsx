"use client";

import React from "react";
import { DownloadCloud, FileText } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ── Types ─────────────────────────────────────────────────────────────────────
type Form16Status = "Generated" | "Error/Missing TRACES" | "Not Eligible";

interface EmployeeForm16 {
    id: string;
    name: string;
    dept: string;
    pan: string;
    status: Form16Status;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const EMPLOYEES: EmployeeForm16[] = [
    { id: "EMP-0428", name: "Priya Mehta", dept: "Marketing", pan: "ABCDE1234F", status: "Generated" },
    { id: "EMP-0848", name: "Rahul Sharma", dept: "Engineering", pan: "XYZA9876Q", status: "Generated" },
    { id: "EMP-0193", name: "Rohan Desai", dept: "Sales", pan: "QWER5678T", status: "Generated" },
    { id: "EMP-0056", name: "Kavya Reddy", dept: "Engineering", pan: "ASDF4321G", status: "Error/Missing TRACES" },
    { id: "EMP-0012", name: "Arjun Nair", dept: "Product", pan: "ZXCV0987M", status: "Not Eligible" },
];

const STATUS_VARIANT: Record<Form16Status, "success" | "danger" | "warning"> = {
    Generated: "success",
    "Error/Missing TRACES": "danger",
    "Not Eligible": "warning",
};

const COLUMNS: Column<EmployeeForm16>[] = [
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
        key: "pan",
        label: "PAN Number",
        render: (emp) => <span className="text-sm text-white font-mono">{emp.pan}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (emp) => <Badge variant={STATUS_VARIANT[emp.status]}>{emp.status}</Badge>,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (emp) =>
            emp.status === "Generated" ? (
                <div className="flex justify-end gap-3">
                    <Button variant="secondary" size="sm" icon={<FileText size={14} />}>
                        View
                    </Button>
                    <Button size="sm" icon={<DownloadCloud size={14} />}>
                        PDF
                    </Button>
                </div>
            ) : (
                <span className="text-sm text-[#445566]">—</span>
            ),
    },
];

export default function Form16BulkDownload() {
    return (
        <Page
            title="Form 16 Dispatch & Download"
            subtitle="Manage, download, and track Form 16 dispatch for FY 2024-25"
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Form 16 Bulk" },
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
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <Card padding="lg" className="lg:w-[340px] shrink-0">
                    <h3 className="text-base font-semibold text-white mb-6">Batch Actions</h3>

                    <Button variant="secondary" className="w-full mb-4" icon={<DownloadCloud size={18} />}>
                        Download All (ZIP)
                    </Button>
                    <p className="text-xs text-[#8899AA] text-center mb-6">45.2 MB • Contains 344 PDFs</p>

                    <div className="border-t border-[#1A2A3A] my-4" />

                    <h4 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-4">Distribution Status</h4>
                    <div className="flex justify-between text-sm text-white mb-3">
                        <span>Emailed to Employees</span>
                        <span className="font-semibold text-[#00E5A0]">344 / 345</span>
                    </div>
                    <div className="flex justify-between text-sm text-white mb-6">
                        <span>Viewed by Employees</span>
                        <span className="font-semibold">215 / 344</span>
                    </div>

                    <Button variant="outline" className="w-full">
                        Remind Unread Employees
                    </Button>
                </Card>

                {/* Table */}
                <div className="flex-1">
                    <Card padding="none">
                        <DataTable<EmployeeForm16>
                            data={EMPLOYEES}
                            columns={COLUMNS}
                            rowKey={(emp) => emp.id}
                            searchable
                            searchPlaceholder="Search employee..."
                            aria-label="Form 16 Employees"
                            emptyTitle="No employees found"
                        />
                    </Card>
                </div>
            </div>
        </Page>
    );
}
