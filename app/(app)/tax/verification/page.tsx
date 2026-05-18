"use client";

import React, { useState } from "react";
import {
    AlertTriangle,
    ShieldCheck,
    Search,
    ArrowRight,
    ShieldAlert,
    BadgeCheck,
    FileText,
    Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ── Static maps (no template-literal classes) ─────────────────────────────────
const STAT_CARD_CLASSES: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: "bg-[#0066FF]/5", border: "border-[#0066FF]/20", text: "text-[#0066FF]" },
    green: { bg: "bg-[#00E5A0]/5", border: "border-[#00E5A0]/20", text: "text-[#00E5A0]" },
    yellow: { bg: "bg-[#FFB800]/5", border: "border-[#FFB800]/20", text: "text-[#FFB800]" },
    red: { bg: "bg-red-400/5", border: "border-red-400/20", text: "text-red-400" },
};

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function StatCard({
    title,
    value,
    subtitle,
    color,
}: {
    title: string;
    value: string;
    subtitle: string;
    color: "blue" | "green" | "yellow" | "red";
}) {
    const cls = STAT_CARD_CLASSES[color];
    return (
        <Card padding="lg" className={`${cls.bg} border ${cls.border}`}>
            <h3 className={`text-sm font-semibold ${cls.text} mb-1`}>{title}</h3>
            <div className={`text-3xl font-bold ${cls.text} mb-1`}>{value}</div>
            <p className="text-xs text-[#8899AA]">{subtitle}</p>
        </Card>
    );
}

