"use client";

import React, { useState } from 'react';
import {
    Baby, CheckCircle, Clock, AlertTriangle, ArrowRight,
    Plus, Download, FileText, Calendar, Heart, Shield, Search
} from 'lucide-react';

type Stage = 'Pre-Birth Leave' | 'Post-Birth Leave' | 'Medical Bonus' | 'Returning';

const employees: { name: string; emp: string; dueDate: string; stage: Stage; daysUsed: number; daysAllotted: number; medBonus: string; status: 'Active' | 'Upcoming' | 'Closed' }[] = [
    { name: 'Ananya Sharma', emp: 'EMP-112', dueDate: '15 Apr 2024', stage: 'Pre-Birth Leave', daysUsed: 42, daysAllotted: 182, medBonus: '₹3,500', status: 'Active' },
    { name: 'Kavita Joshi', emp: 'EMP-234', dueDate: '28 May 2024', stage: 'Pre-Birth Leave', daysUsed: 0, daysAllotted: 182, medBonus: '₹3,500', status: 'Upcoming' },
    { name: 'Rekha Nair', emp: 'EMP-089', dueDate: '01 Jan 2024', stage: 'Returning', daysUsed: 182, daysAllotted: 182, medBonus: '₹3,500', status: 'Closed' },
];

const colorMap: Record<Stage, string> = {
    'Pre-Birth Leave': 'pink',
    'Post-Birth Leave': 'rose',
    'Medical Bonus': 'amber',
    'Returning': 'emerald'
};

export default function MaternityBenefit() {
    const [selected, setSelected] = useState<number | null>(null);
    const [search, setSearch] = useState('');

    const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Compliance <ArrowRight size={10} /> Women Welfare <ArrowRight size={10} /> Maternity Benefit
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <Baby size={28} className="text-pink-400" /> Maternity Benefit Act, 1961
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            Track maternity leave (182 days), medical bonus (₹3,500), nursing breaks, and crèche facilities compliance.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2.5 bg-pink-600 rounded-xl text-sm font-black text-white hover:bg-pink-700 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] flex items-center gap-2">
                            <Plus size={16} /> Initiate Maternity Leave
                        </button>
                    </div>
                </div>

                {/* Statutory Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'On Maternity Leave', val: '02', color: 'pink', icon: Baby },
                        { label: 'Upcoming (30 days)', val: '01', color: 'amber', icon: Calendar },
                        { label: 'Medical Bonus Pending', val: '₹7,000', color: 'emerald', icon: Heart },
                        { label: 'Compliance Status', val: '100%', color: 'teal', icon: Shield },
                    ].map((k, i) => (
                        <div key={i} className={`bg-[#0D1928] border border-${k.color}-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-${k.color}-500/40 transition-all`}>
                            <k.icon size={16} className={`text-${k.color}-500 mb-2`} />
                            <div className={`text-2xl font-black text-${k.color}-400 tabular-nums`}>{k.val}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{k.label}</div>
                            <div className={`absolute -bottom-4 -right-4 w-14 h-14 bg-${k.color}-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform`} />
                        </div>
                    ))}
                </div>

                {/* Statutory Rights Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: 'Paid Leave', desc: '26 weeks (1st 2 children) / 12 weeks (3rd child). Fully paid at average wages.', color: 'pink', icon: Baby },
                        { title: 'Medical Bonus', desc: '₹3,500 if no pre/post-natal care provided by employer. Payable within 48 hours of delivery.', color: 'amber', icon: Heart },
                        { title: 'Crèche Facility', desc: 'Mandatory for establishments with 50+ workers. 4 nursing breaks per day. Non-compliance = ₹5,000 fine.', color: 'teal', icon: Shield },
                    ].map((r, i) => (
                        <div key={i} className={`bg-[#0D1928] border border-${r.color}-500/20 p-5 rounded-2xl`}>
                            <div className="flex items-center gap-2 mb-2">
                                <r.icon size={14} className={`text-${r.color}-400`} />
                                <h3 className={`text-xs font-black text-${r.color}-400 uppercase tracking-widest`}>{r.title}</h3>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-relaxed">{r.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Employee List */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-4 bg-[#060B14]/60 border-b border-[#1A2A3A] flex justify-between items-center gap-4 flex-wrap">
                        <h2 className="text-xs font-black text-white uppercase tracking-widest">Maternity Cases</h2>
                        <div className="relative">
                            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input value={search} onChange={e => setSearch(e.target.value)}
                                className="pl-7 pr-3 py-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-xs text-white outline-none focus:border-pink-500 w-40" placeholder="Search..." />
                        </div>
                    </div>
                    <div className="divide-y divide-[#1A2A3A]">
                        {filtered.map((e, i) => {
                            const pct = Math.round((e.daysUsed / e.daysAllotted) * 100);
                            const color = colorMap[e.stage];
                            return (
                                <div key={i} onClick={() => setSelected(selected === i ? null : i)}
                                    className={`p-5 cursor-pointer transition-all ${selected === i ? 'bg-pink-500/5' : 'hover:bg-[#1A2A3A]/30'}`}>
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400 text-xs font-black">
                                                    {e.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-black text-white">{e.name}</div>
                                                    <div className="text-[10px] text-slate-500">{e.emp} • Due: {e.dueDate}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                                <span>{e.stage}</span>
                                                <span>{e.daysUsed}/{e.daysAllotted} days ({pct}%)</span>
                                            </div>
                                            <div className="h-1.5 bg-[#060B14] rounded-full overflow-hidden border border-[#1A2A3A]">
                                                <div className="h-full bg-pink-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black text-amber-400">{e.medBonus}</span>
                                            <span className={`text-[9px] font-black px-2 py-1 rounded-full border
                                                ${e.status === 'Active' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                                                    e.status === 'Upcoming' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                                                {e.status}
                                            </span>
                                            <button className="p-1.5 hover:text-pink-400 text-slate-500 transition-colors">
                                                <Download size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Compliance Checklist */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl">
                    <h2 className="text-xs font-black text-white uppercase tracking-widest mb-4">Maternity Act Compliance Checklist</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { check: 'Maternity Register maintained (Form A)', ok: true },
                            { check: 'Muster roll displayed on notice board', ok: true },
                            { check: 'Crèche facility available (if >50 employees)', ok: true },
                            { check: 'Medical bonus payable within 48 hrs of delivery', ok: false },
                            { check: 'No dismissal during maternity period', ok: true },
                            { check: 'Annual return submitted (Form 11)', ok: true },
                        ].map((c, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${c.ok ? 'border-emerald-500/10 bg-emerald-500/5' : 'border-amber-500/20 bg-amber-500/5'}`}>
                                {c.ok ? <CheckCircle size={14} className="text-emerald-500 shrink-0" /> : <AlertTriangle size={14} className="text-amber-400 shrink-0" />}
                                <span className="text-[10px] font-bold text-slate-300">{c.check}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
