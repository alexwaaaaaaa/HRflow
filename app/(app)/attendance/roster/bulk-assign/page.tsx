"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";

export default function BulkShiftAssignment() {
    const [step, setStep] = useState(1);
    const [useRule, setUseRule] = useState(false);

    return (
        <Page
            title="Bulk Shift Assignment"
            subtitle="Assign shifts to multiple employees at once"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Roster", href: "/attendance/roster" }, { label: "Bulk Assign" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <h2 className="text-2xl font-bold mb-1">Bulk Shift Assignment</h2>
            <p className="text-sm text-[#8899AA] mb-6">Assign shifts to multiple employees at once</p>

            {/* Toggle */}
            <div className="flex gap-3 mb-6">
                <button onClick={() => setUseRule(false)} className={`px-4 py-2 text-sm rounded-xl transition-colors ${!useRule ? "bg-[#00E5A0] text-[#060B14] font-bold" : "bg-[#0D1928] border border-[#1A2A3A] text-[#8899AA]"}`}>Upload Excel</button>
                <button onClick={() => setUseRule(true)} className={`px-4 py-2 text-sm rounded-xl transition-colors ${useRule ? "bg-[#00E5A0] text-[#060B14] font-bold" : "bg-[#0D1928] border border-[#1A2A3A] text-[#8899AA]"}`}>Rule-based</button>
            </div>

            {!useRule && (
                <>
                    {/* Steps */}
                    <div className="flex items-center gap-3 mb-6">
                        {[1, 2, 3].map(s => (
                            <React.Fragment key={s}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-[#00E5A0] text-[#060B14]" : "bg-[#1A2A3A] text-[#445566]"}`}>{s >= step ? s : <CheckCircle2 className="w-4 h-4" />}</div>
                                <span className="text-sm text-[#8899AA]">{["Upload", "Preview", "Apply"][s - 1]}</span>
                                {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`} />}
                            </React.Fragment>
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-5">
                            <div>
                                <p className="text-sm font-medium mb-3">Template Format: <span className="text-[#8899AA]">Employee ID | Date | Shift | WFH (Y/N)</span></p>
                                <button className="text-sm text-[#0066FF] hover:underline">⬇ Download Template</button>
                            </div>
                            <div className="border-2 border-dashed border-[#1A2A3A] rounded-xl p-12 text-center hover:border-[#00E5A0]/50 cursor-pointer" onClick={() => setStep(2)}>
                                <Upload className="w-10 h-10 text-[#445566] mx-auto mb-3" />
                                <p className="text-sm text-[#8899AA]">Drag & drop your Excel file here</p>
                                <p className="text-xs text-[#445566] mt-1">or click to browse</p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-4">
                            <h3 className="font-semibold">Preview — 1,247 Records</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Employee</th>
                                            <th className="px-4 py-3 text-left">Date</th>
                                            <th className="px-4 py-3 text-left">Current Shift</th>
                                            <th className="px-4 py-3 text-left">New Shift</th>
                                            <th className="px-4 py-3 text-left">Conflict</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A]">
                                        {[
                                            { emp: "Rahul Sharma", date: "11/11", cur: "Morning", new: "General", conflict: true },
                                            { emp: "Priya Mehta", date: "11/11", cur: "General", new: "General", conflict: false },
                                            { emp: "Suresh Kumar", date: "11/11", cur: "Morning", new: "Morning", conflict: false },
                                        ].map((r, i) => (
                                            <tr key={i} className={r.conflict ? "bg-[#FFB800]/5" : ""}>
                                                <td className="px-4 py-3">{r.emp}</td>
                                                <td className="px-4 py-3 text-[#8899AA]">{r.date}</td>
                                                <td className="px-4 py-3 text-[#8899AA]">{r.cur}</td>
                                                <td className="px-4 py-3 text-[#00E5A0]">{r.new}</td>
                                                <td className="px-4 py-3">{r.conflict && <span className="text-[#FFB800] text-xs">⚠️ Conflict</span>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} className="px-4 py-2 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Back</button>
                                <button onClick={() => setStep(3)} className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d]">Apply bulk assignment</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="bg-[#0D1928] border border-[#00E5A0]/30 rounded-2xl p-12 text-center">
                            <CheckCircle2 className="w-14 h-14 text-[#00E5A0] mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Shifts Assigned Successfully!</h3>
                            <p className="text-[#8899AA]">1,247 records updated. Roster reflects the changes immediately.</p>
                            <button onClick={() => setStep(1)} className="mt-6 px-5 py-2 bg-[#1A2A3A] rounded-xl text-sm hover:bg-[#2A3A4A]">Import Another File</button>
                        </div>
                    )}
                </>
            )}

            {useRule && (
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold">Rule-based Assignment</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm text-[#8899AA] mb-2 block">Department</label>
                            <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                <option>Engineering</option><option>Sales</option><option>All</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-[#8899AA] mb-2 block">Assign Shift</label>
                            <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                <option>General Shift</option><option>Morning Shift</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-[#8899AA] mb-2 block">For Period</label>
                            <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                <option>Nov 2024</option><option>Dec 2024</option>
                            </select>
                        </div>
                    </div>
                    <div className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl px-4 py-3 text-sm text-[#00E5A0]">
                        Rule: All Engineering dept → General Shift | Mon–Fri Nov 2024 (320 employees)
                    </div>
                    <button className="px-5 py-2.5 bg-[#00E5A0] text-[#060B14] font-bold rounded-xl hover:bg-[#00c98d] text-sm">Apply Rule</button>
                </div>
            )}
        </div>
    
        </Page>
        );
}
