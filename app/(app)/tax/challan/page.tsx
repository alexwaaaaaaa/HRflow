"use client";

import React, { useState } from 'react';
import {
    FileText, Plus, Download, CheckCircle2,
    AlertCircle, Search, Filter, CalendarDays, Receipt
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TDSChallanScreen() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
                            <Receipt size={24} className="mr-3 text-[#00E5A0]" />
                            TDS Challans (Form 281)
                        </h1>
                        <p className="text-sm text-[#8899AA]">Manage and link your monthly TDS deposit challans for FY 2024-25.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-sm font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2" /> Export Log
                        </button>
                        <button className="px-4 py-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors flex items-center">
                            <Plus size={16} className="mr-2" /> New Challan
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Total TDS Deposited</div>
                            <div className="text-2xl font-black text-white">₹38,45,200</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-[#00E5A0] font-bold">10 Months</div>
                            <div className="text-xs text-[#8899AA]">FY 24-25</div>
                        </div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Pending Liability</div>
                            <div className="text-2xl font-black text-[#FFB800]">₹4,12,500</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-[#FFB800] font-bold">Feb 2025</div>
                            <div className="text-xs text-[#8899AA]">Due: Mar 7</div>
                        </div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-xl flex items-center justify-between bg-gradient-to-br from-[#0D1928] to-[#1A2A3A] relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-5 bg-[#00E5A0] w-24 h-24 rounded-full blur-2xl"></div>
                        <div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">Compliance Status</div>
                            <div className="text-xl font-bold text-[#00E5A0] flex items-center">
                                <CheckCircle2 size={20} className="mr-2" /> Up to date
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">

                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="flex space-x-2">
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white px-3 py-1.5 rounded-lg outline-none cursor-pointer">
                                <option>FY 2024-25</option>
                                <option>FY 2023-24</option>
                            </select>
                            <button className="px-3 py-1.5 border border-[#1A2A3A] text-xs font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-[#8899AA]">
                                <Filter size={14} className="mr-1.5" /> Filter
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search BSR or Challan No..."
                                className="bg-[#060B14] border border-[#1A2A3A] px-4 py-1.5 pl-9 rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5A0] w-64"
                            />
                            <Search size={16} className="absolute left-3 top-2.5 text-[#8899AA]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1A2A3A] text-xs font-bold text-[#8899AA] uppercase tracking-wider bg-[#060B14]">
                        <div className="col-span-2">Month</div>
                        <div className="col-span-2">Amount</div>
                        <div className="col-span-2">Date of Deposit</div>
                        <div className="col-span-2">BSR Code</div>
                        <div className="col-span-2">Challan S.No.</div>
                        <div className="col-span-2">Status</div>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {/* Current Month - Pending */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-[#FFB800]/5 hover:bg-[#FFB800]/10 transition-colors">
                            <div className="col-span-2">
                                <div className="text-sm font-bold text-white mb-0.5">Feb 2025</div>
                                <div className="text-[10px] text-[#FFB800]">Due: 07 Mar</div>
                            </div>
                            <div className="col-span-2 text-sm font-bold text-white">₹4,12,500</div>
                            <div className="col-span-2 text-sm text-slate-500">—</div>
                            <div className="col-span-2 text-sm text-slate-500">—</div>
                            <div className="col-span-2 text-sm text-slate-500">—</div>
                            <div className="col-span-2">
                                <button className="px-3 py-1.5 bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20 font-semibold text-xs rounded-lg hover:bg-[#FFB800]/20 transition-colors">
                                    Update Challan
                                </button>
                            </div>
                        </div>

                        <ChallanRow month="Jan 2025" amt="₹3,95,000" date="05 Feb 2025" bsr="0241051" sno="12457" status="Deposited" />
                        <ChallanRow month="Dec 2024" amt="₹3,88,200" date="04 Jan 2025" bsr="0241051" sno="58992" status="Deposited" />
                        <ChallanRow month="Nov 2024" amt="₹3,88,200" date="06 Dec 2024" bsr="6910243" sno="00145" status="Deposited" />
                        <ChallanRow month="Oct 2024" amt="₹3,92,100" date="05 Nov 2024" bsr="0241051" sno="33412" status="Deposited" />
                        <ChallanRow month="Sep 2024" amt="₹3,80,000" date="07 Oct 2024" bsr="0241051" sno="41098" status="Deposited" />

                    </div>
                </div>

            </div>
        </div>
    );
}

function ChallanRow({ month, amt, date, bsr, sno, status }: any) {
    return (
        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors">
            <div className="col-span-2 text-sm font-bold text-slate-300">{month}</div>
            <div className="col-span-2 text-sm font-medium text-white">{amt}</div>
            <div className="col-span-2 text-sm text-slate-300 flex items-center"><CalendarDays size={14} className="mr-1.5 text-[#8899AA]" /> {date}</div>
            <div className="col-span-2 font-mono text-xs text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded inline-block w-max">{bsr}</div>
            <div className="col-span-2 font-mono text-xs text-[#0066FF] bg-[#0066FF]/10 px-2 py-1 rounded inline-block w-max border border-[#0066FF]/20">{sno}</div>
            <div className="col-span-2 flex items-center text-xs font-bold text-[#00E5A0]">
                <CheckCircle2 size={14} className="mr-1.5" />
                {status}
            </div>
        </div>
    );
}
