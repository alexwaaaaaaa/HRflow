"use client";

import React, { useState } from 'react';
import {
    UploadCloud, CheckCircle2, AlertCircle, Eye, RefreshCw, XCircle,
    FileText, FileImage, ShieldCheck, ChevronRight, FileArchive, Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InvestmentProofUploadPage() {
    const router = useRouter();
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            simulateUpload();
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            simulateUpload();
        }
    };

    const simulateUpload = () => {
        setUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setUploading(false);
                        router.push('/tax/proofs/ocr-preview');
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">Investment Proof Upload — FY 2024-25</h1>
                        <p className="text-sm text-[#8899AA] mb-4">Upload documents before January 31, 2025 for final TDS computation</p>
                        <div className="flex items-center space-x-2 text-xs text-[#8899AA]">
                            <span>Tax & TDS</span>
                            <ChevronRight size={14} />
                            <span className="text-[#00E5A0]">Proof Upload</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="bg-[#1A2A3A] px-4 py-2 rounded-xl inline-flex items-center space-x-4 border border-[#2A3A4A]">
                            <div>
                                <div className="text-xs text-[#8899AA]">Total Proofs</div>
                                <div className="text-sm font-bold text-white">14 Required</div>
                            </div>
                            <div className="h-8 w-px bg-[#2A3A4A]"></div>
                            <div>
                                <div className="text-xs text-[#8899AA]">Status</div>
                                <div className="text-sm font-bold text-[#FFB800] flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-[#FFB800] mr-2"></span>
                                    5 Pending
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bulk Upload Zone */}
                <div
                    className={`border-2 border-dashed rounded-xl p-8 transition-colors ${dragActive ? 'border-[#00E5A0] bg-[#00E5A0]/5' : 'border-[#1A2A3A] bg-[#0D1928] hover:border-[#2A3A4A]'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-[#1A2A3A] flex items-center justify-center mb-4">
                            <UploadCloud size={32} className="text-[#00E5A0]" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Drag & Drop all your proof documents here</h3>
                        <p className="text-[#8899AA] text-sm mb-6">Supports: PDF, JPG, PNG, ZIP (max 50MB total, 5MB per file)</p>

                        {uploading ? (
                            <div className="w-full max-w-md space-y-3">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-white">Processing Documents...</span>
                                    <span className="text-[#00E5A0]">{uploadProgress}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#00E5A0] transition-all duration-300 relative"
                                        style={{ width: `${uploadProgress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                                <p className="text-xs text-[#8899AA]">AI is scanning & extracting data via OCR...</p>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.jpg,.jpeg,.png,.zip"
                                    className="hidden"
                                    id="bulk-upload"
                                    onChange={handleFileInput}
                                />
                                <label
                                    htmlFor="bulk-upload"
                                    className="px-6 py-2.5 bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white font-medium rounded-lg cursor-pointer transition-colors inline-block"
                                >
                                    Browse Files
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Review Categories */}
                <div className="space-y-4">

                    {/* 80C Section */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                            <div className="flex items-center space-x-3">
                                <h3 className="text-sm font-bold text-white">Section 80C Investments</h3>
                                <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00E5A0]/10 text-[#00E5A0]">₹1,50,000 Limit</div>
                            </div>
                            <span className="text-xs text-[#8899AA]">2/3 Uploaded</span>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            <ProofItem
                                title="PPF Statement"
                                desc="State Bank PPF Account"
                                amount="₹50,000"
                                status="uploaded"
                                date="Uploaded 10/01/25"
                            />
                            <ProofItem
                                title="ELSS Statement"
                                desc="Axis Long Term Equity"
                                amount="₹38,400"
                                status="uploaded"
                                date="Uploaded 10/01/25"
                            />
                            <ProofItem
                                title="Life Insurance Premium"
                                desc="LIC Jeevan Anand"
                                amount="₹25,000"
                                status="pending"
                                date="Required"
                            />
                        </div>
                    </div>

                    {/* 80D Section */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                            <div className="flex items-center space-x-3">
                                <h3 className="text-sm font-bold text-white">Section 80D Health Insurance</h3>
                            </div>
                            <span className="text-xs text-[#8899AA]">2/2 Uploaded</span>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            <ProofItem
                                title="Self Insurance Certificate"
                                desc="Star Health Optima"
                                amount="₹15,000"
                                status="uploaded"
                                date="Uploaded 12/01/25"
                            />
                            <ProofItem
                                title="Parents Insurance Certificate"
                                desc="HDFC Ergo Health"
                                amount="₹12,000"
                                status="uploaded"
                                date="Uploaded 12/01/25"
                            />
                        </div>
                    </div>

                    {/* HRA Section */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                            <div className="flex items-center space-x-3">
                                <h3 className="text-sm font-bold text-white">House Rent Allowance (HRA)</h3>
                            </div>
                            <span className="text-xs text-[#FFB800]">Action Required</span>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            <ProofItem
                                title="Rent Agreement"
                                desc="Apr 2024 - Mar 2025 Lease"
                                amount="—"
                                status="uploaded"
                                date="Uploaded 05/04/24"
                            />
                            <ProofItem
                                title="Rent Receipts (Q3 & Q4)"
                                desc="Oct-Dec, Jan-Mar receipts pending"
                                amount="₹1,20,000"
                                status="pending"
                                date="4 months pending"
                            />
                        </div>
                    </div>

                    {/* Other Section */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                            <div className="flex items-center space-x-3">
                                <h3 className="text-sm font-bold text-white">Other Deductions</h3>
                            </div>
                            <span className="text-xs text-[#FF4444]">1 Rejected</span>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            <div className="p-4 flex items-center justify-between bg-[#FF4444]/5">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#FF4444]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <XCircle size={20} className="text-[#FF4444]" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white flex items-center">
                                            80G PM Relief Fund
                                            <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF4444]/20 text-[#FF4444]">Rejected</span>
                                        </h4>
                                        <p className="text-xs text-[#8899AA] mt-1">Amount mismatch — declared ₹10,000, receipt shows ₹8,000</p>
                                        <div className="mt-2 text-xs font-medium text-[#FF4444]">
                                            Action: Re-upload correct receipt or amend declaration
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1.5 border border-[#1A2A3A] text-xs font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors">
                                        Amend Declaration
                                    </button>
                                    <button className="px-3 py-1.5 bg-[#FF4444]/10 border border-[#FF4444]/20 text-[#FF4444] text-xs font-bold rounded-lg hover:bg-[#FF4444]/20 transition-colors">
                                        Re-upload
                                    </button>
                                </div>
                            </div>
                            <ProofItem
                                title="80TTA Savings Interest"
                                desc="SBI Savings Account Statement"
                                amount="₹3,400"
                                status="uploaded"
                                date="Uploaded 15/01/25"
                            />
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center py-4 border-t border-[#1A2A3A]">
                    <button className="text-sm text-[#8899AA] hover:text-white transition-colors">
                        Download Bulk Upload Template
                    </button>
                    <button className="px-6 py-2.5 bg-[#00E5A0] text-[#060B14] font-bold rounded-xl hover:bg-[#00c98d] transition-colors flex items-center opacity-50 cursor-not-allowed">
                        <ShieldCheck size={18} className="mr-2" />
                        Submit All Proofs
                    </button>
                </div>

            </div>
        </div>
    );
}

function ProofItem({ title, desc, amount, status, date }: { title: string, desc: string, amount: string, status: 'uploaded' | 'pending' | 'rejected', date: string }) {
    return (
        <div className="p-4 flex items-center justify-between hover:bg-[#1A2A3A]/30 transition-colors">
            <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${status === 'uploaded' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' :
                    status === 'pending' ? 'bg-[#FFB800]/10 text-[#FFB800]' :
                        'bg-[#FF4444]/10 text-[#FF4444]'
                    }`}>
                    {status === 'uploaded' ? <CheckCircle2 size={20} /> :
                        status === 'pending' ? <AlertCircle size={20} /> :
                            <XCircle size={20} />}
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white">{title}</h4>
                    <p className="text-xs text-[#8899AA] mt-0.5">{desc}</p>
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <div className="text-right">
                    <div className="text-sm font-bold text-white">{amount}</div>
                    <div className="text-[10px] text-[#8899AA] mt-0.5">{date}</div>
                </div>

                {status === 'uploaded' ? (
                    <div className="flex space-x-2">
                        <button className="p-2 text-[#8899AA] hover:text-white hover:bg-[#1A2A3A] rounded-lg transition-colors border border-transparent hover:border-[#2A3A4A]" title="View Proof">
                            <Eye size={16} />
                        </button>
                        <button className="p-2 text-[#8899AA] hover:text-[#00E5A0] hover:bg-[#00E5A0]/10 rounded-lg transition-colors border border-transparent hover:border-[#00E5A0]/30" title="Replace">
                            <RefreshCw size={16} />
                        </button>
                    </div>
                ) : (
                    <button className="px-4 py-1.5 bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] text-xs font-bold rounded-lg hover:bg-[#00E5A0]/20 transition-colors">
                        Upload Now
                    </button>
                )}
            </div>
        </div>
    );
}
