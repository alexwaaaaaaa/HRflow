"use client";
import React, { useState } from "react";
import { Search, Plus, Calendar as CalIcon, Clock, Users, Video, MapPin, MoreVertical, CheckCircle2, ChevronRight, Check, Briefcase, ChevronLeft } from "lucide-react";

// Mock Data
const SCHEDULE = [
    { id: 1, c_name: "Rahul Sharma", role: "Sr. Frontend Eng", type: "Technical", interviewer: "Priya Nair", date: "Today", time: "10:30 AM - 11:30 AM", mode: "Google Meet" },
    { id: 2, c_name: "Sneha Gupta", role: "Product Manager", type: "Culture", interviewer: "Rajesh K.", date: "Today", time: "02:00 PM - 03:00 PM", mode: "Zoom" },
    { id: 3, c_name: "Amit Patel", role: "Backend Engineer", type: "System Des", interviewer: "Vikram S.", date: "Tomorrow", time: "11:00 AM - 12:30 PM", mode: "Office (Room 4)" },
    { id: 4, c_name: "Anjali Singh", role: "Sr. Frontend Eng", type: "VP Round", interviewer: "Suresh R.", date: "14 Mar", time: "04:00 PM - 04:45 PM", mode: "Google Meet" },
];

export default function InterviewSchedule() {
    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Interviews</h1>
                    <p className="text-sm text-[#8899AA]">Manage upcoming interview schedules across the recruitment pipeline</p>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-white text-sm font-medium rounded-xl hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                        <CalIcon size={14} /> Sync Calendar
                    </button>
                    <button className="h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-colors">
                        <Plus size={14} /> Schedule Interview
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[{ l: "Today", v: "2" }, { l: "This Week", v: "14" }, { l: "Pending Feedbacks", v: "5", c: "#FFB800" }, { l: "Rescheduled", v: "1" }].map((s, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 flex flex-col justify-center">
                        <p className="text-2xl font-bold mb-1" style={{ color: s.c || "#fff" }}>{s.v}</p>
                        <p className="text-xs text-[#8899AA]">{s.l}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input placeholder="Search interviewer or candidate..." className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                </div>
                <select className="h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none min-w-[150px]">
                    <option>All Interviewers</option><option>Priya Nair</option><option>Rajesh K.</option>
                </select>
                <select className="h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none min-w-[150px]">
                    <option>All Dates</option><option>Today</option><option>Tomorrow</option><option>Next Week</option>
                </select>
            </div>

            {/* Schedule List */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-[#1A2A3A] bg-[#0A1420]">
                    <h3 className="font-semibold text-sm">Upcoming Schedule</h3>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded border border-[#1A2A3A] flex items-center justify-center text-[#8899AA] hover:text-white"><ChevronLeft size={14} /></button>
                        <span className="text-xs font-medium text-white px-2">12 Mar - 18 Mar</span>
                        <button className="w-8 h-8 rounded border border-[#1A2A3A] flex items-center justify-center text-[#8899AA] hover:text-white"><ChevronRight size={14} /></button>
                    </div>
                </div>

                <div className="divide-y divide-[#1A2A3A]">
                    {SCHEDULE.map(int => (
                        <div key={int.id} className="p-4 hover:bg-[#1A2A3A]/30 transition-colors flex items-center justify-between group">
                            <div className="flex gap-6 items-center w-full max-w-[800px]">
                                {/* Timing */}
                                <div className="w-[120px] shrink-0 text-center bg-[#060B14] border border-[#1A2A3A] rounded-xl py-2">
                                    <p className="text-[10px] text-[#445566] uppercase font-bold mb-0.5">{int.date}</p>
                                    <p className="text-xs font-semibold text-white">{int.time.split(" - ")[0]}</p>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="font-bold text-white text-base">{int.c_name}</h4>
                                        <span className="px-2 py-0.5 text-[10px] bg-[#9B59B6]/10 text-[#9B59B6] rounded font-bold uppercase">{int.type} Round</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-[#8899AA] mt-1.5">
                                        <span className="flex items-center gap-1.5"><Briefcase size={12} className="text-[#445566]" /> {int.role}</span>
                                        <span className="flex items-center gap-1.5 text-white font-medium bg-[#1A2A3A] px-2 py-0.5 rounded"><CalIcon size={12} className="text-[#8899AA]" /> {int.interviewer}</span>
                                        <span className="flex items-center gap-1.5"><Video size={12} className="text-[#0066FF]" /> {int.mode}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="h-8 px-3 bg-[#0066FF] text-white text-xs font-bold rounded-lg hover:bg-[#0052cc] transition-colors">Join Call</button>
                                <button className="h-8 px-3 bg-[#1A2A3A] text-white text-xs font-bold rounded-lg hover:bg-[#243040] transition-colors">Reschedule</button>
                                <button className="w-8 h-8 flex items-center justify-center text-[#8899AA] hover:text-white"><MoreVertical size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
