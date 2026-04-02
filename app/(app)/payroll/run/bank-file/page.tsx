"use client";

import Link from "next/link";
import { ArrowLeft, Download, Eye, FileText, Info } from "lucide-react";

export default function BankFileDownload() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 32px 80px" }}>
            <div style={{ marginBottom: 32 }}>
                <Link href="/payroll/run/disburse" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 24 }}>
                    <ArrowLeft size={16} /> Back to Disbursement Methods
                </Link>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{ width: 64, height: 64, background: "rgba(0,229,160,0.1)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <FileText size={32} color="#00E5A0" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Bank Transfer File Generated</h1>
                        <div style={{ fontSize: 14, color: "#8899AA", lineHeight: 1.5 }}>
                            The ICICI Corporate Salary transfer file for November 2024 has been successfully generated. Please download and upload it to the ICICI Corporate portal to process the payouts.
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                    <div>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>File Format</div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>ICICI 80-Column TXT Format</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Payment Processing Date</div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>28 Nov, 2024</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Total Amount</div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: "#00E5A0" }}>₹3,82,05,000</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Transactions</div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>844 Employees</div>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 16 }}>
                    <button style={{ flex: 1, height: 48, background: "#00E5A0", border: "none", borderRadius: 8, color: "#060B14", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <Download size={18} /> Download ICICI_NOV24_SBT.txt
                    </button>
                    <button style={{ height: 48, padding: "0 24px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        <Eye size={18} /> Preview File
                    </button>
                </div>
            </div>

            <div style={{ background: "rgba(0,102,255,0.05)", border: "1px solid rgba(0,102,255,0.2)", borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <Info size={20} color="#0066FF" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 8 }}>Upload Instructions</div>
                        <ol style={{ margin: 0, paddingLeft: 20, color: "#8899AA", fontSize: 14, lineHeight: 1.6 }}>
                            <li>Login to your ICICI Corporate Internet Banking portal.</li>
                            <li>Navigate to <b>Transfers</b> &gt; <b>Bulk Upload</b> &gt; <b>Salary Transfer</b>.</li>
                            <li>Select the source account (•••• 4521).</li>
                            <li>Upload the downloaded `.txt` file and submit.</li>
                            <li>Approve the transaction using the Maker-Checker workflow on the portal.</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 40, textAlign: "center" }}>
                <Link href="/payroll/run/disburse">
                    <button style={{ height: 44, padding: "0 32px", background: "transparent", border: "none", color: "#8899AA", fontSize: 14, cursor: "pointer", textDecoration: "underline" }}>
                        I've uploaded the file. Take me back to step 8.
                    </button>
                </Link>
            </div>
        </div>
    );
}
