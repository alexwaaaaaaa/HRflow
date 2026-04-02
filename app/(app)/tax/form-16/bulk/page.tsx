"use client";

import React, { useState } from 'react';
import {
    Download, RefreshCw, FileArchive, Settings,
    ShieldCheck, ChevronLeft, CheckSquare, Settings2, Mail
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Form16BulkActions() {
    const router = useRouter();
    const [actioning, setActioning] = useState<string | null>(null);

    const handleAction = (type: string) => {
        setActioning(type);
        setTimeout(() => setActioning(null), 3000);
    };

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center space-x-4 mb-2">
                    <button onClick={() => router.back()} className="text-[#8899AA] hover:text-white transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Form 16 Bulk Actions</h1>
                        <p className="text-sm text-[#8899AA]">Perform bulk operations on Form 16s for FY 2024-25</p>
                    </div>
                </div>

                {/* Main Action Cards */}
                <div className="grid gap-6">

                    {/* Action 1: Bulk Generate */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6 shadow-md relative overflow-hidden group">
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0066FF]/10 to-transparent pointer-events-none"></div>
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-4">
                                <div className="w-12 h-12 bg-[#0066FF]/10 rounded-xl border border-[#0066FF]/20 flex items-center justify-center flex-shrink-0 text-[#0066FF]">
                                    <RefreshCw size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Bulk Generate & Merge</h3>
                                    <p className="text-sm text-[#8899AA] max-w-md">Merge TRACES Part A with System generated Part B and apply digital signature for all 380 ready employees.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAction('generate')}
                                disabled={actioning !== null}
                                className="px-6 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center min-w-[160px] justify-center disabled:opacity-50"
                            >
                                {actioning === 'generate' ? <RefreshCw size={16} className="animate-spin mr-2" /> : <ShieldCheck size={16} className="mr-2" />}
                                {actioning === 'generate' ? 'Generating...' : 'Start Generation'}
                            </button>
                        </div>
                    </div>

                    {/* Action 2: Bulk Download */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6 shadow-md relative overflow-hidden">
                        <div className="flex justify-between items-start">
                            <div className="flex space-x-4">
                                <div className="w-12 h-12 bg-[#FFB800]/10 rounded-xl border border-[#FFB800]/20 flex items-center justify-center flex-shrink-0 text-[#FFB800]">
                                    <FileArchive size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Download ZIP Archive</h3>
                                    <p className="text-sm text-[#8899AA] max-w-md mb-4">Download a single ZIP file containing all 145 generated Form 16s.</p>

                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="pwd" defaultChecked className="accent-[#FFB800]" />
                                            <label htmlFor="pwd" className="text-xs text-[#8899AA]">Password protect individual PDFs (PAN based)</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id="org" defaultChecked className="accent-[#FFB800]" />
                                            <label htmlFor="org" className="text-xs text-[#8899AA]">Organize into department folders inside ZIP</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAction('download')}
                                disabled={actioning !== null}
                                className="px-6 py-2.5 bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] font-bold text-sm rounded-lg hover:bg-[#FFB800]/20 transition-colors flex items-center min-w-[160px] justify-center disabled:opacity-50"
                            >
                                {actioning === 'download' ? <RefreshCw size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
                                {actioning === 'download' ? 'Compressing...' : 'Download ZIP'}
                            </button>
                        </div>
                    </div>

                    {/* Action 3: Bulk Publish */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6 shadow-md relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#00E5A0]/10 to-transparent pointer-events-none"></div>
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-4">
                                <div className="w-12 h-12 bg-[#00E5A0]/10 rounded-xl border border-[#00E5A0]/20 flex items-center justify-center flex-shrink-0 text-[#00E5A0]">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Publish to Employees</h3>
                                    <p className="text-sm text-[#8899AA] max-w-md">Make generated Form 16s available on employee portals and send email notifications.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAction('publish')}
                                disabled={actioning !== null}
                                className="px-6 py-2.5 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors flex items-center min-w-[160px] justify-center shadow-[0_0_15px_rgba(0,229,160,0.2)] disabled:opacity-50"
                            >
                                {actioning === 'publish' ? <RefreshCw size={16} className="animate-spin mr-2" /> : <CheckSquare size={16} className="mr-2" />}
                                {actioning === 'publish' ? 'Publishing...' : 'Publish (145)'}
                            </button>
                        </div>
                    </div>

                </div>

                {/* Digital Signature Setup Status */}
                <div className="mt-8 p-4 border border-[#2A3A4A] border-dashed rounded-xl bg-[#060B14] flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <ShieldCheck size={20} className="text-[#00E5A0]" />
                        <div>
                            <div className="text-sm font-bold text-white">Digital Signature Set Up</div>
                            <div className="text-xs text-[#8899AA]">Authorized Signatory: Amit Kumar (CFO) | Certificate valid till 2026</div>
                        </div>
                    </div>
                    <button className="text-xs text-[#0066FF] hover:underline flex items-center">
                        <Settings2 size={12} className="mr-1" /> Update Configuration
                    </button>
                </div>

            </div>
        </div>
    );
}
