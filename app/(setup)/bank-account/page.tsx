"use client";

import { useState } from "react";
import { Lock, Landmark, Zap, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function BankAccountPage() {
    const [acct, setAcct] = useState("");
    const [showAcct, setShowAcct] = useState(false);
    const [ifsc, setIfsc] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [autoInitiate, setAutoInitiate] = useState(false);

    const isHdfc = ifsc.length >= 4 && ifsc.toUpperCase().startsWith("HDFC");

    const handleVerify = () => {
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            setVerified(true);
        }, 2000);
    };

    return (
        <div className="px-16 py-12 max-w-[800px] animate-fade-in">
            <h2 className="text-2xl font-semibold text-white m-0">Company Bank Account</h2>
            <p className="text-sm text-[#8899AA] mt-1">Salary disbursements will be processed from this account.</p>

            {/* Security Banner */}
            <div className="flex items-center gap-3 mt-8 mb-8 rounded-xl p-4 bg-[rgba(0,102,255,0.1)] border border-[rgba(0,102,255,0.3)]">
                <Lock size={20} color="#0066FF" className="flex-shrink-0" aria-hidden="true" />
                <div className="text-sm text-white">
                    Bank details are encrypted with AES-256. Only authorized admins can view.
                </div>
            </div>

            <Card variant="default" padding="lg">
                {/* Section 1 */}
                <h3 className="text-base font-semibold text-white m-0 mb-5">Primary Salary Account</h3>
                <div className="grid grid-cols-2 gap-6">
                    <Input label="Account Holder Name *" placeholder="TechCorp Solutions Private Limited" />

                    <div className="relative">
                        <Input
                            label="Account Number *"
                            type={showAcct ? "text" : "password"}
                            value={acct}
                            onChange={(e) => setAcct(e.target.value)}
                            placeholder="••••••••••1234"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAcct(!showAcct)}
                            className="absolute right-3 top-[34px] h-6 w-6 p-0 border-0 bg-transparent text-[#445566]"
                            aria-label={showAcct ? "Hide account number" : "Show account number"}
                        >
                            {showAcct ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                        </Button>
                    </div>

                    <Input label="Confirm Account Number *" type="password" placeholder="••••••••••1234" />

                    <div>
                        <Input
                            label="IFSC Code *"
                            placeholder="HDFC0001234"
                            value={ifsc}
                            onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                            maxLength={11}
                        />
                        {isHdfc && (
                            <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg animate-fade-in bg-[#060B14] border border-[rgba(0,229,160,0.3)]">
                                <Landmark size={14} color="#8899AA" aria-hidden="true" />
                                <span className="text-xs text-white truncate">HDFC Bank — Andheri West Branch, Mumbai</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="bank-name" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Bank Name</label>
                        <input id="bank-name" value={isHdfc ? "HDFC Bank" : ""} readOnly className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] outline-none" />
                    </div>
                    <div>
                        <label htmlFor="branch-name" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Branch Name</label>
                        <input id="branch-name" value={isHdfc ? "Andheri West, Mumbai" : ""} readOnly className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] outline-none" />
                    </div>

                    <div>
                        <label htmlFor="account-type" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Account Type *</label>
                        <select id="account-type" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                            <option>Current Account</option>
                            <option>Savings Account</option>
                            <option>OD Account</option>
                        </select>
                    </div>
                    <Input label="MICR Code" placeholder="Optional" />
                </div>

                <div className="h-px bg-[#1A2A3A] my-8" />

                {/* Section 2 */}
                <h3 className="text-base font-semibold text-white m-0 mb-5">Salary Disbursement Settings</h3>
                <div className="flex flex-col gap-6">
                    <fieldset>
                        <legend className="block text-xs font-medium text-[#9ca3af] mb-2">Disbursement Method *</legend>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                <input type="radio" name="method" defaultChecked className="accent-[#00E5A0]" /> NEFT / RTGS (Bank Transfer)
                            </label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                <input type="radio" name="method" className="accent-[#00E5A0]" /> IMPS
                            </label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                <input type="radio" name="method" className="accent-[#00E5A0]" /> Payment Gateway
                            </label>
                        </div>
                    </fieldset>
                    <div className="w-1/2">
                        <label htmlFor="salary-day" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Salary Payment Day *</label>
                        <select id="salary-day" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                            <option>Last working day of month</option>
                            <option>1st of next month</option>
                            <option>5th of next month</option>
                            <option>7th of next month</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#060B14] border border-[#1A2A3A]">
                        <div>
                            <div className="text-sm font-medium text-white">After payroll approval, auto-initiate payment?</div>
                            <div className="text-xs text-[#8899AA]">Directly queue transactions to corporate banking via API</div>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setAutoInitiate(!autoInitiate)}
                            className="relative w-11 h-6 p-0 border-0 rounded-full transition-colors flex-shrink-0"
                            style={{ background: autoInitiate ? "#00E5A0" : "#1A2A3A" }}
                            aria-pressed={autoInitiate}
                            aria-label="Toggle auto-initiate payment"
                        >
                            <span
                                className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all duration-200"
                                style={{ left: autoInitiate ? 23 : 3 }}
                            />
                        </Button>
                    </div>
                </div>

                <div className="h-px bg-[#1A2A3A] my-8" />

                {/* Section 3 */}
                <h3 className="text-base font-semibold text-white m-0 mb-5">Verification</h3>

                {!verified ? (
                    <div className="rounded-xl p-5 bg-[#060B14] border border-[rgba(255,184,0,0.3)]">
                        <div className="flex items-center gap-2 mb-1">
                            <Zap size={16} color="#FFB800" aria-hidden="true" />
                            <span className="text-sm font-semibold text-white">Verify Bank Account (Recommended)</span>
                        </div>
                        <div className="text-xs text-[#8899AA] mb-4 pl-6">
                            We&apos;ll send ₹1 to verify account, refunded immediately
                        </div>
                        <Button onClick={handleVerify} isLoading={verifying} loadingText="Verification in progress (2-3 minutes)">
                            Initiate Penny Drop Verification
                        </Button>
                    </div>
                ) : (
                    <div className="rounded-xl p-4 flex items-center gap-3 animate-fade-in bg-[rgba(0,229,160,0.05)] border border-[rgba(0,229,160,0.3)]">
                        <CheckCircle2 size={20} color="#00E5A0" aria-hidden="true" />
                        <div>
                            <div className="text-sm font-semibold text-[#00E5A0]">Account verified successfully</div>
                            <div className="text-xs text-[#8899AA] mt-1">{new Date().toLocaleString()}</div>
                        </div>
                    </div>
                )}
            </Card>

            <div className="mt-4">
                <Button variant="ghost" size="sm">Add Another Bank Account</Button>
            </div>
        </div>
    );
}
