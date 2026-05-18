"use client";

import React from "react";
import { CheckCircle2, FileText, CreditCard, Users, ExternalLink, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Form24QQuarterDetail({ params }: { params: { quarter: string } }) {
    const qStr = params.quarter.toUpperCase();

    const isFiled = qStr === "Q1";
    const isQ4 = qStr === "Q4";

    return (
        <Page
            title={`Form 24Q - ${qStr} (FY 2024-25)`}
            subtitle={isFiled ? "Filed Successfully" : "Pending Generation"}
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Form 24Q", href: "/tax/form24q" },
                { label: qStr },
            ]}
            maxWidth="1000px"
            actions={
                !isFiled ? (
                    <Button icon={<FileText size={16} />}>Generate TXT for FVU Utility</Button>
                ) : (
                    <Button variant="secondary" icon={<Download size={16} />}>Download Filed TXT</Button>
                )
            }
        >
            <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card padding="lg">
                        <h4 className="text-sm text-[#8899AA] mb-2 flex items-center gap-2">
                            <CreditCard size={16} aria-hidden="true" /> Challan Count
                        </h4>
                        <div className="text-3xl font-bold text-white">12</div>
                        <div className="text-xs text-[#00E5A0] mt-1">All fully mapped</div>
                    </Card>
                    <Card padding="lg">
                        <h4 className="text-sm text-[#8899AA] mb-2 flex items-center gap-2">
                            <Users size={16} aria-hidden="true" /> Total Deductees
                        </h4>
                        <div className="text-3xl font-bold text-white">345</div>
                    </Card>
                    <Card padding="lg">
                        <h4 className="text-sm text-[#8899AA] mb-2">Total TDS Deposited</h4>
                        <div className="text-3xl font-bold text-white">₹14,50,000</div>
                    </Card>
                </div>

                {/* Q4 Annexure II */}
                {isQ4 && (
                    <Card padding="lg" className="border border-[#FFB800]/20 bg-[#FFB800]/5">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-semibold text-[#FFB800] mb-2">Annexure II Required</h3>
                                <p className="text-sm text-[#FFB800] max-w-xl leading-relaxed">
                                    Q4 return includes Annexure II, which requires the complete salary breakdown, exemptions,
                                    deductions under Chapter VI-A, and final tax calculations for the entire FY for all employees.
                                    Ensure all proofs are verified before generation.
                                </p>
                            </div>
                            <Button variant="secondary" size="sm" href="/tax/proof-review">Review Final Proofs</Button>
                        </div>
                    </Card>
                )}

                {/* Pre-flight Validations */}
                {!isFiled && (
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-5">Pre-flight Validations</h3>
                        <div className="space-y-3">
                            {[
                                { label: "Valid Company TAN & PAN", pass: true },
                                { label: "Responsible Person Details Updated", pass: true },
                                { label: "No negative TDS/Salary entries", pass: true },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-3">
                                    <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                    <span className="text-sm text-white">{item.label}</span>
                                </div>
                            ))}
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-[#FFB800] flex items-center justify-center" aria-hidden="true">
                                    <span className="text-[#060B14] text-[10px] font-bold">!</span>
                                </div>
                                <span className="text-sm text-[#FFB800]">3 Deductees missing valid PAN</span>
                                <Button variant="ghost" size="sm" className="ml-auto">View List</Button>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Footer */}
                <p className="text-sm text-[#8899AA] text-center">
                    To file the TXT output, use the official NSDL e-Gov FVU Utility.{" "}
                    <a
                        href="https://www.tin-nsdl.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0066FF] hover:underline inline-flex items-center gap-1"
                    >
                        Download latest FVU version from TIN-NSDL <ExternalLink size={12} aria-hidden="true" />
                    </a>
                </p>
            </div>
        </Page>
    );
}
