"use client";
import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Ticket {
    id: string;
    title: string;
    priority: "Critical" | "High" | "Medium" | "Low";
    category: string;
    status: "Unassigned" | "In Progress" | "Escalated";
    user: string;
    time: string;
    assignee?: string;
}

const QUEUE_DATA: Ticket[] = [
    { id: "TKT-4501", title: "Need access to Figma Pro", priority: "Low", category: "IT", status: "Unassigned", user: "Kabir Das", time: "2m ago" },
    { id: "TKT-4492", title: "Cannot access Jira board", priority: "High", category: "IT", status: "In Progress", user: "Arjun Mehta", time: "1h ago", assignee: "Amit V." },
    { id: "TKT-4488", title: "Tax deduction clarification needed", priority: "Medium", category: "HR", status: "Unassigned", user: "Sneha Rao", time: "3h ago" },
    { id: "TKT-4485", title: "Requesting new monitor arm", priority: "Low", category: "Facilities", status: "In Progress", user: "Arjun Mehta", time: "1d ago", assignee: "Rahul D." },
    { id: "TKT-4470", title: "Office wifi down", priority: "Critical", category: "IT", status: "Escalated", user: "Priya Singh", time: "2d ago", assignee: "Amit V." },
];

const PRIORITY_VARIANT = {
    Critical: "danger",
    High: "warning",
    Medium: "info",
    Low: "neutral",
} as const;

const STATUS_DOT = {
    Unassigned: "bg-[#8899AA]",
    "In Progress": "bg-[#33E6FF]",
    Escalated: "bg-[#FF4444]",
} as const;

const listColumns: Column<Ticket>[] = [
    {
        key: "id",
        label: "Ticket ID & Subject",
        render: (row) => (
            <Link href={`/helpdesk/management/${row.id}`} className="block">
                <span className="mb-1 block font-mono text-xs text-[#8899AA]">{row.id}</span>
                <span className="font-semibold text-white hover:text-[#33E6FF]">{row.title}</span>
            </Link>
        ),
    },
    {
        key: "user",
        label: "Requester",
        render: (row) => <span className="text-[#8899AA]">{row.user}</span>,
    },
    {
        key: "priority",
        label: "Priority",
        render: (row) => (
            <Badge variant={PRIORITY_VARIANT[row.priority]}>{row.priority}</Badge>
        ),
    },
    {
        key: "status",
        label: "Status",
        render: (row) => (
            <span className="flex items-center gap-1.5 font-medium text-white">
                <span className={`h-2 w-2 rounded-full ${STATUS_DOT[row.status]}`} aria-hidden="true" />
                {row.status}
            </span>
        ),
    },
    {
        key: "assignee",
        label: "Assignee",
        render: (row) =>
            row.assignee ? (
                <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-[10px] font-bold text-white">
                        {row.assignee.slice(0, 2)}
                    </div>
                    <span className="text-[#8899AA]">{row.assignee}</span>
                </div>
            ) : (
                <button
                    type="button"
                    className="rounded border border-[#00E5A0]/20 bg-[#00E5A0]/10 px-2 py-1 text-xs text-[#00E5A0] hover:underline"
                >
                    Assign to me
                </button>
            ),
    },
    {
        key: "time",
        label: "Created",
        render: (row) => <span className="text-[#8899AA]">{row.time}</span>,
    },
];

