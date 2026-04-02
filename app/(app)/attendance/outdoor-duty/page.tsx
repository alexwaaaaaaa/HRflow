"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const OD_DATA = [
    { name: "Priya Mehta", dept: "Eng", avatar: "PM", from: "14 Nov", to: "16 Nov", purpose: "Client onboarding — ABC Corp", city: "Pune", status: "Pending" },
    { name: "Vikram Singh", dept: "Sales", avatar: "VS", from: "13 Nov", to: "14 Nov", purpose: "Trade show — Expo 2024", city: "Mumbai", status: "Pending" },
    { name: "Kavya Nair", dept: "HR", avatar: "KN", from: "20 Nov", to: "22 Nov", purpose: "HR summit, Delhi", city: "Delhi", status: "Approved" },
];

export default function OutdoorDuty() {
    const [requests, setRequests] = useState(OD_DATA);
    const [showForm, setShowForm] = useState(false);

    const approve = (i: number) => setRequests(r => r.map((x, j) => j === i ? { ...x, status: "Approved" } : x));

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Outdoor / Tour Duty</h2>
                    <p className="text-sm text-[#8899AA]">Multi-day outdoor assignments requiring travel</p>
                </div>
                <button onClick={() => setShowForm(s => !s)} className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d]">
                    + New OD Request
                </button>
            </div>

            {showForm && (
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-6 space-y-4">
                    <h3 className="font-semibold">New Outdoor Duty Request</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">From Date *</label>
                            <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">To Date *</label>
                            <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs text-[#8899AA] block mb-1">City / Travel Destination *</label>
                            <input placeholder="Delhi" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0] placeholder-[#445566]" />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs text-[#8899AA] block mb-1">Purpose *</label>
                            <textarea rows={2} placeholder="Client onboarding / conference / survey..." className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0] resize-none placeholder-[#445566]" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-xl hover:bg-[#00c98d]">Submit</button>
                        <button onClick={() => setShowForm(false)} className="px-5 py-2 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Cancel</button>
                    </div>
                </div>
            )}

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                        <tr>
                            <th className="px-5 py-3 text-left">Employee</th>
                            <th className="px-5 py-3 text-center">Dates</th>
                            <th className="px-5 py-3 text-left">Purpose</th>
                            <th className="px-5 py-3 text-center">City</th>
                            <th className="px-5 py-3 text-center">Status</th>
                            <th className="px-5 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {requests.map((req, i) => (
                            <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{req.avatar}</div>
                                        <div>
                                            <p className="font-medium">{req.name}</p>
                                            <p className="text-xs text-[#445566]">{req.dept}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-3 text-center text-[#8899AA]">{req.from} → {req.to}</td>
                                <td className="px-5 py-3">{req.purpose}</td>
                                <td className="px-5 py-3 text-center text-[#8899AA]">{req.city}</td>
                                <td className="px-5 py-3 text-center">
                                    {req.status === "Approved"
                                        ? <span className="text-xs text-[#00E5A0] flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />Approved</span>
                                        : <span className="text-xs text-[#FFB800]">⏳ Pending</span>}
                                </td>
                                <td className="px-5 py-3 text-center">
                                    {req.status === "Pending" && (
                                        <div className="flex gap-1 justify-center">
                                            <button onClick={() => approve(i)} className="text-xs text-[#00E5A0] hover:underline">Approve</button>
                                            <span className="text-[#445566]">|</span>
                                            <button className="text-xs text-[#FF4444] hover:underline">Reject</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
