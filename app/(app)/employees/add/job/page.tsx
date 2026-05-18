"use client";

import Page from "@/components/ui/Page";

import Link from "next/link";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";

export default function JobDetailsStep() {
  return (
    <Page
      title="Add New Employee"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Add", href: "/employees/add" },
        { label: "Job" },
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
              { num: 2, label: "Job & Employment", status: "active" },
              { num: 3, label: "Salary", status: "pending" },
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
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: "0 0 24px 0" }}>
              Job & Employment Details
            </h2>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}
            >
              <div>
                <label
                  htmlFor="page-60"
                  style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                >
                  Designation *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Software Engineer"
                  defaultValue="Senior Software Engineer"
                  style={{
                    width: "100%",
                    height: 40,
                    background: "#0A1420",
                    border: "1px solid #1A2A3A",
                    borderRadius: 8,
                    padding: "0 12px",
                    color: "#FFFFFF",
                    fontSize: 14,
                  }}
                  id="page-60"
                />
              </div>
              <div>
                <label
                  htmlFor="page-64"
                  style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                >
                  Grade / Band
                </label>
                <input
                  type="text"
                  defaultValue="L3"
                  style={{
                    width: "100%",
                    height: 40,
                    background: "#0A1420",
                    border: "1px solid #1A2A3A",
                    borderRadius: 8,
                    padding: "0 12px",
                    color: "#FFFFFF",
                    fontSize: 14,
                  }}
                  id="page-64"
                />
                <div style={{ fontSize: 11, color: "#00E5A0", marginTop: 4 }}>
                  L3: ₹8L – ₹14L CTC band
                </div>
              </div>
            </div>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}
            >
              <div>
                <label
                  style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                >
                  Department *
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
                    id="page-73"
                    aria-label="page-73"
                  >
                    <option>Engineering</option>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>HR</option>
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
                  Work Location *
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
                    id="page-86"
                    aria-label="page-86"
                  >
                    <option>Bengaluru (HQ)</option>
                    <option>Mumbai</option>
                    <option>Delhi NCR</option>
                    <option>Remote</option>
                  </select>
                  <ChevronDown
                    size={16}
                    color="#8899AA"
                    style={{ position: "absolute", right: 12, top: 12, pointerEvents: "none" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label
                htmlFor="page-100"
                style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
              >
                Reporting Manager *
              </label>
              <input
                type="text"
                placeholder="Search by name or designation"
                defaultValue="Karan Mehta"
                style={{
                  width: "100%",
                  height: 40,
                  background: "#0A1420",
                  border: "1px solid #1A2A3A",
                  borderRadius: 8,
                  padding: "0 12px",
                  color: "#FFFFFF",
                  fontSize: 14,
                }}
                id="page-100"
              />
            </div>

            <div
              style={{ height: 1, background: "#1A2A3A", margin: "32px 0", position: "relative" }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -8,
                  left: 24,
                  background: "#0D1928",
                  padding: "0 12px",
                  fontSize: 12,
                  color: "#8899AA",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Employment Terms
              </span>
            </div>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}
            >
              <div>
                <label
                  style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                >
                  Employment Type *
                </label>
                <div
                  style={{
                    display: "flex",
                    background: "#0A1420",
                    borderRadius: 8,
                    padding: 4,
                    border: "1px solid #1A2A3A",
                  }}
                >
                  {["Full-Time", "Contract", "Intern"].map((t) => (
                    
                    <button
                      key={t}
                      style={{
                        flex: 1,
                        padding: "6px 0",
                        fontSize: 13,
                        borderRadius: 6,
                        border: "none",
                        background: t === "Full-Time" ? "#1A2A3A" : "transparent",
                        color: t === "Full-Time" ? "#FFFFFF" : "#8899AA",
                        cursor: "pointer",
                        fontWeight: t === "Full-Time" ? 500 : 400,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                >
                  Work Arrangement
                </label>
                <div
                  style={{
                    display: "flex",
                    background: "#0A1420",
                    borderRadius: 8,
                    padding: 4,
                    border: "1px solid #1A2A3A",
                  }}
                >
                  {["Office", "Hybrid", "Remote"].map((t) => (
                    
                    <button
                      key={t}
                      style={{
                        flex: 1,
                        padding: "6px 0",
                        fontSize: 13,
                        borderRadius: 6,
                        border: "none",
                        background: t === "Hybrid" ? "#1A2A3A" : "transparent",
                        color: t === "Hybrid" ? "#FFFFFF" : "#8899AA",
                        cursor: "pointer",
                        fontWeight: t === "Hybrid" ? 500 : 400,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}
            >
              <div>
                <label
                  htmlFor="page-131"
                  style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                >
                  Date of Joining *
                </label>
                <input
                  type="date"
                  defaultValue="2024-12-01"
                  style={{
                    width: "100%",
                    height: 40,
                    background: "#0A1420",
                    border: "1px solid #1A2A3A",
                    borderRadius: 8,
                    padding: "0 12px",
                    color: "#FFFFFF",
                    fontSize: 14,
                    colorScheme: "dark",
                  }}
                  id="page-131"
                />
              </div>
              <div>
                <label
                  style={{ display: "block", fontSize: 13, color: "#8899AA", marginBottom: 8 }}
                >
                  Notice Period *
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
                    id="page-136"
                    aria-label="page-136"
                  >
                    <option>30 Days</option>
                    <option selected>60 Days</option>
                    <option>90 Days</option>
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

          {/* Right Panel - Org Chart Preview */}
          <div>
            <div
              style={{
                background: "#0D1928",
                border: "1px solid #1A2A3A",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 20px 0" }}>
                Org Position Preview
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Manager */}
                <div
                  style={{
                    padding: 16,
                    background: "#0A1420",
                    borderRadius: 12,
                    border: "1px solid #1A2A3A",
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#1A2A3A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: "#8899AA",
                      fontWeight: 600,
                    }}
                  >
                    KM
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>
                      Karan Mehta
                    </div>
                    <div style={{ fontSize: 12, color: "#8899AA" }}>Engineering Manager</div>
                  </div>
                </div>

                <div
                  style={{ width: 2, height: 24, background: "#1A2A3A", margin: "-16px 0 0 32px" }}
                ></div>

                {/* New Employee */}
                <div
                  style={{
                    padding: 16,
                    background: "rgba(0,102,255,0.05)",
                    borderRadius: 12,
                    border: "1px solid #0066FF",
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#0066FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                  >
                    NJ
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>
                      New Joiner
                    </div>
                    <div style={{ fontSize: 12, color: "#0066FF" }}>Senior Software Engineer</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#8899AA", marginTop: 24 }}>
                Engineering Headcount: 342 → <span style={{ color: "#00E5A0" }}>343</span>
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
          <Link href="/employees/add">
            
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
            <Link href="/employees/add/salary">
              
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
                Next: Salary Setup →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}
