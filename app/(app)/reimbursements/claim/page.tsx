"use client";

import { useState, type FormEvent } from "react";
import { Receipt, Upload, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const CATEGORIES = [
    "Medical / OPD",
    "LTA",
    "Fuel & Conveyance",
    "Internet / Broadband",
    "Books & Periodicals",
    "Telephone",
];

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

interface BalanceCard {
    label: string;
    limit: number;
    used: number;
}

const BALANCES: BalanceCard[] = [
    { label: "Medical", limit: 15000, used: 8400 },
    { label: "LTA", limit: 50000, used: 0 },
    { label: "Internet", limit: 24000, used: 14400 },
];

interface ClaimForm {
    category: string;
    amount: string;
    month: string;
    year: string;
    description: string;
    billDate: string;
}

const TODAY_YEAR = new Date().getFullYear().toString();
const TODAY_MONTH = MONTHS[new Date().getMonth()] ?? "January";

export default function ReimbursementClaimPage() {
    const toast = useToast();
    const [form, setForm] = useState<ClaimForm>({
        category: "",
        amount: "",
        month: TODAY_MONTH,
        year: TODAY_YEAR,
        description: "",
        billDate: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const isValid =
        form.category && Number(form.amount) > 0 && form.billDate;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        setSubmitting(true);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 600));
            toast.show({
                variant: "success",
                title: "Claim submitted",
                description: `₹${Number(form.amount).toLocaleString("en-IN")} for ${form.category} sent for approval.`,
            });
            setForm({
                category: "",
                amount: "",
                month: TODAY_MONTH,
                year: TODAY_YEAR,
                description: "",
                billDate: "",
            });
            setFile(null);
        } catch {
            toast.show({
                variant: "danger",
                title: "Could not submit",
                description: "Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Page
            title="Submit reimbursement claim"
            subtitle="Upload bills and request reimbursement from your employer"
            breadcrumbs={[
                { label: "Reimbursements", href: "/reimbursements/dashboard" },
                { label: "New Claim" },
            ]}
            maxWidth="900px"
        >
            <div className="space-y-6">
                {/* Balance overview */}
                <Card>
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                        Reimbursement balance · FY 2025-26
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {BALANCES.map((b) => {
                            const pct = Math.round((b.used / b.limit) * 100);
                            const left = b.limit - b.used;
                            const tone =
                                pct > 80 ? "bg-red-500" : pct > 50 ? "bg-amber-500" : "bg-violet-500";
                            return (
                                <div key={b.label}>
                                    <div className="mb-1 flex justify-between text-xs">
                                        <span className="text-[#8899AA]">{b.label}</span>
                                        <span className="font-semibold text-white">
                                            ₹{left.toLocaleString("en-IN")} left
                                        </span>
                                    </div>
                                    <div
                                        className="h-2 overflow-hidden rounded-full bg-[#1A2A3A]"
                                        role="progressbar"
                                        aria-valuenow={pct}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${b.label} reimbursement used`}
                                    >
                                        <div className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
                                    </div>
                                    <p className="mt-0.5 text-[10px] text-[#445566]">{pct}% used</p>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Form */}
                <Card padding="lg">
                    <form className="space-y-5" onSubmit={handleSubmit} aria-label="Reimbursement claim">
                        <div>
                            <label htmlFor="rc-category" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                                Reimbursement category *
                            </label>
                            <select
                                id="rc-category"
                                value={form.category}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, category: e.target.value }))
                                }
                                required
                                className="w-full rounded-lg border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                            >
                                <option value="">Select category…</option>
                                {CATEGORIES.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <label htmlFor="rc-amount" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                                    Amount *
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-[#556677]">
                                        ₹
                                    </span>
                                    <input
                                        id="rc-amount"
                                        type="number"
                                        min={1}
                                        placeholder="0"
                                        value={form.amount}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, amount: e.target.value }))
                                        }
                                        required
                                        className="w-full rounded-lg border border-[#2A3A4A] bg-[#131B2B] py-2.5 pl-8 pr-4 text-sm text-white outline-none focus:border-violet-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="rc-month" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                                    Month
                                </label>
                                <select
                                    id="rc-month"
                                    value={form.month}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, month: e.target.value }))
                                    }
                                    className="w-full rounded-lg border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                                >
                                    {MONTHS.map((m) => (
                                        <option key={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="rc-bill-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                                    Bill date *
                                </label>
                                <input
                                    id="rc-bill-date"
                                    type="date"
                                    value={form.billDate}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, billDate: e.target.value }))
                                    }
                                    required
                                    className="w-full rounded-lg border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="rc-desc" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                                Description
                            </label>
                            <textarea
                                id="rc-desc"
                                placeholder="Brief description of the expense…"
                                value={form.description}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, description: e.target.value }))
                                }
                                rows={2}
                                className="w-full resize-none rounded-lg border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                            />
                        </div>

                        <label
                            htmlFor="rc-file"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#2A3A4A] p-6 text-center transition-colors hover:border-violet-500/50"
                        >
                            {file ? (
                                <>
                                    <CheckCircle2 size={22} className="text-emerald-400" aria-hidden="true" />
                                    <p className="text-sm font-semibold text-white">{file.name}</p>
                                    <p className="text-xs text-[#8899AA]">Click to replace</p>
                                </>
                            ) : (
                                <>
                                    <Upload size={22} className="text-[#445566]" aria-hidden="true" />
                                    <p className="text-sm font-semibold text-[#8899AA]">
                                        Upload bill / receipt
                                    </p>
                                    <p className="text-xs text-[#445566]">PDF, PNG, JPG · max 5 MB</p>
                                </>
                            )}
                            <input
                                id="rc-file"
                                type="file"
                                accept="application/pdf,image/png,image/jpeg"
                                className="sr-only"
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            />
                        </label>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                isLoading={submitting}
                                loadingText="Submitting…"
                                disabled={!isValid}
                                icon={<Receipt size={14} />}
                            >
                                Submit claim
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Page>
    );
}
