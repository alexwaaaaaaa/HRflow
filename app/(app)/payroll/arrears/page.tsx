"use client";

import { Plus, HelpCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface ArrearRow {
    id: string;
    emp: string;
    type: "Salary Arrear" | "LOP Reversal" | "Bonus Arrear";
    amount: number;
    month: string;
    reason: string;
    status: "Pending" | "Processed";
}

const ARREARS: ArrearRow[] = [
    { id: "ARR-892", emp: "Rahul Sharma", type: "Salary Arrear", amount: 15400, month: "Oct 2024", reason: "Annual increment backdated to Oct 1st", status: "Pending" },
    { id: "ARR-893", emp: "Sneha Patil", type: "LOP Reversal", amount: 4800, month: "Sep 2024", reason: "Manager approved leave late. 2 days reversed.", status: "Processed" },
    { id: "ARR-894", emp: "Amit Kumar", type: "Bonus Arrear", amount: 25000, month: "Oct 2024", reason: "Q3 Performance Bonus missed in last cycle", status: "Pending" },
    { id: "ARR-895", emp: "Kiran Sharma", type: "LOP Reversal", amount: 2100, month: "Oct 2024", reason: "System sync issue with biometric. 1 day reversed.", status: "Pending" },
];

const COLUMNS: Column<ArrearRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => (
            <div>
                <p className="font-semibold text-white">{r.emp}</p>
                <p className="text-xs text-[#8899AA]">{r.id}</p>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.emp,
    },
    {
        key: "type",
        label: "Type & Month",
        render: (r) => (
            <div>
                <div className="flex items-center gap-1.5 text-sm text-white">
                    {r.type}
                    {r.type === "LOP Reversal" && (
                        <Badge variant="info">Auto</Badge>
                    )}
                </div>
                <p className="text-xs text-[#8899AA]">For {r.month}</p>
            </div>
        ),
    },
    {
        key: "amount",
        label: "Amount",
        align: "right",
        render: (r) => (
            <div>
                <p className="font-semibold text-[#00E5A0]">+ ₹{r.amount.toLocaleString()}</p>
                <p className="max-w-[180px] truncate text-xs text-[#8899AA]">{r.reason}</p>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.amount,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => (
            <Badge variant={r.status === "Pending" ? "warning" : "success"}>
                {r.status}
            </Badge>
        ),
    },
];

const pendingTotal = ARREARS.filter((a) => a.status === "Pending").reduce((s, a) => s + a.amount, 0);
const salaryArrears = ARREARS.filter((a) => a.type === "Salary Arrear" && a.status === "Pending").reduce((s, a) => s + a.amount, 0);
const lopReversals = ARREARS.filter((a) => a.type === "LOP Reversal" && a.status === "Pending").reduce((s, a) => s + a.amount, 0);

export default function ArrearsDashboard() {
    return (
        <Page
            title="Arrears & LOP Reversals"
            subtitle="Manage pending arrears to be added to the upcoming payroll cycle (Nov 2024)."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Arrears" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />}>
                    Add Arrear / Reversal
                </Button>
            }
        >
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                {/* Main List */}
                <Card padding="none">
                    <DataTable<ArrearRow>
                        data={ARREARS}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employee…"
                        aria-label="Arrears and LOP reversals"
                        emptyTitle="No arrears found"
                        emptyDescription="All arrears have been processed."
                    />
                </Card>

                {/* Right Panel */}
                <div className="flex flex-col gap-4">
                    <Card padding="lg">
                        <h3 className="mb-4 text-base font-semibold text-white">Pending Arrears Summary</h3>
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-sm text-[#8899AA]">Salary Arrears (2)</span>
                            <span className="font-semibold text-white">₹{salaryArrears.toLocaleString()}</span>
                        </div>
                        <div className="mb-4 flex items-center justify-between border-b border-[#1A2A3A] pb-4">
                            <span className="text-sm text-[#8899AA]">LOP Reversals (2)</span>
                            <span className="font-semibold text-white">₹{lopReversals.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">Total Impact</span>
                            <span className="text-lg font-bold text-[#00E5A0]">+ ₹{pendingTotal.toLocaleString()}</span>
                        </div>
                    </Card>

                    <Card
                        variant="bare"
                        className="rounded-2xl border border-dashed border-[rgba(0,102,255,0.3)] bg-[rgba(0,102,255,0.05)] p-4"
                    >
                        <div className="mb-3 flex items-start gap-2">
                            <HelpCircle size={16} className="mt-0.5 shrink-0 text-[#0066FF]" aria-hidden="true" />
                            <p className="text-sm font-semibold text-white">Auto LOP Reversals</p>
                        </div>
                        <p className="mb-3 text-xs leading-relaxed text-[#8899AA]">
                            When managers approve a leave request that falls into a previously locked payroll cycle, the system automatically creates an LOP reversal record to refund the deducted salary.
                        </p>
                        <Button variant="outline" size="sm" href="/payroll-settings/pro-rata">Configure Rules</Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
