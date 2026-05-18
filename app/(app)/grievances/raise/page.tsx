"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { ShieldAlert, Info, UploadCloud, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RaiseGrievanceScreen() {
    const [step, setStep] = useState(1);
    const [isAnonymous, setIsAnonymous] = useState(false);

    return (
        <Page
            title="Raise a Grievance"
            subtitle="We take all reports seriously. This portal is strictly confidential and managed by the central IC committee."
            breadcrumbs={[{ label: "Grievances", href: "/grievances" }, { label: "Raise" }]}
            maxWidth="800px"
        >

        <div className="min-h-screen p-6 max-w-3xl mx-auto flex flex-col justify-center py-12">

            <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl mx-auto flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-500/10">
                    <ShieldAlert size={28} />
                </div>
                <h1 className="text-3xl font-black text-white mb-2">Raise a Grievance</h1>
                <p className="text-[#8899AA] text-sm">We take all reports seriously. This portal is strictly confidential and managed by the central IC committee.</p>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-[#131B2B]">
                    <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
                </div>

                {step === 1 && (
                    <div className="animate-fade-in space-y-6 mt-4">
                        <h2 className="text-xl font-bold text-white border-b border-[#1A2A3A] pb-4">Incident Details</h2>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Category of Issue</label>
                            <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 appearance-none">
                                <option value="">Select a category...</option>
                                <option value="posh">Workplace Harassment (POSH)</option>
                                <option value="manager">Conflict with Manager/Colleague</option>
                                <option value="policy">Ethics & Policy Violation</option>
                                <option value="discrimination">Discrimination/Bias</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Incident Location / Project context</label>
                            <input type="text" placeholder="e.g. Bangalore Office, Marketing Team, Remote" className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-rose-500" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Detailed Description</label>
                            <textarea
                                rows={6}
                                placeholder="Please describe the incident objectively. Include dates, times, and specific remarks if applicable..."
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-rose-500 resize-none text-sm leading-relaxed"
                            />
                            <p className="text-xs text-[#556677] flex items-center gap-1 mt-1"><Info size={12} /> Be as detailed as possible to aid the investigation.</p>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in space-y-6 mt-4">
                        <h2 className="text-xl font-bold text-white border-b border-[#1A2A3A] pb-4">Evidence & Parties Involved</h2>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Who is the complaint against? (Optional)</label>
                            <input type="text" placeholder="Name or Department" className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-rose-500" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Were there any witnesses? (Optional)</label>
                            <input type="text" placeholder="Names of people who saw or heard the incident" className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-rose-500" />
                        </div>

                        <div className="space-y-2 pt-4">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Supporting Evidence (Emails, Screenshots, Docs)</label>
                            <div className="border-2 border-dashed border-[#2A3A4A] rounded-xl p-8 hover:border-[#3A4A5A] hover:bg-[#131B2B] transition-colors cursor-pointer text-center group">
                                <UploadCloud size={32} className="text-[#556677] group-hover:text-rose-400 mx-auto mb-3 transition-colors" />
                                <h4 className="text-white font-bold mb-1 text-sm">Click to upload files or drag and drop</h4>
                                <p className="text-xs text-[#556677]">PDF, JPG, PNG, DOC (max 10MB each)</p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in space-y-6 mt-4">
                        <h2 className="text-xl font-bold text-white border-b border-[#1A2A3A] pb-4">Anonymity & Consent</h2>

                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#0A1420] p-2 rounded-lg border border-[#1A2A3A] text-indigo-400">
                                        <Lock size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">Report Anonymously</h3>
                                        <p className="text-xs text-[#8899AA] mt-0.5">Your identity will be hidden from the investigation team.</p>
                                    </div>
                                </div>
                                {/* Custom Toggle */}
                                <div
                                    className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative flex items-center ${isAnonymous ? 'bg-indigo-600' : 'bg-[#2A3A4A]'}`}
                                    onClick={() => setIsAnonymous(!isAnonymous)}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-md absolute transition-transform ${isAnonymous ? 'translate-x-7' : 'translate-x-1'}`} />
                                </div>
                            </div>

                            {isAnonymous && (
                                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 text-sm text-indigo-300 flex items-start gap-2">
                                    <Info size={16} className="shrink-0 mt-0.5" />
                                    <p>While anonymous reporting protects your identity, it may limit the committee's ability to fully investigate or take disciplinary action if evidence is inconclusive.</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-[#1A2A3A]">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <span className="w-5 h-5 rounded border border-[#3A4A5A] group-hover:border-rose-500 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                    <CheckCircle2 size={14} className="text-rose-500 opacity-0 group-hover:opacity-50" />
                                </span>
                                <span className="text-sm text-[#8899AA]">I confirm that the information provided is accurate and true to the best of my knowledge. False claims are a violation of company policy.</span>
                            </label>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mt-10">
                    <button
                        onClick={() => setStep(Math.max(1, step - 1))}
                        className={`text-sm font-bold transition-colors px-4 py-2 ${step === 1 ? 'text-transparent pointer-events-none' : 'text-[#8899AA] hover:text-white'}`}
                    >
                        Previous Step
                    </button>

                    {step < 3 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="bg-white text-[#0A1420] hover:bg-gray-200 px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg"
                        >
                            Continue <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={() => window.location.href = '/grievances/dashboard'}
                            className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-rose-500/30"
                        >
                            Submit Grievance <ShieldAlert size={16} />
                        </button>
                    )}
                </div>

            </div>
        </div>
    
        </Page>
    );
}
