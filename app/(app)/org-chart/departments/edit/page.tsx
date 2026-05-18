"use client";

import Page from "@/components/ui/Page";

import React from "react";
import Link from "next/link";
import {
    Building2, ChevronRight, Save, X, Network, FileText, Users, CreditCard
} from "lucide-react";

export default function AddEditDepartmentScreen() {
    return (
        <Page
            title="Create New Department"
            subtitle="Auto-generated alphanumeric code."
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Departments", href: "/org-chart/departments" }, { label: "Edit" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                            <Link href="/org-chart/departments" className="hover:text-white transition-colors">Departments</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">New Department</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                                <Building2 className="w-5 h-5 text-indigo-400" />
                            </div>
                            Create New Department
                        </h1>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex border-b border-[#1A2A3A]">
                        <button className="px-6 py-4 text-sm font-medium border-b-2 border-indigo-500 text-indigo-400 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Basic Details
                        </button>
                        <button className="px-6 py-4 text-sm font-medium border-b-2 border-transparent text-[#8899AA] hover:text-white flex items-center gap-2">
                            <Network className="w-4 h-4" /> Hierarchy & Structure
                        </button>
                        <button className="px-6 py-4 text-sm font-medium border-b-2 border-transparent text-[#8899AA] hover:text-white flex items-center gap-2">
                            <CreditCard className="w-4 h-4" /> Budgets
                        </button>
                    </div>

                    <div className="p-8 space-y-8">

                        {/* Section: Basic Data */}
                        <div>
                            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-indigo-400" /> Core Information
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Department Code <span className="text-pink-500">*</span></label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                                        defaultValue="DEPT-015"
                                        disabled
                                    />
                                    <p className="text-[10px] text-[#8899AA] mt-1">Auto-generated alphanumeric code.</p>
                                </div>
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Department Name <span className="text-pink-500">*</span></label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                                        placeholder="e.g. Data Analytics"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Description & Mandate</label>
                                    <textarea
                                        rows={3}
                                        className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
                                        placeholder="Describe the department's core function and goals..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Section: Hierarchy */}
                        <div className="pt-6 border-t border-[#1A2A3A]">
                            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                                <Network className="w-4 h-4 text-emerald-400" /> Organizational Placement
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Parent Department</label>
                                    <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all appearance-none">
                                        <option value="">None (Top Level)</option>
                                        <option value="eng">Engineering (DEPT-001)</option>
                                        <option value="sales">Sales & Rev (DEPT-002)</option>
                                        <option value="hr">Human Resources (DEPT-003)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Department Head (HOD)</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8899AA]" />
                                        <input
                                            type="text"
                                            className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                                            placeholder="Search employee by name or ID..."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Cost Center Alignment <span className="text-pink-500">*</span></label>
                                    <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all appearance-none">
                                        <option value="">Select Cost Center...</option>
                                        <option value="cc1">CC-001 (HQ Admin)</option>
                                        <option value="cc2">CC-002 (R&D Bangalore)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Default Location</label>
                                    <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all appearance-none">
                                        <option value="">Select Base Location...</option>
                                        <option value="loc1">Bangalore - Koramangala Hub</option>
                                        <option value="loc2">Mumbai - BKC Office</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-[#1A2A3A] bg-[#1A2A3A]/20 flex items-center justify-end gap-4">
                        <Link href="/org-chart/departments">
                            <button className="px-6 py-2 border border-[#2A3A4A] text-white text-sm font-medium rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                                <X className="w-4 h-4" /> Cancel
                            </button>
                        </Link>
                        <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-lg transition-colors shadow-[0_4px_15px_rgba(99,102,241,0.3)] flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Department
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
