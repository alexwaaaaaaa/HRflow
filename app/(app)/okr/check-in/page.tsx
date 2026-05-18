"use client";

import { CheckCircle2, Clock, Save, Target } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const checkInSchema = z.object({
    progress: z.number().min(0).max(100),
    status: z.enum(["on-track", "at-risk", "behind"]),
    notes: z.string().min(5, "Please add at least 5 characters").max(1000),
    confidence: z.number().min(1).max(5),
});

type CheckInValues = z.infer<typeof checkInSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const CHECKINS = [
    { date: "Feb 24, 2025", note: "Closed 3 new enterprise accounts. Sales cycle still long at >35 days.", confidence: 3, progress: 55 },
    { date: "Feb 17, 2025", note: "Good week, completed NPS survey campaign. Score jumped to 51.", confidence: 4, progress: 48 },
    { date: "Feb 10, 2025", note: "Blocked on IT for CRM access. Escalated. Expect resolution next week.", confidence: 2, progress: 42 },
];

const CONF_LABELS = ["", "Low", "Fair", "Mid", "Good", "High"] as const;

// Static color maps — no template literals
const CONF_TEXT: Record<number, string> = {
    1: "text-[#FF4444]",
    2: "text-[#FF4444]",
    3: "text-[#FFB800]",
    4: "text-[#00E5A0]",
    5: "text-[#00E5A0]",
};

const CONF_SELECTED_STYLE: Record<number, string> = {
    1: "border-[#FF4444] bg-[#FF4444]/10 text-[#FF4444]",
    2: "border-[#FF4444] bg-[#FF4444]/10 text-[#FF4444]",
    3: "border-[#FFB800] bg-[#FFB800]/10 text-[#FFB800]",
    4: "border-[#00E5A0] bg-[#00E5A0]/10 text-[#00E5A0]",
    5: "border-[#00E5A0] bg-[#00E5A0]/10 text-[#00E5A0]",
};

const STATUS_OPTIONS = [
    { value: "on-track", label: "On Track" },
    { value: "at-risk", label: "At Risk" },
    { value: "behind", label: "Behind" },
] as const;

