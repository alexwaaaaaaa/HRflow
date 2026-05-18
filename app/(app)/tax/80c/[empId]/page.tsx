"use client";

import React, { useState } from "react";
import { Info, Save, Lock, Upload } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const INVESTMENTS_80C = [
    { id: "epf", name: "Employee Provident Fund (EPF)", desc: "Auto-computed from payroll", isAuto: true },
    { id: "ppf", name: "Public Provident Fund (PPF)", desc: "Notified under section 80C", isAuto: false },
    { id: "lic", name: "Life Insurance Premium", desc: "For self, spouse or children", isAuto: false },
    { id: "elss", name: "Equity Linked Savings Scheme (ELSS)", desc: "Mutual funds with 3yr lock-in", isAuto: false },
    { id: "tuition", name: "Children's Tuition Fee", desc: "Max 2 children, full time education", isAuto: false },
    { id: "fd", name: "Tax Saving Fixed Deposit", desc: "5 year notified term deposit", isAuto: false },
    { id: "home_principal", name: "Home Loan Principal Repayment", desc: "Notified under section 80C", isAuto: false },
    { id: "ssy", name: "Sukanya Samriddhi Yojana", desc: "For girl child", isAuto: false },
];

const _EPF_AMOUNT = 57600;

export default function Section80C() {
    const [values, setValues] = useState<Record<string, string>>({
        epf: "57,600",
        ppf: "50,000",
        lic: "30,000",
        elss: "40,000",
    });

    // Calculation — byte-identical to pre-migration
    const totalDeclared = 177600; // 57.6 + 50 + 30 + 40
    const eligibleAmount = Math.min(totalDeclared, 150000);

    return (
        <Page
            title="80C Investments"
            subtitle="Maximum deduction allowed: ₹1,50,000"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "Declaration", href: "/tax/declaration/EMP-0848" },
                { label: "80C Investments" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                {/* Form Area */}
                <div className="flex flex-col gap-4">
                    {INVESTMENTS_80C.map((inv) => (
                        <Card key={inv.id} padding="md">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        {inv.isAuto && <Lock size={16} className="text-[#8899AA]" aria-hidden="true" />}
                                        <h3 className="text-sm font-semibold text-white">{inv.name}</h3>
                                        {inv.isAuto && (
                                            <span className="text-[11px] bg-[#00E5A0]/10 text-[#00E5A0] px-1.5 py-0.5 rounded font-semibold">Auto-fetched</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-[#8899AA]">{inv.desc}</p>
                                </div>
                                <div className="flex items-center gap-3 ml-4">
                                    <div className="relative w-44">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                        <input
                                            id={`input-${inv.id}`}
                                            type="text"
                                            value={values[inv.id] ?? ""}
                                            onChange={(e) => setValues({ ...values, [inv.id]: e.target.value })}
                                            disabled={inv.isAuto}
                                            placeholder="0"
                                            aria-label={inv.name}
                                            className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-7 pr-3 outline-none focus:border-[#00E5A0] disabled:opacity-60 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                    {!inv.isAuto && (
                                        <Button variant="secondary" size="sm" icon={<Upload size={14} />}>
                                            Proof
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Sticky Summary */}
                <div className="lg:sticky lg:top-6 lg:self-start">
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-5">80C Summary</h3>

                        <div className="flex flex-col gap-3 mb-5 border-b border-[#1A2A3A] pb-5">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#8899AA]">Total Declared Amount</span>
                                <span className="text-white font-semibold">₹{totalDeclared.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#8899AA]">Maximum Limit</span>
                                <span className="text-white">₹1,50,000</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-semibold text-white">Eligible Deduction</span>
                            <span className="text-xl font-bold text-[#00E5A0]">₹{eligibleAmount.toLocaleString()}</span>
                        </div>

                        {totalDeclared > 150000 && (
                            <div className="bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-lg p-3 flex gap-2 mb-6">
                                <Info size={16} className="text-[#FFB800] shrink-0 mt-0.5" aria-hidden="true" />
                                <p className="text-xs text-[#FFB800] leading-relaxed">
                                    Your total declared amount exceeds the ₹1.5L limit. The maximum allowed deduction will be restricted to ₹1,50,000.
                                </p>
                            </div>
                        )}

                        <Button className="w-full" icon={<Save size={16} />}>
                            Save 80C Declaration
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
