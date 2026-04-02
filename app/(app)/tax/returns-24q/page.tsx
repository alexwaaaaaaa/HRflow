"use client";

import React, { useState } from 'react';
import {
    Download, FileArchive, CheckCircle2, ChevronRight,
    RefreshCw, Play, FileJson, AlertCircle, CalendarRange, ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TDS24QReturnScreen() {
    const router = useRouter();
    const [generating, setGenerating] = useState(false);

    const handleGenerateFVU = () => {
        setGenerating(true);
        setTimeout(() => setGenerating(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans flex flex-col items-center">

            <div className="w-full max-w-5xl mb-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">TDS Return (Form 24Q)</h1>
                        <p className="text-sm text-[#8899AA]">Generate quarterly return files (FVU/TXT) for uploading to the IT portal.</p>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] px-4 py-2 rounded-xl flex items-center space-x-3 text-sm">
                        <span className="text-[#8899AA]">Financial Year:</span>
                        <select className="bg-transparent text-white font-bold outline-none cursor-pointer">
                            <option>2024-25</option>
                            <option>2023-24</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-4 gap-6">

                {/* Quarter Cards */}
                <QuarterCard
                    quarter="Q1" months="Apr - Jun" due="31 Jul 2024"
                    status="filed" employees={390} tds="₹11,40,200"
                />
                <QuarterCard
                    quarter="Q2" months="Jul - Sep" due="31 Oct 2024"
                    status="filed" employees={402} tds="₹11,65,500"
                />
                <QuarterCard
                    quarter="Q3" months="Oct - Dec" due="31 Jan 2025"
                    status="ready" employees={412} tds="₹11,65,400"
                />
                <QuarterCard
                    quarter="Q4" months="Jan - Mar" due="31 May 2025"
                    status="locked" employees={0} tds="₹0"
                />

            </div>

            {/* Main Action Area for Q3 */}
            <div className="w-full max-w-5xl mt-6 bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                <div className="px-6 py-4 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-white font-black">Q3</div>
                        <h2 className="text-lg font-bold text-white">Generate Quarter 3 Return</h2>
                    </div>
                    <div className="px-3 py-1 rounded bg-[#FFB800]/10 border border-[#FFB800]/20 text-[#FFB800] text-xs font-bold">
                        Due in 15 days
                    </div>
                </div>

                <div className="p-8 grid grid-cols-2 gap-12">

                    {/* Left: Pre-checks */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Validation Checks</h3>

                        <div className="space-y-4">
                            <CheckItem label="Challans mapped for Oct, Nov, Dec" pass={true} />
                            <CheckItem label="PAN Validation (All Employees)" pass={true} />
                            <CheckItem label="Lower Deduction Certificates updated" pass={true} />
                            <CheckItem label="BSR Codes format valid" pass={true} />
                            <CheckItem label="Company TAN/PAN Info valid" pass={true} />
                        </div>

                        <div className="mt-6 p-4 bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl flex items-start space-x-3">
                            <CheckCircle2 size={20} className="text-[#00E5A0] flex-shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-[#00E5A0]">Validation Passed</h4>
                                <p className="text-xs text-[#8899AA] mt-1">Ready to generate FVU file. Ensure you process it via NSDL FVU utility before uploading to TRACES.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Generate */}
                    <div className="flex flex-col justify-center items-center p-8 border-2 border-dashed border-[#2A3A4A] rounded-2xl bg-[#060B14]">

                        <div className="w-20 h-20 bg-[#1A2A3A] rounded-full flex items-center justify-center mb-6 relative">
                            <FileArchive size={32} className="text-[#0066FF]" />
                            {generating && (
                                <div className="absolute inset-0 rounded-full border-t-2 border-[#0066FF] animate-spin"></div>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-white text-center mb-2">Generate Base File (.txt)</h3>
                        <p className="text-sm text-[#8899AA] text-center mb-8 max-w-[280px]">
                            Download the raw text file for Q3 to validate via FVU utility.
                        </p>

                        <button
                            onClick={handleGenerateFVU}
                            disabled={generating}
                            className="w-full py-3.5 bg-[#0066FF] text-white font-bold text-sm rounded-xl hover:bg-[#0052cc] transition-colors flex items-center justify-center shadow-[0_0_20px_rgba(0,102,255,0.3)] disabled:opacity-50"
                        >
                            {generating ? (
                                <><RefreshCw size={18} className="animate-spin mr-2" /> Generating File...</>
                            ) : (
                                <><Download size={18} className="mr-2" /> Download TXT File</>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* FVU Utility Helper */}
            <div className="w-full max-w-5xl mt-6">
                <div className="bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <FileJson size={24} className="text-[#8899AA]" />
                        <div>
                            <h4 className="text-sm font-bold text-white">Need the latest NSDL FVU Utility?</h4>
                            <p className="text-xs text-[#8899AA] mt-0.5">Version 8.5 is required for Q3 FY 24-25.</p>
                        </div>
                    </div>
                    <button className="text-sm font-semibold text-[#00E5A0] hover:underline flex items-center">
                        Download Utility <ArrowRight size={16} className="ml-1" />
                    </button>
                </div>
            </div>

        </div>
    );
}

function QuarterCard({ quarter, months, due, status, employees, tds }: any) {
    const statusMap = {
        locked: { bg: 'bg-[#060B14]', border: 'border-[#1A2A3A]', text: 'text-[#556677]', label: 'Locked' },
        filed: { bg: 'bg-[#00E5A0]/5', border: 'border-[#00E5A0]/30', text: 'text-[#00E5A0]', label: 'Filed' },
        ready: { bg: 'bg-[#FFB800]/5', border: 'border-[#FFB800]/50', text: 'text-[#FFB800]', label: 'Action Required', glow: 'shadow-[0_0_15px_rgba(255,184,0,0.15)]' }
    };

    // @ts-expect-error: dynamic index
    const st = statusMap[status];

    return (
        <div className={`rounded-xl border p-5 transition-all ${st.bg} ${st.border} ${st.glow || ''} ${status === 'ready' ? '-translate-y-1' : ''}`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-black text-white">{quarter}</span>
                    <span className="text-xs font-semibold text-[#8899AA] bg-[#1A2A3A] px-2 py-0.5 rounded">{months}</span>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-[#8899AA]">Due Date</span>
                    <span className="font-semibold text-white flex items-center"><CalendarRange size={14} className="mr-1.5 text-[#556677]" /> {due}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[#8899AA]">Employees</span>
                    <span className="font-semibold text-white">{employees}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[#8899AA]">TDS Amount</span>
                    <span className="font-bold text-white">{tds}</span>
                </div>
            </div>

            <div className={`text-xs font-bold ${st.text} flex items-center uppercase tracking-wider`}>
                {status === 'filed' && <CheckCircle2 size={14} className="mr-1.5" />}
                {st.label}
            </div>
        </div>
    );
}

function CheckItem({ label, pass }: any) {
    return (
        <div className="flex items-center space-x-3 text-sm">
            {pass ? (
                <div className="w-5 h-5 rounded-full bg-[#00E5A0]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-[#00E5A0]" />
                </div>
            ) : (
                <div className="w-5 h-5 rounded-full bg-[#FFB800]/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={12} className="text-[#FFB800]" />
                </div>
            )}
            <span className={pass ? 'text-slate-200' : 'text-[#FFB800]'}>{label}</span>
        </div>
    );
}
