"use client";
import React, { useState } from "react";
import { Search, Filter, Mail, Plus, MapPin, Briefcase, ExternalLink, Sparkles } from "lucide-react";

const SOURCED_CANDS = [
    { id: "s1", name: "Ananya Desai", role: "Principal Engineer", company: "TechCorp", exp: "10 Yrs", src: "LinkedIn", loc: "Bengaluru", match: 95 },
    { id: "s2", name: "Rohan Khanna", role: "Lead DevOps", company: "CloudNet", exp: "8 Yrs", src: "GitHub", loc: "Pune", match: 92 },
    { id: "s3", name: "Siddharth Iyer", role: "Senior SDE", company: "FinTech Org", exp: "6 Yrs", src: "StackOverflow", loc: "Remote", match: 88 },
    { id: "s4", name: "Pooja Sharma", role: "Frontend Architect", company: "E-comm Inc", exp: "9 Yrs", src: "LinkedIn", loc: "Mumbai", match: 85 },
];

export default function CandidateSourcing() {
    const [query, setQuery] = useState("");

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">AI Talent Sourcing</h1>
                    <p className="text-sm text-[#8899AA]">Discover passive candidates using AI-powered semantic search</p>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-white text-sm font-medium rounded-xl hover:bg-[#1A2A3A] transition-colors">Saved Searches</button>
                    <button className="h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-colors">
                        <Sparkles size={14} /> AI Boolean Builder
                    </button>
                </div>
            </div>

            {/* Smart Search Bar */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-8 flex flex-col gap-4">
                <div className="relative">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder='Try: "Senior React Developer in Bengaluru with FinTech experience"'
                        className="w-full h-12 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-11 px-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF] transition-colors"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 h-8 bg-[#0066FF] text-white text-xs font-bold rounded-lg hover:bg-[#0052cc] transition-colors">Search</button>
                </div>

                {/* Active Filters */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-[#8899AA] font-medium mr-2">Filters:</span>
                    {["Location: India (Remote/Hybrid)", "Experience: 5-10 Yrs", "Skills: React OR Vue"].map(f => (
                        <div key={f} className="flex items-center gap-1.5 bg-[#1A2A3A] text-xs font-medium px-3 py-1.5 rounded-lg text-white">
                            {f} <button className="text-[#8899AA] hover:text-[#FF4444] ml-1">×</button>
                        </div>
                    ))}
                    <button className="flex items-center gap-1.5 text-[#00E5A0] text-xs font-medium px-3 py-1.5 hover:bg-[#00E5A0]/10 rounded-lg transition-colors">
                        <Filter size={12} /> Add Filter
                    </button>
                </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Top Sourced Candidates <span className="text-[#8899AA] text-xs ml-2">(1,240 matches)</span></h3>
                <div className="flex bg-[#0D1928] border border-[#1A2A3A] rounded-lg overflow-hidden">
                    <button className="px-3 py-1.5 text-xs font-medium bg-[#1A2A3A] text-white">Best Match</button>
                    <button className="px-3 py-1.5 text-xs font-medium text-[#8899AA] hover:bg-[#1A2A3A]/50">Recently Active</button>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {SOURCED_CANDS.map(cand => (
                    <div key={cand.id} className="bg-[#0D1928] border border-[#1A2A3A] hover:border-[#2A3A4A] rounded-2xl p-5 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-[#1A2A3A] rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0">
                                    {cand.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg flex items-center gap-2">
                                        {cand.name} <span className="text-[#00E5A0] text-[10px] bg-[#00E5A0]/10 px-2 py-0.5 rounded uppercase">{cand.match}% Match</span>
                                    </h4>
                                    <p className="text-sm text-[#8899AA] mt-0.5 flex items-center gap-1.5">
                                        <Briefcase size={12} /> {cand.role} @ {cand.company}
                                    </p>
                                    <p className="text-xs text-[#445566] mt-1 flex items-center gap-3">
                                        <span className="flex items-center gap-1"><MapPin size={10} /> {cand.loc}</span>
                                        <span>Exp: {cand.exp}</span>
                                        <span className="flex items-center gap-1"><ExternalLink size={10} /> {cand.src}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Extracted context snippet */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-3 mb-4">
                            <p className="text-xs text-[#8899AA] leading-relaxed">
                                <strong className="text-white font-medium">Why they match:</strong> 6 years of deep React ecosystem experience. Led architectural overhaul at {cand.company}. Mentions advanced performance tuning and Webpack in recent GitHub commits.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button className="flex-1 h-9 bg-[#0066FF] text-white text-xs font-bold rounded-xl hover:bg-[#0052cc] flex items-center justify-center gap-2 transition-colors">
                                <Plus size={14} /> Add to Job
                            </button>
                            <button className="flex-1 h-9 bg-transparent border border-[#2A3A4A] text-white text-xs font-bold rounded-xl hover:border-[#445566] flex items-center justify-center gap-2 transition-colors">
                                <Mail size={14} /> Reach Out
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
