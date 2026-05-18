"use client";

import { Clock, Download, Filter, Plus, Settings, Shield, FileText, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type LogCategory = "Access" | "Workflows" | "Data" | "Templates" | "Security";

interface AuditLog {
    id: number;
    user: string;
    action: string;
    target: string;
    category: LogCategory;
    time: string;
    ip: string;
    icon: LucideIcon;
}

const LOGS: AuditLog[] = [
    { id: 1, user: "Priya Sharma", action: "Updated Role Permissions", target: "HR Admin Role", category: "Access", time: "2 mins ago", ip: "103.21.45.78", icon: Shield },
    { id: 2, user: "Vikram Desai", action: "Created Workflow", target: "Exit Clearance (WF-004)", category: "Workflows", time: "15 mins ago", ip: "103.21.45.80", icon: Plus },
    { id: 3, user: "System", action: "Data Export Triggered", target: "Employee Master (CSV)", category: "Data", time: "1 hr ago", ip: "system", icon: Download },
    { id: 4, user: "Priya Sharma", action: "Deactivated User", target: "Arjun Nair", category: "Access", time: "3 hrs ago", ip: "103.21.45.78", icon: Trash2 },
    { id: 5, user: "Aditi Menon", action: "Modified Email Template", target: "TPL-ONB-01 (Welcome Email)", category: "Templates", time: "5 hrs ago", ip: "49.207.11.23", icon: FileText },
    { id: 6, user: "System", action: "API Key Rotated", target: "Production — Payroll Sync", category: "Security", time: "Yesterday", ip: "system", icon: Settings },
];

const CATEGORY_VARIANT: Record<LogCategory, BadgeVariant> = {
    Access: "info",
    Workflows: "purple",
    Data: "warning",
    Templates: "neutral",
    Security: "danger",
};

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function ActorCell({ log }: { log: AuditLog }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            {log.user === "System" ? (
                <div className="w-7 h-7 rounded-full bg-[#1A2A3A] flex items-center justify-center" aria-hidden="true">
                    <Settings size={12} className="text-[#8899AA]" />
                </div>
            ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white" aria-hidden="true">
                    {log.user.split(" ").map((n) => n[0]).join("")}
                </div>
            )}
            <span className="text-white font-medium">{log.user}</span>
        </div>
    );
}

function ActionCell({ log }: { log: AuditLog }) {
    const Icon = log.icon;
    return (
        <span className="text-sm text-white flex items-center gap-1.5">
            <Icon size={14} className="text-indigo-400" aria-hidden="true" /> {log.action}
        </span>
    );
}

function TimeCell({ time }: { time: string }) {
    return (
        <span className="text-sm text-[#8899AA] flex items-center gap-1.5">
            <Clock size={12} aria-hidden="true" /> {time}
        </span>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<AuditLog>[] = [
    {
        key: "actor",
        label: "Actor",
        render: (log) => <ActorCell log={log} />,
        sortable: true,
        sortValue: (log) => log.user,
    },
    {
        key: "action",
        label: "Action",
        render: (log) => <ActionCell log={log} />,
    },
    {
        key: "target",
        label: "Target",
        render: (log) => <span className="text-sm text-[#8899AA]">{log.target}</span>,
    },
    {
        key: "category",
        label: "Category",
        render: (log) => <Badge variant={CATEGORY_VARIANT[log.category]}>{log.category}</Badge>,
        sortable: true,
        sortValue: (log) => log.category,
    },
    {
        key: "time",
        label: "Timestamp",
        render: (log) => <TimeCell time={log.time} />,
    },
    {
        key: "ip",
        label: "IP Address",
        render: (log) => <span className="text-xs text-[#7a8fa6] font-mono">{log.ip}</span>,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsAuditLogPage() {
    return (
        <Page
            title="Settings Audit Log"
            subtitle="Immutable record of all administrative actions taken within the Settings module."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Audit Log" },
            ]}
            maxWidth="1280px"
            actions={
                <div className="flex gap-2">






                    <Button variant="secondary" icon={<Filter size={16} aria-hidden="true" />}>Filter</Button>
                    <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>Export</Button>
                </div>
            }
        >
            <Card padding="none">
                <DataTable<AuditLog>
                    data={LOGS}
                    columns={COLUMNS}
                    rowKey={(log) => log.id}
                    searchable
                    searchPlaceholder="Search actions…"
                    aria-label="Settings audit log"
                    emptyTitle="No audit entries"
                    emptyDescription="Administrative actions will appear here."
                />
            </Card>
        

        

        

        </Page>
    );
}
