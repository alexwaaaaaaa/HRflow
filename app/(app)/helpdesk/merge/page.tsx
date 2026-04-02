"use client";
import React, { useState } from "react";
import {
    GitMerge, Search, AlertCircle, ArrowRight, CheckCircle2,
    X
} from "lucide-react";
import Link from "next/link";

const TICKETS = [
    { id: "TKT-4470", title: "Office wifi down in sector 4", user: "Priya Singh", time: "2d ago", status: "Open" },
    { id: "TKT-4475", title: "Cannot connect to WiFi", user: "Rahul Sharma", time: "1d ago", status: "Open" },
    { id: "TKT-4481", title: "Internet is not working on 4th floor", user: "Sneha Rao", time: "12h ago", status: "Open" },
    { id: "TKT-4490", title: "Wifi disconnected", user: "Kabir Das", time: "2h ago", status: "Open" },
];

export default function TicketMerge() {
    const [primaryTicket, setPrimaryTicket] = useState("TKT-4470");
    const [selectedTickets, setSelectedTickets] = useState<string[]>(["TKT-4475", "TKT-4481"]);
    const [merged, setMerged] = useState(false);

    const toggleSelect = (id: string) => {
        if (id === primaryTicket) return;
        if (selectedTickets.includes(id)) {
            setSelectedTickets(selectedTickets.filter(t => t !== id));
        } else {
            setSelectedTickets([...selectedTickets, id]);
        }
    };

    if (merged) {
        return (
            <div className="p-6 max-w-[800px] mx-auto min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-10 text-center w-full">
                    <div className="w-20 h-20 bg-[#00E5A0]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00E5A0]">
                        <GitMerge size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Tickets Merged Successfully</h2>
                    <p className="text-[#8899AA] mb-8">Selected tickets have been closed and linked to the primary ticket {primaryTicket}.</p>
                    <Link href="/helpdesk/management" className="px-6 py-3 bg-[#1A2A3A] text-white rounded-xl hover:bg-[#2A3A4A] transition-colors font-semibold">
                        Return to Queue
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-8 pb-6 border-b border-[#1A2A3A]">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <GitMerge size={28} className="text-[#FFB020]" />
                    Merge Duplicate Tickets
                </h1>
                <p className="text-[#8899AA] text-sm mt-1">Combine redundant requests into a single primary ticket. All communications will be consolidated.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Side: Search & Select */}
                <div className="space-y-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" size={18} />
                        <input
                            type="text"
                            placeholder="Search tickets by keyword to find duplicates..."
                            defaultValue="wifi"
                            className="w-full bg-[#0F1C2E] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#FFB020] transition-colors"
                        />
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 bg-[#152336] border-b border-[#1A2A3A] flex justify-between items-center">
                            <h3 className="font-bold text-white text-sm">Search Results (4)</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {TICKETS.map(ticket => {
                                const isPrimary = ticket.id === primaryTicket;
                                const isSelected = selectedTickets.includes(ticket.id);

                                return (
                                    <div
                                        key={ticket.id}
                                        onClick={() => toggleSelect(ticket.id)}
                                        className={`p-4 flex items-start gap-4 cursor-pointer transition-colors ${isPrimary ? 'bg-[#FFB020]/10 border-l-2 border-l-[#FFB020]' :
                                                isSelected ? 'bg-[#1A2A3A] border-l-2 border-l-[#33E6FF]' :
                                                    'hover:bg-[#1A2A3A]/50 border-l-2 border-l-transparent'
                                            }`}
                                    >
                                        <div className="mt-1">
                                            {isPrimary ? (
                                                <div className="w-5 h-5 rounded-full bg-[#FFB020] flex items-center justify-center text-[#0A1420]"><CheckCircle2 size={12} /></div>
                                            ) : (
                                                <input
                                                    type="checkbox"
                                                    readOnly
                                                    checked={isSelected}
                                                    className="w-5 h-5 rounded border-[#2A3A4A] bg-[#0A1420] text-[#33E6FF] focus:ring-0 cursor-pointer"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-mono text-xs font-semibold text-[#8899AA]">{ticket.id}</span>
                                                {isPrimary && <span className="text-[10px] bg-[#FFB020]/20 text-[#FFB020] px-2 py-0.5 rounded uppercase font-bold tracking-wider">Primary</span>}
                                            </div>
                                            <h4 className={`text-sm font-semibold mb-1 ${isPrimary || isSelected ? 'text-white' : 'text-[#8899AA]'}`}>{ticket.title}</h4>
                                            <p className="text-xs text-[#445566]">Requester: {ticket.user} • Created: {ticket.time}</p>
                                        </div>
                                        {!isPrimary && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setPrimaryTicket(ticket.id); setSelectedTickets(selectedTickets.filter(id => id !== ticket.id)); }}
                                                className="text-[10px] text-[#8899AA] hover:text-[#FFB020] uppercase font-bold tracking-wider py-1 px-2 border border-[#2A3A4A] hover:border-[#FFB020] rounded transition-colors"
                                            >
                                                Make Primary
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Side: Merge Preview */}
                <div>
                    <div className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-2xl p-6 relative">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                            <GitMerge size={20} className="text-[#33E6FF]" /> Merge Plan
                        </h3>

                        {/* Target Primary */}
                        <div className="mb-8 relative z-10">
                            <span className="text-xs font-bold tracking-wider text-[#FFB020] uppercase mb-2 block">Will Merge Into (Primary)</span>
                            <div className="bg-[#0F1C2E] border border-[#FFB020]/50 shadow-[0_0_15px_rgba(255,176,32,0.1)] p-4 rounded-xl flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-[#8899AA] font-mono block mb-1">{TICKETS.find(t => t.id === primaryTicket)?.id}</span>
                                    <h4 className="text-white font-semibold">{TICKETS.find(t => t.id === primaryTicket)?.title}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Source Duplicates */}
                        <div className="relative z-10">
                            <span className="text-xs font-bold tracking-wider text-[#8899AA] uppercase mb-2 block">Tickets to be closed as 'Duplicate'</span>
                            {selectedTickets.length === 0 ? (
                                <div className="text-sm text-[#445566] italic bg-[#0A1420] p-4 rounded-xl border border-[#1A2A3A] border-dashed text-center">
                                    Select tickets from the left to merge.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {selectedTickets.map(id => (
                                        <div key={id} className="bg-[#0A1420] border border-[#2A3A4A] p-4 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <ArrowRight size={16} className="text-[#33E6FF]" />
                                                <div>
                                                    <span className="text-xs text-[#8899AA] font-mono block mb-0.5">{id}</span>
                                                    <h4 className="text-[#8899AA] text-sm font-medium line-through decoration-[#445566]">{TICKETS.find(t => t.id === id)?.title}</h4>
                                                </div>
                                            </div>
                                            <button onClick={() => toggleSelect(id)} className="text-[#445566] hover:text-[#FF4444] transition-colors"><X size={16} /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Connector Line Logic (visual only) */}
                        <div className="absolute left-10 top-24 bottom-24 w-px bg-[#2A3A4A] -z-0 hidden md:block"></div>

                        <div className="mt-10 pt-6 border-t border-[#2A3A4A]">
                            <div className="flex items-start gap-3 mb-6 bg-[#FFB020]/10 border border-[#FFB020]/20 p-4 rounded-xl">
                                <AlertCircle size={20} className="text-[#FFB020] shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold text-[#FFB020] mb-1">Confirm Merge Action</h4>
                                    <p className="text-xs text-[#8899AA]">Requesters of duplicate tickets will receive an automated email notifying them that their ticket was merged. This action cannot be undone easily.</p>
                                </div>
                            </div>
                            <button
                                disabled={selectedTickets.length === 0}
                                onClick={() => setMerged(true)}
                                className="w-full py-3 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Merge {selectedTickets.length} Tickets
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
