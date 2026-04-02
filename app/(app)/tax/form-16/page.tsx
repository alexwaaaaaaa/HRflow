"use client";

import React, { useState } from 'react';
import {
    FileText, CheckCircle2, AlertCircle, Download,
    RefreshCw, Filter, Search, Eye, ShieldCheck, Mail
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Form16Generation() {
    const router = useRouter();
    const [generating, setGenerating] = useState<string | null>(null);

    const handleGenerate = (empId: string) => {
        setGenerating(empId);
        setTimeout(() => {
            setGenerating(null);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">Form 16 Generation — FY 2024-25</h1>
                        <p className="text-sm text-[#8899AA]">Generate, merge and publish Form 16 (Part A & Part B) for your employees.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-sm font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2" /> Import Part A (TRACES)
                        </button>
                        <button
                            onClick={() => router.push('/tax/form-16/bulk')}
                            className="px-4 py-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors flex items-center"
                        >
                            Bulk Actions
                        </button>
                    </div>
                </div>

                {/* Status Summary */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="p-5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#8899AA] font-semibold mb-1 uppercase tracking-wider">Total Eligible</div>
                            <div className="text-2xl font-black text-white">412</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[#8899AA]">
                            <FileText size={20} />
                        </div>
                    </div>
                    <div className="p-5 bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#00E5A0] font-semibold mb-1 uppercase tracking-wider">Part A Uploaded</div>
                            <div className="text-2xl font-black text-[#00E5A0]">380</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#00E5A0]/10 flex items-center justify-center text-[#00E5A0]">
                            <CheckCircle2 size={20} />
                        </div>
                    </div>
                    <div className="p-5 bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#0066FF] font-semibold mb-1 uppercase tracking-wider">Generated</div>
                            <div className="text-2xl font-black text-[#0066FF]">145</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF]">
                            <RefreshCw size={20} />
                        </div>
                    </div>
                    <div className="p-5 bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#FFB800] font-semibold mb-1 uppercase tracking-wider">Published to Emp</div>
                            <div className="text-2xl font-black text-[#FFB800]">12</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#FFB800]/10 flex items-center justify-center text-[#FFB800]">
                            <Mail size={20} />
                        </div>
                    </div>
                </div>

                {/* Table Area */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">

                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="flex space-x-2">
                            <FilterBtn label="All" active />
                            <FilterBtn label="Ready to Generate" />
                            <FilterBtn label="Generated" />
                            <FilterBtn label="Missing Part A" />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Name or PAN..."
                                className="bg-[#060B14] border border-[#1A2A3A] px-4 py-1.5 pl-9 rounded-lg text-sm text-white focus:outline-none focus:border-[#0066FF] w-64"
                            />
                            <Search size={16} className="absolute left-3 top-2.5 text-[#8899AA]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1A2A3A] text-xs font-bold text-[#8899AA] uppercase tracking-wider bg-[#060B14]">
                        <div className="col-span-3">Employee</div>
                        <div className="col-span-2">PAN Number</div>
                        <div className="col-span-1 text-center">Part A</div>
                        <div className="col-span-1 text-center">Part B</div>
                        <div className="col-span-2 text-center">Digital Sign</div>
                        <div className="col-span-3 text-right">Action</div>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {/* Ready to generate */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors">
                            <div className="col-span-3 flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white">AM</div>
                                <div>
                                    <div className="text-sm font-bold text-white line-clamp-1">Arjun Mehta</div>
                                    <div className="text-xs text-[#8899AA]">EMP001</div>
                                </div>
                            </div>
                            <div className="col-span-2 font-mono text-sm text-slate-300">ASDFG1234H</div>
                            <div className="col-span-1 flex justify-center">
                                <span className="bg-[#00E5A0]/20 text-[#00E5A0] px-2 py-0.5 rounded text-[10px] font-bold border border-[#00E5A0]/30">Uploaded</span>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <span className="bg-[#00E5A0]/20 text-[#00E5A0] px-2 py-0.5 rounded text-[10px] font-bold border border-[#00E5A0]/30">Ready</span>
                            </div>
                            <div className="col-span-2 flex justify-center text-xs text-[#8899AA]">
                                Pending Gen
                            </div>
                            <div className="col-span-3 flex justify-end space-x-2">
                                <button
                                    onClick={() => handleGenerate('EMP001')}
                                    disabled={generating !== null}
                                    className="px-3 py-1.5 bg-[#0066FF] text-white text-xs font-bold rounded-lg hover:bg-[#0052cc] transition-colors flex items-center disabled:opacity-50 w-28 justify-center"
                                >
                                    {generating === 'EMP001' ? <RefreshCw size={14} className="animate-spin" /> : 'Generate + Sign'}
                                </button>
                            </div>
                        </div>

                        {/* Missing Part A */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors">
                            <div className="col-span-3 flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white">KI</div>
                                <div>
                                    <div className="text-sm font-bold text-white line-clamp-1">Kavya Iyer</div>
                                    <div className="text-xs text-[#8899AA]">EMP004</div>
                                </div>
                            </div>
                            <div className="col-span-2 font-mono text-sm text-slate-300">ZXCVB0987K</div>
                            <div className="col-span-1 flex justify-center cursor-help" title="Part A missing from TRACES import">
                                <span className="bg-[#FF4444]/10 text-[#FF4444] px-2 py-0.5 rounded text-[10px] font-bold border border-[#FF4444]/30">Missing</span>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <span className="bg-[#00E5A0]/20 text-[#00E5A0] px-2 py-0.5 rounded text-[10px] font-bold border border-[#00E5A0]/30">Ready</span>
                            </div>
                            <div className="col-span-2 flex justify-center text-xs text-[#8899AA]">
                                Blocked
                            </div>
                            <div className="col-span-3 flex justify-end space-x-2">
                                <button disabled className="px-3 py-1.5 bg-[#1A2A3A] text-[#8899AA] text-xs font-bold rounded-lg cursor-not-allowed border border-[#2A3A4A] w-28">
                                    Generate + Sign
                                </button>
                            </div>
                        </div>

                        {/* Generated */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-[#00E5A0]/5 hover:bg-[#00E5A0]/10 transition-colors border-l-2 border-[#00E5A0]">
                            <div className="col-span-3 flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white">SR</div>
                                <div>
                                    <div className="text-sm font-bold text-white line-clamp-1">Suresh Roy</div>
                                    <div className="text-xs text-[#8899AA]">EMP015</div>
                                </div>
                            </div>
                            <div className="col-span-2 font-mono text-sm text-slate-300">QWERT5678L</div>
                            <div className="col-span-1 flex justify-center">
                                <CheckCircle2 size={16} className="text-[#00E5A0]" />
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <CheckCircle2 size={16} className="text-[#00E5A0]" />
                            </div>
                            <div className="col-span-2 flex justify-center text-xs text-[#00E5A0] font-bold flex items-center">
                                <ShieldCheck size={14} className="mr-1" /> Signed
                            </div>
                            <div className="col-span-3 flex justify-end space-x-2">
                                <button className="p-1.5 text-[#0066FF] hover:bg-[#0066FF]/10 rounded-lg transition-colors border border-transparent hover:border-[#0066FF]/30" title="Publish over Email">
                                    <Mail size={16} />
                                </button>
                                <button className="p-1.5 text-[#8899AA] hover:text-white hover:bg-[#1A2A3A] rounded-lg transition-colors border border-transparent hover:border-[#2A3A4A]" title="Preview">
                                    <Eye size={16} />
                                </button>
                                <button className="p-1.5 text-[#8899AA] hover:text-[#00E5A0] hover:bg-[#00E5A0]/10 rounded-lg transition-colors border border-transparent hover:border-[#00E5A0]/30" title="Download">
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

function FilterBtn({ label, active }: any) {
    return (
        <button className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${active ? 'bg-[#1A2A3A] border-[#2A3A4A] text-white' : 'bg-transparent border-transparent text-[#8899AA] hover:text-slate-300'}`}>
            {label}
        </button>
    );
}
