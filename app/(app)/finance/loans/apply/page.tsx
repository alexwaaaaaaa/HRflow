"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FileText, Save, Send, ChevronRight, CheckCircle2, AlertCircle, Upload
} from "lucide-react";

export default function EmployeeLoanApplicationScreen() {
    const [step, setStep] = useState(1);
    const [loanAmount, setLoanAmount] = useState(150000);
    const [tenure, setTenure] = useState(12);

    // Auto calculate mock EMI
    const interestRate = 8.5; // Annual 8.5%
    const monthlyRate = interestRate / 12 / 100;
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalPayable = emi * tenure;

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col items-center">

            <div className="w-full max-w-4xl text-left mb-6">
                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                    <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/finance/loans" className="hover:text-white transition-colors">Loans</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Apply</span>
                </div>

                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <FileText className="w-8 h-8 text-indigo-400" />
                    Employee Loan Application
                </h1>
                <p className="text-sm text-[#8899AA] mt-1">Submit a request for a subsidized company loan or salary advance.</p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6">1. Loan Requirements</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Purpose of Loan *</label>
                                <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none active:bg-[#1A2A3A]">
                                    <option>Medical Emergency</option>
                                    <option>Marriage Expenses</option>
                                    <option>Education / Upskilling</option>
                                    <option>Home Renovation</option>
                                    <option>Personal Debt Consolidation</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-[#8899AA]">Loan Amount Needed (₹)</label>
                                    <span className="text-indigo-400 font-bold">₹{loanAmount.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="10000" max="500000" step="5000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                />
                                <div className="flex justify-between text-xs text-[#8899AA] mt-2">
                                    <span>₹10,000</span>
                                    <span>Max Eligibility: ₹5,00,000</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-[#8899AA]">Repayment Tenure (Months)</label>
                                    <span className="text-white font-bold">{tenure} Months</span>
                                </div>
                                <input
                                    type="range"
                                    min="3" max="36" step="1"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="w-full h-2 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                />
                                <div className="flex justify-between text-xs text-[#8899AA] mt-2">
                                    <span>3 mo</span>
                                    <span>36 mo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6">2. Supporting Documents</h2>
                        <div className="border border-dashed border-[#2A3A4A] rounded-xl p-8 flex flex-col items-center justify-center bg-[#1A2A3A]/30 hover:bg-[#1A2A3A]/50 transition-colors cursor-pointer text-center">
                            <Upload className="w-8 h-8 text-[#8899AA] mb-3" />
                            <p className="text-sm font-medium text-white mb-1">Upload Invoices, Estimates, or Doctor's Bills</p>
                            <p className="text-xs text-[#8899AA]">PDF, PNG, JPG (Max 5MB per file)</p>
                            <button className="mt-4 px-4 py-2 bg-[#2A3A4A] text-white text-xs font-medium rounded hover:bg-[#3A4A5A] transition-colors">Select Files</button>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">3. Declaration & Consent</h2>
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" className="mt-1 bg-[#1A2A3A] border-[#2A3A4A] rounded text-indigo-500 focus:ring-0 focus:ring-offset-0" />
                            <span className="text-sm text-[#8899AA] leading-relaxed">
                                I hereby declare that the facts given above are genuine. I authorize HRFlow and my employer to automatically deduct the calculated EMI amount from my monthly payroll until the loan is fully recovered. I agree to the policy terms requiring Full & Final settlement adjustments in case of resignation.
                            </span>
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button className="px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                            Save Draft
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                            <Send className="w-4 h-4" />
                            Submit Application
                        </button>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/5 border border-indigo-500/20 rounded-2xl p-6 sticky top-8">
                        <h2 className="text-lg font-bold text-white mb-6">EMI Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Principal Amount</span>
                                <span className="text-white font-medium">₹{loanAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#2A3A4A]/50">
                                <span className="text-[#8899AA] text-sm">Interest Rate (Company)</span>
                                <span className="text-indigo-400 font-medium">{interestRate}% p.a.</span>
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
                            <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                            <p>Final EMI might vary slightly based on the exact date of disbursement and actual days in the month.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
