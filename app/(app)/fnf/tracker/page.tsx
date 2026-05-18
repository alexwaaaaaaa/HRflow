"use client";

import {
    Filter, MoreHorizontal, CheckCircle, Clock, AlertCircle, Eye, MessageSquare, ShieldAlert,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

type SlaStatus = "On Track" | "At Risk" | "Completed" | "Upcoming";

interface TrackerRow {
    id: string;
    name: string;
    initials: string;
    lwd: string;
    stage: string;
    sla: SlaStatus;
    progress: number;
    docs: number;
}

const SLA_VARIANT: Record<SlaStatus, "success" | "danger" | "neutral" | "info"> = {
    "On Track": "success",
    "At Risk": "danger",
    Completed: "success",
    Upcoming: "info",
};

const SLA_ICON: Record<SlaStatus, typeof CheckCircle> = {
    "On Track": CheckCircle,
    "At Risk": AlertCircle,
    Completed: CheckCircle,
    Upcoming: Clock,
};

const TRACKER_ROWS: TrackerRow[] = [
    { id: "EMP-771", name: "Arnab Das", initials: "AD", lwd: "24 Apr 24", stage: "Finance Review", sla: "On Track", progress: 65, docs: 4 },
    { id: "EMP-442", name: "Rahul Nair", initials: "RN", lwd: "12 Apr 24", stage: "Asset Recovery", sla: "At Risk", progress: 40, docs: 2 },
    { id: "EMP-901", name: "Sonia Gill", initials: "SG", lwd: "28 Mar 24", stage: "Settled", sla: "Completed", progress: 100, docs: 6 },
    { id: "EMP-112", name: "Priya Iyer", initials: "PI", lwd: "05 May 24", stage: "Notice Period", sla: "Upcoming", progress: 10, docs: 1 },
];

const COLUMNS: Column<TrackerRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => (
            <div className="flex items-center gap-3">
                <div
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1A2A3A] bg-[#060B14] text-xs font-black text-blue-500"
                >
                    {r.initials}
                </div>
                <div>
                    <p className="text-sm font-black uppercase tracking-tight text-white">{r.name}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#445566]">{r.id}</p>
                </div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "lwd",
        label: "LWD",
        render: (r) => <span className="text-xs font-bold text-[#8899AA]">{r.lwd}</span>,
    },
    {
        key: "stage",
        label: "Current Stage",
        render: (r) => (
            <div className="max-w-[160px] space-y-1.5">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#8899AA]">
                    <span>{r.stage}</span>
                    <span>{r.progress}%</span>
                </div>
                <div
                    className="h-1 overflow-hidden rounded-full border border-[#1A2A3A] bg-[#060B14]"
                    role="progressbar"
                    aria-valuenow={r.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${r.name} stage progress: ${r.progress}%`}
                >
                    <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${r.progress}%` }} />
                </div>
            </div>
        ),
    },
    {
        key: "sla",
        label: "SLA Status",
        render: (r) => {
            const Icon = SLA_ICON[r.sla];
            return (
                <div className="flex items-center gap-2">
                    <Icon size={14} aria-hidden="true" className="shrink-0" />
                    <Badge variant={SLA_VARIANT[r.sla]}>{r.sla}</Badge>
                </div>
            );
        },
    },
    {
        key: "docs",
        label: "Documents",
        render: (r) => (
            <Badge variant="info">{r.docs} Files</Badge>
        ),
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (r) => (
            <div className="inline-flex items-center gap-2">
                <Button variant="ghost" size="sm" icon={<Eye size={16} aria-hidden="true" />} aria-label={`View ${r.name} progress`} />
                <Button variant="ghost" size="sm" icon={<MessageSquare size={16} aria-hidden="true" />} aria-label={`Add note for ${r.name}`} />
                <Button variant="ghost" size="sm" icon={<MoreHorizontal size={16} aria-hidden="true" />} aria-label={`More actions for ${r.name}`} />
            </div>
        ),
    },
];

interface AnalyticsCard {
    label: string;
    val: string;
    trend: string;
    icon: typeof Clock;
    color: string;
}

const ANALYTICS_CARDS: AnalyticsCard[] = [
    { label: "Avg Cycle Time", val: "12.4 Days", trend: "-2.1", icon: Clock, color: "text-blue-500" },
    { label: "Pending Clearances", val: "28 Cases", trend: "+4", icon: AlertCircle, color: "text-amber-500" },
    { label: "Settled this Month", val: "₹1.2Cr+", trend: "88%", icon: CheckCircle, color: "text-emerald-500" },
    { label: "Audit Exceptions", val: "02", trend: "Critical", icon: ShieldAlert, color: "text-rose-500" },
];

export default function FnFTracker() {
    return (
        <Page
            title="FnF Lifecycle Tracker"
            subtitle="Real-time monitoring of all active exit settlements."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Tracker" },
            ]}
            maxWidth="1400px"
            actions={
                <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>
                    Filter
                </Button>
            }
        >
            <div className="space-y-8">
                {/* Tracking Table */}
                <Card padding="none">
                    <div className="p-4">
                        <DataTable<TrackerRow>
                            data={TRACKER_ROWS}
                            columns={COLUMNS}
                            rowKey={(r) => r.id}
                            searchable
                            searchPlaceholder="Search by ID, name or stage…"
                            aria-label="FnF lifecycle tracker"
                        />
                    </div>
                </Card>

                {/* Analytics Snapshot */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {ANALYTICS_CARDS.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Card key={card.label} padding="md">
                                <div className="mb-3 flex items-start justify-between">
                                    <div className={`rounded-xl border border-[#1A2A3A] bg-[#060B14] p-2 ${card.color}`}>
                                        <Icon size={20} aria-hidden="true" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                        {card.trend}
                                    </span>
                                </div>
                                <p className="text-2xl font-black tracking-tight text-white">{card.val}</p>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                    {card.label}
                                </p>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </Page>
    );
}
