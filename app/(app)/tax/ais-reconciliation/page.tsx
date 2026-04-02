"use client";

import React, { useState } from 'react';
import {
    AlertTriangle, RefreshCw, Upload, Download,
    FileText, ArrowRight, ShieldCheck, CheckCircle2,
    XCircle, Database, Search, FileEdit, Info,
    ShieldAlert, BadgeInfo, Filter
} from 'lucide-react';

export default function AISReconciliationScreen() {
    const [isReconciling, setIsReconciling] = useState(false);

    const handleReconcile = () => {
        setIsReconciling(true);
        setTimeout(() => setIsReconciling(false), 2500);
    };

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">AIS Reconciliation</h1>
                        <p className="text-sm text-[#8899AA]">Match HRFlow TDS records with Income Tax Dept AIS portal data to catch discrepancies before filing.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-sm font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2" /> Export Mismatch Report
                        </button>
                        <button
                            onClick={handleReconcile}
                            disabled={isReconciling}
                            className="px-4 py-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors flex items-center disabled:opacity-50"
                        >
                            {isReconciling ? <RefreshCw size={16} className="animate-spin mr-2" /> : <RefreshCw size={16} className="mr-2" />}
                            {isReconciling ? 'Fetching Data...' : 'Run Auto-Recon (TRACES API)'}
                        </button>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="p-5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#8899AA] font-semibold mb-1 uppercase tracking-wider">Total PANs Checked</div>
                            <div className="text-2xl font-black text-white">405 / 412</div>
                        </div>
                        <FileText size={24} className="text-[#8899AA] opacity-50" />
                    </div>
                    <div className="p-5 bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#00E5A0] font-semibold mb-1 uppercase tracking-wider">Perfect Match</div>
                            <div className="text-2xl font-black text-[#00E5A0]">382</div>
                        </div>
                        <CheckCircle2 size={24} className="text-[#00E5A0] opacity-50" />
                    </div>
                    <div className="p-5 bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(255,68,68,0.1)]">
                        <div>
                            <div className="text-xs text-[#FF4444] font-semibold mb-1 uppercase tracking-wider">Mismatches Found</div>
                            <div className="text-2xl font-black text-[#FF4444] flex items-center">
                                14 <span className="text-xs bg-[#FF4444] text-white px-2 py-0.5 rounded-full ml-2">Action Req</span>
                            </div>
                        </div>
                        <AlertTriangle size={24} className="text-[#FF4444] opacity-50" />
                    </div>
                    <div className="p-5 bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#FFB800] font-semibold mb-1 uppercase tracking-wider">Invalid / Unverified PANs</div>
                            <div className="text-2xl font-black text-[#FFB800]">9</div>
                        </div>
                        <ShieldAlert size={24} className="text-[#FFB800] opacity-50" />
                    </div>
                </div>

                {/* Mismatch Table block */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <h3 className="text-sm font-bold text-white flex items-center">
                            <AlertTriangle size={16} className="text-[#FF4444] mr-2" /> Discrepancy Queue
                        </h3>
                        <div className="flex space-x-2">
                            <FilterBtn label="All Issues" active />
                            <FilterBtn label="TDS Mismatch" />
                            <FilterBtn label="PAN Errors" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1A2A3A] text-xs font-bold text-[#8899AA] uppercase tracking-wider bg-[#060B14]">
                        <div className="col-span-3">Employee Details</div>
                        <div className="col-span-3">HRFlow TDS Booked</div>
                        <div className="col-span-3">AIS Portal Data</div>
                        <div className="col-span-1 border-l border-[#1A2A3A] pl-4">Diff</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {/* Row 1 - TDS Mismatch */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-[#FF4444]/5 hover:bg-[#FF4444]/10 transition-colors">
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white mb-0.5">Vikram Singh</div>
                                <div className="text-xs text-[#8899AA] font-mono">PAN: AVXPS9876K</div>
                            </div>

                            <div className="col-span-3">
                                <div className="text-sm font-medium text-white mb-0.5">₹4,50,000 <span className="text-xs text-[#8899AA]">Gross</span></div>
                                <div className="text-sm font-bold text-[#FFB800]">₹45,000 <span className="text-xs text-[#8899AA]">TDS</span></div>
                            </div>

                            <div className="col-span-3 relative">
                                <div className="absolute -left-3 top-2 text-[#2A3A4A]"><ArrowRight size={16} /></div>
                                <div className="text-sm font-medium text-slate-400 mb-0.5 xl:pl-4">₹4,50,000 <span className="text-[10px] text-[#8899AA]">Gross</span></div>
                                <div className="text-sm font-bold text-slate-300 xl:pl-4">₹42,500 <span className="text-[10px] text-[#8899AA]">TDS</span></div>
                            </div>

                            <div className="col-span-1 border-l border-[#1A2A3A] pl-4 flex items-center">
                                <span className="inline-block px-2 py-1 bg-[#FF4444]/20 border border-[#FF4444]/30 text-[#FF4444] text-xs font-bold rounded">
                                    -₹2,500
                                </span>
                            </div>

                            <div className="col-span-2 flex justify-end">
                                <button className="px-3 py-1.5 border border-[#1A2A3A] text-white font-semibold text-xs rounded-lg hover:bg-[#1A2A3A] transition-colors">
                                    Investigate
                                </button>
                            </div>
                        </div>

                        {/* Row 2 - PAN Invalid */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors">
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white mb-0.5">Sneha Gupta <span className="bg-[#FFB800] text-[#060B14] text-[10px] px-1 py-0.5 rounded ml-1 font-bold">NEW EMP</span></div>
                                <div className="text-xs text-[#FF4444] font-mono border border-[#FF4444]/30 bg-[#FF4444]/10 inline-block px-1 rounded mt-0.5">PAN: SNEHG123X</div>
                            </div>

                            <div className="col-span-3">
                                <div className="text-sm font-medium text-white mb-0.5">₹1,20,000 <span className="text-xs text-[#8899AA]">Gross</span></div>
                                <div className="text-sm font-bold text-white">₹12,000 <span className="text-xs text-[#8899AA]">TDS</span></div>
                            </div>

                            <div className="col-span-3">
                                <div className="text-xs text-[#FFB800] font-semibold flex items-center px-4 h-full border-l border-r border-[#1A2A3A]/0">
                                    <BadgeInfo size={14} className="mr-1.5" /> No records found on TRACES for this PAN.
                                </div>
                            </div>

                            <div className="col-span-1 border-l border-[#1A2A3A] pl-4 flex items-center">
                                <span className="text-[#8899AA] text-xs font-semibold">N/A</span>
                            </div>

                            <div className="col-span-2 flex justify-end">
                                <button className="px-3 py-1.5 border border-[#1A2A3A] text-white font-semibold text-xs rounded-lg hover:bg-[#1A2A3A] transition-colors">
                                    Verify PAN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend/Info */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-lg p-4 flex items-start space-x-3 text-sm">
                    <Info size={18} className="text-[#0066FF] mt-0.5 flex-shrink-0" />
                    <div className="text-[#8899AA]">
                        <strong className="text-white">Why rely on this?</strong> Any mismatch between HRFlow and TRACES AIS can lead to Form 16s generating with wrong amounts, triggering IT notices for employees. Always clear this queue before doing bulk Form 16 generation.
                    </div>
                </div>

            </div>
        </div>
    );
}

function FilterBtn({ label, active }: any) {
    return (
        <button className={`px-3 py-1 text-xs font-semibold rounded border transition-colors ${active ? 'bg-[#1A2A3A] border-[#2A3A4A] text-white' : 'bg-transparent border-transparent text-[#8899AA] hover:text-slate-300'}`}>
            {label}
        </button>
    );
}
