"use client";

import { Download, Clock, User, Calendar, Shield } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface AuditLog {
    id: string;
    time: string;
    user: string;
    role: string;
    action: string;
    details: string;
    ip: string;
    type: "Approval" | "System" | "Override" | "Modification";
}

const AUDITS: AuditLog[] = [
    { id: "1", time: "Today, 10:45 AM", user: "Priya Mehta", role: "Payroll Admin", action: "Approved Payroll Batch (Nov 2024)", details: "Authorized batch of 842 records for gross ₹3,98,54,500.", ip: "192.168.1.42", type: "Approval" },
    { id: "2", time: "Today, 10:05 AM", user: "System", role: "Auto", action: "Penny Drop Verification Complete", details: "Tested 13 accounts, 12 Success, 1 Failed (Vikram Reddy).", ip: "-", type: "System" },
    { id: "3", time: "Today, 09:30 AM", user: "Ajiit Finance", role: "Finance Head", action: "Overrode Variable Pay", details: "Changed 'EMP-045 - Sneha Patil' achievement from 100% to 110%.", ip: "103.24.51.100", type: "Override" },
    { id: "4", time: "Yesterday, 04:15 PM", user: "Priya Mehta", role: "Payroll Admin", action: "Deleted Attendance Record", details: "Removed 1 LOP day for EMP-001. System regenerated arrears.", ip: "192.168.1.42", type: "Modification" },
    { id: "5", time: "Yesterday, 02:00 PM", user: "System", role: "Auto", action: "Attendance Locked (Nov)", details: "Triggered standard month-end lock. Syncing bio-metric data.", ip: "-", type: "System" },
];

const TYPE_VARIANT = {
    Approval: "success",
    System: "info",
    Override: "warning",
    Modification: "neutral",
} as const;

const COLUMNS: Column<AuditLog>[] = [
    {
        key: "time",
        label: "Timestamp",
        render: (l) => (
            <div className="flex items-center gap-1.5 whitespace-nowrap text-sm text-[#E5E7EB]">
                <Clock size={13} className="text-[#8899AA]" aria-hidden="true" /> {l.time}
            </div>
        ),
    },
    {
        key: "actor",
        label: "Actor",
        render: (l) => (
            <div>
                <div className="flex items-center gap-1.5 font-semibold text-white">
                    {l.user === "System"
                        ? <Shield size={13} className="text-[#0066FF]" aria-hidden="true" />
                        : <User size={13} className="text-[#8899AA]" aria-hidden="true" />
                    }
                    {l.user}
                </div>
                <p className="text-xs text-[#8899AA]">{l.role}</p>
            </div>
        ),
        sortable: true,
        sortValue: (l) => l.user,
    },
    {
        key: "event",
        label: "Event / Action",
        render: (l) => (
            <div>
                <Badge variant={TYPE_VARIANT[l.type]}>{l.type}</Badge>
                <p className="mt-2 text-sm text-white">{l.action}</p>
            </div>
        ),
    },
    {
        key: "details",
        label: "Details",
        render: (l) => <span className="max-w-[300px] text-sm leading-relaxed text-[#8899AA]">{l.details}</span>,
        hideOnMobile: true,
    },
    {
        key: "ip",
        label: "IP Address",
        render: (l) => <span className="font-mono text-xs text-[#8899AA]">{l.ip}</span>,
        hideOnMobile: true,
    },
];

export default function PayrollAuditLog() {
    return (
        <Page
            title="Payroll Audit Log"
            subtitle="Track every change, approval, override, and system event within the payroll engine."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Audit Log" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                    Export SOC2 Report
                </Button>
            }
        >
            <div className="space-y-4">
                {/* Filter bar */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-4 py-2">
                        <Calendar size={14} className="text-[#8899AA]" aria-hidden="true" />
                        <span className="text-sm text-white">Last 7 Days</span>
                    </div>
                    <select
                        aria-label="Filter by event type"
                        className="h-10 rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-4 text-sm text-white outline-none"
                    >
                        <option>Event Type: All</option>
                        <option>Overrides</option>
                        <option>Approvals</option>
                    </select>
                </div>

                <Card padding="none">
                    <DataTable<AuditLog>
                        data={AUDITS}
                        columns={COLUMNS}
                        rowKey={(l) => l.id}
                        searchable
                        searchPlaceholder="Search by user or action…"
                        aria-label="Payroll audit log"
                        emptyTitle="No audit events found"
                        emptyDescription="No events match your current filters."
                    />
                    <div className="border-t border-[#1A2A3A] px-4 py-3 text-right text-sm text-[#8899AA]">
                        Showing 1–5 of 1,208 system events
                    </div>
                </Card>
            </div>
        </Page>
    );
}
