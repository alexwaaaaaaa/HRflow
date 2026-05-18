"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface EncashmentRequest {
    id: string;
    emp: string;
    dept: string;
    amount: string;
    days: number;
    balanceBefore: number;
    reason: string;
    appliedOn: string;
}

const INITIAL_REQUESTS: EncashmentRequest[] = [
    { id: "ENC-2401", emp: "Arjun Mehta", dept: "Product", amount: "₹14,000", days: 8, balanceBefore: 20, reason: "Personal expenses", appliedOn: "16 Nov 2024" },
    { id: "ENC-2422", emp: "Sneha Patel", dept: "Engineering", amount: "₹26,500", days: 12, balanceBefore: 18, reason: "Medical emergency", appliedOn: "18 Nov 2024" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function EmployeeCell({ row }: { row: EncashmentRequest }) {
    return (
        <div>
            <p className="text-base font-bold text-white">{row.emp}</p>
            <p className="mt-0.5 text-xs text-[#8899AA]">{row.dept} · Req: {row.id}</p>
        </div>
    );
}

function DaysCell({ row }: { row: EncashmentRequest }) {
    return (
        <div className="inline-block rounded-lg border border-[#1A2A3A] bg-[#0A1420] px-3 py-1">
            <span className="text-lg font-black text-[#0066FF]">{row.days}</span>{" "}
            <span className="text-xs font-bold text-[#556677]">EL</span>
        </div>
    );
}

function PayoutCell({ row }: { row: EncashmentRequest }) {
    return <span className="text-lg font-black text-[#00E5A0]">{row.amount}</span>;
}

function BalanceCell({ row }: { row: EncashmentRequest }) {
    return (
        <div>
            <p className="text-sm font-bold text-white">{row.balanceBefore - row.days} Days</p>
            <p className="text-[10px] text-[#8899AA]">After approval (Current: {row.balanceBefore})</p>
        </div>
    );
}

function ActionsCell({ row, onApprove, onReject, busy }: {
    row: EncashmentRequest;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    busy: string | null;
}) {
    return (
        <div className="flex justify-end gap-2">
            <Button
                variant="danger"
                size="sm"
                isLoading={busy === row.id}
                onClick={() => onReject(row.id)}
            >
                Reject
            </Button>
            <Button
                size="sm"
                icon={<CheckCircle size={14} aria-hidden="true" />}
                isLoading={busy === row.id}
                onClick={() => onApprove(row.id)}
            >
                Approve
            </Button>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveEncashmentApprovalsPage() {
    const toast = useToast();
    const [requests, setRequests] = useState(INITIAL_REQUESTS);
    const [busy, setBusy] = useState<string | null>(null);

    const handleApprove = async (id: string) => {
        setBusy(id);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 500));
            setRequests((prev) => prev.filter((r) => r.id !== id));
            toast.show({ variant: "success", title: "Encashment approved", description: "The leave encashment request has been approved." });
        } finally {
            setBusy(null);
        }
    };

    const handleReject = async (id: string) => {
        setBusy(id);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 500));
            setRequests((prev) => prev.filter((r) => r.id !== id));
            toast.show({ variant: "warning", title: "Encashment rejected", description: "The leave encashment request has been rejected." });
        } finally {
            setBusy(null);
        }
    };

    const columns: Column<EncashmentRequest>[] = [
        {
            key: "employee",
            label: "Employee",
            render: (r) => <EmployeeCell row={r} />,
            sortable: true,
            sortValue: (r) => r.emp,
        },
        {
            key: "days",
            label: "Days Requested",
            align: "center",
            render: (r) => <DaysCell row={r} />,
            sortable: true,
            sortValue: (r) => r.days,
        },
        {
            key: "amount",
            label: "Est. Payout",
            align: "right",
            render: (r) => <PayoutCell row={r} />,
        },
        {
            key: "balance",
            label: "Remaining Balance",
            render: (r) => <BalanceCell row={r} />,
        },
        {
            key: "actions",
            label: "",
            align: "right",
            render: (r) => (
                <ActionsCell
                    row={r}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    busy={busy}
                />
            ),
        },
    ];

    return (
        <Page
            title="Leave Encashment Approvals"
            subtitle="HR / Finance review panel for EL conversion requests"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Encashment Approvals" },
            ]}
            maxWidth="1200px"
        >
            <Card padding="none">
                <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-5 py-3">
                    <p className="text-sm font-bold text-[#8899AA]">
                        {requests.length} Pending Approval{requests.length !== 1 ? "s" : ""}
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={<XCircle size={14} aria-hidden="true" />}
                    >
                        Reject All
                    </Button>
                </div>
                <DataTable<EncashmentRequest>
                    data={requests}
                    columns={columns}
                    rowKey={(r) => r.id}
                    searchable
                    searchPlaceholder="Search employee…"
                    aria-label="Leave encashment approval requests"
                    emptyTitle="No pending approvals"
                    emptyDescription="All encashment requests have been actioned."
                />
            </Card>
        </Page>
    );
}
