"use client";

import React, { useState } from "react";
import { ChevronLeft, Upload, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

const PREV_REQUESTS = [
    { date: "11 Nov", type: "Missing punch-out", status: "Pending", manager: "Kavya Reddy", submitted: "12/11", statusColor: "#FFB800" },
    { date: "22 Oct", type: "Missing punch-in", status: "Approved", manager: "Kavya Reddy", submitted: "23/10", statusColor: "#00E5A0" },
    { date: "15 Sep", type: "Both punches", status: "Rejected", manager: "Kavya Reddy", submitted: "16/09", statusColor: "#FF4444" },
];

export default function RegularizationRequest() {
    const [regType, setRegType] = useState("punch-in");
    const [submitted, setSubmitted] = useState(false);
    const [reason, setReason] = useState("");

    const REG_TYPES = [
        { val: "punch-in", label: "Missing Punch-in (forgot to check in)" },
        { val: "punch-out", label: "Missing Punch-out (forgot to check out)" },
        { val: "both", label: "Both (missing in and out)" },
        { val: "incorrect", label: "Incorrect punch time" },
        { val: "full-day", label: "Worked from office (marked absent — full day)" },
    ];

    if (submitted) {
        return (
            <div className="p-6 md:p-8 max-w-[720px] mx-auto text-white">
                <div className="bg-[#0D1928] border border-[#00E5A0]/30 rounded-2xl p-10 text-center">
                    <CheckCircle2 className="w-14 h-14 text-[#00E5A0] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
                    <p className="text-[#8899AA] mb-6">Kavya Reddy will review within 24 hours.</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => setSubmitted(false)} className="px-5 py-2 bg-[#1A2A3A] rounded-xl text-sm hover:bg-[#2A3A4A]">Submit Another</button>
                        <Link href="/attendance" className="px-5 py-2 bg-[#00E5A0] text-[#060B14] font-semibold rounded-xl text-sm hover:bg-[#00c98d]">Back to Attendance</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-[720px] mx-auto text-white">
            <Link href="/attendance" className="flex items-center gap-1 text-sm text-[#8899AA] hover:text-white mb-5 w-fit">
                <ChevronLeft className="w-4 h-4" /> Attendance → My Attendance → Regularize
            </Link>

            <h2 className="text-2xl font-bold mb-1">Attendance Regularization Request</h2>
            <p className="text-sm text-[#8899AA] mb-6">Request correction for missed/wrong punch records</p>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-6">
                {/* Employee */}
                <div>
                    <label className="block text-sm font-medium text-[#8899AA] mb-2">Employee</label>
                    <div className="flex items-center gap-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA]">RS</div>
                        <div>
                            <p className="text-sm font-medium">Rahul Sharma</p>
                            <p className="text-xs text-[#8899AA]">EMP-0848 • Engineering</p>
                        </div>
                    </div>
                </div>

                {/* Date + Shift */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#8899AA] mb-2">Date of Regularization *</label>
                        <input type="date" defaultValue="2024-11-08"
                            className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        <p className="text-xs text-[#8899AA] mt-1">November 8, 2024 (Friday)</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#8899AA] mb-2">Shift</label>
                        <input readOnly value="General Shift (9:00 AM – 6:00 PM)"
                            className="w-full bg-[#060B14]/50 border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-[#8899AA] cursor-not-allowed" />
                    </div>
                </div>

                {/* Type */}
                <div>
                    <label className="block text-sm font-medium text-[#8899AA] mb-3">Type of Regularization *</label>
                    <div className="space-y-2">
                        {REG_TYPES.map(t => (
                            <label key={t.val} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${regType === t.val ? "border-[#00E5A0] bg-[#00E5A0]/5" : "border-[#1A2A3A] hover:border-[#2A3A4A]"}`}>
                                <input type="radio" name="regType" value={t.val} checked={regType === t.val} onChange={() => setRegType(t.val)} className="accent-[#00E5A0]" />
                                <span className="text-sm">{t.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Conditional fields */}
                <div className="space-y-4 overflow-hidden transition-all">
                    {(regType === "punch-in" || regType === "both" || regType === "full-day") && (
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Actual Punch-in Time *</label>
                            <input type="time" defaultValue="09:00"
                                className="bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                    )}
                    {(regType === "punch-out" || regType === "both") && (
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Actual Punch-out Time *</label>
                            <input type="time" defaultValue="18:00"
                                className="bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                    )}
                    {regType === "incorrect" && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Recorded Time (System)</label>
                                <input readOnly value="07:45 AM"
                                    className="w-full bg-[#060B14]/50 border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-[#8899AA] cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Correct Time *</label>
                                <input type="time" defaultValue="09:00"
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Reason */}
                <div>
                    <label className="block text-sm font-medium text-[#8899AA] mb-2">Reason / Remarks *</label>
                    <textarea rows={4} value={reason} onChange={e => setReason(e.target.value)} maxLength={500}
                        placeholder="I was present in office but the biometric machine failed to record my attendance..."
                        className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none" />
                    <p className="text-xs text-[#445566] text-right mt-1">{reason.length}/500</p>
                </div>

                {/* Approver */}
                <div className="flex justify-between items-center bg-[#060B14] border border-[#1A2A3A] rounded-xl px-5 py-3">
                    <div className="flex items-center gap-2 text-sm text-[#8899AA]">
                        <Clock className="w-4 h-4" />Approving Manager:
                    </div>
                    <span className="font-medium">Kavya Reddy</span>
                </div>

                {/* Upload */}
                <div className="border border-dashed border-[#1A2A3A] rounded-xl p-5 text-center hover:border-[#00E5A0]/50 transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-[#445566] mx-auto mb-2" />
                    <p className="text-sm text-[#8899AA]">Supporting Evidence (optional)</p>
                    <p className="text-xs text-[#445566]">Email screenshots, office access logs. Drag or click to attach</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <button onClick={() => setSubmitted(true)}
                        className="w-full py-3 bg-[#00E5A0] text-[#060B14] font-bold rounded-xl hover:bg-[#00c98d] transition-colors">
                        Submit Request
                    </button>
                    <div className="flex gap-3">
                        <button className="flex-1 py-2.5 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Save Draft</button>
                        <Link href="/attendance" className="flex-1 py-2.5 text-sm text-[#8899AA] rounded-xl hover:text-white text-center hover:bg-[#1A2A3A]">Cancel</Link>
                    </div>
                </div>
            </div>

            {/* Previous requests */}
            <div className="mt-6 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Your Recent Requests (3)</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-[#8899AA] text-xs">
                            <tr>
                                <th className="text-left py-2">Date</th>
                                <th className="text-left py-2">Type</th>
                                <th className="text-left py-2">Status</th>
                                <th className="text-left py-2">Manager</th>
                                <th className="text-left py-2">Submitted</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {PREV_REQUESTS.map((req, i) => (
                                <tr key={i}>
                                    <td className="py-3">{req.date}</td>
                                    <td className="py-3 text-[#8899AA]">{req.type}</td>
                                    <td className="py-3"><span className="font-medium" style={{ color: req.statusColor }}>{req.status}</span></td>
                                    <td className="py-3 text-[#8899AA]">{req.manager}</td>
                                    <td className="py-3 text-[#8899AA]">{req.submitted}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
