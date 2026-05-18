"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { CheckCircle2, XOctagon, Paperclip, ChevronRight } from "lucide-react";
import Link from "next/link";

const REQUESTS = [
    { id: 1, name: "Rahul Sharma", emp: "EMP-0848", dept: "Engineering", avatar: "RS", date: "08 November 2024 (Friday)", type: "Missing Punch-in", time: "09:00 AM", loc: "Mumbai Office", reason: "Biometric machine at Gate 2 was not working that morning. IT maintenance log attached.", attach: "IT_maintenance_08Nov.pdf", context: "28/30 present | 2 LOP | 0 prev. reg.", ctxGood: true, days: 2 },
    { id: 2, name: "Pooja Iyer", emp: "EMP-0456", dept: "Finance", avatar: "PI", date: "07 November 2024 (Thursday)", type: "Both Punches", time: "08:50 AM – 08:45 PM", loc: "Mumbai Office", reason: "Was working OT for the quarter-end accounts closing. Forgot to punch both in and out.", attach: null, context: "30/30 present | 0 LOP | 0 prev. reg.", ctxGood: true, days: 1 },
    { id: 3, name: "Vikram Singh", emp: "EMP-0567", dept: "Sales", avatar: "VS", date: "05 November 2024 (Tuesday)", type: "Wrong Location", time: "11:00 AM", loc: "Client Office", reason: "Was at XYZ Corp client site all day. Biometric location recorded incorrectly.", attach: "client_visit_email.pdf", context: "22/30 present | 5 LOP | 3 prev. reg.", ctxGood: false, days: 3 },
    { id: 4, name: "Sneha Rao", emp: "EMP-0145", dept: "Marketing", avatar: "SR", date: "05 November 2024 (Tuesday)", type: "Missing Punch-out", time: "07:30 PM", loc: "Pune HQ", reason: "Was attending a webinar after hours and forgot to mark checkout.", attach: null, context: "27/30 present | 1 LOP | 1 prev. reg.", ctxGood: true, days: 1 },
    { id: 5, name: "Amit Kumar", emp: "EMP-0723", dept: "Operations", avatar: "AK", date: "03 November 2024 (Sunday)", type: "Full Day (was in office)", time: "—", loc: "Mumbai Office", reason: "Was present in office on Sunday for a special project delivery. No Sunday marking policy.", attach: "manager_approval.pdf", context: "25/30 present | 4 LOP | 0 prev. reg.", ctxGood: true, days: 2 },
];

