"use client";

import React, { useState } from 'react';
import {
    Building2, CheckCircle, AlertTriangle, Clock, ArrowRight,
    Plus, Download, Upload, FileText, Search, MapPin, RefreshCw
} from 'lucide-react';

const states = [
    { state: 'Maharashtra', registrationNo: 'MH/PT/1234567/2018', status: 'Active', employeeCount: 190, deadline: '31 Mar', amount: '₹2,500/month' },
    { state: 'Karnataka', registrationNo: 'KA/PT/9876543/2019', status: 'Active', employeeCount: 48, deadline: '30 Apr', amount: '₹208.33/month' },
    { state: 'Telangana', registrationNo: '', status: 'Not Registered', employeeCount: 7, deadline: 'N/A', amount: '₹200/month' },
];

const ptSlabs = [
    { state: 'Maharashtra', slab: '>₹10,000/month', tax: '₹200 (Feb: ₹300)', frequency: 'Monthly', notes: 'Payable by 15th of following month' },
    { state: 'Karnataka', slab: '>₹15,000/month', tax: '₹200', frequency: 'Monthly', notes: 'Payable by last day of month' },
    { state: 'Telangana', slab: '>₹15,000/month', tax: '₹200', frequency: 'Monthly', notes: 'Self-assessment' },
];

export default function PTRegistration() {
    const [activeState, setActiveState] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Compliance <ArrowRight size={10} /> PT <ArrowRight size={10} /> PT Registration
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <Building2 size={28} className="text-violet-400" /> Professional Tax Registration
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            Manage state-wise PT registrations, certificates (PTRC/PTEC), and renewal tracking.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2">
                            <RefreshCw size={14} /> Sync State Portal
                        </button>
                        <button onClick={() => setShowAddModal(true)}
                            className="px-6 py-2.5 bg-violet-600 rounded-xl text-sm font-black text-white hover:bg-violet-700 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center gap-2">
                            <Plus size={16} /> Add State Registration
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#0D1928] border border-emerald-500/20 p-5 rounded-2xl">
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Active Registrations</div>
                        <div className="text-3xl font-black text-emerald-400">2</div>
                        <div className="text-[10px] text-slate-500 mt-1">Maharashtra, Karnataka</div>
                    </div>
                    <div className="bg-[#0D1928] border border-rose-500/20 p-5 rounded-2xl">
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Unregistered States</div>
                        <div className="text-3xl font-black text-rose-400">1</div>
                        <div className="text-[10px] text-slate-500 mt-1">Telangana needs registration</div>
                    </div>
                    <div className="bg-[#0D1928] border border-amber-500/20 p-5 rounded-2xl">
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Monthly PT Liability</div>
                        <div className="text-3xl font-black text-amber-400">₹2,708</div>
                        <div className="text-[10px] text-slate-500 mt-1">Across all registered states</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* State List */}
                    <div className="lg:col-span-1 space-y-3">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">States with Employees</div>
                        {states.map((s, i) => (
                            <button key={i} onClick={() => setActiveState(i)}
                                className={`w-full text-left p-4 rounded-2xl border transition-all
                                    ${activeState === i ? 'bg-violet-500/10 border-violet-500/30' : 'bg-[#0D1928] border-[#1A2A3A] hover:border-slate-600'}`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className={activeState === i ? 'text-violet-400' : 'text-slate-600'} />
                                        <span className="text-sm font-black text-white">{s.state}</span>
                                    </div>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border
                                        ${s.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                                        {s.status}
                                    </span>
                                </div>
                                <div className="text-[10px] text-slate-500 mt-2">{s.employeeCount} employees • {s.amount}</div>
                                {s.registrationNo && <div className="text-[9px] font-mono text-slate-600 mt-1">{s.registrationNo}</div>}
                            </button>
                        ))}
                    </div>

                    {/* Detail Panel */}
                    <div className="lg:col-span-2 space-y-5">
                        {states[activeState].status === 'Not Registered' ? (
                            <div className="bg-[#0D1928] border border-rose-500/20 rounded-2xl p-6 shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <AlertTriangle size={20} className="text-rose-400" />
                                    <h2 className="text-sm font-black text-rose-400">Registration Required</h2>
                                </div>
                                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                                    Your company has <b className="text-white">{states[activeState].employeeCount} employees</b> in {states[activeState].state}. Professional Tax registration is mandatory as per the {states[activeState].state} Professions, Trades, Callings and Employments Act.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Documents Required</div>
                                    {['PAN / TAN of the business', 'GST Registration Certificate', 'Proof of business address in state', 'List of employees and salaries'].map((d, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                            <CheckCircle size={12} className="text-slate-500" /> {d}
                                        </div>
                                    ))}
                                </div>
                                <button className="px-6 py-3 bg-rose-600 rounded-xl text-sm font-black text-white hover:bg-rose-700 transition-all flex items-center gap-2">
                                    <Plus size={16} /> Initiate Registration
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl">
                                    <h2 className="text-xs font-black text-white uppercase tracking-widest mb-4 border-b border-[#1A2A3A] pb-3">
                                        Registration Details — {states[activeState].state}
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: 'Registration No.', val: states[activeState].registrationNo },
                                            { label: 'Status', val: states[activeState].status },
                                            { label: 'Tax Slab', val: states[activeState].amount },
                                            { label: 'Monthly Deadline', val: states[activeState].deadline },
                                        ].map((r, i) => (
                                            <div key={i} className="p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl">
                                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{r.label}</div>
                                                <div className="text-xs font-black text-white">{r.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                                            <Download size={12} /> Download Certificate (PTRC)
                                        </button>
                                        <button className="px-4 py-2 bg-violet-600/20 border border-violet-500/30 rounded-xl text-[10px] font-black text-violet-400 uppercase tracking-widest hover:bg-violet-600/30 transition-colors flex items-center gap-2">
                                            <Upload size={12} /> Upload Renewal
                                        </button>
                                    </div>
                                </div>

                                {/* PT Slab Reference */}
                                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 shadow-xl">
                                    <h2 className="text-xs font-black text-white uppercase tracking-widest mb-4">PT Slab Reference</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-[#1A2A3A]">
                                                    {['State', 'Threshold', 'PT Amount', 'Frequency'].map(h => (
                                                        <th key={h} className="text-left text-[9px] font-black uppercase tracking-widest text-slate-500 pb-2 pr-4">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ptSlabs.map((p, i) => (
                                                    <tr key={i} className="border-b border-[#1A2A3A]/50">
                                                        <td className="py-2 pr-4 text-xs font-bold text-white">{p.state}</td>
                                                        <td className="py-2 pr-4 text-xs text-slate-400">{p.slab}</td>
                                                        <td className="py-2 pr-4 text-xs font-black text-violet-400">{p.tax}</td>
                                                        <td className="py-2 text-xs text-slate-500">{p.frequency}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
