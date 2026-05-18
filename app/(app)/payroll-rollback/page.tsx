"use client";

import { useState } from "react";
import { AlertOctagon, RotateCcw, ShieldAlert, KeyRound } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

// Calculation snapshot values — byte-identical after migration
// Target Cycle: March 2025 Regular
// Affected Employees: 145 Personnel
// Reversal Amount: ₹45,20,000
const ROLLBACK_DETAILS = [
    { label: "Target Cycle", value: "March 2025 Regular" },
    { label: "Affected Employees", value: "145 Personnel" },
] as const;

const IMPACT_ITEMS = [
    "Direct deposit bank transfer files (.txt/.csv) will be immediately invalidated.",
    "Generated PDF payslips will be revoked and removed from employee portals.",
    "Accounting journal entries posted via API will be sent a reversal payload.",
    "Statutory liability accruals (PF, PT, TDS) for this cycle will be reset.",
] as const;

const CONFIRM_PHRASE = "CONFIRM ROLLBACK";

export default function PayrollRollbackPage() {
    const [confirmText, setConfirmText] = useState("");
    const isConfirmed = confirmText === CONFIRM_PHRASE;

    return (
        <Page
            title="Initiate Payroll Rollback"
            subtitle="Emergency undo operation — revert a finalized payroll run"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Rollback" },
            ]}
            maxWidth="720px"
            actions={<Badge variant="danger">Danger Zone</Badge>}
        >
            <Card padding="none" className="border-2 border-[#FF4444]/30 shadow-[0_0_50px_rgba(255,68,68,0.1)]">
                <div className="h-1.5 bg-[#FF4444] w-full" aria-hidden="true" />

                <div className="p-8 pb-6 border-b border-[#1A2A3A]">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-[#FF4444]/10 flex items-center justify-center shrink-0 border border-[#FF4444]/20" aria-hidden="true">
                            <RotateCcw size={26} className="text-[#FF4444]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight">Initiate Payroll Rollback</h2>
                            <p className="text-[#FF4444] text-sm font-bold tracking-wider mt-1 uppercase">Emergency Undo Operation</p>
                        </div>
                    </div>
                    <p className="text-[#8899AA] text-sm leading-relaxed">
                        You are about to revert a finalized payroll run. This action will delete generated payslips, invalidate bank files, and reverse accounting entries. This should only be used in case of severe miscalculations or compromised runs.
                    </p>
                </div>

                <div className="p-8 bg-[#060B14]">
                    <h3 className="text-sm font-bold text-[#c8d8e8] uppercase tracking-wider mb-4 border-b border-[#1A2A3A] pb-2">
                        Rollback Target Details
                    </h3>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                        {ROLLBACK_DETAILS.map((d) => (
                            <div key={d.label}>
                                <p className="text-xs text-[#8899AA] block mb-1">{d.label}</p>
                                <p className="font-bold text-white text-lg">{d.value}</p>
                            </div>
                        ))}
                        <div>
                            <p className="text-xs text-[#8899AA] block mb-1">Status</p>
                            <p><Badge variant="success">Locked &amp; Processed</Badge></p>
                        </div>
                        <div>
                            <p className="text-xs text-[#FF4444] font-bold block mb-1">Reversal Amount</p>
                            <p className="font-mono font-bold text-[#FF4444] text-xl">₹45,20,000</p>
                        </div>
                    </div>

                    <div className="bg-[#1A2A3A]/30 border border-[#FF4444]/20 rounded-lg p-5 mb-8">
                        <h4 className="text-xs font-bold text-[#FF4444] flex items-center gap-2 mb-3 uppercase tracking-wider">
                            <ShieldAlert size={14} aria-hidden="true" /> System Impact Checklist
                        </h4>
                        <ul className="space-y-2.5 text-sm text-[#c8d8e8]" role="list">
                            {IMPACT_ITEMS.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="text-[#FF4444] mt-0.5" aria-hidden="true">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="confirm-input" className="block text-sm font-bold text-[#c8d8e8] mb-2">
                                Type <span className="text-[#FF4444] font-mono select-none">{CONFIRM_PHRASE}</span> to proceed:
                            </label>
                            <div className="relative">
                                <KeyRound size={18} className="absolute left-4 top-3.5 text-[#8899AA]" aria-hidden="true" />
                                <input
                                    id="confirm-input"
                                    type="text"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                    placeholder={CONFIRM_PHRASE}
                                    aria-describedby="confirm-hint"
                                    className="w-full bg-[#0A1420] border-2 border-[#1A2A3A] text-[#FF4444] rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#FF4444] font-mono tracking-widest placeholder-[#445566] transition-colors"
                                />
                            </div>
                            <p id="confirm-hint" className="text-xs text-[#8899AA] mt-2">
                                This confirmation phrase is case-sensitive.
                            </p>
                        </div>

                        <Button
                            variant="danger"
                            className="w-full py-4 text-lg uppercase tracking-wider"
                            disabled={!isConfirmed}
                            icon={<AlertOctagon size={20} aria-hidden="true" />}
                        >
                            Execute Rollback
                        </Button>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
