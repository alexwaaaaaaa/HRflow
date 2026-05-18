"use client";

import { useState } from "react";
import { Controller, useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Activity, Calendar, CheckCircle, Clock, Users } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Static config — replace with API data once backend is wired.
// ─────────────────────────────────────────────────────────────────────────────

interface Delegate {
    id: string;
    name: string;
    title: string;
}

const DELEGATES: Delegate[] = [
    { id: "priya-sharma", name: "Priya Sharma", title: "Sr. Engineering Manager" },
    { id: "amit-patel", name: "Amit Patel", title: "Director of Engineering" },
    { id: "kiran-rao", name: "Kiran Rao", title: "Sr. Product Manager" },
];

interface PastDelegation {
    id: string;
    name: string;
    range: string;
}

const PAST_DELEGATIONS: PastDelegation[] = [
    { id: "amit-oct", name: "Amit Patel", range: "Oct 10 – Oct 18" },
    { id: "priya-aug", name: "Priya Sharma", range: "Aug 02 – Aug 09" },
];

interface ActiveProxy {
    name: string;
    until: string;
}

const ACTIVE_PROXY: ActiveProxy = {
    name: "Priya Sharma",
    until: "15 Nov 2024",
};

const TODAY = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();

// ─────────────────────────────────────────────────────────────────────────────
// Form schema
// ─────────────────────────────────────────────────────────────────────────────

const delegationSchema = z
    .object({
        delegateId: z
            .string()
            .min(1, "Please select a peer or manager")
            .refine((v) => DELEGATES.some((d) => d.id === v), {
                message: "Selected delegate is not available",
            }),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().min(1, "End date is required"),
    })
    .refine(
        (data) => {
            if (!data.startDate || !data.endDate) return true;
            return new Date(data.endDate) >= new Date(data.startDate);
        },
        { message: "End date must be on or after the start date", path: ["endDate"] },
    );

