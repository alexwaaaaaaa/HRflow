"use client";
import React from 'react';
import { Activity, Search, Filter, Monitor, Smartphone, Globe, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function ActiveSessionsScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/security/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Security</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Active Sessions</h1>
                    <p className="text-[#8899AA] text-sm">Monitor and revoke currently active logins across the workspace.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Filter size={16} /> Filter Devices
                    </button>
                    <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-rose-500/20">
                        <XCircle size={16} /> Revoke All Sessions
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search user or IP..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:border-indigo-500 outline-none w-64 transition-colors" />
                        </div>
                        <span className="text-xs text-[#556677] font-bold">412 Active</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">User</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Device / Browser</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">IP & Location</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Login Time</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { user: 'Meera Venkatesh', email: 'meera.v@company.com', device: 'MacBook Pro', os: 'macOS Sonoma', browser: 'Chrome 120.0', ip: '203.0.113.42', loc: 'Bangalore, IN', time: 'Active Now', current: true, icon: <Monitor size={18} className="text-emerald-400" /> },
                                { user: 'Rajesh Kumar', email: 'rajesh.k@company.com', device: 'Windows PC', os: 'Windows 11', browser: 'Edge 119.0', ip: '112.44.55.1', loc: 'Delhi, IN', time: '2 hours ago', icon: <Monitor size={18} className="text-[#556677]" /> },
                                { user: 'Sanjay Dutt', email: 'sanjay.d@company.com', device: 'iPhone 14 Pro', os: 'iOS 17.2', browser: 'Kaarya Mobile App', ip: '45.22.11.9', loc: 'Mumbai, IN', time: '5 hours ago', icon: <Smartphone size={18} className="text-[#556677]" /> },
                                { user: 'Guest External', email: 'ext.auditor@firm.com', device: 'Unknown Linux', os: 'Linux', browser: 'Firefox 115.0', ip: '198.51.100.2', loc: 'Reston, US', time: '1 day ago', icon: <Globe size={18} className="text-amber-400" />, warning: true },
                                { user: 'Priya Sharma', email: 'head.sales@company.com', device: 'iPad Air', os: 'iPadOS 17', browser: 'Safari 17.0', ip: '203.0.113.10', loc: 'Bangalore, IN', time: '2 days ago', icon: <Smartphone size={18} className="text-[#556677]" /> },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-white font-bold text-xs shrink-0 border border-[#2A3A4A]">{row.user.charAt(0)}</div>
                                            <div>
                                                <div className="text-white font-bold">{row.user}</div>
                                                <div className="text-xs text-[#556677]">{row.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {row.icon}
                                            <div>
                                                <div className="text-white font-medium">{row.device} <span className="text-[#8899AA] text-xs">({row.os})</span></div>
                                                <div className="text-xs text-[#556677]">{row.browser}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {row.warning && <AlertTriangle size={14} className="text-amber-400" />}
                                            <div>
                                                <div className="text-white font-mono text-sm">{row.ip}</div>
                                                <div className="text-xs text-[#556677]">{row.loc}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-[#8899AA]">{row.time}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.current ? (
                                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Current Session</span>
                                        ) : (
                                            <span className="bg-[#1A2A3A] text-[#8899AA] border border-[#2A3A4A] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max">
                                                <Activity size={10} /> Active
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {!row.current && (
                                            <button className="text-rose-400 hover:text-white hover:bg-rose-500/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors opacity-0 group-hover:opacity-100">
                                                Revoke
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                    <div className="text-xs text-[#556677]">Showing 1-5 of 412</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#131B2B] border border-[#2A3A4A] rounded text-[#8899AA] text-xs font-bold hover:text-white transition-colors disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 bg-[#131B2B] border border-[#2A3A4A] rounded text-[#8899AA] text-xs font-bold hover:text-white transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
