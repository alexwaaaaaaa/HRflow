"use client";

import { useState } from "react";
import { Edit2, Download, Lock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const TABS = ["Overview", "My Payslips", "My Leave", "My Documents", "My Attendance"] as const;
type Tab = (typeof TABS)[number];

interface PersonalField {
    label: string;
    value: string;
    editable: boolean;
}

const PERSONAL_FIELDS: PersonalField[] = [
    { label: "Personal Email", value: "rahul.sharma@gmail.com", editable: true },
    { label: "Personal Mobile", value: "+91 98765 43210", editable: true },
    { label: "Date of Birth", value: "15/03/1996", editable: false },
    { label: "Blood Group", value: "O+", editable: true },
    { label: "Emergency Contact", value: "Sunita Sharma — +91 87654 32100", editable: true },
    { label: "Current Address", value: "123 Koregaon Park, Pune 411001", editable: true },
];

const JOB_DETAILS: Array<[string, string]> = [
    ["Department", "Engineering"],
    ["Designation", "Senior SWE"],
    ["Grade", "L3"],
    ["Reports to", "Kavya Reddy"],
    ["Location", "Pune Office"],
    ["Work Mode", "Hybrid"],
    ["Shift", "General (9AM–6PM)"],
    ["Employment", "Full-time"],
];

interface Payslip {
    month: string;
    gross: string;
    net: string;
    status: "Paid" | "Pending";
}

const PAYSLIPS: Payslip[] = [
    { month: "November 2024", gross: "₹95,000", net: "₹90,000", status: "Pending" },
    { month: "October 2024", gross: "₹95,000", net: "₹90,000", status: "Paid" },
    { month: "September 2024", gross: "₹95,000", net: "₹90,000", status: "Paid" },
    { month: "August 2024", gross: "₹95,000", net: "₹90,000", status: "Paid" },
];

export default function MyProfile() {
    const [activeTab, setActiveTab] = useState<Tab>("Overview");
    const [editing, setEditing] = useState(false);

    return (
        <Page
            title="My profile"
            subtitle="Personal details, compensation, and self-service shortcuts"
            breadcrumbs={[{ label: "My Profile" }]}
            maxWidth="1200px"
            actions={
                <Button
                    variant={editing ? "primary" : "secondary"}
                    size="md"
                    icon={<Edit2 size={14} />}
                    onClick={() => setEditing((v) => !v)}
                >
                    {editing ? "Save changes" : "Edit details"}
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Profile header card */}
                <Card>
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="relative shrink-0">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#00E5A0] bg-[rgba(0,229,160,0.1)] text-2xl font-bold text-[#00E5A0]">
                                RS
                            </div>
                            <span
                                className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0D1928] bg-[#00E5A0]"
                                role="img"
                                aria-label="Currently active"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h2 className="text-xl font-bold text-white sm:text-2xl">
                                Rahul Kumar Sharma
                            </h2>
                            <p className="mt-1 text-sm text-[#8899AA]">
                                Senior Software Engineer · Engineering
                            </p>
                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#8899AA]">
                                <Meta label="Location" value="Pune Office" />
                                <Meta label="Joined" value="15/11/2021" />
                                <Meta label="Grade" value="L3" />
                                <Meta label="Employee ID" value="EMP-0848" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Tabs */}
                <div
                    role="tablist"
                    aria-label="Profile sections"
                    className="-mx-1 flex gap-1 overflow-x-auto border-b border-[#1A2A3A] pb-px"
                >
                    {TABS.map((t) => {
                        const active = activeTab === t;
                        return (
                            <button
                                key={t}
                                type="button"
                                role="tab"
                                aria-selected={active}
                                aria-controls={`panel-${t.replace(/\s+/g, "-")}`}
                                id={`tab-${t.replace(/\s+/g, "-")}`}
                                onClick={() => setActiveTab(t)}
                                className={`shrink-0 border-b-2 px-4 py-3 text-sm transition-colors ${
                                    active
                                        ? "border-[#00E5A0] font-semibold text-white"
                                        : "border-transparent text-[#8899AA] hover:text-[#c8d8e8]"
                                }`}
                            >
                                {t}
                            </button>
                        );
                    })}
                </div>

                {/* Overview */}
                {activeTab === "Overview" && (
                    <div
                        id="panel-Overview"
                        role="tabpanel"
                        aria-labelledby="tab-Overview"
                        className="grid gap-6 lg:grid-cols-[1fr_360px]"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal information</CardTitle>
                                {!editing && (
                                    <span className="flex items-center gap-1 text-xs text-[#8899AA]">
                                        <Lock size={12} aria-hidden="true" />
                                        Some fields managed by HR
                                    </span>
                                )}
                            </CardHeader>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {PERSONAL_FIELDS.map((f) => (
                                    <div key={f.label}>
                                        <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-[#7a8fa6]">
                                            {f.label}
                                        </p>
                                        <p>
                                            {editing && f.editable ? (
                                                <input
                                                    aria-label={f.label}
                                                    defaultValue={f.value}
                                                    className="h-9 w-full rounded-lg border border-[#00E5A0] bg-[#060B14] px-3 text-sm text-white outline-none"
                                                />
                                            ) : (
                                                <span
                                                    className={`flex items-center gap-1.5 text-sm ${
                                                        f.editable ? "text-white" : "text-[#7a8fa6]"
                                                    }`}
                                                >
                                                    {f.value}
                                                    {!f.editable && (
                                                        <Lock
                                                            size={11}
                                                            className="text-[#7a8fa6]"
                                                            aria-label="Read-only"
                                                        />
                                                    )}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {editing && (
                                <p className="mt-4 rounded-lg border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.05)] p-3 text-xs text-[#0066FF]">
                                    Need to change locked fields?{" "}
                                    <button
                                        type="button"
                                        className="font-semibold text-[#00E5A0] hover:underline"
                                    >
                                        Raise a request to HR →
                                    </button>
                                </p>
                            )}
                        </Card>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Job details</CardTitle>
                                </CardHeader>
                                <dl className="space-y-2">
                                    {JOB_DETAILS.map(([k, v]) => (
                                        <div
                                            key={k}
                                            className="flex justify-between border-b border-[#0e1a28] py-2 last:border-b-0"
                                        >
                                            <dt className="text-xs text-[#7a8fa6]">{k}</dt>
                                            <dd className="text-xs font-medium text-white">{v}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Compensation</CardTitle>
                                </CardHeader>
                                <p className="text-xs text-[#7a8fa6]">
                                    Annual CTC (visible to you only)
                                </p>
                                <p className="mt-1 text-3xl font-bold text-[#00e5a0] tabular-nums">
                                    ₹12,00,000
                                </p>
                                <p className="mt-1 text-xs text-[#7a8fa6]">
                                    Monthly in-hand · ₹90,000
                                </p>
                                <Button
                                    variant="secondary"
                                    size="md"
                                    icon={<Download size={14} />}
                                    className="mt-4 w-full"
                                >
                                    Salary certificate
                                </Button>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Payslips */}
                {activeTab === "My Payslips" && (
                    <div
                        id="panel-My-Payslips"
                        role="tabpanel"
                        aria-labelledby="tab-My-Payslips"
                    >
                        <Card padding="none">
                            <ul className="divide-y divide-[#1A2A3A]">
                                {PAYSLIPS.map((p) => (
                                    <li
                                        key={p.month}
                                        className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center"
                                    >
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-white">
                                                {p.month}
                                            </p>
                                            <p className="mt-0.5 text-xs text-[#7a8fa6]">
                                                Gross {p.gross} · Net {p.net}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge
                                                variant={p.status === "Paid" ? "success" : "warning"}
                                            >
                                                {p.status}
                                            </Badge>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                icon={<Download size={12} />}
                                            >
                                                Payslip
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                )}

                {/* Other tabs — placeholders that link to dedicated screens */}
                {(activeTab === "My Leave" ||
                    activeTab === "My Documents" ||
                    activeTab === "My Attendance") && (
                    <div
                        id={`panel-${activeTab.replace(/\s+/g, "-")}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${activeTab.replace(/\s+/g, "-")}`}
                    >
                        <Card>
                            <p className="text-sm text-[#c8d8e8]">
                                {activeTab} details live on a dedicated screen for richer interactions.
                            </p>
                            <Button
                                variant="ghost"
                                size="md"
                                className="mt-4"
                                onClick={() => {
                                    /* Navigation handled in nav components */
                                }}
                            >
                                Open {activeTab.toLowerCase()}
                            </Button>
                        </Card>
                    </div>
                )}
            </div>
        </Page>
    );
}

function Meta({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-baseline gap-1.5">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#7a8fa6]">
                {label}
            </p>
            <p className="text-xs text-white">{value}</p>
        </div>
    );
}
