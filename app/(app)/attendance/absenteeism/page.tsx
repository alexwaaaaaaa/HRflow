"use client";

import React from "react";
import { Download, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { Tooltip as RechartsTooltip } from 'recharts';

const ABS_DATA = [
    { name: "Vikram Singh", dept: "Sales", present: 18, absent: 9, lop: 6, pct: 66.7, risk: "High", avatar: "VS" },
    { name: "Ravi Kumar", dept: "Ops", present: 21, absent: 6, lop: 4, pct: 77.8, risk: "High", avatar: "RK" },
    { name: "Pooja Iyer", dept: "Mktg", present: 23, absent: 4, lop: 2, pct: 85.2, risk: "Medium", avatar: "PI" },
    { name: "Amit Kumar", dept: "Fin", present: 25, absent: 2, lop: 1, pct: 92.6, risk: "Low", avatar: "AK" },
    { name: "Kavya Nair", dept: "Eng", present: 26, absent: 1, lop: 0, pct: 96.3, risk: "Low", avatar: "KN" },
];

const DEPT_ABS = [
    { dept: "Sales", rate: 11.6 },
    { dept: "Operations", rate: 8.2 },
    { dept: "Finance", rate: 6.4 },
    { dept: "Marketing", rate: 5.1 },
    { dept: "Engineering", rate: 3.8 },
    { dept: "HR", rate: 2.4 },
];

export default function AbsenteeismReport() {
    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Absenteeism Report</h2>
                    <p className="text-sm text-[#8899AA]">November 2024 • All Departments</p>
                </div>
                <div className="flex gap-3">
                    <select className="bg-[#0D1928] border border-[#1A2A3A] text-sm text-white rounded-xl px-4 py-2 focus:outline-none">
                        <option>All Departments</option><option>Sales</option><option>Engineering</option>
                    </select>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-sm rounded-lg flex items-center gap-2 hover:bg-[#2A3A4A]"><Download className="w-4 h-4" />Export</button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-xs text-[#8899AA] mb-1">Absenteeism Rate</p>
                    <p className="text-2xl font-bold text-[#FF4444]">5.7%</p>
                    <p className="text-xs text-[#445566] flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3" />+0.4% vs last month</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-xs text-[#8899AA] mb-1">Unplanned Absences</p>
                    <p className="text-2xl font-bold text-[#FFB800]">48</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <p className="text-xs text-[#8899AA] mb-1">LOP Days Generated</p>
                    <p className="text-2xl font-bold text-[#FF4444]">115</p>
                    <p className="text-xs text-[#445566] mt-1">₹4.82L deduction</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* TABLE */}
                <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-[#1A2A3A]">
                        <h3 className="font-semibold">High Absence Employees</h3>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                            <tr>
                                <th className="px-5 py-3 text-left">Employee</th>
                                <th className="px-5 py-3 text-center">Present</th>
                                <th className="px-5 py-3 text-center">Absent</th>
                                <th className="px-5 py-3 text-center">LOP</th>
                                <th className="px-5 py-3 text-center">Att %</th>
                                <th className="px-5 py-3 text-center">Risk</th>
                                <th className="px-5 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {ABS_DATA.map((row, i) => (
                                <tr key={i} className={`hover:bg-[#1A2A3A]/50 transition-colors ${row.risk === "High" ? "bg-[#FF4444]/5 border-l-2 border-l-[#FF4444]" : "border-l-2 border-l-transparent"}`}>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{row.avatar}</div>
                                            <div>
                                                <p className="font-medium">{row.name}</p>
                                                <p className="text-xs text-[#445566]">{row.dept}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-center text-[#00E5A0]">{row.present}</td>
                                    <td className="px-5 py-3 text-center text-[#FF4444] font-semibold">{row.absent}</td>
                                    <td className="px-5 py-3 text-center text-[#FFB800]">{row.lop}</td>
                                    <td className="px-5 py-3 text-center font-semibold">{row.pct}%</td>
                                    <td className="px-5 py-3 text-center">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${row.risk === "High" ? "bg-[#FF4444]/10 text-[#FF4444]" : row.risk === "Medium" ? "bg-[#FFB800]/10 text-[#FFB800]" : "bg-[#00E5A0]/10 text-[#00E5A0]"}`}>{row.risk}</span>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        {row.risk !== "Low" && <button className="text-xs text-[#0066FF] hover:underline">Warn</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* DEPT CHART */}
                <div className="w-full lg:w-[280px] shrink-0">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 mb-4">
                        <h3 className="font-semibold mb-4">Absenteeism by Dept</h3>
                        <div className="h-[200px]">
                            <ChartWrapper>
                                <ChartWrapper height="h-[300px]">
                                    <BarChart data={DEPT_ABS} layout="vertical" margin={{ left: 30, right: 10 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} />
                                        <YAxis dataKey="dept" type="category" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} width={80} />
                                        <RechartsTooltip contentStyle={{ backgroundColor: "#060B14", borderColor: "#1A2A3A", borderRadius: "8px" }} />
                                        <Bar dataKey="rate" fill="#FF4444" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ChartWrapper>
                            </ChartWrapper>
                        </div>
                    </div>
                    <div className="bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-2xl p-5">
                        <p className="text-sm font-medium text-[#FF4444] mb-1">🤖 AI Insight</p>
                        <p className="text-xs text-[#8899AA]">Sales dept absenteeism is 11.6%, significantly above the company avg of 5.7%. Correlation with target pressure detected.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
