"use client";
import React from "react";
import {
    ShieldCheck, AlertTriangle, MonitorPlay, CheckSquare, Clock, FileText, Lock,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface SecurityModule {
    m: number;
    title: string;
    dur: string;
}

const MODULES: SecurityModule[] = [
    { m: 1, title: "Phishing & Social Engineering", dur: "15m" },
    { m: 2, title: "Password Hygiene & MFA", dur: "10m" },
    { m: 3, title: "Data Classification & Handling", dur: "15m" },
    { m: 4, title: "Physical Security & Clear Desk", dur: "10m" },
    { m: 5, title: "Incident Reporting", dur: "10m" },
];

export default function SecurityTrainingScreen() {
    return (
        <Page
            title="Information Security & Data Privacy"
            subtitle="Annual mandatory security awareness training"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Compliance", href: "/lms/compliance/calendar" },
                { label: "Security" },
            ]}
            maxWidth="1000px"
            actions={
                <>
                    <Button variant="secondary">Review Course</Button>
                    <Button variant="ghost">Download Certificate</Button>
                </>
            }
        >
            {/* Banner */}
            <Card padding="lg" variant="elevated" className="mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border-2 border-[#2A3A4A] flex flex-col items-center justify-center shrink-0 shadow-lg">
                        <ShieldCheck size={32} className="text-purple-400 mb-1" aria-hidden="true" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8899AA]">Annual</span>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <Badge variant="warning" className="mb-3">
                            <AlertTriangle size={12} aria-hidden="true" /> Required Training
                        </Badge>
                        <p className="text-[#8899AA] text-sm flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
                            <span className="flex items-center gap-1.5"><Clock size={14} aria-hidden="true" /> Est. Time: 1h 0m</span>
                            <span className="flex items-center gap-1.5"><FileText size={14} aria-hidden="true" /> 5 Modules</span>
                            <span className="flex items-center gap-1.5 text-[#00E5A0]"><Clock size={14} aria-hidden="true" /> Completed on Sep 05, 2025</span>
                        </p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <Card padding="lg" className="relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#00E5A0] rounded-l-2xl" aria-hidden="true" />
                        <div className="flex items-start gap-4 mb-4 pl-4">
                            <div className="w-10 h-10 rounded-full bg-[#00E5A0]/10 flex items-center justify-center shrink-0 border border-[#00E5A0]/20">
                                <CheckSquare size={20} className="text-[#00E5A0]" aria-hidden="true" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Training Completed</h2>
                                <p className="text-sm text-[#8899AA] leading-relaxed">
                                    You have successfully fulfilled your annual Information Security awareness requirement. You scored 100% on the final assessment.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h2 className="text-xl font-bold text-white mb-6">Course Modules</h2>
                        <div className="space-y-3">
                            {MODULES.map((mod) => (
                                <div
                                    key={mod.m}
                                    className="flex justify-between items-center p-4 bg-[#152336] border border-[#00E5A0]/30 rounded-xl relative overflow-hidden group"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00E5A0]" aria-hidden="true" />
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#0A1420] rounded-lg flex items-center justify-center border border-[#1A2A3A]">
                                            <CheckSquare size={14} className="text-[#00E5A0]" aria-hidden="true" />
                                        </div>
                                        <span className="text-white font-medium text-sm line-through decoration-[#445566]">
                                            Module {mod.m}: {mod.title}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        icon={<MonitorPlay size={12} aria-hidden="true" />}
                                    >
                                        Review
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card padding="lg" className="sticky top-0">
                        <h3 className="font-bold text-white mb-4">Quick Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full justify-start"
                                    icon={<FileText size={16} className="text-[#33E6FF]" aria-hidden="true" />}
                                >
                                    TechCorp InfoSec Policy
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full justify-start"
                                    icon={<Lock size={16} className="text-purple-400" aria-hidden="true" />}
                                >
                                    Request 1Password Access
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="w-full justify-start"
                                    icon={<AlertTriangle size={16} aria-hidden="true" />}
                                >
                                    Report Security Incident
                                </Button>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
