"use client";

import { useState } from "react";
import { Save, Minus, Plus } from "lucide-react";
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

const progressSchema = z.object({
    confidence: z.number().min(1).max(5),
    note: z.string().optional(),
});

type ProgressValues = z.infer<typeof progressSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const KRS = [
    { id: "kr1", title: "Onboard 15 new accounts", current: 9, target: 15, unit: "accounts", progress: 60 },
    { id: "kr2", title: "Reduce deal cycle to <30 days", current: 34, target: 30, unit: "days", progress: 55 },
    { id: "kr3", title: "ARPU increase by ₹5000", current: 3200, target: 5000, unit: "₹", progress: 64 },
] as const;

const CONF_LABELS = ["Low", "Fair", "Mid", "Good", "High"] as const;

// Static color maps — no template literals
const KR_PROGRESS_BAR: Record<"high" | "mid" | "low", string> = {
    high: "bg-[#00E5A0]",
    mid: "bg-[#FFB800]",
    low: "bg-[#FF4444]",
};

const KR_PROGRESS_TEXT: Record<"high" | "mid" | "low", string> = {
    high: "text-[#00E5A0]",
    mid: "text-[#FFB800]",
    low: "text-[#FF4444]",
};

function krProgressLevel(progress: number): "high" | "mid" | "low" {
    if (progress >= 70) return "high";
    if (progress >= 40) return "mid";
    return "low";
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

interface KrStepperProps {
    kr: { id: string; title: string; target: number; unit: string };
    value: number;
    onChange: (v: number) => void;
}

function KrStepper({ kr, value, onChange }: KrStepperProps) {
    const progress = Math.min(100, Math.round((value / kr.target) * 100));
    const level = krProgressLevel(progress);

    return (
        <Card padding="md">
            <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-semibold text-white">{kr.title}</p>
                <span className={`text-xs font-bold ${KR_PROGRESS_TEXT[level]}`}>{progress}%</span>
            </div>
            <div
                className="h-2 bg-[#1A2A3A] rounded-full overflow-hidden mb-4"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${kr.title}: ${progress}%`}
            >
                <div className={`h-full rounded-full transition-all duration-500 ${KR_PROGRESS_BAR[level]}`} style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-[#8899AA]">Current Value ({kr.unit})</span>
                <div className="flex items-center gap-2 ml-auto">
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        icon={<Minus size={12} />}
                        aria-label={`Decrease ${kr.title} value`}
                        onClick={() => onChange(Math.max(0, value - 1))}
                    />
                    <label htmlFor={`val-${kr.id}`} className="sr-only">{kr.title} current value</label>
                    <input
                        id={`val-${kr.id}`}
                        type="number"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="w-20 text-center bg-[#0A1420] border border-[#00E5A0]/40 rounded-lg py-1.5 text-sm font-bold text-white focus:outline-none focus:border-[#00e5a0]"
                    />
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        icon={<Plus size={12} />}
                        aria-label={`Increase ${kr.title} value`}
                        onClick={() => onChange(Math.min(kr.target * 2, value + 1))}
                    />
                    <span className="text-xs text-[#8899AA]">/ {kr.target} {kr.unit}</span>
                </div>
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OKRProgressUpdatePage() {
    const toast = useToast();
    const [values, setValues] = useState<Record<string, number>>(
        Object.fromEntries(KRS.map((k) => [k.id, k.current]))
    );

    const { control, handleSubmit, register, formState: { isSubmitting } } = useForm<ProgressValues>({
        resolver: zodResolver(progressSchema),
        defaultValues: { confidence: 3, note: "" },
    });

    const onSubmit = async (_data: ProgressValues) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 1000));
        toast.show({
            variant: "success",
            title: "Progress updated",
            description: "Your OKR progress has been saved successfully.",
        });
    };

    return (
        <Page
            title="Update OKR Progress"
            subtitle="Record current values for your key results"
            breadcrumbs={[
                { label: "OKRs", href: "/okr/dashboard" },
                { label: "My OKRs", href: "/okr/my-okrs" },
                { label: "Update Progress" },
            ]}
            maxWidth="800px"
            actions={
                <Button
                    type="submit"
                    form="progress-form"
                    isLoading={isSubmitting}
                    loadingText="Saving…"
                    icon={<Save size={14} />





}
                >
                    Save Update
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Context */}
                <Card padding="md">
                    <p className="text-xs text-[#8899AA] mb-1">Updating progress for</p>
                    <h2 className="text-base font-bold text-white">Drive 40% growth in my product segment</h2>
                    <p className="text-xs text-[#8899AA] mt-1">Q1 2025 · Owner: Priya Mehta</p>
                </Card>

                <form id="progress-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    {/* Key Results */}
                    <section aria-labelledby="kr-update-heading">
                        <h2 id="kr-update-heading" className="text-sm font-semibold text-white mb-3">Update Key Results</h2>
                        <ul role="list" className="space-y-4">
                            {KRS.map((kr) => (
                                <li key={kr.id}>
                                    <KrStepper
                                        kr={kr}
                                        value={values[kr.id] ?? kr.current}
                                        onChange={(v) => setValues((prev) => ({ ...prev, [kr.id]: v }))}
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Confidence Level */}
                    <Card padding="md">
                        <fieldset>
                            <legend className="text-sm font-semibold text-white mb-3">Confidence Level</legend>
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
                                                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-xs font-bold ${
                                                        field.value === n
                                                            ? "border-[#00e5a0] bg-[#00e5a0]/10 text-[#00e5a0]"
                                                            : "border-[#1A2A3A] text-[#445566] hover:border-[#2A3A4A]"
                                                    }`}
                                                    aria-hidden="true"
                                                >
                                                    <span className="text-base">{n}</span>
                                                    <span>{CONF_LABELS[n - 1]}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            />
                        </fieldset>
                    </Card>

                    {/* Check-in Note */}
                    <div>
                        <label htmlFor="checkin-note" className="block text-xs font-semibold text-[#8899AA] mb-1.5">
                            Check-in Note (Optional)
                        </label>
                        <textarea
                            id="checkin-note"
                            {...register("note")}
                            placeholder="What went well? Any blockers? Plans for next week?"
                            rows={3}
                            className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00e5a0] resize-none"
                        />
                    </div>
                </form>
            </div>
        

        

        

        </Page>
    );
}
