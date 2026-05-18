"use client";

import Page from "@/components/ui/Page";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ImportPreviewPage() {
  const router = useRouter();
  const rows = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@domain.com",
      role: "Software Eng",
      dept: "Engineering",
      ctc: "₹18,00,000",
      doj: "2024-12-01",
      status: "Valid",
      issues: [],
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.p@domain.com",
      role: "Product Manager",
      dept: "Product",
      ctc: "₹24,00,000",
      doj: "2024-11-15",
      status: "Valid",
      issues: [],
    },
    {
      id: 3,
      name: "Anil Kumar",
      email: "anil.k@domain",
      role: "QA Engineer",
      dept: "Engineering",
      ctc: "₹12,00,000",
      doj: "2024-12-05",
      status: "Error",
      issues: ["Invalid email format"],
    },
    {
      id: 4,
      name: "Neha Gupta",
      email: "neha.gupta@domain.com",
      role: "UX Designer",
      dept: "Design",
      ctc: "800000",
      doj: "25/11/2024",
      status: "Warning",
      issues: ["DOB missing", "CTC format fixed"],
    },
    {
      id: 5,
      name: "Dev Singh",
      email: "dev.singh@domain.com",
      role: "Marketing Lead",
      dept: "Marketing",
      ctc: "₹15,00,000",
      doj: "2024-12-10",
      status: "Valid",
      issues: [],
    },
  ];

  const handleImport = () => {
    router.push("/employees/import/success");
  };

  return (
    <Page
      title="Preview Data"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Import", href: "/employees/import" },
        { label: "Preview" },
      ]}
      maxWidth="1200px"
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}
        className="animate-fade-in"
      >
        <Link
          href="/employees/import/mapping"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#8899AA",
            textDecoration: "none",
            fontSize: 14,
            marginBottom: 24,
          }}
        >
          <ArrowLeft size={16} /> Back to Mapping
        </Link>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 32,
          }}
        >
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px 0" }}>
              Preview Data
            </h1>
            <div style={{ fontSize: 14, color: "#8899AA" }}>
              Review the data before importing into HRFlow.
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            
            <button
              onClick={handleImport}
              style={{
                height: 40,
                padding: "0 24px",
                background: "#00E5A0",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                color: "#060B14",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Import 123 Valid Rows <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Validation Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "#0D1928",
              border: "1px solid #1A2A3A",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 8 }}>Total Rows</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>124</div>
          </div>
          <div
            style={{
              background: "rgba(0,229,160,0.05)",
              border: "1px solid rgba(0,229,160,0.2)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#00E5A0",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <CheckCircle2 size={14} /> Ready to Import
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>123</div>
          </div>
          <div
            style={{
              background: "rgba(255,184,0,0.05)",
              border: "1px solid rgba(255,184,0,0.2)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#FFB800",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <AlertTriangle size={14} /> Warnings (Auto-fixed)
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#FFB800" }}>5</div>
          </div>
          <div
            style={{
              background: "rgba(255,68,68,0.05)",
              border: "1px solid rgba(255,68,68,0.2)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#FF4444",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <XCircle size={14} /> Errors (Will be skipped)
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#FF4444" }}>1</div>
          </div>
        </div>

        {/* Preview Table */}
        <div
          style={{
            background: "#0D1928",
            border: "1px solid #1A2A3A",
            borderRadius: 16,
            overflow: "hidden",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              padding: "16px 24px",
              borderBottom: "1px solid #1A2A3A",
              borderRight: "1px solid transparent",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 200,
                fontSize: 12,
                fontWeight: 600,
                color: "#8899AA",
                textTransform: "uppercase",
              }}
            >
              Employee Name & Email
            </div>
            <div
              style={{
                width: 140,
                fontSize: 12,
                fontWeight: 600,
                color: "#8899AA",
                textTransform: "uppercase",
              }}
            >
              Designation
            </div>
            <div
              style={{
                width: 120,
                fontSize: 12,
                fontWeight: 600,
                color: "#8899AA",
                textTransform: "uppercase",
              }}
            >
              Department
            </div>
            <div
              style={{
                width: 120,
                fontSize: 12,
                fontWeight: 600,
                color: "#8899AA",
                textTransform: "uppercase",
              }}
            >
              CTC
            </div>
            <div
              style={{
                width: 120,
                fontSize: 12,
                fontWeight: 600,
                color: "#8899AA",
                textTransform: "uppercase",
              }}
            >
              DOJ
            </div>
            <div
              style={{
                width: 220,
                fontSize: 12,
                fontWeight: 600,
                color: "#8899AA",
                textTransform: "uppercase",
              }}
            >
              Status & Issues
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.id}
              style={{
                display: "flex",
                gap: 16,
                padding: "16px 24px",
                borderBottom: i < rows.length - 1 ? "1px solid #0A1420" : "none",
                alignItems: "flex-start",
                background:
                  row.status === "Error"
                    ? "rgba(255,68,68,0.05)"
                    : row.status === "Warning"
                      ? "rgba(255,184,0,0.02)"
                      : "transparent",
              }}
            >
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>
                  {row.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color:
                      row.status === "Error" && row.issues.join(",").includes("email")
                        ? "#FF4444"
                        : "#8899AA",
                  }}
                >
                  {row.email}
                </div>
              </div>
              <div style={{ width: 140, fontSize: 13, color: "#FFFFFF" }}>{row.role}</div>
              <div style={{ width: 120, fontSize: 13, color: "#FFFFFF" }}>{row.dept}</div>
              <div style={{ width: 120, fontSize: 13, color: "#FFFFFF" }}>{row.ctc}</div>
              <div style={{ width: 120, fontSize: 13, color: "#FFFFFF" }}>{row.doj}</div>
              <div style={{ width: 220 }}>
                {row.status === "Valid" && (
                  <span
                    style={{
                      fontSize: 12,
                      color: "#00E5A0",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <CheckCircle2 size={14} /> Ready
                  </span>
                )}
                {row.status === "Warning" && (
                  <div>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#FFB800",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        marginBottom: 4,
                      }}
                    >
                      <AlertTriangle size={14} /> Warning (Auto-fixed)
                    </span>
                    {row.issues.map((iss) => (
                      <div key={iss} style={{ fontSize: 11, color: "#8899AA" }}>
                        • {iss}
                      </div>
                    ))}
                  </div>
                )}
                {row.status === "Error" && (
                  <div>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#FF4444",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        marginBottom: 4,
                      }}
                    >
                      <XCircle size={14} /> Error (Will skip)
                    </span>
                    {row.issues.map((iss) => (
                      <div key={iss} style={{ fontSize: 11, color: "#FF4444" }}>
                        • {iss}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          
          <button
            style={{
              background: "none",
              border: "none",
              color: "#0066FF",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
            className="hover:underline"
          >
            View all 124 rows <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </Page>
  );
}
