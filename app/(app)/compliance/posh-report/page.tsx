"use client";

import React, { useState } from 'react';
import {
    Scale, CheckCircle, AlertTriangle, ArrowRight, Plus,
    Download, FileText, Users, Flag, Calendar, Shield, Eye
} from 'lucide-react';

export default function POSHAnnualReport() {
    const [fy, setFY] = useState('2023-24');
    const [step, setStep] = useState(0);

    const steps = ['Committee Setup', 'Case Log', 'Training Record', 'Report Generation'];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Compliance <ArrowRight size={10} /> Women Welfare <ArrowRight size={10} /> POSH
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <Scale size={28} className="text-purple-400" /> POSH Annual Report
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            Prevention of Sexual Harassment at Workplace Act, 2013 — Annual Report preparation and submission.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <select value={fy} onChange={e => setFY(e.target.value)}
                            className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-300 outline-none">
                            <option>2023-24</option>
                            <option>2022-23</option>
                            <option>2021-22</option>
                        </select>
                        <button className="px-6 py-2.5 bg-purple-600 rounded-xl text-sm font-black text-white hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center gap-2">
                            <Download size={16} /> Download Annual Report
                        </button>
                    </div>
                </div>

                {/* WARNING Banner */}
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
                    <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                        <div className="text-sm font-black text-amber-400">Annual Report Due: 31 January {Number(fy.split('-')[0]) + 1}</div>
                        <div className="text-[10px] text-slate-400 mt-1">The POSH Annual Report must be submitted to the District Officer. Non-compliance attracts a fine of ₹50,000 (first offence) and ₹1,00,000 (repeat offence) with cancellation of business license.</div>
                    </div>
                </div>

                {/* Completion Steps */}
                <div className="flex gap-3 flex-wrap">
                    {steps.map((s, i) => (
                        <button key={i} onClick={() => setStep(i)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                                ${step === i ? 'bg-purple-600 text-white' : i < step ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500' : 'bg-[#0D1928] border border-[#1A2A3A] text-slate-500'}`}>
                            {i < step ? <CheckCircle size={12} /> : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">{i + 1}</span>}
                            {s}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Stats */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* ICC Committee */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl">
                            <h2 className="text-xs font-black text-white uppercase tracking-widest mb-4 border-b border-[#1A2A3A] pb-3 flex items-center gap-2">
                                <Users size={14} className="text-purple-400" /> Internal Complaints Committee (ICC)
                            </h2>
                            <div className="space-y-3">
                                {[
                                    { name: 'Deepa Krishnamurthy', role: 'Presiding Officer', dept: 'HR Head', status: 'Active', external: false },
                                    { name: 'Sunita Patel', role: 'Member', dept: 'Legal', status: 'Active', external: false },
                                    { name: 'Anita Desai', role: 'Member', dept: 'Operations', status: 'Active', external: false },
                                    { name: 'Dr. Meera Verma', role: 'External Member', dept: 'NGO — Sakhi', status: 'Active', external: true },
                                ].map((m, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black
                                                ${m.external ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' : 'bg-[#1A2A3A] text-slate-400'}`}>
                                                {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </div>
                                            <div>
                                                <div className="text-xs font-black text-white">{m.name}</div>
                                                <div className="text-[10px] text-slate-500">{m.role} • {m.dept}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {m.external && <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">External</span>}
                                            <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">{m.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Case Log */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl">
                            <h2 className="text-xs font-black text-white uppercase tracking-widest mb-4 border-b border-[#1A2A3A] pb-3 flex items-center justify-between">
                                <span className="flex items-center gap-2"><Flag size={14} className="text-amber-400" /> Complaint Log — FY {fy}</span>
                                <button className="text-[10px] font-black text-purple-400 hover:text-purple-300 flex items-center gap-1">
                                    <Plus size={10} /> Add Case
                                </button>
                            </h2>
                            <div className="space-y-1 mb-4">
                                {[
                                    { label: 'Complaints Received', val: '0' },
                                    { label: 'Complaints Disposed', val: '0' },
                                    { label: 'Pending at Year End', val: '0' },
                                    { label: 'Workshops Conducted', val: '02' },
                                ].map((r, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-[#1A2A3A]/50 last:border-0">
                                        <span className="text-[10px] font-bold text-slate-400">{r.label}</span>
                                        <span className="text-xs font-black text-white">{r.val}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                <div className="flex items-center gap-2 text-xs font-black text-emerald-400">
                                    <CheckCircle size={14} /> Zero Complaints — Excellent track record for FY {fy}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-5">
                        {/* Compliance Score */}
                        <div className="bg-gradient-to-br from-purple-900/30 to-[#0D1928] border border-purple-500/20 rounded-2xl p-5 shadow-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-4">POSH Compliance Score</h3>
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full border-4 border-purple-500/30 flex items-center justify-center mb-3" style={{ background: 'conic-gradient(#9333ea 0deg 324deg, #1A2A3A 324deg)' }}>
                                    <div className="w-16 h-16 rounded-full bg-[#060B14] flex items-center justify-center">
                                        <span className="text-xl font-black text-purple-400">90%</span>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Overall POSH Compliance</div>
                            </div>
                            <div className="space-y-2 mt-4">
                                {[
                                    { item: 'ICC Constituted', ok: true },
                                    { item: 'Annual Training Done', ok: true },
                                    { item: 'Policy Displayed', ok: true },
                                    { item: 'Report Filed (Prev. Yr)', ok: false },
                                ].map((c, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[10px]">
                                        {c.ok ? <CheckCircle size={11} className="text-emerald-500" /> : <AlertTriangle size={11} className="text-amber-400" />}
                                        <span className={c.ok ? 'text-slate-400' : 'text-amber-400'}>{c.item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Training Log */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-white mb-4 flex items-center justify-between">
                                Training Sessions <Plus size={11} className="text-purple-400 cursor-pointer" />
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { title: 'POSH Awareness Workshop', date: '15 Jul 2023', attendees: 210 },
                                    { title: 'ICC Member Training', date: '20 Sep 2023', attendees: 4 },
                                ].map((t, i) => (
                                    <div key={i} className="p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl">
                                        <div className="text-[10px] font-black text-white">{t.title}</div>
                                        <div className="flex justify-between mt-1">
                                            <span className="text-[9px] text-slate-500">{t.date}</span>
                                            <span className="text-[9px] font-bold text-purple-400">{t.attendees} attendees</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Download */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 shadow-xl space-y-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white mb-3">Downloads</div>
                            {['POSH Annual Report (PDF)', 'ICC Constitution Order', 'POSH Policy Document'].map((d, i) => (
                                <button key={i} className="w-full flex items-center justify-between p-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-bold text-slate-400 hover:text-white transition-colors">
                                    <span className="flex items-center gap-2"><FileText size={11} /> {d}</span>
                                    <Download size={11} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
