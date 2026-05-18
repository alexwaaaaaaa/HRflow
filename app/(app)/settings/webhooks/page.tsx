"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Eye, EyeOff, Plus, RotateCcw, Trash2, XCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type WebhookStatus = "Active" | "Failing";

interface WebhookEntry {
    id: string;
    name: string;
    url: string;
    event: string;
    status: WebhookStatus;
    lastTriggered: string;
    successRate: string;
}

const WEBHOOKS: WebhookEntry[] = [
    { id: "WH-001", name: "New Hire → Slack #onboarding", url: "https://hooks.slack.com/services/T05...", event: "employee.created", status: "Active", lastTriggered: "12 mins ago", successRate: "100%" },
    { id: "WH-002", name: "Leave Approved → JIRA", url: "https://api.atlassian.com/webhooks/...", event: "leave.approved", status: "Active", lastTriggered: "3 hrs ago", successRate: "98.5%" },
    { id: "WH-003", name: "Payroll Finalized → ERP Sync", url: "https://erp.internal.kaarya.com/api/...", event: "payroll.finalized", status: "Failing", lastTriggered: "2 days ago", successRate: "72%" },
];

const STATUS_VARIANT: Record<WebhookStatus, "success" | "danger"> = {
    Active: "success",
    Failing: "danger",
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function WebhookCard({ wh, showSecret, onToggleSecret }: {
    wh: WebhookEntry;
    showSecret: boolean;
    onToggleSecret: () => void;
}) {
    const isFailing = wh.status === "Failing";
    const successPct = parseFloat(wh.successRate);

    return (
        <Card padding="md" className={isFailing ? "border-red-500/30" : ""}>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold text-sm">{wh.name}</h3>
                        <span className="text-xs text-[#445566] font-mono bg-[#1A2A3A] px-2 py-0.5 rounded">{wh.id}</span>
                        <Badge variant={STATUS_VARIANT[wh.status]}>
                            {wh.status === "Active" ? <CheckCircle2 size={10} aria-hidden="true" /> : <XCircle size={10} aria-hidden="true" />}
                            {wh.status}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-3">
                            <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Endpoint URL</div>
                            <div className="text-sm text-white font-mono truncate flex items-center gap-2">
                                {wh.url}
                                <Button variant="ghost" size="sm" aria-label="Copy URL" icon={<Copy size={12} aria-hidden="true" />} />
                            </div>
                        </div>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-3">
                            <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Event Trigger</div>
                            <div className="text-sm text-indigo-400 font-mono">{wh.event}</div>
                        </div>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-3">
                            <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Signing Secret</div>
                            <div className="text-sm text-white font-mono flex items-center gap-2">
                                {showSecret ? "whsec_k4ry4_2f8a...x9z1" : "••••••••••••••"}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    aria-label={showSecret ? "Hide secret" : "Show secret"}
                                    onClick={onToggleSecret}
                                    icon={showSecret ? <EyeOff size={12} aria-hidden="true" /> : <Eye size={12} aria-hidden="true" />}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex md:flex-col gap-2 shrink-0">
                    <div className="text-right mb-2 hidden md:block">
                        <div className="text-xs text-[#8899AA]">Last Triggered</div>
                        <div className="text-sm text-white font-medium">{wh.lastTriggered}</div>
                    </div>
                    <div className="text-right mb-2 hidden md:block">
                        <div className="text-xs text-[#8899AA]">Success Rate</div>
                        <div className={`text-sm font-bold ${successPct > 90 ? "text-emerald-400" : "text-red-400"}`}>{wh.successRate}</div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm" aria-label="Test webhook" icon={<RotateCcw size={14} aria-hidden="true" />} />
                        <Button variant="danger" size="sm" aria-label="Delete webhook" icon={<Trash2 size={14} aria-hidden="true" />} />
                    </div>
                </div>
            </div>

            {isFailing && (
                <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 text-sm">
                    <XCircle size={16} className="text-red-400 shrink-0" aria-hidden="true" />
                    <span className="text-red-300">Last 3 deliveries returned HTTP 503 (Service Unavailable). The endpoint may be down.</span>
                    <Button variant="danger" size="sm" className="ml-auto">Retry Now</Button>
                </div>
            )}
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function WebhookSettingsPage() {
    const [showSecret, setShowSecret] = useState<string | null>(null);

    return (
        <Page
            title="Webhooks"
            subtitle="Configure outgoing HTTP callbacks for real-time event notifications to external systems."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Webhooks" },
            ]}
            maxWidth="1100px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />}>Register Webhook</Button>
            }
        >
            <div className="space-y-4">
                {WEBHOOKS.map((wh) => (
                    <WebhookCard
                        key={wh.id}
                        wh={wh}
                        showSecret={showSecret === wh.id}
                        onToggleSecret={() => setShowSecret(showSecret === wh.id ? null : wh.id)}
                    />
                ))}
            </div>
        </Page>
    );
}
