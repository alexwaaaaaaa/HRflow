"use client";

import React from 'react';
import {
    ArrowLeft, BookOpen, Clock, Globe, Download,
    Share2, AlertTriangle, FileText, CheckCircle, BrainCircuit
} from 'lucide-react';
import Link from 'next/link';

export default function GazetteChangeDetail() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Navigation & Actions */}
                <div className="flex justify-between items-center pb-4 border-b border-[#1A2A3A]">
                    <Link href="/compliance/gazette-monitor" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={16} /> <span className="text-xs font-black uppercase tracking-widest">Back to Monitor</span>
                    </Link>
                    <div className="flex gap-3">
                        <button className="p-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-slate-400 hover:text-white transition-all"><Share2 size={16} /></button>
                        <button className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white transition-all flex items-center gap-2">
                            <Download size={14} /> Source PDF
                        </button>
                    </div>
                </div>

                {/* Article Header */}
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">S&E Act</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"><Globe size={12} /> Maharashtra</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"><Clock size={12} /> Published: 12 Mar 2024</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
                        Mandatory online registration and renewal under Maharashtra Shop & Establishment Act
                    </h1>

                    <div className="p-4 bg-indigo-500/10 border-l-4 border-indigo-500 rounded-r-xl">
                        <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                            <BrainCircuit size={14} /> AI Executive Summary
                        </h3>
                        <p className="text-sm font-medium text-indigo-100/80 leading-relaxed italic">
                            The Government of Maharashtra has mandated that all new registrations and renewals under the Shop and Establishment Act must be done exclusively through the online MAITRI portal. Offline physical submissions will no longer be accepted post April 1st, 2024.
                        </p>
                    </div>
                </div>

                {/* Main Content & Impact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">

                    <div className="md:col-span-2 space-y-8 text-sm text-slate-300 leading-relaxed">
                        <div className="space-y-4">
                            <h2 className="text-lg font-black text-white uppercase tracking-tight">Background & Context</h2>
                            <p>
                                In an effort to promote ease of doing business and digitize administrative processes, the Labour Department of Maharashtra issued circular No. L-2024/CR-12 on March 12, 2024.
                            </p>
                            <p>
                                Previously, establishments with less than 10 employees were granted intimation receipts, while those with 10 or more required formal registration certificates. The new mandate unifies the portal for both intimations and formal registrations.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-black text-white uppercase tracking-tight">Key Directives</h2>
                            <ul className="space-y-3 list-disc list-inside marker:text-indigo-500">
                                <li>Complete cessation of manual application acceptance at ward offices.</li>
                                <li>Intimation receipts (Form F) for establishments with 0-9 employees are now auto-generated upon Aadhar-based e-verification.</li>
                                <li>Establishments must upload Geo-tagged photographs of the establishment displaying the Marathi Name Board.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Impact Assessment Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl space-y-6">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[#1A2A3A] pb-4">Our Impact Assessment</h3>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Impact Level</span>
                                    <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border border-amber-500/20 inline-flex items-center gap-2">
                                        <AlertTriangle size={12} /> Medium
                                    </span>
                                </div>

                                <div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Action Required</span>
                                    <p className="text-xs font-bold text-slate-300 leading-relaxed">
                                        Verify if our Mumbai & Pune office registrations are updated on the MAITRI portal. Prepare geo-tagged photos of name boards.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#1A2A3A]">
                                <button className="w-full py-3 bg-indigo-600 rounded-xl text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                                    <CheckCircle size={14} /> Mark as Reviewed
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
