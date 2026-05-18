"use client";

import { Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

export default function PayrollCycleSettings() {
    return (
        <Page
            title="Payroll Cycle Settings"
            subtitle="Define pay frequency, cut-off dates, and lock periods for processing."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Cycle" },
            ]}
            maxWidth="800px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>Save Settings</Button>
            }
        >
            <div className="space-y-6">
                {/* Pay Frequency */}
                <Card padding="lg">
                    <h2 className="text-base font-semibold text-white mb-4">Pay Frequency</h2>
                    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <legend className="sr-only">Pay frequency selection</legend>
                        <label className="flex items-center gap-3 p-4 bg-[#00E5A0]/5 border border-[#00E5A0] rounded-xl cursor-pointer">
                            <input type="radio" name="freq" defaultChecked className="accent-[#00E5A0] w-4 h-4" />
                            <div>
                                <div className="text-sm font-semibold text-white mb-1">Monthly</div>
                                <div className="text-xs text-[#8899AA]">Once a month payout</div>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl cursor-pointer opacity-60">
                            <input type="radio" name="freq" disabled className="w-4 h-4" />
                            <div>
                                <div className="text-sm font-semibold text-white mb-1">Bi-Weekly</div>
                                <div className="text-xs text-[#8899AA]">Every two weeks</div>
                            </div>
                        </label>
                    </fieldset>
                </Card>

                {/* Calculation Period */}
                <Card padding="lg">
                    <h2 className="text-base font-semibold text-white mb-4">Attendance &amp; Payroll Period</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="cycle-start" className="block text-sm font-medium text-white mb-2">Pay Cycle Start Date</label>
                            <select
                                id="cycle-start"
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm outline-none focus:border-[#00E5A0]"
                            >
                                <option>1st of the month</option>
                                <option>25th of previous month</option>
                                <option>26th of previous month</option>
                            </select>
                            <p className="text-xs text-[#8899AA] mt-1.5">Current Cycle: <strong>1st Nov to 30th Nov</strong></p>
                        </div>
                        <div>
                            <label htmlFor="payslip-release" className="block text-sm font-medium text-white mb-2">Pay Slip Release Date</label>
                            <select
                                id="payslip-release"
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm outline-none focus:border-[#00E5A0]"
                            >
                                <option>Last working day of month</option>
                                <option>1st of next month</option>
                                <option>5th of next month</option>
                                <option>7th of next month</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t border-[#1A2A3A] pt-6">
                        <h3 className="text-sm font-semibold text-white mb-4">Attendance Cut-off Strategy</h3>
                        <fieldset className="space-y-4">
                            <legend className="sr-only">Attendance cut-off strategy</legend>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="radio" name="cutoff" defaultChecked className="accent-[#00E5A0] mt-1 w-4 h-4" />
                                <div>
                                    <div className="text-sm font-medium text-white mb-1">Strict Month-End</div>
                                    <div className="text-xs text-[#8899AA] leading-relaxed">Leaves or LOP missing approval by month-end will be automatically carried forward as arrears to next month.</div>
                                </div>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="radio" name="cutoff" className="accent-[#00E5A0] mt-1 w-4 h-4" />
                                <div>
                                    <div className="text-sm font-medium text-white mb-1">Extended Lock</div>
                                    <div className="text-xs text-[#8899AA] leading-relaxed">Managers have until 3rd of the next month to approve time-offs. Payroll is blocked until cutoff expires.</div>
                                </div>
                            </label>
                        </fieldset>
                    </div>
                </Card>

                {/* Day Calculation */}
                <Card padding="lg">
                    <h2 className="text-base font-semibold text-white mb-4">Day Calculation Formula</h2>
                    <fieldset className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 space-y-4">
                        <legend className="sr-only">Day calculation formula</legend>
                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <div className="text-sm font-medium text-white mb-1">Actual Days in Month</div>
                                <div className="text-xs text-[#8899AA]">Divide by 28, 29, 30, or 31 based on calendar month.</div>
                            </div>
                            <input type="radio" name="days" defaultChecked className="accent-[#00E5A0] w-4 h-4" />
                        </label>
                        <div className="h-px bg-[#1A2A3A]" />
                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <div className="text-sm font-medium text-white mb-1">Fixed 30 Days</div>
                                <div className="text-xs text-[#8899AA]">Standardize calculation to divide by exactly 30 days every month.</div>
                            </div>
                            <input type="radio" name="days" className="accent-[#00E5A0] w-4 h-4" />
                        </label>
                    </fieldset>
                </Card>
            </div>
        </Page>
    );
}
