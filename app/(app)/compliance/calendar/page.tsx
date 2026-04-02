"use client";

import React, { useState } from 'react';
import {
    Calendar as CalendarIcon, ChevronLeft, ChevronRight,
    Filter, FileText, Bell, CheckCircle, AlertCircle, ArrowLeft, Download
} from 'lucide-react';

export default function ComplianceCalendar() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                Statutory Calendar <CalendarIcon size={24} className="text-blue-500" />
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">Track all upcoming compliance deadlines across states and acts.</p>
                        </div>
                    </div>
                </div>

                {/* Calendar Controls */}
                <div className="flex justify-between items-center bg-[#0D1928] p-4 rounded-2xl border border-[#1A2A3A] shadow-lg">
                    <div className="flex items-center gap-4">
                        <button className="p-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-slate-400 hover:text-white"><ChevronLeft size={18} /></button>
                        <h2 className="text-lg font-black text-white uppercase tracking-widest w-40 text-center">April 2024</h2>
                        <button className="p-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-slate-400 hover:text-white"><ChevronRight size={18} /></button>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white flex items-center gap-2">
                            <Filter size={14} /> Filter by Act
                        </button>
                        <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white flex items-center gap-2">
                            <Filter size={14} /> State (Pan-India)
                        </button>
                    </div>
                </div>

                {/* Main Schedule View */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Events List */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-8 shadow-2xl min-h-[600px]">

                            <div className="relative pl-6 space-y-10 before:absolute before:inset-0 before:ml-[31px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#1A2A3A] before:to-transparent">

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0D1928] bg-amber-500 text-white shadow shadow-amber-500/50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <AlertCircle size={16} />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#060B14] border border-amber-500/30 p-5 rounded-2xl shadow-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-black text-amber-500 uppercase tracking-widest">15 April (Today)</span>
                                            <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-amber-500/20">Pending</span>
                                        </div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-tight">PF & ESIC Remittance</h3>
                                        <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed italic">Deposit PF & ESIC contributions for the month of March 2024 and file ECR.</p>
                                    </div>
                                </div>

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0D1928] bg-blue-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <FileText size={16} />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#060B14] border border-[#1A2A3A] p-5 rounded-2xl shadow-lg hover:border-slate-700 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-black text-blue-500 uppercase tracking-widest">25 April</span>
                                            <span className="bg-[#1A2A3A] text-slate-400 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Upcoming</span>
                                        </div>
                                        <h3 className="text-sm font-black text-slate-200 uppercase tracking-tight">Professional Tax (PT)</h3>
                                        <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed italic">File PT return and pay tax for applicable states (KA, MH, TS).</p>
                                    </div>
                                </div>

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group border-opacity-50">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0D1928] bg-[#1A2A3A] text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <CheckCircle size={16} />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#060B14]/50 border border-[#1A2A3A]/50 p-5 rounded-2xl">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">30 April</span>
                                            <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Done</span>
                                        </div>
                                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-tight line-through">TDS Payment</h3>
                                        <p className="text-[10px] text-slate-600 font-medium mt-1 leading-relaxed italic">Deposit TDS deducted under section 192 for March 2024.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Reminders & Quick Actions */}
                    <div className="space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Notification Settings</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Bell size={16} className="text-slate-500" />
                                        <span className="text-xs font-bold text-slate-300">Email Alerts</span>
                                    </div>
                                    <div className="w-8 h-4 bg-emerald-500 rounded-full relative cursor-pointer">
                                        <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-500 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-blue-500/20 transition-all">
                                    <Download size={14} /> Sync to Google Calendar
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                            <div className="relative z-10 space-y-4">
                                <h3 className="text-sm font-black text-white uppercase tracking-tight">Need Statutory Support?</h3>
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Connect with our panel of labour law consultants for complex filings.</p>
                                <button className="w-full py-3 bg-white text-[#060B14] font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors">
                                    Request Callback
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
