"use client";

import React, { useState } from 'react';
import {
    CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight, X,
    Maximize2, FileText, Check, ShieldCheck, UploadCloud, RefreshCw
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OCRPreviewPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    // Mock document data
    const documentData = {
        type: "PPF Statement",
        fileName: "PPF_Statement_SBI_2024.pdf",
        confidence: 94,
        timeTaken: "2.3 seconds",
        extracted: {
            name: { value: "Arjun Mehta", confidence: 'high', match: true },
            accountNo: { value: "SBPPF00001234", confidence: 'high', match: null },
            bankBranch: { value: "SBI Bhopal Main", confidence: 'medium', match: null },
            amount: { value: "50000", confidence: 'high', match: true },
            fy: { value: "2024-25", confidence: 'high', match: true },
            section: { value: "80C - PPF", confidence: 'high', match: null }
        }
    };

    const handleConfirm = () => {
        setSubmitting(true);
        setTimeout(() => {
            router.push('/tax/proofs/upload');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans flex flex-col h-screen">

            {/* Header */}
            <div className="flex flex-col space-y-1 mb-4 flex-shrink-0">
                <div className="flex items-center space-x-2 text-xs text-[#8899AA]">
                    <span className="cursor-pointer hover:text-white" onClick={() => router.push('/tax/proofs/upload')}>Proof Upload</span>
                    <ChevronRight size={14} />
                    <span className="text-[#00E5A0]">OCR Review</span>
                </div>
                <h1 className="text-2xl font-bold text-white">OCR Data Extraction — Review</h1>
                <p className="text-sm text-[#8899AA]">AI has extracted data from your document. Review and confirm.</p>
            </div>

            {/* OCR Status Bar */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-3 flex justify-between items-center mb-6 flex-shrink-0">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <FileText size={18} className="text-[#8899AA]" />
                        <span className="text-sm font-medium text-white">{documentData.fileName}</span>
                        <span className="text-xs text-[#8899AA]">(1 page)</span>
                    </div>
                    <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20">
                        <ShieldCheck size={14} className="text-[#00E5A0]" />
                        <span className="text-xs font-bold text-[#00E5A0]">OCR Confidence: {documentData.confidence}%</span>
                    </div>
                    <span className="text-xs text-[#445566]">Time taken: {documentData.timeTaken}</span>
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => router.push('/tax/proofs/upload')} className="px-3 py-1.5 border border-[#1A2A3A] text-xs font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center">
                        <ChevronLeft size={16} className="mr-1" /> Back
                    </button>
                    <button className="px-3 py-1.5 border border-[#1A2A3A] text-xs font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-[#8899AA] cursor-not-allowed">
                        Next Document <ChevronRight size={16} className="ml-1" />
                    </button>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex space-x-6 overflow-hidden min-h-0">

                {/* Left Panel - Document Viewer */}
                <div className="w-[600px] flex-shrink-0 bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden relative">
                    {/* Toolbar */}
                    <div className="h-12 border-b border-[#1A2A3A] flex justify-between items-center px-4 bg-[#0A1420]">
                        <div className="flex items-center space-x-3 text-xs text-[#8899AA]">
                            <button className="hover:text-white transition-colors">-</button>
                            <span>100%</span>
                            <button className="hover:text-white transition-colors">+</button>
                            <button className="hover:text-white transition-colors ml-2" title="Fit to width"><Maximize2 size={14} /></button>
                        </div>
                        <div className="text-xs font-medium text-white bg-[#1A2A3A] px-3 py-1 rounded-md">
                            Page 1 of 1
                        </div>
                    </div>

                    {/* Document Area Mock */}
                    <div className="flex-1 overflow-auto p-8 flex justify-center bg-[#060B14]">
                        <div className="w-[500px] h-[700px] bg-white relative shadow-lg">
                            {/* Watermark/fake content */}
                            <div className="absolute inset-0 p-8 flex flex-col space-y-6 opacity-80 pointer-events-none">
                                <div className="border-b-2 border-slate-300 pb-4 flex justify-between items-end">
                                    <h2 className="text-2xl font-serif text-slate-800 font-bold tracking-tight">State Bank of India</h2>
                                    <span className="text-slate-500 font-sans text-sm">PPF Account Statement</span>
                                </div>

                                <div className="space-y-4 font-mono text-xs text-slate-700">
                                    <div className="flex">
                                        <span className="w-40 font-bold">Account Holder:</span>
                                        <span className="relative">
                                            Arjun Mehta
                                            {/* OCR Highlight Box - Name */}
                                            <div className="absolute -inset-1 border-2 border-[#00E5A0] bg-[#00E5A0]/10 rounded z-10"></div>
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-40 font-bold">Account Number:</span>
                                        <span className="relative">
                                            SBPPF00001234
                                            {/* OCR Highlight Box - Acct */}
                                            <div className="absolute -inset-1 border-2 border-[#00E5A0] bg-[#00E5A0]/10 rounded z-10"></div>
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-40 font-bold">Branch:</span>
                                        <span className="relative">
                                            SBI Bhopal Main
                                            {/* OCR Highlight Box - Branch */}
                                            <div className="absolute -inset-1 border-2 border-[#FFB800] bg-[#FFB800]/10 rounded z-10"></div>
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-40 font-bold">Financial Year:</span>
                                        <span className="relative">
                                            2024-25
                                            {/* OCR Highlight Box - FY */}
                                            <div className="absolute -inset-1 border-2 border-[#00E5A0] bg-[#00E5A0]/10 rounded z-10"></div>
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 border border-slate-300">
                                    <div className="bg-slate-100 flex p-2 font-bold text-xs text-slate-700 border-b border-slate-300">
                                        <div className="w-24">Date</div>
                                        <div className="flex-1">Particulars</div>
                                        <div className="w-32 text-right">Deposit</div>
                                        <div className="w-32 text-right">Balance</div>
                                    </div>
                                    <div className="p-2 text-xs font-mono text-slate-600 space-y-2">
                                        <div className="flex border-b border-slate-100 pb-2">
                                            <div className="w-24">05/04/2024</div>
                                            <div className="flex-1">UPI/TRANSFER</div>
                                            <div className="w-32 text-right">10,000.00</div>
                                            <div className="w-32 text-right">10,000.00</div>
                                        </div>
                                        <div className="flex border-b border-slate-100 pb-2">
                                            <div className="w-24">12/07/2024</div>
                                            <div className="flex-1">NEFT REMITTANCE</div>
                                            <div className="w-32 text-right">25,000.00</div>
                                            <div className="w-32 text-right">35,000.00</div>
                                        </div>
                                        <div className="flex pb-2">
                                            <div className="w-24">20/12/2024</div>
                                            <div className="flex-1">ONLINE XFR</div>
                                            <div className="w-32 text-right">15,000.00</div>
                                            <div className="w-32 text-right">50,000.00</div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 flex p-3 font-bold text-sm text-slate-800 border-t border-slate-300">
                                        <div className="flex-1 text-right">TOTAL DEPOSITS (FY 24-25):</div>
                                        <div className="w-40 text-right relative">
                                            ₹50,000.00
                                            {/* OCR Highlight Box - Amount */}
                                            <div className="absolute -inset-1 border-2 border-[#00E5A0] bg-[#00E5A0]/10 rounded z-10"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 opacity-50 relative w-32 h-32 ml-auto">
                                    <div className="w-24 h-24 rounded-full border-4 border-blue-800 flex items-center justify-center text-blue-800 font-bold text-xl rotate-[-15deg]">
                                        SBI
                                    </div>
                                    {/* OCR Highlight Box - Red/Unreadable */}
                                    <div className="absolute inset-0 border-2 border-[#FF4444] bg-[#FF4444]/10 rounded z-10 border-dashed"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="h-10 border-t border-[#1A2A3A] bg-[#0A1420] flex items-center px-4 space-x-6 text-xs text-[#8899AA]">
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#00E5A0]/20 border border-[#00E5A0] mr-2"></span> High Confidence</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#FFB800]/20 border border-[#FFB800] mr-2"></span> Review Needed</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-[#FF4444]/20 border border-dashed border-[#FF4444] mr-2"></span> Unreadable/Ignored</div>
                    </div>
                </div>

                {/* Right Panel - Extracted Data */}
                <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden relative">
                    <div className="px-6 py-4 border-b border-[#1A2A3A] bg-[#0A1420]">
                        <h3 className="text-lg font-bold text-white">Extracted Information</h3>
                        <p className="text-xs text-[#8899AA] mt-1 text-justify">Verify the extracted fields below before confirming.</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">

                        <div className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg mb-2">
                            <label className="text-xs text-[#8899AA] uppercase tracking-wider font-semibold block mb-2">Document Type Mapping</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-[#8899AA] block mb-1">Detected Type</label>
                                    <div className="w-full bg-[#060B14] border border-[#1A2A3A] px-3 py-2 rounded-lg text-sm text-white focus:outline-none flex justify-between items-center">
                                        <span>PPF Statement</span>
                                        <ChevronDownIcon />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-[#8899AA] block mb-1">Tax Section</label>
                                    <div className="w-full bg-[#060B14] border border-[#1A2A3A] px-3 py-2 rounded-lg text-sm text-white focus:outline-none flex justify-between items-center">
                                        <span>80C — PPF</span>
                                        <ChevronDownIcon />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Editable Form */}
                        <div className="space-y-4">

                            <FieldRow
                                label="Account Holder Name"
                                value={documentData.extracted.name.value}
                                status={documentData.extracted.name.confidence}
                                matchMsg="Matches employee record"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-[#8899AA] block mb-1">Account Number</label>
                                    <input
                                        type="text"
                                        defaultValue={documentData.extracted.accountNo.value}
                                        className="w-full bg-transparent border-b border-[#2A3A4A] py-2 text-sm text-white focus:outline-none focus:border-[#00E5A0] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-[#8899AA] block mb-1">Bank / Branch ⚠️</label>
                                    <input
                                        type="text"
                                        defaultValue={documentData.extracted.bankBranch.value}
                                        className="w-full bg-transparent border-b border-[#FFB800] py-2 text-sm text-white focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-[#8899AA] block mb-1">Financial Year</label>
                                    <input
                                        type="text"
                                        defaultValue={documentData.extracted.fy.value}
                                        className="w-full bg-transparent border-b border-[#2A3A4A] py-2 text-sm text-[#00E5A0] font-bold focus:outline-none focus:border-[#00E5A0] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-[#8899AA] block mb-1">Amount Invested</label>
                                    <div className="relative">
                                        <span className="absolute left-0 top-2 text-[#8899AA] text-sm font-bold">₹</span>
                                        <input
                                            type="text"
                                            defaultValue={Number(documentData.extracted.amount.value).toLocaleString('en-IN')}
                                            className="w-full bg-transparent border-b border-[#00E5A0] py-2 pl-4 text-sm text-white font-bold focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Mismatch/Warnings */}
                        <div className="mt-8 bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-lg p-4 flex items-start space-x-3">
                            <CheckCircle2 size={18} className="text-[#00E5A0] mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-[#00E5A0]">Declared Amount Matches</h4>
                                <p className="text-xs text-[#8899AA] mt-1">You previously declared ₹50,000 for PPF under 80C. Extracted amount perfectly matches the declared value.</p>
                            </div>
                        </div>

                        {/* Missing Manual Info */}
                        <div className="p-4 bg-[#1A2A3A] rounded-lg mt-4 border border-[#2A3A4A] border-dashed">
                            <h4 className="text-sm font-bold text-white mb-3">Additional Details Needed</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-[#8899AA] block mb-1">Date of latest deposit</label>
                                    <input
                                        type="date"
                                        className="w-full bg-[#0D1928] border border-[#2A3A4A] rounded py-2 px-3 text-sm text-[#8899AA] focus:outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Action Bar Bottom */}
                    <div className="p-4 border-t border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between">
                        <button className="px-4 py-2 text-sm font-semibold text-[#8899AA] hover:text-[#FF4444] transition-colors">
                            Reject OCR — Manual Entry
                        </button>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 border border-[#2A3A4A] text-white text-sm font-bold rounded-lg hover:bg-[#1A2A3A] transition-colors">
                                Edit & Confirm
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={submitting}
                                className="px-6 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-lg hover:bg-[#00c98d] transition-colors flex items-center disabled:opacity-50"
                            >
                                {submitting ? (
                                    <><RefreshCw size={16} className="mr-2 animate-spin" /> Saving...</>
                                ) : (
                                    <><Check className="mr-2" size={16} /> Confirm Auto-fill</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function FieldRow({ label, value, status, matchMsg }: any) {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <label className="text-xs text-[#8899AA] block">{label}</label>
                {matchMsg && (
                    <span className="text-[10px] text-[#00E5A0] flex items-center">
                        <CheckCircle2 size={10} className="mr-1" /> {matchMsg}
                    </span>
                )}
            </div>
            <div className="relative">
                <input
                    type="text"
                    defaultValue={value}
                    className={`w-full bg-transparent border-b py-2 text-sm font-medium focus:outline-none transition-colors pr-8 ${status === 'high' ? 'border-[#2A3A4A] text-white focus:border-[#00E5A0]' : 'border-[#FFB800] text-white border-dashed'
                        }`}
                />
                {status === 'high' && (
                    <div className="absolute right-0 top-3" title="High confidence extraction">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ChevronDownIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8899AA]">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    )
}
