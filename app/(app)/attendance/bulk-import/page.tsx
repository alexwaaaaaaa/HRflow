"use client";

import React, { useState } from "react";
import { Upload, CheckCircle2, Download } from "lucide-react";

export default function BulkImport() {
    const [step, setStep] = useState(1);
    const [type, setType] = useState("daily");
    const [applied, setApplied] = useState(false);

    const PREVIEW_ROWS = [
        { emp: "EMP-0848", name: "Rahul Sharma", date: "12 Nov", status: "Present", inTime: "09:02 AM", outTime: "06:10 PM", issueType: null },
        { emp: "EMP-0567", name: "Vikram Singh", date: "12 Nov", status: "Late", inTime: "10:45 AM", outTime: "07:00 PM", issueType: "Late by 1h 45m" },
        { emp: "EMP-0091", name: "Priya Mehta", date: "12 Nov", status: "WFH", inTime: "09:10 AM", outTime: "06:00 PM", issueType: null },
        { emp: "EMP-0312", name: "Ananya Patel", date: "12 Nov", status: "Absent", inTime: "—", outTime: "—", issueType: "Missing data" },
        { emp: "EMP-0901", name: "Kavya Reddy", date: "12 Nov", status: "Present", inTime: "09:00 AM", outTime: "06:30 PM", issueType: null },
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <h2 className="text-2xl font-bold mb-1">Bulk Attendance Import</h2>
            <p className="text-sm text-[#8899AA] mb-6">Import attendance data from external sources or biometric exports</p>

            {!applied && (
                <>
                    {/* Step indicator */}
                    <div className="flex items-center gap-4 mb-6">
                        {["Select Type", "Upload", "Preview", "Import"].map((s, i) => (
                            <React.Fragment key={i}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? "bg-[#00E5A0] text-[#060B14]" : step === i + 1 ? "bg-[#00E5A0] text-[#060B14]" : "bg-[#1A2A3A] text-[#445566]"}`}>
                                        {step > i + 1 ? "✓" : i + 1}
                                    </div>
                                    <span className={`text-sm ${step === i + 1 ? "text-white" : "text-[#445566]"}`}>{s}</span>
                                </div>
                                {i < 3 && <div className={`flex-1 h-0.5 ${step > i + 1 ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`} />}
                            </React.Fragment>
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-5">
                            <h3 className="font-semibold">Select Import Type</h3>
                            <div className="space-y-3">
                                {[
                                    { val: "daily", label: "📅 Daily Attendance", sub: "Import from biometric device for a specific date" },
                                    { val: "monthly", label: "📆 Monthly Summary", sub: "Import full month data (attendance + OT)" },
                                    { val: "biometric_raw", label: "🖐 Biometric Raw Logs", sub: "ZKTeco / eSSL punch logs (raw export)" },
                                    { val: "payroll_input", label: "💰 Payroll-ready Format", sub: "Pre-calculated LOP, OT data for payroll stage 2" },
                                ].map(t => (
                                    <label key={t.val} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${type === t.val ? "border-[#00E5A0] bg-[#00E5A0]/5" : "border-[#1A2A3A] hover:border-[#2A3A4A]"}`}>
                                        <input type="radio" name="importType" value={t.val} checked={type === t.val} onChange={() => setType(t.val)} className="accent-[#00E5A0]" />
                                        <div>
                                            <p className="text-sm font-medium">{t.label}</p>
                                            <p className="text-xs text-[#445566]">{t.sub}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <button className="text-sm text-[#0066FF] hover:underline flex items-center gap-1"><Download className="w-3.5 h-3.5" />Download Template</button>
                                <button onClick={() => setStep(2)} className="px-5 py-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-xl hover:bg-[#00c98d]">Next →</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-5">
                            <h3 className="font-semibold">Upload File</h3>
                            <div className="border-2 border-dashed border-[#1A2A3A] rounded-xl p-16 text-center hover:border-[#00E5A0]/50 cursor-pointer" onClick={() => setStep(3)}>
                                <Upload className="w-10 h-10 text-[#445566] mx-auto mb-3" />
                                <p className="text-sm text-[#8899AA]">Drag & drop your Excel / CSV file</p>
                                <p className="text-xs text-[#445566] mt-1">Supports .xlsx, .csv — click to browse</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} className="px-5 py-2 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Back</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                            <div className="px-5 py-4 border-b border-[#1A2A3A] flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">Preview — 847 Records</h3>
                                    <p className="text-xs text-[#8899AA]">✅ 839 valid | ⚠️ 6 warnings | ❌ 2 errors</p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setStep(2)} className="px-4 py-2 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Back</button>
                                    <button onClick={() => setApplied(true)} className="px-4 py-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-xl hover:bg-[#00c98d]">Import All →</button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Employee</th>
                                            <th className="px-4 py-3 text-center">Date</th>
                                            <th className="px-4 py-3 text-center">Status</th>
                                            <th className="px-4 py-3 text-center">In</th>
                                            <th className="px-4 py-3 text-center">Out</th>
                                            <th className="px-4 py-3 text-left">Issue</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A]">
                                        {PREVIEW_ROWS.map((r, i) => (
                                            <tr key={i} className={`hover:bg-[#1A2A3A]/50 transition-colors ${r.issueType && r.status === "Absent" ? "bg-[#FF4444]/5" : r.issueType ? "bg-[#FFB800]/5" : ""}`}>
                                                <td className="px-4 py-3">
                                                    <p className="font-medium">{r.name}</p>
                                                    <p className="text-xs text-[#445566]">{r.emp}</p>
                                                </td>
                                                <td className="px-4 py-3 text-center text-[#8899AA]">{r.date}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === "Present" ? "bg-[#00E5A0]/10 text-[#00E5A0]" : r.status === "WFH" ? "bg-[#0066FF]/10 text-[#0066FF]" : r.status === "Late" ? "bg-[#FFB800]/10 text-[#FFB800]" : "bg-[#FF4444]/10 text-[#FF4444]"}`}>{r.status}</span>
                                                </td>
                                                <td className="px-4 py-3 text-center text-[#00E5A0] text-xs">{r.inTime}</td>
                                                <td className="px-4 py-3 text-center text-[#8899AA] text-xs">{r.outTime}</td>
                                                <td className="px-4 py-3 text-[#FFB800] text-xs">{r.issueType || "—"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}

            {applied && (
                <div className="bg-[#0D1928] border border-[#00E5A0]/30 rounded-2xl p-14 text-center">
                    <CheckCircle2 className="w-14 h-14 text-[#00E5A0] mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Import Complete!</h3>
                    <p className="text-[#8899AA]">847 records imported. Anomaly detection running in background.</p>
                    <button onClick={() => { setApplied(false); setStep(1); }} className="mt-6 px-5 py-2 bg-[#1A2A3A] rounded-xl text-sm hover:bg-[#2A3A4A]">New Import</button>
                </div>
            )}
        </div>
    );
}
