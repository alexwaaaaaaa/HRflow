"use client";

import React from 'react';
import { LayoutGrid, Save, ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ModuleEnableDisablePage() {
    const modules = [
        { name: 'Employee Directory', description: 'Core employee profiles, documents, and org chart.', enabled: true, core: true },
        { name: 'Payroll Engine', description: 'Salary processing, tax calculations, and statutory remittances.', enabled: true, core: true },
        { name: 'Leave Management', description: 'Leave policies, balance tracking, and approval workflows.', enabled: true, core: false },
        { name: 'Attendance & Shifts', description: 'Biometric attendance, shift scheduling, and geo-fencing.', enabled: true, core: false },
        { name: 'Recruitment (ATS)', description: 'Applicant tracking, interview scheduling, and offer management.', enabled: true, core: false },
        { name: 'Performance Reviews', description: 'OKRs, competency assessments, and review cycles.', enabled: true, core: false },
        { name: 'Travel & Expense', description: 'Travel requests, expense claims, and reimbursement processing.', enabled: false, core: false },
        { name: 'Training & LMS', description: 'Course management, skill tracking, and certifications.', enabled: true, core: false },
        { name: 'BGV & Compliance', description: 'Background verification, document management, and digital signing.', enabled: true, core: false },
        { name: 'AI + Chatbot Suite', description: 'AI-powered insights, NL queries, attrition prediction, and HR copilot.', enabled: true, core: false },
        { name: 'Helpdesk & Ticketing', description: 'Employee support tickets, SLA tracking, and knowledge base.', enabled: false, core: false },
        { name: 'Exit & Separation', description: 'Full & final settlement, clearance workflows, and alumni management.', enabled: true, core: false },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <LayoutGrid size={28} className="text-indigo-400" /> Module Manager
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">Enable or disable entire modules for your organization. Disabled modules are hidden from navigation and APIs.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6"><Save size={16} className="mr-2" /> Save Configuration</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {modules.map((mod, idx) => (
                    <div key={idx} className={`bg-[#0D1928] border rounded-2xl p-5 flex flex-col justify-between transition-all ${mod.enabled ? 'border-[#1A2A3A] hover:border-[#2A3A4A]' : 'border-[#1A2A3A] opacity-50 hover:opacity-100'
                        }`}>
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-white font-semibold text-sm">{mod.name}</h3>
                                {mod.core && (
                                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Core</span>
                                )}
                            </div>
                            <p className="text-xs text-[#8899AA] leading-relaxed mb-4">{mod.description}</p>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-[#1A2A3A]">
                            <span className={`text-xs font-medium ${mod.enabled ? 'text-emerald-400' : 'text-[#445566]'}`}>
                                {mod.enabled ? 'Enabled' : 'Disabled'}
                            </span>
                            <button className={`transition-transform hover:scale-110 ${mod.core ? 'opacity-30 cursor-not-allowed' : ''}`} disabled={mod.core}>
                                {mod.enabled
                                    ? <ToggleRight size={28} className="text-indigo-400" />
                                    : <ToggleLeft size={28} className="text-[#2A3A4A]" />
                                }
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center gap-3">
                <AlertTriangle size={18} className="text-amber-400 shrink-0" />
                <p className="text-sm text-amber-200/80"><strong className="text-amber-400">Note:</strong> Core modules (Employee Directory, Payroll) cannot be disabled as they are dependencies for other modules.</p>
            </div>
        </div>
    );
}
