"use client";

import Page from "@/components/ui/Page";

import React from "react";
import Link from "next/link";
import {
    MapPin, ChevronRight, Save, X, Globe, Building
} from "lucide-react";

export default function AddEditLocationScreen() {
    return (
        <Page
            title="Add Office Location"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Locations", href: "/org-chart/locations" }, { label: "Edit" }]}
            maxWidth="800px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                            <Link href="/org-chart/locations" className="hover:text-white transition-colors">Locations</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">New Location</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                <MapPin className="w-5 h-5 text-orange-500" />
                            </div>
                            Add Office Location
                        </h1>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-8 space-y-6">

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-2 font-medium">Location Code <span className="text-pink-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm uppercase focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
                                    placeholder="e.g. BLR-01"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-2 font-medium">Location Type <span className="text-pink-500">*</span></label>
                                <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all appearance-none">
                                    <option>Headquarters (HQ)</option>
                                    <option>Branch Office</option>
                                    <option>Regional Hub</option>
                                    <option>R&D Center</option>
                                    <option>Virtual / Fully Remote</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-[#8899AA] mb-2 font-medium">Location Name <span className="text-pink-500">*</span></label>
                            <input
                                type="text"
                                className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
                                placeholder="e.g. Koramangala HQ"
                            />
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-[#8899AA]" /> Regional & Time Settings
                            </h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Country</label>
                                    <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none appearance-none">
                                        <option>India</option>
                                        <option>United States</option>
                                        <option>United Arab Emirates</option>
                                        <option>Singapore</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Timezone</label>
                                    <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none appearance-none">
                                        <option>Asia/Kolkata (IST)</option>
                                        <option>Asia/Dubai (+04)</option>
                                        <option>America/New_York (EST)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">State / Province</label>
                                    <input type="text" className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none" placeholder="e.g. Karnataka" />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">City</label>
                                    <input type="text" className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none" placeholder="e.g. Bangalore" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Building className="w-4 h-4 text-[#8899AA]" /> Compliance Linking
                            </h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Link to Statutory State</label>
                                    <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none appearance-none">
                                        <option>Karnataka (LWF & PT applicable)</option>
                                        <option>Maharashtra (LWF & PT applicable)</option>
                                    </select>
                                    <p className="text-[10px] text-emerald-400 mt-1">This drives payroll statutory deductions.</p>
                                </div>
                                <div>
                                    <label className="block text-xs text-[#8899AA] mb-2 font-medium">Assign Default Holiday Calendar</label>
                                    <select className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none appearance-none">
                                        <option>Karnataka Public Holidays 2026</option>
                                        <option>Maharashtra Public Holidays 2026</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="p-6 border-t border-[#1A2A3A] bg-[#1A2A3A]/20 flex items-center justify-end gap-4">
                        <Link href="/org-chart/locations">
                            <button className="px-6 py-2 border border-[#2A3A4A] text-white text-sm font-medium rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                                <X className="w-4 h-4" /> Cancel
                            </button>
                        </Link>
                        <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors shadow-[0_4px_15px_rgba(249,115,22,0.3)] flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Location
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
