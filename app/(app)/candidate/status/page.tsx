"use client";
import React from 'react';
import { Target, Calendar, CheckCircle2, Clock, XCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type TimelineStep = { label: string; done: boolean; date?: string; active?: boolean; rejected?: boolean; };

export default function CandidateStatusScreen() {
    const APPS = [
        {
            role: 'Senior Frontend Engineer', req: 'JB001', date: 'Oct 24, 2025',
            status: 'Interviewing', step: 3, totalSteps: 5,
            active: true, timeline: [
                { label: 'Applied', done: true, date: 'Oct 24' },
                { label: 'Recruiter Screen', done: true, date: 'Oct 28' },
                { label: 'Technical Interview', done: true, date: 'Nov 02' },
                { label: 'Onsite Loop', done: false, active: true, date: 'Pending Scheduling' },
                { label: 'Offer', done: false }
            ] as TimelineStep[]
        },
        {
            role: 'Product Manager', req: 'JB045', date: 'Jul 12, 2025',
            status: 'Not Selected', step: 2, totalSteps: 5,
            active: false, timeline: [
                { label: 'Applied', done: true, date: 'Jul 12' },
                { label: 'Recruiter Screen', done: true, date: 'Jul 15' },
                { label: 'Technical Interview', done: false, rejected: true, date: 'Jul 22' },
            ] as TimelineStep[]
        }
    ];

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Target size={24} className="text-indigo-400" /> Track Applications</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Real-time status updates on all your job applications.</p>
                </div>
            </div>

            <div className="space-y-6">
                {APPS.map((app, i) => (
                    <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">

                        <div className="p-6 pb-0 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">{app.role}</h2>
                                <div className="flex gap-4 text-sm text-[#8899AA] font-medium">
                                    <span>Req: {app.req}</span>
                                    <span>Applied: {app.date}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${app.active ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {app.active ? <Clock size={12} /> : <XCircle size={12} />}
                                    {app.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 pb-10">
                            <div className="relative">
                                {/* Progress Line */}
                                <div className="absolute top-[15px] left-0 w-full h-[2px] bg-[#1A2A3A]"></div>
                                <div className="absolute top-[15px] left-0 h-[2px] bg-indigo-500 transition-all" style={{ width: `${((app.step - 1) / (app.timeline.length - 1)) * 100}%` }}></div>

                                <div className="flex justify-between relative z-10">
                                    {app.timeline.map((step, idx) => (
                                        <div key={idx} className="flex flex-col items-center w-32 -ml-16 first:ml-0 last:-mr-16 first:w-auto last:w-auto">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 transition-colors
                           ${step.done ? (step.rejected ? 'bg-red-500 text-white' : 'bg-indigo-500 text-white') :
                                                    step.active ? 'bg-indigo-500/20 border-2 border-indigo-400 text-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.4)]' :
                                                        'bg-[#131B2B] border-2 border-[#2A3A4A] text-[#556677]'}`}>
                                                {step.rejected ? <XCircle size={16} /> : step.done ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                                            </div>
                                            <div className={`text-center text-xs font-bold ${step.active ? 'text-indigo-400' : step.done ? 'text-white' : 'text-[#8899AA]'}`}>{step.label}</div>
                                            {step.date && <div className="text-[#556677] text-[10px] mt-1 text-center font-medium">{step.date}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {app.active && (
                            <div className="bg-[#131B2B] border-t border-[#1A2A3A] p-4 px-6 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-sm text-[#AABBCC]">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-400"><Calendar size={16} /></span>
                                    You have an action required: Please schedule your Onsite Loop.
                                </div>
                                <Link href="/candidate/interview" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                                    Schedule Now <ChevronRight size={16} />
                                </Link>
                            </div>
                        )}

                        {!app.active && (
                            <div className="bg-[#131B2B] border-t border-[#1A2A3A] p-4 px-6 flex items-center gap-3 text-sm text-[#8899AA]">
                                We decided to move forward with other candidates. Click <Link href="/candidate/jobs" className="text-white underline">here</Link> to explore other roles.
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}
