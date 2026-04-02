"use client";
import React, { useState } from "react";
import { MessageSquare, FileText, Check, X, ArrowRight, UserCircle2 } from "lucide-react";

export default function OfferNegotiation() {
    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden text-white bg-[#060B14]">

            {/* Negotiation Chat */}
            <div className="flex-1 flex flex-col pt-6 md:pt-8 bg-[#0D1928] border-r border-[#1A2A3A]">
                <div className="px-6 md:px-8 mb-6 shrink-0">
                    <h1 className="text-2xl font-bold mb-1">Negotiation Thread</h1>
                    <p className="text-sm text-[#8899AA]">Candidate: Amit Patel (Backend Engineer)</p>
                </div>

                <div className="flex-1 overflow-y-auto px-6 md:px-8 space-y-6 pb-6 scrollbar-thin scrollbar-thumb-[#1A2A3A]">
                    {/* HR Message */}
                    <div className="flex flex-col items-end">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] text-white p-4 rounded-t-2xl rounded-bl-2xl rounded-br-sm max-w-[80%]">
                            <div className="flex items-center gap-2 text-xs bg-[#1A2A3A] p-3 rounded-xl mb-3 border border-[#2A3A4A]">
                                <FileText size={16} className="text-[#00E5A0]" />
                                <div>
                                    <p className="font-bold text-[#00E5A0]">V1 Offer Generated</p>
                                    <p className="text-[#8899AA]">CTC: ₹28,00,000 + ₹1L Joining Bonus</p>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed">
                                Hi Amit, congratulations again on successfully passing our interview rounds!<br />
                                attached is the V1 offer for your review. Please let me know if you have any questions.
                            </p>
                        </div>
                        <span className="text-[10px] text-[#445566] mt-1 pr-1">Priya Nair (You) · 16 Mar, 10:00 AM</span>
                    </div>

                    {/* Candidate Message (Counter) */}
                    <div className="flex flex-col items-start mt-6">
                        <div className="bg-[#1A2A3A] border border-[#2A3A4A] text-white p-4 rounded-t-2xl rounded-br-2xl rounded-bl-sm max-w-[80%]">
                            <p className="text-sm leading-relaxed">
                                Hi Priya, thank you for the offer. I am really excited about joining TechCorp. However, I currently have another offer for ₹32 LPA. <br /><br />
                                Is there any room to match this base salary? I am willing to forego the joining bonus if the base compensation can be adjusted.
                            </p>
                        </div>
                        <span className="text-[10px] text-[#445566] mt-1 pl-1">Amit Patel (Candidate) · 16 Mar, 11:30 AM</span>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#0A1420] border-t border-[#1A2A3A] shrink-0">
                    <div className="flex items-center gap-2">
                        <input placeholder="Type your reply..." className="flex-1 h-12 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                        <button className="h-12 px-6 bg-[#0066FF] font-bold rounded-xl hover:bg-[#0052cc] transition-colors">Send</button>
                    </div>
                </div>
            </div>

            {/* Negotiation Toolkit (Right Sidebar) */}
            <div className="w-[400px] bg-[#0A1420] flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-[#1A2A3A]">
                <div className="p-6 border-b border-[#1A2A3A]">
                    <h3 className="font-bold text-white mb-4">Counter Offer Request</h3>

                    {/* Comparison Cards */}
                    <div className="space-y-4">
                        {/* Current */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-xl">
                            <p className="text-xs text-[#8899AA] uppercase font-bold mb-2">Original Offer (V1)</p>
                            <p className="text-xl font-bold text-white">₹ 28,00,000</p>
                            <p className="text-xs text-[#00E5A0] mt-1">+ ₹1,00,000 Joining</p>
                        </div>

                        <div className="flex justify-center"><ArrowRight size={16} className="text-[#445566]" /></div>

                        {/* Requested */}
                        <div className="bg-[#1A2A3A] border-2 border-dashed border-[#FFB800]/50 p-4 rounded-xl">
                            <p className="text-xs text-[#FFB800] uppercase font-bold mb-2">Candidate Request</p>
                            <p className="text-xl font-bold text-white">₹ 32,00,000</p>
                            <p className="text-xs text-[#FF4444] mt-1">Refuses Joining</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="font-bold text-white mb-4">Budget Limits</h3>
                    <div className="space-y-4 mb-6">
                        <div>
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-[#8899AA]">Band Limit (SDE-2)</span>
                                <span className="text-white font-medium">₹ 25L - ₹ 35L</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#00E5A0] to-[#FFB800]" style={{ width: '80%' }} />
                            </div>
                        </div>
                        <div className="p-3 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-lg text-xs text-[#FFB800] leading-relaxed">
                            Requested CTC (₹32L) is within the SDE-2 band limit, but exceeds the Hiring Manager's approved budget of ₹30L. Revision requires VP Approval.
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button className="w-full h-10 bg-[#0066FF] text-white text-sm font-bold rounded-xl hover:bg-[#0052cc] transition-colors flex justify-center items-center gap-2">
                            <FileText size={16} /> Draft Revision (V2)
                        </button>
                        <button className="w-full h-10 border border-[#2A3A4A] text-[#8899AA] text-sm font-bold rounded-xl hover:bg-[#1A2A3A] hover:text-white transition-colors flex justify-center items-center gap-2">
                            <X size={16} /> Reject Counter Offer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
