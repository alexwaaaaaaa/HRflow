"use client";

import React from "react";
import Link from "next/link";
import {
    Layers, ChevronRight, Save, X, Settings2
} from "lucide-react";

export default function AddEditDesignationScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                            <Link href="/org-chart/designations" className="hover:text-white transition-colors">Designations</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">New Title</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
                                <Layers className="w-5 h-5 text-pink-500" />
                            </div>
                            Create Designation
                        </h1>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-8 space-y-6">

                        <div>
                            <label className="block text-xs text-[#8899AA] mb-2 font-medium">Designation Code <span className="text-pink-500">*</span></label>
                            <input
                                type="text"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                                defaultValue="DESG-1024"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-[#8899AA] mb-2 font-medium">Designation / Job Title <span className="text-pink-500">*</span></label>
                            <input
                                type="text"
                                className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-all"
                                placeholder="e.g. Senior Frontend Developer"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-[#8899AA] mb-2 font-medium">Job Family / Functional Area</label>
                            <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-all appearance-none">
                                <option>Engineering</option>
                                <option>Sales</option>
                                <option>Marketing</option>
                                <option>Human Resources</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-2 font-medium">Career Track</label>
                                <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-all appearance-none">
                                    <option>Individual Contributor (IC)</option>
                                    <option>Management</option>
                                    <option>Executive</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-2 font-medium">Map to Grade Band <span className="text-pink-500">*</span></label>
                                <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-all appearance-none">
                                    <option>L2 - Associate</option>
                                    <option>L3 - Mid level</option>
                                    <option>L4 - Senior</option>
                                    <option>M1 - Manager</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Settings2 className="w-4 h-4 text-[#8899AA]" /> Compliance & Notice Settings
                            </h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Probation Period (Days)</label>
                                    <input type="number" defaultValue="90" className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-pink-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Notice Period (Days)</label>
                                    <input type="number" defaultValue="60" className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-pink-500 focus:outline-none" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="p-6 border-t border-[#1A2A3A] bg-[#1A2A3A]/20 flex items-center justify-end gap-4">
                        <Link href="/org-chart/designations">
                            <button className="px-6 py-2 border border-[#2A3A4A] text-white text-sm font-medium rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                                <X className="w-4 h-4" /> Cancel
                            </button>
                        </Link>
                        <button className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold rounded-lg transition-colors shadow-[0_4px_15px_rgba(236,72,153,0.3)] flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Designation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
