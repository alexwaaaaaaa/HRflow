"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Search, Download } from "lucide-react";

const HISTORY = [
    { id: "REQ-2401", type: "Regularization", emp: "Priya Mehta", empId: "EMP-0091", date: "05 Mar", submittedOn: "06 Mar, 09:12 AM", reason: "Biometric failure", status: "Approved", approvedBy: "Ravi HR" },
    { id: "REQ-2398", type: "WFH Request", emp: "Rohan Desai", empId: "EMP-0234", date: "04 Mar", submittedOn: "04 Mar, 10:00 AM", reason: "Client call from home", status: "Approved", approvedBy: "Sneha TL" },
    { id: "REQ-2391", type: "Comp-off", emp: "Vikram Singh", empId: "EMP-0567", date: "01 Mar", submittedOn: "02 Mar, 09:30 AM", reason: "Worked on 25 Feb holiday", status: "Rejected", approvedBy: "Ravi HR" },
    { id: "REQ-2385", type: "Regularization", emp: "Sneha Rao", empId: "EMP-0145", date: "28 Feb", submittedOn: "01 Mar, 11:00 AM", reason: "System sync issue", status: "Approved", approvedBy: "Auto" },
    { id: "REQ-2379", type: "OT Approval", emp: "Deepak Joshi", empId: "EMP-0198", date: "27 Feb", submittedOn: "27 Feb, 08:30 PM", reason: "Release deployment", status: "Approved", approvedBy: "Sneha TL" },
    { id: "REQ-2375", type: "Regularization", emp: "Amit Kumar", empId: "EMP-0723", date: "25 Feb", submittedOn: "26 Feb, 09:00 AM", reason: "Forgot to punch out", status: "Rejected", approvedBy: "Ravi HR" },
    { id: "REQ-2370", type: "Field Visit", emp: "Suresh Patil", empId: "EMP-0889", date: "24 Feb", submittedOn: "24 Feb, 06:00 PM", reason: "Client visit - Pune", status: "Approved", approvedBy: "Auto" },
];

const STATUS_CFG: Record<string, string> = {
    Approved: "bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30",
    Rejected: "bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/30",
    Pending: "bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30",
};

const TYPE_CFG: Record<string, string> = {
    Regularization: "bg-[#0066FF]/10 text-[#0066FF]",
    "WFH Request": "bg-[#8B5CF6]/10 text-[#8B5CF6]",
    "Comp-off": "bg-[#FFB800]/10 text-[#FFB800]",
    "OT Approval": "bg-[#00E5A0]/10 text-[#00E5A0]",
    "Field Visit": "bg-[#FF6B6B]/10 text-[#FF6B6B]",
};

export default function RequestHistory() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const filtered = HISTORY.filter(r =>
        (typeFilter === "All" || r.type === typeFilter) &&
        (statusFilter === "All" || r.status === statusFilter) &&
        (r.emp.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <Page
            title="Attendance Request History"
            subtitle="All submitted requests with approval status"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Requests", href: "/attendance/requests" }, { label: "History" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Attendance Request History</h2>
                    <p className="text-sm text-[#8899AA] mt-1">All submitted requests with approval status</p>
                </div>
                <button className="px-4 py-2 bg-[#1A2A3A] text-sm text-white rounded-xl flex items-center gap-2 hover:bg-[#2A3A4A]">
                    <Download className="w-4 h-4" /> Export
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Total Requests", val: HISTORY.length, color: "#FFFFFF" },
                    { label: "Approved", val: HISTORY.filter(r => r.status === "Approved").length, color: "#00E5A0" },
                    { label: "Rejected", val: HISTORY.filter(r => r.status === "Rejected").length, color: "#FF4444" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-5 flex-wrap">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#445566]" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                        className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00E5A0] w-56" />
                </div>
                <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1">
                    {["All", "Regularization", "WFH Request", "Comp-off", "OT Approval"].map(t => (
                        <button key={t} onClick={() => setTypeFilter(t)}
                            className={`px-3 py-1.5 text-xs rounded-lg ${typeFilter === t ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>{t}</button>
                    ))}
                </div>
                <div className="flex gap-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-1">
                    {["All", "Approved", "Rejected"].map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            className={`px-3 py-1.5 text-xs rounded-lg ${statusFilter === s ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "text-[#8899AA] hover:text-white"}`}>{s}</button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                            <tr>
                                <th className="px-5 py-3 text-left">Request ID</th>
                                <th className="px-5 py-3 text-left">Employee</th>
                                <th className="px-5 py-3 text-center">Type</th>
                                <th className="px-5 py-3 text-center">For Date</th>
                                <th className="px-5 py-3 text-left">Reason</th>
                                <th className="px-5 py-3 text-center">Submitted On</th>
                                <th className="px-5 py-3 text-center">Approved By</th>
                                <th className="px-5 py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {filtered.map((row, i) => (
                                <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                    <td className="px-5 py-3 font-mono text-xs text-[#00E5A0]">{row.id}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#00E5A0]">
                                                {row.emp.split(" ").map(n => n[0]).join("")}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{row.emp}</p>
                                                <p className="text-xs text-[#445566]">{row.empId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_CFG[row.type] || "text-[#8899AA]"}`}>{row.type}</span>
                                    </td>
                                    <td className="px-5 py-3 text-center text-[#8899AA]">{row.date}</td>
                                    <td className="px-5 py-3 text-[#8899AA] max-w-[160px] truncate">{row.reason}</td>
                                    <td className="px-5 py-3 text-center text-xs text-[#445566]">{row.submittedOn}</td>
                                    <td className="px-5 py-3 text-center text-xs text-[#8899AA]">{row.approvedBy}</td>
                                    <td className="px-5 py-3 text-center">
                                        <span className={`text-xs px-2.5 py-0.5 rounded-full border ${STATUS_CFG[row.status]}`}>
                                            {row.status === "Approved" ? "✓ " : "✕ "}{row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-5 py-3 border-t border-[#1A2A3A] text-xs text-[#445566]">
                    {filtered.length} requests shown
                </div>
            </div>
        </div>
    
        </Page>
        );
}
