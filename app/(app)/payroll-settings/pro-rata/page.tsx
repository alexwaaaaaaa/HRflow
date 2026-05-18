"use client";

import { Save, AlertTriangle, CornerDownRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

const PRO_RATA_COMPONENTS = ["Basic", "HRA", "Special Allowance", "Transport Allowance", "Internet Recon"] as const;

export default function ProRataSettings() {
    return (
        <Page
            title="Pro-Rata & LOP Settings"
            subtitle="Configure calculation rules for partial months (joiners/leavers) and Loss of Pay."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Pro-Rata" },
            ]}
            maxWidth="800px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>Save Rules</Button>
            }
        >
            <div className="space-y-6">
                {/* Mid-Month Joiners */}
                <Card padding="lg">
                    <h2 className="text-base font-semibold text-white mb-4">Mid-Month Joiners &amp; Leavers</h2>
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="pay-gen-rule" className="block text-sm font-medium text-white mb-2">Pay generation rule</label>
                            <select
                                id="pay-gen-rule"
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm outline-none focus:border-[#00E5A0]"
                            >
                                <option>Calculate exactly based on worked days</option>
                                <option>Hold payroll if joined after 25th</option>
                            </select>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-[#FFB800]/5 border border-dashed border-[#FFB800]/30 rounded-lg">
                            <AlertTriangle size={16} className="text-[#FFB800] shrink-0 mt-0.5" aria-hidden="true" />
                            <div className="text-sm text-white leading-relaxed">
                                <span className="text-[#FFB800] font-semibold">Example:</span> Joined on Nov 15th.<br />
                                Base Days in Nov: 30. Payable Days: 16.<br />
                                Basic Salary = (Basic / 30) * 16.
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-white mb-3">Components affected by Pro-rata</p>
                            <div className="flex flex-wrap gap-3">
                                {PRO_RATA_COMPONENTS.map((comp, i) => (
                                    <label key={comp} className="flex items-center gap-2 bg-[#060B14] px-3 py-2 border border-[#1A2A3A] rounded-lg cursor-pointer text-sm text-white">
                                        <input type="checkbox" defaultChecked={i < 4} className="accent-[#00E5A0]" />
                                        {comp}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* LOP Deduction Strategy */}
                <Card padding="lg">
                    <h2 className="text-base font-semibold text-white mb-4">Loss of Pay (LOP) Deductions</h2>
                    <fieldset className="space-y-4">
                        <legend className="sr-only">LOP deduction strategy</legend>
                        <label className="flex items-start gap-3 p-4 bg-[#0066FF]/5 border border-[#0066FF] rounded-xl cursor-pointer">
                            <input type="radio" name="lop" defaultChecked className="accent-[#0066FF] mt-1 w-4 h-4" />
                            <div>
                                <div className="text-sm font-semibold text-white mb-1">Standard Component Level Deduction</div>
                                <div className="text-xs text-[#8899AA] leading-relaxed">Deduct LOP proportionally from all dependent components (Basic, HRA, etc.). Taxes will adjust dynamically based on lowered gross.</div>
                            </div>
                        </label>
                        <label className="flex items-start gap-3 p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl cursor-pointer">
                            <input type="radio" name="lop" className="accent-[#00E5A0] mt-1 w-4 h-4" />
                            <div>
                                <div className="text-sm font-semibold text-white mb-1">Deduct solely from Gross as single line item</div>
                                <div className="text-xs text-[#8899AA] leading-relaxed">Show &quot;LOP Recovery&quot; as a separate deduction. Original Gross remains same on slip. Tax deduction might be impacted.</div>
                            </div>
                        </label>
                    </fieldset>

                    <div className="mt-6 pt-6 border-t border-[#1A2A3A]">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="accent-[#00E5A0] w-4 h-4" />
                            <span className="text-sm font-medium text-white">Count Weekends/Holidays as LOP if bordered by unpaid leaves</span>
                        </label>
                        <div className="flex gap-2 mt-3 pl-7">
                            <CornerDownRight size={14} className="text-[#445566] shrink-0 mt-0.5" aria-hidden="true" />
                            <p className="text-xs text-[#8899AA]">&quot;Sandwich Rule&quot; — Example: Friday Sick (Unpaid) + Monday Sick (Unpaid) = 4 LOP days.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
