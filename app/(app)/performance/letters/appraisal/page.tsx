"use client";
import React, { useState } from "react";
import { Download, Send, Eye, Search, Filter, CheckCircle2, Loader2 } from "lucide-react";

const EMPLOYEES = [
    { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", role: "Sales Executive", rating: 4.7, band: "Exceptional", increment: "18%", effectiveDate: "01 Apr 2025", status: "draft" },
    { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", role: "Software Engineer", rating: 4.1, band: "Exceeds Exp.", increment: "12%", effectiveDate: "01 Apr 2025", status: "sent" },
    { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", role: "Marketing Lead", rating: 4.4, band: "Exceeds Exp.", increment: "14%", effectiveDate: "01 Apr 2025", status: "draft" },
    { id: 4, name: "Deepak Mehta", avatar: "DM", dept: "Finance", role: "Finance Analyst", rating: 3.5, band: "Meets Exp.", increment: "8%", effectiveDate: "01 Apr 2025", status: "sent" },
];

const LETTER_TEMPLATE = (emp: typeof EMPLOYEES[0]) => `
Dear ${emp.name},

We are pleased to share your performance appraisal for FY 2024–25.

Your final performance rating: ${emp.rating.toFixed(1)} / 5.0 (${emp.band})

Based on your exceptional contributions, your revised CTC will reflect an increment of ${emp.increment}, effective ${emp.effectiveDate}.

Your dedication, commitment, and contributions have been integral to the team's success this year. 
We look forward to your continued growth and success at HRFlow.

Warm Regards,
HR Department
HRFlow India Pvt. Ltd.
`;

export default function AppraisalLetter() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selected, setSelected] = useState<typeof EMPLOYEES[0] | null>(null);
    const [sending, setSending] = useState<number | null>(null);
    const [sent, setSent] = useState<number[]>([]);

    function sendLetter(id: number) {
        setSending(id);
        setTimeout(() => { setSending(null); setSent(p => [...p, id]); }, 1800);
    }

    const filtered = EMPLOYEES.filter(e =>
        (statusFilter === "all" || (statusFilter === "sent" && (sent.includes(e.id) || e.status === "sent")) || (statusFilter === "draft" && !sent.includes(e.id) && e.status === "draft")) &&
        e.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Appraisal Letters</h1>
                    <p className="text-sm text-[#8899AA]">Generate and send performance appraisal letters · FY 2024–25</p>
                </div>
                <button className="h-10 px-4 bg-[#0066FF] text-white text-sm font-semibold rounded-xl hover:bg-[#0052cc] flex items-center gap-2 transition-colors">
                    <Send size={14} /> Send All Pending
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Total Letters", value: EMPLOYEES.length, color: "#0066FF" },
                    { label: "Sent", value: sent.length + EMPLOYEES.filter(e => e.status === "sent").length, color: "#00E5A0" },
                    { label: "Pending", value: EMPLOYEES.filter(e => e.status === "draft" && !sent.includes(e.id)).length, color: "#FFB800" },
                ].map(s => (
                    <div key={s.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-xs text-[#8899AA]">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* List */}
                <div className="flex-1">
                    <div className="flex gap-3 mb-4">
                        <div className="relative flex-1">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                                className="w-full h-9 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        {["all", "draft", "sent"].map(f => (
                            <button key={f} onClick={() => setStatusFilter(f)}
                                className={`h-9 px-3 text-xs capitalize rounded-xl transition-all ${statusFilter === f ? "bg-[#0066FF] text-white" : "bg-[#1A2A3A] text-[#8899AA]"}`}>
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-3">
                        {filtered.map(emp => {
                            const isSent = sent.includes(emp.id) || emp.status === "sent";
                            return (
                                <div key={emp.id} className={`bg-[#0D1928] border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:border-[#2A3A4A] ${selected?.id === emp.id ? "border-[#0066FF]/50" : "border-[#1A2A3A]"}`}
                                    onClick={() => setSelected(emp === selected ? null : emp)}>
                                    <div className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{emp.avatar}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white text-sm">{emp.name}</p>
                                        <p className="text-[11px] text-[#8899AA]">{emp.role} · ⭐ {emp.rating} · ↑{emp.increment}</p>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${isSent ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "bg-[#FFB800]/10 text-[#FFB800]"}`}>
                                        {isSent ? "Sent" : "Draft"}
                                    </span>
                                    <div className="flex gap-1.5 shrink-0">
                                        <button onClick={(e) => { e.stopPropagation(); setSelected(emp); }}
                                            className="w-8 h-8 bg-[#1A2A3A] rounded-lg flex items-center justify-center hover:bg-[#243040] transition-colors">
                                            <Eye size={13} className="text-[#8899AA]" />
                                        </button>
                                        {!isSent && (
                                            <button onClick={(e) => { e.stopPropagation(); sendLetter(emp.id); }}
                                                disabled={sending === emp.id}
                                                className="h-8 px-3 bg-[#0066FF] text-white text-xs rounded-lg flex items-center gap-1 hover:bg-[#0052cc] transition-colors">
                                                {sending === emp.id ? <Loader2 size={11} className="animate-spin" /> : <Send size={11} />} Send
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Preview */}
                <div className="w-full lg:w-[380px] shrink-0">
                    {selected ? (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold">Letter Preview</h3>
                                <button className="h-8 px-3 bg-[#1A2A3A] text-xs rounded-lg flex items-center gap-1.5 hover:bg-[#243040] transition-colors">
                                    <Download size={11} /> PDF
                                </button>
                            </div>
                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-5 text-[12px] text-[#8899AA] leading-relaxed whitespace-pre-line font-mono">
                                {LETTER_TEMPLATE(selected)}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 text-center h-64 flex flex-col items-center justify-center">
                            <Eye size={36} className="text-[#445566] mx-auto mb-3" />
                            <p className="text-sm text-[#8899AA]">Click an employee to preview their letter</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
