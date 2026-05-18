"use client";
import { useState } from "react";
import { Server, Paperclip, Send, AlertCircle, CheckCircle2, Info } from "lucide-react";
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
}

const MOCK_MESSAGES: Message[] = [
    {
        id: 1,
        sender: "Arjun Mehta",
        role: "Employee",
        time: "Today, 10:30 AM",
        content: "Hi team, I am unable to access the Jira project boards. It says my license has expired. Could you please provision access? Attached is the screenshot.",
        attachments: ["jira_error.png"],
    },
    {
        id: 2,
        sender: "System",
        role: "Bot",
        time: "Today, 10:31 AM",
        content: "Your request has been routed to the IT Support queue. Current average response time is 2 hours.",
    },
    {
        id: 3,
        sender: "Amit Verma",
        role: "IT Agent",
        time: "Today, 11:15 AM",
        content: "Hi Arjun, looking into this now. It seems your Atlassian group assignment was missed during onboarding. I am syncing the groups now, it should work in 15 mins. Please confirm once able to access.",
    },
];

function ThreadMessage({ msg }: { readonly msg: Message }) {
    if (msg.role === "Bot") {
        return (
            <div className="flex justify-center">
                <div className="flex items-center gap-2 rounded-full border border-[#2A3A4A] bg-[#1A2A3A] px-4 py-2 text-xs text-[#8899AA]">
                    <Info size={14} className="text-[#33E6FF]" aria-hidden="true" />
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
                <span className="ml-2 text-xs text-[#445566]">{msg.time}</span>
            </div>
            <div className="ml-11 max-w-[80%]">
                <div
                    className={`rounded-2xl rounded-tl-sm border p-4 text-sm leading-relaxed ${
                        msg.role === "Employee"
                            ? "border-[#2A3A4A] bg-[#1A2A3A] text-white"
                            : "border-[#33E6FF]/30 bg-[#0A1420] text-white"
                    }`}
                >
                    {msg.content}
                </div>
                {msg.attachments && (
                    <div className="mt-2 flex gap-2">
                        {msg.attachments.map((att) => (
                            <div
                                key={att}
                                className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#2A3A4A] bg-[#0A1420] px-3 py-2 transition-colors hover:border-[#33E6FF]"
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

export default function TicketDetailPage() {
    const [reply, setReply] = useState("");

    return (
        <Page
            title="Cannot access Jira board"
            subtitle="TKT-4492"
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "My Tickets", href: "/helpdesk/my-tickets" },
                { label: "TKT-4492" },
            ]}
            maxWidth="1200px"
            actions={
                <>






                    <div className="flex items-center gap-3">
                        <Badge variant="warning">In Progress</Badge>
                        <Badge variant="danger">
                            <AlertCircle size={10} aria-hidden="true" /> Urgent
                        </Badge>
                    </div>
                    <Button variant="outline">Cancel Request</Button>
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
                            <ThreadMessage key={msg.id} msg={msg} />
                        ))}
                    </div>

                    {/* Reply Box */}
                    <div className="border-t border-[#1A2A3A] bg-[#152336] p-4">
                        <div className="overflow-hidden rounded-xl border border-[#2A3A4A] bg-[#0A1420] transition-colors focus-within:border-[#00E5A0]">
                            <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Type your reply here..."
                                aria-label="Reply to ticket"
                                className="min-h-[100px] w-full resize-none bg-transparent p-4 text-sm text-white outline-none"
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
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-[300px] shrink-0 space-y-6">
                    <Card padding="lg">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-2 font-bold text-white">
                            Ticket Details
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <span className="mb-1 block text-xs text-[#8899AA]">Category</span>
                                <span className="flex w-fit items-center gap-2 rounded-lg bg-[#1A2A3A] px-3 py-1.5 font-medium text-white">
                                    <Server size={14} className="text-[#33E6FF]" aria-hidden="true" />
                                    IT Support
                                </span>
                            </div>
                            <div>
                                <span className="mb-1 block text-xs text-[#8899AA]">Sub-category</span>
                                <span className="font-medium text-white">Software Access / License</span>
                            </div>
                            <div>
                                <span className="mb-1 block text-xs text-[#8899AA]">Assigned Agent</span>
                                <div className="mt-1 flex items-center gap-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#33E6FF] text-[10px] font-bold text-[#0A1420]">
                                        AV
                                    </div>
                                    <span className="font-medium text-white">Amit Verma</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-2 font-bold text-white">
                            SLA Tracking
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-1 flex justify-between text-xs">
                                    <span className="text-[#8899AA]">First Response SLA</span>
                                    <span className="font-bold text-[#00E5A0]">Met</span>
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
                                    <span className="text-[#8899AA]">Resolution SLA (4 hrs left)</span>
                                    <span className="font-bold text-[#FFB020]">At Risk</span>
                                </div>
                                <div
                                    className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
                                    role="progressbar"
                                    aria-valuenow={80}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label="Resolution SLA: 80% elapsed, at risk"
                                >
                                    <div className="h-full w-[80%] animate-pulse bg-[#FFB020]" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        

        

        

        </Page>
    );
}
