"use client";

import { ShieldCheck, DollarSign, Save, Link as LinkIcon } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function EWAAdminSettingsPage() {
    return (
        <Page
            title="EWA Global Rules"
            subtitle="Configure company-wide policies for Earned Wage Access withdrawals and fees."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "EWA Admin Settings" },
            ]}
            maxWidth="1100px"
            actions={
                <Button icon={<Save size={14} />}>Publish Policy</Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Withdrawal Caps */}
                    <Card padding="lg">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldCheck size={20} className="text-emerald-400" aria-hidden="true" />
                            <h2 className="text-lg font-bold text-white">Withdrawal Caps &amp; Limits</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="max-withdrawal-pct" className="block text-sm font-medium text-[#8899AA] mb-2">Max. Withdrawal % of Earned Wages</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        id="max-withdrawal-pct"
                                        type="number"
                                        defaultValue="50"
                                        className="w-24 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                                    />
                                    <span className="text-[#8899AA]" aria-hidden="true">%</span>
                                </div>
                                <p className="text-xs text-[#8899AA] mt-2 leading-relaxed">Limits how much of their accrued salary an employee can take out. Recommended: 50% to ensure enough net pay remains for standard deductions.</p>
                            </div>
                            <div>
                                <label htmlFor="max-txn-per-cycle" className="block text-sm font-medium text-[#8899AA] mb-2">Max. Transactions per cycle</label>
                                <input
                                    id="max-txn-per-cycle"
                                    type="number"
                                    defaultValue="3"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                                />
                                <p className="text-xs text-[#8899AA] mt-2 leading-relaxed">Cap the number of times an employee can use EWA per month.</p>
                            </div>
                        </div>
                    </Card>

                    {/* Fee Structure */}
                    <Card padding="lg">
                        <div className="flex items-center gap-3 mb-6">
                            <DollarSign size={20} className="text-amber-400" aria-hidden="true" />
                            <h2 className="text-lg font-bold text-white">Fee Structure</h2>
                        </div>
                        <fieldset className="space-y-6">
                            <legend className="sr-only">Fee type</legend>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="feetype" defaultChecked className="accent-[#00E5FF]" />
                                    <span className="text-sm text-white">Percentage Based</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="feetype" className="accent-[#00E5FF]" />
                                    <span className="text-sm text-white">Flat Fee per TXN</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="feetype" className="accent-[#00E5FF]" />
                                    <span className="text-sm text-white">Company Sponsored (Free for Emp)</span>
                                </label>
                            </div>
                            <hr className="border-[#1A2A3A]" />
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="txn-fee" className="block text-sm font-medium text-[#8899AA] mb-2">Transaction Fee (%)</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            id="txn-fee"
                                            type="text"
                                            defaultValue="1.0"
                                            className="w-24 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                                        />
                                        <span className="text-[#8899AA]" aria-hidden="true">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="fee-covered-by" className="block text-sm font-medium text-[#8899AA] mb-2">Covered by</label>
                                    <select
                                        id="fee-covered-by"
                                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                                    >
                                        <option>Deduct from withdrawal (Net Payload)</option>
                                        <option>Add to recovery payload in Payroll</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                    </Card>
                </div>

                {/* Provider Integration Sidebar */}
                <div className="lg:col-span-1">
                    <Card padding="lg">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                            <LinkIcon size={20} className="text-purple-400" aria-hidden="true" />
                            Provider Integration
                        </h3>
                        <p className="text-sm text-[#8899AA] mb-6">
                            HRFlow is integrated with NBFC partner for capital. Capital is sourced directly via Escrow.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-[#8899AA] mb-1">Escrow Partner</div>
                                <div className="text-white font-medium bg-[#0B1221] border border-[#2A3A4A] px-3 py-2 rounded">ICICI API Banking</div>
                            </div>
                            <div>
                                <div className="text-xs text-[#8899AA] mb-1">Virtual Account Balance</div>
                                <div className="text-emerald-400 font-bold bg-[#0B1221] border border-[#2A3A4A] px-3 py-2 rounded">₹25,00,000.00</div>
                            </div>
                            <Button variant="outline" className="w-full mt-4">Manage Escrow Funding</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
