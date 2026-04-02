"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, Eye, Palette, Layout, Settings2, Smartphone } from "lucide-react";
import Link from "next/link";

export default function PayslipTemplatePage() {
    const [theme, setTheme] = useState("Modern");
    const [sections, setSections] = useState({
        header: true,
        employee: true,
        attendance: true,
        earnings: true,
        deductions: true,
        netPay: true,
        ytd: true,
        leave: false,
        qr: false,
        signature: true,
        bank: false,
        footer: true,
    });
    const [language, setLanguage] = useState("English");
    const [password, setPassword] = useState("PAN");
    const [zoom, setZoom] = useState(75);

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", display: "flex", gap: 32, flexDirection: "row", color: "#FFFFFF" }}>

            {/* LEFT PANEL - CONFIGURATION */}
            <div style={{ flex: "0 0 480px", display: "flex", flexDirection: "column", gap: 24, paddingRight: 8, overflowY: "auto", maxHeight: "calc(100vh - 100px)", paddingBottom: 40 }}>
                <div>
                    <Link href="/payroll-settings" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Back to Settings
                    </Link>
                    <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Payslip Template Customization</h2>
                    <p style={{ color: "#8899AA", fontSize: 14, marginTop: 4 }}>Design the perfect payslip layout with company branding and specific inclusions.</p>
                </div>

                {/* THEMES */}
                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: 8 }}>
                        <Palette size={16} color="#00E5A0" /> Base Theme
                    </h3>
                    <div style={{ display: "flex", gap: 12 }}>
                        {["Corporate", "Modern", "Minimal"].map(t => (
                            <div
                                key={t}
                                onClick={() => setTheme(t)}
                                style={{
                                    flex: 1, height: 80, borderRadius: 12, border: `2px solid ${theme === t ? "#00E5A0" : "#1A2A3A"}`,
                                    background: theme === t ? "#00E5A010" : "#0D1928", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s"
                                }}
                            >
                                <Layout size={20} color={theme === t ? "#00E5A0" : "#8899AA"} />
                                <span style={{ fontSize: 13, fontWeight: theme === t ? 600 : 500, color: theme === t ? "#FFFFFF" : "#8899AA" }}>{t}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* VISIBILITY TOGGLES */}
                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: 8 }}>
                        <Settings2 size={16} color="#FFB800" /> Content Sections
                    </h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 12px" }}>
                        {Object.entries({
                            header: "Company Header", employee: "Employee Info", attendance: "Attendance Summary",
                            earnings: "Earnings Table", deductions: "Deductions Table", netPay: "Net Pay Box",
                            ytd: "YTD Summary", leave: "Leave Balance", qr: "QR Verification",
                            signature: "Digital Signature", bank: "Bank Details (Masked)", footer: "Legal Footer"
                        }).map(([key, label]) => (
                            <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: sections[key as keyof typeof sections] ? "#FFFFFF" : "#8899AA", cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    checked={sections[key as keyof typeof sections]}
                                    onChange={() => toggleSection(key as keyof typeof sections)}
                                    style={{ accentColor: "#00E5A0", width: 16, height: 16 }}
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* ADVANCED */}
                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8, fontWeight: 500 }}>Payslip Language</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }}
                        >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi (Regional)</option>
                            <option value="Bilingual">Bilingual (English + Hindi)</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8, fontWeight: 500 }}>PDF Protection Password</label>
                        <div style={{ display: "flex", gap: 12 }}>
                            {["DOB", "PAN", "None"].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPassword(p)}
                                    style={{ flex: 1, height: 36, background: password === p ? "#0066FF20" : "#0D1928", border: `1px solid ${password === p ? "#0066FF" : "#1A2A3A"}`, color: password === p ? "#0066FF" : "#8899AA", borderRadius: 8, fontSize: 13, cursor: "pointer" }}
                                >
                                    {p === "DOB" ? "DDMMYYYY" : p === "PAN" ? "PAN Last 4" : "None"}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
                    <button style={{ flex: 1, height: 48, background: "#00E5A0", color: "#060B14", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <Save size={18} /> Save Template
                    </button>
                    <button style={{ height: 48, padding: "0 20px", background: "#1A2A3A", color: "#FFFFFF", border: "1px solid #2A3A4A", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Smartphone size={18} /> Send Sample
                    </button>
                </div>
            </div>

            {/* RIGHT PANEL - LIVE PREVIEW */}
            <div style={{ flex: 1, background: "#E8ECEF", borderRadius: 16, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>

                {/* Preview Toolbar */}
                <div style={{ background: "#FFFFFF", borderBottom: "1px solid #DDD", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ color: "#333", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                        <Eye size={16} color="#0066FF" /> Live Render Preview
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "#666" }}>
                        Zoom:
                        <button onClick={() => setZoom(z => Math.max(50, z - 10))} style={{ width: 24, height: 24, borderRadius: 4, border: "1px solid #CCC", background: "#FFF", cursor: "pointer" }}>-</button>
                        <span style={{ width: 40, textAlign: "center" }}>{zoom}%</span>
                        <button onClick={() => setZoom(z => Math.min(100, z + 10))} style={{ width: 24, height: 24, borderRadius: 4, border: "1px solid #CCC", background: "#FFF", cursor: "pointer" }}>+</button>
                    </div>
                </div>

                {/* A4 Wrapper */}
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "32px", overflow: "auto" }}>
                    <div style={{
                        width: "210mm", minHeight: "297mm", background: "#FFFFFF", boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                        transform: `scale(${zoom / 100})`, transformOrigin: "top center", transition: "transform 0.2s ease-out",
                        padding: "20mm 15mm", color: "#333", fontFamily: theme === "Modern" ? "Inter, sans-serif" : "inherit"
                    }}>

                        {/* 1. Header */}
                        {sections.header && (
                            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `2px solid ${theme === "Corporate" ? "#0033A0" : "#EEE"}`, paddingBottom: 15, marginBottom: 20 }}>
                                <div>
                                    <div style={{ fontSize: 24, fontWeight: 800, color: theme === "Corporate" ? "#0033A0" : "#111" }}>HRFLOW CORP.</div>
                                    <div style={{ fontSize: 10, color: "#666", marginTop: 4 }}>123 Tech Park, Mahadevapura, Bengaluru, Karnataka 560048</div>
                                </div>
                                <div style={{ textAlign: "right", marginTop: 4 }}>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: "#444" }}>PAYSLIP</div>
                                    <div style={{ fontSize: 13, color: "#666" }}>For the month of Mar 2025</div>
                                </div>
                            </div>
                        )}

                        {/* 2. Employee Info */}
                        {sections.employee && (
                            <div style={{ display: "flex", gap: 30, marginBottom: 20, fontSize: 12 }}>
                                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "8px 4px", color: "#111" }}>
                                    <span style={{ color: "#666" }}>Employee Name:</span> <strong>Kavya Nair</strong>
                                    <span style={{ color: "#666" }}>Employee ID:</span> <strong>EMP-0091</strong>
                                    <span style={{ color: "#666" }}>Designation:</span> <strong>Senior Product Designer</strong>
                                    <span style={{ color: "#666" }}>Department:</span> <strong>Product</strong>
                                </div>
                                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "8px 4px", color: "#111" }}>
                                    <span style={{ color: "#666" }}>Date Of Joining:</span> <strong>12 Nov 2022</strong>
                                    <span style={{ color: "#666" }}>UAN Number:</span> <strong>10087643219</strong>
                                    <span style={{ color: "#666" }}>PF Number:</span> <strong>MH/BAN/12345/000/0091</strong>
                                    {sections.bank && (
                                        <><span style={{ color: "#666" }}>Bank Details:</span> <strong>HDFC ••••1234</strong></>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 3. Attendance */}
                        {sections.attendance && (
                            <div style={{ background: theme === "Modern" ? "#F8F9FA" : "transparent", border: theme === "Modern" ? "none" : "1px solid #EEE", borderRadius: 8, padding: "10px 15px", display: "flex", justifyContent: "space-between", marginBottom: 25, fontSize: 12 }}>
                                <div style={{ textAlign: "center" }}><div style={{ color: "#666", marginBottom: 2 }}>Total Days</div><strong>31</strong></div>
                                <div style={{ textAlign: "center" }}><div style={{ color: "#666", marginBottom: 2 }}>Paid Days</div><strong>31</strong></div>
                                <div style={{ textAlign: "center" }}><div style={{ color: "#666", marginBottom: 2 }}>LOP Days</div><strong>0</strong></div>
                                {sections.leave && (
                                    <>
                                        <div style={{ textAlign: "center" }}><div style={{ color: "#666", marginBottom: 2 }}>Leaves Taken</div><strong>2</strong></div>
                                        <div style={{ textAlign: "center" }}><div style={{ color: "#666", marginBottom: 2 }}>Leave Balance</div><strong>14</strong></div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* 4. Earnings & Deductions Tables */}
                        <div style={{ display: "flex", gap: "20px", marginBottom: 20 }}>

                            {/* Earnings */}
                            {sections.earnings && (
                                <div style={{ flex: 1 }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                                        <thead>
                                            <tr style={{ background: "#F4F6F8", borderBottom: "1px solid #CCC", color: "#444" }}>
                                                <th style={{ padding: "8px", textAlign: "left" }}>EARNINGS</th>
                                                <th style={{ padding: "8px", textAlign: "right" }}>AMOUNT (₹)</th>
                                                {sections.ytd && <th style={{ padding: "8px", textAlign: "right", color: "#888" }}>YTD (₹)</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                                                <td style={{ padding: "8px" }}>Basic Salary</td>
                                                <td style={{ padding: "8px", textAlign: "right" }}>50,000.00</td>
                                                {sections.ytd && <td style={{ padding: "8px", textAlign: "right", color: "#888" }}>6,00,000</td>}
                                            </tr>
                                            <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                                                <td style={{ padding: "8px" }}>House Rent Allowance</td>
                                                <td style={{ padding: "8px", textAlign: "right" }}>25,000.00</td>
                                                {sections.ytd && <td style={{ padding: "8px", textAlign: "right", color: "#888" }}>3,00,000</td>}
                                            </tr>
                                            <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                                                <td style={{ padding: "8px" }}>Special Allowance</td>
                                                <td style={{ padding: "8px", textAlign: "right" }}>20,833.00</td>
                                                {sections.ytd && <td style={{ padding: "8px", textAlign: "right", color: "#888" }}>2,49,996</td>}
                                            </tr>
                                            <tr style={{ borderTop: "2px solid #555", fontWeight: "bold" }}>
                                                <td style={{ padding: "8px" }}>Gross Earnings (A)</td>
                                                <td style={{ padding: "8px", textAlign: "right" }}>95,833.00</td>
                                                {sections.ytd && <td style={{ padding: "8px", textAlign: "right", color: "#888" }}>11,49,996</td>}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Deductions */}
                            {sections.deductions && (
                                <div style={{ flex: 1 }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                                        <thead>
                                            <tr style={{ background: "#F4F6F8", borderBottom: "1px solid #CCC", color: "#444" }}>
                                                <th style={{ padding: "8px", textAlign: "left" }}>DEDUCTIONS</th>
                                                <th style={{ padding: "8px", textAlign: "right" }}>AMOUNT (₹)</th>
                                                {sections.ytd && <th style={{ padding: "8px", textAlign: "right", color: "#888" }}>YTD (₹)</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                                                <td style={{ padding: "8px" }}>Provident Fund (PF)</td>
                                                <td style={{ padding: "8px", textAlign: "right" }}>1,800.00</td>
                                                {sections.ytd && <td style={{ padding: "8px", textAlign: "right", color: "#888" }}>21,600</td>}
                                            </tr>
                                            <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                                                <td style={{ padding: "8px" }}>Professional Tax</td>
                                                <td style={{ padding: "8px", textAlign: "right" }}>200.00</td>
                                                {sections.ytd && <td style={{ padding: "8px", textAlign: "right", color: "#888" }}>2,500</td>}
                                            </tr>
                                            <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                                                <td style={{ padding: "8px" }}>Income Tax (TDS)</td>
                                                <td style={{ padding: "8px", textAlign: "right" }}>8,500.00</td>
                                                {sections.ytd && <td style={{ padding: "8px", textAlign: "right", color: "#888" }}>1,02,000</td>}
                                            </tr>
                                            <tr style={{ borderTop: "2px solid #555", fontWeight: "bold" }}>
                                                <td style={{ padding: "8px" }}>Total Deductions (B)</td>
                                                <td style={{ padding: "8px", textAlign: "right" }}>10,500.00</td>
                                                {sections.ytd && <td style={{ padding: "8px", textAlign: "right", color: "#888" }}>1,26,100</td>}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* 5. Net Pay */}
                        {sections.netPay && (
                            <div style={{ background: theme === "Modern" ? "#E8F5E9" : "transparent", border: theme === "Modern" ? "none" : "2px solid #333", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, borderRadius: 8 }}>
                                <div>
                                    <div style={{ fontSize: 13, color: "#555" }}>Net Payable (A - B)</div>
                                    <div style={{ fontSize: 11, fontStyle: "italic", color: "#666", marginTop: 4 }}>Rupees Eighty-Five Thousand Three Hundred and Thirty-Three Only</div>
                                </div>
                                <div style={{ fontSize: 24, fontWeight: "bold", color: "#111" }}>₹85,333.00</div>
                            </div>
                        )}

                        {/* 6. Signature / QR */}
                        <div style={{ position: "absolute", bottom: "40px", left: "15mm", right: "15mm", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                            {sections.qr ? (
                                <div style={{ width: 80, height: 80, background: "#EEE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#999", border: "1px solid #CCC" }}>
                                    QR Code<br />(Validates Auth)
                                </div>
                            ) : <div></div>}

                            {sections.signature && (
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ borderBottom: "1px solid #333", width: 150, marginBottom: 8 }}></div>
                                    <div style={{ fontSize: 12, fontWeight: 600 }}>Authorized Signatory</div>
                                    <div style={{ fontSize: 10, color: "#666" }}>HRFlow Corp.</div>
                                </div>
                            )}
                        </div>

                        {/* 7. Footer */}
                        {sections.footer && (
                            <div style={{ position: "absolute", bottom: "15mm", left: 0, width: "100%", textAlign: "center", fontSize: 9, color: "#999" }}>
                                This is a system generated payslip and does not require a physical signature.
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