function TabButton({
    label,
    active,
    onClick,
    color = "#00E5A0",
}: {
    label: string;
    active: boolean;
    onClick: () => void;
    color?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors duration-200 ${
                active ? "border-current" : "border-transparent text-[#8899AA] hover:text-[#c8d8e8]"
            }`}
            style={active ? { color, borderColor: color } : {}}
        >
            {label}
        </button>
    );
}

function QueueItem({
    empId,
    name,
    dept,
    amt,
    docs,
    score,
    initial,
    status,
    onClick,
}: {
    empId: string;
    name: string;
    dept: string;
    amt: string;
    docs: number;
    score: number;
    initial: string;
    status: "good" | "medium";
    onClick?: () => void;
}) {
    const isGood = status === "good";

    return (
        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors">
            <div className="col-span-4 flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-sm font-bold text-white" aria-hidden="true">
                    {initial}
                </div>
                <div>
                    <div className="text-sm font-bold text-white">{name}</div>
                    <div className="text-xs text-[#8899AA] mt-0.5">
                        {empId} • {dept}
                    </div>
                </div>
            </div>
            <div className="col-span-3">
                <div className="text-sm font-bold text-white">{amt}</div>
                <div className="text-xs text-[#8899AA] mt-0.5 flex items-center gap-1">
                    <FileText size={12} aria-hidden="true" /> {docs} documents
                </div>
            </div>
            <div className="col-span-2">
                <div
                    className={`inline-flex items-center px-2 py-1 rounded-md border ${
                        isGood ? "bg-[#00E5A0]/10 border-[#00E5A0]/30" : "bg-[#FFB800]/10 border-[#FFB800]/30"
                    }`}
                >
                    <BadgeCheck
                        size={14}
                        className={`${isGood ? "text-[#00E5A0]" : "text-[#FFB800]"} mr-1.5`}
                        aria-hidden="true"
                    />
                    <span className={`text-sm font-bold ${isGood ? "text-[#00E5A0]" : "text-[#FFB800]"}`}>{score}/100</span>
                </div>
            </div>
            <div className="col-span-3 flex justify-end">
                {isGood ? (
                    <Button variant="secondary" size="sm" icon={<Check size={14} />}>
                        Quick Approve
                    </Button>
                ) : (
                    <Button variant="secondary" size="sm" onClick={onClick} iconRight={<ArrowRight size={14} />}>
                        Review
                    </Button>
                )}
            </div>
        </div>
    );
}

export default function ProofVerificationDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("pending");

    return (
        <Page
            title="Investment Proof Verification — FY 2024-25"
            subtitle="Review and approve employee investment proofs"
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Verification" },
            ]}
            maxWidth="1400px"
        >
            <div className="space-y-6">
                {/* Progress */}
                <div className="flex items-center gap-3">
                    <div
                        className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={30.6}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="89 of 291 reviewed"
                    >
                        <div className="h-full bg-[#00E5A0] rounded-full w-[30.6%]" />
                    </div>
                    <span className="text-xs text-[#8899AA] whitespace-nowrap">89/291 reviewed (30.6%)</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard title="Pending Review" value="202" subtitle="847 documents" color="blue" />
                    <StatCard title="AI Pre-approved" value="134" subtitle="Pending HR confirmation" color="green" />
                    <StatCard title="Flagged for Review" value="68" subtitle="Low AI score or anomalies" color="yellow" />
                    <StatCard title="Rejected" value="12" subtitle="Awaiting resubmission" color="red" />
                </div>

                {/* Table */}
                <Card padding="none">
                    {/* Filter Tabs */}
                    <div className="flex justify-between items-center border-b border-[#1A2A3A] px-6">
                        <div className="flex space-x-6">
                            <TabButton label="All (202)" active={activeTab === "pending"} onClick={() => setActiveTab("pending")} />
                            <TabButton
                                label="AI Flagged (68)"
                                active={activeTab === "flagged"}
                                onClick={() => setActiveTab("flagged")}
                                color="#FFB800"
                            />
                            <TabButton
                                label="Low Score (<80)"
                                active={activeTab === "low_score"}
                                onClick={() => setActiveTab("low_score")}
                                color="#FF4444"
                            />
                            <TabButton
                                label="High Value (>₹3L)"
                                active={activeTab === "high_value"}
                                onClick={() => setActiveTab("high_value")}
                            />
                        </div>
                        <div className="relative pb-2">
                            <input
                                type="text"
                                placeholder="Search employee..."
                                aria-label="Search employees"
                                className="bg-[#0D1928] border border-[#1A2A3A] px-4 py-1.5 pl-9 rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                            />
                            <Search size={16} className="absolute left-3 top-2.5 text-[#8899AA]" aria-hidden="true" />
                        </div>
                    </div>

                    {/* Action Bar */}
                    {activeTab === "pending" && (
                        <div className="flex justify-between items-center py-3 px-6 border-b border-[#1A2A3A]">
                            <div className="text-sm font-medium text-[#8899AA]">
                                Showing pending employees sorted by submission date
                            </div>
                            <Button icon={<ShieldCheck size={16} />}>Bulk Approve All &gt;90 Score (134)</Button>
                        </div>
                    )}

                    {/* Column Headers */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-[#0A1420] border-b border-[#1A2A3A] text-xs font-bold text-[#8899AA] uppercase tracking-wider">
                        <div className="col-span-4">Employee Details</div>
                        <div className="col-span-3">Declarations</div>
                        <div className="col-span-2">AI Score</div>
                        <div className="col-span-3 text-right">Action</div>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {/* High Priority Flagged */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-red-400/5 hover:bg-red-400/10 transition-colors">
                            <div className="col-span-4 flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-sm font-bold text-white relative" aria-hidden="true">
                                    RK
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-400 rounded-full border-2 border-[#060B14] flex items-center justify-center">
                                        <AlertTriangle size={8} className="text-white" aria-hidden="true" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white flex items-center gap-2">
                                        Ravi Krishnan
                                        <Badge variant="danger">HIGH PRIORITY</Badge>
                                    </div>
                                    <div className="text-xs text-[#8899AA] mt-0.5">EMP089 • Engineering</div>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white">₹3,82,000</div>
                                <div className="text-xs text-[#8899AA] mt-0.5 flex items-center gap-1">
                                    <FileText size={12} aria-hidden="true" /> 7 documents
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="inline-flex items-center px-2 py-1 rounded-md bg-red-400/10 border border-red-400/30">
                                    <ShieldAlert size={14} className="text-red-400 mr-1.5" aria-hidden="true" />
                                    <span className="text-sm font-bold text-red-400">48/100</span>
                                </div>
                                <div className="text-[10px] text-red-400 mt-1">Amount anomaly detected</div>
                            </div>
                            <div className="col-span-3 flex justify-end">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => router.push("/tax/verification/EMP089")}
                                    iconRight={<ArrowRight size={14} />}
                                >
                                    Review Manually
                                </Button>
                            </div>
                        </div>

                        {/* Flagged */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-[#FFB800]/5 hover:bg-[#FFB800]/10 transition-colors">
                            <div className="col-span-4 flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-sm font-bold text-white" aria-hidden="true">
                                    PS
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Priya Sharma</div>
                                    <div className="text-xs text-[#8899AA] mt-0.5">EMP012 • Sales</div>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white">₹2,10,000</div>
                                <div className="text-xs text-[#8899AA] mt-0.5 flex items-center gap-1">
                                    <FileText size={12} aria-hidden="true" /> 4 documents
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="inline-flex items-center px-2 py-1 rounded-md bg-[#FFB800]/10 border border-[#FFB800]/30">
                                    <AlertTriangle size={14} className="text-[#FFB800] mr-1.5" aria-hidden="true" />
                                    <span className="text-sm font-bold text-[#FFB800]">72/100</span>
                                </div>
                                <div className="text-[10px] text-[#FFB800] mt-1">OCR mismatch</div>
                            </div>
                            <div className="col-span-3 flex justify-end">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => router.push("/tax/verification/EMP012")}
                                    iconRight={<ArrowRight size={14} />}
                                >
                                    Review
                                </Button>
                            </div>
                        </div>

                        <QueueItem empId="EMP001" name="Arjun Mehta" dept="Engineering" amt="₹1,10,000" docs={5} score={94} initial="AM" status="good" />
                        <QueueItem empId="EMP004" name="Kavya Iyer" dept="Product" amt="₹1,50,000" docs={3} score={91} initial="KI" status="good" />
                        <QueueItem
                            empId="EMP005"
                            name="Mohan Das"
                            dept="Operations"
                            amt="₹88,000"
                            docs={2}
                            score={88}
                            initial="MD"
                            status="medium"
                            onClick={() => router.push("/tax/verification/EMP005")}
                        />
                    </div>

                    <div className="flex justify-center py-4 border-t border-[#1A2A3A]">
                        <Button variant="secondary">Load More Employees</Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
