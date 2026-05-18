"use client";

import { Info, Save, Settings } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function SandwichRulesPage() {
    return (
        <Page
            title="Sandwich Leave Rules"
            subtitle="Configure how leaves bounding weekends or public holidays are calculated"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Settings" },
                { label: "Sandwich Rules" },
            ]}
            maxWidth="900px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>
                    Save Rules
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Info block */}
                <div
                    role="note"
                    className="flex items-start gap-3 rounded-xl border border-[#0066FF]/30 bg-[#0066FF]/10 p-4 text-sm text-[#8899AA]"
                >
                    <Info size={20} className="mt-0.5 shrink-0 text-[#0066FF]" aria-hidden="true" />
                    <p>
                        A <strong className="text-white">Sandwich Leave</strong> occurs when an employee takes leave on days
                        immediately preceding and succeeding a holiday or week-off (e.g., Friday and Monday). Based on these
                        conditions, the intervening holidays may also be counted as leaves.
                    </p>
                </div>

                {/* Scenario 1 */}
                <Card padding="lg">
                    <CardHeader className="border-b border-[#1A2A3A] pb-4">
                        <CardTitle>Scenario 1: Friday &amp; Monday (Surrounding a Weekend)</CardTitle>
                    </CardHeader>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="w-2/3">
                            <p className="text-sm text-[#8899AA]">
                                If an employee takes leave on Friday <strong className="text-white">and</strong> Monday, should
                                Saturday and Sunday be deducted from their leave balance?
                            </p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center gap-3">
                            <input type="checkbox" className="peer sr-only" defaultChecked aria-label="Deduct weekend for Friday and Monday sandwich" />
                            <div className="peer h-7 w-14 rounded-full bg-[#1A2A3A] after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#FF4444] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
                            <span className="w-16 font-bold text-sm text-white">Deduct</span>
                        </label>
                    </div>
                </Card>

                {/* Scenario 2 */}
                <Card padding="lg">
                    <CardHeader className="border-b border-[#1A2A3A] pb-4">
                        <CardTitle>Scenario 2: Single Side Adjacency</CardTitle>
                    </CardHeader>
                    <div className="mt-4 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="w-2/3">
                                <h3 className="text-sm font-bold text-white">Leave preceding holiday (e.g., Friday only)</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">Deduct the weekend if they only took Friday off.</p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" className="peer sr-only" aria-label="Deduct weekend for Friday only" />
                                <div className="peer h-6 w-11 rounded-full bg-[#1A2A3A] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#FF4444] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="w-2/3">
                                <h3 className="text-sm font-bold text-white">Leave succeeding holiday (e.g., Monday only)</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">Deduct the weekend if they only took Monday off.</p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" className="peer sr-only" aria-label="Deduct weekend for Monday only" />
                                <div className="peer h-6 w-11 rounded-full bg-[#1A2A3A] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#FF4444] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
                            </label>
                        </div>
                    </div>
                </Card>

                {/* Applicable leave types */}
                <Card padding="lg">
                    <CardHeader className="mb-2">
                        <CardTitle className="flex items-center gap-2">
                            <Settings size={16} className="text-[#00E5A0]" aria-hidden="true" />
                            Applicable Leave Types
                        </CardTitle>
                    </CardHeader>
                    <p className="mb-4 text-xs text-[#8899AA]">Select which leave types trigger the Sandwich rule.</p>
                    <fieldset>
                        <legend className="sr-only">Leave types for sandwich rule</legend>
                        <div className="flex flex-wrap gap-4 text-sm font-bold">
                            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#2A3A4A] bg-[#060B14] p-3 transition-colors hover:border-[#0066FF]">
                                <input type="checkbox" defaultChecked className="accent-[#0066FF]" />
                                <span className="text-white">Casual Leave (CL)</span>
                            </label>
                            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#2A3A4A] bg-[#060B14] p-3 transition-colors hover:border-[#0066FF]">
                                <input type="checkbox" defaultChecked className="accent-[#0066FF]" />
                                <span className="text-white">Privilege Leave (EL)</span>
                            </label>
                            <label className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-[#2A3A4A] bg-[#060B14] p-3 opacity-50">
                                <input type="checkbox" disabled className="accent-[#0066FF]" />
                                <span className="text-[#8899AA]">Sick Leave (Exempt)</span>
                            </label>
                        </div>
                    </fieldset>
                </Card>
            </div>
        </Page>
    );
}
