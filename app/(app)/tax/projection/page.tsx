"use client";

import React, { useState } from "react";
import ChartWrapper from "@/components/ui/ChartWrapper";
import {
    TrendingUp,
    ArrowRight,
    Download,
    Settings2,
    BarChart3,
    RotateCcw,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    CartesianGrid,
} from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function TDSProjectionScreen() {
    const [incrementPct, setIncrementPct] = useState(10);
    const [bonusAmt, setBonusAmt] = useState(0);
    const [newInvAmt, setNewInvAmt] = useState(150000);
    const [regime, setRegime] = useState<"old" | "new">("new");

    const currentCtc = 1500000;
    const currentTax = 145600;

    // Simulation Math — byte-identical to pre-migration
    const newCtc = currentCtc * (1 + incrementPct / 100) + bonusAmt;

    const oldTaxable = Math.max(0, newCtc - 50000 - newInvAmt - 200000);
    let oldTax = 0;
    if (oldTaxable > 1000000) oldTax = 112500 + (oldTaxable - 1000000) * 0.3;
    else if (oldTaxable > 500000) oldTax = 12500 + (oldTaxable - 500000) * 0.2;
    oldTax = oldTax * 1.04;

    const newTaxable = Math.max(0, newCtc - 50000);
    let newTax = 0;
    if (newTaxable > 1500000) newTax = 150000 + (newTaxable - 1500000) * 0.3;
    else if (newTaxable > 1200000) newTax = 90000 + (newTaxable - 1200000) * 0.2;
    else if (newTaxable > 900000) newTax = 45000 + (newTaxable - 900000) * 0.15;
    else if (newTaxable > 600000) newTax = 15000 + (newTaxable - 600000) * 0.1;
    newTax = newTaxable <= 700000 ? 0 : newTax * 1.04;

    const projectedTax = regime === "old" ? oldTax : newTax;
    const taxDiff = projectedTax - currentTax;

    const chartData = Array.from({ length: 12 }, (_, i) => ({
        month: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][i],
        current: 12133,
        projected: projectedTax / 12,
    }));

    return (
        <Page
            title="TDS Projection — FY 2025-26"
            subtitle="Simulate your future tax liability based on expected salary increments and investments."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "TDS Projection" },
            ]}
            maxWidth="1400px"
            actions={
                <Button variant="secondary" icon={<Download size={16} />}>Export PDF</Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Controls Panel */}
                <Card padding="none" className="lg:col-span-4 lg:sticky lg:top-6">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Settings2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                            Projection Variables
                        </h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            icon={<RotateCcw size={12} />}
                            onClick={() => {
                                setIncrementPct(10);
                                setBonusAmt(0);
                                setNewInvAmt(150000);
                            }}
                        >
                            Reset
                        </Button>
                    </div>

                    <div className="p-5 space-y-6">
                        {/* Base Reference */}
                        <div className="bg-[#060B14] p-3 rounded-lg border border-[#1A2A3A] flex justify-between items-center">
                            <div>
                                <div className="text-[10px] text-[#8899AA] uppercase tracking-wider font-bold">Current CTC</div>
                                <div className="text-sm font-bold text-white">₹15,00,000</div>
                            </div>
                            <ArrowRight size={16} className="text-[#2A3A4A]" aria-hidden="true" />
                            <div className="text-right">
                                <div className="text-[10px] text-[#8899AA] uppercase tracking-wider font-bold">Current Tax</div>
                                <div className="text-sm font-bold text-red-400">₹1,45,600</div>
                            </div>
                        </div>

                        {/* Increment */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="increment-range" className="text-sm font-semibold text-[#c8d8e8]">
                                    Expected Increment
                                </label>
                                <span className="text-sm font-bold text-[#00E5A0]">{incrementPct}%</span>
                            </div>
                            <input
                                id="increment-range"
                                type="range"
                                min="0"
                                max="50"
                                step="1"
                                value={incrementPct}
                                onChange={(e) => setIncrementPct(Number(e.target.value))}
                                className="w-full accent-[#00E5A0]"
                                aria-label="Expected increment percentage"
                            />
                            <div className="flex justify-between text-[10px] text-[#445566] mt-1">
                                <span>0%</span>
                                <span>25%</span>
                                <span>50%</span>
                            </div>
                        </div>

                        {/* Bonus */}
                        <div>
                            <label htmlFor="bonus-input" className="text-sm font-semibold text-[#c8d8e8] block mb-2">
                                Expected Bonus / Variable
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-[#8899AA] font-bold">₹</span>
                                <input
                                    id="bonus-input"
                                    type="number"
                                    value={bonusAmt}
                                    onChange={(e) => setBonusAmt(Number(e.target.value))}
                                    className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                                />
                            </div>
                        </div>

                        {/* Investments */}
                        <div>
                            <label htmlFor="investments-input" className="text-sm font-semibold text-[#c8d8e8] block mb-2">
                                Planned Chapter VI-A Investments
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-[#8899AA] font-bold">₹</span>
                                <input
                                    id="investments-input"
                                    type="number"
                                    value={newInvAmt}
                                    onChange={(e) => setNewInvAmt(Number(e.target.value))}
                                    className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                                />
                            </div>
                            <p className="text-[10px] text-[#8899AA] mt-1">Max 80C: ₹1.5L, 80D: ₹50K</p>
                        </div>

                        {/* Regime Toggle */}
                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <label className="text-sm font-semibold text-[#c8d8e8] block mb-3">Target Tax Regime</label>
                            <div className="flex p-1 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                <button
                                    type="button"
                                    onClick={() => setRegime("old")}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
                                        regime === "old" ? "bg-[#1A2A3A] text-white shadow" : "text-[#8899AA] hover:text-white"
                                    }`}
                                >
                                    Old Regime
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRegime("new")}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
                                        regime === "new" ? "bg-[#1A2A3A] text-white shadow" : "text-[#8899AA] hover:text-white"
                                    }`}
                                >
                                    New Regime (Default)
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Results Panel */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card padding="lg">
                            <div className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-2">Projected CTC</div>
                            <div className="text-2xl font-black text-white flex items-center gap-2">
                                ₹{(newCtc / 100000).toFixed(2)}L
                                {incrementPct > 0 && <TrendingUp size={16} className="text-[#00E5A0]" aria-hidden="true" />}
                            </div>
                            <div className="text-xs text-[#00E5A0] font-medium mt-1">
                                +₹{(newCtc - currentCtc).toLocaleString()} increase
                            </div>
                        </Card>

                        <Card padding="lg" className={taxDiff > 0 ? "border-red-500/20" : "border-[#00E5A0]/20"}>
                            <div className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-2">
                                Projected Tax Liability
                            </div>
                            <div className={`text-2xl font-black ${taxDiff > 0 ? "text-red-400" : "text-[#00E5A0]"}`}>
                                ₹{projectedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                            <div className={`text-xs font-medium mt-1 ${taxDiff > 0 ? "text-red-400" : "text-[#00E5A0]"}`}>
                                {taxDiff > 0 ? "+" : ""}₹{taxDiff.toLocaleString(undefined, { maximumFractionDigits: 0 })} vs
                                current year
                            </div>
                        </Card>

                        <Card padding="lg">
                            <div className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
                                New Monthly TDS
                                <Badge variant={regime === "new" ? "success" : "info"}>
                                    {regime === "new" ? "NEW Reg." : "OLD Reg."}
                                </Badge>
                            </div>
                            <div className="text-2xl font-black text-white">
                                ₹{(projectedTax / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                            <div className="text-xs text-[#8899AA] mt-1">
                                Effective Take-home: ₹
                                {((newCtc - projectedTax) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })} /mo
                            </div>
                        </Card>
                    </div>

                    {/* Chart */}
                    <Card padding="lg">
                        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                            <BarChart3 size={16} className="text-[#0066FF]" aria-hidden="true" />
                            Monthly Tax Outflow Projection
                        </h3>
                        <p className="text-xs text-[#8899AA] mb-6">
                            Comparison of your current year TDS vs projected next year TDS.
                        </p>
                        <div className="h-[280px] w-full">
                            <ChartWrapper height="h-[300px]">
                                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1A2A3A" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#1A2A3A" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0066FF" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#8899AA", fontSize: 11 }}
                                    />
                                    <RechartsTooltip
                                        cursor={{ stroke: "#2A3A4A", strokeWidth: 1, strokeDasharray: "4 4" }}
                                        contentStyle={{
                                            backgroundColor: "#060B14",
                                            borderColor: "#2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                        itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}
                                        labelStyle={{ color: "#8899AA", fontSize: "10px" }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="current"
                                        name="Current FY"
                                        stroke="#445566"
                                        strokeWidth={2}
                                        strokeDasharray="4 4"
                                        fillOpacity={1}
                                        fill="url(#colorCurrent)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="projected"
                                        name="Projected FY"
                                        stroke="#0066FF"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorProjected)"
                                    />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    {/* Breakdown */}
                    <Card padding="none">
                        <div className="px-5 py-3 border-b border-[#1A2A3A] bg-[#0A1420]">
                            <h3 className="text-sm font-bold text-white">Projected Computation Breakdown</h3>
                        </div>
                        <div>
                            {[
                                { label: "Projected Gross Salary", value: `₹${newCtc.toLocaleString()}`, bold: true },
                                { label: "Standard Deduction", value: "-₹50,000", color: "text-[#00E5A0]" },
                                {
                                    label: "Other Exemptions (HRA/LTA)",
                                    value: regime === "old" ? "-₹2,00,000" : "₹0",
                                    color: "text-[#00E5A0]",
                                },
                                {
                                    label: "Chapter VI-A Investments",
                                    value: regime === "old" ? `-₹${newInvAmt.toLocaleString()}` : "₹0",
                                    color: "text-[#00E5A0]",
                                },
                                {
                                    label: "Net Taxable Income",
                                    value: `₹${(regime === "old" ? oldTaxable : newTaxable).toLocaleString()}`,
                                    bold: true,
                                },
                            ].map((row, i) => (
                                <div
                                    key={i}
                                    className={`flex justify-between items-center px-5 py-3 border-b border-[#1A2A3A] ${
                                        row.bold ? "bg-[#060B14]/50" : "hover:bg-[#1A2A3A]/20 transition-colors"
                                    }`}
                                >
                                    <span className={`text-sm ${row.bold ? "font-semibold text-[#c8d8e8]" : "text-[#445566]"}`}>
                                        {row.label}
                                    </span>
                                    <span className={`text-sm font-medium ${row.color ?? "text-white"}`}>{row.value}</span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center px-5 py-4 bg-[#0A1420]">
                                <span className="text-sm font-bold text-[#FFB800] uppercase tracking-wider">
                                    Final Tax Liability
                                </span>
                                <span className="text-lg font-black text-[#FFB800]">
                                    ₹{projectedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
