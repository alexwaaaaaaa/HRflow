"use client";

import React, { useState } from 'react';
import {
    Zap, CheckCircle, Clock, AlertTriangle, Mail, Phone,
    ArrowRight, UserCheck, ShieldCheck, RefreshCw, Search, Filter
} from 'lucide-react';

const employees = [
    { name: 'Rohan Singh', emp: 'EMP-288', uan: '100912345678', mobile: '9876543210', email: 'rohan@co.in', kraStatus: 'Verified', uanStatus: 'Active' },
    { name: 'Kavita Joshi', emp: 'EMP-291', uan: '100912345679', mobile: '9823456789', email: 'kavita@co.in', kraStatus: 'Pending', uanStatus: 'Inactive' },
    { name: 'Malik Sayyed', emp: 'EMP-305', uan: '100912345680', mobile: '9712345600', email: 'malik@co.in', kraStatus: 'Verified', uanStatus: 'Inactive' },
    { name: 'Shreya Nair', emp: 'EMP-311', uan: 'Not Allotted', mobile: '9654321870', email: 'shreya@co.in', kraStatus: 'Not Started', uanStatus: 'Not Allotted' },
    { name: 'Ankit Verma', emp: 'EMP-320', uan: '100912345682', mobile: '9543210980', email: 'ankit@co.in', kraStatus: 'Verified', uanStatus: 'Active' },
];

export default function UANActivation() {
    const [selected, setSelected] = useState<number[]>([]);
    const [search, setSearch] = useState('');

    const toggle = (i: number) => setSelected(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
    const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.emp.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Compliance <ArrowRight size={10} /> EPFO <ArrowRight size={10} /> UAN Activation
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <Zap size={28} className="text-amber-400" /> UAN Activation
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            Activate UANs for new employees and send OTP-based self-service link to their mobile.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2">
                            <RefreshCw size={14} /> Sync EPFO Status
                        </button>
                        <button disabled={selected.length === 0}
                            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2
                                ${selected.length > 0 ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-[#1A2A3A] text-slate-600 cursor-not-allowed'}`}>
                            <Zap size={16} /> Send Activation Link ({selected.length})
                        </button>
                    </div>
                </div>

                {/* KPI Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Active UANs', val: '2', color: 'emerald', icon: CheckCircle },
                        { label: 'Inactive UANs', val: '2', color: 'amber', icon: Clock },
                        { label: 'Not Allotted', val: '1', color: 'rose', icon: AlertTriangle },
                        { label: 'KYC Pending', val: '01', color: 'blue', icon: ShieldCheck },
                    ].map((k, i) => (
                        <div key={i} className={`bg-[#0D1928] border border-${k.color}-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-${k.color}-500/40 transition-all`}>
                            <k.icon size={16} className={`text-${k.color}-500 mb-2`} />
                            <div className={`text-2xl font-black text-${k.color}-400 tabular-nums`}>{k.val}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{k.label}</div>
                            <div className={`absolute -bottom-4 -right-4 w-14 h-14 bg-${k.color}-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform`} />
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-4 bg-[#060B14]/60 border-b border-[#1A2A3A] flex justify-between items-center gap-4 flex-wrap">
                        <h2 className="text-xs font-black text-white uppercase tracking-widest">Employee UAN Status</h2>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input value={search} onChange={e => setSearch(e.target.value)}
                                    className="pl-7 pr-3 py-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-xs text-white outline-none focus:border-amber-500 w-40" placeholder="Name / EmpID..." />
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
                                <th className="px-4 py-3">UAN Number</th>
                                <th className="px-4 py-3">Mobile / Email</th>
                                <th className="px-4 py-3">KYC</th>
                                <th className="px-4 py-3">UAN Status</th>
                                <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {filtered.map((e, i) => {
                                const canActivate = e.uanStatus === 'Inactive';
                                const isSelected = selected.includes(i);
                                return (
                                    <tr key={i} className={`transition-all cursor-pointer
                                        ${isSelected ? 'bg-amber-500/10' : 'hover:bg-[#1A2A3A]/30'}`}
                                        onClick={() => canActivate && toggle(i)}>
                                        <td className="px-4 py-3">
                                            {canActivate && (
                                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all
                                                    ${isSelected ? 'bg-amber-500 border-amber-500' : 'border-slate-600'}`}>
                                                    {isSelected && <CheckCircle size={10} className="text-black" />}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-xs font-bold text-white">{e.name}</div>
                                            <div className="text-[10px] text-slate-500 font-bold">{e.emp}</div>
                                        </td>
                                        <td className="px-4 py-3 text-xs font-mono text-slate-300">{e.uan}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                                <Phone size={10} className="text-slate-600" /> {e.mobile}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                                                <Mail size={10} className="text-slate-600" /> {e.email}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border
                                                ${e.kraStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                    e.kraStatus === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                        'bg-slate-800 text-slate-500 border-slate-700'}`}>
                                                {e.kraStatus}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border
                                                ${e.uanStatus === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                    e.uanStatus === 'Inactive' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                        'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                                                {e.uanStatus}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {canActivate ? (
                                                <button onClick={(ev) => { ev.stopPropagation(); toggle(i); }}
                                                    className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[9px] font-black text-amber-400 uppercase tracking-widest hover:bg-amber-500/20 transition-colors">
                                                    Activate
                                                </button>
                                            ) : e.uanStatus === 'Active' ? (
                                                <UserCheck size={16} className="text-emerald-500 mx-auto" />
                                            ) : (
                                                <span className="text-[9px] text-slate-600 font-bold">Generate UAN First</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="p-3 bg-[#060B14]/60 border-t border-[#1A2A3A] text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                        {selected.length} employee(s) selected for bulk activation
                    </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-3">
                    <Zap size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                        UAN activation requires employee's mobile number linked with Aadhaar. Post-activation, employees can self-service on the EPFO Member Portal (passbook, claims, KYC update).
                    </p>
                </div>

            </div>
        </div>
    );
}
