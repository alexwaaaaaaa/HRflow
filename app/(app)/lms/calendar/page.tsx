"use client";
import React, { useState } from "react";
import {
    Calendar as CalendarIcon, ChevronLeft, ChevronRight, Video, Users, MapPin, Search, Filter, Plus
} from "lucide-react";

const CALENDAR_EVENTS = [
    { id: 1, date: 12, title: "Leadership Workshop Part 1", type: "virtual", time: "10:00 AM - 12:00 PM", instructor: "Sarah Drasner" },
    { id: 2, date: 15, title: "Fire Safety Training", type: "in-person", time: "2:00 PM - 4:00 PM", location: "Conference Room A" },
    { id: 3, date: 18, title: "Q3 Townhall & Engineering Updates", type: "virtual", time: "11:00 AM - 12:30 PM", instructor: "CTO" },
    { id: 4, date: 22, title: "Advanced React Patterns Live Q&A", type: "webinar", time: "3:00 PM - 4:00 PM", instructor: "Kent C. Dodds" },
    { id: 5, date: 25, title: "New Manager Orientation", type: "in-person", time: "9:00 AM - 5:00 PM", location: "HQ Training Center" }
];

export default function TrainingCalendar() {
    const [currentDate] = useState(new Date(2025, 9, 1)); // October 2025

    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <CalendarIcon size={28} className="text-[#33E6FF]" /> Training Calendar
                    </h1>
                    <p className="text-[#8899AA]">Discover and enroll in upcoming instructor-led training, webinars, and workshops.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#0F1C2E] text-white rounded-xl font-medium hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                        <Filter size={18} className="text-[#8899AA]" /> Filter
                    </button>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                        <input type="text" placeholder="Search events..." className="bg-[#0A1420] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#33E6FF]" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                {/* Calendar View */}
                <div className="xl:col-span-3 bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl shadow-xl overflow-hidden flex flex-col h-[700px]">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[#1A2A3A]">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-white">October 2025</h2>
                            <div className="flex items-center gap-1 bg-[#152336] p-1 rounded-lg border border-[#2A3A4A]">
                                <button className="p-1 hover:bg-[#2A3A4A] rounded text-[#8899AA] hover:text-white transition-colors"><ChevronLeft size={20} /></button>
                                <span className="text-white text-sm font-semibold px-2">Today</span>
                                <button className="p-1 hover:bg-[#2A3A4A] rounded text-[#8899AA] hover:text-white transition-colors"><ChevronRight size={20} /></button>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors">Month</button>
                            <button className="px-3 py-1.5 bg-transparent border border-transparent text-[#8899AA] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors">Week</button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="flex-1 grid grid-cols-7 grid-rows-6 auto-rows-fr bg-[#1A2A3A] gap-[1px]">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="bg-[#0F1C2E] p-3 text-right text-xs font-semibold text-[#8899AA] uppercase tracking-wider">
                                {day}
                            </div>
                        ))}

                        {/* Padding days */}
                        {[28, 29, 30].map(day => (
                            <div key={`prev-${day}`} className="bg-[#0F1C2E] p-2 min-h-24 opacity-40">
                                <span className="text-sm font-medium text-[#8899AA]">{day}</span>
                            </div>
                        ))}

                        {/* October Days */}
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                            const events = CALENDAR_EVENTS.filter(e => e.date === day);
                            return (
                                <div key={`oct-${day}`} className={`bg-[#0F1C2E] p-2 min-h-24 hover:bg-[#152336] transition-colors cursor-pointer group relative ${day === 15 ? 'ring-2 ring-inset ring-[#33E6FF]' : ''}`}>
                                    <span className={`text-sm font-medium ${day === 15 ? 'text-[#33E6FF] flex items-center justify-center w-6 h-6 rounded-full bg-[#33E6FF]/10' : 'text-[#8899AA] group-hover:text-white'}`}>
                                        {day}
                                    </span>

                                    <div className="mt-2 flex flex-col gap-1">
                                        {events.map((e, idx) => (
                                            <div key={idx} className={`text-[10px] px-2 py-1 flex items-center gap-1 rounded font-semibold truncate ${e.type === 'virtual' || e.type === 'webinar' ? 'bg-[#33E6FF]/10 text-[#33E6FF] border border-[#33E6FF]/20' : 'bg-[#FFB020]/10 text-[#FFB020] border border-[#FFB020]/20'
                                                }`}>
                                                {e.type === 'in-person' ? <MapPin size={10} /> : <Video size={10} />}
                                                <span className="truncate">{e.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Padding next month */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(day => (
                            <div key={`next-${day}`} className="bg-[#0F1C2E] p-2 min-h-24 opacity-40">
                                <span className="text-sm font-medium text-[#8899AA]">{day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar: Upcoming */}
                <div className="space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl sticky top-0">
                        <h3 className="font-bold text-white mb-6 border-b border-[#1A2A3A] pb-3">Upcoming Events</h3>

                        <div className="space-y-4">
                            {CALENDAR_EVENTS.slice(0, 4).map(e => (
                                <div key={e.id} className="group cursor-pointer">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-14 bg-[#152336] rounded-xl border border-[#2A3A4A] flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:border-[#33E6FF] transition-colors">
                                            <span className="text-[#8899AA] text-[10px] uppercase font-bold">Oct</span>
                                            <span className="text-white font-bold text-lg leading-tight">{e.date}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#33E6FF] transition-colors">{e.title}</h4>
                                            <p className="text-xs text-[#8899AA] mt-1 flex items-center gap-1.5"><CalendarIcon size={12} /> {e.time}</p>
                                            <div className="mt-2">
                                                {e.type === 'in-person' ? (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FFB020] bg-[#FFB020]/10 px-2 py-0.5 rounded border border-[#FFB020]/20">
                                                        <MapPin size={10} /> In-Person
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#33E6FF] bg-[#33E6FF]/10 px-2 py-0.5 rounded border border-[#33E6FF]/20">
                                                        <Video size={10} /> Virtual
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {e !== CALENDAR_EVENTS[3] && <div className="border-b border-[#1A2A3A] mt-4 ml-16"></div>}
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-2.5 bg-[#1A2A3A] border border-[#2A3A4A] text-white font-semibold flex items-center justify-center gap-2 rounded-xl hover:bg-[#2A3A4A] transition-colors">
                            <Plus size={16} /> Request Training
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}
