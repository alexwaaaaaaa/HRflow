"use client";

import { AlertTriangle, Save, ToggleLeft, ToggleRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface ModuleEntry {
    name: string;
    description: string;
    enabled: boolean;
    core: boolean;
}

const MODULES: ModuleEntry[] = [
    { name: "Employee Directory", description: "Core employee profiles, documents, and org chart.", enabled: true, core: true },
    { name: "Payroll Engine", description: "Salary processing, tax calculations, and statutory remittances.", enabled: true, core: true },
    { name: "Leave Management", description: "Leave policies, balance tracking, and approval workflows.", enabled: true, core: false },
    { name: "Attendance & Shifts", description: "Biometric attendance, shift scheduling, and geo-fencing.", enabled: true, core: false },
    { name: "Recruitment (ATS)", description: "Applicant tracking, interview scheduling, and offer management.", enabled: true, core: false },
    { name: "Performance Reviews", description: "OKRs, competency assessments, and review cycles.", enabled: true, core: false },
    { name: "Travel & Expense", description: "Travel requests, expense claims, and reimbursement processing.", enabled: false, core: false },
    { name: "Training & LMS", description: "Course management, skill tracking, and certifications.", enabled: true, core: false },
    { name: "BGV & Compliance", description: "Background verification, document management, and digital signing.", enabled: true, core: false },
    { name: "AI + Chatbot Suite", description: "AI-powered insights, NL queries, attrition prediction, and HR copilot.", enabled: true, core: false },
    { name: "Helpdesk & Ticketing", description: "Employee support tickets, SLA tracking, and knowledge base.", enabled: false, core: false },
    { name: "Exit & Separation", description: "Full & final settlement, clearance workflows, and alumni management.", enabled: true, core: false },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function ModuleCard({ mod }: { mod: ModuleEntry }) {
    return (
        <Card padding="md" className={`flex flex-col justify-between transition-all ${mod.enabled ? "" : "opacity-50 hover:opacity-100"}`}>
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-semibold text-sm">{mod.name}</h3>
                    {mod.core && <Badge variant="warning">Core</Badge>}
                </div>
                <p className="text-xs text-[#8899AA] leading-relaxed mb-4">{mod.description}</p>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[#1A2A3A]">
                <span className={`text-xs font-medium ${mod.enabled ? "text-emerald-400" : "text-[#445566]"}`}>
                    {mod.enabled ? "Enabled" : "Disabled"}
                </span>
                <button
                    aria-label={`${mod.enabled ? "Disable" : "Enable"} ${mod.name}`}
                    aria-pressed={mod.enabled}
                    disabled={mod.core}
                    className={`transition-transform hover:scale-110 ${mod.core ? "opacity-30 cursor-not-allowed" : ""}`}
                >
                    {mod.enabled
                        ? <ToggleRight size={28} className="text-indigo-400" aria-hidden="true" />
                        : <ToggleLeft size={28} className="text-[#2A3A4A]" aria-hidden="true" />
                    }
                </button>
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ModuleEnableDisablePage() {
    const toast = useToast();

    const handleSave = async () => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 500));
        toast.show({ variant: "success", title: "Module configuration saved" });
    };

    return (
        <Page
            title="Module Manager"
            subtitle="Enable or disable entire modules for your organization. Disabled modules are hidden from navigation and APIs."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "System", href: "/settings/system/health" },
                { label: "Modules" },
            ]}
            maxWidth="1200px"
            actions={
                <Button onClick={handleSave} icon={<Save size={16} aria-hidden="true" />}>Save Configuration</Button>
            }
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {MODULES.map((mod) => (
                        <ModuleCard key={mod.name} mod={mod} />
                    ))}
                </div>

                <Card padding="md" className="border-amber-500/20 bg-amber-500/5">
                    <div className="flex items-start gap-3">
                        <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-amber-200/80">
                            <strong className="text-amber-400">Note:</strong> Core modules (Employee Directory, Payroll) cannot be disabled as they are dependencies for other modules.
                        </p>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
