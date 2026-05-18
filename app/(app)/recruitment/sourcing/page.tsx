"use client";

import { useState } from "react";
import { Filter, Mail, Plus, MapPin, Briefcase, ExternalLink, Sparkles } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

interface SourcingCandidate {
    id: string;
    name: string;
    role: string;
    company: string;
    exp: string;
    src: string;
    loc: string;
    match: number;
}

const SOURCED_CANDS: SourcingCandidate[] = [
    { id: "s1", name: "Ananya Desai", role: "Principal Engineer", company: "TechCorp", exp: "10 Yrs", src: "LinkedIn", loc: "Bengaluru", match: 95 },
    { id: "s2", name: "Rohan Khanna", role: "Lead DevOps", company: "CloudNet", exp: "8 Yrs", src: "GitHub", loc: "Pune", match: 92 },
    { id: "s3", name: "Siddharth Iyer", role: "Senior SDE", company: "FinTech Org", exp: "6 Yrs", src: "StackOverflow", loc: "Remote", match: 88 },
    { id: "s4", name: "Pooja Sharma", role: "Frontend Architect", company: "E-comm Inc", exp: "9 Yrs", src: "LinkedIn", loc: "Mumbai", match: 85 },
];

const ACTIVE_FILTERS = [
    "Location: India (Remote/Hybrid)",
    "Experience: 5-10 Yrs",
    "Skills: React OR Vue",
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function CandidateCard({ cand }: { cand: SourcingCandidate }) {
    return (
        <Card padding="md" className="group transition-colors hover:border-[#2A3A4A]">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex gap-4">
                    <div
                        aria-hidden="true"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A2A3A] text-sm font-bold text-white"
                    >
                        {cand.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                        <h4 className="flex items-center gap-2 text-lg font-bold text-white">
                            {cand.name}
                            <Badge variant="success">{cand.match}% Match</Badge>
                        </h4>
                        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[#8899AA]">
                            <Briefcase size={12} aria-hidden="true" /> {cand.role} @ {cand.company}
                        </p>
                        <p className="mt-1 flex items-center gap-3 text-xs text-[#445566]">
                            <span className="flex items-center gap-1">
                                <MapPin size={10} aria-hidden="true" /> {cand.loc}
                            </span>
                            <span>Exp: {cand.exp}</span>
                            <span className="flex items-center gap-1">
                                <ExternalLink size={10} aria-hidden="true" /> {cand.src}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] p-3">
                <p className="text-xs leading-relaxed text-[#8899AA]">
                    <strong className="font-medium text-white">Why they match:</strong> 6 years of deep
                    React ecosystem experience. Led architectural overhaul at {cand.company}. Mentions
                    advanced performance tuning and Webpack in recent GitHub commits.
                </p>
            </div>

            <div className="flex gap-3">
                <Button
                    icon={<Plus size={14} aria-hidden="true" />}
                    size="sm"
                    className="flex-1 justify-center"
                >
                    Add to Job
                </Button>
                <Button
                    variant="outline"
                    icon={<Mail size={14} aria-hidden="true" />}
                    size="sm"
                    className="flex-1 justify-center"
                >
                    Reach Out
                </Button>
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function CandidateSourcing() {
    const [query, setQuery] = useState("");

    return (
        <Page
            title="AI Talent Sourcing"
            subtitle="Discover passive candidates using AI-powered semantic search"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Sourcing" },
            ]}
            maxWidth="1200px"
            actions={
                <>






                    <Button variant="secondary">Saved Searches</Button>
                    <Button icon={<Sparkles size={14} aria-hidden="true" />}>AI Boolean Builder</Button>
                </>
            }
        >
            {/* Smart Search Bar */}
            <Card padding="lg" className="mb-8">
                <div className="relative mb-4">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Try: "Senior React Developer in Bengaluru with FinTech experience"'
                        aria-label="Search candidates"
                        className="h-12 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] pl-4 pr-28 text-sm text-white placeholder-[#445566] focus:border-[#0066FF] focus:outline-none"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Button size="sm">Search</Button>
                    </div>
                </div>

                {/* Active Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="mr-2 text-xs font-medium text-[#8899AA]">Filters:</span>
                    {ACTIVE_FILTERS.map((f) => (
                        <div
                            key={f}
                            className="flex items-center gap-1.5 rounded-lg bg-[#1A2A3A] px-3 py-1.5 text-xs font-medium text-white"
                        >
                            {f}{" "}
                            <button
                                type="button"
                                aria-label={`Remove filter: ${f}`}
                                className="ml-1 text-[#8899AA] hover:text-[#FF4444]"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={<Filter size={12} aria-hidden="true" />}
                    >
                        Add Filter
                    </Button>
                </div>
            </Card>

            {/* Results Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white">
                    Top Sourced Candidates{" "}
                    <span className="ml-2 text-xs text-[#8899AA]">(1,240 matches)</span>
                </h3>
                <div className="flex overflow-hidden rounded-lg border border-[#1A2A3A] bg-[#0D1928]">
                    <button
                        type="button"
                        className="bg-[#1A2A3A] px-3 py-1.5 text-xs font-medium text-white"
                        aria-pressed="true"
                    >
                        Best Match
                    </button>
                    <button
                        type="button"
                        className="px-3 py-1.5 text-xs font-medium text-[#8899AA] hover:bg-[#1A2A3A]/50"
                        aria-pressed="false"
                    >
                        Recently Active
                    </button>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {SOURCED_CANDS.map((cand) => (
                    <CandidateCard key={cand.id} cand={cand} />
                ))}
            </div>
        

        

        

        </Page>
    );
}
