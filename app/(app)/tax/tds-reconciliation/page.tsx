"use client";

import React, { useState } from 'react';
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    Activity, Info, FileText, Upload, AlertTriangle,
    ArrowRight, History, Download, Calculator, FileCheck, CheckCircle2, BarChart2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';

export default function TDSReconciliationScreen() {

    const chartData = [
        { month: 'Apr', deducted: 3.8, deposited: 3.8, challan: 3.8 },
        { month: 'May', deducted: 3.85, deposited: 3.85, challan: 3.85 },
        { month: 'Jun', deducted: 3.9, deposited: 3.9, challan: 3.9 },
        { month: 'Jul', deducted: 3.9, deposited: 3.9, challan: 3.9 },
        { month: 'Aug', deducted: 4.1, deposited: 4.1, challan: 4.1 },
        { month: 'Sep', deducted: 4.0, deposited: 4.0, challan: 4.0 },
        { month: 'Oct', deducted: 3.95, deposited: 3.95, challan: 3.95 },
        { month: 'Nov', deducted: 4.1, deposited: 4.1, challan: 4.1 },
        { month: 'Dec', deducted: 4.25, deposited: 4.25, challan: 4.25 },
        { month: 'Jan', deducted: 4.15, deposited: 4.1, challan: 4.1 }, // Variance!
        { month: 'Feb', deducted: 4.5, deposited: 0, challan: 0 },
        { month: 'Mar', deducted: 0, deposited: 0, challan: 0 },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
                            <Activity size={24} className="mr-3 text-[#0066FF]" />
                            TDS Overall Reconciliation
                        </h1>
                        <p className="text-sm text-[#8899AA]">Reconcile TDS deducted in payroll vs deposited in bank vs registered in TRACES challans.</p>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="p-5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl">
                        <div className="text-xs text-[#8899AA] font-semibold mb-1 uppercase tracking-wider">TDS Booked (Payroll)</div>
                        <div className="text-2xl font-black text-white">₹39,95,300</div>
                        <div className="text-[10px] text-[#556677] mt-1">YTD Deducted from Salary</div>
                    </div>
                    <div className="p-5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl">
                        <div className="text-xs text-[#8899AA] font-semibold mb-1 uppercase tracking-wider">TDS Deposited (Bank)</div>
                        <div className="text-2xl font-black text-[#0066FF]">₹39,90,300</div>
                        <div className="text-[10px] text-[#556677] mt-1">Total Paid via NetBanking</div>
                    </div>
                    <div className="p-5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl">
                        <div className="text-xs text-[#8899AA] font-semibold mb-1 uppercase tracking-wider">TRACES Challan Auth</div>
                        <div className="text-2xl font-black text-[#00E5A0]">₹39,90,300</div>
                        <div className="text-[10px] text-[#556677] mt-1">Verified on IT Portal</div>
                    </div>

                    <div className="p-5 bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-xl shadow-[0_0_15px_rgba(255,68,68,0.1)]">
                        <div className="text-xs text-[#FF4444] font-semibold mb-1 uppercase tracking-wider flex items-center">
                            <AlertTriangle size={14} className="mr-1" /> Unreconciled Variance
                        </div>
                        <div className="text-2xl font-black text-[#FF4444]">₹5,000</div>
                        <div className="text-[10px] text-[#FF4444] mt-1">Action Required for Jan</div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 items-start">

                    {/* Chart Area */}
                    <div className="col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6 shadow-md">
                        <h3 className="text-sm font-bold text-white mb-6 flex items-center">
                            <BarChart2 size={16} className="mr-2 text-[#0066FF]" /> YTD Three-way Matching (in Lakhs)
                        </h3>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-[300px]">
                                <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8899AA', fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8899AA', fontSize: 11 }} />
                                    <RechartsTooltip
                                        cursor={{ fill: '#1A2A3A' }}
                                        contentStyle={{ backgroundColor: '#060B14', borderColor: '#2A3A4A', borderRadius: '8px' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                        labelStyle={{ color: '#8899AA', fontSize: '10px' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#8899AA' }} />
                                    <Bar dataKey="deducted" name="Books" fill="#556677" radius={[2, 2, 0, 0]} />
                                    <Bar dataKey="deposited" name="Bank" fill="#0066FF" radius={[2, 2, 0, 0]} />
                                    <Bar dataKey="challan" name="TRACES" fill="#00E5A0" radius={[2, 2, 0, 0]} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </div>

                    {/* Exceptions List */}
                    <div className="col-span-1 bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-md h-[382px] flex flex-col">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420]">
                            <h3 className="text-sm font-bold text-[#FF4444] flex items-center">
                                <AlertTriangle size={16} className="mr-2" /> Exceptions Detected
                            </h3>
                        </div>
                        <div className="p-0 overflow-y-auto flex-1">

                            {/* Exception 1 */}
                            <div className="p-4 border-b border-[#1A2A3A] hover:bg-[#1A2A3A]/20 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-sm font-bold text-white">Jan 2025 Variance</div>
                                    <span className="bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30 px-2 py-0.5 rounded text-[10px] font-bold">₹5,000 Low</span>
                                </div>
                                <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                                    Booked TDS is ₹4,15,000 but bank deposit shows ₹4,10,000. It seems TDS of employee EMP122 (₹5,000) was recalculated after deposit.
                                </p>
                                <button className="text-xs font-bold text-[#0066FF] hover:underline">View Affected Employee</button>
                            </div>

                            {/* Exception 2 (Resolved) */}
                            <div className="p-4 border-b border-[#1A2A3A] bg-[#00E5A0]/5 opacity-60 grayscale hover:grayscale-0 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-sm font-bold text-slate-300">Dec 2024 Challan Delay</div>
                                    <span className="text-[#00E5A0] flex items-center text-[10px] font-bold uppercase"><CheckCircle2 size={12} className="mr-1" /> Resolved</span>
                                </div>
                                <p className="text-xs text-[#8899AA] leading-relaxed">
                                    Challan update from bank was delayed. Matched successfully on 12 Jan.
                                </p>
                            </div>

                            {/* Empty state padding */}
                            <div className="p-4 flex-1 flex flex-col items-center justify-center text-center opacity-50 pt-8">
                                <FileCheck size={24} className="text-[#8899AA] mb-2" />
                                <div className="text-xs text-[#8899AA]">No other exceptions found for FY 24-25</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
