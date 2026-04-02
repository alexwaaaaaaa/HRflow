"use client";
import React, { useState } from 'react';
import { Plane, UserCheck, Search, Building2, Calendar, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function InternationalTransferScreen() {
    const [step, setStep] = useState(1);
    const [emp, setEmp] = useState('');

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Plane size={24} className="text-sky-400" /> Cross-Border Employee Transfer</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Move an employee between international entities, handling tax, compliance, and payroll handover.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className={`bg-[#0A1420] border rounded-2xl p-6 transition-colors ${step >= 1 ? 'border-sky-500/50 shadow-[0_0_20px_rgba(56,189,248,0.1)]' : 'border-[#1A2A3A] opacity-50'}`}>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-sky-500 text-[#0A1420] flex items-center justify-center text-xs font-bold">1</div>
                            Select Employee for Relocation
                        </h3>

                        <div className="relative mb-6">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search by Name or EMP ID" value={emp} onChange={e => { setEmp(e.target.value); if (e.target.value.length > 2) setStep(2); else setStep(1); }}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-3 text-white focus:border-sky-500 outline-none transition-colors" />
                        </div>

                        {step >= 2 && (
                            <div className="p-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                                <div className="w-12 h-12 bg-[#060D1A] rounded-full flex items-center justify-center text-white font-bold border border-[#2A3A4A]">AK</div>
                                <div className="flex-1">
                                    <div className="text-white font-bold">Anita Kulkarni</div>
                                    <div className="text-sky-400 text-xs mt-0.5">Software Engineer • Engineering (EMP-089)</div>
                                </div>
                                <div className="text-right border-l border-[#2A3A4A] pl-4">
                                    <div className="text-[#8899AA] text-[10px] uppercase font-bold tracking-wider mb-1">Current Entity</div>
                                    <div className="text-white text-xs flex items-center gap-1 font-bold"><Building2 size={12} /> Acme India</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`bg-[#0A1420] border rounded-2xl p-6 transition-colors ${step >= 2 ? 'border-sky-500/50 shadow-[0_0_20px_rgba(56,189,248,0.1)]' : 'border-[#1A2A3A] opacity-50 pointer-events-none'}`}>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-sky-500 text-[#0A1420]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>2</div>
                            Destination Setup
                        </h3>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[#8899AA] font-bold text-xs mb-2">Target Entity</label>
                                <select className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-colors">
                                    <option value="">Select Destination Entity</option>
                                    <option value="us">Acme US Inc (USA)</option>
                                    <option value="sg">Acme APAC (Singapore)</option>
                                    <option value="ae">Acme Middle East (UAE)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[#8899AA] font-bold text-xs mb-2">Transfer Effective Date</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                                    <input type="date" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-3 text-white focus:border-sky-500 outline-none transition-colors [color-scheme:dark]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#1A2A3A]">
                            <button onClick={() => setStep(3)} className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-xl transition-colors ml-auto shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                                Continue to Compliance Checklist
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className={`bg-[#0A1420] border rounded-2xl p-6 transition-colors h-full ${step >= 3 ? 'border-sky-500/50 shadow-[0_0_20px_rgba(56,189,248,0.1)]' : 'border-[#1A2A3A] opacity-50 pointer-events-none'}`}>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-sky-500 text-[#0A1420]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>3</div>
                            Compliance & Handover
                        </h3>

                        <div className="space-y-4">
                            <label className="flex items-start gap-4 p-4 bg-[#131B2B] rounded-xl border border-[#2A3A4A] cursor-pointer hover:border-sky-500/50 group transition-colors">
                                <input type="checkbox" className="mt-1 accent-sky-500 w-4 h-4 cursor-pointer" />
                                <div>
                                    <div className="text-white text-sm font-bold group-hover:text-sky-400">Trigger Final Settlement (India)</div>
                                    <div className="text-[#556677] text-xs leading-relaxed mt-1">Queue FnF processing including leave encashment and statutory payouts in current entity.</div>
                                </div>
                            </label>
                            <label className="flex items-start gap-4 p-4 bg-[#131B2B] rounded-xl border border-[#2A3A4A] cursor-pointer hover:border-sky-500/50 group transition-colors">
                                <input type="checkbox" className="mt-1 accent-sky-500 w-4 h-4 cursor-pointer" />
                                <div>
                                    <div className="text-white text-sm font-bold group-hover:text-sky-400">Retain Global History</div>
                                    <div className="text-[#556677] text-xs leading-relaxed mt-1">Carry over original hire date, historical performance reviews, and global docs to new entity profile.</div>
                                </div>
                            </label>
                            <label className="flex items-start gap-4 p-4 bg-[#131B2B] rounded-xl border border-[#2A3A4A] cursor-pointer hover:border-sky-500/50 group transition-colors">
                                <input type="checkbox" className="mt-1 accent-sky-500 w-4 h-4 cursor-pointer" />
                                <div>
                                    <div className="text-white text-sm font-bold group-hover:text-sky-400">Immigration / Visa Sync</div>
                                    <div className="text-[#556677] text-xs leading-relaxed mt-1">Open a ticket with Global Mobility team to manage work visa processes.</div>
                                </div>
                            </label>
                        </div>

                        <div className="mt-8 pt-6 border-t border-[#1A2A3A]">
                            <button className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                                Execute Transfer <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
