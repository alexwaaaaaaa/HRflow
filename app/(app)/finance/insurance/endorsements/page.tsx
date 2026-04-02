"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    GitPullRequest, ChevronRight, CheckCircle2, Clock, FileText, UploadCloud, AlertCircle, RefreshCw
} from "lucide-react";

export default function InsuranceEndorsementScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col items-center">

            <div className="w-full max-w-4xl text-left mb-6">
                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                    <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/finance/insurance/policy" className="hover:text-white transition-colors">Insurance</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Endorsements</span>
                </div>

                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <GitPullRequest className="w-8 h-8 text-amber-500" />
                    Policy Endorsements
                </h1>
                <p className="text-sm text-[#8899AA] mt-1">Request mid-term changes to your active insurance policy (e.g., adding a newborn, correcting name).</p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-2 space-y-6">

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6">Submit New Request</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Endorsement Type</label>
                                <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none appearance-none">
                                    <option>Addition of New Born (Mid-term)</option>
                                    <option>Addition of Spouse (Marriage)</option>
                                    <option>Correction in Name/DOB/Gender</option>
                                    <option>Deletion of Dependent</option>
                                    <option>Change of Nominee (GTL)</option>
                                </select>
                            </div>

                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm">
                                <p className="text-amber-500 font-medium mb-1 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Mid-term Addition Rule
                                </p>
                                <p className="text-amber-500/80 text-xs">
                                    Newborns can only be added within <strong>30 days</strong> from the date of birth. Please ensure you upload the hospital discharge summary or birth certificate.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Dependent Details</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Full Name" className="bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none" />
                                    <input type="date" className="bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Supporting Documents (PDF/JPG)</label>
                                <div className="border border-dashed border-[#2A3A4A] rounded-xl p-8 flex flex-col items-center justify-center bg-[#1A2A3A]/40 hover:bg-[#1A2A3A]/60 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 bg-[#2A3A4A] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <UploadCloud className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <p className="text-white font-medium mb-1">Click to browse or drag file here</p>
                                    <p className="text-xs text-[#8899AA]">Max size 5MB. Acceptable: Birth Cert, Discharge Summary</p>
                                </div>
                            </div>

                            <button className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-[#0B1221] font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                                <RefreshCw className="w-5 h-5" /> Submit to HR & TPA
                            </button>
                        </div>
                    </div>

                </div>

                <div className="md:col-span-1 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 sticky top-8">
                        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Past Requests</h3>

                        <div className="relative border-l-2 border-[#1A2A3A] ml-2 space-y-6">

                            {/* Rejected Req */}
                            <div className="relative pl-6">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center ring-4 ring-[#0D1928]">
                                </div>
                                <h3 className="text-sm font-bold text-white mb-1">Name Correction (Spouse)</h3>
                                <p className="text-xs text-pink-400 mb-1">Rejected by TPA</p>
                                <p className="text-xs text-[#8899AA] mb-2">Aadhaar scan was not clearly visible. Please resubmit.</p>
                                <span className="text-[10px] text-[#8899AA] font-mono block">12 Aug 2025</span>
                            </div>

                            {/* Approved Req */}
                            <div className="relative pl-6">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center ring-4 ring-[#0D1928]">
                                    <CheckCircle2 className="w-4 h-4 text-[#0D1928]" />
                                </div>
                                <h3 className="text-sm font-bold text-white mb-1">Addition of Spouse</h3>
                                <p className="text-xs text-emerald-400 mb-1">Approved & Active</p>
                                <p className="text-xs text-[#8899AA] mb-2">Marriage certificate verified. Premium adjusted post corporate buffer usage.</p>
                                <span className="text-[10px] text-[#8899AA] font-mono block">20 Jan 2025</span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
