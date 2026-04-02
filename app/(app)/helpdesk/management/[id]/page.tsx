"use client";
import React, { useState } from "react";
import {
    ArrowLeft, Clock, Server, Paperclip, Send, AlertCircle,
    CheckCircle2, Info, Lock, FastForward, GitMerge, Settings
} from "lucide-react";
import Link from "next/link";

export default function HRTicketDetail() {
    const [reply, setReply] = useState("");
    const [replyType, setReplyType] = useState<"public" | "internal">("public");

    const MOCK_MESSAGES = [
        { id: 1, sender: "Arjun Mehta", role: "Employee", time: "Today, 10:30 AM", content: "Hi team, I am unable to access the Jira project boards. It says my license has expired. Could you please provision access? Attached is the screenshot.", attachments: ["jira_error.png"], internal: false },
        { id: 2, sender: "System", role: "Bot", time: "Today, 10:31 AM", content: "Ticket auto-routed to IT Support based on keyword 'Jira'. SLA First Response: 2h. SLA Resolution: 8h.", internal: true },
        { id: 3, sender: "Amit Verma", role: "IT Agent", time: "Today, 11:15 AM", content: "Hi Arjun, looking into this now. It seems your Atlassian group assignment was missed during onboarding. I am syncing the groups now, it should work in 15 mins. Please confirm once able to access.", internal: false },
        { id: 4, sender: "Amit Verma", role: "IT Agent", time: "Today, 11:16 AM", content: "Added to the engineering-jira-users group in Okta. Waiting for sync.", internal: true },
    ];

    return (
        <div className="p-6 max-w-[1400px] mx-auto h-[calc(100vh-80px)] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/helpdesk/management" className="w-10 h-10 rounded-xl bg-[#1A2A3A] flex items-center justify-center text-[#8899AA] hover:text-white transition-colors border border-[#2A3A4A]">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-white font-mono text-sm font-semibold">TKT-4492</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FFB020] bg-[#FFB020]/10 border border-[#FFB020]/20 px-2 py-0.5 rounded">In Progress</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Cannot access Jira board</h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors text-sm font-medium flex items-center gap-2">
                        <GitMerge size={16} /> Merge
                    </button>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors text-sm font-medium flex items-center gap-2">
                        <FastForward size={16} /> Apply Macro
                    </button>
                    <button className="px-5 py-2 bg-[#00E5A0] text-[#0A1420] rounded-lg hover:bg-[#00c98d] transition-colors text-sm font-semibold flex items-center gap-2 shadow-[0_5px_15px_rgba(0,229,160,0.2)]">
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
                            <div key={msg.id} className="flex flex-col">
                                <div className="flex items-center gap-3 mb-2">
                                    {msg.role === "Employee" ? (
                                        <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center font-bold text-xs text-white">AM</div>
                                    ) : msg.role === "Bot" ? (
                                        <div className="w-8 h-8 rounded-full bg-[#9D00FF]/20 text-[#9D00FF] flex items-center justify-center border border-[#9D00FF]/30"><Settings size={14} /></div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-[#33E6FF] flex items-center justify-center font-bold text-xs text-[#0A1420]">AV</div>
                                    )}
                                    <span className="font-semibold text-white text-[15px]">{msg.sender}</span>
                                    <span className="text-[10px] text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-0.5 rounded font-mono">{msg.role}</span>
                                    {msg.internal && <span className="text-[10px] flex items-center gap-1 text-[#FFB020] bg-[#FFB020]/10 border border-[#FFB020]/20 px-2 py-0.5 rounded uppercase font-bold"><Lock size={10} /> Internal Note</span>}
                                    <span className="text-xs text-[#445566] ml-2">{msg.time}</span>
                                </div>

                                <div className={`ml-11 max-w-[85%] p-4 rounded-2xl rounded-tl-sm text-sm leading-relaxed border ${msg.internal
                                        ? 'bg-[#FFB020]/5 text-[#FFB020] border-[#FFB020]/20 border-l-4 border-l-[#FFB020]'
                                        : msg.role === "Employee"
                                            ? 'bg-[#1A2A3A] text-white border-[#2A3A4A]'
                                            : 'bg-[#0A1420] text-white border-[#33E6FF]/30'
                                    }`}>
                                    {msg.content}

                                    {/* Attachments */}
                                    {msg.attachments && (
                                        <div className="mt-3 flex gap-2">
                                            {msg.attachments.map(att => (
                                                <div key={att} className="flex items-center gap-2 bg-[#0A1420] border border-[#2A3A4A] rounded-lg px-3 py-2 cursor-pointer hover:border-[#33E6FF] transition-colors w-fit">
                                                    <Paperclip size={14} className="text-[#8899AA]" />
                                                    <span className={`text-xs font-medium ${msg.internal ? 'text-[#FFB020]' : 'text-white'}`}>{att}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reply Box */}
                    <div className="p-4 bg-[#152336] border-t border-[#1A2A3A]">
                        {/* Reply mode toggle */}
                        <div className="flex mb-2 bg-[#1A2A3A] w-fit p-1 rounded-lg border border-[#2A3A4A]">
                            <button
                                onClick={() => setReplyType("public")}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${replyType === 'public' ? 'bg-[#33E6FF] text-[#0A1420]' : 'text-[#8899AA] hover:text-white'}`}
                            >Public Reply</button>
                            <button
                                onClick={() => setReplyType("internal")}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${replyType === 'internal' ? 'bg-[#FFB020] text-[#0A1420]' : 'text-[#8899AA] hover:text-white'}`}
                            ><Lock size={12} /> Internal Note</button>
                        </div>

                        <div className={`bg-[#0A1420] border rounded-xl overflow-hidden transition-colors ${replyType === 'public' ? 'border-[#2A3A4A] focus-within:border-[#33E6FF]' : 'border-[#FFB020]/30 focus-within:border-[#FFB020]'}`}>
                            <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder={replyType === 'public' ? "Type your reply to Arjun..." : "Type an internal note (only visible to agents)..."}
                                className={`w-full bg-transparent p-4 text-sm focus:outline-none resize-none min-h-[100px] ${replyType === 'internal' ? 'text-[#FFB020] placeholder:text-[#FFB020]/50' : 'text-white'}`}
                            ></textarea>
                            <div className="bg-[#1A2A3A] px-4 py-2 flex items-center justify-between border-t border-[#2A3A4A]">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-[#8899AA] hover:text-white hover:bg-[#2A3A4A] rounded-lg transition-colors">
                                        <Paperclip size={18} />
                                    </button>
                                </div>
                                <button
                                    disabled={!reply.trim()}
                                    className={`px-6 py-2 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 ${replyType === 'public' ? 'bg-[#33E6FF] text-[#0A1420] hover:bg-[#29b8cc]' : 'bg-[#FFB020] text-[#0A1420] hover:bg-[#e09918]'
                                        }`}
                                >
                                    {replyType === 'public' ? "Send Publicly" : "Add Note"} <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Meta Data */}
                <div className="w-[340px] shrink-0 space-y-6">

                    {/* Requester Info */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 border-b border-[#1A2A3A] pb-2 text-sm uppercase tracking-wider text-[#8899AA]">Requester</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center font-bold">AM</div>
                            <div>
                                <h4 className="text-white font-semibold">Arjun Mehta</h4>
                                <p className="text-xs text-[#8899AA]">Frontend Dev • Joined Mar 10</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-xs text-[#8899AA]">
                            <div className="flex justify-between"><span className="font-medium text-[#445566]">Email</span> <span className="text-white">arjun.m@techcorp.com</span></div>
                            <div className="flex justify-between"><span className="font-medium text-[#445566]">Dept</span> <span className="text-white">Engineering</span></div>
                            <div className="flex justify-between"><span className="font-medium text-[#445566]">Location</span> <span className="text-white">Bangalore</span></div>
                        </div>
                        <button className="w-full mt-4 py-1.5 text-xs font-semibold text-[#00E5A0] bg-[#00E5A0]/10 border border-[#00E5A0]/20 rounded-lg hover:bg-[#00E5A0]/20 transition-colors">
                            View Emloyee Profile
                        </button>
                    </div>

                    {/* Ticket Properties */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 border-b border-[#1A2A3A] pb-2 text-sm uppercase tracking-wider text-[#8899AA]">Properties</h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <span className="text-[#8899AA] block mb-1 text-xs font-semibold">Assignee</span>
                                <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00E5A0]">
                                    <option>Amit Verma (Me)</option>
                                    <option>System (Unassigned)</option>
                                    <option>Rahul Deshmukh</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <span className="text-[#8899AA] block mb-1 text-xs font-semibold">Priority</span>
                                    <select className="w-full bg-[#1A2A3A] border border-[#FF4444]/50 border-l-4 border-l-[#FF4444] text-[#FF4444] rounded-lg px-3 py-2 text-sm font-bold focus:outline-none">
                                        <option>High</option>
                                        <option>Critical</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                    </select>
                                </div>
                                <div>
                                    <span className="text-[#8899AA] block mb-1 text-xs font-semibold">Category</span>
                                    <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none">
                                        <option>IT Support</option>
                                        <option>HR Ops</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <span className="text-[#8899AA] block mb-1 text-xs font-semibold">Tags</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs bg-[#1A2A3A] text-white px-2 py-1 rounded border border-[#2A3A4A] flex items-center gap-1">jira <X size={12} className="cursor-pointer hover:text-[#FF4444]" /></span>
                                    <span className="text-xs bg-[#1A2A3A] text-white px-2 py-1 rounded border border-[#2A3A4A] flex items-center gap-1">access <X size={12} className="cursor-pointer hover:text-[#FF4444]" /></span>
                                    <button className="text-xs text-[#8899AA] hover:text-[#00E5A0] px-2 py-1">+ Add</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLAs */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 border-b border-[#1A2A3A] pb-2 text-sm uppercase tracking-wider text-[#8899AA]">SLAs</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899AA]">First Response SLA</span>
                                    <span className="text-[#00E5A0] font-bold">Met (45m ago)</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00E5A0] w-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#8899AA]">Resolution SLA</span>
                                    <span className="text-[#FFB020] font-bold">Due in 4h 15m</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#FFB020] w-[60%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Ensure X is available for the tags
import { X } from "lucide-react";
