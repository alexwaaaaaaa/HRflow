"use client";

import { useState } from "react";
import { AlertTriangle, Copy, Eye, EyeOff, Plus, RotateCcw } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type KeyStatus = "Active" | "Revoked";

interface ApiKey {
    id: string;
    name: string;
    prefix: string;
    lastUsed: string;
    created: string;
    scopes: string[];
    status: KeyStatus;
    calls: string;
}

const KEYS: ApiKey[] = [
    { id: "ak_live_01", name: "Production — Payroll Sync", prefix: "kry_live_", lastUsed: "3 mins ago", created: "Oct 12, 2023", scopes: ["payroll:read", "payroll:write", "employee:read"], status: "Active", calls: "45.2k" },
    { id: "ak_live_02", name: "Production — ATS Integration", prefix: "kry_live_", lastUsed: "1 hr ago", created: "Nov 5, 2023", scopes: ["recruitment:read", "recruitment:write"], status: "Active", calls: "12.8k" },
    { id: "ak_test_01", name: "Staging — Dev Testing", prefix: "kry_test_", lastUsed: "2 days ago", created: "Jan 18, 2024", scopes: ["*:read"], status: "Active", calls: "3.1k" },
    { id: "ak_live_03", name: "Legacy — Old ERP Connector", prefix: "kry_live_", lastUsed: "Never", created: "Mar 22, 2023", scopes: ["employee:read"], status: "Revoked", calls: "0" },
];

const STATUS_VARIANT: Record<KeyStatus, "success" | "danger"> = {
    Active: "success",
    Revoked: "danger",
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function KeyCard({ apiKey, visible, onToggleVisible }: { apiKey: ApiKey; visible: boolean; onToggleVisible: () => void }) {
    const isTest = apiKey.prefix.includes("test");
    const isRevoked = apiKey.status === "Revoked";
    return (
        <Card padding="md" className={isRevoked ? "border-slate-800/50 bg-slate-900/30" : ""}>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h3 className="text-white font-semibold text-sm">{apiKey.name}</h3>
                        <Badge variant={STATUS_VARIANT[apiKey.status]}>{apiKey.status}</Badge>
                        {isTest && <Badge variant="warning">Test</Badge>}
                    </div>

                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 flex items-center gap-3 mb-4 font-mono text-sm">
                        <span className="text-white flex-1 truncate">
                            {visible ? `${apiKey.prefix}a8f2d1e4b5c6...9x7z` : `${apiKey.prefix}••••••••••••`}
                        </span>
                        <div className="flex gap-2 shrink-0">
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-label={visible ? "Hide key" : "Show key"}
                                onClick={onToggleVisible}
                                icon={visible ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-label="Copy key"
                                icon={<Copy size={14} aria-hidden="true" />}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {apiKey.scopes.map((scope) => (
                            <span key={scope} className="bg-[#1A2A3A] text-slate-300 border border-[#2A3A4A] px-2 py-0.5 rounded text-[10px] font-mono">
                                {scope}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex md:flex-col gap-4 items-end shrink-0 text-right">
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Created</div>
                        <div className="text-xs text-white">{apiKey.created}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Last Used</div>
                        <div className="text-xs text-white">{apiKey.lastUsed}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Calls</div>
                        <div className="text-xs text-indigo-400 font-bold">{apiKey.calls}</div>
                    </div>
                    <div className="flex gap-2 mt-auto">
                        <Button variant="secondary" size="sm" aria-label="Rotate key" icon={<RotateCcw size={14} aria-hidden="true" />} />
                        <Button variant="danger" size="sm" aria-label="Revoke key" />
                    </div>
                </div>
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function APIKeysPage() {
    const [visibleKey, setVisibleKey] = useState<string | null>(null);

    return (
        <Page
            title="API Keys & Tokens"
            subtitle="Manage programmatic access to the Kaarya API. Keys should be stored securely and rotated regularly."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "API Keys" },
            ]}
            maxWidth="1100px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />





}>Generate New Key</Button>
            }
        >
            <div className="space-y-6">
                <Card padding="md" className="border-amber-500/20 bg-amber-500/5">
                    <div className="flex items-start gap-3">
                        <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-amber-200/80">
                            <strong className="text-amber-400">Security Reminder:</strong> API keys grant programmatic access to your Kaarya tenant. Never commit keys to version control. Rotate keys every 90 days.
                        </p>
                    </div>
                </Card>

                <div className="space-y-4">
                    {KEYS.map((key) => (
                        <KeyCard
                            key={key.id}
                            apiKey={key}
                            visible={visibleKey === key.id}
                            onToggleVisible={() => setVisibleKey(visibleKey === key.id ? null : key.id)}
                        />
                    ))}
                </div>
            </div>
        

        

        

        </Page>
    );
}
