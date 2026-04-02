"use client";
import React from 'react';
import { Activity, ArrowLeft, Download, Filter } from 'lucide-react';
import Link from 'next/link';

export default function GrossToNetScreen() {
    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/payroll/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Payroll Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Activity size={22} className="text-indigo-400" /> Gross to Net Report</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Detailed variance of earnings, deductions, and net pay across payroll months.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-indigo-500 outline-none">
                        <option>March 2026</option>
                        <option>February 2026</option>
                        <option>January 2026</option>
                    </select>
                    <button className="flex items-center gap-2 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <Download size={16} /> Export Output
                    </button>
                </div>
            </div>

            {/* Sankey / Flow diagram representation */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 relative">
                <h3 className="text-white font-bold text-center mb-8">March 2026 — Organization Wide Rollup</h3>
                <div className="flex justify-between w-full max-w-4xl mx-auto items-stretch h-40">
                    <div className="flex flex-col justify-center items-center bg-indigo-500/10 border border-indigo-500/30 rounded-2xl w-48 z-10">
                        <span className="text-indigo-400 font-black text-2xl">₹5.24 Cr</span>
                        <span className="text-[#8899AA] text-xs font-bold uppercase mt-1">Gross Earnings</span>
                    </div>

                    <div className="flex-1 relative">
                        {/* Lines representing deductions and net */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-indigo-500/20" />

                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <span className="text-red-400 font-bold">₹0.85 Cr</span>
                            <span className="text-[#556677] text-[10px] uppercase font-bold mt-1">Total Deductions</span>
                            <div className="w-px h-12 bg-red-400/30 mt-2" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl w-48 z-10 relative">
                        <span className="text-emerald-400 font-black text-2xl">₹4.39 Cr</span>
                        <span className="text-[#8899AA] text-xs font-bold uppercase mt-1">Net Payable</span>
                    </div>
                </div>

                {/* Breakdown details */}
                <div className="grid grid-cols-2 max-w-4xl mx-auto mt-12 gap-12">
                    <div>
                        <div className="text-indigo-300 text-sm font-bold border-b border-[#1A2A3A] pb-2 mb-3">Earnings Breakdown</div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-[#8899AA]"><span>Basic Pay</span> <span className="text-white">₹2.10 Cr</span></div>
                            <div className="flex justify-between text-[#8899AA]"><span>HRA</span> <span className="text-white">₹0.95 Cr</span></div>
                            <div className="flex justify-between text-[#8899AA]"><span>Special Allowance</span> <span className="text-white">₹1.80 Cr</span></div>
                            <div className="flex justify-between text-[#8899AA]"><span>Bonus / Arrears</span> <span className="text-white">₹0.39 Cr</span></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-red-300 text-sm font-bold border-b border-[#1A2A3A] pb-2 mb-3">Deductions Breakdown</div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-[#8899AA]"><span>TDS (Income Tax)</span> <span className="text-white">₹0.71 Cr</span></div>
                            <div className="flex justify-between text-[#8899AA]"><span>PF (Employee)</span> <span className="text-white">₹0.11 Cr</span></div>
                            <div className="flex justify-between text-[#8899AA]"><span>Professional Tax</span> <span className="text-white">₹0.02 Cr</span></div>
                            <div className="flex justify-between text-[#8899AA]"><span>LWF / Escrow</span> <span className="text-white">₹0.01 Cr</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