type DelegationValues = z.infer<typeof delegationSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveDelegationPage() {
    const toast = useToast();
    const [activeProxy, setActiveProxy] = useState<ActiveProxy | null>(ACTIVE_PROXY);
    const [revoking, setRevoking] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<DelegationValues>({
        resolver: zodResolver(delegationSchema),
        defaultValues: { delegateId: "", startDate: TODAY, endDate: TODAY },
    });

    const onSubmit = async (values: DelegationValues) => {
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 600));
            const delegate = DELEGATES.find((d) => d.id === values.delegateId);
            const niceUntil = new Date(values.endDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
            if (delegate) {
                setActiveProxy({ name: delegate.name, until: niceUntil });
            }
            toast.show({
                variant: "success",
                title: "Delegation set",
                description: `${delegate?.name ?? "Delegate"} will handle approvals through ${niceUntil}.`,
            });
            reset({ delegateId: "", startDate: TODAY, endDate: TODAY });
        } catch {
            toast.show({
                variant: "danger",
                title: "Could not save delegation",
                description: "Please try again or contact HR.",
            });
        }
    };

    const handleRevoke = async () => {
        setRevoking(true);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 400));
            setActiveProxy(null);
            toast.show({
                variant: "info",
                title: "Delegation revoked",
                description: "Approvals will route to you again.",
            });
        } finally {
            setRevoking(false);
        }
    };

    return (
        <Page
            title="Approval delegation"
            subtitle="Assign a proxy manager to handle leave approvals while you are away."
            breadcrumbs={[
                { label: "My Leave", href: "/my-leave" },
                { label: "Delegation" },
            ]}
            maxWidth="1100px"
        >
            <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
                {/* Form */}
                <Card padding="lg">
                    <CardHeader className="border-b border-[#1A2A3A] pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Users size={16} className="text-[#3b82f6]" aria-hidden="true" />
                            New delegation rule
                        </CardTitle>
                    </CardHeader>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-5 space-y-5"
                        aria-label="New delegation rule"
                    >
                        <DelegateSelect control={control} delegates={DELEGATES} />

                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField
                                control={control}
                                name="startDate"
                                label="Start date"
                                inputProps={{
                                    type: "date",
                                    min: TODAY,
                                    leftElement: <Calendar size={16} aria-hidden="true" />,
                                }}
                            />
                            <FormField
                                control={control}
                                name="endDate"
                                label="End date"
                                inputProps={{
                                    type: "date",
                                    min: TODAY,
                                    leftElement: <Calendar size={16} aria-hidden="true" />,
                                }}
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Setting…"
                            >
                                Set delegation
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Active status & history */}
                <div className="space-y-6">
                    <Card variant="elevated" className="border-[#00e5a0]/30">
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#00e5a0]">
                            <Activity size={14} aria-hidden="true" />
                            Active proxy
                        </div>
                        {activeProxy ? (
                            <>
                                <p className="mt-2 text-xl font-bold text-white">
                                    {activeProxy.name}
                                </p>
                                <p className="mt-1 text-xs text-[#7a8fa6]">
                                    Until {activeProxy.until}
                                </p>
                                <div className="mt-4">
                                    <Button
                                        type="button"
                                        variant="danger"
                                        size="sm"
                                        className="w-full"
                                        onClick={handleRevoke}
                                        isLoading={revoking}
                                        loadingText="Revoking…"
                                    >
                                        Revoke now
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p className="mt-3 text-sm text-[#7a8fa6]">
                                No active delegation. Approvals route directly to you.
                            </p>
                        )}
                    </Card>

                    <Card padding="md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Clock size={14} className="text-[#7a8fa6]" aria-hidden="true" />
                                Past delegations
                            </CardTitle>
                        </CardHeader>
                        {PAST_DELEGATIONS.length > 0 ? (
                            <ul className="space-y-2">
                                {PAST_DELEGATIONS.map((p) => (
                                    <li
                                        key={p.id}
                                        className="flex items-center justify-between rounded-lg border border-[#1A2A3A] bg-[#0A1420] px-3 py-2"
                                    >
                                        <div className="text-xs">
                                            <p className="font-semibold text-white">{p.name}</p>
                                            <p className="text-[#7a8fa6]">{p.range}</p>
                                        </div>
                                        <Badge variant="success">
                                            <CheckCircle
                                                size={10}
                                                className="-ml-0.5"
                                                aria-hidden="true"
                                            />
                                            Completed
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xs text-[#7a8fa6]">No past delegations yet.</p>
                        )}
                    </Card>
                </div>
            </div>
        </Page>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Module-scoped subcomponents
// ─────────────────────────────────────────────────────────────────────────────

interface DelegateSelectProps {
    control: Control<DelegationValues>;
    delegates: Delegate[];
}

function DelegateSelect({ control, delegates }: DelegateSelectProps) {
    return (
        <Controller
            control={control}
            name="delegateId"
            render={({ field, fieldState }) => {
                const errorId = "delegate-id-error";
                return (
                    <div className="flex w-full flex-col gap-1.5">
                        <label
                            htmlFor="delegate-id"
                            className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#7a8fa6]"
                        >
                            Delegate approvals to
                        </label>
                        <select
                            id="delegate-id"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            name={field.name}
                            aria-invalid={fieldState.error ? true : undefined}
                            aria-describedby={fieldState.error ? errorId : undefined}
                            className="h-10 w-full rounded-[10px] border border-[#162030] bg-[#070d18] px-3 text-[13px] font-medium text-[#f0f4f8] outline-none transition-all duration-150 focus:border-[#00e5a0] focus:shadow-[0_0_0_3px_rgba(0,229,160,0.1)]"
                        >
                            <option value="">Select a peer or manager…</option>
                            {delegates.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.name} ({d.title})
                                </option>
                            ))}
                        </select>
                        {fieldState.error && (
                            <p id={errorId} role="alert" className="text-[11px] text-[#ef4444]">
                                {fieldState.error.message}
                            </p>
                        )}
                    </div>
                );
            }}
        />
    );
}
