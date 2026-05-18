"use client";

import React, { useState } from "react";
import { Zap, CheckCircle2, FileText } from "lucide-react";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";

export default function OCRPreview() {
    const [_status] = useState<"uploading" | "scanning" | "done">("done");

    return (
        <Page
            title="LIC Premium Proof"
            subtitle="Section 80C • Declared: ₹30,000"
            breadcrumbs={[
                { label: "Tax", href: "/tax/proof-upload/EMP-0848" },
                { label: "OCR Preview" },
            ]}
            maxWidth="1400px"
            fullBleed
        >
            <div className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-200px)] min-h-[600px]">
                {/* Left side: Document Preview */}
                <div className="flex-1 bg-[#060B14] border-r border-[#1A2A3A] flex flex-col">
                    <div className="px-6 py-3 flex justify-between items-center border-b border-[#1A2A3A]">
                        <div className="flex items-center gap-2 text-sm text-white">
                            <FileText size={16} className="text-[#0066FF]" aria-hidden="true" />
                            lic_premium_receipt.pdf
                        </div>
                        <Button variant="ghost" size="sm">Change File</Button>
                    </div>
                    <div className="flex-1 p-8 flex justify-center overflow-auto">
                        {/* Fake Document Mockup */}
                        <div className="w-[600px] h-[800px] bg-white rounded shadow-lg p-12 text-black font-serif relative">
                            {/* OCR Highlight overlays */}
                            <div className="absolute top-[116px] left-[44px] right-[44px] h-7 bg-[#00E5A0]/20 border border-[#00E5A0] rounded" aria-hidden="true" />
                            <div className="absolute top-[196px] left-[244px] w-[150px] h-7 bg-[#00E5A0]/20 border border-[#00E5A0] rounded" aria-hidden="true" />
                            <div className="absolute top-[316px] left-[244px] w-[120px] h-7 bg-[#00E5A0]/20 border border-[#00E5A0] rounded" aria-hidden="true" />

                            <h2 className="text-center mb-10 text-2xl">Life Insurance Corporation of India</h2>
                            <h3 className="text-center mb-8 underline text-base">RENEWAL PREMIUM RECEIPT</h3>

                            <div className="grid grid-cols-[200px_1fr] gap-4 text-sm">
                                <strong>Policy Holder:</strong> <span>Rahul Kumar Sharma</span>
                                <strong>Policy Number:</strong> <span>887766554</span>
                                <strong>Date of Issuance:</strong> <span>15/05/2024</span>
                                <strong>Plan Details:</strong> <span>Jeevan Anand (149)</span>
                                <strong>Premium Paid:</strong> <span>₹ 30,000.00</span>
                                <strong>Mode of Payment:</strong> <span>Yearly</span>
                            </div>

                            <div className="absolute bottom-12 right-12 text-right">
                                <div className="mb-1">Authorized Signatory</div>
                                <div className="text-[#0066FF] italic font-bold text-xl">LIC India</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: OCR Extraction */}
                <div className="w-full lg:w-[400px] bg-[#0D1928] flex flex-col">
                    <div className="p-6 border-b border-[#1A2A3A]">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-full bg-[#00E5A0]/10 flex items-center justify-center">
                                <Zap size={16} className="text-[#00E5A0]" aria-hidden="true" />
                            </div>
                            <h3 className="text-base font-semibold text-white">HRFlow AI Scanner</h3>
                        </div>
                        <p className="text-sm text-[#8899AA] leading-relaxed">
                            We have auto-extracted the details from your document. Please verify them before submitting.
                        </p>
                    </div>

                    <div className="p-6 flex-1 overflow-auto flex flex-col gap-5">
                        <div>
                            <label htmlFor="provider-name" className="block text-sm text-[#8899AA] mb-1.5">
                                Provider / Entity Name
                            </label>
                            <input
                                id="provider-name"
                                type="text"
                                defaultValue="Life Insurance Corporation of India"
                                readOnly
                                className="w-full h-10 bg-[#060B14] border border-[#00E5A0] rounded-lg text-white text-sm px-3 outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="amount-paid" className="block text-sm text-[#8899AA] mb-1.5">
                                Amount Paid
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    id="amount-paid"
                                    type="text"
                                    defaultValue="30,000"
                                    readOnly
                                    className="flex-1 h-10 bg-[#060B14] border border-[#00E5A0] rounded-lg text-white text-sm px-3 outline-none"
                                />
                                <div className="text-xs text-[#00E5A0] flex items-center gap-1 whitespace-nowrap">
                                    <CheckCircle2 size={14} aria-hidden="true" /> Matches declaration
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="payment-date" className="block text-sm text-[#8899AA] mb-1.5">
                                Date of Payment
                            </label>
                            <input
                                id="payment-date"
                                type="text"
                                defaultValue="15-May-2024"
                                readOnly
                                className="w-full h-10 bg-[#060B14] border border-[#00E5A0] rounded-lg text-white text-sm px-3 outline-none"
                            />
                            <p className="text-xs text-[#8899AA] mt-1">Falls within FY 2024-25</p>
                        </div>

                        <div>
                            <label htmlFor="policy-ref" className="block text-sm text-[#8899AA] mb-1.5">
                                Policy / Ref Number
                            </label>
                            <input
                                id="policy-ref"
                                type="text"
                                defaultValue="887766554"
                                readOnly
                                className="w-full h-10 bg-[#060B14] border border-[#00E5A0] rounded-lg text-white text-sm px-3 outline-none"
                            />
                        </div>
                    </div>

                    <div className="p-6 border-t border-[#1A2A3A] bg-[#0A1420] space-y-2">
                        <Button className="w-full" href="/tax/proof-upload/EMP-0848">Confirm &amp; Submit Proof</Button>
                        <Button variant="ghost" className="w-full">Edit Details Manually</Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}
