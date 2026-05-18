"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import {
    Target, Plus, Calendar, Users, MessageCircle, TrendingUp
} from 'lucide-react';

const ACTION_PLANS = [
    {
        id: 1,
        title: "Improve Work-Life Balance in Sales",
        driver: "Work-Life Balance",
        owner: "David Rodriguez",
        dueDate: "Dec 31, 2023",
        status: "In Progress",
        progress: 45,
        tasks: 5,
        completed: 2
    },
    {
        id: 2,
        title: "Revamp Engineering Onboarding",
        driver: "Role Clarity",
        owner: "Jessica Kim",
        dueDate: "Nov 15, 2023",
        status: "At Risk",
        progress: 20,
        tasks: 8,
        completed: 1
    },
    {
        id: 3,
        title: "Quarterly Manager Training Series",
        driver: "Manager Support",
        owner: "Emma Wilson",
        dueDate: "Oct 30, 2023",
        status: "On Track",
        progress: 75,
        tasks: 4,
        completed: 3
    },
];

export default function ActionPlanningScreen() {
    const [activeTab, setActiveTab] = useState('active');

    return (
        <Page
            title="Action Planning"
            subtitle="Turn survey feedback into measurable changes and track their impact."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Surveys", href: "/engagement/surveys" }, { label: "Action Planning" }]}
            maxWidth="1200px"
        >

        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Target size={32} className="text-[#FFB020]" /> Action Planning
                    </h1>
                    <p className="text-[#8899AA]">Turn survey feedback into measurable changes and track their impact.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-[#FFB020] text-[#0A1420] font-bold rounded-xl hover:bg-[#eacc41] transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(255,176,32,0.2)]">
                        <Plus size={18} /> New Action Plan
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 border-b border-[#2A3A4A] mb-8 pb-4">
                <button onClick={() => setActiveTab('active')} className={`font-bold transition-colors ${activeTab === 'active' ? 'text-[#FFB020]' : 'text-[#8899AA] hover:text-white'}`}>
                    Active Plans (3)
                </button>
                <button onClick={() => setActiveTab('completed')} className={`font-bold transition-colors ${activeTab === 'completed' ? 'text-[#FFB020]' : 'text-[#8899AA] hover:text-white'}`}>
                    Completed (12)
                </button>
                <button onClick={() => setActiveTab('drafts')} className={`font-bold transition-colors ${activeTab === 'drafts' ? 'text-[#FFB020]' : 'text-[#8899AA] hover:text-white'}`}>
                    Drafts / Suggested (5)
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="col-span-1 lg:col-span-2 space-y-6">

                    {ACTION_PLANS.map(plan => (
                        <div key={plan.id} className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-[#FFB020]/30 transition-colors cursor-pointer">

                            {/* Status Indicator Bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${plan.status === 'On Track' ? 'bg-[#00E5A0]' : plan.status === 'At Risk' ? 'bg-[#FF4444]' : 'bg-[#33E6FF]'}`}></div>

                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 pl-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-[#FFB020] transition-colors">{plan.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#8899AA]">
                                        <span className="flex items-center gap-1.5 bg-[#1A2A3A] px-2.5 py-1 rounded-lg border border-[#2A3A4A]"><Target size={14} className="text-[#FFB020]" /> {plan.driver}</span>
                                        <span className="flex items-center gap-1.5"><Users size={14} /> Owner: <strong className="text-white">{plan.owner}</strong></span>
                                        <span className="flex items-center gap-1.5"><Calendar size={14} /> Due: <strong className="text-white">{plan.dueDate}</strong></span>
                                    </div>
                                </div>
                                <span className={`shrink-0 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${plan.status === 'On Track' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : plan.status === 'At Risk' ? 'bg-[#FF4444]/10 text-[#FF4444]' : 'bg-[#33E6FF]/10 text-[#33E6FF]'}`}>
                                    {plan.status}
                                </span>
                            </div>

                            <div className="pl-4 mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-[#8899AA] uppercase tracking-wider">{plan.completed} of {plan.tasks} Tasks Completed</span>
                                    <span className="text-sm font-black text-white">{plan.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${plan.status === 'On Track' ? 'bg-[#00E5A0]' : plan.status === 'At Risk' ? 'bg-[#FF4444]' : 'bg-[#33E6FF]'}`}
                                        style={{ width: `${plan.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="pl-4 mt-5 pt-4 border-t border-[#1A2A3A] flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1.5 text-sm text-[#8899AA] hover:text-white transition-colors"><MessageCircle size={16} /> 4</span>
                                </div>
                                <button className="text-sm font-bold text-[#FFB020] hover:underline">View Details →</button>
                            </div>

                        </div>
                    ))}

                </div>

                {/* Sidebar stats & Suggestions */}
                <div className="col-span-1 space-y-6">

                    {/* Suggested Plans */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] border-dashed rounded-3xl p-6 shadow-xl relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <TrendingUp size={64} className="text-[#33E6FF]" />
                        </div>
                        <h3 className="text-white font-bold mb-2 flex items-center gap-2 relative z-10">
                            <TrendingUp size={18} className="text-[#33E6FF]" /> AI Suggested Plans
                        </h3>
                        <p className="text-sm text-[#8899AA] mb-6 relative z-10">Based on recent survey results, we recommend focusing on these areas:</p>

                        <div className="space-y-4 relative z-10">
                            <div className="bg-[#152336] p-4 rounded-xl border border-[#33E6FF]/30 hover:border-[#33E6FF] transition-colors cursor-pointer group">
                                <p className="text-sm font-bold text-white group-hover:text-[#33E6FF] transition-colors mb-1">Focus on Career Growth in CS</p>
                                <p className="text-xs text-[#8899AA] line-clamp-2 mb-3">Customer Success scores dropped 15 points in 'Career Growth'. Consider rolling out mentorship programs.</p>
                                <button className="text-xs font-bold text-[#0A1420] bg-[#33E6FF] px-3 py-1.5 rounded-lg w-full hover:bg-[#29b8cc] transition-colors">Draft Plan</button>
                            </div>

                            <div className="bg-[#152336] p-4 rounded-xl border border-[#2A3A4A] hover:border-[#33E6FF]/50 transition-colors cursor-pointer group">
                                <p className="text-sm font-bold text-white group-hover:text-white transition-colors mb-1">Address Burnout overall</p>
                                <p className="text-xs text-[#8899AA] line-clamp-2 mb-3">Overall 'Work-Life Balance' is trending downwards. Suggestion: Review PTO policies.</p>
                                <button className="text-xs font-bold text-[#CCDDEE] bg-[#1A2A3A] border border-[#2A3A4A] px-3 py-1.5 rounded-lg w-full hover:bg-[#2A3A4A] transition-colors hover:text-white">Review Data</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    
        </Page>
    );
}
