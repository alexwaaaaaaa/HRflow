"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { LifeBuoy, Search, Filter, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

const TICKETS = [
    { id: 'TKT-902', type: 'Hardware', title: 'MacBook Battery Draining Fast', user: 'Jason Smith', status: 'Open', priority: 'High', date: '2 hours ago' },
    { id: 'TKT-901', type: 'Software', title: 'Need Adobe Creative Cloud License', user: 'Emma Wong', status: 'In Progress', priority: 'Medium', date: 'Yesterday' },
    { id: 'TKT-900', type: 'Access', title: 'VPN Access Denied', user: 'Rahul K', status: 'Open', priority: 'Critical', date: 'Yesterday' },
    { id: 'TKT-895', type: 'Hardware', title: 'Monitor Not Displaying', user: 'Priya Patel', status: 'Resolved', priority: 'Medium', date: 'Oct 20, 2025' },
    { id: 'TKT-891', type: 'Software', title: 'MS Office Activation Error', user: 'Anita K', status: 'Resolved', priority: 'Low', date: 'Oct 18, 2025' },
];

export default function ITSupportTickets() {
    const [activeTab, setActiveTab] = useState('All');
    const [search, setSearch] = useState('');

    return (
        <Page
            title="IT Support Helpdesk"
            subtitle="Manage employee technical requests, routing, and resolutions."
            breadcrumbs={[{ label: "Assets", href: "/assets" }, { label: "Tickets" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><LifeBuoy size={24} className="text-sky-400" /> IT Support Helpdesk</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage employee technical requests, routing, and resolutions.</p>
                </div>
            </div>

            <div className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                {/* Header Actions */}
                <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-4 items-center justify-between bg-[#060D1A]">
                    <div className="flex gap-2">
                        {['All', 'Open', 'In Progress', 'Resolved'].map((t, i) => (
                            <button key={i} onClick={() => setActiveTab(t)} className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${activeTab === t ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : 'bg-[#131B2B] text-[#556677] border-[#2A3A4A] hover:text-white'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="text-[#8899AA] hover:text-white transition-colors bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg"><Filter size={16} /></button>
                        <div className="relative flex-1 md:w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search ticket ID or issue..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-sky-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Ticket List */}
                <div className="divide-y divide-[#1A2A3A]">
                    {TICKETS.filter(t => (activeTab === 'All' || t.status === activeTab) && (!search || t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()))).map((tkt, i) => (
                        <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#131B2B]/50 transition-colors group cursor-pointer">
                            <div className="flex items-start gap-4">
                                <div className="pt-1">
                                    {tkt.status === 'Resolved' ? <CheckCircle2 size={24} className="text-emerald-500" /> : <MessageSquare size={24} className="text-[#556677] group-hover:text-sky-400 transition-colors" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[#AABBCC] font-mono text-xs">{tkt.id}</span>
                                        <h3 className="text-white font-bold text-lg group-hover:text-sky-400 transition-colors">{tkt.title}</h3>
                                    </div>
                                    <div className="text-[#8899AA] text-sm flex items-center gap-3">
                                        <span>Raised by <strong className="text-white">{tkt.user}</strong></span>
                                        <span className="w-1 h-1 rounded-full bg-[#2A3A4A]"></span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {tkt.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-[#2A3A4A]"></span>
                                        <span>Category: {tkt.type}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-col items-center md:items-end gap-3 justify-between md:justify-center ml-10 md:ml-0 border-t md:border-t-0 border-[#1A2A3A] pt-4 md:pt-0 mt-2 md:mt-0">
                                <div className={`px-3 py-1 bg-[#131B2B] border rounded-lg text-xs font-bold uppercase tracking-wider
                     ${tkt.priority === 'Critical' ? 'border-rose-500/50 text-rose-400' :
                                        tkt.priority === 'High' ? 'border-amber-500/50 text-amber-400' :
                                            'border-[#2A3A4A] text-[#8899AA]'}`}>
                                    {tkt.priority} Priority
                                </div>
                                <div className={`text-sm font-bold ${tkt.status === 'Resolved' ? 'text-emerald-500' : tkt.status === 'In Progress' ? 'text-sky-400' : 'text-[#8899AA]'}`}>
                                    {tkt.status}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State / End of List */}
                    <div className="p-8 text-center text-[#556677] text-sm">
                        End of tickets matching your criteria.
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
