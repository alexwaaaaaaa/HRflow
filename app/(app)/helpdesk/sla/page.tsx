"use client";
import React, { useState } from "react";
import {
    Clock, Plus, Settings, AlertCircle, ShieldCheck,
    ChevronDown, Trash2, Edit2, Zap
} from "lucide-react";

export default function SLAConfig() {
    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <ShieldCheck size={28} className="text-[#00E5A0]" />
                        Service Level Agreements (SLA)
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Define expectations for response and resolution times to maintain high support quality.</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button className="px-5 py-2 bg-[#00E5A0] text-[#0A1420] rounded-lg hover:bg-[#00c98d] transition-colors text-sm font-semibold flex items-center gap-2">
                        <Plus size={16} /> Create SLA Policy
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4">SLA Policies</h3>
                        <div className="space-y-2">
                            <button className="w-full flex justify-between items-center p-3 rounded-xl bg-[#1A2A3A] border border-[#00E5A0]">
                                <span className="text-sm font-semibold text-white">Default Internal SLA</span>
                                <span className="text-[10px] bg-[#00E5A0]/20 text-[#00E5A0] px-1.5 rounded uppercase font-bold tracking-wider">Active</span>
                            </button>
                            <button className="w-full flex justify-between items-center p-3 rounded-xl bg-transparent border border-transparent hover:border-[#2A3A4A] group transition-colors">
                                <span className="text-sm text-[#8899AA] group-hover:text-white font-medium">VIP Management</span>
                                <span className="text-[10px] bg-[#1A2A3A] text-[#8899AA] px-1.5 rounded uppercase font-bold tracking-wider">Active</span>
                            </button>
                            <button className="w-full flex justify-between items-center p-3 rounded-xl bg-transparent border border-transparent hover:border-[#2A3A4A] group transition-colors">
                                <span className="text-sm text-[#8899AA] group-hover:text-white font-medium">Hardware Replacements</span>
                                <span className="text-[10px] bg-[#1A2A3A] text-[#8899AA] px-1.5 rounded uppercase font-bold tracking-wider border border-[#2A3A4A]">Draft</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#gradient-to-br from-[#1A2A3A] to-[#0A1420]] border border-[#2A3A4A] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2"><Clock size={16} className="text-[#33E6FF]" /> Business Hours</h3>
                        <p className="text-sm text-[#8899AA] mb-4">SLAs only count down during specified business hours.</p>
                        <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none mb-2">
                            <option>Standard (Mon-Fri, 9am - 6pm)</option>
                            <option>24/7 Support</option>
                        </select>
                        <button className="text-sm font-semibold text-[#00E5A0] hover:underline">Manage Calendars</button>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-xl">

                        <div className="p-8 border-b border-[#1A2A3A] flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Default Internal SLA <button className="ml-2 text-[#445566] hover:text-white transition-colors align-middle"><Edit2 size={16} /></button></h2>
                                <p className="text-[#8899AA] text-sm">Applies to all tickets unless a more specific SLA policy matches.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-[#8899AA]">Status:</span>
                                <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/20 rounded-full px-3 py-1 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse"></div>
                                    <span className="text-[#00E5A0] text-xs font-bold uppercase tracking-wider">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-10">

                            {/* Targets Table */}
                            <section>
                                <h3 className="text-sm font-bold tracking-wider text-[#8899AA] uppercase mb-4 flex items-center gap-2">
                                    <Clock size={16} /> Targets by Priority
                                </h3>
                                <div className="border border-[#1A2A3A] bg-[#0A1420] rounded-xl overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-[#152336] text-[#8899AA] text-xs uppercase tracking-wider border-b border-[#1A2A3A]">
                                                <th className="p-4 w-1/4">Priority</th>
                                                <th className="p-4 w-1/3">First Response Time</th>
                                                <th className="p-4 w-1/3">Resolution Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#1A2A3A]">
                                            {[
                                                { level: "Critical", resp: "15 mins", res: "2 hrs", color: "text-[#FF4444]" },
                                                { level: "High", resp: "1 hr", res: "8 hrs", color: "text-[#FFB020]" },
                                                { level: "Medium", resp: "4 hrs", res: "24 hrs", color: "text-[#33E6FF]" },
                                                { level: "Low", resp: "8 hrs", res: "48 hrs", color: "text-[#8899AA]" },
                                            ].map(p => (
                                                <tr key={p.level} className="text-sm text-white hover:bg-[#1A2A3A]/30">
                                                    <td className={`p-4 font-bold ${p.color}`}>{p.level}</td>
                                                    <td className="p-4">
                                                        <div className="flex bg-[#1A2A3A] rounded border border-[#2A3A4A] overflow-hidden w-fit">
                                                            <input type="text" defaultValue={p.resp.split(' ')[0]} className="w-12 bg-transparent text-center px-2 py-1 focus:outline-none" />
                                                            <select className="bg-[#2A3A4A] text-[#8899AA] px-2 border-l border-[#2A3A4A] focus:outline-none focus:text-white">
                                                                <option selected={p.resp.includes('mins')}>mins</option>
                                                                <option selected={p.resp.includes('hr')}>hrs</option>
                                                                <option>days</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex bg-[#1A2A3A] rounded border border-[#2A3A4A] overflow-hidden w-fit">
                                                            <input type="text" defaultValue={p.res.split(' ')[0]} className="w-12 bg-transparent text-center px-2 py-1 focus:outline-none" />
                                                            <select className="bg-[#2A3A4A] text-[#8899AA] px-2 border-l border-[#2A3A4A] focus:outline-none focus:text-white">
                                                                <option>mins</option>
                                                                <option selected={p.res.includes('hr')}>hrs</option>
                                                                <option>days</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Applicability Conditions */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold tracking-wider text-[#8899AA] uppercase flex items-center gap-2">
                                        <Settings size={16} /> Applies To (Conditions)
                                    </h3>
                                </div>
                                <div className="bg-[#1A2A3A] border border-[#2A3A4A] p-6 rounded-xl flex flex-col items-center justify-center text-center">
                                    <p className="text-[#8899AA] text-sm mb-4">This default policy applies to <strong className="text-white">All Tickets</strong>.</p>
                                    <button className="px-4 py-2 border border-[#445566] text-[#8899AA] hover:text-white hover:border-[#8899AA] rounded-lg transition-colors text-sm font-medium">
                                        Add Condition (e.g., Department = HR)
                                    </button>
                                </div>
                            </section>

                            {/* Actions Area */}
                            <div className="flex justify-end pt-6 border-t border-[#1A2A3A]">
                                <button className="px-8 py-3 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-colors shadow-[0_10px_20px_rgba(0,229,160,0.2)]">
                                    Save Policy
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
