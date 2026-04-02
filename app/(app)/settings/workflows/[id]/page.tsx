"use client";

import React from 'react';
import { GitMerge, ArrowRight, CheckCircle2, Clock, Zap, Users, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function WorkflowDetailPage() {
    const steps = [
        { id: 1, name: 'Trigger: Leave Request Created', type: 'Trigger', icon: Zap, status: 'complete', description: 'Fires when any employee submits a leave application.' },
        { id: 2, name: 'Assign to Reporting Manager', type: 'Approval', icon: Users, status: 'complete', description: 'Routes request to the direct manager for Level 1 approval. SLA: 48 hours.' },
        { id: 3, name: 'Send Notification to Employee', type: 'Action', icon: Mail, status: 'active', description: 'Sends email + push notification to the applicant confirming submission.' },
        { id: 4, name: 'HR Final Review (Optional)', type: 'Condition', icon: ShieldCheck, status: 'pending', description: 'Only triggered if leave duration > 5 days or category is "Sabbatical".' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
            <Link href="/settings/workflows" className="text-[#8899AA] hover:text-white text-sm mb-6 inline-block">&larr; Back to Workflows</Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <GitMerge size={28} className="text-indigo-400" /> Standard Leave Approval
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-[#8899AA]">
                        <span className="font-mono text-xs bg-[#1A2A3A] text-[#8899AA] px-2 py-0.5 rounded">WF-001</span>
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-bold uppercase">Active</span>
                        <span>1,245 runs</span>
                    </div>
                </div>
                <Button variant="secondary" className="border-[#2A3A4A] text-white">Edit Workflow</Button>
            </div>

            {/* Visual Pipeline */}
            <div className="relative pl-8 space-y-0">
                {steps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                        <div key={step.id} className="relative pb-8 last:pb-0">
                            {idx < steps.length - 1 && (
                                <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-[#1A2A3A]"></div>
                            )}
                            <div className="flex items-start gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${step.status === 'complete' ? 'bg-emerald-500/20 border border-emerald-500/30' :
                                        step.status === 'active' ? 'bg-indigo-500/20 border border-indigo-500/30 animate-pulse' :
                                            'bg-[#1A2A3A] border border-[#2A3A4A]'
                                    }`}>
                                    {step.status === 'complete' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Icon size={16} className={step.status === 'active' ? 'text-indigo-400' : 'text-[#445566]'} />}
                                </div>
                                <div className={`flex-1 bg-[#0D1928] border rounded-xl p-4 ${step.status === 'active' ? 'border-indigo-500/30' : 'border-[#1A2A3A]'
                                    }`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-white font-medium text-sm">{step.name}</h3>
                                        <span className="bg-[#1A2A3A] text-[#8899AA] border border-[#2A3A4A] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">{step.type}</span>
                                    </div>
                                    <p className="text-xs text-[#8899AA] leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
