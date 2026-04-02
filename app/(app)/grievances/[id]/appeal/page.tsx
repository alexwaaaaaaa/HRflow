"use client";
import React from 'react';
import { Scale, ArrowLeft, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function GrievanceAppealScreen({ params }: { params: { id: string } }) {
    const defaultId = "GRV-2026-142";

    return (
        <div className="min-h-screen p-6 max-w-3xl mx-auto flex flex-col justify-center py-12">

            <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-sky-500/10 border border-sky-500/30 rounded-2xl mx-auto flex items-center justify-center text-sky-400 mb-4 shadow-lg shadow-sky-500/10">
                    <Scale size={28} />
                </div>
                <h1 className="text-3xl font-black text-white mb-2">File an Appeal</h1>
                <p className="text-[#8899AA] text-sm">Appeals must be based on new evidence or procedural irregularities in the original investigation.</p>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">

                {/* Warning Banner */}
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl mb-6 flex items-start gap-3">
                    <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-amber-400 font-bold text-sm mb-1">Time Limit Notice</h4>
                        <p className="text-xs text-[#8899AA]">As per Section 18 of the POSH Act, any person aggrieved by the recommendations made may prefer an appeal within <strong>90 days</strong> of the recommendations. Your deadline is <strong>Jan 24, 2027</strong>.</p>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Case Reference</label>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-3 text-white font-mono text-sm">
                            {defaultId} - RESOLVED
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Grounds for Appeal</label>
                        <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 appearance-none text-sm">
                            <option value="">Select the primary reason...</option>
                            <option value="new_evidence">New evidence has been discovered</option>
                            <option value="procedural">Procedural irregularity by the IC</option>
                            <option value="disproportionate">Disproportionate disciplinary action</option>
                            <option value="bias">Demonstrable bias by committee members</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Detailed Justification</label>
                        <textarea
                            rows={6}
                            placeholder="Explain exactly why the original resolution should be reconsidered..."
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-sky-500 resize-none text-sm leading-relaxed"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Submit to Appellate Authority</label>
                        <div className="border border-[#2A3A4A] rounded-lg p-3 flex items-center gap-3 bg-[#060D1A]">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                                EC
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-bold">Executive Council / Appellate Court</h4>
                                <p className="text-xs text-[#556677]">Your appeal will be routed to the designated superior authority.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[#1A2A3A] flex justify-between items-center">
                        <Link href={`/grievances/${defaultId}/employee`} className="text-sm font-bold text-[#8899AA] hover:text-white transition-colors">
                            Cancel
                        </Link>
                        <button className="bg-sky-600 hover:bg-sky-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-sky-500/20">
                            Submit Appeal <Send size={16} />
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
