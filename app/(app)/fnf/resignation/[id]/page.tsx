"use client";

import { Calendar, Briefcase, FileText, Download, ExternalLink } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface ClearanceStep {
    label: string;
    status: string;
    variant: "warning" | "success" | "info" | "neutral";
}

const CLEARANCE_STEPS: ClearanceStep[] = [
    { label: "Asset Clearance", status: "Pending", variant: "warning" },
    { label: "IT Clearance", status: "Approved", variant: "success" },
    { label: "Admin Clearance", status: "In Review", variant: "info" },
    { label: "Finance Review", status: "Not Started", variant: "neutral" },
];

interface KtTask {
    task: string;
    owner: string;
    status: number;
}

const KT_TASKS: KtTask[] = [
    { task: "Frontend Architecture Handover", owner: "Rahul V.", status: 100 },
    { task: "Release Pipeline Documentation", owner: "Sneha B.", status: 40 },
    { task: "Legacy Code Review & Cleanup", owner: "Sumit G.", status: 15 },
];

export default function ResignationDetails() {
    return (
        <Page
            title="Resignation Details"
            subtitle="Case ID: RES-99321-2024"
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Resignation" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Resignation Letter
                    </Button>
                    <Button>Accept Resignation</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Employee & Summary */}
                <div className="space-y-6">
                    <Card padding="lg">
                        <div className="mb-6 flex items-center gap-4 border-b border-[#1A2A3A] pb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-black text-white">
                                AD
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-white">Arnab Das</h2>
                                <p className="text-sm font-bold text-[#445566]">Senior Frontend Lead</p>
                                <p className="mt-1 text-xs font-black uppercase tracking-widest text-blue-500">
                                    EMP-771 · ENGINEERING
                                </p>
                            </div>
                        </div>

                        <dl className="space-y-3">
                            <div className="flex items-center justify-between border-b border-[#1A2A3A]/50 py-2 text-sm">
                                <dt className="font-bold text-[#445566]">Reporting To</dt>
                                <dd className="font-bold text-white">Sumit Bakshi</dd>
                            </div>
                            <div className="flex items-center justify-between border-b border-[#1A2A3A]/50 py-2 text-sm">
                                <dt className="font-bold text-[#445566]">Tenure</dt>
                                <dd className="font-bold text-white">3 Years, 2 Months</dd>
                            </div>
                            <div className="flex items-center justify-between border-b border-[#1A2A3A]/50 py-2 text-sm">
                                <dt className="font-bold text-[#445566]">Join Date</dt>
                                <dd className="font-bold text-white">12 Jan 2021</dd>
                            </div>
                            <div className="flex items-center justify-between py-2 text-sm">
                                <dt className="font-bold text-[#445566]">Asset Status</dt>
                                <dd className="flex items-center gap-1 font-bold text-amber-500">
                                    Pending Returns
                                    <ExternalLink size={12} aria-hidden="true" />
                                </dd>
                            </div>
                        </dl>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Final Settlement Status
                        </h3>
                        <ul className="space-y-3" role="list">
                            {CLEARANCE_STEPS.map((step) => (
                                <li key={step.label} className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-[#8899AA]">{step.label}</span>
                                    <Badge variant={step.variant}>{step.status}</Badge>
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" size="sm" className="mt-4 w-full">
                            View Full Exit Checklist
                        </Button>
                    </Card>
                </div>

                {/* Right Column: Timeline & Content */}
                <div className="space-y-8 lg:col-span-2">
                    {/* Resignation Core Data */}
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] px-6 py-4">
                            <h2 className="flex items-center gap-2 text-base font-bold text-white">
                                <FileText size={20} className="text-blue-500" aria-hidden="true" />
                                Resignation Submission
                            </h2>
                            <Badge variant="danger">Urgent Review</Badge>
                        </div>
                        <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">Resignation Type</p>
                                <p className="text-lg font-bold text-white">Voluntary Resignation</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">Reason Category</p>
                                <p className="text-lg font-bold text-white">Better Opportunity</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">Submission Date</p>
                                <p className="flex items-center gap-2 text-lg font-bold text-white">
                                    <Calendar size={18} className="text-blue-500" aria-hidden="true" /> 12 Mar 2024
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">Requested LWD</p>
                                <p className="flex items-center gap-2 text-lg font-bold text-white">
                                    <Calendar size={18} className="text-amber-500" aria-hidden="true" /> 24 Apr 2024
                                </p>
                            </div>
                            <div className="col-span-1 space-y-3 sm:col-span-2">
                                <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">Employee Comments</p>
                                <blockquote className="rounded-xl border border-l-4 border-[#1A2A3A] border-l-blue-500/50 bg-[#060B14] p-4 text-sm italic leading-relaxed text-[#8899AA]">
                                    "I am writing to formally resign from my position. I have received an opportunity that
                                    aligns closely with my long-term career goals in AI research. I am committed to ensuring
                                    a smooth transition during my notice period."
                                </blockquote>
                            </div>
                        </div>
                    </Card>

                    {/* KT Progress */}
                    <Card padding="lg">
                        <h2 className="mb-6 flex items-center gap-2 text-base font-bold text-white">
                            <Briefcase size={20} className="text-emerald-500" aria-hidden="true" />
                            Knowledge Transfer (KT) Progress
                        </h2>
                        <ul className="space-y-6" role="list">
                            {KT_TASKS.map((kt) => (
                                <li key={kt.task} className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-[#8899AA]">
                                            {kt.task}{" "}
                                            <span className="text-xs text-[#445566]">Owner: {kt.owner}</span>
                                        </span>
                                        <span className={kt.status === 100 ? "text-emerald-500" : "text-blue-500"}>
                                            {kt.status}%
                                        </span>
                                    </div>
                                    <div
                                        className="h-2 w-full overflow-hidden rounded-full border border-[#1A2A3A] bg-[#060B14]"
                                        role="progressbar"
                                        aria-valuenow={kt.status}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${kt.task}: ${kt.status}%`}
                                    >
                                        <div
                                            className={`h-full transition-all ${kt.status === 100 ? "bg-emerald-500" : "bg-blue-500"}`}
                                            style={{ width: `${kt.status}%` }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" size="sm" className="mt-6 w-full border-dashed">
                            + Add KT Task
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
