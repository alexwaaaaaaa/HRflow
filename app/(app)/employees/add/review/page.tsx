"use client";

import Page from "@/components/ui/Page";

import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  UserPlus,
  Settings,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReviewSubmitStep() {
  const router = useRouter();

  const handleSubmit = () => {
    // Simulate submitting and pushing to employee list or success screen
    router.push("/employees");
  };

  return (
    <Page
      title="Review & Submit"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Add", href: "/employees/add" },
        { label: "Review" },
      ]}
      maxWidth="1200px"
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}
        className="animate-fade-in"
      >
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <Link
            href="/employees/add/documents"
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
            <ArrowLeft size={16} /> Back to Documents
          </Link>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px 0" }}>
                Review & Submit
              </h1>
              <div style={{ fontSize: 14, color: "#8899AA" }}>
                Review all details before finalizing the employee creation.
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 32, marginTop: 40 }}>
          {/* Left Panel - Summary Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              {
                title: "Personal Information ✅",
                step: "/employees/add",
                data: [
                  { l: "Name", v: "Rahul Kumar Sharma" },
                  { l: "Gender", v: "Male" },
                  { l: "Email", v: "rahul@company.com" },
                  { l: "Mobile", v: "+91 98765 43210" },
                  { l: "PAN", v: "AAACT****C" },
                  { l: "DOB", v: "15/08/1996" },
                ],
              },
              {
                title: "Job Details ✅",
                step: "/employees/add/job",
                data: [
                  { l: "Designation", v: "Senior Software Engineer" },
                  { l: "Department", v: "Engineering" },
                  { l: "Location", v: "Bengaluru" },
                  { l: "Manager", v: "Karan Mehta" },
                  { l: "Date of Joining", v: "01/12/2024" },
                  { l: "Type", v: "Full-Time" },
                ],
              },
              {
                title: "Salary ✅",
                step: "/employees/add/salary",
                data: [
                  { l: "Annual CTC", v: "₹18,00,000" },
                  { l: "Monthly Gross", v: "₹1,20,017" },
                  { l: "Structure", v: "L3 Standard" },
                  { l: "Net Take-home", v: "≈₹1,09,717/mo" },
                ],
              },
              {
                title: "Statutory Details ✅",
                step: "/employees/add/statutory",
                data: [
                  { l: "PF Status", v: "Applicable" },
                  { l: "UAN", v: "To be generated" },
                  { l: "ESI", v: "Not Applicable" },
                  { l: "PT", v: "₹200/month (Karnataka)" },
                ],
              },
              {
                title: "Bank Account ✅",
                step: "/employees/add/bank",
                data: [
                  { l: "Bank Name", v: "HDFC Bank" },
                  { l: "Account No.", v: "••••••9012" },
                  { l: "IFSC", v: "HDFC0002082" },
                  { l: "Verification", v: "Penny drop successful" },
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                style={{
                  background: "#0D1928",
                  border: "1px solid #1A2A3A",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 24px",
                    background: "#0A1420",
                    borderBottom: "1px solid #1A2A3A",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>
                    {section.title}
                  </h3>
                  <Link
                    href={section.step}
                    style={{ fontSize: 13, color: "#0066FF", textDecoration: "none" }}
                    className="hover:underline"
                  >
                    Edit
                  </Link>
                </div>
                <div
                  style={{
                    padding: "20px 24px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  {section.data.map((item) => (
                    <div key={item.l}>
                      <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 4 }}>
                        {item.l}
                      </div>
                      <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>
                        {item.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

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
                  padding: "16px 24px",
                  background: "#0A1420",
                  borderBottom: "1px solid #1A2A3A",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#FFB800",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <AlertTriangle size={16} /> Documents ⚠
                </h3>
                <Link
                  href="/employees/add/documents"
                  style={{ fontSize: 13, color: "#0066FF", textDecoration: "none" }}
                  className="hover:underline"
                >
                  Edit
                </Link>
              </div>
              <div style={{ padding: "20px 24px" }}>
                <div style={{ fontSize: 14, color: "#FFFFFF", marginBottom: 8 }}>
                  Uploaded: 2/5 mandatory documents
                </div>
                <div style={{ fontSize: 13, color: "#FFB800" }}>
                  Missing: Aadhaar Card, Passport Photo, Appointment Letter
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Completeness & Submission */}
          <div>
            <div
              style={{
                background: "#0D1928",
                border: "1px solid #1A2A3A",
                borderRadius: 16,
                padding: 32,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 20px" }}>
                <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%" }}>
                  <path
                    stroke="#1A2A3A"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    stroke="#00E5A0"
                    strokeWidth="3"
                    strokeDasharray="92, 100"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>92%</span>
                </div>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: "0 0 8px 0" }}>
                Profile 92% complete
              </h3>
              <p style={{ fontSize: 14, color: "#8899AA", margin: 0 }}>
                You can proceed with creation. Missing documents can be uploaded later.
              </p>
            </div>

            <div
              style={{
                background: "#0D1928",
                border: "1px solid #1A2A3A",
                borderRadius: 16,
                padding: 32,
                marginBottom: 24,
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 20px 0" }}>
                After creating this employee:
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <label
                  style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ accentColor: "#00E5A0", marginTop: 4 }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Settings size={14} color="#8899AA" /> Create Onboarding checklist
                    </div>
                  </div>
                </label>
                <label
                  style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ accentColor: "#00E5A0", marginTop: 4 }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Mail size={14} color="#8899AA" /> Send Day 1 welcome email
                    </div>
                  </div>
                </label>
                <label
                  style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ accentColor: "#00E5A0", marginTop: 4 }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <UserPlus size={14} color="#8899AA" /> Notify Manager (Karan Mehta)
                    </div>
                  </div>
                </label>
                <label
                  style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ accentColor: "#00E5A0", marginTop: 4 }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <ShieldCheck size={14} color="#8899AA" /> Queue for Payroll setup
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div style={{ position: "sticky", top: 32 }}>
              
              <button
                onClick={handleSubmit}
                style={{
                  width: "100%",
                  height: 56,
                  background: "#00E5A0",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#060B14",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 4px 14px rgba(0, 229, 160, 0.3)",
                }}
              >
                <CheckCircle2 size={20} /> Create Employee
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "#8899AA", marginTop: 12 }}>
                Employee will appear in the system immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
