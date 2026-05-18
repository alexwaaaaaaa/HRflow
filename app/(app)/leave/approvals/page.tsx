"use client";

import { useState } from "react";
import { AlertTriangle, Calendar, CheckCircle, CheckCircle2, MessageSquare, XCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface LeaveRequest {
    id: string;
    name: string;
    initials: string;
    dept: string;
    type: string;
    duration: string;
    dates: string;
    reason: string;
    balance: number;
    conflict?: string;
}

const PENDING: LeaveRequest[] = [
    {
        id: "REQ-4512",
        name: "Rohan Sharma",
        initials: "RS",
        dept: "Engineering",
        type: "Privilege Leave",
        duration: "3 Days",
        dates: "24 Nov - 26 Nov",
        reason: "Attending a family wedding out of station.",
        balance: 14.5,
    },
    {
        id: "REQ-4518",
        name: "Priya Nair",
        initials: "PN",
        dept: "HR",
        type: "Sick Leave",
        duration: "1 Day",
        dates: "12 Nov",
        reason: "Not feeling well, running a fever.",
        balance: 4,
        conflict: "Overlap with David Chen",
    },
    {
        id: "REQ-4521",
        name: "Arjun Mehta",
        initials: "AM",
        dept: "Product",
        type: "Casual Leave",
        duration: "2 Days",
        dates: "18 Nov - 19 Nov",
        reason: "Personal work.",
        balance: 3,
    },
    {
        id: "REQ-4525",
        name: "David Chen",
        initials: "DC",
        dept: "Sales",
        type: "Comp-off",
        duration: "1 Day",
        dates: "14 Nov",
        reason: "Worked on Sunday for client demo.",
        balance: 1,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope — no components inside render)
// ─────────────────────────────────────────────────────────────────────────────

function EmployeeCell({ row }: { row: LeaveRequest }) {
    return (
        <div className="flex items-center gap-3">
            <div
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#2A3A4A] bg-[#1A2A3A] font-bold text-white"
            >
                {row.initials}
            </div>
            <div>
                <p className="text-sm font-semibold text-white">{row.name}</p>
                <p className="text-xs text-[#8899AA]">{row.dept} · {row.id}</p>
            </div>
        </div>
    );
}

function LeaveTypeCell({ row }: { row: LeaveRequest }) {
    return (
        <div>
            <Badge variant="info">{row.type}</Badge>
            <p className="mt-1 text-xs text-[#8899AA]">{row.duration}</p>
        </div>
    );
}

function DatesCell({ row }: { row: LeaveRequest }) {
    return (
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Calendar size={13} className="text-[#0066FF]" aria-hidden="true" />
            {row.dates}
        </div>
    );
}

function ReasonCell({ row }: { row: LeaveRequest }) {
    return (
        <div className="flex items-start gap-2">
            <MessageSquare size={13} className="mt-0.5 shrink-0 text-[#7a8fa6]" aria-hidden="true" />
            <span className="max-w-[200px] truncate text-sm italic text-white" title={row.reason}>
                &ldquo;{row.reason}&rdquo;
            </span>
        </div>
    );
}

function StatusCell({ row }: { row: LeaveRequest }) {
    return (
        <div className="space-y-1">
            <p className="text-xs text-[#8899AA]">
                Balance: <span className="font-semibold text-white">{row.balance} days</span>
            </p>
            {row.conflict ? (
                <span className="flex items-center gap-1 text-xs text-[#FFB800]">
                    <AlertTriangle size={12} aria-hidden="true" />
                    {row.conflict}
                </span>
            ) : (
                <span className="flex items-center gap-1 text-xs text-[#7a8fa6]">
                    <CheckCircle size={12} aria-hidden="true" /> No overlaps
                </span>
            )}
        </div>
    );
}

function ActionsCell({ row, onApprove, onReject, busy }: {
    row: LeaveRequest;
    onApprove: (req: LeaveRequest) => void;
    onReject: (req: LeaveRequest) => void;
    busy: string | null;
}) {
    return (
        <div className="flex justify-end gap-2">
            <Button
                variant="danger"
                size="sm"
                icon={<XCircle size={14} aria-hidden="true" />}
                isLoading={busy === row.id}
                onClick={() => onReject(row)}
                aria-label={`Reject ${row.name}'s leave`}
            >
                Reject
            </Button>
            <Button
                size="sm"
                icon={<CheckCircle size={14} aria-hidden="true" />}
                isLoading={busy === row.id}
                onClick={() => onApprove(row)}
                aria-label={`Approve ${row.name}'s leave`}
            >
                Approve
            </Button>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveApprovalsPage() {
    const toast = useToast();
    const [requests, setRequests] = useState(PENDING);
    const [busy, setBusy] = useState<string | null>(null);
    const [tab, setTab] = useState<"pending" | "history">("pending");

    const act = async (req: LeaveRequest, decision: "approve" | "reject") => {
        setBusy(req.id);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 400));
            setRequests((p) => p.filter((r) => r.id !== req.id));
            toast.show({
                variant: decision === "approve" ? "success" : "warning",
                title: decision === "approve" ? "Leave approved" : "Leave rejected",
                description: `${req.name}'s ${req.type.toLowerCase()} request has been ${decision}d.`,
            });
        } finally {
            setBusy(null);
        }
    };

    const columns: Column<LeaveRequest>[] = [
        {
            key: "employee",
            label: "Employee",
            render: (row) => <EmployeeCell row={row} />,
            sortable: true,
            sortValue: (row) => row.name,
        },
        {
            key: "type",
            label: "Leave Type",
            render: (row) => <LeaveTypeCell row={row} />,
            sortable: true,
            sortValue: (row) => row.type,
        },
        {
            key: "dates",
            label: "Dates",
            render: (row) => <DatesCell row={row} />,
            sortable: true,
            sortValue: (row) => row.dates,
        },
        {
            key: "reason",
            label: "Reason",
            render: (row) => <ReasonCell row={row} />,
        },
        {
            key: "status",
            label: "Balance / Conflict",
            render: (row) => <StatusCell row={row} />,
            sortable: true,
            sortValue: (row) => row.balance,
        },
        {
            key: "actions",
            label: "",
            align: "right",
            render: (row) => (
                <ActionsCell
                    row={row}
                    onApprove={(r) => act(r, "approve")}
                    onReject={(r) => act(r, "reject")}
                    busy={busy}
                />
            ),
        },
    ];

    return (
        <Page
            title="Leave approvals"
            subtitle="Review and action leave requests from your reporting team"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Approvals" },
            ]}
            maxWidth="1300px"
        >
            <div className="space-y-6">
                {/* Tabs */}
                <div role="tablist" aria-label="Approval tabs" className="inline-flex gap-1 rounded-xl border border-[#1A2A3A] bg-[#0D1928] p-1">
                    <button
                        role="tab"
                        aria-selected={tab === "pending"}
                        onClick={() => setTab("pending")}
                        className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                            tab === "pending"
                                ? "bg-[#0066FF] text-white shadow-sm"
                                : "text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white"
                        }`}
                    >
                        Pending ({requests.length})
                    </button>
                    <button
                        role="tab"
                        aria-selected={tab === "history"}
                        onClick={() => setTab("history")}
                        className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                            tab === "history"
                                ? "bg-[#0066FF] text-white shadow-sm"
                                : "text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white"
                        }`}
                    >
                        Actioned history
                    </button>
                </div>

                {tab === "pending" ? (
                    <Card padding="none">
                        <DataTable<LeaveRequest>
                            data={requests}
                            columns={columns}
                            rowKey={(r) => r.id}
                            searchable
                            searchPlaceholder="Search by name, department, or leave type…"
                            aria-label="Pending leave approval requests"
                            emptyTitle="All caught up"
                            emptyDescription="No pending leave requests for your team."
                            emptyAction={
                                <div className="flex justify-center">
                                    <CheckCircle2 className="h-12 w-12 text-[#00e5a0]" aria-hidden="true" />
                                </div>
                            }
                        />
                    </Card>
                ) : (
                    <Card padding="lg" className="text-center text-sm text-[#8899AA]">
                        Actioned history will appear here.
                    </Card>
                )}
            </div>
        </Page>
    );
}
