"use client";

import {
    CreditCard, Calendar, AlertCircle, ShieldCheck, Landmark, Receipt, Send,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface PaymentMode {
    label: string;
    icon: typeof Landmark;
    active: boolean;
}

const PAYMENT_MODES: PaymentMode[] = [
    { label: "Bank Transfer (NEFT/IMPS)", icon: Landmark, active: true },
    { label: "Cloud Payroll Payout", icon: Send, active: false },
    { label: "Corporate Cheque", icon: Receipt, active: false },
    { label: "Third-Party Processor", icon: CreditCard, active: false },
];

export default function FnFPayment() {
    return (
        <Page
            title="Financial Disbursement"
            subtitle="Finalize and trigger the payment for Arnab Das."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Payment" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
                {/* Payment Setup */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="lg">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="border-l-4 border-blue-500 pl-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Payment Modal Selection
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {PAYMENT_MODES.map((mode) => {
                                        const Icon = mode.icon;
                                        return (
                                            <button
                                                key={mode.label}
                                                type="button"
                                                aria-pressed={mode.active}
                                                className={`flex flex-col gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
                                                    mode.active
                                                        ? "border-blue-500 bg-blue-500/10"
                                                        : "border-[#1A2A3A] bg-[#060B14] hover:border-[#445566]"
                                                }`}
                                            >
                                                <Icon
                                                    size={24}
                                                    aria-hidden="true"
                                                    className={mode.active ? "text-blue-500" : "text-[#445566]"}
                                                />
                                                <span
                                                    className={`text-xs font-black uppercase tracking-tight ${
                                                        mode.active ? "text-white" : "text-[#445566]"
                                                    }`}
                                                >
                                                    {mode.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="border-l-4 border-emerald-500 pl-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Disbursement Schedule
                                </h3>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="execution-date" className="text-[10px] font-bold uppercase text-[#445566]">
                                            Execution Date
                                        </label>
                                        <div className="relative">
                                            <Calendar
                                                size={18}
                                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                                                aria-hidden="true"
                                            />
                                            <input
                                                id="execution-date"
                                                type="date"
                                                defaultValue="2024-04-30"
                                                className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] py-3.5 pl-12 pr-4 font-bold text-white outline-none focus:border-[#00e5a0]"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="priority-level" className="text-[10px] font-bold uppercase text-[#445566]">
                                            Priority Level
                                        </label>
                                        <select
                                            id="priority-level"
                                            className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3.5 font-bold text-white outline-none focus:border-[#00e5a0]"
                                        >
                                            <option>Standard (Target 3 Days)</option>
                                            <option>High Priority (Same Day)</option>
                                            <option>Holding (Review Mandatory)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-2xl border border-l-4 border-[#1A2A3A] border-l-emerald-500 bg-[#060B14] p-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500">
                                        <ShieldCheck size={20} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-tight text-white">Bank Details Verified</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                            HDFC BANK · AC: 9812XXXXXX · IFSC: HDFC0001
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">Change Detail</Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Final Pay Summary */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg" variant="elevated">
                        <div className="space-y-6 text-center">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                Disbursement Total
                            </h2>
                            <p className="text-4xl font-black tabular-nums text-white">₹3,25,202.00</p>

                            <dl className="space-y-3 border-t border-[#1A2A3A] pt-4 text-left">
                                <div className="flex justify-between text-xs font-bold">
                                    <dt className="text-[#8899AA]">Salary Portion</dt>
                                    <dd className="text-white">₹1,20,000</dd>
                                </div>
                                <div className="flex justify-between text-xs font-bold">
                                    <dt className="text-[#8899AA]">Statutory Dues</dt>
                                    <dd className="text-white">₹2,15,400</dd>
                                </div>
                                <div className="flex justify-between text-xs font-bold">
                                    <dt className="text-[#8899AA]">Manual Deductions</dt>
                                    <dd className="text-rose-400">-₹10,198</dd>
                                </div>
                            </dl>

                            <Button
                                variant="primary"
                                icon={<Send size={16} aria-hidden="true" />}
                                className="w-full"
                            >
                                Process Payment
                            </Button>
                            <p className="text-[10px] text-[#445566]">
                                Transaction logs will be generated automatically.
                            </p>
                        </div>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                            <AlertCircle size={14} aria-hidden="true" />
                            Hold Warnings
                        </h3>
                        <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-3">
                            <p className="text-[10px] leading-relaxed text-[#445566]">
                                Pending clear tax declaration for current year. Payment may be withheld if mandatory PAN
                                details are not updated.
                            </p>
                        </div>
                        <Badge variant="warning" className="mt-3">Tax Declaration Pending</Badge>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
