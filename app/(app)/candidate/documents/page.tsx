"use client";
import React from 'react';
import { FolderUp, ArrowLeft, UploadCloud, CheckCircle2, FileWarning, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CandidateDocumentScreen() {
    const DOCS = [
        { label: 'Government ID (Aadhar / Passport)', status: 'uploaded', desc: 'Proof of identity verification.' },
        { label: 'Educational Certificates', status: 'uploaded', desc: 'Highest degree completion certificate.' },
        { label: 'Relieving Letter', status: 'pending', desc: 'From your most recent employer.' },
        { label: 'Last 3 Months Payslip', status: 'pending', desc: 'Used for compensation verification.' },
    ];

    return (
        <div className="min-h-screen bg-[#0A1420] py-10 px-6">
            <div className="max-w-4xl mx-auto space-y-6">

                <Link href="/candidate/status" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 inline-flex"><ArrowLeft size={16} /> Dashboard</Link>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Pre-offer Document Verification</h1>
                        <p className="text-[#8899AA]">Please upload the requested documents to proceed with the offer rollout process securely.</p>
                    </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3 text-sm text-[#AABBCC]">
                    <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
                    Your documents are encrypted using AES-256 and stored securely. They will only be accessed by the Talent Acquisition and Background Verification teams.
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Document List */}
                    <div className="space-y-4">
                        {DOCS.map((doc, i) => (
                            <div key={i} className={`p-5 rounded-2xl border transition-colors ${doc.status === 'uploaded' ? 'bg-[#060D1A] border-[#1A2A3A] opacity-70' : 'bg-[#131B2B] border-[#2A3A4A] border-l-4 border-l-blue-500 shadow-lg'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-white font-bold">{doc.label}</h3>
                                    {doc.status === 'uploaded' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <FileWarning size={18} className="text-blue-400" />}
                                </div>
                                <p className="text-[#556677] text-xs mb-4">{doc.desc}</p>

                                {doc.status !== 'uploaded' ? (
                                    <div className="border border-dashed border-[#2A3A4A] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 transition-colors bg-[#0A1420]">
                                        <UploadCloud size={20} className="text-[#556677] mb-2" />
                                        <div className="text-white text-xs font-bold mb-1">Click to upload</div>
                                        <div className="text-[#556677] text-[10px]">PDF, PNG or JPG (Max 5MB)</div>
                                    </div>
                                ) : (
                                    <div className="text-emerald-500 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12} /> Verified & Locked</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Overall Status */}
                    <div className="space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 text-center sticky top-6">
                            <div className="w-24 h-24 mx-auto mb-4 relative">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="44" className="stroke-[#1A2A3A] fill-none" strokeWidth="6" />
                                    <circle cx="48" cy="48" r="44" className="stroke-blue-500 fill-none" strokeWidth="6" strokeDasharray="276" strokeDashoffset={276 * 0.5} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-black text-white">2/4</span>
                                </div>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Upload Pending</h3>
                            <p className="text-[#8899AA] text-sm mb-6">Complete uploading all remaining documents to unblock your offer letter generation.</p>

                            <button className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-[#556677] font-bold py-3 rounded-xl transition-colors text-center cursor-not-allowed">
                                Submit for Verification
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
