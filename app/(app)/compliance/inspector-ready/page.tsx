"use client";

import React, { useState } from 'react';
import {
    ShieldCheck, Eye, Lock, FileArchive,
    Share2, Timer, AlertCircle
} from 'lucide-react';

export default function InspectorReadyMode() {
    const [isModeActive, setIsModeActive] = useState(false);

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 mt-10">

                <div className={`transition-all duration-700 ${isModeActive ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}>
                    <div className={`bg-gradient-to-br ${isModeActive ? 'from-emerald-900/40 to-[#0D1928] border-emerald-500/50 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]' : 'from-[#0D1928] to-[#060B14] border-[#1A2A3A]'} border rounded-3xl p-10 text-center relative overflow-hidden`}>

                        {/* Background pulsing icon */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none transition-all duration-1000 ${isModeActive ? 'scale-150 rotate-12' : 'scale-100'}`}>
                            <ShieldCheck size={400} />
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${isModeActive ? 'bg-emerald-500/20 text-emerald-400 border-4 border-emerald-500/30' : 'bg-[#1A2A3A] text-slate-500'}`}>
                                <ShieldCheck size={48} />
                            </div>

                            <h1 className="text-4xl font-black text-white tracking-tight mb-4">
                                Inspector Ready Mode
                            </h1>
                            <p className="text-slate-400 text-sm max-w-lg mb-10 leading-relaxed font-medium">
                                Generate a unified, tamper-proof, read-only digital bundle containing previous 12 months of Challans, Registers, and Policies for visiting Labour Inspectors.
                            </p>

                            {!isModeActive ? (
                                <div className="space-y-6 w-full max-w-sm">
                                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-left flex gap-3">
                                        <AlertCircle size={20} className="text-orange-500 shrink-0 mt-0.5" />
                                        <div className="text-[10px] text-orange-400 font-bold italic leading-relaxed">
                                            Warning: Activating this mode generates a traceable link. All statutory data for the designated period will be bundled and secured.
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsModeActive(true)}
                                        className="w-full py-4 bg-emerald-600 rounded-xl text-white font-black uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
                                    >
                                        <Eye size={18} /> Activate Safe Mode
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full max-w-md space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-[#060B14] border border-emerald-500/30 p-6 rounded-2xl text-left space-y-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                                                <Lock size={12} /> Secure Link Generated
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                                                <Timer size={12} /> Expires in 24h
                                            </span>
                                        </div>

                                        <div className="font-mono text-xs text-white bg-[#1A2A3A]/50 p-3 rounded-xl break-all select-all flex justify-between items-center group cursor-pointer hover:bg-[#1A2A3A] transition-colors">
                                            <span>https://hrflow.app/audit/insp-xyz99281-auth</span>
                                            <Share2 size={14} className="text-slate-400 group-hover:text-emerald-400" />
                                        </div>

                                        <div className="flex flex-col gap-2 pt-2 border-t border-[#1A2A3A]">
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bundle Contents</div>
                                            <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                                                <CheckCircleIcon /> PF & ESIC Challans (Last 12M)
                                            </div>
                                            <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                                                <CheckCircleIcon /> State Wage Registers
                                            </div>
                                            <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                                                <CheckCircleIcon /> Master S&E Certificates
                                            </div>
                                        </div>

                                        <button className="w-full mt-2 py-3 bg-[#1A2A3A] border border-[#1A2A3A] rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:border-slate-500 transition-all flex items-center justify-center gap-2">
                                            <FileArchive size={14} /> Download Physical Archive (ZIP)
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setIsModeActive(false)}
                                        className="py-2 px-4 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-rose-500 transition-colors"
                                    >
                                        Deactivate & Revoke Access
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function CheckCircleIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
}
