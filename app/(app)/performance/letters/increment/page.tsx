"use client";
import React, { useState } from "react";
import { Download, Send, BarChart3, TrendingUp, Loader2, CheckCircle2, Search } from "lucide-react";

const EMPLOYEES = [
    { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", role: "Sales Exec", ctcOld: "₹12.2L", increment: 18, ctcNew: "₹14.4L", status: "draft" },
    { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", role: "SWE", ctcOld: "₹14.1L", increment: 12, ctcNew: "₹15.8L", status: "sent" },
    { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", role: "Mktg Lead", ctcOld: "₹15.4L", increment: 14, ctcNew: "₹17.6L", status: "draft" },
    { id: 4, name: "Deepak Mehta", avatar: "DM", dept: "Finance", role: "Finance Analyst", ctcOld: "₹10.4L", increment: 8, ctcNew: "₹11.2L", status: "draft" },
];

const LETTER_BODY = (emp: typeof EMPLOYEES[0]) => `
Dear ${emp.name},

We are pleased to communicate your revised compensation effective 01 April 2025.

Previous CTC:   ${emp.ctcOld} per annum
Increment (%):  ${emp.increment}%
Revised CTC:    ${emp.ctcNew} per annum

This revision reflects our appreciation of your outstanding performance in FY 2024–25.

Please sign and return the acknowledgement copy.

HR Department
HRFlow India Pvt. Ltd.
`;

export default function IncrementLetter() {
    const [selected, setSelected] = useState<typeof EMPLOYEES[0] | null>(null);
    const [sending, setSending] = useState<number | null>(null);
    const [sent, setSent] = useState<number[]>([]);

    function sendLetter(id: number) {
        setSending(id);
        setTimeout(() => { setSending(null); setSent(p => [...p, id]); }, 1800);
    }

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Increment Letters</h1>
                    <p className="text-sm text-[#8899AA]">CTC revision letters · Effective 01 April 2025</p>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl flex items-center gap-2 hover:bg-[#243040] transition-colors"><Download size={14} /> Bulk Export</button>
                    <button onClick={() => EMPLOYEES.filter(e => e.status === "draft" && !sent.includes(e.id)).forEach(e => sendLetter(e.id))}
                        className="h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-[#00c98d] transition-colors">
                        <Send size={14} /> Send All
                    </button>
                </div>
            </div>

            {/* Average increment banner */}
            <div className="bg-gradient-to-r from-[#0066FF]/10 to-[#00E5A0]/10 border border-[#0066FF]/20 rounded-2xl p-5 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <TrendingUp size={24} className="text-[#00E5A0]" />
                    <div>
                        <p className="text-lg font-bold text-white">Avg Increment: 13%</p>
                        <p className="text-xs text-[#8899AA]">vs 9% national average · FY 2024–25</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-white">₹38.2L</p>
                    <p className="text-xs text-[#445566]">Total CTC impact across cohort</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-3">
                    {EMPLOYEES.map(emp => {
                        const isSent = sent.includes(emp.id) || emp.status === "sent";
                        return (
                            <div key={emp.id} onClick={() => setSelected(emp === selected ? null : emp)}
                                className={`bg-[#0D1928] border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:border-[#2A3A4A] ${selected?.id === emp.id ? "border-[#0066FF]/50" : "border-[#1A2A3A]"}`}>
                                <div className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{emp.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-white text-sm">{emp.name}</p>
                                    <p className="text-[11px] text-[#8899AA]">{emp.ctcOld} → <span className="text-[#00E5A0] font-semibold">{emp.ctcNew}</span> · ↑{emp.increment}%</p>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${isSent ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "bg-[#FFB800]/10 text-[#FFB800]"}`}>{isSent ? "Sent" : "Draft"}</span>
                                {!isSent && (
                                    <button onClick={(e) => { e.stopPropagation(); sendLetter(emp.id); }}
                                        disabled={sending === emp.id}
                                        className="h-8 px-3 bg-[#0066FF] text-white text-xs rounded-lg flex items-center gap-1 hover:bg-[#0052cc] transition-colors">
                                        {sending === emp.id ? <Loader2 size={11} className="animate-spin" /> : <Send size={11} />} Send
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="w-full lg:w-[380px] shrink-0">
                    {selected ? (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold">Letter Preview</h3>
                                <button className="h-8 px-3 bg-[#1A2A3A] text-xs rounded-lg flex items-center gap-1.5"><Download size={11} /> PDF</button>
                            </div>
                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-5 text-[11px] text-[#8899AA] leading-relaxed whitespace-pre-line font-mono">{LETTER_BODY(selected)}</div>
                        </div>
                    ) : (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 text-center h-64 flex flex-col items-center justify-center">
                            <BarChart3 size={36} className="text-[#445566] mx-auto mb-3" />
                            <p className="text-sm text-[#8899AA]">Click an employee to preview their increment letter</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
