"use client";

import { Calendar, CheckCircle, RefreshCw, Save, Zap } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveAccrualPage() {
    return (
        <Page
            title="Leave Accrual Settings"
            subtitle="Define how and when leaves are credited to employee accounts"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Settings" },
                { label: "Accrual" },
            ]}
            maxWidth="900px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>
                    Save Rules
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Frequency */}
                <Card padding="lg">
                    <CardHeader className="border-b border-[#1A2A3A] pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <RefreshCw size={18} className="text-[#0066FF]" aria-hidden="true" />
                            Default Accrual Frequency
                        </CardTitle>
                    </CardHeader>

                    <fieldset className="mt-6">
                        <legend className="sr-only">Accrual frequency</legend>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="relative flex cursor-pointer rounded-xl border-2 border-[#0066FF] bg-[#0066FF]/5 p-4">
                                <input type="radio" name="freq" className="sr-only" defaultChecked />
                                <div className="flex w-full items-start gap-3">
                                    <CheckCircle size={20} className="mt-0.5 text-[#0066FF]" aria-hidden="true" />
                                    <div>
                                        <span className="mb-1 block text-base font-bold text-white">Monthly</span>
                                        <span className="block text-xs text-[#8899AA]">
                                            Leaves are prorated and credited at the start of each month (e.g., 1.25 EL per month).
                                        </span>
                                    </div>
                                </div>
                            </label>

                            <label className="relative flex cursor-pointer rounded-xl border border-[#1A2A3A] bg-[#0A1420] p-4 opacity-70 transition-colors hover:border-[#2A3A4A]">
                                <input type="radio" name="freq" className="sr-only" />
                                <div className="flex w-full items-start gap-3">
                                    <Calendar size={20} className="mt-0.5 text-[#556677]" aria-hidden="true" />
                                    <div>
                                        <span className="mb-1 block text-base font-bold text-white">Yearly Upfront</span>
                                        <span className="block text-xs text-[#8899AA]">
                                            Total annual quota is credited on Jan 1st (or start of financial year).
                                        </span>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </fieldset>
                </Card>

                {/* Advanced conditions */}
                <Card padding="lg">
                    <CardHeader className="border-b border-[#1A2A3A] pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Zap size={18} className="text-[#FFB800]" aria-hidden="true" />
                            Advanced Accrual Conditions
                        </CardTitle>
                    </CardHeader>

                    <div className="mt-6 space-y-6 text-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-white">Prorate Accrual for LWP</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">
                                    Reduce next month&apos;s leave credit if employee takes Leave Without Pay (LWP).
                                </p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" className="peer sr-only" defaultChecked aria-label="Prorate accrual for LWP" />
                                <div className="peer h-6 w-11 rounded-full bg-[#1A2A3A] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#FFB800] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
                            </label>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-white">Probation Period Hold</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">
                                    Accrue leaves during probation, but restrict usage until confirmation.
                                </p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" className="peer sr-only" defaultChecked aria-label="Probation period hold" />
                                <div className="peer h-6 w-11 rounded-full bg-[#1A2A3A] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#00E5A0] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
                            </label>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        <div className="flex items-center justify-between">
                            <div className="pr-10">
                                <h3 className="font-bold text-white">Date of Credit (Monthly)</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">
                                    Which day of the month should leaves be credited to the balance?
                                </p>
                            </div>
                            <select
                                aria-label="Date of credit"
                                className="w-48 rounded-lg border border-[#2A3A4A] bg-[#060B14] p-2.5 text-center font-bold text-white outline-none focus:border-[#00E5A0]"
                            >
                                <option>1st of the Month</option>
                                <option>End of Payroll Cycle</option>
                            </select>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
