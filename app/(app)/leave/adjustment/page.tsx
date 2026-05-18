"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle, ArrowRight, Minus, Plus, Search } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const adjustmentSchema = z.object({
    employee: z.string().min(1, "Employee is required"),
    leaveType: z.enum(["EL", "SL", "CL"]),
    days: z.number().min(0.5, "Minimum 0.5 days").max(365),
    reason: z.string().min(5, "Reason must be at least 5 characters"),
});

type AdjustmentValues = z.infer<typeof adjustmentSchema>;

const CURRENT_BALANCE = 14.5;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveAdjustmentPage() {
    const toast = useToast();
    const [action, setAction] = useState<"credit" | "deduct">("credit");

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<AdjustmentValues>({
        resolver: zodResolver(adjustmentSchema),
        defaultValues: {
            employee: "Arjun Mehta (EMP042)",
            leaveType: "EL",
            days: 2,
            reason: "Correcting missing joining credit",
        },
    });

    const [previewDays, setPreviewDays] = useState(2);
    const newBalance = action === "credit" ? CURRENT_BALANCE + previewDays : CURRENT_BALANCE - previewDays;

    const onSubmit = async (_data: AdjustmentValues) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 800));
        toast.show({
            variant: "success",
            title: "Adjustment applied",
            description: `Balance updated to ${newBalance.toFixed(1)} days.`,
        });
    };

    return (
        <Page
            title="Manual Leave Adjustment"
            subtitle="Directly credit or deduct leave balances for an employee outside the normal accrual cycle"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Adjustment" },
            ]}
            maxWidth="900px"
        >
            <Card padding="lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" aria-label="Leave adjustment form">
                    {/* Employee */}
                    <div className="space-y-2">
                        <label htmlFor="employee-search" className="text-sm font-bold text-[#8899AA]">
                            Select Employee
                        </label>
                        <div className="relative">
                            <Search
                                size={18}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                                aria-hidden="true"
                            />
                            <input
                                id="employee-search"
                                type="text"
                                placeholder="Search by name or emp ID…"
                                {...register("employee")}
                                className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-[#0066FF]"
                            />
                            {errors.employee && (
                                <p role="alert" className="mt-1 text-xs text-[#FF4444]">{errors.employee.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Leave type & current balance */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="leave-type" className="text-sm font-bold text-[#8899AA]">
                                Leave Type
                            </label>
                            <select
                                id="leave-type"
                                className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm font-bold text-white outline-none focus:border-[#0066FF]"
                            >
                                <option value="EL">Privilege Leave (EL)</option>
                                <option value="SL">Sick Leave (SL)</option>
                                <option value="CL">Casual Leave (CL)</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-[#1A2A3A] bg-[#0A1420] p-3">
                            <span className="text-sm font-bold text-[#8899AA]">Current Balance:</span>
                            <span className="text-xl font-black text-white">
                                {CURRENT_BALANCE}{" "}
                                <span className="block text-right text-sm font-bold text-[#556677]">days</span>
                            </span>
                        </div>
                    </div>

                    <hr className="border-[#1A2A3A]" />

                    {/* Action */}
                    <fieldset>
                        <legend className="mb-4 text-sm font-bold text-[#8899AA]">Adjustment Action</legend>
                        <div className="flex gap-6">
                            <label className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="radio"
                                    name="action"
                                    value="credit"
                                    checked={action === "credit"}
                                    onChange={() => setAction("credit")}
                                    className="sr-only"
                                />
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-colors ${
                                        action === "credit"
                                            ? "border-[#00E5A0] bg-[#00E5A0]/10 text-[#00E5A0]"
                                            : "border-[#1A2A3A] bg-[#060B14] text-[#8899AA]"
                                    }`}
                                >
                                    <Plus size={20} className="stroke-[3]" aria-hidden="true" />
                                </div>
                                <span className={`font-bold ${action === "credit" ? "text-white" : "text-[#8899AA]"}`}>
                                    Credit (+)
                                </span>
                            </label>
                            <label className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="radio"
                                    name="action"
                                    value="deduct"
                                    checked={action === "deduct"}
                                    onChange={() => setAction("deduct")}
                                    className="sr-only"
                                />
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-colors ${
                                        action === "deduct"
                                            ? "border-[#FF4444] bg-[#FF4444]/10 text-[#FF4444]"
                                            : "border-[#1A2A3A] bg-[#060B14] text-[#8899AA]"
                                    }`}
                                >
                                    <Minus size={20} className="stroke-[3]" aria-hidden="true" />
                                </div>
                                <span className={`font-bold ${action === "deduct" ? "text-white" : "text-[#8899AA]"}`}>
                                    Deduct (-)
                                </span>
                            </label>
                        </div>
                    </fieldset>

                    {/* Days & reason */}
                    <div className="grid gap-6 sm:grid-cols-3">
                        <div className="space-y-2">
                            <label htmlFor="days-input" className="text-sm font-bold text-[#8899AA]">Days</label>
                            <input
                                id="days-input"
                                type="number"
                                step="0.5"
                                min="0.5"
                                {...register("days", {
                                    valueAsNumber: true,
                                    onChange: (e) => setPreviewDays(Number(e.target.value) || 0),
                                })}
                                aria-invalid={!!errors.days}
                                className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none focus:border-[#0066FF]"
                            />
                            {errors.days && <p role="alert" className="text-xs text-[#FF4444]">{errors.days.message}</p>}
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <label htmlFor="reason-input" className="text-sm font-bold text-[#8899AA]">Reason / Remarks</label>
                            <input
                                id="reason-input"
                                type="text"
                                placeholder="E.g., Joining bonus leave credit"
                                {...register("reason")}
                                aria-invalid={!!errors.reason}
                                className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none focus:border-[#0066FF]"
                            />
                            {errors.reason && <p role="alert" className="text-xs text-[#FF4444]">{errors.reason.message}</p>}
                        </div>
                    </div>

                    {/* Preview */}
                    <div
                        role="status"
                        className="flex items-start gap-3 rounded-lg border border-[#FFB800]/20 bg-[#FFB800]/10 p-4 text-sm"
                    >
                        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#FFB800]" aria-hidden="true" />
                        <p className="text-[#FFB800]">
                            This action will update the balance immediately and will be recorded in the audit logs.
                            The new balance will be{" "}
                            <strong className="text-white">{newBalance.toFixed(1)} days</strong>.
                        </p>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            loadingText="Applying…"
                            iconRight={<ArrowRight size={18} aria-hidden="true" />}
                        >
                            Confirm Adjustment
                        </Button>
                    </div>
                </form>
            </Card>
        </Page>
    );
}
