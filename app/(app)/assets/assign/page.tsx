"use client";
import React, { useState } from 'react';
import { Share, UserCheck, Monitor, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AssetAssignmentScreen() {
    const [step, setStep] = useState(1);
    const [emp, setEmp] = useState('');
    const [asset, setAsset] = useState('');

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Share size={24} className="text-cyan-400" /> Assign Asset to Employee</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Check out hardware from IT inventory to an employee.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className={`bg-[#0A1420] border rounded-2xl p-6 transition-colors ${step >= 1 ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-[#1A2A3A] opacity-50'}`}>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-cyan-500 text-[#0A1420] flex items-center justify-center text-xs font-bold">1</div>
                            Select Employee
                        </h3>

                        <div className="relative mb-6">
                            <UserCheck size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search Name or EMP ID" value={emp} onChange={e => { setEmp(e.target.value); if (e.target.value.length > 2) setStep(2); else setStep(1); }}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" />
                        </div>

                        {step >= 2 && (
                            <div className="p-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                                <div className="w-12 h-12 bg-[#060D1A] rounded-full flex items-center justify-center text-white font-bold border border-[#2A3A4A]">AK</div>
                                <div>
                                    <div className="text-white font-bold">Anita Kulkarni</div>
                                    <div className="text-cyan-400 text-xs">EMP-089 • Senior Product Designer</div>
                                    <div className="text-[#556677] text-[10px] mt-0.5">Currently assigned: 0 assets</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`bg-[#0A1420] border rounded-2xl p-6 transition-colors ${step >= 2 ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-[#1A2A3A] opacity-50 pointer-events-none'}`}>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-cyan-500 text-[#0A1420]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>2</div>
                            Scan or Select Asset
                        </h3>

                        <div className="relative mb-6">
                            <Monitor size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Scan Barcode / Enter S/N" value={asset} onChange={e => { setAsset(e.target.value); if (e.target.value.length > 3) setStep(3); }}
                                className={`w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-3 text-white outline-none transition-colors ${step >= 2 ? 'focus:border-cyan-500' : ''}`} />
                        </div>

                        {step >= 3 && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl relative">
                                    <CheckCircle2 size={24} className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                                    <div className="text-white font-bold">MacBook Pro 16" M3 Max</div>
                                    <div className="text-[#AABBCC] text-sm mt-1">S/N: DL-MBP-901X</div>
                                    <div className="text-[#556677] text-xs mt-2 font-mono">Status: IN STOCK • Condition: BRAND NEW</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className={`bg-[#0A1420] border rounded-2xl p-6 transition-colors ${step >= 3 ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-[#1A2A3A] opacity-50 pointer-events-none'}`}>
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-cyan-500 text-[#0A1420]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>3</div>
                            Handover Policy & Sign-off
                        </h3>

                        <div className="space-y-4 text-sm text-[#AABBCC] leading-relaxed mb-6">
                            <p>By assigning this asset, an automated email will be sent to the employee with the <strong>IT Asset Policy Agreement</strong>.</p>
                            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
                                <ShieldAlert size={16} className="text-amber-400 mt-0.5 shrink-0" />
                                <span className="text-amber-200/80 text-xs">The employee must digitally sign the agreement within 48 hours to complete the checkout process officially.</span>
                            </div>
                        </div>

                        <div className="space-y-4 pb-6">
                            <label className="block text-[#8899AA] font-bold text-xs mb-2">Checkout Notes / Accessories (Optional)</label>
                            <textarea rows={2} placeholder="e.g. Include 1x USB-C Charger, 1x Magic Mouse" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors resize-none"></textarea>
                        </div>

                        <button className={`w-full font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg ${step >= 3 ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-[#131B2B] text-[#556677]'}`}>
                            Complete Assignment <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
