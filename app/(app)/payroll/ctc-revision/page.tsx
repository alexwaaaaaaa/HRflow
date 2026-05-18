"use client";

import Link from "next/link";
import { PenTool, AlertTriangle, ArrowUpRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface RevisionRow {
    id: string;
    emp: string;
    oldCtc: number;
    newCtc: number;
    effective: string;
    type: string;
    status: "Pending Approval" | "Approved" | "Draft";
    by: string;
}

const REVISIONS: RevisionRow[] = [
    { id: "REV-901", emp: "Rahul Sharma", oldCtc: 800000, newCtc: 1200000, effective: "01 Nov 2024", type: "Promotion", status: "Pending Approval", by: "Priya Mehta" },
    { id: "REV-902", emp: "Sneha Patil", oldCtc: 1400000, newCtc: 1650000, effective: "01 Oct 2024", type: "Annual Appraisal", status: "Approved", by: "Manager" },
    { id: "REV-903", emp: "Amit Kumar", oldCtc: 650000, newCtc: 700000, effective: "15 Nov 2024", type: "Market Correction", status: "Draft", by: "HR Admin" },
];

const STATUS_VARIANT = {
    Approved: "success",
    "Pending Approval": "warning",
    Draft: "neutral",
} as const;

const COLUMNS: Column<RevisionRow>[] = [
    {
        key: "employee",
        label: "Employee & Request",
        render: (r) => (
            <div>
                <p className="font-semibold text-white">{r.emp}</p>
                <div className="flex items-center gap-1.5 text-xs text-[#8899AA]">
                    {r.type} · Eff: {r.effective}
                    {r.effective.includes("Oct") && (
                        <span
                            className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFB800]"
                            title="Backdated Arrears Applicable"
                            aria-label="Backdated arrears applicable"
                        />
                    )}
                </div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.emp,
    },
    {
        key: "oldCtc",
        label: "Current CTC",
        render: (r) => <span className="text-sm text-[#E5E7EB]">₹{r.oldCtc.toLocaleString()}</span>,
    },
    {
        key: "newCtc",
        label: "Proposed CTC",
        render: (r) => <span className="font-bold text-white">₹{r.newCtc.toLocaleString()}</span>,
    },
    {
        key: "delta",
        label: "Delta",
        render: (r) => (
            <div>
                <p className="font-semibold text-[#00E5A0]">+ ₹{(r.newCtc - r.oldCtc).toLocaleString()}</p>
                <p className="text-xs text-[#8899AA]">+ {(((r.newCtc - r.oldCtc) / r.oldCtc) * 100).toFixed(1)}% Hike</p>
            </div>
        ),
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    },
    {
        key: "action",
        label: "",
        align: "right",
        render: (r) => (
            r.status === "Pending Approval" ? (
                <Button size="sm" href="/payroll/ctc-revision/fitment">Review</Button>
            ) : (
                <Link href="/payroll/ctc-revision/fitment">
                    <Button variant="secondary" size="sm" iconRight={<ArrowUpRight size={12} aria-hidden="true" />}>
                        View
                    </Button>
                </Link>
            )
        ),
    },
];

export default function CtcRevisionWorkflow() {
    return (
        <Page
            title="CTC Revision Pipeline"
            subtitle="Review, approve, and auto-sync salary increments before payroll run."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "CTC Revision" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" href="/payroll/ctc-revision/bulk">Bulk Upload Revisions</Button>
                    <Button icon={<PenTool size={14} aria-hidden="true" />} href="/payroll/ctc-revision/fitment">New Revision</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <p className="text-sm text-[#8899AA]">Pending Approvals</p>
                        <p className="mt-2 text-3xl font-bold text-[#FFB800]">14</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-[#8899AA]">Approved (Unsynced to Payroll)</p>
                        <p className="mt-2 text-3xl font-bold text-[#0066FF]">8</p>
                    </Card>
                    <Card
                        variant="bare"
                        className="rounded-2xl border border-dashed border-[rgba(255,184,0,0.3)] bg-[rgba(255,184,0,0.05)] p-5"
                    >
                        <div className="mb-1 flex items-center gap-1.5">
                            <AlertTriangle size={13} className="text-[#FFB800]" aria-hidden="true" />
                            <h3 className="text-sm font-semibold text-white">Backdated Impact</h3>
                        </div>
                        <p className="text-xs leading-relaxed text-[#8899AA]">
                            3 revisions have effective dates in the past. Arrears will be calculated automatically upon approval.
                        </p>
                    </Card>
                </div>

                {/* Revisions Table */}
                <Card padding="none">
                    <DataTable<RevisionRow>
                        data={REVISIONS}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employee…"
                        aria-label="CTC revision pipeline"
                        emptyTitle="No revisions found"
                        emptyDescription="Create a new revision to get started."
                    />
                </Card>
            </div>
        </Page>
    );
}
