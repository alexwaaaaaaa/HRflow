"use client";

import { useState } from "react";
import { Upload, Trash2, CheckSquare } from "lucide-react";

export default function BrandingPage() {
    const [logo, setLogo] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [primaryColor, setPrimaryColor] = useState("#00E5A0");
    const [secondaryColor, setSecondaryColor] = useState("#0066FF");

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        // Simulate upload
        setLogo("uploaded");
    };

    return (
        <div style={{ padding: "48px 64px" }} className="animate-fade-in flex gap-12">
            {/* Left Column */}
            <div style={{ flex: 1, maxWidth: 600 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Logo & Branding</h2>
                <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Your logo will appear on payslips, offer letters, and the employee portal.</p>

                <div style={{ marginTop: 32 }}>
                    {/* Section 1 */}
                    <h3 style={{ fontSize: 16, color: "#FFFFFF", marginBottom: 16 }}>Company Logo</h3>

                    {!logo ? (
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => setLogo("uploaded")}
                            style={{
                                height: 180, borderRadius: 16, background: dragging ? "rgba(0,229,160,0.05)" : "#0D1928",
                                border: `2px dashed ${dragging ? "#00E5A0" : "#1A2A3A"}`,
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", transition: "all 0.2s ease"
                            }}>
                            <Upload size={40} color={dragging ? "#00E5A0" : "#8899AA"} />
                            <div style={{ fontSize: 16, color: "#FFFFFF", marginTop: 12 }}>{dragging ? "Drop to upload" : "Drag & drop your logo here"}</div>
                            <div style={{ fontSize: 14, color: "#0066FF", marginTop: 4 }}>or click to browse</div>
                            <div style={{ fontSize: 12, color: "#445566", marginTop: 8 }}>PNG, JPG, SVG • Max 2MB • Recommended 200x200px</div>
                        </div>
                    ) : (
                        <div className="flex gap-6 items-center animate-slide-in-right" style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                            <div style={{ width: 120, height: 120, background: "#060B14", borderRadius: 12, border: "1px solid #1A2A3A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {/* Mock Logo image */}
                                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #00E5A0, #0066FF)" }} />
                            </div>
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>company_logo_hd.png</span>
                                    <span style={{ fontSize: 12, color: "#8899AA" }}>1.2 MB</span>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <button onClick={() => setLogo(null)} className="flex items-center gap-1 hover:opacity-80" style={{ color: "#FF4444", fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                        <Trash2 size={14} /> Remove
                                    </button>
                                    <span style={{ color: "#1A2A3A" }}>|</span>
                                    <button className="hover:opacity-80" style={{ color: "#0066FF", fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                        Replace Image
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 2 */}
                    <h3 style={{ fontSize: 16, color: "#FFFFFF", marginTop: 32, marginBottom: 16 }}>Brand Colors</h3>
                    <div className="flex gap-8 mb-6">
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Primary Brand Color</label>
                            <div className="flex items-center gap-3">
                                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)}
                                    style={{ width: 40, height: 40, padding: 0, border: "none", borderRadius: 8, cursor: "pointer", background: "none" }} />
                                <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] uppercase w-28" />
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Secondary Brand Color</label>
                            <div className="flex items-center gap-3">
                                <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)}
                                    style={{ width: 40, height: 40, padding: 0, border: "none", borderRadius: 8, cursor: "pointer", background: "none" }} />
                                <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)}
                                    className="h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] uppercase w-28" />
                            </div>
                        </div>
                    </div>

                    <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 8, display: "block" }}>Apply to:</label>
                    <div className="flex flex-col gap-3">
                        {["Payslips and salary documents", "Offer letters and appointment letters", "Employee portal header", "Email notifications"].map(item => (
                            <label key={item} className="flex items-center gap-3 cursor-pointer">
                                <div style={{ width: 18, height: 18, borderRadius: 4, background: primaryColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <CheckSquare size={14} color="#060B14" />
                                </div>
                                <span style={{ fontSize: 14, color: "#FFFFFF" }}>{item}</span>
                            </label>
                        ))}
                    </div>

                    {/* Section 3 */}
                    <h3 style={{ fontSize: 16, color: "#FFFFFF", marginTop: 32, marginBottom: 16 }}>Favicon</h3>
                    <div className="flex items-center gap-4">
                        <div style={{ width: 80, height: 80, borderRadius: 12, background: "#0D1928", border: "2px dashed #1A2A3A", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <Upload size={24} color="#8899AA" />
                        </div>
                        <div style={{ fontSize: 12, color: "#445566" }}>Used in browser tab</div>
                    </div>
                </div>
            </div>

            {/* Right Column Sticky Preview */}
            <div style={{ width: 440 }}>
                <div style={{ position: "sticky", top: 48 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#8899AA", marginBottom: 12 }}>Live Preview</div>

                    {/* Card 1 */}
                    <div style={{ background: "#FFFFFF", borderRadius: 12, padding: 20, position: "relative", overflow: "hidden" }}>
                        <div className="flex justify-between items-start mb-6">
                            {logo ? (
                                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #00E5A0, #0066FF)" }} />
                            ) : (
                                <div style={{ width: 48, height: 48, backgroundColor: "#E5E7EB", borderRadius: 8 }} />
                            )}
                            <div className="text-right">
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>TechCorp Solutions Pvt. Ltd.</div>
                                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Mumbai, Maharashtra</div>
                                <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>GSTIN: 27AAACT1234C1ZK</div>
                            </div>
                        </div>
                        <div style={{ width: "100%", height: 4, background: primaryColor, position: "absolute", bottom: 0, left: 0 }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#8899AA", marginTop: 8, marginBottom: 24, textAlign: "center" }}>Sample Payslip Header</div>

                    {/* Card 2 */}
                    <div style={{ display: "flex", gap: 16 }}>
                        <div style={{ width: 120, background: "#0A1420", borderRadius: 8, padding: 12, border: "1px solid #1A2A3A" }}>
                            {logo ? (
                                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #00E5A0, #0066FF)", marginBottom: 16 }} />
                            ) : (
                                <div style={{ width: 32, height: 32, backgroundColor: "#1A2A3A", borderRadius: 8, marginBottom: 16 }} />
                            )}
                            <div style={{ height: 28, borderRadius: 6, background: `${primaryColor}20`, display: "flex", alignItems: "center", paddingLeft: 8, marginBottom: 4 }}>
                                <div style={{ width: 80, height: 4, borderRadius: 2, background: primaryColor }} />
                            </div>
                            <div style={{ height: 28, borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 8, marginBottom: 4 }}>
                                <div style={{ width: 60, height: 4, borderRadius: 2, background: "#1A2A3A" }} />
                            </div>
                            <div style={{ height: 28, borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                                <div style={{ width: 70, height: 4, borderRadius: 2, background: "#1A2A3A" }} />
                            </div>
                        </div>
                        <div style={{ flex: 1, background: "#060B14", borderRadius: 8, border: "1px solid #1A2A3A" }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#8899AA", marginTop: 8, textAlign: "center", marginLeft: -240 }}>Sample Sidebar</div>

                </div>
            </div>
        </div>
    );
}
