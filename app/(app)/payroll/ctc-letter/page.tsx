"use client";

import React, { useState } from "react";
import { Send, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const LETTER_TYPES = ["Offer", "Revision", "Appointment", "Increment"] as const;
const TEMPLATES = ["Standard", "Detailed", "Minimal"] as const;

export default function CTCLetterPage() {
    const [letterType, setLetterType] = useState<string>("Offer");
    const [employee, setEmployee] = useState("Kavya Nair");
    const [template, setTemplate] = useState<string>("Detailed");
    const [language, setLanguage] = useState("English");
    const [includeSign, setIncludeSign] = useState(true);
    const [includeStamp, setIncludeStamp] = useState(true);

    return (
        <Page
            title="CTC Letter Generation"
            subtitle="Configure and generate official compensation letters."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "CTC Letter" },
            ]}
            maxWidth="1200px"
        >
            <div className="flex flex-col gap-8 lg:flex-row">
                {/* LEFT PANEL */}
                <div className="flex w-full flex-col gap-6 lg:w-[480px] lg:shrink-0">
                    <Card padding="lg">
                        <div className="flex flex-col gap-5">
                            {/* Letter Type */}
                            <div>
                                <label htmlFor="letter-type" className="mb-2 block text-xs text-[#8899AA]">
                                    Letter Type
                                </label>
                                <select
                                    id="letter-type"
                                    value={letterType}
                                    onChange={(e) => setLetterType(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-3 text-sm text-white outline-none"
                                >
                                    {LETTER_TYPES.map((t) => (
                                        <option key={t} value={t}>{t} Letter</option>
                                    ))}
                                </select>
                            </div>

                            {/* Employee */}
                            <div>
                                <label htmlFor="employee-name" className="mb-2 block text-xs text-[#8899AA]">
                                    Employee
                                </label>
                                <input
                                    id="employee-name"
                                    type="text"
                                    value={employee}
                                    onChange={(e) => setEmployee(e.target.value)}
                                    placeholder="Search employee..."
                                    className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-3 text-sm text-white outline-none focus:border-[#00e5a0]"
                                />
                            </div>

                            {/* System Data */}
                            <div className="rounded-lg border border-[#1A2A3A] bg-[#0D1928] p-4">
                                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                                    System Data
                                </h4>
                                <div className="flex justify-between py-1.5">
                                    <span className="text-sm text-[#8899AA]">Current CTC</span>
                                    <span className="text-sm font-medium text-white">₹9,60,000</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="text-sm text-[#8899AA]">Revised CTC</span>
                                    <span className="text-sm font-semibold text-[#00E5A0]">₹12,00,000</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="text-sm text-[#8899AA]">Effective Date</span>
                                    <span className="text-sm font-medium text-white">01/04/2025</span>
                                </div>
                            </div>

                            {/* Template Layout */}
                            <div>
                                <p className="mb-2 text-xs text-[#8899AA]">Template Layout</p>
                                <div className="flex gap-3" role="radiogroup" aria-label="Template layout">
                                    {TEMPLATES.map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            role="radio"
                                            aria-checked={template === t}
                                            onClick={() => setTemplate(t)}
                                            className={`flex-1 rounded-lg border py-2 text-sm transition-colors ${
                                                template === t
                                                    ? "border-[#00E5A0] bg-[rgba(0,229,160,0.1)] text-[#00E5A0]"
                                                    : "border-[#1A2A3A] bg-[#0D1928] text-[#8899AA] hover:border-[#334455]"
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Signatory */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="signatory-name" className="mb-2 block text-xs text-[#8899AA]">
                                        Signatory Name
                                    </label>
                                    <input
                                        id="signatory-name"
                                        type="text"
                                        defaultValue="Vikram Mehta"
                                        className="h-9 w-full rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-3 text-sm text-white outline-none focus:border-[#00e5a0]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="signatory-designation" className="mb-2 block text-xs text-[#8899AA]">
                                        Designation
                                    </label>
                                    <input
                                        id="signatory-designation"
                                        type="text"
                                        defaultValue="Finance Manager"
                                        className="h-9 w-full rounded-lg border border-[#1A2A3A] bg-[#0D1928] px-3 text-sm text-white outline-none focus:border-[#00e5a0]"
                                    />
                                </div>
                            </div>

                            {/* Checkboxes */}
                            <div className="flex flex-col gap-3">
                                <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
                                    <input
                                        type="checkbox"
                                        checked={includeSign}
                                        onChange={(e) => setIncludeSign(e.target.checked)}
                                        className="accent-[#00E5A0]"
                                    />
                                    Include Digital Signature
                                </label>
                                <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
                                    <input
                                        type="checkbox"
                                        checked={includeStamp}
                                        onChange={(e) => setIncludeStamp(e.target.checked)}
                                        className="accent-[#00E5A0]"
                                    />
                                    Include Company Stamp
                                </label>
                            </div>

                            {/* Language */}
                            <div>
                                <p className="mb-2 text-xs text-[#8899AA]">Language</p>
                                <div className="flex gap-4 text-sm" role="radiogroup" aria-label="Letter language">
                                    <label className="flex cursor-pointer items-center gap-1.5">
                                        <input
                                            type="radio"
                                            name="lang"
                                            checked={language === "English"}
                                            onChange={() => setLanguage("English")}
                                            className="accent-[#00E5A0]"
                                        />
                                        <span className="text-white">English</span>
                                    </label>
                                    <label className="flex cursor-pointer items-center gap-1.5">
                                        <input
                                            type="radio"
                                            name="lang"
                                            checked={language === "Hindi"}
                                            onChange={() => setLanguage("Hindi")}
                                            className="accent-[#00E5A0]"
                                        />
                                        <span className="text-[#8899AA]">Hindi (Beta)</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="flex gap-3">
                        <Button className="flex-1" icon={<Download size={14} aria-hidden="true" />}>
                            Generate PDF
                        </Button>
                        <Button variant="secondary" className="flex-1" icon={<Send size={14} aria-hidden="true" />}>
                            Send via Email
                        </Button>
                    </div>
                </div>

                {/* RIGHT PANEL - A4 PREVIEW */}
                <div className="flex flex-1 justify-center overflow-y-auto rounded-2xl bg-[#E8ECEF] p-8">
                    {/* A4 Paper */}
                    <div
                        className="min-h-[297mm] w-[210mm] bg-white p-[40mm_25mm] shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                        style={{ color: "#333333", fontSize: "14px", lineHeight: "1.6", fontFamily: "serif", position: "relative" }}
                    >
                        {/* Header */}
                        <div className="mb-10 flex items-end justify-between border-b-2 border-blue-600 pb-5">
                            <div>
                                <div className="text-2xl font-bold tracking-tight text-blue-600">HRFlow Corp.</div>
                                <div className="text-xs text-gray-500">123 Tech Park, Bengaluru, KA 560001</div>
                            </div>
                            <div className="text-right text-xs text-gray-500">
                                Date: April 01, 2025<br />
                                Ref: HRF/REV/2025/1042
                            </div>
                        </div>

                        <div className="mb-5 font-bold">Private &amp; Confidential</div>

                        <div className="mb-8">
                            To,<br />
                            <strong>{employee || "[Employee Name]"}</strong><br />
                            Emp ID: EMP-0091<br />
                            Engineering Department
                        </div>

                        <div className="mb-8 text-center text-base font-bold underline">
                            Subject: {letterType} Letter - Salary Revision
                        </div>

                        <p className="mb-5">Dear {employee ? employee.split(" ")[0] : "[First Name]"},</p>

                        <p className="mb-5 text-justify">
                            Following our recent performance appraisal cycle, we are pleased to inform you that your compensation has been revised. Your hard work and dedication to HRFlow have been truly appreciated over the past year.
                        </p>

                        <p className="mb-8 text-justify">
                            Your revised Total Cost to Company (CTC) will be <strong>₹12,00,000 (Rupees Twelve Lakhs Only)</strong> per annum, effective from <strong>April 01, 2025</strong>.
                            {template === "Detailed" ? " Please find the detailed breakup of your compensation structure attached below." : " The annexure detailing your components will be shared separately."}
                        </p>

                        {template === "Detailed" && (
                            <div className="mb-10">
                                <table className="w-full border-collapse text-xs">
                                    <thead>
                                        <tr className="border-y border-gray-300 bg-gray-100">
                                            <th className="p-2 text-left">Salary Component</th>
                                            <th className="p-2 text-right">Monthly (₹)</th>
                                            <th className="p-2 text-right">Annual (₹)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200"><td className="p-2">Basic Salary</td><td className="p-2 text-right">50,000</td><td className="p-2 text-right">6,00,000</td></tr>
                                        <tr className="border-b border-gray-200"><td className="p-2">House Rent Allowance</td><td className="p-2 text-right">25,000</td><td className="p-2 text-right">3,00,000</td></tr>
                                        <tr className="border-b border-gray-200"><td className="p-2">Special Allowance</td><td className="p-2 text-right">20,833</td><td className="p-2 text-right">2,50,000</td></tr>
                                        <tr className="border-b border-gray-200"><td className="p-2">Employer PF Contribution</td><td className="p-2 text-right">4,167</td><td className="p-2 text-right">50,000</td></tr>
                                        <tr className="border-y-2 border-gray-300 bg-gray-50 font-bold"><td className="p-2">Total Cost to Company (CTC)</td><td className="p-2 text-right">1,00,000</td><td className="p-2 text-right">12,00,000</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <p className="mb-10 text-justify">
                            All other terms and conditions of your employment remain unchanged. We look forward to your continued contribution to the company&apos;s success.
                        </p>

                        <p className="mb-16">Yours sincerely,</p>

                        {/* Signature Block */}
                        <div className="relative">
                            {includeSign && (
                                <div className="absolute -top-10 left-2.5 opacity-80">
                                    <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M20 40C35 40 40 20 45 35C48 45 42 50 38 45C33 35 55 15 65 30C75 45 70 50 80 40C90 30 100 25 110 35" stroke="#0033A0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}
                            {includeStamp && (
                                <div className="absolute -top-16 left-32 rotate-[-15deg] opacity-40">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-red-600 text-center text-xs font-bold text-red-600">
                                        HRFLOW<br />AUTHORIZED
                                    </div>
                                </div>
                            )}
                            <div className="font-bold">Vikram Mehta</div>
                            <div className="text-xs text-gray-500">Finance Manager</div>
                            <div className="text-xs text-gray-500">HRFlow Corp.</div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
