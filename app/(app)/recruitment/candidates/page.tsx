"use client";
import React, { useState } from "react";
import { Search, Filter, MoreVertical, Mail, Star, ExternalLink, Download } from "lucide-react";

// Mock Data
const CANDIDATES = [
    { id: "C-1045", name: "Rahul Sharma", role: "Senior Frontend Engineer", stage: "Interview", rating: 4, src: "Careers Page", applied: "12 Mar 2025" },
    { id: "C-1046", name: "Anjali Singh", role: "Product Marketing Mgr", stage: "Screening", rating: 0, src: "LinkedIn", applied: "11 Mar 2025" },
    { id: "C-1047", name: "Vikram Reddy", role: "Senior Frontend Engineer", stage: "Offer", rating: 5, src: "Referral", applied: "05 Mar 2025" },
    { id: "C-1048", name: "Neha Gupta", role: "HR Business Partner", stage: "Applied", rating: 0, src: "Indeed", applied: "14 Mar 2025" },
    { id: "C-1049", name: "Karan Patel", role: "Backend Engineer (Go)", stage: "Interview", rating: 3, src: "Careers Page", applied: "08 Mar 2025" },
    { id: "C-1050", name: "Priya Nair", role: "Enterprise Sales Rep", stage: "Rejected", rating: 2, src: "LinkedIn", applied: "01 Mar 2025" },
];

const STAGE_COLORS: Record<string, { bg: string, text: string }> = {
    "Applied": { bg: "rgba(68,85,102,0.1)", text: "#8899AA" },
    "Screening": { bg: "rgba(0,102,255,0.1)", text: "#0066FF" },
    "Interview": { bg: "rgba(155,89,182,0.1)", text: "#9B59B6" },
    "Offer": { bg: "rgba(255,184,0,0.1)", text: "#FFB800" },
    "Hired": { bg: "rgba(0,229,160,0.1)", text: "#00E5A0" },
    "Rejected": { bg: "rgba(255,68,68,0.1)", text: "#FF4444" },
};

export default function CandidateList() {
    const [search, setSearch] = useState("");
    const [filterStage, setFilterStage] = useState("All");

    const filtered = CANDIDATES.filter(c =>
        (filterStage === "All" || c.stage === filterStage) &&
        (c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Candidate Database</h1>
                    <p className="text-sm text-[#8899AA]">Central repository of all applicants across open and past jobs</p>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl hover:bg-[#243040] flex items-center gap-2 transition-colors">
                        <Download size={14} /> Export CSV
                    </button>
                    <button className="h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-colors">
                        Add Candidate
                    </button>
                </div>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name or skills..."
                        className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-none">
                    {["All", "Applied", "Screening", "Interview", "Offer", "Hired"].map(s => (
                        <button key={s} onClick={() => setFilterStage(s)}
                            className={`h-10 px-4 text-xs font-semibold border rounded-xl whitespace-nowrap transition-all ${filterStage === s ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'bg-[#0D1928] border-[#1A2A3A] text-[#8899AA] hover:border-[#2A3A4A]'}`}>
                            {s}
                        </button>
                    ))}
                </div>
                <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-[#8899AA] text-sm rounded-xl hover:bg-[#1A2A3A] flex items-center gap-2 transition-colors ml-auto">
                    <Filter size={14} /> Filters
                </button>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium w-3/12">Candidate</th>
                            <th className="px-6 py-4 font-medium w-3/12">Applied For</th>
                            <th className="px-6 py-4 font-medium text-center">Stage</th>
                            <th className="px-6 py-4 font-medium text-center">Rating</th>
                            <th className="px-6 py-4 font-medium">Source / Date</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {filtered.map(cand => (
                            <tr key={cand.id} className="hover:bg-[#1A2A3A]/30 transition-colors group cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA]">
                                            {cand.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white mb-0.5">{cand.name}</p>
                                            <p className="text-[11px] text-[#445566]">{cand.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#8899AA] font-medium">{cand.role}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full"
                                        style={{ background: STAGE_COLORS[cand.stage].bg, color: STAGE_COLORS[cand.stage].text }}>
                                        {cand.stage}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} size={11} style={{ color: s <= cand.rating ? "#FFB800" : "#1A2A3A", fill: s <= cand.rating ? "#FFB800" : "#1A2A3A" }} />
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs text-white mb-0.5">{cand.src}</p>
                                    <p className="text-[10px] text-[#445566]">{cand.applied}</p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="h-8 w-8 bg-[#1A2A3A] text-[#8899AA] hover:text-white rounded-lg flex items-center justify-center hover:bg-[#243040] opacity-0 group-hover:opacity-100 transition-all">
                                            <Mail size={14} />
                                        </button>
                                        <button className="h-8 w-8 bg-[#0066FF] text-white rounded-lg flex items-center justify-center hover:bg-[#0052cc] opacity-0 group-hover:opacity-100 transition-all">
                                            <ExternalLink size={14} />
                                        </button>
                                        <button className="h-8 w-8 text-[#445566] hover:text-white rounded-lg flex items-center justify-center transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-[#445566]">
                                    No candidates found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
