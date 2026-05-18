"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, DollarSign, History } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Static config — replace with API data once backend is wired.
// ─────────────────────────────────────────────────────────────────────────────

interface EligibleLeaveType {
    code: "EL";
    label: string;
    balance: number;
}

const ELIGIBLE_LEAVE_TYPES: EligibleLeaveType[] = [
    { code: "EL", label: "Privilege Leave", balance: 24 },
];

const MIN_DAYS = 1;
const MAX_DAYS = 15;
const MIN_BALANCE_AFTER = 5;
/** Per-day payout in INR — replace with payroll-config-driven value once API lands. */
const PAYOUT_PER_DAY = 1850;

interface PastRequest {
    id: string;
    days: number;
    amount: number;
    period: string;
    status: "Paid" | "Processing";
}

const PAST_REQUESTS: PastRequest[] = [
    { id: "enc-2023-12", days: 10, amount: 16500, period: "Dec 2023 Payroll", status: "Paid" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Form schema
// ─────────────────────────────────────────────────────────────────────────────

function buildSchema(balance: number) {
    return z.object({
        leaveType: z.enum(["EL"]),
        days: z
            .number({ message: "Enter the number of days to encash" })
            .int("Days must be a whole number")
            .min(MIN_DAYS, `Encash at least ${MIN_DAYS} day`)
            .max(MAX_DAYS, `Maximum ${MAX_DAYS} days per year`)
            .refine((d) => balance - d >= MIN_BALANCE_AFTER, {
                message: `You must retain at least ${MIN_BALANCE_AFTER} days of leave balance`,
            }),
    });
}

const SCHEMA = buildSchema(ELIGIBLE_LEAVE_TYPES[0].balance);
type EncashmentValues = z.infer<typeof SCHEMA>;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveEncashmentPage() {
    const toast = useToast();

    const selectedType = ELIGIBLE_LEAVE_TYPES[0];

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<EncashmentValues>({
        resolver: zodResolver(SCHEMA),
        defaultValues: { leaveType: "EL", days: 10 },
    });

    const days = useWatch({ control, name: "days" }) ?? 0;
    const grossPayout = days * PAYOUT_PER_DAY;
    const formattedPayout = grossPayout.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    });

    const onSubmit = async (values: EncashmentValues) => {
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 600));
            toast.show({
                variant: "success",
                title: "Encashment request submitted",
                description: `${values.days} day${values.days === 1 ? "" : "s"} of ${selectedType.label} will be processed in the next payroll cycle.`,
            });
            reset({ leaveType: "EL", days: 10 });
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
            title="Leave encashment"
            subtitle="Convert your unused Privilege Leave (EL) balance to cash payout."
            breadcrumbs={[
                { label: "My Leave", href: "/my-leave" },
                { label: "Encashment" },
            ]}
            maxWidth="1100px"
        >
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                {/* Form */}
                <Card padding="lg">
                    <CardHeader className="border-b border-[#1A2A3A] pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign size={16} className="text-[#00e5a0]" aria-hidden="true" />
                            New encashment request
                        </CardTitle>
                    </CardHeader>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-5 space-y-6"
                        aria-label="New encashment request"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="leave-type"
                                className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#7a8fa6]"
                            >
                                Leave type
                            </label>
                            <Controller
                                control={control}
                                name="leaveType"
                                render={({ field }) => (
                                    <select
                                        id="leave-type"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        ref={field.ref}
                                        name={field.name}
                                        className="h-10 w-full rounded-[10px] border border-[#162030] bg-[#070d18] px-3 text-[13px] font-semibold text-[#f0f4f8] outline-none transition-all duration-150 focus:border-[#00e5a0] focus:shadow-[0_0_0_3px_rgba(0,229,160,0.1)]"
                                    >
                                        {ELIGIBLE_LEAVE_TYPES.map((t) => (
                                            <option key={t.code} value={t.code}>
                                                {t.label} (Balance: {t.balance})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            <p className="text-[11px] text-[#7a8fa6]">
                                Only Privilege Leave is eligible for encashment as per policy.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="days"
                                className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#7a8fa6]"
                            >
                                Number of days to encash
                            </label>
                            <Controller
                                control={control}
                                name="days"
                                render={({ field, fieldState }) => {
                                    const errorId = "days-error";
                                    const hintId = "days-hint";
                                    return (
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    id="days"
                                                    type="number"
                                                    min={MIN_DAYS}
                                                    max={MAX_DAYS}
                                                    value={Number.isFinite(field.value) ? field.value : ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value === ""
                                                                ? Number.NaN
                                                                : Number(e.target.value),
                                                        )
                                                    }
                                                    onBlur={field.onBlur}
                                                    ref={field.ref}
                                                    name={field.name}
                                                    aria-invalid={fieldState.error ? true : undefined}
                                                    aria-describedby={
                                                        fieldState.error ? errorId : hintId
                                                    }
                                                    className="h-12 w-32 rounded-[10px] border border-[#162030] bg-[#070d18] px-3 text-center text-xl font-bold text-[#f0f4f8] outline-none transition-all duration-150 focus:border-[#00e5a0] focus:shadow-[0_0_0_3px_rgba(0,229,160,0.1)]"
                                                />
                                                <span className="text-sm font-semibold text-[#7a8fa6]">
                                                    days
                                                </span>
                                            </div>
                                            {fieldState.error ? (
                                                <p
                                                    id={errorId}
                                                    role="alert"
                                                    className="text-[11px] text-[#ef4444]"
                                                >
                                                    {fieldState.error.message}
                                                </p>
                                            ) : (
                                                <p id={hintId} className="text-[11px] text-[#f59e0b]">
                                                    Max {MAX_DAYS} days per year. Min balance after
                                                    encashment must be {MIN_BALANCE_AFTER} days.
                                                </p>
                                            )}
                                        </div>
                                    );
                                }}
                            />
                        </div>

                        <div className="rounded-lg border border-[#1A2A3A] bg-[#0A1420] p-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7a8fa6]">
                                        Estimated payout (gross)
                                    </p>
                                    <p
                                        className="mt-1 text-2xl font-bold text-[#00e5a0]"
                                        aria-live="polite"
                                    >
                                        {errors.days ? "—" : formattedPayout}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7a8fa6]">
                                        Formula applied
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-white">
                                        Basic Salary / 26 × Days
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            loadingText="Submitting…"
                            iconRight={<ArrowRight size={16} />}
                            className="w-full"
                        >
                            Submit request
                        </Button>
                    </form>
                </Card>

                {/* Guidelines & history */}
                <div className="space-y-6">
                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle className="text-sm">Policy guidelines</CardTitle>
                        </CardHeader>
                        <ul className="list-disc space-y-2 pl-5 text-xs text-[#7a8fa6]">
                            <li>Encashment requests are processed in the next payroll cycle.</li>
                            <li>TDS will be deducted on encashment amount as per tax slab.</li>
                            <li>Maximum 1 encashment request allowed per financial year.</li>
                        </ul>
                    </Card>

                    <Card padding="md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <History size={14} className="text-[#3b82f6]" aria-hidden="true" />
                                Past requests
                            </CardTitle>
                        </CardHeader>
                        {PAST_REQUESTS.length > 0 ? (
                            <ul className="space-y-2">
                                {PAST_REQUESTS.map((r) => (
                                    <li
                                        key={r.id}
                                        className="rounded-lg border border-[#1A2A3A] bg-[#0A1420] p-3"
                                    >
                                        <div className="mb-2 flex items-center justify-between gap-2">
                                            <span className="text-xs font-semibold text-white">
                                                {r.days} days EL
                                            </span>
                                            <Badge
                                                variant={
                                                    r.status === "Paid" ? "success" : "warning"
                                                }
                                            >
                                                {r.status === "Paid" && (
                                                    <CheckCircle
                                                        size={10}
                                                        className="-ml-0.5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                {r.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-[#7a8fa6]">
                                            <span className="font-semibold text-white">
                                                {r.amount.toLocaleString("en-IN", {
                                                    style: "currency",
                                                    currency: "INR",
                                                    maximumFractionDigits: 0,
                                                })}
                                            </span>
                                            <span>{r.period}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xs text-[#7a8fa6]">No previous requests yet.</p>
                        )}
                    </Card>
                </div>
            </div>
        </Page>
    );
}
