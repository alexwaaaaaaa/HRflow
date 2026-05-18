"use client";
import { useState } from "react";
import { Upload, CheckCircle2, Info } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const CLAIM_TYPES = [
    "OPD Consultation",
    "Hospitalization",
    "Medicine / Pharmacy",
    "Diagnostic / Lab Tests",
    "Dental Treatment",
    "Vision / Spectacles",
    "Preventive Health Checkup",
] as const;

const RELATIONS = ["Self", "Spouse", "Child", "Parent", "Parent-in-law"] as const;

export default function MedicalReimbursementPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        claimType: "",
        amount: "",
        hospitalName: "",
        treatmentDate: "",
        patientName: "",
        relation: "Self",
    });

    if (submitted) {
        return (
            <Page
                title="Medical Reimbursement"
                subtitle="Submit OPD, hospitalization, and medical expense claims"
                breadcrumbs={[
                    { label: "Reimbursements", href: "/reimbursements/dashboard" },
                    { label: "Medical" },
                ]}
                maxWidth="640px"
            >
                <Card padding="lg">
                    <div className="flex flex-col items-center py-8 text-center">
                        <CheckCircle2 size={56} className="mb-4 text-emerald-400" aria-hidden="true" />
                        <h2 className="mb-2 text-2xl font-bold text-white">Medical Claim Submitted!</h2>
                        <p className="mb-6 text-[#8899AA]">
                            Claim of{" "}
                            <span className="font-bold text-white">₹{form.amount}</span> for{" "}
                            {form.claimType} has been sent for manager approval.
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
            title="Medical Reimbursement"
            subtitle="Submit OPD, hospitalization, and medical expense claims"
            breadcrumbs={[
                { label: "Reimbursements", href: "/reimbursements/dashboard" },
                { label: "Medical" },
            ]}
            maxWidth="640px"
        >
            <div className="space-y-6">
                {/* Limit Usage Bar */}
                <Card padding="md">
                    <div className="mb-3 flex justify-between text-sm">
                        <span className="font-bold text-white">Medical Limit Used</span>
                        <span className="font-black text-rose-400">₹8,400 / ₹15,000</span>
                    </div>
                    <div
                        className="h-2.5 overflow-hidden rounded-full bg-[#1A2A3A]"
                        role="progressbar"
                        aria-valuenow={56}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Medical limit used: 56%"
                    >
                        <div className="h-full w-[56%] rounded-full bg-rose-500" />
                    </div>
                    <div className="mt-1 text-xs text-[#556677]">
                        ₹6,600 remaining — Resets Apr 1, 2026
                    </div>
                </Card>

                {/* Info Banner */}
                <Card padding="md">
                    <div className="flex gap-3">
                        <Info size={15} className="mt-0.5 shrink-0 text-indigo-400" aria-hidden="true" />
                        <p className="text-xs text-[#AABBCC]">
                            Annual limit: ₹15,000/year (tax exempt under Section 17(2)). Eligible for
                            self, spouse, dependent children &amp; dependent parents. All bills must be
                            from registered medical practitioners or hospitals.
                        </p>
                    </div>
                </Card>

                {/* Form */}
                <Card padding="lg">
                    <form
                        className="space-y-5"
                        aria-label="Medical reimbursement form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (form.claimType && form.amount) setSubmitted(true);
                        }}
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="claim-type"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Claim Type *
                                </label>
                                <select
                                    id="claim-type"
                                    value={form.claimType}
                                    onChange={(e) => setForm((v) => ({ ...v, claimType: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-rose-500"
                                >
                                    <option value="">Select...</option>
                                    {CLAIM_TYPES.map((c) => (
                                        <option key={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="amount"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Amount *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#556677]">
                                        ₹
                                    </span>
                                    <input
                                        id="amount"
                                        type="number"
                                        placeholder="0"
                                        value={form.amount}
                                        onChange={(e) => setForm((v) => ({ ...v, amount: e.target.value }))}
                                        className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] py-2.5 pl-8 pr-4 text-sm text-white outline-none focus:border-rose-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="hospital-name"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Hospital / Clinic Name
                                </label>
                                <input
                                    id="hospital-name"
                                    type="text"
                                    placeholder="Apollo Hospital, Bengaluru"
                                    value={form.hospitalName}
                                    onChange={(e) => setForm((v) => ({ ...v, hospitalName: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-rose-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="treatment-date"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Treatment Date
                                </label>
                                <input
                                    id="treatment-date"
                                    type="date"
                                    value={form.treatmentDate}
                                    onChange={(e) =>
                                        setForm((v) => ({ ...v, treatmentDate: e.target.value }))
                                    }
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-rose-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="patient-name"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Patient Name
                                </label>
                                <input
                                    id="patient-name"
                                    type="text"
                                    placeholder="Patient's full name"
                                    value={form.patientName}
                                    onChange={(e) => setForm((v) => ({ ...v, patientName: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-rose-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="relation"
                                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8899AA]"
                                >
                                    Relation to Employee
                                </label>
                                <select
                                    id="relation"
                                    value={form.relation}
                                    onChange={(e) => setForm((v) => ({ ...v, relation: e.target.value }))}
                                    className="w-full rounded-xl border border-[#2A3A4A] bg-[#131B2B] px-4 py-2.5 text-sm text-white outline-none focus:border-rose-500"
                                >
                                    {RELATIONS.map((r) => (
                                        <option key={r}>{r}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="cursor-pointer rounded-xl border-2 border-dashed border-[#2A3A4A] p-5 text-center transition-colors hover:border-rose-500/50">
                            <Upload size={22} className="mx-auto mb-2 text-[#445566]" aria-hidden="true" />
                            <div className="text-sm font-semibold text-[#8899AA]">Upload Medical Bills</div>
                            <div className="mt-1 text-xs text-[#445566]">
                                Original bills, prescriptions, lab reports — PDF or images
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={!form.claimType || !form.amount}
                            className="w-full"
                        >
                            Submit Medical Claim
                        </Button>
                    </form>
                </Card>
            </div>
        </Page>
    );
}
