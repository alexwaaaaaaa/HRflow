"use client";
import React from 'react';
import { ShieldAlert, AlertTriangle, ArrowUpRight, Clock } from 'lucide-react';

export default function EscalationNotificationPage() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <ShieldAlert className="text-rose-500" />
                        Active Escalations & Alerts
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">High priority incidents requiring immediate managerial intervention.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    {/* High Priority Card */}
                    <div className="bg-gradient-to-br from-rose-500/10 to-[#0A1420] border border-rose-500/30 rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full" />
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">L3 Escalation</span>
                                <span className="text-[#8899AA] text-xs flex items-center gap-1"><Clock size={12} /> 14 mins breached</span>
                            </div>
                            <button className="text-[#8899AA] hover:text-white">
                                <ArrowUpRight size={18} />
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Payroll API Gateway Down</h3>
                        <p className="text-sm text-[#CCDDEE] mb-4 text-balance">The salary processing webhook has returned 503 errors for 3 consecutive retries. Finance team is blocked.</p>
                        <div className="flex gap-3">
                            <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-rose-900/20">Acknowledge</button>
                            <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-4 py-2 rounded-lg text-sm transition-colors">Route to DevOps</button>
                        </div>
                    </div>

                    {/* Medium Priority */}
                    <div className="bg-[#0A1420] border border-amber-500/20 rounded-xl p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <AlertTriangle className="text-amber-500" size={16} /> Pending FnF Grievance
                            </h3>
                            <span className="text-xs text-[#556677]">SLA: 4 hrs left</span>
                        </div>
                        <p className="text-sm text-[#8899AA] mb-4">Former employee EMP-192 raised an urgent dispute regarding Notice Period recovery.</p>
                        <button className="text-sm text-amber-500 font-medium hover:text-amber-400">View Ticket Details →</button>
                    </div>
                </div>

                <div className="col-span-1 space-y-4">
                    {/* Escalation Stats */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5">
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Duty Roster</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Primary On-Call</span>
                                <span className="text-emerald-400 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Ajiit K.</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Secondary</span>
                                <span className="text-white">Neha S.</span>
                            </div>
                            <div className="w-full h-px bg-[#1A2A3A] my-2" />
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Escalation Level</span>
                                <span className="text-white font-mono">Level 2 (Active)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
