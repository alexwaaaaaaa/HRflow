"use client";
import { useState } from "react";
import {
    Paperclip, Send, CheckCircle2, Lock, FastForward, GitMerge, Settings, X,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Message {
    id: number;
    sender: string;
    role: string;
    time: string;
    content: string;
    attachments?: string[];
    internal: boolean;
}

const MOCK_MESSAGES: Message[] = [
    {
        id: 1,
        sender: "Arjun Mehta",
        role: "Employee",
        time: "Today, 10:30 AM",
        content: "Hi team, I am unable to access the Jira project boards. It says my license has expired. Could you please provision access? Attached is the screenshot.",
        attachments: ["jira_error.png"],
        internal: false,
    },
    {
        id: 2,
        sender: "System",
        role: "Bot",
        time: "Today, 10:31 AM",
        content: "Ticket auto-routed to IT Support based on keyword 'Jira'. SLA First Response: 2h. SLA Resolution: 8h.",
        internal: true,
    },
    {
        id: 3,
        sender: "Amit Verma",
        role: "IT Agent",
        time: "Today, 11:15 AM",
        content: "Hi Arjun, looking into this now. It seems your Atlassian group assignment was missed during onboarding. I am syncing the groups now, it should work in 15 mins. Please confirm once able to access.",
        internal: false,
    },
    {
        id: 4,
        sender: "Amit Verma",
        role: "IT Agent",
        time: "Today, 11:16 AM",
        content: "Added to the engineering-jira-users group in Okta. Waiting for sync.",
        internal: true,
    },
];

function MessageBubble({ msg }: { readonly msg: Message }) {
    if (msg.role === "Bot") {
        return (
            <div className="flex justify-center">
                <div className="flex items-center gap-2 rounded-full border border-[#2A3A4A] bg-[#1A2A3A] px-4 py-2 text-xs text-[#8899AA]">
                    <Settings size={14} className="text-[#9D00FF]" aria-hidden="true" />
                    {msg.content}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-3">
                {msg.role === "Employee" ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2A3A] text-xs font-bold text-white">
                        AM
                    </div>
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#33E6FF] text-xs font-bold text-[#0A1420]">
                        AV
                    </div>
                )}
                <span className="text-[15px] font-semibold text-white">{msg.sender}</span>
                <Badge variant="success">{msg.role}</Badge>
                {msg.internal && (
                    <Badge variant="warning">
                        <Lock size={10} aria-hidden="true" /> Internal Note
                    </Badge>
                )}
                <span className="ml-2 text-xs text-[#445566]">{msg.time}</span>
            </div>
            <div
                className={`ml-11 max-w-[85%] rounded-2xl rounded-tl-sm border p-4 text-sm leading-relaxed ${
                    msg.internal
                        ? "border-l-4 border-[#FFB020]/20 border-l-[#FFB020] bg-[#FFB020]/5 text-[#FFB020]"
                        : msg.role === "Employee"
                        ? "border-[#2A3A4A] bg-[#1A2A3A] text-white"
                        : "border-[#33E6FF]/30 bg-[#0A1420] text-white"
                }`}
            >
                {msg.content}
                {msg.attachments && (
                    <div className="mt-3 flex gap-2">
                        {msg.attachments.map((att) => (
                            <div
                                key={att}
                                className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-[#2A3A4A] bg-[#0A1420] px-3 py-2 transition-colors hover:border-[#33E6FF]"
                            >
                                <Paperclip size={14} className="text-[#8899AA]" aria-hidden="true" />
                                <span className="text-xs font-medium text-white">{att}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function HRTicketDetailPage() {
    const [reply, setReply] = useState("");
    const [replyType, setReplyType] = useState<"public" | "internal">("public");

    return (
        <Page
            title="Cannot access Jira board"
            subtitle="TKT-4492"
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "Management", href: "/helpdesk/management" },
                { label: "TKT-4492" },
            ]}
            maxWidth="1400px"
            actions={
                <>






                    <Button variant="secondary" icon={<GitMerge size={16} aria-hidden="true" />}>
                        Merge
                    </Button>
                    <Button variant="secondary" icon={<FastForward size={16} aria-hidden="true" />}>
                        Apply Macro
                    </Button>
                    <Button icon={<CheckCircle2 size={16} aria-hidden="true" />}>
                        Mark Resolved
                    </Button>
                </>
            }
        >
            <div className="flex gap-6">
                {/* Main Chat Thread */}
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#1A2A3A] bg-[#0F1C2E]">
                    {/* Thread Canvas */}
                    <div className="flex-1 space-y-6 overflow-y-auto p-6">
                        {MOCK_MESSAGES.map((msg) => (
                            <MessageBubble key={msg.id} msg={msg} />
                        ))}
                    </div>

                    {/* Reply Box */}
                    <div className="border-t border-[#1A2A3A] bg-[#152336] p-4">
                        <div className="mb-2 flex w-fit rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] p-1">
                            <button
                                type="button"
                                onClick={() => setReplyType("public")}
                                className={`rounded-md px-4 py-1.5 text-xs font-bold transition-all ${
                                    replyType === "public"
                                        ? "bg-[#33E6FF] text-[#0A1420]"
                                        : "text-[#8899AA] hover:text-white"
                                }`}
                            >
                                Public Reply
                            </button>
                            <button
                                type="button"
                                onClick={() => setReplyType("internal")}
                                className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-bold transition-all ${
                                    replyType === "internal"
                                        ? "bg-[#FFB020] text-[#0A1420]"
                                        : "text-[#8899AA] hover:text-white"
                                }`}
                            >
                                <Lock size={12} aria-hidden="true" /> Internal Note
                            </button>
                        </div>

                        <div
                            className={`overflow-hidden rounded-xl border transition-colors ${
                                replyType === "public"
                                    ? "border-[#2A3A4A] focus-within:border-[#33E6FF]"
                                    : "border-[#FFB020]/30 focus-within:border-[#FFB020]"
                            } bg-[#0A1420]`}
                        >
                            <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder={
                                    replyType === "public"
                                        ? "Type your reply to Arjun..."
                                        : "Type an internal note (only visible to agents)..."
                                }
                                aria-label={replyType === "public" ? "Public reply" : "Internal note"}
                                className={`min-h-[100px] w-full resize-none bg-transparent p-4 text-sm outline-none ${
                                    replyType === "internal"
                                        ? "text-[#FFB020] placeholder:text-[#FFB020]/50"
                                        : "text-white"
                                }`}
                            />
                            <div className="flex items-center justify-between border-t border-[#2A3A4A] bg-[#1A2A3A] px-4 py-2">
                                <button
                                    type="button"
                                    aria-label="Attach file"
                                    className="rounded-lg p-2 text-[#8899AA] transition-colors hover:bg-[#2A3A4A] hover:text-white"
                                >
                                    <Paperclip size={18} aria-hidden="true" />
                                </button>
                                <Button
                                    disabled={!reply.trim()}
                                    icon={<Send size={16} aria-hidden="true" />}
                                    variant={replyType === "public" ? "primary" : "secondary"}
                                >
                                    {replyType === "public" ? "Send Publicly" : "Add Note"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-[340px] shrink-0 space-y-6">
                    {/* Requester Info */}
                    <Card padding="lg">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                            Requester
                        </h3>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2A3A] font-bold text-white">
                                AM
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">Arjun Mehta</h4>
                                <p className="text-xs text-[#8899AA]">Frontend Dev • Joined Mar 10</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-xs text-[#8899AA]">
                            <div className="flex justify-between">
                                <span className="font-medium text-[#445566]">Email</span>
                                <span className="text-white">arjun.m@techcorp.com</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-[#445566]">Dept</span>
                                <span className="text-white">Engineering</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-[#445566]">Location</span>
                                <span className="text-white">Bangalore</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-4 w-full">
                            View Employee Profile
                        </Button>
                    </Card>

                    {/* Ticket Properties */}
                    <Card padding="lg">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                            Properties
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <label
                                    htmlFor="assignee"
                                    className="mb-1 block text-xs font-semibold text-[#8899AA]"
                                >
                                    Assignee
                                </label>
                                <select
                                    id="assignee"
                                    className="w-full rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] px-3 py-2 text-sm text-white outline-none focus:border-[#00E5A0]"
                                >
                                    <option>Amit Verma (Me)</option>
                                    <option>System (Unassigned)</option>
                                    <option>Rahul Deshmukh</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label
                                        htmlFor="priority"
                                        className="mb-1 block text-xs font-semibold text-[#8899AA]"
                                    >
                                        Priority
                                    </label>
                                    <select
                                        id="priority"
                                        className="w-full rounded-lg border border-[#FF4444]/50 bg-[#1A2A3A] px-3 py-2 text-sm font-bold text-[#FF4444] outline-none"
                                    >
                                        <option>High</option>
                                        <option>Critical</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="mb-1 block text-xs font-semibold text-[#8899AA]"
                                    >
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className="w-full rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] px-3 py-2 text-sm text-white outline-none"
                                    >
                                        <option>IT Support</option>
                                        <option>HR Ops</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <span className="mb-1 block text-xs font-semibold text-[#8899AA]">Tags</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className="flex items-center gap-1 rounded border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-1 text-xs text-white">
                                        jira{" "}
                                        <button type="button" aria-label="Remove jira tag">
                                            <X size={12} className="cursor-pointer hover:text-[#FF4444]" aria-hidden="true" />
                                        </button>
                                    </span>
                                    <span className="flex items-center gap-1 rounded border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-1 text-xs text-white">
                                        access{" "}
                                        <button type="button" aria-label="Remove access tag">
                                            <X size={12} className="cursor-pointer hover:text-[#FF4444]" aria-hidden="true" />
                                        </button>
                                    </span>
                                    <button
                                        type="button"
                                        className="px-2 py-1 text-xs text-[#8899AA] hover:text-[#00E5A0]"
                                    >
                                        + Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* SLAs */}
                    <Card padding="lg">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                            SLAs
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-1 flex justify-between text-xs">
                                    <span className="text-[#8899AA]">First Response SLA</span>
                                    <span className="font-bold text-[#00E5A0]">Met (45m ago)</span>
                                </div>
                                <div
                                    className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
                                    role="progressbar"
                                    aria-valuenow={100}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label="First response SLA: met"
                                >
                                    <div className="h-full w-full bg-[#00E5A0]" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 flex justify-between text-xs">
                                    <span className="text-[#8899AA]">Resolution SLA</span>
                                    <span className="font-bold text-[#FFB020]">Due in 4h 15m</span>
                                </div>
                                <div
                                    className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
                                    role="progressbar"
                                    aria-valuenow={60}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label="Resolution SLA: 60% elapsed"
                                >
                                    <div className="h-full w-[60%] bg-[#FFB020]" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        

        

        

        </Page>
    );
}
