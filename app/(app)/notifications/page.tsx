"use client";
import React, { useState } from 'react';
import { Bell, Check, MoreVertical, Star, ShieldAlert, Award, CalendarHeart } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'alert', title: 'Server CPU Spiked', desc: 'Production server CPU reached 95% for 10 minutes.', time: '10m ago', unread: true, icon: <ShieldAlert className="text-red-500" size={20} /> },
    { id: 2, type: 'mention', title: 'Mentioned you in a comment', desc: '@arjun flagged you in "Q3 Performance Review Draft".', time: '1h ago', unread: true, icon: <Star className="text-amber-500" size={20} /> },
    { id: 3, type: 'achievement', title: 'Badge Earned: Code Ninja', desc: 'You merged 50 Pull Requests this month!', time: '2h ago', unread: false, icon: <Award className="text-indigo-500" size={20} /> },
    { id: 4, type: 'event', title: 'Upcoming Work Anniversary', desc: 'Priya Sharma completes 5 years tomorrow.', time: '1d ago', unread: false, icon: <CalendarHeart className="text-pink-500" size={20} /> },
];

export default function NotificationCenterPage() {
    const [filter, setFilter] = useState('All');

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Bell className="text-[#00E5A0]" />
                        Notification Center
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Manage your alerts, mentions, and system updates.</p>
                </div>
                <button className="text-sm text-[#8899AA] hover:text-white flex items-center gap-2 transition-colors">
                    <Check size={16} /> Mark all read
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 border-b border-[#1A2A3A] pb-4">
                {['All', 'Unread', 'Mentions', 'System'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === f ? 'bg-[#1A2A3A] text-white' : 'text-[#8899AA] hover:bg-[#0A1420] hover:text-[#CCDDEE]'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Feed */}
            <div className="space-y-3">
                {MOCK_NOTIFICATIONS.map((n) => (
                    <div
                        key={n.id}
                        className={`group flex items-start gap-4 p-4 rounded-xl border transition-all ${n.unread
                                ? 'bg-[#0D1928] border-[#1A2A3A] shadow-lg shadow-[#00E5A0]/5'
                                : 'bg-transparent border-transparent hover:bg-[#0A1420]'
                            }`}
                    >
                        {/* Icon */}
                        <div className={`p-2 rounded-full mt-1 shrink-0 ${n.unread ? 'bg-[#1A2A3A]' : 'bg-[#0A1420]'}`}>
                            {n.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className={`text-sm font-semibold ${n.unread ? 'text-white' : 'text-[#8899AA]'}`}>
                                    {n.title}
                                </h4>
                                <span className="text-xs text-[#556677] whitespace-nowrap">{n.time}</span>
                            </div>
                            <p className={`text-sm ${n.unread ? 'text-[#CCDDEE]' : 'text-[#556677]'}`}>
                                {n.desc}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 text-[#556677] hover:text-white rounded">
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        {/* Unread dot */}
                        {n.unread && (
                            <div className="w-2 h-2 rounded-full bg-[#00E5A0] mt-3 shrink-0 box-content border-4 border-[#0D1928]" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
