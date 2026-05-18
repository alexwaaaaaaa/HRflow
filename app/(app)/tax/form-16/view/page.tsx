"use client";

import React, { useState } from "react";
import {
    FileText,
    Download,
    CheckCircle2,
    FileCheck,
    Share2,
    Lock,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function Form16EmployeeView() {
    const [acknowledged, setAcknowledged] = useState(false);

    return (
        <Page
            title="My Form 16"
            subtitle="Download your Annual TDS Certificate (Form 16) for tax filing."
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "My Form 16" },
            ]}
            maxWidth="1000px"
            actions={
                <select
                    aria-label="Select financial year"
                    className="bg-[#0D1928] border border-[#1A2A3A] text-white rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00E5A0]"
                >
                    <option>2024-25</option>
                    <option>2023-24</option>
                    <option>2022-23</option>
                </select>
            }
        >
            <div className="space-y-6">
                {/* Main Card */}
                <Card padding="none">
                    {/* Status Banner */}
                    <div className="bg-[#00E5A0]/10 border-b border-[#00E5A0]/20 px-6 py-4 flex items-start space-x-3">
                        <CheckCircle2 size={24} className="text-[#00E5A0] mt-0.5" aria-hidden="true" />
                        <div>
                            <h3 className="text-base font-bold text-[#00E5A0]">Form 16 is Ready to Download</h3>
                            <p className="text-sm text-[#8899AA] mt-1">
                                Your Form 16 for FY 2024-25 has been successfully generated and digitally signed by the company.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Summary Details */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-3">TDS Summary</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                        <span className="text-sm text-[#c8d8e8]">Gross Salary Paid</span>
                                        <span className="text-sm font-bold text-white">₹14,50,000</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                        <span className="text-sm text-[#c8d8e8]">Net Taxable Income</span>
                                        <span className="text-sm font-bold text-white">₹11,00,000</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-[#1A2A3A]">
                                        <span className="text-sm text-[#c8d8e8]">Total Tax Deducted</span>
                                        <span className="text-sm font-bold text-[#00E5A0]">₹1,25,000</span>
                                    </div>
                                </div>
                            </div>

                            <Card variant="bare" className="bg-[#1A2A3A]/50 p-4 rounded-lg border border-[#2A3A4A] flex items-start space-x-3">
                                <Lock size={18} className="text-[#8899AA] mt-0.5" aria-hidden="true" />
                                <div>
                                    <h4 className="text-sm font-bold text-white">Password Protected</h4>
                                    <p className="text-xs text-[#8899AA] mt-1">
                                        The downloaded PDF is password protected. The password is your PAN mapped in lowercase (e.g.{" "}
                                        <strong>aaapz1234a</strong>).
                                    </p>
                                </div>
                            </Card>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <h4 className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-3">Download Options</h4>

                            <button
                                type="button"
                                className="w-full flex items-center justify-between p-4 bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl hover:bg-[#2A3A4A] transition-colors group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-[#060B14] rounded-lg flex items-center justify-center text-red-400">
                                        <FileText size={20} aria-hidden="true" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white">Combined Form 16 PDF</div>
                                        <div className="text-xs text-[#8899AA] mt-0.5">Part A + Part B (4 Pages)</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Badge variant="success" className="hidden group-hover:inline-flex">Recommended</Badge>
                                    <Download size={20} className="text-[#00E5A0]" aria-hidden="true" />
                                </div>
                            </button>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    className="flex-1 flex items-center justify-between p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-[#2A3A4A] transition-colors"
                                >
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white">Part A Only</div>
                                        <div className="text-[10px] text-[#8899AA] mt-0.5">TRACES Gen.</div>
                                    </div>
                                    <Download size={16} className="text-[#8899AA]" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 flex items-center justify-between p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-[#2A3A4A] transition-colors"
                                >
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white">Part B Only</div>
                                        <div className="text-[10px] text-[#8899AA] mt-0.5">Annexure</div>
                                    </div>
                                    <Download size={16} className="text-[#8899AA]" aria-hidden="true" />
                                </button>
                            </div>

                            <Button variant="secondary" className="w-full" icon={<Share2 size={16} />}>
                                Share securely with CA
                            </Button>
                        </div>
                    </div>

                    {/* Acknowledgment Strip */}
                    <div className={`p-4 border-t border-[#1A2A3A] transition-colors ${acknowledged ? "bg-[#00E5A0]/5" : "bg-[#0A1420]"}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start space-x-3">
                                <FileCheck
                                    size={20}
                                    className={acknowledged ? "text-[#00E5A0]" : "text-[#8899AA]"}
                                    aria-hidden="true"
                                />
                                <div>
                                    <div className="text-sm font-bold text-white">Acknowledge Receipt</div>
                                    <div className="text-xs text-[#8899AA] max-w-xl">
                                        By confirming, you acknowledge that you have received your Form 16 from the company for the
                                        relevant financial year.
                                    </div>
                                </div>
                            </div>
                            {acknowledged ? (
                                <div className="px-4 py-2 border border-[#00E5A0]/30 text-[#00E5A0] font-bold text-sm rounded-lg bg-[#00E5A0]/10 flex items-center gap-2">
                                    <CheckCircle2 size={16} aria-hidden="true" /> Acknowledged on 15 May, 2025
                                </div>
                            ) : (
                                <Button variant="secondary" onClick={() => setAcknowledged(true)}>
                                    Confirm Receipt
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
