"use client";
import React from "react";
import { CheckCircle2, Circle, Building2, Users, Receipt, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Static data ──────────────────────────────────────────────────────────────

const steps = [
    { id: 1, title: "Company Settings", desc: "Add logo, legal entity name, and PAN/TAN details.", icon: Building2, status: "completed", href: "/settings/company" },
    { id: 2, title: "Import Employees", desc: "Bulk upload via CSV or connect your ATS.", icon: Users, status: "current", href: "/onboarding/import" },
    { id: 3, title: "Configure Payroll Config", desc: "Set up salary structures, EPF rules, and PT states.", icon: Receipt, status: "pending", href: "/settings/payroll" },
    { id: 4, title: "Set Up Leave Policies", desc: "Define PTO, sick leave, and earned leave rules.", icon: ShieldCheck, status: "pending", href: "/settings/leave" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GuidedSetupChecklistScreen() {
    return (
        <Page
            title="Workspace Setup"
            subtitle="Just a few steps left to unlock the full power of Kaarya. Follow this guide to go live."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Setup Checklist", href: "/onboarding/checklist" },
            ]}
            maxWidth="900px"
            actions={
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-xl font-black text-emerald-400">25%</div>
                        <div className="text-[10px] text-[#556677] uppercase tracking-wider font-bold">Completed</div>
                    </div>
                    <div className="w-12 h-12 relative rounded-full flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" aria-hidden="true">
                            <circle className="text-[#131B2B]" strokeWidth="4" stroke="currentColor" fill="transparent" r="22" cx="24" cy="24" />
                            <circle className="text-emerald-500" strokeWidth="4" strokeDasharray="138" strokeDashoffset="103.5" strokeLinecap="round" stroke="currentColor" fill="transparent" r="22" cx="24" cy="24" />
                        </svg>
                    </div>
                </div>
            }
        >
            <div className="space-y-8">
                <Card padding="none" className="overflow-hidden">
                    <div className="divide-y divide-[#1A2A3A]">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.id}
                                    className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors ${step.status === "current" ? "bg-[#131B2B]/50" : "hover:bg-[#131B2B]/30"}`}
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="mt-1">
                                            {step.status === "completed" ? (
                                                <CheckCircle2 size={24} className="text-emerald-500" aria-hidden="true" />
                                            ) : step.status === "current" ? (
                                                <div className="w-6 h-6 rounded-full border-2 border-indigo-500 flex items-center justify-center" aria-hidden="true">
                                                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />
                                                </div>
                                            ) : (
                                                <Circle size={24} className="text-[#2A3A4A]" aria-hidden="true" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Icon size={18} className="text-[#8899AA]" aria-hidden="true" />
                                                <h3 className={`font-bold text-lg ${step.status === "completed" ? "text-[#8899AA] line-through" : "text-white"}`}>
                                                    {step.title}
                                                </h3>
                                                {step.status === "current" && (
                                                    <Badge variant="info">Next Step</Badge>
                                                )}
                                            </div>
                                            <p className={`text-sm ${step.status === "completed" ? "text-[#556677]" : "text-[#8899AA]"}`}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 ml-10 md:ml-0">
                                        {step.status === "completed" ? (
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        ) : step.status === "current" ? (
                                            <Link
                                                href={step.href}
                                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold transition-transform hover:-translate-y-0.5 shadow-lg shadow-indigo-500/25 whitespace-nowrap"
                                            >
                                                Start Task
                                            </Link>
                                        ) : (
                                            <Button variant="secondary" disabled>
                                                Locked
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                <Card className="flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-indigo-900/10">
                    <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
                            <Zap size={24} aria-hidden="true" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Looking for a faster way?</h4>
                            <p className="text-sm text-[#8899AA]">Let our AI scan your employment doc to auto-configure settings.</p>
                        </div>
                    </div>
                    <Button className="relative z-10 w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25">
                        Try Smart Setup
                    </Button>
                </Card>
            </div>
        </Page>
    );
}
