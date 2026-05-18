"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    Gift, CheckCircle2, XCircle, Clock
} from 'lucide-react';

export default function CompOffManagement() {
    return (
        <Page
            title="Compensatory Off (Comp-off)"
            subtitle="Manage extra leaves granted for working on holidays or weekly off days."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Comp Off" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Compensatory Off (Comp-off)</h1>
                        <p className="text-sm text-[#8899AA]">Manage extra leaves granted for working on holidays or weekly off days.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        Grant Manual Comp-off
                    </button>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <h3 className="text-sm font-medium text-[#8899AA] mb-2 flex items-center"><Clock size={16} className="mr-2" /> Pending Granst Requests</h3>
                        <div className="text-3xl font-black text-[#FFB800]">12</div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <h3 className="text-sm font-medium text-[#8899AA] mb-2 flex items-center"><Gift size={16} className="mr-2 text-[#00E5A0]" /> Availing Comp-off Today</h3>
                        <div className="text-3xl font-black text-[#00E5A0]">4 <span className="text-sm font-normal text-[#556677]">employees</span></div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <h3 className="text-sm font-medium text-[#8899AA] mb-1">Auto-Grant Rule</h3>
                        <p className="text-xs text-white mb-2">Granted automatically if minimum <span className="font-bold text-[#00E5A0]">6h 0m</span> logged on a holiday.</p>
                        <button className="text-[10px] uppercase font-bold text-[#0066FF] border border-[#0066FF]/30 px-2 py-1 rounded">Edit Policy</button>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    {/* Tabs */}
                    <div className="flex border-b border-[#1A2A3A] bg-[#0A1420]">
                        <button className="px-6 py-4 text-sm font-bold border-b-2 border-[#0066FF] text-white">Pending Requests (12)</button>
                        <button className="px-6 py-4 text-sm font-bold border-b-2 border-transparent text-[#8899AA] hover:text-white">Active Balances</button>
                        <button className="px-6 py-4 text-sm font-bold border-b-2 border-transparent text-[#8899AA] hover:text-white">Recent Grants</button>
                    </div>

                    <div className="p-6">
                        {/* Mock pending req card */}
                        <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-5 flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <div>
                                    <div className="font-bold text-white text-base">Manoj Kumar (EMP189)</div>
                                    <div className="text-xs text-[#8899AA]">Worked on Deepavali (Holiday)</div>
                                </div>
                                <div className="h-10 w-px bg-[#1A2A3A]"></div>
                                <div>
                                    <div className="text-[10px] text-[#556677] uppercase font-bold tracking-wider mb-1">Logged Time</div>
                                    <div className="text-sm font-bold text-white font-mono">09:30 AM → 04:45 PM (7h 15m)</div>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button className="px-4 py-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors flex items-center">
                                    <CheckCircle2 size={16} className="mr-1.5" /> Approve (+1 Balance)
                                </button>
                                <button className="px-4 py-2 border border-[#FF4444] text-[#FF4444] font-bold text-sm rounded-lg hover:bg-[#FF4444]/10 transition-colors flex items-center">
                                    <XCircle size={16} className="mr-1.5" /> Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
        );
}
