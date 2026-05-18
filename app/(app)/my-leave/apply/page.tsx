"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Calendar, UploadCloud, Info, Loader2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Static config — replace with API data once backend is wired.
// ─────────────────────────────────────────────────────────────────────────────

interface LeaveType {
    code: "EL" | "SL" | "CL";
    label: string;
    balance: number;
    requiresProofAfterDays?: number;
}

const LEAVE_TYPES: LeaveType[] = [
    { code: "EL", label: "Privilege Leave", balance: 13 },
    { code: "SL", label: "Sick Leave", balance: 8, requiresProofAfterDays: 2 },
    { code: "CL", label: "Casual Leave", balance: 1 },
];

type SessionKind = "full" | "first-half" | "second-half";

interface ApplyForm {
    type: LeaveType["code"];
    startDate: string;
    endDate: string;
    session: SessionKind;
    reason: string;
}

const TODAY = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
    { id: 1, label: "Leave Details" },
    { id: 2, label: "Supporting Docs" },
    { id: 3, label: "Confirm" },
] as const;

export default function ApplyLeavePage() {
    const toast = useToast();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState<ApplyForm>({
        type: "EL",
        startDate: TODAY,
        endDate: TODAY,
        session: "full",
        reason: "",
    });
    const [proofFile, setProofFile] = useState<File | null>(null);

    const selectedType = useMemo(
        () => LEAVE_TYPES.find((t) => t.code === form.type)!,
        [form.type]
    );

    const days = useMemo(() => {
        if (!form.startDate || !form.endDate) return 0;
        const a = new Date(form.startDate);
        const b = new Date(form.endDate);
        if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
        const diff = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        if (diff < 1) return 0;
        return form.session === "full" ? diff : 0.5;
    }, [form.startDate, form.endDate, form.session]);

    const proofRequired =
        selectedType.code === "SL" &&
        selectedType.requiresProofAfterDays !== undefined &&
        days > selectedType.requiresProofAfterDays;

    const balanceWarning =
        days > 0 && days > selectedType.balance ? `You only have ${selectedType.balance} ${selectedType.label} days. Excess will be marked LOP.` : null;

    const canProceedToStep2 = form.startDate && form.endDate && days > 0 && form.reason.trim().length >= 5;
    const canProceedToStep3 = !proofRequired || !!proofFile;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (step !== 3) return;
        setSubmitting(true);
        try {
            // TODO: replace with `apply.mutate(...)` once the backend is wired.
            await new Promise((r) => setTimeout(r, 700));
            toast.show({
                variant: "success",
                title: "Leave applied",
                description: `Your ${selectedType.label.toLowerCase()} request for ${days} day${days === 1 ? "" : "s"} has been sent for approval.`,
            });
            setStep(1);
            setForm({ type: "EL", startDate: TODAY, endDate: TODAY, session: "full", reason: "" });
            setProofFile(null);
        } catch {
            toast.show({
                variant: "danger",
                title: "Could not submit",
                description: "Please try again. If the problem persists, contact HR.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Page
            title="Apply for leave"
            subtitle="Submit a new time-off request for manager approval"
            breadcrumbs={[
                { label: "My Leave", href: "/my-leave" },
                { label: "Apply" },
            ]}
            maxWidth="800px"
        >
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Apply for leave">
                {/* Stepper */}
                <ol className="flex flex-wrap items-center gap-3" aria-label="Application progress">
                    {STEPS.map((s, i) => {
                        const reached = step >= s.id;
                        return (
                            <li key={s.id} className="flex items-center gap-2">
                                <span
                                    aria-current={step === s.id ? "step" : undefined}
                                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold"
                                    style={{
                                        borderColor: reached ? "#00e5a0" : "#1A2A3A",
                                        background: step === s.id ? "rgba(0,229,160,0.1)" : "transparent",
                                        color: reached ? "#00e5a0" : "#3d5166",
                                    }}
                                >
                                    {s.id}
                                </span>
                                <span
                                    className={`text-xs font-medium ${
                                        reached ? "text-white" : "text-[#7a8fa6]"
                                    }`}
                                >
                                    {s.label}
                                </span>
                                {i < STEPS.length - 1 && (
                                    <span className="hidden h-px w-8 bg-[#1A2A3A] sm:block" aria-hidden="true" />
                                )}
                            </li>
                        );
                    })}
                </ol>

                <div className="rounded-2xl border border-[#1A2A3A] bg-[#0D1928] p-5 md:p-8">
                    {step === 1 && (
                        <fieldset className="space-y-6" aria-labelledby="step1-heading">
                            <legend id="step1-heading" className="text-lg font-semibold text-white">
                                What time off do you need?
                            </legend>

                            <div className="space-y-2">
                                <label htmlFor="leave-type" className="text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                    Leave type
                                </label>
                                <select
                                    id="leave-type"
                                    value={form.type}
                                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as LeaveType["code"] }))}
                                    className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none transition-colors focus:border-[#00e5a0]"
                                >
                                    {LEAVE_TYPES.map((t) => (
                                        <option key={t.code} value={t.code}>
                                            {t.label} (Balance: {t.balance})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="start-date" className="text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                        Start date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            size={16}
                                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3b82f6]"
                                            aria-hidden="true"
                                        />
                                        <input
                                            id="start-date"
                                            type="date"
                                            min={TODAY}
                                            value={form.startDate}
                                            onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                                            className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-[#00e5a0]"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="end-date" className="text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                        End date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            size={16}
                                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#00e5a0]"
                                            aria-hidden="true"
                                        />
                                        <input
                                            id="end-date"
                                            type="date"
                                            min={form.startDate || TODAY}
                                            value={form.endDate}
                                            onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                                            className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-[#00e5a0]"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <fieldset className="rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4">
                                <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                    Duration · {days || 0} day{days === 1 ? "" : "s"}
                                </legend>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {(
                                        [
                                            { id: "full", label: "Full day(s)" },
                                            { id: "first-half", label: "First half" },
                                            { id: "second-half", label: "Second half" },
                                        ] as const
                                    ).map((opt) => (
                                        <label
                                            key={opt.id}
                                            className="flex cursor-pointer items-center gap-2 text-sm"
                                        >
                                            <input
                                                type="radio"
                                                name="session"
                                                value={opt.id}
                                                checked={form.session === opt.id}
                                                onChange={() =>
                                                    setForm((f) => ({ ...f, session: opt.id }))
                                                }
                                                className="accent-[#00e5a0]"
                                            />
                                            <span
                                                className={
                                                    form.session === opt.id ? "text-white" : "text-[#7a8fa6]"
                                                }
                                            >
                                                {opt.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <div className="space-y-2">
                                <label htmlFor="reason" className="text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                    Reason for leave
                                </label>
                                <textarea
                                    id="reason"
                                    rows={4}
                                    minLength={5}
                                    placeholder="Brief reason for your manager…"
                                    value={form.reason}
                                    onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                                    className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none focus:border-[#00e5a0]"
                                    required
                                />
                                <p className="text-xs text-[#7a8fa6]">
                                    Min 5 characters. Visible to your manager and HR only.
                                </p>
                            </div>

                            {balanceWarning && (
                                <div
                                    role="status"
                                    className="flex items-start gap-2 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-3 text-xs text-[#fbbf24]"
                                >
                                    <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                                    {balanceWarning}
                                </div>
                            )}

                            <div className="flex justify-end pt-2">
                                <Button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!canProceedToStep2}
                                >
                                    Continue
                                </Button>
                            </div>
                        </fieldset>
                    )}

                    {step === 2 && (
                        <fieldset className="space-y-6" aria-labelledby="step2-heading">
                            <legend id="step2-heading" className="text-lg font-semibold text-white">
                                Supporting documents
                            </legend>
                            <p className="text-sm text-[#7a8fa6]">
                                {proofRequired
                                    ? `Sick leave longer than ${selectedType.requiresProofAfterDays} days requires a medical certificate.`
                                    : "Optional — attach any document that supports your request."}
                            </p>

                            <label
                                htmlFor="proof"
                                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#1A2A3A] bg-[#060B14] p-8 text-center transition-colors hover:border-[#00e5a0] hover:bg-[rgba(0,229,160,0.04)]"
                            >
                                <div className="rounded-full bg-[#0D1928] p-3">
                                    <UploadCloud size={28} className="text-[#00e5a0]" aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        {proofFile ? proofFile.name : "Upload document"}
                                    </p>
                                    <p className="mt-1 text-xs text-[#7a8fa6]">
                                        PNG, PDF or JPG · max 5 MB
                                    </p>
                                </div>
                                <input
                                    id="proof"
                                    type="file"
                                    accept="image/png,image/jpeg,application/pdf"
                                    className="sr-only"
                                    onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
                                />
                            </label>

                            {!proofRequired && (
                                <div
                                    role="status"
                                    className="flex items-start gap-2 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-3 text-xs text-[#fbbf24]"
                                >
                                    <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                                    No document required for this leave type. You can skip this step.
                                </div>
                            )}

                            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-between">
                                <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                                    Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    disabled={!canProceedToStep3}
                                >
                                    Review
                                </Button>
                            </div>
                        </fieldset>
                    )}

                    {step === 3 && (
                        <fieldset className="space-y-6" aria-labelledby="step3-heading">
                            <legend id="step3-heading" className="text-lg font-semibold text-white">
                                Review &amp; confirm
                            </legend>

                            <dl className="grid gap-3 rounded-lg border border-[#1A2A3A] bg-[#060B14] p-5 text-sm sm:grid-cols-2">
                                <Field label="Leave type">{selectedType.label}</Field>
                                <Field label="Duration">
                                    {days} day{days === 1 ? "" : "s"} ·{" "}
                                    {form.session === "full"
                                        ? "Full day(s)"
                                        : form.session === "first-half"
                                        ? "First half"
                                        : "Second half"}
                                </Field>
                                <Field label="Start date">{form.startDate}</Field>
                                <Field label="End date">{form.endDate}</Field>
                                <Field label="Proof attached">
                                    {proofFile ? proofFile.name : "—"}
                                </Field>
                                <Field label="Reason" full>
                                    <span className="text-[#c8d8e8]">{form.reason}</span>
                                </Field>
                            </dl>

                            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-between">
                                <Button type="button" variant="secondary" onClick={() => setStep(2)}>
                                    Back
                                </Button>
                                <Button type="submit" isLoading={submitting} loadingText="Submitting…">
                                    {!submitting && <Loader2 size={14} className="hidden" />}
                                    Submit application
                                </Button>
                            </div>
                        </fieldset>
                    )}
                </div>
            </form>
        </Page>
    );
}

function Field({
    label,
    children,
    full,
}: {
    label: string;
    children: React.ReactNode;
    full?: boolean;
}) {
    return (
        <div className={full ? "sm:col-span-2" : undefined}>
            <dt className="text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                {label}
            </dt>
            <dd className="mt-1 text-[#c8d8e8]">{children}</dd>
        </div>
    );
}
