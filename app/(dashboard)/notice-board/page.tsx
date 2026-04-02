"use client";

import { useState } from "react";
import { Plus, Search, Filter, Megaphone, Edit, Trash2, Eye, User, Clock } from "lucide-react";
import Button from "@/components/ui/Button";

const notices = [
    { id: 1, title: "Diwali Bonus Disbursement", type: "Announcement", st: "Published", aud: "All Employees", dt: "28 Oct 2024", v: 842, a: "Priya Mehta" },
    { id: 2, title: "New Leave Policy 2025", type: "Policy Update", st: "Published", aud: "All Employees", dt: "05 Nov 2024", v: 756, a: "HR Team" },
    { id: 3, title: "Office Maintenance - 4th Floor", type: "Alert", st: "Scheduled", aud: "Mumbai Office", dt: "15 Nov 2024", v: 0, a: "Admin" },
    { id: 4, title: "Quarterly Townhall Q3", type: "Event", st: "Draft", aud: "All Employees", dt: "20 Nov 2024", v: 0, a: "Rohan Desai" },
    { id: 5, title: "Engineering Offsite Dec 2024", type: "Event", st: "Published", aud: "Engineering Dept", dt: "10 Nov 2024", v: 298, a: "Amit Kumar" }
];

export default function AdminNoticeBoard() {
    const [activeTab, setActiveTab] = useState("All Messages");

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative min-h-[calc(100vh-64px)]">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Notice Board Admin</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Manage company-wide announcements, alerts, and policies</p>
                </div>
                <Button className="gap-2 shadow-[0_0_15px_rgba(0,229,160,0.3)]"><Plus size={16} /> Create Notice</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[rgba(0,229,160,0.1)] text-[#00E5A0] flex items-center justify-center"><Megaphone size={20} /></div>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>124</div>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>Total Published</div>
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[rgba(255,184,0,0.1)] text-[#FFB800] flex items-center justify-center"><Clock size={20} /></div>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>8</div>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>Scheduled / Drafts</div>
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[rgba(0,102,255,0.1)] text-[#0066FF] flex items-center justify-center"><Eye size={20} /></div>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>86%</div>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>Avg Read Rate</div>
                    </div>
                </div>
                <div className="bg-[rgba(0,229,160,0.05)] border border-[#00E5A0] rounded-2xl p-5 relative overflow-hidden group cursor-pointer hover:bg-[rgba(0,229,160,0.1)] transition-colors">
                    <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-20"><Megaphone size={100} color="#00E5A0" /></div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#00E5A0", marginBottom: 4, position: "relative", zIndex: 10 }}>Send Emergency Alert</div>
                    <div style={{ fontSize: 13, color: "#8899AA", position: "relative", zIndex: 10 }}>SMS, Email, App Push</div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2 p-1 bg-[#0A1420] border border-[#1A2A3A] rounded-lg">
                    {["All Messages", "Published", "Scheduled", "Drafts"].map((t) => (
                        <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === t ? "bg-[#1A2A3A] text-white shadow-sm" : "text-[#8899AA] hover:text-white"}`}>
                            {t}
                        </button>
                    ))}
                </div>
                <div className="flex gap-4">
                    <div className="relative w-64">
                        <Search size={16} color="#8899AA" className="absolute left-4 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="Search notices..." className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg pl-10 pr-4 text-sm text-white focus:border-[#00E5A0] outline-none transition-colors" />
                    </div>
                    <Button variant="secondary" className="gap-2 h-10 px-4"><Filter size={16} /> Filters</Button>
                </div>
            </div>

            {/* List */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase">Notice Title</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase">Target Audience</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase">Date Info</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase text-right">Reach</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {notices.map(n => (
                            <tr key={n.id} className="hover:bg-[#1A2A3A] transition-colors group">
                                <td className="px-6 py-4 w-1/3">
                                    <div className="flex items-center gap-3">
                                        <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }} className="group-hover:text-[#00E5A0] transition-colors">{n.title}</div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-[#1A2A3A] text-[#8899AA]">{n.type}</span>
                                        <span className="text-xs text-[#445566] flex items-center gap-1"><User size={12} /> By {n.a}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase
                      ${n.st === "Published" ? "bg-[rgba(0,229,160,0.1)] text-[#00E5A0] border border-[rgba(0,229,160,0.2)]" :
                                            n.st === "Scheduled" ? "bg-[rgba(0,102,255,0.1)] text-[#0066FF] border border-[rgba(0,102,255,0.2)]" :
                                                "bg-[rgba(255,184,0,0.1)] text-[#FFB800] border border-[rgba(255,184,0,0.2)]"}`}>{n.st}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#FFFFFF]">{n.aud}</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-[#FFFFFF]">{n.dt}</div>
                                    <div className="text-xs text-[#8899AA] mt-1">{n.st === "Scheduled" ? "Publish Date" : "Created On"}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {n.st === "Published" ? (
                                        <div>
                                            <div className="text-sm font-bold text-[#00E5A0] flex items-center justify-end gap-1"><Eye size={14} /> {n.v}</div>
                                            <div className="text-xs text-[#8899AA] mt-1">Unique views</div>
                                        </div>
                                    ) : <span className="text-sm text-[#445566]">-</span>}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="w-8 h-8 rounded border border-[#1A2A3A] flex items-center justify-center text-[#8899AA] hover:text-white hover:border-[#445566] transition-colors" title="View"><Eye size={14} /></button>
                                        <button className="w-8 h-8 rounded border border-[#1A2A3A] flex items-center justify-center text-[#8899AA] hover:text-[#0066FF] hover:border-[#0066FF] transition-colors" title="Edit"><Edit size={14} /></button>
                                        <button className="w-8 h-8 rounded border border-[#1A2A3A] flex items-center justify-center text-[#8899AA] hover:text-[#FF4444] hover:border-[#FF4444] transition-colors" title="Delete"><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
