"use client";
import React, { useState } from 'react';
import { CheckSquare, ChevronRight, ShieldAlert, Laptop, LockKeyhole, Search } from 'lucide-react';

export default function ClearanceChecklistScreen() {
    const [activeDept, setActiveDept] = useState('IT');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Offboarding Workspace</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><CheckSquare size={24} className="text-amber-400" /> Department Clearances</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage asset recovery and access revocation across organizational boundaries.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar: Exiting Employees */}
                <div className="md:w-80 shrink-0 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col h-[calc(100vh-140px)] sticky top-6">
                    <div className="p-4 border-b border-[#1A2A3A]">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search employees..." className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-amber-500 outline-none" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-2">
                        {[
                            { name: 'Sarah Jenkins', deps: '3/4', bg: 'bg-[#131B2B]', border: 'border-amber-500/30' },
                            { name: 'Michael Chang', deps: '4/4', bg: 'transparent', border: 'border-transparent' },
                            { name: 'David Torres', deps: '1/4', bg: 'transparent', border: 'border-transparent' },
                        ].map((e, i) => (
                            <div key={i} className={`p-3 rounded-xl mb-1 cursor-pointer hover:bg-[#131B2B] transition-colors border ${e.bg} flex items-center justify-between ${e.border}`}>
                                <div>
                                    <div className="text-white font-bold text-sm mb-0.5">{e.name}</div>
                                    <div className="text-[#556677] text-xs font-mono uppercase">LWD: Oct 24</div>
                                </div>
                                <div className={`text-xs font-bold ${e.deps === '4/4' ? 'text-emerald-400' : 'text-amber-400'}`}>{e.deps} Clear</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                        <div className="flex items-end justify-between border-b border-[#1A2A3A] pb-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Sarah Jenkins</h2>
                                <p className="text-[#8899AA] text-sm">Engineering Manager • Cleared 3 of 4 departments</p>
                            </div>
                            <div className="text-right">
                                <span className="bg-amber-500/10 text-amber-400 font-bold px-3 py-1.5 rounded-lg border border-amber-500/20 text-sm flex items-center gap-2">
                                    <ShieldAlert size={16} /> Clearance Blocking Final Pay
                                </span>
                            </div>
                        </div>

                        {/* Dept Tabs */}
                        <div className="flex border-b border-[#1A2A3A] mb-6">
                            {['IT', 'Finance', 'Facilities', 'HR_Policy'].map((d) => (
                                <button key={d} onClick={() => setActiveDept(d)} className={`px-6 py-3 border-b-2 font-bold text-sm transition-colors ${activeDept === d ? 'border-amber-400 text-amber-400' : 'border-transparent text-[#556677] hover:text-[#8899AA]'}`}>
                                    {d}
                                </button>
                            ))}
                        </div>

                        {activeDept === 'IT' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="flex justify-between items-center p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400"><Laptop size={20} /></div>
                                        <div>
                                            <div className="text-white font-bold text-sm mb-1">Hardware Return Overdue</div>
                                            <div className="text-rose-200/70 text-xs">MacBook Pro 16" (Tag: IT-MAC-092) not checked into depot.</div>
                                        </div>
                                    </div>
                                    <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-colors shadow">Mark Recovered</button>
                                </div>

                                <div>
                                    <h4 className="text-[#8899AA] text-sm font-bold mb-3 flex items-center gap-2"><LockKeyhole size={16} /> System Access Revocation</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl opacity-60">
                                            <span className="text-white text-sm font-mono line-through decoration-emerald-500">Google Workspace (Email)</span>
                                            <span className="text-emerald-400 text-xs font-bold uppercase">Revoked via Okta</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-[#131B2B] border border-[#2A3A4A] rounded-xl opacity-60">
                                            <span className="text-white text-sm font-mono line-through decoration-emerald-500">AWS Production Access</span>
                                            <span className="text-emerald-400 text-xs font-bold uppercase">Revoked via Okta</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-[#131B2B] border border-amber-500/30 rounded-xl">
                                            <span className="text-white text-sm font-mono">GitHub Org Membership</span>
                                            <button className="text-xs bg-amber-500 text-[#0A1420] font-bold px-3 py-1 rounded">Manual Action Req</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeDept !== 'IT' && (
                            <div className="p-12 text-center text-[#556677] font-bold animate-in fade-in">
                                Department clearance completed or no actions required.
                            </div>
                        )}
                    </div>

                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl flex justify-between items-center">
                        <span className="text-[#8899AA] text-sm">Waiting on IT Department approval.</span>
                        <button className="bg-[#0A1420] text-[#556677] cursor-not-allowed font-bold px-5 py-2.5 rounded-xl text-sm border border-[#1A2A3A]">
                            Generate Issue Free Certificate (NOC)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
