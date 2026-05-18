"use client";

import Link from "next/link";
import { RefreshCw, Calculator, Save, GripVertical } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const COMPONENTS = [
    { name: "Basic Salary", val: 58333, type: "Formula" },
    { name: "House Rent Allowance (HRA)", val: 29167, type: "Formula" },
    { name: "Special Allowance", val: 24167, type: "Balancing" },
    { name: "Other Allowances", val: 5000, type: "Fixed" },
] as const;

export default function SalaryFitment() {
    return (
        <Page
            title="Salary Fitment Engine"
            subtitle="Manually adjust component values to arrive at a target Net Pay or CTC."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "CTC Revision", href: "/payroll/ctc-revision" },
                { label: "Fitment" },
            ]}
            maxWidth="800px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>Apply to Revision</Button>
            }
        >
            <div className="space-y-6">
                {/* Target Input */}
                <Card padding="lg">
                    <div className="flex flex-col items-end gap-4 sm:flex-row">
                        <div className="flex-1">
                            <label htmlFor="target-ctc" className="mb-2 block text-sm text-[#8899AA]">
                                Enter Target Annual CTC
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-2.5 text-sm text-[#8899AA]">₹</span>
                                <input
                                    id="target-ctc"
                                    type="number"
                                    defaultValue={1400000}
                                    className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] pl-8 pr-3 text-sm font-semibold text-white outline-none focus:border-[#00e5a0]"
                                />
                            </div>
                        </div>
                        <div className="flex h-10 items-center justify-center text-sm text-[#445566]">OR</div>
                        <div className="flex-1">
                            <label htmlFor="target-net" className="mb-2 block text-sm text-[#8899AA]">
                                Enter Target Net Take-home (Monthly)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-2.5 text-sm text-[#8899AA]">₹</span>
                                <input
                                    id="target-net"
                                    type="number"
                                    placeholder="Enter Net Pay"
                                    className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] pl-8 pr-3 text-sm text-white outline-none focus:border-[#00e5a0]"
                                />
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            icon={<RefreshCw size={14} aria-hidden="true" />}
                            className="shrink-0"
                        >
                            Auto-Fit
                        </Button>
                    </div>
                </Card>

                {/* Component Breakup */}
                <Card padding="none">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-6 py-4">
                        <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                            <Calculator size={16} aria-hidden="true" /> Component Breakup
                        </h2>
                        <span className="text-sm text-[#8899AA]">Current Model: Standard Structure</span>
                    </div>

                    <div className="flex flex-col gap-3 p-6">
                        {COMPONENTS.map((c) => (
                            <div
                                key={c.name}
                                className="flex items-center gap-4 rounded-lg border border-[#1A2A3A] bg-[#060B14] px-4 py-3"
                            >
                                <GripVertical size={16} className="cursor-grab text-[#445566]" aria-hidden="true" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">{c.name}</p>
                                    <p className="text-xs text-[#8899AA]">{c.type} Base</p>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-sm text-[#8899AA]">₹</span>
                                    <input
                                        type="number"
                                        defaultValue={c.val}
                                        disabled={c.type === "Formula" || c.type === "Balancing"}
                                        aria-label={`${c.name} value`}
                                        className={`h-10 w-36 rounded-md pl-7 pr-3 text-right text-sm outline-none ${
                                            c.type === "Fixed"
                                                ? "border border-[#1A2A3A] bg-[#0D1928] text-white focus:border-[#00e5a0]"
                                                : "border-none bg-transparent text-[#8899AA]"
                                        }`}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#1A2A3A] pt-5">
                            <span className="text-sm text-[#8899AA]">Monthly Gross Salary</span>
                            <span className="text-lg font-bold text-[#00E5A0]">₹1,16,667</span>
                        </div>
                    </div>
                </Card>

                <div className="text-center">
                    <Link href="/payroll/ctc-revision" className="text-sm text-[#8899AA] hover:text-white">
                        ← Back to Pipeline
                    </Link>
                </div>
            </div>
        </Page>
    );
}
