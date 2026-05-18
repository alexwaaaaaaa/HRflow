"use client";

import { useState, type FormEvent } from "react";
import { Clock, Calendar, ArrowRight, Info } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface CompOffForm {
    workedOn: string;
    hours: number;
    justification: string;
}

const TODAY = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();

export default function CompOffRequestPage() {
    const toast = useToast();
    const [form, setForm] = useState<CompOffForm>({
        workedOn: TODAY,
        hours: 8,
        justification: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const isValid =
        !!form.workedOn && form.hours >= 4 && form.justification.trim().length >= 10;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        setSubmitting(true);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 600));
            toast.show({
                variant: "success",
                title: "Comp-off request submitted",
                description:
                    form.hours >= 8
                        ? "A full-day comp-off is pending manager approval."
                        : "A half-day comp-off is pending manager approval.",
            });
            setForm({ workedOn: TODAY, hours: 8, justification: "" });
        } catch {
            toast.show({
                variant: "danger",
                title: "Could not submit",
                description: "Please try again or contact HR.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Page
            title="Request comp-off"
            subtitle="Claim compensatory leave for working a weekend or public holiday"
            breadcrumbs={[
                { label: "My Leave", href: "/my-leave" },
                { label: "Comp-off" },
            ]}
            maxWidth="800px"
        >
            <Card padding="lg">
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Comp-off request">
                    <div className="space-y-2">
                        <label htmlFor="worked-on" className="text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                            Date worked on
                        </label>
                        <div className="relative">
                            <Calendar
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3b82f6]"
                                aria-hidden="true"
                            />
                            <input
                                id="worked-on"
                                type="date"
                                max={TODAY}
                                value={form.workedOn}
                                onChange={(e) => setForm((f) => ({ ...f, workedOn: e.target.value }))}
                                className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] py-3 pl-9 pr-3 text-sm text-white outline-none focus:border-[#3b82f6]"
                                required
                            />
                        </div>
                        <p className="text-xs text-[#556677]">
                            Must be a weekend (Saturday/Sunday) or an official holiday.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="hours" className="text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                            Hours logged
                        </label>
                        <div className="relative">
                            <Clock
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3b82f6]"
                                aria-hidden="true"
                            />
                            <input
                                id="hours"
                                type="number"
                                min={4}
                                max={24}
                                step={0.5}
                                value={form.hours}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        hours: Number(e.target.value) || 0,
                                    }))
                                }
                                className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] py-3 pl-9 pr-3 text-sm font-semibold text-white outline-none focus:border-[#3b82f6]"
                                required
                            />
                        </div>
                        <p className="text-xs text-[#556677]">
                            Minimum 4 hours for half-day comp-off · 8 hours for full-day.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="justification" className="text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                            Work details / project justification
                        </label>
                        <textarea
                            id="justification"
                            rows={4}
                            minLength={10}
                            placeholder="E.g., Production deployment for the Alpha release"
                            value={form.justification}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, justification: e.target.value }))
                            }
                            className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none focus:border-[#3b82f6]"
                            required
                        />
                    </div>

                    <div
                        role="note"
                        className="flex items-start gap-3 rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4 text-sm"
                    >
                        <Info size={16} className="mt-0.5 shrink-0 text-[#3b82f6]" aria-hidden="true" />
                        <div className="text-[#8899AA]">
                            <p className="mb-1 font-semibold text-white">Important</p>
                            Comp-off requests expire if not submitted within{" "}
                            <strong className="text-white">14 days</strong> of the worked date.
                            Once approved, the leave must be used within{" "}
                            <strong className="text-white">45 days</strong>.
                        </div>
                    </div>

                    <div className="flex justify-end border-t border-[#1A2A3A] pt-4">
                        <Button
                            type="submit"
                            disabled={!isValid}
                            isLoading={submitting}
                            loadingText="Submitting…"
                            iconRight={<ArrowRight size={16} />}
                        >
                            Submit for approval
                        </Button>
                    </div>
                </form>
            </Card>
        </Page>
    );
}
