"use client";

import React from 'react';
import {
    FileCheck, Download, Mail, ArrowLeft,
    Printer, Save, Info, ShieldCheck, CheckCircle, Clock
} from 'lucide-react';

export default function RelievingLetter() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">Relieving Letter</h1>
                            <p className="text-slate-400 text-sm font-medium">Generate formal relieving documents upon successful handover.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">

                    {/* Left: Validation & Issuance */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-8 shadow-2xl relative overflow-hidden group">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-[#1A2A3A] pb-4">Issuance Readiness</h3>

                            <div className="space-y-4">
                                {[
                                    { label: 'Asset Clearance', status: 'Verified', icon: ShieldCheck, color: 'text-emerald-500' },
                                    { label: 'Notice Period', status: 'Completed', icon: Clock, color: 'text-blue-500' },
                                    { label: 'Finance Dues', status: 'Settled', icon: FileCheck, color: 'text-emerald-500' },
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl group/item">
                                        <div className="flex items-center gap-3">
                                            <step.icon size={18} className={step.color} />
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{step.label}</span>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${step.color}`}>{step.status}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-[#1A2A3A]">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none block">Email Recipient</label>
                                <div className="p-3.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-xs font-bold text-slate-300 flex items-center gap-3">
                                    <Mail size={16} className="text-blue-500" /> arnab.das@personal.com
                                </div>
                                <button className="w-full py-4 bg-[#0066FF] rounded-xl text-white font-black text-sm hover:translate-y-[-2px] transition-all shadow-xl flex items-center justify-center gap-2">
                                    <Mail size={18} /> Issue & Send Email
                                </button>
                            </div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* Right: Document Preview */}
                    <div className="lg:col-span-4 bg-white rounded-3xl p-12 shadow-2xl text-[#1e293b] font-serif relative">
                        <div className="flex justify-between items-start border-b border-[#1e293b]/10 pb-6 mb-10">
                            <div className="space-y-1">
                                <div className="text-lg font-black tracking-tight font-sans">HRFlow Solutions</div>
                                <div className="text-[9px] text-[#64748b] uppercase tracking-[0.25em] font-sans font-bold">Relieving Certificate</div>
                            </div>
                            <div className="text-right text-[10px] font-bold font-sans text-[#64748b]">HF/REL/771/2024</div>
                        </div>

                        <div className="space-y-8 leading-relaxed text-sm">
                            <div className="text-right font-sans font-bold mb-8">April 24, 2024</div>

                            <div className="space-y-1 mb-10">
                                <div className="font-sans font-black text-xs uppercase text-[#64748b]">To,</div>
                                <div className="font-sans font-black text-base">Arnab Das</div>
                                <div className="font-sans text-xs text-[#64748b]">Emp ID: EMP-771</div>
                            </div>

                            <p className="italic underline underline-offset-4 decoration-[#1e293b]/10 mb-8 font-sans font-black text-center text-xs uppercase tracking-widest">Relieving Letter</p>

                            <p>
                                Dear Arnab,
                            </p>

                            <p>
                                With reference to your resignation dated March 12, 2024, we would like to inform you that you are
                                relieved from the services of <b>HRFlow Solutions Pvt. Ltd.</b> effective at the close of
                                business hours on <b>April 24, 2024</b>.
                            </p>

                            <p>
                                We confirm that you have completed all handover processes and returned all company-owned assets.
                                Your Full and Final settlement has been processed and disbursed as of today.
                            </p>

                            <p>
                                We appreciate your time spent with the company and thank you for your contributions.
                                We wish you success in your future endeavors.
                            </p>

                            <div className="pt-20 space-y-6">
                                <div className="space-y-1">
                                    <div className="font-sans font-black uppercase text-[10px] tracking-widest text-[#64748b]">For HRFlow Solutions Pvt. Ltd.</div>
                                    <div className="text-xs font-bold font-sans pt-8">Human Resources Manager</div>
                                </div>
                                <div className="flex gap-4 opacity-20 hover:opacity-100 transition-opacity">
                                    <Download size={16} />
                                    <Printer size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
