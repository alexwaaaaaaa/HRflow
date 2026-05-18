"use client";

import Page from "@/components/ui/Page";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

export default function SalarySetupStep() {
  return (
    <Page
      title="Add New Employee"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Add", href: "/employees/add" },
        { label: "Salary" },
      ]}
      maxWidth="1200px"
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}
        className="animate-fade-in"
      >
        {/* Header & Step Progress */}
        <div style={{ marginBottom: 32 }}>
          <Link
            href="/employees"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#8899AA",
              textDecoration: "none",
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            <ArrowLeft size={16} /> Back to Employees
          </Link>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px 0" }}>
                Add New Employee
              </h1>
              <div style={{ fontSize: 14, color: "#8899AA" }}>
                Complete the following steps to onboard a new team member.
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 32 }}>
            {[
              { num: 1, label: "Personal", status: "completed" },
              { num: 2, label: "Job & Employment", status: "completed" },
              { num: 3, label: "Salary", status: "active" },
              { num: 4, label: "Statutory", status: "pending" },
              { num: 5, label: "Bank Account", status: "pending" },
              { num: 6, label: "Documents", status: "pending" },
            ].map((step, i, arr) => (
              <div
                key={step.num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: i === arr.length - 1 ? 0 : 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 600,
                      background:
                        step.status === "completed"
                          ? "#00E5A0"
                          : step.status === "active"
                            ? "#0066FF"
                            : "#1A2A3A",
                      color:
                        step.status === "completed"
                          ? "#060B14"
                          : step.status === "active"
                            ? "#FFFFFF"
                            : "#8899AA",
                    }}
                  >
                    {step.status === "completed" ? <Check size={16} /> : step.num}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 40,
                      whiteSpace: "nowrap",
                      fontSize: 12,
                      fontWeight: step.status === "active" ? 600 : 400,
                      color: step.status === "pending" ? "#445566" : "#FFFFFF",
                    }}
                  >
                    {step.label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      background: step.status === "completed" ? "#00E5A0" : "#1A2A3A",
                      margin: "0 12px",
                      marginTop: -24,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 32, marginTop: 64 }}>
          <div
            style={{
              background: "#0D1928",
              border: "1px solid #1A2A3A",
              borderRadius: 16,
              padding: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>
                Salary Structure
              </h2>
              <span
                style={{
                  fontSize: 12,
                  background: "rgba(0,102,255,0.1)",
                  color: "#0066FF",
                  padding: "4px 10px",
                  borderRadius: 12,
                }}
              >
                L3 - Standard IT
              </span>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontSize: 14, color: "#8899AA", marginBottom: 8 }}>
                Annual CTC (Cost to Company) *
              </label>
              <div style={{ position: "relative" }}>
                <label
                  htmlFor="page-64"
                  style={{
                    position: "absolute",
                    left: 16,
                    top: 12,
                    fontSize: 24,
                    color: "#00E5A0",
                    fontWeight: 600,
                  }}
                >
                  ₹
                </label>
                <input
                  type="text"
                  defaultValue="18,00,000"
                  style={{
                    width: "100%",
                    height: 56,
                    background: "#0A1420",
                    border: "1px solid #00E5A0",
                    borderRadius: 8,
                    padding: "0 16px 0 40px",
                    color: "#FFFFFF",
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                  id="page-64"
                />
              </div>
              <div style={{ fontSize: 14, color: "#00E5A0", marginTop: 8 }}>
                Monthly gross: ₹1,19,167
              </div>
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 16px 0" }}>
              Salary Breakup
            </h3>
            <div style={{ border: "1px solid #1A2A3A", borderRadius: 12, overflow: "hidden" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 100px 80px",
                  padding: "10px 16px",
                  background: "#0A1420",
                  borderBottom: "1px solid #1A2A3A",
                }}
              >
                {["Component", "Monthly (₹)", "Annual (₹)", "% CTC"].map((h) => (
                  <div
                    key={h}
                    style={{
                      fontSize: 10,
                      color: "#445566",
                      fontWeight: 500,
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>
              {[
                { name: "Basic Salary", m: "51,000", a: "6,12,000", p: "34%" },
                { name: "HRA", m: "25,500", a: "3,06,000", p: "17%" },
                { name: "Special Allowance", m: "35,667", a: "4,28,004", p: "24%" },
                { name: "Conveyance", m: "1,600", a: "19,200", p: "1%" },
                { name: "Gross Salary Total", m: "1,20,017", a: "14,40,204", p: "80%", bold: true },
              ].map((c, _i) => (
                <div
                  key={c.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 100px 100px 80px",
                    gap: 12,
                    padding: "12px 16px",
                    borderBottom: "1px solid #0A1420",
                    background: c.bold ? "rgba(0,229,160,0.05)" : "transparent",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#FFFFFF", fontWeight: c.bold ? 600 : 400 }}>
                    {c.name}
                  </span>
                  <span style={{ fontSize: 13, color: "#FFFFFF", fontWeight: c.bold ? 600 : 400 }}>
                    {c.m}
                  </span>
                  <span style={{ fontSize: 13, color: "#8899AA" }}>{c.a}</span>
                  <span style={{ fontSize: 13, color: "#445566" }}>{c.p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Compliance */}
          <div>
            <div
              style={{
                background: "#0D1928",
                border: "1px solid #1A2A3A",
                borderRadius: 16,
                padding: 24,
                marginBottom: 24,
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 16px 0" }}>
                Compliance Check
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
                  <span>✅</span>{" "}
                  <span style={{ color: "#FFFFFF" }}>Minimum wage (Karnataka) met</span>
                </div>
                <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
                  <span>✅</span>{" "}
                  <span style={{ color: "#FFFFFF" }}>PF Basic ≥ ₹15,000 threshold met</span>
                </div>
                <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
                  <span>✅</span>{" "}
                  <span style={{ color: "#FFFFFF" }}>ESI Not Applicable (Gross &gt; ₹21K)</span>
                </div>
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
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 16px 0" }}>
                Take-home Estimate
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "#8899AA",
                  marginBottom: 8,
                }}
              >
                <span>Monthly Gross</span> <span>₹1,20,017</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "#FF4444",
                  marginBottom: 8,
                }}
              >
                <span>Employee PF</span> <span>-₹1,800</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "#FF4444",
                  marginBottom: 16,
                  paddingBottom: 16,
                  borderBottom: "1px solid #1A2A3A",
                }}
              >
                <span>Est. TDS (Old Tax Regime)</span> <span>-₹8,500</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 15,
                  color: "#00E5A0",
                  fontWeight: 700,
                }}
              >
                <span>Net Take-home</span> <span>≈ ₹1,09,717</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid #1A2A3A",
          }}
        >
          <Link href="/employees/add/job">
            
            <button
              style={{
                height: 44,
                padding: "0 24px",
                background: "transparent",
                border: "1px solid #1A2A3A",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: "#FFFFFF",
                cursor: "pointer",
              }}
              className="hover:bg-[#1A2A3A]"
            >
              ← Back
            </button>
          </Link>
          <div style={{ display: "flex", gap: 16 }}>
            
            <button
              style={{
                height: 44,
                padding: "0 24px",
                background: "transparent",
                border: "none",
                fontSize: 14,
                fontWeight: 500,
                color: "#8899AA",
                cursor: "pointer",
              }}
              className="hover:text-white"
            >
              Save Draft
            </button>
            <Link href="/employees/add/statutory">
              
              <button
                style={{
                  height: 44,
                  padding: "0 32px",
                  background: "#00E5A0",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#060B14",
                  cursor: "pointer",
                }}
              >
                Next: Statutory Info →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}
