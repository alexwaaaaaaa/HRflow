"use client";

import {
    ArrowLeft,
    Clock,
    Globe,
    Download,
    Share2,
    AlertTriangle,
    CheckCircle,
    BrainCircuit,
} from "lucide-react";
import Link from "next/link";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GazetteChangeDetail() {
    return (
        <Page
            title="Gazette Detail"
            subtitle="Mandatory online registration and renewal under Maharashtra Shop & Establishment Act"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Gazette Monitor", href: "/compliance/gazette-monitor" },
                { label: "Detail" },
            ]}
            maxWidth="900px"
            actions={
                <>
                    <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Share this gazette"
                        icon={<Share2 size={16} aria-hidden="true" />}
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        icon={<Download size={14} aria-hidden="true" />}
                    >
                        Source PDF
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Back link */}
                <Link
                    href="/compliance/gazette-monitor"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
                >
                    <ArrowLeft size={16} aria-hidden="true" /> Back to Monitor
                </Link>

                {/* Article header */}
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="info">S&E Act</Badge>
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <Globe size={12} aria-hidden="true" /> Maharashtra
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <Clock size={12} aria-hidden="true" /> Published: 12 Mar 2024
                        </span>
                    </div>

                    <h1 className="text-3xl font-black leading-snug tracking-tight text-white md:text-4xl">
                        Mandatory online registration and renewal under Maharashtra Shop &amp; Establishment Act
                    </h1>

                    <div className="rounded-r-xl border-l-4 border-indigo-500 bg-indigo-500/10 p-4">
                        <h3 className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                            <BrainCircuit size={14} aria-hidden="true" /> AI Executive Summary
                        </h3>
                        <p className="text-sm font-medium italic leading-relaxed text-indigo-100/80">
                            The Government of Maharashtra has mandated that all new registrations and renewals under the Shop and
                            Establishment Act must be done exclusively through the online MAITRI portal. Offline physical submissions
                            will no longer be accepted post April 1st, 2024.
                        </p>
                    </div>
                </div>

                {/* Content + impact */}
                <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-3">
                    <div className="space-y-8 text-sm leading-relaxed text-slate-300 md:col-span-2">
                        <div className="space-y-4">
                            <h2 className="text-lg font-black uppercase tracking-tight text-white">Background &amp; Context</h2>
                            <p>
                                In an effort to promote ease of doing business and digitize administrative processes, the Labour
                                Department of Maharashtra issued circular No. L-2024/CR-12 on March 12, 2024.
                            </p>
                            <p>
                                Previously, establishments with less than 10 employees were granted intimation receipts, while those
                                with 10 or more required formal registration certificates. The new mandate unifies the portal for both
                                intimations and formal registrations.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-lg font-black uppercase tracking-tight text-white">Key Directives</h2>
                            <ul className="list-inside list-disc space-y-3 marker:text-indigo-500">
                                <li>Complete cessation of manual application acceptance at ward offices.</li>
                                <li>
                                    Intimation receipts (Form F) for establishments with 0-9 employees are now auto-generated upon
                                    Aadhar-based e-verification.
                                </li>
                                <li>
                                    Establishments must upload Geo-tagged photographs of the establishment displaying the Marathi Name
                                    Board.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Impact sidebar */}
                    <Card padding="md">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                            Our Impact Assessment
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">Impact Level</span>
                                <Badge variant="warning">
                                    <AlertTriangle size={12} aria-hidden="true" /> Medium
                                </Badge>
                            </div>
                            <div>
                                <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">Action Required</span>
                                <p className="text-xs font-bold leading-relaxed text-slate-300">
                                    Verify if our Mumbai &amp; Pune office registrations are updated on the MAITRI portal. Prepare
                                    geo-tagged photos of name boards.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 border-t border-[#1A2A3A] pt-4">
                            <Button
                                variant="primary"
                                className="w-full"
                                icon={<CheckCircle size={14} aria-hidden="true" />}
                            >
                                Mark as Reviewed
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
