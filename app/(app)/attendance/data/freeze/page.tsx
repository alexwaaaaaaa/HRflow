"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    Lock, Calendar, AlertTriangle, ShieldCheck
} from 'lucide-react';

export default function AttendanceFreeze() {
    return (
        <Page
            title="Attendance Freeze"
            subtitle="Lock attendance records for past payroll cycles to prevent unauthorized retrospective edits."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Data", href: "/attendance/data" }, { label: "Freeze" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Attendance Freeze</h1>
                        <p className="text-sm text-[#8899AA]">Lock attendance records for past payroll cycles to prevent unauthorized retrospective edits.</p>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden p-8 flex flex-col items-center justify-center relative shadow-xl">

                    {/* Glowing background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                        <div className="w-96 h-96 bg-[#0066FF] rounded-full blur-[100px]"></div>
                    </div>

                    <div className="relative z-10 w-full max-w-lg">

                        <div className="text-center mb-10">
                            <div className="w-20 h-20 bg-[#060B14] border border-[#2A3A4A] rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg shadow-[#060B14]">
                                <Lock size={40} className="text-[#8899AA] group-hover:text-white transition-colors" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Current Lock Status</h2>
                            <p className="text-sm text-[#00E5A0] font-mono bg-[#00E5A0]/10 border border-[#00E5A0]/20 px-4 py-2 rounded-lg inline-flex items-center">
                                <ShieldCheck size={16} className="mr-2" /> Data frozen up to: <strong className="ml-2 text-white">31 Oct 2024</strong>
                            </p>
                        </div>

                        <div className="bg-[#060B14] border border-[#1A2A3A] p-6 rounded-xl space-y-6">

                            <h3 className="text-base font-bold text-white border-b border-[#1A2A3A] pb-3">New Freeze Action</h3>

                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Select new safe date to lock</label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-4 top-3.5 text-[#556677]" />
                                    <input
                                        type="date"
                                        className="w-full bg-[#0D1928] border border-[#2A3A4A] text-white text-lg font-bold rounded-lg pl-12 pr-4 py-3 outline-none focus:border-[#0066FF] transition-colors"
                                    />
                                </div>
                                <p className="text-xs text-[#556677] mt-2">All data prior to and including this date will be set to Read-Only mode for everyone.</p>
                            </div>

                            <div className="bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-lg p-4 flex items-start space-x-3">
                                <AlertTriangle size={18} className="text-[#FFB800] mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-[#FFB800] mb-1">Warning</h4>
                                    <p className="text-xs text-[#8899AA] leading-relaxed">
                                        Once frozen, regularizations, shift modifications, and HR overrides for these dates will be blocked. Only Super Admins can un-freeze records.
                                    </p>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-[#0066FF] text-white font-bold text-base rounded-lg hover:bg-[#0052cc] transition-colors shadow-lg shadow-[#0066FF]/20 flex justify-center items-center">
                                <Lock size={18} className="mr-2" /> Lock Attendance Data
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    
        </Page>
        );
}
