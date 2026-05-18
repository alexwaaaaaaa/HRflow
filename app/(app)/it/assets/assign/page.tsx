"use client";

import { Laptop, User, Calendar, MessageSquare, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ──────────────────────────────────────────────────────────────────

const assignAssetSchema = z.object({
    assetId: z.string().min(1, "Please select an asset"),
    employee: z.string().min(2, "Please select an employee"),
    date: z.string().min(1, "Assignment date is required"),
    condition: z.enum(["Excellent (New)", "Good (Slight Wear)", "Fair (Visible Wear)"]),
    isTemporary: z.boolean(),
    returnDate: z.string().optional(),
    notes: z.string().optional(),
}).refine(
    (d) => !d.isTemporary || (d.returnDate && d.returnDate.length > 0),
    { message: "Return date is required for temporary assignments", path: ["returnDate"] }
);

type AssignAssetForm = z.infer<typeof assignAssetSchema>;

const CONDITIONS = ["Excellent (New)", "Good (Slight Wear)", "Fair (Visible Wear)"] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AssetAssignPage() {
    const toast = useToast();
    const { control, handleSubmit, watch, formState: { isSubmitting } } = useForm<AssignAssetForm>({
        resolver: zodResolver(assignAssetSchema),
        defaultValues: {
            assetId: "",
            employee: "",
            date: "",
            condition: "Excellent (New)",
            isTemporary: false,
            returnDate: "",
            notes: "",
        },
    });

    // eslint-disable-next-line react-hooks/incompatible-library -- RHF watch() is intentional; isTemporary drives conditional return-date field
    const isTemporary = watch("isTemporary");

    const onSubmit = async (_data: AssignAssetForm) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 700));
        toast.show({ variant: "success", title: "Asset assigned", description: "The asset has been allocated to the employee." });
    };

    return (
        <Page
            title="Assign Asset"
            subtitle="Allocate hardware to an employee and record its condition"
            breadcrumbs={[
                { label: "IT", href: "/it/dashboard" },
                { label: "Assets", href: "/it/assets" },
                { label: "Assign" },
            ]}
            maxWidth="900px"
            actions={
                <Link href="/it/assets">
                    <Button variant="outline" icon={<ArrowLeft size={14} aria-hidden="true" />}>
                        Back to Assets
                    </Button>
                </Link>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Assign asset form">
                <Card padding="lg">
                    <div className="space-y-6">
                        {/* Asset search */}
                        <div className="space-y-1.5">
                            <label htmlFor="assign-asset-id" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                <Laptop size={14} aria-hidden="true" /> Select Asset
                            </label>
                            <FormField
                                control={control}
                                name="assetId"
                                inputProps={{
                                    id: "assign-asset-id",
                                    placeholder: "Search by Asset ID, Name, or Serial…",
                                }}
                            />
                            <p className="text-xs text-[#8899AA]">Only displaying 'Available' assets in the unassigned pool.</p>
                        </div>

                        {/* Employee search */}
                        <div className="space-y-1.5">
                            <label htmlFor="assign-employee" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                <User size={14} aria-hidden="true" /> Assign To Employee
                            </label>
                            <FormField
                                control={control}
                                name="employee"
                                inputProps={{
                                    id: "assign-employee",
                                    placeholder: "Search by Employee Name or Email…",
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Date */}
                            <div className="space-y-1.5">
                                <label htmlFor="assign-date" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                    <Calendar size={14} aria-hidden="true" /> Assignment Date
                                </label>
                                <FormField
                                    control={control}
                                    name="date"
                                    inputProps={{ id: "assign-date", type: "date" }}
                                />
                            </div>

                            {/* Condition */}
                            <Controller
                                control={control}
                                name="condition"
                                render={({ field }) => (
                                    <div className="space-y-1.5">
                                        <label htmlFor="assign-condition" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                            <CheckCircle2 size={14} aria-hidden="true" /> Asset Condition
                                        </label>
                                        <select
                                            id="assign-condition"
                                            {...field}
                                            className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none transition-colors focus:border-[#00e5a0]"
                                        >
                                            {CONDITIONS.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            />
                        </div>

                        {/* Temporary assignment toggle */}
                        <div className="border-t border-[#1A2A3A] pt-4">
                            <Controller
                                control={control}
                                name="isTemporary"
                                render={({ field }) => (
                                    <label htmlFor="assign-temporary" className="mb-4 flex cursor-pointer items-center gap-3">
                                        <input
                                            id="assign-temporary"
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="h-5 w-5 rounded border border-[#1A2A3A] bg-[#060B14] accent-[#33E6FF]"
                                        />
                                        <span className="text-sm font-bold text-white">This is a temporary assignment / Loaner</span>
                                    </label>
                                )}
                            />

                            {isTemporary && (
                                <div className="pl-8">
                                    <FormField
                                        control={control}
                                        name="returnDate"
                                        label="Expected Return Date"
                                        inputProps={{ type: "date" }}
                                    />
                                    <p className="mt-2 text-xs text-[#f59e0b]">
                                        Employee will receive an automated reminder 3 days before this date.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Notes */}
                        <div className="border-t border-[#1A2A3A] pt-4">
                            <label htmlFor="assign-notes" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                <MessageSquare size={14} aria-hidden="true" /> Additional Notes
                            </label>
                            <Controller
                                control={control}
                                name="notes"
                                render={({ field }) => (
                                    <textarea
                                        id="assign-notes"
                                        {...field}
                                        rows={4}
                                        placeholder="Any scratches, missing accessories, or special instructions…"
                                        className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none transition-colors focus:border-[#00e5a0]"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </Card>

                <div className="flex items-center justify-end gap-4">
                    <Button variant="outline" href="/it/assets">Cancel</Button>
                    <Button type="submit" isLoading={isSubmitting} loadingText="Assigning…">
                        Assign to Employee
                    </Button>
                </div>
            </form>
        </Page>
    );
}
