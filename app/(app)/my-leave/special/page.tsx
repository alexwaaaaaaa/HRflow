"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Activity, AlertCircle, ArrowRight, Baby } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Static config — replace with API data once backend is wired.
// ─────────────────────────────────────────────────────────────────────────────

type SpecialLeaveCode = "ML" | "PL" | "SAB";

interface SpecialLeaveType {
    code: SpecialLeaveCode;
    label: string;
    durationLabel: string;
    description: string;
    durationDays: number;
    requiresProof: boolean;
    proofLabel: string;
    proofHint: string;
    /** Maximum days the leave can start before the trigger date (e.g. EDD). */
    maxLeadDays?: number;
    /** Whether this leave needs a "trigger date" input (e.g. EDD for ML). */
    triggerDateLabel?: string;
    triggerDateHint?: string;
    /** Bound for end date relative to start date (in days) — used for display. */
    leadHint?: string;
}

const SPECIAL_LEAVES: SpecialLeaveType[] = [
    {
        code: "ML",
        label: "Maternity Leave (ML)",
        durationLabel: "26 weeks paid",
        description: "26 weeks paid leave. Requires medical certifications.",
        durationDays: 182,
        requiresProof: true,
        proofLabel: "Medical certificate",
        proofHint: "PDF or JPEG, max 5 MB",
        maxLeadDays: 56, // 8 weeks
        triggerDateLabel: "Expected delivery date (EDD)",
        triggerDateHint: "Used to validate the leave start window.",
        leadHint: "Max 8 weeks before EDD.",
    },
    {
        code: "PL",
        label: "Paternity Leave (PL)",
        durationLabel: "15 days paid",
        description: "15 days paid leave. Must be taken within 6 months.",
        durationDays: 15,
        requiresProof: false,
        proofLabel: "Supporting document (optional)",
        proofHint: "PDF or JPEG, max 5 MB",
    },
    {
        code: "SAB",
        label: "Sabbatical (LWP)",
        durationLabel: "Up to 1 year unpaid",
        description: "Up to 1 year unpaid. Requires 3 years tenure.",
        durationDays: 365,
        requiresProof: true,
        proofLabel: "Justification letter",
        proofHint: "PDF, max 5 MB",
    },
];

const TODAY = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();

// ─────────────────────────────────────────────────────────────────────────────
// Form schema
// ─────────────────────────────────────────────────────────────────────────────

const specialLeaveSchema = z.object({
    type: z.enum(["ML", "PL", "SAB"]),
    triggerDate: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
});

type SpecialLeaveValues = z.infer<typeof specialLeaveSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers (pure)
// ─────────────────────────────────────────────────────────────────────────────

function addDays(iso: string, days: number): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
}

