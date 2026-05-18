"use client";

import { AlertTriangle, Save, ToggleLeft, ToggleRight, Users } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface FeatureFlag {
    key: string;
    label: string;
    description: string;
    enabled: boolean;
    rollout: string;
    scope: string;
}

const FLAGS: FeatureFlag[] = [
    { key: "ai_copilot_v2", label: "AI Copilot V2 (Beta)", description: "Next-gen HR copilot with multi-turn reasoning and action chaining.", enabled: false, rollout: "0%", scope: "Global" },
    { key: "dark_mode_payslip", label: "Dark Mode Payslips", description: "Generate payslips with dark theme styling for the employee portal.", enabled: true, rollout: "100%", scope: "Global" },
    { key: "experimental_ats", label: "Experimental ATS Pipeline", description: "New kanban-based candidate pipeline with AI resume scoring.", enabled: true, rollout: "25%", scope: "Internal Only" },
    { key: "whatsapp_bot", label: "WhatsApp Chatbot (Pilot)", description: "Enable conversational HR queries via WhatsApp Business API.", enabled: true, rollout: "10%", scope: "Pilot Tenants" },
    { key: "perf_360_review", label: "360° Performance Reviews", description: "Enable peer, subordinate, and cross-functional feedback in reviews.", enabled: false, rollout: "0%", scope: "Global" },
    { key: "geo_attendance", label: "Geo-Fenced Attendance", description: "GPS-based attendance with configurable geofence radius per location.", enabled: true, rollout: "100%", scope: "Global" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function FlagRow({ flag }: { flag: FeatureFlag }) {
    return (
        <Card padding="md" className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${flag.enabled ? "" : "opacity-60 hover:opacity-100"}`}>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold text-sm">{flag.label}</h3>
                    <span className="text-[10px] text-[#445566] font-mono bg-[#1A2A3A] px-2 py-0.5 rounded">{flag.key}</span>
                </div>
                <p className="text-xs text-[#8899AA] leading-relaxed mb-2">{flag.description}</p>
                <div className="flex items-center gap-4 text-[10px] text-[#445566]">
                    <span className="flex items-center gap-1"><Users size={10} aria-hidden="true" /> Rollout: {flag.rollout}</span>
                    <span>Scope: {flag.scope}</span>
                </div>
            </div>
            <button
                aria-label={`${flag.enabled ? "Disable" : "Enable"} ${flag.label}`}
                aria-pressed={flag.enabled}
                className="shrink-0 transition-transform hover:scale-110"
            >
                {flag.enabled
                    ? <ToggleRight size={32} className="text-indigo-400" aria-hidden="true" />
                    : <ToggleLeft size={32} className="text-[#2A3A4A]" aria-hidden="true" />
                }
            </button>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function FeatureFlagsPage() {
    const toast = useToast();

    const handleSave = async () => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 500));
        toast.show({ variant: "success", title: "Feature flags saved", description: "Changes will propagate within 60 seconds." });
    };

    return (
        <Page
            title="Feature Flags"
            subtitle="Control feature rollouts with granular toggle and percentage-based deployment."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "System", href: "/settings/system/health" },
                { label: "Feature Flags" },
            ]}
            maxWidth="1100px"
            actions={
                <Button onClick={handleSave} icon={<Save size={16} aria-hidden="true" />}>Save All</Button>
            }
        >
            <div className="space-y-6">
                <Card padding="md" className="border-amber-500/20 bg-amber-500/5">
                    <div className="flex items-start gap-3">
                        <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-amber-200/80">
                            <strong className="text-amber-400">Caution:</strong> Toggling feature flags affects all users in real-time. Changes propagate within 60 seconds via edge config.
                        </p>
                    </div>
                </Card>

                <div className="space-y-4">
                    {FLAGS.map((flag) => (
                        <FlagRow key={flag.key} flag={flag} />
                    ))}
                </div>
            </div>
        </Page>
    );
}
