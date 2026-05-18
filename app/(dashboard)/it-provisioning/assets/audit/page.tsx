"use client";

import { Scan, AlertCircle, Search, Play, History } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AssetAuditScreen() {
    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Asset Audits</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Conduct and track physical verifications of inventory</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon={<History size={16} />}>Past Audits</Button>
                    <Button variant="primary" icon={<Play size={16} />}>Start New Audit</Button>
                </div>
            </div>

            {/* Current Active Audit (Example) */}
            <div className="bg-gradient-to-r from-[#0066FF]/20 to-[#00E5A0]/10 border border-[#0066FF]/30 rounded-2xl p-6 mb-8 flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0066FF] text-white">Active Now</span>
                        <h2 className="text-lg font-bold text-white">Q4 2024 Physical Inventory Check</h2>
                    </div>
                    <p className="text-sm text-[#8899AA]">Auditor: Mark Johnson • Scope: NY Office</p>
                    <div className="mt-4 flex items-center gap-6">
                        <div className="text-sm">
                            <span className="text-[#8899AA]">Progress: </span>
                            <span className="text-white font-bold">45% (213 / 470 Assets)</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-[#8899AA]">Discrepancies Found: </span>
                            <span className="text-[#FFB800] font-bold">4</span>
                        </div>
                    </div>
                    <div className="w-full max-w-md h-2 bg-[#060B14] rounded-full overflow-hidden mt-3 border border-[#1A2A3A]">
                        <div className="h-full bg-gradient-to-r from-[#0066FF] to-[#00E5A0] w-[45%] rounded-full"></div>
                    </div>
                </div>
                <Button variant="primary" icon={<Scan size={16} />} className="shadow-lg shadow-[#0066FF]/20">Resume Audit</Button>
            </div>

            {/* List of discrepancies or items below */}
            <h2 className="text-xl font-bold text-white mb-4">Audit Exceptions & Discrepancies</h2>
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex gap-4">
                    <div className="relative flex-grow max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" size={16} />
                        <input
                            type="text"
                            placeholder="Search anomalies..."
                            className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors"
                        />
                    </div>
                    <Button variant="secondary" className="h-9 text-xs">Filter by Auditor</Button>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#1A2A3A] bg-[#0A1420]">
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Asset ID</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Expected State</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Found State</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Exception Type</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        <tr className="hover:bg-[#1A2A3A]/50 transition-colors">
                            <td className="p-4 text-sm font-medium text-white">AST-084</td>
                            <td className="p-4 text-sm text-[#8899AA]">In Stock</td>
                            <td className="p-4 text-sm text-white">Not Found (Missing)</td>
                            <td className="p-4">
                                <span className="inline-flex items-center px-2 py-1 rounded border text-xs font-medium text-[#FF4444] bg-[#FF4444]/10 border-[#FF4444]/20 gap-1">
                                    <AlertCircle size={12} /> Missing Asset
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <Button variant="secondary" className="h-8">Investigate</Button>
                            </td>
                        </tr>
                        <tr className="hover:bg-[#1A2A3A]/50 transition-colors">
                            <td className="p-4 text-sm font-medium text-white">AST-102</td>
                            <td className="p-4 text-sm text-[#8899AA]">John Doe</td>
                            <td className="p-4 text-sm text-white">Jane Smith</td>
                            <td className="p-4">
                                <span className="inline-flex items-center px-2 py-1 rounded border text-xs font-medium text-[#FFB800] bg-[#FFB800]/10 border-[#FFB800]/20 gap-1">
                                    <AlertCircle size={12} /> Assignee Mismatch
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <Button variant="secondary" className="h-8">Resolve</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}
