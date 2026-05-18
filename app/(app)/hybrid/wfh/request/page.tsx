"use client";

import { Home, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ──────────────────────────────────────────────────────────────────

const wfhRequestSchema = z.object({
    date: z.string().min(1, "Date is required"),
    reasonCategory: z.string().min(1, "Please select a reason category"),
    explanation: z.string().min(10, "Please provide at least 10 characters"),
});

type WfhRequestForm = z.infer<typeof wfhRequestSchema>;

// ─── Static data ─────────────────────────────────────────────────────────────

const REASON_CATEGORIES = [
    "Feeling unwell",
    "Personal errands",
    "Quiet work requirement",
    "Bad weather / Traffic",
] as const;

const PAST_WFH = [
    { date: "01 Nov 2024", reason: "Feeling unwell", status: "Approved" as const },
] as const;

const STATUS_CLASSES = {
    Approved: "bg-[rgba(0,229,160,0.1)] text-[#00e5a0] border border-[rgba(0,229,160,0.2)]",
    Rejected: "bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]",
    Pending: "bg-[rgba(245,158,11,0.1)] text-[#f59e0b] border border-[rgba(245,158,11,0.2)]",
} as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WfhRequestPage() {
    const toast = useToast();
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<WfhRequestForm>({
        resolver: zodResolver(wfhRequestSchema),
        defaultValues: { date: "", reasonCategory: "", explanation: "" },
    });

    const onSubmit = async (_data: WfhRequestForm) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 600));
        toast.show({ variant: "success", title: "WFH request submitted", description: "Your request has been sent to your manager for approval." });
        reset();
    };

    return (
        <Page
            title="Request Work From Home"
            subtitle="Submit your remote work requests as per company policy"
            breadcrumbs={[
                { label: "Hybrid", href: "/hybrid/wfh/request" },
                { label: "WFH Request" },
            ]}
            maxWidth="1100px"
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Form — 2 cols */}
                <div className="lg:col-span-2">
                    <Card padding="lg">
                        <h2 className="mb-6 border-b border-[#1A2A3A] pb-4 text-base font-semibold text-white">
                            New Request Form
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="WFH request form">
                            <FormField
                                control={control}
                                name="date"
                                label="Date"
                                inputProps={{ type: "date" }}
                            />

                            {/* Reason category — native select wrapped with label */}
                            <div className="space-y-1.5">
                                <label htmlFor="wfh-reason-category" className="block text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                    Reason Category
                                </label>
                                <select
                                    id="wfh-reason-category"
                                    className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none transition-colors focus:border-[#00e5a0]"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select Reason…</option>
                                    {REASON_CATEGORIES.map((r) => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                            </div>

                            <FormField
                                control={control}
                                name="explanation"
                                label="Detailed Explanation"
                                hint="Min 10 characters"
                                inputProps={{ placeholder: "Please provide details…" }}
                            />

                            {/* Approver info */}
                            <div className="flex items-center justify-between rounded-lg border border-[#1A2A3A] bg-[#1A2A3A]/40 p-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        aria-hidden="true"
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0066FF] text-xs font-bold text-white"
                                    >
                                        SV
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Sonia Varma</p>
                                        <p className="text-xs text-[#8899AA]">Reporting Manager</p>
                                    </div>
                                </div>
                                <span className="rounded border border-[#1A2A3A] bg-[#060B14] px-2 py-1 text-xs font-semibold text-[#8899AA]">
                                    L1 Route
                                </span>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button type="submit" isLoading={isSubmitting} loadingText="Submitting…">
                                    Submit Request
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Sidebar — 1 col */}
                <div className="space-y-6">
                    {/* WFH Balance */}
                    <Card padding="md" className="border-[#0066FF]/30 bg-[#0066FF]/10">
                        <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-[#3b82f6]">
                            <Home size={16} aria-hidden="true" /> November Balance
                        </h3>
                        <p className="text-3xl font-black text-white">
                            6 <span className="text-sm font-normal text-[#8899AA]">of 8 days</span>
                        </p>
                        <div
                            role="progressbar"
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="WFH days used this month"
                            className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
                        >
                            <div className="h-full w-1/4 rounded-full bg-[#3b82f6]" />
                        </div>
                    </Card>

                    {/* Recent History */}
                    <Card padding="md">
                        <h3 className="mb-4 text-sm font-bold text-white">Past WFH</h3>
                        <ul className="space-y-3" role="list">
                            {PAST_WFH.map((item, i) => (
                                <li key={i} className="rounded-lg border border-[#1A2A3A] bg-[#0A1420] p-3">
                                    <div className="mb-1 flex items-center justify-between">
                                        <span className="text-xs font-bold text-white">{item.date}</span>
                                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_CLASSES[item.status]}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-[#8899AA]">{item.reason}</p>
                                </li>
                            ))}
                        </ul>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-4 w-full justify-center"
                            iconRight={<ChevronRight size={14} aria-hidden="true" />}
                        >
                            View Full History
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
