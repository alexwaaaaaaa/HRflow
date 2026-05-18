"use client";

import { useState } from "react";
import { Mail, Phone, ExternalLink, Star, Download, MoreHorizontal, CheckCircle2, FileText } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const TABS = ["Resume", "Cover Letter", "Portfolio"] as const;
type Tab = (typeof TABS)[number];

const SKILLS = ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "GraphQL", "Jest"];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
    return (
        <span className="inline-flex items-center gap-0.5" aria-label={`${count} of 5 stars`}>
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={12}
                    aria-hidden="true"
                    className={
                        s <= count
                            ? "fill-[#00E5A0] text-[#00E5A0]"
                            : "fill-[#1A2A3A] text-[#1A2A3A]"
                    }
                />
            ))}
        </span>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function CandidateProfile() {
    const [activeTab, setActiveTab] = useState<Tab>("Resume");

    return (
        <Page
            title="Rahul Sharma"
            subtitle="Senior Frontend Engineer · Interview Stage"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Candidates", href: "/recruitment/candidates" },
                { label: "Rahul Sharma" },
            ]}
            maxWidth="1400px"
            actions={
                <>






                    <Button variant="danger" size="sm">Reject</Button>
                    <Button variant="secondary" size="sm">Move Stage</Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={<MoreHorizontal size={16} aria-hidden="true" />}
                        aria-label="More actions"
                    />
                </>
            }
        >
            {/* Contact info strip */}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-[#8899AA]">
                <span className="flex items-center gap-1.5">
                    <Mail size={12} aria-hidden="true" /> r.sharma@example.com
                </span>
                <span className="flex items-center gap-1.5">
                    <Phone size={12} aria-hidden="true" /> +91 98765 43210
                </span>
                <span className="flex items-center gap-1.5">
                    <ExternalLink size={12} aria-hidden="true" /> LinkedIn
                </span>
                <Badge variant="purple">Interview Stage</Badge>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* PDF/Resume Preview */}
                <Card padding="none" className="flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-4">
                        <div role="tablist" aria-label="Document tabs" className="flex gap-2 text-sm">
                            {TABS.map((t) => (
                                <button
                                    key={t}
                                    role="tab"
                                    aria-selected={activeTab === t}
                                    onClick={() => setActiveTab(t)}
                                    className={`h-12 border-b-2 px-4 font-medium transition-colors ${
                                        activeTab === t
                                            ? "border-[#0066FF] text-white"
                                            : "border-transparent text-[#8899AA] hover:text-white"
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            icon={<Download size={12} aria-hidden="true" />}
                        >
                            Download
                        </Button>
                    </div>
                    <div className="m-4 flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl border border-[#1A2A3A] bg-white shadow-lg">
                        <div className="text-center text-gray-400">
                            <FileText size={48} className="mx-auto mb-2 opacity-50" aria-hidden="true" />
                            <p className="text-sm font-medium">Rahul_Sharma_Resume.pdf</p>
                            <p className="mt-1 text-xs">Simulated PDF Viewer</p>
                        </div>
                    </div>
                </Card>

                {/* Details */}
                <div className="space-y-6">
                    {/* Application Info */}
                    <Card padding="md">
                        <h3 className="mb-4 text-sm font-semibold text-white">Application Details</h3>
                        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                            <div>
                                <dt className="mb-1 text-xs text-[#8899AA]">Applied For</dt>
                                <dd className="font-medium text-white">Senior Frontend Engineer</dd>
                            </div>
                            <div>
                                <dt className="mb-1 text-xs text-[#8899AA]">Source</dt>
                                <dd className="font-medium text-white">LinkedIn Job Board</dd>
                            </div>
                            <div>
                                <dt className="mb-1 text-xs text-[#8899AA]">Applied Date</dt>
                                <dd className="font-medium text-white">12 Mar 2025</dd>
                            </div>
                            <div>
                                <dt className="mb-1 text-xs text-[#8899AA]">Expected Salary</dt>
                                <dd className="font-medium text-white">₹32,00,000 P.A.</dd>
                            </div>
                        </dl>
                    </Card>

                    {/* Parsed Skills */}
                    <Card padding="md">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">Skills Match (88%)</h3>
                            <span className="text-xs text-[#00E5A0]">Strong Fit</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {SKILLS.map((skill) => (
                                <div
                                    key={skill}
                                    className="flex items-center gap-1.5 rounded-lg bg-[#1A2A3A] px-2.5 py-1.5 text-xs text-white"
                                >
                                    <CheckCircle2 size={12} className="text-[#00E5A0]" aria-hidden="true" />
                                    {skill}
                                </div>
                            ))}
                            <div className="rounded-lg border border-dashed border-[#FF4444]/50 bg-[#1A2A3A] px-2.5 py-1.5 text-xs text-[#8899AA]">
                                Missing: AWS Deployments
                            </div>
                        </div>
                    </Card>

                    {/* Interview Feedback */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">Scorecards & Feedback</h3>
                            <Button variant="ghost" size="sm">Request Feedback</Button>
                        </div>
                        <Card padding="md" className="cursor-pointer transition-colors hover:border-[#2A3A4A]">
                            <div className="mb-3 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        aria-hidden="true"
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2A3A] text-[10px] font-bold text-white"
                                    >
                                        PN
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Technical Round</p>
                                        <p className="text-[11px] text-[#8899AA]">By Priya Nair · 14 Mar 2025</p>
                                    </div>
                                </div>
                                <StarRating count={4} />
                            </div>
                            <p className="text-sm leading-relaxed text-[#8899AA]">
                                &ldquo;Rahul demonstrated excellent knowledge of React rendering concepts and
                                built the required component in 20 minutes. Communication was extremely
                                clear. Highly recommended.&rdquo;
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        

        

        

        </Page>
    );
}
