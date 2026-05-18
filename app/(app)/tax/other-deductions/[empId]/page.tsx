"use client";

import React, { useState } from "react";
import { Info, Heart, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const OTHER_DEDUCTIONS = [
    {
        id: "80e",
        sec: "80E",
        name: "Higher Education Loan Interest",
        desc: "No upper limit on interest paid for 8 years",
        limit: "No Limit",
        iconColor: "text-[#0066FF]",
    },
    {
        id: "80g",
        sec: "80G",
        name: "Donations to Charitable Funds",
        desc: "Subject to qualifying limit & institution category",
        limit: "Varies",
        iconColor: "text-red-400",
    },
    {
        id: "80tta",
        sec: "80TTA",
        name: "Savings Bank Interest",
        desc: "For Non-Senior citizens",
        limit: "₹10,000",
        iconColor: "text-[#00E5A0]",
    },
    {
        id: "80u",
        sec: "80U",
        name: "Person with Disability",
        desc: "Self disability deduction",
        limit: "₹1,25,000",
        iconColor: "text-[#FFB800]",
    },
];

export default function OtherDeductions() {
    const [values, setValues] = useState<Record<string, string>>({
        "80tta": "8,500",
    });

    const totalDeductions = Object.values(values).reduce(
        (acc, curr) => acc + (parseInt(curr.replace(/,/g, "")) || 0),
        0
    );

    return (
        <Page
            title="Other Exemptions & Deductions"
            subtitle="Chapter VI-A sections apart from 80C, 80D, etc."
            breadcrumbs={[
                { label: "Tax", href: "/tax/declaration/EMP-0848" },
                { label: "Other Deductions" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                {/* Form Area */}
                <div className="flex flex-col gap-4">
                    {OTHER_DEDUCTIONS.map((item) => (
                        <Card key={item.id} padding="lg" className="flex gap-5">
                            <div className="w-11 h-11 rounded-xl bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center shrink-0">
                                {item.id === "80g" ? (
                                    <Heart size={20} className={item.iconColor} aria-hidden="true" />
                                ) : (
                                    <Info size={20} className={item.iconColor} aria-hidden="true" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-base font-semibold text-white mb-1">
                                            Section {item.sec} - {item.name}
                                        </h3>
                                        <p className="text-sm text-[#8899AA]">
                                            {item.desc} |{" "}
                                            <span className="text-[#00E5A0]">Max Limit: {item.limit}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="w-56 relative">
                                    <label htmlFor={`input-${item.id}`} className="sr-only">
                                        {item.name} amount
                                    </label>
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                    <input
                                        id={`input-${item.id}`}
                                        type="text"
                                        value={values[item.id] || ""}
                                        onChange={(e) => setValues({ ...values, [item.id]: e.target.value })}
                                        placeholder="0"
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-7 pr-3 outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Sticky Summary */}
                <div className="lg:sticky lg:top-6 lg:self-start">
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-5">Deduction Totals</h3>

                        <div className="flex flex-col gap-3 mb-6">
                            {OTHER_DEDUCTIONS.map((item) => {
                                const val = parseInt((values[item.id] || "0").replace(/,/g, "")) || 0;
                                if (val === 0) return null;
                                return (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-[#8899AA]">Sec {item.sec}</span>
                                        <span className="text-white font-medium">₹{val.toLocaleString()}</span>
                                    </div>
                                );
                            })}
                            {totalDeductions === 0 && (
                                <p className="text-sm text-[#8899AA] italic">No amounts declared yet.</p>
                            )}
                            <div className="border-t border-[#1A2A3A] pt-3 mt-1 flex justify-between items-center">
                                <span className="text-sm font-semibold text-white">Total Additional</span>
                                <span className="text-xl font-bold text-[#00E5A0]">₹{totalDeductions.toLocaleString()}</span>
                            </div>
                        </div>

                        <Button className="w-full" icon={<Save size={16} />}>
                            Save Declarations
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
