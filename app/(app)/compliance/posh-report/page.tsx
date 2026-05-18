"use client";

import { useState } from "react";
import {
    CheckCircle,
    AlertTriangle,
    Plus,
    Download,
    FileText,
    Users,
    Flag,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS = ["Committee Setup", "Case Log", "Training Record", "Report Generation"];

interface IccMember {
    name: string;
    role: string;
    dept: string;
    status: string;
    external: boolean;
}

const ICC_MEMBERS: IccMember[] = [
    { name: "Deepa Krishnamurthy", role: "Presiding Officer", dept: "HR Head", status: "Active", external: false },
    { name: "Sunita Patel", role: "Member", dept: "Legal", status: "Active", external: false },
    { name: "Anita Desai", role: "Member", dept: "Operations", status: "Active", external: false },
    { name: "Dr. Meera Verma", role: "External Member", dept: "NGO — Sakhi", status: "Active", external: true },
];

const CASE_STATS = [
    { label: "Complaints Received", val: "0" },
    { label: "Complaints Disposed", val: "0" },
    { label: "Pending at Year End", val: "0" },
    { label: "Workshops Conducted", val: "02" },
];

const COMPLIANCE_CHECKS = [
    { item: "ICC Constituted", ok: true },
    { item: "Annual Training Done", ok: true },
    { item: "Policy Displayed", ok: true },
    { item: "Report Filed (Prev. Yr)", ok: false },
];

const TRAINING_SESSIONS = [
    { title: "POSH Awareness Workshop", date: "15 Jul 2023", attendees: 210 },
    { title: "ICC Member Training", date: "20 Sep 2023", attendees: 4 },
];

const DOWNLOADS = ["POSH Annual Report (PDF)", "ICC Constitution Order", "POSH Policy Document"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function POSHAnnualReport() {
    const [fy, setFY] = useState("2023-24");
    const [step, setStep] = useState(0);

    return (
        <Page
            title="POSH Annual Report"
            subtitle="Prevention of Sexual Harassment at Workplace Act, 2013 — Annual Report preparation and submission."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "POSH Report" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <select
                        value={fy}
                        onChange={(e) => setFY(e.target.value)}
                        className="rounded-xl border border-[#1A2A3A] bg-[#0D1928] px-4 py-2 text-sm font-bold text-slate-300 outline-none"
                        aria-label="Select financial year"
                    >
                        <option>2023-24</option>
                        <option>2022-23</option>
                        <option>2021-22</option>
                    </select>
                    <Button
                        variant="primary"
                        icon={<Download size={16} aria-hidden="true" />}
                    >
                        Download Annual Report
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Warning banner */}
                <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                    <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-400" aria-hidden="true" />
                    <div>
                        <div className="text-sm font-black text-amber-400">
                            Annual Report Due: 31 January {Number(fy.split("-")[0]) + 1}
                        </div>
                        <div className="mt-1 text-[10px] text-slate-400">
                            The POSH Annual Report must be submitted to the District Officer. Non-compliance attracts a fine of ₹50,000
                            (first offence) and ₹1,00,000 (repeat offence) with cancellation of business license.
                        </div>
                    </div>
                </div>

                {/* Step progress */}
                <div className="flex flex-wrap gap-3">
                    {STEPS.map((s, i) => (
                        <button
                            key={s}
                            onClick={() => setStep(i)}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                                step === i
                                    ? "bg-purple-600 text-white"
                                    : i < step
                                    ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                                    : "border border-[#1A2A3A] bg-[#0D1928] text-slate-500"
                            }`}
                            aria-current={step === i ? "step" : undefined}
                        >
                            {i < step ? (
                                <CheckCircle size={12} aria-hidden="true" />
                            ) : (
                                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[9px]">{i + 1}</span>
                            )}
                            {s}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main stats */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* ICC Committee */}
                        <Card padding="md">
                            <h2 className="mb-4 flex items-center gap-2 border-b border-[#1A2A3A] pb-3 text-xs font-black uppercase tracking-widest text-white">
                                <Users size={14} className="text-purple-400" aria-hidden="true" /> Internal Complaints Committee (ICC)
                            </h2>
                            <div className="space-y-3">
                                {ICC_MEMBERS.map((m) => (
                                    <div key={m.name} className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${m.external ? "border border-purple-500/20 bg-purple-500/20 text-purple-400" : "bg-[#1A2A3A] text-slate-400"}`}>
                                                {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                            </div>
                                            <div>
                                                <div className="text-xs font-black text-white">{m.name}</div>
                                                <div className="text-[10px] text-slate-500">{m.role} • {m.dept}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {m.external && <Badge variant="purple">External</Badge>}
                                            <Badge variant="success">{m.status}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Case log */}
                        <Card padding="md">
                            <h2 className="mb-4 flex items-center justify-between border-b border-[#1A2A3A] pb-3 text-xs font-black uppercase tracking-widest text-white">
                                <span className="flex items-center gap-2">
                                    <Flag size={14} className="text-amber-400" aria-hidden="true" /> Complaint Log — FY {fy}
                                </span>
                                <Button variant="ghost" size="sm" icon={<Plus size={10} aria-hidden="true" />}>Add Case</Button>
                            </h2>
                            <div className="mb-4 space-y-1">
                                {CASE_STATS.map((r) => (
                                    <div key={r.label} className="flex items-center justify-between border-b border-[#1A2A3A]/50 py-2 last:border-0">
                                        <span className="text-[10px] font-bold text-slate-400">{r.label}</span>
                                        <span className="text-xs font-black text-white">{r.val}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                                <div className="flex items-center gap-2 text-xs font-black text-emerald-400">
                                    <CheckCircle size={14} aria-hidden="true" /> Zero Complaints — Excellent track record for FY {fy}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right panel */}
                    <div className="space-y-5">
                        {/* Compliance score */}
                        <Card padding="md" className="border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-[#0D1928]">
                            <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-purple-400">POSH Compliance Score</h3>
                            <div className="flex flex-col items-center">
                                <div
                                    className="mb-3 flex h-24 w-24 items-center justify-center rounded-full border-4 border-purple-500/30"
                                    style={{ background: "conic-gradient(#9333ea 0deg 324deg, #1A2A3A 324deg)" }}
                                    role="progressbar"
                                    aria-valuenow={90}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label="POSH compliance score: 90%"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#060B14]">
                                        <span className="text-xl font-black text-purple-400">90%</span>
                                    </div>
                                </div>
                                <div className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Overall POSH Compliance</div>
                            </div>
                            <div className="mt-4 space-y-2">
                                {COMPLIANCE_CHECKS.map((c) => (
                                    <div key={c.item} className="flex items-center gap-2 text-[10px]">
                                        {c.ok ? (
                                            <CheckCircle size={11} className="text-emerald-500" aria-hidden="true" />
                                        ) : (
                                            <AlertTriangle size={11} className="text-amber-400" aria-hidden="true" />
                                        )}
                                        <span className={c.ok ? "text-slate-400" : "text-amber-400"}>{c.item}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Training log */}
                        <Card padding="md">
                            <h3 className="mb-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white">
                                Training Sessions
                                <Plus size={11} className="cursor-pointer text-purple-400" aria-hidden="true" />
                            </h3>
                            <div className="space-y-3">
                                {TRAINING_SESSIONS.map((t) => (
                                    <div key={t.title} className="rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                                        <div className="text-[10px] font-black text-white">{t.title}</div>
                                        <div className="mt-1 flex justify-between">
                                            <span className="text-[9px] text-slate-500">{t.date}</span>
                                            <span className="text-[9px] font-bold text-purple-400">{t.attendees} attendees</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Downloads */}
                        <Card padding="md">
                            <div className="mb-3 text-[10px] font-black uppercase tracking-widest text-white">Downloads</div>
                            <div className="space-y-2">
                                {DOWNLOADS.map((d) => (
                                    <Button
                                        key={d}
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-between"
                                        icon={<FileText size={11} aria-hidden="true" />}
                                        iconRight={<Download size={11} aria-hidden="true" />}
                                    >
                                        {d}
                                    </Button>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
