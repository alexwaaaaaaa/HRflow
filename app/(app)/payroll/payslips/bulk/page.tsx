"use client";

import Link from "next/link";
import { useState } from "react";
import { Download, FileText, Filter, Mail, Search, CheckSquare, Square, Printer, Calendar, Send } from "lucide-react";

const EMPLOYEES = [
    { id: "EMP-001", name: "Rahul Sharma", role: "Frontend Developer", dept: "Engineering", netPay: 85500, status: "Generated", emailed: true },
    { id: "EMP-045", name: "Sneha Patil", role: "Sales Manager", dept: "Sales", netPay: 110500, status: "Generated", emailed: false },
    { id: "EMP-204", name: "Vikram Reddy", role: "DevOps Engineer", dept: "Engineering", netPay: 92000, status: "Generated", emailed: true },
    { id: "EMP-312", name: "Kiran Sharma", role: "HR Executive", dept: "HR", netPay: 45000, status: "Pending", emailed: false },
    { id: "EMP-415", name: "Amit Kumar", role: "Marketing Lead", dept: "Marketing", netPay: 65000, status: "Generated", emailed: true },
    { id: "EMP-821", name: "Anil Desai", role: "Operations Exec", dept: "Operations", netPay: 38500, status: "Pending", emailed: false },
];

export default function PayslipBulkGenerate() {
    const [selected, setSelected] = useState<string[]>(EMPLOYEES.map(e => e.id));
    const [month, setMonth] = useState("Nov 2024");

    const toggleAll = () => {
        if (selected.length === EMPLOYEES.length) {
            setSelected([]);
        } else {
            setSelected(EMPLOYEES.map(e => e.id));
        }
    };

    const toggleRow = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(s => s !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Generate & Distribute Payslips</h1>
                    <div style={{ fontSize: 14, color: "#8899AA", display: "flex", alignItems: "center", gap: 8 }}>
                        <Calendar size={16} /> Pay Period: <select value={month} onChange={(e) => setMonth(e.target.value)} style={{ background: "transparent", border: "none", color: "#FFFFFF", fontSize: 14, fontWeight: 600, outline: "none", cursor: "pointer", borderBottom: "1px dashed #445566", paddingBottom: 2 }}>
                            <option value="Nov 2024">November 2024</option>
                            <option value="Oct 2024">October 2024</option>
                            <option value="Sep 2024">September 2024</option>
                        </select>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Printer size={16} /> Print Selected
                    </button>
                    <button disabled={selected.length === 0} style={{ height: 40, padding: "0 16px", background: selected.length === 0 ? "#1A2A3A" : "#0066FF", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: selected.length === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Download size={16} /> Download PDFs ({selected.length})
                    </button>
                    <button disabled={selected.length === 0} style={{ height: 40, padding: "0 20px", background: selected.length === 0 ? "#1A2A3A" : "#00E5A0", border: "none", borderRadius: 8, color: selected.length === 0 ? "#445566" : "#060B14", fontSize: 13, fontWeight: 600, cursor: selected.length === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Send size={16} /> Email Payslips ({selected.length})
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Total Eligible</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>844</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>PDFs Generated</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>842</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Emailed Successfully</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>780</div>
                </div>
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 8 }}>Pending / Failed</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#FFB800" }}>2</div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 12, top: 12 }} />
                        <input type="text" placeholder="Search employee..." style={{ width: 260, height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 14px 0 36px", color: "#FFFFFF", fontSize: 14, outline: "none" }} />
                    </div>
                    <select style={{ height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Sales</option>
                    </select>
                    <select style={{ height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 8, padding: "0 16px", color: "#FFFFFF", fontSize: 14, outline: "none", cursor: "pointer" }}>
                        <option>Status: All</option>
                        <option>Status: Generated</option>
                        <option>Status: Pending</option>
                    </select>
                </div>
                <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Filter size={16} /> More Filters
                </button>
            </div>

            {/* Table */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0A1420", borderBottom: "1px solid #1A2A3A", textAlign: "left" }}>
                            <th style={{ padding: "16px 20px", width: 40 }}>
                                <div onClick={toggleAll} style={{ cursor: "pointer", color: selected.length === EMPLOYEES.length ? "#00E5A0" : "#8899AA" }}>
                                    {selected.length === EMPLOYEES.length ? <CheckSquare size={18} /> : <Square size={18} />}
                                </div>
                            </th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Employee</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Department</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Net Pay</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</th>
                            <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Email Sync</th>
                            <th style={{ padding: "16px 20px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "#8899AA", textTransform: "uppercase", letterSpacing: 0.5 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EMPLOYEES.map((emp) => {
                            const isSelected = selected.includes(emp.id);
                            return (
                                <tr key={emp.id} style={{ borderBottom: "1px solid #1A2A3A", background: isSelected ? "rgba(0,229,160,0.02)" : "transparent", transition: "background 0.2s" }} className="hover:bg-[#1A2A3A]/30">
                                    <td style={{ padding: "16px 20px" }}>
                                        <div onClick={() => toggleRow(emp.id)} style={{ cursor: "pointer", color: isSelected ? "#00E5A0" : "#445566" }}>
                                            {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                                        </div>
                                    </td>
                                    <td style={{ padding: "16px 20px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1A2A3A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>
                                                {emp.name.split(" ").map(n => n[0]).join("")}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{emp.name}</div>
                                                <div style={{ fontSize: 12, color: "#8899AA" }}>{emp.id} • {emp.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: "16px 20px", fontSize: 14, color: "#FFFFFF" }}>{emp.dept}</td>
                                    <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{formatCurrency(emp.netPay)}</td>
                                    <td style={{ padding: "16px 20px" }}>
                                        <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, background: emp.status === "Generated" ? "rgba(0,229,160,0.1)" : "rgba(255,184,0,0.1)", color: emp.status === "Generated" ? "#00E5A0" : "#FFB800" }}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: "16px 20px" }}>
                                        {emp.emailed ? (
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#8899AA" }}>
                                                <Mail size={14} color="#00E5A0" /> Sent
                                            </span>
                                        ) : (
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#445566" }}>
                                                <Mail size={14} /> Not Sent
                                            </span>
                                        )}
                                    </td>
                                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                        <Link href={`/payroll/payslips/${emp.id}`}>
                                            <button style={{ height: 32, padding: "0 12px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 6, color: "#FFFFFF", fontSize: 12, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                                                <FileText size={14} /> View PDF
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div style={{ padding: "16px 20px", color: "#8899AA", fontSize: 13, textAlign: "right" }}>
                Showing 1-6 of 844 employees
            </div>
        </div>
    );
}
