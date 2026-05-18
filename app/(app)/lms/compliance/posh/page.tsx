"use client";
import React, { useState } from "react";
import {
    ShieldAlert, BookOpen, Clock, FileText, CheckSquare, Award, PlayCircle, Scale,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const MODULE_TYPE_ICON: Record<string, React.ElementType> = {
    video: PlayCircle,
    interactive: BookOpen,
    article: BookOpen,
    quiz: FileText,
};

const MODULE_TYPE_COLOR: Record<string, string> = {
    video: "text-[#33E6FF]",
    interactive: "text-purple-400",
    article: "text-purple-400",
    quiz: "text-[#FFB020]",
};

interface CourseModule {
    m: number;
    title: string;
    dur: string;
    type: string;
}

const MODULES: CourseModule[] = [
    { m: 1, title: "Introduction & Legal Framework", dur: "20m", type: "video" },
    { m: 2, title: "Identifying Harassment & Case Studies", dur: "35m", type: "interactive" },
    { m: 3, title: "TechCorp's Reporting Protocol & ICC", dur: "15m", type: "article" },
    { m: 4, title: "Bystander Intervention", dur: "10m", type: "video" },
    { m: 5, title: "Final Assessment & Attestation", dur: "10m", type: "quiz" },
];

export default function PoshComplianceScreen() {
    const [agreed, setAgreed] = useState(false);

    return (
        <Page
            title="Prevention of Sexual Harassment (POSH)"
            subtitle="Annual mandatory compliance training"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Compliance", href: "/lms/compliance/calendar" },
                { label: "POSH" },
            ]}
            maxWidth="1000px"
            actions={
                <Button variant="primary" icon={<PlayCircle size={16} />}>
                    Start Module 1
                </Button>
            }
        >
            {/* Banner */}
            <Card padding="lg" variant="elevated" className="mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border-2 border-[#2A3A4A] flex flex-col items-center justify-center shrink-0 shadow-lg">
                        <Scale size={32} className="text-[#33E6FF] mb-1" aria-hidden="true" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8899AA]">Annual</span>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <Badge variant="danger" className="mb-3">
                            <ShieldAlert size={12} aria-hidden="true" /> Mandatory Compliance
                        </Badge>
                        <p className="text-[#8899AA] text-sm flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
                            <span className="flex items-center gap-1.5"><Clock size={14} aria-hidden="true" /> Est. Time: 1h 30m</span>
                            <span className="flex items-center gap-1.5"><FileText size={14} aria-hidden="true" /> 4 Modules + Quiz</span>
                            <span className="flex items-center gap-1.5 text-[#FFB020]"><Clock size={14} aria-hidden="true" /> Due: Oct 31, 2025</span>
                        </p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <Card padding="lg">
                        <h2 className="text-xl font-bold text-white mb-4">Course Overview</h2>
                        <div className="text-sm text-[#8899AA] leading-relaxed space-y-4">
                            <p>
                                TechCorp is committed to providing a safe, inclusive, and harassment-free workplace for all employees.
                                This mandatory training is designed to help you understand what constitutes sexual harassment, how to prevent it,
                                and the procedures for reporting instances of misconduct.
                            </p>
                            <p>Failure to complete this compliance training by the due date may result in suspension of system access.</p>
                        </div>

                        <h3 className="text-white font-bold mt-6 mb-3">Learning Objectives</h3>
                        <ul className="space-y-2 text-sm text-[#8899AA]">
                            {[
                                "Understand the legal definition of sexual harassment in the workplace",
                                "Identify inappropriate behaviors and understand their impact",
                                "Know the company's internal complaint committee (ICC) members",
                                "Learn the procedures for filing a grievance and non-retaliation policies",
                            ].map((obj, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <CheckSquare size={16} className="text-[#33E6FF] shrink-0 mt-0.5" aria-hidden="true" />
                                    {obj}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card padding="lg">
                        <h2 className="text-xl font-bold text-white mb-6">Curriculum</h2>
                        <div className="space-y-3">
                            {MODULES.map((mod) => {
                                const Icon = MODULE_TYPE_ICON[mod.type] ?? BookOpen;
                                const colorClass = MODULE_TYPE_COLOR[mod.type] ?? "text-[#8899AA]";
                                return (
                                    <div
                                        key={mod.m}
                                        className="flex justify-between items-center p-4 bg-[#152336] border border-[#2A3A4A] rounded-xl hover:border-[#33E6FF]/50 transition-colors cursor-not-allowed opacity-80"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-[#1A2A3A] rounded-lg flex items-center justify-center">
                                                <Icon size={14} className={colorClass} aria-hidden="true" />
                                            </div>
                                            <span className="text-white font-medium text-sm">Module {mod.m}: {mod.title}</span>
                                        </div>
                                        <span className="text-xs text-[#8899AA] border border-[#2A3A4A] px-2 py-1 rounded bg-[#0A1420]">{mod.dur}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Policy Acknowledgment */}
                    <Card padding="lg" variant="elevated">
                        <h3 className="font-bold text-white mb-4">Pre-Course Attestation</h3>
                        <p className="text-sm text-[#8899AA] mb-4">
                            Before beginning this course, you must acknowledge that you have access to the latest TechCorp POSH Policy document.
                        </p>

                        <div className="p-3 bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-[#33E6FF]" aria-hidden="true" />
                                <span className="text-white text-sm">TechCorp_POSH_Policy_2025.pdf</span>
                            </div>
                            <Button variant="ghost" size="sm">Download</Button>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-start pt-0.5">
                                <input
                                    type="checkbox"
                                    id="posh-attestation"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="w-5 h-5 rounded border-[#2A3A4A] bg-[#0A1420] text-[#00E5A0] focus:ring-[#00E5A0] focus:ring-offset-[#152336] transition-colors"
                                />
                            </div>
                            <span className="text-sm text-[#8899AA] group-hover:text-white transition-colors">
                                I acknowledge that I have received and read the TechCorp Prevention of Sexual Harassment Policy.
                                I understand that completing this training is a mandatory requirement of my employment.
                            </span>
                        </label>
                    </Card>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <Card padding="lg" className="sticky top-0">
                        <h3 className="font-bold text-white mb-4">Course Info</h3>
                        <ul className="space-y-4 text-sm mb-6">
                            <li className="flex flex-col">
                                <span className="text-xs text-[#8899AA] uppercase tracking-wider mb-1">Status</span>
                                <Badge variant="neutral">Not Started</Badge>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-xs text-[#8899AA] uppercase tracking-wider mb-1">Pass Requirement</span>
                                <span className="text-white font-medium">100% on Final Assessment</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-xs text-[#8899AA] uppercase tracking-wider mb-1">Certificate Valid For</span>
                                <span className="text-white font-medium">1 Year</span>
                            </li>
                        </ul>

                        <div className="bg-[#152336] p-4 border border-[#2A3A4A] rounded-xl text-center">
                            <Award size={32} className="text-[#00E5A0] mx-auto mb-2 opacity-50" aria-hidden="true" />
                            <p className="text-xs text-[#8899AA]">Complete course to unlock your compliance certificate and digital badge.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
