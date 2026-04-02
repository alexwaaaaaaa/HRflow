"use client";

import { useState } from "react";
import { ShieldAlert, Database, Trash2, History, AlertCircle } from "lucide-react";

export default function DataRetentionPage() {
    const [empRec, setEmpRec] = useState("7 years");
    const [payRec, setPayRec] = useState("8 years");
    const [auditLog, setAuditLog] = useState("3 years");
    const [autoDel, setAutoDel] = useState(false);

    return (
        <div style={{ padding: "48px 64px", maxWidth: 840 }} className="animate-fade-in">
            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Data Retention Policy</h2>
            <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Configure how long HRFlow stores your company data (DPDPA 2023 Compliance).</p>

            {/* Notice */}
            <div className="flex items-start gap-3 mt-8 mb-8 rounded-xl p-4" style={{ background: "rgba(0,102,255,0.1)", border: "1px solid rgba(0,102,255,0.3)" }}>
                <ShieldAlert size={20} color="#0066FF" className="flex-shrink-0 mt-0.5" />
                <div style={{ fontSize: 14, color: "#FFFFFF", lineHeight: 1.5 }}>
                    <strong style={{ display: "block", marginBottom: 4 }}>Digital Personal Data Protection Act, 2023</strong>
                    You must delete employee personal data once the purpose of collection is served or the employee withdraws consent, unless retention is required by another law.
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">

                {/* Card 1 */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                    <div className="flex items-center gap-2 mb-4">
                        <div style={{ padding: 6, borderRadius: 8, background: "rgba(0,229,160,0.1)" }}><Database size={18} color="#00E5A0" /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Employee Records</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 12, minHeight: 36 }}>Profile data, documents, performance reviews after exit.</div>
                    <select value={empRec} onChange={e => setEmpRec(e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                        <option>1 year</option><option>3 years</option><option>5 years</option><option>7 years</option><option>Indefinitely</option>
                    </select>
                </div>

                {/* Card 2 */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                    <div className="flex items-center gap-2 mb-4">
                        <div style={{ padding: 6, borderRadius: 8, background: "rgba(0,102,255,0.1)" }}><History size={18} color="#0066FF" /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Payroll Records</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 12, minHeight: 36 }}>Payslips, PF, ESI, tax declarations and statutory filings.</div>
                    <select value={payRec} onChange={e => setPayRec(e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                        <option>3 years</option><option>5 years</option><option>8 years (Req by IT Act)</option><option>Indefinitely</option>
                    </select>
                </div>

                {/* Card 3 */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                    <div className="flex items-center gap-2 mb-4">
                        <div style={{ padding: 6, borderRadius: 8, background: "rgba(255,184,0,0.1)" }}><ShieldAlert size={18} color="#FFB800" /></div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>Audit Logs</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 12, minHeight: 36 }}>Login history, IP addresses, system-level changes.</div>
                    <select value={auditLog} onChange={e => setAuditLog(e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                        <option>1 year</option><option>3 years</option><option>5 years</option>
                    </select>
                </div>

            </div>

            <h3 style={{ fontSize: 18, color: "#FFFFFF", margin: 0, marginBottom: 16 }}>Deletion Procedure</h3>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                <div className="flex items-center justify-between p-5 border-b border-[#1A2A3A]">
                    <div className="flex items-start gap-4">
                        <div style={{ padding: 10, borderRadius: "50%", background: "rgba(255,68,68,0.1)" }}><Trash2 size={24} color="#FF4444" /></div>
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>Automated Hard Deletion</div>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>Once the retention period expires, permanently delete data. <br />A 30-day notice is sent to Super Admins before deletion.</div>
                        </div>
                    </div>
                    <button type="button" onClick={() => setAutoDel(!autoDel)}
                        style={{ width: 44, height: 24, borderRadius: 12, background: autoDel ? "#FF4444" : "#1A2A3A", position: "relative", transition: "background 0.2s" }}>
                        <div style={{ position: "absolute", top: 3, left: autoDel ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#FFFFFF", transition: "left 0.2s" }} />
                    </button>
                </div>

                {autoDel ? (
                    <div className="p-5 text-sm text-[#FFFFFF] bg-[rgba(255,68,68,0.05)] animate-fade-in flex items-center gap-2">
                        <AlertCircle size={16} color="#FF4444" /> Data will be irreversibly deleted upon expiration. No backups will be retained.
                    </div>
                ) : (
                    <div className="p-5 text-sm text-[#8899AA]">
                        Data will be archived and retained until a Super Admin initiates manual deletion.
                    </div>
                )}
            </div>

        </div>
    );
}
