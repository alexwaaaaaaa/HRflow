"use client";

import { Clock, GitMerge, MoreVertical, Play, Plus, Zap } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type WorkflowStatus = "Active" | "Draft";

interface WorkflowEntry {
    id: string;
    name: string;
    trigger: string;
    steps: number;
    status: WorkflowStatus;
    runs: string;
    lastRun: string;
}

const WORKFLOWS: WorkflowEntry[] = [
    { id: "WF-001", name: "Standard Leave Approval", trigger: "Leave Request Created", steps: 3, status: "Active", runs: "1,245", lastRun: "10 mins ago" },
    { id: "WF-002", name: "New Hire Onboarding", trigger: "Employee Added", steps: 7, status: "Active", runs: "89", lastRun: "2 days ago" },
    { id: "WF-003", name: "Expense Claim (>₹10k)", trigger: "Expense Submitted (Amount > 10000)", steps: 4, status: "Active", runs: "312", lastRun: "1 hr ago" },
    { id: "WF-004", name: "Exit Clearance", trigger: "Resignation Approved", steps: 6, status: "Draft", runs: "0", lastRun: "Never" },
];

const STATUS_VARIANT: Record<WorkflowStatus, BadgeVariant> = {
    Active: "success",
    Draft: "warning",
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function WorkflowCard({ wf }: { wf: WorkflowEntry }) {
    return (
        <Link href={`/settings/workflows/${wf.id}`} className="block group">
            <Card padding="md" className="hover:border-[#2A3A4A] transition-all hover:shadow-lg">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-white font-semibold text-sm group-hover:text-indigo-400 transition-colors">{wf.name}</h3>
                            <Badge variant={STATUS_VARIANT[wf.status]}>{wf.status}</Badge>
                        </div>
                        <span className="text-xs text-[#445566] font-mono">{wf.id}</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        aria-label="More options"
                        icon={<MoreVertical size={16} aria-hidden="true" />}
                        className="opacity-0 group-hover:opacity-100 transition-all"
                        onClick={(e) => e.preventDefault()}
                    />
                </div>

                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 mb-4">
                    <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Trigger Event</div>
                    <div className="text-sm text-white flex items-center gap-2">
                        <Zap size={14} className="text-amber-400" aria-hidden="true" /> {wf.trigger}
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs text-[#8899AA]">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><GitMerge size={12} aria-hidden="true" /> {wf.steps} steps</span>
                        <span className="flex items-center gap-1"><Play size={12} aria-hidden="true" /> {wf.runs} runs</span>
                    </div>
                    <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" /> {wf.lastRun}</span>
                </div>
            </Card>
        </Link>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function WorkflowBuilderPage() {
    return (
        <Page
            title="Workflow Builder"
            subtitle="Design multi-step automated workflows with conditional logic, approvals, and integrations."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Workflows" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />}>Create Workflow</Button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WORKFLOWS.map((wf) => (
                    <WorkflowCard key={wf.id} wf={wf} />
                ))}
            </div>
        </Page>
    );
}
