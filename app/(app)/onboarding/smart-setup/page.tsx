"use client";
import React, { useState } from 'react';
import { Bot, UploadCloud, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AiSmartOnboardingScreen() {
    const [status, setStatus] = useState<'upload' | 'analyzing' | 'success'>('upload');

    const handleUpload = () => {
        setStatus('analyzing');
        setTimeout(() => setStatus('success'), 4000);
    };

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto flex flex-col justify-center">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/20 relative">
                    {status === 'analyzing' && <div className="absolute inset-0 border-2 border-indigo-400 rounded-2xl animate-ping" />}
                    <Bot className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-black text-white mb-2">Smart HR Setup</h1>
                <p className="text-[#8899AA] text-base max-w-xl mx-auto">
                    Upload your company's existing Employee Handbook or HR Policy document. Kaarya's AI will automatically extract and configure your leave rules, working hours, and holiday calendar.
                </p>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[400px] flex flex-col justify-center">
                {/* Decorative AI Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                {status === 'upload' && (
                    <div className="relative z-10 animate-fade-in text-center">
                        <div className="w-full max-w-lg mx-auto border-2 border-dashed border-[#2A3A4A] hover:border-indigo-500/50 hover:bg-[#131B2B]/50 transition-all rounded-xl p-10 cursor-pointer group flex flex-col items-center">
                            <UploadCloud size={48} className="text-[#556677] group-hover:text-indigo-400 mb-4 transition-colors" />
                            <h3 className="text-white font-bold mb-1">Drag & drop your policy PDF</h3>
                            <p className="text-sm text-[#556677] mb-6">Supports .pdf, .docx (Max 10MB)</p>
                            <button onClick={handleUpload} className="bg-[#1A2A3A] group-hover:bg-[#2A3A4A] text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors border border-[#2A3A4A]">
                                Browse Files
                            </button>
                        </div>
                    </div>
                )}

                {status === 'analyzing' && (
                    <div className="relative z-10 animate-fade-in text-center flex flex-col items-center">
                        <div className="w-20 h-20 relative mb-8">
                            <div className="absolute inset-0 border-4 border-[#1A2A3A] rounded-full" />
                            <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent rounded-full animate-spin" />
                            <FileText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Analyzing HR Document...</h3>
                        <div className="space-y-2 text-sm font-mono text-[#8899AA]">
                            <p className="text-indigo-300">Scanning for leave types...</p>
                            <p>Extracting public holidays...</p>
                            <p>Identifying standard shift timings...</p>
                        </div>
                    </div>
                )}

                {status === 'success' && (
                    <div className="relative z-10 animate-fade-in">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                                <CheckCircle2 className="text-emerald-400" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Policies Extracted Successfully!</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                            <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Found 3 Leave Types</div>
                                <ul className="text-sm text-white space-y-1">
                                    <li>Casual Leave: 12 days/yr</li>
                                    <li>Sick Leave: 7 days/yr (Requires Note)</li>
                                    <li>Annual Leave: 15 days/yr</li>
                                </ul>
                            </div>
                            <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Work Timings</div>
                                <ul className="text-sm text-white space-y-1">
                                    <li>09:30 AM to 06:30 PM</li>
                                    <li>Monday - Friday</li>
                                    <li>45 min lunch break</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button onClick={() => window.location.href = '/onboarding/checklist'} className="bg-white text-[#060D1A] px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
                                Review & Apply Settings <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
