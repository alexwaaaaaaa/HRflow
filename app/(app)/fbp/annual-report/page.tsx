"use client";
import React from 'react';
import { BarChart, ArrowLeft, Download, Eye, FileText } from 'lucide-react';
import Link from 'next/link';

export default function FBPAnnualReportScreen() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/fbp/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2">
                <ArrowLeft size={14} /> FBP Dashboard
            </Link>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <BarChart size={22} className="text-purple-400" /> FBP Annual Report
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Review the annual utilization and tax savings for the flexi-benefit plan (FY 2025-26)</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Download size={16} /> Export Consolidated
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-6">Tax Savings Breakdown</h3>
                    <div className="flex items-end gap-6 h-48 border-b border-[#1A2A3A] pb-2 px-2">
                        {[
                            { label: 'HRA', taxSaved: 24, total: 30, color: 'bg-indigo-500' },
                            { label: 'LTA', taxSaved: 12, total: 16, color: 'bg-emerald-500' },
                            { label: 'Medical', taxSaved: 8, total: 8, color: 'bg-rose-500' },
                            { label: 'Vehicle', taxSaved: 15, total: 20, color: 'bg-amber-500' },
                            { label: 'NPS', taxSaved: 18, total: 25, color: 'bg-blue-500' },
                        ].map(col => (
                            <div key={col.label} className="flex-1 flex flex-col items-center justify-end group">
                                <span className="text-[10px] text-white opacity-0 group-hover:opacity-100 font-bold mb-1">₹{col.taxSaved}L Saved</span>
                                <div className="w-16 bg-[#1A2A3A] rounded-t-lg relative" style={{ height: `${col.total * 3}px` }}>
                                    <div className={`absolute bottom-0 left-0 right-0 rounded-t-lg ${col.color}`} style={{ height: `${(col.taxSaved / col.total) * 100}%` }} />
                                </div>
                                <span className="text-xs text-[#8899AA] mt-3 font-semibold">{col.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#556677]">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#1A2A3A] rounded-sm" /> Total Allocation</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-sm" /> Actual Tax Savings Achieved</div>
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col justify-center text-center space-y-6">
                    <div>
                        <div className="text-4xl font-black text-emerald-400">₹77,00,000</div>
                        <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mt-2">Total Employee Tax Saved</div>
                        <div className="text-[#556677] text-[10px] mt-1">Due to Flexi-Benefit structuring in FY 25-26</div>
                    </div>
                    <div className="w-full h-px bg-[#1A2A3A]" />
                    <div>
                        <div className="text-3xl font-black text-white">92.4%</div>
                        <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mt-2">FBP Utilization Rate</div>
                        <div className="text-[#556677] text-[10px] mt-1">Employees who actively declared components</div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] text-white font-bold text-sm bg-[#060D1A]">Employee Wise FBP Report</div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Employee Name</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">FBP Pool</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Non-Taxable Declared</th>
                                <th className="px-5 py-4 text-left font-bold border-b border-[#1A2A3A]">Special Allowance (Taxable)</th>
                                <th className="px-5 py-4 text-right font-bold border-b border-[#1A2A3A]">Est. Tax Savings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { name: 'Anita Kulkarni', dept: 'Engineering', pool: 480000, nonTax: 280000, special: 200000, savings: 84000 },
                                { name: 'Rahul Sharma', dept: 'Sales', pool: 360000, nonTax: 200000, special: 160000, savings: 60000 },
                                { name: 'Vijay Kumar', dept: 'HR', pool: 360000, nonTax: 120000, special: 240000, savings: 36000 },
                                { name: 'Meena Joshi', dept: 'Finance', pool: 400000, nonTax: 390000, special: 10000, savings: 117000 },
                            ].map((emp, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                    <td className="px-5 py-4 flex flex-col">
                                        <span className="text-white font-semibold">{emp.name}</span>
                                        <span className="text-[#556677] text-[10px]">{emp.dept}</span>
                                    </td>
                                    <td className="px-5 py-4 text-[#AABBCC]">₹{emp.pool.toLocaleString()}</td>
                                    <td className="px-5 py-4 text-emerald-400 font-bold">₹{emp.nonTax.toLocaleString()}</td>
                                    <td className="px-5 py-4 text-amber-400 font-semibold">₹{emp.special.toLocaleString()}</td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded inline-block font-bold">₹{emp.savings.toLocaleString()}</div>
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
