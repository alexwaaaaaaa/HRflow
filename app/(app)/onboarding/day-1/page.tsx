"use client";
import React, { useState } from "react";
import {
    CheckCircle2, Circle, Clock, Building2, MapPin,
    Coffee, Laptop, Users, ShieldAlert, FileText, ChevronRight
} from "lucide-react";

const DAY1_TASKS = [
    { id: 1, time: "09:30 AM", title: "Collect ID Badge & Access Card", desc: "Report to the main security desk at Ground Floor.", icon: ShieldAlert, status: "completed" },
    { id: 2, time: "10:00 AM", title: "IT Asset Handover", desc: "Collect your configured Macbook Pro and accessories from IT Helpdesk.", icon: Laptop, status: "active" },
    { id: 3, time: "11:00 AM", title: "HR Induction & Welcome", desc: "Join the People team in Conference Room A for a brief orientation.", icon: Users, status: "pending" },
    { id: 4, time: "12:30 PM", title: "Lunch with Buddy", desc: "Meet Vikram Singh at the 5th floor cafeteria.", icon: Coffee, status: "pending" },
    { id: 5, time: "02:00 PM", title: "Manager Check-in", desc: "Initial expectation setting and role overview.", icon: Building2, status: "pending" },
    { id: 6, time: "04:00 PM", title: "Sign Mandatory Policies", desc: "Acknowledge Code of Conduct via the portal.", icon: FileText, status: "pending" },
];

export default function Day1Checklist() {
    return (
        <div className="min-h-screen bg-[#0A1420] text-white p-6 md:p-10 max-w-[1000px] mx-auto">

            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00E5A0] to-[#33E6FF] bg-clip-text text-transparent mb-2">Happy First Day!</h1>
                <p className="text-[#8899AA] text-lg">Here is your itinerary for today. Let's get you set up.</p>
            </div>

            {/* Progress Overview */}
            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-[#1A2A3A] border-l-[#00E5A0] border-t-[#00E5A0] flex items-center justify-center font-bold text-xl text-white transform rotate-45">
                        <span className="-rotate-45">1/6</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">Tasks Completed</h2>
                        <p className="text-[#8899AA] text-sm mt-1">You are doing great, keep going!</p>
                    </div>
                </div>
                <button className="w-full md:w-auto px-6 py-2.5 bg-[#00E5A0] text-[#0A1420] font-semibold rounded-lg hover:bg-[#00c98d] transition-colors shadow-[0_0_20px_rgba(0,229,160,0.3)]">
                    Mark IT Handover Done
                </button>
            </div>

            {/* Timeline Itinerary */}
            <div className="relative pl-4 md:pl-8">
                {/* Vertical Line */}
                <div className="absolute left-[38px] md:left-[54px] top-6 bottom-10 w-0.5 bg-[#1A2A3A]"></div>

                <div className="space-y-6">
                    {DAY1_TASKS.map((task) => (
                        <div key={task.id} className="relative flex items-start gap-6 group">
                            {/* Timeline Node */}
                            <div className="relative z-10 w-12 h-12 shrink-0 bg-[#0F1C2E] rounded-full border-4 border-[#0A1420] flex items-center justify-center mt-1">
                                {task.status === "completed" ? (
                                    <CheckCircle2 size={24} className="text-[#00E5A0]" />
                                ) : task.status === "active" ? (
                                    <div className="w-4 h-4 rounded-full bg-[#00E5A0] shadow-[0_0_10px_rgba(0,229,160,0.8)] animate-pulse"></div>
                                ) : (
                                    <div className="w-3 h-3 rounded-full bg-[#1A2A3A]"></div>
                                )}
                            </div>

                            {/* Task Card */}
                            <div className={`flex-1 rounded-2xl p-5 border transition-all duration-300 ${task.status === "active"
                                    ? "bg-[#1A2A3A]/60 border-[#00E5A0] shadow-[0_0_15px_rgba(0,229,160,0.05)] translate-x-2"
                                    : task.status === "completed"
                                        ? "bg-[#0F1C2E] border-[#1A2A3A] opacity-60"
                                        : "bg-[#0F1C2E] border-[#1A2A3A] hover:border-[#2A3A4A]"
                                }`}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl shrink-0 mt-1 ${task.status === "completed" ? "bg-[#1A2A3A] text-[#00E5A0]" :
                                                task.status === "active" ? "bg-[#00E5A0]/10 text-[#00E5A0]" :
                                                    "bg-[#1A2A3A] text-[#8899AA]"
                                            }`}>
                                            <task.icon size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Clock size={12} className="text-[#8899AA]" />
                                                <span className={`text-xs font-bold tracking-wide uppercase ${task.status === 'active' ? 'text-[#00E5A0]' : 'text-[#8899AA]'}`}>
                                                    {task.time}
                                                </span>
                                            </div>
                                            <h3 className={`text-[17px] font-semibold ${task.status === 'completed' ? 'text-white line-through decoration-[#445566]' : 'text-white'}`}>
                                                {task.title}
                                            </h3>
                                            <p className="text-sm text-[#8899AA] mt-1.5 leading-relaxed max-w-lg">{task.desc}</p>
                                        </div>
                                    </div>

                                    <button className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors ${task.status === "active" ? "bg-[#00E5A0] text-[#0A1420] hover:bg-[#00c98d]" :
                                            task.status === "completed" ? "opacity-0" :
                                                "bg-[#1A2A3A] text-[#8899AA] hover:text-white"
                                        }`}>
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
