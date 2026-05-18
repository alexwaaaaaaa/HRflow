"use client";

import { Briefcase } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ──────────────────────────────────────────────────────────────────

const outdoorDutySchema = z.object({
    fromDate: z.string().min(1, "From date is required"),
    toDate: z.string().min(1, "To date is required"),
    purpose: z.string().min(1, "Please select a purpose"),
    location: z.string().min(2, "Location / venue is required"),
    remarks: z.string().optional(),
});

type OutdoorDutyForm = z.infer<typeof outdoorDutySchema>;

const PURPOSES = [
    "Client Site Deployment",
    "Training / Workshop",
    "Conference / Seminar",
    "Company Event",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OutdoorDutyRequestPage() {
    const toast = useToast();
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<OutdoorDutyForm>({
        resolver: zodResolver(outdoorDutySchema),
        defaultValues: { fromDate: "", toDate: "", purpose: "", location: "", remarks: "" },
    });

    const onSubmit = async (_data: OutdoorDutyForm) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 600));
        toast.show({ variant: "success", title: "OD request submitted", description: "Your outdoor duty request has been sent for approval." });
        reset();
    };

    return (
        <Page
            title="Outdoor Duty Request"
            subtitle="Apply for On-Duty (OD) marking for off-site training, conferences, or long-term client deployments"
            breadcrumbs={[
                { label: "Hybrid", href: "/hybrid/wfh/request" },
                { label: "Outdoor Duty Request" },
            ]}
            maxWidth="1100px"
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Form — 2 cols */}
                <div className="lg:col-span-2">
                    <Card padding="lg">
                        <h2 className="mb-6 flex items-center gap-2 border-b border-[#1A2A3A] pb-4 text-base font-semibold text-white">
                            <Briefcase size={18} className="text-[#3b82f6]" aria-hidden="true" />
                            Duty Details
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Outdoor duty request form">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <FormField
                                    control={control}
                                    name="fromDate"
                                    label="From Date"
                                    inputProps={{ type: "date" }}
                                />
                                <FormField
                                    control={control}
                                    name="toDate"
                                    label="To Date"
                                    inputProps={{ type: "date" }}
                                />
                            </div>

                            {/* Purpose select */}
                            <Controller
                                control={control}
                                name="purpose"
                                render={({ field, fieldState }) => (
                                    <div className="space-y-1.5">
                                        <label htmlFor="od-purpose" className="block text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                            Purpose of Duty
                                        </label>
                                        <select
                                            id="od-purpose"
                                            {...field}
                                            className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none transition-colors focus:border-[#00e5a0]"
                                        >
                                            <option value="">Select Purpose…</option>
                                            {PURPOSES.map((p) => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                        {fieldState.error && (
                                            <p className="text-xs text-[#ef4444]" role="alert">{fieldState.error.message}</p>
                                        )}
                                    </div>
                                )}
                            />

                            <FormField
                                control={control}
                                name="location"
                                label="Location / Venue"
                                inputProps={{ placeholder: "City / specific venue name" }}
                            />

                            <FormField
                                control={control}
                                name="remarks"
                                label="Additional Remarks"
                                hint="Optional"
                                inputProps={{ placeholder: "Any other details…" }}
                            />

                            <div className="flex justify-end pt-2">
                                <Button type="submit" isLoading={isSubmitting} loadingText="Submitting…">
                                    Submit Request
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Info sidebar */}
                <div>
                    <Card padding="md" className="border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.1)]">
                        <h3 className="mb-2 text-sm font-bold text-[#00e5a0]">How OD Works</h3>
                        <p className="text-xs leading-relaxed text-[#8899AA]">
                            Approved OD requests will automatically mark your attendance as{" "}
                            <strong className="text-white">Present (Full Day)</strong> for the specified duration,
                            bypassing biometric and app punch requirements.
                        </p>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
