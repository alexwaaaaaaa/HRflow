"use client";

import { UserMinus, Clock, CheckCircle, ArrowUpRight, TrendingDown, Mail, ExternalLink } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface ExitEntry {
    id: string;
    name: string;
    initials: string;
    dept: string;
    exitDate: string;
    status: "Resigned" | "Notice Period" | "FnF Pending" | "Clearance";
    progress: number;
}

type StatusVariant = "info" | "warning" | "neutral" | "success";

const STATUS_VARIANT: Record<ExitEntry["status"], StatusVariant> = {
    Resigned: "info",
    "Notice Period": "warning",
    "FnF Pending": "neutral",
    Clearance: "success",
};

const CURRENT_EXITS: ExitEntry[] = [
    { id: "EMP-771", name: "Arnab Das", initials: "AD", dept: "Engineering", exitDate: "24 Mar 2024", status: "Notice Period", progress: 65 },
    { id: "EMP-892", name: "Sanya Gupta", initials: "SG", dept: "Marketing", exitDate: "15 Mar 2024", status: "FnF Pending", progress: 90 },
    { id: "EMP-443", name: "Rahul Verma", initials: "RV", dept: "Product", exitDate: "28 Mar 2024", status: "Resigned", progress: 10 },
    { id: "EMP-211", name: "Megha Singh", initials: "MS", dept: "Sales", exitDate: "10 Mar 2024", status: "Clearance", progress: 45 },
];

const PENDING_APPROVALS = [
    { title: "Notice Period Waiver", emp: "Vikram Mehta", time: "2h ago", level: "High" as const },
    { title: "Notice Buyout Request", emp: "Sneha Rao", time: "5h ago", level: "Med" as const },
    { title: "Resignation Acceptance", emp: "Amitabh S.", time: "1d ago", level: "Low" as const },
];

const LEVEL_VARIANT: Record<"High" | "Med" | "Low", "danger" | "warning" | "neutral"> = {
    High: "danger",
    Med: "warning",
    Low: "neutral",
};

const COLUMNS: Column<ExitEntry>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (e) => (
            <div className="flex items-center gap-3">
                <div
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2A3A] text-xs font-bold text-[#8899AA]"
                >
                    {e.initials}
                </div>
                <div>
                    <p className="text-sm font-semibold text-white">{e.name}</p>
                    <p className="text-[11px] text-[#7a8fa6]">{e.id} · {e.dept}</p>
                </div>
            </div>
        ),
        sortable: true,
        sortValue: (e) => e.name,
    },
    {
        key: "lwd",
        label: "LWD",
        render: (e) => (
            <div>
                <p className="text-sm font-semibold text-white">{e.exitDate}</p>
                <Badge variant={STATUS_VARIANT[e.status]}>{e.status}</Badge>
            </div>
        ),
    },
    {
        key: "progress",
        label: "Progress",
        render: (e) => (
            <div className="flex min-w-[160px] items-center gap-3">
                <div
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#060B14]"
                    role="progressbar"
                    aria-valuenow={e.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${e.name} exit progress: ${e.progress}%`}
                >
                    <div className="h-full bg-blue-500 transition-all" style={{ width: `${e.progress}%` }} />
                </div>
                <span className="text-xs font-bold text-white">{e.progress}%</span>
            </div>
        ),
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (e) => (
            <Button
                variant="ghost"
                size="sm"
                icon={<ExternalLink size={14} aria-hidden="true" />}
                aria-label={`Open ${e.name} FnF details`}
            />
        ),
    },
];

export default function FnFDashboard() {
    const stats = [
        { label: "Total Exits (MTD)", value: "12", change: "+2 vs last month", icon: UserMinus, variant: "info" as const },
        { label: "Pending FnF", value: "45", change: "8 high priority", icon: Clock, variant: "warning" as const },
        { label: "Settled this Month", value: "08", change: "Avg 4 days TAT", icon: CheckCircle, variant: "success" as const },
        { label: "Avg Exit Rating", value: "4.2", change: "-5% vs Q3", icon: TrendingDown, variant: "danger" as const },
    ];

    return (
        <Page
            title="FnF Settlement Hub"
            subtitle="Manage employee exits, clear documentation, and finalize financial settlements with precision."
            breadcrumbs={[{ label: "FnF", href: "/fnf/dashboard" }, { label: "Dashboard" }]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Mail size={14} aria-hidden="true" />}>
                        Bulk Reminders
                    </Button>
                    <Button icon={<ArrowUpRight size={14} aria-hidden="true" />}>
                        Initiate Exit
                    </Button>
                </>
            }
        >
            <div className="space-y-8">
                {/* KPI strip */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.label} padding="md">
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl bg-[#060B14] p-2.5">
                                    <stat.icon size={20} className="text-[#8899AA]" aria-hidden="true" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">{stat.label}</p>
                                    <p className="mt-1 text-3xl font-black text-white">{stat.value}</p>
                                    <p className="mt-1 text-xs text-[#7a8fa6]">{stat.change}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Active Exit Tracker */}
                    <div className="lg:col-span-2">
                        <Card padding="none">
                            <div className="flex items-center justify-between border-b border-[#1A2A3A] px-6 py-4">
                                <h2 className="flex items-center gap-2 text-base font-bold text-white">
                                    <Clock size={18} className="text-amber-500" aria-hidden="true" />
                                    Active Exit Pipeline
                                </h2>
                            </div>
                            <div className="p-4">
                                <DataTable<ExitEntry>
                                    data={CURRENT_EXITS}
                                    columns={COLUMNS}
                                    rowKey={(e) => e.id}
                                    searchable
                                    searchPlaceholder="Search exits…"
                                    aria-label="Active exit pipeline"
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Quick Links & Pending Approvals */}
                    <div className="space-y-6">
                        <Card padding="md">
                            <div className="mb-4">
                                <h3 className="text-base font-bold text-white">Generate Exit Docs</h3>
                                <p className="mt-1 text-sm text-[#8899AA]">
                                    Quickly generate experience letters, relieving letters, and PF forms.
                                </p>
                            </div>
                            <Button variant="primary" className="w-full">
                                Launch Document Generator
                            </Button>
                        </Card>

                        <Card padding="md">
                            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#7a8fa6]">
                                Pending Approvals
                            </h3>
                            <ul className="space-y-2" role="list">
                                {PENDING_APPROVALS.map((item) => (
                                    <li
                                        key={item.title}
                                        className="flex items-start gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-[#1A2A3A] hover:bg-[#1A2A3A]/30"
                                    >
                                        <Badge variant={LEVEL_VARIANT[item.level]} dot />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-white">{item.title}</p>
                                            <p className="text-xs text-[#7a8fa6]">{item.emp} · {item.time}</p>
                                        </div>
                                        <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-[#7a8fa6]" aria-hidden="true" />
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline" size="sm" className="mt-3 w-full">
                                View All Approvals (12)
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
