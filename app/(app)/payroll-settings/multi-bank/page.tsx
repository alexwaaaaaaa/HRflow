"use client";

import React, { useState } from "react";
import { ArrowLeft, Building2, Share2, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function MultiBankDisbursementPage() {
    const [autoBalance, setAutoBalance] = useState(true);

    const bankAccounts = [
        {
            id: "HDFC",
            name: "HDFC Current A/C",
            number: "XXXX1234",
            balance: 15000000,
            fund: 6000000,
            allocation: "Engineering + Sales",
            status: "Sufficient",
        },
        {
            id: "ICICI",
            name: "ICICI Current A/C",
            number: "XXXX5678",
            balance: 8000000,
            fund: 4216800,
            allocation: "HR + Finance + Ops + Others",
            status: "Sufficient",
        }
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", color: "#FFFFFF" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <Link href="/payroll-settings" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                        <ArrowLeft size={16} /> Back to Settings
                    </Link>
                    <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Multi-Bank Disbursement Setup</h2>
                    <p style={{ color: "#8899AA", fontSize: 14, marginTop: 4 }}>Manage and route payroll disbursement across multiple company bank accounts.</p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 20px", background: "#1A2A3A", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                        Add Bank Account
                    </button>
                    <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        Proceed to Generate Files <TrendingUp size={16} />
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", gap: 24 }}>
                {/* LEFT: Banks & Rules */}
                <div style={{ flex: "0 0 600px", display: "flex", flexDirection: "column", gap: 24 }}>

                    {/* Source Banks Card */}
                    <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: 8 }}>
                            <Building2 size={18} color="#00E5A0" /> Company Bank Accounts
                        </h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {bankAccounts.map((bank) => (
                                <div key={bank.id} style={{ border: "1px solid #1A2A3A", borderRadius: 12, padding: 16, background: "#0D1928", position: "relative" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                                        <div>
                                            <div style={{ fontSize: 15, fontWeight: 500 }}>{bank.name}</div>
                                            <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>A/C: {bank.number}</div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontSize: 12, color: "#8899AA" }}>Available Balance</div>
                                            <div style={{ fontSize: 16, fontWeight: 600 }}>{formatCurrency(bank.balance)}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                            <span style={{ color: "#8899AA" }}>Allocated Payroll Fund</span>
                                            <span style={{ fontWeight: 500, color: "#FFFFFF" }}>{formatCurrency(bank.fund)}</span>
                                        </div>
                                        {/* Progress Bar showing utilization */}
                                        <div style={{ width: "100%", height: 6, background: "#1A2A3A", borderRadius: 3, overflow: "hidden" }}>
                                            <div style={{ width: `${(bank.fund / bank.balance) * 100}%`, height: "100%", background: "#00E5A0", borderRadius: 3 }} />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
                                            <span style={{ color: "#8899AA" }}>Target: {bank.allocation}</span>
                                            <span style={{ color: "#00E5A0", display: "flex", alignItems: "center", gap: 4 }}><CheckCircle2 size={12} /> {bank.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Allocation Configuration */}
                    <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                                <Share2 size={18} color="#FFB800" /> Allocation Rules
                            </h3>
                            <button style={{ background: "transparent", border: "none", color: "#00E5A0", fontSize: 14, cursor: "pointer" }}>+ Add Rule</button>
                        </div>

                        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                            <span style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Split by:</span>
                            <div style={{ display: "flex", gap: 12 }}>
                                {["Department", "Location", "Grade", "Manual"].map(mode => (
                                    <label key={mode} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, cursor: "pointer", color: mode === "Department" ? "#FFFFFF" : "#8899AA" }}>
                                        <input type="radio" name="split" checked={mode === "Department"} readOnly style={{ accentColor: "#00E5A0" }} /> {mode}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: 16, marginBottom: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                <span style={{ fontSize: 13, fontWeight: 500, color: "#8899AA" }}>Rule 1</span>
                                <span style={{ fontSize: 13, color: "#8899AA" }}>Est: ₹60,00,000</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <select style={{ flex: 1, height: 36, background: "#1A2A3A", border: "none", borderRadius: 6, color: "#FFFFFF", padding: "0 12px", outline: "none" }}>
                                    <option>Engineering, Sales</option>
                                </select>
                                <ArrowLeft size={16} color="#8899AA" style={{ transform: "rotate(180deg)" }} />
                                <select style={{ flex: 1, height: 36, background: "#1A2A3A", border: "none", borderRadius: 6, color: "#FFFFFF", padding: "0 12px", outline: "none" }}>
                                    <option>HDFC Current A/C XXXX1234</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: 16, marginBottom: 24 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                <span style={{ fontSize: 13, fontWeight: 500, color: "#8899AA" }}>Rule 2 (Default/Catch-all)</span>
                                <span style={{ fontSize: 13, color: "#8899AA" }}>Est: ₹42,16,800</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <select disabled style={{ flex: 1, height: 36, background: "#1A2A3A", border: "none", borderRadius: 6, color: "#8899AA", padding: "0 12px", outline: "none" }}>
                                    <option>All remaining departments</option>
                                </select>
                                <ArrowLeft size={16} color="#8899AA" style={{ transform: "rotate(180deg)" }} />
                                <select style={{ flex: 1, height: 36, background: "#1A2A3A", border: "none", borderRadius: 6, color: "#FFFFFF", padding: "0 12px", outline: "none" }}>
                                    <option>ICICI Current A/C XXXX5678</option>
                                </select>
                            </div>
                        </div>

                        <label style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, cursor: "pointer", background: "#1A2A3A", padding: "12px 16px", borderRadius: 8 }}>
                            <input type="checkbox" checked={autoBalance} onChange={(e) => setAutoBalance(e.target.checked)} style={{ accentColor: "#00E5A0", width: 16, height: 16 }} />
                            <div>
                                <div style={{ fontWeight: 500 }}>Auto-balance Shortfalls</div>
                                <div style={{ fontSize: 12, color: "#8899AA" }}>Automatically distribute funds from backup accounts if a primary account lacks sufficient balance.</div>
                            </div>
                        </label>
                    </div>

                </div>

                {/* RIGHT: Visualizer & Totals */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>

                    {/* Sankey Flow Diagram Placeholder */}
                    <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32, flex: 1, display: "flex", flexDirection: "column" }}>
                        <h3 style={{ fontSize: 14, color: "#8899AA", textTransform: "uppercase", margin: "0 0 32px 0", letterSpacing: 1 }}>Route Visualization</h3>

                        <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                            {/* Source Nodes */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 40, zIndex: 2 }}>
                                <div style={{ background: "#00E5A020", border: "1px solid #00E5A0", borderRadius: 8, padding: "12px 16px", width: 160 }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: "#00E5A0" }}>HDFC A/C</div>
                                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>₹60.00L</div>
                                </div>
                                <div style={{ background: "#FFB80020", border: "1px solid #FFB800", borderRadius: 8, padding: "12px 16px", width: 160 }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: "#FFB800" }}>ICICI A/C</div>
                                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 4 }}>₹42.16L</div>
                                </div>
                            </div>

                            {/* Lines (SVG simulation) */}
                            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
                                <path d="M 160 80 C 250 80, 250 40, 360 40" fill="none" stroke="#00E5A040" strokeWidth="24" />
                                <path d="M 160 80 C 250 80, 250 120, 360 120" fill="none" stroke="#00E5A040" strokeWidth="12" />
                                <path d="M 160 190 C 250 190, 250 200, 360 200" fill="none" stroke="#FFB80040" strokeWidth="18" />
                            </svg>

                            {/* Destination Nodes (Employee Banks) */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 24, zIndex: 2 }}>
                                <div style={{ background: "#1A2A3A", borderRadius: 8, padding: "10px 16px", width: 140 }}>
                                    <div style={{ fontSize: 13, color: "#FFFFFF" }}>HDFC Payees</div>
                                    <div style={{ fontSize: 11, color: "#8899AA", marginTop: 4 }}>₹42.34L</div>
                                </div>
                                <div style={{ background: "#1A2A3A", borderRadius: 8, padding: "10px 16px", width: 140 }}>
                                    <div style={{ fontSize: 13, color: "#FFFFFF" }}>SBI Payees</div>
                                    <div style={{ fontSize: 11, color: "#8899AA", marginTop: 4 }}>₹26.18L</div>
                                </div>
                                <div style={{ background: "#1A2A3A", borderRadius: 8, padding: "10px 16px", width: 140 }}>
                                    <div style={{ fontSize: 13, color: "#FFFFFF" }}>ICICI Payees</div>
                                    <div style={{ fontSize: 11, color: "#8899AA", marginTop: 4 }}>₹19.54L</div>
                                </div>
                                <div style={{ background: "#1A2A3A", borderRadius: 8, padding: "10px 16px", width: 140 }}>
                                    <div style={{ fontSize: 13, color: "#FFFFFF" }}>Other Banks</div>
                                    <div style={{ fontSize: 11, color: "#8899AA", marginTop: 4 }}>₹14.10L</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Verification Panel */}
                    <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 20, background: "#00E5A020", display: "flex", alignItems: "center", justifyContent: "center", color: "#00E5A0" }}>
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Total Verification Match</h3>
                                <div style={{ fontSize: 13, color: "#8899AA", marginTop: 2 }}>Allocations fully cover the total payroll.</div>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", background: "#0D1928", padding: "12px 16px", borderRadius: 8 }}>
                                <span style={{ color: "#8899AA", fontSize: 14 }}>Total Payroll Liability</span>
                                <span style={{ fontWeight: 600, fontSize: 14 }}>₹1,02,16,800</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", background: "#0D1928", padding: "12px 16px", borderRadius: 8 }}>
                                <span style={{ color: "#8899AA", fontSize: 14 }}>Total Allocated from Banks</span>
                                <span style={{ fontWeight: 600, fontSize: 14, color: "#00E5A0" }}>₹1,02,16,800</span>
                            </div>
                        </div>

                        <button style={{ width: "100%", height: 48, background: "#1A2A3A", border: "1px solid #2A3A4A", borderRadius: 8, color: "#FFFFFF", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 20 }}>
                            Save Configuration
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
