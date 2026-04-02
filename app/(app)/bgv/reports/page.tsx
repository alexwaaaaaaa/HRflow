"use client";

import React from 'react';
import {
    FileText, Download, Filter, ChevronRight, PieChart as PieChartIcon,
    BarChart2, Activity, UserCheck
} from 'lucide-react';
import Link from 'next/link';

const REPORTS = [
    { id: 'RPT-01', title: 'Overall TAT Analysis', desc: 'Turnaround time breakdown by vendor and check type.', icon: ClockIcon, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 'RPT-02', title: 'Discrepancy Trends', desc: 'Common failure points (e.g., Education vs Employment).', icon: AlertIcon, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'RPT-03', title: 'Vendor SLA Compliance', desc: 'Metrics on vendor performance against agreed SLAs.', icon: TargetIcon, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'RPT-04', title: 'Compliance Audit Log', desc: 'Historical log of all BGV clearances and overrides.', icon: ShieldIcon, color: 'text-[#0066FF]', bg: 'bg-[#0066FF]/10' },
];

function ClockIcon(props: any) { return <Activity {...props} />; }
function AlertIcon(props: any) { return <PieChartIcon {...props} />; }
function TargetIcon(props: any) { return <BarChart2 {...props} />; }
function ShieldIcon(props: any) { return <UserCheck {...props} />; }

export default function BGVReportsScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1200px] mx-auto">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <FileText className="text-[#0066FF]" size={28} />
                            BGV Reports & Extracts
                        </h1>
                        <p className="text-sm text-[#8899AA]">Generate detailed reports and analytics for background verifications.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/bgv/analytics" className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white shadow-sm">
                            <PieChartIcon size={16} className="mr-2 text-indigo-500" /> Go to Analytics
                        </Link>
                        <Link href="/bgv/reports/cost" className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white shadow-sm">
                            View Cost Report
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {REPORTS.map(rpt => {
                        const Icon = rpt.icon;
                        return (
                            <div key={rpt.id} className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#2A3A4A] transition-colors group cursor-pointer shadow-lg relative overflow-hidden">
                                <div className={`absolute top-0 right-0 w-16 h-16 ${rpt.bg} rounded-bl-full border-b border-l border-current opacity-10 blur-xl group-hover:blur-2xl transition-all`}></div>
                                <div className={`w-12 h-12 rounded-lg ${rpt.bg} flex items-center justify-center mb-4 border border-current opacity-30 group-hover:opacity-100 transition-opacity`}>
                                    <Icon className={rpt.color} size={24} />
                                </div>
                                <h3 className="font-bold text-white mb-2 text-base group-hover:text-[#0066FF] transition-colors">{rpt.title}</h3>
                                <p className="text-xs text-[#8899AA] leading-relaxed mb-4">{rpt.desc}</p>
                                <div className="text-sm text-[#0066FF] font-semibold flex items-center gap-1">Generate <ChevronRight size={16} /></div>
                            </div>
                        )
                    })}
                </div>

                {/* Custom Report Builder */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg border-l-4 border-l-[#00E5A0]">
                    <div className="p-6">
                        <h2 className="text-lg font-bold text-white mb-1">Custom Data Extract</h2>
                        <p className="text-sm text-[#8899AA] mb-6">Create a highly customized CSV report based on specific data points.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Date Range</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="date" className="bg-[#060B14] border border-[#1A2A3A] text-sm text-slate-300 rounded px-3 py-2 outline-none focus:border-[#0066FF]" />
                                    <input type="date" className="bg-[#060B14] border border-[#1A2A3A] text-sm text-slate-300 rounded px-3 py-2 outline-none focus:border-[#0066FF]" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Vendors</label>
                                <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-slate-300 rounded px-3 py-2 w-full outline-none focus:border-[#0066FF]">
                                    <option>All Vendors</option>
                                    <option>FirstAdvantage</option>
                                    <option>Checkr</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Status</label>
                                <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-slate-300 rounded px-3 py-2 w-full outline-none focus:border-[#0066FF]">
                                    <option>All Statuses</option>
                                    <option>Clear</option>
                                    <option>Discrepancy</option>
                                    <option>Failed</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-[#1A2A3A] flex justify-end">
                            <button className="px-6 py-2.5 bg-[#00E5A0] text-[#060B14] rounded-lg font-bold text-sm hover:bg-[#00c98d] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,160,0.3)]">
                                <Download size={18} /> Generate CSV Dump
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
