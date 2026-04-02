"use client";
import React, { useState } from 'react';
import { Settings2, ArrowLeft, Download, Plus, Play, Columns, Save } from 'lucide-react';
import Link from 'next/link';

export default function CustomReportScreen() {
    const [fields, setFields] = useState<string[]>(['Employee ID', 'Full Name', 'Department', 'Net Payable', 'Bank Account Number', 'IFSC Code']);

    const ALL_FIELDS = [
        'Employee ID', 'Full Name', 'Department', 'Designation', 'Location', 'Date of Joining', 'PAN Card', 'UAN Number',
        'Basic Salary', 'HRA', 'Special Allowance', 'Gross Earnings', 'PF Employee', 'PF Employer', 'Professional Tax', 'TDS',
        'Total Deductions', 'Net Payable', 'Bank Account Number', 'IFSC Code', 'Bank Name'
    ];

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <Link href="/payroll/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Payroll Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Settings2 size={22} className="text-purple-400" /> Custom Report Builder</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Select specific payroll fields across all employees to generate tailored CSV output</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <Save size={16} /> Save Template
                    </button>
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                        <Download size={16} /> Generate Excel (342 Rows)
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 items-start">
                {/* Field Selector */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col h-[600px]">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A]">
                        <h3 className="text-white font-bold text-sm flex items-center gap-2"><Columns size={16} className="text-[#556677]" /> Available Fields</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                        {ALL_FIELDS.filter(f => !fields.includes(f)).map(f => (
                            <button key={f} onClick={() => setFields(prev => [...prev, f])}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#8899AA] hover:bg-[#131B2B] hover:text-white transition-colors flex items-center justify-between group">
                                {f}
                                <Plus size={14} className="opacity-0 group-hover:opacity-100 text-emerald-400" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected Fields Preview */}
                <div className="md:col-span-3 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold text-sm mb-4">Selected Columns (Order preserved in Excel)</h3>
                        <div className="flex flex-wrap gap-2">
                            {fields.map(f => (
                                <div key={f} className="bg-purple-500/10 border border-purple-500/30 text-purple-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                                    {f}
                                    <button onClick={() => setFields(prev => prev.filter(x => x !== f))} className="hover:text-white transition-colors">×</button>
                                </div>
                            ))}
                            <div className="text-[#556677] text-xs flex items-center h-7 px-2">Drag to reorder functionality enabled</div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                            <h3 className="text-white font-bold text-sm">Data Preview (Top 2 Rows)</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm whitespace-nowrap">
                                <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                                    <tr>
                                        {fields.map(f => <th key={f} className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">{f}</th>)}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A] text-white">
                                    <tr className="hover:bg-[#131B2B]">
                                        {fields.map(f => <td key={f} className="px-5 py-3 opacity-60">Sample Data</td>)}
                                    </tr>
                                    <tr className="hover:bg-[#131B2B]">
                                        {fields.map(f => <td key={f} className="px-5 py-3 opacity-60">Sample Data</td>)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
