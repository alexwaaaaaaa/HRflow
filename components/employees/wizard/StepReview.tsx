"use client";

import { CheckCircle2, AlertTriangle, Edit2 } from "lucide-react";

const SECTIONS = [
    {
        step: 0, title: "Personal Information", status: "ok",
        data: [
            ["Full Name", "Rahul Kumar Sharma"], ["EMP ID", "EMP1248 (will be assigned)"],
            ["Date of Birth", "15/08/1996 (Age 28)"], ["Gender", "Male"],
            ["Mobile", "+91 98765 43210"], ["Work Email", "rahul.sharma@techcorp.com"],
            ["PAN", "AAACT****C"], ["Aadhaar", "--5678 (masked)"],
            ["Blood Group", "B+"], ["Emergency Contact", "Geeta Sharma (Mother)"],
        ]
    },
    {
        step: 1, title: "Job Details", status: "ok",
        data: [
            ["Designation", "Senior Software Engineer"], ["Department", "Engineering"],
            ["Location", "Bengaluru Office"], ["Reporting Manager", "Karan Mehta (L5)"],
            ["Date of Joining", "01/12/2024"], ["Confirmation Date", "01/06/2025"],
            ["Employment Type", "Full-Time"], ["Notice Period", "60 days"],
            ["Probation", "6 months"], ["Work Mode", "Hybrid"],
        ]
    },
    {
        step: 2, title: "Salary", status: "ok",
        data: [
            ["Annual CTC", "₹18,00,000"], ["Monthly Gross", "₹1,20,017"],
            ["Salary Structure", "L3 — Standard (IT)"], ["Grade", "L3"],
            ["Monthly Take-home", "≈₹1,09,717"], ["Basic", "₹51,000/month"],
            ["HRA", "₹25,500/month"], ["PF Contribution", "₹1,800/month"],
        ]
    },
    {
        step: 3, title: "Statutory Details", status: "ok",
        data: [
            ["PF Status", "Applicable"], ["UAN", "New (to be generated)"],
            ["ESI Status", "Not Applicable (Gross > ₹21K)"], ["Professional Tax", "₹200/month (Maharashtra)"],
            ["Tax Regime", "New Regime (FY 2024-25)"], ["NPS", "Not opted"],
        ]
    },
    {
        step: 4, title: "Bank Account", status: "ok",
        data: [
            ["Bank", "HDFC Bank, Andheri West"], ["Account", "••••••••4521"],
            ["IFSC", "HDFC0001234"], ["Account Type", "Savings"],
            ["Penny Drop", "✅ Verified — RAHUL KUMAR SHARMA"], ["Account Holder", "Rahul Kumar Sharma"],
        ]
    },
    {
        step: 5, title: "Documents", status: "warn",
        data: [
            ["PAN Card", "✅ Verified"], ["Aadhaar Card", "⚠ Missing"],
            ["Passport Photo", "⚠ Missing"], ["Offer Letter", "⚠ Missing"],
            ["Appointment Letter", "⚠ Missing"], ["Uploaded", "3 of 5 mandatory docs"],
        ]
    },
];

const WORKFLOWS = [
    "Onboarding checklist will be auto-created",
    "Day 1 welcome email sent to rahul.sharma@techcorp.com",
    "IT provisioning request raised",
    "Manager Karan Mehta notified",
    "Payroll enrollment for December 2024",
];

export default function StepReview({ data, onGoToStep }: { data: Record<string, unknown>; onGoToStep: (s: number) => void }) {
    const completeness = 92;

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 28, alignItems: "start" }}>
            {/* LEFT — summary */}
            <div>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", margin: "0 0 20px" }}>Review & Confirm</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {SECTIONS.map(section => (
                        <div key={section.title} style={{ background: "#0D1928", border: `1px solid ${section.status === "warn" ? "rgba(255,184,0,0.3)" : "#1A2A3A"}`, borderRadius: 14, overflow: "hidden" }}>
                            {/* Section header */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #1A2A3A", background: section.status === "warn" ? "rgba(255,184,0,0.04)" : "#0A1420" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    {section.status === "ok"
                                        ? <CheckCircle2 size={16} color="#00E5A0" />
                                        : <AlertTriangle size={16} color="#FFB800" />
                                    }
                                    <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{section.title}</span>
                                </div>
                                <button
                                    onClick={() => onGoToStep(section.step)}
                                    style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#0066FF", background: "transparent", border: "none", cursor: "pointer" }}
                                    className="hover:text-[#66A3FF]"
                                >
                                    <Edit2 size={13} /> Edit
                                </button>
                            </div>
                            {/* Data grid */}
                            <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
                                {section.data.map(([label, value]) => (
                                    <div key={label}>
                                        <div style={{ fontSize: 11, color: "#445566", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>{label}</div>
                                        <div style={{ fontSize: 13, color: value.startsWith("⚠") ? "#FFB800" : value.startsWith("✅") ? "#00E5A0" : "#FFFFFF" }}>{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT — completeness + submit */}
            <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Completeness gauge */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, textAlign: "center" }}>
                    <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 16px" }}>
                        <svg viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#1A2A3A" strokeWidth="10" />
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#00E5A0" strokeWidth="10"
                                strokeDasharray={`${(completeness / 100) * 314} 314`}
                                strokeLinecap="round" style={{ transition: "stroke-dasharray 1s ease" }} />
                        </svg>
                        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>{completeness}%</span>
                            <span style={{ fontSize: 10, color: "#445566" }}>Complete</span>
                        </div>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: "0 0 6px" }}>Profile {completeness}% Complete</h3>
                    <p style={{ fontSize: 12, color: "#8899AA", margin: "0 0 16px" }}>Add missing items for 100%</p>

                    {/* Missing items */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {[
                            { label: "Aadhaar Card", reason: "Required for ESI if salary drops < ₹21K" },
                            { label: "Appointment Letter", reason: "Employee will be notified to sign" },
                            { label: "Passport Photo", reason: "For ID card and ESS profile" },
                            { label: "Offer Letter", reason: "Required for background verification" },
                        ].map(({ label, reason }) => (
                            <button key={label} onClick={() => onGoToStep(5)}
                                style={{ padding: "10px 12px", background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 10, textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}
                                className="hover:border-[rgba(255,184,0,0.5)]">
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#FFB800" }}>⚠ {label}</div>
                                <div style={{ fontSize: 11, color: "#445566", marginTop: 2 }}>{reason}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Workflow triggers */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 12px" }}>After creating, these will trigger:</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {WORKFLOWS.map(w => (
                            <label key={w} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                                <input type="checkbox" defaultChecked style={{ marginTop: 2, accentColor: "#00E5A0" }} />
                                <span style={{ fontSize: 12, color: "#8899AA", lineHeight: 1.4 }}>{w}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Create button — big */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                    <button style={{
                        width: "100%", height: 48, background: "#00E5A0", borderRadius: 10,
                        fontSize: 16, fontWeight: 700, color: "#060B14", border: "none",
                        cursor: "pointer", boxShadow: "0 0 24px rgba(0,229,160,0.35)",
                        transition: "all 0.2s"
                    }}
                        className="hover:shadow-[0_0_32px_rgba(0,229,160,0.5)] hover:scale-[1.02]">
                        Create Employee →
                    </button>
                    <p style={{ fontSize: 11, color: "#445566", textAlign: "center", marginTop: 8 }}>
                        Employee will appear in the system immediately after creation
                    </p>
                </div>
            </div>
        </div>
    );
}
