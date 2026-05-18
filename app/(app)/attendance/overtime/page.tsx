"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Tooltip as RechartsTooltip } from 'recharts';
import { Download, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";

const OT_DATA = [
    { dept: "Engineering", hours: 109 },
    { dept: "Operations", hours: 72 },
    { dept: "Finance", hours: 48 },
    { dept: "Sales", hours: 32 },
    { dept: "Marketing", hours: 19 },
];

const OT_ROWS = [
    { name: "Rahul Sharma", dept: "Eng", shiftEnd: "06:00 PM", otStart: "06:00 PM", otEnd: "10:00 PM", otHrs: 4.0, rate: "₹477/hr", otPay: "₹1,908", compOff: true, status: "Pending", avatar: "RS" },
    { name: "Kavya Reddy", dept: "Eng", shiftEnd: "06:00 PM", otStart: "06:30 PM", otEnd: "09:30 PM", otHrs: 3.0, rate: "₹714/hr", otPay: "₹2,142", compOff: true, status: "Approved", avatar: "KR" },
    { name: "Suresh Kumar", dept: "Ops", shiftEnd: "04:00 PM", otStart: "04:00 PM", otEnd: "08:00 PM", otHrs: 4.0, rate: "₹238/hr", otPay: "₹952", compOff: false, status: "Pending", avatar: "SK" },
    { name: "Pooja Nair", dept: "Fin", shiftEnd: "06:00 PM", otStart: "06:00 PM", otEnd: "09:00 PM", otHrs: 3.0, rate: "₹357/hr", otPay: "₹1,071", compOff: true, status: "Approved", avatar: "PN" },
    { name: "Vikram Singh", dept: "Sales", shiftEnd: "06:00 PM", otStart: "06:30 PM", otEnd: "08:30 PM", otHrs: 2.0, rate: "₹298/hr", otPay: "₹596", compOff: false, status: "Pending", avatar: "VS" },
];

export default function OvertimeReport() {
    const [rows, setRows] = useState(OT_ROWS);

    const handleApprove = (i: number) => {
        const updated = [...rows];
        updated[i] = { ...updated[i], status: "Approved" };
        setRows(updated);
    };

    return (
        <Page
            title="Overtime Report — November 2024"
            subtitle="Track and manage overtime hours & payouts"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Overtime" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Overtime Report — November 2024</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Track and manage overtime hours & payouts</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-sm text-white rounded-lg flex items-center gap-2 hover:bg-[#2A3A4A]"><Download className="w-4 h-4" />Export</button>
                    <button onClick={() => setRows(r => r.map(x => ({ ...x, status: "Approved" })))}
                        className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-lg hover:bg-[#00c98d]">Approve All OT</button>
                </div>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Total OT Hours", val: "280 hrs", color: "#FFB800" },
                    { label: "Employees with OT", val: "64", color: "#FFFFFF" },
                    { label: "OT Payout", val: "₹1,82,400", color: "#00E5A0" },
                    { label: "Pending Approval", val: "23", color: "#FFB800" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* TABLE */}
                <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">Employee</th>
                                    <th className="px-4 py-3 text-right font-medium">OT Hours</th>
                                    <th className="px-4 py-3 text-right font-medium">Rate</th>
                                    <th className="px-4 py-3 text-right font-medium">OT Pay</th>
                                    <th className="px-4 py-3 text-center font-medium">Status</th>
                                    <th className="px-4 py-3 text-center font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {rows.map((row, i) => (
                                    <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{row.avatar}</div>
                                                <div>
                                                    <p className="font-medium">{row.name}</p>
                                                    <p className="text-xs text-[#445566]">{row.dept} • {row.otStart}–{row.otEnd}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right font-semibold text-[#FFB800]">{row.otHrs}h</td>
                                        <td className="px-4 py-3 text-right text-[#8899AA]">{row.rate}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-[#00E5A0]">{row.otPay}</td>
                                        <td className="px-4 py-3 text-center">
                                            {row.status === "Approved"
                                                ? <span className="text-xs text-[#00E5A0] flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />Approved</span>
                                                : <span className="text-xs text-[#FFB800]">⏳ Pending</span>}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {row.status === "Pending" && (
                                                <div className="flex gap-1 justify-center">
                                                    <button onClick={() => handleApprove(i)} className="text-xs text-[#00E5A0] hover:underline">Approve</button>
                                                    <span className="text-[#445566]">|</span>
                                                    <button className="text-xs text-[#FF4444] hover:underline">Reject</button>
                                                </div>
                                            )}
                                            {row.compOff && <button className="text-xs text-[#0066FF] hover:underline mt-0.5 block">Comp-off</button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CHART */}
                <div className="w-full lg:w-[280px] shrink-0 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                    <h3 className="font-semibold mb-4">OT by Department</h3>
                    <div className="h-[200px]">
                        <ChartWrapper>
                            <ChartWrapper height="h-[300px]">
                                <BarChart data={OT_DATA} layout="vertical" margin={{ left: 20, right: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} />
                                    <YAxis dataKey="dept" type="category" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} width={80} />
                                    <RechartsTooltip contentStyle={{ backgroundColor: "#060B14", borderColor: "#1A2A3A", borderRadius: "8px" }} itemStyle={{ color: "#FFB800" }} />
                                    <Bar dataKey="hours" fill="#FFB800" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ChartWrapper>
                        </ChartWrapper>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
        );
}
