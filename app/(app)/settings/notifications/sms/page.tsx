"use client";

import React from 'react';
import { Smartphone, Save, ToggleRight, ToggleLeft, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function SMSNotificationSetupPage() {
    const smsEvents = [
        { event: 'OTP — Login Verification', enabled: true, provider: 'Twilio' },
        { event: 'Leave Approved (SMS Alert)', enabled: false, provider: 'MSG91' },
        { event: 'Payslip Ready', enabled: true, provider: 'MSG91' },
        { event: 'Emergency Attendance Alert', enabled: true, provider: 'Twilio' },
        { event: 'Password Reset OTP', enabled: true, provider: 'Twilio' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
            <Link href="/settings/notifications" className="text-[#8899AA] hover:text-white text-sm mb-6 inline-block">&larr; Back to Notifications</Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Smartphone size={28} className="text-amber-400" /> SMS Notification Setup
                    </h1>
                    <p className="text-[#8899AA] text-sm">Configure SMS delivery for critical alerts and OTP verification.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6"><Save size={16} className="mr-2" /> Save</Button>
            </div>

            {/* Provider Config */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#131B2B] border border-[#1A2A3A] rounded-xl p-5">
                    <h3 className="text-white font-medium text-sm mb-3">Primary Provider: MSG91</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-[#8899AA]">Sender ID</span><span className="text-white font-mono">KAARYA</span></div>
                        <div className="flex justify-between"><span className="text-[#8899AA]">DLT Template IDs</span><span className="text-white">12 registered</span></div>
                        <div className="flex justify-between"><span className="text-[#8899AA]">Status</span><span className="text-emerald-400 font-medium">Active</span></div>
                    </div>
                </div>
                <div className="bg-[#131B2B] border border-[#1A2A3A] rounded-xl p-5">
                    <h3 className="text-white font-medium text-sm mb-3">Fallback Provider: Twilio</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-[#8899AA]">Account SID</span><span className="text-white font-mono">AC••••••d8f2</span></div>
                        <div className="flex justify-between"><span className="text-[#8899AA]">From Number</span><span className="text-white">+91 99xx xxx xx0</span></div>
                        <div className="flex justify-between"><span className="text-[#8899AA]">Status</span><span className="text-emerald-400 font-medium">Active</span></div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#1A2A3A] bg-[#131B2B]">
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Event</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Provider</th>
                            <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-center">Enabled</th>
                        </tr>
                    </thead>
                    <tbody>
                        {smsEvents.map((ev, i) => (
                            <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors">
                                <td className="p-4 text-sm text-white font-medium">{ev.event}</td>
                                <td className="p-4 text-xs text-[#8899AA]">{ev.provider}</td>
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
