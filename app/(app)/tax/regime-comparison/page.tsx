"use client";

import React, { useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    Info,
    CornerDownRight,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function CompRow({
    label,
    value,
    isSub = false,
    textClass = "text-white",
    bold = false,
}: {
    label: string;
    value: string;
    isSub?: boolean;
    textClass?: string;
    bold?: boolean;
}) {
    const formattedValue =
        value === "0"
            ? "₹0"
            : Number(value) > 0
            ? `₹${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
            : `-₹${Math.abs(Number(value)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

    return (
        <div className={`flex justify-between items-center ${isSub ? "py-0.5" : "py-1"}`}>
            <span className={`text-sm ${isSub ? "text-[#8899AA]" : "text-[#c8d8e8]"} ${bold ? "font-bold text-white" : ""}`}>
                {isSub && <CornerDownRight size={12} className="inline mr-2 text-[#445566]" aria-hidden="true" />}
                {label}
            </span>
            <span className={`text-sm ${bold ? "font-bold" : "font-medium"} ${textClass}`}>{formattedValue}</span>
        </div>
    );
}

export default function RegimeComparisonScreen() {
    const [income, setIncome] = useState(1500000);
    const [deductions, setDeductions] = useState(250000);

    const stdDed = 50000;

    // OLD Regime — byte-identical to pre-migration
    const oldTaxable = Math.max(0, income - stdDed - deductions);
    let oldTax = 0;
    if (oldTaxable > 1000000) oldTax = 112500 + (oldTaxable - 1000000) * 0.3;
    else if (oldTaxable > 500000) oldTax = 12500 + (oldTaxable - 500000) * 0.2;
    else if (oldTaxable > 250000) oldTax = (oldTaxable - 250000) * 0.05;
    if (oldTaxable <= 500000) oldTax = 0;
    const oldTaxWithCess = oldTax > 0 ? oldTax * 1.04 : 0;

    // NEW Regime — byte-identical to pre-migration
    const newTaxable = Math.max(0, income - stdDed);
    let newTax = 0;
    if (newTaxable > 1500000) newTax = 150000 + (newTaxable - 1500000) * 0.3;
    else if (newTaxable > 1200000) newTax = 90000 + (newTaxable - 1200000) * 0.2;
    else if (newTaxable > 900000) newTax = 45000 + (newTaxable - 900000) * 0.15;
    else if (newTaxable > 600000) newTax = 15000 + (newTaxable - 600000) * 0.1;
    else if (newTaxable > 300000) newTax = (newTaxable - 300000) * 0.05;
    if (newTaxable <= 700000) newTax = 0;
    const newTaxWithCess = newTax > 0 ? newTax * 1.04 : 0;

    const diff = Math.abs(oldTaxWithCess - newTaxWithCess);
    const betterRegime = oldTaxWithCess < newTaxWithCess ? "old" : "new";
    const isEqual = oldTaxWithCess === newTaxWithCess;

    const generateRecommendation = () => {
        if (isEqual) return "Both regimes yield the exact same tax liability. You can choose either.";
        if (betterRegime === "new") {
            return `Based on your deductions (₹${(deductions / 100000).toFixed(1)}L), the New Tax Regime is beneficial. It saves you ₹${diff.toLocaleString()} annually without requiring you to make specific tax-saving investments.`;
        }
        return `Since your deductions (₹${(deductions / 100000).toFixed(1)}L) are substantial, the Old Tax Regime is better. It saves you ₹${diff.toLocaleString()} annually. Ensure you upload all proofs.`;
    };

    return (
        <Page
            title="Tax Regime Comparison"
            subtitle="Analyze and choose between the Old and New tax regimes for FY 2024-25."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Regime Comparison" },
            ]}
            maxWidth="1200px"
        >
            <div className="space-y-6">
                {/* Input Controls */}
                <Card padding="lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="income-range" className="text-sm font-semibold text-white">
                                    Gross Annual Income
                                </label>
                                <span className="text-[#00E5A0] font-bold text-lg">₹{(income / 100000).toFixed(2)}L</span>
                            </div>
                            <input
                                id="income-range"
                                type="range"
                                min="500000"
                                max="5000000"
                                step="50000"
                                value={income}
                                onChange={(e) => setIncome(Number(e.target.value))}
                                className="w-full accent-[#00E5A0]"
                                aria-label="Gross annual income"
                            />
                            <div className="flex justify-between text-[10px] text-[#445566] mt-1">
                                <span>₹5L</span>
                                <span>₹50L</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="deductions-range" className="text-sm font-semibold text-white">
                                    Total Deductions &amp; Exemptions
                                </label>
                                <span className="text-[#FFB800] font-bold text-lg">₹{(deductions / 100000).toFixed(2)}L</span>
                            </div>
                            <input
                                id="deductions-range"
                                type="range"
                                min="0"
                                max="1000000"
                                step="10000"
                                value={deductions}
                                onChange={(e) => setDeductions(Number(e.target.value))}
                                className="w-full accent-[#FFB800]"
                                aria-label="Total deductions and exemptions"
                            />
                            <div className="flex justify-between text-[10px] text-[#445566] mt-1">
                                <span>(80C, 80D, HRA, LTA, Interest etc.)</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Winner Banner */}
                <Card
                    padding="lg"
                    className={`flex items-center justify-between ${
                        betterRegime === "new" ? "border-[#00E5A0]/30 bg-[#00E5A0]/5" : "border-[#0066FF]/30 bg-[#0066FF]/5"
                    }`}
                >
                    <div className="flex items-start space-x-4">
                        <div
                            className={`mt-1 bg-white rounded-full p-2 shadow-sm ${
                                betterRegime === "new" ? "text-[#00E5A0]" : "text-[#0066FF]"
                            }`}
                        >
                            <CheckCircle2 size={24} aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white mb-1">
                                {isEqual
                                    ? "Both Regimes are Equal"
                                    : `The ${betterRegime === "new" ? "New" : "Old"} Regime is better for you`}
                            </h2>
                            <p className="text-sm text-[#8899AA] max-w-2xl">{generateRecommendation()}</p>
                        </div>
                    </div>
                    {!isEqual && (
                        <div className="text-right shrink-0 ml-4">
                            <span className="text-xs text-[#8899AA] uppercase tracking-wider font-bold block mb-1">Net Savings</span>
                            <span
                                className={`text-3xl font-black ${
                                    betterRegime === "new" ? "text-[#00E5A0]" : "text-[#0066FF]"
                                }`}
                            >
                                ₹{diff.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                        </div>
                    )}
                </Card>

                {/* Side by Side Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#1A2A3A] rounded-xl overflow-hidden bg-[#0A1420]">
                    {/* OLD REGIME */}
                    <div className="border-r border-[#1A2A3A]">
                        <div
                            className={`p-4 text-center border-b-4 ${
                                betterRegime === "old"
                                    ? "border-[#0066FF] bg-[#0066FF]/5"
                                    : "border-[#1A2A3A] bg-[#0D1928]"
                            }`}
                        >
                            <h3 className="text-lg font-bold text-white mb-1">Old Tax Regime</h3>
                            <p className="text-xs text-[#8899AA]">Favors high investments and exemptions</p>
                            {betterRegime === "old" && (
                                <Badge variant="info" className="mt-3">Recommended</Badge>
                            )}
                        </div>
                        <div className="p-6 space-y-3">
                            <CompRow label="Gross Income" value={String(income)} />
                            <CompRow label="Less: Standard Deduction" value={String(-stdDed)} isSub textClass="text-[#00E5A0]" />
                            <CompRow label="Less: Tax Deductions (80C/D etc)" value={String(-deductions)} isSub textClass="text-[#00E5A0]" />
                            <CompRow label="Net Taxable Income" value={String(oldTaxable)} bold />
                            <div className="border-t border-[#1A2A3A] pt-3 mt-2" />
                            <CompRow label="Base Tax" value={String(oldTax)} />
                            <CompRow label="Add: Cess (4%)" value={String(oldTax * 0.04)} isSub />
                            <div
                                className={`mt-4 p-4 rounded-lg flex justify-between items-center ${
                                    betterRegime === "old"
                                        ? "bg-[#0066FF]/20 border border-[#0066FF]/30"
                                        : "bg-[#1A2A3A] border border-[#2A3A4A]"
                                }`}
                            >
                                <span className="font-bold text-[#c8d8e8]">Total Tax Payable</span>
                                <span className="text-xl font-black text-white">
                                    ₹{oldTaxWithCess.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* NEW REGIME */}
                    <div>
                        <div
                            className={`p-4 text-center border-b-4 ${
                                betterRegime === "new"
                                    ? "border-[#00E5A0] bg-[#00E5A0]/5"
                                    : "border-[#1A2A3A] bg-[#0D1928]"
                            }`}
                        >
                            <h3 className="text-lg font-bold text-white mb-1">New Tax Regime</h3>
                            <p className="text-xs text-[#8899AA]">Lower base rates, fewer deductions allowed</p>
                            {betterRegime === "new" && (
                                <Badge variant="success" className="mt-3">Recommended</Badge>
                            )}
                        </div>
                        <div className="p-6 space-y-3">
                            <CompRow label="Gross Income" value={String(income)} />
                            <CompRow label="Less: Standard Deduction" value={String(-stdDed)} isSub textClass="text-[#00E5A0]" />
                            <div className="flex justify-between items-center py-0.5">
                                <span className="text-sm text-[#445566] line-through">Less: Tax Deductions</span>
                                <span className="text-sm font-medium text-[#445566]">
                                    -₹0 <span className="text-[10px] ml-1">(Not allowed)</span>
                                </span>
                            </div>
                            <CompRow label="Net Taxable Income" value={String(newTaxable)} bold />
                            <div className="border-t border-[#1A2A3A] pt-3 mt-2" />
                            <CompRow label="Base Tax" value={String(newTax)} />
                            <CompRow label="Add: Cess (4%)" value={String(newTax * 0.04)} isSub />
                            <div
                                className={`mt-4 p-4 rounded-lg flex justify-between items-center ${
                                    betterRegime === "new"
                                        ? "bg-[#00E5A0]/20 border border-[#00E5A0]/30"
                                        : "bg-[#1A2A3A] border border-[#2A3A4A]"
                                }`}
                            >
                                <span className="font-bold text-[#c8d8e8]">Total Tax Payable</span>
                                <span className="text-xl font-black text-white">
                                    ₹{newTaxWithCess.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <Card padding="lg" className="flex justify-between items-center">
                    <div className="flex items-start space-x-3">
                        <Info size={20} className="text-[#8899AA] shrink-0" aria-hidden="true" />
                        <div>
                            <h4 className="text-sm font-bold text-white">Ready to declare your choice?</h4>
                            <p className="text-xs text-[#8899AA] mt-1">
                                You can change your selected regime before the payroll cutoff date.
                            </p>
                        </div>
                    </div>
                    <Button iconRight={<ArrowRight size={16} />}>
                        Opt for {betterRegime === "new" ? "New" : "Old"} Regime
                    </Button>
                </Card>
            </div>
        </Page>
    );
}
