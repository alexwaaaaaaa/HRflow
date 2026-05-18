"use client";

import Link from "next/link";
import {
    Wallet, FileText, CheckCircle2, TrendingUp, Download, ArrowRight, LayoutDashboard,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface EventItem {
    date: string;
    month: string;
    title: string;
    description: string;
    tone: "default" | "danger";
}

const UPCOMING: EventItem[] = [
    {
        date: "01",
        month: "APR",
        title: "New Financial Year",
        description: "FY 2026-27 begins. Tax regime selection resets.",
        tone: "default",
    },
    {
        date: "15",
        month: "APR",
        title: "Submit Tax Proofs",
        description: "Last date to upload rent receipts and investment proofs.",
        tone: "danger",
    },
];

const QUICK_LINKS: Array<{ label: string; href: string }> = [
    { label: "Claim medical expense", href: "/reimbursements/claim" },
    { label: "Update bank details", href: "/my-profile" },
    { label: "Help center / Raise ticket", href: "/help" },
];

export default function EssDashboardPage() {
    return (
        <Page
            title="Welcome back, Anita"
            subtitle="Engineering · Joined 12 Jan 2022"
            breadcrumbs={[{ label: "Self-Service" }]}
            maxWidth="1100px"
            actions={
                <Badge variant="info">Engineering Department</Badge>
            }
        >
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <div className="space-y-6">
                    {/* Latest payslip hero */}
                    <Card padding="lg" className="relative overflow-hidden">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                            Latest payslip · March 2026
                        </p>
                        <div className="mt-2 flex flex-wrap items-end gap-3">
                            <span className="text-3xl font-bold text-white tabular-nums sm:text-4xl">
                                ₹1,74,250
                            </span>
                            <span className="mb-1 inline-flex items-center gap-1 text-sm font-semibold text-[#00e5a0]">
                                <TrendingUp size={14} aria-hidden="true" /> Net take-home
                            </span>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            <Button icon={<FileText size={14} />} href="/ess/payslips">View payslip</Button>
                            <Button variant="secondary" icon={<Download size={14} />}>
                                Download PDF
                            </Button>
                        </div>
                    </Card>

                    {/* Action tiles */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Link
                            href="/tax/declarations"
                            className="group rounded-2xl border border-[#1A2A3A] bg-[#0A1420] p-5 transition-colors hover:border-indigo-500/50"
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition-transform group-hover:scale-110">
                                <Wallet size={18} aria-hidden="true" />
                            </div>
                            <h3 className="font-semibold text-white transition-colors group-hover:text-indigo-400">
                                Income tax declaration
                            </h3>
                            <p className="mt-1 text-xs text-[#8899AA]">
                                Submit 80C, 80D proofs to reduce TDS.
                            </p>
                            <Badge variant="warning" className="mt-3">Window open till Apr 15</Badge>
                        </Link>

                        <Link
                            href="/fbp"
                            className="group rounded-2xl border border-[#1A2A3A] bg-[#0A1420] p-5 transition-colors hover:border-indigo-500/50"
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
                                <LayoutDashboard size={18} aria-hidden="true" />
                            </div>
                            <h3 className="font-semibold text-white transition-colors group-hover:text-indigo-400">
                                FBP structuring
                            </h3>
                            <p className="mt-1 text-xs text-[#8899AA]">
                                Allocate flexible benefits to save tax.
                            </p>
                            <Badge variant="success" className="mt-3">
                                <CheckCircle2 size={11} aria-hidden="true" /> Submitted
                            </Badge>
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming reminders</CardTitle>
                        </CardHeader>
                        <ul className="space-y-4">
                            {UPCOMING.map((e) => (
                                <li key={e.title} className="flex gap-3">
                                    <div
                                        className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border text-center ${
                                            e.tone === "danger"
                                                ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                                                : "border-[#2A3A4A] bg-[#131B2B] text-white"
                                        }`}
                                    >
                                        <span className="text-[10px] font-semibold">{e.month}</span>
                                        <span className="text-base font-bold leading-none">{e.date}</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-white">{e.title}</p>
                                        <p className="mt-0.5 text-xs text-[#8899AA]">
                                            {e.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick links</CardTitle>
                        </CardHeader>
                        <ul className="space-y-1">
                            {QUICK_LINKS.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="group flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-[#131B2B]"
                                    >
                                        <span className="text-sm text-[#aabbcc] transition-colors group-hover:text-white">
                                            {l.label}
                                        </span>
                                        <ArrowRight
                                            size={14}
                                            className="text-[#556677] transition-colors group-hover:text-white"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
