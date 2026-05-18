"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Calculator,
    AlertTriangle,
    IndianRupee,
    RotateCcw,
    Info,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Schema ───────────────────────────────────────────────────────────────────
const penaltySchema = z.object({
    actType: z.enum(["epfo", "esic", "tds"]),
    principalAmount: z
        .number()
        .positive("Amount must be positive"),
    dueDate: z.string().min(1, "Due date is required"),
    paymentDate: z.string().min(1, "Payment date is required"),
});

type PenaltyFormValues = z.infer<typeof penaltySchema>;

// ─── Calculation helpers (module scope) ───────────────────────────────────────
function calcDays(due: string, paid: string): number {
    const d1 = new Date(due);
    const d2 = new Date(paid);
    return Math.max(0, Math.floor((d2.getTime() - d1.getTime()) / 86400000));
}

function calcPenalty(values: PenaltyFormValues): { days: number; interest: number; damages: number; total: number } {
    const days = calcDays(values.dueDate, values.paymentDate);
    const principal = values.principalAmount;
    const interest = Math.round((principal * 0.12 * days) / 365);
    const damages = Math.round((principal * 0.10 * days) / 365);
    return { days, interest, damages, total: principal + interest + damages };
}

const ACT_LABELS: Record<string, string> = {
    epfo: "EPFO (PF) Damages & Interest",
    esic: "ESIC Late Payment",
    tds: "TDS Late Filing Fee (234E)",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PenaltyCalculator() {
    const [result, setResult] = useState<ReturnType<typeof calcPenalty> | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PenaltyFormValues>({
        resolver: zodResolver(penaltySchema),
        defaultValues: {
            actType: "epfo",
            principalAmount: 50000,
            dueDate: "2024-03-15",
            paymentDate: "2024-06-20",
        },
    });

    const onSubmit = (values: PenaltyFormValues) => {
        setResult(calcPenalty(values));
    };

    return (
        <Page
            title="Penalty Calculator"
            subtitle="Estimate damages and interest under Section 14B & 7Q (EPFO) and ESIC late fees."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Penalty Calculator" },
            ]}
            maxWidth="1280px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Calculator form */}
                <Card padding="lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                        {/* Act type */}
                        <div className="space-y-2">
                            <label htmlFor="actType" className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                Compliance Type
                            </label>
                            <select
                                id="actType"
                                {...register("actType")}
                                className="w-full appearance-none rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-bold text-white outline-none focus:border-rose-500"
                            >
                                {Object.entries(ACT_LABELS).map(([val, label]) => (
                                    <option key={val} value={val}>{label}</option>
                                ))}
                            </select>
                            {errors.actType && (
                                <p className="text-xs text-rose-500" role="alert">{errors.actType.message}</p>
                            )}
                        </div>

                        {/* Principal amount */}
                        <div className="space-y-2">
                            <label htmlFor="principalAmount" className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                Principal Amount (₹)
                            </label>
                            <input
                                id="principalAmount"
                                type="number"
                                {...register("principalAmount", { valueAsNumber: true })}
                                className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-bold text-white outline-none focus:border-rose-500"
                                aria-invalid={!!errors.principalAmount}
                                aria-describedby={errors.principalAmount ? "principalAmount-error" : undefined}
                            />
                            {errors.principalAmount && (
                                <p id="principalAmount-error" className="text-xs text-rose-500" role="alert">
                                    {errors.principalAmount.message}
                                </p>
                            )}
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="dueDate" className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    Due Date
                                </label>
                                <input
                                    id="dueDate"
                                    type="date"
                                    {...register("dueDate")}
                                    className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-bold text-white outline-none [color-scheme:dark] focus:border-rose-500"
                                    aria-invalid={!!errors.dueDate}
                                />
                                {errors.dueDate && (
                                    <p className="text-xs text-rose-500" role="alert">{errors.dueDate.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="paymentDate" className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    Actual Payment Date
                                </label>
                                <input
                                    id="paymentDate"
                                    type="date"
                                    {...register("paymentDate")}
                                    className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-bold text-white outline-none [color-scheme:dark] focus:border-rose-500"
                                    aria-invalid={!!errors.paymentDate}
                                />
                                {errors.paymentDate && (
                                    <p className="text-xs text-rose-500" role="alert">{errors.paymentDate.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                type="submit"
                                variant="primary"
                                className="flex-1"
                                icon={<Calculator size={16} aria-hidden="true" />}
                            >
                                Calculate Penalty
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                aria-label="Reset form"
                                icon={<RotateCcw size={16} aria-hidden="true" />}
                                onClick={() => { reset(); setResult(null); }}
                            />
                        </div>
                    </form>
                </Card>

                {/* Results */}
                <Card padding="lg" className="relative overflow-hidden border-rose-500/20 bg-gradient-to-br from-[#0D1928] to-[#060B14]">
                    <div className="pointer-events-none absolute right-0 top-0 p-8 opacity-5">
                        <IndianRupee size={120} className="text-rose-500" aria-hidden="true" />
                    </div>
                    <div className="relative z-10 flex h-full flex-col">
                        <h2 className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-500">
                            <AlertTriangle size={14} aria-hidden="true" /> Estimated Liability Report
                        </h2>

                        {result ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4">
                                    <span className="text-sm font-bold text-slate-400">Delay Period</span>
                                    <span className="text-xl font-black text-white">{result.days} Days</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-300">Interest (Sec 7Q)</span>
                                            <span className="text-[9px] uppercase tracking-widest text-slate-500">@ 12% p.a.</span>
                                        </div>
                                        <span className="text-sm font-black text-amber-500">₹ {result.interest.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-300">Damages (Sec 14B)</span>
                                            <span className="text-[9px] uppercase tracking-widest text-slate-500">@ 10% p.a.</span>
                                        </div>
                                        <span className="text-sm font-black text-rose-500">₹ {result.damages.toLocaleString("en-IN")}</span>
                                    </div>
                                </div>
                                <div className="mt-auto border-t border-[#1A2A3A] pt-6">
                                    <div className="flex items-end justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Estimated Liability</span>
                                        <span className="text-3xl font-black tracking-tight text-rose-500">
                                            ₹ {result.total.toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                    <p className="mt-2 flex items-start gap-1 text-[9px] font-medium italic text-slate-500">
                                        <Info size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
                                        Note: Final demand is subject to notice by the Regional PF Commissioner. This is an estimate based on statutory rates.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center text-center">
                                <Calculator size={48} className="mb-4 text-slate-700" aria-hidden="true" />
                                <p className="text-sm font-bold text-slate-500">Fill in the form and click Calculate to see the estimated penalty.</p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </Page>
    );
}
