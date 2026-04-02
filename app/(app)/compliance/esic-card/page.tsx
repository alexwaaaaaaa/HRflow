"use client";

import React, { useState } from 'react';
import {
    CreditCard, Download, CheckCircle, Clock, AlertTriangle,
    ArrowRight, Search, Filter, Eye, Printer, RefreshCw, Shield
} from 'lucide-react';

const employees = [
    { name: 'Rahul Kumar Sharma', emp: 'EMP-001', ipNum: '3112345678901', dispensary: 'ESI Dispensary, Airoli', validTill: 'Mar 2025', status: 'Active', nominee: 'Sunita Sharma (Wife)', family: 3 },
    { name: 'Priya Mehta', emp: 'EMP-002', ipNum: '3112345678902', dispensary: 'ESI Dispensary, Bandra', validTill: 'Mar 2025', status: 'Active', nominee: 'Ramesh Mehta (Father)', family: 2 },
    { name: 'Anil Gupta', emp: 'EMP-045', ipNum: '3112345678903', dispensary: 'ESI Dispensary, Kurla', validTill: 'Mar 2025', status: 'Card Not Generated', nominee: 'N/A', family: 0 },
    { name: 'Sunita Patel', emp: 'EMP-067', ipNum: '3112345678904', dispensary: 'ESI Dispensary, Andheri', validTill: 'Mar 2025', status: 'Active', nominee: 'Raj Patel (Husband)', family: 4 },
    { name: 'Vikram Singh', emp: 'EMP-099', ipNum: '3112345678905', dispensary: 'ESI Dispensary, Airoli', validTill: 'Expired', status: 'Renewal Due', nominee: 'Meena Singh (Wife)', family: 3 },
];

export default function ESICCard() {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<number[]>([]);

    const toggle = (i: number) => setSelected(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
    const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Compliance <ArrowRight size={10} /> ESIC <ArrowRight size={10} /> ESIC Card
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <CreditCard size={28} className="text-teal-400" /> ESIC Card Management
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            Generate, download, and track ESIC Pehchan Cards for insured persons (IPs) and their families.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2">
                            <RefreshCw size={14} /> Sync with ESIC
                        </button>
                        <button disabled={selected.length === 0}
                            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2
                                ${selected.length > 0 ? 'bg-teal-500 text-black hover:bg-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.3)]' : 'bg-[#1A2A3A] text-slate-600 cursor-not-allowed'}`}>
                            <Printer size={16} /> Print Cards ({selected.length})
                        </button>
                    </div>
                </div>

                {/* KPI Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Active Cards', val: '138', color: 'teal', icon: CreditCard },
                        { label: 'Not Generated', val: '04', color: 'amber', icon: Clock },
                        { label: 'Renewal Due', val: '02', color: 'rose', icon: AlertTriangle },
                        { label: 'Family Members', val: '312', color: 'blue', icon: Shield },
                    ].map((k, i) => (
                        <div key={i} className={`bg-[#0D1928] border border-${k.color}-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-${k.color}-500/40 transition-all`}>
                            <k.icon size={16} className={`text-${k.color}-500 mb-2`} />
                            <div className={`text-2xl font-black text-${k.color}-400 tabular-nums`}>{k.val}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{k.label}</div>
                            <div className={`absolute -bottom-4 -right-4 w-14 h-14 bg-${k.color}-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform`} />
                        </div>
                    ))}
                </div>

                {/* Sample ESIC Card Preview */}
                <div className="bg-gradient-to-br from-teal-900/40 to-[#0D1928] border border-teal-500/20 rounded-2xl p-6 shadow-2xl">
                    <h2 className="text-xs font-black text-teal-400 uppercase tracking-[0.2em] mb-4">ESIC Pehchan Card Preview</h2>
                    <div className="bg-gradient-to-r from-teal-800/30 to-slate-900/70 border border-teal-500/30 rounded-2xl p-5 flex justify-between items-center max-w-xl">
                        <div>
                            <div className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-1">Employees' State Insurance Corporation of India</div>
                            <div className="text-lg font-black text-white">Rahul Kumar Sharma</div>
                            <div className="text-[10px] text-slate-400 mt-1">IP No: <span className="font-mono text-teal-300">3112345678901</span></div>
                            <div className="text-[10px] text-slate-400">Dispensary: ESI Dispensary, Airoli</div>
                            <div className="text-[10px] text-slate-400">Family Members: 3 | Valid: Mar 2025</div>
                        </div>
                        <div className="text-right">
                            <div className="w-16 h-16 bg-teal-500/20 rounded-xl flex items-center justify-center border border-teal-500/30">
                                <Shield size={28} className="text-teal-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-4 bg-[#060B14]/60 border-b border-[#1A2A3A] flex justify-between items-center gap-4 flex-wrap">
                        <h2 className="text-xs font-black text-white uppercase tracking-widest">Employee ESIC Cards</h2>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input value={search} onChange={e => setSearch(e.target.value)}
                                    className="pl-7 pr-3 py-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-xs text-white outline-none focus:border-teal-500 w-40" placeholder="Search..." />
                            </div>
                            <button className="p-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-slate-400 hover:text-white">
                                <Filter size={13} />
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-4 py-3 w-8"></th>
                                <th className="px-4 py-3">Employee</th>
                                <th className="px-4 py-3">IP Number</th>
                                <th className="px-4 py-3">Dispensary</th>
                                <th className="px-4 py-3">Family</th>
                                <th className="px-4 py-3">Valid Till</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {filtered.map((e, i) => {
                                const isSelected = selected.includes(i);
                                return (
                                    <tr key={i} onClick={() => toggle(i)}
                                        className={`transition-all cursor-pointer ${isSelected ? 'bg-teal-500/10' : 'hover:bg-[#1A2A3A]/30'}`}>
                                        <td className="px-4 py-3">
                                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all
                                                ${isSelected ? 'bg-teal-500 border-teal-500' : 'border-slate-600'}`}>
                                                {isSelected && <CheckCircle size={10} className="text-black" />}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-xs font-bold text-white">{e.name}</div>
                                            <div className="text-[10px] text-slate-500">{e.emp}</div>
                                        </td>
                                        <td className="px-4 py-3 text-xs font-mono text-slate-300">{e.ipNum}</td>
                                        <td className="px-4 py-3 text-[10px] text-slate-400 max-w-[140px] truncate">{e.dispensary}</td>
                                        <td className="px-4 py-3 text-xs font-black text-slate-300">{e.family || '—'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-bold ${e.validTill === 'Expired' ? 'text-rose-400' : 'text-slate-300'}`}>{e.validTill}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border
                                                ${e.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                    e.status === 'Renewal Due' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                                        'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex gap-2 justify-center">
                                                <button onClick={ev => ev.stopPropagation()} className="p-1.5 hover:text-teal-400 text-slate-500 transition-colors">
                                                    <Eye size={14} />
                                                </button>
                                                <button onClick={ev => ev.stopPropagation()} className="p-1.5 hover:text-teal-400 text-slate-500 transition-colors">
                                                    <Download size={14} />
                                                </button>
                                                <button onClick={ev => ev.stopPropagation()} className="p-1.5 hover:text-teal-400 text-slate-500 transition-colors">
                                                    <Printer size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
