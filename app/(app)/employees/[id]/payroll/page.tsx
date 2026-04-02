"use client";

export default function PayrollTab() {
    const ytd = [
        { label: "Gross Earned YTD", val: "₹10,80,153" },
        { label: "TDS Deducted YTD", val: "₹74,000" },
        { label: "PF Contributed (EE+ER)", val: "₹38,880" },
        { label: "Net Received YTD", val: "₹10,06,153" },
    ];
    const months = [
        { m: "Nov 2024", gross: "₹1,20,017", ded: "₹10,300", net: "₹1,09,717", status: "Processing" },
        { m: "Oct 2024", gross: "₹1,20,017", ded: "₹10,300", net: "₹1,09,717", status: "Disbursed" },
        { m: "Sep 2024", gross: "₹1,20,017", ded: "₹10,300", net: "₹1,09,717", status: "Disbursed" },
        { m: "Aug 2024", gross: "₹1,20,017", ded: "₹10,300", net: "₹1,09,717", status: "Disbursed" },
    ];
    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                {ytd.map(({ label, val }) => (
                    <div key={label} style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 14, padding: 20 }}>
                        <div style={{ fontSize: 11, color: "#445566", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF" }}>{val}</div>
                    </div>
                ))}
            </div>
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ padding: "16px 24px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Payslip History</h3>
                    <button style={{ fontSize: 13, color: "#0066FF", background: "none", border: "none", cursor: "pointer" }}>Download All (ZIP)</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 130px 130px 120px 100px", padding: "10px 24px", borderBottom: "1px solid #1A2A3A", background: "#0A1420" }}>
                    {["Month", "Gross", "Deductions", "Net Pay", "Status", "Download"].map(h => (
                        <div key={h} style={{ fontSize: 11, color: "#445566", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>{h}</div>
                    ))}
                </div>
                {months.map(row => (
                    <div key={row.m} style={{ display: "grid", gridTemplateColumns: "1fr 130px 130px 130px 120px 100px", padding: "14px 24px", borderBottom: "1px solid #0A1420", alignItems: "center" }} className="hover:bg-[#0A1420]">
                        <span style={{ fontSize: 14, color: "#FFFFFF" }}>{row.m}</span>
                        <span style={{ fontSize: 14, color: "#FFFFFF" }}>{row.gross}</span>
                        <span style={{ fontSize: 14, color: "#FF4444" }}>-{row.ded}</span>
                        <span style={{ fontSize: 14, color: "#00E5A0", fontWeight: 600 }}>{row.net}</span>
                        <span style={{ fontSize: 12, background: row.status === "Disbursed" ? "rgba(0,229,160,0.1)" : "rgba(255,184,0,0.1)", color: row.status === "Disbursed" ? "#00E5A0" : "#FFB800", padding: "3px 10px", borderRadius: 6 }}>{row.status}</span>
                        {row.status === "Disbursed"
                            ? <button style={{ fontSize: 13, color: "#0066FF", background: "none", border: "none", cursor: "pointer" }}>↓ PDF</button>
                            : <span style={{ fontSize: 13, color: "#445566" }}>—</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
