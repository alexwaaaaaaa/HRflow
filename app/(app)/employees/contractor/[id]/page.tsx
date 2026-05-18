"use client";

import Page from "@/components/ui/Page";

import { use, useState } from "react";
import { RefreshCw, ArrowUpRight } from "lucide-react";

export default function ContractorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <Page
      title="Karan Johar"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Contractor", href: "/employees/contractor" },
        { label: "Id" },
      ]}
      maxWidth="1200px"
    >
      <div style={{ paddingBottom: 60 }} className="animate-fade-in">
        {/* Header */}
        <div
          style={{
            margin: "32px 32px 24px",
            background: "#0D1928",
            border: "1px solid #1A2A3A",
            borderRadius: 20,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(255,184,0,0.1)",
              color: "#FFB800",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              border: "3px solid #FFB800",
            }}
          >
            KJ
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                Karan Johar
              </h1>
              <span
                style={{
                  background: "rgba(255,184,0,0.1)",
                  color: "#FFB800",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 20,
                }}
              >
                CONTRACTOR
              </span>
            </div>
            <div style={{ fontSize: 15, color: "#8899AA", marginBottom: 12 }}>
              Senior UI/UX Consultant · Product
            </div>
            <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#8899AA" }}>
              <span>📍 Bengaluru (Remote)</span>
              <span>🗓 Contract: 01/06/2024 – 31/05/2025</span>
              <span>🏢 Agency: DesignCraft LLP</span>
              <span>👤 {id}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
            
            <button
              style={{
                height: 40,
                padding: "0 16px",
                background: "#FFB800",
                border: "none",
                borderRadius: 8,
                color: "#060B14",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <RefreshCw size={14} /> Extend Contract
            </button>
            
            <button
              style={{
                height: 40,
                padding: "0 16px",
                background: "transparent",
                border: "1px solid #1A2A3A",
                borderRadius: 8,
                color: "#FFFFFF",
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ArrowUpRight size={14} /> Convert to Full-time
            </button>
          </div>
        </div>

        {/* Countdown Warning */}
        <div
          style={{
            margin: "0 32px 24px",
            background: "rgba(255,184,0,0.05)",
            border: "1px solid rgba(255,184,0,0.2)",
            borderRadius: 12,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 20 }}>⏰</span>
          <span style={{ fontSize: 14, color: "#FFB800", fontWeight: 600 }}>
            Contract expires in <strong>177 days</strong> (31/05/2025). Consider extending or
            converting.
          </span>
        </div>

        {/* Tabs */}
        <div
          style={{
            margin: "0 32px 24px",
            display: "flex",
            gap: 4,
            borderBottom: "1px solid #1A2A3A",
          }}
        >
          {["Overview", "Invoices", "Documents"].map((t) => (
            
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                padding: "12px 20px",
                background: "none",
                border: "none",
                borderBottom: activeTab === t ? "2px solid #FFB800" : "2px solid transparent",
                color: activeTab === t ? "#FFFFFF" : "#8899AA",
                fontSize: 14,
                fontWeight: activeTab === t ? 600 : 400,
                cursor: "pointer",
                marginBottom: -1,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ padding: "0 32px" }}>
          {activeTab === "Overview" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div
                  style={{
                    background: "#0D1928",
                    border: "1px solid #1A2A3A",
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>
                    Contract Details
                  </h3>
                  {[
                    ["Contract Start Date", "01/06/2024"],
                    ["Contract End Date", "31/05/2025"],
                    ["Rate (Daily)", "₹8,500/day"],
                    ["Rate Type", "Daily"],
                    ["Billing Cycle", "Monthly"],
                    ["Vendor / Agency", "DesignCraft LLP"],
                    ["TDS Section", "194J (Professional Services)"],
                    ["TDS Rate", "10%"],
                    ["Renewal Reminder", "30 days before expiry"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom: "1px solid #0A1420",
                      }}
                    >
                      <span style={{ fontSize: 13, color: "#8899AA" }}>{k}</span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "#FFFFFF",
                          fontWeight: k === "Rate (Daily)" ? 600 : 400,
                        }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  background: "#0D1928",
                  border: "1px solid #1A2A3A",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginBottom: 16 }}>
                  YTD Payments
                </h3>
                {[
                  ["Total Invoiced", "₹5,10,000"],
                  ["Total TDS Deducted", "₹51,000"],
                  ["Total Net Paid", "₹4,59,000"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: "1px solid #1A2A3A",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#8899AA" }}>{k}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>{v}</span>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: "#445566", marginTop: 16 }}>
                  Note: No PF/ESI applicable for contractors.
                </div>
              </div>
            </div>
          )}

          {activeTab === "Invoices" && (
            <div
              style={{
                background: "#0D1928",
                border: "1px solid #1A2A3A",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 100px 80px 100px 80px",
                  padding: "12px 20px",
                  background: "#0A1420",
                  borderBottom: "1px solid #1A2A3A",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#8899AA",
                  textTransform: "uppercase",
                }}
              >
                <div>Invoice</div>
                <div>Month</div>
                <div>Amount</div>
                <div>TDS</div>
                <div>Net</div>
                <div>Status</div>
              </div>
              {[
                {
                  inv: "INV-2024-011",
                  m: "Nov 2024",
                  amt: "₹85,000",
                  tds: "₹8,500",
                  net: "₹76,500",
                  s: "Paid",
                },
                {
                  inv: "INV-2024-010",
                  m: "Oct 2024",
                  amt: "₹85,000",
                  tds: "₹8,500",
                  net: "₹76,500",
                  s: "Paid",
                },
                {
                  inv: "INV-2024-012",
                  m: "Dec 2024",
                  amt: "₹85,000",
                  tds: "₹8,500",
                  net: "₹76,500",
                  s: "Pending",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 100px 100px 80px 100px 80px",
                    padding: "14px 20px",
                    borderBottom: "1px solid #1A2A3A",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 13, fontFamily: "monospace", color: "#0066FF" }}>
                    {r.inv}
                  </div>
                  <div style={{ fontSize: 13, color: "#FFFFFF" }}>{r.m}</div>
                  <div style={{ fontSize: 13, color: "#FFFFFF" }}>{r.amt}</div>
                  <div style={{ fontSize: 13, color: "#FF4444" }}>-{r.tds}</div>
                  <div style={{ fontSize: 13, color: "#00E5A0", fontWeight: 600 }}>{r.net}</div>
                  <span
                    style={{
                      fontSize: 11,
                      background: r.s === "Paid" ? "rgba(0,229,160,0.1)" : "rgba(255,184,0,0.1)",
                      color: r.s === "Paid" ? "#00E5A0" : "#FFB800",
                      padding: "4px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {r.s}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
