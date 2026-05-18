"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { RefreshCcw, UserSearch, AlertTriangle, Monitor, PackageCheck } from 'lucide-react';

export default function AssetReturnScreen() {
    const [emp, setEmp] = useState('');

    const ASSETS = [
        { sn: 'MBP-2022-105', model: 'MacBook Pro 14" M2', date: 'Jul 2022' },
        { sn: 'MON-DELL-44', model: 'Dell 27" 4K Monitor', date: 'Sep 2022' },
    ];

    return (
        <Page
            title="Asset Return / Check-in"
            subtitle="Receive hardware back from employees due to offboarding or a device refresh."
            breadcrumbs={[{ label: "Assets", href: "/assets" }, { label: "Return" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><RefreshCcw size={24} className="text-rose-400" /> Asset Return / Check-in</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Receive hardware back from employees due to offboarding or a device refresh.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-rose-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 relative z-10">Select Employee</h3>

                        <div className="relative mb-6 z-10">
                            <UserSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search by Offboarding Employee Name" value={emp} onChange={e => setEmp(e.target.value)}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-3 text-white focus:border-rose-500 outline-none transition-colors" />
                        </div>

                        {emp.length > 2 && (
                            <div className="animate-in fade-in slide-in-from-top-2 relative z-10 space-y-4">
                                <div className="p-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl flex items-center justify-between bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMTMxQjJCIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyQTNBNEEiPjwvcmVjdD4KPC9zdmc+')]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-400 font-bold border border-rose-500/20">JS</div>
                                        <div>
                                            <div className="text-white font-bold">Jason Smith</div>
                                            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mt-0.5 animate-pulse">Offboarding Initiated</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[#8899AA] text-xs">Separation Date</div>
                                        <div className="text-white font-bold">Nov 15, 2025</div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[#8899AA] text-xs font-bold uppercase mb-3">Assets currently held (2)</h4>
                                    <div className="space-y-3">
                                        {ASSETS.map((asset, i) => (
                                            <label key={i} className="flex items-center gap-4 p-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl cursor-pointer hover:border-rose-500/50 group">
                                                <input type="checkbox" className="w-5 h-5 accent-rose-500 rounded border-[#2A3A4A]" />
                                                <div className="flex-1">
                                                    <div className="text-white font-bold flex items-center gap-2"><Monitor size={14} className="text-[#556677]" /> {asset.model}</div>
                                                    <div className="text-[#556677] text-xs font-mono mt-1">S/N: {asset.sn} • Assigned: {asset.date}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className={`bg-[#0A1420] border rounded-2xl p-6 transition-colors ${emp.length > 2 ? 'border-[#1A2A3A]' : 'opacity-50 pointer-events-none border-[#1A2A3A]'}`}>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Condition & Check-in</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[#8899AA] font-bold text-xs mb-3">Return Condition</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Working / Good', 'Needs Repair', 'Loss / Stolen'].map((c, i) => (
                                        <label key={i} className="flex flex-col items-center justify-center p-3 border border-[#2A3A4A] rounded-xl bg-[#131B2B] cursor-pointer hover:border-rose-500 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500 group">
                                            <input type="radio" name="condition" className="hidden" />
                                            <span className="text-white text-xs font-bold text-center group-hover:text-rose-400">{c}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 pb-4">
                                <label className="block text-[#8899AA] font-bold text-xs mb-2">Check-in Assessment Notes</label>
                                <textarea rows={3} placeholder="Please record any visible physical damage here..." className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none transition-colors resize-none"></textarea>
                            </div>

                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
                                <AlertTriangle size={18} className="text-amber-400 mt-0.5 shrink-0" />
                                <p className="text-amber-200/80 text-xs leading-relaxed">Checking in these assets will automatically mark them as 'IT Stockroom' and clear the employee's IT Offboarding checklist requirement.</p>
                            </div>

                            <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(225,29,72,0.3)] flex items-center justify-center gap-2">
                                <PackageCheck size={20} /> Collect & Return to Inventory
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
