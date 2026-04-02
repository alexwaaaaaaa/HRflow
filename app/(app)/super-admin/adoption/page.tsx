"use client";
import React from 'react';
import { Layers, Rocket, TrendingUp, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function FeatureAdoptionScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Micro-Feature Adoption</h1>
                    <p className="text-[#8899AA] text-sm">Measure penetration of specific platform capabilities (e.g., EWA, OKRs) across active tenants.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mb-6">
                {[
                    { label: 'Core Payroll Enabled', val: '94%', trend: '+2%' },
                    { label: 'Using Custom Domains', val: '12%', trend: '+1.5%' },
                    { label: 'EWA (Insta-Pay) Active', val: '4%', trend: '+4%' },
                    { label: 'Mobile App Login (30d)', val: '82%', trend: '-1%' },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                        <div className="text-3xl font-black text-white mb-1 flex items-end gap-2">
                            {stat.val}
                            <span className={`text-[10px] font-bold pb-2 ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{stat.trend}</span>
                        </div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><Rocket size={18} className="text-indigo-400" /> Feature Penetration Matrix</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] w-1/4">Feature / Module Name</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] w-1/6">Category</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] w-1/4">Adoption (Active Orgs)</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Adoption (Employees)</th>
                                <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] text-right">Trend (90d)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { name: 'Leave Application (Mobile)', cat: 'Core', orgs: 98, emps: 85, trend: 1.2 },
                                { name: 'Automated Form 16', cat: 'Payroll', orgs: 85, emps: 72, trend: 15.4 },
                                { name: 'Performance Appraisals', cat: 'Talent', orgs: 42, emps: 38, trend: 4.5 },
                                { name: 'Pulse Surveys', cat: 'Engagement', orgs: 28, emps: 15, trend: -2.1 },
                                { name: 'Earned Wage Access (EWA)', cat: 'Fintek', orgs: 5, emps: 2, trend: 50.0 },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                    <td className="px-6 py-4 text-white font-bold">{row.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-[#131B2B] border border-[#2A3A4A] text-[#8899AA] text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
                                            {row.cat}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-32 h-1.5 bg-[#131B2B] rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${row.orgs}%` }} />
                                            </div>
                                            <span className="text-xs font-bold text-white">{row.orgs}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-32 h-1.5 bg-[#131B2B] rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${row.emps}%` }} />
                                            </div>
                                            <span className="text-xs font-bold text-white">{row.emps}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`text-xs font-bold ${row.trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {row.trend > 0 ? '+' : ''}{row.trend}%
                                        </span>
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
