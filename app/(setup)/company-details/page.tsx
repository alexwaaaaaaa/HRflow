"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import Input from "@/components/ui/Input";

export default function CompanyDetailsPage() {
    const [legalName, setLegalName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [industry, setIndustry] = useState("");
    const [size, setSize] = useState("");

    return (
        <div style={{ padding: "48px 64px" }} className="animate-fade-in flex">
            {/* Left Form Area */}
            <div style={{ flex: 1, maxWidth: 720 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Tell us about your company</h2>
                <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>This information will appear on payslips, letters and compliance filings.</p>

                <div style={{ marginTop: 32 }}>
                    {/* Section 1 */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                        <h3 style={{ fontSize: 18, color: "#FFFFFF", margin: 0, whiteSpace: "nowrap" }}>Basic Information</h3>
                        <div style={{ flex: 1, height: 1, background: "#1A2A3A" }} />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Input label="Company Legal Name *" placeholder="TechCorp Solutions Private Limited" value={legalName} onChange={(e) => setLegalName(e.target.value)} />
                            <div style={{ fontSize: 12, color: "#445566", marginTop: 4 }}>As registered with MCA / ROC</div>
                        </div>
                        <div>
                            <Input label="Company Display Name *" placeholder="TechCorp Solutions" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                            <div style={{ fontSize: 12, color: "#445566", marginTop: 4 }}>Short name for UI and emails</div>
                        </div>

                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Company Type *</label>
                            <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                                value={companyType} onChange={(e) => setCompanyType(e.target.value)}>
                                <option value="" disabled>Select Type</option>
                                <option>Private Limited Company</option>
                                <option>Public Limited Company</option>
                                <option>Partnership Firm</option>
                                <option>LLP (Limited Liability Partnership)</option>
                                <option>Proprietorship</option>
                                <option>Trust / NGO / Section 8</option>
                                <option>Government / PSU</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Industry *</label>
                            <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                                value={industry} onChange={(e) => setIndustry(e.target.value)}>
                                <option value="" disabled>Select Industry</option>
                                <optgroup label="Technology"><option>IT Services</option><option>Software Product</option><option>Startup</option></optgroup>
                                <optgroup label="Manufacturing"><option>Automotive</option><option>Pharma</option></optgroup>
                                <optgroup label="Services"><option>Banking/Finance</option><option>Healthcare</option></optgroup>
                            </select>
                        </div>

                        <Input type="number" label="Year of Incorporation" placeholder="2015" />

                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Company Size *</label>
                            <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                                value={size} onChange={(e) => setSize(e.target.value)}>
                                <option value="" disabled>Select Size</option>
                                <option>1-10</option><option>11-50</option><option>51-200</option>
                                <option>201-500</option><option>501-1000</option><option>1000+</option>
                            </select>
                        </div>

                        <div className="col-span-2 relative">
                            <Input label="Company Website" placeholder="https://www.techcorp.in" style={{ paddingLeft: 40 }} />
                            <Globe size={18} color="#8899AA" style={{ position: "absolute", left: 12, top: 35 }} />
                        </div>

                        <div className="col-span-2 relative">
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Company Description (Optional)</label>
                            <textarea rows={3} placeholder="Brief description of your company..."
                                className="w-full p-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors resize-none" />
                            <div style={{ fontSize: 12, color: "#445566", textAlign: "right", marginTop: 4 }}>0 / 500</div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32, marginBottom: 24 }}>
                        <h3 style={{ fontSize: 18, color: "#FFFFFF", margin: 0, whiteSpace: "nowrap" }}>Contact Information</h3>
                        <div style={{ flex: 1, height: 1, background: "#1A2A3A" }} />
                    </div>

                    <div className="grid grid-cols-2 gap-6 pb-12">
                        <Input label="Primary Contact Name *" placeholder="Priya Mehta" />
                        <Input label="Designation" placeholder="HR Manager" />
                        <Input label="Work Email *" type="email" placeholder="priya@techcorp.in" />
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Work Mobile *</label>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1 px-3 rounded-lg bg-[#0D1928] border border-[#1A2A3A] text-sm text-white" style={{ height: 40 }}>🇮🇳 +91</div>
                                <input type="tel" placeholder="98765 43210" className="flex-1 h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors" />
                            </div>
                        </div>
                        <Input label="Registered Email (for compliance)" type="email" placeholder="compliance@techcorp.in" />
                        <Input label="Support Email (for employees)" type="email" placeholder="hr@techcorp.in" />
                    </div>

                </div>
            </div>

            {/* Right Sticky Preview Area */}
            <div style={{ width: 320, marginLeft: 32 }}>
                <div style={{ position: "sticky", top: 48 }}>
                    <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Live Preview</div>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#1A2A3A", border: "1px dashed #445566", display: "flex", alignItems: "center", justifyContent: "center", color: "#8899AA", fontSize: 12, marginBottom: 16 }}>Logo</div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", wordBreak: "break-word" }}>
                            {displayName || legalName || "Company Name"}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {industry && <span style={{ background: "rgba(0,102,255,0.1)", color: "#0066FF", padding: "4px 12px", borderRadius: 20, fontSize: 12 }}>{industry}</span>}
                            {size && <span style={{ background: "rgba(136,153,170,0.1)", color: "#8899AA", padding: "4px 12px", borderRadius: 20, fontSize: 12 }}>{size} employees</span>}
                            {!industry && !size && <span style={{ background: "rgba(136,153,170,0.1)", color: "#8899AA", padding: "4px 12px", borderRadius: 20, fontSize: 12 }}>Industry</span>}
                        </div>
                        <div style={{ fontSize: 12, color: "#445566", marginTop: 24 }}>This is how your company appears in HRFlow</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
