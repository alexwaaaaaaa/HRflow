"use client";

import { use, useState } from "react";
import { Download, CheckCircle2, Send } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function SalaryCertificate({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const empId = resolvedParams.id;
  const [showBreakup, setShowBreakup] = useState(true);

  const handleDownload = () => {
    // TODO: replace with real mutation
    alert("Downloading PDF (stub)");
  };

  return (
    <Page
      title="Salary Certificate"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${empId}` },
        { label: "Salary Certificate" },
      ]}
      maxWidth="900px"
      actions={
        <>
          <Button variant="secondary" icon={<Send size={14} aria-hidden="true" />}>
            Email to Employee
          </Button>
          <Button
            variant="primary"
            icon={<Download size={14} aria-hidden="true" />}
            onClick={handleDownload}
          >
            Download PDF
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        {/* Letter preview */}
        <div
          className="min-h-[800px] rounded-lg p-[60px_48px] font-serif text-[13.5px] leading-[1.9] text-black shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
          style={{ background: "#FFFFFF" }}
        >
          <div className="mb-10 flex items-start justify-between border-b-2 border-black pb-6">
            <div>
              <div className="text-[28px] font-black tracking-tight">TechCorp</div>
              <div className="mt-1 text-sm text-[#444]">Solutions Pvt. Ltd.</div>
            </div>
            <div className="text-right text-xs leading-relaxed text-[#444]">
              123 Tech Park, Tower A,
              <br />
              Bengaluru, Karnataka 560100
              <br />
              PAN: ABCDE1234F · GSTIN: 29ABCDE1234F1Z5
            </div>
          </div>

          <div className="mb-10 text-center text-[18px] font-bold underline">
            TO WHOMSOEVER IT MAY CONCERN
          </div>

          <div className="mb-10 text-[15px] leading-[2]">
            This is to certify that <strong>Mr. Rahul Sharma</strong> (Employee ID: {empId}) is a
            bona fide employee of TechCorp Solutions Pvt Ltd. He has been working with us since{" "}
            <strong>15th November 2021</strong> and is currently designated as a{" "}
            <strong>Senior Software Engineer</strong>.
            <br />
            <br />
            As per our records, his current Annual Cost to Company (CTC) is{" "}
            <strong>₹12,00,000/- (Rupees Twelve Lakhs Only)</strong>. The monthly breakup of his
            gross salary is as follows:
          </div>

          {showBreakup && (
            <table className="mx-auto mb-10 w-4/5 border-collapse text-sm">
              <tbody>
                {[
                  { k: "Basic Salary", v: "₹40,000" },
                  { k: "House Rent Allowance (HRA)", v: "₹20,000" },
                  { k: "Special Allowance", v: "₹30,000" },
                  { k: "Leave Travel Allowance (LTA)", v: "₹5,000" },
                  { k: "PF Employer Contribution", v: "₹5,000" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#CCC]">
                    <td className="py-2">{row.k}</td>
                    <td className="py-2 text-right font-semibold">{row.v}</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 text-base font-bold">Total Monthly Gross</td>
                  <td className="py-3 text-right text-base font-bold">₹1,00,000</td>
                </tr>
              </tbody>
            </table>
          )}

          <div className="mb-[60px] text-[15px] leading-[2]">
            This certificate is issued exclusively upon the request of the employee for the purpose
            of opening a bank account / applying for a loan / processing a visa, and does not hold
            the company responsible for any financial liabilities.
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="mb-2">
                For <strong>TechCorp Solutions Pvt Ltd</strong>
              </div>
              {/* codemod-skip: img-needs-dimensions — external SVG signature, no intrinsic dimensions */}
              <div className="mb-2 h-[60px] w-[200px] border-b border-dashed border-[#CCC]" />
              <div className="font-semibold">Priya Mehta</div>
              <div className="text-sm text-[#444]">Authorized Signatory, HR</div>
            </div>
            <div className="text-right text-sm">
              Date:{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              <br />
              Place: Bengaluru
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card padding="md">
            <h3 className="mb-4 text-sm font-semibold text-white">Certificate Options</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="cert-purpose" className="mb-1.5 block text-xs text-[#8899AA]">
                  Purpose of Issue
                </label>
                <select
                  id="cert-purpose"
                  className="h-9.5 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3 text-[13px] text-white outline-none"
                >
                  <option>Bank Loan Application</option>
                  <option>Visa / Immigration</option>
                  <option>Opening Bank Account</option>
                  <option>General Purpose</option>
                </select>
              </div>

              <div>
                <div className="mb-2 text-xs text-[#8899AA]">Format Type</div>
                <label className="mb-2 flex cursor-pointer items-center gap-2.5">
                  <input
                    type="radio"
                    name="fmt"
                    defaultChecked
                    className="accent-[#00E5A0]"
                    onChange={() => setShowBreakup(true)}
                  />
                  <span className="text-[13px] text-white">With Detailed CTC Breakup</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="radio"
                    name="fmt"
                    className="accent-[#00E5A0]"
                    onChange={() => setShowBreakup(false)}
                  />
                  <span className="text-[13px] text-white">Gross Annual CTC Only</span>
                </label>
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-[#1A2A3A] bg-[#0A1420] p-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 shrink-0 accent-[#00E5A0]"
                />
                <span className="text-xs leading-snug text-[#8899AA]">
                  Include Digital Signature of Authorized Signatory
                </span>
              </label>
            </div>
          </Card>

          <div className="flex items-start gap-3 rounded-xl border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.05)] p-4">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#0066FF]" aria-hidden="true" />
            <div className="text-xs leading-relaxed text-[#0066FF]">
              This document is auto-generated based on the employee&apos;s current active payroll
              profile. Any recent revisions are already reflected.
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
