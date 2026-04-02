"use client";
import React, { useState } from "react";
import { CheckCircle2, XCircle, Loader2, ArrowUp, Clock, Filter } from "lucide-react";

const PROMOTIONS = [
    { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", from: "Sales Executive", to: "Senior Sales Executive", manager: "Rajesh Kumar", managerApproval: "approved", hrApproval: "approved", status: "approved", date: "01 Apr 2025" },
    { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", from: "SWE-II", to: "Senior SWE", manager: "Priya Nair", managerApproval: "approved", hrApproval: "pending", status: "pending", date: "01 Apr 2025" },
    { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", from: "Marketing Manager", to: "Senior Manager", manager: "Suresh Rao", managerApproval: "pending", hrApproval: "not-start", status: "pending", date: "01 Apr 2025" },
];

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
    approved: { label: "Approved", color: "#00E5A0", bg: "rgba(0,229,160,0.1)" },
    "pending": { label: "Pending", color: "#FFB800", bg: "rgba(255,184,0,0.1)" },
    "not-start": { label: "Not Started", color: "#445566", bg: "rgba(68,85,102,0.1)" },
};

export default function PromotionApproval() {
    const [promos, setPromos] = useState(PROMOTIONS);
    const [approving, setApproving] = useState<{ id: number; action: string } | null>(null);
    const [done, setDone] = useState<number[]>([]);
    const [rejected, setRejected] = useState<number[]>([]);
    const [filter, setFilter] = useState("all");

    function decide(id: number, action: "approved" | "rejected") {
        setApproving({ id, action });
        setTimeout(() => {
            setApproving(null);
            if (action === "approved") setDone(p => [...p, id]);
            else setRejected(p => [...p, id]);
            setPromos(prev => prev.map(p => p.id === id ? { ...p, hrApproval: action } : p));
        }, 1600);
    }

    const filtered = promos.filter(p => {
        if (filter === "approved") return done.includes(p.id) || p.hrApproval === "approved";
        if (filter === "pending") return !done.includes(p.id) && !rejected.includes(p.id) && p.hrApproval === "pending";
        return true;
    });

    const approvedCount = done.length + promos.filter(p => p.hrApproval === "approved" && !done.includes(p.id)).length;
    const pendingCount = promos.filter(p => p.hrApproval === "pending" && !done.includes(p.id) && !rejected.includes(p.id)).length;

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Promotion Approvals</h1>
                    <p className="text-sm text-[#8899AA]">Senior HR / Leadership sign-off on promotions</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl">
                    <Clock size={14} className="text-[#FFB800]" />
                    <span className="text-sm font-bold text-[#FFB800]">{pendingCount} pending</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Total", value: promos.length, color: "#0066FF" },
                    { label: "Approved", value: approvedCount, color: "#00E5A0" },
                    { label: "Pending", value: pendingCount, color: "#FFB800" },
                ].map(s => (
                    <div key={s.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-xs text-[#8899AA]">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 mb-5">
                {["all", "pending", "approved"].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`h-9 px-3 text-xs capitalize rounded-xl transition-all ${filter === f ? "bg-[#0066FF] text-white" : "bg-[#1A2A3A] text-[#8899AA] hover:text-white"}`}>{f}</button>
                ))}
            </div>

            <div className="space-y-4">
                {filtered.map(promo => {
                    const isApproved = done.includes(promo.id) || promo.hrApproval === "approved";
                    const isRejected = rejected.includes(promo.id);
                    const approving_ = approving?.id === promo.id;

                    return (
                        <div key={promo.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-11 h-11 rounded-2xl bg-[#1A2A3A] flex items-center justify-center text-base font-bold text-[#8899AA] shrink-0">{promo.avatar}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <p className="font-bold text-white">{promo.name}</p>
                                        {isApproved && <CheckCircle2 size={15} className="text-[#00E5A0]" />}
                                        {isRejected && <XCircle size={15} className="text-[#FF4444]" />}
                                    </div>
                                    <p className="text-xs text-[#8899AA]">{promo.dept} · Manager: {promo.manager}</p>
                                    <div className="flex items-center gap-2 mt-1 text-xs">
                                        <span className="text-[#445566]">{promo.from}</span>
                                        <ArrowUp size={11} className="text-[#00E5A0] rotate-45" />
                                        <span className="text-[#00E5A0] font-semibold">{promo.to}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Approval chain */}
                            <div className="flex items-center justify-between mb-4 px-2">
                                {[
                                    { label: "Manager", status: promo.managerApproval },
                                    { label: "HR", status: isApproved ? "approved" : isRejected ? "rejected" : promo.hrApproval },
                                ].map((step, i) => {
                                    const cfg = STATUS_MAP[step.status] || STATUS_MAP["pending"];
                                    return (
                                        <React.Fragment key={step.label}>
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: cfg.bg, color: cfg.color }}>
                                                    {step.status === "approved" ? "✓" : step.label[0]}
                                                </div>
                                                <p className="text-[10px] text-[#445566]">{step.label}</p>
                                                <p className="text-[10px] font-medium" style={{ color: cfg.color }}>{cfg.label}</p>
                                            </div>
                                            {i === 0 && <div className="flex-1 h-0.5 mx-3 bg-[#1A2A3A]" />}
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            {promo.hrApproval === "pending" && !isApproved && !isRejected && (
                                <div className="flex gap-3">
                                    <button onClick={() => decide(promo.id, "rejected")} disabled={!!approving_}
                                        className="flex-1 h-10 bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30 text-sm font-semibold rounded-xl hover:bg-[#FF4444]/20 flex items-center justify-center gap-2">
                                        <XCircle size={15} /> Reject
                                    </button>
                                    <button onClick={() => decide(promo.id, "approved")} disabled={!!approving_}
                                        className="flex-1 h-10 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center justify-center gap-2">
                                        {approving_ && approving?.action === "approved" ? <><Loader2 size={14} className="animate-spin" /> Approving...</> : <><CheckCircle2 size={15} /> Approve</>}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
