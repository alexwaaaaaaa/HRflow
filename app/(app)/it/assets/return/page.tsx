"use client";

import { Laptop, Calendar, MessageSquare, AlertTriangle, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
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

const returnAssetSchema = z.object({
    assetId: z.string().min(1, "Please select an asset"),
    returnDate: z.string().min(1, "Return date is required"),
    condition: z.enum(["Good (Normal Wear)", "Damaged (Needs Repair)", "Lost / Stolen"]),
    action: z.enum(["Pool", "Repair", "WriteOff"]),
    notes: z.string().optional(),
});

type ReturnAssetForm = z.infer<typeof returnAssetSchema>;

// ─── Static data ─────────────────────────────────────────────────────────────

const CONDITIONS = ["Good (Normal Wear)", "Damaged (Needs Repair)", "Lost / Stolen"] as const;

const POST_RETURN_ACTIONS = [
    { id: "Pool" as const, label: "Return to Pool", desc: "Ready for reassignment" },
    { id: "Repair" as const, label: "Send to Repair", desc: "Log maint. ticket" },
    { id: "WriteOff" as const, label: "Write-off", desc: "Depreciate & dispose" },
];

const ACTION_ACTIVE_CLASSES: Record<"Pool" | "Repair" | "WriteOff", string> = {
    Pool: "border-[#00e5a0] bg-[rgba(0,229,160,0.1)]",
    Repair: "border-[#f59e0b] bg-[rgba(245,158,11,0.1)]",
    WriteOff: "border-[#ef4444] bg-[rgba(239,68,68,0.1)]",
};

const ACTION_CHECK_CLASSES: Record<"Pool" | "Repair" | "WriteOff", string> = {
    Pool: "text-[#00e5a0]",
    Repair: "text-[#f59e0b]",
    WriteOff: "text-[#ef4444]",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AssetReturnPage() {
    const toast = useToast();
    const { control, handleSubmit, watch, formState: { isSubmitting } } = useForm<ReturnAssetForm>({
        resolver: zodResolver(returnAssetSchema),
        defaultValues: {
            assetId: "",
            returnDate: "",
            condition: "Good (Normal Wear)",
            action: "Pool",
            notes: "",
        },
    });

    // eslint-disable-next-line react-hooks/incompatible-library -- RHF watch() is intentional; condition/action drive the warning banner
    const condition = watch("condition");
    const action = watch("action");
    const showWarning = (condition === "Damaged (Needs Repair)" || condition === "Lost / Stolen") && action === "Pool";

    const onSubmit = async (_data: ReturnAssetForm) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 700));
        toast.show({ variant: "success", title: "Return processed", description: "The asset return has been recorded and status updated." });
    };

    return (
        <Page
            title="Process Asset Return"
            subtitle="Record an asset returned by an employee and update its status"
            breadcrumbs={[
                { label: "IT", href: "/it/dashboard" },
                { label: "Assets", href: "/it/assets" },
                { label: "Return" },
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Asset return form">
                <Card padding="lg">
                    <div className="space-y-6">
                        {/* Asset search */}
                        <div className="space-y-1.5">
                            <label htmlFor="return-asset-id" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                <Laptop size={14} aria-hidden="true" /> Asset to Return
                            </label>
                            <FormField
                                control={control}
                                name="assetId"
                                inputProps={{
                                    id: "return-asset-id",
                                    placeholder: "Search by Asset ID or Assigned Employee…",
                                }}
                            />
                            <p className="text-xs text-[#8899AA]">Displays currently 'Assigned' assets.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Return date */}
                            <div className="space-y-1.5">
                                <label htmlFor="return-date" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                    <Calendar size={14} aria-hidden="true" /> Return Date
                                </label>
                                <FormField
                                    control={control}
                                    name="returnDate"
                                    inputProps={{ id: "return-date", type: "date" }}
                                />
                            </div>

                            {/* Condition */}
                            <Controller
                                control={control}
                                name="condition"
                                render={({ field }) => (
                                    <div className="space-y-1.5">
                                        <label htmlFor="return-condition" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                            <ShieldCheck size={14} aria-hidden="true" /> Condition Upon Return
                                        </label>
                                        <select
                                            id="return-condition"
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

                        {/* Post-return action */}
                        <div className="border-t border-[#1A2A3A] pt-4">
                            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">Post-Return Action</p>
                            <Controller
                                control={control}
                                name="action"
                                render={({ field }) => (
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3" role="radiogroup" aria-label="Post-return action">
                                        {POST_RETURN_ACTIONS.map((act) => {
                                            const isActive = field.value === act.id;
                                            return (
                                                <Button
                                                    key={act.id}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={isActive}
                                                    variant={isActive ? "secondary" : "ghost"}
                                                    onClick={() => field.onChange(act.id)}
                                                    className={`flex flex-col items-start rounded-xl p-4 h-auto text-left ${isActive ? ACTION_ACTIVE_CLASSES[act.id] : ""}`}
                                                >
                                                    <div className="mb-1 flex w-full items-center justify-between">
                                                        <span className={`text-sm font-bold ${isActive ? "text-white" : ""}`}>{act.label}</span>
                                                        {isActive && (
                                                            <CheckCircle2
                                                                size={16}
                                                                className={ACTION_CHECK_CLASSES[act.id]}
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                    </div>
                                                    <p className={`text-[10px] ${isActive ? "text-[#8899AA]" : "text-[#445566]"}`}>{act.desc}</p>
                                                </Button>
                                            );
                                        })}
                                    </div>
                                )}
                            />
                        </div>

                        {/* Notes */}
                        <div className="border-t border-[#1A2A3A] pt-4">
                            <label htmlFor="return-notes" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                <MessageSquare size={14} aria-hidden="true" /> Inspection Notes
                            </label>
                            <Controller
                                control={control}
                                name="notes"
                                render={({ field }) => (
                                    <textarea
                                        id="return-notes"
                                        {...field}
                                        rows={4}
                                        placeholder="Detail any damages, missing chargers, or reasons for write-off…"
                                        className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none transition-colors focus:border-[#00e5a0]"
                                    />
                                )}
                            />
                            {showWarning && (
                                <p className="mt-2 flex items-start gap-1 text-xs text-[#ef4444]" role="alert">
                                    <AlertTriangle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                                    Warning: You marked the asset as {condition} but selected "Return to Pool". Consider sending it to repair.
                                </p>
                            )}
                        </div>
                    </div>
                </Card>

                <div className="flex items-center justify-end gap-4">
                    <Button variant="outline" href="/it/assets">Cancel</Button>
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        loadingText="Processing…"
                        className="bg-[#f59e0b] text-[#060B14] hover:bg-[#e6a600]"
                    >
                        Complete Return Process
                    </Button>
                </div>
            </form>
        </Page>
    );
}
