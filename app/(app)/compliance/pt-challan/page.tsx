"use client";

import React, { useState } from 'react';
import {
    MapPin, Banknote, Building2, CheckCircle, Search,
    Download, ArrowRight, ShieldAlert, BadgeInfo
} from 'lucide-react';

export default function ProfessionalTax() {
    const [activeTab, setActiveTab] = useState('challan');

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            {activeTab === 'challan' ? (
                                <><Banknote size={28} className="text-blue-500" /> Professional Tax (PT) Returns</>
                            ) : (
                                <><Building2 size={28} className="text-amber-500" /> PT Registration (RC/EC)</>
                            )}
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            {activeTab === 'challan' ? 'State-wise PT deduction, challan generation, and payment.' : 'Track PT Registration Certificates (RC) and Enrollment Certificates (EC) across states.'}
                        </p>
                    </div>

                    <div className="flex bg-[#0D1928] border border-[#1A2A3A] p-1 rounded-xl w-max">
                        <button
                            onClick={() => setActiveTab('challan')}
                            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'challan' ? 'bg-[#1A2A3A] text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            PT Challans
                        </button>
                        <button
                            onClick={() => setActiveTab('registration')}
                            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'registration' ? 'bg-[#1A2A3A] text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            PT Registrations
                        </button>
                    </div>
                </div>

                {activeTab === 'challan' ? (
                    /* PT Challan View */
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in slide-in-from-right-8 duration-500">
                        <div className="lg:col-span-3 space-y-6">

                            {/* Filter bar */}
                            <div className="flex gap-4 items-center">
                                <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all shadow-lg italic">
                                    March 2024
                                </button>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">State-wise Summary</div>
                            </div>

                            {/* State Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Karnataka */}
                                <div className="bg-[#0D1928] border border-blue-500/20 p-6 rounded-3xl relative overflow-hidden group shadow-lg">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} className="text-blue-500" />
                                            <h2 className="text-lg font-black text-white uppercase tracking-widest">Karnataka (KA)</h2>
                                        </div>
                                        <div className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">
                                            Monthly Filer
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Emp Count</div>
                                            <div className="text-xl font-black text-white tabular-nums">42</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">PT Payable</div>
                                            <div className="text-xl font-black text-blue-500 tabular-nums">₹8,400</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-1 py-2.5 bg-blue-600 rounded-xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                            Pay via e-Prerana
                                        </button>
                                        <button className="px-4 py-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-slate-400 hover:text-white transition-all">
                                            <Download size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Maharashtra */}
                                <div className="bg-[#0D1928] border border-emerald-500/20 p-6 rounded-3xl relative overflow-hidden group shadow-lg">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} className="text-emerald-500" />
                                            <h2 className="text-lg font-black text-white uppercase tracking-widest">Maharashtra (MH)</h2>
                                        </div>
                                        <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">
                                            Monthly Filer
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Emp Count</div>
                                            <div className="text-xl font-black text-white tabular-nums">35</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">PT Payable <span className="text-[8px] text-amber-500 ml-1">(Feb Effect)</span></div>
                                            <div className="text-xl font-black text-emerald-500 tabular-nums">₹10,500</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-1 py-2.5 bg-emerald-600 rounded-xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                                            Pay via MahaGST
                                        </button>
                                        <button className="px-4 py-2.5 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-slate-400 hover:text-white transition-all">
                                            <Download size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Telangana */}
                                <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-3xl relative overflow-hidden group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} className="text-slate-400" />
                                            <h2 className="text-lg font-black text-slate-300 uppercase tracking-widest">Telangana (TG)</h2>
                                        </div>
                                        <div className="bg-[#1A2A3A] text-slate-400 border border-[#1A2A3A] px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">
                                            Monthly Filer
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Emp Count</div>
                                            <div className="text-xl font-black text-white tabular-nums">12</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">PT Payable</div>
                                            <div className="text-xl font-black text-slate-300 tabular-nums">₹2,400</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-1 py-2.5 bg-[#1A2A3A] rounded-xl text-slate-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-not-allowed">
                                            <CheckCircle size={14} /> Paid (10 Apr)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Guidelines Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl space-y-4">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#1A2A3A] pb-4">PT Deduction Logic</h3>
                                <ul className="space-y-4 text-[10px] text-slate-300 font-medium leading-relaxed italic">
                                    <li className="flex gap-2">
                                        <span className="font-black text-rose-500">•</span> <strong>KA:</strong> ₹200/month for salary &gt; ₹25,000.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-black text-rose-500">•</span> <strong>MH:</strong> ₹200/month except Feb (₹300) for salary &gt; ₹10,000 (men) or ₹25,000 (women).
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-black text-rose-500">•</span> <strong>TG:</strong> Slab-based (₹150 to ₹200) for gross salary &gt; ₹15,000.
                                    </li>
                                </ul>
                                <div className="mt-4 p-3 border border-amber-500/30 bg-amber-500/5 rounded-xl flex items-start gap-2">
                                    <ShieldAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest leading-relaxed text-left w-full">PT laws vary drastically by State Govt. Verify slabs annually.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* PT Registration View */
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in slide-in-from-left-8 duration-500">
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl">
                                <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Registration Master</h2>
                                    <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:border-slate-500 transition-colors">
                                        + Add State Registration
                                    </button>
                                </div>
                                <table className="w-full text-left">
                                    <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                        <tr>
                                            <th className="px-6 py-4">State</th>
                                            <th className="px-6 py-4">Registration Certificate (RC)</th>
                                            <th className="px-6 py-4">Enrollment Certificate (EC)</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A]">
                                        {[
                                            { state: 'Karnataka (KA)', rc: 'RC2900018820', ec: 'EC2900018821', status: 'Active', color: 'emerald' },
                                            { state: 'Maharashtra (MH)', rc: 'RC2700045512', ec: 'EC2700045513', status: 'Active', color: 'emerald' },
                                            { state: 'Telangana (TG)', rc: 'Pending Gov Review', ec: 'Pending Gov Review', status: 'In-Progress', color: 'amber' },
                                            { state: 'Tamil Nadu (TN)', rc: 'Not Required (<5 Emp)', ec: 'Not Required', status: 'Exempt', color: 'slate' },
                                        ].map((row, i) => (
                                            <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all">
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-black text-white">{row.state}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`text-xs font-mono font-bold ${row.rc.includes('Pending') || row.rc.includes('Not') ? 'text-slate-500 text-[10px] uppercase tracking-widest' : 'text-slate-300'}`}>{row.rc}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`text-xs font-mono font-bold ${row.ec.includes('Pending') || row.ec.includes('Not') ? 'text-slate-500 text-[10px] uppercase tracking-widest' : 'text-slate-300'}`}>{row.ec}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest text-${row.color}-500 bg-${row.color}-500/10 border border-${row.color}-500/20 px-2 py-0.5 rounded`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Guidelines Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">RC vs EC</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">RC (Registration Cert.)</div>
                                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">Required to deduct PT from employees' salaries and remit to Govt.</p>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">EC (Enrollment Cert.)</div>
                                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">Required for the Company / Employer to pay its own PT (yearly).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
