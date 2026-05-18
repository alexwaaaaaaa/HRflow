"use client";

import { AlertTriangle, ArrowRightCircle, DollarSign, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function CarryForwardPage() {
    return (
        <Page
            title="Carry Forward & Lapse Rules"
            subtitle="Configure what happens to unused leave balances at year-end"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Settings" },
                { label: "Carry Forward" },
            ]}
            maxWidth="900px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>
                    Save Rules
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Privilege Leave (EL) */}
                <Card padding="none">
                    <CardHeader className="border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                        <CardTitle>Privilege / Earned Leave (EL)</CardTitle>
                        <Badge variant="success">Yearly Reset</Badge>
                    </CardHeader>
                    <div className="space-y-6 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-white">Maximum Carry Forward Limit</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">
                                    Maximum unused EL days that can be carried to the next calendar year.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    defaultValue={45}
                                    aria-label="Maximum carry forward days for EL"
                                    className="w-20 rounded border border-[#2A3A4A] bg-[#060B14] p-2.5 text-center font-bold text-white outline-none focus:border-[#0066FF]"
                                />
                                <span className="text-sm font-bold text-[#556677]">days total</span>
                            </div>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        <div>
                            <h3 className="mb-1 flex items-center gap-1 text-sm font-bold text-white">
                                Year-end Auto Encashment
                                <DollarSign size={14} className="text-[#00E5A0]" aria-hidden="true" />
                            </h3>
                            <p className="mb-3 max-w-lg text-xs text-[#8899AA]">
                                If balance exceeds the carry forward limit, unutilized leaves will be automatically encashed instead of lapsing.
                            </p>
                            <label className="inline-flex cursor-pointer items-center gap-3">
                                <div className="relative">
                                    <input type="checkbox" className="peer sr-only" defaultChecked aria-label="Enable auto encashment" />
                                    <div className="peer h-6 w-11 rounded-full bg-[#1A2A3A] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#00E5A0] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
                                </div>
                                <span className="text-sm font-bold text-white">Enable Auto Encashment</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4">
                            <span className="text-sm font-bold text-[#8899AA]">Encashment Formula Base:</span>
                            <select
                                aria-label="Encashment formula base"
                                className="w-48 rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] p-2 text-center text-sm font-bold text-white outline-none"
                            >
                                <option>Basic Salary</option>
                                <option>Gross Salary</option>
                                <option>Fixed Amount (/day)</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Sick Leave (SL) */}
                <Card padding="none">
                    <CardHeader className="border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                        <CardTitle className="text-[#8899AA]">Sick Leave (SL)</CardTitle>
                    </CardHeader>
                    <div className="p-6">
                        <div className="flex items-center gap-4 rounded-lg border border-[#FF4444]/20 bg-[#FF4444]/10 p-4">
                            <AlertTriangle size={24} className="shrink-0 text-[#FF4444]" aria-hidden="true" />
                            <div className="flex-1">
                                <h3 className="mb-1 text-sm font-bold text-white">Leaves Lapse at Year-end</h3>
                                <p className="text-xs text-[#8899AA]">
                                    Unused Sick Leaves cannot be carried forward or encashed. They will reset to 0 on Dec 31st.
                                </p>
                            </div>
                            <Button variant="danger" size="sm">Change Rule</Button>
                        </div>
                    </div>
                </Card>

                {/* Casual Leave (CL) */}
                <Card padding="none">
                    <CardHeader className="border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                        <CardTitle className="text-[#8899AA]">Casual Leave (CL)</CardTitle>
                    </CardHeader>
                    <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-white">Maximum Carry Forward Limit</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">Unused CL limits.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    defaultValue={5}
                                    aria-label="Maximum carry forward days for CL"
                                    className="w-20 rounded border border-[#2A3A4A] bg-[#060B14] p-2.5 text-center font-bold text-white outline-none focus:border-[#0066FF]"
                                />
                                <span className="text-sm font-bold text-[#556677]">days max</span>
                            </div>
                        </div>

                        <div className="rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4 text-xs text-[#8899AA]">
                            <ArrowRightCircle size={14} className="mr-2 inline text-[#FFB800]" aria-hidden="true" />
                            Any unused balance above the limit of 5 days will be lapsed.{" "}
                            <strong>No Encashment</strong>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
