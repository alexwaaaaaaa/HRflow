"use client";

import { useState } from "react";
import { Send, AlertCircle, Upload } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const LOAN_PURPOSES = [
    "Medical Emergency",
    "Marriage Expenses",
    "Education / Upskilling",
    "Home Renovation",
    "Personal Debt Consolidation",
    "Other",
] as const;

const INTEREST_RATE = 8.5; // Annual %

export default function EmployeeLoanApplicationPage() {
    const [loanAmount, setLoanAmount] = useState(150000);
    const [tenure, setTenure] = useState(12);

    const monthlyRate = INTEREST_RATE / 12 / 100;
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalPayable = emi * tenure;

    return (
        <Page
            title="Employee Loan Application"
            subtitle="Submit a request for a subsidized company loan or salary advance."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Loans", href: "/finance/loans" },
                { label: "Apply" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {/* Loan Requirements */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">1. Loan Requirements</h2>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="loan-purpose" className="block text-sm font-medium text-[#8899AA] mb-2">Purpose of Loan *</label>
                                <select
                                    id="loan-purpose"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
                                >
                                    {LOAN_PURPOSES.map((p) => <option key={p}>{p}</option>)}
                                </select>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="loan-amount-slider" className="block text-sm font-medium text-[#8899AA]">Loan Amount Needed (₹)</label>
                                    <span className="text-indigo-400 font-bold">₹{loanAmount.toLocaleString()}</span>
                                </div>
                                <input
                                    id="loan-amount-slider"
                                    type="range"
                                    min="10000"
                                    max="500000"
                                    step="5000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    aria-valuemin={10000}
                                    aria-valuemax={500000}
                                    aria-valuenow={loanAmount}
                                />
                                <div className="flex justify-between text-xs text-[#8899AA] mt-2">
                                    <span>₹10,000</span>
                                    <span>Max Eligibility: ₹5,00,000</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="tenure-slider" className="block text-sm font-medium text-[#8899AA]">Repayment Tenure (Months)</label>
                                    <span className="text-white font-bold">{tenure} Months</span>
                                </div>
                                <input
                                    id="tenure-slider"
                                    type="range"
                                    min="3"
                                    max="36"
                                    step="1"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="w-full h-2 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    aria-valuemin={3}
                                    aria-valuemax={36}
                                    aria-valuenow={tenure}
                                />
                                <div className="flex justify-between text-xs text-[#8899AA] mt-2">
                                    <span>3 mo</span>
                                    <span>36 mo</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Supporting Documents */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">2. Supporting Documents</h2>
                        <label
                            htmlFor="loan-docs"
                            className="border border-dashed border-[#2A3A4A] rounded-xl p-8 flex flex-col items-center justify-center bg-[#1A2A3A]/30 hover:bg-[#1A2A3A]/50 transition-colors cursor-pointer text-center"
                        >
                            <Upload size={32} className="text-[#8899AA] mb-3" aria-hidden="true" />
                            <p className="text-sm font-medium text-white mb-1">Upload Invoices, Estimates, or Doctor&apos;s Bills</p>
                            <p className="text-xs text-[#8899AA]">PDF, PNG, JPG (Max 5MB per file)</p>
                            <Button variant="secondary" size="sm" className="mt-4" type="button">Select Files</Button>
                            <input id="loan-docs" type="file" accept=".pdf,.png,.jpg,.jpeg" multiple className="sr-only" />
                        </label>
                    </Card>

                    {/* Declaration */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-4">3. Declaration &amp; Consent</h2>
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" className="mt-1 accent-indigo-500" />
                            <span className="text-sm text-[#8899AA] leading-relaxed">
                                I hereby declare that the facts given above are genuine. I authorize HRFlow and my employer to automatically deduct the calculated EMI amount from my monthly payroll until the loan is fully recovered. I agree to the policy terms requiring Full &amp; Final settlement adjustments in case of resignation.
                            </span>
                        </label>
                    </Card>

                    <div className="flex justify-end gap-3">
                        <Button variant="secondary">Save Draft</Button>
                        <Button icon={<Send size={14} />}>Submit Application</Button>
                    </div>
                </div>

                {/* EMI Summary Sidebar */}
                <div className="md:col-span-1">
                    <Card padding="lg" className="sticky top-8 border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-blue-500/5">
                        <h2 className="text-lg font-bold text-white mb-6">EMI Summary</h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Principal Amount</span>
                                <span className="text-white font-medium">₹{loanAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Interest Rate (Company)</span>
                                <span className="text-indigo-400 font-medium">{INTEREST_RATE}% p.a.</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Total Interest Payable</span>
                                <span className="text-white font-medium">₹{(totalPayable - loanAmount).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Processing Fee</span>
                                <span className="text-white font-medium">₹0 (Waived)</span>
                            </div>
                        </div>
                        <div className="bg-[#0B1221]/50 rounded-xl p-4 mb-6 border border-[#2A3A4A]/50">
                            <p className="text-xs text-[#8899AA] mb-1">Estimated Monthly EMI</p>
                            <div className="text-3xl font-black text-white">₹{emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                            <p className="text-xs text-[#8899AA] mt-1">Deducted from salary for {tenure} months</p>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-[#8899AA]">
                            <AlertCircle size={16} className="text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <p>Final EMI might vary slightly based on the exact date of disbursement and actual days in the month.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
