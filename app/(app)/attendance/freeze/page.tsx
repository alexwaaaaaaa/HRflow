"use client";

import React, { useState } from "react";
import { Lock, AlertTriangle, CheckCircle2 } from "lucide-react";

const DEPT_STATUS = [
    { dept: "Engineering", status: "Ready", presentPct: 94.2, pending: 0, lop: 42 },
    { dept: "Sales", status: "Pending", presentPct: 88.4, pending: 3, lop: 28 },
    { dept: "Operations", status: "Ready", presentPct: 91.8, pending: 0, lop: 31 },
    { dept: "Marketing", status: "Ready", presentPct: 96.1, pending: 0, lop: 8 },
    { dept: "HR", status: "Ready", presentPct: 97.6, pending: 0, lop: 2 },
    { dept: "Finance", status: "Pending", presentPct: 95.2, pending: 1, lop: 4 },
];

export default function AttendanceFreeze() {
    const [locked, setLocked] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const anyPending = DEPT_STATUS.some(d => d.status === "Pending");

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <h2 className="text-2xl font-bold mb-1">Attendance Lock & Freeze</h2>
            <p className="text-sm text-[#8899AA] mb-6">Finalize attendance for payroll processing — November 2024</p>

            {/* STATUS */}
            <div className={`rounded-2xl p-6 mb-5 flex items-center gap-5 ${locked ? "bg-[#00E5A0]/10 border border-[#00E5A0]/30" : anyPending ? "bg-[#FFB800]/5 border border-[#FFB800]/30" : "bg-[#0066FF]/5 border border-[#0066FF]/20"}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${locked ? "bg-[#00E5A0]/20" : anyPending ? "bg-[#FFB800]/20" : "bg-[#0066FF]/20"}`}>
                    {locked ? <CheckCircle2 className="w-7 h-7 text-[#00E5A0]" /> : anyPending ? <AlertTriangle className="w-7 h-7 text-[#FFB800]" /> : <Lock className="w-7 h-7 text-[#0066FF]" />}
                </div>
                <div className="flex-1">
                    <p className="text-lg font-bold">{locked ? "✅ Attendance Locked for November 2024" : anyPending ? "⚠️ Cannot Lock — Pending Issues" : "Ready to Lock"}</p>
                    <p className="text-sm text-[#8899AA]">
                        {locked ? "Payroll team has been notified. Attendance data is now read-only."
                            : anyPending ? `${DEPT_STATUS.filter(d => d.status === "Pending").length} departments have pending regularizations.`
                                : "All departments are clear. Proceed to lock attendance."}
                    </p>
                </div>
            </div>

            {/* CHECKLIST */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-5">
                <h3 className="font-semibold mb-4">Pre-lock Checklist</h3>
                <div className="space-y-2">
                    {[
                        { label: "All regularizations resolved", ok: !DEPT_STATUS.some(d => d.status === "Pending") },
                        { label: "Overtime hours approved", ok: true },
                        { label: "WFH requests approved", ok: true },
                        { label: "Anomalies reviewed", ok: true },
                        { label: "Leave sync confirmed", ok: true },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                            {item.ok
                                ? <CheckCircle2 className="w-4 h-4 text-[#00E5A0] shrink-0" />
                                : <AlertTriangle className="w-4 h-4 text-[#FFB800] shrink-0" />}
                            <span className={item.ok ? "text-[#00E5A0]" : "text-[#FFB800]"}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* DEPT TABLE */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden mb-5">
                <div className="px-5 py-4 border-b border-[#1A2A3A]">
                    <h3 className="font-semibold">Department-wise Freeze Status</h3>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                        <tr>
                            <th className="px-5 py-3 text-left">Department</th>
                            <th className="px-5 py-3 text-center">Avg Present %</th>
                            <th className="px-5 py-3 text-center">LOP Days</th>
                            <th className="px-5 py-3 text-center">Pending Requests</th>
                            <th className="px-5 py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {DEPT_STATUS.map((d, i) => (
                            <tr key={i} className={`hover:bg-[#1A2A3A]/50 transition-colors ${d.status === "Pending" ? "bg-[#FFB800]/5" : ""}`}>
                                <td className="px-5 py-3 font-medium">{d.dept}</td>
                                <td className="px-5 py-3 text-center">{d.presentPct}%</td>
                                <td className="px-5 py-3 text-center text-[#FF4444]">{d.lop}</td>
                                <td className="px-5 py-3 text-center">{d.pending > 0 ? <span className="text-[#FFB800]">⚠️ {d.pending} pending</span> : <span className="text-[#00E5A0]">✅ Clear</span>}</td>
                                <td className="px-5 py-3 text-center">
                                    {d.status === "Ready" ? <span className="text-[#00E5A0] text-xs">✅ Ready</span> : <span className="text-[#FFB800] text-xs">⏳ Pending</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CONFIRM */}
            {!locked && (
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <label className="flex items-start gap-3 cursor-pointer mb-4">
                        <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#00E5A0]" />
                        <span className="text-sm text-[#8899AA]">I confirm I want to lock attendance for November 2024. This will make attendance data <strong className="text-white">read-only</strong> and trigger payroll processing. This action cannot be undone.</span>
                    </label>
                    <button
                        disabled={!confirmed || anyPending}
                        onClick={() => { if (confirmed) setLocked(true); }}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-colors ${confirmed && !anyPending ? "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]" : "bg-[#1A2A3A] text-[#445566] cursor-not-allowed"}`}>
                        <Lock className="w-4 h-4" /> Lock Attendance — November 2024
                    </button>
                    {anyPending && <p className="text-xs text-[#FFB800] mt-2">⚠️ Resolve all pending issues before locking.</p>}
                </div>
            )}

            {locked && (
                <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded-2xl p-6 text-center">
                    <CheckCircle2 className="w-10 h-10 text-[#00E5A0] mx-auto mb-2" />
                    <p className="font-bold text-lg">Locked Successfully!</p>
                    <p className="text-sm text-[#8899AA]">Payroll team notified. Data is now read-only.</p>
                </div>
            )}
        </div>
    );
}
