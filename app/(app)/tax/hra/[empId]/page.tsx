"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, Calculator, Save } from "lucide-react";

export default function HRADeclaration() {
    const [metro, setMetro] = useState(true);
    const [rent, setRent] = useState("25,000");
    const [landlordName, setLandlordName] = useState("Mr. Vivek Deshmukh");
    const [landlordPan, setLandlordPan] = useState("XYZA9876Q");
    const [landlordAddress, setLandlordAddress] = useState("B-10, Vasant Vihar, Pune");

    // Demo calculations
    const basicSalary = 600000;
    const hraReceived = 300000;
    const annualRent = parseInt(rent.replace(/,/g, '')) * 12 || 0;

    const condition1 = hraReceived;
    const condition2 = annualRent - (0.10 * basicSalary);
    const condition3 = metro ? 0.50 * basicSalary : 0.40 * basicSalary;

    const exemptedHRA = Math.max(0, Math.min(condition1, condition2, condition3));

    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax/declaration/EMP-0848" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>House Rent Allowance (HRA)</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Declare rent paid to claim tax exemption</div>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>

                {/* Form Area */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Rental Details — Apr 2024 to Mar 2025</h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Monthly Rent Paid <span style={{ color: "#FF4444" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input type="text" value={rent} onChange={e => setRent(e.target.value)} style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, paddingLeft: 28, outline: "none" }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}>City Type <span style={{ color: "#FF4444" }}>*</span></label>
                                <div style={{ display: "flex", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, overflow: "hidden", height: 44 }}>
                                    <button onClick={() => setMetro(true)} style={{ flex: 1, background: metro ? "#1A2A3A" : "transparent", color: metro ? "#FFFFFF" : "#8899AA", fontSize: 14, border: "none", cursor: "pointer", fontWeight: metro ? 600 : 400 }}>Metro</button>
                                    <button onClick={() => setMetro(false)} style={{ flex: 1, background: !metro ? "#1A2A3A" : "transparent", color: !metro ? "#FFFFFF" : "#8899AA", fontSize: 14, border: "none", cursor: "pointer", fontWeight: !metro ? 600 : 400 }}>Non-Metro</button>
                                </div>
                                <div style={{ fontSize: 11, color: "#8899AA", marginTop: 4 }}>Metro = Delhi, Mumbai, Kolkata, Chennai</div>
                            </div>
                        </div>

                        {annualRent > 100000 && (
                            <div style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 8, padding: 16, marginBottom: 20 }}>
                                <div style={{ fontSize: 12, color: "#FFB800", fontWeight: 600, marginBottom: 12 }}>⚠️ PAN of Landlord is mandatory as annual rent exceeds ₹1,00,000</div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                    <div>
                                        <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Landlord Name</label>
                                        <input type="text" value={landlordName} onChange={e => setLandlordName(e.target.value)} style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 13, padding: "0 12px", outline: "none" }} />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Landlord PAN</label>
                                        <input type="text" value={landlordPan} onChange={e => setLandlordPan(e.target.value.toUpperCase())} maxLength={10} style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 13, padding: "0 12px", outline: "none", textTransform: "uppercase" }} />
                                    </div>
                                    <div style={{ gridColumn: "span 2" }}>
                                        <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 6 }}>Landlord Address</label>
                                        <input type="text" value={landlordAddress} onChange={e => setLandlordAddress(e.target.value)} style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 13, padding: "0 12px", outline: "none" }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px dashed #445566", borderRadius: 8, color: "#8899AA", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center" }} className="hover:border-[#0066FF] hover:text-[#0066FF]">
                            <Plus size={16} /> Add Multiple Rental Periods (e.g. rent changed midway)
                        </button>

                    </div>

                </div>

                {/* Sticky Summary */}
                <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                            <Calculator size={18} color="#00E5A0" />
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>HRA Exemption Calc</h3>
                        </div>

                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 16, lineHeight: 1.5 }}>
                            Under section 10(13A), execution is least of the following:
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, borderBottom: "1px solid #1A2A3A", paddingBottom: 20 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "#8899AA" }}>1. Actual HRA Received</span>
                                <span style={{ color: "#FFFFFF" }}>₹{condition1.toLocaleString()}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "#8899AA" }}>2. Rent Paid - 10% Basic</span>
                                <span style={{ color: condition2 <= 0 ? "#FF4444" : "#FFFFFF" }}>{condition2 <= 0 ? '₹0' : `₹${condition2.toLocaleString()}`}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "#8899AA" }}>3. {metro ? '50%' : '40%'} of Basic Salary</span>
                                <span style={{ color: "#FFFFFF" }}>₹{condition3.toLocaleString()}</span>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <span style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 600 }}>Exempted HRA</span>
                            <span style={{ fontSize: 20, color: "#00E5A0", fontWeight: 700 }}>₹{exemptedHRA.toLocaleString()}</span>
                        </div>

                        <button style={{ width: "100%", height: 44, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} className="hover:opacity-90">
                            <Save size={16} /> Save HRA Declaration
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
