"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calendar, Users, AlertCircle, Clock, CheckCircle,
    XCircle, TrendingUp, ChevronRight, FileText
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface PendingRequest {
    id: string;
    name: string;
    initials: string;
    dept: string;
    type: string;
    duration: string;
    dates: string;
}

interface UpcomingLeave {
    id: number;
    name: string;
    avatar: string;
    type: string;
    dates: string;
    status: "Approved" | "Pending Approval";
}

const PENDING_REQUESTS: PendingRequest[] = [
    { id: "REQ-001", name: "Alex Morgan", initials: "AM", dept: "Engineering · L2 Manager", type: "Privilege Leave", duration: "3 Days", dates: "24 Nov - 26 Nov" },
    { id: "REQ-002", name: "Alex Morgan", initials: "AM", dept: "Engineering · L2 Manager", type: "Privilege Leave", duration: "3 Days", dates: "24 Nov - 26 Nov" },
    { id: "REQ-003", name: "Alex Morgan", initials: "AM", dept: "Engineering · L2 Manager", type: "Privilege Leave", duration: "3 Days", dates: "24 Nov - 26 Nov" },
    { id: "REQ-004", name: "Alex Morgan", initials: "AM", dept: "Engineering · L2 Manager", type: "Privilege Leave", duration: "3 Days", dates: "24 Nov - 26 Nov" },
];

const UPCOMING_LEAVES: UpcomingLeave[] = [
    { id: 1, name: "Sneha Patel", avatar: "SP", type: "Planned Leave", dates: "12 Nov - 15 Nov", status: "Approved" },
    { id: 2, name: "Arjun Mehta", avatar: "AM", type: "Sick Leave", dates: "Today", status: "Pending Approval" },
    { id: 3, name: "David Chen", avatar: "DC", type: "Comp-off", dates: "14 Nov", status: "Pending Approval" },
    { id: 4, name: "Priya Nair", avatar: "PN", type: "Planned Leave", dates: "20 Nov - 25 Nov", status: "Approved" },
];

const STATUS_VARIANT: Record<UpcomingLeave["status"], "success" | "warning"> = {
    Approved: "success",
    "Pending Approval": "warning",
};

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope — no components inside render)
// ─────────────────────────────────────────────────────────────────────────────

