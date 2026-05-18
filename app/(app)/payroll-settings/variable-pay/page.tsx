"use client";

import { useState } from "react";
import { Calculator, Plus, Save, Settings2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

const ELIGIBLE_ROLES = ["Sales Executive", "Account Manager", "BDM"] as const;

const SLABS = [
    { min: 0, max: 49, payout: 0 },
    { min: 50, max: 74, payout: 50 },
    { min: 75, max: 89, payout: 75 },
    { min: 90, max: 99, payout: 90 },
    { min: 100, max: 119, payout: 100 },
    { min: 120, max: null, payout: 120 },
] as const;

const SIMULATOR_EMPLOYEES = [
    { name: "Kavya Nair", pct: 124, var: 96000, out: 115200, payPct: 120 },
    { name: "Rohit Joshi", pct: 85, var: 72000, out: 54000, payPct: 75 },
    { name: "Meena Iyer", pct: 62, var: 60000, out: 30000, payPct: 50 },
    { name: "Rahul Gupta", pct: 105, var: 80000, out: 80000, payPct: 100 },
    { name: "Vikas Tyagi", pct: 45, var: 50000, out: 0, payPct: 0 },
] as const;

export default function VariablePaySetupPage() {
    const [planName, setPlanName] = useState("Q4 FY24-25 Sales Variable");

    return (
        <Page
            title="Variable Pay Setup"
            subtitle="Configure variable pay rules, payout frequencies, and target metrics."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Variable Pay" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Config Panel */}
                <div className="xl:col-span-2">
                    <Card padding="lg">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="vp-plan-name" className="block text-xs text-[#8899AA] mb-2">Plan Name</label>
                                <input
                                    id="vp-plan-name"
                                    type="text"
                                    value={planName}
                                    onChange={(e) => setPlanName(e.target.value)}
                                    className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white px-3 text-sm outline-none focus:border-[#00E5A0]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-[#8899AA] mb-2">Payout Frequency</p>
                                    <fieldset className="flex gap-4">
                                        <legend className="sr-only">Payout frequency</legend>
                                        {["Monthly", "Quarterly", "Annual"].map((freq) => (
                                            <label key={freq} className="flex items-center gap-2 text-sm cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="vp-freq"
                                                    defaultChecked={freq === "Quarterly"}
                                                    className="accent-[#00E5A0]"
                                                />
                                                <span className={freq === "Quarterly" ? "text-white" : "text-[#8899AA]"}>{freq}</span>
                                            </label>
                                        ))}
                                    </fieldset>
                                </div>
                                <div>
                                    <label htmlFor="vp-formula" className="block text-xs text-[#8899AA] mb-2">Payout Formula Type</label>
                                    <select
                                        id="vp-formula"
                                        className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white px-3 text-sm outline-none focus:border-[#00E5A0]"
                                    >
                                        <option>Target Achievement %</option>
                                        <option>Linear Multiplier</option>
                                        <option>Fixed Amount Matrix</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-[#8899AA] mb-2">Eligible Roles</p>
                                <div className="flex flex-wrap gap-2">
                                    {ELIGIBLE_ROLES.map((role) => (
                                        <span key={role} className="bg-[#1A2A3A] text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-2">
                                            {role}
                                            <button type="button" className="text-[#8899AA] hover:text-white" aria-label={`Remove ${role}`}>×</button>
                                        </span>
                                    ))}
                                    <Button variant="outline" size="sm" icon={<Plus size={12} aria-hidden="true" />}>Add Role</Button>
                                </div>
                            </div>

                            <div className="border-t border-[#1A2A3A] pt-5">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-sm font-medium text-white">Payout Slabs (Target Achievement %)</p>
                                    <Button variant="ghost" size="sm">+ Add Slab</Button>
                                </div>
                                <div className="space-y-2">
                                    {SLABS.map((slab, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-[#0D1928] px-3 py-2 rounded-lg border border-[#1A2A3A] text-xs flex-wrap">
                                            <span className="text-[#8899AA]">From:</span>
                                            <input
                                                type="text"
                                                defaultValue={slab.min}
                                                aria-label={`Slab ${i + 1} minimum achievement`}
                                                className="w-14 h-8 bg-[#1A2A3A] rounded text-white text-center outline-none"
                                            />
                                            <span className="text-[#8899AA]">% to</span>
                                            <input
                                                type="text"
                                                defaultValue={slab.max ?? "Max"}
                                                disabled={slab.max === null}
                                                aria-label={`Slab ${i + 1} maximum achievement`}
                                                className="w-14 h-8 bg-[#1A2A3A] rounded text-center outline-none disabled:text-[#8899AA] text-white"
                                            />
                                            <span className="text-[#8899AA]">% achieve</span>
                                            <span className="text-[#00E5A0] font-medium ml-auto">Payout:</span>
                                            <input
                                                type="text"
                                                defaultValue={slab.payout}
                                                aria-label={`Slab ${i + 1} payout percentage`}
                                                className="w-14 h-8 bg-[#1A2A3A] border border-[#00E5A0]/40 rounded text-[#00E5A0] text-center outline-none font-semibold"
                                            />
                                            <span className="text-[#8899AA]">% of Variable Comp</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0D1928] p-4 rounded-lg border border-dashed border-[#2A3A4A]">
                                <div>
                                    <label htmlFor="max-cap" className="block text-xs text-[#8899AA] mb-2">Max Payout Cap</label>
                                    <input
                                        id="max-cap"
                                        type="text"
                                        defaultValue="200%"
                                        className="w-full h-9 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-white px-3 text-sm outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="tds-treatment" className="block text-xs text-[#8899AA] mb-2">TDS Treatment</label>
                                    <select
                                        id="tds-treatment"
                                        className="w-full h-9 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-white px-3 text-sm outline-none"
                                    >
                                        <option>Deduct immediately (Lump sum)</option>
                                        <option>Spread over remaining FY</option>
                                    </select>
                                </div>
                            </div>

                            <Button className="w-full" icon={<Save size={16} aria-hidden="true" />}>
                                Save Variable Pay Plan
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Simulator Panel */}
                <div>
                    <Card padding="lg" className="sticky top-6">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1A2A3A]">
                            <div className="w-10 h-10 rounded-lg bg-[#00E5A0]/10 flex items-center justify-center" aria-hidden="true">
                                <Calculator size={18} className="text-[#00E5A0]" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white">Formula Live Simulator</h3>
                                <p className="text-xs text-[#8899AA] mt-0.5">Sample calculations based on active config</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {SIMULATOR_EMPLOYEES.map((emp) => (
                                <div key={emp.name} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium text-white">{emp.name}</span>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded ${emp.pct >= 100 ? "text-[#00E5A0] bg-[#00E5A0]/10" : "text-[#FFB800] bg-[#FFB800]/10"}`}>
                                            {emp.pct}% Achieved
                                        </span>
                                    </div>
                                    <dl className="space-y-1 text-xs text-[#8899AA] mb-3">
                                        <div className="flex justify-between">
                                            <dt>Base Variable (100%)</dt>
                                            <dd>₹{emp.var.toLocaleString()}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt>Slab Applied</dt>
                                            <dd>{emp.payPct}% Payout</dd>
                                        </div>
                                    </dl>
                                    <div className="flex justify-between items-center bg-[#1A2A3A] px-3 py-2.5 rounded-lg">
                                        <span className="text-xs text-[#c8d8e8]">Final Payout</span>
                                        <span className={`text-base font-semibold ${emp.out > emp.var ? "text-[#00E5A0]" : emp.out === emp.var ? "text-white" : "text-[#FFB800]"}`}>
                                            ₹{emp.out.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 bg-[#1A2A3A] px-3 py-2.5 rounded-lg text-xs text-[#8899AA] text-center flex items-center justify-center gap-2">
                            <Settings2 size={12} aria-hidden="true" /> View raw JSON calculation log
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
