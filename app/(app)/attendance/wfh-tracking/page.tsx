"use client";

import Page from "@/components/ui/Page";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import ChartWrapper from "@/components/ui/ChartWrapper";
import { Tooltip as RechartsTooltip } from 'recharts';
import { seededFloats } from "@/lib/random";

// Stable decorative data — seeded, not Math.random()
const DAILY_DATA = Array.from({ length: 12 }, (_, i) => {
    const [officeRand, wfhRand, absentRand] = seededFloats(1000 + i, 3);
    return {
        day: i + 1,
        office: 680 + Math.floor(officeRand * 80),
        wfh: 60 + Math.floor(wfhRand * 30),
        absent: 30 + Math.floor(absentRand * 20),
    };
});

const WFH_TABLE = [
    { name: "Rahul Sharma", policy: "3 days/week", used: 6, remaining: 6, status: "ok" },
    { name: "Priya Mehta", policy: "2 days/week", used: 8, remaining: 0, status: "over" },
    { name: "Kavya Iyer", policy: "3 days/week", used: 10, remaining: 2, status: "ok" },
    { name: "Suresh Kumar", policy: "1 day/week", used: 3, remaining: 1, status: "over" },
    { name: "Rohan Desai", policy: "2 days/week", used: 6, remaining: 2, status: "ok" },
];

export default function WFHTracking() {
    return (
        <Page
            title="WFH vs Office Tracking — November 2024"
            subtitle="Track work modes and hybrid compliance across the organization"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Wfh Tracking" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <h2 className="text-2xl font-bold mb-1">WFH vs Office Tracking — November 2024</h2>
            <p className="text-sm text-[#8899AA] mb-6">Track work modes and hybrid compliance across the organization</p>

            {/* KPI */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Total WFH Days (Nov)", val: "1,428", color: "#0066FF" },
                    { label: "WFH Employees Today", val: "68", color: "#0066FF" },
                    { label: "Office Today", val: "731", color: "#00E5A0" },
                    { label: "Hybrid Compliance", val: "87%", color: "#FFB800" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                ))}
            </div>

            {/* CHART */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Office vs WFH vs Absent — Daily (Nov)</h3>
                <div className="h-[220px]">
                    <ChartWrapper>
                        <ChartWrapper height="h-[300px]">
                            <BarChart data={DAILY_DATA} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                <RechartsTooltip contentStyle={{ backgroundColor: "#060B14", borderColor: "#1A2A3A", borderRadius: "8px" }} />
                                <Bar dataKey="office" stackId="a" fill="#00E5A0" name="Office" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="wfh" stackId="a" fill="#0066FF" name="WFH" />
                                <Bar dataKey="absent" stackId="a" fill="#FF4444" name="Absent" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </ChartWrapper>
                </div>
                <div className="flex gap-4 mt-2 text-xs text-[#8899AA]">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#00E5A0]" /></span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#0066FF]" />WFH</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#FF4444]" />Absent</span>
                </div>
            </div>

            {/* WFH BALANCE TABLE */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden mb-6">
                <div className="px-5 py-4 border-b border-[#1A2A3A]">
                    <h3 className="font-semibold">WFH Balance — November</h3>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                        <tr>
                            <th className="px-5 py-3 text-left">Employee</th>
                            <th className="px-5 py-3 text-center">Policy</th>
                            <th className="px-5 py-3 text-center">Days Used</th>
                            <th className="px-5 py-3 text-center">Remaining</th>
                            <th className="px-5 py-3 text-center">Compliance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {WFH_TABLE.map((row, i) => (
                            <tr key={i} className={`hover:bg-[#1A2A3A]/50 transition-colors ${row.status === "over" ? "bg-[#FF4444]/5 border-l-2 border-l-[#FF4444]" : "border-l-2 border-l-transparent"}`}>
                                <td className="px-5 py-3 font-medium">{row.name}</td>
                                <td className="px-5 py-3 text-center text-[#8899AA]">{row.policy}</td>
                                <td className="px-5 py-3 text-center">{row.used}</td>
                                <td className="px-5 py-3 text-center">{row.remaining}</td>
                                <td className="px-5 py-3 text-center">
                                    {row.status === "ok"
                                        ? <span className="text-xs text-[#00E5A0]">✅ Within limit</span>
                                        : <span className="text-xs text-[#FF4444]">⚠️ Exceeded</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* VIOLATIONS */}
            <div className="bg-[#FFB800]/5 border border-[#FFB800]/30 rounded-xl px-5 py-4">
                <p className="text-sm font-medium text-[#FFB800] mb-2">⚠️ 3 employees exceeded WFH limit this month</p>
                <p className="text-xs text-[#8899AA]">Priya Mehta (2 excess days) | Suresh Kumar (1 excess day) | Arun Patel (1 excess day)</p>
            </div>
        </div>
    
        </Page>
        );
}
