"use client";

import React from "react";
import { ArrowLeft, Gift, Plus, Calendar, Settings, PlayCircle, Star, Zap } from "lucide-react";
import Link from "next/link";

export default function IncentiveSetupPage() {
    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", display: "flex", gap: 32, flexDirection: "row", color: "#FFFFFF" }}>

            {/* LEFT PANEL - PLANS LIST */}
            <div style={{ flex: "0 0 720px", display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
                    <div>
                        <Link href="/payroll-settings" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 16 }}>
                            <ArrowLeft size={16} /> Back to Settings
                        </Link>
                        <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Incentive Plans</h2>
                        <p style={{ color: "#8899AA", fontSize: 14, marginTop: 4 }}>Manage non-sales incentives like attendance, referrals, and spot awards.</p>
                    </div>
                    <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Plus size={16} /> Add New Plan
                    </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* Active Plans */}
                    {[
                        { name: "Perfect Attendance Incentive", type: "Monthly", amount: "₹2,500 fixed", icon: <Calendar size={20} />, color: "#00E5A0", status: true, auto: true },
                        { name: "Employee Referral Bonus", type: "On Event", amount: "₹15,000 fixed", icon: <Gift size={20} />, color: "#FFB800", status: true, auto: false },
                        { name: "Productivity Bonus Q1", type: "Quarterly", amount: "10% of Basic", icon: <Zap size={20} />, color: "#44AAFF", status: true, auto: false },
                    ].map((plan, i) => (
                        <div key={i} style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${plan.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: plan.color }}>
                                    {plan.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{plan.name}</div>
                                    <div style={{ fontSize: 13, color: "#8899AA", display: "flex", alignItems: "center", gap: 12 }}>
                                        <span>{plan.type}</span>
                                        <span style={{ width: 4, height: 4, background: "#3A4A5A", borderRadius: 2 }}></span>
                                        <span style={{ color: "#FFF" }}>{plan.amount}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                                {plan.auto ? (
                                    <span style={{ fontSize: 12, color: "#00E5A0", background: "#00E5A015", padding: "4px 8px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4 }}><PlayCircle size={14} /> Auto-Trigger</span>
                                ) : (
                                    <span style={{ fontSize: 12, color: "#8899AA", background: "#1A2A3A", padding: "4px 8px", borderRadius: 4 }}>Manual Appr.</span>
                                )}

                                <label style={{ position: "relative", display: "inline-block", width: 40, height: 24 }}>
                                    <input type="checkbox" defaultChecked={plan.status} style={{ opacity: 0, width: 0, height: 0 }} />
                                    <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: plan.status ? "#00E5A0" : "#2A3A4A", transition: ".4s", borderRadius: 24 }}>
                                        <span style={{ position: "absolute", content: '""', height: 16, width: 16, left: plan.status ? 20 : 4, bottom: 4, backgroundColor: plan.status ? "#060B14" : "#FFF", transition: ".4s", borderRadius: "50%" }}></span>
                                    </span>
                                </label>

                                <button style={{ background: "transparent", border: "none", color: "#8899AA", cursor: "pointer" }}>
                                    <Settings size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL - PLAN BUILDER */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, position: "sticky", top: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 20px 0" }}>Create / Edit Plan</h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Plan Name</label>
                            <input type="text" defaultValue="Perfect Attendance Incentive" style={{ width: "100%", height: 36, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }} />
                        </div>

                        <div style={{ display: "flex", gap: 16 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Type</label>
                                <select style={{ width: "100%", height: 36, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }}>
                                    <option>Attendance</option>
                                    <option>Referral</option>
                                    <option>Productivity</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Frequency</label>
                                <select style={{ width: "100%", height: 36, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }}>
                                    <option>Monthly</option>
                                    <option>On Event</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Payout Rule / Trigger</label>
                            <div style={{ background: "#1A2A3A", borderRadius: 8, padding: 12, fontSize: 13, border: "1px solid #2A3A4A" }}>
                                When <span style={{ color: "#00E5A0" }}>[Loss of Pay Days]</span> equals <span style={{ color: "#00E5A0" }}>0</span> for entire month.
                            </div>
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Amount Calculation</label>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <select style={{ width: 120, height: 36, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }}>
                                    <option>Fixed Amount</option>
                                    <option>% of Basic</option>
                                </select>
                                <span style={{ color: "#8899AA" }}>₹</span>
                                <input type="text" defaultValue="2500" style={{ flex: 1, height: 36, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", padding: "0 12px", outline: "none" }} />
                            </div>
                        </div>

                        {/* Gamification Preview */}
                        <div style={{ marginTop: 12, background: "linear-gradient(135deg, #0A1A2A 0%, #002233 100%)", border: "1px solid #00E5A030", borderRadius: 12, padding: 20 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "#00E5A0", fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>
                                <Star size={14} fill="#00E5A0" /> Employee Portal Preview
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                                🎉 Congratulations! You earned a ₹2,500 <span style={{ color: "#00E5A0" }}>Attendance Bonus</span> this month! Keep up the great streak.
                            </div>
                        </div>

                        <button style={{ height: 44, width: "100%", background: "#1A2A3A", border: "none", borderRadius: 8, color: "#FFF", fontSize: 14, fontWeight: 500, cursor: "pointer", marginTop: 8 }}>
                            Save Plan Configurations
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
