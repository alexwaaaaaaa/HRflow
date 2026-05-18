"use client";
import { useState } from "react";
import { Users, Save, Star, MessageSquare } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─── Static data ─────────────────────────────────────────────────────────────

const REPORTEE = {
    name: "Ravi Kumar",
    role: "Engineering Lead",
    avatar: "RK",
    dept: "Engineering",
    reportingTo: "Priya Mehta (Mgr)",
};

interface SkipSection {
    title: string;
    questions: string[];
}

const SKIP_SECTIONS: SkipSection[] = [
    {
        title: "Visibility & Impact",
        questions: [
            "How aware are you of this employee's work and contributions?",
            "Does this employee's work align with team/company goals?",
            "Has this employee's work had meaningful business impact?",
        ],
    },
    {
        title: "Leadership & Culture",
        questions: [
            "Does this employee exhibit leadership qualities outside their direct scope?",
            "Do they contribute positively to team culture and morale?",
            "Would you trust this employee with greater responsibility?",
        ],
    },
];

const AGREE_LABELS = [
    "",
    "Disagree",
    "Partially",
    "Neutral",
    "Agree",
    "Strongly Agree",
] as const;

const AGREE_COLOR: Record<string, string> = {
    high: "text-[#00E5A0]",
    mid: "text-[#FFB800]",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StarRowProps {
    question: string;
    sectionId: string;
    ratings: Record<string, number>;
    comments: Record<string, string>;
    onRate: (key: string, val: number) => void;
    onComment: (key: string, val: string) => void;
}

function StarRow({ question, sectionId, ratings, comments, onRate, onComment }: StarRowProps) {
    const key = `${sectionId}::${question}`;
    const val = ratings[key] ?? 0;
    const [hover, setHover] = useState(0);
    const colorClass = val >= 4 ? AGREE_COLOR.high : AGREE_COLOR.mid;

    return (
        <div className="py-4 border-b border-[#1A2A3A] last:border-0">
            <p className="text-sm text-white mb-3">{question}</p>
            <div
                className="flex items-center gap-2 mb-3"
                role="radiogroup"
                aria-label={`Rate: ${question}`}
            >
                {[1, 2, 3, 4, 5].map((n) => (
                    <label key={n}>
                        <input
                            type="radio"
                            name={key}
                            value={n}
                            className="sr-only"
                            onChange={() => onRate(key, n)}
                            checked={val === n}
                        />
                        <Star
                            size={22}
                            onMouseEnter={() => setHover(n)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => onRate(key, n)}
                            className={`cursor-pointer transition-colors ${
                                n <= (hover || val)
                                    ? "text-[#FFB800] fill-[#FFB800]"
                                    : "text-[#2A3A4A]"
                            }`}
                            aria-hidden="true"
                        />
                    </label>
                ))}
                {val > 0 && (
                    <span className={`text-xs font-bold ml-1 ${colorClass}`}>
                        {AGREE_LABELS[val]}
                    </span>
                )}
            </div>
            <label htmlFor={`sk-${key}`} className="sr-only">
                Comment
            </label>
            <input
                id={`sk-${key}`}
                type="text"
                value={comments[key] ?? ""}
                onChange={(e) => onComment(key, e.target.value)}
                placeholder="Additional context…"
                className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 py-2 text-xs text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF]"
            />
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SkipLevelReviewPage() {
    const toast = useToast();
    const [ratings, setRatings] = useState<Record<string, number>>({});
    const [comments, setComments] = useState<Record<string, string>>({});
    const [overallNote, setOverallNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const total = SKIP_SECTIONS.reduce((s, sec) => s + sec.questions.length, 0);
    const answered = Object.keys(ratings).length;

    const handleRate = (key: string, val: number) =>
        setRatings((r) => ({ ...r, [key]: val }));
    const handleComment = (key: string, val: string) =>
        setComments((c) => ({ ...c, [key]: val }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 1500));
            toast.show({
                variant: "success",
                title: "Review submitted",
                description: `Skip-level review for ${REPORTEE.name} submitted successfully.`,
            });
            setRatings({});
            setComments({});
            setOverallNote("");
        } catch {
            toast.show({ variant: "danger", title: "Submission failed", description: "Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Page
            title="Skip-level Review"
            subtitle={`${REPORTEE.name} · ${REPORTEE.role} · ${REPORTEE.dept}`}
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "Skip-level Review" },
            ]}
            maxWidth="800px"
            actions={
                <>






                    <span className="text-xs text-[#8899AA]">
                        {answered}/{total} answered
                    </span>
                    <Button
                        icon={<Save size={14} />}
                        type="submit"
                        form="skip-form"
                        isLoading={submitting}
                        loadingText="Submitting…"
                    >
                        Submit Review
                    </Button>
                </>
            }
        >
            {/* Progress bar */}
            <div
                className="h-1 bg-[#0066FF] rounded-full transition-all duration-500"
                role="progressbar"
                aria-valuenow={Math.round((answered / total) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Completion: ${answered} of ${total}`}
                style={{ width: `${Math.round((answered / total) * 100)}%` }}
            />

            {/* Subject card */}
            <Card padding="md" variant="elevated">
                <div className="flex items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full bg-[#0066FF]/20 flex items-center justify-center text-lg font-bold text-[#0066FF]"
                        aria-hidden="true"
                    >
                        {REPORTEE.avatar}
                    </div>
                    <div>
                        <p className="text-xs text-[#8899AA] mb-0.5">Skip-level review for</p>
                        <h2 className="text-base font-bold text-white">{REPORTEE.name}</h2>
                        <p className="text-xs text-[#8899AA]">
                            {REPORTEE.role} · {REPORTEE.dept} · Reports to {REPORTEE.reportingTo}
                        </p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 text-[#0066FF] text-xs">
                        <Users size={13} aria-hidden="true" /> Skip-level
                    </div>
                </div>
            </Card>

            <form id="skip-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                {SKIP_SECTIONS.map((sec) => (
                    <Card key={sec.title} padding="lg">
                        <h3 className="text-base font-semibold text-white mb-1">{sec.title}</h3>
                        <p className="text-xs text-[#8899AA] mb-4">
                            Rate 1 (Disagree) to 5 (Strongly Agree)
                        </p>
                        {sec.questions.map((q) => (
                            <StarRow
                                key={q}
                                question={q}
                                sectionId={sec.title}
                                ratings={ratings}
                                comments={comments}
                                onRate={handleRate}
                                onComment={handleComment}
                            />
                        ))}
                    </Card>
                ))}

                <Card padding="lg">
                    <label
                        htmlFor="skip-overall"
                        className="flex items-center gap-2 text-base font-semibold text-white mb-2"
                    >
                        <MessageSquare size={15} className="text-[#0066FF]" aria-hidden="true" />
                        Overall Observations
                    </label>
                    <textarea
                        id="skip-overall"
                        value={overallNote}
                        onChange={(e) => setOverallNote(e.target.value)}
                        rows={4}
                        placeholder="What patterns have you observed? Potential for growth? Any concerns?"
                        className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF] resize-none"
                    />
                </Card>
            </form>
        

        

        

        </Page>
    );
}
