"use client";

import React from "react";
import { TrendingUp, AlertTriangle, Info, Download, Filter, CheckCircle2, ChevronRight, PieChart } from "lucide-react";

export default function CompensationBenchmarkingPage() {
    const benchmarkData = [
        { id: 1, role: "Sr. Software Eng.", grade: "L5", internalMedian: "₹14,00,000", p25: "₹11,00,000", p50: "₹13,00,000", p75: "₹16,00,000", position: "58th pctile", gap: "+₹1,00,000 vs median", status: "good" },
        { id: 2, role: "HR Business Partner", grade: "L4", internalMedian: "₹9,00,000", p25: "₹8,50,000", p50: "₹10,50,000", p75: "₹13,00,000", position: "38th pctile", gap: "-₹1,50,000 vs median", status: "warning" },
        { id: 3, role: "Data Analyst", grade: "L3", internalMedian: "₹7,20,000", p25: "₹7,50,000", p50: "₹9,00,000", p75: "₹11,00,000", position: "33rd pctile", gap: "-₹1,80,000 vs median", status: "danger" },
        { id: 4, role: "Sales Executive", grade: "L2", internalMedian: "₹5,40,000", p25: "₹4,80,000", p50: "₹5,80,000", p75: "₹7,00,000", position: "42nd pctile", gap: "-₹40,000 vs median", status: "warning" },
        { id: 5, role: "Engineering Manager", grade: "L6", internalMedian: "₹28,00,000", p25: "₹22,00,000", p50: "₹26,00,000", p75: "₹32,00,000", position: "65th pctile", gap: "+₹2,00,000 vs median", status: "good" },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Compensation Benchmarking</h2>
                        <p className="text-gray-400 text-sm mt-1">Company pay positioning vs India market data (Mercer/Radford survey 2024)</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#1A2A3A] hover:bg-[#1A2A3A] transition-colors rounded-lg text-sm font-medium">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="flex items-center gap-2 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            <Download className="w-4 h-4" /> Export Report
                        </button>
                    </div>
                </div>

                {/* Competitive Pay Index */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex flex-col items-center justify-center p-4 bg-[#060B14] rounded-full w-48 h-48 border-8 border-[#00E5A0] shadow-[0_0_20px_rgba(0,229,160,0.2)]">
                            <span className="text-5xl font-bold text-[#00E5A0]">72</span>
                            <span className="text-sm text-gray-400 mt-1">/ 100</span>
                            <span className="text-sm font-medium text-[#00E5A0] mt-2">Competitive</span>
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-5">
                                <p className="text-gray-400 text-sm font-medium">Entry Level</p>
                                <div className="flex items-end gap-3 mt-2">
                                    <span className="text-3xl font-bold">68</span>
                                    <span className="text-sm text-[#FFB800] mb-1">Slightly below market</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full mt-4">
                                    <div className="h-full bg-[#FFB800] rounded-full" style={{ width: '68%' }}></div>
                                </div>
                            </div>

                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-5">
                                <p className="text-gray-400 text-sm font-medium">Mid Level</p>
                                <div className="flex items-end gap-3 mt-2">
                                    <span className="text-3xl font-bold">74</span>
                                    <span className="text-sm text-gray-400 mb-1">At market</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full mt-4">
                                    <div className="h-full bg-[#00E5A0] rounded-full" style={{ width: '74%' }}></div>
                                </div>
                            </div>

                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-5">
                                <p className="text-gray-400 text-sm font-medium">Senior Level</p>
                                <div className="flex items-end gap-3 mt-2">
                                    <span className="text-3xl font-bold text-[#00E5A0]">81</span>
                                    <span className="text-sm text-[#00E5A0] mb-1">Above market</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full mt-4">
                                    <div className="h-full bg-[#00E5A0] rounded-full" style={{ width: '81%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Benchmarking Table */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-gray-400" /> Role-wise Benchmarking
                        </h3>
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-[#060B14] border-b border-[#1A2A3A] text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Role</th>
                                        <th className="px-6 py-4 font-medium">Grade</th>
                                        <th className="px-6 py-4 font-medium text-white">Internal Median</th>
                                        <th className="px-6 py-4 font-medium">P25 Market</th>
                                        <th className="px-6 py-4 font-medium">P50 Market</th>
                                        <th className="px-6 py-4 font-medium">P75 Market</th>
                                        <th className="px-6 py-4 font-medium">Position</th>
                                        <th className="px-6 py-4 font-medium">Gap</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {benchmarkData.map((row) => (
                                        <tr key={row.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                            <td className="px-6 py-4 font-medium">{row.role}</td>
                                            <td className="px-6 py-4 text-gray-400">{row.grade}</td>
                                            <td className="px-6 py-4 font-semibold text-white">{row.internalMedian}</td>
                                            <td className="px-6 py-4 text-gray-400">{row.p25}</td>
                                            <td className="px-6 py-4 text-gray-400">{row.p50}</td>
                                            <td className="px-6 py-4 text-gray-400">{row.p75}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'good' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' :
                                                        row.status === 'warning' ? 'bg-[#FFB800]/10 text-[#FFB800]' :
                                                            'bg-[#FF4444]/10 text-[#FF4444]'
                                                    }`}>
                                                    {row.status === 'good' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                    {row.status === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
                                                    {row.status === 'danger' && <AlertTriangle className="w-3.5 h-3.5" />}
                                                    {row.position}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 ${row.status === 'good' ? 'text-gray-300' : 'text-[#FF4444]'}`}>
                                                {row.gap}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recommendations Sidebar */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Info className="w-5 h-5 text-[#00E5A0]" /> Recommendations
                        </h3>

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-[#FF4444]/10 rounded-lg shrink-0">
                                    <AlertTriangle className="w-5 h-5 text-[#FF4444]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white mb-1">Retention Risk</h4>
                                    <p className="text-sm text-gray-400">3 roles are currently below P25 of market rate, leading to high potential attrition.</p>
                                </div>
                            </div>

                            <div className="h-px bg-[#1A2A3A]"></div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-[#FFB800]/10 rounded-lg shrink-0">
                                    <PieChart className="w-5 h-5 text-[#FFB800]" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white mb-1">Budget Required</h4>
                                    <div className="text-xl font-bold mt-1">₹42,00,000<span className="text-sm font-normal text-gray-400">/year</span></div>
                                    <p className="text-sm text-gray-400 mt-1">Recommended budget to bring all below-market roles to P50 (median) level.</p>
                                </div>
                            </div>

                            <div className="h-px bg-[#1A2A3A]"></div>

                            <div>
                                <h4 className="font-medium text-white mb-3">Priority Roles to Fix</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between group cursor-pointer hover:bg-[#1A2A3A]/50 p-2 -mx-2 rounded-lg transition-colors">
                                        <span className="text-sm text-gray-300">Data Analyst</span>
                                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                                    </div>
                                    <div className="flex items-center justify-between group cursor-pointer hover:bg-[#1A2A3A]/50 p-2 -mx-2 rounded-lg transition-colors">
                                        <span className="text-sm text-gray-300">HR BP</span>
                                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                                    </div>
                                    <div className="flex items-center justify-between group cursor-pointer hover:bg-[#1A2A3A]/50 p-2 -mx-2 rounded-lg transition-colors">
                                        <span className="text-sm text-gray-300">Sales Exec</span>
                                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-4 bg-[#1A2A3A] hover:bg-[#1A2A3A]/80 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                                Initialize Salary Revision
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
