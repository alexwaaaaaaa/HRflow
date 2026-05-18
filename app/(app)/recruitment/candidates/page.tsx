"use client";

import { useState } from "react";
import { Mail, Star, ExternalLink, MoreVertical, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

type Stage = "Applied" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected";

interface Candidate {
    id: string;
    name: string;
    initials: string;
    role: string;
    stage: Stage;
    rating: number;
    src: string;
    applied: string;
}

const STAGE_VARIANT: Record<Stage, "neutral" | "info" | "purple" | "warning" | "success" | "danger"> = {
    Applied: "neutral",
    Screening: "info",
    Interview: "purple",
    Offer: "warning",
    Hired: "success",
    Rejected: "danger",
};

const CANDIDATES: Candidate[] = [
    { id: "C-1045", name: "Rahul Sharma", initials: "RS", role: "Senior Frontend Engineer", stage: "Interview", rating: 4, src: "Careers Page", applied: "12 Mar 2025" },
    { id: "C-1046", name: "Anjali Singh", initials: "AS", role: "Product Marketing Mgr", stage: "Screening", rating: 0, src: "LinkedIn", applied: "11 Mar 2025" },
    { id: "C-1047", name: "Vikram Reddy", initials: "VR", role: "Senior Frontend Engineer", stage: "Offer", rating: 5, src: "Referral", applied: "05 Mar 2025" },
    { id: "C-1048", name: "Neha Gupta", initials: "NG", role: "HR Business Partner", stage: "Applied", rating: 0, src: "Indeed", applied: "14 Mar 2025" },
    { id: "C-1049", name: "Karan Patel", initials: "KP", role: "Backend Engineer (Go)", stage: "Interview", rating: 3, src: "Careers Page", applied: "08 Mar 2025" },
    { id: "C-1050", name: "Priya Nair", initials: "PN", role: "Enterprise Sales Rep", stage: "Rejected", rating: 2, src: "LinkedIn", applied: "01 Mar 2025" },
];

function Stars({ count, label }: { count: number; label: string }) {
    return (
        <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${count} of 5 stars · ${label}`}>
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={11}
                    aria-hidden="true"
                    className={s <= count ? "fill-[#FFB800] text-[#FFB800]" : "fill-[#1A2A3A] text-[#1A2A3A]"}
                />
            ))}
        </span>
    );
}

const COLUMNS: Column<Candidate>[] = [
    {
        key: "candidate",
        label: "Candidate",
        render: (c) => (
            <div className="flex items-center gap-3">
                <div
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2A3A] text-xs font-bold text-[#8899AA]"
                >
                    {c.initials}
                </div>
                <div>
                    <p className="text-sm font-semibold text-white">{c.name}</p>
                    <p className="text-[11px] text-[#7a8fa6]">{c.id}</p>
                </div>
            </div>
        ),
        sortable: true,
        sortValue: (c) => c.name,
    },
    {
        key: "role",
        label: "Applied for",
        render: (c) => <span className="text-sm font-medium text-[#8899AA]">{c.role}</span>,
        sortable: true,
        sortValue: (c) => c.role,
    },
    {
        key: "stage",
        label: "Stage",
        align: "center",
        render: (c) => <Badge variant={STAGE_VARIANT[c.stage]}>{c.stage}</Badge>,
    },
    {
        key: "rating",
        label: "Rating",
        align: "center",
        render: (c) => <Stars count={c.rating} label={`${c.name} rating`} />,
    },
    {
        key: "source",
        label: "Source / Date",
        render: (c) => (
            <div>
                <p className="text-xs text-white">{c.src}</p>
                <p className="text-[10px] text-[#7a8fa6]">{c.applied}</p>
            </div>
        ),
        hideOnMobile: true,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (c) => (
            <div className="inline-flex items-center gap-2">
                <button
                    type="button"
                    aria-label={`Email ${c.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A2A3A] text-[#8899AA] transition-colors hover:bg-[#243040] hover:text-white"
                >
                    <Mail size={14} aria-hidden="true" />
                </button>
                <button
                    type="button"
                    aria-label={`Open ${c.name} profile`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0066FF] text-white transition-colors hover:bg-[#0052cc]"
                >
                    <ExternalLink size={14} aria-hidden="true" />
                </button>
                <button
                    type="button"
                    aria-label={`More actions for ${c.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7a8fa6] transition-colors hover:text-white"
                >
                    <MoreVertical size={14} aria-hidden="true" />
                </button>
            </div>
        ),
    },
];

const STAGE_FILTERS: ReadonlyArray<"All" | Stage> = ["All", "Applied", "Screening", "Interview", "Offer", "Hired"];

export default function CandidateListPage() {
    const [stage, setStage] = useState<"All" | Stage>("All");
    const filtered = stage === "All" ? CANDIDATES : CANDIDATES.filter((c) => c.stage === stage);

    return (
        <Page
            title="Candidate database"
            subtitle="Central repository of all applicants across open and past jobs"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Candidates" },
            ]}
            maxWidth="1300px"
            actions={
                <>






                    <Button variant="secondary" icon={<Download size={14} />}>Export CSV</Button>
                    <Button>Add candidate</Button>
                </>
            }
        >
            <Card padding="lg">
                <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter by stage">
                    {STAGE_FILTERS.map((s) => {
                        const active = stage === s;
                        return (
                            <button
                                key={s}
                                role="tab"
                                aria-selected={active}
                                onClick={() => setStage(s)}
                                className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-colors ${
                                    active
                                        ? "border-[#0066FF] bg-[#0066FF] text-white"
                                        : "border-[#1A2A3A] bg-[#0D1928] text-[#8899AA] hover:border-[#2A3A4A]"
                                }`}
                            >
                                {s}
                            </button>
                        );
                    })}
                </div>
                <DataTable<Candidate>
                    data={filtered}
                    columns={COLUMNS}
                    rowKey={(c) => c.id}
                    searchable
                    searchPlaceholder="Search candidate name, role, source…"
                    aria-label="Candidates"
                />
            </Card>
        

        

        

        </Page>
    );
}
