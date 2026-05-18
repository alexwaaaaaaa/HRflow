"use client";

import { useState } from "react";
import { Navigation, Check, Globe } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

interface JobBoard {
    id: string;
    name: string;
    logo: string;
    colorClass: string;
    connected: boolean;
    cost: string;
}

const BOARDS: JobBoard[] = [
    { id: "linkedin", name: "LinkedIn Jobs", logo: "in", colorClass: "bg-[#0077b5]", connected: true, cost: "Included in ATS Plan" },
    { id: "indeed", name: "Indeed", logo: "id", colorClass: "bg-[#003A9B]", connected: true, cost: "Free (Organic)" },
    { id: "glassdoor", name: "Glassdoor", logo: "gd", colorClass: "bg-[#0CAA41]", connected: true, cost: "Free (Organic)" },
    { id: "naukri", name: "Naukri.com", logo: "nk", colorClass: "bg-[#275BB5]", connected: false, cost: "Requires API Key" },
    { id: "instahyre", name: "Instahyre", logo: "ih", colorClass: "bg-[#F05A28]", connected: false, cost: "Premium Add-on" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function JobBoardPublishing() {
    const [selected, setSelected] = useState<Record<string, boolean>>({
        linkedin: true,
        indeed: true,
    });

    const toggle = (id: string) => {
        if (!BOARDS.find((b) => b.id === id)?.connected) return;
        setSelected((p) => ({ ...p, [id]: !p[id] }));
    };

    const selectedCount = Object.values(selected).filter(Boolean).length;

    return (
        <Page
            title="Publish to Job Boards"
            subtitle="Distribute your job posting across multiple channels"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Jobs", href: "/recruitment/jobs" },
                { label: "Publish" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[500px_1fr]">
                {/* Publisher Configuration */}
                <div className="flex flex-col gap-6">
                    {/* Job summary */}
                    <Card padding="md" className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-white">Senior Frontend Engineer</p>
                            <p className="mt-1 text-xs text-[#8899AA]">REQ-2025-045 · Bengaluru (Remote)</p>
                        </div>
                        <Badge variant="success">Approved</Badge>
                    </Card>

                    {/* Channel selection */}
                    <Card padding="lg">
                        <h3 className="mb-4 text-sm font-semibold text-[#8899AA]">
                            Select Distribution Channels
                        </h3>
                        <div className="space-y-3">
                            {BOARDS.map((b) => (
                                <button
                                    key={b.id}
                                    type="button"
                                    onClick={() => toggle(b.id)}
                                    disabled={!b.connected}
                                    aria-pressed={selected[b.id] ?? false}
                                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                                        !b.connected
                                            ? "cursor-not-allowed border-[#1A2A3A] bg-[#060B14] opacity-50"
                                            : selected[b.id]
                                            ? "cursor-pointer border-[#0066FF] bg-[#0066FF]/5 shadow-[0_0_15px_rgba(0,102,255,0.1)]"
                                            : "cursor-pointer border-[#1A2A3A] bg-[#0D1928] hover:border-[#2A3A4A]"
                                    }`}
                                >
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white ${b.colorClass}`}
                                        aria-hidden="true"
                                    >
                                        {b.logo}
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center justify-between">
                                            <h4 className="text-sm font-bold text-white">{b.name}</h4>
                                            {!b.connected && (
                                                <span className="rounded bg-[#1A2A3A] px-2 py-0.5 text-[10px] font-bold text-[#8899AA]">
                                                    Not Connected
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-[#8899AA]">{b.cost}</p>
                                    </div>
                                    {b.connected && (
                                        <div
                                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                                selected[b.id]
                                                    ? "border-[#0066FF] bg-[#0066FF] text-white"
                                                    : "border-[#445566] text-transparent"
                                            }`}
                                            aria-hidden="true"
                                        >
                                            <Check size={12} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Budget Promotion */}
                    <Card padding="lg">
                        <h3 className="mb-4 text-sm font-semibold text-[#8899AA]">
                            Budget Promotion (Optional)
                        </h3>
                        <p className="mb-3 text-sm text-white">Boost visibility on LinkedIn &amp; Indeed</p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 justify-center">
                                $50 / day
                            </Button>
                            <Button variant="secondary" size="sm" className="flex-1 justify-center">
                                $100 / day
                            </Button>
                        </div>
                        <p className="mt-3 text-center text-[10px] text-[#445566]">
                            Estimated 400-600 extra applicants per week
                        </p>
                    </Card>

                    <Button
                        icon={<Navigation size={16} aria-hidden="true" />}
                        size="lg"
                        className="w-full justify-center"
                    >
                        Publish to {selectedCount} Channel{selectedCount !== 1 ? "s" : ""}
                    </Button>
                    <p className="text-center text-[10px] text-[#445566]">
                        Distribution takes approx 15-30 mins to reflect globally.
                    </p>
                </div>

                {/* Preview Panel */}
                <div className="hidden flex-col items-center lg:flex">
                    <div className="mb-4 flex w-full max-w-[600px] items-center justify-between text-sm font-medium text-[#8899AA]">
                        <span>Preview: Company Careers Page</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            icon={<Globe size={14} aria-hidden="true" />}
                            aria-label="Open preview in browser"
                        />
                    </div>
                    <div className="w-full max-w-[600px] min-h-[800px] overflow-hidden rounded-lg bg-white text-black shadow-2xl">
                        <div className="flex h-48 items-end border-b-4 border-[#0066FF] bg-gray-900 p-8">
                            <h1 className="text-3xl font-bold text-white">Senior Frontend Engineer</h1>
                        </div>
                        <div className="p-8">
                            <div className="mb-6 flex gap-4">
                                <span className="rounded bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">Engineering</span>
                                <span className="rounded bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">Bengaluru, KA</span>
                                <span className="rounded bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">Full-time</span>
                            </div>
                            <h3 className="mb-2 text-lg font-bold">About the Role</h3>
                            <p className="mb-4 text-sm text-gray-600">
                                We are looking for a Senior Frontend Engineer proficient in React and
                                Next.js to build state-of-the-art enterprise applications…
                            </p>
                            <h3 className="mb-2 mt-6 text-lg font-bold">Responsibilities</h3>
                            <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-gray-600">
                                <li>Architect robust, scalable UI systems</li>
                                <li>Mentor junior JS developers</li>
                                <li>Establish testing automation workflows</li>
                            </ul>
                            <div className="mt-8 border-t border-gray-200 pt-8">
                                <button className="h-12 w-full rounded bg-black font-bold text-white transition-colors hover:bg-gray-800">
                                    Apply with LinkedIn
                                </button>
                                <button className="mt-3 h-12 w-full rounded border-2 border-black font-bold text-black transition-colors hover:bg-gray-50">
                                    Apply Manually
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
