"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, ChevronRight, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─── Zod schemas per step ────────────────────────────────────────────────────

const step1Schema = z.object({
    legalName: z.string().min(3, "Legal name must be at least 3 characters"),
    entityType: z.enum(["Subsidiary", "Joint Venture", "Foreign Branch", "Acquired Company"]),
    parentEntity: z.string().min(1, "Parent entity is required"),
    country: z.enum(["India", "United States", "Singapore", "United Arab Emirates"]),
    currency: z.enum(["INR - Indian Rupee", "USD - US Dollar", "SGD - Singapore Dollar", "AED - UAE Dirham"]),
});

const step2Schema = z.object({
    cin: z.string().min(1, "CIN is required"),
    pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format"),
    tan: z.string().min(1, "TAN is required"),
    gstin: z.string().min(1, "GSTIN is required"),
});

const step3Schema = z.object({
    inheritPayroll: z.boolean(),
    sharedEmployeeMaster: z.boolean(),
    enableTransfers: z.boolean(),
});

type Step1Values = z.infer<typeof step1Schema>;
type Step2Values = z.infer<typeof step2Schema>;
type Step3Values = z.infer<typeof step3Schema>;

// ─── Static config ────────────────────────────────────────────────────────────

const STEPS = [
    { id: 1, label: "Basic Information" },
    { id: 2, label: "Registrations & Compliance" },
    { id: 3, label: "Configurations" },
] as const;

const STEP_PROGRESS_CLASSES: Record<number, string> = {
    1: "bg-[#4f46e5]",
    2: "bg-[#4f46e5]",
    3: "bg-[#4f46e5]",
};

// ─── Sub-components (module scope — never inside render) ──────────────────────

function StepIndicator({ current }: { current: number }) {
    return (
        <ol className="flex items-center gap-2" aria-label="Entity creation progress">
            {STEPS.map((s, i) => {
                const reached = current >= s.id;
                const active = current === s.id;
                return (
                    <li key={s.id} className="flex items-center gap-2">
                        <span
                            aria-current={active ? "step" : undefined}
                            className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors ${
                                reached
                                    ? "border-[#4f46e5] bg-[rgba(79,70,229,0.1)] text-[#818cf8]"
                                    : "border-[#1A2A3A] text-[#7a8fa6]"
                            }`}
                        >
                            {s.id}
                        </span>
                        <span className={`text-xs font-medium ${reached ? "text-white" : "text-[#7a8fa6]"}`}>
                            {s.label}
                        </span>
                        {i < STEPS.length - 1 && (
                            <span className="hidden h-px w-8 bg-[#1A2A3A] sm:block" aria-hidden="true" />
                        )}
                    </li>
                );
            })}
        </ol>
    );
}

function ProgressBar({ step }: { step: number }) {
    return (
        <div className="flex gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label="Step progress">
            {STEPS.map((s) => (
                <div
                    key={s.id}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                        step >= s.id ? STEP_PROGRESS_CLASSES[s.id] : "bg-[#1A2A3A]"
                    }`}
                />
            ))}
        </div>
    );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">{label}</span>
            {children}
        </div>
    );
}

