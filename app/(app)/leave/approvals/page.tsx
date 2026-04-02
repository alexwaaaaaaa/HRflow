"use client";

import React, { useState } from 'react';
import {
    Search, CheckCircle, XCircle, Calendar, MessageSquare, AlertTriangle
} from 'lucide-react';

export default function LeaveApprovalManagerScreen() {
    const pendingRequests = [
        { id: 'REQ-4512', name: 'Rohan Sharma', dept: 'Engineering', type: 'Privilege Leave', duration: '3 Days', dates: '24 Nov - 26 Nov', reason: 'Attending a family wedding out of station.', balance: 14.5, conflict: null },
        { id: 'REQ-4518', name: 'Priya Nair', dept: 'HR', type: 'Sick Leave', duration: '1 Day', dates: '12 Nov', reason: 'Not feeling well, running a fever.', balance: 4, conflict: 'Overlap with David Chen' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Leave Approvals</h1>
                        <p className="text-sm text-[#8899AA]">Review and action leave requests from your reporting team.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] p-1 rounded-xl inline-flex space-x-1 mb-4">
                    <button className="px-6 py-2 rounded-lg bg-[#0066FF] text-white text-sm font-bold shadow-sm">
                        Pending (2)
                    </button>
                    <button className="px-6 py-2 rounded-lg text-[#8899AA] hover:text-white text-sm font-bold hover:bg-[#1A2A3A] transition-colors">
                        Actioned History
                    </button>
                </div>

                {/* Approvals List */}
                <div className="space-y-6">
                    {pendingRequests.map((req) => (
                        <div key={req.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg hover:border-[#2A3A4A] transition-colors">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center font-bold text-white border-2 border-[#2A3A4A]">
                                            {req.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-white">{req.name} <span className="text-xs font-normal text-[#8899AA] ml-2">({req.dept})</span></div>
                                            <div className="text-sm text-[#556677] mt-0.5">Req ID: {req.id}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-black text-white">{req.duration}</div>
                                        <div className="text-xs font-bold text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-0.5 rounded border border-[#00E5A0]/20 inline-block mt-1 uppercase w-max">
                                            {req.type}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6 mb-6">
                                    <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg">
                                        <span className="text-xs text-[#8899AA] font-bold uppercase tracking-wider block mb-1">Dates</span>
                                        <div className="font-bold text-white flex items-center"><Calendar size={14} className="mr-2 text-[#0066FF]" /> {req.dates}</div>
                                    </div>
                                    <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg col-span-2 relative">
                                        <span className="text-xs text-[#8899AA] font-bold uppercase tracking-wider block mb-1">Reason Provided</span>
                                        <div className="font-medium text-white italic">"{req.reason}"</div>
                                        <MessageSquare size={32} className="absolute right-4 bottom-2 text-[#1A2A3A] opacity-50" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-6">
                                    <div className="flex space-x-6">
                                        <div className="flex items-center text-sm">
                                            <span className="w-2 h-2 rounded-full bg-[#00E5A0] mr-2"></span>
                                            <span className="text-[#8899AA] mr-2">Available Balance:</span> <span className="font-bold text-white">{req.balance} days</span>
                                        </div>
                                        {req.conflict ? (
                                            <div className="flex items-center text-sm text-[#FFB800]">
                                                <AlertTriangle size={14} className="mr-2" />
                                                <span className="font-bold">Team Conflict: {req.conflict}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-sm text-[#556677]">
                                                <CheckCircle size={14} className="mr-2" /> No team overlaps
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex space-x-3">
                                        <button className="px-6 py-2.5 bg-[#0A1420] border border-[#1A2A3A] text-[#FF4444] font-bold text-sm rounded-lg hover:bg-[#FF4444]/10 transition-colors flex items-center">
                                            <XCircle size={16} className="mr-2" /> Reject
                                        </button>
                                        <button className="px-6 py-2.5 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00cca0] transition-colors flex items-center shadow-[0_0_15px_rgba(0,229,160,0.3)]">
                                            <CheckCircle size={16} className="mr-2" /> Approve Leave
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
