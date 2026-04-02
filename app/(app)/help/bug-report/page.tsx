"use client";
import React, { useState } from 'react';
import { Bug, ArrowLeft, Upload, Paperclip, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const SEVERITIES = ['Critical — Platform down', 'High — Major feature broken', 'Medium — Some disruption', 'Low — Minor UI issue'];
const MODULES_LIST = ['Payroll', 'Employees', 'Leave & Attendance', 'Compliance', 'Recruitment', 'Performance', 'Reports', 'Settings', 'Integrations', 'Other'];

const RECENT_BUGS = [
    { id: 'BUG-442', title: 'PF challan download returns 500 error', severity: 'High', status: 'In Progress', date: '09 Mar 2026' },
    { id: 'BUG-438', title: 'Salary revision not updating in payslip', severity: 'Critical', status: 'Resolved', date: '08 Mar 2026' },
    { id: 'BUG-431', title: 'Leave balance showing negative after LOP', severity: 'Medium', status: 'Open', date: '07 Mar 2026' },
];

export default function BugReportScreen() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ title: '', module: 'Payroll', severity: SEVERITIES[1], steps: '', expected: '', actual: '' });

    if (submitted) return (
        <div className="min-h-screen p-6 flex items-center justify-center">
            <div className="text-center max-w-md">
                <CheckCircle2 size={56} className="mx-auto mb-4 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white mb-2">Bug Report Submitted!</h2>
                <p className="text-[#8899AA] mb-6">We{"'"}ll investigate and update you via email. Avg resolution time for High severity: <span className="text-white font-semibold">4 hours</span>.</p>
                <button onClick={() => setSubmitted(false)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">Submit Another</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Help Center</Link>
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Bug size={22} className="text-red-400" /> Report a Bug</h1>
                <p className="text-[#8899AA] text-sm mt-1">Help us fix issues faster by providing detailed reproduction steps.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Form */}
                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 space-y-5">
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Bug Title *</label>
                        <input type="text" placeholder="Brief description of the issue" value={form.title} onChange={e => setForm(v => ({ ...v, title: e.target.value }))}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-red-500 outline-none transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Module *</label>
                            <select value={form.module} onChange={e => setForm(v => ({ ...v, module: e.target.value }))}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-red-500 outline-none">
                                {MODULES_LIST.map(m => <option key={m}>{m}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Severity *</label>
                            <select value={form.severity} onChange={e => setForm(v => ({ ...v, severity: e.target.value }))}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-red-500 outline-none">
                                {SEVERITIES.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Steps to Reproduce *</label>
                        <textarea placeholder="1. Go to Payroll → Run Payroll&#10;2. Click 'Process'&#10;3. Error appears" value={form.steps} onChange={e => setForm(v => ({ ...v, steps: e.target.value }))} rows={4}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-red-500 outline-none resize-none transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Expected Behavior</label>
                            <textarea placeholder="What should happen?" value={form.expected} onChange={e => setForm(v => ({ ...v, expected: e.target.value }))} rows={3}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-red-500 outline-none resize-none transition-colors" />
                        </div>
                        <div>
                            <label className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1.5 block">Actual Behavior</label>
                            <textarea placeholder="What actually happens?" value={form.actual} onChange={e => setForm(v => ({ ...v, actual: e.target.value }))} rows={3}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-red-500 outline-none resize-none transition-colors" />
                        </div>
                    </div>
                    <div className="border-2 border-dashed border-[#2A3A4A] rounded-xl p-6 text-center hover:border-red-500/50 transition-colors cursor-pointer">
                        <Upload size={24} className="mx-auto mb-2 text-[#445566]" />
                        <div className="text-[#8899AA] text-sm font-semibold">Drop screenshots or screen recording here</div>
                        <div className="text-[#445566] text-xs mt-1">PNG, JPG, MP4 — Max 50MB</div>
                    </div>
                    <button onClick={() => setSubmitted(true)} disabled={!form.title}
                        className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                        Submit Bug Report
                    </button>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-sm"><AlertTriangle size={16} /> Before reporting</div>
                        <ul className="text-[#AABBCC] text-xs space-y-1.5">
                            <li>• Clear browser cache and retry</li>
                            <li>• Try in incognito mode</li>
                            <li>• Check if the issue is for all users or just you</li>
                            <li>• Search existing bug reports first</li>
                        </ul>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] text-white font-bold text-sm">Recent Reports</div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {RECENT_BUGS.map(b => (
                                <div key={b.id} className="p-3">
                                    <div className="text-white text-xs font-semibold">{b.title}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[#556677] text-[10px]">{b.id}</span>
                                        <span className={`text-[10px] font-bold ${b.status === 'Resolved' ? 'text-emerald-400' : b.status === 'In Progress' ? 'text-blue-400' : 'text-amber-400'}`}>{b.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
