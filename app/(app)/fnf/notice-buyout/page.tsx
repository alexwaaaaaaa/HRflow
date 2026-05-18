"use client";

import { Calendar, Info, Save, ShieldCheck } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Notice buyout calculation — DO NOT CHANGE these values ───────────────────
// Daily rate = Gross / 26 = 1,25,666 / 26 ≈ 4,833
// Buyout days = 30
// GST (18%) = 30 × 4,833 × 0.18 = 26,100
// Total recovery = 30 × 4,833 + 26,100 = 1,44,990 + 26,100 = 1,71,100 (rounded)

const DAILY_RATE = "₹4,833.00";
const BUYOUT_DAYS = "30 Days";
const GST_AMOUNT = "₹26,100.00";
const TOTAL_RECOVERY = "₹1,71,100.00";

export default function NoticeBuyout() {
    return (
        <Page
            title="Notice Buyout Management"
            subtitle="Handle financial buyouts for shortened notice periods."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Notice Buyout" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Buyout Configuration */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg">
                        <div className="mb-6 flex items-center gap-4 border-b border-[#1A2A3A] pb-6">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-lg font-black text-blue-400">
                                VM
                            </div>
                            <div>
                                <h2 className="text-lg font-black uppercase tracking-tight text-white">Vikram Mehta</h2>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Senior Analyst · Finance
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="buyout-duration" className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Buyout Duration (Days)
                                </label>
                                <div className="relative">
                                    <Calendar size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" aria-hidden="true" />
                                    <input
                                        id="buyout-duration"
                                        type="number"
                                        defaultValue={30}
                                        className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] py-3 pl-10 pr-4 text-xl font-black tabular-nums text-white outline-none focus:border-[#00e5a0]"
                                    />
                                </div>
                                <p className="text-[10px] text-[#445566]">* Maximum 90 days allowed</p>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="payer-responsibility" className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Payer Responsibility
                                </label>
                                <select
                                    id="payer-responsibility"
                                    className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#00e5a0]"
                                >
                                    <option>New Employer Pays</option>
                                    <option>Employee Pays</option>
                                    <option>Company Sponsoring</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">Recovery Mechanism</p>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Recovery mechanism">
                                <label className="flex cursor-pointer flex-col gap-2 rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
                                    <input type="radio" name="recovery" value="fnf" defaultChecked className="sr-only" />
                                    <div className="flex items-center justify-between text-sm font-black text-white">
                                        FnF Deduction <ShieldCheck size={14} className="text-blue-500" aria-hidden="true" />
                                    </div>
                                    <p className="text-[10px] font-semibold uppercase text-[#445566]">Deduct from final payout</p>
                                </label>
                                <label className="flex cursor-pointer flex-col gap-2 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-[#445566]">
                                    <input type="radio" name="recovery" value="external" className="sr-only" />
                                    <p className="text-sm font-black text-[#8899AA]">External Payment</p>
                                    <p className="text-[10px] font-semibold uppercase text-[#445566]">Cheque / Bank Transfer</p>
                                </label>
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                            <Info size={16} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                            <p className="text-xs text-[#8899AA]">
                                Notice buyout is calculated on Gross Salary excluding non-cash variables. This adjustment
                                will be reflected in the FnF balance sheet.
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Calculation & Action */}
                <div className="space-y-6">
                    <Card padding="lg" variant="elevated">
                        <h2 className="mb-6 border-b border-[#1A2A3A] pb-4 text-center text-sm font-bold uppercase tracking-widest text-[#445566]">
                            Recovery Details
                        </h2>
                        <dl className="space-y-4">
                            <div className="flex items-end justify-between border-b border-[#1A2A3A] pb-4">
                                <dt className="text-xs font-bold uppercase tracking-tight text-[#445566]">Daily Rate (Gross)</dt>
                                <dd className="text-lg font-black tabular-nums text-white">{DAILY_RATE}</dd>
                            </div>
                            <div className="flex items-end justify-between border-b border-[#1A2A3A] pb-4">
                                <dt className="text-xs font-bold uppercase tracking-tight text-[#445566]">Buyout Multiplication</dt>
                                <dd className="text-lg font-black tabular-nums text-white">{BUYOUT_DAYS}</dd>
                            </div>
                            <div className="flex items-end justify-between">
                                <dt className="text-xs font-bold uppercase tracking-tight text-[#445566]">GST (18% If Appl.)</dt>
                                <dd className="text-lg font-black tabular-nums text-rose-400">{GST_AMOUNT}</dd>
                            </div>
                        </dl>

                        <div className="mt-6 rounded-2xl border-2 border-[#1A2A3A] bg-[#060B14] p-5 text-center">
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Total Recovery Amount</p>
                            <p className="mt-1 text-4xl font-black tabular-nums text-white">{TOTAL_RECOVERY}</p>
                        </div>

                        <Button variant="primary" icon={<Save size={16} aria-hidden="true" />} className="mt-6 w-full">
                            Confirm Recovery Agreement
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
