"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { HardHat, FileCheck, Paperclip, ChevronRight } from 'lucide-react';

export default function ContractorTimesheetScreen() {
    return (
        <Page
            title="Contractor Portal"
            subtitle="Submit billable hours, upload vendor invoices, and track payment status."
            breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: "Contractor Timesheet" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">External Workforce</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><HardHat size={24} className="text-amber-400" /> Contractor Portal</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Submit billable hours, upload vendor invoices, and track payment status.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Col - Identity & Contract */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-b from-[#131B2B] to-[#0A1420] border border-amber-500/30 rounded-2xl p-6 shadow-lg shadow-amber-500/5">
                        <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 border-2 border-amber-500/40 font-bold text-xl mb-4">JD</div>
                        <h2 className="text-xl font-bold text-white mb-1">John Doe Consulting LLC</h2>
                        <p className="text-[#8899AA] text-sm mb-6">Contract ID: C-2025-089</p>

                        <div className="space-y-4">
                            <div>
                                <div className="text-[#556677] text-[10px] uppercase font-bold tracking-wider mb-1">Active SOW Max Hours</div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-mono font-bold text-lg">145 / 300 hrs</span>
                                    <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold">48% Billed</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-[#131B2B] overflow-hidden mt-2">
                                    <div className="bg-amber-400 h-full w-[48%]"></div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-[#1A2A3A]">
                                <div className="text-[#556677] text-[10px] uppercase font-bold tracking-wider mb-1">Hourly Rate</div>
                                <div className="text-white font-mono font-bold">$125.00 / hr</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 text-sm">Recent PO Payments</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <div>
                                    <div className="text-[#AABBCC] font-mono">PO-9482</div>
                                    <div className="text-[#556677] text-xs">Sep 15, 2025</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-white font-bold font-mono">$5,400</div>
                                    <div className="text-emerald-400 text-[10px] uppercase font-bold">Paid</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div>
                                    <div className="text-[#AABBCC] font-mono">PO-9411</div>
                                    <div className="text-[#556677] text-xs">Aug 15, 2025</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-white font-bold font-mono">$7,125</div>
                                    <div className="text-emerald-400 text-[10px] uppercase font-bold">Paid</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col - Timesheet Submission */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg relative overflow-hidden">
                        <h2 className="text-xl font-bold text-white mb-6">Submit Week: Oct 20 - Oct 26</h2>

                        <div className="space-y-6 max-w-2xl">
                            {/* Simplistic time entry for contractors */}
                            <div className="grid grid-cols-7 gap-3">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                    <div key={day} className="text-center">
                                        <div className="text-[#8899AA] text-xs font-bold mb-2">{day}</div>
                                        <input type="text" defaultValue={i < 5 ? "8" : ""} placeholder="0" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl text-center text-white py-3 font-mono focus:border-amber-500 outline-none transition-colors" />
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-[#1A2A3A] pt-4 flex justify-between items-center">
                                <span className="text-[#8899AA] font-bold">Total Billable Hours:</span>
                                <span className="text-white text-2xl font-black font-mono">40.0</span>
                            </div>

                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5">
                                <label className="block text-white text-sm font-bold mb-3 flex items-center gap-2">
                                    <FileCheck size={16} className="text-amber-400" /> Attach Invoice (PDF Required)
                                </label>
                                <div className="border-2 border-dashed border-[#2A3A4A] rounded-xl py-8 text-center hover:border-amber-500/50 hover:bg-amber-500/5 transition-all cursor-pointer">
                                    <Paperclip size={24} className="text-[#556677] mx-auto mb-3" />
                                    <div className="text-white text-sm font-bold mb-1">Click to upload or drag and drop</div>
                                    <div className="text-[#556677] text-xs">PDF, JPG up to 10MB</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-[#1A2A3A] flex justify-end">
                            <button className="bg-amber-500 hover:bg-amber-400 text-[#0A1420] font-bold px-8 py-3 rounded-xl transition-colors shadow-lg flex items-center gap-2">
                                Submit to Manager <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
