"use client";

import React, { useState } from 'react';
import {
    Clock, CheckCircle, XCircle, FileText
} from 'lucide-react';

export default function CompOffApprovalScreen() {
    const pendingCompOffs = [
        { id: 'CO-912', empName: 'Rohan Sharma', dept: 'Engineering', dateWorked: '10 Nov 2024 (Sunday)', hours: 8, credit: '1 Full Day', reason: 'Emergency hotfix deployment.' },
        { id: 'CO-914', empName: 'David Chen', dept: 'Sales', dateWorked: '03 Nov 2024 (Sunday)', hours: 4.5, credit: '0.5 Half Day', reason: 'Client meeting during US timezone.' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Comp-off Approvals</h1>
                        <p className="text-sm text-[#8899AA]">Review and approve compensatory leave claims.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {pendingCompOffs.map((req) => (
                        <div key={req.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[#1A2A3A] rounded-full border border-[#2A3A4A] flex items-center justify-center text-white font-bold text-lg">
                                        {req.empName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-white">{req.empName}</div>
                                        <div className="text-xs text-[#8899AA]">{req.dept} • {req.id}</div>
                                    </div>
                                </div>
                                <div className="text-right flex items-center bg-[#060B14] border border-[#1A2A3A] px-4 py-2 rounded-lg">
                                    <Clock size={16} className="text-[#0066FF] mr-2" />
                                    <span className="text-[#8899AA] text-sm mr-2">Worked:</span>
                                    <span className="text-white font-bold font-mono">{req.hours} Hrs</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg">
                                    <span className="text-xs text-[#556677] font-bold uppercase tracking-wider block mb-1">Date Worked On</span>
                                    <div className="text-white font-bold text-sm">{req.dateWorked}</div>
                                </div>
                                <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg relative overflow-hidden">
                                    <span className="text-xs text-[#556677] font-bold uppercase tracking-wider block mb-1 relative z-10">Calculated Credit</span>
                                    <div className="text-[#00E5A0] font-black text-lg relative z-10">+{req.credit}</div>
                                    <div className="absolute right-0 top-0 w-24 h-24 bg-[#00E5A0]/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                                </div>
                            </div>

                            <div className="bg-[#060B14] border border-[#1A2A3A] p-4 rounded-lg mb-6">
                                <div className="flex items-start text-sm">
                                    <FileText size={16} className="text-[#8899AA] mr-3 mt-0.5" />
                                    <div>
                                        <span className="text-[#8899AA] font-bold mb-1 block">Work Justification</span>
                                        <span className="text-white italic">"{req.reason}"</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-6">
                                <p className="text-xs text-[#556677]">If approved, {req.credit} will be added to {req.empName.split(' ')[0]}'s Comp-off balance immediately.</p>
                                <div className="flex space-x-3">
                                    <button className="px-6 py-2 border border-[#FF4444]/50 text-[#FF4444] rounded-lg hover:bg-[#FF4444]/10 transition-colors text-sm font-bold flex items-center">
                                        <XCircle size={16} className="mr-2" /> Reject
                                    </button>
                                    <button className="px-6 py-2 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052cc] shadow-[0_0_15px_rgba(0,102,255,0.3)] transition-colors text-sm font-bold flex items-center">
                                        <CheckCircle size={16} className="mr-2" /> Approve Credit
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