export default function RegularizeApprove() {
    const [activeTab, setActiveTab] = useState("Pending");
    const [cards, setCards] = useState(REQUESTS);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [rejectModal, setRejectModal] = useState<number | null>(null);
    const [rejectReason, setRejectReason] = useState("");

    const TABS = ["All", "Pending", "Approved", "Rejected"];

    const handleApprove = (id: number) => {
        setCards(c => c.filter(r => r.id !== id));
        setSelectedIds(s => s.filter(i => i !== id));
    };

    const handleReject = (id: number) => {
        setRejectModal(null);
        setCards(c => c.filter(r => r.id !== id));
    };

    const toggleSelect = (id: number) => {
        setSelectedIds(s => s.includes(id) ? s.filter(i => i !== id) : [...s, id]);
    };

    return (
        <Page
            title="Regularization Approvals"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Regularize", href: "/attendance/regularize" }, { label: "Approve" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        Regularization Approvals
                        <span className="bg-[#FFB800]/20 text-[#FFB800] text-sm px-2.5 py-0.5 rounded-full">{cards.length} pending</span>
                    </h2>
                </div>
                <div className="flex gap-3">
                    <select className="bg-[#0D1928] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 focus:outline-none">
                        <option>All Departments</option><option>Engineering</option><option>Sales</option>
                    </select>
                    <button onClick={() => { setCards([]); setSelectedIds([]); }}
                        className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-lg hover:bg-[#00c98d]">
                        Approve All
                    </button>
                </div>
            </div>

            {/* TABS */}
            <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1 w-fit mb-6">
                {TABS.map(t => (
                    <button key={t} onClick={() => setActiveTab(t)}
                        className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${activeTab === t ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>
                        {t} {t === "Pending" && `(${cards.length})`}{t === "Approved" && `(156)`}{t === "Rejected" && `(12)`}
                    </button>
                ))}
            </div>

            {/* CARDS */}
            <div className="space-y-4">
                {cards.map(req => (
                    <div key={req.id} className={`bg-[#0D1928] border rounded-2xl p-6 ${selectedIds.includes(req.id) ? "border-[#00E5A0]/50" : "border-[#1A2A3A]"}`}>
                        {/* TOP ROW */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={selectedIds.includes(req.id)} onChange={() => toggleSelect(req.id)}
                                    className="w-4 h-4 accent-[#00E5A0] rounded" />
                                <div className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA]">{req.avatar}</div>
                                <div>
                                    <span className="font-semibold">{req.name}</span>
                                    <span className="text-xs text-[#8899AA] ml-2">{req.emp} • {req.dept}</span>
                                </div>
                            </div>
                            <span className="text-xs bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 px-2.5 py-1 rounded-full">
                                ⏳ Pending {req.days} days
                            </span>
                        </div>

                        {/* DETAILS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <p className="text-xs text-[#445566] mb-0.5">📅 Date</p>
                                <p className="text-sm font-medium">{req.date}</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#445566] mb-0.5">🕐 Type</p>
                                <p className="text-sm font-medium">{req.type}</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#445566] mb-0.5">⏰ Requested Time</p>
                                <p className="text-sm font-medium">{req.time}</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#445566] mb-0.5">📍 Location</p>
                                <p className="text-sm font-medium">{req.loc}</p>
                            </div>
                        </div>

                        {/* REASON */}
                        <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 mb-3">
                            <p className="text-sm text-[#8899AA] italic">{req.reason}</p>
                            {req.attach && (
                                <div className="flex items-center gap-2 mt-2 text-xs text-[#0066FF]">
                                    <Paperclip className="w-3.5 h-3.5" />
                                    <span className="hover:underline cursor-pointer">{req.attach}</span>
                                </div>
                            )}
                        </div>

                        {/* CONTEXT */}
                        <div className={`text-xs px-3 py-1.5 rounded-lg mb-4 ${req.ctxGood ? "bg-[#00E5A0]/5 text-[#00E5A0]" : "bg-[#FFB800]/5 text-[#FFB800]"}`}>
                            {req.ctxGood ? "✅" : "⚠️"} Last 30 days: {req.context}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-3">
                            <button onClick={() => handleApprove(req.id)}
                                className="px-4 py-2 bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 text-sm font-semibold rounded-xl hover:bg-[#00E5A0]/20 flex items-center gap-1.5 transition-colors">
                                <CheckCircle2 className="w-4 h-4" /> Approve
                            </button>
                            <button onClick={() => setRejectModal(req.id)}
                                className="px-4 py-2 bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30 text-sm font-semibold rounded-xl hover:bg-[#FF4444]/20 flex items-center gap-1.5 transition-colors">
                                <XOctagon className="w-4 h-4" /> Reject
                            </button>
                            <button className="px-4 py-2 bg-transparent border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">
                                Add Comment
                            </button>
                            <Link href={`/attendance/employee/${req.id}/log`} className="text-sm text-[#0066FF] flex items-center gap-1 hover:underline ml-auto">
                                View Full Attendance <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                ))}

                {cards.length === 0 && (
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-16 text-center">
                        <CheckCircle2 className="w-12 h-12 text-[#00E5A0] mx-auto mb-3 opacity-60" />
                        <p className="text-[#8899AA]">All regularizations have been reviewed.</p>
                    </div>
                )}
            </div>

            {/* BULK BAR */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl">
                    <span className="text-sm text-[#8899AA]">{selectedIds.length} selected</span>
                    <button onClick={() => { selectedIds.forEach(handleApprove); }}
                        className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d]">
                        Approve All Selected
                    </button>
                    <button className="px-4 py-2 border border-[#FF4444] text-[#FF4444] text-sm font-semibold rounded-xl hover:bg-[#FF4444]/10">
                        Reject All
                    </button>
                </div>
            )}

            {/* REJECT MODAL */}
            {rejectModal !== null && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Rejection Reason</h3>
                        <textarea rows={4} value={rejectReason} onChange={e => setRejectReason(e.target.value)}
                            placeholder="Provide reason for rejection..."
                            className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FF4444] resize-none mb-4" />
                        <div className="flex gap-3">
                            <button onClick={() => setRejectModal(null)}
                                className="flex-1 py-2.5 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Cancel</button>
                            <button onClick={() => handleReject(rejectModal)}
                                className="flex-1 py-2.5 bg-[#FF4444] text-white text-sm font-bold rounded-xl hover:bg-[#d93333]">Confirm Reject</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    
        </Page>
        );
}
