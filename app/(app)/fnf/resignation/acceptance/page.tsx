"use client";

import React from 'react';
import {
    CheckCircle, XCircle, Calendar, MessageSquare, AlertTriangle,
    ArrowLeft, Send, ShieldCheck, Mail, Briefcase
} from 'lucide-react';

export default function ResignationAcceptance() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">Accept Resignation</h1>
                            <p className="text-slate-400 text-sm font-medium italic">Employee: Arnab Das (EMP-771)</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Main Form */}
                    <div className="lg:col-span-3 space-y-8 animate-in slide-in-from-bottom duration-700">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-8 shadow-2xl relative overflow-hidden">

                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-l-4 border-blue-500 pl-3">LWD Configuration</h3>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-tighter">Confirmation of Last Working Day (LWD)</label>
                                        <div className="relative">
                                            <Calendar size={18} className="absolute left-4 top-3.5 text-blue-500" />
                                            <input type="date" value="2024-04-24" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3.5 text-white font-bold outline-none focus:border-blue-500/50 transition-all shadow-inner" />
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-bold px-1 italic">* Based on 90-day notice period policy</p>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-[#1A2A3A]">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-tighter">Exit Confirmation Details</label>
                                        <div className="space-y-3">
                                            <textarea
                                                placeholder="Enter formal acceptance message to be sent to employee..."
                                                className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 text-white outline-none focus:border-blue-500/50 min-h-[140px] resize-none text-sm leading-relaxed"
                                                defaultValue="We formally accept your resignation. We appreciate your contributions during your tenure and wish you the best for your future endeavors. Please ensure a smooth transition of your current responsibilities."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button className="flex-1 py-4 bg-[#0066FF] rounded-xl text-white font-black text-sm hover:bg-[#0052cc] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] flex items-center justify-center gap-2">
                                    <Send size={18} /> Confirm & Send Acceptance
                                </button>
                                <button className="px-6 py-4 border border-rose-500/30 text-rose-500 font-black text-sm rounded-xl hover:bg-rose-500/5 transition-all flex items-center gap-2">
                                    <XCircle size={18} /> Reject
                                </button>
                            </div>

                            {/* Stylized background */}
                            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full -mb-20 -mr-20 pointer-events-none" />
                        </div>
                    </div>

                    {/* Right Info Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-6 shadow-xl border-l-4 border-l-amber-500">
                            <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle size={14} /> Quick Check
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { text: 'Is replacement hired?', status: 'No', icon: <Briefcase size={14} className="text-slate-500" /> },
                                    { text: 'All assets tagged?', status: 'Yes', icon: <ShieldCheck size={14} className="text-emerald-500" /> },
                                    { text: 'Email Forwarding Set?', status: 'No', icon: <Mail size={14} className="text-slate-500" /> },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs font-bold py-2 border-b border-[#1A2A3A]/50">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            {item.icon} {item.text}
                                        </div>
                                        <span className={item.status === 'Yes' ? 'text-emerald-500' : 'text-slate-500'}>{item.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                            <h3 className="text-sm font-black text-white mb-4 relative z-10">Next Steps</h3>
                            <div className="space-y-4 relative z-10">
                                {[
                                    { step: 1, label: 'Resignation Accepted', active: true },
                                    { step: 2, label: 'Notice Period Initiation', active: false },
                                    { step: 3, label: 'Clearance Workflow', active: false },
                                    { step: 4, label: 'Final Settlement Payout', active: false },
                                ].map((s, i) => (
                                    <div key={i} className={`flex items-center gap-3 ${s.active ? 'opacity-100' : 'opacity-40'}`}>
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${s.active ? 'bg-blue-600' : 'bg-[#1A2A3A]'}`}>
                                            {s.step}
                                        </div>
                                        <span className="text-xs font-bold text-slate-300">{s.label}</span>
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
