"use client";

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ComplianceCalendar() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Generating a simple calendar grid for Nov 2024
    const startOffset = 4; // Nov 1 is Friday
    const dates = Array.from({ length: 30 }).map((_, i) => i + 1);
    const paddingBefore = Array.from({ length: startOffset });

    const deadlines = [
        { d: 15, m: "Nov", t: "PF Challan", type: "overdue", bg: "#FF4444" },
        { d: 15, m: "Nov", t: "ESI Challan", type: "overdue", bg: "#FF4444" },
        { d: 30, m: "Nov", t: "PT Maharashtra", type: "warning", bg: "#FFB800" },
        { d: 7, m: "Dec", t: "TDS Challan (Oct)", type: "upcoming", bg: "#00E5A0" },
        { d: 25, m: "Apr", t: "PF Annual Return", type: "info", bg: "#0066FF" },
        { d: 31, m: "Jan", t: "24Q Filing", type: "info", bg: "#0066FF" }
    ];

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Compliance Calendar</h1>
                        <CalendarIcon size={28} color="#00E5A0" />
                    </div>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Track all statutory filing deadlines in one place</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost">Export Calendar</Button>
                    <Button>Add Custom Deadline</Button>
                </div>
            </div>

            <div className="flex gap-8">

                {/* LEFT - Calendar */}
                <div style={{ width: 760, flexShrink: 0 }}>
                    <div className="flex justify-between items-center mb-6">
                        <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-[#1A2A3A] text-white transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF" }}>November 2024</h2>
                        <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-[#1A2A3A] text-white transition-colors">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {/* Days header */}
                        {days.map(d => (
                            <div key={d} style={{ fontSize: 12, color: "#8899AA", textAlign: "center", marginBottom: 8, fontWeight: 500 }}>{d}</div>
                        ))}

                        {/* Calendar grid */}
                        {paddingBefore.map((_, i) => <div key={`empty-${i}`} className="h-24 bg-[rgba(13,25,40,0.3)] rounded-lg pointer-events-none" />)}

                        {dates.map((date) => {
                            const isToday = date === 12;
                            const hasItems = deadlines.filter(dl => dl.d === date && dl.m === "Nov");

                            return (
                                <div key={date} className={`h-24 p-2 rounded-lg border cursor-pointer transition-colors flex flex-col items-center
                  ${isToday ? "bg-[rgba(0,229,160,0.1)] border-[#00E5A0] hover:bg-[rgba(0,229,160,0.15)]" : "bg-[#0D1928] border-[#1A2A3A] hover:border-[#445566]"}`}>

                                    <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm ${isToday ? "bg-[#00E5A0] text-[#060B14] font-bold" : (date < 12 ? "text-[#445566]" : "text-[#FFFFFF]")}`}>
                                        {date}
                                    </div>

                                    {hasItems.length > 0 && (
                                        <div className="flex gap-1 mt-2">
                                            {hasItems.map((hi, i) => (
                                                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: hi.bg, cursor: "help" }} title={hi.t} className={hi.bg === "#FF4444" ? "animate-pulse" : ""} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ marginTop: 24, padding: "16px", background: "rgba(10,20,32,0.5)", borderRadius: 12, border: "1px solid #1A2A3A" }} className="flex justify-between items-center cursor-pointer hover:bg-[#1A2A3A] transition-colors">
                        <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>View full year schedule →</span>
                    </div>
                </div>

                {/* RIGHT - Deadlines List */}
                <div style={{ flex: 1, minWidth: 0 }} className="flex flex-col gap-6">
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>This Month (November)</h3>

                    {/* Overdue */}
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#FF4444", textTransform: "uppercase", marginBottom: 12, letterSpacing: 1 }}>Overdue ({deadlines.filter(dl => dl.type === "overdue").length})</div>
                        <div className="flex flex-col gap-3">
                            {deadlines.filter(dl => dl.type === "overdue").map((dl, i) => (
                                <div key={i} className="bg-[rgba(255,68,68,0.05)] border border-[rgba(255,68,68,0.3)] rounded-xl p-4 flex flex-col gap-4 relative overflow-hidden group">
                                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#FF4444" }} className="animate-pulse" />
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>{dl.t}</div>
                                        <div style={{ fontSize: 13, color: "#FF4444", marginTop: 4 }}>Due {dl.d} {dl.m} • 2 days overdue</div>
                                    </div>
                                    <Button className="w-full bg-[#FF4444] text-white hover:bg-[#cc3333] shadow-none h-9">File Now →</Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Due This Week/Month */}
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#FFB800", textTransform: "uppercase", marginBottom: 12, letterSpacing: 1 }}>Due Soon</div>
                        <div className="flex flex-col gap-3">
                            {deadlines.filter(dl => dl.type === "warning").map((dl, i) => (
                                <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex flex-col gap-4 relative">
                                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#FFB800", borderRadius: "8px 0 0 8px" }} />
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>{dl.t}</div>
                                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Due {dl.d} {dl.m} • 18 days left</div>
                                    </div>
                                    <Button variant="secondary" className="w-full h-9">Prepare →</Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming */}
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#00E5A0", textTransform: "uppercase", marginBottom: 12, letterSpacing: 1, marginTop: 12 }}>Upcoming</div>
                        <div className="flex flex-col gap-3">
                            {deadlines.filter(dl => dl.type === "upcoming" || dl.type === "info").map((dl, i) => (
                                <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex justify-between items-center group relative cursor-pointer hover:border-[#445566]">
                                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: dl.bg, borderRadius: "8px 0 0 8px" }} />
                                    <div className="ml-2">
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{dl.t}</div>
                                        <div style={{ fontSize: 12, color: "#8899AA", marginTop: 2 }}>Due {dl.d} {dl.m}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}
