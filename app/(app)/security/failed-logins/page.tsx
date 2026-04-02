"use client";
import React from 'react';
import { ShieldAlert, Download, AlertTriangle, Fingerprint, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

export default function FailedLoginsScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/security/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Security</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Failed Login Attempts</h1>
                    <p className="text-[#8899AA] text-sm">Review denied access logs to detect brute-force attacks and locked accounts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Logs
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 flex items-center gap-4">
                    <div className="bg-rose-500/10 p-3 rounded-lg text-rose-400">
                        <ShieldAlert size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-rose-400">124</div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Failed (Last 24h)</div>
                    </div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-4">
                    <div className="bg-[#131B2B] p-3 rounded-lg text-[#556677]">
                        <Fingerprint size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-white">4</div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Accounts Locked</div>
                    </div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-4">
                    <div className="bg-[#131B2B] p-3 rounded-lg text-[#556677]">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-white">45.22.11.9</div>
                        <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Top Offending IP</div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden mt-6">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search logs..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:border-indigo-500 outline-none w-64 transition-colors" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Time</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Attempted Email</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">IP & Location</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Reason</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Account Status</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { time: '10 mins ago', email: 'admin@company.com', ip: '45.22.11.9', loc: 'Moscow, RU', reason: 'Invalid Password', status: 'Locked', threat: true },
                                { time: '12 mins ago', email: 'admin@company.com', ip: '45.22.11.9', loc: 'Moscow, RU', reason: 'Invalid Password', status: 'Active', threat: false },
                                { time: '1 hour ago', email: 'sarah.j@company.com', ip: '112.44.55.1', loc: 'London, UK', reason: 'MFA Failed', status: 'Active', threat: false },
                                { time: '3 hours ago', email: 'unknown_user@company.com', ip: '10.0.0.4', loc: 'Bangalore, IN', reason: 'User not found', status: 'N/A', threat: false },
                                { time: 'Yesterday', email: 'finance@company.com', ip: '198.51.100.2', loc: 'Reston, US', reason: 'Suspicious IP Blocked', status: 'Active', threat: true },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4 text-[#8899AA]">{row.time}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-white font-medium flex items-center gap-2">
                                            {row.threat && <AlertTriangle size={14} className="text-rose-400" />}
                                            {row.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-white font-mono text-xs">{row.ip}</div>
                                        <div className={`text-xs ${row.threat ? 'text-rose-400 font-bold' : 'text-[#556677]'}`}>{row.loc}</div>
                                    </td>
                                    <td className="px-6 py-4 text-[#CCDDEE]">{row.reason}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${row.status === 'Locked' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                row.status === 'Active' ? 'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]' :
                                                    'bg-[#131B2B] border-[#2A3A4A] text-[#556677]'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-indigo-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors opacity-0 group-hover:opacity-100">
                                            Investigate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
