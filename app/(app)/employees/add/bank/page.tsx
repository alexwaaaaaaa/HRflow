"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft, Check, CheckCircle2, Building2, Loader2,
    AlertCircle, Phone, Mail, Plus, ShieldCheck
} from "lucide-react";

type VerifyState = "idle" | "verifying" | "success" | "fail";

export default function BankDetailsStep() {
    const [ifscValue, setIfscValue] = useState("HDFC0002082");
    const [ifscVerified, setIfscVerified] = useState(true);
    const [pennyState, setPennyState] = useState<VerifyState>("success");
    const [showRequest, setShowRequest] = useState(false);

    function handleIFSC(v: string) {
        setIfscValue(v.toUpperCase());
        if (v.length === 11) {
            setIfscVerified(true);
        } else {
            setIfscVerified(false);
        }
    }

    function simulatePenny() {
        setPennyState("verifying");
        setTimeout(() => setPennyState("success"), 2500);
    }

    return (
        <div className="max-w-[720px] mx-auto px-6 py-8 animate-fade-in">
            {/* Back */}
            <Link href="/employees" className="inline-flex items-center gap-2 text-[#8899AA] text-sm mb-5 hover:text-white no-underline transition-colors">
                <ArrowLeft size={16} /> Back to Employees
            </Link>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-white mb-1">Add New Employee</h1>
            <p className="text-sm text-[#8899AA] mb-8">Complete all steps to onboard a new team member.</p>

            {/* Step Progress */}
            <div className="flex items-center mb-12">
                {[
                    { num: 1, label: "Personal", status: "completed" },
                    { num: 2, label: "Job", status: "completed" },
                    { num: 3, label: "Salary", status: "completed" },
                    { num: 4, label: "Statutory", status: "completed" },
                    { num: 5, label: "Bank", status: "active" },
                    { num: 6, label: "Docs", status: "pending" },
                ].map((step, i, arr) => (
                    <div key={step.num} className="flex items-center" style={{ flex: i < arr.length - 1 ? 1 : "initial" }}>
                        <div className="flex flex-col items-center gap-1.5 relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ${step.status === "completed" ? "bg-[#00E5A0] text-[#060B14]" : step.status === "active" ? "bg-[#0066FF] text-white ring-4 ring-[#0066FF]/20" : "bg-[#1A2A3A] text-[#445566]"}`}>
                                {step.status === "completed" ? <Check size={14} /> : step.num}
                            </div>
                            <span className={`absolute top-10 text-[11px] whitespace-nowrap font-medium ${step.status === "pending" ? "text-[#445566]" : "text-white"}`}>
                                {step.label}
                            </span>
                        </div>
                        {i < arr.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-3 mt-[-16px] ${step.status === "completed" ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Main Form Card */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-white">Primary Salary Account</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Bank account where monthly salary will be credited</p>
                </div>

                {/* Account Holder */}
                <div>
                    <label className="block text-[13px] text-[#8899AA] mb-2">Account Holder Name <span className="text-[#FF4444]">*</span></label>
                    <input defaultValue="Rahul Kumar Sharma" className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00E5A0] transition-colors" />
                    <p className="text-[11px] text-[#445566] mt-1">Pre-filled from personal info — edit if joining account</p>
                </div>

                {/* Account Number */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[13px] text-[#8899AA] mb-2">Account Number <span className="text-[#FF4444]">*</span></label>
                        <input type="password" defaultValue="50100234567890" className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00E5A0] transition-colors tracking-widest" />
                    </div>
                    <div>
                        <label className="block text-[13px] text-[#8899AA] mb-2">Confirm Account Number <span className="text-[#FF4444]">*</span></label>
                        <input defaultValue="••••••••7890" className="w-full h-10 bg-[#0A1420] border border-[#00E5A0] rounded-lg px-3 text-white text-sm focus:outline-none tracking-widest" />
                        <p className="text-[11px] text-[#00E5A0] mt-1 flex items-center gap-1"><CheckCircle2 size={11} /> Account numbers match</p>
                    </div>
                </div>

                {/* Account Type */}
                <div>
                    <label className="block text-[13px] text-[#8899AA] mb-3">Account Type</label>
                    <div className="flex gap-4">
                        {["Savings", "Current"].map((type) => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="acctype" defaultChecked={type === "Savings"} className="accent-[#00E5A0]" />
                                <span className="text-sm text-white">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* IFSC */}
                <div>
                    <label className="block text-[13px] text-[#8899AA] mb-2">IFSC Code <span className="text-[#FF4444]">*</span></label>
                    <div className="relative">
                        <input
                            value={ifscValue}
                            onChange={e => handleIFSC(e.target.value)}
                            maxLength={11}
                            className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 pr-10 text-white text-sm uppercase tracking-widest focus:outline-none focus:border-[#00E5A0] transition-colors"
                        />
                        {ifscVerified && <CheckCircle2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0066FF]" />}
                    </div>

                    {/* Bank auto-fill */}
                    {ifscVerified && (
                        <div className="mt-3 p-4 bg-[#0066FF]/5 border border-[#0066FF]/30 rounded-xl flex items-start gap-3">
                            <Building2 size={18} className="text-[#0066FF] mt-0.5 shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-white">HDFC Bank</p>
                                <p className="text-[12px] text-[#8899AA]">Andheri West Branch, Mumbai — 400058, Maharashtra</p>
                                <p className="text-[11px] text-[#445566] mt-0.5">MICR: 400240009 · RTGS Enabled · NEFT Enabled</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Penny Drop */}
                <div className="p-5 bg-[#0A1420] border border-[#1A2A3A] rounded-xl">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <ShieldCheck size={16} className="text-[#00E5A0]" />
                                <h4 className="text-sm font-semibold text-white">Penny Drop Verification</h4>
                            </div>
                            <p className="text-[12px] text-[#8899AA]">We transfer ₹1 to verify this account is active and the name matches employee records. Prevents salary disbursement failures.</p>
                        </div>

                        {pennyState === "idle" && (
                            <button onClick={simulatePenny} className="shrink-0 h-9 px-4 bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0] text-sm font-medium rounded-lg hover:bg-[#00E5A0]/20 transition-all whitespace-nowrap">
                                Verify Account
                            </button>
                        )}
                        {pennyState === "verifying" && (
                            <div className="flex items-center gap-2 text-[#FFB800] text-sm whitespace-nowrap">
                                <Loader2 size={16} className="animate-spin" />
                                Transferring ₹1...
                            </div>
                        )}
                        {pennyState === "success" && (
                            <div className="flex items-center gap-2 text-[#00E5A0] text-sm whitespace-nowrap">
                                <CheckCircle2 size={16} />
                                Verified ✓
                            </div>
                        )}
                        {pennyState === "fail" && (
                            <div className="flex items-center gap-2 text-[#FF4444] text-sm whitespace-nowrap">
                                <AlertCircle size={16} />
                                Verification Failed
                            </div>
                        )}
                    </div>

                    {pennyState === "success" && (
                        <div className="mt-3 pt-3 border-t border-[#1A2A3A] text-[12px] text-[#00E5A0]">
                            ✅ Account holder confirmed: <strong>RAHUL KUMAR SHARMA</strong> — Name matches employee record
                        </div>
                    )}
                    {pennyState === "fail" && (
                        <div className="mt-3 pt-3 border-t border-[#1A2A3A] text-[12px] text-[#FF4444]">
                            ❌ Account inactive or name mismatch — please check account details
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#1A2A3A]" />

                {/* Add Another Account / Request */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <button className="flex items-center gap-2 text-sm text-[#0066FF] hover:text-blue-400 transition-colors">
                        <Plus size={16} />
                        Add Another Account
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-[#445566]">Or request from employee</span>
                        <button
                            onClick={() => setShowRequest(!showRequest)}
                            className="flex items-center gap-1.5 text-xs text-[#8899AA] hover:text-white transition-colors underline"
                        >
                            via Email / WhatsApp
                        </button>
                    </div>
                </div>

                {/* Request panel */}
                {showRequest && (
                    <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 space-y-3 animate-fade-in">
                        <p className="text-sm font-medium text-white">Send bank details request link to employee</p>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 h-9 px-4 bg-[#1A2A3A] text-[#00E5A0] text-sm rounded-lg hover:bg-[#243040] transition-colors">
                                <Phone size={14} /> WhatsApp
                            </button>
                            <button className="flex items-center gap-2 h-9 px-4 bg-[#1A2A3A] text-[#0066FF] text-sm rounded-lg hover:bg-[#243040] transition-colors">
                                <Mail size={14} /> Email
                            </button>
                        </div>
                        <p className="text-[11px] text-[#8899AA]">Employee receives a secure link · Details auto-populate here once submitted · Link expires in 48 hrs</p>
                    </div>
                )}
            </div>

            {/* Bottom action bar */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1A2A3A]">
                <Link href="/employees/add/statutory">
                    <button className="h-11 px-6 bg-transparent border border-[#1A2A3A] text-white text-sm rounded-lg hover:bg-[#1A2A3A] transition-colors">
                        ← Back
                    </button>
                </Link>
                <div className="flex gap-4">
                    <button className="h-11 px-6 bg-transparent text-[#8899AA] text-sm hover:text-white transition-colors">
                        Save Draft
                    </button>
                    <Link href="/employees/add/documents">
                        <button className="h-11 px-6 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-lg hover:bg-[#00c98d] transition-colors">
                            Next: Upload Documents →
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
