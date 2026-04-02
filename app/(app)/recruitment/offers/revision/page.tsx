"use client";
import React, { useState } from "react";
import { ArrowLeft, GitMerge, FileText, CheckCircle2, AlertTriangle, Send } from "lucide-react";

export default function OfferRevision() {
    const [status] = useState<"pending" | "approved">("pending");

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-[#0D1928] border border-[#1A2A3A] hover:bg-[#1A2A3A] rounded-xl flex items-center justify-center text-[#8899AA] transition-colors"><ArrowLeft size={16} /></button>
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Offer Revision Approval</h1>
                        <p className="text-sm text-[#8899AA]">Amit Patel · Backend Engineer</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-6 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors" disabled={status === "pending"}>
                        <Send size={14} /> Re-issue Offer
                    </button>
                </div>
            </div>

            {/* Warning Banner */}
            <div className="bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-2xl p-4 mb-6 flex gap-4">
                <AlertTriangle size={24} className="text-[#FFB800] shrink-0" />
                <div>
                    <h3 className="text-sm font-bold text-[#FFB800] mb-1">Approval Required</h3>
                    <p className="text-xs text-[#FFB800]/80">The proposed V2 offer (₹32L) exceeds the originally budgeted amount (₹30L) for this requisition. Approval from VP Finance is required before re-issuing.</p>
                </div>
            </div>

            {/* Diff View */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden mb-6">
                <div className="grid grid-cols-2">
                    {/* V1 Old */}
                    <div className="border-r border-[#1A2A3A]">
                        <div className="p-4 bg-[#0A1420] border-b border-[#1A2A3A] flex justify-between items-center">
                            <h3 className="font-semibold text-[#8899AA]">Original Offer (V1)</h3>
                            <span className="text-[10px] bg-[#1A2A3A] px-2 py-0.5 rounded text-[#8899AA]">Rejected</span>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center bg-[#FF4444]/5 border border-[#FF4444]/20 p-3 rounded-lg">
                                <span className="text-sm text-[#8899AA]">Total Fixed CTC</span>
                                <span className="text-sm font-bold text-white line-through decoration-[#FF4444]">₹ 28,00,000</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#FF4444]/5 border border-[#FF4444]/20 p-3 rounded-lg">
                                <span className="text-sm text-[#8899AA]">Joining Bonus</span>
                                <span className="text-sm font-bold text-white line-through decoration-[#FF4444]">₹ 1,00,000</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg border border-transparent">
                                <span className="text-sm text-[#8899AA]">Stock Options (ESOPs)</span>
                                <span className="text-sm font-medium text-white">None</span>
                            </div>
                        </div>
                    </div>

                    {/* V2 New */}
                    <div className="bg-[#00E5A0]/5">
                        <div className="p-4 bg-[#00E5A0]/10 border-b border-[#00E5A0]/20 flex justify-between items-center">
                            <h3 className="font-semibold text-[#00E5A0]">Proposed Revision (V2)</h3>
                            <span className="text-[10px] bg-[#00E5A0] px-2 py-0.5 rounded font-bold text-[#060B14]">Draft</span>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center bg-[#00E5A0]/10 border border-[#00E5A0]/30 p-3 rounded-lg">
                                <span className="text-sm text-[#8899AA]">Total Fixed CTC</span>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-[#00E5A0]">₹ 32,00,000</span>
                                    <p className="text-[10px] text-[#00E5A0] mt-0.5">+14.2%</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-[#FFB800]/10 border border-[#FFB800]/30 p-3 rounded-lg">
                                <span className="text-sm text-[#8899AA]">Joining Bonus</span>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-[#FFB800]">₹ 0</span>
                                    <p className="text-[10px] text-[#FFB800] mt-0.5">Removed</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg border border-transparent">
                                <span className="text-sm text-[#8899AA]">Stock Options (ESOPs)</span>
                                <span className="text-sm font-medium text-white">None</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Approval Workflow */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                <h3 className="font-semibold text-sm mb-4">Approval Chain</h3>
                <div className="space-y-4 relative before:absolute before:inset-y-4 before:left-[19px] before:w-0.5 before:bg-[#1A2A3A] before:z-0">

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-[#00E5A0] flex items-center justify-center text-[#060B14] font-bold shadow-[0_0_10px_rgba(0,229,160,0.3)]">
                            <CheckCircle2 size={18} />
                        </div>
                        <div className="flex-1 bg-[#1A2A3A] border border-[#2A3A4A] p-3 rounded-xl flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-white">Priya Nair <span className="text-xs text-[#8899AA] font-normal">(Recruiter)</span></p>
                                <p className="text-xs text-[#00E5A0]">Initiated V2</p>
                            </div>
                            <span className="text-xs text-[#8899AA]">Today, 11:45 AM</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-[#FFB800] flex items-center justify-center text-[#060B14] shadow-[0_0_10px_rgba(255,184,0,0.3)]">
                            <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
                        </div>
                        <div className="flex-1 bg-[#0A1420] border border-[#FFB800]/30 p-3 rounded-xl flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-white">VP Finance <span className="text-xs text-[#8899AA] font-normal">(Approver)</span></p>
                                <p className="text-[11px] text-[#FFB800] mt-0.5">Pending Approval</p>
                            </div>
                            <button className="h-8 px-3 bg-[#FFB800] text-[#060B14] font-bold text-xs rounded-lg hover:bg-[#e6a600] transition-colors">Remind</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