function ConfigToggle({
    id,
    title,
    description,
    checked,
    onChange,
}: {
    id: string;
    title: string;
    description: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <div className="flex items-start justify-between gap-4 rounded-xl border border-[#2A3A4A] bg-[#0D1928] p-5">
            <div className="flex-1">
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="mt-1 text-xs text-[#8899AA]">{description}</p>
            </div>
            <label htmlFor={id} className="sr-only">
                {title}
            </label>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-1 h-5 w-5 accent-[#4f46e5] rounded border-[#2A3A4A]"
            />
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AddEntityPage() {
    const toast = useToast();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [submitting, setSubmitting] = useState(false);

    const form1 = useForm<Step1Values>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            legalName: "",
            entityType: "Subsidiary",
            parentEntity: "Acme Technologies Pvt Ltd (Root)",
            country: "India",
            currency: "INR - Indian Rupee",
        },
    });

    const form2 = useForm<Step2Values>({
        resolver: zodResolver(step2Schema),
        defaultValues: { cin: "", pan: "", tan: "", gstin: "" },
    });

    const form3 = useForm<Step3Values>({
        resolver: zodResolver(step3Schema),
        defaultValues: { inheritPayroll: true, sharedEmployeeMaster: true, enableTransfers: true },
    });

    const handleStep1 = form1.handleSubmit(() => setStep(2));
    const handleStep2 = form2.handleSubmit(() => setStep(3));

    const handleStep3 = form3.handleSubmit(async () => {
        setSubmitting(true);
        try {
            // TODO: replace with real mutation once backend is wired
            await new Promise((r) => setTimeout(r, 800));
            toast.show({
                variant: "success",
                title: "Entity created",
                description: `${form1.getValues("legalName")} has been added to the group.`,
            });
            form1.reset();
            form2.reset();
            form3.reset();
            setStep(1);
        } catch {
            toast.show({
                variant: "danger",
                title: "Could not create entity",
                description: "Please try again. If the problem persists, contact support.",
            });
        } finally {
            setSubmitting(false);
        }
    });

    const inputCls =
        "w-full rounded-xl border border-[#2A3A4A] bg-[#0D1928] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#4f46e5]";

    return (
        <Page
            title="Create New Entity"
            subtitle="Configure a new subsidiary, joint venture, or acquired company"
            breadcrumbs={[
                { label: "Multi-Entity", href: "/multi-entity/list" },
                { label: "Add Entity" },
            ]}
            maxWidth="900px"
            actions={
                <Button variant="secondary" icon={<Building2 size={14} />





} onClick={() => window.history.back()}>
                    Back to Entities
                </Button>
            }
        >
            <div className="space-y-6">
                <StepIndicator current={step} />
                <ProgressBar step={step} />

                <Card padding="lg">
                    {step === 1 && (
                        <form onSubmit={handleStep1} aria-label="Step 1: Basic Information">
                            <fieldset className="space-y-6">
                                <legend className="border-b border-[#1A2A3A] pb-4 text-lg font-bold text-white">
                                    Step 1: Basic Information
                                </legend>

                                <FieldRow label="Legal Entity Name *">
                                    <input
                                        {...form1.register("legalName")}
                                        type="text"
                                        id="legalName"
                                        placeholder="e.g. Acme Retail Solutions Pvt Ltd"
                                        className={inputCls}
                                        aria-invalid={!!form1.formState.errors.legalName}
                                        aria-describedby={form1.formState.errors.legalName ? "legalName-error" : undefined}
                                    />
                                    {form1.formState.errors.legalName && (
                                        <p id="legalName-error" role="alert" className="text-xs text-red-400">
                                            {form1.formState.errors.legalName.message}
                                        </p>
                                    )}
                                </FieldRow>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <FieldRow label="Entity Type">
                                        <select {...form1.register("entityType")} id="entityType" className={inputCls}>
                                            <option>Subsidiary</option>
                                            <option>Joint Venture</option>
                                            <option>Foreign Branch</option>
                                            <option>Acquired Company</option>
                                        </select>
                                    </FieldRow>
                                    <FieldRow label="Parent Entity">
                                        <select {...form1.register("parentEntity")} id="parentEntity" className={inputCls}>
                                            <option>Acme Technologies Pvt Ltd (Root)</option>
                                        </select>
                                    </FieldRow>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <FieldRow label="Country of Incorporation">
                                        <select {...form1.register("country")} id="country" className={inputCls}>
                                            <option>India</option>
                                            <option>United States</option>
                                            <option>Singapore</option>
                                            <option>United Arab Emirates</option>
                                        </select>
                                    </FieldRow>
                                    <FieldRow label="Default Currency">
                                        <select {...form1.register("currency")} id="currency" className={inputCls}>
                                            <option>INR - Indian Rupee</option>
                                            <option>USD - US Dollar</option>
                                            <option>SGD - Singapore Dollar</option>
                                            <option>AED - UAE Dirham</option>
                                        </select>
                                    </FieldRow>
                                </div>

                                <div className="flex justify-end border-t border-[#1A2A3A] pt-6">
                                    <Button type="submit" iconRight={<ChevronRight size={16} />}>
                                        Continue
                                    </Button>
                                </div>
                            </fieldset>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleStep2} aria-label="Step 2: Registrations and Compliance">
                            <fieldset className="space-y-6">
                                <legend className="border-b border-[#1A2A3A] pb-4 text-lg font-bold text-white">
                                    Step 2: Registrations &amp; Compliance
                                </legend>

                                <FieldRow label="Company Registration Number (CIN)">
                                    <input
                                        {...form2.register("cin")}
                                        type="text"
                                        id="cin"
                                        placeholder="U72900MH2025PTC123456"
                                        className={inputCls}
                                        aria-invalid={!!form2.formState.errors.cin}
                                    />
                                    {form2.formState.errors.cin && (
                                        <p role="alert" className="text-xs text-red-400">
                                            {form2.formState.errors.cin.message}
                                        </p>
                                    )}
                                </FieldRow>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <FieldRow label="Corporate PAN">
                                        <input
                                            {...form2.register("pan")}
                                            type="text"
                                            id="pan"
                                            placeholder="ABCDE1234F"
                                            className={`${inputCls} uppercase`}
                                            aria-invalid={!!form2.formState.errors.pan}
                                        />
                                        {form2.formState.errors.pan && (
                                            <p role="alert" className="text-xs text-red-400">
                                                {form2.formState.errors.pan.message}
                                            </p>
                                        )}
                                    </FieldRow>
                                    <FieldRow label="Corporate TAN">
                                        <input
                                            {...form2.register("tan")}
                                            type="text"
                                            id="tan"
                                            placeholder="MUMA12345B"
                                            className={`${inputCls} uppercase`}
                                            aria-invalid={!!form2.formState.errors.tan}
                                        />
                                        {form2.formState.errors.tan && (
                                            <p role="alert" className="text-xs text-red-400">
                                                {form2.formState.errors.tan.message}
                                            </p>
                                        )}
                                    </FieldRow>
                                </div>

                                <FieldRow label="GSTIN">
                                    <input
                                        {...form2.register("gstin")}
                                        type="text"
                                        id="gstin"
                                        placeholder="27ABCDE1234F1Z5"
                                        className={`${inputCls} uppercase`}
                                        aria-invalid={!!form2.formState.errors.gstin}
                                    />
                                    {form2.formState.errors.gstin && (
                                        <p role="alert" className="text-xs text-red-400">
                                            {form2.formState.errors.gstin.message}
                                        </p>
                                    )}
                                </FieldRow>

                                <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-6">
                                    <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                                        Back
                                    </Button>
                                    <Button type="submit" iconRight={<ChevronRight size={16} />}>
                                        Continue
                                    </Button>
                                </div>
                            </fieldset>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleStep3} aria-label="Step 3: Configurations">
                            <fieldset className="space-y-6">
                                <legend className="border-b border-[#1A2A3A] pb-4 text-lg font-bold text-white">
                                    Step 3: Configurations
                                </legend>

                                <ConfigToggle
                                    id="inheritPayroll"
                                    title="Inherit Global Payroll Settings"
                                    description="If checked, this entity will use the same payroll cycle, statutory components, and leave policies as the parent company."
                                    checked={form3.watch("inheritPayroll")}
                                    onChange={(v) => form3.setValue("inheritPayroll", v)}
                                />
                                <ConfigToggle
                                    id="sharedEmployeeMaster"
                                    title="Shared Employee Master"
                                    description="Allow employee ID sequential generation to continue from the parent entity (Global ID routing)."
                                    checked={form3.watch("sharedEmployeeMaster")}
                                    onChange={(v) => form3.setValue("sharedEmployeeMaster", v)}
                                />
                                <ConfigToggle
                                    id="enableTransfers"
                                    title="Enable Inter-entity Transfers"
                                    description="Allow employees to be cross-transferred from other entities without data loss."
                                    checked={form3.watch("enableTransfers")}
                                    onChange={(v) => form3.setValue("enableTransfers", v)}
                                />

                                <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-6">
                                    <Button type="button" variant="secondary" onClick={() => setStep(2)}>
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        isLoading={submitting}
                                        loadingText="Creating…"
                                        icon={<Save size={14} />}
                                    >
                                        Create Entity
                                    </Button>
                                </div>
                            </fieldset>
                        </form>
                    )}
                </Card>
            </div>
        

        

        

        </Page>
    );
}
