"use client";
import React, { useState } from "react";
import {
    Laptop, Server, Mail, CheckSquare, Search, Filter,
    AlertTriangle, MoreHorizontal, User, Calendar
} from "lucide-react";

export default function ITProvisioning() {
    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Laptop size={28} className="text-[#33E6FF]" />
                        IT Provisioning & Asset Allocation
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage hardware, software licenses, and access rights for incoming employees.</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            className="pl-9 pr-4 py-2 bg-[#0F1C2E] border border-[#1A2A3A] rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5A0] transition-colors w-64"
                        />
                    </div>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors text-sm font-medium flex items-center gap-2">
                        <Filter size={16} /> Filter
                    </button>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 h-[calc(100vh-200px)] items-start">

                {/* Kanban Column: Pending Allocation */}
                <div className="flex-1 min-w-[350px] flex flex-col h-full bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden shrink-0">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#152336] flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            Pending Allocation <span className="bg-[#FFB020]/20 text-[#FFB020] px-2 py-0.5 rounded text-xs">4</span>
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {[
                            { name: "Arjun Mehta", role: "Frontend Dev", date: "Mar 14", hw: "Macbook Pro 16\"", sw: ["Email", "Slack", "Figma", "GitHub"] },
                            { name: "Sneha Rao", role: "Product Designer", date: "Mar 15", hw: "Macbook Pro 14\", Monitor", sw: ["Email", "Slack", "Figma", "Adobe CC"] },
                        ].map((task, i) => (
                            <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] hover:border-[#FFB020] rounded-xl p-4 transition-colors cursor-grab group">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-white text-[15px]">{task.name}</h4>
                                        <p className="text-xs text-[#8899AA]">{task.role}</p>
                                    </div>
                                    <div className="p-1.5 hover:bg-[#1A2A3A] rounded text-[#445566] transition-colors">
                                        <MoreHorizontal size={16} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs text-[#FFB020] mb-4 bg-[#FFB020]/10 w-fit px-2 py-1 rounded border border-[#FFB020]/20">
                                    <Calendar size={12} /> Joins {task.date}
                                </div>

                                <div className="space-y-3 pt-3 border-t border-[#1A2A3A]">
                                    <div>
                                        <span className="flex items-center gap-1.5 text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-1.5"><Laptop size={12} /> Hardware</span>
                                        <span className="text-sm text-white font-medium bg-[#1A2A3A] px-2 py-1 rounded">{task.hw}</span>
                                    </div>
                                    <div>
                                        <span className="flex items-center gap-1.5 text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-1.5"><Server size={12} /> Software Access</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {task.sw.map(s => (
                                                <span key={s} className="text-[11px] text-[#33E6FF] bg-[#1A2A3A] border border-[#2A3A4A] px-2 py-0.5 rounded">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full mt-4 py-2 bg-[#1A2A3A] hover:bg-[#00E5A0] text-[#8899AA] hover:text-[#0A1420] text-sm font-semibold rounded-lg transition-colors group-hover:block border border-[#2A3A4A] group-hover:border-[#00E5A0]">
                                    Start Provisioning
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kanban Column: In Progress */}
                <div className="flex-1 min-w-[350px] flex flex-col h-full bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden shrink-0">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#152336] flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            In Progress <span className="bg-[#33E6FF]/20 text-[#33E6FF] px-2 py-0.5 rounded text-xs">2</span>
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {[
                            { name: "Priya Singh", role: "Marketing Mngr", date: "Mar 12", hw: "Windows Laptop", sw: ["Email", "Slack", "HubSpot"] }
                        ].map((task, i) => (
                            <div key={i} className="bg-[#0A1420] border border-[#33E6FF]/40 rounded-xl p-4 relative shadow-[0_0_15px_rgba(51,230,255,0.05)] cursor-grab">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#33E6FF]/10 blur-xl rounded-full"></div>

                                <div className="flex items-start justify-between mb-3 relative z-10">
                                    <div>
                                        <h4 className="font-bold text-white text-[15px]">{task.name}</h4>
                                        <p className="text-xs text-[#8899AA]">{task.role}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-2 relative z-10">

                                    {/* Subtasks */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm text-[#8899AA] cursor-pointer hover:text-white transition-colors">
                                            <CheckSquare size={16} className="text-[#00E5A0]" /> Allocate Hardware Asset
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-[#8899AA] cursor-pointer hover:text-white transition-colors">
                                            <div className="w-4 h-4 rounded border border-[#445566] bg-[#0A1420]"></div> Create Email Account
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-[#8899AA] cursor-pointer hover:text-white transition-colors">
                                            <div className="w-4 h-4 rounded border border-[#445566] bg-[#0A1420]"></div> Grant App Licenses
                                        </label>
                                    </div>

                                    <div className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                        <div className="h-full w-1/3 bg-[#33E6FF] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kanban Column: Ready for Handover */}
                <div className="flex-1 min-w-[350px] flex flex-col h-full bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#152336] flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            Ready for Handover <span className="bg-[#00E5A0]/20 text-[#00E5A0] px-2 py-0.5 rounded text-xs">5</span>
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {[
                            { name: "Kabir Das", role: "Sales Exec", hw: "Windows Laptop", tag: "C-1192" },
                            { name: "Ayesha Khan", role: "HR Analyst", hw: "Windows Laptop", tag: "C-1193" }
                        ].map((task, i) => (
                            <div key={i} className="bg-[#0A1420] border border-[#00E5A0]/30 rounded-xl p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h4 className="font-bold text-white text-[15px]">{task.name}</h4>
                                        <p className="text-xs text-[#8899AA]">{task.role}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#00E5A0]/10 text-[#00E5A0] flex items-center justify-center">
                                        <Mail size={14} />
                                    </div>
                                </div>
                                <div className="pt-2 flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#445566] bg-[#1A2A3A] px-2 py-1 rounded border border-[#2A3A4A]">Asset Tag: {task.tag}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
