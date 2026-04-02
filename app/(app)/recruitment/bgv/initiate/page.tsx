"use client";
import React, { useState } from "react";
import { ArrowLeft, Send, Search, ShieldCheck, FileSearch, Building2 } from "lucide-react";

export default function BGVInitiation() {
    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-[#0D1928] border border-[#1A2A3A] hover:bg-[#1A2A3A] rounded-xl flex items-center justify-center text-[#8899AA] transition-colors"><ArrowLeft size={16} /></button>
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Initiate Background Verification</h1>
                        <p className="text-sm text-[#8899AA]">Select vendor packages and trigger BGV post offer acceptance.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Configuration side */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">Selected Candidate</label>
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#0066FF] to-[#00E5A0] rounded-full flex items-center justify-center font-bold text-sm shadow-lg">RS</div>
                            <div>
                                <h4 className="font-bold text-white">Rahul Sharma</h4>
                                <p className="text-xs text-[#8899AA]">Senior Frontend Engineer · Offer Accepted</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="block text-sm font-semibold text-white">Select Partner Vendor</label>
                            <span className="text-xs text-[#00E5A0] font-bold">API Connected</span>
                        </div>
                        <select className="w-full h-12 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm font-medium text-white focus:outline-none focus:border-[#0066FF] transition-colors">
                            <option>AuthBridge Solutions</option>
                            <option>FirstAdvantage India</option>
                            <option>HireRight Global</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-white mb-3">Choose Verification Package</label>
                        <div className="space-y-3">
                            <label className="flex items-start gap-4 p-4 border border-[#0066FF] bg-[#0066FF]/5 rounded-xl cursor-pointer transition-colors shadow-[0_0_15px_rgba(0,102,255,0.1)]">
                                <input type="radio" name="pkg" defaultChecked className="mt-1 w-4 h-4 accent-[#0066FF]" />
                                <div>
                                    <h4 className="font-bold text-white flex items-center gap-2">Standard Technical <span className="px-2 py-0.5 rounded text-[10px] bg-[#1A2A3A] text-[#8899AA]">SDE L1-L3</span></h4>
                                    <p className="text-xs text-[#8899AA] mt-1">ID (Aadhar/PAN), Academic, Last 2 Employers, Criminal Court Records.</p>
                                    <p className="text-xs font-bold text-white mt-2">TAT: 5-7 Working Days · ₹2,500</p>
                                </div>
                            </label>

                            <label className="flex items-start gap-4 p-4 border border-[#1A2A3A] bg-[#0D1928] hover:border-[#2A3A4A] rounded-xl cursor-pointer transition-colors">
                                <input type="radio" name="pkg" className="mt-1 w-4 h-4 accent-[#0066FF]" />
                                <div>
                                    <h4 className="font-bold text-white flex items-center gap-2">Executive Check <span className="px-2 py-0.5 rounded text-[10px] bg-[#1A2A3A] text-[#8899AA]">Leadership</span></h4>
                                    <p className="text-xs text-[#8899AA] mt-1">All Standard + Global Database Check, Directorship Search, Credit/CIBIL.</p>
                                    <p className="text-xs font-bold text-white mt-2">TAT: 10-12 Working Days · ₹6,500</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Preview & Action Side */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-white mb-6">Initiation Summary</h3>

                        <div className="space-y-5">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[#9B59B6] shrink-0"><ShieldCheck size={14} /></div>
                                <div>
                                    <p className="text-sm font-bold text-white">Data Consent Link</p>
                                    <p className="text-xs text-[#8899AA] leading-relaxed mt-1">An automated email and SMS will be sent to the candidate requesting data consent and document uploads on the vendor portal.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[#0066FF] shrink-0"><FileSearch size={14} /></div>
                                <div>
                                    <p className="text-sm font-bold text-white">Pre-filled Data</p>
                                    <p className="text-xs text-[#8899AA] leading-relaxed mt-1">Basic details (Name, Dob, Email, Phone, Resume) will be securely synced to AuthBridge via API.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[#FFB800] shrink-0"><Building2 size={14} /></div>
                                <div>
                                    <p className="text-sm font-bold text-white">Compliance</p>
                                    <p className="text-xs text-[#8899AA] leading-relaxed mt-1">This initiation complies with the GDPR/DPDP rules configured in Module 10.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#1A2A3A]">
                        <button className="w-full h-12 bg-[#00E5A0] text-[#060B14] font-bold rounded-xl hover:bg-[#00c98d] transition-colors flex justify-center items-center gap-2">
                            <Send size={16} /> Initiate BGV Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
