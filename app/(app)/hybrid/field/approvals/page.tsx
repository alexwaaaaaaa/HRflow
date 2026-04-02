"use client";

import React, { useState } from 'react';
import {
    Search, Filter, CheckCircle2, XCircle, MapPin, Calendar,
    MessageSquare, Check, Target, Navigation
} from 'lucide-react';

export default function FieldVisitApprovals() {
    const requests = [
        { id: '1', empName: 'Rohan Sharma', empId: 'EMP124', dept: 'Sales', date: '08 Nov 2024', client: 'Acme Corp HQ', location: 'Navi Mumbai', duration: 'Full Day', reason: 'Q4 Contract Renewal negotiation', status: 'Pending' },
        { id: '2', empName: 'Aditi Jain', empId: 'EMP044', dept: 'Operations', date: '07 Nov 2024', client: 'Warehouse Site-B', location: 'Bhiwandi Area', duration: 'Half Day (Morning)', reason: 'Audit equipment installation', status: 'Pending' }
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Field Visit Approvals</h1>
                        <p className="text-sm text-[#8899AA]">Review out-of-office and client site logs submitted by the team.</p>
                    </div>
                </div>

                {/* Approvals List */}
                <div className="space-y-4">
                    {requests.map(req => (
                        <div key={req.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden hover:border-[#2A3A4A] transition-colors relative">

                            {/* Card Header text-[#FFB800] styling for field visits*/}
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
                                        <Calendar size={12} className="mr-1.5 text-[#FFB800]" /> Date: {req.date}
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 grid grid-cols-12 gap-6 items-center">
                                {/* Insights */}
                                <div className="col-span-4 bg-[#060B14] rounded-lg border border-[#1A2A3A] p-4 flex flex-col justify-center">
                                    <div className="text-[10px] text-[#8899AA] uppercase font-bold tracking-widest block mb-2">Visit Destination</div>
                                    <div className="text-sm font-black text-white flex items-center mb-1"><Target size={14} className="mr-1.5 text-[#FFB800]" /> {req.client}</div>
                                    <div className="text-xs text-[#8899AA] flex items-center"><Navigation size={12} className="mr-1.5" /> {req.location}</div>
                                </div>

                                {/* Employee Comment */}
                                <div className="col-span-5 border-l border-[#1A2A3A] pl-6">
                                    <div className="flex items-start text-sm">
                                        <MessageSquare size={16} className="text-[#556677] mr-3 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-xs font-bold text-[#8899AA] block mb-1">Agenda / Duration</span>
                                            <p className="text-slate-300">"{req.reason}"</p>
                                            <p className="text-[10px] font-bold text-[#FFB800] uppercase tracking-wider mt-2">{req.duration}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="col-span-3 flex flex-col space-y-3 justify-center">
                                    <button className="w-full py-2.5 bg-[#FFB800] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#e6a600] transition-colors flex justify-center items-center shadow-[0_0_15px_rgba(255,184,0,0.2)]">
                                        <Check size={18} className="mr-1.5" /> Approve Visit
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
