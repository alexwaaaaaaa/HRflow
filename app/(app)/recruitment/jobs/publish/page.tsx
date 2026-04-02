"use client";
import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Navigation, Check, X, Code, Globe, MoreVertical } from "lucide-react";

const BOARDS = [
    { id: "linkedin", name: "LinkedIn Jobs", logo: "in", color: "#0077b5", connected: true, cost: "Included in ATS Plan" },
    { id: "indeed", name: "Indeed", logo: "id", color: "#003A9B", connected: true, cost: "Free (Organic)" },
    { id: "glassdoor", name: "Glassdoor", logo: "gd", color: "#0CAA41", connected: true, cost: "Free (Organic)" },
    { id: "naukri", name: "Naukri.com", logo: "nk", color: "#275BB5", connected: false, cost: "Requires API Key" },
    { id: "instahyre", name: "Instahyre", logo: "ih", color: "#F05A28", connected: false, cost: "Premium Add-on" },
];

export default function JobBoardPublishing() {
    const [selected, setSelected] = useState<Record<string, boolean>>({ linkedin: true, indeed: true });

    const toggle = (id: string) => {
        if (!BOARDS.find(b => b.id === id)?.connected) return;
        setSelected(p => ({ ...p, [id]: !p[id] }));
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden text-white bg-[#060B14]">

            {/* Publisher Configuration (Left) */}
            <div className="w-[500px] border-r border-[#1A2A3A] flex flex-col bg-[#0A1420]">
                <div className="p-6 border-b border-[#1A2A3A] shrink-0">
                    <div className="flex items-center gap-3 mb-4">
                        <button className="w-8 h-8 bg-[#1A2A3A] rounded-lg flex items-center justify-center text-[#8899AA] hover:text-white transition-colors"><ArrowLeft size={14} /></button>
                        <h1 className="text-xl font-bold">Publish to Job Boards</h1>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="font-bold text-sm text-white">Senior Frontend Engineer</p>
                            <p className="text-xs text-[#8899AA] mt-1">REQ-2025-045 · Bengaluru (Remote)</p>
                        </div>
                        <span className="bg-[#00E5A0]/10 text-[#00E5A0] text-[10px] font-bold px-2 py-1 rounded">Approved</span>
                    </div>
                </div>

                <div className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1A2A3A]">
                    <h3 className="text-sm font-semibold mb-4 text-[#8899AA]">Select Distribution Channels</h3>

                    <div className="space-y-3">
                        {BOARDS.map((b) => (
                            <div key={b.id} onClick={() => toggle(b.id)}
                                className={`p-4 border rounded-xl flex items-center gap-4 transition-all ${!b.connected ? 'opacity-50 cursor-not-allowed border-[#1A2A3A] bg-[#060B14]' :
                                        selected[b.id] ? 'border-[#0066FF] bg-[#0066FF]/5 cursor-pointer shadow-[0_0_15px_rgba(0,102,255,0.1)]' : 'border-[#1A2A3A] bg-[#0D1928] hover:border-[#2A3A4A] cursor-pointer'
                                    }`}>

                                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: b.color }}>
                                    {b.logo}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-white text-sm">{b.name}</h4>
                                        {!b.connected && <span className="text-[10px] bg-[#1A2A3A] text-[#8899AA] px-2 py-0.5 rounded font-bold">Not Connected</span>}
                                    </div>
                                    <p className="text-[11px] text-[#8899AA]">{b.cost}</p>
                                </div>

                                {b.connected && (
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${selected[b.id] ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-[#445566] text-transparent'}`}>
                                        <Check size={12} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-sm font-semibold mb-4 text-[#8899AA]">Budget Promotion (Optional)</h3>
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4">
                            <p className="text-sm text-white mb-3">Boost visibility on LinkedIn & Indeed</p>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2 bg-[#1A2A3A] border border-[#0066FF] text-[#0066FF] rounded-lg text-xs font-bold text-center hover:bg-[#0066FF]/10 transition-colors">$50 / day</button>
                                <button className="flex-1 py-2 bg-[#1A2A3A] border border-transparent text-[#8899AA] rounded-lg text-xs font-bold text-center hover:bg-[#2A3A4A] transition-colors">$100 / day</button>
                            </div>
                            <p className="text-[10px] text-[#445566] text-center mt-3">Estimated 400-600 extra applicants per week</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-[#1A2A3A] bg-[#0D1928] shrink-0">
                    <button className="w-full h-12 bg-[#00E5A0] text-[#060B14] font-bold rounded-xl hover:bg-[#00c98d] transition-colors flex justify-center items-center gap-2">
                        <Navigation size={16} /> Publish to {Object.values(selected).filter(Boolean).length} Channels
                    </button>
                    <p className="text-center text-[10px] text-[#445566] mt-3">Distribution takes approx 15-30 mins to reflect globally.</p>
                </div>
            </div>

            {/* Preview (Right Panel) */}
            <div className="flex-1 bg-[#1A2A3A] p-8 overflow-y-auto hidden lg:flex flex-col items-center">
                <div className="w-full max-w-[600px] mb-4 flex justify-between items-center text-sm text-[#8899AA] font-medium">
                    <span>Preview: Company Careers Page</span>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded border border-[#2A3A4A] flex items-center justify-center hover:text-white"><Globe size={14} /></button>
                        <button className="w-8 h-8 rounded border border-[#2A3A4A] flex items-center justify-center hover:text-white"><Code size={14} /></button>
                    </div>
                </div>

                {/* Fake Careers site render */}
                <div className="w-full max-w-[600px] bg-white text-black rounded-lg shadow-2xl overflow-hidden min-h-[800px]">
                    <div className="h-48 bg-gray-900 border-b-4 border-[#0066FF] p-8 flex items-end">
                        <h1 className="text-3xl font-bold text-white">Senior Frontend Engineer</h1>
                    </div>
                    <div className="p-8">
                        <div className="flex gap-4 mb-6">
                            <span className="bg-gray-100 text-gray-700 font-bold text-xs px-3 py-1 rounded">Engineering</span>
                            <span className="bg-gray-100 text-gray-700 font-bold text-xs px-3 py-1 rounded">Bengaluru, KA</span>
                            <span className="bg-gray-100 text-gray-700 font-bold text-xs px-3 py-1 rounded">Full-time</span>
                        </div>

                        <div className="prose prose-sm prose-gray max-w-none">
                            <h3 className="font-bold text-lg mb-2">About the Role</h3>
                            <p className="mb-4 text-gray-600">We are looking for a Senior Frontend Engineer proficient in React and Next.js to build state-of-the-art enterprise applications...</p>

                            <h3 className="font-bold text-lg mb-2 mt-6">Responsibilities</h3>
                            <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-1">
                                <li>Architect robust, scalable UI systems</li>
                                <li>Mentor junior JS developers</li>
                                <li>Establish testing automation workflows</li>
                            </ul>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <button className="w-full h-12 bg-black text-white font-bold rounded hover:bg-gray-800 transition-colors">Apply with LinkedIn</button>
                            <button className="w-full h-12 border-2 border-black text-black font-bold rounded hover:bg-gray-50 transition-colors mt-3">Apply Manually</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
