"use client";
import { useState } from "react";
import { CheckCircle2, Upload, Info } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const BLOCK_YEARS = [
    { label: "Block 2022-2025", remaining: "₹50,000", status: "Active", deadline: "Dec 2025" },
    { label: "Block 2026-2029", remaining: "₹50,000", status: "Not Started", deadline: "Dec 2029" },
];

const TRAVEL_MODES = ["Air", "Train", "Bus"] as const;
const TRAVELER_COUNTS = ["1", "2", "3", "4", "5+"] as const;

export default function LTAClaimPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        blockYear: "Block 2022-2025",
        amount: "",
        mode: "Air",
        fromCity: "",
        toCity: "",
        travelDate: "",
        returnDate: "",
        travelers: "1",
    });

    if (submitted) {
        return (
            <Page
                title="LTA Claim"
                subtitle="Leave Travel Allowance — Tax-exempt travel reimbursement"
                breadcrumbs={[
                    { label: "Reimbursements", href: "/reimbursements/dashboard" },
                    { label: "LTA Claim" },
                ]}
                maxWidth="720px"
            >
                <Card padding="lg">
                    <div className="flex flex-col items-center py-8 text-center">
                        <CheckCircle2 size={56} className="mb-4 text-emerald-400" aria-hidden="true" />
                        <h2 className="mb-2 text-2xl font-bold text-white">LTA Claim Submitted!</h2>
                        <p className="mb-6 text-[#8899AA]">
                            Claim of{" "}
                            <span className="font-bold text-white">₹{form.amount}</span> submitted for
                            manager approval. Tax exemption will apply after approval.
                        </p>
                        <Button variant="secondary" onClick={() => setSubmitted(false)}>
                            Submit Another
                        </Button>
                    </div>
                </Card>
            </Page>
        );
    }

    return (
        <Page
            title="LTA Claim"
            subtitle="Leave Travel Allowance — Tax-exempt travel reimbursement for you and your family"
            breadcrumbs={[
                { label: "Reimbursements", href: "/reimbursements/dashboard" },
                { label: "LTA Claim" },
            ]}
            maxWidth="720px"
        >
            <div className="space-y-6">
                {/* Block Year Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {BLOCK_YEARS.map((b) => (
                        <Card key={b.label} padding="md">
                            <div className="text-sm font-bold text-white">{b.label}</div>
                            <div className="mt-1 text-xl font-black text-violet-400">{b.remaining}</div>
                            <div className="mt-1">
                                <Badge variant={b.status === "Active" ? "success" : "neutral"}>
                                    {b.status}
                                </Badge>
                            </div>
                            <div className="mt-1 text-[10px] text-[#445566]">Deadline: {b.deadline}</div>
                        </Card>
                    ))}
                </div>

                {/* Info Banner */}
                <Card padding="md">
                    <div className="flex items-start gap-3">
                        <Info size={16} className="mt-0.5 shrink-0 text-indigo-400" aria-hidden="true" />
                        <p className="text-xs leading-relaxed text-[#AABBCC]">
                            LTA can be claimed twice in a 4-year block. Only domestic travel is eligible.
                            The cheapest air fare (economy) is the maximum limit for air travel. Upload
                            tickets and boarding passes as proof.
                        </p>
                    </div>
                </Card>

                {/* Form */}
                <Card padding="lg">
                    <form
                        className="space-y-5"
                        aria-label="LTA claim form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (form.amount) setSubmitted(true);
                        }}
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="block-year"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Block Year *
                                </label>
                                <select
                                    id="block-year"
                                    value={form.blockYear}
                                    onChange={(e) => setForm((v) => ({ ...v, blockYear: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                                >
                                    {BLOCK_YEARS.map((b) => (
                                        <option key={b.label}>{b.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="claim-amount"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Claim Amount *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#556677]">
                                        ₹
                                    </span>
                                    <input
                                        id="claim-amount"
                                        type="number"
                                        placeholder="0"
                                        value={form.amount}
                                        onChange={(e) => setForm((v) => ({ ...v, amount: e.target.value }))}
                                        className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] py-2.5 pl-8 pr-4 text-sm text-white outline-none focus:border-violet-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                                <label
                                    htmlFor="travel-mode"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Mode of Travel
                                </label>
                                <select
                                    id="travel-mode"
                                    value={form.mode}
                                    onChange={(e) => setForm((v) => ({ ...v, mode: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                                >
                                    {TRAVEL_MODES.map((m) => (
                                        <option key={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="from-city"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    From City
                                </label>
                                <input
                                    id="from-city"
                                    type="text"
                                    placeholder="e.g. Bengaluru"
                                    value={form.fromCity}
                                    onChange={(e) => setForm((v) => ({ ...v, fromCity: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="to-city"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    To City
                                </label>
                                <input
                                    id="to-city"
                                    type="text"
                                    placeholder="e.g. Mumbai"
                                    value={form.toCity}
                                    onChange={(e) => setForm((v) => ({ ...v, toCity: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                                <label
                                    htmlFor="travel-date"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Travel Date
                                </label>
                                <input
                                    id="travel-date"
                                    type="date"
                                    value={form.travelDate}
                                    onChange={(e) => setForm((v) => ({ ...v, travelDate: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="return-date"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Return Date
                                </label>
                                <input
                                    id="return-date"
                                    type="date"
                                    value={form.returnDate}
                                    onChange={(e) => setForm((v) => ({ ...v, returnDate: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="travelers"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    No. of Travelers
                                </label>
                                <select
                                    id="travelers"
                                    value={form.travelers}
                                    onChange={(e) => setForm((v) => ({ ...v, travelers: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
                                >
                                    {TRAVELER_COUNTS.map((n) => (
                                        <option key={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="cursor-pointer rounded-xl border-2 border-dashed border-[#2A3A4A] p-5 text-center transition-colors hover:border-violet-500/50">
                            <Upload size={22} className="mx-auto mb-2 text-[#445566]" aria-hidden="true" />
                            <div className="text-sm font-semibold text-[#8899AA]">
                                Upload Tickets &amp; Boarding Passes
                            </div>
                            <div className="mt-1 text-xs text-[#445566]">
                                PDF, PNG, JPG — both onward &amp; return journeys required
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={!form.amount}
                            className="w-full"
                        >
                            Submit LTA Claim
                        </Button>
                    </form>
                </Card>
            </div>
        </Page>
    );
}
