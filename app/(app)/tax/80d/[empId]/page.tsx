"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Info, Save } from "lucide-react";

export default function Section80D() {
    const [selfSenior, setSelfSenior] = useState(false);
    const [parentSenior, setParentSenior] = useState(true);

    const [selfPremium, setSelfPremium] = useState("12,000");
    const [selfCheckup, setSelfCheckup] = useState("5,000");
    const [parentPremium, setParentPremium] = useState("45,000");
    const [parentCheckup, setParentCheckup] = useState("0");

    const selfLimit = selfSenior ? 50000 : 25000;
    const parentLimit = parentSenior ? 50000 : 25000;
    const maxTotalCheckup = 5000;

    // Calculation logic simplified for UI prototyping
    const selfTotal = Math.min(parseInt(selfPremium.replace(/,/g, '')) + parseInt(selfCheckup.replace(/,/g, '')), selfLimit);
    const parentTotal = Math.min(parseInt(parentPremium.replace(/,/g, '')) + parseInt(parentCheckup.replace(/,/g, '')), parentLimit);

    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax/declaration/EMP-0848" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>80D Health Insurance</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Medical insurance premium and preventive health check-up</div>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>

                {/* Form Area */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                    {/* Self & Family */}
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                        <div style={{ padding: "16px 20px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Self, Spouse & Children</h3>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <span style={{ fontSize: 13, color: "#8899AA" }}>Are any of the insured members a Senior Citizen (60+ years)?</span>
                                <div style={{ display: "flex", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 6, overflow: "hidden" }}>
                                    <button onClick={() => setSelfSenior(true)} style={{ padding: "4px 12px", background: selfSenior ? "#1A2A3A" : "transparent", color: selfSenior ? "#FFFFFF" : "#8899AA", fontSize: 13, border: "none", cursor: "pointer", fontWeight: selfSenior ? 600 : 400 }}>Yes</button>
                                    <button onClick={() => setSelfSenior(false)} style={{ padding: "4px 12px", background: !selfSenior ? "#1A2A3A" : "transparent", color: !selfSenior ? "#FFFFFF" : "#8899AA", fontSize: 13, border: "none", cursor: "pointer", fontWeight: !selfSenior ? 600 : 400 }}>No</button>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: 20 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                <div>
                                    <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, marginBottom: 4 }}>Health Insurance Premium</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>Premium paid via non-cash mode</div>
                                </div>
                                <div style={{ width: 180, position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input type="text" value={selfPremium} onChange={e => setSelfPremium(e.target.value)} placeholder="0" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 15, paddingLeft: 28, paddingRight: 12, outline: "none" }} />
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, marginBottom: 4 }}>Preventive Health Check-up</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>Max overall limit ₹5,000 (included in main limit)</div>
                                </div>
                                <div style={{ width: 180, position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input type="text" value={selfCheckup} onChange={e => setSelfCheckup(e.target.value)} placeholder="0" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 15, paddingLeft: 28, paddingRight: 12, outline: "none" }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Parents */}
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                        <div style={{ padding: "16px 20px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Parents</h3>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <span style={{ fontSize: 13, color: "#8899AA" }}>Are any of the insured parents a Senior Citizen?</span>
                                <div style={{ display: "flex", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 6, overflow: "hidden" }}>
                                    <button onClick={() => setParentSenior(true)} style={{ padding: "4px 12px", background: parentSenior ? "#1A2A3A" : "transparent", color: parentSenior ? "#FFFFFF" : "#8899AA", fontSize: 13, border: "none", cursor: "pointer", fontWeight: parentSenior ? 600 : 400 }}>Yes</button>
                                    <button onClick={() => setParentSenior(false)} style={{ padding: "4px 12px", background: !parentSenior ? "#1A2A3A" : "transparent", color: !parentSenior ? "#FFFFFF" : "#8899AA", fontSize: 13, border: "none", cursor: "pointer", fontWeight: !parentSenior ? 600 : 400 }}>No</button>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: 20 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                <div>
                                    <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, marginBottom: 4 }}>Health Insurance Premium</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>Premium paid via non-cash mode for parents</div>
                                </div>
                                <div style={{ width: 180, position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input type="text" value={parentPremium} onChange={e => setParentPremium(e.target.value)} placeholder="0" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 15, paddingLeft: 28, paddingRight: 12, outline: "none" }} />
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500, marginBottom: 4 }}>Preventive Health Check-up</div>
                                    <div style={{ fontSize: 12, color: "#8899AA" }}>Max overall limit ₹5,000 (across all members)</div>
                                </div>
                                <div style={{ width: 180, position: "relative" }}>
                                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899AA", fontSize: 14 }}>₹</span>
                                    <input type="text" value={parentCheckup} onChange={e => setParentCheckup(e.target.value)} placeholder="0" style={{ width: "100%", height: 44, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 15, paddingLeft: 28, paddingRight: 12, outline: "none" }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: 16, background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 12, display: "flex", gap: 12 }}>
                        <Info size={18} color="#0066FF" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.5 }}>
                            <strong>Note:</strong> Cash payments are not eligible for 80D deduction, except for Preventive Health Check-up. Premiums must be paid via cheque, drafting, net banking, UPI, or credit cards.
                        </div>
                    </div>

                </div>

                {/* Sticky Summary */}
                <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>80D Summary</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "#8899AA" }}>Self & Family (Max ₹{selfLimit.toLocaleString()})</span>
                                <span style={{ color: "#FFFFFF", fontWeight: 500 }}>₹{selfTotal.toLocaleString()}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "#8899AA" }}>Parents (Max ₹{parentLimit.toLocaleString()})</span>
                                <span style={{ color: "#FFFFFF", fontWeight: 500 }}>₹{parentTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <div style={{ borderTop: "1px dashed #1A2A3A", paddingTop: 16, marginBottom: 24 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 600 }}>Total 80D Eligible</span>
                                <span style={{ fontSize: 20, color: "#00E5A0", fontWeight: 700 }}>₹{(selfTotal + parentTotal).toLocaleString()}</span>
                            </div>
                        </div>

                        <button style={{ width: "100%", height: 44, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} className="hover:opacity-90">
                            <Save size={16} /> Save 80D Declaration
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
