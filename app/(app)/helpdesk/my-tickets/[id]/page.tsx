"use client";
import React, { useState } from "react";
import {
    ArrowLeft, Clock, Server, Paperclip, Send, AlertCircle,
    CheckCircle2, Info
} from "lucide-react";
import Link from "next/link";

export default function TicketDetail() {
    const [reply, setReply] = useState("");

    const MOCK_MESSAGES = [
        { id: 1, sender: "Arjun Mehta", role: "Employee", time: "Today, 10:30 AM", content: "Hi team, I am unable to access the Jira project boards. It says my license has expired. Could you please provision access? Attached is the screenshot.", attachments: ["jira_error.png"] },
        { id: 2, sender: "System", role: "Bot", time: "Today, 10:31 AM", content: "Your request has been routed to the IT Support queue. Current average response time is 2 hours." },
        { id: 3, sender: "Amit Verma", role: "IT Agent", time: "Today, 11:15 AM", content: "Hi Arjun, looking into this now. It seems your Atlassian group assignment was missed during onboarding. I am syncing the groups now, it should work in 15 mins. Please confirm once able to access." },
    ];

    return (
        <div className="p-6 max-w-[1200px] mx-auto h-[calc(100vh-80px)] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/helpdesk/my-tickets" className="w-10 h-10 rounded-xl bg-[#1A2A3A] flex items-center justify-center text-[#8899AA] hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-[#8899AA] font-mono text-sm font-semibold">TKT-4492</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FFB020] bg-[#FFB020]/10 border border-[#FFB020]/20 px-2 py-0.5 rounded">In Progress</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF4444] bg-[#FF4444]/10 border border-[#FF4444]/20 px-2 py-0.5 rounded flex items-center gap-1">
                                <AlertCircle size={10} /> Urgent
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Cannot access Jira board</h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-[#8899AA] rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] hover:text-white transition-colors text-sm font-medium">
                        Cancel Request
                    </button>
                    <button className="px-4 py-2 bg-[#00E5A0] text-[#0A1420] rounded-lg hover:bg-[#00c98d] transition-colors text-sm font-semibold flex items-center gap-2 shadow-[0_5px_15px_rgba(0,229,160,0.2)]">
                        <CheckCircle2 size={16} /> Mark Resolved
                    </button>
                </div>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">

                {/* Main Chat Thread */}
                <div className="flex-1 bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">

                    {/* Thread Canvas */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {MOCK_MESSAGES.map((msg) => (
                            msg.role === "Bot" ? (
                                <div key={msg.id} className="flex justify-center">
                                    <div className="bg-[#1A2A3A] px-4 py-2 rounded-full flex items-center gap-2 text-xs text-[#8899AA] border border-[#2A3A4A]">
                                        <Info size={14} className="text-[#33E6FF]" /> {msg.content}
                                    </div>
                                </div>
                            ) : (
                                <div key={msg.id} className="flex flex-col">
                                    <div className="flex items-center gap-3 mb-2">
                                        {msg.role === "Employee" ? (
                                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center font-bold text-xs text-white">AM</div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-[#33E6FF] flex items-center justify-center font-bold text-xs text-[#0A1420]">AV</div>
                                        )}
                                        <span className="font-semibold text-white text-[15px]">{msg.sender}</span>
                                        <span className="text-[10px] text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-0.5 rounded font-mono">{msg.role}</span>
                                        <span className="text-xs text-[#445566] ml-2">{msg.time}</span>
                                    </div>

                                    <div className="ml-11 max-w-[80%]">
                                        <div className={`p-4 rounded-2xl rounded-tl-sm text-sm leading-relaxed ${msg.role === "Employee" ? 'bg-[#1A2A3A] text-white border border-[#2A3A4A]' : 'bg-[#0A1420] text-white border border-[#33E6FF]/30'
                                            }`}>
                                            {msg.content}
                                        </div>

                                        {/* Attachments */}
                                        {msg.attachments && (
                                            <div className="mt-2 flex gap-2">
                                                {msg.attachments.map(att => (
                                                    <div key={att} className="flex items-center gap-2 bg-[#0A1420] border border-[#2A3A4A] rounded-lg px-3 py-2 cursor-pointer hover:border-[#33E6FF] transition-colors">
                                                        <Paperclip size={14} className="text-[#8899AA]" />
                                                        <span className="text-xs text-white font-medium">{att}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    {/* Reply Box */}
                    <div className="p-4 bg-[#152336] border-t border-[#1A2A3A]">
                        <div className="bg-[#0A1420] border border-[#2A3A4A] rounded-xl overflow-hidden focus-within:border-[#00E5A0] transition-colors">
                            <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Type your reply here..."
                                className="w-full bg-transparent text-white p-4 text-sm focus:outline-none resize-none min-h-[100px]"
                            ></textarea>
                            <div className="bg-[#1A2A3A] px-4 py-2 flex items-center justify-between border-t border-[#2A3A4A]">
                                <button className="p-2 text-[#8899AA] hover:text-white hover:bg-[#2A3A4A] rounded-lg transition-colors">
                                    <Paperclip size={18} />
                                </button>
                                <button
                                    disabled={!reply.trim()}
                                    className="px-6 py-2 bg-[#00E5A0] text-[#0A1420] font-bold rounded-lg hover:bg-[#00c98d] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                                >
                                    Send <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Meta Data */}
                <div className="w-[300px] shrink-0 space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 border-b border-[#1A2A3A] pb-2">Ticket Details</h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <span className="text-[#8899AA] block mb-1 text-xs">Category</span>
                                <span className="flex items-center gap-2 text-white font-medium bg-[#1A2A3A] px-3 py-1.5 rounded-lg w-fit">
                                    <Server size={14} className="text-[#33E6FF]" /> IT Support
                                </span>
                            </div>
                            <div>
                                <span className="text-[#8899AA] block mb-1 text-xs">Sub-category</span>
                                <span className="text-white font-medium">Software Access / License</span>
                            </div>
                            <div>
                                <span className="text-[#8899AA] block mb-1 text-xs">Assigned Agent</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-6 h-6 rounded-full bg-[#33E6FF] text-[#0A1420] flex items-center justify-center font-bold text-[10px]">AV</div>
                                    <span className="text-white font-medium">Amit Verma</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 border-b border-[#1A2A3A] pb-2">SLA Tracking</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899AA]">First Response SLA</span>
                                    <span className="text-[#00E5A0] font-bold">Met</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00E5A0] w-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899AA]">Resolution SLA (4 hrs left)</span>
                                    <span className="text-[#FFB020] font-bold">At Risk</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#FFB020] w-[80%] animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
