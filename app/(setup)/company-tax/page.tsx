"use client";

import { useState } from "react";
import { ShieldCheck, Plus } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi (NCT)"
];

export default function CompanyTaxPage() {
    const [pan, setPan] = useState("");
    const [gst, setGst] = useState("");
    const [panVerified, setPanVerified] = useState(false);
    const [multiLocation, setMultiLocation] = useState(false);

    // Auto verify mock
    const handleVerifyPan = () => {
        if (pan.length === 10) {
            setTimeout(() => setPanVerified(true), 600);
        }
    };

    return (
        <div style={{ padding: "48px 64px", maxWidth: 880 }} className="animate-fade-in">
            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Address, GST & Tax Details</h2>
            <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Required for statutory filings, payslips and compliance reports.</p>

            {/* Section 1 */}
            <h3 style={{ fontSize: 18, color: "#FFFFFF", marginTop: 32, marginBottom: 16 }}>Registered Office Address</h3>
            <div className="flex flex-col gap-4">
                <Input label="Address Line 1 *" placeholder="Plot No. 45, Andheri Industrial Area" />
                <Input label="Address Line 2" placeholder="Building B, 3rd Floor" />
                <div className="grid grid-cols-3 gap-4">
                    <Input label="City / Town *" placeholder="Mumbai" />
                    <Input label="District" placeholder="Mumbai Suburban" />
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>State *</label>
                        <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                            <option value="" disabled selected>Select State</option>
                            {STATES.map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input label="PIN Code *" placeholder="400053" maxLength={6} />
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Country</label>
                        <input value="India" readOnly className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] outline-none" />
                    </div>
                </div>
                <div>
                    <Button variant="ghost" size="sm" className="mt-2"><Plus size={16} /> Add Corporate / Branch Office Address</Button>
                </div>
            </div>

            <div style={{ height: 1, background: "#1A2A3A", margin: "32px 0" }} />

            {/* Section 2 */}
            <h3 style={{ fontSize: 18, color: "#FFFFFF", marginBottom: 16 }}>Tax Identifiers</h3>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <Input label="PAN Number *" placeholder="AAACT1234C" value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} maxLength={10} />
                    <div className="flex items-center justify-between mt-2">
                        {panVerified ? (
                            <span className="flex items-center gap-1 text-xs text-[#00E5A0] animate-fade-in"><ShieldCheck size={14} /> Valid PAN</span>
                        ) : (
                            <button onClick={handleVerifyPan} className="text-xs text-[#0066FF] hover:underline" type="button">Verify PAN &rarr;</button>
                        )}
                    </div>
                </div>
                <div>
                    <Input label="TAN Number" placeholder="MUMB12345A" />
                    <div style={{ fontSize: 12, color: "#445566", marginTop: 4 }}>Tax Deduction Account Number</div>
                </div>

                <div>
                    <Input label="GST Number" placeholder="27AAACT1234C1ZK" value={gst} onChange={(e) => setGst(e.target.value.toUpperCase())} maxLength={15} />
                    <div className="flex items-center justify-between mt-2">
                        {gst.length >= 2 ? <span className="text-xs text-[#8899AA]">State code: {gst.substring(0, 2)}</span> : <span />}
                        <button className="text-xs text-[#0066FF] hover:underline" type="button">Verify GST &rarr;</button>
                    </div>
                </div>
                <Input label="MSME Registration (if any)" placeholder="UDYAM-MH-12-0123456" />

                <div className="col-span-2">
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Nature of Business (for GST)</label>
                    <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                        <option>Manufacturer</option>
                        <option>Trader</option>
                        <option>Service Provider</option>
                        <option>Both Goods & Services</option>
                    </select>
                </div>
            </div>

            <div style={{ height: 1, background: "#1A2A3A", margin: "32px 0" }} />

            {/* Section 3 */}
            <h3 style={{ fontSize: 18, color: "#FFFFFF", marginBottom: 16 }}>Multi-location Setup</h3>
            <div className="flex items-center justify-between rounded-lg p-4 bg-[#0D1928] border border-[#1A2A3A] mb-4">
                <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>Does your company have multiple offices/branches?</div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>Enable this if you have GST registrations in different states</div>
                </div>
                <button type="button" onClick={() => setMultiLocation(!multiLocation)}
                    style={{ width: 40, height: 22, borderRadius: 11, background: multiLocation ? "#00E5A0" : "#1A2A3A", position: "relative", transition: "background 0.2s" }}>
                    <div style={{ position: "absolute", top: 3, left: multiLocation ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF", transition: "left 0.2s" }} />
                </button>
            </div>

            {multiLocation && (
                <div className="animate-fade-in mb-8">
                    <div className="rounded-lg border border-[#1A2A3A] overflow-hidden mb-3">
                        <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-[#0A1420] border-b border-[#1A2A3A] text-xs font-medium text-[#8899AA] uppercase tracking-wide">
                            <div>Location Name</div><div>City</div><div>State</div><div>GST Number</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-[#0D1928] text-sm text-[#FFFFFF] items-center">
                            <div>Corporate HQ</div><div>Mumbai</div><div>Maharashtra</div><div>27AAACT1234C1ZK</div>
                        </div>
                    </div>
                    <Button variant="secondary" size="sm" className="mt-2 text-sm"><Plus size={16} /> Add Location</Button>
                </div>
            )}

        </div>
    );
}
