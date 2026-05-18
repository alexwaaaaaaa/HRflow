"use client";

import { Save, Snowflake } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

const FREEZE_TOGGLES = [
    {
        id: "basic-da",
        label: "Basic + DA Formula",
        desc: "Lock the formula computation (e.g., 50% of CTC).",
        defaultOn: true,
    },
    {
        id: "statutory",
        label: "Statutory Deductions (PF/PT/ESI)",
        desc: "Prevent manual overriding of statutory deduction amounts.",
        defaultOn: true,
    },
    {
        id: "fbp",
        label: "Flexible Benefit Plan (FBP)",
        desc: "Lock FBP declarations outside of the designated declaration window.",
        defaultOn: false,
    },
] as const;

export default function SalaryFreezeSettings() {
    return (
        <Page
            title="Salary Structure Freeze"
            subtitle="Lock core salary structures to prevent unauthorized modifications across the organization."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Freeze" },
            ]}
            maxWidth="800px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>Save Policy</Button>
            }
        >
            {/* Info Banner */}
            <div className="flex items-start gap-3 p-4 bg-[#0066FF]/5 border border-dashed border-[#0066FF]/30 rounded-xl">
                <Snowflake size={18} className="text-[#0066FF] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-[#c8d8e8] leading-relaxed">
                    When a parameter is frozen, it cannot be modified by HR Managers. Only Admins with &apos;Super Admin&apos; or &apos;Payroll Master&apos; roles can unlock and edit these values.
                </p>
            </div>

            {/* Component Value Freeze */}
            <Card padding="lg">
                <h2 className="text-base font-semibold text-white mb-4">Component Value Freeze</h2>
                <div className="space-y-4">
                    {FREEZE_TOGGLES.map((toggle, i) => (
                        <label
                            key={toggle.id}
                            className={`flex items-center justify-between cursor-pointer ${i < FREEZE_TOGGLES.length - 1 ? "pb-4 border-b border-[#1A2A3A]" : ""}`}
                        >
                            <div>
                                <div className="text-sm font-medium text-white mb-1">{toggle.label}</div>
                                <div className="text-xs text-[#8899AA]">{toggle.desc}</div>
                            </div>
                            <div
                                className={`w-10 h-6 rounded-full flex items-center p-0.5 transition-colors ${toggle.defaultOn ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}
                                role="switch"
                                aria-checked={toggle.defaultOn}
                                aria-label={toggle.label}
                            >
                                <div className={`w-5 h-5 rounded-full transition-transform ${toggle.defaultOn ? "bg-[#060B14] translate-x-4" : "bg-[#8899AA]"}`} />
                            </div>
                        </label>
                    ))}
                </div>
            </Card>

            {/* CTC Boundary Guardrails */}
            <Card padding="lg">
                <h2 className="text-base font-semibold text-white mb-4">CTC Boundary Guardrails</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="min-hike" className="block text-xs text-[#8899AA] mb-2">Minimum Allowed Hike (%)</label>
                        <input
                            id="min-hike"
                            type="number"
                            defaultValue="0"
                            className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm outline-none focus:border-[#00E5A0]"
                        />
                    </div>
                    <div>
                        <label htmlFor="max-hike" className="block text-xs text-[#8899AA] mb-2">Maximum Allowed Hike (%) — Guardrail</label>
                        <input
                            id="max-hike"
                            type="number"
                            defaultValue="30"
                            className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm outline-none focus:border-[#00E5A0]"
                        />
                        <p className="text-xs text-[#FFB800] mt-2">Revisions above 30% require Super Admin approval.</p>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
