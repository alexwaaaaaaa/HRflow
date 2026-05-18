"use client";

import React from "react";
import { Download, Info } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function ComputationRow({ label, value, indent = false, bold = false, valueColor = "text-white" }: {
    label: string;
    value: string;
    indent?: boolean;
    bold?: boolean;
    valueColor?: string;
}) {
    return (
        <div className={`grid grid-cols-[1fr_140px] gap-4 mb-3 ${indent ? "pl-4" : ""}`}>
            <p className={`text-sm ${bold ? "font-semibold text-white" : "text-[#8899AA]"}`}>{label}</p>
            <p className={`text-sm text-right ${bold ? "font-semibold" : "font-medium"} ${valueColor}`}>{value}</p>
        </div>
    );
}

function SectionDivider() {
    return <div className="border-t border-[#1A2A3A] my-4" />;
}

function DashedDivider() {
    return <div className="border-t border-dashed border-[#445566] my-4" />;
}

export default function TDSComputation() {
    // All derived values preserved byte-identical
    return (
        <Page
            title="TDS Computation Sheet"
            subtitle="Rahul Sharma (EMP-0848) • FY 2024-25 • Old Regime"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "TDS Computation" },
            ]}
            maxWidth="1000px"
            actions={
                <Button icon={<Download size={14} />}>Download PDF</Button>
            }
        >
            <div className="space-y-6">
                {/* KPI Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card padding="md">
                        <p className="text-xs text-[#8899AA] mb-2">Estimated Annual Taxable Income</p>
                        <p className="text-2xl font-bold text-white">₹9,42,000</p>
                    </Card>
                    <Card padding="md">
                        <p className="text-xs text-[#8899AA] mb-2">Total Tax Computed</p>
                        <p className="text-2xl font-bold text-white">₹1,04,936</p>
                    </Card>
                    <Card padding="md" className="bg-[#0066FF]/5 border border-[#0066FF]/20">
                        <p className="text-xs text-[#0066FF] mb-2">TDS Deducted So Far</p>
                        <p className="text-2xl font-bold text-[#0066FF]">₹52,468 <span className="text-sm font-medium text-[#8899AA]">/ Apr-Sep</span></p>
                    </Card>
                    <Card padding="md" className="bg-[#FFB800]/5 border border-[#FFB800]/20">
                        <p className="text-xs text-[#FFB800] mb-2">Remaining TDS Per Month</p>
                        <p className="text-2xl font-bold text-[#FFB800]">₹8,744 <span className="text-sm font-medium text-[#FFB800]">/ Oct-Mar</span></p>
                    </Card>
                </div>

                {/* Computation Details */}
                <Card padding="lg">
                    <h3 className="text-base font-semibold text-white mb-6">Computation Details</h3>

                    {/* Part A: Income */}
                    <div className="mb-8">
                        <h4 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-4">A. Income from Salary</h4>
                        <ComputationRow label="1. Gross Salary Details" value="₹14,00,000" bold />
                        <ComputationRow label="Basic Salary" value="6,00,000" indent />
                        <ComputationRow label="House Rent Allowance" value="3,00,000" indent />
                        <ComputationRow label="Special Allowance" value="5,00,000" indent />
                        <ComputationRow label="2. Less: Allowances Exempt u/s 10" value="(₹1,50,000)" valueColor="text-[#FF4444]" />
                        <ComputationRow label="House Rent Allowance Exemption (Sec 10(13A))" value="(1,50,000)" indent valueColor="text-[#FF4444]" />
                        <SectionDivider />
                        <ComputationRow label="3. Balance (1 - 2)" value="₹12,50,000" bold />
                        <ComputationRow label="4. Less: Deductions u/s 16" value="(₹52,500)" valueColor="text-[#FF4444]" />
                        <ComputationRow label="Standard Deduction u/s 16(ia)" value="(50,000)" indent valueColor="text-[#FF4444]" />
                        <ComputationRow label="Professional Tax u/s 16(iii)" value="(2,500)" indent valueColor="text-[#FF4444]" />
                        <DashedDivider />
                        <ComputationRow label="Income Chargeable under Head 'Salaries' (3 - 4)" value="₹11,97,500" bold valueColor="text-[#00E5A0]" />
                    </div>

                    {/* Part B: Other Income */}
                    <div className="mb-8">
                        <h4 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-4">B. Income From Other Sources</h4>
                        <ComputationRow label="Income from House Property (Loss)" value="(50,000)" valueColor="text-[#FF4444]" />
                        <DashedDivider />
                        <ComputationRow label="Gross Total Income (A + B)" value="₹11,47,500" bold valueColor="text-[#00E5A0]" />
                    </div>

                    {/* Part C: Deductions */}
                    <div className="mb-8">
                        <h4 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-4">C. Deductions under Chapter VI-A</h4>
                        <ComputationRow label="Section 80C (PPF, LIC, ELSS, EPF, etc.)" value="(1,50,000)" valueColor="text-[#FF4444]" />
                        <ComputationRow label="Section 80CCD(1B) (NPS Tier 1 Additional)" value="(50,000)" valueColor="text-[#FF4444]" />
                        <ComputationRow label="Section 80D (Health Insurance Premium)" value="(5,500)" valueColor="text-[#FF4444]" />
                        <DashedDivider />
                        <ComputationRow label="Total Taxable Income" value="₹9,42,000" bold valueColor="text-[#00E5A0]" />
                    </div>

                    {/* Part D: Tax Calculation */}
                    <div>
                        <h4 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-4">D. Tax Calculation</h4>
                        <ComputationRow label="Tax on Total Income" value="1,00,900" />
                        <ComputationRow label="Less: Rebate u/s 87A" value="0" valueColor="text-[#FF4444]" />
                        <ComputationRow label="Surcharge" value="0" />
                        <ComputationRow label="Health & Education Cess @ 4%" value="4,036" />
                        <DashedDivider />
                        <ComputationRow label="Total Tax Payable" value="₹1,04,936" bold valueColor="text-[#FFB800]" />
                    </div>
                </Card>

                {/* Info */}
                <Card padding="md" className="bg-[#0066FF]/5 border border-[#0066FF]/20 flex items-start gap-3">
                    <Info size={18} className="text-[#0066FF] shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-[#8899AA] leading-relaxed">
                        This computation is based on current declarations. TDS might be re-adjusted if proofs for declared investments are not submitted and verified before the final cut-off date (31 Jan 2025).
                    </p>
                </Card>
            </div>
        </Page>
    );
}
