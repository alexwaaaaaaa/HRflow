"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ── Types ─────────────────────────────────────────────────────────────────────
type QuarterStatus = "filed" | "ready" | "upcoming" | "annual";

interface QuarterData {
    quarter: string;
    months: string;
    due: string;
    status: QuarterStatus;
    tds: string;
    employees: number;
    prn?: string;
    filedOn?: string;
    challansMatched?: string;
    fvuStatus?: string;
    href: string;
    actionLabel: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const QUARTERS: QuarterData[] = [
    {
        quarter: "Quarter 1",
        months: "Apr, May, Jun",
        due: "31 Jul 2024",
        status: "filed",
        tds: "₹14,50,000",
        employees: 345,
        prn: "012345678X",
        filedOn: "28 Jul 2024",
        href: "/tax/form24q/q1",
        actionLabel: "View Quarter Details",
    },
    {
        quarter: "Quarter 2",
        months: "Jul, Aug, Sep",
        due: "31 Oct 2024",
        status: "ready",
        tds: "₹15,20,500",
        employees: 345,
        challansMatched: "12 / 12",
        fvuStatus: "Pending",
        href: "/tax/form24q/q2",
        actionLabel: "Generate TXT File / FVU",
    },
    {
        quarter: "Quarter 3",
        months: "Oct, Nov, Dec",
        due: "31 Jan 2025",
        status: "upcoming",
        tds: "—",
        employees: 0,
        href: "/tax/form24q/q3",
        actionLabel: "View",
    },
    {
        quarter: "Quarter 4",
        months: "Jan, Feb, Mar",
        due: "31 May 2025",
        status: "annual",
        tds: "—",
        employees: 0,
        href: "/tax/form24q/q4",
        actionLabel: "View",
    },
];

const STATUS_BADGE: Record<QuarterStatus, { variant: "success" | "info" | "neutral" | "warning"; label: string }> = {
    filed: { variant: "success", label: "Filed" },
    ready: { variant: "info", label: "Ready to File" },
    upcoming: { variant: "neutral", label: "Upcoming" },
    annual: { variant: "warning", label: "Annual Details Required" },
};

export default function Form24QDashboard() {
    return (
        <Page
            title="Form 24Q (e-TDS Returns)"
            subtitle="Quarterly statement for deduction of tax on salary"
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Form 24Q" },
            ]}
            maxWidth="1000px"
            actions={
                <select
                    aria-label="Select financial year"
                    className="bg-[#0D1928] border border-[#1A2A3A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00E5A0]"
                >
                    <option>FY 2024-25</option>
                    <option>FY 2023-24</option>
                </select>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {QUARTERS.map((q) => {
                    const badgeInfo = STATUS_BADGE[q.status];
                    const isReady = q.status === "ready";
                    const isFiled = q.status === "filed";
                    const isDisabled = q.status === "upcoming" || q.status === "annual";

                    return (
                        <Card
                            key={q.quarter}
                            padding="lg"
                            className={`flex flex-col ${isReady ? "border-[#0066FF]" : ""} ${isDisabled ? "opacity-60" : ""}`}
                        >
                            <div className="flex justify-between items-start mb-5">
                                <div>
                                    <Badge variant={badgeInfo.variant} className="mb-2">
                                        {isFiled && <CheckCircle2 size={12} className="mr-1 inline" aria-hidden="true" />}
                                        {q.status === "ready" && <Clock size={12} className="mr-1 inline" aria-hidden="true" />}
                                        {q.status === "annual" && <AlertTriangle size={12} className="mr-1 inline" aria-hidden="true" />}
                                        {badgeInfo.label}
                                    </Badge>
                                    <h3 className="text-lg font-bold text-white">{q.quarter}</h3>
                                    <p className="text-sm text-[#8899AA] mt-1">{q.months}</p>
                                </div>
                                <div className={`border rounded-lg p-2 text-right ${isReady ? "bg-[#0066FF]/5 border-[#0066FF]/20" : "bg-[#060B14] border-[#1A2A3A]"}`}>
                                    <div className={`text-xs mb-1 ${isReady ? "text-[#0066FF]" : "text-[#8899AA]"}`}>Due Date</div>
                                    <div className="text-sm text-white font-semibold">{q.due}</div>
                                </div>
                            </div>

                            <div className="flex-1 border-t border-b border-[#1A2A3A] py-4 mb-5 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#8899AA]">Total TDS Deducted:</span>
                                    <span className="text-white font-semibold">{q.tds}</span>
                                </div>
                                {isFiled && q.prn && (
                                    <>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#8899AA]">PRN / Token Number:</span>
                                            <span className="text-white font-mono tracking-wider">{q.prn}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#8899AA]">Filed On:</span>
                                            <span className="text-white">{q.filedOn}</span>
                                        </div>
                                    </>
                                )}
                                {isReady && q.challansMatched && (
                                    <>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#8899AA]">Challans Matched:</span>
                                            <span className="text-[#00E5A0] font-semibold">{q.challansMatched}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#8899AA]">FVU Generation:</span>
                                            <span className="text-[#0066FF] font-semibold">{q.fvuStatus}</span>
                                        </div>
                                    </>
                                )}
                                {q.status === "annual" && (
                                    <p className="text-xs text-[#FFB800]">
                                        Q4 return must include Annexure II (Salary details mapped to Form 16).
                                    </p>
                                )}
                            </div>

                            <Link href={q.href}>
                                <Button
                                    variant={isReady ? "primary" : "secondary"}
                                    className="w-full"
                                    iconRight={<ArrowRight size={16} />}
                                    disabled={isDisabled}
                                >
                                    {q.actionLabel}
                                </Button>
                            </Link>
                        </Card>
                    );
                })}
            </div>
        </Page>
    );
}
