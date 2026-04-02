"use client";
import React, { useState } from "react";
import { Plus, Search, Filter, MoreVertical, MapPin, Users, Calendar, Eye } from "lucide-react";

const JOBS = [
    { id: "J-101", title: "Senior Frontend Engineer", dept: "Engineering", location: "Bengaluru, Hybrid", status: "Active", posted: "12 Mar 2025", applicants: 145, new: 12 },
    { id: "J-102", title: "Product Marketing Manager", dept: "Marketing", location: "Mumbai, On-site", status: "Active", posted: "10 Mar 2025", applicants: 89, new: 5 },
    { id: "J-103", title: "Enterprise Sales Rep", dept: "Sales", location: "Delhi, Remote", status: "Draft", posted: "—", applicants: 0, new: 0 },
    { id: "J-104", title: "HR Business Partner", dept: "HR", location: "Bengaluru, On-site", status: "Closed", posted: "15 Jan 2025", applicants: 210, new: 0 },
    { id: "J-105", title: "Backend Engineer (Go)", dept: "Engineering", location: "Pune, Hybrid", status: "Active", posted: "05 Mar 2025", applicants: 67, new: 8 },
];

const STATUS_COLOR: Record<string, { bg: string, text: string }> = {
    Active: { bg: "rgba(0,229,160,0.1)", text: "#00E5A0" },
    Draft: { bg: "rgba(255,184,0,0.1)", text: "#FFB800" },
    Closed: { bg: "rgba(255,68,68,0.1)", text: "#FF4444" },
};

export default function JobPostingList() {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const filtered = JOBS.filter(j =>
        (filterStatus === "All" || j.status === filterStatus) &&
        (j.title.toLowerCase().includes(search.toLowerCase()) || j.id.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Job Postings</h1>
                    <p className="text-sm text-[#8899AA]">Manage your open requisitions and fast-track hiring</p>
                </div>
                <button className="h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-colors">
                    <Plus size={14} /> Create Job
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search jobs by title or ID..."
                        className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                    />
                </div>
                <div className="flex gap-2">
                    {["All", "Active", "Draft", "Closed"].map(s => (
                        <button key={s} onClick={() => setFilterStatus(s)}
                            className={`h-10 px-4 text-xs font-semibold border rounded-xl transition-all ${filterStatus === s ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'bg-[#0D1928] border-[#1A2A3A] text-[#8899AA] hover:border-[#2A3A4A]'}`}>
                            {s}
                        </button>
                    ))}
                </div>
                <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-[#8899AA] text-sm rounded-xl hover:bg-[#1A2A3A] flex items-center gap-2 transition-colors ml-auto">
                    <Filter size={14} /> Filters
                </button>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium">Job Title</th>
                            <th className="px-6 py-4 font-medium">Location</th>
                            <th className="px-6 py-4 font-medium text-center">Status</th>
                            <th className="px-6 py-4 font-medium text-center">Applicants</th>
                            <th className="px-6 py-4 font-medium">Posted</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {filtered.map(job => (
                            <tr key={job.id} className="hover:bg-[#1A2A3A]/30 transition-colors group cursor-pointer">
                                <td className="px-6 py-4">
                                    <p className="font-semibold text-white mb-0.5">{job.title}</p>
                                    <div className="flex items-center gap-2 text-[11px] text-[#445566]">
                                        <span>{job.id}</span>
                                        <span>·</span>
                                        <span>{job.dept}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#8899AA]">
                                    <div className="flex items-center gap-1.5 text-xs"><MapPin size={12} className="text-[#445566]" /> {job.location}</div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full inline-flex items-center gap-1.5"
                                        style={{ background: STATUS_COLOR[job.status].bg, color: STATUS_COLOR[job.status].text }}>
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_COLOR[job.status].text }} />
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-sm font-bold text-white"><Users size={12} className="inline mr-1 text-[#445566]" />{job.applicants}</span>
                                        {job.new > 0 && <span className="text-[10px] bg-[#0066FF] px-1.5 py-0.5 rounded text-white font-medium">+{job.new}</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#8899AA] text-xs">
                                    <div className="flex items-center gap-1.5"><Calendar size={12} className="text-[#445566]" /> {job.posted}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="h-8 w-8 bg-[#1A2A3A] text-white rounded-lg flex items-center justify-center hover:bg-[#243040] opacity-0 group-hover:opacity-100 transition-all">
                                            <Eye size={14} />
                                        </button>
                                        <button className="h-8 w-8 text-[#445566] hover:text-white rounded-lg flex items-center justify-center transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-[#445566]">
                                    No jobs found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
