"use client";
import React, { useState } from "react";
import {
    Ticket, Search, Plus, Filter, MessageSquare, Paperclip,
    CheckCircle2, AlertCircle, Clock, ChevronRight
} from "lucide-react";

const MY_TICKETS = [
    { id: "TKT-4492", title: "Cannot access Jira board", category: "IT Support", status: "Open", date: "Today, 10:30 AM", urgent: true, messages: 2 },
    { id: "TKT-4485", title: "Requesting new monitor arm", category: "Facilities", status: "In Progress", date: "Mar 10, 2026", urgent: false, messages: 4 },
    { id: "TKT-4310", title: "Queries regarding flexible benefits", category: "HR Ops", status: "Closed", date: "Jan 15, 2026", urgent: false, messages: 7 },
    { id: "TKT-4302", title: "VPN connection dropping frequently", category: "IT Support", status: "Closed", date: "Jan 10, 2026", urgent: false, messages: 3 },
];

export default function MyTickets() {
    const [filter, setFilter] = useState("All");

    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] border-t border-[#1A2A3A]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Ticket size={28} className="text-[#33E6FF]" />
                        My Helpdesk Tickets
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track issues raised to IT, HR, or Facilities.</p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]" size={16} />
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            className="pl-9 pr-4 py-2 bg-[#0F1C2E] border border-[#1A2A3A] rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5A0] transition-colors w-64"
                        />
                    </div>
                    <button className="px-5 py-2 bg-[#00E5A0] text-[#0A1420] rounded-lg hover:bg-[#00c98d] transition-colors text-sm font-semibold flex items-center gap-2">
                        <Plus size={16} /> Raise Ticket
                    </button>
                </div>
            </div>

            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                {/* Filters bar */}
                <div className="flex items-center gap-4 p-4 border-b border-[#1A2A3A] bg-[#152336] overflow-x-auto">
                    {["All", "Open", "In Progress", "Closed"].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === status ? 'bg-[#1A2A3A] text-white border border-[#2A3A4A]' : 'bg-transparent text-[#8899AA] hover:text-white border border-transparent hover:border-[#2A3A4A] hover:bg-[#1A2A3A]/50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                    <div className="h-4 w-px bg-[#2A3A4A] mx-2"></div>
                    <button className="text-[#8899AA] hover:text-white text-sm font-medium flex items-center gap-1.5 transition-colors">
                        <Filter size={14} /> More Filters
                    </button>
                </div>

                {/* Ticket List */}
                <div className="divide-y divide-[#1A2A3A]">
                    {MY_TICKETS.filter(t => filter === "All" || t.status === filter).map(ticket => (
                        <div key={ticket.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-[#1A2A3A]/50 transition-colors cursor-pointer group">
                            <div className="flex items-start gap-4 flex-1 pr-6">
                                <div className={`mt-1 flex items-center justify-center ${ticket.status === "Closed" ? 'text-[#445566]' :
                                        ticket.status === "In Progress" ? 'text-[#FFB020]' : 'text-[#33E6FF]'
                                    }`}>
                                    {ticket.status === "Closed" ? <CheckCircle2 size={24} /> :
                                        ticket.status === "In Progress" ? <Clock size={24} /> : <AlertCircle size={24} />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[#8899AA] font-mono text-xs font-semibold">{ticket.id}</span>
                                        {ticket.urgent && <span className="text-[10px] text-[#FF4444] bg-[#FF4444]/10 border border-[#FF4444]/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Urgent</span>}
                                    </div>
                                    <h3 className={`text-lg font-semibold mb-1 group-hover:text-[#00E5A0] transition-colors ${ticket.status === 'Closed' ? 'text-[#8899AA]' : 'text-white'}`}>
                                        {ticket.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-xs font-medium text-[#445566]">
                                        <span className="flex items-center gap-1.5 text-[#33E6FF] bg-[#1A2A3A] px-2 py-0.5 rounded"><Ticket size={12} /> {ticket.category}</span>
                                        <span>{ticket.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-0 flex items-center gap-6">
                                <div className="flex items-center gap-4 text-[#8899AA] text-sm font-medium">
                                    <span className="flex items-center gap-1.5 bg-[#1A2A3A] px-2.5 py-1 rounded-lg">
                                        <MessageSquare size={14} className={ticket.messages > 0 ? "text-[#FFB020]" : ""} />
                                        {ticket.messages}
                                    </span>
                                    <span className="flex items-center gap-1.5 w-24">
                                        <span className={`w-2 h-2 rounded-full ${ticket.status === "Closed" ? 'bg-[#445566]' :
                                                ticket.status === "In Progress" ? 'bg-[#FFB020]' : 'bg-[#33E6FF]'
                                            }`}></span>
                                        {ticket.status}
                                    </span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[#445566] group-hover:bg-[#00E5A0] group-hover:text-[#0A1420] transition-colors">
                                    <ChevronRight size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
