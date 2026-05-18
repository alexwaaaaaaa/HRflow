"use client";

import React, { useState } from "react";
import { Info, CheckCircle2, ArrowRight, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartWrapper } from "@/components/ui/ChartMountGate";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const COMPARISON_DATA = [
    { name: "Old Regime", tax: 21736, takeHome: 1128264 },
    { name: "New Regime", tax: 42000, takeHome: 1108000 },
];

export default function RegimeSelectorEmp() {
    const [selectedRegime, setSelectedRegime] = useState<"OLD" | "NEW">("OLD");

    return (
        <Page
            title="Compare & Choose Tax Regime"
            subtitle="Rahul Kumar Sharma — FY 2024-25"
            breadcrumbs={[
                { label: "Tax", href: "/tax/declaration/EMP-0848" },
                { label: "Regime Selector" },
            ]}
            maxWidth="1000px"
        >
            <div className="space-y-6">
                {/* Chart & Breakdown */}
                <Card padding="lg">
                    <div className="flex flex-col lg:flex-row items-start gap-8">
                        {/* Left: Charts */}
                        <div className="flex-1 border-r border-[#1A2A3A] pr-8">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-sm text-[#8899AA] mb-1">Annual CTC</p>
                                    <p className="text-2xl font-bold text-white">₹12,00,000</p>
                                </div>
                                <div className="bg-[#0066FF]/10 border border-[#0066FF]/20 rounded-lg px-3 py-2 flex items-center gap-2">
                                    <TrendingDown size={18} className="text-[#0066FF]" aria-hidden="true" />
                                    <div>
                                        <p className="text-xs text-[#0066FF] font-semibold">RECOMMENDATION</p>
                                        <p className="text-sm text-white font-medium">Old Regime saves ₹20,264</p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[200px] w-full mb-6">
                                <ChartWrapper height={200}>
                                    <BarChart data={COMPARISON_DATA} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            stroke="#8899AA"
                                            fontSize={13}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}
                                        />
                                        <Legend
                                            iconType="circle"
                                            wrapperStyle={{ fontSize: 12, color: "#8899AA", paddingTop: 16 }}
                                        />
                                        <Bar dataKey="takeHome" stackId="a" fill="#00E5A0" name="Annual Take-Home" radius={[4, 0, 0, 4]} />
                                        <Bar dataKey="tax" stackId="a" fill="#FF4444" name="Tax Payable" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ChartWrapper>
                            </div>
                        </div>

                        {/* Right: Breakdown */}
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-white mb-5">Tax Computation Breakdown</h3>
                            <div className="grid grid-cols-[1fr_100px_100px] gap-4 border-b border-[#1A2A3A] pb-3 mb-3">
                                <div className="text-xs text-[#8899AA] font-medium">Component</div>
                                <div className="text-xs text-[#8899AA] font-medium text-right">Old Regime</div>
                                <div className="text-xs text-[#8899AA] font-medium text-right">New Regime</div>
                            </div>
                            {[
                                { label: "Gross Income", old: "12,00,000", new: "12,00,000", color: "text-white" },
                                { label: "Standard Deduction", old: "(50,000)", new: "(50,000)", color: "text-red-400" },
                                { label: "80C Investments", old: "(1,50,000)", new: "—", color: "text-red-400" },
                                { label: "80D Health Ins.", old: "(18,000)", new: "—", color: "text-red-400" },
                                { label: "HRA Exemption", old: "(2,40,000)", new: "—", color: "text-red-400" },
                                { label: "Taxable Income", old: "5,42,000", new: "11,50,000", color: "text-white", bold: true },
                                { label: "Tax Computed", old: "20,900", new: "40,000", color: "text-[#FFB800]" },
                                { label: "Sec 87A Rebate", old: "—", new: "—", color: "text-[#00E5A0]" },
                                { label: "Health & Edu Cess", old: "+836", new: "+1,600", color: "text-[#FFB800]" },
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-[1fr_100px_100px] gap-4 mb-3">
                                    <div className={`text-sm ${row.bold ? "font-semibold text-white" : "text-[#8899AA]"}`}>
                                        {row.label}
                                    </div>
                                    <div className={`text-sm text-right ${row.bold ? "font-semibold" : "font-medium"} ${row.color}`}>
                                        {row.old}
                                    </div>
                                    <div className={`text-sm text-right ${row.bold ? "font-semibold" : "font-medium"} ${row.color}`}>
                                        {row.new}
                                    </div>
                                </div>
                            ))}
                            <div className="grid grid-cols-[1fr_100px_100px] gap-4 pt-4 border-t border-dashed border-[#1A2A3A] mt-2">
                                <div className="text-sm font-bold text-white">Total Tax</div>
                                <div className="text-sm font-bold text-[#00E5A0] text-right">₹21,736</div>
                                <div className="text-sm font-bold text-red-400 text-right">₹41,600</div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Selection Area */}
                <h3 className="text-lg font-semibold text-white">Select your Tax Regime for FY 2024-25</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            id: "OLD" as const,
                            title: "Old Tax Regime",
                            desc: "Best if you have significant investments, home loan, or pay rent. Needs proof submission.",
                            tax: "₹21,736",
                            taxColor: "text-[#00E5A0]",
                        },
                        {
                            id: "NEW" as const,
                            title: "New Tax Regime (Default)",
                            desc: "Lower tax rates but fewer deductions. No proof submission required (except standard deduction).",
                            tax: "₹41,600",
                            taxColor: "text-red-400",
                        },
                    ].map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setSelectedRegime(option.id)}
                            className={`text-left p-6 rounded-xl border-2 transition-all relative ${
                                selectedRegime === option.id
                                    ? "border-[#0066FF] bg-[#0066FF]/5"
                                    : "border-[#1A2A3A] bg-[#0D1928] hover:border-[#0066FF]/50"
                            }`}
                        >
                            {selectedRegime === option.id && (
                                <div className="absolute top-4 right-4 text-[#0066FF]">
                                    <CheckCircle2 size={24} aria-hidden="true" />
                                </div>
                            )}
                            <h4 className="text-lg font-semibold text-white mb-2">{option.title}</h4>
                            <p className="text-sm text-[#8899AA] mb-4 min-h-[40px]">{option.desc}</p>
                            <div className="flex justify-between items-center p-3 bg-[#060B14] border border-[#1A2A3A] rounded-lg">
                                <span className="text-sm text-[#8899AA]">Est. Annual Tax</span>
                                <span className={`text-base font-bold ${option.taxColor}`}>{option.tax}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="flex justify-between items-center border-t border-[#1A2A3A] pt-6">
                    <div className="flex items-center gap-3 text-sm text-[#8899AA]">
                        <Info size={16} className="text-[#0066FF]" aria-hidden="true" />
                        <span>You can switch your regime any time before 31 Mar 2025.</span>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="secondary" href="/tax/declaration/EMP-0848">Cancel</Button>
                        <Button iconRight={<ArrowRight size={16} />} href="/tax/declaration/EMP-0848">Confirm &amp; Continue</Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}
