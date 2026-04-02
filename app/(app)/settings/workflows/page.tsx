"use client";

import React, { useState } from 'react';
import { GitMerge, Plus, Search, ArrowRight, CheckCircle2, Circle, Clock, MoreVertical, Zap, Play } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function WorkflowBuilderPage() {
    const workflows = [
        { id: 'WF-001', name: 'Standard Leave Approval', trigger: 'Leave Request Created', steps: 3, status: 'Active', runs: '1,245', lastRun: '10 mins ago' },
        { id: 'WF-002', name: 'New Hire Onboarding', trigger: 'Employee Added', steps: 7, status: 'Active', runs: '89', lastRun: '2 days ago' },
        { id: 'WF-003', name: 'Expense Claim (>₹10k)', trigger: 'Expense Submitted (Amount > 10000)', steps: 4, status: 'Active', runs: '312', lastRun: '1 hr ago' },
        { id: 'WF-004', name: 'Exit Clearance', trigger: 'Resignation Approved', steps: 6, status: 'Draft', runs: '0', lastRun: 'Never' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <GitMerge size={28} className="text-indigo-400" /> Workflow Builder
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Design multi-step automated workflows with conditional logic, approvals, and integrations.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                    <Plus size={16} className="mr-2" /> Create Workflow
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                {workflows.map((wf) => (
                    <Link href={`/settings/workflows/${wf.id}`} key={wf.id} className="bg-[#0D1928] border border-[#1A2A3A] hover:border-[#2A3A4A] rounded-2xl p-5 group transition-all hover:shadow-lg block">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-white font-semibold text-sm group-hover:text-indigo-400 transition-colors">{wf.name}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${wf.status === 'Active'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                        }`}>{wf.status}</span>
                                </div>
                                <span className="text-xs text-[#445566] font-mono">{wf.id}</span>
                            </div>
                            <button className="text-[#445566] hover:text-white opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={16} /></button>
                        </div>

                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 mb-4">
                            <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Trigger Event</div>
                            <div className="text-sm text-white flex items-center gap-2"><Zap size={14} className="text-amber-400" /> {wf.trigger}</div>
                        </div>

                        <div className="flex justify-between items-center text-xs text-[#8899AA]">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1"><GitMerge size={12} /> {wf.steps} steps</span>
                                <span className="flex items-center gap-1"><Play size={12} /> {wf.runs} runs</span>
                            </div>
                            <span className="flex items-center gap-1"><Clock size={12} /> {wf.lastRun}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
