"use client";

import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Monitor, ToggleLeft, ToggleRight, Save, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotificationPreferencesPage() {
    const [channels, setChannels] = useState({
        email: { leave: true, payroll: true, attendance: true, performance: true, system: true, hiring: false },
        push: { leave: true, payroll: false, attendance: true, performance: false, system: true, hiring: true },
        whatsapp: { leave: false, payroll: true, attendance: false, performance: false, system: false, hiring: false },
        sms: { leave: false, payroll: false, attendance: false, performance: false, system: true, hiring: false },
    });

    const categories = ['leave', 'payroll', 'attendance', 'performance', 'system', 'hiring'];
    const channelList = [
        { key: 'email', label: 'Email', icon: Mail, color: 'text-blue-400' },
        { key: 'push', label: 'Push / In-App', icon: Monitor, color: 'text-emerald-400' },
        { key: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'text-[#25D366]' },
        { key: 'sms', label: 'SMS', icon: Smartphone, color: 'text-amber-400' },
    ];

    const toggle = (channel: string, category: string) => {
        setChannels(prev => ({
            ...prev,
            [channel]: { ...(prev as any)[channel], [category]: !(prev as any)[channel][category] }
        }));
    };

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Bell size={28} className="text-indigo-400" /> Notification Preferences
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Configure which notification channels are active for each HR event category. Changes apply organization-wide.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                    <Save size={16} className="mr-2" /> Save Preferences
                </Button>
            </div>

            {/* Matrix Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] bg-[#131B2B]">
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider w-48">Category</th>
                                {channelList.map(ch => (
                                    <th key={ch.key} className="p-4 text-center">
                                        <div className="flex flex-col items-center gap-1.5">
                                            <ch.icon size={18} className={ch.color} />
                                            <span className="text-xs font-semibold text-white">{ch.label}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors">
                                    <td className="p-4 text-sm text-white font-medium capitalize">{cat === 'system' ? 'System Alerts' : cat}</td>
                                    {channelList.map(ch => {
                                        const isOn = (channels as any)[ch.key][cat];
                                        return (
                                            <td key={ch.key} className="p-4 text-center">
                                                <button onClick={() => toggle(ch.key, cat)} className="inline-block transition-transform hover:scale-110">
                                                    {isOn
                                                        ? <ToggleRight size={28} className="text-indigo-400" />
                                                        : <ToggleLeft size={28} className="text-[#2A3A4A]" />
                                                    }
                                                </button>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-[#131B2B] border border-[#1A2A3A] rounded-xl p-5">
                    <h3 className="text-white font-medium text-sm mb-2">Quiet Hours</h3>
                    <p className="text-xs text-[#8899AA] mb-4">Suppress non-critical notifications between specified hours to reduce noise.</p>
                    <div className="flex items-center gap-4">
                        <div className="bg-[#0A1420] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white w-28 text-center">10:00 PM</div>
                        <span className="text-[#445566] text-xs font-medium">to</span>
                        <div className="bg-[#0A1420] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white w-28 text-center">8:00 AM</div>
                    </div>
                </div>
                <div className="bg-[#131B2B] border border-[#1A2A3A] rounded-xl p-5">
                    <h3 className="text-white font-medium text-sm mb-2">Digest Mode</h3>
                    <p className="text-xs text-[#8899AA] mb-4">Batch low-priority notifications into a single daily email digest instead of real-time alerts.</p>
                    <div className="flex items-center gap-3">
                        <ToggleRight size={28} className="text-indigo-400" />
                        <span className="text-sm text-white">Enabled — Daily at 9:00 AM IST</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
