"use client";

import { AlertCircle, Ban, FileWarning, BellRing, Edit, XCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type Severity = "Critical" | "High";

interface ExceptionRow {
    id: string;
    empId: string;
    name: string;
    type: string;
    detail: string;
    severity: Severity;
}

const EXCEPTIONS: ExceptionRow[] = [
    { id: "E-101", empId: "EMP412", name: "Manish Tiwari", type: "Invalid Bank Details", detail: 'IFSC Code "HDFC000A123" is invalid (length error).', severity: "Critical" },
    { id: "E-102", empId: "EMP450", name: "Sonia Das", type: "PAN Mismatch", detail: "Name on PAN does not match HR records.", severity: "High" },
    { id: "E-103", empId: "EMP488", name: "Rohan Mehta", type: "Missing Attendance", detail: "Timesheet locked but 0 hours reported for regular FTE.", severity: "Critical" },
    { id: "E-104", empId: "EMP501", name: "Kiran Patel", type: "Negative Net Pay", detail: "Deductions exceed gross by ₹2,400.", severity: "High" },
];

const SEVERITY_BADGE: Record<Severity, "danger" | "warning"> = {
    Critical: "danger",
    High: "warning",
};

const DASHBOARD_CARDS = [
    { value: "3", label: "Critical Errors", sub: "(Blocks Payroll)", variant: "danger" as const, icon: Ban },
    { value: "2", label: "Bank/Tax Data Error", sub: "IFSC, PAN, UAN missing/invalid", variant: "warning" as const, icon: AlertCircle },
    { value: "1", label: "Attendance & Leave", sub: "Missing LOP approval, zero hours", variant: "warning" as const, icon: FileWarning },
    { value: "1", label: "Compliance/Values", sub: "Negative Net Pay, Max PF limit", variant: "warning" as const, icon: Ban },
] as const;

const COLUMNS: Column<ExceptionRow>[] = [
    {
        key: "exception",
        label: "Exception",
        render: (r) => (
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Badge variant={SEVERITY_BADGE[r.severity]}>{r.severity}</Badge>
                    <span className="text-white font-medium text-sm">{r.type}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#8899AA] bg-[#1A2A3A] px-1.5 py-0.5 rounded">{r.empId}</span>
                    <span className="text-sm text-[#c8d8e8] font-medium">{r.name}</span>
                </div>
                <p className="text-sm text-[#8899AA]">{r.detail}</p>
            </div>
        ),
    },
    {
        key: "actions",
        label: "Actions",
        align: "right",
        render: (r) => (
            <div className="flex items-center gap-2 justify-end flex-wrap">
                <Button
                    variant="secondary"
                    size="sm"
                    icon={<BellRing size={13} aria-hidden="true" />}
                    aria-label={`Remind ${r.name}`}
                >
                    Remind Emp
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    icon={<Edit size={13} aria-hidden="true" />}
                    aria-label={`Edit data for ${r.name}`}
                >
                    Edit Data
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    icon={<XCircle size={13} aria-hidden="true" />}
                    aria-label={`Exclude ${r.name} from payroll run`}
                >
                    Exclude
                </Button>
            </div>
        ),
    },
];

export default function PayrollExceptionPage() {
    return (
        <Page
            title="Payroll Run Blocked"
            subtitle="Resolve the following critical exceptions to unlock process run."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Exceptions" },
            ]}
            maxWidth="1200px"
            actions={<Badge variant="danger" dot>3 Critical Errors</Badge>}
        >
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {DASHBOARD_CARDS.map((card) => (
                    <Card key={card.label} padding="md">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[#8899AA] text-xs font-medium">{card.label}</span>
                            <card.icon size={14} className="text-[#FFB800]" aria-hidden="true" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
                        <p className="text-xs text-[#8899AA]">{card.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Exceptions List */}
            <Card padding="none">
                <DataTable<ExceptionRow>
                    data={EXCEPTIONS}
                    columns={COLUMNS}
                    rowKey={(r) => r.id}
                    searchable
                    searchPlaceholder="Search exceptions by name, type, or ID…"
                    aria-label="Payroll exceptions list"
                    emptyTitle="No exceptions found"
                    emptyDescription="All payroll exceptions have been resolved."
                />
            </Card>
        </Page>
    );
}
