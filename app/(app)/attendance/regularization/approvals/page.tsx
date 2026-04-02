"use client";

import React, { useState } from 'react';
import {
    Search, Filter, CheckCircle2, XCircle, Clock, Calendar,
    MessageSquare, Check
} from 'lucide-react';

export default function RegularizationApproval() {
    const [selectedTab, setSelectedTab] = useState('Pending');

    // Mocks
    const requests = [
        { id: '1', empName: 'Rohan Sharma', empId: 'EMP124', dept: 'Engineering', date: '05 Nov 2024', actIn: '--', actOut: '--', reqIn: '09:00 AM', reqOut: '06:00 PM', type: 'Forgot to Punch', reason: 'Wallet with ID card left at home', status: 'Pending' },
        { id: '2', empName: 'Aditi Jain', empId: 'EMP044', dept: 'Sales', date: '04 Nov 2024', actIn: '10:45 AM', actOut: '07:30 PM', reqIn: '09:30 AM', reqOut: '07:30 PM', type: 'Late Arrival (Official)', reason: 'Directly went to client site (Acme Corp)', status: 'Pending' },
        { id: '3', empName: 'Manoj Kumar', empId: 'EMP189', dept: 'Operations', date: '02 Nov 2024', actIn: '08:50 AM', actOut: '12:30 PM', reqIn: '08:50 AM', reqOut: '06:00 PM', type: 'Machine Error', reason: 'Fingerprint scanner was offline at checkout', status: 'Pending' }
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Regularization Approvals</h1>
                        <p className="text-sm text-[#8899AA]">Review and approve attendance adjustments requested by team members.</p>
                    </div>
                </div>

                {/* Tabs & Controls */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center justify-between p-2">
                    <div className="flex space-x-1">
                        {['Pending', 'Approved', 'Rejected'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${selectedTab === tab
                                        ? 'bg-[#1A2A3A] text-white shadow-sm'
                                        : 'text-[#8899AA] hover:text-white'
                                    }`}
                            >
                                {tab} {tab === 'Pending' && <span className="ml-2 bg-[#FFB800] text-[#060B14] rounded-full px-1.5 py-0.5 text-[10px] font-black">{requests.length}</span>}
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
                        <button className="px-3 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors">
                            <Filter size={16} />
                        </button>
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
                                        <Calendar size={12} className="mr-1.5 text-[#0066FF]" /> {req.date}
                                    </div>
                                    <div className="text-[10px] text-[#FFB800] font-bold px-2 py-0.5 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded uppercase tracking-wider inline-block">
                                        {req.type}
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 grid grid-cols-12 gap-6 items-center">
                                {/* Times Comparison */}
                                <div className="col-span-4 bg-[#060B14] rounded-lg border border-[#1A2A3A] overflow-hidden">
                                    <div className="grid grid-cols-2 text-center border-b border-[#1A2A3A]">
                                        <div className="p-2 border-r border-[#1A2A3A] bg-[#1A2A3A]/30">
                                            <span className="text-[10px] text-[#8899AA] uppercase font-bold tracking-widest block mb-1">System Records</span>
                                            <div className="flex justify-between items-center px-2 py-1 bg-[#0D1928] rounded border border-[#2A3A4A] text-xs font-mono text-slate-300">
                                                <span>{req.actIn}</span> <span>→</span> <span>{req.actOut}</span>
                                            </div>
                                        </div>
                                        <div className="p-2 bg-[#0066FF]/5">
                                            <span className="text-[10px] text-[#0066FF] uppercase font-bold tracking-widest block mb-1">Requested Times</span>
                                            <div className="flex justify-between items-center px-2 py-1 bg-[#060B14] rounded border border-[#0066FF]/30 text-xs font-mono font-bold text-white shadow-[0_0_10px_rgba(0,102,255,0.1)]">
                                                <span>{req.reqIn}</span> <span>→</span> <span>{req.reqOut}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 text-center text-[10px] text-[#8899AA] font-medium">
                                        Impact: Resolves LOP / Missing Hours
                                    </div>
                                </div>

                                {/* Employee Comment */}
                                <div className="col-span-5 border-l border-[#1A2A3A] pl-6">
                                    <div className="flex items-start text-sm">
                                        <MessageSquare size={16} className="text-[#556677] mr-3 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-xs font-bold text-[#8899AA] block mb-1">Employee Comment</span>
                                            <p className="text-slate-300 italic">"{req.reason}"</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="col-span-3 flex flex-col space-y-3 justify-center">
                                    <button className="w-full py-2.5 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors flex justify-center items-center shadow-[0_0_15px_rgba(0,229,160,0.2)]">
                                        <Check size={18} className="mr-1.5" /> Approve
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
