"use client";

export default function TimelineTab() {
    const events = [
        { dot: "#00E5A0", type: "Salary", date: "Oct 2024", title: "Salary Revision: +11.1%", detail: "₹16,20,000 → ₹18,00,000. Annual appraisal increment.", by: "HR Admin Priya" },
        { dot: "#0066FF", type: "Job Change", date: "Jun 2024", title: "Manager Changed", detail: "Anil Kumar → Karan Mehta. Engineering team restructured.", by: "Super Admin" },
        { dot: "#FFB800", type: "Performance", date: "Mar 2024", title: "Annual Appraisal: 4.2/5", detail: "Top performer band. Recommended for promotion.", by: "Karan Mehta" },
        { dot: "#00E5A0", type: "Salary", date: "Oct 2023", title: "Salary Revision: +8%", detail: "Annual increment. Effective 01/10/2023.", by: "HR Admin Priya" },
        { dot: "#0066FF", type: "Employment", date: "Dec 2021", title: "Probation Confirmed", detail: "6-month probation cleared successfully.", by: "HR Admin" },
        { dot: "#00E5A0", type: "Employment", date: "Jun 2021", title: "Joined: Software Engineer L3", detail: "Employee onboarded. Offer accepted. Documents verified.", by: "HR System" },
    ];

    return (
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32 }}>
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#8899AA", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Filter Events</div>
                {["All Events", "Employment Changes", "Salary Changes", "Leave Events", "Performance", "Compliance", "Disciplinary"].map(f => (
                    <label key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, cursor: "pointer" }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: "#00E5A0" }} />
                        <span style={{ fontSize: 13, color: "#8899AA" }}>{f}</span>
                    </label>
                ))}
            </div>
            <div>
                {events.map((e, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, paddingBottom: 24, position: "relative" }}>
                        {i < events.length - 1 && (
                            <div style={{ position: "absolute", left: 5, top: 16, bottom: 0, width: 2, background: "#1A2A3A" }} />
                        )}
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: e.dot, flexShrink: 0, marginTop: 4, zIndex: 1 }} />
                        <div style={{ flex: 1, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: "14px 18px" }} className="hover:border-[#445566]">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                                <div>
                                    <span style={{ fontSize: 11, background: `${e.dot}15`, color: e.dot, padding: "2px 8px", borderRadius: 6, fontWeight: 600, marginRight: 8 }}>{e.type}</span>
                                </div>
                                <span style={{ fontSize: 12, color: "#445566" }}>{e.date}</span>
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{e.title}</div>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>{e.detail}</div>
                            <div style={{ fontSize: 11, color: "#445566", marginTop: 6 }}>By: {e.by}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
