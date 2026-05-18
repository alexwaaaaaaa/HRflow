"use client";

import { useState } from "react";
import { Filter, MoreHorizontal, Star, Phone, Mail, Calendar } from "lucide-react";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

type Stage = "applied" | "screening" | "interview" | "offer" | "hired";

interface Candidate {
    id: string;
    name: string;
    exp: string;
    rating: number;
    match: number;
    source: string;
    stage: Stage;
}

const STAGES: Array<{ id: Stage; label: string; colorClass: string }> = [
    { id: "applied", label: "Applied", colorClass: "bg-[#445566]" },
    { id: "screening", label: "Screening", colorClass: "bg-[#0066FF]" },
    { id: "interview", label: "Interview", colorClass: "bg-[#9B59B6]" },
    { id: "offer", label: "Offer", colorClass: "bg-[#FFB800]" },
    { id: "hired", label: "Hired", colorClass: "bg-[#00E5A0]" },
];

const INIT_CANDS: Candidate[] = [
    { id: "c1", name: "Rahul Sharma", stage: "screening", exp: "5 Yrs", rating: 4, match: 88, source: "LinkedIn" },
    { id: "c2", name: "Anjali Singh", stage: "applied", exp: "4 Yrs", rating: 0, match: 72, source: "Careers Page" },
    { id: "c3", name: "Vikram Reddy", stage: "interview", exp: "6 Yrs", rating: 5, match: 95, source: "Referral" },
    { id: "c4", name: "Neha Gupta", stage: "offer", exp: "5 Yrs", rating: 4, match: 90, source: "LinkedIn" },
    { id: "c5", name: "Karan Patel", stage: "screening", exp: "3 Yrs", rating: 3, match: 65, source: "Indeed" },
    { id: "c6", name: "Suresh Rao", stage: "applied", exp: "7 Yrs", rating: 0, match: 82, source: "LinkedIn" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
    if (count === 0) return null;
    return (
        <div className="mb-3 flex gap-0.5" aria-label={`${count} of 5 stars`}>
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={10}
                    aria-hidden="true"
                    className={
                        s <= count
                            ? "fill-[#FFB800] text-[#FFB800]"
                            : "fill-[#1A2A3A] text-[#1A2A3A]"
                    }
                />
            ))}
        </div>
    );
}

function CandidateCard({ cand, onDragStart }: { cand: Candidate; onDragStart: (e: React.DragEvent, id: string) => void }) {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, cand.id)}
            className="cursor-grab rounded-xl border border-[#1A2A3A] bg-[#0A1420] p-4 transition-all hover:border-[#2A3A4A] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] active:cursor-grabbing"
        >
            <div className="mb-3 flex items-start justify-between">
                <div>
                    <p className="text-sm font-semibold text-white">{cand.name}</p>
                    <p className="mt-0.5 text-[11px] text-[#8899AA]">
                        {cand.exp} · {cand.source}
                    </p>
                </div>
                <div className="flex h-8 w-8 shrink-0 flex-col items-center justify-center rounded-lg bg-[#1A2A3A] text-[9px] font-bold text-[#0066FF]">
                    <span>{cand.match}%</span>
                    <span className="scale-[0.8] font-normal leading-none opacity-80">Match</span>
                </div>
            </div>
            <StarRating count={cand.rating} />
            <div className="flex items-center gap-2 border-t border-[#1A2A3A] pt-3">
                <Button
                    variant="ghost"
                    size="sm"
                    icon={<Mail size={12} aria-hidden="true" />}
                    aria-label={`Email ${cand.name}`}
                    className="flex-1 justify-center"
                />
                <Button
                    variant="ghost"
                    size="sm"
                    icon={<Phone size={12} aria-hidden="true" />}
                    aria-label={`Call ${cand.name}`}
                    className="flex-1 justify-center"
                />
                <Button
                    variant="ghost"
                    size="sm"
                    icon={<Calendar size={12} aria-hidden="true" />}
                    aria-label={`Schedule interview with ${cand.name}`}
                    className="flex-1 justify-center"
                />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function JobKanbanBoard() {
    const [cands, setCands] = useState(INIT_CANDS);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedItem(id);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, stageId: Stage) => {
        e.preventDefault();
        if (draggedItem) {
            setCands((prev) =>
                prev.map((c) => (c.id === draggedItem ? { ...c, stage: stageId } : c))
            );
            setDraggedItem(null);
        }
    };

    return (
        <Page
            title="Senior Frontend Engineer"
            subtitle="Bengaluru, Hybrid · Engineering · Posted 12 Mar 2025"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Jobs", href: "/recruitment/jobs" },
                { label: "Senior Frontend Engineer" },
            ]}
            maxWidth="1600px"
            actions={
                <>






                    <Badge variant="success">Active</Badge>
                    <Button
                        variant="secondary"
                        size="sm"
                        icon={<Filter size={14} aria-hidden="true" />}
                    >
                        Filter
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={<MoreHorizontal size={16} aria-hidden="true" />}
                        aria-label="More actions"
                    />
                </>
            }
        >
            {/* Kanban Board */}
            <div
                className="flex gap-6 overflow-x-auto pb-4"
                role="region"
                aria-label="Candidate pipeline kanban board"
            >
                {STAGES.map((stage) => {
                    const stageCands = cands.filter((c) => c.stage === stage.id);
                    return (
                        <div
                            key={stage.id}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, stage.id)}
                            className="flex h-full w-[300px] shrink-0 flex-col rounded-2xl border border-[#1A2A3A] bg-[#0D1928]"
                            aria-label={`${stage.label} column`}
                        >
                            <div className="flex items-center gap-3 border-b border-[#1A2A3A] p-4">
                                <div
                                    className={`h-3 w-3 rounded-full ${stage.colorClass}`}
                                    aria-hidden="true"
                                />
                                <h3 className="flex-1 text-sm font-semibold text-white">
                                    {stage.label}
                                </h3>
                                <span className="rounded-full bg-[#1A2A3A] px-2 py-0.5 text-xs font-bold text-[#8899AA]">
                                    {stageCands.length}
                                </span>
                            </div>
                            <div className="flex-1 space-y-3 overflow-y-auto p-3">
                                {stageCands.map((cand) => (
                                    <CandidateCard
                                        key={cand.id}
                                        cand={cand}
                                        onDragStart={handleDragStart}
                                    />
                                ))}
                                {stageCands.length === 0 && (
                                    <div className="rounded-xl border-2 border-dashed border-[#1A2A3A] p-4 text-center">
                                        <p className="text-xs text-[#445566]">
                                            No candidates in {stage.label}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        

        

        

        </Page>
    );
}
