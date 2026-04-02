"use client";

import { useState } from "react";
import { Search, Filter, Grid, UserPlus, MoreVertical, MapPin, Mail, Phone, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { ListIcon } from 'lucide-react';

const employees = [
    { id: "EMP001", n: "Priya Mehta", r: "HR Manager", d: "Human Resources", l: "Mumbai, India", e: "priya.m@techcorp.in", p: "+91 98765 43210", s: "Active" },
    { id: "EMP002", n: "Rahul Sharma", r: "Senior Frontend Engineer", d: "Engineering", l: "Bangalore, India", e: "rahul.s@techcorp.in", p: "+91 98765 43211", s: "Active" },
    { id: "EMP003", n: "Sneha Rao", r: "Marketing Specialist", d: "Marketing", l: "Mumbai, India", e: "sneha.r@techcorp.in", p: "+91 98765 43212", s: "On Leave" },
    { id: "EMP004", n: "Vikram Singh", r: "Sales Director", d: "Sales", l: "Delhi, India", e: "vikram.s@techcorp.in", p: "+91 98765 43213", s: "Active" },
    { id: "EMP005", n: "Amit Kumar", r: "Backend Engineer", d: "Engineering", l: "Bangalore, India", e: "amit.k@techcorp.in", p: "+91 98765 43214", s: "Active" },
    { id: "EMP006", n: "Anjali Desai", r: "Product Manager", d: "Product", l: "Remote", e: "anjali.d@techcorp.in", p: "+91 98765 43215", s: "Active" },
    { id: "EMP007", n: "Suresh Nair", r: "DevOps Engineer", d: "Engineering", l: "Bangalore, India", e: "suresh.n@techcorp.in", p: "+91 98765 43216", s: "Notice Period" },
    { id: "EMP008", n: "Kavya Reddy", r: "UI/UX Designer", d: "Design", l: "Hyderabad, India", e: "kavya.r@techcorp.in", p: "+91 98765 43217", s: "Active" }
];

export default function EmployeeDirectory() {
    const [view, setView] = useState<"grid" | "list">("list");
    const [preview, setPreview] = useState<string | null>(null);

    const previewEmp = employees.find(e => e.id === preview);

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative min-h-[calc(100vh-64px)] overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Employee Directory</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Manage and view all 847 network personnel</p>
                </div>
                <div className="flex gap-4 items-center">
                    <Button className="gap-2 shadow-[0_0_15px_rgba(0,229,160,0.3)]"><UserPlus size={16} /> Add Employee</Button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                    <div className="relative w-72">
                        <Search size={16} color="#8899AA" className="absolute left-4 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="Search by name, ID, or role..." className="w-full h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-lg pl-10 pr-4 text-sm text-white focus:border-[#00E5A0] outline-none transition-colors" />
                    </div>
                    <select className="h-10 px-4 rounded-lg bg-[#0A1420] border border-[#1A2A3A] text-sm text-[#FFFFFF] focus:border-[#00E5A0] outline-none w-40 appearance-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238899AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Sales</option>
                        <option>Marketing</option>
                    </select>
                    <Button variant="secondary" className="gap-2 h-10 px-4"><Filter size={16} /> Filters</Button>
                </div>

                <div className="flex bg-[#0A1420] border border-[#1A2A3A] rounded-lg p-1">
                    <button onClick={() => setView("list")} className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${view === "list" ? "bg-[#1A2A3A] text-white" : "text-[#8899AA] hover:text-white"}`}>
                        <ListIcon size={16} />
                    </button>
                    <button onClick={() => setView("grid")} className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${view === "grid" ? "bg-[#1A2A3A] text-white" : "text-[#8899AA] hover:text-white"}`}>
                        <Grid size={16} />
                    </button>
                </div>
            </div>

            {/* LIST VIEW (3.10) */}
            {view === "list" && (
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase">Employee</th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase">ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase">Department</th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase">Location</th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {employees.map(e => (
                                <tr key={e.id} onClick={() => setPreview(e.id)} className="hover:bg-[#1A2A3A] transition-colors cursor-pointer group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[rgba(0,229,160,0.1)] text-[#00E5A0] flex items-center justify-center font-bold">{e.n.charAt(0)}</div>
                                            <div>
                                                <div className="text-sm font-semibold text-white group-hover:text-[#00E5A0] transition-colors">{e.n}</div>
                                                <div className="text-xs text-[#8899AA] mt-0.5">{e.r}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#8899AA]">{e.id}</td>
                                    <td className="px-6 py-4 text-sm text-[#FFFFFF]">{e.d}</td>
                                    <td className="px-6 py-4 text-sm text-[#8899AA]">{e.l}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase
                      ${e.s === "Active" ? "bg-[rgba(0,229,160,0.1)] text-[#00E5A0] border border-[rgba(0,229,160,0.2)]" :
                                                e.s === "On Leave" ? "bg-[rgba(255,184,0,0.1)] text-[#FFB800] border border-[rgba(255,184,0,0.2)]" :
                                                    "bg-[rgba(255,68,68,0.1)] text-[#FF4444] border border-[rgba(255,68,68,0.2)]"}`}>{e.s}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#8899AA] hover:text-[#FFFFFF] transition-colors p-2" onClick={(ev) => ev.stopPropagation()}>
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 border-t border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <span className="text-sm text-[#8899AA]">Showing 1 to 8 of 847 entries</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 rounded bg-[#1A2A3A] text-sm text-white hover:bg-[#445566] transition-colors">Prev</button>
                            <button className="px-3 py-1 rounded bg-[#00E5A0] text-sm text-[#060B14] font-medium">1</button>
                            <button className="px-3 py-1 rounded bg-[#1A2A3A] text-sm text-white hover:bg-[#445566] transition-colors">2</button>
                            <button className="px-3 py-1 rounded bg-[#1A2A3A] text-sm text-white hover:bg-[#445566] transition-colors">Next</button>
                        </div>
                    </div>
                </div>
            )}

            {/* GRID VIEW (3.11) */}
            {view === "grid" && (
                <div className="grid grid-cols-4 gap-6">
                    {employees.map(e => (
                        <div key={e.id} onClick={() => setPreview(e.id)} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 text-center hover:-translate-y-1 hover:border-[#445566] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all cursor-pointer group">
                            <div className="flex justify-between items-start w-full mb-4">
                                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase
                      ${e.s === "Active" ? "bg-[rgba(0,229,160,0.1)] text-[#00E5A0]" :
                                        e.s === "On Leave" ? "bg-[rgba(255,184,0,0.1)] text-[#FFB800]" :
                                            "bg-[rgba(255,68,68,0.1)] text-[#FF4444]"}`}>{e.s}</span>
                                <button className="text-[#8899AA] hover:text-[#FFFFFF] transition-colors" onClick={(ev) => ev.stopPropagation()}>
                                    <MoreVertical size={16} />
                                </button>
                            </div>

                            <div className="w-20 h-20 mx-auto rounded-full bg-[rgba(0,229,160,0.1)] text-[#00E5A0] flex items-center justify-center font-bold text-2xl mb-4 group-hover:scale-105 transition-transform">{e.n.charAt(0)}</div>

                            <div className="text-lg font-bold text-white mb-1">{e.n}</div>
                            <div className="text-sm text-[#00E5A0] font-medium mb-1">{e.r}</div>
                            <div className="text-xs text-[#8899AA] mb-4">{e.d}</div>

                            <div className="bg-[#0A1420] rounded-xl p-3 flex justify-between">
                                <div className="text-center w-full border-r border-[#1A2A3A]">
                                    <div className="text-[10px] text-[#445566] uppercase mb-1">ID</div>
                                    <div className="text-xs text-white truncate px-1">{e.id}</div>
                                </div>
                                <div className="text-center w-full">
                                    <div className="text-[10px] text-[#445566] uppercase mb-1">Location</div>
                                    <div className="text-xs text-white truncate px-1">{e.l.split(',')[0]}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* EMPLOYEE PREVIEW SIDE DRAWER (3.12) */}
            <div className={`fixed top-0 right-0 bottom-0 w-[440px] bg-[#0A1420] border-l border-[#1A2A3A] shadow-[-10px_0_40px_rgba(0,0,0,0.5)] z-50 transform transition-transform duration-300 flex flex-col ${preview ? "translate-x-0" : "translate-x-full"}`}>
                {previewEmp && (
                    <>
                        <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-start bg-[#0D1928]">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[rgba(0,229,160,0.1)] text-[#00E5A0] flex items-center justify-center font-bold text-2xl">{previewEmp.n.charAt(0)}</div>
                                <div>
                                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>{previewEmp.n}</h2>
                                    <div style={{ fontSize: 13, color: "#00E5A0", fontWeight: 500, marginTop: 4 }}>{previewEmp.r}</div>
                                    <span className={`inline-flex px-2 py-0.5 mt-2 rounded text-[10px] font-semibold uppercase
                        ${previewEmp.s === "Active" ? "bg-[rgba(0,229,160,0.1)] text-[#00E5A0]" :
                                            previewEmp.s === "On Leave" ? "bg-[rgba(255,184,0,0.1)] text-[#FFB800]" :
                                                "bg-[rgba(255,68,68,0.1)] text-[#FF4444]"}`}>{previewEmp.s}</span>
                                </div>
                            </div>
                            <button onClick={() => setPreview(null)} className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1A2A3A] hover:bg-[#445566] text-white transition-colors">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

                            {/* Contact Info */}
                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <Mail size={16} color="#8899AA" />
                                    <div className="text-sm text-white">{previewEmp.e}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={16} color="#8899AA" />
                                    <div className="text-sm text-white">{previewEmp.p}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} color="#8899AA" />
                                    <div className="text-sm text-white">{previewEmp.l}</div>
                                </div>
                            </div>

                            {/* Details */}
                            <div>
                                <h3 style={{ fontSize: 12, fontWeight: 700, color: "#445566", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Job Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-[#8899AA] mb-1">Employee ID</div>
                                        <div className="text-sm text-white font-medium">{previewEmp.id}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#8899AA] mb-1">Department</div>
                                        <div className="text-sm text-white font-medium">{previewEmp.d}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#8899AA] mb-1">Reporting Manager</div>
                                        <div className="text-sm text-[#0066FF] font-medium hover:underline cursor-pointer">Anil Kapoor</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#8899AA] mb-1">Date of Joining</div>
                                        <div className="text-sm text-white font-medium">14 Jan 2022</div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div>
                                <h3 style={{ fontSize: 12, fontWeight: 700, color: "#445566", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Quick Stats</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-3 text-center">
                                        <div className="text-lg font-bold text-white">12</div>
                                        <div className="text-[10px] text-[#8899AA] uppercase">Leave Bal</div>
                                    </div>
                                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-3 text-center">
                                        <div className="text-lg font-bold text-[#00E5A0]">98%</div>
                                        <div className="text-[10px] text-[#8899AA] uppercase">Attendance</div>
                                    </div>
                                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-3 text-center">
                                        <div className="text-lg font-bold text-white">4.8</div>
                                        <div className="text-[10px] text-[#8899AA] uppercase">Rating</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Bottom Actions */}
                        <div className="p-6 border-t border-[#1A2A3A] bg-[#0D1928] flex gap-3">
                            <Button variant="secondary" className="flex-1">View Full Profile</Button>
                            <Button className="flex-1 bg-[#1A2A3A] text-white hover:bg-[#445566] border border-[#445566] shadow-none">Message</Button>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}
