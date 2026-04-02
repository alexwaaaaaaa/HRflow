"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

function Toggle() {
    const [c, set] = useState(true);
    return (
        <button type="button" onClick={() => set(!c)}
            style={{ width: 44, height: 24, borderRadius: 12, background: c ? "#00E5A0" : "#1A2A3A", position: "relative", transition: "background 0.2s" }}>
            <div style={{ position: "absolute", top: 3, left: c ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#FFFFFF", transition: "left 0.2s" }} />
        </button>
    );
}

export default function PayrollSettingsPage() {
    const [startMonth, setStartMonth] = useState("April");
    const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

    return (
        <div style={{ padding: "48px 64px", maxWidth: 840 }} className="animate-fade-in">
            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Fiscal Year & Payroll Settings</h2>
            <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>These settings affect all salary calculations and compliance filings.</p>

            {/* Section 1 */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginTop: 32, marginBottom: 16 }}>
                <div className="flex items-center gap-3 mb-6">
                    <Calendar size={20} color="#00E5A0" />
                    <h3 style={{ fontSize: 18, color: "#FFFFFF", margin: 0 }}>Financial / Fiscal Year</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Fiscal Year Start *</label>
                        <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                            <option>April</option><option>January</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Fiscal Year End</label>
                        <input value={startMonth === "April" ? "March" : "December"} readOnly className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] outline-none" />
                    </div>
                </div>

                <div className="flex gap-1 mb-6">
                    {(startMonth === "April" ? MONTHS : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]).map((m, i) => (
                        <div key={m} className="flex-1 text-center py-1.5 rounded text-xs font-semibold"
                            style={{ background: i < 9 && startMonth === "April" ? "rgba(0,229,160,0.15)" : "#1A2A3A", color: i < 9 && startMonth === "April" ? "#00E5A0" : "#8899AA" }}>
                            {m}
                        </div>
                    ))}
                </div>

                <div className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-[#1A2A3A] text-[#FFFFFF]">Tax Year: FY 2024-25 (AY 2025-26)</div>
            </div>

            {/* Section 2 */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, color: "#FFFFFF", margin: 0, marginBottom: 16 }}>Payroll Cycle</h3>
                <div className="flex flex-col gap-5">
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 8, display: "block" }}>Payroll Frequency *</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" name="freq" defaultChecked className="accent-[#00E5A0]" /> Monthly</label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" name="freq" className="accent-[#00E5A0]" /> Semi-monthly</label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" name="freq" className="accent-[#00E5A0]" /> Bi-weekly</label>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#8899AA", marginBottom: 6, display: "block" }}>Month-end Cut-off</label>
                            <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none"><option>Last working day</option><option>25th</option></select>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#8899AA", marginBottom: 6, display: "block" }}>Attendance Cut-off</label>
                            <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none"><option>Last working day</option><option>25th</option></select>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#8899AA", marginBottom: 6, display: "block" }}>Payroll Processing</label>
                            <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none"><option>Last day of month</option></select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, color: "#FFFFFF", margin: 0, marginBottom: 16 }}>Salary Configuration</h3>
                <div className="flex flex-col gap-5">
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 8, display: "block" }}>Salary Calculation Basis *</label>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" name="calc" defaultChecked className="accent-[#00E5A0]" /> Per calendar day (actual days in month)</label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" name="calc" className="accent-[#00E5A0]" /> Per working day (26 days fixed)</label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" name="calc" className="accent-[#00E5A0]" /> Per working day (30 days fixed)</label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 8, display: "block" }}>Working Days per Week *</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-sm text-white"><input type="radio" name="week" defaultChecked className="accent-[#00E5A0]" /> 5 days</label>
                                <label className="flex items-center gap-2 text-sm text-white"><input type="radio" name="week" className="accent-[#00E5A0]" /> 5.5 days</label>
                                <label className="flex items-center gap-2 text-sm text-white"><input type="radio" name="week" className="accent-[#00E5A0]" /> 6 days</label>
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 8, display: "block" }}>Week-off Days *</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-sm text-white"><input type="checkbox" defaultChecked className="accent-[#00E5A0]" /> Saturday</label>
                                <label className="flex items-center gap-2 text-sm text-white"><input type="checkbox" defaultChecked className="accent-[#00E5A0]" /> Sunday</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#060B14] border border-[#1A2A3A]">
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>Overtime Calculation</div>
                        <Toggle />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Section 4 */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 16, color: "#FFFFFF", margin: 0, marginBottom: 16 }}>Rounding Rules</h3>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label style={{ fontSize: 12, color: "#8899AA", marginBottom: 4, display: "block" }}>Salary Rounding</label>
                            <select className="w-full h-9 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none"><option>Round to nearest ₹1</option></select>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: "#8899AA", marginBottom: 4, display: "block" }}>TDS Rounding</label>
                            <select className="w-full h-9 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none"><option>Round up to ₹1</option></select>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: "#8899AA", marginBottom: 4, display: "block" }}>PF Rounding</label>
                            <select className="w-full h-9 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none"><option>Round up</option></select>
                        </div>
                    </div>
                </div>
                {/* Section 5 */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 16, color: "#FFFFFF", margin: 0, marginBottom: 16 }}>Arrears & FnF</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between"><span className="text-sm text-white">Auto-calculate salary arrears?</span><Toggle /></div>
                        <div className="flex items-center justify-between"><span className="text-sm text-white">Include arrears in same month?</span><Toggle /></div>
                        <div>
                            <label style={{ fontSize: 12, color: "#8899AA", marginBottom: 4, display: "block" }}>FnF settlement processing days</label>
                            <input value="30 days" readOnly className="w-full h-9 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none" />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: "#8899AA", marginBottom: 4, display: "block" }}>Notice Period (Default)</label>
                            <input value="30 days" readOnly className="w-full h-9 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
