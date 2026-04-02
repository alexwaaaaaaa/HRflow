"use client";
import React, { useState } from 'react';
import { ArrowLeftRight, ArrowLeft, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function InterEntityTransferScreen() {
    const [employee, setEmployee] = useState('');

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><ArrowLeftRight size={24} className="text-teal-400" /> Inter-Entity Transfer Wizard</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Move employees between group companies, resolving F&F and carrying over continuity.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Transfer Details</h3>

                        <div className="space-y-5 text-sm">
                            <div>
                                <label className="block text-[#8899AA] font-bold mb-2">Select Employee</label>
                                <div className="relative">
                                    <UserCheck size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                                    <input type="text" placeholder="Search by name or ID" value={employee} onChange={e => setEmployee(e.target.value)}
                                        className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-3 text-white focus:border-teal-500 outline-none" />
                                </div>
                            </div>

                            {employee && (
                                <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="w-12 h-12 bg-[#0A1420] rounded-full flex items-center justify-center text-teal-400 font-bold border border-teal-500/30">RK</div>
                                    <div>
                                        <div className="text-white font-bold">Rahul Kapoor</div>
                                        <div className="text-teal-400 text-xs">EMP-042 • Sales Director</div>
                                        <div className="text-[#556677] text-[10px] mt-0.5">Current Entity: Acme Tech (Parent)</div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Effective Date</label>
                                    <input type="date" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-teal-500 outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Target Entity</label>
                                    <select className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-teal-500 outline-none appearance-none">
                                        <option>Acme Retail Solutions</option>
                                        <option>Acme Logistics India</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className={`bg-[#0A1420] border rounded-2xl p-6 transition-colors ${employee ? 'border-teal-500/30' : 'border-[#1A2A3A] opacity-50 pointer-events-none'}`}>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Transfer Logistics (Continuity)</h3>

                        <div className="space-y-4">
                            <label className="flex items-start gap-4 p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A] cursor-pointer hover:border-teal-500/50">
                                <input type="checkbox" className="mt-1 accent-teal-500 w-4 h-4" defaultChecked />
                                <div>
                                    <div className="text-white text-sm font-bold">Carry forward Leave Balances</div>
                                    <div className="text-[#8899AA] text-xs mt-0.5">Transfer 14 days of AL to new entity.</div>
                                </div>
                            </label>

                            <label className="flex items-start gap-4 p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A] cursor-pointer hover:border-teal-500/50">
                                <input type="checkbox" className="mt-1 accent-teal-500 w-4 h-4" defaultChecked />
                                <div>
                                    <div className="text-white text-sm font-bold">Maintain Gratuity Continuity</div>
                                    <div className="text-[#8899AA] text-xs mt-0.5">Years of service (4.2 yrs) will be counted in target entity.</div>
                                </div>
                            </label>

                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3 mt-6">
                                <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                                <p className="text-[#AABBCC] text-xs leading-relaxed">
                                    A pseudo Full & Final (F&F) settlement will be generated in the source entity to settle pending salaries and tax liabilities up to the effective date. A new employee ID may be generated in the target entity depending on your global settings.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2">
                                Initiate Transfer <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
