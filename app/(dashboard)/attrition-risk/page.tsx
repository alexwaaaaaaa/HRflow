"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts';
import { Sparkles, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";
import ClientOnly from "@/components/ui/ClientOnly";
import { Tooltip as RechartsTooltip } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const riskDistData = [
    { dept: 'Eng', high: 12, med: 18, low: 70 },
    { dept: 'Sales', high: 22, med: 28, low: 50 },
    { dept: 'Ops', high: 6, med: 14, low: 80 },
    { dept: 'Mktg', high: 8, med: 15, low: 77 },
    { dept: 'HR', high: 4, med: 10, low: 86 }
];

const riskFactorsData = [
    { name: 'Salary below market', value: 34 },
    { name: 'No growth opp.', value: 28 },
    { name: 'Manager issues', value: 18 },
    { name: 'Work-life balance', value: 12 },
    { name: 'Other', value: 8 }
];
const COLORS = ['#FF4444', '#FFB800', '#00E5A0', '#0066FF', '#8899AA'];

const historicalData = [
    { m: 'Jan', val: 1.2 }, { m: 'Feb', val: 1.5 }, { m: 'Mar', val: 2.1 },
    { m: 'Apr', val: 1.8 }, { m: 'May', val: 1.4 }, { m: 'Jun', val: 1.6 },
    { m: 'Jul', val: 2.4 }, { m: 'Aug', val: 2.2 }, { m: 'Sep', val: 1.9 },
    { m: 'Oct', val: 2.5 }, { m: 'Nov', val: 2.8 }
];

export default function AttritionRiskAnalysis() {
    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Attrition Risk Analysis</h1>
                        <div style={{ background: "rgba(0,229,160,0.1)", color: "#00E5A0", fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>AI</div>
                    </div>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>AI-powered predictions based on engagement, performance, tenure and salary data</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div style={{ fontSize: 12, color: "#445566" }}>Last updated: 2 hours ago</div>
                    <Button variant="ghost">Export Report</Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4444] opacity-[0.03] blur-xl pointer-events-none" />
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>High Risk</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#FF4444", lineHeight: 1 }}>34 <span style={{ fontSize: 14, fontWeight: 500, color: "#8899AA" }}>employees</span></div>
                    <div className="flex items-center gap-1 mt-3" style={{ fontSize: 12, color: "#FF4444" }}>
                        <TrendingUp size={14} /> +6 vs last month
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Medium Risk</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#FFB800", lineHeight: 1 }}>89 <span style={{ fontSize: 14, fontWeight: 500, color: "#8899AA" }}>employees</span></div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Low Risk</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#00E5A0", lineHeight: 1 }}>724 <span style={{ fontSize: 14, fontWeight: 500, color: "#8899AA" }}>employees</span></div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Predicted Exits (30d)</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#8899AA", lineHeight: 1 }}>8-12 <span style={{ fontSize: 14, fontWeight: 500, color: "#445566" }}>employees</span></div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="flex gap-8 mt-2">

                {/* LEFT COLUMN */}
                <div style={{ width: 760, flexShrink: 0 }} className="flex flex-col gap-6">

                    {/* Chart */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 24 }}>Risk Distribution by Department</h3>
                        <div style={{ height: 220, width: "100%" }}>
                            <ClientOnly>
                                <ChartWrapper height="h-[300px]">
                                    <BarChart data={riskDistData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="dept" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                                        <RechartsTooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: 8 }} />
                                        <Bar dataKey="low" stackId="a" fill="#00E5A0" barSize={32} />
                                        <Bar dataKey="med" stackId="a" fill="#FFB800" />
                                        <Bar dataKey="high" stackId="a" fill="#FF4444" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartWrapper>
                            </ClientOnly>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl pt-6 pb-2 relative overflow-hidden">
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16, paddingLeft: 24 }}>High Risk Employees (34)</h3>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0A1420] border-y border-[#1A2A3A]">
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Employee</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Tenure</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Risk</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Top Factor</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { n: "Pradeep Kumar", d: "Engineering", t: "3.2 yrs", r: "87%", f: "Salary below market", c: "🔴" },
                                    { n: "Kavya Reddy", d: "Sales", t: "1.8 yrs", r: "79%", f: "Low performance rating", c: "🔴" },
                                    { n: "Suresh Iyer", d: "Marketing", t: "2.5 yrs", r: "74%", f: "No increment (18m)", c: "🔴" },
                                    { n: "Lakshmi Nair", d: "HR", t: "4.1 yrs", r: "71%", f: "Low engagement score", c: "🔴" },
                                    { n: "Arjun Mehta", d: "Engineering", t: "0.9 yrs", r: "68%", f: "High absenteeism", c: "🟡" }
                                ].map((r, i) => (
                                    <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#1A2A3A] transition-colors group cursor-pointer">
                                        <td className="px-6 py-4">
                                            <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>{r.n}</div>
                                            <div style={{ fontSize: 12, color: "#8899AA", marginTop: 2 }}>{r.d}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#FFFFFF]">{r.t}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px]">{r.c}</span>
                                                <span style={{ fontSize: 14, fontWeight: 600, color: r.c === "🔴" ? "#FF4444" : "#FFB800" }}>{r.r}</span>
                                            </div>
                                            <div className="w-16 h-1.5 bg-[#1A2A3A] rounded-full mt-2 overflow-hidden">
                                                <div className="h-full rounded-full" style={{ width: r.r, background: r.c === "🔴" ? "#FF4444" : "#FFB800" }} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#8899AA] max-w-[180px] break-words">{r.f}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-sm font-medium text-[#0066FF] hover:underline underline-offset-2">Take Action</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ flex: 1, minWidth: 0 }} className="flex flex-col gap-6">

                    {/* AI Recommendations */}
                    <div className="bg-[rgba(0,229,160,0.05)] border border-[#00E5A0] rounded-2xl p-6 relative">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles size={20} color="#00E5A0" />
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>AI Recommendations</h3>
                        </div>
                        <div className="flex flex-col gap-3">
                            {[
                                { e: "💰", t: "Review salary for 12 employees below market", a: "Start Review →", href: "/payroll/ctc-revision" },
                                { e: "📈", t: "Schedule career conversations for 8 employees", a: "Assign Manager →", href: "/succession/dashboard" },
                                { e: "🎯", t: "Create PIP for 3 low performers at risk", a: "Start PIP →", href: "/performance/calibration" },
                                { e: "🎁", t: "Recognize top performers in high-risk depts", a: "Give Award →", href: "/performance/recognition" }
                            ].map((rec, i) => (
                                <div key={i} className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 flex flex-col gap-3 hover:border-[rgba(0,229,160,0.5)] transition-colors">
                                    <div className="flex gap-3">
                                        <span className="text-lg">{rec.e}</span>
                                        <span style={{ fontSize: 14, color: "#FFFFFF" }}>{rec.t}</span>
                                    </div>
                                    <a href={rec.href} style={{ fontSize: 13, color: "#00E5A0", fontWeight: 500, alignSelf: "flex-end" }} className="hover:underline">{rec.a}</a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Factors */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Top Risk Factors</h3>
                        <div style={{ height: 180, width: "100%" }} className="relative">
                            <ClientOnly>
                                <ChartWrapper height="h-[300px]">
                                    <PieChart>
                                        <Pie data={riskFactorsData} innerRadius={50} outerRadius={70} stroke="none" dataKey="value">
                                            {riskFactorsData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                        </Pie>
                                        <RechartsTooltip cursor={{ fill: '#1A2A3A' }} contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: 8 }} itemStyle={{ color: '#FFFFFF' }} />
                                    </PieChart>
                                </ChartWrapper>
                            </ClientOnly>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                <span className="text-[#8899AA] text-[10px] font-bold tracking-widest uppercase">Primary</span>
                                <span className="text-[#FF4444] font-bold text-xl leading-tight">34%</span>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            {riskFactorsData.map((rf, i) => (
                                <div key={i} className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                                        <span className="text-[#8899AA]">{rf.name}</span>
                                    </div>
                                    <span className="text-white font-medium">{rf.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Historical Trend */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Historical Attrition</h3>
                        <div style={{ height: 140, width: "100%" }}>
                            <ClientOnly>
                                <ChartWrapper height="h-[300px]">
                                    <LineChart data={historicalData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                                        <XAxis dataKey="m" stroke="#445566" fontSize={11} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#445566" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                                        <RechartsTooltip contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: 8 }} />
                                        {/* Goal Line */}
                                        <Line type="step" dataKey={() => 2.0} stroke="#00E5A0" strokeWidth={1} strokeDasharray="4 4" dot={false} isAnimationActive={false} />
                                        {/* Actual Data */}
                                        <Line type="monotone" dataKey="val" stroke="#FF4444" strokeWidth={2} dot={{ fill: '#FF4444', r: 3, strokeWidth: 0 }} />
                                    </LineChart>
                                </ChartWrapper>
                            </ClientOnly>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
