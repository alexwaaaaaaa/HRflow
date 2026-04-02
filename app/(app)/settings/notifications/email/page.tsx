"use client";

import React from 'react';
import { Mail, Save, ToggleRight, ToggleLeft, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function EmailNotificationSetupPage() {
    const emailEvents = [
        { event: 'Leave Approved', enabled: true, template: 'TPL-LV-01' },
        { event: 'Leave Rejected', enabled: true, template: 'TPL-LV-02' },
        { event: 'Payslip Generated', enabled: true, template: 'TPL-PAY-01' },
        { event: 'Performance Review Published', enabled: false, template: 'TPL-PERF-01' },
        { event: 'New Hire Welcome', enabled: true, template: 'TPL-ONB-01' },
        { event: 'Birthday Wish', enabled: true, template: 'TPL-ENG-01' },
        { event: 'Work Anniversary', enabled: true, template: 'TPL-ENG-02' },
        { event: 'Password Reset', enabled: true, template: 'TPL-SYS-01' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
            <Link href="/settings/notifications" className="text-[#8899AA] hover:text-white text-sm mb-6 inline-block">&larr; Back to Notifications</Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Mail size={28} className="text-indigo-400" /> Email Notification Setup
                    </h1>
                    <p className="text-[#8899AA] text-sm">Map system events to email templates and control delivery.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                    <Save size={16} className="mr-2" /> Save
                </Button>
            </div>

            {/* SMTP Config */}
            <div className="bg-[#131B2B] border border-[#1A2A3A] rounded-xl p-5 mb-8">
                <h3 className="text-white font-medium text-sm mb-3">SMTP Configuration</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Provider</div><div className="text-white">Amazon SES</div></div>
                    <div><div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">From Address</div><div className="text-white">noreply@kaarya.io</div></div>
                    <div><div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Daily Limit</div><div className="text-white">50,000</div></div>
                    <div><div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Status</div><div className="text-emerald-400 font-medium">Connected</div></div>
                </div>
            </div>

            {/* Event Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#1A2A3A] bg-[#131B2B]">
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">System Event</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Template</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-center">Enabled</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emailEvents.map((ev, i) => (
                            <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors">
                                <td className="p-4 text-sm text-white font-medium">{ev.event}</td>
                                <td className="p-4 text-xs text-[#8899AA] font-mono">{ev.template}</td>
                                <td className="p-4 text-center">
                                    {ev.enabled ? <ToggleRight size={24} className="text-indigo-400 mx-auto cursor-pointer" /> : <ToggleLeft size={24} className="text-[#2A3A4A] mx-auto cursor-pointer" />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
