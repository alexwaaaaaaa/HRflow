"use client";

import { useState } from "react";
import { Save, AlertCircle, PlusCircle, Trash2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface PolicyTier {
    id: number;
    name: string;
    minTenure: number;
    maxTenure: number;
    maxPct: number;
    fee: number;
    isActive: boolean;
}

const INITIAL_POLICIES: PolicyTier[] = [
    { id: 1, name: "Probationers / Interns", minTenure: 0, maxTenure: 6, maxPct: 0, fee: 0, isActive: true },
    { id: 2, name: "Standard FTE", minTenure: 6, maxTenure: 36, maxPct: 30, fee: 1.5, isActive: true },
    { id: 3, name: "Tenured Leaders", minTenure: 36, maxTenure: 999, maxPct: 50, fee: 1.0, isActive: true },
];

export default function EWAPolicySetupPage() {
    const [policies] = useState<PolicyTier[]>(INITIAL_POLICIES);

    return (
        <Page
            title="EWA Policy Tiers"
            subtitle="Configure eligibility rules and fees based on employee tenure or grade."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "EWA", href: "/finance/ewa" },
                { label: "Policy Tiers" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Save size={14} />}>Save Policies</Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    {/* Tier Editor */}
                    <Card padding="lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-white">Tenure-Based Rulesets</h2>
                            <Button variant="ghost" size="sm" icon={<PlusCircle size={14} />}>Add Tier</Button>
                        </div>
                        <div className="space-y-4">
                            {policies.map((policy) => (
                                <div key={policy.id} className="p-5 border border-[#2A3A4A] rounded-xl bg-[#1A2A3A]/40 flex flex-col md:flex-row gap-6 md:items-center relative group">
                                    <div className="md:w-1/4">
                                        <label htmlFor={`policy-name-${policy.id}`} className="block text-xs text-[#8899AA] mb-1">Policy Name</label>
                                        <input
                                            id={`policy-name-${policy.id}`}
                                            type="text"
                                            defaultValue={policy.name}
                                            className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-3 py-2 text-sm focus:border-[#00E5FF] focus:outline-none"
                                        />
                                    </div>
                                    <div className="md:w-1/4">
                                        <label className="block text-xs text-[#8899AA] mb-1">Tenure Range (Months)</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                defaultValue={policy.minTenure}
                                                aria-label={`Min tenure for ${policy.name}`}
                                                className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-2 py-2 text-sm text-center focus:border-[#00E5FF] focus:outline-none"
                                            />
                                            <span className="text-[#8899AA] text-xs">to</span>
                                            <input
                                                type="number"
                                                defaultValue={policy.maxTenure}
                                                aria-label={`Max tenure for ${policy.name}`}
                                                className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-2 py-2 text-sm text-center focus:border-[#00E5FF] focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-1/4">
                                        <label htmlFor={`max-pct-${policy.id}`} className="block text-xs text-[#8899AA] mb-1">Max Withdrawal (%)</label>
                                        <div className="relative">
                                            <input
                                                id={`max-pct-${policy.id}`}
                                                type="number"
                                                defaultValue={policy.maxPct}
                                                className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded pl-3 pr-8 py-2 text-sm focus:border-[#00E5FF] focus:outline-none"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm" aria-hidden="true">%</span>
                                        </div>
                                    </div>
                                    <div className="md:w-1/4">
                                        <label htmlFor={`fee-${policy.id}`} className="block text-xs text-[#8899AA] mb-1">Transaction Fee (%)</label>
                                        <div className="relative">
                                            <input
                                                id={`fee-${policy.id}`}
                                                type="number"
                                                defaultValue={policy.fee}
                                                step="0.1"
                                                className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded pl-3 pr-8 py-2 text-sm focus:border-[#00E5FF] focus:outline-none"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm" aria-hidden="true">%</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        aria-label={`Delete ${policy.name} tier`}
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        icon={<Trash2 size={14} />}
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Exceptions */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Exceptions &amp; Blocklist</h2>
                        <div className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" defaultChecked className="mt-0.5 accent-pink-500" />
                                <div className="text-sm">
                                    <p className="font-medium text-white">Block employees on PIP (Performance Improvement Plan)</p>
                                    <p className="text-xs text-[#8899AA]">Automatically updates from the Performance Module</p>
                                </div>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" defaultChecked className="mt-0.5 accent-pink-500" />
                                <div className="text-sm">
                                    <p className="font-medium text-white">Block employees serving Notice Period</p>
                                    <p className="text-xs text-[#8899AA]">Auto-disable EWA as soon as resignation is submitted to ensure smooth Full &amp; Final settlement.</p>
                                </div>
                            </label>
                        </div>
                        <div className="mt-6 border border-[#2A3A4A] rounded-lg p-4 bg-[#1A2A3A]/20">
                            <label htmlFor="manual-blocklist" className="block text-sm font-medium text-white mb-2">Manual Blocklist (Employee IDs)</label>
                            <textarea
                                id="manual-blocklist"
                                rows={3}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] rounded-lg px-3 py-2 text-sm focus:border-pink-500 focus:outline-none"
                                placeholder="Comma separated, e.g. EMP-101, EMP-205"
                                defaultValue="EMP-442, EMP-991"
                            />
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card padding="lg" className="border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-blue-500/5">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle size={24} className="text-indigo-400" aria-hidden="true" />
                            <h2 className="text-lg font-bold text-white">How Policies Work</h2>
                        </div>
                        <p className="text-sm text-[#8899AA] leading-relaxed mb-4">
                            Policies are evaluated top-to-bottom. If an employee matches multiple tiers, the <strong>most restrictive</strong> policy will be applied automatically.
                        </p>
                        <p className="text-sm text-[#8899AA] leading-relaxed">
                            Changes saved here affect the accrued balances calculated for employees immediately.
                        </p>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
