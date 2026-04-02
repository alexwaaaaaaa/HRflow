"use client";

import React, { useState } from "react";
import { AlertOctagon, User, BookOpen, UploadCloud, RefreshCw, X, ChevronLeft, Building2, CheckCircle2 } from "lucide-react";

export default function PayrollErrorDetailPage() {
    const [resolved, setResolved] = useState(false);

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Back navigation & Header */}
                <div className="mb-8">
                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4">
                        <ChevronLeft className="w-4 h-4" /> Back to Exception Dashboard
                    </button>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="bg-[#FF4444]/10 text-[#FF4444] px-3 py-1 rounded-md text-sm border border-[#FF4444]/20 font-bold uppercase tracking-wider">Critical Error</span>
                        PAN Name Mismatch
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Main Error Detail (Left 2 cols) */}
                    <div className="md:col-span-2 space-y-6">

                        {/* The Discrepancy */}
                        <div className="bg-[#0A1420] border border-[#FF4444]/40 rounded-xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#FF4444]"></div>
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#FF4444]/10 flex items-center justify-center shrink-0">
                                    <AlertOctagon className="w-5 h-5 text-[#FF4444]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Income Tax Dept Validation Failed</h3>
                                    <p className="text-sm text-gray-400 mt-1">The name linked to the provided PAN does not exactly match the legal name in the HRFlow system. Direct deposit and TDS filing will fail.</p>
                                </div>
                            </div>

                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-5">
                                <div className="grid grid-cols-2 gap-8 relative">
                                    {/* Line separating comparisons */}
                                    <div className="absolute left-1/2 top-2 bottom-2 w-px bg-[#1A2A3A] -translate-x-1/2 hidden md:block"></div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2"><Building2 className="w-3.5 h-3.5" /> HRFlow System Data</p>
                                        <div className="p-3 bg-[#1A2A3A]/30 rounded border border-[#1A2A3A]">
                                            <p className="font-mono text-gray-400 text-xs mb-1">PAN Number: <span className="text-white">ABCDE1234F</span></p>
                                            <p className="font-mono text-gray-400 text-xs">Legal Name: <span className="font-bold text-[#FF4444] bg-[#FF4444]/10 px-1 rounded">SONIA DAS</span></p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-semibold text-[#0066FF] uppercase tracking-wider flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> NSDL / Tax Dept Data</p>
                                        <div className="p-3 bg-[#0066FF]/5 rounded border border-[#0066FF]/20">
                                            <p className="font-mono text-gray-400 text-xs mb-1">PAN Number: <span className="text-white">ABCDE1234F</span></p>
                                            <p className="font-mono text-gray-400 text-xs">Valid Name: <span className="font-bold text-[#00E5A0]">SONIYA D</span></p>
                                        </div>
                                        <p className="text-[10px] text-gray-500 italic mt-1 text-right">Source: Auto-fetched via API on 05 Mar 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resolution Area */}
                        <div className={`bg-[#0A1420] border ${resolved ? 'border-[#00E5A0]/50' : 'border-[#1A2A3A]'} rounded-xl p-6 transition-colors`}>
                            <h3 className="text-lg font-semibold text-white mb-5">Resolution Actions</h3>

                            {!resolved ? (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Correction Strategy</label>
                                        <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-3 outline-none focus:border-[#0066FF]">
                                            <option>Update HR System Name to match PAN</option>
                                            <option>Request Employee to update PAN (Exclude from Run)</option>
                                            <option>Update PAN Number (Typo fix)</option>
                                        </select>
                                    </div>

                                    <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-4 pb-5">
                                        <label className="block text-sm font-medium text-gray-400 mb-3">Sync Name to 'SONIYA D&apos;</label>
                                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">This will permanently change the legal name on record in the HR core database and automatically generate an updated CTC letter.</p>

                                        <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-[#334155] rounded-xl hover:bg-[#1A2A3A]/30 hover:border-gray-500 cursor-pointer transition-colors group">
                                            <div className="flex flex-col items-center">
                                                <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors mb-2" />
                                                <span className="text-sm font-medium text-gray-300">Upload supporting ID proof (Aadhaar/PAN Card)</span>
                                            </div>
                                            <input type="file" className="hidden" />
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-3 pt-4">
                                        <button
                                            onClick={() => setResolved(true)}
                                            className="flex-1 flex justify-center items-center gap-2 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black py-3 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-[#00E5A0]/20"
                                        >
                                            <RefreshCw className="w-4 h-4" /> Apply Fix & Recalculate This Record
                                        </button>
                                        <button className="px-5 py-3 border border-gray-600 hover:border-gray-400 text-gray-300 rounded-lg text-sm font-medium transition-colors">
                                            Hold Payroll
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                                    <div className="w-16 h-16 rounded-full bg-[#00E5A0]/10 flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-[#00E5A0]" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Conflict Resolved</h4>
                                    <p className="text-gray-400 text-sm max-w-sm">Legal name updated to &quot;SONIYA D&quot;. The payroll record has been successfully recalculated and cleared from the exception list.</p>
                                    <button className="mt-6 text-[#00E5A0] font-medium text-sm hover:underline">Return to Dashboard</button>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Panel - Employee Context */}
                    <div className="md:col-span-1 space-y-6">

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 sticky top-6">
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">Employee Profile</h4>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center border border-[#334155]">
                                    <User className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-white text-lg leading-tight mb-0.5">Sonia Das</h5>
                                    <p className="text-xs text-gray-500 font-mono">EMP450</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-[#060B14] p-3 rounded border border-[#1A2A3A]">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Department</p>
                                    <p className="text-sm font-medium text-white">Marketing</p>
                                </div>
                                <div className="bg-[#060B14] p-3 rounded border border-[#1A2A3A]">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Grade / Band</p>
                                    <p className="text-sm font-medium text-white">M2 - Manager</p>
                                </div>
                                <div className="bg-[#060B14] p-3 rounded border border-[#1A2A3A]">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Gross Monthly</p>
                                    <p className="text-sm font-bold text-white font-mono">₹85,000</p>
                                </div>
                                <div className="bg-[#060B14] p-3 rounded border border-[#1A2A3A]">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Status</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-[#FF4444]"></div>
                                        <p className="text-sm font-medium text-[#FF4444]">Payroll Blocked</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2 border border-gray-600 hover:border-white hover:text-white transition-colors text-sm rounded text-gray-300 font-medium">
                                View Full Profile
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
