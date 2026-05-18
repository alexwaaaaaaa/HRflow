"use client";

import React, { useState } from "react";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { Download, Calculator, Info, TrendingDown, Eye, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Cell } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function SummaryItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className={`p-4 flex-1 ${highlight ? "bg-[#00E5A0]/5" : ""}`}>
            <p className={`text-xs mb-1 ${highlight ? "text-[#00E5A0]" : "text-[#8899AA]"}`}>{label}</p>
            <p className={`text-xl font-black ${highlight ? "text-[#00E5A0]" : "text-white"}`}>{value}</p>
        </div>
    );
}

function ComputationSection({ title, children, total, isEnd }: { title: string; children: React.ReactNode; total?: string; isEnd: boolean }) {
    return (
        <div className={`p-5 ${!isEnd ? "border-b border-[#1A2A3A]" : ""}`}>
            <h3 className="text-xs font-bold text-[#8899AA] mb-4 tracking-wider">{title}</h3>
            <div className="space-y-2">{children}</div>
            {total && (
                <div className="mt-3 pt-3 flex justify-between items-center text-sm border-t border-[#1A2A3A]">
                    <span className="font-semibold text-[#c8d8e8]">Total</span>
                    <span className="font-bold text-white">{total}</span>
                </div>
            )}
        </div>
    );
}

function CompRow({ label, value, sub, indent, bold, valColor = "text-white" }: {
    label: string; value: string; sub?: string; indent?: boolean; bold?: boolean; valColor?: string;
}) {
    return (
        <div className={`flex justify-between items-center text-sm ${indent ? "pl-4 py-1" : "py-1"}`}>
            <span className={`text-[#c8d8e8] ${bold ? "font-bold" : ""}`}>
                {label} {sub && <span className="text-xs text-[#556677] ml-1">{sub}</span>}
            </span>
            <span className={`${bold ? "font-bold" : ""} ${valColor}`}>{value}</span>
        </div>
    );
}

function SlabRow({ slab, taxable, rate, tax }: { slab: string; taxable: string; rate: string; tax: string }) {
    return (
        <div className="flex justify-between items-center px-2 py-1.5 hover:bg-[#1A2A3A]/30 rounded transition-colors text-sm">
            <span className="flex-1 text-[#c8d8e8]">{slab}</span>
            <span className="w-24 text-right text-[#8899AA] font-mono text-xs">{taxable}</span>
            <span className="w-24 text-right text-[#00E5A0] font-medium">{rate}</span>
            <span className="w-24 text-right font-bold text-white">{tax}</span>
        </div>
    );
}

// ── Constants ─────────────────────────────────────────────────────────────────
const TIMELINE_DATA = [
    { month: "Apr", tds: 4588, type: "actual" },
    { month: "May", tds: 4588, type: "actual" },
    { month: "Jun", tds: 4588, type: "actual" },
    { month: "Jul", tds: 4588, type: "actual" },
    { month: "Aug", tds: 4588, type: "actual" },
    { month: "Sep", tds: 4588, type: "actual" },
    { month: "Oct", tds: 4588, type: "actual" },
    { month: "Nov", tds: 4588, type: "actual" },
    { month: "Dec", tds: 4589, type: "projected" },
    { month: "Jan", tds: 4589, type: "projected" },
    { month: "Feb", tds: 4589, type: "projected" },
    { month: "Mar", tds: 4589, type: "projected" },
];

const CURRENT_TAX = 55058;

