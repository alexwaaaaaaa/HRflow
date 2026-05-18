"use client";

import { MapPin, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ──────────────────────────────────────────────────────────────────

const fieldVisitSchema = z.object({
    visitDate: z.string().min(1, "Date is required"),
    clientName: z.string().min(2, "Client / site name is required"),
    location: z.string().min(2, "Meeting location is required"),
    agenda: z.string().min(5, "Please provide at least 5 characters"),
});

type FieldVisitForm = z.infer<typeof fieldVisitSchema>;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FieldVisitRequestPage() {
    const toast = useToast();
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<FieldVisitForm>({
        resolver: zodResolver(fieldVisitSchema),
        defaultValues: { visitDate: "", clientName: "", location: "", agenda: "" },
    });

    const onSubmit = async (_data: FieldVisitForm) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 600));
        toast.show({ variant: "success", title: "Field visit logged", description: "Your visit has been submitted for attendance marking." });
        reset();
    };

    return (
        <Page
            title="Log Field Visit"
            subtitle="Submit official out-of-office client visits or site travel for attendance marking"
            breadcrumbs={[
                { label: "Hybrid", href: "/hybrid/wfh/request" },
                { label: "Field Visit Request" },
            ]}
            maxWidth="900px"
        >
            <Card padding="lg">
                <h2 className="mb-6 flex items-center gap-2 border-b border-[#1A2A3A] pb-4 text-base font-semibold text-white">
                    <MapPin size={18} className="text-[#f59e0b]" aria-hidden="true" />
                    Visit Details
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Field visit log form">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FormField
                            control={control}
                            name="visitDate"
                            label="Date of Visit"
                            inputProps={{ type: "date" }}
                        />
                        <FormField
                            control={control}
                            name="clientName"
                            label="Client / Site Name"
                            inputProps={{ placeholder: "e.g. Acme Corp Headquarters" }}
                        />
                    </div>

                    {/* Location with search icon */}
                    <div className="space-y-1.5">
                        <label htmlFor="field-location" className="block text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                            Meeting Location
                        </label>
                        <div className="relative">
                            <Search
                                size={14}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8fa6]"
                                aria-hidden="true"
                            />
                            <input
                                id="field-location"
                                type="text"
                                placeholder="Search address to tag location…"
                                className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] pl-9 pr-3 text-sm text-white outline-none placeholder:text-[#7a8fa6] transition-colors focus:border-[#00e5a0]"
                            />
                        </div>
                    </div>

                    <FormField
                        control={control}
                        name="agenda"
                        label="Agenda / Remarks"
                        hint="Brief description of the visit"
                        inputProps={{ placeholder: "Brief description of the visit…" }}
                    />

                    <div className="flex justify-end border-t border-[#1A2A3A] pt-4">
                        <Button type="submit" isLoading={isSubmitting} loadingText="Submitting…">
                            Submit Log
                        </Button>
                    </div>
                </form>
            </Card>
        </Page>
    );
}
