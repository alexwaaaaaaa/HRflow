"use client";

import React, { useState } from 'react';
import {
    Briefcase, FileText, CheckCircle2, AlertCircle,
    Upload, Building2, Calendar, IndianRupee
} from 'lucide-react';

export default function Form12BScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
                            <Briefcase size={24} className="mr-3 text-[#FFB800]" />
                            Form 12B (Previous Employer Income)
                        </h1>
                        <p className="text-sm text-[#8899AA]">Declare income and TDS from your previous employer(s) for the current financial year.</p>
                    </div>
                    <div>
                        <span className="bg-[#1A2A3A] border border-[#2A3A4A] px-3 py-1 rounded-lg text-xs font-bold text-[#8899AA]">FY 2024-25</span>
                    </div>
                </div>

                <div className="bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-xl p-4 flex items-start space-x-3">
                    <AlertCircle size={20} className="text-[#FFB800] mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                        <h4 className="font-bold text-[#FFB800] mb-1">Mandatory for Mid-Year Joiners</h4>
                        <p className="text-[#8899AA]">Failure to declare previous income may result in short deduction of TDS and subsequent interest penalty under section 234B/C by the Income Tax Department.</p>
                    </div>
                </div>

                {/* Form Wrapper */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg">

                    <div className="px-6 py-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <h3 className="font-bold text-white">Employer Details</h3>
                        <div className="flex space-x-2">
                            <span className="w-2 h-2 rounded-full bg-[#00E5A0]"></span>
                            <span className="w-2 h-2 rounded-full bg-[#1A2A3A]"></span>
                        </div>
                    </div>

                    <div className="p-6 space-y-8">

                        {/* Employer Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 md:col-span-1">
                                <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Previous Employer Name</label>
                                <div className="relative">
                                    <Building2 size={16} className="absolute left-3 top-3 text-[#556677]" />
                                    <input
                                        type="text"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#FFB800]"
                                        placeholder="e.g. Acme Corp Pvt Ltd"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Employer TAN</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#FFB800] uppercase font-mono"
                                    placeholder="e.g. BLRA12345E"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Worked From</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-3 text-[#556677]" />
                                    <input
                                        type="date"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:border-[#FFB800]"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Worked Till (Leaving Date)</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-3 text-[#556677]" />
                                    <input
                                        type="date"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:border-[#FFB800]"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        {/* Income Details */}
                        <div>
                            <h4 className="text-sm font-bold text-white mb-4">Income & Deduction Details</h4>
                            <div className="grid grid-cols-2 gap-6">
                                <AmountInput label="Gross Salary Received" />
                                <AmountInput label="Total Tax Deducted (TDS)" highlight />
                                <AmountInput label="Professional Tax Deducted" />
                                <AmountInput label="Provident Fund (EPF) Deducted" />

                                <div className="col-span-2 mt-2">
                                    <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider block mb-2">Upload Form 16 / Full & Final Settlement Letter</label>
                                    <div className="border border-dashed border-[#2A3A4A] rounded-xl bg-[#060B14] p-6 text-center hover:bg-[#1A2A3A]/50 transition-colors cursor-pointer group">
                                        <div className="w-12 h-12 bg-[#1A2A3A] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <Upload size={20} className="text-[#00E5A0]" />
                                        </div>
                                        <div className="text-sm font-bold text-white">Click to upload document or drag and drop</div>
                                        <div className="text-xs text-[#8899AA] mt-1">PDF, JPG or PNG (max 5MB)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="px-6 py-4 border-t border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <div className="text-xs text-[#8899AA] flex items-center">
                            <CheckCircle2 size={14} className="mr-1.5" /> Auto-saves draft
                        </div>
                        <button className="px-6 py-2.5 bg-[#FFB800] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#e6a600] transition-colors">
                            Save and Continue
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

function AmountInput({ label, highlight }: any) {
    return (
        <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${highlight ? 'text-[#FFB800]' : 'text-[#8899AA]'}`}>
                {label}
            </label>
            <div className="relative">
                <IndianRupee size={16} className={`absolute left-3 top-3 ${highlight ? 'text-[#FFB800]/70' : 'text-[#556677]'}`} />
                <input
                    type="number"
                    className={`w-full bg-[#060B14] border rounded-lg py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none ${highlight ? 'border-[#FFB800]/50 focus:border-[#FFB800]' : 'border-[#2A3A4A] focus:border-[#00E5A0]'}`}
                    placeholder="0"
                />
            </div>
        </div>
    );
}
