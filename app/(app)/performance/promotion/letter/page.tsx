"use client";
import React, { useState } from "react";
import { ArrowUp, Download, Loader2, CheckCircle2 } from "lucide-react";

const PROMOTIONS = [
    { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", from: "Sales Executive", to: "Senior Sales Executive", effectiveDate: "01 Apr 2025", status: "approved" },
    { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", from: "SWE-II", to: "Senior SWE", effectiveDate: "01 Apr 2025", status: "approved" },
];

const PROMOTION_LETTER = (p: typeof PROMOTIONS[0]) => `
Dear ${p.name},

We are delighted to inform you of your promotion, effective ${p.effectiveDate}.

Previous Title: ${p.from}
New Title:      ${p.to}
Department:     ${p.dept}

This promotion recognises your consistent high performance, leadership, and contributions to the team's success.

Your revised compensation package will be shared separately via the Increment Letter.

Congratulations and best wishes for continued success!

HR Department
HRFlow India Pvt. Ltd.
`;

export default function PromotionLetter() {
    const [selected, setSelected] = useState<typeof PROMOTIONS[0] | null>(null);
    const [sending, setSending] = useState<number | null>(null);
    const [sent, setSent] = useState<number[]>([]);

    function sendLetter(id: number) {
        setSending(id);
        setTimeout(() => { setSending(null); setSent(p => [...p, id]); }, 1500);
    }

    return (
        <div className="p-6 md:p-8 max-w-[1100px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Promotion Letters</h1>
                    <p className="text-sm text-[#8899AA]">Issue formal promotion letters to eligible employees</p>
                </div>
                <button className="h-10 px-4 bg-[#1A2A3A] text-sm rounded-xl flex items-center gap-2 hover:bg-[#243040] transition-colors"><Download size={14} /> Bulk Export</button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-3">
                    {PROMOTIONS.map(p => {
                        const isSent = sent.includes(p.id);
                        return (
                            <div key={p.id} onClick={() => setSelected(p === selected ? null : p)}
                                className={`bg-[#0D1928] border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:border-[#2A3A4A] ${selected?.id === p.id ? "border-[#00E5A0]/50" : "border-[#1A2A3A]"}`}>
                                <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[11px] font-bold text-[#8899AA] shrink-0">{p.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white text-sm">{p.name}</p>
                                    <div className="flex items-center gap-1.5 text-[11px] text-[#8899AA]">
                                        <span>{p.from}</span>
                                        <ArrowUp size={11} className="text-[#00E5A0] rotate-45" />
                                        <span className="text-[#00E5A0] font-medium">{p.to}</span>
                                    </div>
                                    <p className="text-[10px] text-[#445566]">Effective {p.effectiveDate}</p>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${isSent ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "bg-[#FFB800]/10 text-[#FFB800]"}`}>{isSent ? "Sent" : "Draft"}</span>
                                {!isSent && (
                                    <button onClick={(e) => { e.stopPropagation(); sendLetter(p.id); }}
                                        disabled={sending === p.id}
                                        className="h-8 px-3 bg-[#00E5A0] text-[#060B14] text-xs font-bold rounded-lg flex items-center gap-1 shrink-0">
                                        {sending === p.id ? <Loader2 size={11} className="animate-spin" /> : "Send"}
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
                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-5 text-[11px] text-[#8899AA] leading-relaxed whitespace-pre-line font-mono">{PROMOTION_LETTER(selected)}</div>
                        </div>
                    ) : (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 text-center h-64 flex flex-col items-center justify-center">
                            <ArrowUp size={36} className="text-[#445566] mx-auto mb-3" />
                            <p className="text-sm text-[#8899AA]">Select an employee to preview their promotion letter</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
