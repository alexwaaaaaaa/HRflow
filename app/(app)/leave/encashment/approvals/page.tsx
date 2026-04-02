"use client";

import React, { useState } from 'react';
import {
    CheckCircle, XCircle, Search, DollarSign, Calendar
} from 'lucide-react';

export default function LeaveEncashmentApproval() {
    const requests = [
        { id: 'ENC-2401', emp: 'Arjun Mehta', dept: 'Product', amount: '₹14,000', days: 8, balanceBefore: 20, reason: 'Personal expenses', appliedOn: '16 Nov 2024' },
        { id: 'ENC-2422', emp: 'Sneha Patel', dept: 'Engineering', amount: '₹26,500', days: 12, balanceBefore: 18, reason: 'Medical emergency', appliedOn: '18 Nov 2024' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1200px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Leave Encashment Approvals</h1>
                        <p className="text-sm text-[#8899AA]">HR / Finance review panel for EL conversion requests.</p>
                    </div>
                </div>

                {/* Queue */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="relative w-80">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search employee..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                        <div className="text-sm font-bold text-[#8899AA]">
                            {requests.length} Pending Approvals
                        </div>
                    </div>

                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-center">Days Requested</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-right">Est. Payout</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider pl-8">Remaining Balance</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-white text-base">{req.emp}</div>
                                        <div className="text-xs text-[#8899AA] mt-0.5">{req.dept} • Req: {req.id}</div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="inline-block bg-[#0A1420] border border-[#1A2A3A] px-3 py-1 rounded-lg">
                                            <span className="text-lg font-black text-[#0066FF]">{req.days}</span> <span className="text-xs font-bold text-[#556677]">EL</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="text-lg font-black text-[#00E5A0] flex items-center justify-end">
                                            {req.amount}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 pl-8">
                                        <div className="text-sm text-white font-bold">{req.balanceBefore - req.days} Days</div>
                                        <div className="text-[10px] text-[#8899AA]">After approval (Current: {req.balanceBefore})</div>
                                    </td>
                                    <td className="px-6 py-5 text-right border-l border-[#1A2A3A]/50">
                                        <div className="flex justify-end space-x-2">
                                            <button className="px-4 py-2 border border-[#FF4444]/50 text-[#FF4444] rounded-lg hover:bg-[#FF4444]/10 transition-colors text-xs font-bold font-mono">
                                                REJECT
                                            </button>
                                            <button className="px-4 py-2 bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0] rounded-lg hover:bg-[#00E5A0]/20 transition-colors text-xs font-bold font-mono flex items-center">
                                                APPROVE <CheckCircle size={14} className="ml-2" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
