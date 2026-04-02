"use client";

import React from "react";
import { ArrowLeft, Clock, Info, ShieldCheck, Download, Filter } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, Tooltip } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const data = [
    { name: "Apr", provision: 40000 },
    { name: "May", provision: 42000 },
    { name: "Jun", provision: 45000 },
    { name: "Jul", provision: 48000 },
    { name: "Aug", provision: 55000 },
    { name: "Sep", provision: 62000 },
    { name: "Oct", provision: 68000 },
    { name: "Nov", provision: 70000 },
    { name: "Dec", provision: 75000 },
    { name: "Jan", provision: 80000 },
    { name: "Feb", provision: 85000 },
    { name: "Mar", provision: 90000 },
];

export default function GratuityProvisionPage() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", color: "#FFFFFF" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <Link href="/payroll" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Back to Payroll
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Gratuity Provision Management</h2>
                        <span style={{ background: "#1A2A3A", color: "#8899AA", fontSize: 12, padding: "4px 8px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4 }}>
                            <Info size={12} /> Auto-calculated (Basic × 15/26 × Yrs)
                        </span>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 20px", background: "#1A2A3A", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Download size={16} /> Export Register
                    </button>
                    <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                        Process Final Settlement
                    </button>
                </div>
            </div>

            {/* KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ color: "#8899AA", fontSize: 13, marginBottom: 8 }}>Total Provision (Accrued)</div>
                    <div style={{ fontSize: 24, fontWeight: 600, color: "#00E5A0" }}>₹48,23,500</div>
                    <div style={{ fontSize: 12, color: "#00E5A0", marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>+4.2% from last month</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ color: "#8899AA", fontSize: 13, marginBottom: 8 }}>FY 2024-25 Provision (YTD)</div>
                    <div style={{ fontSize: 24, fontWeight: 600 }}>₹8,40,600</div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 8 }}>Since April 2024</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ color: "#8899AA", fontSize: 13, marginBottom: 8 }}>Eligible Employees</div>
                    <div style={{ fontSize: 24, fontWeight: 600 }}>87</div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 8 }}>Completed 4yrs 240 days</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ color: "#8899AA", fontSize: 13, marginBottom: 8 }}>Next Eligibility</div>
                    <div style={{ fontSize: 16, fontWeight: 500, margin: "4px 0" }}>Amit Verma (EMP093)</div>
                    <div style={{ fontSize: 12, color: "#FFB000", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock size={12} /> Due in 3 months
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", gap: 24 }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>

                    {/* Gratuity Trust Status */}
                    <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 22, background: "#00E5A020", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "#00E5A0" }}>
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 4px 0" }}>Gratuity Trust Fund Linking</h3>
                                <div style={{ fontSize: 13, color: "#8899AA", display: "flex", gap: 16 }}>
                                    <span>Provisioned: ₹48,23,500</span>
                                    <span>External Trust: <span style={{ color: "#FF5555" }}>Not Linked</span></span>
                                </div>
                            </div>
                        </div>
                        <button style={{ background: "transparent", border: "1px solid #2A3A4A", borderRadius: 6, color: "#FFFFFF", padding: "8px 16px", fontSize: 13, cursor: "pointer" }}>
                            Setup Group Gratuity Insurance (LIC)
                        </button>
                    </div>

                    {/* Table */}
                    <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, overflowX: "auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Employee Eligibility & Provision Register</h3>
                            <div style={{ display: "flex", gap: 12 }}>
                                <div style={{ position: "relative" }}>
                                    <input type="text" placeholder="Search employee..." style={{ width: 220, height: 36, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none", fontSize: 13 }} />
                                </div>
                                <button style={{ height: 36, padding: "0 16px", background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#8899AA", fontSize: 13, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                                    <Filter size={14} /> Filter
                                </button>
                            </div>
                        </div>

                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #1A2A3A", color: "#8899AA", textAlign: "left" }}>
                                    <th style={{ padding: "0 0 12px 0", fontWeight: 500 }}>Employee</th>
                                    <th style={{ padding: "0 0 12px 16px", fontWeight: 500 }}>DOJ</th>
                                    <th style={{ padding: "0 0 12px 16px", fontWeight: 500 }}>Service (Yrs)</th>
                                    <th style={{ padding: "0 0 12px 16px", fontWeight: 500, textAlign: "right" }}>Basic (₹)</th>
                                    <th title="Monthly Basic × 15/26 ÷ 12" style={{ padding: "0 0 12px 16px", fontWeight: 500, textAlign: "right" }}>Mthly Prov. (₹)</th>
                                    <th style={{ padding: "0 0 12px 16px", fontWeight: 500, textAlign: "right" }}>Cumulative (₹)</th>
                                    <th style={{ padding: "0 0 12px 16px", fontWeight: 500 }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "Priya Sharma", id: "EMP002", doj: "01/06/2019", service: "5.8 yrs", basic: 28000, monthly: 1346, cum: 78340, status: "Eligible" },
                                    { name: "Vikram Mehta", id: "EMP014", doj: "10/02/2020", service: "5.1 yrs", basic: 45000, monthly: 2163, cum: 110334, status: "Eligible" },
                                    { name: "Rajesh Kumar", id: "EMP081", doj: "15/08/2021", service: "3.6 yrs", basic: 40000, monthly: 1923, cum: 83076, status: "Accruing", prog: 72 },
                                    { name: "Kavya Nair", id: "EMP091", doj: "12/11/2022", service: "2.4 yrs", basic: 50000, monthly: 2403, cum: 69207, status: "Accruing", prog: 48 },
                                    { name: "Amit Verma", id: "EMP093", doj: "01/07/2020", service: "4.7 yrs", basic: 35000, monthly: 1682, cum: 94749, status: "Soon", prog: 94 },
                                ].map((emp, i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid #1A2A3A" }}>
                                        <td style={{ padding: "16px 0" }}>
                                            <div style={{ fontWeight: 500 }}>{emp.name}</div>
                                            <div style={{ fontSize: 11, color: "#8899AA", marginTop: 2 }}>{emp.id}</div>
                                        </td>
                                        <td style={{ padding: "16px 0 16px 16px", color: "#8899AA" }}>{emp.doj}</td>
                                        <td style={{ padding: "16px 0 16px 16px", fontWeight: 500 }}>{emp.service}</td>
                                        <td style={{ padding: "16px 0 16px 16px", textAlign: "right" }}>{emp.basic.toLocaleString()}</td>
                                        <td style={{ padding: "16px 0 16px 16px", textAlign: "right", color: "#8899AA" }}>{emp.monthly.toLocaleString()}</td>
                                        <td style={{ padding: "16px 0 16px 16px", textAlign: "right", fontWeight: 600 }}>{emp.cum.toLocaleString()}</td>
                                        <td style={{ padding: "16px 0 16px 16px" }}>
                                            {emp.status === "Eligible" ? (
                                                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#00E5A0", background: "#00E5A015", padding: "4px 8px", borderRadius: 4, fontSize: 11, fontWeight: 500 }}>
                                                    <CheckCircle2 size={12} /> Payable on Exit
                                                </span>
                                            ) : emp.status === "Soon" ? (
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <span style={{ fontSize: 11, color: "#FFB800" }}>3m to Go</span>
                                                    <div style={{ width: 40, height: 4, background: "#1A2A3A", borderRadius: 2 }}><div style={{ width: `${emp.prog}%`, height: "100%", background: "#FFB000", borderRadius: 2 }}></div></div>
                                                </div>
                                            ) : (
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <span style={{ fontSize: 11, color: "#8899AA" }}>Accruing</span>
                                                    <div style={{ width: 40, height: 4, background: "#1A2A3A", borderRadius: 2 }}><div style={{ width: `${emp.prog}%`, height: "100%", background: "#334455", borderRadius: 2 }}></div></div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                {/* Right Graph */}
                <div style={{ flex: "0 0 320px", display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 14, color: "#8899AA", margin: "0 0 20px 0" }}>Monthly Accrual Trend</h3>
                        <div style={{ height: 200, width: "100%" }}>
                            <ChartWrapper height="h-[300px]">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorProv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFF" }}
                                        itemStyle={{ color: "#00E5A0" }}
                                    />
                                    <Area type="monotone" dataKey="provision" stroke="#00E5A0" strokeWidth={2} fillOpacity={1} fill="url(#colorProv)" />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Need to import CheckCircle2 properly, redefining to avoid error:
function CheckCircle2(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
        </svg>
    );
}
