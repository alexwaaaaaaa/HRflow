"use client";

import React, { useState } from 'react';
import {
    FileText, Download, ShieldCheck, CheckCircle2,
    AlertCircle, FileCheck, Info, Share2, Lock
} from 'lucide-react';

export default function Form16EmployeeView() {
    const [acknowledged, setAcknowledged] = useState(false);

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">My Form 16</h1>
                        <p className="text-sm text-[#8899AA]">Download your Annual TDS Certificate (Form 16) for tax filing.</p>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] px-4 py-2 rounded-xl flex items-center space-x-3 text-sm">
                        <span className="text-[#8899AA]">Financial Year:</span>
                        <select className="bg-transparent text-white font-bold outline-none cursor-pointer">
                            <option>2024-25</option>
                            <option>2023-24</option>
                            <option>2022-23</option>
                        </select>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg relative">

                    {/* Status Banner */}
                    <div className="bg-[#00E5A0]/10 border-b border-[#00E5A0]/20 px-6 py-4 flex items-start space-x-3">
                        <CheckCircle2 size={24} className="text-[#00E5A0] mt-0.5" />
                        <div>
                            <h3 className="text-base font-bold text-[#00E5A0]">Form 16 is Ready to Download</h3>
                            <p className="text-sm text-[#8899AA] mt-1">Your Form 16 for FY 2024-25 has been successfully generated and digitally signed by the company.</p>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-2 gap-8">

                        {/* Summary Details */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-3">TDS Summary</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                        <span className="text-sm text-slate-300">Gross Salary Paid</span>
                                        <span className="text-sm font-bold text-white">₹14,50,000</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                        <span className="text-sm text-slate-300">Net Taxable Income</span>
                                        <span className="text-sm font-bold text-white">₹11,00,000</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                        <span className="text-sm text-slate-300">Total Tax Deducted</span>
                                        <span className="text-sm font-bold text-[#00E5A0]">₹1,25,000</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#1A2A3A]/50 p-4 rounded-lg border border-[#2A3A4A] flex items-start space-x-3">
                                <Lock size={18} className="text-[#8899AA] mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold text-white">Password Protected</h4>
                                    <p className="text-xs text-[#8899AA] mt-1">The downloaded PDF is password protected. The password is your PAN mapped in lowercase (e.g. <strong>aaapz1234a</strong>).</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <h4 className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-3">Download Options</h4>

                            <button className="w-full flex items-center justify-between p-4 bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl hover:bg-[#2A3A4A] transition-colors group">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-[#060B14] rounded-lg flex items-center justify-center text-[#ff3b30]">
                                        <FileText size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white">Combined Form 16 PDF</div>
                                        <div className="text-xs text-[#8899AA] mt-0.5">Part A + Part B (4 Pages)</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-[10px] bg-[#00E5A0]/20 text-[#00E5A0] px-2 py-1 rounded font-bold border border-[#00E5A0]/30 hidden group-hover:block">Recommended</span>
                                    <Download size={20} className="text-[#00E5A0]" />
                                </div>
                            </button>

                            <div className="flex space-x-4">
                                <button className="flex-1 flex items-center justify-between p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-[#2A3A4A] transition-colors">
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white">Part A Only</div>
                                        <div className="text-[10px] text-[#8899AA] mt-0.5">TRACES Gen.</div>
                                    </div>
                                    <Download size={16} className="text-[#8899AA]" />
                                </button>
                                <button className="flex-1 flex items-center justify-between p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-[#2A3A4A] transition-colors">
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white">Part B Only</div>
                                        <div className="text-[10px] text-[#8899AA] mt-0.5">Annexure</div>
                                    </div>
                                    <Download size={16} className="text-[#8899AA]" />
                                </button>
                            </div>

                            <button className="w-full mt-2 py-2.5 bg-transparent border border-[#1A2A3A] text-[#8899AA] font-semibold text-sm rounded-xl hover:bg-[#1A2A3A] hover:text-white transition-colors flex items-center justify-center">
                                <Share2 size={16} className="mr-2" /> Share securely with CA
                            </button>
                        </div>

                    </div>

                    {/* Acknowledgment Strip */}
                    <div className={`p-4 border-t border-[#1A2A3A] transition-colors ${acknowledged ? 'bg-[#00E5A0]/5' : 'bg-[#0A1420]'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start space-x-3">
                                <FileCheck size={20} className={acknowledged ? 'text-[#00E5A0]' : 'text-[#8899AA]'} />
                                <div>
                                    <div className="text-sm font-bold text-white">Acknowledge Receipt</div>
                                    <div className="text-xs text-[#8899AA] max-w-xl">By confirming, you acknowledge that you have received your Form 16 from the company for the relevant financial year.</div>
                                </div>
                            </div>
                            {acknowledged ? (
                                <div className="px-4 py-2 border border-[#00E5A0]/30 text-[#00E5A0] font-bold text-sm rounded-lg bg-[#00E5A0]/10 flex items-center">
                                    <CheckCircle2 size={16} className="mr-2" /> Acknowledged on 15 May, 2025
                                </div>
                            ) : (
                                <button
                                    onClick={() => setAcknowledged(true)}
                                    className="px-6 py-2 bg-[#1A2A3A] text-white font-bold text-sm rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors"
                                >
                                    Confirm Receipt
                                </button>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
