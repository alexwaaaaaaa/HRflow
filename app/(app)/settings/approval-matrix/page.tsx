"use client";

import React, { useState } from 'react';
import { Sliders, Plus, GitMerge, Search, Filter, ShieldAlert, ArrowRight, UserCheck, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ApprovalMatrixPage() {
    const matrices = [
        {
            id: 'AM-01',
            name: 'Standard Leave Approval',
            description: 'Default 2-step approval for all paid time off requests.',
            trigger: 'Leave Request (Status: Pending)',
            steps: [
                { role: 'Reporting Manager', type: 'Required', timeout: '48 Hrs' },
                { role: 'HR Business Partner', type: 'Required', timeout: '24 Hrs' }
            ],
            status: 'Active'
        },
        {
            id: 'AM-02',
            name: 'Capex Requisition (>$10k)',
            description: 'High-value equipment or software purchase requests.',
            trigger: 'Expense Claim (Amount > $10,000)',
            steps: [
                { role: 'Department Head', type: 'Required', timeout: '72 Hrs' },
                { role: 'Finance Controller', type: 'Required', timeout: '72 Hrs' },
                { role: 'CFO', type: 'Required', timeout: 'No Limit' }
            ],
            status: 'Active'
        },
        {
            id: 'AM-03',
            name: 'Promotion Nomination',
            description: 'Cycle-based or out-of-cycle role upward movements.',
            trigger: 'Job Change Request (Type: Promotion)',
            steps: [
                { role: 'Skip-Level Manager', type: 'Required', timeout: '5 Days' },
                { role: 'Compensation Admin', type: 'Required', timeout: '3 Days' },
            ],
            status: 'Inactive'
        }
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Sliders size={28} className="text-indigo-400" /> Approval Matrices
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Define complex, multi-tier approval routing for specific triggers like leaves, expenses, or job changes.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-indigo-500/50 transition-colors w-64 hidden md:flex">
                        <Search size={16} className="text-[#8899AA]" />
                        <input type="text" placeholder="Search matrices..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" />
                    </div>
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Filter size={16} className="mr-2" /> Filter
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                        <Plus size={16} className="mr-2" /> New Matrix
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {matrices.map((matrix) => (
                    <div key={matrix.id} className="bg-[#0D1928] border border-[#1A2A3A] hover:border-[#2A3A4A] transition-colors rounded-2xl p-6 group relative">
                        {/* Status Badge */}
                        <div className="absolute top-6 right-6 flex items-center gap-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${matrix.status === 'Active'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]'
                                }`}>
                                {matrix.status}
                            </span>
                            <button className="text-[#445566] hover:text-white transition-colors">
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-2">
                                <GitMerge size={20} className="text-indigo-400" />
                                <h3 className="text-lg font-semibold text-white">{matrix.name}</h3>
                                <span className="text-xs text-[#445566] font-mono bg-[#1A2A3A] px-2 py-0.5 rounded">{matrix.id}</span>
                            </div>
                            <p className="text-sm text-[#8899AA] mb-4">{matrix.description}</p>

                            <div className="flex items-center gap-2 mb-6 text-sm">
                                <span className="text-[#445566] font-medium">Trigger Event:</span>
                                <span className="bg-[#131B2B] text-[#c0c6cc] border border-[#2A3A4A] px-2.5 py-1 rounded-lg">
                                    {matrix.trigger}
                                </span>
                            </div>

                            {/* Approval Path Visualization */}
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex items-center overflow-x-auto">
                                <div className="text-xs uppercase tracking-wider font-semibold text-[#8899AA] mr-6 shrink-0 flex items-center gap-1.5">
                                    <UserCheck size={14} /> Workflow Steps:
                                </div>

                                <div className="flex items-center min-w-max">
                                    {matrix.steps.map((step, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className="bg-[#0A1420] border border-indigo-500/30 rounded-lg p-3 w-48 relative shadow-sm">
                                                <div className="absolute -top-2 -right-2 bg-[#1A2A3A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#2A3A4A]">
                                                    {idx + 1}
                                                </div>
                                                <div className="font-medium text-white text-sm mb-1">{step.role}</div>
                                                <div className="flex justify-between items-center text-[10px]">
                                                    <span className="text-indigo-400 font-semibold">{step.type}</span>
                                                    <span className="text-[#8899AA]">SLA: {step.timeout}</span>
                                                </div>
                                            </div>

                                            {idx < matrix.steps.length - 1 && (
                                                <div className="mx-3 text-[#445566]">
                                                    <ArrowRight size={16} />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}

                                    <div className="mx-3 text-emerald-500/50">
                                        <ArrowRight size={16} />
                                    </div>
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm shadow-emerald-500/5">
                                        <ShieldAlert size={14} /> Approved
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State / Help prompt (Optional) */}
            <div className="mt-8 bg-[#1A2A3A] border border-[#2A3A4A] rounded-2xl p-6 text-center shrink-0">
                <p className="text-sm text-[#8899AA]">Need complex parallel approvals or conditional logic based on custom fields?</p>
                <Link href="/settings/workflows" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm mt-2 inline-block">
                    Use the Advanced Workflow Builder &rarr;
                </Link>
            </div>

        </div>
    );
}
