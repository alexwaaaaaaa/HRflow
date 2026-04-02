"use client";

import React, { useState } from 'react';
import {
    Users, Shield, ArrowLeft, Lock, Plus, Trash2, Edit2, FileText, CheckCircle2, ChevronDown
} from 'lucide-react';
import Link from 'next/link';

const ACCESS_LIST = [
    { id: '1', user: 'HR Admin Team', type: 'Group', perm: 'Owner', date: '01 Nov 2024' },
    { id: '2', user: 'Rahul Sharma', type: 'User', perm: 'View & Edit', date: '05 Nov 2024' },
    { id: '3', user: 'Reporting Manager (Anita D.)', type: 'Role Context', perm: 'View Only', date: '10 Nov 2024' },
];

export default function DocumentAccessControlScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto pb-12">

                {/* Header */}
                <div className="mb-6">
                    <Link href="/documents/repository" className="inline-flex items-center text-sm text-[#8899AA] hover:text-white mb-4 transition-colors">
                        <ArrowLeft size={16} className="mr-1" /> Back to Document Details
                    </Link>
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                                <Lock size={32} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Access Control & Sharing</h1>
                                <p className="text-sm text-[#8899AA] mt-1 font-medium flex items-center gap-2">
                                    <FileText size={14} /> Appointment_Letter_RahulS.pdf
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Col: Main Sharing Settings */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg">
                            <div className="p-5 border-b border-[#1A2A3A] bg-[#0D1928] flex justify-between items-center">
                                <h2 className="text-base font-bold text-white">Who has access</h2>
                                <button className="px-3 py-1.5 bg-[#0066FF] text-white text-xs font-bold rounded hover:bg-[#0052cc] transition-colors flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,102,255,0.3)]">
                                    <Plus size={14} /> Add User/Group
                                </button>
                            </div>

                            <div className="divide-y divide-[#1A2A3A]">
                                {ACCESS_LIST.map(itm => (
                                    <div key={itm.id} className="p-4 flex items-center justify-between hover:bg-[#1A2A3A]/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[#8899AA]">
                                                {itm.type === 'User' ? <Users size={18} /> : <Shield size={18} />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-sm">{itm.user}</h3>
                                                <p className="text-xs text-[#556677]">{itm.type} • Added {itm.date}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 bg-[#060B14] border border-[#1A2A3A] px-3 py-1.5 rounded cursor-pointer hover:border-[#2A3A4A] transition-colors">
                                                <span className="text-xs font-semibold text-slate-300">{itm.perm}</span>
                                                <ChevronDown size={14} className="text-[#556677]" />
                                            </div>
                                            {itm.perm !== 'Owner' && (
                                                <button className="text-[#556677] hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg p-5">
                            <h2 className="text-base font-bold text-white mb-4 border-b border-[#1A2A3A] pb-2">Link Sharing</h2>

                            <div className="p-4 border border-[#1A2A3A] rounded-lg bg-[#060B14] flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]"></div>
                                        <h3 className="font-bold text-white text-sm">Link Sharing is Restricted</h3>
                                    </div>
                                    <p className="text-xs text-[#8899AA]">Only explicitly added users can access this file.</p>
                                </div>
                                <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors">
                                    Change to Org-Wide
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Parent Permissions & Expiry */}
                    <div className="space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg p-5">
                            <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-[#8899AA]">Inheritance</h2>
                            <div className="flex items-start gap-3 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-500">
                                <Shield size={18} className="shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold mb-1">Inheriting from "Employee Records"</p>
                                    <p className="text-[10px] text-indigo-500/70">HR Admins have automatic 'Owner' access to this file because of folder-level permissions.</p>
                                    <button className="text-xs font-bold underline mt-2 hover:text-white transition-colors">Break Inheritance</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg p-5">
                            <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-[#8899AA]">Access Expiry Settings</h2>

                            <label className="flex items-start gap-3 mb-4 cursor-pointer">
                                <input type="checkbox" className="accent-[#0066FF] mt-1 shrink-0" defaultChecked />
                                <div>
                                    <div className="text-sm font-bold text-white">Auto-revoke access on separation</div>
                                    <div className="text-xs text-[#556677]">When Rahul Sharma's status changes to 'Separated', block his access.</div>
                                </div>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" className="accent-[#0066FF] mt-1 shrink-0" />
                                <div>
                                    <div className="text-sm font-bold text-slate-300">Set temporary access</div>
                                    <div className="text-xs text-[#556677]">Automatically remove external viewers after a certain date.</div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
