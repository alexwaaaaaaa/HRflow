"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Send, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ──────────────────────────────────────────────────────────────────

const feedbackSchema = z.object({
    recipient: z.string().min(1, "Recipient is required"),
    type: z.enum(["praise", "constructive", "neutral"]),
    message: z.string().min(20, "Message must be at least 20 characters"),
    visibility: z.enum(["public", "private"]),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

// ─── Static data ─────────────────────────────────────────────────────────────

interface Section {
    id: string;
    title: string;
    questions: string[];
}

const SECTIONS: Section[] = [
    {
        id: "leadership",
        title: "Leadership & Ownership",
        questions: [
            "Takes initiative and drives outcomes without being asked",
            "Ownership — sees problems through to resolution",
            "Handles ambiguity and uncertainty effectively",
        ],
    },
    {
        id: "collaboration",
        title: "Collaboration & Communication",
        questions: [
            "Communicates clearly and concisely (written & verbal)",
            "Works effectively with cross-functional teams",
            "Actively listens and considers others' perspectives",
        ],
    },
    {
        id: "execution",
        title: "Execution & Results",
        questions: [
            "Consistently delivers high-quality work on time",
            "Sets and achieves measurable goals",
            "Prioritizes effectively and adapts to change",
        ],
    },
    {
        id: "growth",
        title: "Growth & Learning",
        questions: [
            "Proactively seeks feedback and acts on it",
            "Continuously upgrades skills and knowledge",
            "Encourages growth in teammates",
        ],
    },
];

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"] as const;

const TYPE_OPTIONS: { value: FeedbackFormValues["type"]; label: string }[] = [
    { value: "praise", label: "Praise" },
    { value: "constructive", label: "Constructive" },
    { value: "neutral", label: "Neutral" },
];

const VISIBILITY_OPTIONS: { value: FeedbackFormValues["visibility"]; label: string; desc: string }[] = [
    { value: "public", label: "Public", desc: "Visible to the recipient and their manager" },
    { value: "private", label: "Private", desc: "Visible to HR and the recipient only" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StarRatingRowProps {
    question: string;
    sectionId: string;
    ratings: Record<string, number>;
    comments: Record<string, string>;
    onRate: (key: string, val: number) => void;
    onComment: (key: string, val: string) => void;
}

function StarRatingRow({ question, sectionId, ratings, comments, onRate, onComment }: StarRatingRowProps) {
    const key = `${sectionId}::${question}`;
    const val = ratings[key] ?? 0;
    const [hover, setHover] = useState(0);

    return (
        <div className="py-4 border-b border-[#1A2A3A] last:border-0">
            <p className="text-sm text-white mb-3">{question}</p>
            <div className="flex items-center gap-3">
                <div
                    className="flex items-center gap-1.5"
                    role="radiogroup"
                    aria-label={`Rating for: ${question}`}
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
                </div>
                {val > 0 && (
                    <span className="text-xs font-bold text-[#FFB800]">{RATING_LABELS[val]}</span>
                )}
            </div>
            <div className="mt-3">
                <label htmlFor={`comment-${key}`} className="sr-only">
                    Comment for: {question}
                </label>
                <input
                    id={`comment-${key}`}
                    type="text"
                    value={comments[key] ?? ""}
                    onChange={(e) => onComment(key, e.target.value)}
                    placeholder="Add specific evidence or example…"
                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-lg px-3 py-2 text-xs text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF]"
                />
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedbackFormPage() {
    const toast = useToast();
    const [ratings, setRatings] = useState<Record<string, number>>({});
    const [comments, setComments] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const totalQuestions = SECTIONS.reduce((s, sec) => s + sec.questions.length, 0);
    const answeredCount = Object.keys(ratings).length;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FeedbackFormValues>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            recipient: "Priya Mehta",
            type: "praise",
            visibility: "private",
            message: "",
        },
    });

    const handleRate = (key: string, val: number) =>
        setRatings((r) => ({ ...r, [key]: val }));
    const handleComment = (key: string, val: string) =>
        setComments((c) => ({ ...c, [key]: val }));

    const onSubmit = async (_data: FeedbackFormValues) => {
        setSubmitting(true);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 1500));
            toast.show({
                variant: "success",
                title: "Feedback submitted",
                description: "Your feedback has been sent successfully.",
            });
            reset();
            setRatings({});
            setComments({});
        } catch {
            toast.show({
                variant: "danger",
                title: "Submission failed",
                description: "Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Page
            title="Feedback Form"
            subtitle="Priya Mehta · HR Admin · Peer Review · Mid-Year 2025"
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "Give Feedback", href: "/feedback/give" },
                { label: "Form" },
            ]}
            maxWidth="800px"
            actions={
                <>






                    <span className="text-xs text-[#8899AA]">
                        {answeredCount} / {totalQuestions} answered
                    </span>
                    <Button
                        variant="secondary"
                        size="sm"
                        icon={<Save size={12} />}
                        type="button"
                    >
                        Save Draft
                    </Button>
                    <Button
                        icon={<Send size={14} />}
                        type="submit"
                        form="feedback-form"
                        isLoading={submitting}
                        loadingText="Submitting…"
                    >
                        Submit
                    </Button>
                </>
            }
        >
            {/* Progress bar */}
            <div
                className="h-1 bg-[#00E5A0] rounded-full transition-all duration-500"
                role="progressbar"
                aria-valuenow={Math.round((answeredCount / totalQuestions) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Form completion: ${Math.round((answeredCount / totalQuestions) * 100)}%`}
                style={{ width: `${Math.round((answeredCount / totalQuestions) * 100)}%` }}
            />

            {/* Subject card */}
            <Card padding="md" variant="elevated">
                <div className="flex items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full bg-[#9D00FF]/20 flex items-center justify-center text-lg font-bold text-[#9D00FF]"
                        aria-hidden="true"
                    >
                        PM
                    </div>
                    <div>
                        <p className="text-xs text-[#8899AA] mb-0.5">Giving feedback to</p>
                        <h2 className="text-base font-bold text-white">Priya Mehta</h2>
                        <p className="text-xs text-[#8899AA]">HR Admin · Peer Review · Mid-Year 2025</p>
                    </div>
                </div>
            </Card>

            <form id="feedback-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                {/* Core fields */}
                <Card padding="lg">
                    <h3 className="text-base font-semibold text-white mb-4">Feedback Details</h3>
                    <div className="space-y-4">
                        {/* Recipient */}
                        <div>
                            <label htmlFor="fb-recipient" className="block text-xs font-semibold text-[#8899AA] mb-1.5">
                                Recipient
                            </label>
                            <input
                                id="fb-recipient"
                                type="text"
                                {...register("recipient")}
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF]"
                            />
                            {errors.recipient && (
                                <p className="mt-1 text-xs text-[#FF4444]" role="alert">
                                    {errors.recipient.message}
                                </p>
                            )}
                        </div>

                        {/* Type */}
                        <fieldset>
                            <legend className="block text-xs font-semibold text-[#8899AA] mb-2">
                                Feedback Type
                            </legend>
                            <div
                                className="flex flex-wrap gap-2"
                                role="radiogroup"
                                aria-label="Feedback type"
                            >
                                {TYPE_OPTIONS.map((opt) => (
                                    <label key={opt.value} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            value={opt.value}
                                            {...register("type")}
                                            className="sr-only peer"
                                        />
                                        <span className="px-4 py-2 rounded-xl border border-[#1A2A3A] text-xs font-semibold text-[#8899AA] peer-checked:border-[#9D00FF] peer-checked:bg-[#9D00FF]/10 peer-checked:text-white transition-colors cursor-pointer block">
                                            {opt.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.type && (
                                <p className="mt-1 text-xs text-[#FF4444]" role="alert">
                                    {errors.type.message}
                                </p>
                            )}
                        </fieldset>

                        {/* Message */}
                        <div>
                            <label htmlFor="fb-message" className="block text-xs font-semibold text-[#8899AA] mb-1.5">
                                Message <span className="text-[#445566]">(min 20 chars)</span>
                            </label>
                            <textarea
                                id="fb-message"
                                rows={4}
                                {...register("message")}
                                placeholder="Share your feedback — be specific and constructive…"
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF] resize-none"
                            />
                            {errors.message && (
                                <p className="mt-1 text-xs text-[#FF4444]" role="alert">
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        {/* Visibility */}
                        <fieldset>
                            <legend className="block text-xs font-semibold text-[#8899AA] mb-2">
                                Visibility
                            </legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {VISIBILITY_OPTIONS.map((opt) => (
                                    <label key={opt.value} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            value={opt.value}
                                            {...register("visibility")}
                                            className="sr-only peer"
                                        />
                                        <div className="p-3 rounded-xl border border-[#1A2A3A] peer-checked:border-[#9D00FF] peer-checked:bg-[#9D00FF]/10 transition-colors">
                                            <p className="text-sm font-semibold text-white">{opt.label}</p>
                                            <p className="text-xs text-[#8899AA] mt-0.5">{opt.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.visibility && (
                                <p className="mt-1 text-xs text-[#FF4444]" role="alert">
                                    {errors.visibility.message}
                                </p>
                            )}
                        </fieldset>
                    </div>
                </Card>

                {/* Competency sections */}
                {SECTIONS.map((sec) => (
                    <Card key={sec.id} padding="lg">
                        <h3
                            id={`section-${sec.id}`}
                            className="text-base font-semibold text-white mb-1"
                        >
                            {sec.title}
                        </h3>
                        <p className="text-xs text-[#8899AA] mb-4">
                            Rate 1–5 and provide specific examples where possible.
                        </p>
                        {sec.questions.map((q) => (
                            <StarRatingRow
                                key={q}
                                question={q}
                                sectionId={sec.id}
                                ratings={ratings}
                                comments={comments}
                                onRate={handleRate}
                                onComment={handleComment}
                            />
                        ))}
                    </Card>
                ))}

                {/* Overall note */}
                <Card padding="lg">
                    <label
                        htmlFor="overall-note"
                        className="block text-base font-semibold text-white mb-2"
                    >
                        Overall Comments
                    </label>
                    <p className="text-xs text-[#8899AA] mb-3">
                        What are this person&apos;s biggest strengths? Any areas for development?
                    </p>
                    <textarea
                        id="overall-note"
                        rows={5}
                        placeholder="Share your overall impression, strengths, and growth areas…"
                        className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF] resize-none"
                    />
                </Card>
            </form>
        

        

        

        </Page>
    );
}
