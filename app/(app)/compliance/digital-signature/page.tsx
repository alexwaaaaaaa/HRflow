"use client";

import React from 'react';
import {
    Key, Fingerprint, Upload, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

export default function DigitalSignatureSetup() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            Digital Signatures (DSC) <Key size={28} className="text-amber-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">Manage Class 3 DSCs and e-Signs for Authorized Signatories.</p>
                    </div>
                    <button className="px-6 py-2.5 bg-amber-600/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2">
                        <Upload size={16} /> Register New DSC
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Active DSC */}
                    <div className="bg-[#0D1928] border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                    <Fingerprint size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">Abhishek Sharma</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Director / Authorized Signatory</p>
                                </div>
                            </div>
                            <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                <CheckCircle size={12} /> Active
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#060B14] p-3 rounded-xl border border-[#1A2A3A]">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Class Type</div>
                                    <div className="text-sm font-black text-white">Class 3 (Org)</div>
                                </div>
                                <div className="bg-[#060B14] p-3 rounded-xl border border-[#1A2A3A]">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Used For</div>
                                    <div className="text-xs font-bold text-slate-300">EPFO, TRACES, MCA</div>
                                </div>
                            </div>
                            <div className="bg-[#060B14] p-3 rounded-xl border border-[#1A2A3A] flex justify-between items-center">
                                <div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Validity Expires</div>
                                    <div className="text-sm font-black text-white">14 Dec 2025</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Provider</div>
                                    <div className="text-sm font-bold text-slate-300">eMudhra Ltd.</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button className="flex-1 py-2 bg-[#1A2A3A] hover:bg-slate-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Verify Map</button>
                            <button className="flex-1 py-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Revoke</button>
                        </div>
                    </div>

                    {/* Expiring DSC */}
                    <div className="bg-[#0D1928] border border-orange-500/30 rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                    <Fingerprint size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">Sarah Jenkins</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HR Head / Factory Manager</p>
                                </div>
                            </div>
                            <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                <Clock size={12} /> Expiring Soon
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#060B14] p-3 rounded-xl border border-[#1A2A3A]">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Class Type</div>
                                    <div className="text-sm font-black text-white">Class 3 (Org)</div>
                                </div>
                                <div className="bg-[#060B14] p-3 rounded-xl border border-[#1A2A3A]">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Used For</div>
                                    <div className="text-xs font-bold text-slate-300">ESIC, Labour Dept</div>
                                </div>
                            </div>
                            <div className="bg-[#060B14] p-3 rounded-xl border border-orange-500/20 flex justify-between items-center">
                                <div>
                                    <div className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><AlertCircle size={10} /> Validity Expires</div>
                                    <div className="text-sm font-black text-orange-500">20 May 2024 (in 9 days)</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Provider</div>
                                    <div className="text-sm font-bold text-slate-300">Sify Tech</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Initiate Renewal</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
