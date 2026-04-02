"use client";
import React, { useState } from 'react';
import { Landmark, ArrowLeft, Download, Upload, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PtLwfScreen() {
    const [activeTab, setActiveTab] = useState<'PT' | 'LWF'>('PT');

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/payroll/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2">
                <ArrowLeft size={14} /> Payroll Dashboard
            </Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Landmark size={22} className="text-amber-400" /> State Taxes (PT & LWF)
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Professional Tax and Labour Welfare Fund computations mapped by employee state</p>
                </div>
            </div>

            <div className="flex gap-4 border-b border-[#1A2A3A] pb-0">
                <button onClick={() => setActiveTab('PT')} className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'PT' ? 'border-amber-400 text-amber-400' : 'border-transparent text-[#556677] hover:text-white'}`}>
                    Professional Tax (PT)
                </button>
                <button onClick={() => setActiveTab('LWF')} className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${activeTab === 'LWF' ? 'border-pink-400 text-pink-400' : 'border-transparent text-[#556677] hover:text-white'}`}>
                    Labour Welfare Fund (LWF)
                </button>
            </div>

            {activeTab === 'PT' ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-3 gap-6">
                        {/* Karnataka */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold text-lg">Karnataka</h3>
                                <span className="text-[#556677] text-xs">March 2026</span>
                            </div>
                            <div className="text-amber-400 font-black text-3xl mb-1">₹34,000</div>
                            <div className="text-[#8899AA] text-xs">Total PT deducted across 170 employees</div>
                            <div className="mt-5 pt-4 border-t border-[#1A2A3A] flex justify-between gap-2">
                                <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2 rounded-lg text-xs transition-colors">Export Return</button>
                                <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2 rounded-lg text-xs transition-colors">Mark Paid</button>
                            </div>
                        </div>

                        {/* Maharashtra */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold text-lg">Maharashtra</h3>
                                <span className="text-[#556677] text-xs">March 2026</span>
                            </div>
                            <div className="text-amber-400 font-black text-3xl mb-1">₹37,000</div>
                            <div className="text-[#8899AA] text-xs">148 employees (+ ₹100 extra for Feb)</div>
                            <div className="mt-5 pt-4 border-t border-[#1A2A3A] flex justify-between gap-2">
                                <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2 rounded-lg text-xs transition-colors">Export Return</button>
                                <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2 rounded-lg text-xs transition-colors">Mark Paid</button>
                            </div>
                        </div>

                        {/* Tamil Nadu */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold text-lg">Tamil Nadu</h3>
                                <span className="text-[#556677] text-xs">Half Yearly</span>
                            </div>
                            <div className="text-[#556677] font-black text-2xl mb-1">Due Aug 2026</div>
                            <div className="text-[#8899AA] text-xs">TN deducts PT on a bi-annual basis (Aug & Jan). No deductions this month.</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-24 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl">
                    <Landmark size={48} className="mx-auto mb-4 text-pink-400 opacity-50" />
                    <h3 className="text-white font-bold text-lg mb-2">LWF Deduction Cycle is Bi-Annual</h3>
                    <p className="text-[#8899AA] text-sm max-w-sm mx-auto">Labour Welfare Fund is deducted in June and December for most states. There is no LWF liability for the March 2026 payroll run.</p>
                </div>
            )}
        </div>
    );
}
