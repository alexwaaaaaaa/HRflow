"use client";

import { useState } from "react";
import { Building2, Share2, CheckCircle2, TrendingUp } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

interface BankAccount {
    id: string;
    name: string;
    number: string;
    balance: number;
    fund: number;
    allocation: string;
    status: string;
}

const BANK_ACCOUNTS: BankAccount[] = [
    { id: "HDFC", name: "HDFC Current A/C", number: "XXXX1234", balance: 15000000, fund: 6000000, allocation: "Engineering + Sales", status: "Sufficient" },
    { id: "ICICI", name: "ICICI Current A/C", number: "XXXX5678", balance: 8000000, fund: 4216800, allocation: "HR + Finance + Ops + Others", status: "Sufficient" },
];

const DESTINATION_NODES = [
    { label: "HDFC Payees", amount: "₹42.34L" },
    { label: "SBI Payees", amount: "₹26.18L" },
    { label: "ICICI Payees", amount: "₹19.54L" },
    { label: "Other Banks", amount: "₹14.10L" },
] as const;

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default function MultiBankDisbursementPage() {
    const [autoBalance, setAutoBalance] = useState(true);

    return (
        <Page
            title="Multi-Bank Disbursement Setup"
            subtitle="Manage and route payroll disbursement across multiple company bank accounts."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Multi-Bank" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary">Add Bank Account</Button>
                    <Button icon={<TrendingUp size={14} aria-hidden="true" />}>Proceed to Generate Files</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Left: Banks & Rules */}
                <div className="space-y-6">
                    {/* Source Banks */}
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                            <Building2 size={16} className="text-[#00E5A0]" aria-hidden="true" /> Company Bank Accounts
                        </h3>
                        <div className="space-y-4">
                            {BANK_ACCOUNTS.map((bank) => {
                                const utilPct = (bank.fund / bank.balance) * 100;
                                return (
                                    <div key={bank.id} className="border border-[#1A2A3A] rounded-xl p-4 bg-[#0D1928]">
                                        <div className="flex justify-between mb-4">
                                            <div>
                                                <div className="text-sm font-medium text-white">{bank.name}</div>
                                                <div className="text-xs text-[#8899AA] mt-0.5">A/C: {bank.number}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-[#8899AA]">Available Balance</div>
                                                <div className="text-base font-semibold text-white">{formatCurrency(bank.balance)}</div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-[#8899AA]">Allocated Payroll Fund</span>
                                                <span className="font-medium text-white">{formatCurrency(bank.fund)}</span>
                                            </div>
                                            <div
                                                className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden"
                                                role="progressbar"
                                                aria-valuenow={Math.round(utilPct)}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-label={`${bank.name} utilization: ${utilPct.toFixed(0)}%`}
                                            >
                                                <div className="h-full bg-[#00E5A0] rounded-full" style={{ width: `${utilPct}%` }} />
                                            </div>
                                            <div className="flex justify-between text-xs mt-1">
                                                <span className="text-[#8899AA]">Target: {bank.allocation}</span>
                                                <span className="text-[#00E5A0] flex items-center gap-1">
                                                    <CheckCircle2 size={11} aria-hidden="true" /> {bank.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Allocation Rules */}
                    <Card padding="lg">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-base font-semibold text-white flex items-center gap-2">
                                <Share2 size={16} className="text-[#FFB800]" aria-hidden="true" /> Allocation Rules
                            </h3>
                            <Button variant="ghost" size="sm">+ Add Rule</Button>
                        </div>

                        <div className="flex gap-4 mb-5 flex-wrap">
                            <span className="text-sm text-[#8899AA] mt-1">Split by:</span>
                            <fieldset className="flex gap-3 flex-wrap">
                                <legend className="sr-only">Split method</legend>
                                {["Department", "Location", "Grade", "Manual"].map((mode) => (
                                    <label key={mode} className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input
                                            type="radio"
                                            name="split"
                                            defaultChecked={mode === "Department"}
                                            className="accent-[#00E5A0]"
                                        />
                                        <span className={mode === "Department" ? "text-white" : "text-[#8899AA]"}>{mode}</span>
                                    </label>
                                ))}
                            </fieldset>
                        </div>

                        <div className="space-y-3 mb-5">
                            {[
                                { label: "Rule 1", est: "Est: ₹60,00,000", dept: "Engineering, Sales", bank: "HDFC Current A/C XXXX1234" },
                                { label: "Rule 2 (Default/Catch-all)", est: "Est: ₹42,16,800", dept: "All remaining departments", bank: "ICICI Current A/C XXXX5678" },
                            ].map((rule) => (
                                <div key={rule.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-medium text-[#8899AA]">{rule.label}</span>
                                        <span className="text-xs text-[#8899AA]">{rule.est}</span>
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <select
                                            aria-label={`${rule.label} department`}
                                            className="flex-1 h-9 bg-[#1A2A3A] rounded-lg text-white px-3 text-xs outline-none"
                                        >
                                            <option>{rule.dept}</option>
                                        </select>
                                        <span className="text-[#8899AA] text-xs" aria-hidden="true">→</span>
                                        <select
                                            aria-label={`${rule.label} bank account`}
                                            className="flex-1 h-9 bg-[#1A2A3A] rounded-lg text-white px-3 text-xs outline-none"
                                        >
                                            <option>{rule.bank}</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer bg-[#1A2A3A] p-3 rounded-lg">
                            <input
                                type="checkbox"
                                checked={autoBalance}
                                onChange={(e) => setAutoBalance(e.target.checked)}
                                className="accent-[#00E5A0] w-4 h-4 mt-0.5"
                            />
                            <div>
                                <div className="text-sm font-medium text-white">Auto-balance Shortfalls</div>
                                <div className="text-xs text-[#8899AA] mt-0.5">Automatically distribute funds from backup accounts if a primary account lacks sufficient balance.</div>
                            </div>
                        </label>
                    </Card>
                </div>

                {/* Right: Visualizer & Totals */}
                <div className="space-y-6">
                    {/* Route Visualization */}
                    <Card padding="lg" className="flex flex-col">
                        <h3 className="text-xs text-[#8899AA] uppercase tracking-wider mb-6">Route Visualization</h3>
                        <div className="flex justify-between items-center gap-4">
                            <div className="space-y-6">
                                <div className="bg-[#00E5A0]/10 border border-[#00E5A0] rounded-lg px-4 py-3 w-36">
                                    <div className="text-sm font-medium text-[#00E5A0]">HDFC A/C</div>
                                    <div className="text-xs text-[#8899AA] mt-1">₹60.00L</div>
                                </div>
                                <div className="bg-[#FFB800]/10 border border-[#FFB800] rounded-lg px-4 py-3 w-36">
                                    <div className="text-sm font-medium text-[#FFB800]">ICICI A/C</div>
                                    <div className="text-xs text-[#8899AA] mt-1">₹42.16L</div>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center justify-center" aria-hidden="true">
                                <div className="text-[#1A2A3A] text-2xl font-bold">→</div>
                            </div>
                            <div className="space-y-3">
                                {DESTINATION_NODES.map((node) => (
                                    <div key={node.label} className="bg-[#1A2A3A] rounded-lg px-3 py-2 w-32">
                                        <div className="text-xs text-white">{node.label}</div>
                                        <div className="text-[10px] text-[#8899AA] mt-0.5">{node.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Verification Panel */}
                    <Card padding="lg">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-full bg-[#00E5A0]/10 flex items-center justify-center" aria-hidden="true">
                                <CheckCircle2 size={18} className="text-[#00E5A0]" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white">Total Verification Match</h3>
                                <p className="text-xs text-[#8899AA] mt-0.5">Allocations fully cover the total payroll.</p>
                            </div>
                        </div>
                        <dl className="space-y-3">
                            <div className="flex justify-between bg-[#0D1928] px-4 py-3 rounded-lg">
                                <dt className="text-sm text-[#8899AA]">Total Payroll Liability</dt>
                                <dd className="text-sm font-semibold text-white">₹1,02,16,800</dd>
                            </div>
                            <div className="flex justify-between bg-[#0D1928] px-4 py-3 rounded-lg">
                                <dt className="text-sm text-[#8899AA]">Total Allocated from Banks</dt>
                                <dd className="text-sm font-semibold text-[#00E5A0]">₹1,02,16,800</dd>
                            </div>
                        </dl>
                        <Button variant="secondary" className="w-full mt-5">Save Configuration</Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
