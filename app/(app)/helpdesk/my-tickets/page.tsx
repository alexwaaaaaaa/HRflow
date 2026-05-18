"use client";
import { useState } from "react";
import {
    Ticket, Search, Plus, Filter, MessageSquare,
    CheckCircle2, AlertCircle, Clock, ChevronRight,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface MyTicket {
    id: string;
    title: string;
    category: string;
    status: "Open" | "In Progress" | "Closed";
    date: string;
    urgent: boolean;
    messages: number;
}

const MY_TICKETS: MyTicket[] = [
    { id: "TKT-4492", title: "Cannot access Jira board", category: "IT Support", status: "Open", date: "Today, 10:30 AM", urgent: true, messages: 2 },
    { id: "TKT-4485", title: "Requesting new monitor arm", category: "Facilities", status: "In Progress", date: "Mar 10, 2026", urgent: false, messages: 4 },
    { id: "TKT-4310", title: "Queries regarding flexible benefits", category: "HR Ops", status: "Closed", date: "Jan 15, 2026", urgent: false, messages: 7 },
    { id: "TKT-4302", title: "VPN connection dropping frequently", category: "IT Support", status: "Closed", date: "Jan 10, 2026", urgent: false, messages: 3 },
];

const STATUS_FILTERS = ["All", "Open", "In Progress", "Closed"] as const;

const STATUS_ICON = {
    Closed: CheckCircle2,
    "In Progress": Clock,
    Open: AlertCircle,
} as const;

const STATUS_COLOR = {
    Closed: "text-[#445566]",
    "In Progress": "text-[#FFB020]",
    Open: "text-[#33E6FF]",
} as const;

const STATUS_DOT = {
    Closed: "bg-[#445566]",
    "In Progress": "bg-[#FFB020]",
    Open: "bg-[#33E6FF]",
} as const;

export default function MyTicketsPage() {
    const [filter, setFilter] = useState<(typeof STATUS_FILTERS)[number]>("All");

    const filtered = MY_TICKETS.filter((t) => filter === "All" || t.status === filter);

    return (
        <Page
            title="My Helpdesk Tickets"
            subtitle="Track issues raised to IT, HR, or Facilities."
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "My Tickets" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]"
                            size={16}
                            aria-hidden="true"
                        />
                        <input
                            type="search"
                            placeholder="Search tickets..."
                            aria-label="Search my tickets"
                            className="w-64 rounded-lg border border-[#1A2A3A] bg-[#0F1C2E] py-2 pl-9 pr-4 text-sm text-white outline-none transition-colors focus:border-[#00E5A0]"
                        />
                    </div>
                    <Button icon={<Plus size={16} aria-hidden="true" />} href="/helpdesk/raise">Raise Ticket</Button>
                </>
            }
        >
            <Card padding="none">
                {/* Filters bar */}
                <div className="flex items-center gap-4 overflow-x-auto border-b border-[#1A2A3A] bg-[#152336] p-4">
                    {STATUS_FILTERS.map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => setFilter(status)}
                            className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                                filter === status
                                    ? "border-[#2A3A4A] bg-[#1A2A3A] text-white"
                                    : "border-transparent bg-transparent text-[#8899AA] hover:border-[#2A3A4A] hover:bg-[#1A2A3A]/50 hover:text-white"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                    <div className="mx-2 h-4 w-px bg-[#2A3A4A]" aria-hidden="true" />
                    <Button variant="ghost" size="sm" icon={<Filter size={14} aria-hidden="true" />}>
                        More Filters
                    </Button>
                </div>

                {/* Ticket List */}
                <div className="divide-y divide-[#1A2A3A]">
                    {filtered.map((ticket) => {
                        const StatusIcon = STATUS_ICON[ticket.status];
                        return (
                            <div
                                key={ticket.id}
                                className="group flex cursor-pointer flex-col items-start justify-between p-5 transition-colors hover:bg-[#1A2A3A]/50 sm:flex-row sm:items-center"
                            >
                                <div className="flex flex-1 items-start gap-4 pr-6">
                                    <div className={`mt-1 ${STATUS_COLOR[ticket.status]}`}>
                                        <StatusIcon size={24} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="mb-1 flex items-center gap-3">
                                            <span className="font-mono text-xs font-semibold text-[#8899AA]">
                                                {ticket.id}
                                            </span>
                                            {ticket.urgent && (
                                                <Badge variant="danger">Urgent</Badge>
                                            )}
                                        </div>
                                        <h3
                                            className={`mb-1 text-lg font-semibold transition-colors group-hover:text-[#00E5A0] ${
                                                ticket.status === "Closed" ? "text-[#8899AA]" : "text-white"
                                            }`}
                                        >
                                            {ticket.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-xs font-medium text-[#445566]">
                                            <span className="flex items-center gap-1.5 rounded bg-[#1A2A3A] px-2 py-0.5 text-[#33E6FF]">
                                                <Ticket size={12} aria-hidden="true" /> {ticket.category}
                                            </span>
                                            <span>{ticket.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-6 sm:mt-0">
                                    <div className="flex items-center gap-4 text-sm font-medium text-[#8899AA]">
                                        <span className="flex items-center gap-1.5 rounded-lg bg-[#1A2A3A] px-2.5 py-1">
                                            <MessageSquare
                                                size={14}
                                                className={ticket.messages > 0 ? "text-[#FFB020]" : ""}
                                                aria-hidden="true"
                                            />
                                            {ticket.messages}
                                        </span>
                                        <span className="flex w-24 items-center gap-1.5">
                                            <span
                                                className={`h-2 w-2 rounded-full ${STATUS_DOT[ticket.status]}`}
                                                aria-hidden="true"
                                            />
                                            {ticket.status}
                                        </span>
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2A3A] text-[#445566] transition-colors group-hover:bg-[#00E5A0] group-hover:text-[#0A1420]">
                                        <ChevronRight size={18} aria-hidden="true" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </Page>
    );
}
