"use client";

import React from "react";
import { Coins, AlertCircle, Search, Download, CheckCircle2, TrendingUp, History } from "lucide-react";

export default function GratuityProvisionPage() {
    const employees = [
        { id: 'EMP001', name: 'Rajesh Kumar', doj: '15/08/2021', years: '3.6 yrs', basic: '₹40,000', monthlyProv: '₹1,603', cumulative: '₹69,248', eligibility: '3y 6m / 5y', isEligible: false, status: 'Accruing' },
        { id: 'EMP002', name: 'Priya Sharma', doj: '01/06/2019', years: '5.8 yrs', basic: '₹28,000', monthlyProv: '₹1,121', cumulative: '₹78,340', eligibility: 'Eligible', isEligible: true, status: 'Payable on Exit' },
        { id: 'EMP045', name: 'Vikram Singh', doj: '10/11/2018', years: '6.4 yrs', basic: '₹65,000', monthlyProv: '₹2,604', cumulative: '₹1,95,000', eligibility: 'Eligible', isEligible: true, status: 'Payable on Exit' },
        { id: 'EMP088', name: 'Anita Bose', doj: '01/02/2022', years: '3.1 yrs', basic: '₹22,000', monthlyProv: '₹881', cumulative: '₹32,600', eligibility: '3y 1m / 5y', isEligible: false, status: 'Accruing' },
        { id: 'EMP112', name: 'Arjun Das', doj: '05/01/2020', years: '5.2 yrs', basic: '₹35,000', monthlyProv: '₹1,402', cumulative: '₹84,120', eligibility: 'Eligible', isEligible: true, status: 'Payable on Exit' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-[1600px] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Gratuity Provision Management</h2>
                        <p className="text-gray-400 text-sm mt-1">Track monthly gratuity liabilities and 5-year eligibility status.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#1A2A3A] hover:bg-[#1A2A3A] transition-colors rounded-lg text-sm font-medium">
                            <History className="w-4 h-4" /> Provision History
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black font-bold rounded-lg text-sm transition-colors">
                            <Download className="w-4 h-4" /> Export Report for Auditor
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#00E5A0]/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-sm text-gray-400 font-medium">Total Provision (Accrued)</p>
                            <div className="p-1.5 bg-[#0066FF]/10 rounded-lg"><Coins className="w-4 h-4 text-[#0066FF]" /></div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-white">₹48,23,500</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Cumulative liability as of today</p>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#00E5A0]/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-sm text-gray-400 font-medium">FY 2024-25 Provision</p>
                            <div className="p-1.5 bg-[#FFB800]/10 rounded-lg"><TrendingUp className="w-4 h-4 text-[#FFB800]" /></div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-white">₹8,40,600</p>
                        </div>
                        <p className="text-xs text-[#00E5A0] font-medium mt-2 flex items-center gap-1">+12% vs last FY</p>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#00E5A0]/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-sm text-gray-400 font-medium">Eligible Employees (5+ yrs)</p>
                            <div className="p-1.5 bg-[#00E5A0]/10 rounded-lg"><CheckCircle2 className="w-4 h-4 text-[#00E5A0]" /></div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-[#00E5A0]">87</p>
                            <span className="text-sm text-gray-400">/ 347 total</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Total accrued for eligible: ₹32,15,400</p>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 bg-gradient-to-br from-[#0A1420] to-[#1A2A3A]/30">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-sm text-gray-400 font-medium">Next Eligibility</p>
                            <div className="p-1.5 bg-[#FFB800]/10 rounded-lg"><AlertCircle className="w-4 h-4 text-[#FFB800]" /></div>
                        </div>
                        <div className="flex flex-col mt-1">
                            <p className="text-lg font-bold text-white">Amit Verma</p>
                            <p className="text-sm text-[#FFB800] mt-1 font-medium">In 3 months</p>
                            <p className="text-xs text-gray-400 mt-2 border-t border-[#1A2A3A] pt-2">Liability unlocks: ₹1,05,000</p>
                        </div>
                    </div>
                </div>

                {/* Fund status alert */}
                <div className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 border border-[#00E5A0]/30 rounded-full bg-[#00E5A0]/10">
                            <CheckCircle2 className="w-5 h-5 text-[#00E5A0]" />
                        </div>
                        <div>
                            <p className="font-semibold text-white">Gratuity Trust Fund Status</p>
                            <p className="text-sm text-gray-400 mt-0.5">₹48,23,500 provisioned in books | External Trust: Not linked</p>
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-[#00E5A0] font-medium bg-[#00E5A0]/10 px-3 py-1.5 rounded-full border border-[#00E5A0]/20 cursor-pointer hover:bg-[#00E5A0]/20 transition-colors">
                            Explore Group Gratuity Insurance
                        </span>
                    </div>
                </div>

                {/* Main Table Area */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden flex flex-col">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060B14]">
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search employee..."
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] text-white rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-[#00E5A0]"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">Filter by:</span>
                            <select className="bg-[#0A1420] border border-[#1A2A3A] text-white rounded-lg px-3 py-1.5 text-sm outline-none">
                                <option>All Status</option>
                                <option>Eligible Only (5+ yrs)</option>
                                <option>Accruing (&lt;5 yrs)</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#0A1420] text-gray-400 border-b border-[#1A2A3A]">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Name</th>
                                    <th className="px-6 py-4 font-medium">EMP ID</th>
                                    <th className="px-6 py-4 font-medium">DOJ</th>
                                    <th className="px-6 py-4 font-medium">Years of Service</th>
                                    <th className="px-6 py-4 font-medium">Monthly Basic</th>
                                    <th className="px-6 py-4 font-medium" title="Basic × 26/365">Monthly Prov <InfoIcon /></th>
                                    <th className="px-6 py-4 font-medium">Cumulative</th>
                                    <th className="px-6 py-4 font-medium">Eligibility Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {employees.map((emp, idx) => (
                                    <tr key={idx} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{emp.name}</td>
                                        <td className="px-6 py-4 text-gray-400">{emp.id}</td>
                                        <td className="px-6 py-4 text-gray-300">{emp.doj}</td>
                                        <td className="px-6 py-4 font-medium">{emp.years}</td>
                                        <td className="px-6 py-4 font-mono">{emp.basic}</td>
                                        <td className="px-6 py-4 font-mono text-gray-300">{emp.monthlyProv}</td>
                                        <td className="px-6 py-4 font-bold font-mono text-white">{emp.cumulative}</td>
                                        <td className="px-6 py-4">
                                            {emp.isEligible ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-[#4CAF50] rounded-full"></div>
                                                    <span className="text-xs font-bold text-[#4CAF50]">{emp.eligibility}</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-1 w-32">
                                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                                        <span>{emp.eligibility}</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-[#FFB800] rounded-full"
                                                            style={{ width: `${(parseFloat(emp.years) / 5) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-xs border border-[#1A2A3A] px-2 py-1 rounded text-gray-300 cursor-pointer hover:bg-[#1A2A3A]">Details</span>
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

function InfoIcon() {
    return (
        <span className="inline-flex justify-center items-center w-3 h-3 rounded-full border border-gray-500 text-[8px] ml-1 cursor-help relative -top-0.5">i</span>
    );
}
