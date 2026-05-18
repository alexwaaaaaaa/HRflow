"use client";

import { useState } from "react";
import {
    ShieldCheck,
    Eye,
    Lock,
    FileArchive,
    Share2,
    Timer,
    AlertCircle,
    CheckCircle,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Sub-components (module scope) ────────────────────────────────────────────
function BundleItem({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <CheckCircle size={14} className="text-emerald-500" aria-hidden="true" />
            {label}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function InspectorReadyMode() {
    const [isModeActive, setIsModeActive] = useState(false);

    return (
        <Page
            title="Inspector Ready Mode"
            subtitle="Generate a unified, tamper-proof, read-only digital bundle for visiting Labour Inspectors."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Inspector Ready" },
            ]}
            maxWidth="800px"
        >
            <div className="mt-10">
                <Card
                    padding="lg"
                    className={`relative overflow-hidden text-center transition-all duration-700 ${
                        isModeActive
                            ? "border-emerald-500/50 bg-gradient-to-br from-emerald-900/40 to-[#0D1928] shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]"
                            : "border-[#1A2A3A] bg-gradient-to-br from-[#0D1928] to-[#060B14]"
                    }`}
                >
                    {/* Background icon */}
                    <div
                        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] transition-all duration-1000 ${
                            isModeActive ? "scale-150 rotate-12" : "scale-100"
                        }`}
                        aria-hidden="true"
                    >
                        <ShieldCheck size={400} />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div
                            className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full transition-all duration-500 ${
                                isModeActive
                                    ? "border-4 border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                                    : "bg-[#1A2A3A] text-slate-500"
                            }`}
                        >
                            <ShieldCheck size={48} aria-hidden="true" />
                        </div>

                        <h2 className="mb-4 text-4xl font-black tracking-tight text-white">Inspector Ready Mode</h2>
                        <p className="mb-10 max-w-lg text-sm font-medium leading-relaxed text-slate-400">
                            Generate a unified, tamper-proof, read-only digital bundle containing previous 12 months of Challans,
                            Registers, and Policies for visiting Labour Inspectors.
                        </p>

                        {!isModeActive ? (
                            <div className="w-full max-w-sm space-y-6">
                                <div className="flex gap-3 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4 text-left">
                                    <AlertCircle size={20} className="mt-0.5 shrink-0 text-orange-500" aria-hidden="true" />
                                    <div className="text-[10px] font-bold italic leading-relaxed text-orange-400">
                                        Warning: Activating this mode generates a traceable link. All statutory data for the designated
                                        period will be bundled and secured.
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    icon={<Eye size={18} aria-hidden="true" />}
                                    onClick={() => setIsModeActive(true)}
                                >
                                    Activate Safe Mode
                                </Button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md animate-in slide-in-from-bottom-4 space-y-6 duration-500">
                                <div className="space-y-4 rounded-2xl border border-emerald-500/30 bg-[#060B14] p-6 text-left">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                                            <Lock size={12} aria-hidden="true" /> Secure Link Generated
                                        </span>
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                                            <Timer size={12} aria-hidden="true" /> Expires in 24h
                                        </span>
                                    </div>

                                    <div className="group flex cursor-pointer items-center justify-between break-all rounded-xl bg-[#1A2A3A]/50 p-3 font-mono text-xs text-white transition-colors hover:bg-[#1A2A3A]">
                                        <span>https://hrflow.app/audit/insp-xyz99281-auth</span>
                                        <Share2 size={14} className="text-slate-400 group-hover:text-emerald-400" aria-hidden="true" />
                                    </div>

                                    <div className="flex flex-col gap-2 border-t border-[#1A2A3A] pt-2">
                                        <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Bundle Contents</div>
                                        <BundleItem label="PF & ESIC Challans (Last 12M)" />
                                        <BundleItem label="State Wage Registers" />
                                        <BundleItem label="Master S&E Certificates" />
                                    </div>

                                    <Button
                                        variant="secondary"
                                        className="mt-2 w-full"
                                        icon={<FileArchive size={14} aria-hidden="true" />}
                                    >
                                        Download Physical Archive (ZIP)
                                    </Button>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-500 hover:text-rose-500"
                                    onClick={() => setIsModeActive(false)}
                                >
                                    Deactivate &amp; Revoke Access
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </Page>
    );
}
