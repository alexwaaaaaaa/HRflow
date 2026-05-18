"use client";

import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Save, Send } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

const CRITERIA = [
    { id: "c1", label: "React & Next.js Fundamentals", desc: "Hooks, SSR, Routing, Context" },
    { id: "c2", label: "System Design", desc: "Component architecture, State Management" },
    { id: "c3", label: "Communication & Clarity", desc: "Explaining thought process clearly" },
];

type Decision = "Hire" | "No Hire" | "Hold";

const DECISIONS: Array<{ id: Decision; icon: typeof ThumbsUp; colorClass: string; bgClass: string }> = [
    { id: "Hire", icon: ThumbsUp, colorClass: "text-[#00E5A0]", bgClass: "border-[#00E5A0] bg-[#00E5A0]/15" },
    { id: "Hold", icon: Star, colorClass: "text-[#FFB800]", bgClass: "border-[#FFB800] bg-[#FFB800]/15" },
    { id: "No Hire", icon: ThumbsDown, colorClass: "text-[#FF4444]", bgClass: "border-[#FF4444] bg-[#FF4444]/15" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function InterviewFeedback() {
    const toast = useToast();
    const [scores, setScores] = useState<Record<string, number>>({});
    const [decision, setDecision] = useState<Decision | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 1000));
            toast.show({
                variant: "success",
                title: "Scorecard submitted",
                description: "Your feedback for Rahul Sharma has been recorded.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Page
            title="Feedback: Rahul Sharma"
            subtitle="Technical Round · Sr. Frontend Engineer"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Interviews", href: "/recruitment/interviews" },
                { label: "Feedback" },
            ]}
            maxWidth="800px"
        >
            <div className="space-y-6">
                {/* Scorecard */}
                <Card padding="lg">
                    <h3 className="mb-4 font-semibold text-white">Competency Scorecard</h3>
                    <div className="space-y-6">
                        {CRITERIA.map((c) => (
                            <div key={c.id} className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="mb-1 text-sm font-medium text-white">{c.label}</p>
                                    <p className="text-[11px] text-[#445566]">{c.desc}</p>
                                </div>
                                <div className="flex shrink-0 gap-1" role="group" aria-label={`Score for ${c.label}`}>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setScores((p) => ({ ...p, [c.id]: s }))}
                                            aria-label={`${s} star${s !== 1 ? "s" : ""}`}
                                            aria-pressed={scores[c.id] === s}
                                            className={`flex h-10 w-10 flex-col items-center justify-center rounded-lg border transition-all hover:border-[#00E5A0] ${
                                                scores[c.id] === s
                                                    ? "border-[#00E5A0] bg-[#00E5A0]/20"
                                                    : "border-[#1A2A3A]"
                                            }`}
                                        >
                                            <Star
                                                size={12}
                                                aria-hidden="true"
                                                fill={(scores[c.id] ?? 0) >= s ? "#00E5A0" : "transparent"}
                                                color={(scores[c.id] ?? 0) >= s ? "#00E5A0" : "#445566"}
                                            />
                                            <span
                                                className={`mt-1 text-[9px] font-bold ${
                                                    (scores[c.id] ?? 0) >= s ? "text-[#00E5A0]" : "text-[#445566]"
                                                }`}
                                            >
                                                {s}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Detailed Notes */}
                <Card padding="lg">
                    <h3 className="mb-4 font-semibold text-white">Interview Notes</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="strengths" className="mb-1.5 flex justify-between text-xs font-medium text-[#8899AA]">
                                <span>Strengths</span>
                                <span className="text-[#00E5A0]">Good to hire</span>
                            </label>
                            <textarea
                                id="strengths"
                                rows={3}
                                placeholder="What did the candidate do well?"
                                className="w-full resize-none rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white focus:border-[#00E5A0] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="concerns" className="mb-1.5 flex justify-between text-xs font-medium text-[#8899AA]">
                                <span>Areas of Concern</span>
                                <span className="text-[#FF4444]">Red flags</span>
                            </label>
                            <textarea
                                id="concerns"
                                rows={3}
                                placeholder="Where did they struggle?"
                                className="w-full resize-none rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white focus:border-[#FF4444] focus:outline-none"
                            />
                        </div>
                    </div>
                </Card>

                {/* Final Recommendation */}
                <Card padding="lg">
                    <h3 className="mb-4 font-semibold text-white">Overall Recommendation</h3>
                    <div className="grid grid-cols-3 gap-4" role="group" aria-label="Hiring recommendation">
                        {DECISIONS.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setDecision(r.id)}
                                aria-pressed={decision === r.id}
                                className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${
                                    decision === r.id
                                        ? `${r.bgClass} ${r.colorClass}`
                                        : "border-[#1A2A3A] text-[#8899AA] hover:bg-[#1A2A3A]/30"
                                }`}
                            >
                                <r.icon size={24} aria-hidden="true" />
                                <span className="text-sm font-bold">{r.id}</span>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="secondary" icon={<Save size={16} aria-hidden="true" />}>
                        Save Draft
                    </Button>
                    <Button
                        icon={<Send size={16} aria-hidden="true" />}
                        isLoading={submitting}
                        loadingText="Submitting…"
                        onClick={handleSubmit}
                    >
                        Submit Scorecard
                    </Button>
                </div>
            </div>
        </Page>
    );
}
