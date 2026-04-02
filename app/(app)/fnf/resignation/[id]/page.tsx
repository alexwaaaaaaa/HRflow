"use client";

import React from 'react';
import {
    Calendar, User, Briefcase, FileText, Download,
    MessageCircle, AlertTriangle, Paperclip, CheckCircle, ArrowLeft, ExternalLink
} from 'lucide-react';

export default function ResignationDetails() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">Resignation Details</h1>
                            <p className="text-slate-400 text-sm font-medium">Case ID: <span className="text-blue-500">RES-99321-2024</span></p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center">
                            <Download size={16} className="mr-2" /> Resignation Letter
                        </button>
                        <button className="px-5 py-2.5 bg-[#00E5A0] rounded-xl text-sm font-black text-[#060B14] hover:bg-[#00cc8e] transition-all shadow-[0_0_20px_rgba(0,229,160,0.2)]">
                            Accept Resignation
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Employee & Summary */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                            <div className="flex items-center gap-4 relative z-10 mb-6 border-b border-[#1A2A3A] pb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-2xl font-black text-white shadow-xl">
                                    AD
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white">Arnab Das</h2>
                                    <p className="text-slate-500 font-bold text-sm">Senior Frontend Lead</p>
                                    <p className="text-xs text-blue-500 font-black tracking-widest uppercase mt-1">EMP-771 • ENGINEERING</p>
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center justify-between text-sm py-2 border-b border-[#1A2A3A]/50">
                                    <span className="text-slate-500 font-bold">Reporting To</span>
                                    <span className="text-white font-bold">Sumit Bakshi</span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-2 border-b border-[#1A2A3A]/50">
                                    <span className="text-slate-500 font-bold">Tenure</span>
                                    <span className="text-white font-bold">3 Years, 2 Months</span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-2 border-b border-[#1A2A3A]/50">
                                    <span className="text-slate-500 font-bold">Join Date</span>
                                    <span className="text-white font-bold">12 Jan 2021</span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-2">
                                    <span className="text-slate-500 font-bold">Asset Status</span>
                                    <span className="text-amber-500 font-bold flex items-center">
                                        Pending Returns <ExternalLink size={12} className="ml-1" />
                                    </span>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-4 shadow-xl">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Final Settlement Status</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Asset Clearance', status: 'Pending', color: 'bg-amber-500/10 text-amber-500' },
                                    { label: 'IT Clearance', status: 'Approved', color: 'bg-emerald-500/10 text-emerald-500' },
                                    { label: 'Admin Clearance', status: 'In Review', color: 'bg-blue-500/10 text-blue-500' },
                                    { label: 'Finance Review', status: 'Not Started', color: 'bg-slate-500/10 text-slate-500' },
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-help">
                                        <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{step.label}</span>
                                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded tracking-widest ${step.color}`}>
                                            {step.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-blue-500 font-bold text-sm hover:bg-[#1A2A3A] transition-all">
                                View Full Exit Checklist
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Timeline & Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Resignation Core Data */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#0D1928]/50 flex justify-between items-center">
                                <h2 className="text-lg font-black text-white flex items-center">
                                    <FileText size={20} className="mr-3 text-blue-500" /> Resignation Submission
                                </h2>
                                <span className="bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Urgent Review</span>
                            </div>
                            <div className="p-8 grid grid-cols-2 gap-y-10 gap-x-12">
                                <div className="space-y-1">
                                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Resignation Type</div>
                                    <div className="text-xl font-bold text-white">Voluntary Resignation</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Reason Category</div>
                                    <div className="text-xl font-bold text-white">Better Opportunity</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Submission Date</div>
                                    <div className="flex items-center gap-2 text-xl font-bold text-white">
                                        <Calendar size={18} className="text-blue-500" /> 12 Mar 2024
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Requested LWD</div>
                                    <div className="flex items-center gap-2 text-xl font-bold text-white">
                                        <Calendar size={18} className="text-amber-500" /> 24 Apr 2024
                                    </div>
                                </div>
                                <div className="col-span-2 space-y-3">
                                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Employee Comments</div>
                                    <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-slate-300 text-sm leading-relaxed italic border-l-4 border-l-blue-500/50 shadow-inner">
                                        "I am writing to formally resign from my position. I have received an opportunity that aligns closely with my long-term career goals in AI research. I am committed to ensuring a smooth transition during my notice period."
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transition Progress */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
                            <h2 className="text-lg font-black text-white flex items-center relative z-10">
                                <Briefcase size={20} className="mr-3 text-emerald-500" /> Knowledge Transfer (KT) Progress
                            </h2>
                            <div className="space-y-6 relative z-10">
                                {[
                                    { task: 'Frontend Architecture Handover', owner: 'Rahul V.', status: 100 },
                                    { task: 'Release Pipeline Documentation', owner: 'Sneha B.', status: 40 },
                                    { task: 'Legacy Code Review & Cleanup', owner: 'Sumit G.', status: 15 },
                                ].map((kt, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-sm font-bold">
                                            <span className="text-slate-200">{kt.task} <span className="text-xs text-slate-600 ml-2">Owner: {kt.owner}</span></span>
                                            <span className={kt.status === 100 ? 'text-emerald-500' : 'text-blue-500'}>{kt.status}%</span>
                                        </div>
                                        <div className="w-full bg-[#060B14] h-2 rounded-full overflow-hidden border border-[#1A2A3A]">
                                            <div className={`h-full transition-all duration-1000 ease-out ${kt.status === 100 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-blue-500'}`} style={{ width: `${kt.status}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 bg-[#0D1928] border border-dashed border-[#1A2A3A] rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest hover:border-slate-500 transition-all hover:text-slate-300 relative z-10">
                                + Add KT Task
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
