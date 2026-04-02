"use client";

import React, { useState } from 'react';
import {
    AlertTriangle, RefreshCw, Upload, Download,
    FileArchive, ArrowRight, ShieldCheck, CheckCircle2,
    FileEdit, Database
} from 'lucide-react';

export default function RevisedReturn24QScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
                            <FileEdit size={24} className="mr-3 text-[#FFB800]" />
                            Revised TDS Return (Form 24Q)
                        </h1>
                        <p className="text-sm text-[#8899AA]">File a correction statement for previously filed quarterly returns.</p>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-xl p-4 flex items-start space-x-3">
                    <AlertTriangle size={20} className="text-[#FFB800] mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                        <h4 className="font-bold text-[#FFB800] mb-1">When to file a revised return?</h4>
                        <p className="text-[#8899AA]">Revised returns (correction statements) are needed if there are incorrect PANs, challan mismatches, or omitted entries in the original filing. You will need the Consolidated File from the TRACES portal to begin this process.</p>
                    </div>
                </div>

                {/* Main Stepper Card */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg overflow-hidden">

                    {/* Steps Header */}
                    <div className="grid grid-cols-3 border-b border-[#1A2A3A] bg-[#0A1420]">
                        <StepHeader num={1} title="Import Conso File" active={step >= 1} current={step === 1} />
                        <StepHeader num={2} title="Review & Correct" active={step >= 2} current={step === 2} />
                        <StepHeader num={3} title="Generate FVU" active={step >= 3} current={step === 3} />
                    </div>

                    <div className="p-8">
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Upload Consolidated (Conso) File</h3>
                                    <p className="text-sm text-[#8899AA] mb-6">Download the required Conso file (.tds) for the specific quarter from TRACES and upload it here.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Financial Year</label>
                                        <select className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#FFB800]">
                                            <option>2024-25</option>
                                            <option>2023-24</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Quarter</label>
                                        <select className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#FFB800]">
                                            <option>Q1</option>
                                            <option>Q2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="border-2 border-dashed border-[#2A3A4A] rounded-xl bg-[#060B14] p-8 text-center hover:bg-[#1A2A3A]/50 transition-colors cursor-pointer group">
                                    <div className="w-16 h-16 bg-[#1A2A3A] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-[#FFB800]">
                                        <Database size={24} />
                                    </div>
                                    <div className="text-base font-bold text-white mb-1">Click to browse or drag .tds file here</div>
                                    <div className="text-xs text-[#8899AA]">Password protected file from TRACES (usually TAN_REQID)</div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-[#1A2A3A]">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="px-6 py-2.5 bg-[#FFB800] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#e6a600] transition-colors flex items-center"
                                    >
                                        Process File <ArrowRight size={16} className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                                        <CheckCircle2 size={20} className="text-[#00E5A0] mr-2" />
                                        File Parsed Successfully
                                    </h3>
                                    <p className="text-sm text-[#8899AA]">Q2 2024-25 • PRN: 0001004122390 • Original Return</p>
                                </div>

                                <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl overflow-hidden">
                                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                                        <h4 className="font-bold text-white text-sm">Select Correction Type</h4>
                                    </div>
                                    <div className="divide-y divide-[#1A2A3A]">
                                        <label className="flex items-center p-4 hover:bg-[#1A2A3A]/40 cursor-pointer">
                                            <input type="radio" name="ctype" className="accent-[#FFB800] w-4 h-4 mr-4" />
                                            <div>
                                                <div className="text-sm font-bold text-white">C1: Update Challan Details</div>
                                                <div className="text-xs text-[#8899AA]">Correct BSR code, date, challan serial number</div>
                                            </div>
                                        </label>
                                        <label className="flex items-center p-4 hover:bg-[#1A2A3A]/40 cursor-pointer">
                                            <input type="radio" name="ctype" className="accent-[#FFB800] w-4 h-4 mr-4" defaultChecked />
                                            <div>
                                                <div className="text-sm font-bold text-white flex items-center">
                                                    C2: Update Deductee Details <span className="ml-2 bg-[#0066FF]/20 text-[#0066FF] px-2 py-0.5 rounded text-[10px]">Auto-mapping available</span>
                                                </div>
                                                <div className="text-xs text-[#8899AA]">Correct PAN, amount paid, TDS amount</div>
                                            </div>
                                        </label>
                                        <label className="flex items-center p-4 hover:bg-[#1A2A3A]/40 cursor-pointer">
                                            <input type="radio" name="ctype" className="accent-[#FFB800] w-4 h-4 mr-4" />
                                            <div>
                                                <div className="text-sm font-bold text-white">C9: Replace/Delete Challan</div>
                                                <div className="text-xs text-[#8899AA]">Map unmatched challans to deductees</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="p-4 bg-[#0066FF]/10 border border-[#0066FF]/20 rounded-xl flex items-start space-x-3 text-sm">
                                    <RefreshCw size={18} className="text-[#0066FF] mt-0.5 flex-shrink-0" />
                                    <div>
                                        <strong className="text-white block mb-1">HRFlow Auto-Correction matches found!</strong>
                                        <span className="text-[#8899AA]">Based on HRFlow's database, we found <strong>2 instances</strong> where PAN was later updated. We can auto-apply these C2 corrections to the Conso file.</span>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4 border-t border-[#1A2A3A]">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="px-4 py-2 bg-transparent text-[#8899AA] font-bold text-sm rounded-lg hover:text-white transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setStep(3)}
                                        className="px-6 py-2.5 bg-[#FFB800] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#e6a600] transition-colors flex items-center shadow-[0_0_15px_rgba(255,184,0,0.2)]"
                                    >
                                        Review Changes & Next <ArrowRight size={16} className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex flex-col items-center justify-center p-8 border border-[#1A2A3A] rounded-2xl bg-[#060B14] mt-4 animate-in fade-in zoom-in-95 duration-500">

                                <div className="w-20 h-20 bg-[#00E5A0]/10 rounded-full flex items-center justify-center mb-6 relative border border-[#00E5A0]/20">
                                    <FileArchive size={32} className="text-[#00E5A0]" />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#060B14] border flex items-center justify-center border-[#00E5A0]">
                                        <ShieldCheck size={16} className="text-[#00E5A0]" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white text-center mb-2">Correction File Ready</h3>
                                <p className="text-sm text-[#8899AA] text-center mb-6 max-w-[320px]">
                                    2 deductee PAN corrections applied successfully. The revised file is ready for FVU validation.
                                </p>

                                <button
                                    className="w-full max-w-xs py-3.5 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-xl hover:bg-[#00c98d] transition-colors flex items-center justify-center shadow-[0_0_20px_rgba(0,229,160,0.3)] mb-4"
                                >
                                    <Download size={18} className="mr-2" /> Download Revised TXT
                                </button>

                                <button className="text-sm text-[#0066FF] hover:underline font-semibold">
                                    Download Summary Report PDF
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

function StepHeader({ num, title, active, current }: any) {
    return (
        <div className={`p-4 flex flex-col items-center justify-center text-center ${current ? 'bg-[#1A2A3A]/40 border-b-2 border-[#FFB800]' : 'border-b-2 border-transparent opacity-50'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${active ? 'bg-[#FFB800] text-[#060B14]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>
                {num}
            </div>
            <div className={`text-sm font-bold ${active ? 'text-white' : 'text-[#8899AA]'}`}>{title}</div>
        </div>
    );
}
