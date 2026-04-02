"use client";

import React from 'react';
import {
    Clock, AlertTriangle, Search, Filter, Mail, RefreshCw, FileText
} from 'lucide-react';
import Link from 'next/link';

const EXPIRING_DOCS = [
    { id: '1', emp: 'Vikram Batra', type: 'Passport', number: 'Z982****', expiry: '10 Dec 2024', daysLeft: 22, status: 'Warning', bg: 'bg-amber-500/10', color: 'text-amber-500', group: 'ID Proofs' },
    { id: '2', emp: 'Neha Sharma', type: 'Work Visa', number: 'V-102***', expiry: '05 Nov 2024', daysLeft: -10, status: 'Expired', bg: 'bg-rose-500/10', color: 'text-rose-500', group: 'Immigration' },
    { id: '3', emp: 'Global Ent.', type: 'Vendor Agreement', number: 'VA-2023-44', expiry: '15 Jan 2025', daysLeft: 58, status: 'Notice Sent', bg: 'bg-indigo-500/10', color: 'text-indigo-500', group: 'Contracts' },
    { id: '4', emp: 'Priya Patel', type: 'Driving License', number: 'DL-14****', expiry: '20 Nov 2024', daysLeft: 2, status: 'Critical', bg: 'bg-rose-500/10', color: 'text-rose-500', group: 'ID Proofs' },
];

export default function DocumentExpiryTrackerScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col h-screen">
            <div className="max-w-[1200px] mx-auto w-full flex flex-col flex-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <Clock className="text-rose-500" size={28} />
                            Document Expiry Tracker
                        </h1>
                        <p className="text-sm text-[#8899AA]">Proactively manage document renewals for IDs, passports, visas, and contracts.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)] flex items-center gap-2">
                            <Mail size={16} /> Send Bulk Reminders
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 shrink-0">
                    <div className="bg-[#0A1420] border border-rose-500/30 rounded-xl p-5 shadow-[0_0_15px_rgba(244,63,94,0.1)] relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-rose-500/10 to-transparent"></div>
                        <div className="text-xs text-rose-500 uppercase tracking-wider font-bold mb-2">Expired</div>
                        <div className="text-3xl font-black text-white mb-1">12</div>
                        <div className="text-xs text-[#8899AA]">Requires immediate action</div>
                    </div>
                    <div className="bg-[#0A1420] border border-amber-500/30 rounded-xl p-5 shadow-[0_0_15px_rgba(245,158,11,0.1)] relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-amber-500/10 to-transparent"></div>
                        <div className="text-xs text-amber-500 uppercase tracking-wider font-bold mb-2">Expiring next 30 days</div>
                        <div className="text-3xl font-black text-white mb-1">45</div>
                        <div className="text-xs text-[#8899AA]">Automated reminders actively sending</div>
                    </div>
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0066FF]/10 to-transparent"></div>
                        <div className="text-xs text-[#0066FF] uppercase tracking-wider font-bold mb-2">Total tracked documents</div>
                        <div className="text-3xl font-black text-white mb-1">3,450</div>
                        <div className="text-xs text-[#8899AA]">Across all employees and vendors</div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-3 mb-6 shrink-0 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search by name, doc type..."
                                className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF] w-64 hover:border-[#2A3A4A] transition-colors"
                            />
                        </div>
                        <button className="px-3 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-sm text-[#8899AA] hover:text-white hover:border-[#2A3A4A] transition-colors flex items-center">
                            <Filter size={16} className="mr-2" /> Categories
                        </button>
                    </div>

                    <div className="flex items-center px-4">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-white">
                            <input type="checkbox" className="accent-[#0066FF] w-4 h-4" defaultChecked />
                            Show only expired/expiring soon
                        </label>
                    </div>
                </div>

                {/* Data Table */}
                <div className="flex-1 bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg flex flex-col min-h-0 overflow-hidden">
                    <div className="overflow-x-auto overflow-y-auto flex-1 custom-scrollbar">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead className="bg-[#060B14] sticky top-0 z-10">
                                <tr>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Employee / Entity</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Document Type</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Expiry Date</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Time Left</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                                    <th className="p-4 border-b border-[#1A2A3A] text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {EXPIRING_DOCS.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-[#0D1928] transition-colors group">
                                        <td className="p-4 text-sm font-bold text-white relative">
                                            {doc.daysLeft < 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>}
                                            {doc.emp}
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                                <FileText size={14} className="text-[#0066FF]" /> {doc.type}
                                            </div>
                                            <div className="text-xs text-[#556677]">{doc.number}</div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-300 font-bold">{doc.expiry}</td>
                                        <td className="p-4">
                                            {doc.daysLeft < 0 ? (
                                                <span className="text-rose-500 font-bold text-sm">Expired {Math.abs(doc.daysLeft)} days ago</span>
                                            ) : (
                                                <span className={`${doc.daysLeft <= 15 ? 'text-rose-500' : 'text-amber-500'} font-bold text-sm`}>
                                                    {doc.daysLeft} Days
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold border border-current ${doc.bg} ${doc.color}`}>
                                                {doc.status === 'Expired' && <AlertTriangle size={12} />}
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="px-3 py-1.5 bg-[#1A2A3A] text-[#8899AA] hover:text-white hover:bg-[#2A3A4A] text-xs font-semibold rounded transition-colors flex items-center gap-1.5 border border-[#2A3A4A]">
                                                    <Mail size={12} /> Remind
                                                </button>
                                                <button className="px-3 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#0066FF] hover:bg-[#0066FF] hover:text-white text-xs font-bold rounded transition-colors flex items-center gap-1.5">
                                                    <RefreshCw size={12} /> Renew
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
        </div>
    );
}
