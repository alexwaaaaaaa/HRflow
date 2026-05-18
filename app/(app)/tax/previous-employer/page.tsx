"use client";

import React from "react";
import { Save, Info, ArrowUpCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function PreviousEmployerIncome() {
    return (
        <Page
            title="Form 12B (Previous Employer)"
            subtitle="Declare income earned and TDS deducted by previous employers in FY 2024-25"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "Previous Employer" },
            ]}
            maxWidth="900px"
        >
            <div className="space-y-6">
                <Card padding="md" className="border border-[#0066FF]/20 bg-[#0066FF]/5 flex items-start gap-3">
                    <Info size={20} className="text-[#0066FF] shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-[#8899AA] leading-relaxed">
                        If you joined Kaarya after 1st April 2024, you must declare your previous salary details using Form 12B.
                        This ensures accurate TDS computation and prevents under-deduction of tax for the current financial year.
                        Failure to do so will result in tax liability and penalty during personal ITR filing.
                    </p>
                </Card>

                <Card padding="lg">
                    <h3 className="text-base font-semibold text-white mb-5">Previous Employment Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        <div className="md:col-span-2">
                            <label htmlFor="company-name" className="block text-sm text-[#8899AA] mb-2">
                                Company Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                id="company-name"
                                type="text"
                                placeholder="e.g. Infosys Limited"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm px-4 outline-none focus:border-[#00E5A0]"
                            />
                        </div>
                        <div>
                            <label htmlFor="company-tan" className="block text-sm text-[#8899AA] mb-2">
                                Company TAN
                            </label>
                            <input
                                id="company-tan"
                                type="text"
                                placeholder="BLRI12345F"
                                maxLength={10}
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm px-4 outline-none focus:border-[#00E5A0] uppercase"
                            />
                        </div>
                        <div>
                            <label htmlFor="employer-pan" className="block text-sm text-[#8899AA] mb-2">
                                PAN of Previous Employer
                            </label>
                            <input
                                id="employer-pan"
                                type="text"
                                placeholder="ABCDE1234F"
                                maxLength={10}
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm px-4 outline-none focus:border-[#00E5A0] uppercase"
                            />
                        </div>
                    </div>

                    <div className="border-t border-dashed border-[#1A2A3A] my-6" />

                    <h3 className="text-base font-semibold text-white mb-5">Income &amp; Tax Profile</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                        {[
                            { id: "gross-salary", label: "Total Gross Salary Paid", required: true },
                            { id: "tds-deducted", label: "TDS Deducted", required: true },
                            { id: "prof-tax", label: "Professional Tax Paid", required: false },
                            { id: "epf-deducted", label: "Provident Fund (EPF) Deducted", required: false },
                        ].map((field) => (
                            <div key={field.id}>
                                <label htmlFor={field.id} className="block text-sm text-[#8899AA] mb-2">
                                    {field.label} {field.required && <span className="text-red-400">*</span>}
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                    <input
                                        id={field.id}
                                        type="text"
                                        placeholder="0"
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-8 pr-4 outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <label
                        htmlFor="prev-form16-upload"
                        className="flex flex-col items-center gap-3 p-4 bg-[#060B14] border border-dashed border-[#1A2A3A] rounded-lg cursor-pointer hover:border-[#0066FF] transition-colors mb-6"
                    >
                        <ArrowUpCircle size={24} className="text-[#0066FF]" aria-hidden="true" />
                        <div className="text-sm text-white font-medium">
                            Upload Previous Employer Form 16 or F&amp;F Statement
                        </div>
                        <div className="text-xs text-[#8899AA]">PDF, PNG, JPG up to 5MB</div>
                        <input id="prev-form16-upload" type="file" accept=".pdf,.png,.jpg,.jpeg" className="sr-only" />
                    </label>

                    <div className="border-t border-[#1A2A3A] pt-6 flex justify-end gap-4">
                        <Button variant="ghost">Cancel</Button>
                        <Button icon={<Save size={16} />}>Save Form 12B</Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