export default function TDSComputationDetail() {
    const [simAmount, setSimAmount] = useState<number>(40000);

    // Calculation — byte-identical to pre-migration
    const simTax = CURRENT_TAX - (simAmount * 0.20 * 1.04);

    return (
        <Page
            title="TDS Computation — Arjun Mehta"
            subtitle="Full year tax computation | FY 2024-25 | Old Tax Regime"
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "TDS Computation Detail" },
            ]}
            maxWidth="1400px"
            actions={
                <Button variant="secondary" icon={<Download size={16} />}>Download Tax Computation Sheet</Button>
            }
        >
            <div className="space-y-6">
                {/* Employee Strip */}
                <Card padding="md" className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#060B14] border border-[#2A3A4A] flex items-center justify-center font-bold text-white">AM</div>
                        <div>
                            <p className="text-sm font-bold text-white">Arjun Mehta <span className="text-[#8899AA] font-normal text-xs ml-2">Sr. Engineer</span></p>
                            <p className="text-xs text-[#8899AA]">EMP001 • PAN: AAAPZ••••A</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-xs text-[#8899AA]">Annual CTC</p>
                            <p className="text-sm font-bold text-white">₹11,40,000</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-[#8899AA]">Regime</p>
                            <p className="text-sm font-bold text-[#FFB800]">Old</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-[#8899AA]">Declarations</p>
                            <p className="text-sm font-bold text-[#00E5A0] flex items-center gap-1"><CheckCircle2 size={12} aria-hidden="true" /> Submitted</p>
                        </div>
                    </div>
                </Card>

                {/* Tax Summary Header */}
                <Card padding="none" className="flex divide-x divide-[#1A2A3A]">
                    <SummaryItem label="Annual Gross" value="₹11,40,000" />
                    <SummaryItem label="Total Deductions" value="₹4,37,800" />
                    <SummaryItem label="Taxable Income" value="₹7,02,200" highlight />
                    <SummaryItem label="Annual Tax" value="₹55,058" />
                    <SummaryItem label="Monthly TDS" value="₹4,588" />
                    <SummaryItem label="YTD TDS (8 months)" value="₹36,704" />
                </Card>

                {/* Main Split */}
                <div className="flex flex-col xl:flex-row gap-6 items-start">
                    {/* Left - Detailed Computation */}
                    <Card padding="none" className="xl:w-[680px] shrink-0">
                        <div className="p-4 border-b border-[#1A2A3A]">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Calculator size={18} className="text-[#00E5A0]" aria-hidden="true" />
                                Detailed Tax Computation
                            </h3>
                        </div>

                        <ComputationSection title="SECTION A — GROSS INCOME" total="₹11,14,200" isEnd>
                            <CompRow label="Basic Salary" value="₹4,56,000" />
                            <CompRow label="HRA Received" value="₹2,28,000" />
                            <CompRow label="Special Allowance" value="₹3,96,000" />
                            <CompRow label="Conveyance" value="₹19,200" />
                            <CompRow label="LTA" value="₹50,000" />
                            <CompRow label="Medical Allowance" value="₹15,000" />
                            <div className="border-t border-[#1A2A3A] my-1 pt-1" />
                            <CompRow label="Gross Salary" value="₹11,64,200" bold />
                            <CompRow label="Less: Standard Deduction (Sec 16)" value="-₹50,000" valColor="text-[#00E5A0]" />
                        </ComputationSection>

                        <ComputationSection title="SECTION B — EXEMPTIONS" total="₹9,15,800" isEnd>
                            <CompRow label="HRA Exempt (Section 10(13A))" value="-₹1,70,400" valColor="text-[#00E5A0]" />
                            <CompRow label="LTA Exempt (Sec 10(5))" value="-₹28,000" valColor="text-[#00E5A0]" />
                            <div className="border-t border-[#1A2A3A] my-1 pt-1" />
                            <CompRow label="Total Exemptions" value="₹1,98,400" bold />
                        </ComputationSection>

                        <ComputationSection title="SECTION C — CHAPTER VI-A DEDUCTIONS" total="₹2,10,400" isEnd={false}>
                            <div className="mb-2">
                                <h4 className="text-xs font-bold text-[#8899AA] mb-1">80C Investments (Max ₹1.5L)</h4>
                                <CompRow label="EPF (Employer/Employee)" value="₹21,600" indent />
                                <CompRow label="PPF Statement" value="₹50,000" indent />
                                <CompRow label="ELSS Mutual Funds" value="₹38,400" indent />
                                <CompRow label="80C Total Accepted" value="₹1,10,000" bold />
                            </div>
                            <div className="mb-2">
                                <h4 className="text-xs font-bold text-[#8899AA] mb-1">80D Health Insurance (Max ₹50K)</h4>
                                <CompRow label="Self & Family" value="₹15,000" indent />
                                <CompRow label="Parents" value="₹12,000" indent />
                                <CompRow label="80D Total Accepted" value="₹27,000" bold />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#8899AA] mb-1">Other Sections</h4>
                                <CompRow label="80CCD(2) NPS Employer" value="₹60,000" indent />
                                <CompRow label="80G Donations" value="₹10,000" indent />
                                <CompRow label="80TTA Savings Interest" value="₹3,400" indent />
                            </div>
                        </ComputationSection>

                        <div className="p-5 border-b border-[#1A2A3A] bg-[#0A1420]">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-bold text-[#8899AA]">SECTION D — NET TAXABLE INCOME</h3>
                                <div className="text-2xl font-black text-[#00E5A0] px-4 py-1 bg-[#1A2A3A] rounded border border-[#2A3A4A]">
                                    ₹7,02,200
                                </div>
                            </div>
                        </div>

                        <ComputationSection title="SECTION E — TAX COMPUTATION (Old Regime Spread)" total="₹55,058" isEnd={false}>
                            <div className="mb-3 space-y-1">
                                <div className="flex justify-between text-xs font-bold text-[#8899AA] border-b border-[#1A2A3A] pb-1 px-2">
                                    <div className="flex-1">Tax Slab</div>
                                    <div className="w-24 text-right">Taxable</div>
                                    <div className="w-24 text-right">Tax Rate</div>
                                    <div className="w-24 text-right">Tax</div>
                                </div>
                                <SlabRow slab="Up to ₹2,50,000" taxable="₹2,50,000" rate="NIL" tax="₹0" />
                                <SlabRow slab="₹2.5L – ₹5L" taxable="₹2,50,000" rate="5%" tax="₹12,500" />
                                <SlabRow slab="₹5L – ₹7.02L" taxable="₹2,02,200" rate="20%" tax="₹40,440" />
                            </div>
                            <CompRow label="Total Basic Tax" value="₹52,940" bold />
                            <CompRow label="Less: 87A Rebate" value="₹0" sub="(Income > ₹5L)" />
                            <CompRow label="Add: Health & Education Cess (4%)" value="+₹2,118" valColor="text-[#FFB800]" />
                        </ComputationSection>

                        <div className="p-5">
                            <h3 className="text-xs font-bold text-[#8899AA] mb-3 tracking-wider">SECTION F — TDS ALREADY DEDUCTED</h3>
                            <div className="flex justify-between items-center mb-3 text-sm">
                                <span className="text-[#c8d8e8]">YTD Deducted (Apr - Nov)</span>
                                <span className="font-bold text-white">₹36,704</span>
                            </div>
                            <div className="flex justify-between items-center mb-3 text-sm">
                                <span className="text-[#c8d8e8]">Remaining Tax Payable</span>
                                <span className="font-bold text-[#FF4444]">₹18,354</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#1A2A3A]/40 rounded-lg border border-[#2A3A4A] mt-2">
                                <div className="flex items-center text-sm font-medium text-white gap-2">
                                    <TrendingDown size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                    Monthly TDS from Dec to Mar (4 months)
                                </div>
                                <div className="text-lg font-bold text-[#00E5A0]">₹4,589 <span className="text-xs font-normal text-[#8899AA]">/ mo</span></div>
                            </div>
                        </div>
                    </Card>

                    {/* Right - Analytics & Simulation */}
                    <div className="flex-1 space-y-6">
                        {/* Timeline Chart */}
                        <Card padding="md">
                            <h3 className="text-sm font-bold text-white mb-1">Monthly TDS Distribution — FY 2024-25</h3>
                            <p className="text-xs text-[#8899AA] mb-4">View how your tax deduction is spread across the year.</p>

                            <div className="h-[200px] w-full">
                                <ChartWrapper height="h-[300px]">
                                    <BarChart data={TIMELINE_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} />
                                        <RechartsTooltip
                                            cursor={{ fill: "#1A2A3A" }}
                                            contentStyle={{ backgroundColor: "#060B14", borderColor: "#2A3A4A", borderRadius: "8px" }}
                                            itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}
                                            labelStyle={{ color: "#8899AA", fontSize: "10px" }}
                                        />
                                        <Bar dataKey="tds" radius={[4, 4, 0, 0]} maxBarSize={30}>
                                            {TIMELINE_DATA.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.type === "actual" ? "#0066FF" : "transparent"}
                                                    stroke={entry.type === "projected" ? "#0066FF" : "none"}
                                                    strokeWidth={entry.type === "projected" ? 2 : 0}
                                                    strokeDasharray={entry.type === "projected" ? "4 4" : "none"}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ChartWrapper>
                            </div>

                            <div className="mt-4 p-3 bg-[#0A1420] border border-[#1A2A3A] rounded-lg text-xs text-[#00E5A0] flex items-start gap-2">
                                <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                                <span>Based on your recent proof submissions, your Dec-Mar TDS marginally increases by ₹1 due to rounding changes.</span>
                            </div>
                        </Card>

                        {/* What-If Simulation */}
                        <Card padding="md">
                            <h3 className="text-sm font-bold text-white mb-1">Tax Saving Simulator</h3>
                            <p className="text-xs text-[#8899AA] mb-4">What if you invest more in 80C ELSS before Jan 31?</p>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="sim-range" className="text-xs font-semibold text-[#8899AA] block mb-2">Simulate additional 80C investment</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            id="sim-range"
                                            type="range"
                                            min="0"
                                            max="100000"
                                            step="10000"
                                            value={simAmount}
                                            onChange={(e) => setSimAmount(Number(e.target.value))}
                                            className="flex-1 accent-[#FFB800]"
                                            aria-label="Simulate additional 80C investment amount"
                                        />
                                        <div className="w-24 bg-[#0A1420] border border-[#1A2A3A] px-2 py-1 rounded text-sm font-bold text-white text-right">
                                            ₹{simAmount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm text-[#8899AA]">Revised Taxable Income</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-white line-through">₹7,02,200</span>
                                            <span className="text-sm font-bold text-white">₹{(702200 - simAmount).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm text-[#8899AA]">New Annual Tax</span>
                                        <div className="text-right">
                                            <div className="line-through text-xs text-[#556677]">₹55,058</div>
                                            <span className="text-sm font-bold text-white">₹{simTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-dashed border-[#2A3A4A] my-3" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-[#FFB800]">Your Net Tax Saving</span>
                                        <span className="text-lg font-black text-[#FFB800] bg-[#FFB800]/10 px-3 py-1 rounded">
                                            ₹{(CURRENT_TAX - simTax).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>
                                </div>

                                <Button variant="secondary" className="w-full">Update Declarations</Button>
                            </div>
                        </Card>

                        {/* Form 16 Links */}
                        <Card padding="md" className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-white">Form 16 Availability</h4>
                                <p className="text-xs text-[#8899AA] mt-0.5">Will be available after June 15, 2025</p>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="ghost" size="sm" icon={<Eye size={12} />}>Part A Preview</Button>
                                <Button variant="ghost" size="sm" icon={<Eye size={12} />}>Part B Preview</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
