"use client";

import { use } from "react";
import Link from "next/link";
import { Download, Send } from "lucide-react";

export default function NOCLetter({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const empId = resolvedParams.id;

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 0 80px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <Link href={`/employees/${empId}`} style={{ color: "#8899AA", textDecoration: "none", fontSize: 13 }}>← Back to Profile</Link>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginTop: 12 }}>No Objection Certificate (NOC)</h2>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:border-[#445566]">
                        <Send size={14} /> Email to Employee
                    </button>
                    <button style={{ height: 40, padding: "0 16px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <Download size={14} /> Download PDF
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
                {/* Document View */}
                <div style={{ background: "#FFFFFF", borderRadius: 8, padding: "60px 48px", color: "#000", fontFamily: "'Times New Roman', Times, serif", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", minHeight: 800 }}>
                    {/* Letterhead */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #000", paddingBottom: 24, marginBottom: 40 }}>
                        <div>
                            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>TechCorp</div>
                            <div style={{ fontSize: 14, color: "#444", marginTop: 4 }}>Solutions Pvt. Ltd.</div>
                        </div>
                        <div style={{ textAlign: "right", fontSize: 12, lineHeight: 1.6, color: "#444" }}>
                            123 Tech Park, Tower A,<br />
                            Bengaluru, Karnataka 560100<br />
                            PAN: ABCDE1234F • GSTIN: 29ABCDE1234F1Z5
                        </div>
                    </div>

                    <div style={{ textAlign: "center", fontSize: 18, fontWeight: 700, textDecoration: "underline", marginBottom: 40 }}>
                        NO OBJECTION CERTIFICATE
                    </div>

                    <div style={{ fontSize: 15, lineHeight: 2, marginBottom: 40 }}>
                        TO WHOMSOEVER IT MAY CONCERN
                        <br /><br />
                        This is to certify that <strong>Mr. Rahul Sharma</strong> (Employee ID: {empId}) is a permanent employee of TechCorp Solutions Pvt Ltd, working as a <strong>Senior Software Engineer</strong> since <strong>15th November 2021</strong>.
                        <br /><br />
                        He has applied for a Tourist/Business Visa to visit <strong>United States of America</strong> during his approved annual leave from <strong>10th May 2024</strong> to <strong>25th May 2024</strong>.
                        <br /><br />
                        The company has <strong>no objection</strong> to Mr. Sharma traveling abroad during this period. He will resume his duties with our firm on <strong>27th May 2024</strong>. All expenses during this trip will be borne by the employee.
                        <br /><br />
                        This certificate is issued at the specific request of the employee for the purpose of the visa application.
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 100 }}>
                        <div>
                            <div style={{ marginBottom: 8 }}>For <strong>TechCorp Solutions Pvt Ltd</strong></div>
                            <div style={{ height: 60, borderBottom: "1px dashed #CCC", width: 200, marginBottom: 8 }} />
                            <div style={{ fontWeight: 600 }}>Priya Mehta</div>
                            <div style={{ fontSize: 14, color: "#444" }}>Authorized Signatory, HR</div>
                        </div>
                        <div style={{ textAlign: "right", fontSize: 14 }}>
                            Date: {new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}<br />
                            Place: Bengaluru
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>Certificate Options</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Purpose of NOC</label>
                                <select style={{ width: "100%", height: 38, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 13, outline: "none" }}>
                                    <option>Visa / Travel Abroad</option>
                                    <option>Higher Education (Evening / Dist.)</option>
                                    <option>Part-time Internship</option>
                                    <option>General Purpose</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Destination Country (Travel NOC only)</label>
                                <input defaultValue="United States of America" style={{ width: "100%", height: 38, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 12px", color: "#FFFFFF", fontSize: 13, outline: "none" }} />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                <div>
                                    <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Leave Start</label>
                                    <input type="date" defaultValue="2024-05-10" style={{ width: "100%", height: 38, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 10px", color: "#FFFFFF", fontSize: 13, outline: "none" }} />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Leave End</label>
                                    <input type="date" defaultValue="2024-05-25" style={{ width: "100%", height: 38, background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 10px", color: "#FFFFFF", fontSize: 13, outline: "none" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
