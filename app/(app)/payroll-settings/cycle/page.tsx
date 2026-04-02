"use client";

import { Save } from "lucide-react";

export default function PayrollCycleSettings() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px", paddingBottom: 80 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Payroll Cycle Settings</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>Define pay frequency, cut-off dates, and lock periods for processing.</div>
                </div>
                <button style={{ height: 40, padding: "0 20px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Save size={16} /> Save Settings
                </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Pay Frequency */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Pay Frequency</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, background: "rgba(0,229,160,0.05)", border: "1px solid #00E5A0", borderRadius: 12, cursor: "pointer" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <input type="radio" name="freq" defaultChecked style={{ accentColor: "#00E5A0", width: 16, height: 16 }} />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Monthly</div>
                                    <div style={{ fontSize: 13, color: "#8899AA" }}>Once a month payout</div>
                                </div>
                            </div>
                        </label>
                        <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 12, cursor: "pointer", opacity: 0.6 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <input type="radio" name="freq" disabled style={{ width: 16, height: 16 }} />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Bi-Weekly</div>
                                    <div style={{ fontSize: 13, color: "#8899AA" }}>Every two weeks</div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Calculation Period */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Attendance & Payroll Period</h2>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 24 }}>
                        <div>
                            <label style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 500, display: "block", marginBottom: 6 }}>Pay Cycle Start Date</label>
                            <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 14, cursor: "pointer", outline: "none" }}>
                                <option>1st of the month</option>
                                <option>25th of previous month</option>
                                <option>26th of previous month</option>
                            </select>
                            <div style={{ fontSize: 12, color: "#8899AA", marginTop: 6 }}>Current Cycle: <b>1st Nov to 30th Nov</b></div>
                        </div>
                        <div>
                            <label style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 500, display: "block", marginBottom: 6 }}>Pay Slip Release Date</label>
                            <select style={{ width: "100%", height: 40, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 14, cursor: "pointer", outline: "none" }}>
                                <option>Last working day of month</option>
                                <option>1st of next month</option>
                                <option>5th of next month</option>
                                <option>7th of next month</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ borderTop: "1px solid #1A2A3A", paddingTop: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 12 }}>Attendance Cut-off Strategy</h3>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16, cursor: "pointer" }}>
                            <input type="radio" name="cutoff" defaultChecked style={{ accentColor: "#00E5A0", marginTop: 4, width: 16, height: 16 }} />
                            <div>
                                <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, marginBottom: 2 }}>Strict Month-End</div>
                                <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>Leaves or LOP missing approval by month-end will be automatically carried forward as arrears to next month.</div>
                            </div>
                        </label>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                            <input type="radio" name="cutoff" style={{ accentColor: "#00E5A0", marginTop: 4, width: 16, height: 16 }} />
                            <div>
                                <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, marginBottom: 2 }}>Extended Lock</div>
                                <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>Managers have until 3rd of the next month to approve time-offs. Payroll is blocked until cutoff expires.</div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Calculation Working Days */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Day Calculation Formula</h2>

                    <div style={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
                        <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Actual Days in Month</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Divide by 28, 29, 30, or 31 based on calendar month.</div>
                            </div>
                            <input type="radio" name="days" defaultChecked style={{ accentColor: "#00E5A0", width: 18, height: 18 }} />
                        </label>
                        <div style={{ width: "100%", height: 1, background: "#1A2A3A" }} />
                        <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>Fixed 30 Days</div>
                                <div style={{ fontSize: 13, color: "#8899AA" }}>Standardize calculation to divide by exactly 30 days every month.</div>
                            </div>
                            <input type="radio" name="days" style={{ accentColor: "#00E5A0", width: 18, height: 18 }} />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
