"use client";

import Link from "next/link";
import { ArrowLeft, Download, Mail, Printer } from "lucide-react";

export default function IndividualPayslipView() {
    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px" }}>
            {/* Header Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <Link href="/payroll/payslips/bulk" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#8899AA", textDecoration: "none", fontSize: 14 }}>
                    <ArrowLeft size={16} /> Back to Payslips list
                </Link>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <Mail size={16} /> Send Email
                    </button>
                    <button style={{ height: 36, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <Printer size={16} /> Print
                    </button>
                    <button style={{ height: 36, padding: "0 16px", background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <Download size={16} /> Download PDF
                    </button>
                </div>
            </div>

            {/* Simulated Payslip Document */}
            <div style={{ background: "#FFFFFF", borderRadius: 8, padding: 48, boxShadow: "0 4px 24px rgba(0,0,0,0.2)", minHeight: 1000, color: "#111827", fontFamily: "Arial, sans-serif" }}>

                {/* Payslip Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 24, borderBottom: "2px solid #E5E7EB", marginBottom: 32 }}>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: "#0066FF", letterSpacing: -0.5, marginBottom: 8 }}>HRFLOW PRIVATE LIMITED</div>
                        <div style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.5 }}>
                            12th Floor, Tech Park, Outer Ring Road<br />
                            Bengaluru, Karnataka 560103<br />
                            contact@hrflow.com
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 28, fontWeight: 700, color: "#111827", textTransform: "uppercase", marginBottom: 4 }}>Payslip</div>
                        <div style={{ fontSize: 16, color: "#4B5563", fontWeight: 600 }}>For the month of November 2024</div>
                    </div>
                </div>

                {/* Employee Info Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
                    <table style={{ width: "100%", fontSize: 12 }}>
                        <tbody>
                            <tr><td style={{ padding: "4px 0", color: "#6B7280", width: 140 }}>Employee Name:</td><td style={{ padding: "4px 0", fontWeight: 600 }}>Rahul Sharma</td></tr>
                            <tr><td style={{ padding: "4px 0", color: "#6B7280" }}>Employee ID:</td><td style={{ padding: "4px 0", fontWeight: 600 }}>EMP-001</td></tr>
                            <tr><td style={{ padding: "4px 0", color: "#6B7280" }}>Designation:</td><td style={{ padding: "4px 0", fontWeight: 600 }}>Frontend Developer</td></tr>
                            <tr><td style={{ padding: "4px 0", color: "#6B7280" }}>Department:</td><td style={{ padding: "4px 0", fontWeight: 600 }}>Engineering</td></tr>
                            <tr><td style={{ padding: "4px 0", color: "#6B7280" }}>Date of Joining:</td><td style={{ padding: "4px 0", fontWeight: 600 }}>15 May 2022</td></tr>
                        </tbody>
                    </table>
                    <table style={{ width: "100%", fontSize: 12 }}>
                        <tbody>
                            <tr><td style={{ padding: "4px 0", color: "#6B7280", width: 140 }}>Bank Name:</td><td style={{ padding: "4px 0", fontWeight: 600 }}>HDFC Bank</td></tr>
                            <tr><td style={{ padding: "4px 0", color: "#6B7280" }}>Bank Account No:</td><td style={{ padding: "4px 0", fontWeight: 600 }}>XXXXX4821</td></tr>
                            <tr><td style={{ padding: "4px 0", color: "#6B7280" }}>PAN Number:</td><td style={{ padding: "4px 0", fontWeight: 600 }}>ABCDE1234F</td></tr>
                            <tr><td style={{ padding: "4px 0", color: "#6B7280" }}>UAN Number:</td><td style={{ padding: "4px 0", fontWeight: 600 }}>101012345678</td></tr>
                            <tr><td style={{ padding: "4px 0", color: "#6B7280" }}>PF Account:</td><td style={{ padding: "4px 0", fontWeight: 600 }}>MH/BAN/12345/000</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* Attendance Summary */}
                <div style={{ background: "#F3F4F6", borderRadius: 8, padding: 16, display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
                    <div style={{ textAlign: "center", flex: 1 }}><div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>Total Days</div><div style={{ fontSize: 14, fontWeight: 700 }}>30</div></div>
                    <div style={{ width: 1, background: "#D1D5DB" }} />
                    <div style={{ textAlign: "center", flex: 1 }}><div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>Paid Days</div><div style={{ fontSize: 14, fontWeight: 700 }}>30</div></div>
                    <div style={{ width: 1, background: "#D1D5DB" }} />
                    <div style={{ textAlign: "center", flex: 1 }}><div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>LOP Days</div><div style={{ fontSize: 14, fontWeight: 700 }}>0</div></div>
                    <div style={{ width: 1, background: "#D1D5DB" }} />
                    <div style={{ textAlign: "center", flex: 1 }}><div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>Leave Taken</div><div style={{ fontSize: 14, fontWeight: 700 }}>1</div></div>
                </div>

                {/* Earnings & Deductions Tables */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
                    {/* Earnings */}
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 700, padding: "8px 12px", background: "#E5E7EB", borderRadius: "4px 4px 0 0" }}>Earnings</div>
                        <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                            <tbody>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}><td style={{ padding: "12px" }}>Basic Salary</td><td style={{ padding: "12px", textAlign: "right" }}>₹ 40,000</td></tr>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}><td style={{ padding: "12px" }}>House Rent Allowance</td><td style={{ padding: "12px", textAlign: "right" }}>₹ 20,000</td></tr>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}><td style={{ padding: "12px" }}>Special Allowance</td><td style={{ padding: "12px", textAlign: "right" }}>₹ 32,100</td></tr>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}><td style={{ padding: "12px" }}>Leave Travel Allowance</td><td style={{ padding: "12px", textAlign: "right" }}>₹ 4,000</td></tr>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}><td style={{ padding: "12px" }}>Performance Bonus</td><td style={{ padding: "12px", textAlign: "right" }}>₹ 0</td></tr>
                            </tbody>
                            <tfoot>
                                <tr style={{ borderTop: "2px solid #E5E7EB", fontWeight: 700 }}>
                                    <td style={{ padding: "12px" }}>Total Earnings (A)</td>
                                    <td style={{ padding: "12px", textAlign: "right" }}>₹ 96,100</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Deductions */}
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 700, padding: "8px 12px", background: "#E5E7EB", borderRadius: "4px 4px 0 0" }}>Deductions</div>
                        <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                            <tbody>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}><td style={{ padding: "12px" }}>Provident Fund (EPF)</td><td style={{ padding: "12px", textAlign: "right" }}>₹ 1,800</td></tr>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}><td style={{ padding: "12px" }}>Professional Tax</td><td style={{ padding: "12px", textAlign: "right" }}>₹ 200</td></tr>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}><td style={{ padding: "12px" }}>Income Tax (TDS)</td><td style={{ padding: "12px", textAlign: "right" }}>₹ 8,600</td></tr>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}><td style={{ padding: "12px" }}>Labour Welfare Fund</td><td style={{ padding: "12px", textAlign: "right" }}>₹ 0</td></tr>
                                <tr style={{ borderBottom: "1px solid #F3F4F6" }}><td style={{ padding: "12px", color: "#FFFFFF" }}>.</td><td style={{ padding: "12px", textAlign: "right" }}></td></tr>
                            </tbody>
                            <tfoot>
                                <tr style={{ borderTop: "2px solid #E5E7EB", fontWeight: 700 }}>
                                    <td style={{ padding: "12px" }}>Total Deductions (B)</td>
                                    <td style={{ padding: "12px", textAlign: "right" }}>₹ 10,600</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Net Pay */}
                <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#166534", marginBottom: 4 }}>Net Pay (A - B)</div>
                        <div style={{ fontSize: 12, color: "#166534", textTransform: "capitalize" }}>Eighty-five thousand five hundred rupees only</div>
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "#166534" }}>₹ 85,500</div>
                </div>

                {/* Footer Notes */}
                <div style={{ fontSize: 10, color: "#9CA3AF", textAlign: "center", marginTop: 48, borderTop: "1px solid #E5E7EB", paddingTop: 16 }}>
                    This is a computer generated document and does not require a signature.<br />
                    For any payroll discrepancies, please raise a ticket via HRFlow Helpdesk within 7 days.
                </div>
            </div>
        </div>
    );
}
