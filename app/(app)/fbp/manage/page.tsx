"use client";
import React, { useState } from 'react';
import { Users, ArrowLeft, Search, Eye, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const EMPS = [
    { name: 'Anita Kulkarni', dept: 'Engineering', pool: 480000, declared: 480000, status: 'Submitted', date: '02 Apr 2026' },
    { name: 'Rahul Sharma', dept: 'Sales', pool: 360000, declared: 360000, status: 'Submitted', date: '01 Apr 2026' },
    { name: 'Meena Joshi', dept: 'Finance', pool: 400000, declared: 380000, status: 'Draft', date: '—' },
    { name: 'Karan Singh', dept: 'Sales', pool: 320000, declared: 0, status: 'Pending', date: '—' },
    { name: 'Vijay Kumar', dept: 'HR', pool: 360000, declared: 360000, status: 'Submitted', date: '03 Apr 2026' },
    { name: 'Deepa Agrawal', dept: 'Finance', pool: 440000, declared: 0, status: 'Pending', date: '—' },
    { name: 'Priya Reddy', dept: 'Marketing', pool: 380000, declared: 380000, status: 'Submitted', date: '31 Mar 2026' },
];

const STATUS_CFG: Record<string, string> = {
    Submitted: 'bg-emerald-500/10 text-emerald-400',
    Draft: 'bg-amber-500/10 text-amber-400',
    Pending: 'bg-[#1A2A3A] text-[#8899AA]',
};

export default function FBPDeclarationManagement() {
    const [search, setSearch] = useState('');
    const filtered = EMPS.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase()));
    const submitted = EMPS.filter(e => e.status === 'Submitted').length;

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/fbp/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> FBP Dashboard</Link>
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Users size={22} className="text-purple-400" /> FBP Declaration Management</h1>
                <p className="text-[#8899AA] text-sm mt-1">Track and manage employee FBP declarations across the organization</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Submitted', value: submitted, icon: CheckCircle2, color: 'text-emerald-400' },
                    { label: 'Pending / Draft', value: EMPS.length - submitted, icon: Clock, color: 'text-amber-400' },
                    { label: 'Total Employees', value: EMPS.length, icon: Users, color: 'text-purple-400' },
                ].map(s => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 flex items-center gap-4">
                            <Icon size={24} className={s.color} />
                            <div>
                                <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                                <div className="text-xs text-[#8899AA] font-bold">{s.label}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                <input type="text" placeholder="Search employee or department..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-purple-500 outline-none transition-colors" />
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#060D1A] text-[#8899AA] text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Employee</th>
                            <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">FBP Pool</th>
                            <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Declared</th>
                            <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Status</th>
                            <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Submitted On</th>
                            <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {filtered.map((emp, i) => (
                            <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                <td className="px-5 py-4">
                                    <div className="text-white font-semibold text-xs">{emp.name}</div>
                                    <div className="text-[#556677] text-[10px]">{emp.dept}</div>
                                </td>
                                <td className="px-5 py-4 text-[#AABBCC] text-xs">₹{emp.pool.toLocaleString()}</td>
                                <td className="px-5 py-4">
                                    {emp.declared > 0 ? (
                                        <span className="text-white text-xs font-semibold">₹{emp.declared.toLocaleString()}</span>
                                    ) : (
                                        <span className="text-[#445566] text-xs">—</span>
                                    )}
                                </td>
                                <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${STATUS_CFG[emp.status]}`}>{emp.status}</span></td>
                                <td className="px-5 py-4 text-[#556677] text-xs">{emp.date}</td>
                                <td className="px-5 py-4 text-right">
                                    <button className="text-purple-400 hover:text-purple-300 text-xs font-bold flex items-center gap-1 ml-auto transition-colors">
                                        <Eye size={12} /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
