"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, RefreshCw, ShieldCheck, ExternalLink, Info } from "lucide-react";

export default function Form26AS() {
    return (
        <div style={{ padding: "24px 32px", maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/tax" style={{ color: "#8899AA", display: "flex", alignItems: "center" }}>
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Form 26AS Synopsis</h1>
                        <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>Rahul Sharma (EMP-0848) • FY 2024-25</div>
                    </div>
                </div>
                <button style={{ height: 40, padding: "0 16px", background: "transparent", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} className="hover:bg-[#1A2A3A]">
                    <RefreshCw size={14} /> Sync from TRACES
                </button>
            </div>

            <div style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 12, padding: "16px 24px", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <ShieldCheck size={24} color="#00E5A0" />
                    <div>
                        <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 600, marginBottom: 4 }}>TDS Matches Deposited Amount</div>
                        <div style={{ fontSize: 13, color: "#00E5A0" }}>100% of the TDS deducted by Kaarya has been successfully reflected in your Form 26AS.</div>
                    </div>
                </div>
            </div>

            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ padding: "16px 24px", background: "#0A1420", borderBottom: "1px solid #1A2A3A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Part A: Details of Tax Deducted at Source</h3>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #1A2A3A", color: "#8899AA", fontSize: 12, textAlign: "left" }}>
                            <th style={{ padding: "16px 24px", fontWeight: 500 }}>Name of Deductor</th>
                            <th style={{ padding: "16px", fontWeight: 500 }}>TAN of Deductor</th>
                            <th style={{ padding: "16px", fontWeight: 500, textAlign: "right" }}>Total Amount Paid</th>
                            <th style={{ padding: "16px", fontWeight: 500, textAlign: "right" }}>Total Tax Deducted</th>
                            <th style={{ padding: "16px 24px", fontWeight: 500, textAlign: "right" }}>Total Tax Deposited</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: "1px solid #1A2A3A" }}>
                            <td style={{ padding: "16px 24px", fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>Kaarya Technologies Pvt Ltd</td>
                            <td style={{ padding: "16px", fontSize: 13, color: "#8899AA" }}>MUMK12345E</td>
                            <td style={{ padding: "16px", fontSize: 14, color: "#FFFFFF", textAlign: "right" }}>₹7,00,000</td>
                            <td style={{ padding: "16px", fontSize: 14, color: "#FFB800", textAlign: "right" }}>₹52,468</td>
                            <td style={{ padding: "16px 24px", fontSize: 14, color: "#00E5A0", textAlign: "right", fontWeight: 600 }}>₹52,468</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #1A2A3A" }}>
                            <td style={{ padding: "16px 24px", fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>State Bank of India (FD Interest)</td>
                            <td style={{ padding: "16px", fontSize: 13, color: "#8899AA" }}>MUMS98765A</td>
                            <td style={{ padding: "16px", fontSize: 14, color: "#FFFFFF", textAlign: "right" }}>₹45,000</td>
                            <td style={{ padding: "16px", fontSize: 14, color: "#FFB800", textAlign: "right" }}>₹4,500</td>
                            <td style={{ padding: "16px 24px", fontSize: 14, color: "#00E5A0", textAlign: "right", fontWeight: 600 }}>₹4,500</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: 24, fontSize: 13, color: "#8899AA", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Info size={16} color="#8899AA" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>This is a synthesized synopsis for your convenience. For official tax filing purposes, please download the actual Form 26AS/AIS from the Income Tax e-Filing portal. <a href="https://eportal.incometax.gov.in/" target="_blank" rel="noreferrer" style={{ color: "#0066FF", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>Visit IT Portal <ExternalLink size={12} /></a></span>
            </div>

        </div>
    );
}
