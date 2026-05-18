"use client";

import { useState } from "react";
import { Check, X, Search, Filter, Plane, Clock, ShieldAlert, Monitor, Banknote, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";

const pending = [
    { id: 1, e: "Sneha Rao", role: "Mktg Spec.", type: "Leave", ticon: Calendar, c: "#0066FF", dt: "20-22 Nov (3d)", desc: "Sick Leave (Medical cert attached)" },
    { id: 2, e: "Rahul Sharma", role: "Eng L1", type: "Expense", ticon: Banknote, c: "#FFB800", dt: "₹4,500", desc: "Team Lunch - Nov Q4 Planning" },
    { id: 3, e: "Arjun Desai", role: "Eng L3", type: "WFH", ticon: Monitor, c: "#00E5A0", dt: "14 Nov (1d)", desc: "Plumbing repairs at home" },
    { id: 4, e: "Kavya Reddy", role: "UI/UX", type: "Overtime", ticon: Clock, c: "#8899AA", dt: "4 hrs", desc: "Weekend push for v2.0 release" }
];

export default function ManagerApprovals() {
    const [_selected, _setSelected] = useState<number[]>([]);

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative min-h-[calc(100vh-64px)]">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Team Approvals</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Review requests from your direct reportees</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="secondary" className="gap-2"><Clock size={16} /> Approval History</Button>
                </div>
            </div>

            <div className="flex gap-8">

                {/* Left Col - Pending List */}
                <div style={{ width: "65%", flexShrink: 0 }}>

                    <div className="flex justify-between items-center mb-6">
                        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF" }}>Pending Review (12)</h2>
                        <div className="flex gap-2">
                            <button className="p-2 border border-[#1A2A3A] rounded-lg bg-[#0A1420] text-[#8899AA] hover:text-white transition-colors" title="Filter"><Filter size={16} /></button>
                            <div className="relative w-48">
                                <Search size={16} color="#8899AA" className="absolute left-3 top-1/2 -translate-y-1/2" />
                                <input type="text" placeholder="Search..." className="w-full h-[34px] bg-[#0A1420] border border-[#1A2A3A] rounded-lg pl-9 pr-3 text-sm text-white focus:border-[#00E5A0] outline-none transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {pending.map(req => {
                            const Icon = req.ticon;
                            return (
                                <div key={req.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#445566] transition-colors flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[rgba(0,229,160,0.1)] text-[#00E5A0] flex items-center justify-center font-bold text-lg flex-shrink-0">{req.e.charAt(0)}</div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>{req.e}</span>
                                                <span style={{ fontSize: 12, color: "#445566" }}>• {req.role}</span>
                                            </div>
                                            <span className="text-xs text-[#8899AA]">Requested yesterday</span>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-xl bg-[#060B14] border border-[#1A2A3A]">
                                            <div className="w-8 h-8 rounded-full border border-[#1A2A3A] flex items-center justify-center flex-shrink-0" style={{ color: req.c, background: `rgba(${req.c === "#0066FF" ? "0,102,255" : req.c === "#FFB800" ? "255,184,0" : req.c === "#00E5A0" ? "0,229,160" : "136,153,170"},0.1)` }}>
                                                <Icon size={14} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span style={{ fontSize: 13, fontWeight: 700, color: req.c, textTransform: "uppercase", letterSpacing: 0.5 }}>{req.type}</span>
                                                    <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{req.dt}</span>
                                                </div>
                                                <p style={{ fontSize: 14, color: "#8899AA", margin: 0 }}>{req.desc}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 w-32 border-l border-[#1A2A3A] pl-4 justify-center">
                                        <Button size="sm" className="w-full gap-1 p-0 shadow-sm"><Check size={16} /> Approve</Button>
                                        <Button variant="secondary" size="sm" className="w-full gap-1 p-0 text-[#FF4444] border-transparent hover:border-[#FF4444] hover:bg-[rgba(255,68,68,0.1)]"><X size={16} /> Reject</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-6 text-center">
                        <Button variant="ghost">Load 8 more pending requests</Button>
                    </div>

                </div>

                {/* Right Col - Team Insights */}
                <div style={{ flex: 1, minWidth: 0 }}>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 sticky top-24">
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 20 }}>Team Insights (Next 7 days)</h3>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded bg-[rgba(255,184,0,0.1)] text-[#FFB800] flex items-center justify-center flex-shrink-0 mt-0.5"><Plane size={16} /></div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>2 members on leave</div>
                                    <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>Amit Kumar (15-16 Nov)<br />Pooja Nair (18 Nov)</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded bg-[rgba(0,229,160,0.1)] text-[#00E5A0] flex items-center justify-center flex-shrink-0 mt-0.5"><ShieldAlert size={16} /></div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Coverage looks good</div>
                                    <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>Minimum 85% capacity maintained across all skills.</div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-[#1A2A3A] my-6" />

                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Pending Actions</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-[#060B14] p-3 rounded-lg border border-[#1A2A3A]">
                                <span style={{ fontSize: 13, color: "#8899AA" }}>Regularization</span>
                                <span className="w-6 h-6 rounded bg-[#1A2A3A] text-white flex items-center justify-center text-xs font-bold">4</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#060B14] p-3 rounded-lg border border-[#1A2A3A]">
                                <span style={{ fontSize: 13, color: "#8899AA" }}>Leave</span>
                                <span className="w-6 h-6 rounded bg-[#1A2A3A] text-white flex items-center justify-center text-xs font-bold">5</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#060B14] p-3 rounded-lg border border-[#1A2A3A]">
                                <span style={{ fontSize: 13, color: "#8899AA" }}>Expense</span>
                                <span className="w-6 h-6 rounded bg-[rgba(255,184,0,0.2)] text-[#FFB800] flex items-center justify-center text-xs font-bold">3</span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
