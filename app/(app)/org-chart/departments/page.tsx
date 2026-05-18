"use client";

import Page from "@/components/ui/Page";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
    Building2, ChevronRight, Search, Plus, MoreVertical, Edit, Trash2, Users
} from "lucide-react";

const DEPARTMENTS = [
    { id: "DEPT-001", name: "Engineering", head: "Maya Patel", headcount: 432, budget: "₹45.5 Cr", status: "Active" },
    { id: "DEPT-002", name: "Sales & Rev", head: "Rohit Krishnan", headcount: 215, budget: "₹28.2 Cr", status: "Active" },
    { id: "DEPT-003", name: "Product Mgt", head: "Sanjay Mishra", headcount: 56, budget: "₹12.8 Cr", status: "Active" },
    { id: "DEPT-004", name: "Human Resources", head: "Priya Sharma", headcount: 45, budget: "₹8.5 Cr", status: "Active" },
    { id: "DEPT-005", name: "Finance & Legal", head: "Open Role", headcount: 38, budget: "₹6.2 Cr", status: "Active" },
    { id: "DEPT-006", name: "Customer Success", head: "Anita Roy", headcount: 120, budget: "₹15.4 Cr", status: "Active" },
    { id: "DEPT-007", name: "Marketing", head: "Vikram S.", headcount: 65, budget: "₹18.0 Cr", status: "Active" },
    { id: "DEPT-008", name: "Legacy Ops", head: "--", headcount: 0, budget: "₹0", status: "Inactive" },
];

export default function DepartmentListScreen() {
    return (
        <Page
            title="Departments"
            subtitle="FY 2025-26 Target"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Departments" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Master Data</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <Building2 className="w-6 h-6 text-indigo-400" />
                        </div>
                        Departments
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8899AA]" />
                        <input
                            type="text"
                            placeholder="Search departments..."
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-[#4A5A6A]"
                        />
                    </div>
                    <Link href="/org-chart/departments/edit">
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                            <Plus className="w-4 h-4" /> Add Department
                        </button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Total Departments</h3>
                    <div className="text-3xl font-bold text-white mb-2">14</div>
                    <p className="text-xs text-emerald-400">+2 from last year</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Total Headcount</h3>
                    <div className="text-3xl font-bold text-white mb-2">1,245</div>
                    <p className="text-xs text-indigo-400">Across all active depts</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Largest Dept</h3>
                    <div className="text-xl font-bold text-white mb-2 truncate">Engineering</div>
                    <p className="text-xs text-[#8899AA]">432 Employees (34.7%)</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Total Allocated Budget</h3>
                    <div className="text-2xl font-bold text-white mb-2">₹185.2 Cr</div>
                    <p className="text-xs text-[#8899AA]">FY 2025-26 Target</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/40 border-b border-[#1A2A3A]">
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Dept Name & ID</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Department Head</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Headcount</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Allocated Budget</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-medium text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {DEPARTMENTS.map((dept, index) => (
                                <tr key={index} className="hover:bg-[#1A2A3A]/20 transition-colors group cursor-pointer">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                                {dept.name.charAt(0)}
                                            </div>
                                            <div>
                                                <Link href={`/org-chart/departments/${dept.id}`}>
                                                    <div className="text-sm font-bold text-white hover:text-indigo-400 transition-colors">{dept.name}</div>
                                                </Link>
                                                <div className="text-xs text-[#8899AA] font-mono mt-0.5">{dept.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {dept.head !== "Open Role" && dept.head !== "--" ? (
                                                <Image src={`https://i.pravatar.cc/150?u=${index}`} width={24} height={24} className="w-6 h-6 rounded-full" alt="avatar" />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-[#1A2A3A] flex items-center justify-center"><Users className="w-3 h-3 text-[#8899AA]" /></div>
                                            )}
                                            <span className={`text-sm ${dept.head === "Open Role" ? 'text-amber-500 italic' : 'text-white'}`}>{dept.head}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">{dept.headcount}</td>
                                    <td className="p-4 text-sm text-[#8899AA]">{dept.budget}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${dept.status === 'Active'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]'
                                            }`}>
                                            {dept.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/org-chart/departments/edit?id=${dept.id}`}>
                                                <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-indigo-400 transition-colors" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </Link>
                                            <button className="p-2 hover:bg-pink-500/10 rounded-lg text-[#8899AA] hover:text-pink-500 transition-colors" title="Deactivate">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors" title="More">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
