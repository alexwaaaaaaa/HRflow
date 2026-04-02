"use client";

import React, { useState } from 'react';
import {
    Calculator, Info, FileText, Upload, AlertCircle,
    ArrowRight, History, Download
} from 'lucide-react';

export default function Section89Relief() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
                            Relief Under Section 89(1)
                        </h1>
                        <p className="text-sm text-[#8899AA]">Calculate and claim tax relief on salary arrears or advance salary.</p>
                    </div>
                </div>

                {/* Banner */}
                <div className="bg-[#0066FF]/10 border border-[#0066FF]/20 rounded-xl p-4 flex items-start space-x-3">
                    <Info size={20} className="text-[#0066FF] mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                        <h4 className="font-bold text-white mb-1">What is Section 89 Relief?</h4>
                        <p className="text-[#8899AA]">If you received salary arrears or advance salary resulting in higher tax liability in the current year, you can claim relief under Section 89. You must file <strong>Form 10E</strong> on the IT portal to claim this.</p>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-[#1A2A3A]">
                        <h2 className="text-lg font-bold text-white mb-4">Add Arrears Detail</h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Arrears For Financial Year</label>
                                <select className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]">
                                    <option>Select FY...</option>
                                    <option>2022-23</option>
                                    <option>2021-22</option>
                                    <option>2020-21</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Arrears Amount Received Now</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-[#8899AA] font-bold">₹</span>
                                    <input
                                        type="number"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                        placeholder="e.g. 150000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Total Income (Excl. Arrears) in Past FY</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-[#8899AA] font-bold">₹</span>
                                    <input
                                        type="number"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Upload Arrear Letter / Proof</label>
                                <button className="w-full bg-[#1A2A3A] border border-[#2A3A4A] border-dashed rounded-lg py-2.5 px-4 text-sm text-[#00E5A0] hover:bg-[#2A3A4A] transition-colors flex items-center justify-center font-bold">
                                    <Upload size={16} className="mr-2" /> Select Document
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="px-6 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center">
                                Calculate Relief <ArrowRight size={16} className="ml-2" />
                            </button>
                        </div>
                    </div>

                    {/* Simulation Result Area (Mocked active state) */}
                    <div className="p-6 bg-[#060B14]">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                            <Calculator size={16} className="text-[#00E5A0] mr-2" /> Calculation Summary
                        </h3>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                <span className="text-sm text-slate-400">Tax on current income (including arrears)</span>
                                <span className="text-sm font-bold text-white">₹2,45,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                <span className="text-sm text-slate-400">Tax on current income (excluding arrears)</span>
                                <span className="text-sm font-bold text-white">₹1,90,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                <span className="text-sm text-[#0066FF] font-semibold pl-4">Diff (A) - Tax on Arrears in current year</span>
                                <span className="text-sm font-bold text-[#0066FF]">₹55,000</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A] mt-4">
                                <span className="text-sm text-slate-400">Tax on past year income (including arrears)</span>
                                <span className="text-sm font-bold text-white">₹1,60,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                <span className="text-sm text-slate-400">Tax on past year income (excluding arrears)</span>
                                <span className="text-sm font-bold text-white">₹1,25,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                <span className="text-sm text-[#0066FF] font-semibold pl-4">Diff (B) - Tax on Arrears in past year</span>
                                <span className="text-sm font-bold text-[#0066FF]">₹35,000</span>
                            </div>

                            <div className="flex justify-between items-center py-4 mt-4 bg-[#00E5A0]/10 px-4 rounded-lg border border-[#00E5A0]/20">
                                <span className="text-sm font-bold text-white uppercase tracking-wider">Eligible Relief under Sec 89 <span className="text-xs text-[#8899AA] ml-1">(A - B)</span></span>
                                <span className="text-xl font-black text-[#00E5A0]">₹20,000</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <button className="px-6 py-2.5 bg-transparent border border-[#2A3A4A] text-white font-bold text-sm rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center">
                                <Download size={16} className="mr-2" /> Download Form 10E Data
                            </button>
                            <button className="px-6 py-2.5 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors flex items-center shadow-[0_0_15px_rgba(0,229,160,0.2)]">
                                Submit Claim for Payroll
                            </button>
                        </div>
                    </div>
                </div>

                {/* History */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                        <History size={16} className="text-[#8899AA] mr-2" /> Past Submissions
                    </h3>
                    <p className="text-sm text-[#8899AA] italic">No past Section 89 claims found.</p>
                </div>

            </div>
        </div>
    );
}
