"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, UserCheck, AlertTriangle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ───────────────────────────────────────────────────────────────────

const transferSchema = z.object({
    employeeSearch: z.string().min(1, "Please select an employee"),
    effectiveDate: z.string().min(1, "Effective date is required"),
    targetEntity: z.string().min(1, "Target entity is required"),
    carryLeave: z.boolean(),
    maintainGratuity: z.boolean(),
});

type TransferValues = z.infer<typeof transferSchema>;

// ─── Static data ──────────────────────────────────────────────────────────────

const MOCK_EMPLOYEE = {
    initials: "RK",
    name: "Rahul Kapoor",
    empId: "EMP-042",
    role: "Sales Director",
    currentEntity: "Acme Tech (Parent)",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldRow({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label htmlFor={htmlFor} className="block text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                {label}
            </label>
            {children}
        </div>
    );
}

const inputCls =
    "w-full rounded-xl border border-[#2A3A4A] bg-[#0D1928] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#00e5a0]";

function CheckboxRow({
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
        <label
            htmlFor={id}
            className="flex cursor-pointer items-start gap-4 rounded-xl border border-[#2A3A4A] bg-[#0D1928] p-3 transition-colors hover:border-[#00e5a0]/50"
        >
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#00e5a0]"
            />
            <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="mt-0.5 text-xs text-[#8899AA]">{description}</p>
            </div>
        </label>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InterEntityTransferPage() {
    const toast = useToast();
    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TransferValues>({
        resolver: zodResolver(transferSchema),
        defaultValues: {
            employeeSearch: "",
            effectiveDate: "",
            targetEntity: "Acme Retail Solutions",
            carryLeave: true,
            maintainGratuity: true,
        },
    });

    const employeeSearch = watch("employeeSearch");
    const carryLeave = watch("carryLeave");
    const maintainGratuity = watch("maintainGratuity");
    const hasEmployee = employeeSearch.trim().length > 0;

    const onSubmit = handleSubmit(async () => {
        setSubmitting(true);
        try {
            // TODO: replace with real mutation once backend is wired
            await new Promise((r) => setTimeout(r, 800));
            toast.show({
                variant: "success",
                title: "Transfer initiated",
                description: `${MOCK_EMPLOYEE.name} transfer has been queued for processing.`,
            });
        } catch {
            toast.show({
                variant: "danger",
                title: "Transfer failed",
                description: "Please try again. If the problem persists, contact support.",
            });
        } finally {
            setSubmitting(false);
        }
    });

    return (
        <Page
            title="Inter-Entity Transfer Wizard"
            subtitle="Move employees between group companies, resolving F&F and carrying over continuity"
            breadcrumbs={[
                { label: "Multi-Entity", href: "/multi-entity/list" },
                { label: "Transfer" },
            ]}
            maxWidth="1100px"
        >
            <form onSubmit={onSubmit} aria-label="Inter-entity transfer form">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Transfer details */}
                    <Card padding="lg">
                        <h2 className="mb-4 border-b border-[#1A2A3A] pb-3 text-sm font-bold text-white">
                            Transfer Details
                        </h2>

                        <div className="space-y-5">
                            <FieldRow label="Select Employee" htmlFor="employeeSearch">
                                <div className="relative">
                                    <UserCheck
                                        size={16}
                                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                                        aria-hidden="true"
                                    />
                                    <input
                                        {...register("employeeSearch")}
                                        id="employeeSearch"
                                        type="text"
                                        placeholder="Search by name or ID"
                                        className={`${inputCls} pl-10`}
                                        aria-invalid={!!errors.employeeSearch}
                                        aria-describedby={errors.employeeSearch ? "emp-error" : undefined}
                                    />
                                </div>
                                {errors.employeeSearch && (
                                    <p id="emp-error" role="alert" className="text-xs text-red-400">
                                        {errors.employeeSearch.message}
                                    </p>
                                )}
                            </FieldRow>

                            {hasEmployee && (
                                <div className="flex items-center gap-4 rounded-xl border border-[#00e5a0]/20 bg-[#00e5a0]/10 p-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#00e5a0]/30 bg-[#060D1A] text-sm font-bold text-[#00e5a0]">
                                        {MOCK_EMPLOYEE.initials}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{MOCK_EMPLOYEE.name}</p>
                                        <p className="text-xs text-[#00e5a0]">
                                            {MOCK_EMPLOYEE.empId} • {MOCK_EMPLOYEE.role}
                                        </p>
                                        <p className="mt-0.5 text-[10px] text-[#556677]">
                                            Current Entity: {MOCK_EMPLOYEE.currentEntity}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <FieldRow label="Effective Date" htmlFor="effectiveDate">
                                    <input
                                        {...register("effectiveDate")}
                                        id="effectiveDate"
                                        type="date"
                                        className={inputCls}
                                        aria-invalid={!!errors.effectiveDate}
                                    />
                                    {errors.effectiveDate && (
                                        <p role="alert" className="text-xs text-red-400">
                                            {errors.effectiveDate.message}
                                        </p>
                                    )}
                                </FieldRow>
                                <FieldRow label="Target Entity" htmlFor="targetEntity">
                                    <select {...register("targetEntity")} id="targetEntity" className={inputCls}>
                                        <option>Acme Retail Solutions</option>
                                        <option>Acme Logistics India</option>
                                    </select>
                                </FieldRow>
                            </div>
                        </div>
                    </Card>

                    {/* Transfer logistics */}
                    <Card padding="lg" className={!hasEmployee ? "pointer-events-none opacity-50" : ""}>
                        <h2 className="mb-4 border-b border-[#1A2A3A] pb-3 text-sm font-bold text-white">
                            Transfer Logistics (Continuity)
                        </h2>

                        <div className="space-y-4">
                            <CheckboxRow
                                id="carryLeave"
                                title="Carry forward Leave Balances"
                                description="Transfer 14 days of AL to new entity."
                                checked={carryLeave}
                                onChange={(v) => setValue("carryLeave", v)}
                            />
                            <CheckboxRow
                                id="maintainGratuity"
                                title="Maintain Gratuity Continuity"
                                description="Years of service (4.2 yrs) will be counted in target entity."
                                checked={maintainGratuity}
                                onChange={(v) => setValue("maintainGratuity", v)}
                            />

                            <div className="mt-6 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                                <AlertTriangle
                                    size={18}
                                    className="mt-0.5 shrink-0 text-amber-400"
                                    aria-hidden="true"
                                />
                                <p className="text-xs leading-relaxed text-[#AABBCC]">
                                    A pseudo Full &amp; Final (F&amp;F) settlement will be generated in the source
                                    entity to settle pending salaries and tax liabilities up to the effective date. A
                                    new employee ID may be generated in the target entity depending on your global
                                    settings.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button
                                type="submit"
                                className="w-full justify-center"
                                isLoading={submitting}
                                loadingText="Initiating…"
                                iconRight={<ArrowRight size={16} />}
                                disabled={!hasEmployee}
                            >
                                Initiate Transfer
                            </Button>
                        </div>
                    </Card>
                </div>
            </form>
        </Page>
    );
}
