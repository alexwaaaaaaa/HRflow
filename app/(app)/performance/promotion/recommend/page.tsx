"use client";
import React, { useState } from "react";
import { TrendingUp, Star, CheckCircle2, XCircle, Loader2, ArrowUp } from "lucide-react";

const RECOMMENDATIONS = [
    { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", from: "Sales Executive", to: "Senior Sales Executive", reason: "Consistent top performance, 2 years in role, 4.7 rating", managerApproval: "approved", hrApproval: "pending" },
    { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", from: "SWE-II", to: "Senior SWE", reason: "Led 3 major product releases, excellent peer feedback", managerApproval: "approved", hrApproval: "pending" },
    { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", from: "Marketing Manager", to: "Senior Manager", reason: "Grew team by 4x, launched 2 successful campaigns", managerApproval: "pending", hrApproval: "not-started" },
];

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
    approved: { label: "Approved", color: "#00E5A0", bg: "rgba(0,229,160,0.1)" },
    pending: { label: "Pending", color: "#FFB800", bg: "rgba(255,184,0,0.1)" },
    rejected: { label: "Rejected", color: "#FF4444", bg: "rgba(255,68,68,0.1)" },
    "not-started": { label: "Not Started", color: "#445566", bg: "rgba(68,85,102,0.1)" },
};

export default function PromotionRecommendation() {
    const [recs, setRecs] = useState(RECOMMENDATIONS);
    const [approving, setApproving] = useState<number | null>(null);
    const [hrDone, setHrDone] = useState<number[]>([]);
    const [rejected, setRejected] = useState<number[]>([]);

    function hrApprove(id: number, action: "approved" | "rejected") {
        setApproving(id);
        setTimeout(() => {
            setApproving(null);
            setRecs(prev => prev.map(r => r.id === id ? { ...r, hrApproval: action } : r));
            if (action === "approved") setHrDone(p => [...p, id]);
            else setRejected(p => [...p, id]);
        }, 1500);
    }

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-1">Promotion Recommendations</h1>
                <p className="text-sm text-[#8899AA]">Manager-initiated promotion recommendations · FY 2024–25</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Recommendations", value: recs.length, color: "#0066FF" },
                    { label: "Approved", value: hrDone.length + recs.filter(r => r.hrApproval === "approved" && !hrDone.includes(r.id)).length, color: "#00E5A0" },
                    { label: "Pending HR Review", value: recs.filter(r => r.hrApproval === "pending").length, color: "#FFB800" },
                ].map(s => (
                    <div key={s.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-xs text-[#8899AA] mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-5">
                {recs.map(rec => {
                    const mgr = STATUS_MAP[rec.managerApproval];
                    const hr = STATUS_MAP[rec.hrApproval];
                    const hrActed = hrDone.includes(rec.id) || rejected.includes(rec.id);
                    const currentHrStatus = hrDone.includes(rec.id) ? "approved" : rejected.includes(rec.id) ? "rejected" : rec.hrApproval;

                    return (
                        <div key={rec.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            {/* Employee */}
                            <div className="flex items-start gap-4 mb-5">
                                <div className="w-12 h-12 rounded-2xl bg-[#1A2A3A] flex items-center justify-center text-base font-bold text-[#8899AA]">{rec.avatar}</div>
                                <div className="flex-1">
                                    <p className="font-bold text-white text-base">{rec.name}</p>
                                    <p className="text-xs text-[#8899AA]">{rec.dept}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-[#445566]">{rec.from}</span>
                                        <ArrowUp size={12} className="text-[#00E5A0] rotate-45" />
                                        <span className="text-xs font-semibold text-[#00E5A0]">{rec.to}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="bg-[#0A1420] rounded-xl p-3 mb-4">
                                <p className="text-xs text-[#8899AA] mb-0.5">Manager's Recommendation</p>
                                <p className="text-sm text-white">{rec.reason}</p>
                            </div>

                            {/* Approval chain */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: mgr.bg }}>
                                        {rec.managerApproval === "approved" ? <CheckCircle2 size={14} style={{ color: mgr.color }} /> : <span className="text-[10px] font-bold" style={{ color: mgr.color }}>?</span>}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#445566]">Manager</p>
                                        <p className="text-xs font-medium" style={{ color: mgr.color }}>{mgr.label}</p>
                                    </div>
                                </div>
                                <div className="flex-1 h-0.5 bg-[#1A2A3A]" />
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: STATUS_MAP[currentHrStatus]?.bg || hr.bg }}>
                                        <span className="text-[10px] font-bold" style={{ color: STATUS_MAP[currentHrStatus]?.color || hr.color }}>HR</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#445566]">HR</p>
                                        <p className="text-xs font-medium" style={{ color: STATUS_MAP[currentHrStatus]?.color || hr.color }}>{STATUS_MAP[currentHrStatus]?.label || hr.label}</p>
                                    </div>
                                </div>
                            </div>

                            {/* HR actions */}
                            {rec.hrApproval === "pending" && !hrActed && rec.managerApproval === "approved" && (
                                <div className="flex gap-3">
                                    <button onClick={() => hrApprove(rec.id, "rejected")} disabled={approving === rec.id}
                                        className="flex-1 h-10 bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30 text-sm font-semibold rounded-xl hover:bg-[#FF4444]/20 flex items-center justify-center gap-2">
                                        <XCircle size={15} /> Reject
                                    </button>
                                    <button onClick={() => hrApprove(rec.id, "approved")} disabled={approving === rec.id}
                                        className="flex-1 h-10 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center justify-center gap-2">
                                        {approving === rec.id ? <><Loader2 size={14} className="animate-spin" /> Approving...</> : <><CheckCircle2 size={15} /> Approve Promotion</>}
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
