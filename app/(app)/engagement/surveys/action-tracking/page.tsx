"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import {
    CheckSquare, Activity, Calendar, Users, CheckCircle2, MoreHorizontal, MessageSquare, ArrowRight, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

const ACTION_PLANS = [
    {
        id: 1,
        title: "Improve Work-Life Balance in Sales",
        driver: "Work-Life Balance",
        owner: "David Rodriguez",
        dueDate: "Dec 31, 2023",
        status: "In Progress",
        progress: 45,
        tasks: [
            { id: 101, title: "Review PTO policy for Sales team", status: "Completed", assignee: "Sarah Connor" },
            { id: 102, title: "Implement 'No Meeting Friday Afternoons'", status: "In Progress", assignee: "David Rodriguez" },
            { id: 103, title: "Manager training on burnout signs", status: "Not Started", assignee: "Emma Wilson" }
        ]
    },
    {
        id: 2,
        title: "Revamp Engineering Onboarding",
        driver: "Role Clarity",
        owner: "Jessica Kim",
        dueDate: "Nov 15, 2023",
        status: "At Risk",
        progress: 20,
        tasks: [
            { id: 201, title: "Define 30-60-90 day expectations standard", status: "Completed", assignee: "Jessica Kim" },
            { id: 202, title: "Create technical documentation index", status: "Not Started", assignee: "Alex Patel" },
            { id: 203, title: "Assign dedicated technical buddies", status: "Not Started", assignee: "Jessica Kim" }
        ]
    }
];

export default function ActionTrackingScreen() {
    const [expandedPlan, setExpandedPlan] = useState<number | null>(1);

    const togglePlan = (id: number) => {
        if (expandedPlan === id) setExpandedPlan(null);
        else setExpandedPlan(id);
    };

    return (
        <Page
            title="Action Tracking"
            subtitle="Monitor the progress of specific tasks within your action plans."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Surveys", href: "/engagement/surveys" }, { label: "Action Tracking" }]}
            maxWidth="1200px"
        >

        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <CheckSquare size={32} className="text-[#00E5A0]" /> Action Tracking
                    </h1>
                    <p className="text-[#8899AA]">Monitor the progress of specific tasks within your action plans.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/engagement/surveys/action-planning" className="px-5 py-2.5 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2 text-sm">
                        <ArrowRight size={16} className="-rotate-180" /> Back to Plans
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="col-span-1 lg:col-span-2 space-y-6">

                    {ACTION_PLANS.map(plan => (
                        <div key={plan.id} className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl shadow-xl overflow-hidden">

                            {/* Plan Header (Clickable) */}
                            <div
                                className="p-6 border-b border-[#1A2A3A] hover:bg-[#152336] transition-colors cursor-pointer flex justify-between items-center group"
                                onClick={() => togglePlan(plan.id)}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#00E5A0] transition-colors">{plan.title}</h3>
                                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${plan.status === 'In Progress' ? 'bg-[#33E6FF]/10 text-[#33E6FF]' : 'bg-[#FF4444]/10 text-[#FF4444]'}`}>
                                            {plan.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#8899AA]">
                                        <span className="flex items-center gap-1.5"><Users size={14} /> Owner: <strong className="text-white">{plan.owner}</strong></span>
                                        <span className="flex items-center gap-1.5"><Calendar size={14} /> Due: <strong className="text-white">{plan.dueDate}</strong></span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-white">{plan.progress}%</span>
                                        <span className="text-xs text-[#8899AA] block">Complete</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tasks List (Expandable) */}
                            {expandedPlan === plan.id && (
                                <div className="p-6 bg-[#0A1420] animate-in slide-in-from-top-2 duration-200">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Tasks ({plan.tasks.length})</h4>
                                        <button className="text-xs font-bold text-[#00E5A0] hover:underline flex items-center gap-1">
                                            + Add Task
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {plan.tasks.map(task => (
                                            <div key={task.id} className="flex items-center justify-between p-4 bg-[#152336] border border-[#2A3A4A] rounded-2xl hover:border-[#445566] transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <button className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${task.status === 'Completed' ? 'bg-[#00E5A0] border-[#00E5A0] text-white' : 'border-[#445566] hover:border-[#00E5A0] text-transparent hover:text-[#00E5A0]/50'}`}>
                                                        <CheckCircle2 size={16} />
                                                    </button>
                                                    <div>
                                                        <p className={`text-sm font-bold transition-colors ${task.status === 'Completed' ? 'text-[#8899AA] line-through' : 'text-white'}`}>
                                                            {task.title}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-[#445566]">{task.assignee}</span>
                                                            {task.status === 'In Progress' && <span className="text-[10px] font-bold text-[#33E6FF] uppercase tracking-wider">• In Progress</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-[#8899AA] hover:text-white hover:bg-[#2A3A4A] rounded-lg transition-colors"><MessageSquare size={16} /></button>
                                                    <button className="p-2 text-[#8899AA] hover:text-white hover:bg-[#2A3A4A] rounded-lg transition-colors"><MoreHorizontal size={16} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}

                </div>

                {/* Sidebar stats */}
                <div className="col-span-1 space-y-6">

                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Activity size={64} className="text-[#00E5A0]" />
                        </div>
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2 relative z-10">
                            <Activity size={18} className="text-[#00E5A0]" /> My Tasks Overview
                        </h3>

                        <div className="space-y-4 relative z-10">
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-sm font-bold text-[#8899AA]">To Do</span>
                                    <span className="text-2xl font-black text-white">4</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#33E6FF]" style={{ width: '40%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-sm font-bold text-[#8899AA]">Overdue</span>
                                    <span className="text-2xl font-black text-[#FF4444]">1</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#FF4444]" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-sm font-bold text-[#8899AA]">Completed</span>
                                    <span className="text-2xl font-black text-[#00E5A0]">12</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00E5A0]" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(255,68,68,0.1)]">
                        <h3 className="text-[#FF4444] font-bold mb-2 flex items-center gap-2">
                            <AlertCircle size={18} /> Attention Required
                        </h3>
                        <p className="text-[#8899AA] text-sm mb-4">
                            The plan <strong className="text-white">Revamp Engineering Onboarding</strong> is marked as At Risk. Progress is stalled at 20%.
                        </p>
                        <button className="w-full py-2.5 bg-[#FF4444] text-white font-bold rounded-xl hover:bg-[#ff2a2a] transition-colors text-sm">
                            Ping Task Owners
                        </button>
                    </div>

                </div>

            </div>
        </div>
    
        </Page>
    );
}
