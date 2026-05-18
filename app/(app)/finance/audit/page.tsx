"use client";

import { useState } from "react";
import { Clock, Download, ShieldCheck, User, Filter } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface AuditLog {
    id: string;
    date: string;
    user: string;
    action: string;
    entity: string;
    details: string;
    ip: string;
}

const AUDIT_LOGS: AuditLog[] = [
    { id: "LOG-0912", date: "2025-10-15 14:30:22", user: "Admin (Priya M)", action: "Modified Policy", entity: "EWA Config", details: "Changed Max Withdrawal % from 40% to 50%", ip: "192.168.1.45" },
    { id: "LOG-0911", date: "2025-10-15 11:20:00", user: "System", action: "Auto-Reconciliation", entity: "General Ledger", details: "Daily transaction sync with RazorpayX completed. 0 variances.", ip: "10.0.0.12" },
    { id: "LOG-0910", date: "2025-10-14 16:45:10", user: "Finance Lead (Ravi K)", action: "Approved Loan", entity: "Loan ADV-002", details: "Approved ₹50,000 for Sneha Rao", ip: "192.168.1.102" },
    { id: "LOG-0909", date: "2025-10-14 09:15:00", user: "Finance Lead (Ravi K)", action: "Exported Data", entity: "Analytics Report", details: "Exported Q3 Portfolio Risk Report as PDF", ip: "192.168.1.102" },
    { id: "LOG-0908", date: "2025-10-13 15:10:45", user: "System", action: "Failed Transaction", entity: "EWA Disbursal", details: "Transfer failed for TXN-8492X. Account inactive.", ip: "10.0.0.12" },
];

const COLUMNS: Column<AuditLog>[] = [
    {
        key: "id",
        label: "Log ID & Time",
        render: (log) => (
            <div>
                <div className="font-mono text-[#00E5FF] text-xs mb-1">{log.id}</div>
                <div className="text-[#8899AA] text-xs flex items-center gap-1">
                    <Clock size={12} aria-hidden="true" /> {log.date}
                </div>
            </div>
        ),
    },
    {
        key: "user",
        label: "Actor",
        render: (log) => (
            <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${log.user === "System" ? "bg-purple-500/20 text-purple-400" : "bg-[#1A2A3A] text-white"}`} aria-hidden="true">
                    {log.user === "System" ? "S" : <User size={12} />}
                </div>
                <span className="text-white font-medium">{log.user}</span>
            </div>
        ),
    },
    {
        key: "action",
        label: "Action & Entity",
        render: (log) => (
            <div>
                <div className="text-white font-medium">{log.action}</div>
                <div className="text-xs text-[#8899AA]">{log.entity}</div>
            </div>
        ),
    },
    {
        key: "details",
        label: "Details",
        render: (log) => <span className="text-[#8899AA] text-sm">{log.details}</span>,
    },
    {
        key: "ip",
        label: "IP Address",
        align: "right",
        render: (log) => (
            <span className="font-mono text-xs text-[#8899AA] bg-[#1A2A3A] px-2 py-1 rounded">{log.ip}</span>
        ),
    },
];

export default function FinanceAuditTrailPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = searchTerm
        ? AUDIT_LOGS.filter((l) =>
            l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : AUDIT_LOGS;

    return (
        <Page
            title="Compliance Audit Trail"
            subtitle="Immutable log of system changes, approvals, and data exports"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Settings", href: "/finance/settings" },
                { label: "Audit Trail" },
            ]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} />}>Date Range</Button>
                    <Button variant="secondary" icon={<Download size={14} />}>Export Log</Button>
                </>
            }
        >
            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center gap-3">
                    <ShieldCheck size={18} className="text-[#00E5FF]" aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Search logs by user, action, or ID..."
                        aria-label="Search audit logs"
                        className="flex-1 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00E5FF] transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="p-4">
                    <DataTable<AuditLog>
                        data={filtered}
                        columns={COLUMNS}
                        rowKey={(l) => l.id}
                        aria-label="Compliance audit trail"
                        emptyTitle="No audit logs found"
                        emptyDescription="Try adjusting your search query."
                    />
                </div>
            </Card>
        </Page>
    );
}
