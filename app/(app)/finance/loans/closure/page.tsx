"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const CLOSURE_DATE = "2025-10-16";

export default function LoanClosurePage() {
    return (
        <Page
            title="Loan Account Closure"
            subtitle="Review finalized loan accounts and generate No Objection Certificates (NOC)."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Loans", href: "/finance/loans" },
                { label: "Account Closure" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {/* Loan Details */}
                    <Card padding="lg" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10" aria-hidden="true">
                            <ShieldCheck size={128} className="text-emerald-500" />
                        </div>
                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div>
                                <h2 className="text-xl font-bold text-white">Ananya Sharma</h2>
                                <p className="text-[#8899AA] text-sm mt-1">Software Engineer (EMP-042)</p>
                            </div>
                            <Badge variant="success">Ready for Closure</Badge>
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
                    </Card>

                    {/* Closure Action */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-4">Closure Action</h2>
                        <p className="text-sm text-[#8899AA] mb-6">
                            Closing this account will remove any remaining payroll deduction instructions and permanently lock the loan record. An automated NOC will be generated and emailed to the employee.
                        </p>
                        <label className="flex items-start gap-3 cursor-pointer mb-6">
                            <input type="checkbox" className="mt-1 accent-emerald-500" />
                            <span className="text-sm text-[#8899AA]">
                                I verify that all dues have been successfully collected and cleared in the company ledger. Generate NOC.
                            </span>
                        </label>
                        <Button className="w-full" icon={<CheckCircle2 size={20} />}>Execute Final Closure &amp; Send NOC</Button>
                    </Card>
                </div>

                {/* NOC Preview */}
                <div className="md:col-span-1">
                    <Card padding="sm" className="sticky top-8 max-h-[600px] overflow-y-auto">
                        <h3 className="text-sm font-bold text-white mb-4 px-2">NOC Preview</h3>
                        <div className="bg-white text-black p-6 rounded shadow-inner text-[10px] leading-relaxed font-serif">
                            <div className="text-center mb-6 border-b pb-4">
                                <h2 className="font-bold text-xl uppercase tracking-widest text-[#0B1221]">Acme Corp India</h2>
                                <p className="text-gray-500">No Objection Certificate</p>
                            </div>
                            <div className="text-right mb-4">
                                <p>Date: {CLOSURE_DATE}</p>
                                <p>Ref: NOC/LN-6523/2025</p>
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
                            <div className="mt-12 w-32 border-t border-black mb-1" />
                            <p className="font-bold text-[#0B1221]">Authorized Signatory</p>
                            <p className="text-gray-500">Finance &amp; Payroll Dept.</p>
                            <p className="text-gray-500">Acme Corp India</p>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
