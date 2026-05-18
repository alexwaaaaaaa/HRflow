"use client";

import { CheckCircle2, Mail, ShieldCheck, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type StepStatus = "complete" | "active" | "pending";
type StepType = "Trigger" | "Approval" | "Action" | "Condition";

interface WorkflowStep {
    id: number;
    name: string;
    type: StepType;
    icon: LucideIcon;
    status: StepStatus;
    description: string;
}

const STEPS: WorkflowStep[] = [
    { id: 1, name: "Trigger: Leave Request Created", type: "Trigger", icon: Zap, status: "complete", description: "Fires when any employee submits a leave application." },
    { id: 2, name: "Assign to Reporting Manager", type: "Approval", icon: Users, status: "complete", description: "Routes request to the direct manager for Level 1 approval. SLA: 48 hours." },
    { id: 3, name: "Send Notification to Employee", type: "Action", icon: Mail, status: "active", description: "Sends email + push notification to the applicant confirming submission." },
    { id: 4, name: "HR Final Review (Optional)", type: "Condition", icon: ShieldCheck, status: "pending", description: "Only triggered if leave duration > 5 days or category is \"Sabbatical\"." },
];

const STEP_STATUS_CLASSES: Record<StepStatus, string> = {
    complete: "bg-emerald-500/20 border border-emerald-500/30",
    active: "bg-indigo-500/20 border border-indigo-500/30 animate-pulse",
    pending: "bg-[#1A2A3A] border border-[#2A3A4A]",
};

const STEP_ICON_CLASSES: Record<StepStatus, string> = {
    complete: "text-emerald-400",
    active: "text-indigo-400",
    pending: "text-[#445566]",
};

const CARD_BORDER_CLASSES: Record<StepStatus, string> = {
    complete: "border-[#1A2A3A]",
    active: "border-indigo-500/30",
    pending: "border-[#1A2A3A]",
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function StepNode({ step, isLast }: { step: WorkflowStep; isLast: boolean }) {
    const Icon = step.icon;
    return (
        <div className="relative pb-8 last:pb-0">
            {!isLast && (
                <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-[#1A2A3A]" aria-hidden="true" />
            )}
            <div className="flex items-start gap-4">
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${STEP_STATUS_CLASSES[step.status]}`}
                    aria-hidden="true"
                >
                    {step.status === "complete"
                        ? <CheckCircle2 size={16} className="text-emerald-400" />
                        : <Icon size={16} className={STEP_ICON_CLASSES[step.status]} />
                    }
                </div>
                <Card padding="md" className={`flex-1 ${CARD_BORDER_CLASSES[step.status]}`}>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium text-sm">{step.name}</h3>
                        <Badge variant="neutral">{step.type}</Badge>
                    </div>
                    <p className="text-xs text-[#8899AA] leading-relaxed">{step.description}</p>
                </Card>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function WorkflowDetailPage() {
    return (
        <Page
            title="Standard Leave Approval"
            subtitle="WF-001 · 1,245 runs"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Workflows", href: "/settings/workflows" },
                { label: "Standard Leave Approval" },
            ]}
            maxWidth="800px"
            actions={
                <div className="flex items-center gap-3">
                    <Badge variant="success" dot>Active</Badge>
                    <Button variant="secondary" href="/settings/workflows">← Back</Button>
                    <Button variant="secondary">Edit Workflow</Button>
                </div>
            }
        >
            <ol className="relative pl-8 space-y-0" aria-label="Workflow steps">
                {STEPS.map((step, idx) => (
                    <li key={step.id}>
                        <StepNode step={step} isLast={idx === STEPS.length - 1} />
                    </li>
                ))}
            </ol>
        </Page>
    );
}
