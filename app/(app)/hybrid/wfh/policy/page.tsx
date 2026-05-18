"use client";

import { useState } from "react";
import { Home, ShieldCheck, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PolicyState {
    monthlyAllowance: number;
    consecutiveLimit: number;
    blockWeekends: boolean;
    requireApproval: boolean;
}

// ─── Sub-components (module scope) ───────────────────────────────────────────

function PolicyToggle({
    id,
    label,
    description,
    checked,
    onChange,
}: {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <label
            htmlFor={id}
            className="flex cursor-pointer flex-col gap-2 rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-[#2A3A4A]"
        >
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{label}</span>
                <div className="relative inline-flex items-center">
                    <input
                        id={id}
                        type="checkbox"
                        className="peer sr-only"
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                    <div className="h-5 w-9 rounded-full bg-[#1A2A3A] after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#3b82f6] peer-checked:after:translate-x-full" />
                </div>
            </div>
            <p className="text-xs text-[#8899AA]">{description}</p>
        </label>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WfhPolicyPage() {
    const toast = useToast();
    const [policy, setPolicy] = useState<PolicyState>({
        monthlyAllowance: 8,
        consecutiveLimit: 3,
        blockWeekends: true,
        requireApproval: true,
    });

    const handleSave = () => {
        // TODO: replace with real mutation
        toast.show({ variant: "success", title: "Policy saved", description: "WFH policy has been updated successfully." });
    };

    return (
        <Page
            title="Work From Home Policy"
            subtitle="Configure hybrid work rules and quotas for the organization"
            breadcrumbs={[
                { label: "Hybrid", href: "/hybrid/wfh/request" },
                { label: "WFH Policy" },
            ]}
            maxWidth="900px"
            actions={
                <Button
                    variant="primary"
                    icon={<Save size={16} aria-hidden="true" />}
                    onClick={handleSave}
                >
                    Save Policy
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Quota section */}
                <Card padding="lg">
                    <h2 className="mb-6 flex items-center gap-2 border-b border-[#1A2A3A] pb-4 text-base font-semibold text-white">
                        <Home size={18} className="text-[#3b82f6]" aria-hidden="true" />
                        Baseline WFH Quota
                    </h2>

                    <div className="space-y-6">
                        {/* Monthly allowance */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 sm:pr-12">
                                <h3 className="mb-1 text-sm font-bold text-white">Monthly WFH Allowance</h3>
                                <p className="text-xs leading-relaxed text-[#8899AA]">
                                    Number of days an employee is permitted to Work from Home in a calendar month.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 border-[#1A2A3A] sm:w-48 sm:border-l sm:pl-6">
                                <label htmlFor="monthly-allowance" className="sr-only">Monthly WFH allowance in days</label>
                                <input
                                    id="monthly-allowance"
                                    type="number"
                                    min={0}
                                    max={31}
                                    value={policy.monthlyAllowance}
                                    onChange={(e) => setPolicy((p) => ({ ...p, monthlyAllowance: Number(e.target.value) }))}
                                    className="w-16 rounded border border-[#2A3A4A] bg-[#060B14] p-2.5 text-center font-bold text-white outline-none focus:border-[#00e5a0]"
                                />
                                <span className="text-sm font-bold text-[#556677]">days / month</span>
                            </div>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        {/* Consecutive limit */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 sm:pr-12">
                                <h3 className="mb-1 text-sm font-bold text-white">Consecutive Days Limit</h3>
                                <p className="text-xs leading-relaxed text-[#8899AA]">
                                    Maximum number of continuous WFH days allowed in a single stretch to ensure some office presence.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 border-[#1A2A3A] sm:w-48 sm:border-l sm:pl-6">
                                <label htmlFor="consecutive-limit" className="sr-only">Maximum consecutive WFH days</label>
                                <input
                                    id="consecutive-limit"
                                    type="number"
                                    min={1}
                                    max={31}
                                    value={policy.consecutiveLimit}
                                    onChange={(e) => setPolicy((p) => ({ ...p, consecutiveLimit: Number(e.target.value) }))}
                                    className="w-16 rounded border border-[#2A3A4A] bg-[#060B14] p-2.5 text-center font-bold text-white outline-none focus:border-[#00e5a0]"
                                />
                                <span className="text-sm font-bold text-[#556677]">max stretch</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Restrictions section */}
                <Card padding="lg">
                    <h2 className="mb-6 flex items-center gap-2 border-b border-[#1A2A3A] pb-4 text-base font-semibold text-white">
                        <ShieldCheck size={18} className="text-[#00e5a0]" aria-hidden="true" />
                        Restrictions
                    </h2>

                    <div className="space-y-4">
                        <PolicyToggle
                            id="block-weekends"
                            label="Block Mondays / Fridays"
                            description="Prevent employees from clubbing WFH with weekends for extended leaves."
                            checked={policy.blockWeekends}
                            onChange={(v) => setPolicy((p) => ({ ...p, blockWeekends: v }))}
                        />
                        <PolicyToggle
                            id="require-approval"
                            label="Require Manager Approval"
                            description="If unchecked, WFH requests within quota are auto-approved."
                            checked={policy.requireApproval}
                            onChange={(v) => setPolicy((p) => ({ ...p, requireApproval: v }))}
                        />
                    </div>
                </Card>
            </div>
        </Page>
    );
}
