"use client";
import React from "react";
import {
    CheckCircle2, Clock, Building2,
    Coffee, Laptop, Users, ShieldAlert, FileText, ChevronRight
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data ──────────────────────────────────────────────────────────────

const DAY1_TASKS = [
    { id: 1, time: "09:30 AM", title: "Collect ID Badge & Access Card", desc: "Report to the main security desk at Ground Floor.", icon: ShieldAlert, status: "completed" },
    { id: 2, time: "10:00 AM", title: "IT Asset Handover", desc: "Collect your configured Macbook Pro and accessories from IT Helpdesk.", icon: Laptop, status: "active" },
    { id: 3, time: "11:00 AM", title: "HR Induction & Welcome", desc: "Join the People team in Conference Room A for a brief orientation.", icon: Users, status: "pending" },
    { id: 4, time: "12:30 PM", title: "Lunch with Buddy", desc: "Meet Vikram Singh at the 5th floor cafeteria.", icon: Coffee, status: "pending" },
    { id: 5, time: "02:00 PM", title: "Manager Check-in", desc: "Initial expectation setting and role overview.", icon: Building2, status: "pending" },
    { id: 6, time: "04:00 PM", title: "Sign Mandatory Policies", desc: "Acknowledge Code of Conduct via the portal.", icon: FileText, status: "pending" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Day1Checklist() {
    return (
        <Page
            title="Happy First Day!"
            subtitle="Here is your itinerary for today. Let's get you set up."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Day 1", href: "/onboarding/day-1" },
            ]}
            maxWidth="1000px"
        >
            <div className="space-y-8">
                {/* Progress Overview */}
                <Card className="flex flex-col md:flex-row items-center gap-6 justify-between">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-16 h-16 rounded-full border-4 border-[#1A2A3A] border-l-[#00E5A0] border-t-[#00E5A0] flex items-center justify-center font-bold text-xl text-white transform rotate-45"
                            role="progressbar"
                            aria-valuenow={1}
                            aria-valuemin={0}
                            aria-valuemax={6}
                            aria-label="1 of 6 tasks completed"
                        >
                            <span className="-rotate-45">1/6</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Tasks Completed</h2>
                            <p className="text-[#8899AA] text-sm mt-1">You are doing great, keep going!</p>
                        </div>
                    </div>
                    <Button>Mark IT Handover Done</Button>
                </Card>

                {/* Timeline Itinerary */}
                <div className="relative pl-4 md:pl-8">
                    {/* Vertical Line */}
                    <div className="absolute left-[38px] md:left-[54px] top-6 bottom-10 w-0.5 bg-[#1A2A3A]" aria-hidden="true" />

                    <div className="space-y-6">
                        {DAY1_TASKS.map((task) => {
                            const Icon = task.icon;
                            return (
                                <div key={task.id} className="relative flex items-start gap-6 group">
                                    {/* Timeline Node */}
                                    <div className="relative z-10 w-12 h-12 shrink-0 bg-[#0F1C2E] rounded-full border-4 border-[#0A1420] flex items-center justify-center mt-1" aria-hidden="true">
                                        {task.status === "completed" ? (
                                            <CheckCircle2 size={24} className="text-[#00E5A0]" />
                                        ) : task.status === "active" ? (
                                            <div className="w-4 h-4 rounded-full bg-[#00E5A0] shadow-[0_0_10px_rgba(0,229,160,0.8)] animate-pulse" />
                                        ) : (
                                            <div className="w-3 h-3 rounded-full bg-[#1A2A3A]" />
                                        )}
                                    </div>

                                    {/* Task Card */}
                                    <Card
                                        className={`flex-1 transition-all duration-300 ${
                                            task.status === "active"
                                                ? "border-[#00E5A0] shadow-[0_0_15px_rgba(0,229,160,0.05)] translate-x-2"
                                                : task.status === "completed"
                                                ? "border-[#1A2A3A] opacity-60"
                                                : "border-[#1A2A3A] hover:border-[#2A3A4A]"
                                        }`}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-xl shrink-0 mt-1 ${
                                                    task.status === "completed" ? "bg-[#1A2A3A] text-[#00E5A0]" :
                                                    task.status === "active" ? "bg-[#00E5A0]/10 text-[#00E5A0]" :
                                                    "bg-[#1A2A3A] text-[#8899AA]"
                                                }`}>
                                                    <Icon size={20} aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Clock size={12} className="text-[#8899AA]" aria-hidden="true" />
                                                        <span className={`text-xs font-bold tracking-wide uppercase ${task.status === "active" ? "text-[#00E5A0]" : "text-[#8899AA]"}`}>
                                                            {task.time}
                                                        </span>
                                                    </div>
                                                    <h3 className={`text-[17px] font-semibold ${task.status === "completed" ? "text-white line-through decoration-[#445566]" : "text-white"}`}>
                                                        {task.title}
                                                    </h3>
                                                    <p className="text-sm text-[#8899AA] mt-1.5 leading-relaxed max-w-lg">{task.desc}</p>
                                                </div>
                                            </div>

                                            <Button
                                                variant={task.status === "active" ? "primary" : "secondary"}
                                                size="sm"
                                                aria-label={`${task.status === "active" ? "Complete" : "View"} task: ${task.title}`}
                                                className={`shrink-0 w-10 h-10 rounded-full p-0 ${
                                                    task.status === "completed" ? "opacity-0 pointer-events-none" : ""
                                                }`}
                                            >
                                                <ChevronRight size={20} aria-hidden="true" />
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Page>
    );
}
