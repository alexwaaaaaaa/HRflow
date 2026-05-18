"use client";

import { useState } from "react";
import { Video, Send, Calendar, Edit3, FileText, Paperclip, ChevronDown } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

type MsgStatus = "unread" | "read" | "draft";

interface Contact {
    id: number;
    name: string;
    role: string;
    time: string;
    status: MsgStatus;
    msg: string;
}

const STATUS_VARIANT: Record<MsgStatus, "info" | "neutral" | "warning"> = {
    unread: "info",
    read: "neutral",
    draft: "warning",
};

const CONTACTS: Contact[] = [
    { id: 1, name: "Rahul Sharma", role: "Sr. Frontend Eng", time: "10:45 AM", status: "unread", msg: "Hi Priya, thanks for reaching out. Yes, I am available for..." },
    { id: 2, name: "Anjali Singh", role: "Product Marketing", time: "Yesterday", status: "read", msg: "Could you confirm the time for tomorrow's technical round?" },
    { id: 3, name: "Vikram Reddy", role: "Sr. Frontend Eng", time: "12 Mar", status: "read", msg: "I have attached the assignment file as requested." },
    { id: 4, name: "Neha Gupta", role: "HR Business Partner", time: "10 Mar", status: "draft", msg: "Draft: Offer Negotiation Follow-up" },
    { id: 5, name: "Karan Patel", role: "Backend Engineer", time: "05 Mar", status: "read", msg: "Thanks for the update. Looking forward to the results." },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function ContactCell({ row }: { row: Contact }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <span className={`text-sm ${row.status === "unread" ? "font-bold text-white" : "font-medium text-[#8899AA]"}`}>
                    {row.name}
                </span>
                <span className="text-[10px] text-[#445566]">{row.time}</span>
            </div>
            <p className="mt-0.5 text-[11px] text-[#00E5A0]">{row.role}</p>
            <p className={`mt-0.5 truncate text-xs ${row.status === "unread" ? "text-white" : "text-[#445566]"}`}>
                {row.msg}
            </p>
        </div>
    );
}

function StatusCell({ row }: { row: Contact }) {
    return <Badge variant={STATUS_VARIANT[row.status]}>{row.status}</Badge>;
}

const COLUMNS: Column<Contact>[] = [
    {
        key: "contact",
        label: "Contact",
        render: (r) => <ContactCell row={r} />,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "status",
        label: "Status",
        align: "center",
        render: (r) => <StatusCell row={r} />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function CandidateCommunication() {
    const [msg, setMsg] = useState("");

    return (
        <Page
            title="Candidate Communications"
            subtitle="Manage all candidate messaging in one place"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Communications" },
            ]}
            maxWidth="1400px"
            actions={
                <Button icon={<Edit3 size={16} aria-hidden="true" />}>New Message</Button>
            }
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
                {/* Inbox list */}
                <Card padding="none">
                    <DataTable<Contact>
                        data={CONTACTS}
                        columns={COLUMNS}
                        rowKey={(c) => c.id}
                        searchable
                        searchPlaceholder="Search messages…"
                        aria-label="Message inbox"
                        emptyTitle="No messages"
                        emptyDescription="No candidate messages found."
                    />
                </Card>

                {/* Chat Area */}
                <Card padding="none" className="flex flex-col overflow-hidden">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0D1928] px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div
                                aria-hidden="true"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2A3A] text-sm font-bold text-white"
                            >
                                RS
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Rahul Sharma</h3>
                                <p className="text-xs text-[#8899AA]">Candidate · Senior Frontend Engineer</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" icon={<Video size={14} aria-hidden="true" />}>
                                Meet
                            </Button>
                            <Button variant="secondary" size="sm" icon={<FileText size={14} aria-hidden="true" />}>
                                Profile
                            </Button>
                        </div>
                    </div>

                    {/* Message History */}
                    <div className="flex-1 space-y-6 overflow-y-auto p-6">
                        <div className="flex items-center justify-center">
                            <div className="rounded-full bg-[#1A2A3A] px-3 py-1 text-[10px] font-bold text-[#8899AA]">
                                14 March 2025
                            </div>
                        </div>

                        {/* HR Outbound */}
                        <div className="flex flex-col items-end">
                            <div className="max-w-[70%] rounded-t-2xl rounded-bl-2xl rounded-br-sm bg-[#0066FF] p-4 text-white">
                                <p className="mb-3 text-sm leading-relaxed">
                                    Hi Rahul,
                                    <br />
                                    <br />
                                    Thank you for taking the time to speak with our engineering team
                                    yesterday. We were really impressed with your technical background.
                                    <br />
                                    <br />
                                    We would like to invite you for a final culture-fit round with our VP
                                    of Engineering this Thursday. Please let me know if 2:00 PM works?
                                </p>
                                <div className="inline-flex items-center gap-2 rounded-lg bg-[#0052cc] p-2 text-xs">
                                    <Calendar size={14} aria-hidden="true" /> Final Interview Invite.ics
                                </div>
                            </div>
                            <span className="mt-1 pr-1 text-[10px] text-[#445566]">You · 09:30 AM</span>
                        </div>

                        {/* Candidate Reply */}
                        <div className="flex flex-col items-start">
                            <div className="max-w-[70%] rounded-t-2xl rounded-bl-sm rounded-br-2xl border border-[#2A3A4A] bg-[#1A2A3A] p-4 text-white">
                                <p className="text-sm leading-relaxed">
                                    Hi Priya,
                                    <br />
                                    <br />
                                    Thanks for reaching out. Yes, I am available for the culture-fit round
                                    this Thursday at 2:00 PM.
                                    <br />
                                    <br />
                                    Looking forward to the conversation!
                                </p>
                            </div>
                            <span className="mt-1 pl-1 text-[10px] text-[#445566]">
                                Rahul Sharma · 10:45 AM
                            </span>
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-[#1A2A3A] bg-[#0D1928] p-4">
                        <div className="flex items-end gap-2 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-2 transition-colors focus-within:border-[#0066FF]">
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={<Paperclip size={18} aria-hidden="true" />}
                                aria-label="Attach file"
                            />
                            <textarea
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                placeholder="Type a message or use / for templates…"
                                aria-label="Message input"
                                className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent p-2 text-sm text-white focus:outline-none"
                                rows={1}
                            />
                            <div className="flex shrink-0 items-center gap-2 p-1">
                                <Button variant="secondary" size="sm" iconRight={<ChevronDown size={12} aria-hidden="true" />}>
                                    Templates
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    icon={<Send size={14} aria-hidden="true" />}
                                    aria-label="Send message"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
