"use client";

import { ArrowRight, GitMerge, MoreVertical, Plus, ShieldAlert, UserCheck } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type MatrixStatus = "Active" | "Inactive";

interface ApprovalStep {
    role: string;
    type: string;
    timeout: string;
}

interface ApprovalMatrix {
    id: string;
    name: string;
    description: string;
    trigger: string;
    steps: ApprovalStep[];
    status: MatrixStatus;
}

const MATRICES: ApprovalMatrix[] = [
    {
        id: "AM-01",
        name: "Standard Leave Approval",
        description: "Default 2-step approval for all paid time off requests.",
        trigger: "Leave Request (Status: Pending)",
        steps: [
            { role: "Reporting Manager", type: "Required", timeout: "48 Hrs" },
            { role: "HR Business Partner", type: "Required", timeout: "24 Hrs" },
        ],
        status: "Active",
    },
    {
        id: "AM-02",
        name: "Capex Requisition (>$10k)",
        description: "High-value equipment or software purchase requests.",
        trigger: "Expense Claim (Amount > $10,000)",
        steps: [
            { role: "Department Head", type: "Required", timeout: "72 Hrs" },
            { role: "Finance Controller", type: "Required", timeout: "72 Hrs" },
            { role: "CFO", type: "Required", timeout: "No Limit" },
        ],
        status: "Active",
    },
    {
        id: "AM-03",
        name: "Promotion Nomination",
        description: "Cycle-based or out-of-cycle role upward movements.",
        trigger: "Job Change Request (Type: Promotion)",
        steps: [
            { role: "Skip-Level Manager", type: "Required", timeout: "5 Days" },
            { role: "Compensation Admin", type: "Required", timeout: "3 Days" },
        ],
        status: "Inactive",
    },
];

const STATUS_VARIANT: Record<MatrixStatus, "success" | "neutral"> = {
    Active: "success",
    Inactive: "neutral",
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function MatrixCard({ matrix }: { matrix: ApprovalMatrix }) {
    return (
        <Card padding="lg">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <GitMerge size={20} className="text-indigo-400" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-white">{matrix.name}</h3>
                    <span className="text-xs text-[#c8d8e8] font-mono bg-[#1A2A3A] px-2 py-0.5 rounded">{matrix.id}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant={STATUS_VARIANT[matrix.status]}>{matrix.status}</Badge>
                    <Button variant="ghost" size="sm" aria-label="More options" icon={<MoreVertical size={16} aria-hidden="true" />} />
                </div>
            </div>

            <p className="text-sm text-[#8899AA] mb-4">{matrix.description}</p>

            <div className="flex items-center gap-2 mb-6 text-sm">
                <span className="text-[#7a8fa6] font-medium">Trigger Event:</span>
                <span className="bg-[#131B2B] text-[#c0c6cc] border border-[#2A3A4A] px-2.5 py-1 rounded-lg">
                    {matrix.trigger}
                </span>
            </div>

            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex items-center overflow-x-auto" tabIndex={0} aria-label="Approval workflow steps">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#8899AA] mr-6 shrink-0 flex items-center gap-1.5">
                    <UserCheck size={14} aria-hidden="true" /> Workflow Steps:
                </div>
                <div className="flex items-center min-w-max" role="list" aria-label="Approval steps">
                    {matrix.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center" role="listitem">
                            <div className="bg-[#0A1420] border border-indigo-500/30 rounded-lg p-3 w-48 relative shadow-sm">
                                <div className="absolute -top-2 -right-2 bg-[#1A2A3A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#2A3A4A]" aria-hidden="true">
                                    {idx + 1}
                                </div>
                                <div className="font-medium text-white text-sm mb-1">{step.role}</div>
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-indigo-400 font-semibold">{step.type}</span>
                                    <span className="text-[#8899AA]">SLA: {step.timeout}</span>
                                </div>
                            </div>
                            {idx < matrix.steps.length - 1 && (
                                <div className="mx-3 text-[#7a8fa6]" aria-hidden="true">
                                    <ArrowRight size={16} />
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="mx-3 text-emerald-500/50" aria-hidden="true">
                        <ArrowRight size={16} />
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <ShieldAlert size={14} aria-hidden="true" /> Approved
                    </div>
                </div>
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ApprovalMatrixPage() {
    return (
        <Page
            title="Approval Matrices"
            subtitle="Define complex, multi-tier approval routing for specific triggers like leaves, expenses, or job changes."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Approval Matrix" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />





}>New Matrix</Button>
            }
        >
            <div className="space-y-4">
                {MATRICES.map((matrix) => (
                    <MatrixCard key={matrix.id} matrix={matrix} />
                ))}
            </div>

            <Card padding="md" className="mt-6 text-center">
                <p className="text-sm text-[#8899AA]">Need complex parallel approvals or conditional logic based on custom fields?</p>
                <Link href="/settings/workflows" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm mt-2 inline-block">
                    Use the Advanced Workflow Builder →
                </Link>
            </Card>
        

        

        

        </Page>
    );
}
