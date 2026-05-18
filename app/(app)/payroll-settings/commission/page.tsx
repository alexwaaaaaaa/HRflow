"use client";

import { useState } from "react";
import { Plus, Save, Banknote, RefreshCcw, TrendingUp } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

const APPLICABLE_ROLES = ["Sales Executive", "Sr. Sales Exec", "Account Executive"] as const;

const SLABS = [
    { min: 0, max: 500000, rate: 2.0 },
    { min: 500000, max: 2000000, rate: 3.0 },
    { min: 2000000, max: 5000000, rate: 4.5 },
    { min: 5000000, max: null, rate: 6.0 },
] as const;

function calcCommission(revenue: number): number {
    return (
        Math.min(revenue, 500000) * 0.02 +
        Math.max(0, Math.min(revenue - 500000, 1500000)) * 0.03 +
        Math.max(0, Math.min(revenue - 2000000, 3000000)) * 0.045 +
        Math.max(0, revenue - 5000000) * 0.06
    );
}

export default function CommissionSetupPage() {
    const [revenue, setRevenue] = useState(3500000);
    const gross = calcCommission(revenue);
    const net = Math.max(0, gross - 60000);

    return (
        <Page
            title="Commission Plan Setup"
            subtitle="Configure sales commission structures, slabs, accelerators, and clawbacks."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Commission" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Config Panel */}
                <div className="xl:col-span-2 space-y-6">
                    <Card padding="lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="md:col-span-2">
                                <label htmlFor="plan-name" className="block text-xs text-[#8899AA] mb-2">Plan Name</label>
                                <input
                                    id="plan-name"
                                    type="text"
                                    defaultValue="FY 2025-26 Sales Commission"
                                    className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white px-3 outline-none focus:border-[#00E5A0]"
                                />
                            </div>
                            <div>
                                <label htmlFor="plan-type" className="block text-xs text-[#8899AA] mb-2">Type</label>
                                <select
                                    id="plan-type"
                                    className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white px-3 outline-none focus:border-[#00E5A0]"
                                >
                                    <option>Revenue-based</option>
                                    <option>Deal-count</option>
                                    <option>Hybrid</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs text-[#8899AA] mb-2">Applicable Roles</p>
                            <div className="flex flex-wrap gap-2">
                                {APPLICABLE_ROLES.map((role) => (
                                    <span key={role} className="bg-[#1A2A3A] text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-2">
                                        {role}
                                        <button type="button" className="text-[#8899AA] hover:text-white" aria-label={`Remove ${role}`}>×</button>
                                    </span>
                                ))}
                                <Button variant="outline" size="sm" icon={<Plus size={12} aria-hidden="true" />}>Add Role</Button>
                            </div>
                        </div>

                        <div className="border-t border-[#1A2A3A] pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm font-medium text-white">Revenue Slabs</p>
                                <Button variant="ghost" size="sm">+ Add Slab</Button>
                            </div>
                            <div className="space-y-2">
                                {SLABS.map((slab, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-[#0D1928] px-3 py-2 rounded-lg border border-[#1A2A3A] text-sm flex-wrap">
                                        <span className="text-[#8899AA] text-xs">From: ₹</span>
                                        <input
                                            type="text"
                                            defaultValue={slab.min}
                                            aria-label={`Slab ${i + 1} minimum`}
                                            className="w-20 h-8 bg-[#1A2A3A] rounded text-white text-right pr-2 outline-none text-xs"
                                        />
                                        <span className="text-[#8899AA] text-xs">to ₹</span>
                                        <input
                                            type="text"
                                            defaultValue={slab.max ?? "Max"}
                                            disabled={slab.max === null}
                                            aria-label={`Slab ${i + 1} maximum`}
                                            className="w-20 h-8 bg-[#1A2A3A] rounded text-right pr-2 outline-none text-xs disabled:text-[#8899AA] text-white"
                                        />
                                        <span className="text-[#00E5A0] text-xs font-medium ml-auto">Rate:</span>
                                        <input
                                            type="text"
                                            defaultValue={slab.rate}
                                            aria-label={`Slab ${i + 1} commission rate`}
                                            className="w-14 h-8 bg-[#1A2A3A] border border-[#00E5A0]/40 rounded text-[#00E5A0] text-center outline-none font-semibold text-xs"
                                        />
                                        <span className="text-[#8899AA] text-xs">%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Accelerators & Clawbacks */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-[#0D1928] p-4 rounded-lg border border-dashed border-[#2A3A4A]">
                                <p className="flex items-center gap-2 text-xs font-medium text-white mb-3">
                                    <TrendingUp size={14} className="text-[#00E5A0]" aria-hidden="true" /> Accelerators
                                </p>
                                <div className="flex items-center gap-2 text-xs flex-wrap">
                                    <span className="text-[#8899AA]">If target &gt;</span>
                                    <input type="text" defaultValue="120%" aria-label="Accelerator threshold" className="w-14 h-7 bg-[#1A2A3A] rounded text-white text-center outline-none text-xs" />
                                    <span className="text-[#8899AA]">:</span>
                                    <input type="text" defaultValue="1.5x" aria-label="Accelerator multiplier" className="w-14 h-7 bg-[#1A2A3A] rounded text-white text-center outline-none text-xs" />
                                    <span className="text-[#8899AA]">multiplier</span>
                                </div>
                            </div>
                            <div className="bg-[#0D1928] p-4 rounded-lg border border-dashed border-[#2A3A4A]">
                                <p className="flex items-center gap-2 text-xs font-medium text-white mb-3">
                                    <RefreshCcw size={14} className="text-[#FFB800]" aria-hidden="true" /> Clawback Rules
                                </p>
                                <div className="flex items-center gap-2 text-xs flex-wrap">
                                    <span className="text-[#8899AA]">If cancelled avg</span>
                                    <input type="text" defaultValue="90" aria-label="Clawback days threshold" className="w-10 h-7 bg-[#1A2A3A] rounded text-white text-center outline-none text-xs" />
                                    <span className="text-[#8899AA]">days:</span>
                                    <input type="text" defaultValue="50%" aria-label="Clawback reclaim percentage" className="w-14 h-7 bg-[#1A2A3A] rounded text-white text-center outline-none text-xs" />
                                    <span className="text-[#8899AA]">reclaim</span>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full mt-6" icon={<Save size={16} aria-hidden="true" />}>
                            Save Commission Plan
                        </Button>
                    </Card>
                </div>

                {/* Simulator Panel */}
                <div>
                    <Card padding="lg" className="sticky top-6">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1A2A3A]">
                            <div className="w-10 h-10 rounded-lg bg-[#00E5A0]/10 flex items-center justify-center" aria-hidden="true">
                                <Banknote size={18} className="text-[#00E5A0]" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white">Earnings Simulator</h3>
                                <p className="text-xs text-[#8899AA] mt-0.5">Evaluate slab calculations instantly</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="trial-revenue" className="block text-xs text-[#8899AA] mb-2">Enter Trial Revenue</label>
                            <div className="relative mb-6">
                                <span className="absolute left-4 top-3 text-[#8899AA] text-sm" aria-hidden="true">₹</span>
                                <input
                                    id="trial-revenue"
                                    type="text"
                                    value={revenue.toLocaleString()}
                                    readOnly
                                    className="w-full h-11 bg-[#0D1928] border border-[#00E5A0]/40 rounded-lg text-white pl-8 pr-4 text-base font-medium outline-none"
                                    aria-label={`Trial revenue: ₹${revenue.toLocaleString()}`}
                                />
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10000000"
                                step="100000"
                                value={revenue}
                                onChange={(e) => setRevenue(Number(e.target.value))}
                                className="w-full accent-[#00E5A0]"
                                aria-label="Adjust trial revenue"
                            />
                        </div>

                        <div className="bg-[#0D1928] rounded-xl p-4 border border-[#1A2A3A] space-y-3">
                            <div className="text-[10px] text-[#8899AA] uppercase tracking-wider">Calculations</div>
                            <div className="flex justify-between text-xs text-[#c8d8e8]">
                                <span>₹0 - ₹5L @ 2.0%</span>
                                <span>{revenue >= 500000 ? "₹10,000" : `₹${(revenue * 0.02).toLocaleString()}`}</span>
                            </div>
                            <div className={`flex justify-between text-xs ${revenue > 500000 ? "text-[#c8d8e8]" : "text-[#445566]"}`}>
                                <span>₹5L - ₹20L @ 3.0%</span>
                                <span>{revenue >= 2000000 ? "₹45,000" : revenue > 500000 ? `₹${((revenue - 500000) * 0.03).toLocaleString()}` : "₹0"}</span>
                            </div>
                            <div className={`flex justify-between text-xs ${revenue > 2000000 ? "text-[#c8d8e8]" : "text-[#445566]"}`}>
                                <span>₹20L - ₹50L @ 4.5%</span>
                                <span>{revenue >= 5000000 ? "₹1,35,000" : revenue > 2000000 ? `₹${((revenue - 2000000) * 0.045).toLocaleString()}` : "₹0"}</span>
                            </div>
                            <div className={`flex justify-between text-xs ${revenue > 5000000 ? "text-[#00E5A0]" : "text-[#445566]"}`}>
                                <span>₹50L+ @ 6.0%</span>
                                <span>{revenue > 5000000 ? `₹${((revenue - 5000000) * 0.06).toLocaleString()}` : "₹0"}</span>
                            </div>
                            <div className="h-px bg-[#1A2A3A]" />
                            <div className="flex justify-between text-sm font-medium text-white">
                                <span>Gross Commission</span>
                                <span>₹{gross.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs text-[#FF5555]">
                                <span>Less: Draw Adjustment (Quarterly)</span>
                                <span>-₹60,000</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#00E5A0]/10 rounded-lg border border-[#00E5A0]/30 mt-2">
                                <span className="text-sm font-medium text-[#00E5A0]">Net Payout Amount</span>
                                <span className="text-xl font-semibold text-[#00E5A0]">₹{net.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-[#8899AA] text-right">*Subject to TDS as per applicable slab</p>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
