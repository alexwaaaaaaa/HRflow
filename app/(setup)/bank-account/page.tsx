"use client";

import { useState } from "react";
import { Lock, Landmark, Zap, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function BankAccountPage() {
    const [acct, setAcct] = useState("");
    const [showAcct, setShowAcct] = useState(false);
    const [ifsc, setIfsc] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);

    const isHdfc = ifsc.length >= 4 && ifsc.toUpperCase().startsWith("HDFC");

    const handleVerify = () => {
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            setVerified(true);
        }, 2000);
    };

    return (
        <div style={{ padding: "48px 64px", maxWidth: 800 }} className="animate-fade-in">
            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Company Bank Account</h2>
            <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Salary disbursements will be processed from this account.</p>

            {/* Security Banner */}
            <div className="flex items-center gap-3 mt-8 mb-8 rounded-xl p-4" style={{ background: "rgba(0,102,255,0.1)", border: "1px solid rgba(0,102,255,0.3)" }}>
                <Lock size={20} color="#0066FF" className="flex-shrink-0" />
                <div style={{ fontSize: 14, color: "#FFFFFF" }}>
                    Bank details are encrypted with AES-256. Only authorized admins can view.
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32 }}>

                {/* Section 1 */}
                <h3 style={{ fontSize: 16, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Primary Salary Account</h3>
                <div className="grid grid-cols-2 gap-6">
                    <Input label="Account Holder Name *" placeholder="TechCorp Solutions Private Limited" />

                    <div className="relative">
                        <Input label="Account Number *" type={showAcct ? "text" : "password"} value={acct} onChange={(e) => setAcct(e.target.value)} placeholder="••••••••••1234" />
                        <button type="button" onClick={() => setShowAcct(!showAcct)} className="absolute right-3 top-[34px] text-[#445566]">
                            {showAcct ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <Input label="Confirm Account Number *" type="password" placeholder="••••••••••1234" />

                    <div>
                        <Input label="IFSC Code *" placeholder="HDFC0001234" value={ifsc} onChange={(e) => setIfsc(e.target.value.toUpperCase())} maxLength={11} />
                        {isHdfc && (
                            <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg animate-fade-in" style={{ background: "#060B14", border: "1px solid rgba(0,229,160,0.3)" }}>
                                <Landmark size={14} color="#8899AA" />
                                <span className="text-xs text-white truncate">HDFC Bank — Andheri West Branch, Mumbai</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Bank Name</label>
                        <input value={isHdfc ? "HDFC Bank" : ""} readOnly className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] outline-none" />
                    </div>
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Branch Name</label>
                        <input value={isHdfc ? "Andheri West, Mumbai" : ""} readOnly className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] outline-none" />
                    </div>

                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Account Type *</label>
                        <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                            <option>Current Account</option>
                            <option>Savings Account</option>
                            <option>OD Account</option>
                        </select>
                    </div>
                    <Input label="MICR Code" placeholder="Optional" />
                </div>

                <div style={{ height: 1, background: "#1A2A3A", margin: "32px 0" }} />

                {/* Section 2 */}
                <h3 style={{ fontSize: 16, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Salary Disbursement Settings</h3>
                <div className="flex flex-col gap-6">
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 8, display: "block" }}>Disbursement Method *</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" name="method" defaultChecked className="accent-[#00E5A0]" /> NEFT / RTGS (Bank Transfer)</label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" name="method" className="accent-[#00E5A0]" /> IMPS</label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" name="method" className="accent-[#00E5A0]" /> Payment Gateway</label>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Salary Payment Day *</label>
                        <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                            <option>Last working day of month</option>
                            <option>1st of next month</option>
                            <option>5th of next month</option>
                            <option>7th of next month</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#060B14] border border-[#1A2A3A]">
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>After payroll approval, auto-initiate payment?</div>
                            <div style={{ fontSize: 12, color: "#8899AA" }}>Directly queue transactions to corporate banking via API</div>
                        </div>
                        <button type="button" style={{ width: 44, height: 24, borderRadius: 12, background: "#1A2A3A", position: "relative" }}>
                            <div style={{ position: "absolute", top: 3, left: 3, width: 18, height: 18, borderRadius: "50%", background: "#FFFFFF" }} />
                        </button>
                    </div>
                </div>

                <div style={{ height: 1, background: "#1A2A3A", margin: "32px 0" }} />

                {/* Section 3 */}
                <h3 style={{ fontSize: 16, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Verification</h3>

                {!verified ? (
                    <div className="rounded-xl p-5" style={{ background: "#060B14", border: "1px solid rgba(255,184,0,0.3)" }}>
                        <div className="flex items-center gap-2 mb-1">
                            <Zap size={16} color="#FFB800" />
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Verify Bank Account (Recommended)</span>
                        </div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 16, paddingLeft: 24 }}>
                            We&apos;ll send ₹1 to verify account, refunded immediately
                        </div>
                        <Button onClick={handleVerify} isLoading={verifying} loadingText="Verification in progress (2-3 minutes)">Initiate Penny Drop Verification</Button>
                    </div>
                ) : (
                    <div className="rounded-xl p-4 flex items-center gap-3 animate-fade-in" style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.3)" }}>
                        <CheckCircle2 size={20} color="#00E5A0" />
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#00E5A0" }}>Account verified successfully</div>
                            <div style={{ fontSize: 11, color: "#8899AA", marginTop: 8 }}>{new Date().toLocaleString()}</div>
                        </div>
                    </div>
                )}

            </div>
            <div className="mt-4">
                <Button variant="ghost" size="sm">Add Another Bank Account</Button>
            </div>
        </div>
    );
}
