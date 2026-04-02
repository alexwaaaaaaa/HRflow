"use client";
import React, { useState } from "react";
import { FileBadge, UploadCloud, CheckCircle2, CopyIcon, Send, Clock, UserCheck } from "lucide-react";

export default function JoiningFormalities() {
    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-1">Pre-Joining Formalities</h1>
                <p className="text-sm text-[#8899AA]">Track document submissions and statutory form fillings for new hires</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Candidate List (Left) */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col h-[600px]">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420]">
                        <h3 className="font-semibold text-sm">Upcoming Joiners (5)</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-[#1A2A3A] scrollbar-thin scrollbar-thumb-[#1A2A3A]">
                        {[
                            { n: "Rahul Sharma", d: "15 Apr", p: "80%", a: true },
                            { n: "Anjali Singh", d: "18 Apr", p: "100%", a: false },
                            { n: "Karan Patel", d: "22 Apr", p: "25%", a: false },
                        ].map((c, i) => (
                            <div key={i} className={`p-4 cursor-pointer transition-colors ${c.a ? 'bg-[#1A2A3A]/50 border-l-2 border-l-[#0066FF]' : 'hover:bg-[#1A2A3A]/30 border-l-2 border-l-transparent'}`}>
                                <h4 className="font-bold text-white text-sm mb-1">{c.n}</h4>
                                <div className="flex justify-between items-end mb-2">
                                    <p className="text-xs text-[#8899AA] flex items-center gap-1.5"><Clock size={12} /> Joining: {c.d}</p>
                                    <p className="text-[10px] font-bold" style={{ color: c.p === "100%" ? "#00E5A0" : "#FFB800" }}>{c.p} Complete</p>
                                </div>
                                <div className="w-full h-1 bg-[#060B14] rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#0066FF] to-[#00E5A0]" style={{ width: c.p }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details Tracker (Right) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Header Info */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[#1A2A3A] flex items-center justify-center font-bold text-xl text-white">RS</div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Rahul Sharma</h2>
                                    <p className="text-sm text-[#8899AA]">Senior Frontend Engineer · Joining 15 April 2025</p>
                                </div>
                            </div>
                            <button className="h-10 px-4 bg-[#1A2A3A] text-white text-xs font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                                <Send size={14} /> Send Reminder
                            </button>
                        </div>
                        <div className="flex gap-6 mt-6 p-4 bg-[#0A1420] border border-[#2A3A4A] rounded-xl">
                            <div className="flex-1">
                                <p className="text-[10px] text-[#8899AA] uppercase font-bold mb-1">Portal Link Sent on</p>
                                <p className="text-sm font-medium text-white">16 Mar 2025</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] text-[#8899AA] uppercase font-bold mb-1">Magic Link Config</p>
                                <p className="text-sm font-medium text-[#0066FF] flex items-center gap-1 cursor-pointer hover:underline"><CopyIcon size={12} /> Copy Candidate URL</p>
                            </div>
                        </div>
                    </div>

                    {/* Document Checklist */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-semibold text-[15px] mb-6 border-b border-[#1A2A3A] pb-4">Required Documents Tracking</h3>

                        <div className="space-y-4">
                            {/* Done */}
                            <div className="flex items-center justify-between p-4 bg-[#0A1420] border border-[#00E5A0]/30 rounded-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-1.5 bg-[#00E5A0]/10 text-[#00E5A0] rounded-bl-xl text-[10px] font-bold flex items-center gap-1">
                                    <CheckCircle2 size={12} /> Verified
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#00E5A0]/10 text-[#00E5A0] flex items-center justify-center shrink-0"><FileBadge size={18} /></div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">ID Proof (Aadhar & PAN)</h4>
                                        <p className="text-xs text-[#8899AA] mt-1">Uploaded & verified successfully.</p>
                                    </div>
                                </div>
                                <button className="text-xs font-medium text-[#0066FF] hover:underline mr-2">View Files</button>
                            </div>

                            {/* Pending Review */}
                            <div className="flex items-center justify-between p-4 bg-[#0A1420] border border-[#FFB800]/50 rounded-xl relative overflow-hidden group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#1A2A3A] text-[#8899AA] flex items-center justify-center shrink-0"><UploadCloud size={18} /></div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white flex items-center gap-2">Previous Employment Relieving <span className="bg-[#FFB800] text-black text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">Needs Review</span></h4>
                                        <p className="text-xs text-[#8899AA] mt-1">Candidate uploaded doc yesterday.</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="h-8 px-3 bg-[#00E5A0] text-[#060B14] text-xs font-bold rounded-lg hover:bg-[#00c98d]">Approve</button>
                                    <button className="h-8 px-3 bg-[#1A2A3A] text-white text-xs font-bold rounded-lg hover:bg-[#2A3A4A]">Reject</button>
                                </div>
                            </div>

                            {/* Missing */}
                            <div className="flex items-center justify-between p-4 bg-[#0A1420] border border border-[#1A2A3A] border-l-4 border-l-[#FF4444] rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#1A2A3A] text-[#8899AA] flex items-center justify-center shrink-0"><UserCheck size={18} /></div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white flex items-center gap-2">Statutory Details (Bank/UAN) <span className="text-[#FF4444] text-[10px] font-bold ml-1">Missing</span></h4>
                                        <p className="text-xs text-[#8899AA] mt-1">Candidate has not filled payroll information.</p>
                                    </div>
                                </div>
                                <button className="h-8 px-3 text-[#FF4444] text-xs font-semibold hover:bg-[#FF4444]/10 rounded-lg transition-colors">Nudge</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
