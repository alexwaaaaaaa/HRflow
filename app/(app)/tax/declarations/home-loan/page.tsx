"use client";

import React, { useState } from "react";
import {
    Home,
    Building,
    Hammer,
    Upload,
    CheckCircle2,
    FileText,
    AlertCircle,
    ChevronRight,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ── Static maps (no template-literal classes) ─────────────────────────────────
const PROPERTY_TYPE_CLASSES: Record<string, { border: string; bg: string; text: string; icon: string }> = {
    self: {
        border: "border-[#0066FF]",
        bg: "bg-[#0066FF]/10",
        text: "text-white",
        icon: "text-[#0066FF]",
    },
    letout: {
        border: "border-[#0066FF]",
        bg: "bg-[#0066FF]/10",
        text: "text-white",
        icon: "text-[#0066FF]",
    },
    underconstruction: {
        border: "border-[#0066FF]",
        bg: "bg-[#0066FF]/10",
        text: "text-white",
        icon: "text-[#0066FF]",
    },
};

const PROPERTY_TYPE_INACTIVE = "border-white/10 text-[#445566] hover:border-white/30";

export default function HomeLoanPage() {
    const [propertyType, setPropertyType] = useState("self");
    const [interest, setInterest] = useState(242000);
    const [principal, setPrincipal] = useState(148000);

    const sec24Cap = 200000;

    // Calculation logic — byte-identical to pre-migration
    const claimableInterest = propertyType === "self" ? Math.min(interest, sec24Cap) : interest;
    const excessInterest = Math.max(0, interest - sec24Cap);
    const taxSaved = claimableInterest * 0.22;

    const activeClasses = PROPERTY_TYPE_CLASSES[propertyType] ?? PROPERTY_TYPE_CLASSES.self;

    return (
        <Page
            title="Home Loan — Tax Declaration"
            subtitle="Section 24b (Interest) | Section 80C (Principal) | Section 80EEA (Additional interest)"
            breadcrumbs={[
                { label: "Tax", href: "/tax/declarations" },
                { label: "Home Loan" },
            ]}
            maxWidth="1400px"
        >
            <div className="space-y-6">
                {/* Property Type Selector */}
                <Card padding="lg">
                    <h2 className="text-lg font-bold text-white mb-4">What type of property do you have?</h2>
                    <fieldset role="radiogroup" aria-label="Property type" className="border-0 p-0 m-0">
                        <legend className="sr-only">Property type</legend>
                        <div className="flex flex-wrap gap-4">
                            {[
                                { id: "self", label: "Self-Occupied", Icon: Home },
                                { id: "letout", label: "Let-Out / Rented", Icon: Building },
                                { id: "underconstruction", label: "Under Construction", Icon: Hammer },
                            ].map(({ id, label, Icon }) => {
                                const isActive = propertyType === id;
                                return (
                                    <label
                                        key={id}
                                        className={`flex-1 min-w-[160px] p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                                            isActive
                                                ? `${activeClasses.border} ${activeClasses.bg} ${activeClasses.text}`
                                                : PROPERTY_TYPE_INACTIVE
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="propertyType"
                                            value={id}
                                            checked={isActive}
                                            onChange={() => setPropertyType(id)}
                                            className="sr-only"
                                        />
                                        <Icon
                                            className={`w-6 h-6 ${isActive ? activeClasses.icon : "text-[#445566]"}`}
                                            aria-hidden="true"
                                        />
                                        <span className="font-bold text-sm text-center">{label}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Left Panel */}
                    <div className="xl:col-span-7 space-y-6">
                        {/* Loan Details */}
                        <Card padding="lg">
                            <h3 className="text-base font-semibold text-white mb-5">Loan Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="bank-name" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                        Bank Name
                                    </label>
                                    <input
                                        id="bank-name"
                                        type="text"
                                        defaultValue="SBI Home Loans"
                                        className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="loan-account" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                        Loan Account No.
                                    </label>
                                    <input
                                        id="loan-account"
                                        type="text"
                                        defaultValue="SBIH2024XXXXXX"
                                        className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm font-mono tracking-wider text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="disbursement-date" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                        Loan Disbursement Date
                                    </label>
                                    <input
                                        id="disbursement-date"
                                        type="date"
                                        defaultValue="2020-03-15"
                                        className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="outstanding-principal" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                        Outstanding Principal
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-[#8899AA]">₹</span>
                                        <input
                                            id="outstanding-principal"
                                            type="text"
                                            defaultValue="35,00,000"
                                            className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Interest & Principal */}
                        <Card padding="none">
                            <div className="flex justify-between items-center px-5 py-4 border-b border-[#1A2A3A] bg-[#0A1420]/30">
                                <h3 className="font-bold text-white text-base">Annual Interest Statement (FY 2024-25)</h3>
                                <Badge variant="warning">Requires Proof</Badge>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="interest-paid" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                            Total Interest Paid
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-[#8899AA]">₹</span>
                                            <input
                                                id="interest-paid"
                                                type="number"
                                                value={interest}
                                                onChange={(e) => setInterest(Number(e.target.value))}
                                                className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="principal-repaid" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                            Total Principal Repaid
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-[#8899AA]">₹</span>
                                            <input
                                                id="principal-repaid"
                                                type="number"
                                                value={principal}
                                                onChange={(e) => setPrincipal(Number(e.target.value))}
                                                className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {propertyType === "self" && (
                                    <Card variant="bare" className="bg-[#0A1420] rounded-lg p-3 border border-white/5 text-sm">
                                        <p className="text-[#8899AA] mb-1">
                                            Max claimable interest for self-occupied:{" "}
                                            <span className="text-white font-bold">₹2,00,000</span>
                                        </p>
                                        {excessInterest > 0 && (
                                            <p className="text-[#FFB800] text-xs flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" aria-hidden="true" />
                                                ₹{excessInterest.toLocaleString("en-IN")} interest cannot be claimed.
                                            </p>
                                        )}
                                    </Card>
                                )}

                                <Card variant="bare" className="bg-[#0A1420] rounded-lg p-3 border border-white/5 text-sm">
                                    <p className="text-[#8899AA]">
                                        Principal component (
                                        <span className="text-white font-bold">₹{principal.toLocaleString("en-IN")}</span>)
                                        directly added to Section 80C pool.
                                    </p>
                                </Card>

                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <h4 className="text-sm font-bold text-[#c8d8e8] mb-2">Upload Interest Certificate</h4>
                                    <p className="text-xs text-[#445566] mb-3">
                                        Download the format from your bank portal (e.g. SBI → Statement → Interest Certificate)
                                    </p>
                                    <Button variant="secondary" className="w-full" icon={<Upload className="w-4 h-4" />}>
                                        Upload Certificate
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* First Time Buyer */}
                        <Card padding="lg">
                            <h3 className="font-bold text-white text-base mb-3">First Time Buyer (80EEA)</h3>
                            <p className="text-sm text-[#c8d8e8] mb-4">
                                Are you a first-time property buyer and the loan was sanctioned between 01/04/2019 and 31/03/2022?
                            </p>
                            <div className="flex gap-4">
                                <Button variant="secondary" className="flex-1">Yes (Check Eligibility)</Button>
                                <Button className="flex-1">No</Button>
                            </div>
                            <Card variant="bare" className="mt-4 text-xs text-[#445566] p-3 bg-[#0A1420] rounded-lg border border-white/5">
                                80EEA provides an additional ₹1,50,000 deduction on home loan interest beyond the ₹2,00,000 limit,
                                subject to conditions (e.g. Stamp value ≤ ₹45L).
                            </Card>
                        </Card>
                    </div>

                    {/* Right Panel: Deduction Tracker */}
                    <div className="xl:col-span-5">
                        <Card padding="lg" className="lg:sticky lg:top-6">
                            <h3 className="font-bold text-white text-lg mb-5">Deduction Tracker</h3>

                            {/* Section 24b */}
                            <div className="mb-5">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-sm font-bold text-white">Section 24b (Interest)</h4>
                                    <span className="text-[#00E5A0] font-mono font-bold">
                                        ₹{claimableInterest.toLocaleString("en-IN")}
                                    </span>
                                </div>
                                <div className="space-y-2 text-xs text-[#8899AA] bg-[#0A1420] p-3 rounded-lg border border-white/5">
                                    <div className="flex justify-between">
                                        <span>Actual Interest</span>
                                        <span className="font-mono text-white">₹{interest.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Max Limit (Self-Occupied)</span>
                                        <span className="font-mono text-white">₹{sec24Cap.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                                        <span>Excess (Not claimed)</span>
                                        <span className="font-mono text-white">₹{excessInterest.toLocaleString("en-IN")}</span>
                                    </div>
                                    {claimableInterest === sec24Cap && (
                                        <div className="mt-2 text-[#00E5A0] font-bold flex items-center justify-end gap-1">
                                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Fully Claimed
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-[#1A2A3A] my-4" />

                            {/* Section 80C */}
                            <div className="mb-5">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-sm font-bold text-white">Section 80C (Principal)</h4>
                                    <span className="text-[#00E5A0] font-mono font-bold">
                                        ₹{principal.toLocaleString("en-IN")}
                                    </span>
                                </div>
                                <div className="space-y-2 text-xs text-[#8899AA] bg-[#0A1420] p-3 rounded-lg border border-white/5">
                                    <p>This amount is routed to the consolidated 80C pool limit of ₹1,50,000.</p>
                                    <p className="mt-2 text-[#0066FF] font-medium text-right flex items-center justify-end gap-1">
                                        View 80C Status <ChevronRight className="w-3 h-3" aria-hidden="true" />
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-[#1A2A3A] pt-5">
                                <h4 className="text-sm font-bold text-white mb-4">Tax Impact</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-[#c8d8e8]">
                                        <span>Without home loan (Tax)</span>
                                        <span className="font-mono">₹55,058</span>
                                    </div>
                                    <div className="flex justify-between text-[#00E5A0] pb-2 border-b border-white/5">
                                        <span>Home loan saves (Section 24b)</span>
                                        <span className="font-mono">-₹{taxSaved.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex justify-between text-white font-bold pt-1">
                                        <span>Effective tax liability</span>
                                        <span className="font-mono text-lg">
                                            ₹{Math.max(0, 55058 - taxSaved).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                </div>
                                <Card variant="bare" className="mt-4 bg-[#0A1420] rounded-lg p-3 text-center border border-white/5">
                                    <p className="text-xs text-[#8899AA] mb-1">Your monthly in-hand increases by</p>
                                    <p className="text-xl font-bold text-[#00E5A0]">
                                        ₹{Math.round(taxSaved / 12).toLocaleString("en-IN")} / mo
                                    </p>
                                </Card>
                            </div>

                            <Button className="w-full mt-6" icon={<FileText className="w-4 h-4" />}>
                                Save Home Loan Declaration
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
