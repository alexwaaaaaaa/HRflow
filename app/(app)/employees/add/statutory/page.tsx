"use client";

import Page from "@/components/ui/Page";

import Link from "next/link";
import { ArrowLeft, Check, ChevronDown, CheckCircle2 } from "lucide-react";

export default function StatutorySetupStep() {
  return (
    <Page
      title="Add New Employee"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Add", href: "/employees/add" },
        { label: "Statutory" },
      ]}
      maxWidth="1200px"
    >
      <div
        style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}
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
              { num: 2, label: "Job", status: "completed" },
              { num: 3, label: "Salary", status: "completed" },
              { num: 4, label: "Statutory", status: "active" },
              { num: 5, label: "Bank", status: "pending" },
              { num: 6, label: "Docs", status: "pending" },
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
        <div style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* PF Card */}
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
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>
                Provident Fund (PF)
              </h3>
              <span
                style={{
                  fontSize: 12,
                  background: "rgba(0,229,160,0.1)",
                  color: "#00E5A0",
                  padding: "4px 10px",
                  borderRadius: 12,
                }}
              >
                PF Applicable
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label
                  style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                >
                  Universal Account Number (UAN) *
                </label>
                <div style={{ display: "flex", gap: 12 }}>
                  <input
                    type="text"
                    placeholder="12-digit UAN"
                    defaultValue="100987654321"
                    style={{
                      flex: 1,
                      height: 40,
                      background: "#0A1420",
                      border: "1px solid #1A2A3A",
                      borderRadius: 8,
                      padding: "0 12px",
                      color: "#FFFFFF",
                      fontSize: 14,
                    }}
                    id="page-65"
                    aria-label="12-digit UAN"
                  />
                  
                  <button
                    style={{
                      height: 40,
                      padding: "0 16px",
                      background: "#1A2A3A",
                      border: "1px solid #1A2A3A",
                      borderRadius: 8,
                      fontSize: 13,
                      color: "#FFFFFF",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <CheckCircle2 size={14} color="#00E5A0" /> Verified
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                  <input type="checkbox" id="new_uan" style={{ accentColor: "#00E5A0" }} />
                  <label htmlFor="new_uan" style={{ fontSize: 13, color: "#8899AA" }}>
                    New employee (UAN to be generated by EPFO)
                  </label>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <label
                    style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                  >
                    Employer Contribution
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      style={{
                        width: "100%",
                        height: 40,
                        background: "#0A1420",
                        border: "1px solid #1A2A3A",
                        borderRadius: 8,
                        padding: "0 12px",
                        color: "#FFFFFF",
                        fontSize: 14,
                        appearance: "none",
                      }}
                      id="page-82"
                      aria-label="page-82"
                    >
                      <option>12% of Basic</option>
                      <option>Restricted to ₹15K</option>
                    </select>
                    <ChevronDown
                      size={16}
                      color="#8899AA"
                      style={{ position: "absolute", right: 12, top: 12, pointerEvents: "none" }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                  >
                    Employee Contribution
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      style={{
                        width: "100%",
                        height: 40,
                        background: "#0A1420",
                        border: "1px solid #1A2A3A",
                        borderRadius: 8,
                        padding: "0 12px",
                        color: "#FFFFFF",
                        fontSize: 14,
                        appearance: "none",
                      }}
                      id="page-93"
                      aria-label="page-93"
                    >
                      <option>12% of Basic</option>
                      <option>Restricted to ₹15K</option>
                    </select>
                    <ChevronDown
                      size={16}
                      color="#8899AA"
                      style={{ position: "absolute", right: 12, top: 12, pointerEvents: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ESI Card */}
          <div
            style={{
              background: "#0D1928",
              border: "1px solid #1A2A3A",
              borderRadius: 16,
              padding: 32,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>
                Employees&apos; State Insurance (ESI)
              </h3>
              <span
                style={{
                  fontSize: 12,
                  background: "rgba(255,255,255,0.05)",
                  color: "#8899AA",
                  padding: "4px 10px",
                  borderRadius: 12,
                }}
              >
                Not Applicable (Gross &gt; ₹21K)
              </span>
            </div>
          </div>

          {/* PT & Tax Card */}
          <div
            style={{
              background: "#0D1928",
              border: "1px solid #1A2A3A",
              borderRadius: 16,
              padding: 32,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: "0 0 24px 0" }}>
              Taxes & Professional Tax
            </h3>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}
            >
              <div>
                <label
                  style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                >
                  PT State
                </label>
                <div
                  style={{
                    padding: "10px 12px",
                    background: "#0A1420",
                    border: "1px solid #1A2A3A",
                    borderRadius: 8,
                    color: "#FFFFFF",
                    fontSize: 14,
                  }}
                >
                  Karnataka (₹200/month)
                </div>
                <div style={{ fontSize: 11, color: "#8899AA", marginTop: 6 }}>
                  Auto-set from Work Location (Bengaluru)
                </div>
              </div>
              <div>
                <label
                  style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                >
                  Tax Regime Preference
                </label>
                <div style={{ display: "flex", gap: 16 }}>
                  <label
                    style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
                  >
                    <input type="radio" name="tax" style={{ accentColor: "#00E5A0" }} />
                    <span style={{ fontSize: 14, color: "#FFFFFF" }}>Old Regime</span>
                  </label>
                  <label
                    style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
                  >
                    <input
                      type="radio"
                      name="tax"
                      defaultChecked
                      style={{ accentColor: "#00E5A0" }}
                    />
                    <span style={{ fontSize: 14, color: "#FFFFFF" }}>New Regime</span>
                  </label>
                </div>
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
          <Link href="/employees/add/salary">
            
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
            <Link href="/employees/add/bank">
              
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
                Next: Bank Details →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}
