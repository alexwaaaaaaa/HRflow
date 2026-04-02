"use client";
import React, { useState } from "react";
import {
    Users, Sparkles, UserPlus, CheckCircle2, ChevronDown, Search,
    Filter
} from "lucide-react";

const NEW_JOINERS = [
    { id: 1, name: "Arjun Mehta", role: "Frontend Dev", dept: "Engineering", assigned: false },
    { id: 2, name: "Sneha Rao", role: "Product Designer", dept: "Design", assigned: true, buddy: "Vikram Singh" },
    { id: 3, name: "Kabir Das", role: "Sales Executive", dept: "Sales", assigned: false },
    { id: 4, name: "Priya Singh", role: "Marketing Mngr", dept: "Marketing", assigned: false },
];

export default function BuddyAssignment() {
    const [selectedJoiner, setSelectedJoiner] = useState(1);
    const [assigning, setAssigning] = useState(false);

    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)] flex flex-col">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Users size={28} className="text-[#00E5A0]" />
                        Onboarding Buddy Assignment
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Match new joiners with experienced culture champions to guide their first 30 days.</p>
                </div>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">
                {/* Left: Joiner List */}
                <div className="w-[400px] shrink-0 bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]" size={16} />
                            <input
                                type="text"
                                placeholder="Search joiners..."
                                className="w-full pl-9 pr-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5A0] transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {NEW_JOINERS.map(joiner => (
                            <div
                                key={joiner.id}
                                onClick={() => setSelectedJoiner(joiner.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-colors ${selectedJoiner === joiner.id ? 'bg-[#1A2A3A] border-[#00E5A0]' : 'bg-[#0A1420] border-[#1A2A3A] hover:border-[#2A3A4A]'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${selectedJoiner === joiner.id ? 'bg-[#00E5A0] text-[#0A1420]' : 'bg-[#1A2A3A] text-white'
                                            }`}>
                                            {joiner.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold text-sm ${selectedJoiner === joiner.id ? 'text-white' : 'text-gray-300'}`}>{joiner.name}</h3>
                                            <p className="text-xs text-[#8899AA]">{joiner.role} • {joiner.dept}</p>
                                        </div>
                                    </div>
                                    {joiner.assigned ? (
                                        <div className="bg-[#00E5A0]/10 text-[#00E5A0] p-1.5 rounded-full">
                                            <CheckCircle2 size={14} />
                                        </div>
                                    ) : (
                                        <span className="text-[10px] font-bold tracking-wider text-[#FFB020] bg-[#FFB020]/10 px-2 py-1 rounded-full uppercase">Pending</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: AI Match Studio */}
                <div className="flex-1 bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl flex flex-col p-8">
                    {selectedJoiner === 1 ? (
                        <>
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-[#1A2A3A] text-[#00E5A0] flex items-center justify-center font-bold text-2xl border border-[#2A3A4A]">
                                        AM
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Arjun Mehta</h2>
                                        <p className="text-[#8899AA]">Frontend Developer • Engineering</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 bg-[#9D00FF]/10 text-[#9D00FF] px-4 py-2 rounded-lg text-sm font-semibold border border-[#9D00FF]/20 hover:bg-[#9D00FF]/20 transition-colors">
                                    <Sparkles size={16} /> Run AI Match
                                </button>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Sparkles size={18} className="text-[#9D00FF]" /> AI Recommended Buddies
                                </h3>
                                <div className="space-y-4">
                                    {/* Top Match */}
                                    <div className={`p-4 rounded-xl border transition-all ${assigning ? 'bg-[#00E5A0]/10 border-[#00E5A0] shadow-[0_0_20px_rgba(0,229,160,0.1)]' : 'bg-[#0A1420] border-[#33E6FF] hover:border-[#00E5A0]'}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="relative">
                                                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Ravi" className="w-12 h-12 rounded-full border-2 border-[#1A2A3A]" />
                                                    <div className="absolute -bottom-1 -right-1 bg-[#33E6FF] text-[#0A1420] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#0F1C2E]">
                                                        98%
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-[15px]">Ravi Sharma</h4>
                                                    <p className="text-xs text-[#8899AA] mb-2">Senior Frontend Eng • 4 yrs tenure</p>
                                                    <div className="flex gap-2">
                                                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#1A2A3A] text-[#33E6FF] border border-[#2A3A4A]">Same Team</span>
                                                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#1A2A3A] text-[#00E5A0] border border-[#2A3A4A]">Has Capacity (0 active)</span>
                                                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#1A2A3A] text-[#FFB020] border border-[#2A3A4A]">High Rating (4.9/5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setAssigning(true)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${assigning ? 'bg-[#00E5A0] text-[#0A1420]' : 'bg-[#1A2A3A] text-white hover:bg-[#00E5A0] hover:text-[#0A1420]'
                                                    }`}
                                            >
                                                {assigning ? <><CheckCircle2 size={16} /> Assigned</> : <><UserPlus size={16} /> Assign</>}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Second Match */}
                                    <div className="p-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] opacity-70 hover:opacity-100 hover:border-[#2A3A4A] transition-all">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-full bg-[#1A2A3A] border-2 border-[#2A3A4A] flex items-center justify-center font-bold text-white">
                                                        DK
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 bg-[#1A2A3A] text-[#8899AA] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#2A3A4A]">
                                                        85%
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-[15px]">Deepak Kumar</h4>
                                                    <p className="text-xs text-[#8899AA] mb-2">Full Stack Dev • 2 yrs tenure</p>
                                                    <div className="flex gap-2">
                                                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#1A2A3A] text-[#8899AA] border border-[#2A3A4A]">Same Department</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#1A2A3A] text-white hover:bg-[#2A3A4A] transition-colors">
                                                Assign
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-10">
                                <p className="text-sm text-[#445566]">Or browse the full directory to assign manually</p>
                                <button className="mt-2 text-[#00E5A0] hover:underline text-sm font-semibold">View All Employees</button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-[#445566]">
                            <Users size={64} className="mb-4 opacity-20" />
                            <h2 className="text-xl font-medium text-white mb-2">Select a joiner</h2>
                            <p className="text-sm">Click on a new joiner from the list to view buddy recommendations.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
