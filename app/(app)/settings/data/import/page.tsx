"use client";

import React, { useState } from 'react';
import { Upload, FileUp, CheckCircle2, AlertTriangle, XCircle, Download, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function DataImportPage() {
    const [dragActive, setDragActive] = useState(false);
    const recentImports = [
        { id: 'IMP-042', file: 'employees_batch_q4.csv', entity: 'Employees', records: 54, status: 'Completed', errors: 0, date: '2 days ago' },
        { id: 'IMP-041', file: 'leave_balances_2024.xlsx', entity: 'Leave Balances', records: 256, status: 'Completed', errors: 3, date: '1 week ago' },
        { id: 'IMP-040', file: 'salary_revisions.csv', entity: 'Payroll', records: 120, status: 'Failed', errors: 120, date: '2 weeks ago' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                    <Upload size={28} className="text-indigo-400" /> Data Import
                </h1>
                <p className="text-[#8899AA] text-sm max-w-2xl">Bulk import employee records, leave balances, and payroll data from CSV or XLSX files.</p>
            </div>

            {/* Upload Zone */}
            <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors mb-8 cursor-pointer ${dragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-[#2A3A4A] hover:border-[#445566] bg-[#0D1928]'
                    }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={() => setDragActive(false)}
            >
                <FileUp size={48} className="text-[#2A3A4A] mx-auto mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">Drop your file here, or <span className="text-indigo-400 underline">browse</span></h3>
                <p className="text-xs text-[#8899AA] max-w-sm mx-auto">Supports .csv, .xlsx, .xls. Maximum 10,000 rows per import. Headers must match the selected entity template.</p>
                <div className="flex justify-center gap-3 mt-6">
                    {['Employees', 'Leave Balances', 'Payroll', 'Attendance'].map(e => (
                        <span key={e} className="bg-[#1A2A3A] text-[#8899AA] border border-[#2A3A4A] px-3 py-1 rounded-lg text-xs cursor-pointer hover:text-white hover:border-indigo-500/30 transition-colors">{e}</span>
                    ))}
                </div>
            </div>

            {/* Recent Imports */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#131B2B]">
                    <h3 className="text-white font-medium">Recent Imports</h3>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#1A2A3A] bg-[#0A1420]/50">
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">File</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Entity</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Records</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">When</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentImports.map((imp) => (
                            <tr key={imp.id} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FileText size={14} className="text-[#8899AA]" />
                                        <span className="text-white font-medium">{imp.file}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-[#8899AA]">{imp.entity}</td>
                                <td className="p-4 text-sm text-white">{imp.records}</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded text-xs font-medium border flex items-center gap-1 w-fit ${imp.status === 'Completed' && imp.errors === 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            imp.status === 'Completed' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                        {imp.status === 'Completed' && imp.errors === 0 && <CheckCircle2 size={12} />}
                                        {imp.status === 'Completed' && imp.errors > 0 && <AlertTriangle size={12} />}
                                        {imp.status === 'Failed' && <XCircle size={12} />}
                                        {imp.status}{imp.errors > 0 ? ` (${imp.errors} errors)` : ''}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-[#8899AA]">{imp.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
