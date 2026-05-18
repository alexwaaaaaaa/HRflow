"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Star, Send, ChevronRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ──────────────────────────────────────────────────────────────────

const giveFeedbackSchema = z.object({
    recipient: z.string().min(1, "Recipient is required"),
    type: z.enum(["praise", "constructive", "neutral"]),
    message: z.string().min(20, "Message must be at least 20 characters"),
    visibility: z.enum(["public", "private"]),
});

type GiveFeedbackValues = z.infer<typeof giveFeedbackSchema>;

// ─── Static data ─────────────────────────────────────────────────────────────

interface PendingPerson {
    name: string;
    role: string;
    avatar: string;
    due: string;
    type: "peer" | "manager" | "reportee";
}

const PENDING_LIST: PendingPerson[] = [
    { name: "Priya Mehta", role: "HR Admin", avatar: "PM", due: "Mar 15", type: "peer" },
    { name: "Sneha Rao", role: "Product Manager", avatar: "SR", due: "Mar 16", type: "manager" },
    { name: "Rahul Gupta", role: "Ops Lead", avatar: "RG", due: "Mar 18", type: "peer" },
];

const TYPE_VARIANT: Record<PendingPerson["type"], "info" | "success" | "warning"> = {
    peer: "info",
    manager: "success",
    reportee: "warning",
};

const RATING_CATEGORIES = ["Overall Performance", "Communication", "Collaboration", "Execution"] as const;

const TYPE_OPTIONS: { value: GiveFeedbackValues["type"]; label: string }[] = [
    { value: "praise", label: "Praise" },
    { value: "constructive", label: "Constructive" },
    { value: "neutral", label: "Neutral" },
];

const VISIBILITY_OPTIONS: { value: GiveFeedbackValues["visibility"]; label: string }[] = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StarRatingRowProps {
    label: string;
}

