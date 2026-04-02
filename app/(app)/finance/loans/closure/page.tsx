"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Flag, ChevronRight, CheckCircle2, ShieldCheck, Download
} from "lucide-react";

export default function LoanClosureScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col items-center">

            <div className="w-full max-w-4xl text-left mb-6">
                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                    <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/finance/loans" className="hover:text-white transition-colors">Loans</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Account Closure</span>
                </div>

                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Flag className="w-8 h-8 text-emerald-400" />
                    Loan Account Closure
                </h1>
                <p className="text-sm text-[#8899AA] mt-1">Review finalized loan accounts and generate No Objection Certificates (NOC).</p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <ShieldCheck className="w-32 h-32 text-emerald-500" />
                        </div>

                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div>
                                <h2 className="text-xl font-bold text-white">Ananya Sharma</h2>
                                <p className="text-[#8899AA] text-sm mt-1">Software Engineer (EMP-042)</p>
                            </div>
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold tracking-widest uppercase">
                                Ready for Closure
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1">Loan Account ID</p>
                                <p className="font-mono text-indigo-400">LN-6523</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1">Purpose</p>
                                <p className="text-white">Medical Advance</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1">Disbursed On</p>
                                <p className="text-white">12 Oct 2024</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] mb-1">Final Payment Rcvd</p>
                                <p className="text-white">05 Oct 2025</p>
                            </div>
                        </div>

                        <div className="border border-[#2A3A4A] rounded-xl overflow-hidden relative z-10 flex text-center divide-x divide-[#2A3A4A]">
                            <div className="flex-1 p-4 bg-[#1A2A3A]/40">
                                <p className="text-xs text-[#8899AA] mb-1">Principal Paid</p>
                                <p className="font-bold text-white">₹1,50,000</p>
                            </div>
                            <div className="flex-1 p-4 bg-[#1A2A3A]/40">
                                <p className="text-xs text-[#8899AA] mb-1">Interest Collected</p>
                                <p className="font-bold text-white">₹12,450</p>
                            </div>
                            <div className="flex-1 p-4 bg-emerald-500/10">
                                <p className="text-xs text-emerald-500 mb-1 font-medium">Outstanding Dues</p>
                                <p className="font-bold text-emerald-400">₹0</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Closure Action</h2>
                        <p className="text-sm text-[#8899AA] mb-6">
                            Closing this account will remove any remaining payroll deduction instructions and permanently lock the loan record. An automated NOC will be generated and emailed to the employee.
                        </p>

                        <label className="flex items-start gap-3 cursor-pointer mb-6">
                            <input type="checkbox" className="mt-1 bg-[#1A2A3A] border-[#2A3A4A] rounded text-emerald-500 focus:ring-0 focus:ring-offset-0" />
                            <span className="text-sm text-[#8899AA]">
                                I verify that all dues have been successfully collected and cleared in the company ledger. Generate NOC.
                            </span>
                        </label>

                        <button className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                            <CheckCircle2 className="w-5 h-5" /> Execute Final Closure & Send NOC
                        </button>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 sticky top-8 max-h-[600px] overflow-y-auto custom-scrollbar">
                        <h3 className="text-sm font-bold text-white mb-4 px-2">NOC Preview</h3>
                        <div className="bg-white text-black p-6 rounded shadow-inner text-[10px] leading-relaxed font-serif">
                            <div className="text-center mb-6 border-b pb-4">
                                <h2 className="font-bold text-xl uppercase tracking-widest text-[#0B1221]">Acme Corp India</h2>
                                <p className="text-gray-500">No Objection Certificate</p>
                            </div>

                            <div className="text-right mb-4">
                                <p>Date: {new Date().toLocaleDateString()}</p>
                                <p>Ref: NOC/LN-6523/{new Date().getFullYear()}</p>
                            </div>

                            <p className="mb-4">To Whom It May Concern,</p>

                            <p className="mb-4 text-justify">
                                This is to certify that Mr./Ms. <strong>Ananya Sharma</strong> (Employee ID: <strong>EMP-042</strong>) was granted a company loan facility (Loan Account Number: <strong>LN-6523</strong>) of INR 1,50,000 for the purpose of Medical Advance on 12 Oct 2024.
                            </p>

                            <p className="mb-4 text-justify">
                                We hereby confirm that the employee has successfully repaid the entire loan amount along with the applicable interest within the agreed tenure.
                            </p>

                            <p className="mb-6 text-justify">
                                As of the date of this certificate, there are <strong>no outstanding dues</strong> payable by the employee against the aforementioned loan account. The loan account stands closed in our records.
                            </p>

                            <div className="mt-12 w-32 border-t border-black mb-1"></div>
                            <p className="font-bold text-[#0B1221]">Authorized Signatory</p>
                            <p className="text-gray-500">Finance & Payroll Dept.</p>
                            <p className="text-gray-500">Acme Corp India</p>

                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                <p className="transform -rotate-45 text-4xl whitespace-nowrap text-emerald-600">PREVIEW ONLY</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
