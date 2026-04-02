"use client";

import React, { useState } from 'react';
import { MessageSquare, Plus, Search, Filter, Smartphone, CheckCircle2, RotateCcw, Building2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function WhatsAppTemplateSettingsPage() {
    const templates = [
        { id: 'WA-ONB-01', name: 'Interview Reminder', category: 'Recruitment', status: 'Approved', content: 'Hi {{candidate_name}}, friendly reminder of your interview for {{role_name}} at Kaarya tomorrow at {{time}}. Reply "CONFIRM" to acknowledge.', language: 'en_US' },
        { id: 'WA-LV-02', name: 'Leave Approved Alert', category: 'Leave & Attendance', status: 'Approved', content: 'Your leave request for {{days}} days from {{start_date}} has been approved by {{manager_name}}.', language: 'en_IN' },
        { id: 'WA-PAY-01', name: 'Payslip Generated', category: 'Payroll', status: 'Pending Meta Review', content: 'Hi {{first_name}}, your payslip for the month of {{month_year}} is now available. View it securely here: {{link}}.', language: 'en_US' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <MessageSquare size={28} className="text-[#25D366]" /> WhatsApp Templates
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-3xl leading-relaxed">
                        Manage transactional WhatsApp Business API templates. <strong className="text-white">Note:</strong> All structural changes must be approved by Meta before they can be sent to users.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <RotateCcw size={16} className="mr-2" /> Sync with Meta
                    </Button>
                    <Button className="bg-[#25D366] hover:bg-[#128C7E] text-slate-900 font-semibold border-none py-2 px-6">
                        <Plus size={16} className="mr-2" /> New Template
                    </Button>
                </div>
            </div>

            {/* Provider Context */}
            <div className="mb-6 bg-[#131B2B] border border-[#1A2A3A] rounded-xl p-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    <div className="bg-[#0A1420] border border-[#2A3A4A] p-2 rounded-lg text-[#8899AA]">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <div className="text-white font-medium text-sm">WABA ID: 105829471928471</div>
                        <div className="text-xs text-[#8899AA] flex items-center gap-2 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Connected to Kaarya HR (Phone: +91 98765 43210)
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-white">Quality Rating: High</div>
                    <div className="text-xs text-[#8899AA] mt-0.5">Tier 2 (10k msgs/day)</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">

                {/* Templates List Area */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col h-full overflow-hidden">

                    <div className="p-4 border-b border-[#1A2A3A] bg-[#131B2B] flex justify-between items-center shrink-0">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-[#25D366]/50 transition-colors w-64">
                            <Search size={14} className="text-[#8899AA]" />
                            <input type="text" placeholder="Search message content..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" />
                        </div>
                        <Button variant="secondary" className="border-[#2A3A4A] text-xs h-auto py-1.5 flex items-center gap-2">
                            All Categories <Filter size={14} />
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto w-full p-4 space-y-4">
                        {templates.map((tpl) => (
                            <div key={tpl.id} className="bg-[#131B2B] border border-[#2A3A4A] hover:border-[#25D366]/30 transition-colors rounded-xl p-5 cursor-pointer group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-white font-medium text-sm">{tpl.name}</h3>
                                        <span className="text-xs text-[#445566] font-mono bg-[#0A1420] px-2 py-0.5 rounded border border-[#1A2A3A]">{tpl.id}</span>
                                        <span className="text-[10px] text-[#8899AA] uppercase tracking-wider">{tpl.language}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${tpl.status === 'Approved'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                        }`}>
                                        {tpl.status}
                                    </span>
                                </div>
                                <div className="text-sm text-[#c0c6cc] leading-relaxed relative pl-4 border-l-2 border-[#1A2A3A]">
                                    {/* Highlight variables */}
                                    {tpl.content.split(/(\{\{.*?\}\})/).map((part, i) =>
                                        part.startsWith('{{') ? <span key={i} className="text-[#25D366] font-medium">{part}</span> : part
                                    )}
                                </div>
                                <div className="mt-4 pt-3 border-t border-[#1A2A3A] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs text-[#8899AA]">Category: {tpl.category}</span>
                                    <div className="flex gap-4 text-xs font-medium">
                                        <button className="text-indigo-400 hover:text-indigo-300">View Parameters</button>
                                        <button className="text-[#8899AA] hover:text-white">Duplicate</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Preview Area */}
                <div className="lg:col-span-1 bg-[#131B2B] border border-[#1A2A3A] rounded-2xl flex flex-col items-center justify-center p-6 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#0A1420] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 blur-[1px]"></div>

                    <h3 className="text-white font-semibold mb-6 flex items-center gap-2 relative z-10">
                        <Smartphone size={18} className="text-[#8899AA]" /> Device Preview
                    </h3>

                    <div className="w-[280px] h-[580px] bg-[#0A1420] rounded-[3rem] border-[8px] border-[#1A2A3A] shadow-2xl relative flex flex-col z-10 overflow-hidden">
                        {/* Phone Notch */}
                        <div className="absolute top-0 inset-x-0 h-6 bg-[#1A2A3A] rounded-b-xl w-32 mx-auto z-20"></div>

                        {/* WA Header */}
                        <div className="bg-[#075E54] h-16 w-full flex items-end px-4 pb-3 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                    <Building2 size={16} className="text-[#075E54]" />
                                </div>
                                <div className="text-white">
                                    <div className="text-sm font-semibold">Kaarya HR</div>
                                    <div className="text-[10px] opacity-80 flex items-center gap-1"><CheckCircle2 size={10} /> Official Business Account</div>
                                </div>
                            </div>
                        </div>

                        {/* WA Chat Body */}
                        <div className="flex-1 bg-[#efeae2] p-4 flex flex-col gap-4 overflow-y-auto">
                            <div className="bg-[#dcf8c6] self-start rounded-xl rounded-tl-none p-3 shadow-sm max-w-[90%] relative">
                                <p className="text-[#111111] text-sm leading-relaxed">
                                    Hi <strong className="font-semibold text-black">Aarav Patel</strong>, friendly reminder of your interview for <strong className="font-semibold text-black">Senior Developer</strong> at Kaarya tomorrow at <strong className="font-semibold text-black">10:30 AM</strong>. Reply "CONFIRM" to acknowledge.
                                </p>
                                <div className="text-[9px] text-gray-500 text-right mt-1">10:42 AM</div>
                            </div>

                            <div className="bg-white self-end rounded-xl rounded-tr-none p-3 shadow-sm max-w-[80%] relative">
                                <p className="text-[#111111] text-sm leading-relaxed">CONFIRM</p>
                                <div className="text-[9px] text-gray-500 text-right mt-1">10:45 AM</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