function formatNiceDate(iso: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function SpecialLeavePage() {
    const toast = useToast();
    const [activeCode, setActiveCode] = useState<SpecialLeaveCode>("ML");
    const [proofFile, setProofFile] = useState<File | null>(null);

    const activeType = useMemo(
        () => SPECIAL_LEAVES.find((t) => t.code === activeCode) ?? SPECIAL_LEAVES[0],
        [activeCode],
    );

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<SpecialLeaveValues>({
        resolver: zodResolver(specialLeaveSchema),
        defaultValues: { type: "ML", triggerDate: "", startDate: TODAY },
    });

    const startDate = useWatch({ control, name: "startDate" });
    const calculatedEnd = startDate ? addDays(startDate, activeType.durationDays - 1) : "";

    const handleSelect = (code: SpecialLeaveCode) => {
        setActiveCode(code);
        reset({ type: code, triggerDate: "", startDate: TODAY });
        setProofFile(null);
    };

    const handleProofChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProofFile(e.target.files?.[0] ?? null);
    };

    const onSubmit = async (values: SpecialLeaveValues) => {
        if (activeType.requiresProof && !proofFile) {
            toast.show({
                variant: "warning",
                title: "Document required",
                description: `${activeType.proofLabel} is required for ${activeType.label}.`,
            });
            return;
        }
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 600));
            toast.show({
                variant: "success",
                title: "Request submitted",
                description: `Your ${activeType.label} request from ${formatNiceDate(values.startDate)} has been routed to HR.`,
            });
            reset({ type: activeType.code, triggerDate: "", startDate: TODAY });
            setProofFile(null);
        } catch {
            toast.show({
                variant: "danger",
                title: "Could not submit",
                description: "Please try again or contact HR.",
            });
        }
    };

    return (
        <Page
            title="Special leaves"
            subtitle="Maternity, paternity, and sabbatical leave requests."
            breadcrumbs={[
                { label: "My Leave", href: "/my-leave" },
                { label: "Special" },
            ]}
            maxWidth="1100px"
            actions={
                <span className="hidden items-center gap-2 text-[#f59e0b] sm:inline-flex">
                    <Baby size={16} aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                        HR-routed
                    </span>
                </span>
            }
        >
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                {/* Type selector */}
                <fieldset
                    role="radiogroup"
                    aria-label="Leave type"
                    className="m-0 space-y-3 border-0 p-0"
                >
                    <legend className="sr-only">Leave type</legend>
                    {SPECIAL_LEAVES.map((t) => {
                        const inputId = `special-leave-${t.code}`;
                        const isActive = t.code === activeCode;
                        return (
                            <label
                                key={t.code}
                                htmlFor={inputId}
                                className={[
                                    "block cursor-pointer rounded-r-lg border-l-4 p-4 transition-colors",
                                    isActive
                                        ? "border-[#f59e0b] bg-[#f59e0b]/10"
                                        : "border-[#1A2A3A] bg-[#0A1420] hover:bg-[#1A2A3A]",
                                ].join(" ")}
                            >
                                <input
                                    type="radio"
                                    id={inputId}
                                    name="special-leave-type"
                                    value={t.code}
                                    checked={isActive}
                                    onChange={() => handleSelect(t.code)}
                                    className="peer sr-only"
                                />
                                <h3
                                    className={[
                                        "mb-1 text-sm font-semibold",
                                        isActive ? "text-[#f59e0b]" : "text-white",
                                    ].join(" ")}
                                >
                                    {t.label}
                                </h3>
                                <p className="text-xs text-[#7a8fa6]">{t.description}</p>
                            </label>
                        );
                    })}
                </fieldset>

                {/* Form */}
                <Card padding="lg">
                    <CardHeader>
                        <CardTitle>Apply for {activeType.label}</CardTitle>
                    </CardHeader>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-2 space-y-6"
                        aria-label={`Apply for ${activeType.label}`}
                    >
                        <input type="hidden" {...register("type")} value={activeType.code} />

                        <div className="grid gap-4 sm:grid-cols-2">
                            {activeType.triggerDateLabel && (
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="trigger-date"
                                        className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#7a8fa6]"
                                    >
                                        {activeType.triggerDateLabel}
                                    </label>
                                    <input
                                        id="trigger-date"
                                        type="date"
                                        className="h-10 w-full rounded-[10px] border border-[#162030] bg-[#070d18] px-3 text-[13px] font-medium text-[#f0f4f8] outline-none transition-all duration-150 focus:border-[#f59e0b] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)]"
                                        {...register("triggerDate")}
                                    />
                                    {activeType.triggerDateHint && (
                                        <p className="text-[11px] text-[#7a8fa6]">
                                            {activeType.triggerDateHint}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="start-date"
                                    className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#7a8fa6]"
                                >
                                    Leave start date
                                </label>
                                <input
                                    id="start-date"
                                    type="date"
                                    aria-invalid={errors.startDate ? true : undefined}
                                    aria-describedby={
                                        errors.startDate
                                            ? "start-date-error"
                                            : activeType.leadHint
                                              ? "start-date-hint"
                                              : undefined
                                    }
                                    className="h-10 w-full rounded-[10px] border border-[#162030] bg-[#070d18] px-3 text-[13px] font-medium text-[#f0f4f8] outline-none transition-all duration-150 focus:border-[#f59e0b] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)]"
                                    {...register("startDate")}
                                />
                                {errors.startDate ? (
                                    <p
                                        id="start-date-error"
                                        role="alert"
                                        className="text-[11px] text-[#ef4444]"
                                    >
                                        {errors.startDate.message}
                                    </p>
                                ) : (
                                    activeType.leadHint && (
                                        <p
                                            id="start-date-hint"
                                            className="text-[11px] text-[#7a8fa6]"
                                        >
                                            {activeType.leadHint}
                                        </p>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="rounded-lg border border-[#1A2A3A] bg-[#0A1420] p-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7a8fa6]">
                                        Calculated end date
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-[#f59e0b]">
                                        {calculatedEnd ? formatNiceDate(calculatedEnd) : "Pending dates…"}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7a8fa6]">
                                        Total duration
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-white">
                                        {activeType.durationDays} days
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="proof"
                                className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#7a8fa6]"
                            >
                                {activeType.proofLabel}
                                {activeType.requiresProof && (
                                    <span className="ml-1 text-[#ef4444]" aria-hidden="true">
                                        *
                                    </span>
                                )}
                            </label>
                            <label
                                htmlFor="proof"
                                className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[#2A3A4A] bg-[#060B14] p-6 text-center transition-colors hover:border-[#f59e0b]"
                            >
                                <Activity
                                    size={24}
                                    className="text-[#7a8fa6]"
                                    aria-hidden="true"
                                />
                                <p className="text-sm font-semibold text-white">
                                    {proofFile ? proofFile.name : "Upload document"}
                                </p>
                                <p className="text-[11px] text-[#7a8fa6]">
                                    {activeType.proofHint}
                                </p>
                                <input
                                    id="proof"
                                    type="file"
                                    accept="image/png,image/jpeg,application/pdf"
                                    className="sr-only"
                                    onChange={handleProofChange}
                                    aria-required={activeType.requiresProof}
                                />
                            </label>
                        </div>

                        <div
                            role="note"
                            className="flex items-start gap-3 rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4 text-xs text-[#7a8fa6]"
                        >
                            <AlertCircle
                                size={16}
                                className="mt-0.5 shrink-0 text-[#ef4444]"
                                aria-hidden="true"
                            />
                            <p>
                                Special leaves bypass standard manager approval and are routed
                                directly to HR for administrative processing and compliance
                                checks.
                            </p>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Submitting…"
                                iconRight={<ArrowRight size={16} />}
                            >
                                Submit request
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Page>
    );
}
