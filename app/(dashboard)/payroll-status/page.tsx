"use client";

import { IndianRupee, AlertTriangle, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import { RadialBarChart, RadialBar } from 'recharts';
import ClientOnly from "@/components/ui/ClientOnly";
import ChartWrapper from '@/components/ui/ChartWrapper';

export default function PayrollStatus() {
    const steps = [
        { st: "done", t: "Attendance Lock", d: "Completed 08/11/2024 by Priya Mehta" },
        { st: "done", t: "Salary Computation", d: "Computed 10/11/2024 • 847 employees" },
        { st: "active", t: "Review & Anomalies", d: "3 anomalies flagged" },
        { st: "pending", t: "Finance Approval", d: "Awaiting review" },
        { st: "pending", t: "Disbursement", d: "Awaiting approval" }
    ];

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>November 2024 Payroll Status</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Track every stage of payroll processing</p>
                </div>
                <Button className="gap-2 shadow-[0_0_15px_rgba(0,229,160,0.3)]"><IndianRupee size={16} /> Go to Payroll →</Button>
            </div>

            {/* Timeline Stepper */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 mb-8 relative">
                <div style={{ position: "absolute", top: "50%", left: 48, right: 48, height: 2, background: "#1A2A3A", zIndex: 0, transform: "translateY(-50%)" }} />
                <div style={{ position: "absolute", top: "50%", left: 48, width: "38%", height: 2, background: "#00E5A0", zIndex: 0, transform: "translateY(-50%)" }} />

                <div className="flex justify-between relative z-10 w-full">
                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center flex-1">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 bg-[#060B14] z-10 
                  ${step.st === "done" ? "border-2 border-[#00E5A0] text-[#00E5A0]" :
                                        step.st === "active" ? "border-2 border-[#FFB800] text-[#FFB800] shadow-[0_0_20px_rgba(255,184,0,0.3)] animate-pulse" :
                                            "border-2 border-[#1A2A3A] text-[#445566]"}`}
                            >
                                {step.st === "done" ? "✓" : i + 1}
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 600, color: step.st === "pending" ? "#445566" : "#FFFFFF" }}>{step.t}</div>
                            <div style={{ fontSize: 13, color: step.st === "active" ? "#FFB800" : "#8899AA", marginTop: 4, textAlign: "center", maxWidth: 140, lineHeight: 1.4 }}>{step.d}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Columns */}
            <div className="flex gap-8">

                {/* LEFT */}
                <div style={{ width: 760, flexShrink: 0 }} className="flex flex-col gap-6">

                    {/* Summary */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl">
                        <div className="grid grid-cols-4 divide-x divide-[#1A2A3A] border-b border-[#1A2A3A]">
                            <div className="p-6 text-center">
                                <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Employees</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>847</div>
                            </div>
                            <div className="p-6 text-center">
                                <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Gross</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>₹4.2 Cr</div>
                            </div>
                            <div className="p-6 text-center">
                                <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Deductions</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444" }}>₹38.4 L</div>
                            </div>
                            <div className="p-6 text-center">
                                <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Net</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>₹3.8 Cr</div>
                            </div>
                        </div>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Department</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase text-right">Employees</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase text-right">Gross Salary</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase text-right">Net Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { d: "Engineering", e: "320", g: "₹1.8 Cr", n: "₹1.6 Cr" },
                                    { d: "Sales", e: "180", g: "₹90 L", n: "₹82 L" },
                                    { d: "Operations", e: "172", g: "₹85 L", n: "₹78 L" },
                                    { d: "Marketing", e: "95", g: "₹45 L", n: "₹40 L" },
                                    { d: "HR & Finance", e: "80", g: "₹35 L", n: "₹32 L" }
                                ].map((r, i) => (
                                    <tr key={i} className="border-b border-[#1A2A3A] last:border-0 hover:bg-[#1A2A3A] transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-[#FFFFFF]">{r.d}</td>
                                        <td className="px-6 py-4 text-sm text-[#8899AA] text-right">{r.e}</td>
                                        <td className="px-6 py-4 text-sm text-[#FFFFFF] text-right">{r.g}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-[#00E5A0] text-right">{r.n}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-4 border-t border-[#1A2A3A] text-right bg-[#0A1420] rounded-b-2xl">
                            <Button variant="ghost" className="gap-2 h-9 text-sm"><Download size={16} /> Download Summary</Button>
                        </div>
                    </div>

                    {/* Anomalies */}
                    <div className="bg-[#0D1928] border border-[#FFB800] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB800] opacity-5 blur-[100px] pointer-events-none" />

                        <div className="flex items-center gap-3 mb-6">
                            <AlertTriangle size={24} color="#FFB800" />
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>3 Anomalies Require Attention</h3>
                        </div>

                        <div className="flex flex-col gap-4 relative z-10">
                            {[
                                { c: "🔴", n: "Rahul Sharma", d: "Salary ₹2.1L vs last month ₹45K (375% spike)", a: "Investigate" },
                                { c: "🟡", n: "Pooja Nair", d: "0 attendance days, payroll included in run", a: "Verify" },
                                { c: "🟡", n: "Vikram Singh", d: "Bank account changed yesterday", a: "Confirm" }
                            ].map((anm, i) => (
                                <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-[#060B14] border border-[#1A2A3A] hover:border-[#FFB800] transition-colors">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 text-xs">{anm.c}</span>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{anm.n}</div>
                                            <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>{anm.d}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="secondary" size="sm" className="h-8 shadow-sm">Ignore</Button>
                                        <Button size="sm" className={`h-8 border-none ${anm.c === "🔴" ? "bg-[#FF4444] hover:bg-[#cc3333] text-white" : "bg-[#FFB800] hover:bg-[#cc9900] text-black"}`}>{anm.a}</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT */}
                <div style={{ flex: 1, minWidth: 0 }} className="flex flex-col gap-6">

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <span style={{ fontSize: 13, color: "#8899AA" }}>New Joiners (Pro-rata)</span>
                            <span style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>12</span>
                        </div>
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#1A2A3A]">
                            <span style={{ fontSize: 13, color: "#8899AA" }}>Exits (FnF Settlement)</span>
                            <span style={{ fontSize: 16, fontWeight: 600, color: "#FF4444" }}>3</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span style={{ fontSize: 13, color: "#8899AA" }}>Salary Revisions</span>
                            <span style={{ fontSize: 16, fontWeight: 600, color: "#FFB800" }}>8</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span style={{ fontSize: 13, color: "#8899AA" }}>Reimbursements</span>
                            <span style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>₹3.2 L</span>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col items-center text-center">
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16, width: "100%", textAlign: "left" }}>Health Check</h3>
                        <div style={{ width: 140, height: 140, marginBottom: 16, position: "relative" }}>
                            <ClientOnly>
                                <ChartWrapper height="h-[140px]">
                                    <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={8} data={[{ name: 'val', value: 89, fill: '#00E5A0' }]} startAngle={220} endAngle={-40}>
                                        <RadialBar background={{ fill: '#1A2A3A' }} dataKey="value" cornerRadius={4} />
                                    </RadialBarChart>
                                </ChartWrapper>
                            </ClientOnly>
                            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                <div style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>89</div>
                                <div style={{ fontSize: 10, color: "#8899AA", marginTop: 4 }}>SCORE</div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-2 mt-2">
                            <div className="flex justify-between items-center text-sm p-2 rounded bg-[#0A1420]">
                                <span style={{ color: "#8899AA" }}>Attendance Linked</span>
                                <span>✅</span>
                            </div>
                            <div className="flex justify-between items-center text-sm p-2 rounded bg-[#0A1420]">
                                <span style={{ color: "#8899AA" }}>TDS & PT Updated</span>
                                <span>✅</span>
                            </div>
                            <div className="flex justify-between items-center text-sm p-2 rounded bg-[rgba(255,184,0,0.1)] border border-[rgba(255,184,0,0.2)]">
                                <span style={{ color: "#FFB800", fontWeight: 500 }}>3 Anomalies Found</span>
                                <span>⚠️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Next Steps to Approval</h3>
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex gap-3">
                                <div style={{ width: 24, height: 24, borderRadius: 12, border: "1px solid #FFB800", color: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>1</div>
                                <div style={{ fontSize: 14, color: "#FFFFFF", marginTop: 2 }}>Resolve 3 flagged anomalies</div>
                            </div>
                            <div className="flex gap-3">
                                <div style={{ width: 24, height: 24, borderRadius: 12, border: "1px solid #445566", color: "#8899AA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>2</div>
                                <div style={{ fontSize: 14, color: "#8899AA", marginTop: 2 }}>Finance manager review</div>
                            </div>
                            <div className="flex gap-3">
                                <div style={{ width: 24, height: 24, borderRadius: 12, border: "1px solid #445566", color: "#8899AA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>3</div>
                                <div style={{ fontSize: 14, color: "#8899AA", marginTop: 2 }}>Final approval from Rohan Desai</div>
                            </div>
                        </div>
                        <Button className="w-full bg-[#FFB800] text-black hover:bg-[#e6a600]">Resolve Anomalies →</Button>
                    </div>

                </div>

            </div>

        </div>
    );
}
