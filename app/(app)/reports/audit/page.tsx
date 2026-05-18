"use client";

import { Download, Filter, CheckCircle2, History } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static data ──────────────────────────────────────────────────────────────

type Severity = "Critical" | "Info" | "Warning" | "High";

const SEVERITY_VARIANT: Record<Severity, "danger" | "success" | "warning" | "warning"> = {
    Critical: "danger",
    Info: "success",
    Warning: "warning",
    High: "warning",
};

interface AuditRow {
    id: string;
    timestamp: string;
    actor: string;
    ip: string;
    action: string;
    resource: string;
    severity: Severity;
}

const AUDIT_ROWS: AuditRow[] = [
    {
        id: "a1",
        timestamp: "2026-03-08 14:22:01",
        actor: "admin@company.com",
        ip: "192.168.1.45",
        action: "Unlock Payroll Month (Feb 2026)",
        resource: "Payroll Engine",
        severity: "Critical",
    },
    {
        id: "a2",
        timestamp: "2026-03-08 13:15:44",
        actor: "j.doe@company.com",
        ip: "10.0.0.12",
        action: "Generate Custom Report (Headcount)",
        resource: "Reports & Analytics",
        severity: "Info",
    },
    {
        id: "a3",
        timestamp: "2026-03-08 09:44:12",
        actor: "System (Automated)",
        ip: "Internal",
        action: "Failed SSO Login (Invalid Assert)",
        resource: "Authentication",
        severity: "Warning",
    },
    {
        id: "a4",
        timestamp: "2026-03-07 18:30:00",
        actor: "hr.head@company.com",
        ip: "192.168.1.100",
        action: "Modified Leave Policy (Sick Leave Quota)",
        resource: "Core HR Settings",
        severity: "High",
    },
];

const AUDIT_COLUMNS: Column<AuditRow>[] = [
    {
        key: "timestamp",
        label: "Timestamp (UTC)",
        render: (r) => <span className="font-mono text-[#8899AA] text-xs">{r.timestamp}</span>,
        sortable: true,
        sortValue: (r) => r.timestamp,
    },
    {
        key: "actor",
        label: "Actor",
        render: (r) => <span className="text-indigo-400 text-xs">{r.actor}</span>,
    },
    {
        key: "ip",
        label: "IP Address",
        render: (r) => <span className="font-mono text-[#8899AA] text-xs">{r.ip}</span>,
        hideOnMobile: true,
    },
    {
        key: "action",
        label: "Action",
        render: (r) => <span className="text-white text-sm">{r.action}</span>,
    },
    {
        key: "resource",
        label: "Resource/Module",
        render: (r) => <span className="text-[#8899AA] text-xs">{r.resource}</span>,
        hideOnMobile: true,
    },
    {
        key: "severity",
        label: "Severity",
        render: (r) => <Badge variant={SEVERITY_VARIANT[r.severity]}>{r.severity}</Badge>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AuditReportPage() {
    return (
        <Page
            title="System Audit Logs"
            subtitle="Immutable record of all critical system events, access, and configuration changes."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Audit Trail" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>
                        Filter Logs
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Export CSV (Secure)</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Events Last 24h</p>
                        <p className="text-3xl font-bold text-white">4,281</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Failed Logins</p>
                        <p className="text-3xl font-bold text-pink-400 mb-1">12</p>
                        <p className="text-[10px] text-[#8899AA]">Blocked IPs: 2</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Critical Config Changes</p>
                        <p className="text-3xl font-bold text-amber-500 mb-1">3</p>
                        <p className="text-[10px] text-[#8899AA]">Payroll locks bypassed</p>
                    </Card>
                    <Card padding="lg" className="border-emerald-500/30">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Data Integrity</p>
                        <p className="text-3xl font-bold text-emerald-400 flex items-center gap-2">
                            100%
                            <CheckCircle2 size={20} aria-hidden="true" />
                        </p>
                    </Card>
                </div>

                {/* Audit table */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-[#1A2A3A]/20">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            <History size={16} className="text-pink-500" aria-hidden="true" />
                            Event Chronology
                        </h2>
                        <div className="flex gap-2">
                            <label htmlFor="module-filter" className="sr-only">
                                Filter by module
                            </label>
                            <select
                                id="module-filter"
                                className="bg-[#0B1221] border border-[#2A3A4A] text-[#8899AA] text-xs rounded px-2 py-1 focus:outline-none focus:border-[#00e5a0]"
                            >
                                <option>Module: All</option>
                                <option>Module: Payroll</option>
                                <option>Module: Authentication</option>
                            </select>
                            <label htmlFor="severity-filter" className="sr-only">
                                Filter by severity
                            </label>
                            <select
                                id="severity-filter"
                                className="bg-[#0B1221] border border-[#2A3A4A] text-[#8899AA] text-xs rounded px-2 py-1 focus:outline-none focus:border-[#00e5a0]"
                            >
                                <option>Severity: All</option>
                                <option>Severity: Critical</option>
                            </select>
                        </div>
                    </div>
                    <DataTable<AuditRow>
                        data={AUDIT_ROWS}
                        columns={AUDIT_COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search events, actors, resources…"
                        emptyTitle="No audit events"
                        emptyDescription="No events match the current filters."
                        aria-label="System audit log"
                    />
                </Card>
            </div>
        </Page>
    );
}
