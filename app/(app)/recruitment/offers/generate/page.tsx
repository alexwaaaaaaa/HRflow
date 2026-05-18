"use client";

import { useState } from "react";
import { FileText, Send, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getBreakdown(base: number) {
    return [
        { label: "Basic Salary", val: base * 0.4 },
        { label: "HRA", val: base * 0.2 },
        { label: "Special Allowance", val: base * 0.25 },
        { label: "PF (Employer)", val: base * 0.05 },
        { label: "Variable Pay (Bonus)", val: base * 0.1 },
    ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OfferGeneration() {
    const [ctc, setCtc] = useState("3200000");

    const numCtc = Number(ctc) || 0;
    const breakdown = getBreakdown(numCtc);

    return (
        <Page
            title="Generate Offer"
            subtitle="Rahul Sharma · Senior Frontend Engineer · Bengaluru"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Offers" },
                { label: "Generate" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[450px_1fr]">
                {/* Input Form */}
                <div className="flex flex-col gap-6">
                    {/* Candidate */}
                    <Card padding="md" className="flex items-center gap-4">
                        <div
                            aria-hidden="true"
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0066FF] to-[#00E5A0] text-sm font-bold shadow-lg"
                        >
                            RS
                        </div>
                        <div>
                            <p className="font-bold text-white">Rahul Sharma</p>
                            <p className="text-xs text-[#8899AA]">Senior Frontend Engineer · Bengaluru</p>
                        </div>
                    </Card>

                    {/* Compensation */}
                    <Card padding="lg">
                        <h3 className="mb-4 text-sm font-semibold text-white">
                            Compensation Details (INR)
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="total-ctc" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                    Total CTC (Annual)
                                </label>
                                <input
                                    id="total-ctc"
                                    type="number"
                                    value={ctc}
                                    onChange={(e) => setCtc(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm font-bold text-white focus:border-[#00E5A0] focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="joining-bonus" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                        Joining Bonus
                                    </label>
                                    <input
                                        id="joining-bonus"
                                        type="number"
                                        defaultValue="200000"
                                        className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="relocation-bonus" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                        Relocation Bonus
                                    </label>
                                    <input
                                        id="relocation-bonus"
                                        type="number"
                                        defaultValue="0"
                                        className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* CTC Breakdown */}
                    <Card padding="lg">
                        <h3 className="mb-4 text-sm font-semibold text-white">CTC Breakdown Preview</h3>
                        <div className="overflow-hidden rounded-xl border border-[#1A2A3A] bg-[#060B14]">
                            {breakdown.map((b, i) => (
                                <div
                                    key={b.label}
                                    className={`flex items-center justify-between px-4 py-2.5 text-xs ${
                                        i !== breakdown.length - 1 ? "border-b border-[#1A2A3A]" : ""
                                    }`}
                                >
                                    <span className="text-[#8899AA]">{b.label}</span>
                                    <span className="font-medium text-white">
                                        ₹ {b.val.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            ))}
                            <div className="flex items-center justify-between border-t border-[#1A2A3A] bg-[#1A2A3A]/30 px-4 py-3 text-sm font-bold">
                                <span className="text-[#00E5A0]">Total CTC</span>
                                <span className="text-[#00E5A0]">₹ {numCtc.toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Dates */}
                    <Card padding="lg">
                        <h3 className="mb-4 text-sm font-semibold text-white">Dates &amp; Expiration</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="joining-date" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                    Expected Joining Date
                                </label>
                                <input
                                    id="joining-date"
                                    type="date"
                                    defaultValue="2025-04-15"
                                    className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white [color-scheme:dark] focus:border-[#0066FF] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="offer-expiry" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                    Offer Valid Until
                                </label>
                                <input
                                    id="offer-expiry"
                                    type="date"
                                    defaultValue="2025-03-20"
                                    className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white [color-scheme:dark] focus:border-[#0066FF] focus:outline-none"
                                />
                            </div>
                        </div>
                    </Card>

                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            icon={<Save size={14} aria-hidden="true" />}
                            className="flex-1 justify-center"
                        >
                            Save Draft
                        </Button>
                        <Button
                            icon={<Send size={14} aria-hidden="true" />}
                            className="flex-1 justify-center"
                        >
                            Generate &amp; Send
                        </Button>
                    </div>
                </div>

                {/* Letter Preview */}
                <div className="flex flex-col items-center">
                    <div className="mb-4 flex w-full max-w-[800px] items-center justify-between">
                        <h3 className="flex items-center gap-2 text-sm font-medium text-[#8899AA]">
                            <FileText size={16} aria-hidden="true" /> Live Letter Preview
                        </h3>
                        <div className="flex gap-2 text-xs">
                            <span className="rounded bg-[#00E5A0]/10 px-2 py-1 font-bold text-[#00E5A0]">
                                Auto-sync ON
                            </span>
                            <span className="rounded bg-[#1A2A3A] px-2 py-1 text-white">
                                Template: Standard Tech Offer
                            </span>
                        </div>
                    </div>

                    {/* Simulated A4 Paper */}
                    <div className="w-full max-w-[800px] min-h-[1100px] rounded-sm bg-white p-12 text-black shadow-2xl">
                        <div className="mb-8 flex items-start justify-between border-b-2 border-gray-200 pb-6">
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter text-[#0A1420]">TECHCORP</h2>
                                <p className="mt-1 text-xs text-gray-500">
                                    TechCorp Solutions Pvt. Ltd.
                                    <br />
                                    123 Innovation Drive, Bengaluru
                                </p>
                            </div>
                            <div className="text-right text-xs text-gray-500">
                                <p>Date: 15 Mar 2025</p>
                                <p>Ref: TC/OFFER/2025/1045</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-sm leading-relaxed text-gray-800">
                            <p>
                                To,
                                <br />
                                <strong className="text-base text-black">Rahul Sharma</strong>
                                <br />
                                Bengaluru, India
                            </p>
                            <p className="mt-8 text-lg font-bold text-black">
                                Subject: Offer of Employment
                            </p>
                            <p>Dear Rahul,</p>
                            <p>
                                We are delighted to offer you the full-time position of{" "}
                                <strong>Senior Frontend Engineer</strong> at TechCorp Solutions. Your
                                expected commencement date will be <strong>15 April 2025</strong>.
                            </p>
                            <p>
                                Your total annual compensation (Cost to Company) will be{" "}
                                <strong>INR {numCtc.toLocaleString("en-IN")}</strong> per annum. A
                                detailed breakdown of your compensation is attached in Annexure A.
                            </p>
                            <p>
                                You will also be receiving a one-time joining bonus of{" "}
                                <strong>INR 2,00,000</strong>, payable with your first month&apos;s salary.
                            </p>
                            <p>
                                This offer is contingent upon the successful completion of a background
                                verification check. If you choose to accept this offer, please sign the
                                digital copy of this letter by <strong>20 March 2025</strong>.
                            </p>
                            <div className="mt-12 border-t border-gray-200 pt-12">
                                <p>Sincerely,</p>
                                <div className="mb-2 mt-4 block w-fit border-b border-gray-300 pb-1 pr-12 text-2xl text-blue-900">
                                    Priya Nair
                                </div>
                                <p className="font-bold text-black">Priya Nair</p>
                                <p className="text-xs text-gray-500">VP, Human Resources</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
