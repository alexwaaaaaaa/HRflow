"use client";

import React, { useState } from "react";
import { AlertTriangle, ArrowRightLeft } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function RegimeSwitch() {
    const [opted, setOpted] = useState("OLD");

    return (
        <Page
            title="Switch Tax Regime"
            subtitle="Rahul Sharma (EMP-0848)"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "Switch Regime" },
            ]}
            maxWidth="800px"
        >
            <div className="space-y-6">
                <Card padding="lg">
                    {/* Current vs Target */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex-1 text-center">
                            <p className="text-xs text-[#8899AA] uppercase font-semibold tracking-wider mb-2">Current Regime</p>
                            <div
                                className={`text-xl font-bold py-3 rounded-lg border border-[#1A2A3A] ${
                                    opted === "OLD" ? "text-[#0066FF]" : "text-[#00E5A0]"
                                }`}
                            >
                                {opted === "OLD" ? "Old Tax Regime" : "New Tax Regime"}
                            </div>
                        </div>

                        <div className="px-6">
                            <ArrowRightLeft size={32} className="text-[#445566]" aria-hidden="true" />
                        </div>

                        <div className="flex-1 text-center">
                            <p className="text-xs text-[#8899AA] uppercase font-semibold tracking-wider mb-2">Target Regime</p>
                            <div
                                className={`text-xl font-bold py-3 rounded-lg border border-dashed border-[#445566] ${
                                    opted === "OLD" ? "text-[#00E5A0]" : "text-[#0066FF]"
                                }`}
                            >
                                {opted === "OLD" ? "New Tax Regime" : "Old Tax Regime"}
                            </div>
                        </div>
                    </div>

                    {/* Warning */}
                    <Card variant="bare" className="bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-xl p-4 flex gap-4 mb-8">
                        <AlertTriangle size={24} className="text-[#FFB800] shrink-0" aria-hidden="true" />
                        <p className="text-sm text-white leading-relaxed">
                            <strong>Important:</strong> Switching regimes mid-year may result in a significant spike in your monthly
                            TDS deductions to cover any shortfall from previous months. Previously considered 80C/80D deductions
                            will become null and void if you switch to the New Regime.
                        </p>
                    </Card>

                    {/* Confirmation */}
                    <label className="flex items-center gap-3 cursor-pointer mb-8">
                        <input type="checkbox" id="confirm-switch" className="w-5 h-5 accent-[#0066FF]" />
                        <span className="text-sm text-[#8899AA] select-none">
                            I understand the implications and wish to proceed with the change.
                        </span>
                    </label>

                    <div className="border-t border-[#1A2A3A] pt-6 flex justify-end">
                        <Button onClick={() => setOpted(opted === "OLD" ? "NEW" : "OLD")}>
                            Confirm Switch to {opted === "OLD" ? "New Regime" : "Old Regime"}
                        </Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
