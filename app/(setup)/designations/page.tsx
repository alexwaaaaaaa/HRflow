"use client";

import { useState } from "react";
import { Pencil, Trash2, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const DESIGNATIONS = [
    { id: 1, name: "Junior Software Engineer", code: "JSE", dept: "Engineering", grade: "L1", type: "Full-time" },
    { id: 2, name: "Software Engineer", code: "SE", dept: "Engineering", grade: "L2", type: "Full-time" },
    { id: 3, name: "Senior Software Engineer", code: "SSE", dept: "Engineering", grade: "L3", type: "Full-time" },
    { id: 4, name: "Tech Lead", code: "TL", dept: "Engineering", grade: "L4", type: "Full-time" },
    { id: 5, name: "Engineering Manager", code: "EM", dept: "Engineering", grade: "L5", type: "Full-time" },
    { id: 6, name: "Product Manager", code: "PM", dept: "Product", grade: "L4", type: "Full-time" },
    { id: 7, name: "HR Executive", code: "HRE", dept: "HR", grade: "L2", type: "Full-time" },
    { id: 8, name: "HR Manager", code: "HRM", dept: "HR", grade: "L4", type: "Full-time" },
    { id: 9, name: "Sales Executive", code: "SE", dept: "Sales", grade: "L2", type: "Full-time" },
    { id: 10, name: "Sales Manager", code: "SM", dept: "Sales", grade: "L4", type: "Full-time" },
];

const GRADES = [
    { id: 1, name: "L1", ctc: "₹2L to ₹4L", exp: "0-1 years" },
    { id: 2, name: "L2", ctc: "₹4L to ₹8L", exp: "1-3 years" },
    { id: 3, name: "L3", ctc: "₹8L to ₹15L", exp: "3-6 years" },
    { id: 4, name: "L4", ctc: "₹15L to ₹25L", exp: "6-10 years" },
    { id: 5, name: "L5", ctc: "₹25L to ₹40L", exp: "10-15 years" },
    { id: 6, name: "L6", ctc: "₹40L to ₹70L", exp: "15+ years" },
    { id: 7, name: "L7", ctc: "₹70L to ₹1Cr", exp: "20+ years" },
    { id: 8, name: "L8", ctc: "₹1Cr+", exp: "CXO level" },
];

export default function DesignationsPage() {
    const [tab, setTab] = useState<"designations" | "grades">("designations");

    return (
        <div style={{ padding: "48px 64px" }} className="animate-fade-in">
            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Designations & Grades</h2>
            <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Define job titles and salary grades for your organization.</p>

            {/* Tabs */}
            <div className="flex border-b border-[#1A2A3A] mt-6 mb-8">
                <button onClick={() => setTab("designations")} className="pb-3 px-4 transition-colors"
                    style={{ fontSize: 14, fontWeight: tab === "designations" ? 600 : 500, color: tab === "designations" ? "#00E5A0" : "#8899AA", borderBottom: `2px solid ${tab === "designations" ? "#00E5A0" : "transparent"}` }}>
                    Designations
                </button>
                <button onClick={() => setTab("grades")} className="pb-3 px-4 transition-colors"
                    style={{ fontSize: 14, fontWeight: tab === "grades" ? 600 : 500, color: tab === "grades" ? "#00E5A0" : "#8899AA", borderBottom: `2px solid ${tab === "grades" ? "#00E5A0" : "transparent"}` }}>
                    Grades / Bands
                </button>
            </div>

            <div className="flex gap-8 max-w-[1200px]">
                {/* LEFT Form */}
                <div style={{ width: 340, flexShrink: 0 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        {tab === "designations" ? (
                            <div className="flex flex-col gap-4 animate-fade-in">
                                <Input label="Designation Name *" placeholder="Senior Software Engineer" />
                                <Input label="Designation Code" placeholder="SSE" />
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Department *</label>
                                    <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                                        <option>Engineering</option><option>Product</option><option>HR</option><option>Sales</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Grade Level</label>
                                    <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                                        {GRADES.map(g => <option key={g.id}>{g.name}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Employment Type</label>
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                        {["Full-time", "Part-time", "Contract", "Intern"].map(t => (
                                            <label key={t} className="flex items-center gap-2 text-[13px] text-white cursor-pointer">
                                                <input type="checkbox" defaultChecked={t === "Full-time"} className="accent-[#00E5A0]" /> {t}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <span style={{ fontSize: 13, color: "#FFFFFF" }}>Can approve leaves?</span>
                                    <button type="button" style={{ width: 36, height: 20, borderRadius: 10, background: "#00E5A0", position: "relative" }}>
                                        <div style={{ position: "absolute", top: 2, left: 18, width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF" }} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span style={{ fontSize: 13, color: "#FFFFFF" }}>Is manager level?</span>
                                    <button type="button" style={{ width: 36, height: 20, borderRadius: 10, background: "#1A2A3A", position: "relative" }}>
                                        <div style={{ position: "absolute", top: 2, left: 2, width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF" }} />
                                    </button>
                                </div>

                                <Button className="w-full mt-4">Add Designation</Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 animate-fade-in">
                                <Input label="Grade Name *" placeholder="Level 3 (L3)" />
                                <Input label="Grade Code *" placeholder="L3" />
                                <Input label="Min CTC (₹)" type="number" placeholder="8,00,000" />
                                <Input label="Max CTC (₹)" type="number" placeholder="15,00,000" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Min Exp (yrs)" type="number" placeholder="3" />
                                    <Input label="Max Exp (yrs)" type="number" placeholder="6" />
                                </div>
                                <Button className="w-full mt-4">Add Grade</Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT Table */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {tab === "designations" ? (
                        <div className="animate-fade-in">
                            <div className="rounded-xl border border-[#1A2A3A] overflow-hidden bg-[#0D1928]">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                            {["Designation", "Code", "Department", "Grade", "Type", ""].map(h => (
                                                <th key={h} className="px-4 py-3 text-xs font-semibold text-[#8899AA] uppercase">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {DESIGNATIONS.map((d, i) => (
                                            <tr key={d.id} className="group border-b border-[#1A2A3A] last:border-0 hover:bg-[#1A2A3A] transition-colors">
                                                <td className="px-4 py-3 text-sm text-[#FFFFFF]">{d.name}</td>
                                                <td className="px-4 py-3 text-sm text-[#8899AA]">{d.code}</td>
                                                <td className="px-4 py-3 text-sm text-[#FFFFFF]">{d.dept}</td>
                                                <td className="px-4 py-3 text-sm text-[#00E5A0] font-medium">{d.grade}</td>
                                                <td className="px-4 py-3 text-sm text-[#8899AA]">{d.type}</td>
                                                <td className="px-4 py-3 text-right w-20">
                                                    <div className="opacity-0 group-hover:opacity-100 flex gap-2 justify-end">
                                                        <button className="text-[#8899AA] hover:text-white"><Pencil size={14} /></button>
                                                        <button className="text-[#8899AA] hover:text-[#FF4444]"><Trash2 size={14} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Button variant="ghost" size="sm" className="mt-4"><Download size={16} className="mr-2" /> Import Designations</Button>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <div className="rounded-xl border border-[#1A2A3A] overflow-hidden bg-[#0D1928]">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                            {["Grade", "CTC Band", "Experience", "Vis", ""].map(h => (
                                                <th key={h} className="px-4 py-3 text-xs font-semibold text-[#8899AA] uppercase">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {GRADES.map((g, i) => (
                                            <tr key={g.id} className="group border-b border-[#1A2A3A] last:border-0 hover:bg-[#1A2A3A] transition-colors">
                                                <td className="px-4 py-4 text-sm font-medium text-[#00E5A0]">{g.name}</td>
                                                <td className="px-4 py-4 text-sm text-[#FFFFFF]">{g.ctc}</td>
                                                <td className="px-4 py-4 text-sm text-[#8899AA]">{g.exp}</td>
                                                <td className="px-4 py-4 w-32">
                                                    <div className="w-full h-1.5 bg-[#1A2A3A] rounded flex overflow-hidden">
                                                        <div className="bg-[#00E5A0]" style={{ width: `${(i + 1) * 12}%`, marginLeft: `${i * 5}%` }} />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-right w-20">
                                                    <div className="opacity-0 group-hover:opacity-100 flex gap-2 justify-end">
                                                        <button className="text-[#8899AA] hover:text-white"><Pencil size={14} /></button>
                                                        <button className="text-[#8899AA] hover:text-[#FF4444]"><Trash2 size={14} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
