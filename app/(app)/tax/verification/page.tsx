"use client";

import React, { useState } from 'react';
import {
    CheckCircle2, AlertTriangle, ShieldCheck, ChevronRight,
    Filter, Search, ArrowRight, ShieldAlert, BadgeCheck, FileText, Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProofVerificationDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('pending');

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">Investment Proof Verification — FY 2024-25</h1>
                        <p className="text-sm text-[#8899AA] mb-4">Review and approve employee investment proofs</p>

                        <div className="flex items-center w-80 space-x-3">
                            <div className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                                <div className="h-full bg-[#00E5A0] rounded-full" style={{ width: '30.6%' }}></div>
                            </div>
                            <span className="text-xs text-[#8899AA] whitespace-nowrap">89/291 reviewed (30.6%)</span>
                        </div>
                    </div>
                </div>

                {/* Queue Stats Cards */}
                <div className="grid grid-cols-4 gap-4">
                    <StatCard title="Pending Review" value="202" subtitle="847 documents" color="blue" />
                    <StatCard title="AI Pre-approved" value="134" subtitle="Pending HR confirmation" color="green" />
                    <StatCard title="Flagged for Review" value="68" subtitle="Low AI score or anomalies" color="yellow" />
                    <StatCard title="Rejected" value="12" subtitle="Awaiting resubmission" color="red" />
                </div>

                {/* Main Filter Tabs */}
                <div className="flex justify-between items-center border-b border-[#1A2A3A]">
                    <div className="flex space-x-6">
                        <TabButton label="All (202)" active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} />
                        <TabButton label="AI Flagged (68)" active={activeTab === 'flagged'} onClick={() => setActiveTab('flagged')} color="#FFB800" />
                        <TabButton label="Low Score (<80)" active={activeTab === 'low_score'} onClick={() => setActiveTab('low_score')} color="#FF4444" />
                        <TabButton label="High Value (>₹3L)" active={activeTab === 'high_value'} onClick={() => setActiveTab('high_value')} />
                    </div>
                    <div className="relative pb-2">
                        <input
                            type="text"
                            placeholder="Search employee..."
                            className="bg-[#0D1928] border border-[#1A2A3A] px-4 py-1.5 pl-9 rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                        />
                        <Search size={16} className="absolute left-3 top-2.5 text-[#8899AA]" />
                    </div>
                </div>

                {/* Action Bar */}
                {activeTab === 'pending' && (
                    <div className="flex justify-between items-center py-2">
                        <div className="text-sm font-medium text-[#8899AA]">
                            Showing pending employees sorted by submission date
                        </div>
                        <button className="px-4 py-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors flex items-center shadow-[0_0_15px_rgba(0,229,160,0.3)]">
                            <ShieldCheck size={16} className="mr-2" />
                            Bulk Approve All &gt;90 Score (134)
                        </button>
                    </div>
                )}

                {/* Queue Table */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#0A1420] border-b border-[#1A2A3A] text-xs font-bold text-[#8899AA] uppercase tracking-wider">
                        <div className="col-span-4">Employee Details</div>
                        <div className="col-span-3">Declarations</div>
                        <div className="col-span-2">AI Score</div>
                        <div className="col-span-3 text-right">Action</div>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {/* High Priority Flagged */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-[#FF4444]/5 hover:bg-[#FF4444]/10 transition-colors">
                            <div className="col-span-4 flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white relative">
                                    RK
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FF4444] rounded-full border-2 border-[#060B14] flex items-center justify-center">
                                        <AlertTriangle size={8} className="text-white" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white flex items-center">
                                        Ravi Krishnan
                                        <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FF4444] text-white">HIGH PRIORITY</span>
                                    </div>
                                    <div className="text-xs text-[#8899AA] mt-0.5">EMP089 • Engineering</div>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white">₹3,82,000</div>
                                <div className="text-xs text-[#8899AA] mt-0.5 flex items-center">
                                    <FileText size={12} className="mr-1" /> 7 documents
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="inline-flex items-center px-2 py-1 rounded-md bg-[#FF4444]/10 border border-[#FF4444]/30">
                                    <ShieldAlert size={14} className="text-[#FF4444] mr-1.5" />
                                    <span className="text-sm font-bold text-[#FF4444]">48/100</span>
                                </div>
                                <div className="text-[10px] text-[#FF4444] mt-1">Amount anomaly detected</div>
                            </div>
                            <div className="col-span-3 flex justify-end">
                                <button
                                    onClick={() => router.push('/tax/verification/EMP089')}
                                    className="px-4 py-1.5 border border-[#FF4444]/50 text-[#FF4444] font-semibold text-xs rounded-lg hover:bg-[#FF4444]/10 transition-colors flex items-center"
                                >
                                    Review Manually <ArrowRight size={14} className="ml-1" />
                                </button>
                            </div>
                        </div>

                        {/* Normal / Flagged */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-[#FFB800]/5 hover:bg-[#FFB800]/10 transition-colors">
                            <div className="col-span-4 flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white relative">
                                    PS
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Priya Sharma</div>
                                    <div className="text-xs text-[#8899AA] mt-0.5">EMP012 • Sales</div>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white">₹2,10,000</div>
                                <div className="text-xs text-[#8899AA] mt-0.5 flex items-center">
                                    <FileText size={12} className="mr-1" /> 4 documents
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="inline-flex items-center px-2 py-1 rounded-md bg-[#FFB800]/10 border border-[#FFB800]/30">
                                    <AlertTriangle size={14} className="text-[#FFB800] mr-1.5" />
                                    <span className="text-sm font-bold text-[#FFB800]">72/100</span>
                                </div>
                                <div className="text-[10px] text-[#FFB800] mt-1">OCR mismatch</div>
                            </div>
                            <div className="col-span-3 flex justify-end">
                                <button
                                    onClick={() => router.push('/tax/verification/EMP012')}
                                    className="px-4 py-1.5 border border-[#1A2A3A] text-white font-semibold text-xs rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center"
                                >
                                    Review <ArrowRight size={14} className="ml-1" />
                                </button>
                            </div>
                        </div>

                        {/* Good / Normal */}
                        <QueueItem empId="EMP001" name="Arjun Mehta" dept="Engineering" amt="₹1,10,000" docs={5} score={94} initial="AM" status="good" />
                        <QueueItem empId="EMP004" name="Kavya Iyer" dept="Product" amt="₹1,50,000" docs={3} score={91} initial="KI" status="good" />
                        <QueueItem empId="EMP005" name="Mohan Das" dept="Operations" amt="₹88,000" docs={2} score={88} initial="MD" status="medium" onClick={() => router.push('/tax/verification/EMP005')} />
                    </div>
                </div>

                <div className="flex justify-center pt-4">
                    <button className="px-5 py-2 border border-[#1A2A3A] rounded-xl text-sm font-semibold text-white hover:bg-[#1A2A3A] transition-colors">
                        Load More Employees
                    </button>
                </div>

            </div>
        </div>
    );
}

function StatCard({ title, value, subtitle, color }: { title: string, value: string, subtitle: string, color: 'blue' | 'green' | 'yellow' | 'red' }) {
    const bgColors = {
        blue: 'bg-[#0066FF]/5 border-[#0066FF]/20',
        green: 'bg-[#00E5A0]/5 border-[#00E5A0]/20',
        yellow: 'bg-[#FFB800]/5 border-[#FFB800]/20',
        red: 'bg-[#FF4444]/5 border-[#FF4444]/20'
    };
    const textColors = {
        blue: 'text-[#0066FF]',
        green: 'text-[#00E5A0]',
        yellow: 'text-[#FFB800]',
        red: 'text-[#FF4444]'
    };

    return (
        <div className={`p-5 rounded-xl border ${bgColors[color]}`}>
            <h3 className="text-sm font-semibold text-[#8899AA] mb-1">{title}</h3>
            <div className={`text-3xl font-bold ${textColors[color]} mb-1`}>{value}</div>
            <p className="text-xs text-[#8899AA]">{subtitle}</p>
        </div>
    );
}

function TabButton({ label, active, onClick, color = '#00E5A0' }: any) {
    return (
        <button
            onClick={onClick}
            className={`pb-3 px-1 text-sm font-bold border-b-2 transition-colors duration-200 ${active ? `border-current` : 'border-transparent text-[#8899AA] hover:text-slate-300'
                }`}
            style={active ? { color, borderColor: color } : {}}
        >
            {label}
        </button>
    );
}

function QueueItem({ empId, name, dept, amt, docs, score, initial, status, onClick }: any) {
    const isGood = status === 'good';

    return (
        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors">
            <div className="col-span-4 flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-sm font-bold text-white">
                    {initial}
                </div>
                <div>
                    <div className="text-sm font-bold text-white">{name}</div>
                    <div className="text-xs text-[#8899AA] mt-0.5">{empId} • {dept}</div>
                </div>
            </div>
            <div className="col-span-3">
                <div className="text-sm font-bold text-white">{amt}</div>
                <div className="text-xs text-[#8899AA] mt-0.5 flex items-center">
                    <FileText size={12} className="mr-1" /> {docs} documents
                </div>
            </div>
            <div className="col-span-2">
                <div className={`inline-flex items-center px-2 py-1 rounded-md border ${isGood ? 'bg-[#00E5A0]/10 border-[#00E5A0]/30' : 'bg-[#FFB800]/10 border-[#FFB800]/30'
                    }`}>
                    <BadgeCheck size={14} className={`${isGood ? 'text-[#00E5A0]' : 'text-[#FFB800]'} mr-1.5`} />
                    <span className={`text-sm font-bold ${isGood ? 'text-[#00E5A0]' : 'text-[#FFB800]'}`}>{score}/100</span>
                </div>
            </div>
            <div className="col-span-3 flex justify-end">
                {isGood ? (
                    <button className="px-4 py-1.5 bg-[#1A2A3A] text-[#00E5A0] font-semibold text-xs rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center border border-[#1A2A3A] hover:border-[#00E5A0]/30">
                        <Check size={14} className="mr-1" /> Quick Approve
                    </button>
                ) : (
                    <button onClick={onClick} className="px-4 py-1.5 border border-[#1A2A3A] text-white font-semibold text-xs rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center">
                        Review <ArrowRight size={14} className="ml-1" />
                    </button>
                )}
            </div>
        </div>
    );
}