function EmployeeCell({ row }: { row: PendingRequest }) {
    return (
        <div className="flex items-center gap-3">
            <div
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded bg-[#1A2A3A] text-xs font-bold text-white"
            >
                {row.initials}
            </div>
            <div>
                <p className="text-sm font-bold text-white">{row.name}</p>
                <p className="text-[10px] text-[#8899AA]">{row.dept}</p>
            </div>
        </div>
    );
}

function ActionCell({ row, onApprove, onReject }: { row: PendingRequest; onApprove: (id: string) => void; onReject: (id: string) => void }) {
    return (
        <div className="flex justify-end gap-2">
            <Button
                variant="ghost"
                size="sm"
                icon={<CheckCircle size={16} aria-hidden="true" />}
                aria-label={`Approve leave for ${row.name}`}
                onClick={() => onApprove(row.id)}
            />
            <Button
                variant="danger"
                size="sm"
                icon={<XCircle size={16} aria-hidden="true" />}
                aria-label={`Reject leave for ${row.name}`}
                onClick={() => onReject(row.id)}
            />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveDashboardPage() {
    const toast = useToast();
    const [requests, setRequests] = useState(PENDING_REQUESTS);

    const handleApprove = (id: string) => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        toast.show({ variant: "success", title: "Leave approved", description: "The request has been approved." });
    };

    const handleReject = (id: string) => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        toast.show({ variant: "warning", title: "Leave rejected", description: "The request has been rejected." });
    };

    const columns: Column<PendingRequest>[] = [
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
            render: (row) => (
                <span className="rounded border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-1 text-xs font-bold text-white">
                    {row.type}
                </span>
            ),
        },
        {
            key: "duration",
            label: "Duration",
            render: (row) => (
                <div>
                    <p className="text-sm font-bold text-white">{row.duration}</p>
                    <p className="text-xs text-[#8899AA]">{row.dates}</p>
                </div>
            ),
            sortable: true,
            sortValue: (row) => row.duration,
        },
        {
            key: "actions",
            label: "",
            align: "right",
            render: (row) => <ActionCell row={row} onApprove={handleApprove} onReject={handleReject} />,
        },
    ];

    const metrics = [
        { title: "On Leave Today", value: "42", trend: "+12% vs avg", icon: Users, variant: "success" as const },
        { title: "Pending Approvals", value: String(requests.length), trend: "High Priority", icon: Clock, variant: "warning" as const },
        { title: "LWP Instances", value: "14", trend: "This Month", icon: AlertCircle, variant: "danger" as const },
        { title: "Avg. Leave Balance", value: "12.5", trend: "Days / Emp", icon: Calendar, variant: "info" as const },
    ];

    return (
        <Page
            title="Leave Management"
            subtitle="Monitor workforce availability, approve requests, and track balances"
            breadcrumbs={[{ label: "Leave" }]}
            maxWidth="1400px"
            actions={
                <Link href="/leave/reports">
                    <Button variant="secondary" icon={<FileText size={14} aria-hidden="true" />}>
                        Export Reports
                    </Button>
                </Link>
            }
        >
            <div className="space-y-6">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {metrics.map((m) => (
                        <Card key={m.title} padding="md">
                            <div className="mb-3 flex items-start justify-between">
                                <p className="text-sm font-medium text-[#8899AA]">{m.title}</p>
                                <m.icon size={18} className="text-[#8899AA]" aria-hidden="true" />
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-black text-white">{m.value}</span>
                                <Badge variant={m.variant}>{m.trend}</Badge>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Pending requests table */}
                    <div className="lg:col-span-2">
                        <Card padding="none">
                            <CardHeader className="border-b border-[#1A2A3A] p-5">
                                <CardTitle className="flex items-center gap-2">
                                    <Clock size={18} className="text-[#FFB800]" aria-hidden="true" />
                                    Needs Attention (Pending)
                                </CardTitle>
                                <Link href="/leave/approvals" className="text-xs font-semibold text-[#60a5fa] hover:underline">
                                    View All &rsaquo;
                                </Link>
                            </CardHeader>
                            <div className="p-4">
                                <DataTable<PendingRequest>
                                    data={requests}
                                    columns={columns}
                                    rowKey={(r) => r.id}
                                    aria-label="Pending leave requests"
                                    emptyTitle="All caught up"
                                    emptyDescription="No pending leave requests for your team."
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Upcoming absences */}
                        <Card padding="md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar size={16} className="text-[#60a5fa]" aria-hidden="true" />
                                    Upcoming Absences
                                </CardTitle>
                            </CardHeader>
                            <ul className="space-y-4" aria-label="Upcoming absences">
                                {UPCOMING_LEAVES.map((leave) => (
                                    <li key={leave.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                aria-hidden="true"
                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-xs font-bold text-white"
                                            >
                                                {leave.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{leave.name}</p>
                                                <p className="text-xs text-[#8899AA]">{leave.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="mb-1 rounded bg-[#1A2A3A] px-2 py-0.5 text-xs font-bold text-white">
                                                {leave.dates}
                                            </p>
                                            <Badge variant={STATUS_VARIANT[leave.status]}>{leave.status}</Badge>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 border-t border-[#1A2A3A] pt-4">
                                <Link href="/leave/calendar">
                                    <Button variant="secondary" size="sm" className="w-full">
                                        View Full Calendar
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        {/* Quick links */}
                        <Card padding="md">
                            <CardTitle className="mb-3">Quick Links</CardTitle>
                            <nav aria-label="Leave quick links" className="space-y-1">
                                {[
                                    { href: "/leave/balance", icon: TrendingUp, label: "Year-end Balances" },
                                    { href: "/leave/settings/sandwich-rules", icon: AlertCircle, label: "Sandwich Leave Cases" },
                                    { href: "/leave/settings/types", icon: Users, label: "Setup Leave Types" },
                                ].map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="flex items-center justify-between rounded-lg border border-transparent p-3 text-sm text-[#8899AA] transition-all hover:border-[#2A3A4A] hover:bg-[#1A2A3A] hover:text-white"
                                    >
                                        <span className="flex items-center gap-3">
                                            <link.icon size={16} className="text-[#7a8fa6]" aria-hidden="true" />
                                            {link.label}
                                        </span>
                                        <ChevronRight size={14} aria-hidden="true" />
                                    </Link>
                                ))}
                            </nav>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
