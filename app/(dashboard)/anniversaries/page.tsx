"use client";

import { useState } from "react";
import { Search, Gift, Award } from "lucide-react";
import Button from "@/components/ui/Button";

const tabs = ["All Events", "Birthdays 🎂", "Work Anniversaries 🎊"];

const events = [
    { id: 1, type: "birthday", n: "Rahul Sharma", d: "Engineering", dt: "Today, 12 Nov", r: "Turning 28", c: "#FFB800" },
    { id: 2, type: "anniversary", n: "Pooja Nair", d: "HR", dt: "Tomorrow, 13 Nov", r: "2 Years", c: "#0066FF" },
    { id: 3, type: "birthday", n: "Vikram Singh", d: "Sales", dt: "15 Nov 2024", r: "Turning 34", c: "#00E5A0" },
    { id: 4, type: "anniversary", n: "Amit Kumar", d: "Engineering", dt: "18 Nov 2024", r: "5 Years 🏆", c: "#FFB800" },
    { id: 5, type: "birthday", n: "Sneha Rao", d: "Marketing", dt: "22 Nov 2024", r: "Turning 26", c: "#8899AA" },
    { id: 6, type: "anniversary", n: "Rohan Desai", d: "Finance", dt: "28 Nov 2024", r: "10 Years 🌟", c: "#FF4444" }
];

export default function BirthdaysAndAnniversaries() {
    const [activeTab, setActiveTab] = useState(0);

    const filtered = events.filter(e => {
        if (activeTab === 1) return e.type === "birthday";
        if (activeTab === 2) return e.type === "anniversary";
        return true;
    });

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative max-w-4xl">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Celebrations</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Upcoming birthdays and work anniversaries this month</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="secondary" className="gap-2"><Search size={16} /> Search</Button>
                    <Button className="gap-2"><Gift size={16} /> Send Bulk Wishes</Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#1A2A3A] mb-8">
                {tabs.map((t, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        style={{
                            padding: "12px 24px",
                            fontSize: 14,
                            fontWeight: 500,
                            color: activeTab === i ? "#00E5A0" : "#8899AA",
                            borderBottom: `2px solid ${activeTab === i ? "#00E5A0" : "transparent"}`,
                            transition: "all 0.2s"
                        }}
                        className="hover:text-white"
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-6">
                {filtered.map(ev => {
                    const Icon = ev.type === "birthday" ? Gift : Award;
                    const bgRgba = `rgba(${ev.c === "#FFB800" ? "255,184,0" : ev.c === "#0066FF" ? "0,102,255" : ev.c === "#00E5A0" ? "0,229,160" : ev.c === "#FF4444" ? "255,68,68" : "136,153,170"},0.1)`;

                    return (
                        <div key={ev.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex items-center justify-between group hover:border-[#445566] transition-colors relative overflow-hidden">
                            {/* Decorative Gradient */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-2xl pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" style={{ background: ev.c }} />

                            <div className="flex items-center gap-4 relative z-10">
                                <div style={{ width: 56, height: 56, borderRadius: "50%", background: bgRgba, color: ev.c, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, flexShrink: 0 }}>
                                    {ev.n.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }} className="mb-1">
                                        {ev.n} {ev.dt.includes("Today") && <span className="ml-2 text-[10px] bg-[#FF4444] text-white px-2 py-0.5 rounded uppercase tracking-wider">Today</span>}
                                    </div>
                                    <div style={{ fontSize: 13, color: "#8899AA" }}>{ev.d}</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end relative z-10 text-right">
                                <div className="flex items-center gap-2 mb-1">
                                    <Icon size={14} color={ev.c} />
                                    <span style={{ fontSize: 14, fontWeight: 600, color: ev.c }}>{ev.r}</span>
                                </div>
                                <div style={{ fontSize: 12, color: "#8899AA" }}>{ev.dt}</div>
                                <Button variant="ghost" size="sm" className="h-8 px-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity border-[#1A2A3A] hover:border-[#00E5A0]">Send Wish</Button>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}
