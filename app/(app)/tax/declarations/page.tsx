"use client";

import React, { useState } from "react";
import {
    ChevronRight,
    ChevronDown,
    CheckCircle2,
    Lock,
    Upload,
    AlertTriangle,
    PieChart,
} from "lucide-react";
import Link from "next/link";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function EmployeeTaxDeclaration() {
    const [expandedSection, setExpandedSection] = useState<string | null>("regime");
    const [selectedRegime, setSelectedRegime] = useState<"old" | "new">("old");
    const [formData, setFormData] = useState({
        ppf: 50000,
        elss: 38400,
        lifeInsurance: 0,
        healthSelf: 15000,
        healthParents: 12000,
        rent: 18000,
        npsEmployee: 0,
    });

    const toggleSection = (section: string) => {
        if (expandedSection === section) {
            setExpandedSection(null);
        } else {
            setExpandedSection(section);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: Number(value) || 0,
        });
    };

    // Calculations — byte-identical to pre-migration values.
    const epf = 21600;
    const hramax = 171600;
    const npsEmployer = 60000;
    const stdDeduction = selectedRegime === "old" ? 50000 : 75000;

    const total80c = Math.min(150000, epf + formData.ppf + formData.elss + formData.lifeInsurance);
    const total80d =
        Math.min(50000, formData.healthSelf) + Math.min(50000, formData.healthParents);

    const grossIncome = 1140000;

    // Taxable Income Calculation
    let taxableIncome = grossIncome - stdDeduction;
    if (selectedRegime === "old") {
        taxableIncome =
            taxableIncome - hramax - total80c - total80d - npsEmployer - formData.npsEmployee;
    }

    // Very simplified tax calculation for demo purposes
    const oldRegimeTax = 41800; // Mocked calculation
    const newRegimeTax = 35200; // Mocked calculation
    const selectedTax = selectedRegime === "old" ? oldRegimeTax : newRegimeTax;

    const savingsMeterPercentage = selectedRegime === "old" ? 68 : 0;

    return (
        <Page
            title="Tax declarations"
            subtitle="FY 2024-25"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Declarations" },
            ]}
            maxWidth="1280px"
            actions={
                <Button variant="ghost" href="/tax/form-12bb">Download Form 12BB</Button>
            }
        >
            <div className="space-y-6">
                {/* Status row */}
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="danger">Deadline 31 Jan 2025</Badge>
                    <Badge variant="warning">Draft — not yet submitted</Badge>
                </div>

                {/* Progress Bar */}
                <Card padding="md">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-white">
                            Declaration Progress:{" "}
                            <span className="text-[#00E5A0]">3 of 7 sections complete</span>
                        </span>
                        <span className="text-xs text-slate-400">42%</span>
                    </div>
                    <div className="flex space-x-1 h-3">
                        <div className="flex-1 bg-[#00E5A0] rounded-l-full"></div>
                        <div className="flex-1 bg-[#00E5A0]"></div>
                        <div className="flex-1 bg-[#00E5A0]"></div>
                        <div className="flex-1 bg-slate-800"></div>
                        <div className="flex-1 bg-slate-800"></div>
                        <div className="flex-1 bg-slate-800"></div>
                        <div className="flex-1 bg-slate-800 rounded-r-full"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-slate-400 uppercase font-medium tracking-wider">
                        <span className="text-[#00E5A0]">Regime</span>
                        <span className="text-[#00E5A0]">80C</span>
                        <span className="text-[#00E5A0]">80D</span>
                        <span>HRA</span>
                        <span>Home Loan</span>
                        <span>NPS</span>
                        <span className="text-right">Others</span>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-start">
                    {/* LEFT PANEL: Declaration Form */}
                    <div className="space-y-4 min-w-0">

                        {/* Section 1: Regime */}
                        <Card padding="none" className="overflow-hidden transition-all">
                            <button
                                id="section-regime-summary"
                                onClick={() => toggleSection("regime")}
                                aria-expanded={expandedSection === "regime"}
                                aria-controls="section-regime-panel"
                                className="w-full flex items-center justify-between p-5 bg-[#0D1928] hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                            expandedSection === "regime" || selectedRegime
                                                ? "bg-[#00E5A0] text-[#0A1420]"
                                                : "bg-slate-800 text-slate-400"
                                        }`}
                                    >
                                        {selectedRegime ? <CheckCircle2 size={14} /> : "1"}
                                    </div>
                                    <h2 className="text-lg font-semibold text-white">
                                        Choose Your Tax Regime
                                    </h2>
                                </div>
                                {expandedSection === "regime" ? (
                                    <ChevronDown className="text-slate-400" />
                                ) : (
                                    <ChevronRight className="text-slate-400" />
                                )}
                            </button>

                            {expandedSection === "regime" && (
                                <div
                                    id="section-regime-panel"
                                    role="region"
                                    aria-labelledby="section-regime-summary"
                                    className="p-5 border-t border-slate-800 space-y-4"
                                >
                                    <fieldset
                                        role="radiogroup"
                                        aria-label="Tax regime"
                                        className="border-0 p-0 m-0"
                                    >
                                        <legend className="sr-only">Tax regime</legend>
                                        <div className="flex space-x-4">
                                            {/* Old Regime Card */}
                                            <label
                                                htmlFor="regime-old"
                                                className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all block ${
                                                    selectedRegime === "old"
                                                        ? "border-[#00E5A0] bg-[#00E5A0]/5"
                                                        : "border-slate-800 bg-[#0D1928] hover:border-slate-700"
                                                }`}
                                            >
                                                <input
                                                    id="regime-old"
                                                    type="radio"
                                                    name="regime"
                                                    value="old"
                                                    className="peer sr-only"
                                                    checked={selectedRegime === "old"}
                                                    onChange={() => setSelectedRegime("old")}
                                                />
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-white">
                                                        Old Tax Regime
                                                    </h3>
                                                    {selectedRegime === "old" && (
                                                        <div className="w-4 h-4 rounded-full bg-[#00E5A0] flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-[#0A1420] rounded-full"></div>
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-400 mb-4 h-8">
                                                    Claim deductions (80C, HRA, etc.) to reduce
                                                    taxable income.
                                                </p>
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-[10px] text-slate-400 uppercase font-medium">
                                                            Est. Annual Tax
                                                        </p>
                                                        <p className="text-lg font-bold text-white">
                                                            ₹{oldRegimeTax.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded">
                                                        Proofs required
                                                    </span>
                                                </div>
                                            </label>

                                            {/* New Regime Card */}
                                            <label
                                                htmlFor="regime-new"
                                                className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all block ${
                                                    selectedRegime === "new"
                                                        ? "border-[#00E5A0] bg-[#00E5A0]/5"
                                                        : "border-slate-800 bg-[#0D1928] hover:border-slate-700"
                                                }`}
                                            >
                                                <input
                                                    id="regime-new"
                                                    type="radio"
                                                    name="regime"
                                                    value="new"
                                                    className="peer sr-only"
                                                    checked={selectedRegime === "new"}
                                                    onChange={() => setSelectedRegime("new")}
                                                />
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-white">
                                                        New Tax Regime
                                                    </h3>
                                                    {selectedRegime === "new" ? (
                                                        <div className="w-4 h-4 rounded-full bg-[#00E5A0] flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-[#0A1420] rounded-full"></div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 border border-indigo-500/20 rounded-full">
                                                            Default
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-400 mb-4 h-8">
                                                    Lower slab rates, no deductions required or
                                                    permitted.
                                                </p>
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-[10px] text-slate-400 uppercase font-medium">
                                                            Est. Annual Tax
                                                        </p>
                                                        <p className="text-lg font-bold text-white">
                                                            ₹{newRegimeTax.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <span className="text-[10px] bg-[#00E5A0]/10 text-[#00E5A0] px-2 py-1 rounded">
                                                        No proofs needed
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </fieldset>

                                    {/* AI Recommendation */}
                                    <Card
                                        variant="bare"
                                        className="border border-[#00E5A0]/20 bg-[#00E5A0]/10 p-3 flex items-start rounded-lg"
                                    >
                                        <span className="text-xl mr-3 mt-0.5">💡</span>
                                        <div className="flex-1">
                                            <p className="text-sm text-[#00E5A0] font-medium">
                                                Based on your salary and declarations, New Regime
                                                saves you ₹
                                                {(oldRegimeTax - newRegimeTax).toLocaleString()}
                                                /year.
                                            </p>
                                            <p className="text-xs text-[#00E5A0]/70 mt-1">
                                                But if you max out 80C, Old Regime will be
                                                beneficial.{" "}
                                                <Link
                                                    href="/tax/regime-selector"
                                                    className="underline font-medium hover:text-white cursor-pointer"
                                                >
                                                    Compare both regimes →
                                                </Link>
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </Card>


                        {/* Section 2: 80C */}
                        <Card padding="none" className="overflow-hidden transition-all">
                            <button
                                id="section-80c-summary"
                                onClick={() => toggleSection("80c")}
                                aria-expanded={expandedSection === "80c"}
                                aria-controls="section-80c-panel"
                                aria-disabled={selectedRegime === "new"}
                                className={
                                    "w-full flex items-center justify-between p-5 transition-colors " +
                                    (selectedRegime === "new"
                                        ? "bg-slate-900/50 opacity-60 cursor-not-allowed"
                                        : "bg-[#0D1928] hover:bg-slate-800/50")
                                }
                                disabled={selectedRegime === "new"}
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                            expandedSection === "80c" || total80c > 0
                                                ? "bg-[#00E5A0] text-[#0A1420]"
                                                : "bg-slate-800 text-slate-400"
                                        }`}
                                    >
                                        {total80c > 0 && expandedSection !== "80c" ? (
                                            <CheckCircle2 size={14} />
                                        ) : (
                                            "2"
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-lg font-semibold text-white flex items-center">
                                            80C Investments{" "}
                                            <span className="text-xs font-normal text-slate-400 ml-2">
                                                (Max ₹1,50,000)
                                            </span>
                                        </h2>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            EPF, PPF, ELSS, Life Insurance, etc.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {selectedRegime === "old" && (
                                        <span className="text-sm font-semibold text-[#00E5A0]">
                                            ₹{total80c.toLocaleString()}
                                        </span>
                                    )}
                                    {expandedSection === "80c" ? (
                                        <ChevronDown className="text-slate-400" />
                                    ) : (
                                        <ChevronRight className="text-slate-400" />
                                    )}
                                </div>
                            </button>

                            {expandedSection === "80c" && selectedRegime === "old" && (
                                <div
                                    id="section-80c-panel"
                                    role="region"
                                    aria-labelledby="section-80c-summary"
                                    className="p-5 border-t border-slate-800 space-y-4"
                                >
                                    {/* Visual Progress */}
                                    <div className="flex flex-col mb-4">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-400">Total Declared</span>
                                            <span className="text-white font-medium">
                                                ₹{total80c.toLocaleString()} / ₹1,50,000
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className="bg-[#00E5A0] h-full transition-all duration-300"
                                                style={{
                                                    width: `${Math.min(100, (total80c / 150000) * 100)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {/* EPF (Auto) */}
                                        <div className="flex items-center justify-between p-3 bg-slate-800/20 border border-slate-800 rounded-lg">
                                            <div className="flex items-center">
                                                <Lock
                                                    size={16}
                                                    className="text-slate-400 mr-3"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-slate-300">
                                                        Employee Provident Fund (EPF)
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        Auto-calculated from payroll
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-white border border-transparent px-3 py-1">
                                                    ₹{epf.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* PPF */}
                                        <div className="flex items-center justify-between p-3 bg-[#0D1928] border border-slate-800 rounded-lg group hover:border-slate-700 transition-colors">
                                            <div>
                                                <label
                                                    htmlFor="input-ppf"
                                                    className="text-sm font-medium text-white"
                                                >
                                                    Public Provident Fund (PPF)
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                                                        ₹
                                                    </span>
                                                    <input
                                                        id="input-ppf"
                                                        type="number"
                                                        value={formData.ppf || ""}
                                                        onChange={(e) =>
                                                            handleInputChange("ppf", e.target.value)
                                                        }
                                                        className="w-28 bg-[#0A1420] border border-slate-700 text-white rounded px-3 py-1.5 pl-6 text-sm focus:outline-none focus:border-[#00E5A0] transition-colors"
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded flex items-center transition-colors"
                                                >
                                                    <Upload size={14} className="mr-1.5" /> Proof
                                                </button>
                                            </div>
                                        </div>

                                        {/* ELSS */}
                                        <div className="flex items-center justify-between p-3 bg-[#0D1928] border border-slate-800 rounded-lg group hover:border-slate-700 transition-colors">
                                            <div>
                                                <label
                                                    htmlFor="input-elss"
                                                    className="text-sm font-medium text-white"
                                                >
                                                    ELSS / Mutual Fund
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                                                        ₹
                                                    </span>
                                                    <input
                                                        id="input-elss"
                                                        type="number"
                                                        value={formData.elss || ""}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "elss",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-28 bg-[#0A1420] border border-slate-700 text-white rounded px-3 py-1.5 pl-6 text-sm focus:outline-none focus:border-[#00E5A0] transition-colors"
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded flex items-center transition-colors"
                                                >
                                                    <Upload size={14} className="mr-1.5" /> Proof
                                                </button>
                                            </div>
                                        </div>

                                        {/* Add more link */}
                                        <div className="pt-2 text-center">
                                            <Link
                                                href="/tax/declarations/80c"
                                                className="text-sm text-[#0066FF] hover:underline cursor-pointer font-medium"
                                            >
                                                + Add Home Loan Principal, Tuition Fees, NSC, etc.
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Section 3: 80D */}
                        <Card padding="none" className="overflow-hidden transition-all">
                            <button
                                id="section-80d-summary"
                                onClick={() => toggleSection("80d")}
                                aria-expanded={expandedSection === "80d"}
                                aria-controls="section-80d-panel"
                                aria-disabled={selectedRegime === "new"}
                                className={
                                    "w-full flex items-center justify-between p-5 transition-colors " +
                                    (selectedRegime === "new"
                                        ? "bg-slate-900/50 opacity-60 cursor-not-allowed"
                                        : "bg-[#0D1928] hover:bg-slate-800/50")
                                }
                                disabled={selectedRegime === "new"}
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                            expandedSection === "80d" || total80d > 0
                                                ? "bg-[#00E5A0] text-[#0A1420]"
                                                : "bg-slate-800 text-slate-400"
                                        }`}
                                    >
                                        {total80d > 0 && expandedSection !== "80d" ? (
                                            <CheckCircle2 size={14} />
                                        ) : (
                                            "3"
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-lg font-semibold text-white flex items-center">
                                            80D Health Insurance{" "}
                                            <span className="text-xs font-normal text-slate-400 ml-2">
                                                (Max ₹25K+₹25K)
                                            </span>
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {selectedRegime === "old" && (
                                        <span className="text-sm font-semibold text-[#00E5A0]">
                                            ₹{total80d.toLocaleString()}
                                        </span>
                                    )}
                                    {expandedSection === "80d" ? (
                                        <ChevronDown className="text-slate-400" />
                                    ) : (
                                        <ChevronRight className="text-slate-400" />
                                    )}
                                </div>
                            </button>
                            {/* Expanded state not rendered for brevity unless toggled */}
                        </Card>


                        {/* Section 4: HRA */}
                        <Card padding="none" className="overflow-hidden transition-all">
                            <button
                                id="section-hra-summary"
                                onClick={() => toggleSection("hra")}
                                aria-expanded={expandedSection === "hra"}
                                aria-controls="section-hra-panel"
                                aria-disabled={selectedRegime === "new"}
                                className={
                                    "w-full flex items-center justify-between p-5 transition-colors " +
                                    (selectedRegime === "new"
                                        ? "bg-slate-900/50 opacity-60 cursor-not-allowed"
                                        : "bg-[#0D1928] hover:bg-slate-800/50")
                                }
                                disabled={selectedRegime === "new"}
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                            expandedSection === "hra" || formData.rent > 0
                                                ? "bg-[#00E5A0] text-[#0A1420]"
                                                : "bg-slate-800 text-slate-400"
                                        }`}
                                    >
                                        {formData.rent > 0 && expandedSection !== "hra" ? (
                                            <CheckCircle2 size={14} />
                                        ) : (
                                            "4"
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-lg font-semibold text-white flex items-center">
                                            HRA Exemption Declaration
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {selectedRegime === "old" && (
                                        <span className="text-sm font-semibold text-[#00E5A0]">
                                            Exempt: ₹{hramax.toLocaleString()}
                                        </span>
                                    )}
                                    {expandedSection === "hra" ? (
                                        <ChevronDown className="text-slate-400" />
                                    ) : (
                                        <ChevronRight className="text-slate-400" />
                                    )}
                                </div>
                            </button>

                            {expandedSection === "hra" && selectedRegime === "old" && (
                                <div
                                    id="section-hra-panel"
                                    role="region"
                                    aria-labelledby="section-hra-summary"
                                    className="p-5 border-t border-slate-800 space-y-5"
                                >
                                    <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg flex space-x-4">
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-400 mb-1">
                                                HRA Received (Annual)
                                            </p>
                                            <p className="text-sm font-semibold text-white">
                                                ₹2,28,000
                                            </p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-400 mb-1">
                                                Basic Pay (Annual)
                                            </p>
                                            <p className="text-sm font-semibold text-white">
                                                ₹4,56,000
                                            </p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-400 mb-1">
                                                City Type
                                            </p>
                                            <p className="text-sm font-semibold text-white">
                                                Metro (50%)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label
                                                htmlFor="input-rent"
                                                className="block text-sm font-medium text-slate-300 mb-1.5"
                                            >
                                                Actual Rent Paid (per month)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                                                    ₹
                                                </span>
                                                <input
                                                    id="input-rent"
                                                    type="number"
                                                    value={formData.rent || ""}
                                                    onChange={(e) =>
                                                        handleInputChange("rent", e.target.value)
                                                    }
                                                    className="w-full bg-[#0D1928] border border-slate-700 text-white rounded-lg px-3 py-2.5 pl-8 focus:outline-none focus:border-[#00E5A0] transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor="input-landlord-name"
                                                    className="block text-sm font-medium text-slate-300 mb-1.5"
                                                >
                                                    Landlord Name
                                                </label>
                                                <input
                                                    id="input-landlord-name"
                                                    type="text"
                                                    defaultValue="Ramesh Iyer"
                                                    className="w-full bg-[#0D1928] border border-slate-700 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#00E5A0] transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="input-landlord-pan"
                                                    className="block text-sm font-medium text-slate-300 mb-1.5 flex justify-between"
                                                >
                                                    <span>Landlord PAN</span>
                                                    {formData.rent * 12 > 100000 && (
                                                        <span className="text-red-400 text-xs">
                                                            Mandatory &gt; ₹1L/yr
                                                        </span>
                                                    )}
                                                </label>
                                                <input
                                                    id="input-landlord-pan"
                                                    type="text"
                                                    defaultValue="ABCPI1234D"
                                                    className={`w-full bg-[#0D1928] border text-white rounded-lg px-3 py-2.5 focus:outline-none transition-colors uppercase ${
                                                        formData.rent * 12 > 100000
                                                            ? "border-red-500/50 focus:border-red-500"
                                                            : "border-slate-700 focus:border-[#00E5A0]"
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#0A1420] border border-[#00E5A0]/20 rounded-lg p-4">
                                        <h4 className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
                                            HRA Exemption Calculation
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between text-slate-300">
                                                <span>A. Actual HRA Received</span>
                                                <span>₹2,28,000</span>
                                            </div>
                                            <div className="flex justify-between text-slate-300">
                                                <span>B. 50% of Basic Salary</span>
                                                <span>₹2,28,000</span>
                                            </div>
                                            <div className="flex justify-between text-slate-300">
                                                <span>C. Rent Paid - 10% of Basic</span>
                                                <span>₹{formData.rent * 12 - 45600}</span>
                                            </div>
                                            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-[#00E5A0]">
                                                <span>Exempt (Minimum of A, B, C)</span>
                                                <span>
                                                    ₹
                                                    {Math.max(
                                                        0,
                                                        Math.min(228000, formData.rent * 12 - 45600),
                                                    ).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Link
                                            href="/tax/declarations/hra"
                                            className="text-sm text-[#0066FF] hover:underline cursor-pointer font-medium"
                                        >
                                            Upload Rent Receipts / Agreement →
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </Card>


                        {/* Section 5: Home Loan */}
                        <Card padding="none" className="overflow-hidden transition-all">
                            <button
                                id="section-loan-summary"
                                onClick={() => toggleSection("loan")}
                                aria-expanded={expandedSection === "loan"}
                                aria-controls="section-loan-panel"
                                aria-disabled={selectedRegime === "new"}
                                className={
                                    "w-full flex items-center justify-between p-5 transition-colors " +
                                    (selectedRegime === "new"
                                        ? "bg-slate-900/50 opacity-60 cursor-not-allowed"
                                        : "bg-[#0D1928] hover:bg-slate-800/50")
                                }
                                disabled={selectedRegime === "new"}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-slate-800 text-slate-400">
                                        5
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-lg font-semibold text-white">
                                            Home Loan Deductions
                                        </h2>
                                    </div>
                                </div>
                                <ChevronRight className="text-slate-400" />
                            </button>
                        </Card>

                        {/* Section 6: NPS */}
                        <Card padding="none" className="overflow-hidden transition-all">
                            <button
                                id="section-nps-summary"
                                onClick={() => toggleSection("nps")}
                                aria-expanded={expandedSection === "nps"}
                                aria-controls="section-nps-panel"
                                className="w-full flex items-center justify-between p-5 bg-[#0D1928] hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                            npsEmployer > 0
                                                ? "bg-[#00E5A0] text-[#0A1420]"
                                                : "bg-slate-800 text-slate-400"
                                        }`}
                                    >
                                        {npsEmployer > 0 ? <CheckCircle2 size={14} /> : "6"}
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-lg font-semibold text-white">
                                            NPS Contributions
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-semibold text-[#00E5A0]">
                                        ₹{npsEmployer.toLocaleString()}
                                    </span>
                                    <ChevronRight className="text-slate-400" />
                                </div>
                            </button>
                        </Card>

                    </div>

                    {/* RIGHT PANEL: Live Tax Summary */}
                    <div className="lg:sticky lg:top-[140px] min-w-0">
                        <Card padding="none" className="overflow-hidden">
                            <div className="p-5 border-b border-slate-800 bg-slate-800/20 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-white flex items-center">
                                    <PieChart size={18} className="mr-2 text-[#00E5A0]" /> Your Tax
                                    Summary
                                </h3>
                                <span className="text-xs bg-[#00E5A0]/10 text-[#00E5A0] px-2 py-1 rounded font-medium border border-[#00E5A0]/20">
                                    {selectedRegime === "old"
                                        ? "Old Regime Active"
                                        : "New Regime Active"}
                                </span>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Income & Deductions */}
                                <div className="space-y-2.5 text-sm">
                                    <div className="flex justify-between text-slate-300">
                                        <span>Annual Gross Salary</span>
                                        <span className="font-medium text-white">
                                            ₹{grossIncome.toLocaleString()}
                                        </span>
                                    </div>

                                    {selectedRegime === "old" ? (
                                        <>
                                            <div className="flex justify-between text-[#00E5A0]">
                                                <span>Less: HRA Exempt</span>
                                                <span>-₹{hramax.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-[#00E5A0]">
                                                <span>Less: Std Deduction</span>
                                                <span>-₹50,000</span>
                                            </div>
                                            <div className="flex justify-between text-[#00E5A0]">
                                                <span>Less: 80C</span>
                                                <span>-₹{total80c.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-[#00E5A0]">
                                                <span>Less: 80D</span>
                                                <span>-₹{total80d.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-[#00E5A0]">
                                                <span>Less: NPS 80CCD(2)</span>
                                                <span>-₹{npsEmployer.toLocaleString()}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between text-[#00E5A0]">
                                                <span>Less: Std Deduction</span>
                                                <span>-₹75,000</span>
                                            </div>
                                        </>
                                    )}

                                    <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                                        <span className="text-slate-300 font-medium">
                                            Taxable Income
                                        </span>
                                        <span className="text-xl font-bold tracking-tight text-white">
                                            ₹{taxableIncome.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Tax Savings Meter (Gamification feature) */}
                                <div className="bg-[#0A1420] border border-slate-800 rounded-lg p-4 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5A0]/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <p className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider relative z-10">
                                        Tax Optimization Meter
                                    </p>
                                    <div className="w-full bg-[#1A2A3A] h-2.5 rounded-full mb-3 relative z-10 overflow-hidden shadow-inner">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-[#00E5A0] h-full rounded-full transition-all duration-1000 ease-out relative"
                                            style={{
                                                width: `${selectedRegime === "old" ? savingsMeterPercentage : 20}%`,
                                            }}
                                        >
                                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)50%,rgba(255,255,255,0.2)75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer_2s_linear_infinite]"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end relative z-10">
                                        <div>
                                            {selectedRegime === "old" ? (
                                                <>
                                                    <p className="text-sm text-white font-medium">
                                                        You&apos;ve saved{" "}
                                                        <span className="text-[#00E5A0]">
                                                            ₹38,400
                                                        </span>{" "}
                                                        in taxes!
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-0.5">
                                                        Max out 80C to save ₹8,800 more.
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-sm text-white font-medium">
                                                        New Regime Selected
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-0.5">
                                                        Deductions do not apply here.
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Final computation */}
                                <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900/20 border border-indigo-500/20 p-5 rounded-lg space-y-3">
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-slate-300">
                                            Calculated Annual Tax
                                        </span>
                                        <span className="text-white">
                                            ₹{selectedTax.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-slate-300">
                                            TDS Already Deducted{" "}
                                            <span className="text-xs font-normal text-slate-400 block">
                                                (Apr - Nov)
                                            </span>
                                        </span>
                                        <span className="text-slate-300">-₹35,800</span>
                                    </div>
                                    <div className="pt-3 border-t border-indigo-500/20 flex justify-between items-end">
                                        <div>
                                            <span className="text-sm text-slate-300 font-medium block mb-1">
                                                Remaining TDS/month
                                            </span>
                                            <span className="text-xs text-slate-400 block">
                                                (Dec - Mar)
                                            </span>
                                        </div>
                                        <span className="text-2xl font-black text-indigo-400">
                                            ₹
                                            {Math.max(0, (selectedTax - 35800) / 4).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Alert */}
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex">
                                    <AlertTriangle
                                        size={16}
                                        className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5"
                                    />
                                    <p className="text-xs text-yellow-500/90 leading-relaxed">
                                        Submitting this will lock your regime choice for the year.
                                        Changes will require direct HR approval.
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-5 border-t border-slate-800 bg-[#0A1420] flex space-x-3">
                                <Button variant="secondary" className="flex-1">
                                    Save as Draft
                                </Button>
                                <Button className="flex-[2]">Submit Declaration</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
