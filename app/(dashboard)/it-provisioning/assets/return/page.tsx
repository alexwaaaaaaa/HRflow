"use client";

import { RefreshCw, CheckCircle2, AlertTriangle, Search, Save, X } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AssetReturnScreen() {
    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Return Asset</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Process hardware or software returns from employees</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Find Asset */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-base font-bold text-white mb-4">Select Asset for Return</h2>
                    <div className="flex gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Asset ID or Employee Name..."
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                        <Button variant="secondary" className="px-6">Search</Button>
                    </div>

                    {/* Selected Asset Card */}
                    <div className="mt-6 p-4 rounded-xl border border-[#334455] bg-[#0A1420] flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center">
                                <span className="text-xl">💻</span>
                            </div>
                            <div>
                                <div className="text-white font-bold mb-1">MacBook Pro 16" M2 Max</div>
                                <div className="text-xs text-[#8899AA] flex items-center gap-2">
                                    <span>ID: AST-001</span> •
                                    <span className="text-[#00E5A0]">Assigned to: Sarah Connor</span>
                                </div>
                            </div>
                        </div>
                        <CheckCircle2 className="text-[#00E5A0]" size={24} />
                    </div>
                </div>

                {/* Return Details */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8">
                    <h2 className="text-lg font-bold text-white mb-6">Return Information</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Return Reason <span className="text-[#FF4444]">*</span></label>
                            <select className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors appearance-none">
                                <option>Employee Offboarding</option>
                                <option>Device Upgrade/Replacement</option>
                                <option>Hardware Failure</option>
                                <option>Surplus/Not Needed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Return Date <span className="text-[#FF4444]">*</span></label>
                            <input
                                type="date"
                                defaultValue="2026-03-09"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Condition Upon Return <span className="text-[#FF4444]">*</span></label>
                            <select className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors appearance-none">
                                <option>Excellent (Like New)</option>
                                <option>Good (Normal Wear)</option>
                                <option>Fair (Minor Damage)</option>
                                <option>Poor (Needs Repair)</option>
                                <option>Broken (Unusable)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">New Asset Status <span className="text-[#FF4444]">*</span></label>
                            <select className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors appearance-none">
                                <option>In Stock / Available</option>
                                <option>In Maintenance</option>
                                <option>Decommissioned</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Notes & Remarks</label>
                            <textarea
                                placeholder="Add notes about scratches, dents, missing chargers, etc..."
                                className="w-full h-24 bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-start gap-4">
                        <AlertTriangle className="text-[#FFB800] mt-0.5 flex-shrink-0" size={18} />
                        <div>
                            <div className="text-sm font-bold text-[#FFB800] mb-1">Checklist Reminder</div>
                            <div className="text-xs text-[#FFB800]/80">Ensure all accessories (charger, cables) are returned. Wipe the device completely and remove activation locks (MDM, iCloud, etc) before returning it to stock.</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#1A2A3A]">
                    <Button variant="secondary" className="px-8">Cancel</Button>
                    <Button variant="primary" icon={<RefreshCw size={16} />} className="px-8">Process Return</Button>
                </div>
            </div>
        </div>
    );
}
