"use client";
import React, { useState } from "react";
import {
    TrendingUp, Plus, AlertTriangle, Users, ArrowDown,
    Settings, Clock, Mail, CheckCircle2, ChevronRight, X
} from "lucide-react";

export default function EscalationMatrix() {
    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <TrendingUp size={28} className="text-[#FF4444]" />
                        Escalation Matrix
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Define automated workflows and notifications when tickets breach SLA targets.</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button className="px-5 py-2 bg-[#FF4444] text-white rounded-lg hover:bg-[#ff5c5c] transition-colors text-sm font-semibold flex items-center gap-2 shadow-[0_5px_15px_rgba(255,68,68,0.2)]">
                        <Plus size={16} /> New Escalation Rule
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Side: Rule List */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 bg-[#152336] border-b border-[#1A2A3A] flex justify-between items-center">
                            <h3 className="font-bold text-white text-sm">Active Rules</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            <button className="w-full text-left p-4 bg-[#1A2A3A] border-l-2 border-l-[#FF4444] transition-colors">
                                <span className="text-sm font-bold text-white block mb-0.5">IT Critical Breach</span>
                                <span className="text-xs text-[#8899AA]">Applies to: IT Support • Critical</span>
                            </button>
                            <button className="w-full text-left p-4 hover:bg-[#1A2A3A]/50 border-l-2 border-l-transparent transition-colors">
                                <span className="text-sm font-semibold text-[#8899AA] block mb-0.5">Standard Unassigned</span>
                                <span className="text-xs text-[#445566]">Applies to: All • Unassigned &gt; 2h</span>
                            </button>
                            <button className="w-full text-left p-4 hover:bg-[#1A2A3A]/50 border-l-2 border-l-transparent transition-colors">
                                <span className="text-sm font-semibold text-[#8899AA] block mb-0.5">VIP Executive Escalation</span>
                                <span className="text-xs text-[#445566]">Applies to: VIP Users</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Rule Builder Canvas */}
                <div className="lg:col-span-3">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-8 shadow-xl">

                        {/* Rule Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">IT Critical Breach Rule</h2>
                                <p className="text-[#8899AA] text-sm">Triggers when a Critical priority ticket in IT Support misses its resolution target.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-[#8899AA]">Status:</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-[#1A2A3A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E5A0]"></div>
                                </label>
                            </div>
                        </div>

                        {/* Escalation Path UI */}
                        <div className="relative">

                            {/* Trigger Condition */}
                            <div className="relative z-10 mb-8">
                                <div className="bg-[#1A2A3A] border border-[#2A3A4A] border-l-4 border-l-[#FFB020] rounded-xl p-6 shadow-lg ml-6">
                                    <div className="absolute -left-[45px] top-6 w-10 h-10 rounded-full bg-[#1A2A3A] border-4 border-[#0F1C2E] text-[#FFB020] flex items-center justify-center z-10">
                                        <Clock size={16} />
                                    </div>
                                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">When</h3>
                                    <div className="flex flex-wrap gap-4 items-center text-sm">
                                        <span className="text-[#8899AA]">Ticket matches</span>
                                        <span className="bg-[#0A1420] border border-[#2A3A4A] text-white px-3 py-1.5 rounded-lg font-medium">Category: IT Support</span>
                                        <span className="text-[#8899AA]">AND</span>
                                        <span className="bg-[#0A1420] border border-[#2A3A4A] text-white px-3 py-1.5 rounded-lg font-medium">Priority: Critical</span>
                                        <span className="text-[#8899AA]">AND resolution is overdue by</span>
                                        <select className="bg-[#0A1420] border border-[#2A3A4A] focus:border-[#33E6FF] focus:outline-none text-[#FF4444] font-bold px-3 py-1.5 rounded-lg">
                                            <option>0 mins (Immediately)</option>
                                            <option>15 mins</option>
                                            <option>30 mins</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute left-[39px] top-10 bottom-10 w-1 bg-[#1A2A3A]"></div>

                            {/* Level 1 Escalation */}
                            <div className="relative z-10 mb-8">
                                <div className="bg-[#1A2A3A] border border-[#2A3A4A] border-l-4 border-l-[#FF4444] rounded-xl p-6 shadow-lg ml-6">
                                    <div className="absolute -left-[45px] top-6 w-10 h-10 rounded-full bg-[#1A2A3A] border-4 border-[#0F1C2E] text-[#FF4444] flex items-center justify-center z-10 font-bold text-sm">
                                        L1
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">Escalate To L1</h3>
                                        <button className="text-[#8899AA] hover:text-[#FF4444]"><X size={16} /></button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Users size={16} className="text-[#8899AA]" />
                                            <span className="text-sm font-medium text-white">Reassign Ticket to:</span>
                                            <select className="flex-1 bg-[#0A1420] border border-[#2A3A4A] focus:outline-none text-white px-3 py-1.5 rounded-lg text-sm">
                                                <option>IT Management Team</option>
                                                <option>Specific User</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle size={16} className="text-[#8899AA]" />
                                            <span className="text-sm font-medium text-white">Change Priority to:</span>
                                            <select className="bg-[#0A1420] border border-[#2A3A4A] focus:outline-none text-[#FF4444] font-bold px-3 py-1.5 rounded-lg text-sm">
                                                <option>Unchanged</option>
                                                <option>Critical</option>
                                            </select>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Mail size={16} className="text-[#8899AA] mt-1" />
                                            <div className="flex-1">
                                                <span className="text-sm font-medium text-white block mb-2">Send Email Notification:</span>
                                                <div className="bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-3">
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        <span className="text-xs bg-[#1A2A3A] text-white px-2 py-1 rounded flex items-center gap-1">Assignee <X size={12} /></span>
                                                        <span className="text-xs bg-[#1A2A3A] text-white px-2 py-1 rounded flex items-center gap-1">Department Head <X size={12} /></span>
                                                        <button className="text-xs text-[#33E6FF] px-1">+ Add Recipient</button>
                                                    </div>
                                                    <div className="text-xs font-mono text-[#8899AA]">Template: [SLA Breach] Critical IT Ticket Escalation</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Level 2 Escalation (Delayed) */}
                            <div className="relative z-10 mb-8">
                                <div className="bg-[#1A2A3A]/50 border border-[#2A3A4A] border-dashed rounded-xl p-6 shadow-lg ml-6">
                                    <div className="absolute -left-[45px] top-6 w-10 h-10 rounded-full bg-[#0F1C2E] border-4 border-[#1A2A3A] text-[#8899AA] flex items-center justify-center z-10 font-bold text-sm">
                                        L2
                                    </div>
                                    <button className="w-full text-center py-2 text-[#33E6FF] hover:text-[#00E5A0] font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                        <Plus size={16} /> Add Level 2 Escalation
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Save */}
                        <div className="pt-6 border-t border-[#1A2A3A] flex justify-end gap-3">
                            <button className="px-6 py-2 bg-transparent text-white rounded-xl hover:bg-[#1A2A3A] transition-colors font-semibold">
                                Discard Changes
                            </button>
                            <button className="px-8 py-2 bg-[#FF4444] text-white font-bold rounded-xl hover:bg-[#ff5c5c] transition-colors shadow-[0_10px_20px_rgba(255,68,68,0.2)]">
                                Save Rule
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
