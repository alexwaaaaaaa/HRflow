"use client";

import { useState } from "react";
import { ShieldCheck, CreditCard, Building, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type Tab = "general" | "integrations" | "compliance";

const TABS = [
    { id: "general" as Tab, label: "General Config", icon: Building },
    { id: "integrations" as Tab, label: "Fintech Partners", icon: CreditCard },
    { id: "compliance" as Tab, label: "Compliance & Audit", icon: ShieldCheck },
] as const;

const LEDGER_OPTIONS = ["Tally Prime ERP", "Zoho Books", "QuickBooks India", "Xero"] as const;

export default function FinanceSettingsPage() {
    const [activeTab, setActiveTab] = useState<Tab>("general");

    return (
        <Page
            title="Finance Module Settings"
            subtitle="Configure integrations, permissions, and core behavior for financial products"
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Settings" },
            ]}
            maxWidth="1100px"
            actions={
                <Button icon={<Save size={14} />}>Save Changes</Button>
            }
        >
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Tab Nav */}
                <nav className="w-full lg:w-64 flex flex-col gap-2" aria-label="Settings sections">
                    {TABS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setActiveTab(id)}
                            aria-current={activeTab === id ? "page" : undefined}
                            className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === id ? "bg-[#1A2A3A] text-[#00E5FF] border border-[#2A3A4A]" : "text-[#8899AA] hover:bg-[#1A2A3A]/50"}`}
                        >
                            <Icon size={16} aria-hidden="true" />
                            {label}
                        </button>
                    ))}
                </nav>

                {/* Tab Content */}
                <Card padding="lg" className="flex-1 w-full">
                    {activeTab === "general" && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-white border-b border-[#1A2A3A] pb-3 mb-6">Accounting Sync</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="ledger-software" className="block text-sm font-medium text-[#8899AA] mb-2">Primary Ledger Software</label>
                                        <select
                                            id="ledger-software"
                                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00E5FF] transition-colors"
                                        >
                                            {LEDGER_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                    <label className="flex items-center gap-3 cursor-pointer mt-4">
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={true}
                                            aria-label="Auto-sync daily entries at midnight"
                                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#00E5FF] transition-colors"
                                        >
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                                        </button>
                                        <div className="text-sm">
                                            <p className="font-medium text-white">Auto-sync daily entries at midnight</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "integrations" && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-white border-b border-[#1A2A3A] pb-3 mb-6">Partner Credentials</h3>
                                <div className="space-y-6">
                                    <div className="p-5 border border-[#1A2A3A] rounded-xl bg-[#1A2A3A]/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold" aria-hidden="true">R</div>
                                                <h4 className="font-semibold text-white">RazorpayX (Disbursements)</h4>
                                            </div>
                                            <Badge variant="success">Connected</Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="razorpay-key" className="block text-xs text-[#8899AA] mb-1">API Key ID</label>
                                                <input
                                                    id="razorpay-key"
                                                    type="password"
                                                    defaultValue="rzp_live_xxxxxxxxxxx"
                                                    readOnly
                                                    className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-3 py-2 text-sm opacity-70"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="razorpay-webhook" className="block text-xs text-[#8899AA] mb-1">Webhook Secret</label>
                                                <input
                                                    id="razorpay-webhook"
                                                    type="password"
                                                    defaultValue="****************"
                                                    readOnly
                                                    className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-3 py-2 text-sm opacity-70"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 border border-[#1A2A3A] rounded-xl bg-[#1A2A3A]/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold" aria-hidden="true">P</div>
                                                <h4 className="font-semibold text-white">Plum Insurance (Underwriter API)</h4>
                                            </div>
                                            <Button variant="ghost" size="sm">Connect Account</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "compliance" && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-white border-b border-[#1A2A3A] pb-3 mb-6">Audit Settings</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={true}
                                            aria-label="Strict Double-Entry Enforcement"
                                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-500 transition-colors"
                                        >
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                                        </button>
                                        <div className="text-sm">
                                            <p className="font-medium text-white">Strict Double-Entry Enforcement</p>
                                            <p className="text-xs text-[#8899AA]">Transactions will fail if debits do not match credits instantly.</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer mt-4">
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={true}
                                            aria-label="Log PI Usage Info"
                                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#00E5FF] transition-colors"
                                        >
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                                        </button>
                                        <div className="text-sm">
                                            <p className="font-medium text-white">Log PI Usage Info</p>
                                            <p className="text-xs text-[#8899AA]">Keep an audit log whenever an internal admin views employee financial data.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </Page>
    );
}
