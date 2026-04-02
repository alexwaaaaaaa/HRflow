"use client";
import React from 'react';
import { Megaphone, MessageSquare, Send, Calendar, Users, Eye } from 'lucide-react';
import Link from 'next/link';

export default function PlatformAnnouncementScreen() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Platform Broadcasts</h1>
                    <p className="text-[#8899AA] text-sm">Push in-app notifications, downtime alerts, or feature releases to organization Admins or ALL employees.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">

                {/* Composer */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 h-max">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6"><Megaphone size={18} className="text-indigo-400" /> Compose Broadcast</h2>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Target Audience</label>
                            <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white text-sm rounded-lg p-2.5 outline-none focus:border-indigo-500">
                                <option>Organization Instance Admins Only</option>
                                <option>All HR Admins (Global)</option>
                                <option>Finance Leads (Global)</option>
                                <option className="text-rose-400">All Active Employees (Force Global Broadcast)</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Broadcast Type</label>
                            <div className="flex gap-2">
                                <label className="flex-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-2 text-center text-indigo-400 text-xs font-bold cursor-pointer hover:bg-indigo-500/20">
                                    <input type="radio" name="type" className="hidden" defaultChecked />
                                    Feature Release
                                </label>
                                <label className="flex-1 bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 text-center text-amber-400 text-xs font-bold cursor-pointer hover:bg-amber-500/20">
                                    <input type="radio" name="type" className="hidden" />
                                    Maintenance Alert
                                </label>
                                <label className="flex-1 bg-rose-500/10 border border-rose-500/30 rounded-lg p-2 text-center text-rose-400 text-xs font-bold cursor-pointer hover:bg-rose-500/20">
                                    <input type="radio" name="type" className="hidden" />
                                    Critical Outage
                                </label>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Message Body</label>
                            <textarea
                                className="w-full h-32 bg-[#131B2B] border border-[#2A3A4A] text-white rounded-xl p-3 text-sm resize-none outline-none focus:border-indigo-500"
                                placeholder="# Heading&#10;&#10;Write markdown broadcast..."
                                defaultValue="🚀 We're excited to launch AI Performance Reviews to all tenants today! Check your admin settings to enable."
                            />
                        </div>

                        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-500/20 mt-4">
                            <Send size={18} /> Push Transmission
                        </button>
                    </div>
                </div>

                {/* Broadcast History */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2"><MessageSquare size={16} className="text-[#556677]" /> Recent Transmissions</h2>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                        <div className="divide-y divide-[#1A2A3A]">

                            {/* History Item */}
                            <div className="p-5 hover:bg-[#131B2B] transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                        <h4 className="text-white font-bold text-sm">Scheduled Maintenance: Payroll DB Migration</h4>
                                    </div>
                                    <span className="text-xs text-[#556677] font-mono">Yesterday</span>
                                </div>
                                <p className="text-xs text-[#8899AA] mb-3 line-clamp-2">
                                    We will be performing scheduled database optimizations. Payroll operations may be delayed between 02:00 AM - 04:00 AM IST.
                                </p>
                                <div className="flex items-center gap-4 text-xs font-bold text-[#556677]">
                                    <span className="flex items-center gap-1"><Users size={12} /> Finance Leads</span>
                                    <span className="flex items-center gap-1"><Eye size={12} /> 3,412 Views</span>
                                </div>
                            </div>

                            {/* History Item */}
                            <div className="p-5 hover:bg-[#131B2B] transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-rose-500" />
                                        <h4 className="text-white font-bold text-sm">Critical: Bank API Outage Incident</h4>
                                    </div>
                                    <span className="text-xs text-[#556677] font-mono">Oct 20, 2026</span>
                                </div>
                                <p className="text-xs text-[#8899AA] mb-3 line-clamp-2">
                                    Our partner bank is experiencing downtime. Neobank disbursements and instant withdrawals are temporarily paused. Teams are investigating.
                                </p>
                                <div className="flex items-center gap-4 text-xs font-bold text-[#556677]">
                                    <span className="flex items-center gap-1"><Users size={12} /> GLOBAL BROADCAST (ALL)</span>
                                    <span className="flex items-center gap-1"><Eye size={12} /> 945K Views</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
