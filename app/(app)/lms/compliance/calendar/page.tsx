"use client";
import React from "react";
import {
    ShieldAlert, Calendar as CalendarIcon, AlertCircle, Clock, CheckCircle2, ChevronRight, Filter,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface ComplianceItem {
    id: number;
    title: string;
    due: string;
    status: "pending" | "completed";
    priority: "high" | "critical" | "medium";
    duration: string;
    completedOn?: string;
}

const COMPLIANCE_ITEMS: ComplianceItem[] = [
    { id: 1, title: "Data Privacy & GDPR Fundamentals", due: "Oct 15, 2025", status: "pending", priority: "high", duration: "1h 30m" },
    { id: 2, title: "Anti-Money Laundering (AML) 2025 Refresher", due: "Oct 20, 2025", status: "pending", priority: "critical", duration: "45m" },
    { id: 3, title: "Workplace Harassment Prevention", due: "Oct 31, 2025", status: "pending", priority: "medium", duration: "2h 0m" },
    { id: 4, title: "Information Security Awareness", due: "Sep 10, 2025", status: "completed", priority: "high", duration: "1h 0m", completedOn: "Sep 05, 2025" },
];

const _PRIORITY_BADGE: Record<ComplianceItem["priority"], "danger" | "warning" | "info"> = {
    critical: "danger",
    high: "warning",
    medium: "info",
};

export default function ComplianceCalendarScreen() {
    return (
        <Page
            title="Compliance Center"
            subtitle="Track and complete mandatory regulatory training required for your role and department"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Compliance" },
                { label: "Calendar" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Filter size={16} />}>Filter Status</Button>
            }
        >
            {/* Compliance Score Banner */}
            <Card padding="lg" variant="elevated" className="mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFB020]/10 rounded-xl flex items-center justify-center border border-[#FFB020]/20">
                            <ShieldAlert size={20} className="text-[#FFB020]" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Compliance Overview</h2>
                            <p className="text-[#8899AA] text-sm mt-1">
                                Track and complete mandatory regulatory training.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-4 flex items-center gap-6 shrink-0">
                        <div>
                            <p className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-1">Compliance Score</p>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-extrabold text-white leading-none">
                                    75<span className="text-xl text-[#FFB020]">%</span>
                                </span>
                            </div>
                        </div>
                        <div className="w-16 h-16 relative" aria-label="Compliance score: 75%" role="img">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#2A3A4A" strokeWidth="10" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#FFB020" strokeWidth="10" strokeDasharray="283" strokeDashoffset={283 - (283 * 75) / 100} />
                            </svg>
                        </div>
                    </div>
                </div>
            </Card>

            <h2 className="text-xl font-bold text-white mb-6">Required Training</h2>

            <div className="space-y-4">
                {COMPLIANCE_ITEMS.map((item) => (
                    <Card
                        key={item.id}
                        padding="lg"
                        className={`flex flex-col md:flex-row gap-6 md:items-center justify-between transition-all ${item.status === "completed" ? "opacity-70" : item.priority === "critical" ? "border-[#FF4444]/50 shadow-[0_0_15px_rgba(255,68,68,0.1)]" : ""}`}
                    >
                        <div className="flex-1 flex gap-5">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0A1420] shadow-md ${item.status === "completed" ? "bg-[#00E5A0] text-black" : item.priority === "critical" ? "bg-[#FF4444] text-white" : "bg-[#1A2A3A] text-[#8899AA]"}`}>
                                {item.status === "completed" ? (
                                    <CheckCircle2 size={24} aria-hidden="true" />
                                ) : (
                                    <AlertCircle size={24} aria-hidden="true" />
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                    {item.status !== "completed" && item.priority === "critical" && (
                                        <Badge variant="danger">URGENT</Badge>
                                    )}
                                </div>
                                <p className="text-sm text-[#8899AA] flex flex-wrap items-center gap-4">
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={14} aria-hidden="true" /> Est. Time: {item.duration}
                                    </span>
                                    {item.status === "completed" ? (
                                        <span className="flex items-center gap-1.5 text-[#00E5A0] font-medium">
                                            <CheckCircle2 size={14} aria-hidden="true" /> Completed on {item.completedOn}
                                        </span>
                                    ) : (
                                        <span className={`flex items-center gap-1.5 font-medium ${item.priority === "critical" ? "text-[#FF4444]" : "text-[#FFB020]"}`}>
                                            <CalendarIcon size={14} aria-hidden="true" /> Due: {item.due}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="shrink-0 flex items-center">
                            {item.status === "completed" ? (
                                <Button variant="secondary" size="sm">View Certificate</Button>
                            ) : (
                                <Button
                                    variant={item.priority === "critical" ? "danger" : "primary"}
                                    iconRight={<ChevronRight size={16} aria-hidden="true" />}
                                >
                                    Start Training
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </Page>
    );
}
