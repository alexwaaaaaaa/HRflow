"use client";

import { Lock, Unlock, ShieldAlert, Save } from "lucide-react";
import { useState } from "react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

export default function PayrollLockSettings() {
    const [isLocked, setIsLocked] = useState(true);

    const LOCK_IMPACTS = [
        "HR cannot edit CTC, Bank Details, or Statutory info for employees.",
        "Managers cannot approve past leaves that affect the current month's LOP.",
        "Employees cannot change tax declaration investments.",
    ] as const;

    return (
        <Page
            title="Payroll Lock Settings"
            subtitle="Control access to salary edits and attendance markings to prevent mismatch during processing."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Lock" },
            ]}
            maxWidth="800px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>Save State</Button>
            }
        >
            {/* Current State */}
            <Card padding="lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isLocked ? "bg-[#FFB800]/10" : "bg-[#00E5A0]/10"}`} aria-hidden="true">
                            {isLocked
                                ? <Lock size={22} className="text-[#FFB800]" />
                                : <Unlock size={22} className="text-[#00E5A0]" />
                            }
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">Current Cycle: Nov 2024</h2>
                            <p className={`text-sm font-medium ${isLocked ? "text-[#FFB800]" : "text-[#00E5A0]"}`}>
                                {isLocked ? "System is Locked for Processing" : "System is Open for Edits"}
                            </p>
                        </div>
                    </div>

                    <Button
                        variant={isLocked ? "outline" : "secondary"}
                        icon={isLocked ? <Unlock size={13} aria-hidden="true" /> : <Lock size={13} aria-hidden="true" />}
                        onClick={() => setIsLocked(!isLocked)}
                    >
                        {isLocked ? "Unlock System" : "Lock Now"}
                    </Button>
                </div>

                <div className="border-t border-[#1A2A3A] pt-6">
                    <h3 className="text-sm font-semibold text-white mb-4">When Payroll is Locked:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {LOCK_IMPACTS.map((impact) => (
                            <div key={impact} className="flex items-start gap-2">
                                <ShieldAlert size={14} className="text-[#FF4444] mt-0.5 shrink-0" aria-hidden="true" />
                                <p className="text-xs text-[#8899AA] leading-relaxed">{impact}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Auto-Lock Schedule */}
            <Card padding="lg">
                <h2 className="text-base font-semibold text-white mb-4">Auto-Lock Schedule</h2>

                <label className="flex items-center gap-3 mb-5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#00E5A0] w-4 h-4" />
                    <span className="text-sm font-medium text-white">Automatically lock system every month</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-7">
                    <div>
                        <label htmlFor="lock-date" className="block text-xs text-[#8899AA] mb-2">Lock Trigger Date</label>
                        <select
                            id="lock-date"
                            className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm outline-none focus:border-[#00E5A0]"
                        >
                            <option>25th of Current Month</option>
                            <option>28th of Current Month</option>
                            <option>Last Working Day</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="unlock-date" className="block text-xs text-[#8899AA] mb-2">Unlock Trigger Date</label>
                        <select
                            id="unlock-date"
                            className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm outline-none focus:border-[#00E5A0]"
                        >
                            <option>1st of Next Month</option>
                            <option>2nd of Next Month</option>
                            <option>Manual Unlock Only</option>
                        </select>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
