"use client";
import React, { useState } from "react";
import {
    Search, Filter, SlidersHorizontal, Ticket, AlertCircle,
    Clock, CheckCircle2, MoreHorizontal, MessageSquare, ChevronDown
} from "lucide-react";
import Link from "next/link";

const QUEUE_DATA = [
    { id: "TKT-4501", title: "Need access to Figma Pro", priority: "Low", category: "IT", status: "Unassigned", user: "Kabir Das", time: "2m ago" },
    { id: "TKT-4492", title: "Cannot access Jira board", priority: "High", category: "IT", status: "In Progress", user: "Arjun Mehta", time: "1h ago", assignee: "Amit V." },
    { id: "TKT-4488", title: "Tax deduction clarification needed", priority: "Medium", category: "HR", status: "Unassigned", user: "Sneha Rao", time: "3h ago" },
    { id: "TKT-4485", title: "Requesting new monitor arm", priority: "Low", category: "Facilities", status: "In Progress", user: "Arjun Mehta", time: "1d ago", assignee: "Rahul D." },
    { id: "TKT-4470", title: "Office wifi down", priority: "Critical", category: "IT", status: "Escalated", user: "Priya Singh", time: "2d ago", assignee: "Amit V." },
];

export default function TicketManagement() {
    const [view, setView] = useState<"list" | "kanban">("list");

    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)] flex flex-col">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <SlidersHorizontal size={28} className="text-[#33E6FF]" />
                        Ticket Queue Management
                    </h1>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="flex bg-[#1A2A3A] p-1 rounded-lg border border-[#2A3A4A]">
                        <button
                            onClick={() => setView("list")}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'list' ? 'bg-[#2A3A4A] text-white shadow-sm' : 'text-[#8899AA] hover:text-white'}`}
                        >
                            List View
                        </button>
                        <button
                            onClick={() => setView("kanban")}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'kanban' ? 'bg-[#2A3A4A] text-white shadow-sm' : 'text-[#8899AA] hover:text-white'}`}
                        >
                            Kanban
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-4 mb-6 shrink-0 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]" size={16} />
                        <input
                            type="text"
                            placeholder="Search tickets by ID, keyword, or user..."
                            className="w-80 pl-9 pr-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5A0] transition-colors"
                        />
                    </div>

                    <div className="h-6 w-px bg-[#2A3A4A]"></div>

                    <button className="px-3 py-2 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-sm text-white flex items-center gap-2 hover:bg-[#2A3A4A] transition-colors">
                        Status: <span className="text-[#33E6FF]">All Open</span> <ChevronDown size={14} className="text-[#8899AA]" />
                    </button>
                    <button className="px-3 py-2 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-sm text-white flex items-center gap-2 hover:bg-[#2A3A4A] transition-colors">
                        Assignee: <span className="text-[#FFB020]">Me</span> <ChevronDown size={14} className="text-[#8899AA]" />
                    </button>
                    <button className="px-3 py-2 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-sm text-[#8899AA] flex items-center gap-2 hover:bg-[#2A3A4A] hover:text-white transition-colors">
                        <Filter size={14} /> More Filters (0)
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-xl flex flex-col min-h-0">

                {view === "list" ? (
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-[#152336] text-[#8899AA] text-xs uppercase tracking-wider font-semibold border-b border-[#1A2A3A]">
                                    <th className="p-4 w-12"><input type="checkbox" className="rounded border-[#2A3A4A] bg-[#0A1420] text-[#00E5A0] focus:ring-0" /></th>
                                    <th className="p-4">Ticket ID & Subject</th>
                                    <th className="p-4">Requester</th>
                                    <th className="p-4">Priority</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Assignee</th>
                                    <th className="p-4 text-right">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A] text-sm">
                                {QUEUE_DATA.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-[#1A2A3A]/50 transition-colors group cursor-pointer">
                                        <td className="p-4"><input type="checkbox" className="rounded border-[#2A3A4A] bg-[#0A1420] text-[#00E5A0] focus:ring-0 opacity-50 group-hover:opacity-100" /></td>
                                        <td className="p-4">
                                            <Link href={`/helpdesk/management/${ticket.id}`} className="block">
                                                <span className="font-mono text-xs text-[#8899AA] block mb-1">{ticket.id}</span>
                                                <span className="font-semibold text-white group-hover:text-[#33E6FF] transition-colors">{ticket.title}</span>
                                            </Link>
                                        </td>
                                        <td className="p-4 text-[#8899AA]">{ticket.user}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${ticket.priority === 'Critical' ? 'bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/20' :
                                                    ticket.priority === 'High' ? 'bg-[#FFB020]/10 text-[#FFB020] border-[#FFB020]/20' :
                                                        ticket.priority === 'Medium' ? 'bg-[#33E6FF]/10 text-[#33E6FF] border-[#33E6FF]/20' :
                                                            'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]'
                                                }`}>
                                                {ticket.priority}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="flex items-center gap-1.5 font-medium text-white">
                                                {ticket.status === 'Unassigned' && <span className="w-2 h-2 rounded-full bg-[#8899AA]"></span>}
                                                {ticket.status === 'In Progress' && <span className="w-2 h-2 rounded-full bg-[#33E6FF]"></span>}
                                                {ticket.status === 'Escalated' && <span className="w-2 h-2 rounded-full bg-[#FF4444]"></span>}
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {ticket.assignee ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-white border border-[#2A3A4A]">{ticket.assignee.slice(0, 2)}</div>
                                                    <span className="text-[#8899AA]">{ticket.assignee}</span>
                                                </div>
                                            ) : (
                                                <button className="text-xs text-[#00E5A0] hover:underline px-2 py-1 bg-[#00E5A0]/10 rounded border border-[#00E5A0]/20">Assign to me</button>
                                            )}
                                        </td>
                                        <td className="p-4 text-right text-[#8899AA]">{ticket.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex-1 p-6 overflow-x-auto">
                        {/* Simplified Kanban Placeholder for brevity, using same logic as IT Provisioning */}
                        <div className="flex gap-6 h-full min-w-max">
                            <div className="w-80 bg-[#152336] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden h-full">
                                <div className="p-3 bg-[#1A2A3A] border-b border-[#2A3A4A] font-bold text-white flex justify-between">
                                    Unassigned <span className="text-[#8899AA]">2</span>
                                </div>
                                <div className="flex-1 overflow-y-auto w-full p-3 space-y-3">
                                    {QUEUE_DATA.filter(t => t.status === 'Unassigned').map(t => (
                                        <div key={t.id} className="bg-[#0A1420] border border-[#2A3A4A] p-3 rounded-lg cursor-grab hover:border-[#33E6FF] transition-colors">
                                            <span className="text-xs font-mono text-[#8899AA]">{t.id}</span>
                                            <h4 className="text-sm font-semibold text-white mt-1 mb-2">{t.title}</h4>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-[#8899AA]">{t.user}</span>
                                                <span className="bg-[#FFB020]/10 text-[#FFB020] px-1.5 rounded">{t.priority}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-80 bg-[#152336] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden h-full">
                                <div className="p-3 bg-[#1A2A3A] border-b border-[#2A3A4A] font-bold text-white flex justify-between">
                                    In Progress <span className="text-[#8899AA]">2</span>
                                </div>
                                <div className="flex-1 overflow-y-auto w-full p-3 space-y-3">
                                    {QUEUE_DATA.filter(t => t.status === 'In Progress').map(t => (
                                        <Link href={`/helpdesk/management/${t.id}`} key={t.id} className="block bg-[#0A1420] border border-[#2A3A4A] p-3 rounded-lg cursor-grab hover:border-[#33E6FF] transition-colors">
                                            <span className="text-xs font-mono text-[#8899AA]">{t.id}</span>
                                            <h4 className="text-sm font-semibold text-white mt-1 mb-2">{t.title}</h4>
                                            <div className="flex justify-between items-center text-xs">
                                                <div className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-[#1A2A3A] text-[8px] flex items-center justify-center text-white border border-[#2A3A4A]">{t.assignee?.slice(0, 2)}</div></div>
                                                <span className="bg-[#FFB020]/10 text-[#FFB020] px-1.5 rounded">{t.priority}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
