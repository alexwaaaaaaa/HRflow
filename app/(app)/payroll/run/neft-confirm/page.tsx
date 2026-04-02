"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw, ShieldCheck, Building2 } from "lucide-react";

export default function NeftConfirm() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 32px 80px" }}>
            <div style={{ marginBottom: 32 }}>
                <Link href="/payroll/run/disburse" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#8899AA", textDecoration: "none", fontSize: 14, marginBottom: 24 }}>
                    <ArrowLeft size={16} /> Back to Disbursement Methods
                </Link>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{ width: 64, height: 64, background: "rgba(0,102,255,0.1)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <RefreshCw size={32} color="#0066FF" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>Push to ICICI Portal</h1>
                        <div style={{ fontSize: 14, color: "#8899AA", lineHeight: 1.5 }}>
                            You are about to initiate a direct API transfer to ICICI Bank. This will create a pending transaction in your Corporate Internet Banking portal.
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid #1A2A3A" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1A2A3A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Building2 size={24} color="#8899AA" />
                        </div>
                        <div>
                            <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Debit Account</div>
                            <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>ICICI Current •••• 4521</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <div style={{ fontSize: 13, color: "#8899AA", marginBottom: 4 }}>Total Amount to Disburse</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>₹3,82,05,000</div>
                        <div style={{ fontSize: 12, color: "#445566", marginTop: 4 }}>844 Transactions</div>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 32 }}>
                    <ShieldCheck size={20} color="#00E5A0" style={{ flexShrink: 0 }} />
                    <div style={{ fontSize: 14, color: "#FFFFFF", lineHeight: 1.6 }}>
                        By clicking "Initiate Transfer", HRFlow will securely transmit the payout instructions to the bank via API.
                        No funds will be deducted until your authorized signatory approves the transaction on the ICICI portal.
                    </div>
                </div>

                <div style={{ display: "flex", gap: 16 }}>
                    <button style={{ flex: 1, height: 48, background: "#0066FF", border: "none", borderRadius: 8, color: "#FFFFFF", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }} className="hover:bg-blue-600">
                        Initiate Transfer to Bank
                    </button>
                    <Link href="/payroll/run/disburse">
                        <button style={{ height: 48, padding: "0 32px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{ textAlign: "center", fontSize: 13, color: "#8899AA" }}>
                API transfers are processed within seconds. Please ensure you have sufficient balance before approving on the portal.
            </div>
        </div>
    );
}
