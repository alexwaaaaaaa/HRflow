"use client";

import React, { useState } from 'react';
import {
    Search, Filter, CheckCircle2, XCircle, Home, Calendar,
    MessageSquare, Check
} from 'lucide-react';

export default function WfhApprovalScreen() {
    const requests = [
        { id: '1', empName: 'Rohan Sharma', empId: 'EMP124', dept: 'Engineering', date: '08 Nov 2024', remaining: '6/8', reason: 'Personal errands in the morning', status: 'Pending' },
        { id: '2', empName: 'Aditi Jain', empId: 'EMP044', dept: 'Sales', date: '11 Nov 2024', remaining: '1/8', reason: 'Feeling unwell, mild fever', status: 'Pending' }
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">WFH Approvals</h1>
                        <p className="text-sm text-[#8899AA]">Review and manage incoming remote work requests from the team.</p>
                    </div>
                </div>

                {/* Tabs & Controls */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center justify-between p-2">
                    <div className="flex space-x-1">
                        {['Pending', 'Approved', 'Rejected'].map(tab => (
                            <button
                                key={tab}
                                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${tab === 'Pending'
                                        ? 'bg-[#1A2A3A] text-white shadow-sm'
                                        : 'text-[#8899AA] hover:text-white'
                                    }`}
                            >
                                {tab} {tab === 'Pending' && <span className="ml-2 bg-[#0066FF] text-white rounded-full px-1.5 py-0.5 text-[10px] font-black">{requests.length}</span>}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-3 pr-2">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search employee..."
                                className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF] w-48"
                            />
                        </div>
                    </div>
                </div>

                {/* Approvals List */}
                <div className="space-y-4">
                    {requests.map(req => (
                        <div key={req.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden hover:border-[#2A3A4A] transition-colors">
                            {/* Card Header */}
                            <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-6 py-4 flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center font-bold text-white text-sm border border-[#2A3A4A]">
                                        {req.empName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white">{req.empName}</h3>
                                        <div className="text-xs text-[#8899AA]">{req.empId} • {req.dept}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-white flex items-center justify-end mb-0.5">
                                        <Calendar size={12} className="mr-1.5 text-[#0066FF]" /> Req Date: {req.date}
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 grid grid-cols-12 gap-6 items-center">
                                {/* Insights */}
                                <div className="col-span-4 bg-[#060B14] rounded-lg border border-[#1A2A3A] p-4">
                                    <div className="text-[10px] text-[#8899AA] uppercase font-bold tracking-widest block mb-2">Month Balance</div>
                                    <div className="text-2xl font-black text-white">{req.remaining} <span className="text-xs font-bold text-[#556677] ml-1">days left</span></div>
                                </div>

                                {/* Employee Comment */}
                                <div className="col-span-5 border-l border-[#1A2A3A] pl-6">
                                    <div className="flex items-start text-sm">
                                        <MessageSquare size={16} className="text-[#556677] mr-3 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-xs font-bold text-[#8899AA] block mb-1">Reason</span>
                                            <p className="text-slate-300">"{req.reason}"</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="col-span-3 flex flex-col space-y-3 justify-center">
                                    <button className="w-full py-2.5 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors flex justify-center items-center shadow-[0_0_15px_rgba(0,229,160,0.2)]">
                                        <Check size={18} className="mr-1.5" /> Approve WFH
                                    </button>
                                    <button className="w-full py-2.5 border border-[#FF4444] text-[#FF4444] font-bold text-sm rounded-lg hover:bg-[#FF4444]/10 transition-colors flex justify-center items-center">
                                        <XCircle size={18} className="mr-1.5" /> Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
