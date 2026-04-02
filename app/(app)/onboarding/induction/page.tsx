"use client";
import React, { useState } from "react";
import {
    Calendar as CalendarIcon, MapPin, Clock, Users, Video, FileText,
    ChevronRight, CalendarCheck, Megaphone, UserCircle
} from "lucide-react";

const INDUCTION_SCHEDULE = [
    {
        day: "Day 1: Welcome & Overview",
        date: "Monday, March 14, 2026",
        color: "from-[#00E5A0]/20 to-[#0A1420]",
        accent: "#00E5A0",
        events: [
            { time: "09:30 AM - 10:00 AM", title: "Registration & Badge Collection", type: "In-Person", link: "Reception Desk", icon: MapPin },
            { time: "10:00 AM - 11:30 AM", title: "Welcome to TechCorp", speaker: "Priya Mehta, HR Director", type: "Hybrid", link: "https://zoom.us/j/techcorp-welcome", icon: Video },
            { time: "11:30 AM - 01:00 PM", title: "Company Vision & Culture", speaker: "Rajat Khanna, CEO", type: "Hybrid", link: "https://zoom.us/j/techcorp-welcome", icon: Megaphone },
            { time: "01:00 PM - 02:00 PM", title: "Networking Lunch", type: "In-Person", link: "5th Floor Cafeteria", icon: MapPin },
            { time: "02:00 PM - 04:00 PM", title: "IT Setup & Cybersecurity Basics", speaker: "Amit Verma, Head of IT", type: "Hybrid", link: "https://zoom.us/j/techcorp-it", icon: Video },
        ]
    },
    {
        day: "Day 2: Product & Process",
        date: "Tuesday, March 15, 2026",
        color: "from-[#33E6FF]/20 to-[#0A1420]",
        accent: "#33E6FF",
        events: [
            { time: "10:00 AM - 12:00 PM", title: "Platform Architecture Overview", speaker: "Neha Singh, CTO", type: "Remote", link: "https://zoom.us/j/techcorp-eng", icon: Video },
            { time: "12:00 PM - 01:00 PM", title: "HR Policies & Benefits Deep Dive", speaker: "Sarika Rao, HR Ops", type: "Remote", link: "https://zoom.us/j/techcorp-hr", icon: Video },
            { time: "02:00 PM - 04:00 PM", title: "Department Breakouts", type: "Department", link: "See department calendar", icon: Users },
        ]
    }
];

export default function InductionProgram() {
    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <CalendarIcon size={28} className="text-[#9D00FF]" />
                        New Joiner Induction Program
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Schedules, links, and resources for the March 2026 Batch Orientation.</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors text-sm font-medium flex items-center gap-2">
                        <FileText size={16} /> Download PDF Agenda
                    </button>
                    <button className="px-4 py-2 bg-[#9D00FF] text-white rounded-lg hover:bg-[#b022ff] transition-colors text-sm font-semibold flex items-center gap-2">
                        <CalendarCheck size={16} /> Add to Calendar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Itinerary */}
                <div className="lg:col-span-2 space-y-8">
                    {INDUCTION_SCHEDULE.map((day, idx) => (
                        <div key={idx} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-xl">
                            {/* Day Header */}
                            <div className={`px-6 py-5 bg-gradient-to-r ${day.color} border-b border-[#1A2A3A] relative overflow-hidden`}>
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
                                {day.events.map((event, eventIdx) => (
                                    <div key={eventIdx} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-[#1A2A3A]/30 transition-colors group">

                                        {/* Time block */}
                                        <div className="shrink-0 w-32 flex flex-col gap-1">
                                            <span className="text-sm font-bold text-white block">{event.time.split(" - ")[0]}</span>
                                            <span className="text-xs text-[#8899AA] block">{event.time.split(" - ")[1]}</span>
                                        </div>

                                        {/* Main info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-white group-hover:text-[#00E5A0] transition-colors">{event.title}</h3>
                                                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded bg-[#1A2A3A] text-[#8899AA] border border-[#2A3A4A]">
                                                    {event.type}
                                                </span>
                                            </div>

                                            {event.speaker && (
                                                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-3">
                                                    <UserCircle size={14} /> Speaker: <span className="text-white">{event.speaker}</span>
                                                </div>
                                            )}

                                            <div className="flex flex-wrap items-center gap-4 mt-3">
                                                <div className="flex items-center gap-1.5 text-xs text-[#445566] bg-[#0A1420] px-3 py-1.5 rounded-lg border border-[#1A2A3A]">
                                                    <event.icon size={14} className={event.type === 'Hybrid' || event.type === 'Remote' ? "text-[#33E6FF]" : "text-[#FFB020]"} />
                                                    {event.type === 'Hybrid' || event.type === 'Remote' ? (
                                                        <a href={event.link} className="text-[#33E6FF] hover:underline hover:text-[#00E5A0]">Join Meeting Link</a>
                                                    ) : (
                                                        <span className="text-white">{event.link}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Key Contacts & Resources */}
                <div className="space-y-6">

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-4">Induction Contacts</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#1A2A3A]">
                                <div className="w-10 h-10 rounded-full bg-[#00E5A0] text-[#0A1420] flex items-center justify-center font-bold">PM</div>
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium mb-0.5">Priya Mehta</p>
                                    <p className="text-xs text-[#8899AA]">Onboarding Lead • HR</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#1A2A3A]">
                                <div className="w-10 h-10 rounded-full bg-[#33E6FF] text-[#0A1420] flex items-center justify-center font-bold">AV</div>
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium mb-0.5">Amit Verma</p>
                                    <p className="text-xs text-[#8899AA]">IT Support Ext: 4422</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-4">Required Preparation</h3>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-sm text-[#8899AA] items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] shrink-0 mt-1.5"></span>
                                Ensure your laptop is charged and connected to the corporate VPN prior to Day 2 remote sessions.
                            </li>
                            <li className="flex gap-3 text-sm text-[#8899AA] items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#33E6FF] shrink-0 mt-1.5"></span>
                                Have your employee ID number handy for system logins.
                            </li>
                            <li className="flex gap-3 text-sm text-[#8899AA] items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#9D00FF] shrink-0 mt-1.5"></span>
                                Complete the mandatory 'InfoSec Basics' module available in your learning portal by Day 3.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 cursor-pointer group hover:border-[#00E5A0] transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="block text-xs font-bold text-[#33E6FF] uppercase tracking-wider mb-1">Coming Up</span>
                                <h3 className="text-white font-bold">Batch Mixer Party</h3>
                                <p className="text-[#8899AA] text-sm mt-1">Friday, Mar 18 • Sky Lounge</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#0F1C2E] border border-[#1A2A3A] flex items-center justify-center group-hover:bg-[#00E5A0] group-hover:text-[#0A1420] transition-colors">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
