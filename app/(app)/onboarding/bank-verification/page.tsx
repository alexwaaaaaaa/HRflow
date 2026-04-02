"use client";
import React, { useState } from "react";
import {
    Building, UploadCloud, CheckCircle2, AlertCircle, Eye, FileText, ChevronRight
} from "lucide-react";

export default function BankVerification() {
    const [accountNo, setAccountNo] = useState("");
    const [confirmAccount, setConfirmAccount] = useState("");
    const [ifsc, setIfsc] = useState("");
    const [bankName, setBankName] = useState("");
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleVerify = () => {
        if (accountNo && accountNo === confirmAccount && ifsc.length > 5) {
            setLoading(true);
            setTimeout(() => {
                setBankName("HDFC Bank - Gurugram Branch"); // Simulated API lookup
                setVerified(true);
                setLoading(false);
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A1420] text-white p-6 justify-center flex">
            <div className="w-full max-w-[800px] mt-10">

                {/* Header */}
                <div className="mb-8 font-jakarta">
                    <div className="flex items-center gap-3 mb-2 text-[#00E5A0]">
                        <Building size={28} />
                        <h1 className="text-3xl font-bold">Salary Account Setup</h1>
                    </div>
                    <p className="text-[#8899AA]">Please provide your bank details for monthly payroll direct deposit.</p>
                </div>

                {/* Form Container */}
                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-8 relative overflow-hidden shadow-2xl">

                    {/* Success Overlay state - just demonstrating a visual transition */}
                    {verified && (
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5A0]/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    )}

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Account Number */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#8899AA]">Account Number <span className="text-[#FF4444]">*</span></label>
                                <input
                                    type="password"
                                    value={accountNo}
                                    onChange={(e) => setAccountNo(e.target.value)}
                                    disabled={verified}
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00E5A0] transition-colors disabled:opacity-50"
                                    placeholder="Enter account number"
                                />
                            </div>

                            {/* Confirm Account Number */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#8899AA]">Confirm Account Number <span className="text-[#FF4444]">*</span></label>
                                <input
                                    type="text"
                                    value={confirmAccount}
                                    onChange={(e) => setConfirmAccount(e.target.value)}
                                    disabled={verified}
                                    className={`w-full bg-[#1A2A3A] border text-white rounded-xl px-4 py-3 focus:outline-none transition-colors disabled:opacity-50 ${confirmAccount && accountNo !== confirmAccount ? 'border-[#FF4444] focus:border-[#FF4444]' : 'border-[#2A3A4A] focus:border-[#00E5A0]'}`}
                                    placeholder="Re-enter account number"
                                />
                                {confirmAccount && accountNo !== confirmAccount && (
                                    <p className="text-[#FF4444] text-xs flex items-center gap-1 mt-1"><AlertCircle size={12} /> Account numbers do not match</p>
                                )}
                            </div>

                            {/* IFSC Code */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-[#8899AA]">Bank IFSC Code <span className="text-[#FF4444]">*</span></label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={ifsc}
                                        onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                                        disabled={verified}
                                        maxLength={11}
                                        className="flex-1 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00E5A0] transition-colors font-mono disabled:opacity-50 uppercase"
                                        placeholder="e.g. HDFC0000123"
                                    />
                                    {!verified ? (
                                        <button
                                            onClick={handleVerify}
                                            disabled={loading || !accountNo || accountNo !== confirmAccount || ifsc.length < 5}
                                            className="px-6 py-3 bg-[#2A3A4A] text-white font-semibold rounded-xl hover:bg-[#3A4A5A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Verifying..." : "Verify IFSC"}
                                        </button>
                                    ) : (
                                        <div className="px-6 py-3 bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] font-semibold rounded-xl flex items-center gap-2">
                                            <CheckCircle2 size={18} /> Verified
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bank Name Display (Auto-fetched) */}
                            {verified && (
                                <div className="md:col-span-2 bg-[#1A2A3A] rounded-xl p-4 border border-[#00E5A0]/30 shadow-[0_0_15px_rgba(0,229,160,0.05)] animate-in fade-in slide-in-from-top-4 duration-500">
                                    <p className="text-xs text-[#8899AA] uppercase tracking-wider font-semibold mb-1">Bank Branch Details</p>
                                    <p className="text-lg font-bold text-white flex items-center gap-2">
                                        <Building size={18} className="text-[#00E5A0]" /> {bankName}
                                    </p>
                                </div>
                            )}

                            {/* Document Upload */}
                            <div className="md:col-span-2 space-y-2 mt-4">
                                <label className="text-sm font-semibold text-[#8899AA]">Supporting Document <span className="text-[#FF4444]">*</span></label>
                                <p className="text-xs text-[#445566] mb-3">Upload a scanned cancelled cheque or the front page of your bank passbook. Must clearly show Name, Account No, and IFSC.</p>

                                <div className="w-full border-2 border-dashed border-[#2A3A4A] hover:border-[#00E5A0] rounded-2xl bg-[#0A1420]/50 p-8 flex flex-col items-center justify-center transition-colors cursor-pointer group">
                                    <div className="w-16 h-16 rounded-full bg-[#1A2A3A] group-hover:bg-[#00E5A0]/10 flex items-center justify-center mb-4 transition-colors">
                                        <UploadCloud size={30} className="text-[#8899AA] group-hover:text-[#00E5A0] transition-colors" />
                                    </div>
                                    <p className="text-white font-medium mb-1 group-hover:text-[#00E5A0] text-center transition-colors">Click to upload or drag and drop</p>
                                    <p className="text-xs text-[#445566]">PDF, JPG, PNG (Max 5MB)</p>
                                </div>

                                {/* Simulated attachment success */}
                                {verified && (
                                    <div className="flex items-center justify-between p-3 mt-4 rounded-xl bg-[#1A2A3A] border border-[#2A3A4A]">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#00E5A0]/10 rounded-lg text-[#00E5A0]"><FileText size={16} /></div>
                                            <div>
                                                <p className="text-sm font-medium text-white">cancelled_cheque_arjun.pdf</p>
                                                <p className="text-xs text-[#8899AA]">1.2 MB</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-[#445566] hover:text-white transition-colors"><Eye size={16} /></button>
                                            <button className="p-2 text-[#445566] hover:text-white transition-colors"><CheckCircle2 size={16} className="text-[#00E5A0]" /></button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1A2A3A]">
                            <button className="px-6 py-3 text-[#8899AA] font-semibold hover:text-white transition-colors">
                                Save for Later
                            </button>
                            <button
                                disabled={!verified}
                                className="px-8 py-3 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(0,229,160,0.2)] disabled:shadow-none flex items-center gap-2"
                            >
                                Submit Details <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
