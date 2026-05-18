"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Zap, ArrowLeft, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
    { num: 1, title: 'Company Setup', desc: 'Add your company details, GST, PAN, and registered address.', done: true, link: '/settings/company' },
    { num: 2, title: 'Add Employees', desc: 'Import or manually add your team — personal info, job details, CTC.', done: true, link: '/employees/add' },
    { num: 3, title: 'Configure Salary Structure', desc: 'Set up CTC components: Basic, HRA, LTA, Special Allowance.', done: true, link: '/payroll/structure' },
    { num: 4, title: 'Set Up Compliance', desc: 'Configure PF, ESI, PT deductions for your state and employee count.', done: false, link: '/compliance/setup' },
    { num: 5, title: 'Run Your First Payroll', desc: 'Verify attendance, apply leaves, review deductions, and process payroll.', done: false, link: '/payroll/run' },
    { num: 6, title: 'Download Payslips', desc: 'Generate, preview, and share payslips with employees via email or portal.', done: false, link: '/payroll/payslips' },
];

const TIPS = [
    'Upload your company logo under Settings → Branding',
    'Enable 2FA for all admin accounts under Security Settings',
    'Connect your biometric device for automated attendance',
    'Set up email notifications for leave approvals and payroll events',
];

export default function GettingStartedScreen() {
    const [completed, setCompleted] = useState<number[]>([1, 2, 3]);
    const pct = Math.round(completed.length / STEPS.length * 100);

    return (
        <Page
            title="Getting Started Guide"
            subtitle="Follow these 6 steps to get HRFlow fully set up for your company"
            breadcrumbs={[{ label: "Help", href: "/help" }, { label: "Getting Started" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold transition-colors flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Help Center</Link>
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Zap size={22} className="text-amber-400" /> Getting Started Guide</h1>
                <p className="text-[#8899AA] text-sm mt-1">Follow these 6 steps to get HRFlow fully set up for your company</p>
            </div>

            {/* Progress */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-bold">Setup Progress</span>
                    <span className="text-amber-400 font-black text-lg">{pct}%</span>
                </div>
                <div className="h-3 bg-[#1A2A3A] rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <div className="text-[#556677] text-xs">{completed.length} of {STEPS.length} steps completed</div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
                {STEPS.map((step) => {
                    const done = completed.includes(step.num);
                    return (


                        <div key={step.num} className={`bg-[#0A1420] border rounded-2xl p-5 flex items-start gap-4 transition-all ${done ? 'border-emerald-500/30 opacity-70' : 'border-[#1A2A3A] hover:border-amber-500/30'}`}>
                            <button onClick={() => setCompleted(p => done ? p.filter(x => x !== step.num) : [...p, step.num])}
                                className="mt-0.5 shrink-0 transition-all hover:scale-110">
                                {done
                                    ? <CheckCircle2 size={24} className="text-emerald-400" />
                                    : <Circle size={24} className="text-[#2A3A4A]" />}
                            </button>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#556677] text-xs font-bold">Step {step.num}</span>
                                    {!done && <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">Current</span>}
                                </div>
                                <div className={`font-bold text-sm mt-0.5 ${done ? 'line-through text-[#556677]' : 'text-white'}`}>{step.title}</div>
                                <p className="text-[#8899AA] text-xs mt-1">{step.desc}</p>
                            </div>
                            {!done && (
                                <Link href={step.link} className="shrink-0 flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3 py-2 rounded-xl transition-colors whitespace-nowrap">
                                    Go <ChevronRight size={12} />
                                </Link>
                            )}
                        </div>
                    
        
);
                })}
            </div>

            {/* Pro Tips */}
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5">
                <h3 className="font-bold text-indigo-400 mb-3 text-sm">💡 Pro Tips</h3>
                <ul className="space-y-2">
                    {TIPS.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#AABBCC]">
                            <span className="text-indigo-400 shrink-0 mt-0.5">•</span>
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    
        </Page>
    );
}
