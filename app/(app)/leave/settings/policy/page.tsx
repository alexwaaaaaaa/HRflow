"use client";

import { AlertTriangle, Clock, Save, Settings } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeavePolicyPage() {
    return (
        <Page
            title="Global Leave Policies"
            subtitle="Configure high-level constraints and compliance rules for leave management"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Settings", href: "/leave/settings/types" },
                { label: "Policy" },
            ]}
            maxWidth="900px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>
                    Save Configuration
                </Button>
            }
        >
            <div className="space-y-6">
                {/* General constraints */}
                <Card padding="lg">
                    <CardHeader className="border-b border-[#1A2A3A] pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Settings size={18} className="text-[#00E5A0]" aria-hidden="true" />
                            General Constraints
                        </CardTitle>
                    </CardHeader>

                    <div className="mt-6 space-y-6 text-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-white">Max Consecutive Leaves</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">
                                    Maximum days an employee can apply continuously before HR override is required.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    defaultValue={15}
                                    aria-label="Max consecutive leaves in days"
                                    className="w-20 rounded border border-[#2A3A4A] bg-[#060B14] p-2.5 text-center font-bold text-white outline-none focus:border-[#0066FF]"
                                />
                                <span className="font-bold text-[#556677]">days</span>
                            </div>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        <div className="flex items-center justify-between">
                            <div className="pr-10">
                                <h3 className="font-bold text-white">Joining Proration</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">
                                    Prorate leaves based on date of joining for mid-year hires.
                                </p>
                            </div>
                            <div
                                role="group"
                                aria-label="Joining proration toggle"
                                className="flex items-center gap-1 rounded-lg border border-[#2A3A4A] bg-[#060B14] p-1"
                            >
                                {/* raw-button: toggle inside role=group, not a standalone action */}
                                <button type="button" className="rounded bg-[#1A2A3A] px-4 py-1.5 text-xs font-bold text-white" aria-pressed="true">Enabled</button>
                                {/* raw-button: toggle inside role=group, not a standalone action */}
                                <button type="button" className="px-4 py-1.5 text-xs font-bold text-[#8899AA] transition-colors hover:text-white" aria-pressed="false">Disabled</button>
                            </div>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        <div className="flex items-center justify-between">
                            <div className="pr-10">
                                <h3 className="font-bold text-white">Notice Period Restrictions</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">
                                    Block leave applications during the employee&apos;s resignation notice period.
                                </p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" className="peer sr-only" defaultChecked aria-label="Enable notice period restrictions" />
                                <div className="peer h-6 w-11 rounded-full bg-[#1A2A3A] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#FF4444] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
                            </label>
                        </div>
                    </div>
                </Card>

                {/* Timelines & escalations */}
                <Card padding="lg">
                    <CardHeader className="border-b border-[#1A2A3A] pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Clock size={18} className="text-[#0066FF]" aria-hidden="true" />
                            Timelines &amp; Escalations
                        </CardTitle>
                    </CardHeader>

                    <div className="mt-6 space-y-6 text-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-white">Advance Notice Required</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">
                                    Minimum days required before applying for planned long leaves (&gt;3 days).
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    defaultValue={7}
                                    aria-label="Advance notice required in days"
                                    className="w-20 rounded border border-[#2A3A4A] bg-[#060B14] p-2.5 text-center font-bold text-white outline-none focus:border-[#0066FF]"
                                />
                                <span className="font-bold text-[#556677]">days</span>
                            </div>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-white">Auto-Approve L1 Manager</h3>
                                <p className="mt-1 text-xs text-[#8899AA]">
                                    Auto-approve leave requests if the manager does not respond within X days.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input type="checkbox" className="peer sr-only" aria-label="Enable auto-approve" />
                                    <div className="peer h-6 w-11 rounded-full bg-[#1A2A3A] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#00E5A0] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
                                </label>
                                <span className="px-2 text-[#8899AA]">|</span>
                                <input
                                    type="number"
                                    defaultValue={2}
                                    disabled
                                    aria-label="Auto-approve after days"
                                    className="w-16 cursor-not-allowed rounded border border-[#2A3A4A] bg-[#1A2A3A] p-2 text-center font-bold text-[#556677] outline-none"
                                />
                                <span className="font-bold text-[#556677]">days</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Medical certificate */}
                <Card padding="lg" variant="elevated">
                    <div className="flex items-start gap-4">
                        <div className="rounded-lg border border-[#FFB800]/20 bg-[#FFB800]/10 p-3">
                            <AlertTriangle size={20} className="text-[#FFB800]" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-1 text-base font-bold text-white">Medical Certificate Settings</h3>
                            <p className="mb-4 text-sm text-[#8899AA]">Mandate document uploads for extended sick leaves.</p>
                            <div className="flex items-center gap-3 rounded-lg border border-[#1A2A3A] bg-[#060B14] p-1">
                                <span className="px-4 text-sm font-bold text-[#8899AA]">Require MC if Sick Leave exceeds</span>
                                <input
                                    type="number"
                                    defaultValue={2}
                                    aria-label="Sick leave days threshold for medical certificate"
                                    className="w-12 rounded bg-[#1A2A3A] py-1.5 text-center font-bold text-white outline-none"
                                />
                                <span className="px-4 text-sm font-bold text-[#8899AA]">days</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
