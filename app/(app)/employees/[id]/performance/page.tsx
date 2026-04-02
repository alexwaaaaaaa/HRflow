"use client";

import { Card } from "../shared";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import ClientOnly from "@/components/ui/ClientOnly";
import ChartWrapper from '@/components/ui/ChartWrapper';

const perfHistory = [
    { fy: "FY21-22", rating: 3.5 }, { fy: "FY22-23", rating: 4.0 },
    { fy: "FY23-24", rating: 4.2 }, { fy: "FY24-25", rating: 0 },
];

export default function PerformanceTab() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24 }}>
            <div>
                <Card title="FY 2024-25 Appraisal — In Progress">
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                        {["Goals Set ✅", "Mid-Year ✅", "Self Appraisal ○", "Manager Review ○", "Final ○"].map((step, i) => (
                            <div key={i} style={{ fontSize: 12, padding: "4px 10px", background: step.includes("✅") ? "rgba(0,229,160,0.1)" : "#1A2A3A", color: step.includes("✅") ? "#00E5A0" : "#445566", borderRadius: 6 }}>{step}</div>
                        ))}
                    </div>
                    <div style={{ marginBottom: 8, fontSize: 13, color: "#8899AA" }}>Goal Achievement YTD: <span style={{ color: "#00E5A0", fontWeight: 600 }}>73% (6/8 goals)</span></div>
                    <div style={{ height: 6, background: "#1A2A3A", borderRadius: 4 }}>
                        <div style={{ width: "73%", height: "100%", background: "#00E5A0", borderRadius: 4 }} />
                    </div>
                </Card>
                <Card title="Performance Ratings — Last 4 Cycles">
                    <ClientOnly>
                        <ChartWrapper height="h-[160px]">
                            <BarChart data={perfHistory}>
                                <XAxis dataKey="fy" tick={{ fill: "#445566", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis domain={[0, 5]} tick={{ fill: "#445566", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 12 }} />
                                <Bar dataKey="rating" fill="#0066FF" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartWrapper>
                    </ClientOnly>
                </Card>
            </div>
            <div>
                <Card title="360° Feedback Summary">
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                        <div style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF" }}>4.1<span style={{ fontSize: 18, color: "#445566" }}>/5</span></div>
                        <div style={{ fontSize: 12, color: "#8899AA" }}>Overall 360 Score</div>
                    </div>
                    {[
                        { skill: "Technical Skills", val: 4.5, color: "#00E5A0" },
                        { skill: "Leadership", val: 3.8, color: "#0066FF" },
                        { skill: "Communication", val: 4.2, color: "#FFB800" },
                        { skill: "Teamwork", val: 4.0, color: "#00E5A0" },
                    ].map(({ skill, val, color }) => (
                        <div key={skill} style={{ marginBottom: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#8899AA", marginBottom: 4 }}>
                                <span>{skill}</span><span style={{ color }}>{val}/5</span>
                            </div>
                            <div style={{ height: 4, background: "#1A2A3A", borderRadius: 4 }}>
                                <div style={{ width: `${(val / 5) * 100}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.5s ease" }} />
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: 12, padding: "10px 12px", background: "#0A1420", borderRadius: 10, fontSize: 12, color: "#8899AA" }}>
                        Common themes: <span style={{ color: "#00E5A0" }}>Reliable</span> · <span style={{ color: "#0066FF" }}>Technical</span> · <span style={{ color: "#FFB800" }}>Proactive</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
