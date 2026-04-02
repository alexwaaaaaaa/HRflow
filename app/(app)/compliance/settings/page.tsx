"use client";

import React from 'react';
import {
    Settings, Building2, Ticket, Scale, Save, Shield
} from 'lucide-react';

export default function ComplianceSettings() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Compliance Settings <Settings size={28} className="text-slate-400" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Configure global establishment identities, LIN, PAN, TAN, and master policies.</p>
                    </div>
                    <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2">
                        <Save size={16} /> Save Configuration
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Navigation */}
                    <div className="md:col-span-3 space-y-2">
                        <button className="w-full text-left px-4 py-3 bg-[#1A2A3A] text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-3">
                            <Building2 size={16} className="text-blue-500" /> Master Entity
                        </button>
                        <button className="w-full text-left px-4 py-3 text-slate-400 hover:bg-[#1A2A3A]/50 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3">
                            <Ticket size={16} /> Registrations
                        </button>
                        <button className="w-full text-left px-4 py-3 text-slate-400 hover:bg-[#1A2A3A]/50 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3">
                            <Scale size={16} /> Labour Acts
                        </button>
                        <button className="w-full text-left px-4 py-3 text-slate-400 hover:bg-[#1A2A3A]/50 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3">
                            <Shield size={16} /> Audit Trail
                        </button>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-9 space-y-8">

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6">
                            <h2 className="text-lg font-black text-white mb-6 border-b border-[#1A2A3A] pb-4 tracking-tight">Organization Master Data</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legal Entity Name</label>
                                    <input type="text" defaultValue="TechCorp Solutions Private Limited" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-blue-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date of Incorporation</label>
                                    <input type="date" defaultValue="2018-04-01" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-slate-300 focus:border-blue-500 outline-none" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Registered Address</label>
                                    <textarea rows={2} defaultValue="Building 5, Mindspace IT Park, Airoli, Navi Mumbai, Maharashtra - 400708" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-slate-300 focus:border-blue-500 outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-6">
                            <h2 className="text-lg font-black text-white mb-6 border-b border-[#1A2A3A] pb-4 tracking-tight">Tax & Statutory Identifiers</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company PAN</label>
                                    <input type="text" defaultValue="AABCT1234H" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-white uppercase focus:border-blue-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Master TAN</label>
                                    <input type="text" defaultValue="MUMA12999B" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-white uppercase focus:border-blue-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">GSTIN (Head Office)</label>
                                    <input type="text" defaultValue="27AABCT1234H1Z5" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-white uppercase focus:border-blue-500 outline-none" />
                                </div>
                                <div className="space-y-2 flex items-center gap-3 pt-6">
                                    <input type="checkbox" id="shramSuvidha" defaultChecked className="w-4 h-4 rounded bg-[#060B14] border-[#1A2A3A] text-blue-500 focus:ring-0" />
                                    <label htmlFor="shramSuvidha" className="text-sm font-bold text-slate-300 cursor-pointer">Linked with Shram Suvidha Portal</label>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Labour Identification Number (LIN)</label>
                                    <input type="text" defaultValue="1899201088" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm font-bold text-white focus:border-blue-500 outline-none" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