export default function TicketManagementPage() {
    const [view, setView] = useState<"list" | "kanban">("list");

    return (
        <Page
            title="Ticket Queue Management"
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "Management" },
            ]}
            maxWidth="1400px"
            actions={
                <div className="flex items-center gap-2 rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] p-1">
                    <button
                        type="button"
                        onClick={() => setView("list")}
                        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                            view === "list"
                                ? "bg-[#2A3A4A] text-white shadow-sm"
                                : "text-[#8899AA] hover:text-white"
                        }`}
                    >
                        List View
                    </button>
                    <button
                        type="button"
                        onClick={() => setView("kanban")}
                        className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                            view === "kanban"
                                ? "bg-[#2A3A4A] text-white shadow-sm"
                                : "text-[#8899AA] hover:text-white"
                        }`}
                    >
                        Kanban
                    </button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Filters Bar */}
                <Card padding="md">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]"
                                    size={16}
                                    aria-hidden="true"
                                />
                                <input
                                    type="search"
                                    placeholder="Search tickets by ID, keyword, or user..."
                                    aria-label="Search tickets"
                                    className="w-80 rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] py-2 pl-9 pr-4 text-sm text-white outline-none transition-colors focus:border-[#00E5A0]"
                                />
                            </div>
                            <div className="h-6 w-px bg-[#2A3A4A]" aria-hidden="true" />
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] px-3 py-2 text-sm text-white transition-colors hover:bg-[#2A3A4A]"
                            >
                                Status:{" "}
                                <span className="text-[#33E6FF]">All Open</span>
                                <ChevronDown size={14} className="text-[#8899AA]" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] px-3 py-2 text-sm text-white transition-colors hover:bg-[#2A3A4A]"
                            >
                                Assignee:{" "}
                                <span className="text-[#FFB020]">Me</span>
                                <ChevronDown size={14} className="text-[#8899AA]" aria-hidden="true" />
                            </button>
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<Filter size={14} aria-hidden="true" />}
                            >
                                More Filters (0)
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Main Content */}
                {view === "list" ? (
                    <DataTable<Ticket>
                        data={QUEUE_DATA}
                        columns={listColumns}
                        rowKey={(row) => row.id}
                        aria-label="Ticket queue"
                    />
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-4">
                        {/* Unassigned Column */}
                        <div className="flex h-[500px] w-80 shrink-0 flex-col overflow-hidden rounded-xl border border-[#1A2A3A] bg-[#152336]">
                            <div className="flex justify-between border-b border-[#2A3A4A] bg-[#1A2A3A] p-3 font-bold text-white">
                                Unassigned{" "}
                                <span className="text-[#8899AA]">
                                    {QUEUE_DATA.filter((t) => t.status === "Unassigned").length}
                                </span>
                            </div>
                            <div className="flex-1 space-y-3 overflow-y-auto p-3">
                                {QUEUE_DATA.filter((t) => t.status === "Unassigned").map((t) => (
                                    <div
                                        key={t.id}
                                        className="cursor-grab rounded-lg border border-[#2A3A4A] bg-[#0A1420] p-3 transition-colors hover:border-[#33E6FF]"
                                    >
                                        <span className="font-mono text-xs text-[#8899AA]">{t.id}</span>
                                        <h4 className="mb-2 mt-1 text-sm font-semibold text-white">{t.title}</h4>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-[#8899AA]">{t.user}</span>
                                            <Badge variant={PRIORITY_VARIANT[t.priority]}>{t.priority}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* In Progress Column */}
                        <div className="flex h-[500px] w-80 shrink-0 flex-col overflow-hidden rounded-xl border border-[#1A2A3A] bg-[#152336]">
                            <div className="flex justify-between border-b border-[#2A3A4A] bg-[#1A2A3A] p-3 font-bold text-white">
                                In Progress{" "}
                                <span className="text-[#8899AA]">
                                    {QUEUE_DATA.filter((t) => t.status === "In Progress").length}
                                </span>
                            </div>
                            <div className="flex-1 space-y-3 overflow-y-auto p-3">
                                {QUEUE_DATA.filter((t) => t.status === "In Progress").map((t) => (
                                    <Link
                                        href={`/helpdesk/management/${t.id}`}
                                        key={t.id}
                                        className="block cursor-grab rounded-lg border border-[#2A3A4A] bg-[#0A1420] p-3 transition-colors hover:border-[#33E6FF]"
                                    >
                                        <span className="font-mono text-xs text-[#8899AA]">{t.id}</span>
                                        <h4 className="mb-2 mt-1 text-sm font-semibold text-white">{t.title}</h4>
                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1">
                                                <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-[8px] text-white">
                                                    {t.assignee?.slice(0, 2)}
                                                </div>
                                            </div>
                                            <Badge variant={PRIORITY_VARIANT[t.priority]}>{t.priority}</Badge>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Page>
    );
}
