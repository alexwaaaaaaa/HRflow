"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, Play, Shield, ShieldCheck, Star } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type DetailTab = "Overview" | "Permissions" | "Reviews (142)";

const DETAIL_TABS: DetailTab[] = ["Overview", "Permissions", "Reviews (142)"];

const KEY_FEATURES = [
    { title: "Instant Employee Creation", desc: "Hired candidates become pending employees automatically." },
    { title: "Document Push", desc: "Copies signed offer letters, resumes, and NDAs to the employee's document vault." },
    { title: "Department Mapping", desc: "Maps Greenhouse departments and locations directly to your Kaarya org structure." },
];

const SCOPES = [
    { scope: "employees:write", access: "Write" },
    { scope: "documents:write", access: "Write" },
    { scope: "organization:read", access: "Read" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function MarketplaceDetailScreen() {
    const [activeTab, setActiveTab] = useState<DetailTab>("Overview");

    return (
        <Page
            title="Greenhouse ATS"
            subtitle="Seamlessly transition hired candidates from Greenhouse into Kaarya employee records."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Integrations", href: "/settings/integrations" },
                { label: "Greenhouse ATS" },
            ]}
            maxWidth="1100px"
            actions={
                <div className="flex items-center gap-3">
                    <Badge variant="success">
                        <Star size={12} className="fill-current" aria-hidden="true" /> 4.8
                    </Badge>
                    <Button iconRight={<ArrowRight size={16} aria-hidden="true" />} href="/settings/integrations/install">Install App</Button>
                </div>
            }
        >
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-6">
                    {/* Tabs */}
                    <div className="flex border-b border-[#1A2A3A]" role="tablist" aria-label="Integration details">
                        {DETAIL_TABS.map((tab) => (
                            <button
                                key={tab}
                                role="tab"
                                aria-selected={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
                                    activeTab === tab
                                        ? "border-emerald-500 text-white"
                                        : "border-transparent text-[#556677] hover:text-[#8899AA]"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === "Overview" && (
                        <Card padding="lg" className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">About this integration</h3>
                                <p className="text-[#8899AA] mb-4">
                                    The Kaarya + Greenhouse integration eliminates manual data entry and reduces the risk of errors during candidate handover. When a candidate reaches the &ldquo;Hired&rdquo; stage in Greenhouse, their profile, resume, and offer details are automatically synced to Kaarya.
                                </p>
                                <p className="text-[#8899AA]">
                                    Once synced, Kaarya&apos;s auto-provisioning engine takes over to assign assets, create email accounts, and notify IT—reducing onboarding time from days to minutes.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
                                <ul className="space-y-3 text-[#8899AA]">
                                    {KEY_FEATURES.map((feat) => (
                                        <li key={feat.title} className="flex items-start gap-3">
                                            <div className="mt-1 bg-emerald-500/20 p-1 rounded-full shrink-0">
                                                <CheckCircle2 className="text-emerald-400" size={12} aria-hidden="true" />
                                            </div>
                                            <span><strong className="text-white">{feat.title}:</strong> {feat.desc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">Media Preview</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-video bg-[#131B2B] rounded-xl border border-[#2A3A4A] flex items-center justify-center group cursor-pointer relative overflow-hidden">
                                        <Play className="text-white/50 group-hover:text-white transition-all z-10" size={48} aria-hidden="true" />
                                        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                    </div>
                                    <div className="aspect-video bg-[#131B2B] rounded-xl border border-[#2A3A4A] flex items-center justify-center">
                                        <span className="text-[#556677] font-bold text-sm">Screenshot 1</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {activeTab === "Permissions" && (
                        <Card padding="lg">
                            <h3 className="text-lg font-bold text-white mb-2">Requested Scopes</h3>
                            <p className="text-[#8899AA] text-sm mb-6">This application requires the following access to your Kaarya workspace.</p>
                            <div className="space-y-4 font-mono text-sm max-w-xl">
                                {SCOPES.map((s) => (
                                    <div key={s.scope} className="flex justify-between items-center p-3 rounded-lg bg-[#131B2B] border border-[#2A3A4A]">
                                        <span className="text-[#CCDDEE]">{s.scope}</span>
                                        <Badge variant={s.access === "Write" ? "warning" : "success"}>{s.access}</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {activeTab === "Reviews (142)" && (
                        <Card padding="lg" className="text-center py-12">
                            <p className="text-[#8899AA] text-sm">Reviews coming soon.</p>
                        </Card>
                    )}
                </div>

                {/* Info Sidebar */}
                <div className="w-full md:w-72 shrink-0 space-y-6">
                    <Card padding="md">
                        <dl className="space-y-6">
                            <div>
                                <dt className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Developer</dt>
                                <dd>
                                    <a href="#" className="text-sm font-bold text-emerald-400 flex items-center gap-1 hover:underline">
                                        Greenhouse Software <ExternalLink size={12} aria-hidden="true" />
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Categories</dt>
                                <dd className="flex flex-wrap gap-2">
                                    <Badge variant="neutral">ATS</Badge>
                                    <Badge variant="neutral">Recruiting</Badge>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Support Resources</dt>
                                <dd>
                                    <ul className="space-y-3">
                                        <li><a href="#" className="text-sm text-[#8899AA] hover:text-white flex items-center gap-2"><ExternalLink size={14} aria-hidden="true" /> Setup Guide</a></li>
                                        <li><a href="#" className="text-sm text-[#8899AA] hover:text-white flex items-center gap-2"><ShieldCheck size={14} aria-hidden="true" /> Privacy Policy</a></li>
                                        <li><a href="#" className="text-sm text-[#8899AA] hover:text-white flex items-center gap-2"><ExternalLink size={14} aria-hidden="true" /> Contact Support</a></li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </Card>

                    <Card padding="md" className="text-center">
                        <Shield size={20} className="text-[#556677] mx-auto mb-2" aria-hidden="true" />
                        <p className="text-xs text-[#556677] font-bold tracking-wide">Verified App</p>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
