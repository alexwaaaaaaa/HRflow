"use client";

import { useState } from "react";
import { ChevronRight, Filter, Search, Check, X } from "lucide-react";
import Button from "@/components/ui/Button";

const tabs = ["All (23)", "Leave (14)", "Overtime (6)", "Regularization (2)", "WFH (1)"];

export default function PendingApprovals() {
    const [activeTab, setActiveTab] = useState(0);
    const [selected, setSelected] = useState<number[]>([]);

    const approvals = [
        {
            id: 1, name: "Amit Kumar", dept: "Engineering",
            type: "Leave", color: "#0066FF",
            desc: "3 days Casual Leave: 15 Nov – 17 Nov 2024",
            applied: "12/11/2024", pending: "2 days",
            bal: "CL Balance: 8/12 days remaining after approval"
        },
        {
            id: 2, name: "Sneha Rao", dept: "Marketing", tag: "Manager",
            type: "Regularization", color: "#FFB800",
            desc: "Missed punch out on 08/11/2024 (Requested: 18:30)",
            applied: "10/11/2024", pending: "4 days",
            bal: ""
        },
        {
            id: 3, name: "Vikram Singh", dept: "Sales",
            type: "Overtime", color: "#00E5A0",
            desc: "4 hrs Overtime on weekend (10/11/2024)",
            applied: "11/11/2024", pending: "3 days",
            bal: "Total OT this month: 12 hrs"
        },
        {
            id: 4, name: "Pooja Nair", dept: "HR",
            type: "WFH", color: "#8899AA",
            desc: "1 day Work From Home (13/11/2024)",
            applied: "12/11/2024", pending: "2 days",
            bal: "WFH quota: 2/4 used this month"
        },
        {
            id: 5, name: "Ravi Sharma", dept: "Engineering",
            type: "Comp-off", color: "#FF4444",
            desc: "1 day Comp-off against work on 09/11/2024",
            applied: "10/11/2024", pending: "4 days",
            bal: "Comp-off balance: 2 days"
        }
    ];

    const handleSelect = (id: number) => {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const handleSelectAll = () => {
        if (selected.length === approvals.length) setSelected([]);
        else setSelected(approvals.map(a => a.id));
    };

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 100 }} className="animate-fade-in relative min-h-[calc(100vh-64px)]">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-sm">
                        <span style={{ color: "#8899AA" }}>Dashboard</span>
                        <ChevronRight size={14} color="#445566" />
                        <span style={{ color: "#FFFFFF" }}>Pending Approvals</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Pending Approvals</h1>
                        <div style={{ padding: "4px 12px", background: "rgba(255,184,0,0.1)", color: "#FFB800", borderRadius: 20, fontSize: 14, fontWeight: 700 }}>(23)</div>
                    </div>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Review and action all pending requests</p>
                </div>
                <Button disabled={selected.length === 0} className={selected.length ? "shadow-[0_0_15px_rgba(0,229,160,0.3)] bg-[#00E5A0]" : "opacity-50"}>
                    Approve {selected.length > 0 ? selected.length : "All"} Selected
                </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-[#1A2A3A] mb-4">
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

            {/* Filter Bar */}
            <div className="flex gap-4 mb-6">
                <select className="h-10 px-4 rounded-lg bg-[#0A1420] border border-[#1A2A3A] text-sm text-[#FFFFFF] focus:border-[#00E5A0] outline-none w-48 appearance-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238899AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Sales</option>
                </select>
                <select className="h-10 px-4 rounded-lg bg-[#0A1420] border border-[#1A2A3A] text-sm text-[#FFFFFF] focus:border-[#00E5A0] outline-none w-40 appearance-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238899AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                    <option>This Week</option>
                    <option>This Month</option>
                </select>
                <div className="relative flex-1 max-w-sm">
                    <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                    <input type="text" placeholder="Search employee..." className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg pl-9 pr-4 text-sm text-white focus:border-[#00E5A0] outline-none transition-colors" />
                </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3">
                {/* Select All Row */}
                <div className="flex items-center gap-4 px-6 py-2">
                    <button onClick={handleSelectAll} className={`w-5 h-5 rounded border ${selected.length === approvals.length ? "bg-[#00E5A0] border-[#00E5A0]" : "border-[#445566] hover:border-[#8899AA]"} flex flex-shrink-0 items-center justify-center transition-colors`}>
                        {selected.length === approvals.length && <Check size={14} color="#060B14" />}
                    </button>
                    <span style={{ fontSize: 13, color: "#8899AA" }}>Select All</span>
                </div>

                {approvals.map((app) => (
                    <div key={app.id}
                        className={`flex gap-6 rounded-2xl p-5 border transition-all ${selected.includes(app.id) ? "border-[#00E5A0] bg-[rgba(0,229,160,0.05)]" : "border-[#1A2A3A] bg-[#0D1928] hover:border-[#445566]"}`}>

                        <div className="flex items-start pt-1">
                            <button onClick={() => handleSelect(app.id)} className={`w-5 h-5 rounded border ${selected.includes(app.id) ? "bg-[#00E5A0] border-[#00E5A0]" : "border-[#445566] bg-[#0A1420] hover:border-[#8899AA]"} flex flex-shrink-0 items-center justify-center transition-colors`}>
                                {selected.includes(app.id) && <Check size={14} color="#060B14" />}
                            </button>
                        </div>

                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(0,102,255,0.1)", color: "#0066FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, flexShrink: 0 }}>
                            {app.name.charAt(0)}
                        </div>

                        <div className="flex-1 flex flex-col justify-center min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                                <span style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>{app.name}</span>
                                <span style={{ padding: "2px 8px", background: "#1A2A3A", borderRadius: 4, fontSize: 11, color: "#8899AA" }}>{app.dept}</span>
                                {app.tag && <span style={{ padding: "2px 8px", background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.3)", borderRadius: 4, fontSize: 11, color: "#00E5A0" }}>{app.tag}</span>}
                            </div>

                            <div className="flex items-center gap-3 mt-1 mb-1">
                                <span style={{
                                    background: `rgba(${app.type === "Leave" ? "0,102,255" : app.type === "Regularization" ? "255,184,0" : app.type === "Overtime" ? "0,229,160" : "255,68,68"},0.1)`,
                                    color: app.color, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600
                                }}>
                                    {app.type}
                                </span>
                                <span style={{ fontSize: 14, color: "#8899AA" }}>{app.desc}</span>
                            </div>

                            <div style={{ fontSize: 12, color: "#445566", marginTop: 4 }}>Applied: {app.applied} &nbsp;•&nbsp; Pending for {app.pending}</div>

                            {app.bal && <div style={{ fontSize: 12, color: "#8899AA", marginTop: 8, padding: "6px 10px", background: "#0A1420", borderRadius: 6, display: "inline-block" }}>{app.bal}</div>}
                        </div>

                        <div className="flex flex-col items-end justify-center w-36 gap-2">
                            <Button size="sm" className="w-full h-9 shadow-sm">Approve</Button>
                            <Button variant="ghost" size="sm" className="w-full h-9 text-[#FF4444] border hover:bg-[rgba(255,68,68,0.1)] hover:border-[#FF4444]">Reject</Button>
                            <a href="/employees" style={{ fontSize: 12, color: "#0066FF", marginTop: 4 }} className="hover:underline">View Profile →</a>
                        </div>

                    </div>
                ))}

                <div className="text-center mt-6">
                    <Button variant="ghost">Load More</Button>
                </div>
            </div>

            {/* Bulk Action Bar - Fixed Bottom */}
            <div className={`fixed bottom-0 left-60 right-0 bg-[#0A1420] border-t border-[#1A2A3A] px-8 py-4 flex items-center justify-between transition-transform duration-300 z-50 ${selected.length > 0 ? "translate-y-0" : "translate-y-full"}`}>
                <div className="flex items-center gap-4">
                    <div style={{ padding: "6px 12px", background: "rgba(0,229,160,0.1)", color: "#00E5A0", borderRadius: 8, fontSize: 14, fontWeight: 600 }}>
                        {selected.length} Selected
                    </div>
                    <span style={{ fontSize: 14, color: "#8899AA" }}>Ready for bulk action</span>
                </div>
                <div className="flex gap-4">
                    <Button variant="secondary" className="text-white bg-[#1A2A3A] hover:bg-[#445566] border border-[#445566] h-10 px-6 gap-2" onClick={() => setSelected([])}>
                        <X size={16} /> Cancel
                    </Button>
                    <Button className="bg-[#FF4444] text-white hover:bg-[#cc3333] h-10 px-6">Reject Selected</Button>
                    <Button className="h-10 px-6 shadow-[0_0_15px_rgba(0,229,160,0.3)]">Approve Selected</Button>
                </div>
            </div>

        </div>
    );
}
