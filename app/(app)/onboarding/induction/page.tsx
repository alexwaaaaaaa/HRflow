"use client";
import React from "react";
import {
    MapPin, Users, Video, FileText,
    ChevronRight, CalendarCheck, Megaphone, UserCircle,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Static data ─────────────────────────────────────────────────────────────

type EventType = "In-Person" | "Hybrid" | "Remote" | "Department";

interface InductionEvent {
    time: string;
    title: string;
    type: EventType;
    link: string;
    icon: typeof MapPin;
    speaker?: string;
}

interface InductionDay {
    day: string;
    date: string;
    accent: string;
    events: InductionEvent[];
}

const INDUCTION_SCHEDULE: InductionDay[] = [
    {
        day: "Day 1: Welcome & Overview",
        date: "Monday, March 14, 2026",
        accent: "#00E5A0",
        events: [
            { time: "09:30 AM - 10:00 AM", title: "Registration & Badge Collection", type: "In-Person", link: "Reception Desk", icon: MapPin },
            { time: "10:00 AM - 11:30 AM", title: "Welcome to TechCorp", speaker: "Priya Mehta, HR Director", type: "Hybrid", link: "https://zoom.us/j/techcorp-welcome", icon: Video },
            { time: "11:30 AM - 01:00 PM", title: "Company Vision & Culture", speaker: "Rajat Khanna, CEO", type: "Hybrid", link: "https://zoom.us/j/techcorp-welcome", icon: Megaphone },
            { time: "01:00 PM - 02:00 PM", title: "Networking Lunch", type: "In-Person", link: "5th Floor Cafeteria", icon: MapPin },
            { time: "02:00 PM - 04:00 PM", title: "IT Setup & Cybersecurity Basics", speaker: "Amit Verma, Head of IT", type: "Hybrid", link: "https://zoom.us/j/techcorp-it", icon: Video },
        ],
    },
    {
        day: "Day 2: Product & Process",
        date: "Tuesday, March 15, 2026",
        accent: "#33E6FF",
        events: [
            { time: "10:00 AM - 12:00 PM", title: "Platform Architecture Overview", speaker: "Neha Singh, CTO", type: "Remote", link: "https://zoom.us/j/techcorp-eng", icon: Video },
            { time: "12:00 PM - 01:00 PM", title: "HR Policies & Benefits Deep Dive", speaker: "Sarika Rao, HR Ops", type: "Remote", link: "https://zoom.us/j/techcorp-hr", icon: Video },
            { time: "02:00 PM - 04:00 PM", title: "Department Breakouts", type: "Department", link: "See department calendar", icon: Users },
        ],
    },
];

const EVENT_TYPE_BADGE: Record<EventType, "info" | "success" | "neutral" | "warning"> = {
    "In-Person": "warning",
    Hybrid: "info",
    Remote: "success",
    Department: "neutral",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InductionProgram() {
    return (
        <Page
            title="New Joiner Induction Program"
            subtitle="Schedules, links, and resources for the March 2026 Batch Orientation."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Induction", href: "/onboarding/induction" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<FileText size={16} aria-hidden="true" />}>
                        Download PDF Agenda
                    </Button>
                    <Button icon={<CalendarCheck size={16} aria-hidden="true" />}>
                        Add to Calendar
                    </Button>
                </>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Itinerary */}
                <div className="lg:col-span-2 space-y-8">
                    {INDUCTION_SCHEDULE.map((day) => (
                        <Card key={day.day} padding="none" className="overflow-hidden shadow-xl">
                            {/* Day Header */}
                            <div
                                className="px-6 py-5 border-b border-[#1A2A3A] relative overflow-hidden"
                                style={{ background: `linear-gradient(to right, ${day.accent}20, #0A1420)` }}
                            >
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-1">{day.day}</h2>
                                        <p className="text-sm font-medium" style={{ color: day.accent }}>{day.date}</p>
                                    </div>
                                    <div className="px-3 py-1 bg-[#0A1420]/50 rounded-lg border border-[#1A2A3A] text-sm text-white font-mono">
                                        {day.events.length} Sessions
                                    </div>
                                </div>
                            </div>

                            {/* Event List */}
                            <div className="divide-y divide-[#1A2A3A]">
                                {day.events.map((event) => (
                                    <div
                                        key={event.title}
                                        className="p-6 flex flex-col md:flex-row gap-6 hover:bg-[#1A2A3A]/30 transition-colors group"
                                    >
                                        {/* Time block */}
                                        <div className="shrink-0 w-32 flex flex-col gap-1">
                                            <span className="text-sm font-bold text-white block">{event.time.split(" - ")[0]}</span>
                                            <span className="text-xs text-[#8899AA] block">{event.time.split(" - ")[1]}</span>
                                        </div>

                                        {/* Main info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-white group-hover:text-[#00E5A0] transition-colors">
                                                    {event.title}
                                                </h3>
                                                <Badge variant={EVENT_TYPE_BADGE[event.type]}>{event.type}</Badge>
                                            </div>

                                            {event.speaker && (
                                                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-3">
                                                    <UserCircle size={14} aria-hidden="true" /> Speaker:{" "}
                                                    <span className="text-white">{event.speaker}</span>
                                                </div>
                                            )}

                                            <div className="flex flex-wrap items-center gap-4 mt-3">
                                                <div className="flex items-center gap-1.5 text-xs text-[#445566] bg-[#0A1420] px-3 py-1.5 rounded-lg border border-[#1A2A3A]">
                                                    <event.icon
                                                        size={14}
                                                        className={event.type === "Hybrid" || event.type === "Remote" ? "text-[#33E6FF]" : "text-[#FFB020]"}
                                                        aria-hidden="true"
                                                    />
                                                    {event.type === "Hybrid" || event.type === "Remote" ? (
                                                        <a href={event.link} className="text-[#33E6FF] hover:underline hover:text-[#00E5A0]">
                                                            Join Meeting Link
                                                        </a>
                                                    ) : (
                                                        <span className="text-white">{event.link}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Right Column: Key Contacts & Resources */}
                <div className="space-y-6">
                    <Card padding="lg">
                        <h3 className="text-white font-bold mb-4">Induction Contacts</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#1A2A3A]">
                                <div className="w-10 h-10 rounded-full bg-[#00E5A0] text-[#0A1420] flex items-center justify-center font-bold" aria-hidden="true">PM</div>
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium mb-0.5">Priya Mehta</p>
                                    <p className="text-xs text-[#8899AA]">Onboarding Lead • HR</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#1A2A3A]">
                                <div className="w-10 h-10 rounded-full bg-[#33E6FF] text-[#0A1420] flex items-center justify-center font-bold" aria-hidden="true">AV</div>
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium mb-0.5">Amit Verma</p>
                                    <p className="text-xs text-[#8899AA]">IT Support Ext: 4422</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h3 className="text-white font-bold mb-4">Required Preparation</h3>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-sm text-[#8899AA] items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] shrink-0 mt-1.5" aria-hidden="true" />
                                Ensure your laptop is charged and connected to the corporate VPN prior to Day 2 remote sessions.
                            </li>
                            <li className="flex gap-3 text-sm text-[#8899AA] items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#33E6FF] shrink-0 mt-1.5" aria-hidden="true" />
                                Have your employee ID number handy for system logins.
                            </li>
                            <li className="flex gap-3 text-sm text-[#8899AA] items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#9D00FF] shrink-0 mt-1.5" aria-hidden="true" />
                                Complete the mandatory &apos;InfoSec Basics&apos; module available in your learning portal by Day 3.
                            </li>
                        </ul>
                    </Card>

                    <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 cursor-pointer group hover:border-[#00E5A0] transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="block text-xs font-bold text-[#33E6FF] uppercase tracking-wider mb-1">Coming Up</span>
                                <h3 className="text-white font-bold">Batch Mixer Party</h3>
                                <p className="text-[#8899AA] text-sm mt-1">Friday, Mar 18 • Sky Lounge</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#0F1C2E] border border-[#1A2A3A] flex items-center justify-center group-hover:bg-[#00E5A0] group-hover:text-[#0A1420] transition-colors">
                                <ChevronRight size={20} aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
