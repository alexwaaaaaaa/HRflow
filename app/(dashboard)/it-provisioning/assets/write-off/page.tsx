"use client";

import { Trash2, AlertTriangle, Search, FileText } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AssetWriteoffScreen() {
    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Write-off / Dispose Asset</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Permanently remove an asset from active inventory</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Search */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-base font-bold text-white mb-4">Select Asset</h2>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" size={18} />
                        <input
                            type="text"
                            placeholder="Enter Asset ID or serial number..."
                            className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors"
                        />
                    </div>
                </div>

                {/* Write-off details */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Trash2 size={120} />
                    </div>

                    <h2 className="text-lg font-bold text-white mb-6 relative z-10">Disposal Details</h2>

                    <div className="grid grid-cols-2 gap-6 relative z-10">
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Write-off Reason <span className="text-[#FF4444]">*</span></label>
                            <select className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors appearance-none">
                                <option>Beyond Economic Repair</option>
                                <option>Obsolete / Outdated</option>
                                <option>Lost / Stolen</option>
                                <option>Donated</option>
                                <option>Sold / E-waste Recycled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Disposal Date <span className="text-[#FF4444]">*</span></label>
                            <input
                                type="date"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Appraised / Salvage Value (₹)</label>
                            <input
                                type="number"
                                placeholder="0"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Approved By</label>
                            <select className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors appearance-none">
                                <option>IT Manager (Mark Johnson)</option>
                                <option>Finance Head (Sarah Smith)</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Detailed Remarks</label>
                            <textarea
                                placeholder="Provide reason why asset is being written off..."
                                className="w-full h-24 bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 p-4 rounded-xl border-dashed border-2 border-[#1A2A3A] bg-[#060B14] flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#0066FF] transition-colors">
                        <FileText size={24} className="text-[#8899AA] mb-2" />
                        <div className="text-white font-medium text-sm mb-1">Upload Supporting Documents</div>
                        <div className="text-xs text-[#445566]">E-waste certificate, police report (if stolen), or approval emails.</div>
                    </div>
                </div>

                <div className="bg-[#FF4444]/10 border border-[#FF4444]/20 rounded-xl p-4 flex items-start gap-4">
                    <AlertTriangle className="text-[#FF4444] mt-0.5 flex-shrink-0" size={18} />
                    <div>
                        <div className="text-sm font-bold text-[#FF4444] mb-1">Permanent Action</div>
                        <div className="text-xs text-[#FF4444]/80">This action cannot be undone. Writing off an asset will permanently change its status to "Decommissioned" and remove it from total active valuation calculations.</div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="secondary" className="px-8">Cancel</Button>
                    <button className="h-10 px-8 rounded-xl bg-[#FF4444] hover:bg-[#FF4444]/90 text-white font-medium transition-colors flex items-center gap-2">
                        <Trash2 size={16} /> Confirm Write-off
                    </button>
                </div>
            </div>
        </div>
    );
}
