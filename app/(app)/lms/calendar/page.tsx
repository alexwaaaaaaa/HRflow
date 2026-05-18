"use client";
import React, { useState } from "react";
import {
    Calendar as CalendarIcon, ChevronLeft, ChevronRight, Video, MapPin, Search, Filter, Plus,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface CalendarEvent {
    id: number;
    date: number;
    title: string;
    type: "virtual" | "in-person" | "webinar";
    time: string;
    instructor?: string;
    location?: string;
}

const CALENDAR_EVENTS: CalendarEvent[] = [
    { id: 1, date: 12, title: "Leadership Workshop Part 1", type: "virtual", time: "10:00 AM – 12:00 PM", instructor: "Sarah Drasner" },
    { id: 2, date: 15, title: "Fire Safety Training", type: "in-person", time: "2:00 PM – 4:00 PM", location: "Conference Room A" },
    { id: 3, date: 18, title: "Q3 Townhall & Engineering Updates", type: "virtual", time: "11:00 AM – 12:30 PM", instructor: "CTO" },
    { id: 4, date: 22, title: "Advanced React Patterns Live Q&A", type: "webinar", time: "3:00 PM – 4:00 PM", instructor: "Kent C. Dodds" },
    { id: 5, date: 25, title: "New Manager Orientation", type: "in-person", time: "9:00 AM – 5:00 PM", location: "HQ Training Center" },
];

const EVENT_TYPE_VARIANT: Record<CalendarEvent["type"], "info" | "warning"> = {
    virtual: "info",
    webinar: "info",
    "in-person": "warning",
};

const PREV_DAYS = [28, 29, 30] as const;
const NEXT_DAYS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export default function TrainingCalendar() {
    const [_currentDate] = useState(new Date(2025, 9, 1));

    return (
        <Page
            title="Training Calendar"
            subtitle="Discover and enroll in upcoming instructor-led training, webinars, and workshops"
            breadcrumbs={[{ label: "LMS", href: "/lms/dashboard" }, { label: "Calendar" }]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={16} />}>Filter</Button>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                        <input
                            type="search"
                            placeholder="Search events…"
                            aria-label="Search events"
                            className="bg-[#0A1420] border border-[#2A3A4A] rounded-xl pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#33E6FF]"
                        />
                    </div>
                </>
            }
        >
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Calendar View */}
                <Card padding="none" className="xl:col-span-3 overflow-hidden flex flex-col h-[700px]">
                    <div className="flex items-center justify-between p-6 border-b border-[#1A2A3A]">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-white">October 2025</h2>
                            <div className="flex items-center gap-1 bg-[#152336] p-1 rounded-lg border border-[#2A3A4A]">
                                <Button variant="ghost" size="sm" aria-label="Previous month">
                                    <ChevronLeft size={18} aria-hidden="true" />
                                </Button>
                                <span className="text-white text-sm font-semibold px-2">Today</span>
                                <Button variant="ghost" size="sm" aria-label="Next month">
                                    <ChevronRight size={18} aria-hidden="true" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm">Month</Button>
                            <Button variant="ghost" size="sm">Week</Button>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-7 grid-rows-6 auto-rows-fr bg-[#1A2A3A] gap-[1px]">
                        {WEEK_DAYS.map((day) => (
                            <div key={day} className="bg-[#0F1C2E] p-3 text-right text-xs font-semibold text-[#8899AA] uppercase tracking-wider">
                                {day}
                            </div>
                        ))}

                        {PREV_DAYS.map((day) => (
                            <div key={`prev-${day}`} className="bg-[#0F1C2E] p-2 min-h-24 opacity-40">
                                <span className="text-sm font-medium text-[#8899AA]">{day}</span>
                            </div>
                        ))}

                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                            const events = CALENDAR_EVENTS.filter((e) => e.date === day);
                            const isToday = day === 15;
                            return (
                                <div
                                    key={`oct-${day}`}
                                    className={`bg-[#0F1C2E] p-2 min-h-24 hover:bg-[#152336] transition-colors cursor-pointer group relative ${isToday ? "ring-2 ring-inset ring-[#33E6FF]" : ""}`}
                                >
                                    <span className={`text-sm font-medium ${isToday ? "text-[#33E6FF] flex items-center justify-center w-6 h-6 rounded-full bg-[#33E6FF]/10" : "text-[#8899AA] group-hover:text-white"}`}>
                                        {day}
                                    </span>
                                    <div className="mt-2 flex flex-col gap-1">
                                        {events.map((e, idx) => (
                                            <div
                                                key={idx}
                                                className={`text-[10px] px-2 py-1 flex items-center gap-1 rounded font-semibold truncate ${e.type === "in-person" ? "bg-[#FFB020]/10 text-[#FFB020] border border-[#FFB020]/20" : "bg-[#33E6FF]/10 text-[#33E6FF] border border-[#33E6FF]/20"}`}
                                            >
                                                {e.type === "in-person" ? <MapPin size={10} aria-hidden="true" /> : <Video size={10} aria-hidden="true" />}
                                                <span className="truncate">{e.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {NEXT_DAYS.map((day) => (
                            <div key={`next-${day}`} className="bg-[#0F1C2E] p-2 min-h-24 opacity-40">
                                <span className="text-sm font-medium text-[#8899AA]">{day}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <Card padding="lg" className="sticky top-0">
                        <h3 className="font-bold text-white mb-6 border-b border-[#1A2A3A] pb-3">Upcoming Events</h3>
                        <div className="space-y-4">
                            {CALENDAR_EVENTS.slice(0, 4).map((e) => (
                                <div key={e.id} className="group cursor-pointer">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-14 bg-[#152336] rounded-xl border border-[#2A3A4A] flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:border-[#33E6FF] transition-colors">
                                            <span className="text-[#8899AA] text-[10px] uppercase font-bold">Oct</span>
                                            <span className="text-white font-bold text-lg leading-tight">{e.date}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#33E6FF] transition-colors">{e.title}</h4>
                                            <p className="text-xs text-[#8899AA] mt-1 flex items-center gap-1.5">
                                                <CalendarIcon size={12} aria-hidden="true" /> {e.time}
                                            </p>
                                            <div className="mt-2">
                                                <Badge variant={EVENT_TYPE_VARIANT[e.type]}>
                                                    {e.type === "in-person" ? <MapPin size={10} aria-hidden="true" /> : <Video size={10} aria-hidden="true" />}
                                                    {e.type === "in-person" ? "In-Person" : "Virtual"}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b border-[#1A2A3A] mt-4 ml-16" />
                                </div>
                            ))}
                        </div>
                        <Button variant="secondary" size="sm" className="w-full mt-6 justify-center" icon={<Plus size={14} />}>
                            Request Training
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
