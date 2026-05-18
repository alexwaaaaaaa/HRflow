"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
    CheckCircle2, Circle, MessageSquare,
    TrendingUp, Award, PlayCircle
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data ──────────────────────────────────────────────────────────────

const PROGRESS: Record<30 | 60 | 90, number> = { 30: 85, 60: 20, 90: 0 };

const THEME: Record<30 | 60 | 90, { color: string; border: string }> = {
    30: { color: "#00E5A0", border: "border-[#00E5A0]" },
    60: { color: "#33E6FF", border: "border-[#33E6FF]" },
    90: { color: "#9D00FF", border: "border-[#9D00FF]" },
};

const TABS = [
    { id: 30 as const, title: "First 30 Days", desc: "Learn & Observe", status: "Active" },
    { id: 60 as const, title: "First 60 Days", desc: "Engage & Contribute", status: "Upcoming" },
    { id: 90 as const, title: "First 90 Days", desc: "Lead & Excel", status: "Locked" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DayPlanScreen() {
    const [activeTab, setActiveTab] = useState<30 | 60 | 90>(30);

    return (
        <Page
            title="30-60-90 Day Success Plan"
            subtitle="Your roadmap to impact, aligned with your manager Priya Singh."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "30-60-90 Plan", href: "/onboarding/30-60-90-plan" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<MessageSquare size={16} />}>
                        Request Feedback
                    </Button>
                    <Button icon={<TrendingUp size={16} />}>Update Progress</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Side: Navigation & Summary */}
                <div className="lg:col-span-1 space-y-4">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            aria-pressed={activeTab === tab.id}
                            className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                                activeTab === tab.id
                                    ? `bg-[#1A2A3A] ${THEME[tab.id].border} shadow-[0_0_15px_rgba(0,0,0,0.2)]`
                                    : "bg-[#0F1C2E] border-[#1A2A3A] hover:border-[#2A3A4A]"
                            }`}
                        >
                            {/* Progress Background Fill */}
                            <div
                                className="absolute inset-0 bg-[#1A2A3A]/50 pointer-events-none transition-all duration-1000"
                                style={{
                                    width: `${PROGRESS[tab.id]}%`,
                                    borderBottom: `2px solid ${THEME[tab.id].color}`,
                                }}
                            />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className={`font-bold text-[15px] ${activeTab === tab.id ? "text-white" : "text-[#8899AA]"}`}>
                                        {tab.title}
                                    </h3>
                                    <span
                                        className="text-xs font-mono font-medium"
                                        style={{ color: activeTab === tab.id ? THEME[tab.id].color : "#445566" }}
                                    >
                                        {PROGRESS[tab.id]}%
                                    </span>
                                </div>
                                <p className={`text-sm ${activeTab === tab.id ? "text-[#8899AA]" : "text-[#445566]"}`}>
                                    {tab.desc}
                                </p>
                            </div>
                        </button>
                    ))}

                    <Card className="mt-6">
                        <div className="flex items-start gap-4">
                            <Image
                                src="https://i.pravatar.cc/150?u=priya"
                                className="w-12 h-12 rounded-full border-2 border-[#1A2A3A]"
                                alt="Manager Priya Singh"
                                width={48}
                                height={48}
                            />
                            <div>
                                <h4 className="text-white font-bold text-sm">Priya Singh</h4>
                                <p className="text-[#8899AA] text-xs">Reporting Manager</p>
                                <p className="text-xs text-[#00E5A0] mt-2 flex items-center gap-1">
                                    <CheckCircle2 size={12} aria-hidden="true" /> Plan Approved
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Side: Plan Content */}
                <div className="lg:col-span-3">
                    <Card padding="none" className="overflow-hidden">

                        {/* Content Header */}
                        <div className="p-8 border-b border-[#1A2A3A] bg-gradient-to-br from-[#1A2A3A] to-[#0F1C2E] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10 flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Award size={24} style={{ color: THEME[activeTab].color }} aria-hidden="true" />
                                        <h2 className="text-2xl font-bold text-white">
                                            {activeTab === 30 ? "Learn & Observe" : activeTab === 60 ? "Engage & Contribute" : "Lead & Excel"}
                                        </h2>
                                    </div>
                                    <p className="text-[#8899AA]">
                                        {activeTab === 30
                                            ? "Focus on understanding the tech stack, company culture, and meeting your immediate team."
                                            : activeTab === 60
                                            ? "Start taking on small tickets, participate in code reviews, and suggest improvements."
                                            : "Take ownership of a feature, mentor a peer if applicable, and drive a process improvement."}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-black text-white">{PROGRESS[activeTab]}%</span>
                                    <p className="text-xs font-bold tracking-wider text-[#8899AA] uppercase">Complete</p>
                                </div>
                            </div>
                        </div>

                        {/* Objectives List */}
                        <div className="p-8 space-y-6">

                            {/* Category: Knowledge */}
                            <div>
                                <h3 className="text-[13px] font-bold tracking-wider text-[#8899AA] uppercase mb-4 border-b border-[#1A2A3A] pb-2">
                                    Knowledge Goals
                                </h3>
                                <div className="space-y-3">
                                    <div className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${activeTab === 30 ? "bg-[#0A1420] border-[#1A2A3A] opacity-60" : "bg-[#1A2A3A] border-[#2A3A4A]"}`}>
                                        <div className="mt-0.5">
                                            {activeTab === 30
                                                ? <CheckCircle2 size={24} className="text-[#00E5A0]" aria-hidden="true" />
                                                : <Circle size={24} className="text-[#445566]" aria-hidden="true" />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`text-[15px] font-semibold ${activeTab === 30 ? "text-[#8899AA] line-through decoration-[#445566]" : "text-white"}`}>
                                                Complete Product Architecture Walkthrough
                                            </h4>
                                            <p className="text-sm text-[#8899AA] mt-1 mb-3">
                                                Watch all recorded onboarding sessions for the core monolith architecture and microservices map.
                                            </p>
                                            {activeTab === 30 && (
                                                <div className="flex items-center gap-3 text-xs">
                                                    <span className="flex items-center gap-1 text-[#445566]">
                                                        <PlayCircle size={14} aria-hidden="true" /> 5 Videos
                                                    </span>
                                                    <span className="flex items-center gap-1 text-[#00E5A0]">
                                                        <CheckCircle2 size={14} aria-hidden="true" /> Verified by system
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${activeTab === 30 ? "bg-[#0A1420] border-[#1A2A3A] opacity-60" : "bg-[#1A2A3A] border-[#2A3A4A]"}`}>
                                        <div className="mt-0.5">
                                            {activeTab === 30
                                                ? <CheckCircle2 size={24} className="text-[#00E5A0]" aria-hidden="true" />
                                                : <Circle size={24} className="text-[#445566]" aria-hidden="true" />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`text-[15px] font-semibold ${activeTab === 30 ? "text-[#8899AA] line-through decoration-[#445566]" : "text-white"}`}>
                                                Shadow Support Team for 2 Hours
                                            </h4>
                                            <p className="text-sm text-[#8899AA] mt-1">Understand the common pain points of our users.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Category: Execution */}
                            <div>
                                <h3 className="text-[13px] font-bold tracking-wider text-[#8899AA] uppercase mb-4 border-b border-[#1A2A3A] pb-2 mt-8">
                                    Execution Goals
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A2A3A] border border-[#00E5A0] shadow-[0_0_15px_rgba(0,229,160,0.05)]">
                                        <div
                                            className="mt-0.5 w-6 h-6 rounded-full border-2 border-[#445566] cursor-pointer hover:border-[#00E5A0] transition-colors"
                                            role="checkbox"
                                            aria-checked="false"
                                            aria-label="Mark Push First Production Commits as complete"
                                            tabIndex={0}
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-[15px] font-semibold text-white">Push First Production Commits</h4>
                                            <p className="text-sm text-[#8899AA] mt-1 mb-3">
                                                Fix at least 3 minor UI bugs marked as &apos;good-first-issue&apos; and get them merged to main.
                                            </p>
                                            <div className="bg-[#0A1420] p-3 rounded-lg border border-[#2A3A4A]">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs font-semibold text-[#8899AA]">Progress: 1/3 PRs merged</span>
                                                    <span className="text-xs text-[#00E5A0] font-mono">33%</span>
                                                </div>
                                                <div
                                                    className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden"
                                                    role="progressbar"
                                                    aria-valuenow={33}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                    aria-label="1 of 3 PRs merged"
                                                >
                                                    <div className="h-full bg-[#00E5A0] rounded-full w-1/3" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0A1420] border border-[#1A2A3A] hover:border-[#2A3A4A] transition-colors cursor-pointer group">
                                        <div className="mt-0.5 w-6 h-6 rounded-full border-2 border-[#445566] group-hover:border-[#8899AA]" />
                                        <div className="flex-1">
                                            <h4 className="text-[15px] font-semibold text-white">1-on-1 Feedback with Reporting Manager</h4>
                                            <p className="text-sm text-[#8899AA] mt-1">Schedule and complete the formal 30-day review discussion.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Card>
                </div>

            </div>
        </Page>
    );
}
