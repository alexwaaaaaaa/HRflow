"use client";

import React, { useState } from 'react';
import { FileText, Plus, Search, Eye, Copy, MoreVertical, Clock, CheckCircle2, BarChart3 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function FormBuilderPage() {
    const forms = [
        { id: 'FRM-001', name: 'Exit Interview Form', type: 'Survey', fields: 15, responses: 42, status: 'Active', lastResponse: '3 days ago' },
        { id: 'FRM-002', name: 'Probation Confirmation Checklist', type: 'Checklist', fields: 8, responses: 120, status: 'Active', lastResponse: '1 hr ago' },
        { id: 'FRM-003', name: 'Employee Satisfaction Survey Q4', type: 'Survey', fields: 22, responses: 198, status: 'Closed', lastResponse: 'Dec 31, 2023' },
        { id: 'FRM-004', name: 'IT Asset Handover Form', type: 'Submission', fields: 10, responses: 0, status: 'Draft', lastResponse: 'Never' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <FileText size={28} className="text-indigo-400" /> Form Builder
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Design custom forms for surveys, checklists, and data collection. Embed them in workflows or share via link.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                    <Plus size={16} className="mr-2" /> Create Form
                </Button>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] bg-[#131B2B]">
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Form Name</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Type</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Fields</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Responses</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider w-16"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {forms.map((form) => (
                                <tr key={form.id} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors group">
                                    <td className="p-4">
                                        <div className="text-white font-medium text-sm">{form.name}</div>
                                        <div className="text-[10px] text-[#445566] font-mono">{form.id}</div>
                                    </td>
                                    <td className="p-4"><span className="text-sm text-[#8899AA]">{form.type}</span></td>
                                    <td className="p-4"><span className="text-sm text-white">{form.fields}</span></td>
                                    <td className="p-4">
                                        <Link href="/settings/forms/responses" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">{form.responses}</Link>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded text-xs font-medium border ${form.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                form.status === 'Closed' ? 'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]' :
                                                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            }`}>{form.status}</span>
                                    </td>
                                    <td className="p-4">
                                        <button className="text-[#445566] hover:text-white opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
