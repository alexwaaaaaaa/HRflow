"use client";
import React from 'react';
import { CalendarClock, Plus, X } from 'lucide-react';

export default function ReminderSetupPage() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <CalendarClock className="text-indigo-500" />
                        Automated Reminders
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Setup multi-stage nudges for pending approvals and tasks.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex gap-2 items-center">
                    <Plus size={16} /> New Rule
                </button>
            </div>

            <div className="grid gap-6">
                {[
                    { title: 'Manager Leave Approvals', active: true, stages: ['24 hrs before', '12 hrs before', 'Escalate at 0 hrs'] },
                    { title: 'Incomplete Timesheets', active: true, stages: ['Every Friday 5PM', 'Monday 9AM'] },
                    { title: 'Candidate Interview Feedback', active: false, stages: ['1 hr post-interview', '24 hrs post-interview'] },
                ].map((rule, i) => (
                    <div key={i} className={`bg-[#0A1420] border ${rule.active ? 'border-indigo-500/30' : 'border-[#1A2A3A] opacity-60'} rounded-xl p-6 relative`}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-white">{rule.title}</h3>
                            <div className="relative">
                                <input type="checkbox" className="sr-only peer" defaultChecked={rule.active} />
                                <div className="w-11 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 border border-[#2A3A4A] transition-colors"></div>
                            </div>
                        </div>

                        <h4 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-3">Escalation Stages</h4>
                        <div className="flex flex-wrap gap-2">
                            {rule.stages.map((stage, j) => (
                                <div key={j} className="flex items-center gap-2 bg-[#060D1A] border border-[#1A2A3A] px-3 py-1.5 rounded-lg text-sm text-[#CCDDEE]">
                                    <span className="w-5 h-5 rounded-full bg-[#131B2B] flex items-center justify-center text-xs font-bold font-mono text-[#8899AA] border border-[#2A3A4A]">{j + 1}</span>
                                    {stage}
                                    <button className="text-[#556677] hover:text-rose-400 ml-1"><X size={14} /></button>
                                </div>
                            ))}
                            <button className="flex items-center gap-2 bg-[#131B2B] hover:bg-[#1A2A3A] hover:text-white border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-sm text-[#8899AA] transition-colors border-dashed">
                                <Plus size={14} /> Add Stage
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
