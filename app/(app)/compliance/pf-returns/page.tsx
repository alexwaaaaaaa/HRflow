"use client";

import React from 'react';
import {
    FileText, Download, CheckCircle, Clock,
    ArrowRight, ArrowLeft, UploadCloud, FileCheck, Info, Search, Filter, ShieldAlert
} from 'lucide-react';

export default function PFAnnualReturns() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            PF Annual Returns (Form 3A / 6A) <FileText size={24} className="text-emerald-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Consolidated annual statements for establishment and members.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center px-4 py-2 text-sm font-bold text-slate-300">
                            FY 2023-2024
                        </div>
                        <button className="px-6 py-2.5 bg-emerald-600 rounded-xl text-sm font-black text-white hover:bg-emerald-700 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 italic">
                            <Download size={16} /> Generate Master ZIP
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Panel: Summary & Status */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-8 shadow-2xl relative overflow-hidden group">

                            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-[#1A2A3A] pb-4 mb-6">Financial Year Status</h2>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center bg-[#060B14] border border-emerald-500/20 p-4 rounded-2xl shadow-inner">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={20} className="text-emerald-500" />
                                        <div>
                                            <div className="text-xs font-black text-white uppercase">All 12 ECRs Filed</div>
                                            <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Apr '23 - Mar '24</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-emerald-500">100%</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Total Members</span>
                                        <span className="text-white">312</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>Total Setup Mismatch</span>
                                        <span className="text-rose-500">0</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-[#1A2A3A]">
                                    <div className="text-[10px] text-slate-500 font-bold leading-relaxed italic border-l-2 border-slate-700 pl-3">
                                        "Note: Form 3A/6A are largely obsolete for exempted establishments post ECR implementation, but remain available here for Legacy Audit compliance and specific member requests."
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#0D1928] to-[#1A2A3A]/50 border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <h3 className="text-xs font-black text-white uppercase tracking-tight mb-2">Form 6A (Consolidated)</h3>
                            <p className="text-[10px] text-slate-400 font-medium mb-4">Consolidated annual contribution statement of the establishment.</p>
                            <button className="w-full py-3 bg-[#060B14] border border-emerald-500/30 rounded-xl text-emerald-500 font-black text-xs uppercase tracking-widest hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2">
                                <FileCheck size={16} /> Download Form 6A
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Form 3A List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-2xl h-[600px] flex flex-col">

                            <div className="p-6 border-b border-[#1A2A3A] bg-[#060B14]/50 flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Individual Form 3A</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Member-wise annual contribution cards</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input type="text" placeholder="Search Employee..." className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-8 pr-3 py-2 text-xs text-white outline-none focus:border-emerald-500/50" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                                {[
                                    { name: 'Arnab Das', uan: '100456789012', eps: 'Yes', status: 'Ready' },
                                    { name: 'Rahul Nair', uan: '100456789013', eps: 'Yes', status: 'Ready' },
                                    { name: 'Sonia Gill', uan: '100456789014', eps: 'No', status: 'Ready' },
                                    { name: 'Priya Iyer', uan: '100456789015', eps: 'Yes', status: 'Ready' },
                                    { name: 'Anil Gupta', uan: '100456789016', eps: 'Yes', status: 'Ready' },
                                    { name: 'Neha Sharma', uan: '100456789017', eps: 'Yes', status: 'Ready' },
                                    { name: 'Vikram Singh', uan: '100456789018', eps: 'Yes', status: 'Ready' },
                                ].map((emp, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-slate-700 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[#0D1928] border border-[#1A2A3A] flex items-center justify-center text-xs font-black text-slate-400">
                                                {emp.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-white">{emp.name}</div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">UAN: {emp.uan}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="hidden sm:block">
                                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-0.5">EPS Eligibility</span>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${emp.eps === 'Yes' ? 'text-emerald-500' : 'text-slate-400'}`}>{emp.eps}</span>
                                            </div>
                                            <button className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-[10px] font-black text-blue-500 uppercase tracking-widest hover:bg-blue-500/10 transition-colors flex items-center gap-2">
                                                <Download size={14} /> F-3A
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
