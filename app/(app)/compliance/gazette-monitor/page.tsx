"use client";

import React from 'react';
import {
    BookOpen, Search, Filter, BellRing, ArrowRight,
    Scale, FileText, Globe, Clock, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function GazetteMonitor() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-end pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            Gazette Monitor <BookOpen size={24} className="text-indigo-500" />
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Live tracking of official government notifications and labour law amendments.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative group">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-indigo-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search acts, circulars, state..."
                                className="w-72 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 transition-all font-medium"
                            />
                        </div>
                        <button className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-slate-400 hover:text-white transition-all shadow-lg flex items-center gap-2">
                            <Filter size={16} /> <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Filter</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Main Feed */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Featured/Critical Update */}
                        <div className="bg-gradient-to-r from-[#0D1928] to-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border border-indigo-500/30">
                                    <BellRing size={12} className="animate-pulse" /> Critical Amendment
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">2 days ago</span>
                            </div>
                            <h2 className="text-xl font-black text-white tracking-tight leading-snug mb-2">Notification of Minimum Wages Revision (VDA) - Delhi NCR</h2>
                            <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-3xl">
                                The Govt. of NCT of Delhi has published the revised Variable Dearness Allowance (VDA) applicable to all scheduled employments effective from 01 April 2024. This impacts PT and gross salary structuring.
                            </p>
                            <div className="mt-6 flex items-center gap-4">
                                <button className="px-5 py-2.5 bg-indigo-600 rounded-xl text-xs font-black text-white hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2">
                                    Assess Impact <ArrowRight size={14} />
                                </button>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Act: Minimum Wages Act, 1948</span>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />
                        </div>

                        {/* Recent Updates List */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-xl">
                            <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060B14]/50">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Recent Regulatory Circulars</h3>
                            </div>
                            <div className="divide-y divide-[#1A2A3A]">
                                {[
                                    { id: 'REG-0921', title: 'Extension of due date for ESI contributions for March 2024', tag: 'ESIC', date: '5 days ago', location: 'Central' },
                                    { id: 'REG-0920', title: 'Mandatory online registration under Shop & Establishment', tag: 'S&E Act', date: '1 week ago', location: 'Maharashtra' },
                                    { id: 'REG-0919', title: 'SOP for Joint Declaration correction in UAN database', tag: 'EPFO', date: '2 weeks ago', location: 'Central' },
                                    { id: 'REG-0918', title: 'Revision of LWF Employer Contribution Rates', tag: 'LWF', date: '2 weeks ago', location: 'Karnataka' },
                                ].map((item, i) => (
                                    <Link key={i} href={`/compliance/gazette-monitor/${item.id}`} className="block p-6 hover:bg-[#1A2A3A]/30 transition-all group cursor-pointer">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="space-y-2 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-[#060B14] px-2 py-0.5 rounded border border-[#1A2A3A]">{item.tag}</span>
                                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1"><Globe size={10} /> {item.location}</span>
                                                </div>
                                                <h4 className="text-sm font-black text-slate-200 group-hover:text-indigo-400 transition-colors leading-snug">{item.title}</h4>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-2">
                                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1"><Clock size={10} /> {item.date}</span>
                                                <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1 mt-1" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Filters & Subscriptions */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Topic Subscriptions</h3>
                            <div className="space-y-3">
                                {['EPFO Updates', 'Income Tax / TDS', 'State Professional Tax', 'Labour Law Codes'].map((topic, i) => (
                                    <div key={topic} className="flex justify-between items-center p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl">
                                        <span className="text-xs font-bold text-slate-300">{topic}</span>
                                        <div className={`w-8 h-4 rounded-full relative cursor-pointer ${i < 2 ? 'bg-indigo-500' : 'bg-[#1A2A3A]'}`}>
                                            <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${i < 2 ? 'right-0.5' : 'left-0.5'}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 bg-[#060B14] border border-dashed border-[#1A2A3A] rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                            <Scale size={24} className="text-slate-600" />
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                                Our legal team summarizes gazettes within 48 hours of publication.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
