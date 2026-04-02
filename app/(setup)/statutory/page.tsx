"use client";

import { useState } from "react";
import { Shield, AlertTriangle, Heart, FileText, Users } from "lucide-react";
import Input from "@/components/ui/Input";

function Toggle({ checked, onChange }: { checked: boolean, onChange: (c: boolean) => void }) {
    return (
        <button type="button" onClick={() => onChange(!checked)}
            style={{ width: 44, height: 24, borderRadius: 12, background: checked ? "#00E5A0" : "#1A2A3A", position: "relative", transition: "background 0.2s" }}>
            <div style={{ position: "absolute", top: 3, left: checked ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#FFFFFF", transition: "left 0.2s" }} />
        </button>
    );
}

export default function StatutorySetupPage() {
    const [pfEnabled, setPfEnabled] = useState(true);
    const [esiEnabled, setEsiEnabled] = useState(true);
    const [ptEnabled, setPtEnabled] = useState(true);
    const [lwfEnabled, setLwfEnabled] = useState(false);

    return (
        <div style={{ padding: "48px 64px", maxWidth: 880 }} className="animate-fade-in">
            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Statutory Compliance Setup</h2>
            <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Configure PF, ESI, Professional Tax and other statutory requirements.</p>

            {/* Warning Banner */}
            <div className="flex items-start gap-3 mt-8 mb-8 rounded-xl p-4" style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)" }}>
                <AlertTriangle size={20} color="#FFB800" className="flex-shrink-0 mt-0.5" />
                <div style={{ fontSize: 14, color: "#FFFFFF", lineHeight: 1.5 }}>
                    Incorrect statutory configuration can result in penalties. Verify all details with your CA.
                </div>
            </div>

            {/* Section 1 - PF */}
            <div style={{ background: "#0D1928", border: `1px solid ${pfEnabled ? "#1A2A3A" : "rgba(26,42,58,0.5)"}`, borderRadius: 16, padding: 24, marginBottom: 16, opacity: pfEnabled ? 1 : 0.6, transition: "opacity 0.2s" }}>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <Shield size={22} color={pfEnabled ? "#00E5A0" : "#445566"} />
                        <h3 style={{ fontSize: 18, color: "#FFFFFF", margin: 0 }}>Provident Fund (PF)</h3>
                    </div>
                    <Toggle checked={pfEnabled} onChange={setPfEnabled} />
                </div>

                <div className="grid grid-cols-2 gap-6" style={{ pointerEvents: pfEnabled ? "auto" : "none" }}>
                    <Input label="PF Registration Number *" placeholder="MH/MUM/0123456/000/0001234" />
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>PF Registration Date</label>
                        <input type="date" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]" />
                    </div>
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>PF Contribution Rate (Employee)</label>
                        <input value="12%" readOnly className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] outline-none" />
                    </div>
                    <Input label="PF Contribution Rate (Employer)" defaultValue="12%" />

                    <div className="col-span-2">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-[#1A2A3A] bg-[#0A1420] mt-2 mb-2">
                            <div>
                                <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 500 }}>PF Wage Limit</div>
                                <div style={{ fontSize: 12, color: "#8899AA" }}>Apply PF on actual salary or cap at statutory limit</div>
                            </div>
                            <select className="h-8 px-2 rounded-md text-xs bg-[#060B14] border border-[#1A2A3A] text-white outline-none">
                                <option>Cap at ₹15,000</option>
                                <option>Apply on actual salary</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-[#1A2A3A] bg-[#0A1420] mb-4">
                            <span style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 500 }}>Include PF in CTC?</span>
                            <Toggle checked={true} onChange={() => { }} />
                        </div>

                        <div className="flex gap-4 mb-2">
                            <div className="flex-1 p-2 rounded bg-black/20 border border-[#1A2A3A] text-xs text-[#8899AA] text-center">Admin Charges (0.5%)</div>
                            <div className="flex-1 p-2 rounded bg-black/20 border border-[#1A2A3A] text-xs text-[#8899AA] text-center">EDLI Charges (0.5%)</div>
                        </div>

                        <div className="rounded-md overflow-hidden flex h-6 mt-4">
                            <div className="bg-[#00E5A0] h-full flex items-center justify-center text-[10px] text-black font-semibold" style={{ width: "50%" }}>Employee: 12%</div>
                            <div className="bg-[#0066FF] h-full flex items-center justify-center text-[10px] text-white font-semibold" style={{ width: "34.7%" }}>EPF 8.33%</div>
                            <div className="bg-[#FFB800] h-full flex items-center justify-center text-[10px] text-black font-semibold" style={{ width: "15.3%" }}>EPS 3.67%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2 - ESI */}
            <div style={{ background: "#0D1928", border: `1px solid ${esiEnabled ? "#1A2A3A" : "rgba(26,42,58,0.5)"}`, borderRadius: 16, padding: 24, marginBottom: 16, opacity: esiEnabled ? 1 : 0.6, transition: "opacity 0.2s" }}>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <Heart size={22} color={esiEnabled ? "#FF4444" : "#445566"} />
                        <h3 style={{ fontSize: 18, color: "#FFFFFF", margin: 0 }}>ESI (ESIC)</h3>
                    </div>
                    <Toggle checked={esiEnabled} onChange={setEsiEnabled} />
                </div>
                <div className="grid grid-cols-2 gap-6" style={{ pointerEvents: esiEnabled ? "auto" : "none" }}>
                    <Input label="ESIC Employer Code *" placeholder="31-12345-101" />
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>ESIC Registration Date</label>
                        <input type="date" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]" />
                    </div>

                    <div className="col-span-2 grid grid-cols-3 gap-4">
                        <div>
                            <label style={{ fontSize: 11, color: "#8899AA", display: "block" }}>ESI Wage Ceiling</label>
                            <div style={{ fontSize: 14, color: "#FFFFFF", marginTop: 4 }}>₹21,000/month</div>
                        </div>
                        <div>
                            <label style={{ fontSize: 11, color: "#8899AA", display: "block" }}>Employee Contribution</label>
                            <div style={{ fontSize: 14, color: "#FFFFFF", marginTop: 4 }}>0.75%</div>
                        </div>
                        <div>
                            <label style={{ fontSize: 11, color: "#8899AA", display: "block" }}>Employer Contribution</label>
                            <div style={{ fontSize: 14, color: "#FFFFFF", marginTop: 4 }}>3.25%</div>
                        </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-between p-3 rounded-lg border border-[#1A2A3A] bg-[#0A1420]">
                        <span style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 500 }}>Include ESI in CTC?</span>
                        <Toggle checked={true} onChange={() => { }} />
                    </div>

                    <div className="col-span-2 text-xs text-[#8899AA]">Employees earning above ₹21,000/month are exempt from ESI.</div>
                </div>
            </div>

            {/* Section 3 - PT */}
            <div style={{ background: "#0D1928", border: `1px solid ${ptEnabled ? "#1A2A3A" : "rgba(26,42,58,0.5)"}`, borderRadius: 16, padding: 24, marginBottom: 16, opacity: ptEnabled ? 1 : 0.6, transition: "opacity 0.2s" }}>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <FileText size={22} color={ptEnabled ? "#0066FF" : "#445566"} />
                        <h3 style={{ fontSize: 18, color: "#FFFFFF", margin: 0 }}>Professional Tax (PT)</h3>
                    </div>
                    <Toggle checked={ptEnabled} onChange={setPtEnabled} />
                </div>
                <div className="flex flex-col gap-5" style={{ pointerEvents: ptEnabled ? "auto" : "none" }}>
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>State *</label>
                        <input value="Maharashtra" readOnly className="w-1/2 h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none" />
                    </div>

                    <div className="rounded-lg border border-[#1A2A3A] overflow-hidden bg-[#0A1420]">
                        <div className="grid grid-cols-2 px-4 py-2 border-b border-[#1A2A3A] text-xs text-[#8899AA] uppercase">
                            <div>Monthly Salary Range</div><div>PT Amount</div>
                        </div>
                        <div className="text-sm text-white">
                            <div className="grid grid-cols-2 px-4 py-3 border-b border-[#1A2A3A]"><div>Up to ₹7,500</div><div>₹0</div></div>
                            <div className="grid grid-cols-2 px-4 py-3 border-b border-[#1A2A3A]"><div>₹7,501 – ₹10,000</div><div>₹175</div></div>
                            <div className="grid grid-cols-2 px-4 py-3"><div>₹10,001 and above</div><div>₹200 (₹300 in February)</div></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span style={{ fontSize: 13, color: "#FFFFFF" }}>Deduct PT from salary?</span>
                        <Toggle checked={true} onChange={() => { }} />
                    </div>
                    <button type="button" className="text-sm text-[#0066FF] hover:underline text-left self-start">Add state-wise PT for other states</button>
                </div>
            </div>

            {/* Section 4 - LWF */}
            <div style={{ background: "#0D1928", border: `1px solid ${lwfEnabled ? "#1A2A3A" : "rgba(26,42,58,0.5)"}`, borderRadius: 16, padding: 24, opacity: lwfEnabled ? 1 : 0.6, transition: "opacity 0.2s" }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users size={22} color={lwfEnabled ? "#8899AA" : "#445566"} />
                        <h3 style={{ fontSize: 18, color: "#FFFFFF", margin: 0 }}>Labour Welfare Fund (LWF)</h3>
                    </div>
                    <Toggle checked={lwfEnabled} onChange={setLwfEnabled} />
                </div>
            </div>

        </div>
    );
}
