"use client";

import React from 'react';
import {
    Users, UserMinus, Clock, CheckCircle, AlertCircle,
    ArrowUpRight, TrendingDown, Search, Filter, Mail, ExternalLink
} from 'lucide-react';

export default function FnFDashboard() {
    const stats = [
        { label: 'Total Exits (MTD)', value: '12', change: '+2 vs last month', icon: UserMinus, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Pending FnF', value: '45', change: '8 high priority', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Settled this Month', value: '08', change: 'Avg 4 days TAT', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Avg Exit Rating', value: '4.2', change: '-5% vs Q3', icon: TrendingDown, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    ];

    const currentExits = [
        { id: 'EMP-771', name: 'Arnab Das', dept: 'Engineering', exitDate: '24 Mar 2024', status: 'Notice Period', progress: 65 },
        { id: 'EMP-892', name: 'Sanya Gupta', dept: 'Marketing', exitDate: '15 Mar 2024', status: 'FnF Pending', progress: 90 },
        { id: 'EMP-443', name: 'Rahul Verma', dept: 'Product', exitDate: '28 Mar 2024', status: 'Resigned', progress: 10 },
        { id: 'EMP-211', name: 'Megha Singh', dept: 'Sales', exitDate: '10 Mar 2024', status: 'Clearance', progress: 45 },
    ];

    return (
        <main className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">FnF Settlement Hub</h1>
                        <p className="text-slate-400 max-w-2xl font-medium">Manage employee exits, clear documentation, and finalize financial settlements with precision.</p>
                    </div>
                    <div className="flex gap-3">
                        <button type="button" className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-white hover:bg-[#1A2A3A] transition-all flex items-center">
                            <Mail size={16} className="mr-2 text-blue-400" aria-hidden="true" /> Bulk Reminders
                        </button>
                        <button type="button" className="px-6 py-2.5 bg-[#0066FF] rounded-xl text-sm font-bold text-white hover:bg-[#0052cc] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] flex items-center">
                            Initiate Exit <ArrowUpRight size={16} className="ml-2" aria-hidden="true" />
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
                            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`} aria-hidden="true">
                                <stat.icon size={24} />
                            </div>
                            <dt className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</dt>
                            <dd className="text-3xl font-black text-white mb-2">{stat.value}</dd>
                            <p className="text-xs font-bold text-slate-500 leading-none">{stat.change}</p>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-8 -mt-8" aria-hidden="true" />
                        </div>
                    ))}
                </dl>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Active Exit Tracker */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0D1928]/50">
                                <h2 className="text-lg font-black text-white flex items-center">
                                    <Clock size={20} className="mr-3 text-amber-500" aria-hidden="true" /> Active Exit Pipeline
                                </h2>
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <Search size={16} className="absolute left-3 top-2.5 text-slate-500" aria-hidden="true" />
                                        <label htmlFor="exit-search" className="sr-only">Search exits</label>
                                        <input id="exit-search" type="text" placeholder="Search exits..." className="bg-[#060B14] border border-[#1A2A3A] rounded-lg pl-10 pr-4 py-2 text-sm outline-none w-64 focus:border-blue-500/50" />
                                    </div>
                                    <button type="button" aria-label="Filter exits" className="p-2 border border-[#1A2A3A] rounded-lg hover:bg-[#1A2A3A] text-slate-400">
                                        <Filter size={18} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-[#060B14]/50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-[#1A2A3A]">
                                            <th scope="col" className="px-6 py-4 text-left">Employee</th>
                                            <th scope="col" className="px-6 py-4 text-left">LWD (Last Working Day)</th>
                                            <th scope="col" className="px-6 py-4 text-left">Progress</th>
                                            <th scope="col" className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A]">
                                        {currentExits.map((exit, i) => (
                                            <tr key={i} className="group hover:bg-[#1A2A3A]/20 transition-all cursor-pointer">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center font-bold text-white text-xs">
                                                            {exit.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-white">{exit.name}</div>
                                                            <div className="text-xs text-slate-500">{exit.id} • {exit.dept}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-bold text-slate-300">{exit.exitDate}</div>
                                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${exit.status === 'Resigned' ? 'bg-blue-500/10 text-blue-500' :
                                                        exit.status === 'Notice Period' ? 'bg-amber-500/10 text-amber-500' :
                                                            'bg-emerald-500/10 text-emerald-500'
                                                        }`}>
                                                        {exit.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 min-w-[200px]">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="flex-1 bg-[#060B14] h-1.5 rounded-full overflow-hidden border border-[#1A2A3A]"
                                                            role="progressbar"
                                                            aria-valuenow={exit.progress}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                            aria-label={`${exit.name} exit progress: ${exit.progress}%`}
                                                        >
                                                            <div className="bg-blue-500 h-full transition-all" style={{ width: `${exit.progress}%` }} />
                                                        </div>
                                                        <span className="text-xs font-bold text-white">{exit.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        type="button"
                                                        aria-label={`Open ${exit.name} FnF details`}
                                                        className="p-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-slate-400 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-all"
                                                    >
                                                        <ExternalLink size={16} aria-hidden="true" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links & Actions */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-[#0066FF] to-[#0044CC] rounded-2xl p-6 relative overflow-hidden shadow-2xl group">
                            <h3 className="text-xl font-black text-white mb-2 relative z-10">Generate Exit Docs</h3>
                            <p className="text-white/70 text-sm mb-6 font-medium relative z-10">Quickly generate experience letters, relieving letters, and PF forms.</p>
                            <button className="w-full py-3 bg-white rounded-xl text-[#0066FF] font-black text-sm relative z-10 hover:bg-slate-50 transition-all">
                                Launch Document Generator
                            </button>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-4">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Pending Approvals</h3>
                            {[
                                { title: 'Notice Period Waiver', emp: 'Vikram Mehta', time: '2h ago', level: 'High' },
                                { title: 'Notice Buyout Request', emp: 'Sneha Rao', time: '5h ago', level: 'Med' },
                                { title: 'Resignation Acceptance', emp: 'Amitabh S.', time: '1d ago', level: 'Low' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#1A2A3A]/30 transition-all cursor-pointer border border-transparent hover:border-[#1A2A3A]">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${item.level === 'High' ? 'bg-rose-500' : item.level === 'Med' ? 'bg-amber-500' : 'bg-slate-500'
                                        }`} />
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-white">{item.title}</div>
                                        <div className="text-xs text-slate-500">{item.emp} • {item.time}</div>
                                    </div>
                                    <ArrowUpRight size={14} className="text-slate-600 group-hover:text-blue-500" />
                                </div>
                            ))}
                            <button type="button" className="w-full py-2.5 text-xs font-bold text-blue-500 border border-blue-500/20 rounded-xl hover:bg-blue-500/5 transition-all mt-2">
                                View All Approvals (12)
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
