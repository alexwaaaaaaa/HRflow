"use client";

import { useState } from "react";
import { Save, Info, AlertCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const ALLOWANCES = [
    { id: "food", label: "Food / Meal Coupons", desc: "Tax-free component under IT Act rules", defaultValue: "₹2,200", unit: "/ mo" },
    { id: "gadget", label: "Gadget / Equipment Allowance", desc: "LTA & Assets depreciation related bounds", defaultValue: "₹60,000", unit: "/ yr" },
    { id: "broadband", label: "Broadband / Work from Home", desc: "Reimbursable against valid utility bills", defaultValue: "₹3,000", unit: "/ mo" },
] as const;

export default function FlexiPayConfigPage() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [maxPercentage, setMaxPercentage] = useState("30");

    return (
        <Page
            title="Flexi Pay Settings"
            subtitle="Configure parameters for how employees can allocate their flexible pay components"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Flexi Pay Configuration" },
            ]}
            maxWidth="1100px"
            actions={
                <Button icon={<Save size={14} />}>Save Configuration</Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Master Toggle */}
                    <Card padding="lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-2">Enable Flexi Pay System</h2>
                                <p className="text-sm text-[#8899AA]">Allow employees to declare and manage their flexible salary components (like Food Coupons, Gadget Allowance, etc) via the portal.</p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={isEnabled}
                                aria-label="Enable Flexi Pay System"
                                onClick={() => setIsEnabled(!isEnabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? "bg-emerald-500" : "bg-[#1A2A3A]"}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? "translate-x-6" : "translate-x-1"}`} />
                            </button>
                        </div>
                    </Card>

                    {/* Component Limits */}
                    <Card padding="lg" className={!isEnabled ? "opacity-50 pointer-events-none" : ""} aria-disabled={!isEnabled}>
                        <h2 className="text-lg font-bold text-white mb-6">Component Limits &amp; Rules</h2>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="global-max-fbp" className="block text-sm font-medium text-[#8899AA] mb-2">Global Maximum FBP (% of Basic)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        id="global-max-fbp"
                                        type="number"
                                        className="w-32 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-[#00E5FF] transition-colors"
                                        value={maxPercentage}
                                        onChange={(e) => setMaxPercentage(e.target.value)}
                                    />
                                    <span className="text-[#8899AA] text-sm" aria-hidden="true">%</span>
                                </div>
                                <p className="text-xs text-[#8899AA] mt-2 flex items-center gap-1">
                                    <Info size={12} aria-hidden="true" /> Total sum of all Flexi Pay components cannot exceed this limit.
                                </p>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            <div>
                                <h3 className="text-sm font-semibold text-white mb-4">Specific Allowances</h3>
                                <div className="space-y-4">
                                    {ALLOWANCES.map((allowance) => (
                                        <div key={allowance.id} className="flex items-center justify-between p-4 bg-[#1A2A3A]/40 rounded-xl border border-[#2A3A4A]">
                                            <div>
                                                <h4 className="text-sm font-medium text-white">{allowance.label}</h4>
                                                <p className="text-xs text-[#8899AA] mt-1">{allowance.desc}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-[#8899AA]">Max Limit</span>
                                                <input
                                                    type="text"
                                                    defaultValue={allowance.defaultValue}
                                                    aria-label={`Max limit for ${allowance.label}`}
                                                    className="w-24 bg-[#0D1928] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00E5FF]"
                                                />
                                                <span className="text-sm text-[#8899AA]">{allowance.unit}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Declaration Window Sidebar */}
                <div className="lg:col-span-1">
                    <Card padding="lg" className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/5">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle size={24} className="text-purple-400" aria-hidden="true" />
                            <h2 className="text-lg font-bold text-white">Declaration Window</h2>
                        </div>
                        <p className="text-sm text-[#8899AA] mb-4">
                            Define when employees are allowed to modify their Flexi Pay structures. Typically done at the beginning of the financial year.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="window-opens" className="block text-xs font-medium text-[#8899AA] mb-1">Window Opens</label>
                                <input
                                    id="window-opens"
                                    type="date"
                                    defaultValue="2025-04-01"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="window-closes" className="block text-xs font-medium text-[#8899AA] mb-1">Window Closes</label>
                                <input
                                    id="window-closes"
                                    type="date"
                                    defaultValue="2025-04-15"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <Button variant="secondary" className="w-full mt-2">Open Window Manually Now</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
