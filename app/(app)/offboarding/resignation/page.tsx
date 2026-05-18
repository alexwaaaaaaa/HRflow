"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { FileEdit, Calendar, AlertCircle, ChevronRight, Check } from 'lucide-react';

export default function ResignationPortalScreen() {
    const [step, setStep] = useState(1);
    const [lwd, setLwd] = useState('');

    return (
        <Page
            title="Resignation Portal"
            subtitle="Submit your formal notice of resignation and begin the offboarding transition."
            breadcrumbs={[{ label: "Offboarding", href: "/offboarding" }, { label: "Resignation" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><FileEdit size={24} className="text-amber-400" /> Resignation Portal</h1>
                <p className="text-[#8899AA] text-sm mt-1">Submit your formal notice of resignation and begin the offboarding transition.</p>
            </div>

            <div className="flex gap-2 mb-8">
                <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 'bg-[#1A2A3A]'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 'bg-[#1A2A3A]'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 'bg-[#1A2A3A]'}`}></div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold text-white mb-6">Notice Period & Dates</h2>

                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 mb-8 flex items-start gap-4">
                            <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-white font-bold text-sm mb-1">Standard Notice Period Required: 60 Days</h4>
                                <p className="text-[#8899AA] text-xs leading-relaxed">As per your employment contract, a 60-day notice period is required. If you request an earlier release, it is subject to manager approval and potential buyout calculations during final settlement.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[#8899AA] text-sm font-bold mb-2">Notice Date (Today)</label>
                                <div className="bg-[#060D1A] border border-[#1A2A3A] rounded-xl px-4 py-3 text-[#556677] font-mono text-sm cursor-not-allowed">
                                    October 15, 2025
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#8899AA] text-sm font-bold mb-2">Requested Last Working Day (LWD)</label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#556677]" />
                                    <input type="date" value={lwd} onChange={(e) => setLwd(e.target.value)} className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 pl-12 text-white font-mono text-sm focus:border-amber-500 outline-none transition-colors" />
                                </div>
                                <div className="text-xs text-[#556677] mt-2 font-bold">Recommended standard LWD: Dec 14, 2025</div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end">
                            <button onClick={() => setStep(2)} disabled={!lwd} className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-sm">
                                Continue to Survey <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold text-white mb-6">Reason for Leaving</h2>

                        <div className="space-y-6 max-w-2xl">
                            <div>
                                <label className="block text-[#8899AA] text-sm font-bold mb-3">Primary Reason (Required)</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Better Compensation', 'Career Growth', 'Relocation', 'Higher Education', 'Health / Personal', 'Work Environment'].map((r, i) => (
                                        <div key={i} className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] hover:border-amber-500/50 rounded-xl px-4 py-3 cursor-pointer transition-colors text-white text-sm font-bold text-center">
                                            {r}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <label className="block text-[#8899AA] text-sm font-bold mb-2">Formal Resignation Letter / Remarks</label>
                                <textarea rows={5} placeholder="Please provide your formal resignation remarks here. This will be visible to your manager and HR..."
                                    className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 outline-none transition-colors resize-none"></textarea>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-between">
                            <button onClick={() => setStep(1)} className="text-[#8899AA] font-bold hover:text-white transition-colors">Back</button>
                            <button onClick={() => setStep(3)} className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-sm">
                                Review & Submit <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 text-center py-8">
                        <div className="w-20 h-20 bg-amber-500/10 border-2 border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle size={40} className="text-amber-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Confirm Submission</h2>
                        <p className="text-[#8899AA] mb-8 max-w-md mx-auto text-sm leading-relaxed">
                            Upon submission, your resignation request will be routed to your reporting manager for approval. The offboarding and clearance workflows will automatically initiate.
                        </p>

                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 max-w-md mx-auto mb-10 text-left">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[#556677] text-xs font-bold uppercase tracking-wider">Requested LWD:</span>
                                <span className="text-white font-mono font-bold">{lwd}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#556677] text-xs font-bold uppercase tracking-wider">Manager:</span>
                                <span className="text-white font-bold text-sm">Alexandra Smith</span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl text-[#8899AA] font-bold border border-[#2A3A4A] hover:bg-[#1A2A3A] transition-colors">Go Back</button>
                            <button className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-rose-500/20">
                                <Check size={18} /> Submit Resignation
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    
        </Page>
    );
}
