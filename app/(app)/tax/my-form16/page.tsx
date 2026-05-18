"use client";

import React from "react";
import { Download, FileText, Lock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function EmployeeForm16() {
    return (
        <Page
            title="My Form 16"
            subtitle="Download your digitally signed TDS certificates"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "My Form 16" },
            ]}
            maxWidth="900px"
            actions={
                <select
                    aria-label="Select financial year"
                    className="bg-[#0D1928] border border-[#1A2A3A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00E5A0]"
                >
                    <option>FY 2024-25</option>
                    <option>FY 2023-24</option>
                </select>
            }
        >
            <div className="space-y-6">
                {/* Password Info */}
                <Card padding="md" className="border border-[#0066FF]/20 bg-[#0066FF]/5 flex items-start gap-4">
                    <Lock size={20} className="text-[#0066FF] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="text-sm text-[#8899AA] leading-relaxed">
                        Your downloaded Form 16 PDF is password protected.{" "}
                        <strong className="text-white">Password:</strong> Your PAN Number in CAPITAL LETTERS followed by Date of
                        Birth in DDMMYYYY format.{" "}
                        <br />
                        Example: If PAN is ABCDE1234F and DOB is 15-May-1990, password is{" "}
                        <strong className="text-white">ABCDE1234F15051990</strong>.
                    </div>
                </Card>

                {/* Current Year */}
                <Card padding="lg" className="flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 bg-[#00E5A0]/10 rounded-xl flex items-center justify-center">
                            <FileText size={24} className="text-[#00E5A0]" aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-white mb-1">Form 16 (Part A &amp; B)</h3>
                            <p className="text-sm text-[#8899AA]">Financial Year 2024-25 (Assessment Year 2025-26)</p>
                            <p className="text-xs text-[#00E5A0] mt-1">Generated on 15 May 2025</p>
                        </div>
                    </div>
                    <Button icon={<Download size={16} />}>Download PDF</Button>
                </Card>

                {/* Archive */}
                <h3 className="text-lg font-semibold text-white mt-4">Archive</h3>

                {[
                    { fy: "FY 2023-24", ay: "Assessment Year 2024-25" },
                    { fy: "FY 2022-23", ay: "Assessment Year 2023-24" },
                ].map((item) => (
                    <Card key={item.fy} padding="md" className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 bg-[#1A2A3A] rounded-lg flex items-center justify-center">
                                <FileText size={20} className="text-[#8899AA]" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Form 16 ({item.fy})</p>
                                <p className="text-xs text-[#8899AA]">{item.ay}</p>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" icon={<Download size={14} />}>
                            PDF
                        </Button>
                    </Card>
                ))}
            </div>
        </Page>
    );
}
