"use client";

import { AlertOctagon, CheckCircle2, ChevronRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NegativeNetPayPage() {
    return (
        <Page
            title="Negative Net Pay Resolution"
            subtitle="Deductions exceed gross earnings for this employee in the current cycle."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Negative Net Pay" },
            ]}
            maxWidth="800px"
        >
            <div className="space-y-6">
                {/* Employee Card */}
                <Card padding="lg">
                    <div className="mb-6 flex items-center gap-3 pb-6 border-b border-dashed border-[#1A2A3A]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                            <AlertOctagon size={22} className="text-red-400" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-white">Suresh Babu</p>
                                    <p className="text-sm text-[#8899AA]">EMP088 · Associate Consultant</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-wider text-[#8899AA]">Net Pay Profile</p>
                                    <p className="text-3xl font-bold text-red-400">-₹12,800</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2">
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8899AA]">Earnings</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#CCC]">Gross Salary</span>
                                <span className="font-medium text-white">₹22,000</span>
                            </div>
                        </div>
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8899AA]">Deductions</p>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#CCC]">Loss of Pay (26 days)</span>
                                    <span className="text-white">₹22,000</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#CCC]">Provident Fund (PF)</span>
                                    <span className="text-white">₹1,800</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#CCC]">Income Tax (TDS)</span>
                                    <span className="text-white">₹3,000</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#CCC]">Company Loan EMI</span>
                                    <span className="text-white">₹8,000</span>
                                </div>
                                <div className="flex justify-between border-t border-[#1A2A3A] pt-3 text-sm font-semibold">
                                    <span className="text-white">Total Deductions</span>
                                    <span className="text-white">₹34,800</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Resolution Options */}
                <h3 className="text-base font-semibold text-white">How would you like to resolve?</h3>

                <div className="flex flex-col gap-4">
                    {/* Auto Suggestion */}
                    <Card
                        variant="bare"
                        className="cursor-pointer rounded-2xl border border-[rgba(0,229,160,0.4)] bg-[rgba(0,229,160,0.05)] p-5"
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 font-semibold text-[#00E5A0]">
                                <CheckCircle2 size={18} aria-hidden="true" /> Auto-resolve: Smart Suggestion
                            </div>
                            <span className="font-semibold text-[#00E5A0]">Net: ₹3,200</span>
                        </div>
                        <ul className="mb-4 flex flex-col gap-1.5 pl-6 text-sm leading-relaxed text-[#8899AA]">
                            <li>• Defer <strong className="text-white">Company Loan EMI (₹8,000)</strong> to April 2025.</li>
                            <li>• Reduce <strong className="text-white">TDS by ₹3,000</strong> (spread recalculation over remaining FY).</li>
                            <li>• Waive loan penalty of ₹3,000 automatically.</li>
                        </ul>
                        <Button className="w-full">Apply Suggestion</Button>
                    </Card>

                    {/* Option 1 */}
                    <Card className="cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mb-1 text-base font-medium text-white">Carry forward deductions to next month</p>
                                <p className="text-sm text-[#8899AA]">
                                    Defer ₹12,800 shortage. Net pay this month will be ₹0. Next month will deduct extra ₹12,800.
                                </p>
                            </div>
                            <ChevronRight size={20} className="shrink-0 text-[#8899AA]" aria-hidden="true" />
                        </div>
                    </Card>

                    {/* Option 2 */}
                    <Card className="cursor-pointer opacity-60">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <p className="text-base font-medium text-white">Waive deductions completely</p>
                                    <span className="rounded bg-[rgba(255,184,0,0.1)] px-1.5 py-0.5 text-xs text-[#FFB800]">
                                        Requires CFO Approval
                                    </span>
                                </div>
                                <p className="text-sm text-[#8899AA]">
                                    Waive loan EMI (-₹8,000). TDS waiver (-₹3,000) not recommended due to compliance.
                                </p>
                            </div>
                            <ChevronRight size={20} className="shrink-0 text-[#8899AA]" aria-hidden="true" />
                        </div>
                    </Card>

                    {/* Option 3 */}
                    <Card className="cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mb-1 text-base font-medium text-white">Record manual payment from employee</p>
                                <p className="text-sm text-[#8899AA]">
                                    Employee repays ₹12,800 via bank transfer manually. Records as advance recovery.
                                </p>
                            </div>
                            <ChevronRight size={20} className="shrink-0 text-[#8899AA]" aria-hidden="true" />
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
