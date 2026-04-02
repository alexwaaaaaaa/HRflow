"use client";

import { Filter, UserPlus, CheckCircle, FileText, Calendar, Upload } from "lucide-react";

export default function RecentActivity() {
    const activities = [
        {
            date: "Today", items: [
                { i: UserPlus, t: "New Hire", d: "Priya Mehta added Rahul Sharma (Engineering)", time: "10:30 AM", user: "PM", uc: "#00E5A0" },
                { i: CheckCircle, t: "Payroll", d: "November 2024 attendance data locked", time: "09:15 AM", user: "RD", uc: "#0066FF" },
                { i: FileText, t: "Document", d: "New policy 'WFH Guidelines 2025' published", time: "08:00 AM", user: "System", uc: "#8899AA" }
            ]
        },
        {
            date: "Yesterday, 11 Nov", items: [
                { i: Calendar, t: "Leave Approval", d: "Approved 3 days casual leave for Amit Kumar", time: "04:45 PM", user: "PM", uc: "#00E5A0" },
                { i: Upload, t: "Data Import", d: "Bulk imported 12 employee records via CSV", time: "02:20 PM", user: "AM", uc: "#FFB800" },
                { i: UserPlus, t: "Transfer", d: "Sneha Rao transferred from Sales to Marketing", time: "11:30 AM", user: "RD", uc: "#0066FF" }
            ]
        },
        {
            date: "10 Nov 2024", items: [
                { i: FileText, t: "Statutory", d: "Generated PF Challan for October 2024", time: "10:00 AM", user: "System", uc: "#8899AA" },
                { i: CheckCircle, t: "Approval", d: "Travel request for Marketing offsite approved", time: "09:30 AM", user: "PM", uc: "#00E5A0" }
            ]
        }
    ];

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in max-w-4xl">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Activity Feed</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Audit trail of all administrative actions in the system</p>
                </div>
                <div className="flex gap-4">
                    <button className="h-10 px-4 rounded-lg bg-[#0A1420] border border-[#1A2A3A] flex items-center gap-2 text-sm text-[#FFFFFF] hover:bg-[#1A2A3A] transition-colors">
                        <Filter size={16} color="#8899AA" /> Filter: Last 7 days
                    </button>
                </div>
            </div>

            {/* Feed Stream */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 relative">
                <div className="absolute left-[59px] top-12 bottom-12 w-px bg-[#1A2A3A]" />

                {activities.map((group, grpIdx) => (
                    <div key={grpIdx} className="mb-10 last:mb-0">
                        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#8899AA", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>{group.date}</h3>

                        <div className="flex flex-col gap-6">
                            {group.items.map((act, actIdx) => {
                                const Icon = act.i;
                                return (
                                    <div key={actIdx} className="flex items-start gap-6 relative z-10 group">
                                        {/* Timeline Node */}
                                        <div className="w-8 h-8 rounded-full bg-[#060B14] border-2 border-[#1A2A3A] flex items-center justify-center flex-shrink-0 group-hover:border-[#00E5A0] transition-colors mt-1">
                                            <Icon size={14} color="#8899AA" className="group-hover:text-[#00E5A0] transition-colors" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-xl group-hover:border-[#445566] transition-colors flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{act.t}</span>
                                                    <span style={{ fontSize: 12, color: "#8899AA" }}>• {act.time}</span>
                                                </div>
                                                <div style={{ fontSize: 14, color: "#8899AA" }}>{act.d}</div>
                                            </div>

                                            {/* User Avatar */}
                                            <div className="flex flex-col items-center justify-center pt-1" title={`Action by ${act.user}`}>
                                                <div style={{
                                                    width: 28, height: 28, borderRadius: "50%", background: `rgba(${act.uc === "#00E5A0" ? "0,229,160" : act.uc === "#0066FF" ? "0,102,255" : act.uc === "#FFB800" ? "255,184,0" : "136,153,170"},0.1)`,
                                                    color: act.uc, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700
                                                }}>
                                                    {act.user}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}

                <div className="mt-8 flex justify-center relative z-10">
                    <button className="px-6 py-2 rounded-full bg-[#0A1420] border border-[#1A2A3A] text-sm text-[#00E5A0] font-medium hover:bg-[#1A2A3A] transition-colors">
                        Load Older Activities
                    </button>
                </div>
            </div>

        </div>
    );
}
