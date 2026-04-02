"use client";
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Upload, Send } from 'lucide-react';
import Link from 'next/link';

export default function CandidateApplyScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#060D1A] py-10 px-6">
            <div className="max-w-3xl mx-auto space-y-8">

                <Link href="/candidate/job-detail" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 inline-flex"><ArrowLeft size={16} /> Back to Job Description</Link>

                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Apply for Senior Frontend Engineer</h1>
                    <p className="text-[#8899AA]">Please complete your application below. Fields marked with * are required.</p>
                </div>

                <div className="flex items-center justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#1A2A3A] -translate-y-1/2 pointer-events-none"></div>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-indigo-600 -translate-y-1/2 pointer-events-none transition-all" style={{ width: step === 1 ? '50%' : '100%' }}></div>

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 font-bold ${step >= 1 ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>1</div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 font-bold ${step >= 2 ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>2</div>
                </div>

                {step === 1 && (
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold text-white border-b border-[#1A2A3A] pb-4 mb-6">Personal details & Resume</h2>

                        <div className="border border-dashed border-[#2A3A4A] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 transition-colors bg-[#131B2B]">
                            <Upload size={32} className="text-[#556677] mb-3" />
                            <div className="text-white font-bold mb-1">Upload Resume (PDF, DOCX)</div>
                            <div className="text-[#556677] text-sm max-w-sm mb-4">We will automatically parse your resume and prepopulate the fields below.</div>
                            <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white font-bold px-6 py-2 rounded-xl text-sm transition-colors">Browse Files</button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">First Name *</label>
                                <input type="text" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">Last Name *</label>
                                <input type="text" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">Email *</label>
                                <input type="email" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">Phone</label>
                                <input type="tel" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <button onClick={() => setStep(2)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-colors">
                                Next Step
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold text-white border-b border-[#1A2A3A] pb-4 mb-6">Additional Questions</h2>

                        <div>
                            <label className="block text-[#8899AA] text-xs font-bold mb-2">LinkedIn Profile URL</label>
                            <input type="url" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                        </div>

                        <div>
                            <label className="block text-[#8899AA] text-xs font-bold mb-2">GitHub / Portfolio URL</label>
                            <input type="url" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                        </div>

                        <div>
                            <label className="block text-[#8899AA] text-xs font-bold mb-2">Will you now or in the future require sponsorship for employment visa status? *</label>
                            <select className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors appearance-none">
                                <option value="">Select option...</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[#8899AA] text-xs font-bold mb-2">Why are you interested in joining HRFlow? (Optional)</label>
                            <textarea rows={4} className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors resize-none"></textarea>
                        </div>

                        <div className="flex justify-between pt-6 border-t border-[#1A2A3A]">
                            <button onClick={() => setStep(1)} className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                                Back
                            </button>
                            <Link href="/candidate/status" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2">
                                <Send size={18} /> Submit Application
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
