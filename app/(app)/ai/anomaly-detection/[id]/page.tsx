"use client";

import React, { useState } from 'react';
import { Sparkles, ArrowLeft, AlertTriangle, ShieldCheck, Activity, Search, ShieldAlert, Cpu, Calendar, User, Filter, RefreshCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import ClientOnly from '@/components/ui/ClientOnly';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell } from 'recharts';
import Link from 'next/link';
import ChartWrapper from '@/components/ui/ChartWrapper';

export default function AnomalyDetailPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Navigation & Header */}
            <div className="mb-6 shrink-0 flex flex-col">
                <Link href="/ai/anomaly-detection" className="flex items-center gap-2 text-[#8899AA] hover:text-white transition-colors w-fit mb-4">
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back to Anomalies</span>
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20 shadow-[0_0_15px_rgba(255,68,68,0.2)]">
                            <ShieldAlert size={28} className="text-red-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold text-white tracking-tight">Alert ID: ANM-902</h1>
                                <span className="px-2.5 py-1 bg-red-500/10 text-red-400 text-xs rounded-md border border-red-500/20 font-bold uppercase tracking-wider">
                                    Critical Severity
                                </span>
                            </div>
                            <p className="text-[#8899AA] text-sm">Detected: Today at 08:42 AM IST • Category: Compliance / Right-to-Work</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="secondary" className="border-[#2A3A4A] text-white">
                            Ignore Anomaly
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-500 text-white border-none min-w-[140px]">
                            Resolve & Fix <ShieldCheck size={16} className="ml-2" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 pb-8 flex flex-col gap-6">

                {/* AI Root Cause Analysis */}
                <div className="bg-gradient-to-r from-[#131B2B] to-[#0D1928] border border-red-500/20 rounded-2xl p-6 relative overflow-hidden shrink-0 shadow-lg">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 relative z-10">
                        <Cpu size={20} className="text-red-400" /> AI Root Cause Analysis
                    </h3>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <p className="text-[#8899AA] text-sm leading-relaxed mb-6">
                                Kaarya AI's compliance scanning agent has detected <strong className="text-white">3 active IT contractors</strong> currently scheduled on active payroll whose Indian Work Visas expired within the last 48 hours. The system failed to trigger the standard 30-day auto-renewal workflow due to a missing manager mapping in the external Vendor Management System (VMS) integration.
                            </p>

                            <div className="flex flex-col gap-3">
                                <div className="bg-[#0A1420] border border-[#2A3A4A] p-4 rounded-xl flex items-start gap-4">
                                    <Activity size={18} className="text-red-400 mt-0.5" />
                                    <div>
                                        <h4 className="text-white text-sm font-medium mb-1">Compliance Violation Risk</h4>
                                        <p className="text-xs text-[#8899AA] leading-relaxed">
                                            Allowing expired visa workers to remain active poses severe statutory penalties under Section 14 of the Foreigners Act. Maximum penalty estimate: ₹15L + legal action.
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#0A1420] border border-amber-500/30 p-4 rounded-xl flex items-start gap-4">
                                    <AlertTriangle size={18} className="text-amber-500 mt-0.5" />
                                    <div>
                                        <h4 className="text-white text-sm font-medium mb-1">System Integration Failure</h4>
                                        <p className="text-xs text-[#8899AA] leading-relaxed">
                                            The API sync from 'VendorForce (VMS)' silently dropped the `manager_id` payload on Oct 1st, causing the auto-alert workflow to dead-letter without notification.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Meta Data Panel */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 flex flex-col gap-4 relative">
                            <div>
                                <div className="text-xs text-[#445566] uppercase tracking-wider mb-1 font-semibold">Model Confidence</div>
                                <div className="text-3xl font-bold text-emerald-400 font-mono">99.4%</div>
                            </div>
                            <div className="w-full h-px bg-[#1A2A3A]" />
                            <div>
                                <div className="text-xs text-[#445566] uppercase tracking-wider mb-1 font-semibold">Affected Entities</div>
                                <div className="text-xl font-bold text-white mb-2">3 Employees</div>
                                <div className="flex -space-x-2">
                                    {['AB', 'CD', 'EF'].map((init, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A1420] bg-gradient-to-br from-[#1A2A3A] to-[#2A3A4A] flex items-center justify-center text-xs font-bold text-[#8899AA]">
                                            {init}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full h-px bg-[#1A2A3A]" />
                            <div>
                                <div className="text-xs text-[#445566] uppercase tracking-wider mb-1 font-semibold">Status</div>
                                <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded text-red-400 text-xs font-bold mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Active Violation
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Automation Remedies */}
                <div className="shrink-0 flex flex-col mb-2">
                    <h3 className="text-lg font-semibold text-white mb-4">Recommended Prescriptive Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="bg-[#0D1928] border border-red-500/40 p-5 rounded-2xl hover:bg-[#131B2B] transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-[100px] -translate-y-8 translate-x-8 transition-transform group-hover:scale-150" />
                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <h4 className="text-white font-medium text-sm flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold text-white shadow shadow-red-500/50">1</div>
                                    Suspend Payroll & Access (API Trigger)
                                </h4>
                                <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Critical First Step</span>
                            </div>
                            <p className="text-[#8899AA] text-xs leading-relaxed mb-4 relative z-10 h-[54px]">
                                Instant suspension of IT access via Okta and halting upcoming pay cycle deposits until documentation is provided and verified.
                            </p>
                            <Button className="bg-red-600 hover:bg-red-500 text-white border-none py-1.5 px-4 h-auto text-sm w-full relative z-10">
                                Execute Suspension Automation
                            </Button>
                        </div>

                        <div className="bg-[#0D1928] border border-blue-500/30 p-5 rounded-2xl hover:bg-[#131B2B] transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] -translate-y-8 translate-x-8 transition-transform group-hover:scale-150" />
                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <h4 className="text-white font-medium text-sm flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">2</div>
                                    Draft Emergency Vendor Comms
                                </h4>
                            </div>
                            <p className="text-[#8899AA] text-xs leading-relaxed mb-4 relative z-10 h-[54px]">
                                Kaarya AI has prepared a formal notice to the VMS vendor regarding the SLA breach and requesting immediate document upload.
                            </p>
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white border-none py-1.5 px-4 h-auto text-sm w-full relative z-10">
                                Review & Send Comm
                            </Button>
                        </div>

                    </div>
                </div>

                {/* Affected Records Data Grid */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shrink-0 mt-2">
                    <div className="px-6 py-4 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-white">Affected Records Database</h3>
                        <span className="text-xs text-[#445566]">3 Rows</span>
                    </div>
                    <div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0D1928] border-b border-[#1A2A3A]">
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Vendor Emp ID</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Project / Role</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Visa Expiry Date</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Access Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { id: 'V-8942', name: 'James Wilson', role: 'DevOps Lead', date: 'Oct 14, 2023 (Expired)' },
                                    { id: 'V-8945', name: 'Maria Garcia', role: 'Data Engineer', date: 'Oct 14, 2023 (Expired)' },
                                    { id: 'V-9102', name: 'Chen Wei', role: 'Frontend Dev', date: 'Oct 15, 2023 (Expired)' },
                                ].map((emp, i) => (
                                    <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                        <td className="px-6 py-4 text-sm font-medium text-white">{emp.id}</td>
                                        <td className="px-6 py-4 text-sm text-[#8899AA]">{emp.name}</td>
                                        <td className="px-6 py-4 text-sm text-[#8899AA]">{emp.role}</td>
                                        <td className="px-6 py-4 text-sm text-red-400 font-medium">{emp.date}</td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                                                <div className="w-2 h-2 rounded-full bg-emerald-400" /> Active (Warning)
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
