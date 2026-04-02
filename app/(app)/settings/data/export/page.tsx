"use client";

import React from 'react';
import { Download, FileSpreadsheet, Calendar, Filter, Clock, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function DataExportPage() {
    const exportOptions = [
        { entity: 'Employee Master', description: 'Full employee directory including personal, job, and statutory details.', format: 'CSV / XLSX', lastExport: '1 day ago' },
        { entity: 'Payroll Register', description: 'Monthly payroll details with earnings, deductions, and net pay.', format: 'CSV / XLSX / PDF', lastExport: '3 days ago' },
        { entity: 'Attendance Logs', description: 'Raw attendance punch data with GPS coordinates and device info.', format: 'CSV', lastExport: '1 week ago' },
        { entity: 'Leave Transactions', description: 'All leave applications, approvals, and balance adjustments.', format: 'CSV / XLSX', lastExport: '2 weeks ago' },
        { entity: 'Performance Reviews', description: 'Review cycle data with scores, competency ratings, and feedback.', format: 'XLSX', lastExport: 'Never' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                    <Download size={28} className="text-indigo-400" /> Data Export
                </h1>
                <p className="text-[#8899AA] text-sm max-w-2xl">Download structured data from any Kaarya module. All exports are encrypted and audit-logged.</p>
            </div>

            <div className="space-y-4">
                {exportOptions.map((opt, idx) => (
                    <div key={idx} className="bg-[#0D1928] border border-[#1A2A3A] hover:border-[#2A3A4A] rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors group">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="bg-[#1A2A3A] p-2.5 rounded-xl text-[#8899AA] group-hover:text-indigo-400 transition-colors shrink-0">
                                <FileSpreadsheet size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm mb-1">{opt.entity}</h3>
                                <p className="text-xs text-[#8899AA] leading-relaxed mb-2">{opt.description}</p>
                                <div className="flex items-center gap-4 text-[10px] text-[#445566]">
                                    <span>Format: {opt.format}</span>
                                    <span className="flex items-center gap-1"><Clock size={10} /> Last: {opt.lastExport}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 shrink-0">
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-1.5 flex items-center gap-2">
                                <Calendar size={14} className="text-[#445566]" />
                                <select className="bg-transparent text-white text-xs outline-none appearance-none cursor-pointer">
                                    <option>Last 30 Days</option>
                                    <option>Last 90 Days</option>
                                    <option>All Time</option>
                                </select>
                            </div>
                            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none text-xs h-auto py-2 px-4">
                                <Download size={14} className="mr-1.5" /> Export
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
