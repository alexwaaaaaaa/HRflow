"use client";

import { useState } from "react";
import { Search, Calendar, MessageSquare, Check, XCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

// ─── Types & static data ──────────────────────────────────────────────────────

type TabKey = "Pending" | "Approved" | "Rejected";

interface WfhRequest {
    id: string;
    empName: string;
    empId: string;
    dept: string;
    date: string;
    remaining: string;
    reason: string;
    status: TabKey;
}

const REQUESTS: WfhRequest[] = [
    { id: "1", empName: "Rohan Sharma", empId: "EMP124", dept: "Engineering", date: "08 Nov 2024", remaining: "6/8", reason: "Personal errands in the morning", status: "Pending" },
    { id: "2", empName: "Aditi Jain", empId: "EMP044", dept: "Sales", date: "11 Nov 2024", remaining: "1/8", reason: "Feeling unwell, mild fever", status: "Pending" },
];

const TABS: TabKey[] = ["Pending", "Approved", "Rejected"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WfhApprovalsPage() {
    const toast = useToast();
    const [activeTab, setActiveTab] = useState<TabKey>("Pending");
    const [search, setSearch] = useState("");

    const filtered = REQUESTS.filter(
        (r) =>
            r.status === activeTab &&
            (r.empName.toLowerCase().includes(search.toLowerCase()) ||
                r.empId.toLowerCase().includes(search.toLowerCase()))
    );

    const handleApprove = (req: WfhRequest) => {
        // TODO: replace with real mutation
        toast.show({ variant: "success", title: "WFH approved", description: `${req.empName}'s request for ${req.date} has been approved.` });
    };

    const handleReject = (req: WfhRequest) => {
        // TODO: replace with real mutation
        toast.show({ variant: "danger", title: "WFH rejected", description: `${req.empName}'s request has been rejected.` });
    };

    return (
        <Page
            title="WFH Approvals"
            subtitle="Review and manage incoming remote work requests from the team"
            breadcrumbs={[
                { label: "Hybrid", href: "/hybrid/wfh/request" },
                { label: "WFH Approvals" },
            ]}
            maxWidth="1200px"
        >
            <div className="space-y-4">
                {/* Tabs + search bar */}
                <Card padding="sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex gap-1" role="tablist" aria-label="Filter by status">
                            {TABS.map((tab) => {
                                const active = activeTab === tab;
                                return (
                                    <Button
                                        key={tab}
                                        role="tab"
                                        aria-selected={active}
                                        variant={active ? "secondary" : "ghost"}
                                        size="sm"
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                        {tab === "Pending" && (
                                            <span className="ml-2 rounded-full bg-[#3b82f6] px-1.5 py-0.5 text-[10px] font-black text-white">
                                                {REQUESTS.filter((r) => r.status === "Pending").length}
                                            </span>
                                        )}
                                    </Button>
                                );
                            })}
                        </div>

                        <div className="relative">
                            <Search
                                size={14}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8fa6]"
                                aria-hidden="true"
                            />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search employee…"
                                aria-label="Search employee"
                                className="h-9 w-48 rounded-lg border border-[#1A2A3A] bg-[#060B14] pl-9 pr-3 text-sm text-white outline-none placeholder:text-[#7a8fa6] focus:border-[#00e5a0]"
                            />
                        </div>
                    </div>
                </Card>

                {/* Request cards */}
                {filtered.length === 0 ? (
                    <Card padding="lg">
                        <p className="text-center text-sm text-[#7a8fa6]">No {activeTab.toLowerCase()} requests.</p>
                    </Card>
                ) : (
                    <ul className="space-y-4" role="list" aria-label="WFH approval requests">
                        {filtered.map((req) => (
                            <li key={req.id}>
                                <Card padding="none" className="overflow-hidden">
                                    {/* Card header */}
                                    <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                aria-hidden="true"
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-sm font-bold text-white"
                                            >
                                                {req.empName.split(" ").map((n) => n[0]).join("")}
                                            </div>
                                            <div>
                                                <p className="text-base font-bold text-white">{req.empName}</p>
                                                <p className="text-xs text-[#8899AA]">{req.empId} · {req.dept}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                                            <Calendar size={12} className="text-[#3b82f6]" aria-hidden="true" />
                                            Req Date: {req.date}
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-12 md:items-center">
                                        {/* Balance */}
                                        <div className="rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4 md:col-span-4">
                                            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8899AA]">Month Balance</p>
                                            <p className="text-2xl font-black text-white">
                                                {req.remaining}{" "}
                                                <span className="ml-1 text-xs font-bold text-[#556677]">days left</span>
                                            </p>
                                        </div>

                                        {/* Reason */}
                                        <div className="border-[#1A2A3A] md:col-span-5 md:border-l md:pl-6">
                                            <div className="flex items-start gap-3 text-sm">
                                                <MessageSquare size={16} className="mt-0.5 shrink-0 text-[#556677]" aria-hidden="true" />
                                                <div>
                                                    <span className="mb-1 block text-xs font-bold text-[#8899AA]">Reason</span>
                                                    <p className="text-slate-300">"{req.reason}"</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-3 md:col-span-3">
                                            <Button
                                                variant="primary"
                                                icon={<Check size={16} aria-hidden="true" />}
                                                onClick={() => handleApprove(req)}
                                                aria-label={`Approve WFH for ${req.empName}`}
                                            >
                                                Approve WFH
                                            </Button>
                                            <Button
                                                variant="danger"
                                                icon={<XCircle size={16} aria-hidden="true" />}
                                                onClick={() => handleReject(req)}
                                                aria-label={`Reject WFH for ${req.empName}`}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Page>
    );
}

// Suppress unused import — Badge is used for future approved/rejected tabs
void Badge;
