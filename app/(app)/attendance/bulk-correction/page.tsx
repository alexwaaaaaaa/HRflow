"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";

const SAMPLE = [
    { emp: "EMP-0848", name: "Rahul Sharma", date: "08 Nov", current: "Absent", correct: "Present", inTime: "09:00 AM", outTime: "06:00 PM", reason: "Biometric error" },
    { emp: "EMP-0567", name: "Vikram Singh", date: "05 Nov", current: "Absent", correct: "WFH", inTime: "—", outTime: "—", reason: "WFH not marked" },
    { emp: "EMP-0145", name: "Sneha Rao", date: "05 Nov", current: "Present", correct: "Present", inTime: "09:15 AM", outTime: "07:30 PM", reason: "Wrong out time" },
    { emp: "EMP-0723", name: "Amit Kumar", date: "03 Nov", current: "Absent", correct: "Present", inTime: "09:00 AM", outTime: "06:30 PM", reason: "System crash" },
];

export default function BulkCorrection() {
    const [tab, setTab] = useState<"upload" | "manual">("upload");
    const [step, setStep] = useState(1);
    const [rows, setRows] = useState(SAMPLE);
    const [applied, setApplied] = useState(false);

    const removeRow = (i: number) => setRows(r => r.filter((_, j) => j !== i));

    return (
        <Page
            title="Bulk Attendance Correction"
            subtitle="Correct multiple attendance records at once"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Bulk Correction" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <h2 className="text-2xl font-bold mb-1">Bulk Attendance Correction</h2>
            <p className="text-sm text-[#8899AA] mb-6">Correct multiple attendance records at once</p>

            {/* TAB */}
            <div className="flex gap-3 mb-6">
                <button onClick={() => { setTab("upload"); setStep(1); }} className={`px-4 py-2 text-sm rounded-xl transition-colors ${tab === "upload" ? "bg-[#00E5A0] text-[#060B14] font-bold" : "bg-[#0D1928] border border-[#1A2A3A] text-[#8899AA]"}`}>Upload File</button>
                <button onClick={() => setTab("manual")} className={`px-4 py-2 text-sm rounded-xl transition-colors ${tab === "manual" ? "bg-[#00E5A0] text-[#060B14] font-bold" : "bg-[#0D1928] border border-[#1A2A3A] text-[#8899AA]"}`}>Manual Entry</button>
            </div>

            {tab === "upload" && !applied && (
                <>
                    {step === 1 && (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-4">
                            <p className="text-sm text-[#8899AA]">Template: <span className="font-medium text-white">Employee ID | Date | Type | In Time | Out Time | Reason</span></p>
                            <button className="text-sm text-[#0066FF] hover:underline">⬇ Download Template</button>
                            <div className="border-2 border-dashed border-[#1A2A3A] rounded-xl p-12 text-center hover:border-[#00E5A0]/50 cursor-pointer" onClick={() => setStep(2)}>
                                <Upload className="w-10 h-10 text-[#445566] mx-auto mb-3" />
                                <p className="text-sm text-[#8899AA]">Drag & drop your correction file here</p>
                                <p className="text-xs text-[#445566] mt-1">or click to browse</p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                            <div className="px-5 py-4 border-b border-[#1A2A3A] flex justify-between items-center">
                                <h3 className="font-semibold">Preview — {rows.length} Records</h3>
                                <div className="flex gap-3">
                                    <button onClick={() => setStep(1)} className="px-4 py-2 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Back</button>
                                    <button onClick={() => setApplied(true)} className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d]">Apply All Corrections</button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Employee</th>
                                            <th className="px-4 py-3 text-center">Date</th>
                                            <th className="px-4 py-3 text-center">Current</th>
                                            <th className="px-4 py-3 text-center">Corrected To</th>
                                            <th className="px-4 py-3 text-center">In / Out</th>
                                            <th className="px-4 py-3 text-left">Reason</th>
                                            <th className="px-4 py-3 text-center">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A]">
                                        {rows.map((row, i) => (
                                            <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <p className="font-medium">{row.name}</p>
                                                    <p className="text-xs text-[#445566]">{row.emp}</p>
                                                </td>
                                                <td className="px-4 py-3 text-center text-[#8899AA]">{row.date}</td>
                                                <td className="px-4 py-3 text-center text-[#FF4444]">{row.current}</td>
                                                <td className="px-4 py-3 text-center text-[#00E5A0] font-semibold">{row.correct}</td>
                                                <td className="px-4 py-3 text-center text-xs text-[#8899AA]">{row.inTime} → {row.outTime}</td>
                                                <td className="px-4 py-3 text-[#8899AA] text-xs">{row.reason}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <button onClick={() => removeRow(i)} className="text-xs text-[#FF4444] hover:underline">Remove</button>
                                                </td>
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
                <div className="bg-[#0D1928] border border-[#00E5A0]/30 rounded-2xl p-12 text-center">
                    <CheckCircle2 className="w-14 h-14 text-[#00E5A0] mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Corrections Applied!</h3>
                    <p className="text-[#8899AA]">{SAMPLE.length} records updated. LOP recalculation triggered for payroll.</p>
                    <button onClick={() => { setApplied(false); setStep(1); }} className="mt-6 px-5 py-2 bg-[#1A2A3A] rounded-xl text-sm hover:bg-[#2A3A4A]">New Correction Batch</button>
                </div>
            )}

            {tab === "manual" && (
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Manual Correction Form</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">Employee</label>
                            <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                <option>Rahul Sharma (EMP-0848)</option>
                                <option>Priya Mehta (EMP-0091)</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">Date</label>
                            <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">Correct Status</label>
                            <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                <option>Present</option><option>WFH</option><option>Half Day</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">In Time</label>
                            <input type="time" defaultValue="09:00" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">Out Time</label>
                            <input type="time" defaultValue="18:00" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">Reason</label>
                            <input placeholder="Biometric error" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                    </div>
                    <button className="mt-4 px-5 py-2.5 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-xl hover:bg-[#00c98d]">Apply Correction</button>
                </div>
            )}
        </div>
    
        </Page>
        );
}
