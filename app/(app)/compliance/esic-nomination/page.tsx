"use client";

import React, { useState } from 'react';
import {
    Users, Plus, CheckCircle, AlertTriangle, ArrowRight,
    Search, Save, Trash2, Edit2, Heart, UserPlus, Download
} from 'lucide-react';

const employees = [
    {
        name: 'Rahul Kumar Sharma', emp: 'EMP-001', ipNum: '3112345678901',
        nominees: [
            { name: 'Sunita Sharma', relation: 'Spouse', dob: '15/06/1990', share: '60%', aadhaar: '****5678' },
            { name: 'Rohan Sharma', relation: 'Son', dob: '10/03/2015', share: '40%', aadhaar: '****1234' },
        ]
    },
    {
        name: 'Priya Mehta', emp: 'EMP-002', ipNum: '3112345678902',
        nominees: [
            { name: 'Ramesh Mehta', relation: 'Father', dob: '01/01/1958', share: '100%', aadhaar: '****9012' },
        ]
    },
];

export default function ESICNomination() {
    const [selected, setSelected] = useState(0);
    const [editMode, setEditMode] = useState(false);

    const emp = employees[selected];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Compliance <ArrowRight size={10} /> ESIC <ArrowRight size={10} /> Nomination
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <Heart size={28} className="text-rose-400" /> ESIC Nomination
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            Manage nominee details for ESIC benefits (Form 1). Submit to ESIC portal for approval.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {editMode && (
                            <button onClick={() => setEditMode(false)}
                                className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all">
                                Cancel
                            </button>
                        )}
                        <button onClick={() => setEditMode(e => !e)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2
                                ${editMode ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-rose-600 text-white hover:bg-rose-700'}`}>
                            {editMode ? <><Save size={16} /> Save Nominations</> : <><Edit2 size={16} /> Edit Nominations</>}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar: Employee List */}
                    <div className="lg:col-span-1 space-y-3">
                        <div className="relative">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input className="w-full pl-8 pr-4 py-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-xs text-white outline-none focus:border-rose-500 placeholder-slate-600" placeholder="Search employee..." />
                        </div>
                        {employees.map((e, i) => (
                            <button key={i} onClick={() => setSelected(i)} className={`w-full text-left p-4 rounded-2xl border transition-all
                                ${selected === i ? 'bg-rose-500/10 border-rose-500/30' : 'bg-[#0D1928] border-[#1A2A3A] hover:border-slate-600'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black
                                        ${selected === i ? 'bg-rose-500/20 text-rose-400' : 'bg-[#1A2A3A] text-slate-400'}`}>
                                        {e.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div>
                                        <div className="text-xs font-black text-white">{e.name}</div>
                                        <div className="text-[10px] text-slate-500">{e.emp} | IP: {e.ipNum.slice(-6)}</div>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1 mt-2 text-[10px] font-bold
                                    ${e.nominees.length > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    <CheckCircle size={10} />
                                    {e.nominees.length > 0 ? `${e.nominees.length} nominee(s) declared` : 'Nomination pending'}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Nominees Panel */}
                    <div className="lg:col-span-2 space-y-5">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl">
                            <div className="flex justify-between items-center mb-4 border-b border-[#1A2A3A] pb-4">
                                <div>
                                    <h2 className="text-sm font-black text-white">{emp.name}</h2>
                                    <div className="text-[10px] text-slate-500 mt-0.5">{emp.emp} | IP No: {emp.ipNum}</div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold">
                                    <Users size={12} className="text-slate-400" />
                                    <span className="text-slate-300">{emp.nominees.length} nominees</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {emp.nominees.map((n, i) => (
                                    <div key={i} className={`p-4 border rounded-xl transition-all ${editMode ? 'border-rose-500/20 bg-rose-500/5' : 'border-[#1A2A3A] bg-[#060B14]'}`}>
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-400 text-xs font-black">
                                                    {n.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-black text-white">{n.name}</div>
                                                    <div className="text-[10px] text-slate-500 mt-0.5">{n.relation} • DOB: {n.dob} • Aadhaar: {n.aadhaar}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black px-2 py-1 rounded-lg">{n.share}</div>
                                                {editMode && (
                                                    <>
                                                        <button className="p-1.5 text-slate-500 hover:text-white transition-colors"><Edit2 size={13} /></button>
                                                        <button className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"><Trash2 size={13} /></button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {editMode && (
                                    <button className="w-full p-4 border-2 border-dashed border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-rose-500/30 hover:text-rose-400 transition-all flex items-center justify-center gap-2">
                                        <Plus size={14} /> Add Nominee
                                    </button>
                                )}
                            </div>

                            {/* Share Validation */}
                            <div className="mt-4 p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex justify-between items-center">
                                <div className="flex gap-3">
                                    <div className="w-24 h-2 bg-[#0D1928] rounded-full overflow-hidden border border-[#1A2A3A]">
                                        <div className="h-full bg-rose-500 rounded-full" style={{ width: '100%' }} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400">Share Distribution: 100%</span>
                                </div>
                                <div className="flex gap-1 items-center text-[10px] font-black text-emerald-500">
                                    <CheckCircle size={11} /> Valid
                                </div>
                            </div>
                        </div>

                        {/* ESIC Form 1 */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl flex justify-between items-center">
                            <div>
                                <div className="text-xs font-black text-white">ESIC Form 1 - Declaration under ESI Act</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Download official Form 1 with nominee details pre-filled</div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                                    <Download size={13} /> Download
                                </button>
                                <button className="px-4 py-2 bg-rose-600/20 border border-rose-500/30 rounded-xl text-[10px] font-black text-rose-400 uppercase tracking-widest hover:bg-rose-600/30 transition-colors flex items-center gap-2">
                                    <UserPlus size={13} /> Submit to ESIC
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