// Fixed check-in date — no Date.now() in render
const CHECKIN_DATE = "Mar 03, 2025";
const CYCLE_WEEK = "Week 8 / 12";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function PastCheckIn({ item }: { item: typeof CHECKINS[number] }) {
    return (
        <li className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#8899AA]">{item.date}</span>
                <span className={`text-xs font-bold ${CONF_TEXT[item.confidence]}`}>
                    Confidence: {CONF_LABELS[item.confidence]}
                </span>
            </div>
            <p className="text-sm text-white">{item.note}</p>
            <div className="mt-2 flex items-center gap-2">
                <div
                    className="flex-1 h-1 bg-[#1A2A3A] rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={item.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Progress at check-in: ${item.progress}%`}
                >
                    <div className="h-full rounded-full bg-[#00E5A0]" style={{ width: `${item.progress}%` }} />
                </div>
                <span className="text-[11px] text-[#8899AA] shrink-0">{item.progress}%</span>
            </div>
        </li>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OKRCheckInPage() {
    const toast = useToast();

    const { control, handleSubmit, register, formState: { isSubmitting, errors } } = useForm<CheckInValues>({
        resolver: zodResolver(checkInSchema),
        defaultValues: {
            progress: 60,
            status: "on-track",
            notes: "",
            confidence: 3,
        },
    });

    const onSubmit = async (_data: CheckInValues) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 1000));
        toast.show({
            variant: "success",
            title: "Check-in submitted",
            description: "Your OKR check-in has been recorded successfully.",
        });
    };

    return (
        <Page
            title="OKR Check-in"
            subtitle="Record your weekly progress update"
            breadcrumbs={[
                { label: "OKRs", href: "/okr/dashboard" },
                { label: "My OKRs", href: "/okr/my-okrs" },
                { label: "Check-in" },
            ]}
            maxWidth="800px"
            actions={
                <Button
                    type="submit"
                    form="checkin-form"
                    isLoading={isSubmitting}
                    loadingText="Submitting…"
                    icon={<Save size={14} />}
                >
                    Submit Check-in
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Objective Context */}
                <Card padding="md">
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#00E5A0]/10 flex items-center justify-center shrink-0" aria-hidden="true">
                            <Target size={16} className="text-[#00E5A0]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#8899AA] mb-0.5">Objective</p>
                            <h2 className="text-base font-bold text-white">Drive 40% growth in my product segment</h2>
                            <p className="text-xs text-[#8899AA] mt-1">Q1 2025 · Current Progress: <strong className="text-white">60%</strong></p>
                        </div>
                    </div>
                </Card>

                {/* Check-in Form */}
                <form id="checkin-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                    {/* Progress */}
                    <Card padding="md">
                        <label htmlFor="checkin-progress" className="block text-sm font-semibold text-white mb-3">
                            Progress (0–100%)
                        </label>
                        <Controller
                            control={control}
                            name="progress"
                            render={({ field }) => (
                                <div className="flex items-center gap-4">
                                    <input
                                        id="checkin-progress"
                                        type="range"
                                        min={0}
                                        max={100}
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="flex-1 accent-[#00e5a0]"
                                        aria-valuenow={field.value}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                    <span className="text-lg font-bold text-[#00E5A0] w-12 text-right">{field.value}%</span>
                                </div>
                            )}
                        />
                        {errors.progress && <p className="mt-1 text-xs text-red-400" role="alert">{errors.progress.message}</p>}
                    </Card>

                    {/* Status */}
                    <Card padding="md">
                        <fieldset>
                            <legend className="text-sm font-semibold text-white mb-3">Status</legend>
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="OKR status">
                                        {STATUS_OPTIONS.map((opt) => (
                                            <label key={opt.value} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value={opt.value}
                                                    checked={field.value === opt.value}
                                                    onChange={() => field.onChange(opt.value)}
                                                    className="sr-only"
                                                />
                                                <span
                                                    className={`inline-flex items-center px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                                                        field.value === opt.value
                                                            ? "border-[#00e5a0] bg-[#00e5a0]/10 text-[#00e5a0]"
                                                            : "border-[#1A2A3A] text-[#8899AA] hover:border-[#2A3A4A]"
                                                    }`}
                                                >
                                                    {opt.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            />
                        </fieldset>
                    </Card>

                    {/* Notes */}
                    <Card padding="md">
                        <label htmlFor="checkin-notes" className="block text-sm font-semibold text-white mb-3">
                            Check-in Note <span className="text-red-400" aria-label="required">*</span>
                        </label>
                        <textarea
                            id="checkin-notes"
                            {...register("notes")}
                            placeholder="What did you accomplish this week? Any blockers? What's your plan ahead?"
                            rows={4}
                            aria-invalid={!!errors.notes}
                            aria-describedby={errors.notes ? "notes-error" : undefined}
                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00e5a0] resize-none"
                        />
                        {errors.notes && (
                            <p id="notes-error" className="mt-1 text-xs text-red-400" role="alert">{errors.notes.message}</p>
                        )}
                    </Card>

                    {/* Confidence */}
                    <Card padding="md">
                        <fieldset>
                            <legend className="text-sm font-semibold text-white mb-4">How confident are you of achieving this OKR?</legend>
                            <Controller
                                control={control}
                                name="confidence"
                                render={({ field }) => (
                                    <div className="flex items-center gap-2" role="radiogroup" aria-label="Confidence level">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <label key={n} className="flex-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="confidence"
                                                    value={n}
                                                    checked={field.value === n}
                                                    onChange={() => field.onChange(n)}
                                                    className="sr-only"
                                                />
                                                <div
                                                    className={`flex flex-col items-center p-3 rounded-xl border transition-all text-xs font-bold ${
                                                        field.value === n
                                                            ? CONF_SELECTED_STYLE[n]
                                                            : "border-[#1A2A3A] text-[#445566] hover:border-[#2A3A4A]"
                                                    }`}
                                                    aria-hidden="true"
                                                >
                                                    <span className="text-lg leading-none mb-0.5">{n}</span>
                                                    <span className="text-[10px]">{CONF_LABELS[n]}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            />
                        </fieldset>
                    </Card>

                    {/* Date & Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card padding="md">
                            <div className="flex items-center gap-3">
                                <Clock size={16} className="text-[#8899AA]" aria-hidden="true" />
                                <div>
                                    <p className="text-[10px] text-[#8899AA] uppercase tracking-wider mb-0.5">Check-in Date</p>
                                    <p className="text-sm font-bold text-white">{CHECKIN_DATE}</p>
                                </div>
                            </div>
                        </Card>
                        <Card padding="md">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                <div>
                                    <p className="text-[10px] text-[#8899AA] uppercase tracking-wider mb-0.5">Cycle Progress</p>
                                    <p className="text-sm font-bold text-white">{CYCLE_WEEK}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </form>

                {/* Past Check-ins */}
                <section aria-labelledby="past-checkins-heading">
                    <h2 id="past-checkins-heading" className="text-sm font-semibold text-white mb-3">Previous Check-ins</h2>
                    <ol role="list" className="space-y-3">
                        {CHECKINS.map((c, i) => (
                            <PastCheckIn key={i} item={c} />
                        ))}
                    </ol>
                </section>
            </div>
        </Page>
    );
}
