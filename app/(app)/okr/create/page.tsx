"use client";

import { Target, Plus, Trash2, Save } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const keyResultSchema = z.object({
    title: z.string().min(1, "Key result title is required"),
    target: z.string().min(1, "Target value is required"),
    unit: z.string().min(1, "Unit is required"),
    metric: z.enum(["Numeric", "Percentage", "Boolean", "Currency"]),
});

const createOkrSchema = z.object({
    title: z.string().min(5, "Objective title must be at least 5 characters"),
    description: z.string().optional(),
    owner: z.string().min(1, "Owner is required"),
    cycle: z.string().min(1, "Cycle is required"),
    type: z.enum(["company", "department", "individual"]),
    keyResults: z.array(keyResultSchema).min(1, "At least one key result is required"),
});

type CreateOkrValues = z.infer<typeof createOkrSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const QUARTERS = ["Q1 2025 (Jan–Mar)", "Q2 2025 (Apr–Jun)", "Q3 2025 (Jul–Sep)", "Q4 2025 (Oct–Dec)"] as const;
const ALIGN_OPTIONS = ["Company: Achieve ₹100 Cr ARR", "Company: 95% Retention", "Dept: Engineering Velocity", "Dept: Sales Growth", "None (Independent)"] as const;
const OWNERS = ["Myself", "Priya Mehta", "Ravi Kumar", "Arjun Singh", "Sneha Rao"] as const;
const METRIC_TYPES = ["Numeric", "Percentage", "Boolean", "Currency"] as const;

const OKR_TYPES = [
    { value: "company", label: "Company" },
    { value: "department", label: "Department" },
    { value: "individual", label: "Individual" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function SelectField({
    id,
    label,
    value,
    options,
    onChange,
}: {
    id: string;
    label: string;
    value: string;
    options: readonly string[];
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-semibold text-[#8899AA] mb-1.5">{label}</label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00e5a0] appearance-none cursor-pointer"
            >
                {options.map((o) => <option key={o}>{o}</option>)}
            </select>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function CreateOKRPage() {
    const toast = useToast();

    const { control, handleSubmit, register, formState: { isSubmitting, errors } } = useForm<CreateOkrValues>({
        resolver: zodResolver(createOkrSchema),
        defaultValues: {
            title: "",
            description: "",
            owner: OWNERS[0],
            cycle: QUARTERS[0],
            type: "individual",
            keyResults: [{ title: "", target: "", unit: "", metric: "Numeric" }],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "keyResults" });

    const onSubmit = async (_data: CreateOkrValues) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 1000));
        toast.show({
            variant: "success",
            title: "OKR created",
            description: "Your objective and key results have been saved.",
        });
    };

    return (
        <Page
            title="Create OKR"
            subtitle="Define a new objective and its key results"
            breadcrumbs={[
                { label: "OKRs", href: "/okr/dashboard" },
                { label: "My OKRs", href: "/okr/my-okrs" },
                { label: "Create OKR" },
            ]}
            maxWidth="800px"
            actions={
                <div className="flex items-center gap-2">






                    <Button variant="outline" href="/okr/my-okrs">Cancel</Button>
                    <Button
                        type="submit"
                        form="create-okr-form"
                        isLoading={isSubmitting}
                        loadingText="Saving…"
                        icon={<Save size={14} />}
                    >
                        Save OKR
                    </Button>
                </div>
            }
        >
            <form id="create-okr-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">

                {/* Objective Details */}
                <Card padding="lg">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-5">
                        <Target size={16} className="text-[#00E5A0]" aria-hidden="true" /> Objective Details
                    </h2>

                    <div className="space-y-5">
                        <FormField
                            control={control}
                            name="title"
                            label="Objective Title"
                            inputProps={{ placeholder: "e.g. Drive 40% growth in cloud business…" }}
                        />

                        <FormField
                            control={control}
                            name="description"
                            label="Description (optional)"
                            inputProps={{ placeholder: "Brief context for this objective…" }}
                        />

                        {/* OKR Type */}
                        <div>
                            <p className="text-xs font-semibold text-[#8899AA] mb-2">OKR Type</p>
                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) => (
                                    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="OKR type">
                                        {OKR_TYPES.map((opt) => (
                                            <label key={opt.value} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={opt.value}
                                                    checked={field.value === opt.value}
                                                    onChange={() => field.onChange(opt.value)}
                                                    className="sr-only"
                                                />
                                                <span
                                                    className={`inline-flex items-center px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                                                        field.value === opt.value
                                                            ? "border-[#00e5a0] bg-[#00e5a0]/10 text-[#00e5a0]"
                                                            : "border-[#1A2A3A] text-[#8899AA] hover:border-[#2A3A4A]"
                                                    }`}
                                                >
                                                    {opt.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Controller
                                control={control}
                                name="cycle"
                                render={({ field }) => (
                                    <SelectField
                                        id="cycle-select"
                                        label="Quarter / Cycle"
                                        value={field.value}
                                        options={QUARTERS}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <div>
                                <label htmlFor="align-select" className="block text-xs font-semibold text-[#8899AA] mb-1.5">Align To</label>
                                <select
                                    id="align-select"
                                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00e5a0] appearance-none cursor-pointer"
                                >
                                    {ALIGN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                                </select>
                            </div>
                            <Controller
                                control={control}
                                name="owner"
                                render={({ field }) => (
                                    <SelectField
                                        id="owner-select"
                                        label="Owner"
                                        value={field.value}
                                        options={OWNERS}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </Card>

                {/* Key Results */}
                <section aria-labelledby="kr-heading">
                    <div className="flex items-center justify-between mb-4">
                        <h2 id="kr-heading" className="text-base font-semibold text-white">Key Results</h2>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            icon={<Plus size={12} />}
                            onClick={() => append({ title: "", target: "", unit: "", metric: "Numeric" })}
                        >
                            Add Key Result
                        </Button>
                    </div>
                    {errors.keyResults?.root && (
                        <p className="mb-3 text-xs text-red-400" role="alert">{errors.keyResults.root.message}</p>
                    )}

                    <ol role="list" className="space-y-4">
                        {fields.map((field, i) => (
                            <li key={field.id}>
                                <Card padding="md">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-[#445566] uppercase tracking-wider">Key Result {i + 1}</span>
                                        {fields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                icon={<Trash2 size={14} />}
                                                aria-label={`Remove key result ${i + 1}`}
                                                onClick={() => remove(i)}
                                            />
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <FormField
                                            control={control}
                                            name={`keyResults.${i}.title`}
                                            label="Key Result Title"
                                            inputProps={{ placeholder: "e.g. Increase MRR to ₹30 Lakhs…" }}
                                        />
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label htmlFor={`metric-${field.id}`} className="block text-xs font-semibold text-[#8899AA] mb-1.5">Metric Type</label>
                                                <select
                                                    id={`metric-${field.id}`}
                                                    {...register(`keyResults.${i}.metric`)}
                                                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00e5a0] appearance-none"
                                                >
                                                    {METRIC_TYPES.map((o) => <option key={o}>{o}</option>)}
                                                </select>
                                            </div>
                                            <FormField
                                                control={control}
                                                name={`keyResults.${i}.target`}
                                                label="Target Value"
                                                inputProps={{ type: "number", placeholder: "100" }}
                                            />
                                            <FormField
                                                control={control}
                                                name={`keyResults.${i}.unit`}
                                                label="Unit"
                                                inputProps={{ placeholder: "%, ₹, deals…" }}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </li>
                        ))}
                    </ol>
                </section>
            </form>
        

        

        

        </Page>
    );
}
