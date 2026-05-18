"use client";
import React, { useState } from "react";
import {
    Building, UploadCloud, CheckCircle2, AlertCircle, Eye, FileText, ChevronRight
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

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
                setBankName("HDFC Bank - Gurugram Branch");
                setVerified(true);
                setLoading(false);
            }, 1500);
        }
    };

    return (
        <Page
            title="Salary Account Setup"
            subtitle="Please provide your bank details for monthly payroll direct deposit."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Bank Verification", href: "/onboarding/bank-verification" },
            ]}
            maxWidth="800px"
        >
            <Card className="relative overflow-hidden shadow-2xl">

                {/* Success glow */}
                {verified && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5A0]/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                )}

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Account Number */}
                        <div className="space-y-2">
                            <label htmlFor="account-no" className="text-sm font-semibold text-[#8899AA]">
                                Account Number <span className="text-[#FF4444]" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="account-no"
                                type="password"
                                value={accountNo}
                                onChange={(e) => setAccountNo(e.target.value)}
                                disabled={verified}
                                aria-required="true"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00E5A0] transition-colors disabled:opacity-50"
                                placeholder="Enter account number"
                            />
                        </div>

                        {/* Confirm Account Number */}
                        <div className="space-y-2">
                            <label htmlFor="confirm-account" className="text-sm font-semibold text-[#8899AA]">
                                Confirm Account Number <span className="text-[#FF4444]" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="confirm-account"
                                type="text"
                                value={confirmAccount}
                                onChange={(e) => setConfirmAccount(e.target.value)}
                                disabled={verified}
                                aria-required="true"
                                aria-describedby={confirmAccount && accountNo !== confirmAccount ? "account-mismatch" : undefined}
                                className={`w-full bg-[#1A2A3A] border text-white rounded-xl px-4 py-3 focus:outline-none transition-colors disabled:opacity-50 ${
                                    confirmAccount && accountNo !== confirmAccount
                                        ? "border-[#FF4444] focus:border-[#FF4444]"
                                        : "border-[#2A3A4A] focus:border-[#00E5A0]"
                                }`}
                                placeholder="Re-enter account number"
                            />
                            {confirmAccount && accountNo !== confirmAccount && (
                                <p id="account-mismatch" className="text-[#FF4444] text-xs flex items-center gap-1 mt-1" role="alert">
                                    <AlertCircle size={12} aria-hidden="true" /> Account numbers do not match
                                </p>
                            )}
                        </div>

                        {/* IFSC Code */}
                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="ifsc-code" className="text-sm font-semibold text-[#8899AA]">
                                Bank IFSC Code <span className="text-[#FF4444]" aria-hidden="true">*</span>
                            </label>
                            <div className="flex gap-4">
                                <input
                                    id="ifsc-code"
                                    type="text"
                                    value={ifsc}
                                    onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                                    disabled={verified}
                                    maxLength={11}
                                    aria-required="true"
                                    className="flex-1 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00E5A0] transition-colors font-mono disabled:opacity-50 uppercase"
                                    placeholder="e.g. HDFC0000123"
                                />
                                {!verified ? (
                                    <Button
                                        variant="secondary"
                                        onClick={handleVerify}
                                        disabled={loading || !accountNo || accountNo !== confirmAccount || ifsc.length < 5}
                                        isLoading={loading}
                                        loadingText="Verifying..."
                                    >
                                        Verify IFSC
                                    </Button>
                                ) : (
                                    <div className="px-6 py-3 bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] font-semibold rounded-xl flex items-center gap-2">
                                        <CheckCircle2 size={18} aria-hidden="true" /> Verified
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bank Name Display */}
                        {verified && (
                            <div className="md:col-span-2 bg-[#1A2A3A] rounded-xl p-4 border border-[#00E5A0]/30 shadow-[0_0_15px_rgba(0,229,160,0.05)]">
                                <p className="text-xs text-[#8899AA] uppercase tracking-wider font-semibold mb-1">Bank Branch Details</p>
                                <p className="text-lg font-bold text-white flex items-center gap-2">
                                    <Building size={18} className="text-[#00E5A0]" aria-hidden="true" /> {bankName}
                                </p>
                            </div>
                        )}

                        {/* Document Upload */}
                        <div className="md:col-span-2 space-y-2 mt-4">
                            <label htmlFor="bank-doc-upload" className="text-sm font-semibold text-[#8899AA]">
                                Supporting Document <span className="text-[#FF4444]" aria-hidden="true">*</span>
                            </label>
                            <p className="text-xs text-[#445566] mb-3">
                                Upload a scanned cancelled cheque or the front page of your bank passbook. Must clearly show Name, Account No, and IFSC.
                            </p>

                            <label
                                htmlFor="bank-doc-upload"
                                className="w-full border-2 border-dashed border-[#2A3A4A] hover:border-[#00E5A0] rounded-2xl bg-[#0A1420]/50 p-8 flex flex-col items-center justify-center transition-colors cursor-pointer group"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#1A2A3A] group-hover:bg-[#00E5A0]/10 flex items-center justify-center mb-4 transition-colors">
                                    <UploadCloud size={30} className="text-[#8899AA] group-hover:text-[#00E5A0] transition-colors" aria-hidden="true" />
                                </div>
                                <p className="text-white font-medium mb-1 group-hover:text-[#00E5A0] text-center transition-colors">Click to upload or drag and drop</p>
                                <p className="text-xs text-[#445566]">PDF, JPG, PNG (Max 5MB)</p>
                                <input id="bank-doc-upload" type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" aria-label="Upload bank document" />
                            </label>

                            {/* Simulated attachment success */}
                            {verified && (
                                <div className="flex items-center justify-between p-3 mt-4 rounded-xl bg-[#1A2A3A] border border-[#2A3A4A]">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#00E5A0]/10 rounded-lg text-[#00E5A0]">
                                            <FileText size={16} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">cancelled_cheque_arjun.pdf</p>
                                            <p className="text-xs text-[#8899AA]">1.2 MB</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" aria-label="Preview uploaded document">
                                            <Eye size={16} aria-hidden="true" />
                                        </Button>
                                        <Button variant="ghost" size="sm" aria-label="Document verified">
                                            <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1A2A3A]">
                        <Button variant="ghost" size="md">
                            Save for Later
                        </Button>
                        <Button
                            disabled={!verified}
                            iconRight={<ChevronRight size={18} aria-hidden="true" />}
                        >
                            Submit Details
                        </Button>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
