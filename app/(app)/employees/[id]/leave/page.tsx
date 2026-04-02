"use client";

import { Card } from "../shared";

export default function LeaveTab() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24 }}>
            <div>
                <Card title="Leave Balances (2024)">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                        {[
                            { type: "Privilege Leave (PL)", used: 8, total: 15, color: "#00E5A0" },
                            { type: "Sick Leave (SL)", used: 2, total: 7, color: "#0066FF" },
                            { type: "Casual Leave (CL)", used: 5, total: 7, color: "#FFB800" },
                        ].map(({ type, used, total, color }) => (
                            <div key={type} style={{ background: "#0A1420", border: `1px solid ${color}40`, borderRadius: 12, padding: 16, textAlign: "center", position: "relative", overflow: "hidden" }}>
                                <div style={{ fontSize: 11, color: "#8899AA", marginBottom: 8 }}>{type}</div>
                                <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>{total - used}<span style={{ fontSize: 14, color: "#445566", fontWeight: 500 }}> / {total}</span></div>
                                <div style={{ fontSize: 11, color: "#445566", marginTop: 4 }}>Available</div>

                                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#1A2A3A" }}>
                                    <div style={{ width: `${(used / total) * 100}%`, height: "100%", background: color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="Leave History">
                    <div style={{ display: "grid", gridTemplateColumns: "100px 100px 1fr 100px 100px", padding: "0 0 12px 0", borderBottom: "1px solid #1A2A3A", fontSize: 11, color: "#445566", textTransform: "uppercase", fontWeight: 500 }}>
                        <span>Type</span>
                        <span>Dates</span>
                        <span>Reason</span>
                        <span>Duration</span>
                        <span>Status</span>
                    </div>
                    {[
                        { type: "PL", dates: "12 Oct - 14 Oct", reason: "Family trip to Goa", duration: "3 Days", status: "Approved", color: "#00E5A0" },
                        { type: "SL", dates: "05 Sep", reason: "Viral fever", duration: "1 Day", status: "Approved", color: "#00E5A0" },
                        { type: "CL", dates: "15 Aug", reason: "Personal work", duration: "1 Day", status: "Approved", color: "#00E5A0" },
                        { type: "CL", dates: "20 Jul", reason: "Bank visit", duration: "0.5 (First Half)", status: "Approved", color: "#00E5A0" },
                    ].map((row, i) => (
                        <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 100px 1fr 100px 100px", padding: "14px 0", borderBottom: "1px solid #0A1420", alignItems: "center" }}>
                            <span style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>{row.type}</span>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>{row.dates}</span>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>{row.reason}</span>
                            <span style={{ fontSize: 13, color: "#8899AA" }}>{row.duration}</span>
                            <span style={{ fontSize: 12, color: row.color, background: `${row.color}15`, padding: "2px 8px", borderRadius: 6, display: "inline-block", width: "fit-content" }}>{row.status}</span>
                        </div>
                    ))}
                </Card>
            </div>

            <div>
                <Card title="Upcoming Holidays">
                    {[
                        { date: "25 Dec 2024", name: "Christmas Day", day: "Wednesday" },
                        { date: "01 Jan 2025", name: "New Year's Day", day: "Wednesday" },
                        { date: "26 Jan 2025", name: "Republic Day", day: "Sunday" },
                    ].map((h, i) => (
                        <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: "1px solid #0A1420", alignItems: "center" }}>
                            <div style={{ background: "rgba(0,102,255,0.1)", color: "#0066FF", padding: "8px 12px", borderRadius: 8, textAlign: "center", minWidth: 60 }}>
                                <div style={{ fontSize: 16, fontWeight: 700 }}>{h.date.split(" ")[0]}</div>
                                <div style={{ fontSize: 10, textTransform: "uppercase" }}>{h.date.split(" ")[1]}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>{h.name}</div>
                                <div style={{ fontSize: 12, color: "#8899AA", marginTop: 2 }}>{h.day}</div>
                            </div>
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    );
}
