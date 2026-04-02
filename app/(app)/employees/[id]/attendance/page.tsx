"use client";

import { Card } from "../shared";

export default function AttendanceTab() {
    // Generate realistic attendance dates for the current calendar view
    const days = Array.from({ length: 30 }, (_, i) => ({
        date: i + 1,
        status: [6, 7, 13, 14, 20, 21, 27, 28].includes(i + 1) ? 'WO' :
            [12].includes(i + 1) ? 'H' :
                [8].includes(i + 1) ? 'L' :
                    [18].includes(i + 1) ? 'A' :
                        [3].includes(i + 1) ? 'LC' : // Late coming
                            'P'
    }));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'P': return { bg: "rgba(0,229,160,0.1)", color: "#00E5A0" };
            case 'A': return { bg: "rgba(255,68,68,0.1)", color: "#FF4444" };
            case 'L': return { bg: "rgba(0,102,255,0.1)", color: "#0066FF" };
            case 'WO': return { bg: "#1A2A3A", color: "#8899AA" };
            case 'H': return { bg: "rgba(255,184,0,0.1)", color: "#FFB800" };
            case 'LC': return { bg: "rgba(255,184,0,0.15)", color: "#FFB800", border: '1px solid rgba(255,184,0,0.3)' };
            default: return { bg: "transparent", color: "#FFFFFF" };
        }
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
            <div>
                <Card title="Attendance Calendar — Nov 2024">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 12 }}>
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                            <div key={d} style={{ textAlign: "center", fontSize: 11, color: "#445566", fontWeight: 600, paddingBottom: 8 }}>{d}</div>
                        ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
                        {/* Offset start */}
                        <div style={{ height: 64, background: "transparent" }}></div>
                        <div style={{ height: 64, background: "transparent" }}></div>
                        <div style={{ height: 64, background: "transparent" }}></div>
                        <div style={{ height: 64, background: "transparent" }}></div>

                        {days.map((day, i) => {
                            const style = getStatusColor(day.status);
                            return (
                                <div key={i} style={{
                                    height: 64, borderRadius: 8, background: style.bg, border: (style as any).border || 'none',
                                    display: "flex", flexDirection: "column", alignItems: "flex-end", padding: "6px 8px", position: "relative"
                                }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: style.color }}>{day.date}</span>
                                    <span style={{ fontSize: 10, color: style.color, opacity: 0.8, marginTop: "auto" }}>{day.status}</span>

                                    {day.status === 'LC' && (
                                        <div style={{ position: "absolute", bottom: 6, left: 6, fontSize: 10, color: "#FFB800" }}>9:45 AM</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Card>

                <Card title="Detailed Log">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 100px 100px", padding: "0 0 12px 0", borderBottom: "1px solid #1A2A3A", fontSize: 11, color: "#445566", textTransform: "uppercase", fontWeight: 500 }}>
                        <span>Date</span>
                        <span>First In</span>
                        <span>Last Out</span>
                        <span>Hrs Done</span>
                        <span>Status</span>
                    </div>
                    {[
                        { date: "01 Nov (Fri)", in: "09:02 AM", out: "06:15 PM", hrs: "9h 13m", s: "P", c: "#00E5A0" },
                        { date: "02 Nov (Sat)", in: "—", out: "—", hrs: "—", s: "WO", c: "#8899AA" },
                        { date: "03 Nov (Sun)", in: "—", out: "—", hrs: "—", s: "WO", c: "#8899AA" },
                        { date: "04 Nov (Mon)", in: "09:45 AM", out: "06:30 PM", hrs: "8h 45m", s: "Late", c: "#FFB800" },
                        { date: "05 Nov (Tue)", in: "09:10 AM", out: "06:05 PM", hrs: "8h 55m", s: "P", c: "#00E5A0" },
                    ].map((row, i) => (
                        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 100px 100px", padding: "14px 0", borderBottom: "1px solid #0A1420", alignItems: "center" }}>
                            <span style={{ fontSize: 13, color: "#FFFFFF" }}>{row.date}</span>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>{row.in}</span>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>{row.out}</span>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>{row.hrs}</span>
                            <span style={{ fontSize: 12, color: row.c, fontWeight: 500 }}>{row.s}</span>
                        </div>
                    ))}
                </Card>
            </div>

            <div>
                <Card title="November Summary">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                        <div style={{ background: "#0A1420", padding: "16px", borderRadius: 12, border: "1px solid #1A2A3A" }}>
                            <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0", marginBottom: 4 }}>18</div>
                            <div style={{ fontSize: 11, color: "#8899AA" }}>Present Days</div>
                        </div>
                        <div style={{ background: "#0A1420", padding: "16px", borderRadius: 12, border: "1px solid #1A2A3A" }}>
                            <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444", marginBottom: 4 }}>1</div>
                            <div style={{ fontSize: 11, color: "#8899AA" }}>Absent Days</div>
                        </div>
                        <div style={{ background: "#0A1420", padding: "16px", borderRadius: 12, border: "1px solid #1A2A3A" }}>
                            <div style={{ fontSize: 24, fontWeight: 700, color: "#FFB800", marginBottom: 4 }}>1</div>
                            <div style={{ fontSize: 11, color: "#8899AA" }}>Late Arrivals</div>
                        </div>
                        <div style={{ background: "#0A1420", padding: "16px", borderRadius: 12, border: "1px solid #1A2A3A" }}>
                            <div style={{ fontSize: 24, fontWeight: 700, color: "#0066FF", marginBottom: 4 }}>8</div>
                            <div style={{ fontSize: 11, color: "#8899AA" }}>Weekends & Holidays</div>
                        </div>
                    </div>

                    <div style={{ borderTop: "1px solid #1A2A3A", paddingTop: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
                            <span style={{ color: "#8899AA" }}>Average Working Hrs</span>
                            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>8h 54m / 9h</span>
                        </div>
                        <div style={{ height: 6, background: "#1A2A3A", borderRadius: 4, marginBottom: 16 }}>
                            <div style={{ width: "95%", height: "100%", background: "#00E5A0", borderRadius: 4 }} />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
                            <span style={{ color: "#8899AA" }}>Regularization Requests</span>
                            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>1 Pending</span>
                        </div>
                    </div>
                </Card>

                <Card title="Shift Details">
                    <div style={{ padding: "12px", background: "rgba(0,102,255,0.06)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 10 }}>
                        <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600, marginBottom: 4 }}>General Shift (IST)</div>
                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 8 }}>09:00 AM – 06:00 PM (9 hours)</div>
                        <div style={{ fontSize: 12, color: "#445566" }}>Grace Period: 15 mins (Till 09:15 AM)</div>
                        <div style={{ marginTop: 10 }}>
                            <button style={{ fontSize: 12, color: "#0066FF", background: "none", border: "none", cursor: "pointer", marginTop: 8 }}>Request Shift Change</button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