function StarRatingRow({ label }: StarRatingRowProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-white">{label}</span>
            <div
                className="flex items-center gap-1"
                role="radiogroup"
                aria-label={`Rate ${label}`}
            >
                {[1, 2, 3, 4, 5].map((n) => (
                    <label key={n}>
                        <input
                            type="radio"
                            name={label}
                            value={n}
                            className="sr-only"
                            onChange={() => setRating(n)}
                            checked={rating === n}
                        />
                        <Star
                            size={20}
                            onMouseEnter={() => setHover(n)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(n)}
                            className={`cursor-pointer transition-colors ${
                                n <= (hover || rating)
                                    ? "text-[#FFB800] fill-[#FFB800]"
                                    : "text-[#2A3A4A]"
                            }`}
                            aria-hidden="true"
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GiveFeedbackPage() {
    const toast = useToast();
    const [selected, setSelected] = useState<PendingPerson | null>(PENDING_LIST[0] ?? null);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<GiveFeedbackValues>({
        resolver: zodResolver(giveFeedbackSchema),
        defaultValues: {
            recipient: selected?.name ?? "",
            type: "praise",
            visibility: "private",
            message: "",
        },
    });

    const onSubmit = async (_data: GiveFeedbackValues) => {
        setSubmitting(true);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 1500));
            toast.show({
                variant: "success",
                title: "Feedback submitted",
                description: `Your feedback for ${selected?.name ?? "the recipient"} has been sent.`,
            });
            reset();
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
            title="Give 360° Feedback"
            subtitle={`You have ${PENDING_LIST.length} pending feedback requests`}
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "Give Feedback" },
            ]}
            maxWidth="1100px"
        >






            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
                {/* Left: Pending list */}
                <section aria-labelledby="pending-list-heading">
                    <h2
                        id="pending-list-heading"
                        className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-3 px-1"
                    >
                        Pending
                    </h2>
                    <ul role="list" className="space-y-2">
                        {PENDING_LIST.map((p) => (
                            <li key={p.name}>
                                <button
                                    type="button"
                                    onClick={() => setSelected(p)}
                                    aria-pressed={selected?.name === p.name}
                                    className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border transition-all ${
                                        selected?.name === p.name
                                            ? "border-[#9D00FF] bg-[#9D00FF]/10"
                                            : "border-[#1A2A3A] bg-[#0D1928] hover:border-[#2A3A4A]"
                                    }`}
                                >
                                    <div
                                        className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA] shrink-0"
                                        aria-hidden="true"
                                    >
                                        {p.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                                        <p className="text-[11px] text-[#8899AA]">{p.role}</p>
                                    </div>
                                    <div className="text-right shrink-0 space-y-1">
                                        <Badge variant={TYPE_VARIANT[p.type]}>{p.type}</Badge>
                                        <p className="text-[10px] text-[#FF4444]">Due {p.due}</p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Right: Quick submit form */}
                <section aria-labelledby="give-form-heading">
                    {selected ? (
                        <Card padding="lg">
                            <div className="flex items-center gap-3 mb-5">
                                <div
                                    className="w-12 h-12 rounded-full bg-[#9D00FF]/20 border border-[#9D00FF]/30 flex items-center justify-center text-lg font-bold text-[#9D00FF]"
                                    aria-hidden="true"
                                >
                                    {selected.avatar}
                                </div>
                                <div>
                                    <h2
                                        id="give-form-heading"
                                        className="text-base font-bold text-white"
                                    >
                                        {selected.name}
                                    </h2>
                                    <p className="text-xs text-[#8899AA]">
                                        {selected.role} · {selected.type} review
                                    </p>
                                </div>
                                <Link
                                    href={`/feedback/form?for=${encodeURIComponent(selected.name)}`}
                                    className="ml-auto text-xs text-[#9D00FF] border border-[#9D00FF]/30 bg-[#9D00FF]/10 px-3 py-1.5 rounded-lg hover:bg-[#9D00FF]/20 font-medium flex items-center gap-1"
                                >
                                    Full Form <ChevronRight size={11} aria-hidden="true" />
                                </Link>
                            </div>

                            <p className="text-sm text-[#8899AA] bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4 mb-5">
                                Give quick structured feedback or click &quot;Full Form&quot; for detailed
                                competency ratings.
                            </p>

                            {/* Star rating rows */}
                            <div className="space-y-4 mb-5">
                                {RATING_CATEGORIES.map((cat) => (
                                    <StarRatingRow key={cat} label={cat} />
                                ))}
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                                {/* Recipient (hidden, pre-filled) */}
                                <input type="hidden" {...register("recipient")} value={selected.name} />

                                {/* Type */}
                                <fieldset>
                                    <legend className="block text-xs font-semibold text-[#8899AA] mb-2">
                                        Feedback Type
                                    </legend>
                                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Feedback type">
                                        {TYPE_OPTIONS.map((opt) => (
                                            <label key={opt.value} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    value={opt.value}
                                                    {...register("type")}
                                                    className="sr-only peer"
                                                />
                                                <span className="px-3 py-1.5 rounded-lg border border-[#1A2A3A] text-xs font-semibold text-[#8899AA] peer-checked:border-[#9D00FF] peer-checked:bg-[#9D00FF]/10 peer-checked:text-white transition-colors cursor-pointer block">
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
                                    <label
                                        htmlFor="give-message"
                                        className="block text-xs font-semibold text-[#8899AA] mb-1.5"
                                    >
                                        Message <span className="text-[#445566]">(min 20 chars)</span>
                                    </label>
                                    <textarea
                                        id="give-message"
                                        rows={3}
                                        {...register("message")}
                                        placeholder="Add a comment about their performance…"
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
                                    <div className="flex gap-2" role="radiogroup" aria-label="Visibility">
                                        {VISIBILITY_OPTIONS.map((opt) => (
                                            <label key={opt.value} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    value={opt.value}
                                                    {...register("visibility")}
                                                    className="sr-only peer"
                                                />
                                                <span className="px-3 py-1.5 rounded-lg border border-[#1A2A3A] text-xs font-semibold text-[#8899AA] peer-checked:border-[#9D00FF] peer-checked:bg-[#9D00FF]/10 peer-checked:text-white transition-colors cursor-pointer block">
                                                    {opt.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.visibility && (
                                        <p className="mt-1 text-xs text-[#FF4444]" role="alert">
                                            {errors.visibility.message}
                                        </p>
                                    )}
                                </fieldset>

                                <Button
                                    type="submit"
                                    icon={<Send size={14} />}
                                    isLoading={submitting}
                                    loadingText="Submitting…"
                                    className="w-full justify-center"
                                >
                                    Submit Feedback
                                </Button>
                            </form>
                        </Card>
                    ) : (
                        <Card padding="lg">
                            <div className="flex items-center justify-center h-32 text-[#445566]">
                                <p className="text-sm">Select a person to give feedback</p>
                            </div>
                        </Card>
                    )}
                </section>
            </div>
        

        

        

        </Page>
    );
}
