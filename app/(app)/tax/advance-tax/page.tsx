"use client";

import React, { useState } from 'react';
import {
    BellRing, Mail, CheckCircle2, AlertCircle,
    Search, Filter, Send, Users, CalendarClock, RefreshCw
} from 'lucide-react';

export default function AdvanceTaxReminder() {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setTimeout(() => setSent(false), 3000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
                            <BellRing size={24} className="mr-3 text-[#FF4444]" />
                            Advance Tax Reminders
                        </h1>
                        <p className="text-sm text-[#8899AA]">Identify employees eligible to pay Advance Tax and send automated reminders before quarterly deadlines.</p>
                    </div>
                </div>

                {/* Dashboard Stats & Next Deadline */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-xl shadow-md flex items-center justify-between">
                            <div>
                                <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Eligible Employees</div>
                                <div className="text-2xl font-black text-white">45</div>
                            </div>
                            <div className="w-10 h-10 bg-[#1A2A3A] rounded-full flex items-center justify-center text-[#8899AA]">
                                <Users size={20} />
                            </div>
                        </div>
                        <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-xl shadow-md flex items-center justify-between">
                            <div>
                                <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Total Non-Salary Est.</div>
                                <div className="text-2xl font-black text-[#FFB800]">₹1.2Cr</div>
                            </div>
                            <div className="w-10 h-10 bg-[#FFB800]/10 rounded-full flex items-center justify-center text-[#FFB800]">
                                <AlertCircle size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#FF4444]/5 border border-[#FF4444]/20 p-5 rounded-xl text-center flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4444]/10 rounded-bl-full filter blur-xl"></div>
                        <h4 className="text-xs font-bold text-[#FF4444] uppercase tracking-wider mb-2 flex items-center justify-center">
                            <CalendarClock size={16} className="mr-2" /> Next Deadline: 15 March
                        </h4>
                        <div className="text-lg font-black text-white">Q4 Payment (100%)</div>
                    </div>
                </div>

                {/* Main Panel */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg">

                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-[#FF4444] text-white font-bold text-sm rounded-lg hover:bg-[#e03a3a] transition-colors flex items-center">
                                Trigger Auto-Scan
                            </button>
                        </div>
                        <div className="flex space-x-3 items-center">
                            {sent && (
                                <span className="text-sm font-bold text-[#00E5A0] flex items-center mr-4">
                                    <CheckCircle2 size={16} className="mr-1.5" /> Sent to 45 employees
                                </span>
                            )}
                            <button
                                onClick={handleSend}
                                disabled={sending || sent}
                                className="px-6 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.2)] disabled:opacity-50"
                            >
                                {sending ? <span className="animate-spin mr-2"><RefreshCw size={16} /></span> : <Send size={16} className="mr-2" />}
                                {sending ? 'Sending emails...' : 'Send Reminders'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1A2A3A] text-xs font-bold text-[#8899AA] uppercase tracking-wider bg-[#060B14]">
                        <div className="col-span-1 text-center">
                            <input type="checkbox" checked readOnly className="accent-[#0066FF]" />
                        </div>
                        <div className="col-span-3">Employee Name</div>
                        <div className="col-span-3">Est. Other Income / Gains</div>
                        <div className="col-span-2">Tax Liability Trigger</div>
                        <div className="col-span-3">Status</div>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {/* Rows */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors">
                            <div className="col-span-1 text-center">
                                <input type="checkbox" defaultChecked className="accent-[#0066FF]" />
                            </div>
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white mb-0.5">Amit Sharma</div>
                                <div className="text-xs text-[#8899AA]">EMP042</div>
                            </div>
                            <div className="col-span-3 text-sm font-medium text-slate-300">
                                ₹4,50,000 <span className="text-[10px] text-[#8899AA] ml-1">(Capital Gains Declared)</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-xs font-bold text-[#FF4444] bg-[#FF4444]/10 border border-[#FF4444]/20 px-2 py-1 rounded">
                                    &gt; ₹10,000
                                </span>
                            </div>
                            <div className="col-span-3 text-xs font-semibold text-[#8899AA] flex items-center">
                                Pending for Q4 Reminder
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors">
                            <div className="col-span-1 text-center">
                                <input type="checkbox" defaultChecked className="accent-[#0066FF]" />
                            </div>
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white mb-0.5">Priya Patel</div>
                                <div className="text-xs text-[#8899AA]">EMP112</div>
                            </div>
                            <div className="col-span-3 text-sm font-medium text-slate-300">
                                ₹2,80,000 <span className="text-[10px] text-[#8899AA] ml-1">(Rental Income)</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-xs font-bold text-[#FF4444] bg-[#FF4444]/10 border border-[#FF4444]/20 px-2 py-1 rounded">
                                    &gt; ₹10,000
                                </span>
                            </div>
                            <div className="col-span-3 text-xs font-semibold text-[#8899AA] flex items-center">
                                Pending for Q4 Reminder
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors opacity-50">
                            <div className="col-span-1 text-center">
                                <input type="checkbox" disabled className="accent-[#0066FF]" />
                            </div>
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white mb-0.5">Rahul Verma</div>
                                <div className="text-xs text-[#8899AA]">EMP205</div>
                            </div>
                            <div className="col-span-3 text-sm font-medium text-slate-300">
                                ₹35,000 <span className="text-[10px] text-[#8899AA] ml-1">(FD Interest)</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-xs font-bold text-[#00E5A0] bg-[#00E5A0]/10 border border-[#00E5A0]/20 px-2 py-1 rounded">
                                    &lt; ₹10,000
                                </span>
                            </div>
                            <div className="col-span-3 text-xs font-semibold text-[#8899AA] flex items-center">
                                Not Eligible
                            </div>
                        </div>

                    </div>
                </div>

                <div className="text-xs text-[#556677] text-center mt-4">
                    Advance tax applies if the estimated tax liability for the year (after TDS) is ₹10,000 or more.
                </div>

            </div>
        </div>
    );
}
