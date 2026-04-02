"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, Download, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import ClientOnly from "@/components/ui/ClientOnly";
import ChartWrapper from '@/components/ui/ChartWrapper';

const historyData = [
    { year: "2021", ctc: 1200000, inc: 0 },
    { year: "2022", ctc: 1320000, inc: 10 },
    { year: "2023", ctc: 1500000, inc: 13.6 },
    { year: "2024", ctc: 1800000, inc: 20 },
];

export default function SalaryHistoryPage({ params }: { params: { id: string } }) {
    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }} className="animate-fade-in">
            <Link href={`/employees/${params.id}/job-and-salary`} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 24 }}>
                <ArrowLeft size={16} /> Back to Profile
            </Link>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px 0" }}>Salary Revision History</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Rahul Kumar Sharma (EMP001)</div>
                </div>
                <button style={{ height: 36, padding: "0 16px", background: "#1A2A3A", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 13, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Download size={14} /> Export Letter History
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
                {/* Left: Revisions List */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                        { date: "01 Oct 2024", prev: "₹15,00,000", new: "₹18,00,000", pct: "+20%", type: "Promotion", reason: "Promoted to Sr. SE", status: "Active", c: "#00E5A0" },
                        { date: "01 Oct 2023", prev: "₹13,20,000", new: "₹15,00,000", pct: "+13.6%", type: "Annual Appraisal", reason: "Performance Cycle 22-23", status: "Past", c: "#0066FF" },
                        { date: "01 Oct 2022", prev: "₹12,00,000", new: "₹13,20,000", pct: "+10%", type: "Annual Appraisal", reason: "Performance Cycle 21-22", status: "Past", c: "#0066FF" },
                        { date: "01 Jun 2021", prev: "—", new: "₹12,00,000", pct: "—", type: "Joining", reason: "Initial CTC at joining", status: "Past", c: "#8899AA" },
                    ].map((rev, i) => (
                        <div key={i} style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                            {rev.status === "Active" && <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: "#00E5A0" }} />}

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                        <span style={{ fontSize: 13, color: "#8899AA", fontWeight: 500 }}>Effective Date: {rev.date}</span>
                                        <span style={{ fontSize: 11, background: `${rev.c}15`, color: rev.c, padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>{rev.type}</span>
                                        {rev.status === "Active" && <span style={{ fontSize: 10, background: "#00E5A0", color: "#060B14", padding: "2px 6px", borderRadius: 4, fontWeight: 700, textTransform: "uppercase" }}>CURRENT</span>}
                                    </div>
                                    <h3 style={{ fontSize: 16, color: "#FFFFFF", margin: 0 }}>{rev.reason}</h3>
                                </div>
                                <button style={{ fontSize: 13, color: "#0066FF", background: "none", border: "none", cursor: "pointer" }} className="hover:underline">View Letter</button>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px", gap: 16, padding: "16px 20px", background: "#0A1420", borderRadius: 12, border: "1px solid #1A2A3A", alignItems: "center" }}>
                                <div>
                                    <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 4 }}>Previous CTC</div>
                                    <div style={{ fontSize: 16, textDecoration: rev.prev !== "—" ? "line-through" : "none", color: rev.prev !== "—" ? "#8899AA" : "#FFFFFF" }}>{rev.prev}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 4 }}>Revised CTC</div>
                                    <div style={{ fontSize: 20, fontWeight: 700, color: rev.status === "Active" ? "#00E5A0" : "#FFFFFF" }}>{rev.new}</div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 4 }}>Growth</div>
                                    <div style={{ fontSize: 16, fontWeight: 600, color: rev.pct.startsWith("+") ? "#00E5A0" : "#445566", display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                                        {rev.pct.startsWith("+") && <TrendingUp size={14} />} {rev.pct}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Growth Chart */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 20px 0" }}>Salary Growth Overview</h3>
                        <ClientOnly>
                            <div style={{ height: 200, marginBottom: 16 }}>
                                <ChartWrapper height="h-[300px]">
                                    <BarChart data={historyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                                        <XAxis dataKey="year" tick={{ fill: "#8899AA", fontSize: 11 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: "#8899AA", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 100000).toFixed(0)}L`} />
                                        <Tooltip formatter={(v: any) => [`₹${(v / 100000).toFixed(1)}L`, "CTC"]} contentStyle={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                                        <Bar dataKey="ctc" fill="#0066FF" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartWrapper>
                            </div>
                        </ClientOnly>
                        <div style={{ fontSize: 12, color: "#8899AA", display: "flex", gap: 8, alignItems: "flex-start", padding: "12px", background: "rgba(0,102,255,0.05)", borderRadius: 8, border: "1px solid rgba(0,102,255,0.1)" }}>
                            <Info size={14} color="#0066FF" style={{ flexShrink: 0, marginTop: 2 }} />
                            <span>Total CTC growth since joining: <strong style={{ color: "#FFFFFF" }}>50%</strong> (from ₹12L to ₹18L over 3.5 years).</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
