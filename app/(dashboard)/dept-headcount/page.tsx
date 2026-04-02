"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, Building } from "lucide-react";
import Button from "@/components/ui/Button";
import ClientOnly from "@/components/ui/ClientOnly";
import { Tooltip as RechartsTooltip } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const deptData = [
    { name: 'Engineering', count: 320, budget: 6.5, atRisk: 12, open: 14 },
    { name: 'Sales', count: 180, budget: 3.2, atRisk: 22, open: 8 },
    { name: 'Operations', count: 172, budget: 2.8, atRisk: 6, open: 5 },
    { name: 'Marketing', count: 95, budget: 1.8, atRisk: 8, open: 3 },
    { name: 'HR', count: 42, budget: 0.8, atRisk: 4, open: 2 },
    { name: 'Finance', count: 38, budget: 1.1, atRisk: 2, open: 1 }
];

const COLORS = ['#00E5A0', '#0066FF', '#FFB800', '#FF4444', '#8899AA', '#445566'];

const trendData = [
    { m: 'Jan', val: 750 }, { m: 'Mar', val: 780 }, { m: 'Jul', val: 810 }, { m: 'Nov', val: 847 }
];

export default function DepartmentHeadcount() {
    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Headcount & Capacity</h1>
                        <Building size={28} color="#00E5A0" />
                    </div>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Department distribution, capacities, and hiring needs</p>
                </div>
                <Button variant="secondary">View Organization Chart</Button>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col justify-between">
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Headcount</div>
                    <div style={{ fontSize: 36, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>847</div>
                    <div className="flex items-center gap-1 mt-4" style={{ fontSize: 12, color: "#00E5A0" }}>
                        <TrendingUp size={14} /> +12% YoY growth
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Engineering (Largest)</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#00E5A0", lineHeight: 1 }}>38%</div>
                    <div style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>320 employees</div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Open Requisitions</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#FFB800", lineHeight: 1 }}>33</div>
                    <div style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Across 6 departments</div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 12 }}>Growth Trend</h3>
                    <div style={{ height: 60, width: "100%" }}>
                        <ClientOnly>
                            <ChartWrapper height="h-[300px]">
                                <BarChart data={trendData}>
                                    <Bar dataKey="val" fill="#0A1420" stroke="#00E5A0" strokeWidth={1} radius={[2, 2, 0, 0]} />
                                    <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', fontSize: 12 }} />
                                </BarChart>
                            </ChartWrapper>
                        </ClientOnly>
                    </div>
                </div>
            </div>

            <div className="flex gap-8">

                {/* LEFT G/Table */}
                <div style={{ width: 760, flexShrink: 0 }}>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-6">
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 24 }}>Distribution Breakdown</h3>
                        <div style={{ height: 260, width: "100%" }}>
                            <ClientOnly>
                                <ChartWrapper height="h-[300px]">
                                    <BarChart data={deptData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                        <XAxis type="number" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} width={80} />
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                        <RechartsTooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: 8 }} />
                                        <Bar dataKey="count" fill="#00E5A0" barSize={16} radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#FFFFFF', fontSize: 12 }} />
                                    </BarChart>
                                </ChartWrapper>
                            </ClientOnly>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Department</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase text-right">Headcount</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase text-right">Salary Budget</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase text-center">Open Reqs</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase text-center">At Risk</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {deptData.map((d, i) => (
                                    <tr key={i} className="hover:bg-[#1A2A3A] transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-[#FFFFFF]">{d.name}</td>
                                        <td className="px-6 py-4 text-sm text-[#00E5A0] text-right font-semibold">{d.count}</td>
                                        <td className="px-6 py-4 text-sm text-[#FFFFFF] text-right">₹{d.budget} Cr</td>
                                        <td className="px-6 py-4 text-sm text-center">
                                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${d.open > 5 ? "bg-[rgba(0,102,255,0.2)] text-[#0066FF]" : "bg-[#0A1420] text-[#8899AA]"}`}>{d.open}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center">
                                            <span className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium ${d.atRisk > 10 ? "bg-[rgba(255,68,68,0.2)] text-[#FF4444]" : "text-[#FFB800]"}`}>{d.atRisk}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT Share */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 sticky top-24">
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 24 }}>Share of Workforce</h3>
                        <div style={{ height: 240, width: "100%", marginBottom: 24 }}>
                            <ClientOnly>
                                <ChartWrapper height="h-[300px]">
                                    <PieChart>
                                        <Pie data={deptData} innerRadius={60} outerRadius={100} stroke="none" dataKey="count" paddingAngle={2}>
                                            {deptData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                        </Pie>
                                        <RechartsTooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: 8 }} itemStyle={{ color: '#FFFFFF' }} />
                                    </PieChart>
                                </ChartWrapper>
                            </ClientOnly>
                        </div>

                        <div className="flex flex-col gap-3">
                            {deptData.map((d, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                                        <span style={{ fontSize: 14, color: "#FFFFFF" }}>{d.name}</span>
                                    </div>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: "#8899AA" }}>{Math.round((d.count / 847) * 100)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
