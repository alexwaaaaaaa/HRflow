"use client";

import Page from "@/components/ui/Page";

import React, { useState } from 'react';
import {
    Clock, AlertCircle, ChevronRight, HelpCircle
} from 'lucide-react';

export default function RegularizationRequest() {
    const [reason, setReason] = useState('Forgot to punch');
    const [date, setDate] = useState('2024-11-06');
    const [inTime, setInTime] = useState('09:00');
    const [outTime, setOutTime] = useState('18:00');

    // Mocks
    const pendingRequests = [
        { date: '04 Nov 2024', status: 'Pending', type: 'Late In', reason: 'Traffic jam due to rain' },
        { date: '28 Oct 2024', status: 'Approved', type: 'Forgot to Punch-out', reason: 'System crash at end of day' }
    ];

    return (
        <Page
            title="Request Attendance Regularization"
            subtitle="Submit corrections for missed punches, late arrivals, or early departures."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Regularization" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Request Attendance Regularization</h1>
                    <p className="text-sm text-[#8899AA]">Submit corrections for missed punches, late arrivals, or early departures.</p>
                </div>

                <div className="grid grid-cols-3 gap-8">

                    {/* Form Component (Left 2 cols) */}
                    <div className="col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4">New Request Form</h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Date of Incident</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors"
                                    />
                                    <p className="text-xs text-[#FFB800] mt-2 flex items-center bg-[#FFB800]/10 px-2 py-1 inline-flex rounded border border-[#FFB800]/20">
                                        <AlertCircle size={12} className="mr-1.5" /> Shows as: "Absent (Missed Punch)" in current roster
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Requested In-Time</label>
                                        <div className="relative">
                                            <Clock size={16} className="absolute left-3 top-3.5 text-[#556677]" />
                                            <input
                                                type="time"
                                                value={inTime}
                                                onChange={e => setInTime(e.target.value)}
                                                className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF] transition-colors relative z-10"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Requested Out-Time</label>
                                        <div className="relative">
                                            <Clock size={16} className="absolute left-3 top-3.5 text-[#556677]" />
                                            <input
                                                type="time"
                                                value={outTime}
                                                onChange={e => setOutTime(e.target.value)}
                                                className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF] transition-colors relative z-10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Reason Class</label>
                                    <select
                                        value={reason}
                                        onChange={e => setReason(e.target.value)}
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors"
                                    >
                                        <option>Forgot to punch</option>
                                        <option>Biometric machine error</option>
                                        <option>Late due to Official Work</option>
                                        <option>Late due to Transport/Traffic</option>
                                        <option>Early out for official work</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Detailed Explanation</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Please provide details for the manager to review..."
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors resize-none"
                                    ></textarea>
                                </div>

                                {/* Approver info */}
                                <div className="bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg p-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs">SV</div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Sonia Varma</div>
                                            <div className="text-xs text-[#8899AA]">Reporting Manager</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-[#8899AA] bg-[#060B14] px-2 py-1 rounded border border-[#1A2A3A]">L1 Route</span>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="px-6 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right side panels */}
                    <div className="col-span-1 space-y-6">

                        {/* Policy Rules */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                                <HelpCircle size={16} className="text-[#0066FF] mr-2" /> Policy Guidelines
                            </h3>
                            <ul className="text-xs text-[#8899AA] space-y-3">
                                <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#8899AA] mr-2 mt-1.5 flex-shrink-0"></div> Requests must be submitted within 3 days of incident.</li>
                                <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#8899AA] mr-2 mt-1.5 flex-shrink-0"></div> Max 3 regularizations allowed per calendar month.</li>
                                <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#8899AA] mr-2 mt-1.5 flex-shrink-0"></div> Non-regularized days will result in LOP in payroll run.</li>
                            </ul>
                            <div className="mt-4 pt-4 border-t border-[#1A2A3A] flex justify-between items-center text-sm">
                                <span className="text-slate-300">Remaining uses:</span>
                                <span className="font-bold text-white">2 <span className="text-[#8899AA] text-xs font-normal">/ 3</span></span>
                            </div>
                        </div>

                        {/* Recent History */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5">
                            <h3 className="text-sm font-bold text-white mb-4">Recent Requests</h3>

                            <div className="space-y-4">
                                {pendingRequests.map((req, i) => (
                                    <div key={i} className="border border-[#1A2A3A] bg-[#0A1420] rounded-lg p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold text-white">{req.date}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${req.status === 'Pending' ? 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/20' :
                                                    'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/20'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </div>
                                        <div className="text-xs font-medium text-slate-300 mb-1">{req.type}</div>
                                        <div className="text-[10px] text-[#8899AA] truncate" title={req.reason}>{req.reason}</div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-4 py-2 border border-[#1A2A3A] text-[#8899AA] hover:text-white transition-colors text-xs font-bold rounded-lg flex justify-center items-center">
                                View Full History <ChevronRight size={14} className="ml-1" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
        );
}
