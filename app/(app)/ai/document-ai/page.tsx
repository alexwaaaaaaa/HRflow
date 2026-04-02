"use client";

import React, { useState } from 'react';
import { FileText, ArrowLeft, CheckCircle, AlertTriangle, XCircle, Search, Edit2, ShieldCheck, Maximize2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function DocumentAIDetailPage() {
    const docInfo = {
        id: 'DOC-1002',
        type: 'Form 16 (Income Tax)',
        employee: 'Arif Khan',
        uploadedAt: 'Today, 10:42 AM IST',
        score: 65,
        status: 'Flagged for Review'
    };

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header / Nav */}
            <div className="mb-6 shrink-0 flex flex-col">
                <Link href="/ai/document-intelligence" className="flex items-center gap-2 text-[#8899AA] hover:text-white transition-colors w-fit mb-4">
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back to Document Queue</span>
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#1A2A3A] p-3 rounded-xl border border-[#2A3A4A]">
                            <FileText size={28} className="text-[#8899AA]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold text-white tracking-tight">{docInfo.type}</h1>
                                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 text-xs rounded-md border border-amber-500/20 font-bold uppercase tracking-wider">
                                    {docInfo.status}
                                </span>
                            </div>
                            <p className="text-[#8899AA] text-sm">Employee: <span className="text-white font-medium">{docInfo.employee}</span> • {docInfo.id} • {docInfo.uploadedAt}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="secondary" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                            Reject Document
                        </Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border-none min-w-[140px]">
                            Force Approve <ShieldCheck size={16} className="ml-2" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 flex-1 overflow-hidden">

                {/* Left side: Document Viewer Sandbox */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col h-full overflow-hidden relative">
                    <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-4 py-3 flex justify-between items-center shrink-0">
                        <div className="flex gap-2">
                            <span className="text-sm text-white font-medium">Page 1/2</span>
                        </div>
                        <div className="flex gap-2 text-[#8899AA]">
                            <button className="p-1.5 hover:bg-[#1A2A3A] rounded transition-colors"><Search size={16} /></button>
                            <button className="p-1.5 hover:bg-[#1A2A3A] rounded transition-colors"><Maximize2 size={16} /></button>
                        </div>
                    </div>

                    <div className="flex-1 bg-[#131B2B] relative p-8 flex items-center justify-center overflow-auto">
                        {/* Mock PDF Document UI */}
                        <div className="w-full max-w-[600px] aspect-[1/1.4] bg-white shadow-2xl relative">
                            {/* Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                <span className="text-6xl font-bold text-black rotate-[-45deg] whitespace-nowrap">FORM 16</span>
                            </div>

                            {/* Mock Document Content with AI overlay bounding boxes */}
                            <div className="p-10 flex flex-col gap-6 text-black/80 font-serif text-[10px] leading-tight opacity-50">
                                <div className="text-center font-bold text-lg mb-4">FORM NO. 16</div>

                                {/* Header Info */}
                                <div className="grid grid-cols-2 gap-4 border border-black/20 p-4 relative">
                                    <div>
                                        <strong>Name of Employer:</strong> TechCorp India Pvt Ltd <br />
                                        <strong>Address:</strong> Bangalore, 560001
                                    </div>
                                    <div className="relative">
                                        {/* Highlighted bounding box for Anomaly 2 */}
                                        <div className="absolute -inset-2 border-2 border-amber-500 bg-amber-500/10 z-10 shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-help group">
                                            <div className="absolute -top-8 left-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap hidden group-hover:block z-20 shadow-lg">
                                                Entity match failed (Expected: Kaarya)
                                            </div>
                                        </div>
                                        <strong>PAN of Employer:</strong> <span className="blur-[2px]">ABCDE1234F</span> <br />
                                        <strong>TAN of Employer:</strong> <span className="blur-[2px]">BLRT12345E</span>
                                    </div>
                                </div>

                                {/* Employee Info */}
                                <div className="grid grid-cols-2 gap-4 border border-black/20 p-4 relative">
                                    <div>
                                        <strong>Name of Employee:</strong> {docInfo.employee} <br />
                                        <strong>Address:</strong> MG Road, Pune
                                    </div>
                                    <div className="relative">
                                        {/* Highlighted bounding box for Anomaly 1 */}
                                        <div className="absolute -inset-2 border-2 border-red-500 bg-red-500/10 z-10 shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-help group">
                                            <div className="absolute -top-8 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap hidden group-hover:block z-20 shadow-lg">
                                                Format mismatch against NSDL regex
                                            </div>
                                        </div>
                                        <strong>PAN of Employee:</strong> AX12B9Y <br />
                                        <strong>Emp ID:</strong> 44021
                                    </div>
                                </div>

                                {/* Table Mock */}
                                <div className="border border-black/20 mt-4 h-32 flex items-center justify-center bg-black/5">
                                    [ Financial Data Table Extract ]
                                </div>

                                {/* Signature Area */}
                                <div className="mt-8 relative border-t border-black/20 pt-4 h-24">
                                    <div className="absolute bottom-4 right-4 text-center">
                                        {/* Highlighted bounding box for Anomaly 3 */}
                                        <div className="absolute -inset-6 border-2 border-amber-500 bg-amber-500/10 z-10 shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-help group">
                                            <div className="absolute -top-8 left-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap hidden group-hover:block z-20 shadow-lg">
                                                Digital Signature / Seal not detected
                                            </div>
                                        </div>
                                        <div className="w-32 h-8 border-b border-black/50 mb-1"></div>
                                        Authorized Signatory
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: AI Analysis & Extraction Results */}
                <div className="flex flex-col h-full overflow-hidden">

                    {/* Overall Score */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl mb-6 shrink-0 flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full border-4 border-amber-500 flex items-center justify-center shrink-0">
                            <span className="text-2xl font-black text-amber-500">{docInfo.score}</span>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-1">Confidence Score</h3>
                            <p className="text-xs text-[#8899AA]">The Document AI model flagged 3 discrete anomalies requiring human verification before this document can be committed to the vault.</p>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col flex-1 overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#1A2A3A] bg-[#0A1420]">
                            <h3 className="text-sm font-semibold text-white">Extraction Diagnostics</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">

                            {/* Issue 1 */}
                            <div className="bg-[#131B2B] border border-red-500/30 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-red-500/20 bg-red-500/5 flex justify-between items-center">
                                    <h4 className="text-red-400 font-medium text-sm flex items-center gap-2">
                                        <XCircle size={16} /> Data Format Mismatch
                                    </h4>
                                    <span className="text-xs text-[#8899AA]">High Priority</span>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-[#8899AA] mb-4 text-balance">The extracted Employee PAN <strong>"AX12B9Y"</strong> does not conform to the standard Indian PAN format (5 Letters, 4 Numbers, 1 Letter) and differs from the master DB.</p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded text-sm text-white px-3 py-2 flex justify-between">
                                            <span>AX12B9Y</span>
                                            <span className="text-red-400 text-xs">Extracted</span>
                                        </div>
                                        <ArrowLeft size={16} className="text-[#445566]" />
                                        <div className="flex-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-sm text-emerald-400 px-3 py-2 flex justify-between">
                                            <span>ABCDE1234F</span>
                                            <span className="text-xs">Master DB</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-none py-1.5 px-3 text-xs h-auto">Approve Correction</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Issue 2 */}
                            <div className="bg-[#131B2B] border border-amber-500/30 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-amber-500/20 bg-amber-500/5 flex justify-between items-center">
                                    <h4 className="text-amber-500 font-medium text-sm flex items-center gap-2">
                                        <AlertTriangle size={16} /> Entity Name Variance
                                    </h4>
                                    <span className="text-xs text-[#8899AA]">Medium Priority</span>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-[#8899AA] mb-4 text-balance">Employer name extracted as <strong>"TechCorp India Pvt Ltd"</strong>, which does not match the active organization entity "Kaarya Inc". (Acceptable if prior employment record).</p>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 text-sm text-[#8899AA] cursor-pointer hover:text-white transition-colors">
                                            <input type="checkbox" className="rounded bg-[#0A1420] border-[#2A3A4A] text-indigo-500 focus:ring-0 cursor-pointer" />
                                            Mark as valid prior employment
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Issue 3 */}
                            <div className="bg-[#131B2B] border border-amber-500/30 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-amber-500/20 bg-amber-500/5 flex justify-between items-center">
                                    <h4 className="text-amber-500 font-medium text-sm flex items-center gap-2">
                                        <AlertTriangle size={16} /> Missing Authentication
                                    </h4>
                                    <span className="text-xs text-[#8899AA]">Medium Priority</span>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-[#8899AA] text-balance">The document lacks an identifiable physical signature, digital signature certificate (DSC) stamp, or company seal in the designated bounding box.</p>
                                </div>
                            </div>

                            {/* Valid Fields */}
                            <div className="bg-[#131B2B] border border-emerald-500/20 rounded-xl p-4 flex flex-col gap-2 opacity-70">
                                <h4 className="text-emerald-500 font-medium text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <CheckCircle size={14} /> 12 Fields Validated
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-xs text-[#8899AA]">
                                    <div className="flex justify-between border-b border-[#1A2A3A] pb-1"><span>Document Type</span> <span className="text-white">Form 16</span></div>
                                    <div className="flex justify-between border-b border-[#1A2A3A] pb-1"><span>Employee Name</span> <span className="text-white">Arif Khan</span></div>
                                    <div className="flex justify-between border-b border-[#1A2A3A] pb-1"><span>Assessment Year</span> <span className="text-white">2023-24</span></div>
                                    <div className="flex justify-between border-b border-[#1A2A3A] pb-1"><span>Total Income</span> <span className="text-white">₹14,50,000</span></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
