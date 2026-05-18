"use client";

import React from "react";
import { CheckCircle2, Check, X, AlertTriangle } from "lucide-react";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";

export default function ProofApproveRejectScreen() {
    return (
        <Page
            title="Review: Life Insurance Premium (LIC)"
            subtitle="Rahul Sharma (EMP-0848) • Section 80C"
            breadcrumbs={[
                { label: "Tax", href: "/tax/proof-review" },
                { label: "Proof Review" },
            ]}
            maxWidth="1400px"
            fullBleed
            actions={
                <div className="flex items-center gap-4">
                    <span className="text-sm text-[#8899AA]">Proof 2 of 5 for this employee</span>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm" aria-label="Previous proof">&lt;</Button>
                        <Button variant="secondary" size="sm" aria-label="Next proof">&gt;</Button>
                    </div>
                </div>
            }
        >
            <div className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-220px)] min-h-[600px]">
                {/* Left side: Document Preview */}
                <div className="flex-1 bg-[#060B14] border-r border-[#1A2A3A] flex flex-col">
                    <div className="px-6 py-3 flex justify-end items-center border-b border-[#1A2A3A]">
                        <Button variant="ghost" size="sm">Open in New Tab</Button>
                    </div>
                    <div className="flex-1 p-8 flex justify-center overflow-auto">
                        <div className="w-[600px] h-[700px] bg-white rounded shadow-lg p-12 text-black font-serif">
                            <h2 className="text-center mb-8 text-2xl">LIC RENEWAL PREMIUM RECEIPT</h2>
                            <div className="grid grid-cols-[200px_1fr] gap-4 text-sm">
                                <strong>Policy Holder:</strong>
                                <span className="bg-blue-100">Rahul Kumar Sharma</span>
                                <strong>Premium Paid:</strong>
                                <span className="bg-blue-100">₹ 30,000.00</span>
                                <strong>Date of Issuance:</strong>
                                <span className="bg-blue-100">15/05/2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: Verification Controls */}
                <div className="w-full lg:w-[400px] bg-[#0D1928] flex flex-col">
                    <div className="p-6 border-b border-[#1A2A3A]">
                        <h3 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-4">
                            Verification Checklist
                        </h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-white mb-1">Amount matches declared</p>
                                    <p className="text-base font-semibold text-[#00E5A0]">₹30,000</p>
                                </div>
                                <CheckCircle2 size={20} className="text-[#00E5A0]" aria-hidden="true" />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-white mb-1">Valid for FY 24-25</p>
                                    <p className="text-base font-semibold text-[#00E5A0]">15-May-2024</p>
                                </div>
                                <CheckCircle2 size={20} className="text-[#00E5A0]" aria-hidden="true" />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-white mb-1">Name matches employee</p>
                                    <p className="text-base font-semibold text-white">Rahul Kumar Sharma</p>
                                </div>
                                <AlertTriangle size={20} className="text-[#FFB800]" aria-hidden="true" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 flex-1">
                        <div className="mb-5">
                            <label htmlFor="approved-amount" className="block text-sm text-[#8899AA] mb-2">
                                Approved Amount (₹)
                            </label>
                            <input
                                id="approved-amount"
                                type="text"
                                defaultValue="30,000"
                                readOnly
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm px-3 outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="hr-remarks" className="block text-sm text-[#8899AA] mb-2">
                                HR Remarks (Optional/Required for rejection)
                            </label>
                            <textarea
                                id="hr-remarks"
                                placeholder="Add a note to employee..."
                                className="w-full h-20 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm p-3 outline-none resize-none focus:border-[#00E5A0]"
                            />
                        </div>
                    </div>

                    <div className="p-6 border-t border-[#1A2A3A] bg-[#0A1420] flex gap-4">
                        <Button variant="danger" className="flex-1 w-full" icon={<X size={16} />} href="/tax/proof-review">
                            Reject
                        </Button>
                        <Button className="flex-1 w-full" icon={<Check size={16} />} href="/tax/proof-review">
                            Approve
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}
