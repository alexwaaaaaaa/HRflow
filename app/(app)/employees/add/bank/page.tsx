"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Building2,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
  Plus,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";

type VerifyState = "idle" | "verifying" | "success" | "fail";

export default function BankDetailsStep() {
  const [ifscValue, setIfscValue] = useState("HDFC0002082");
  const [ifscVerified, setIfscVerified] = useState(true);
  const [pennyState, setPennyState] = useState<VerifyState>("success");
  const [showRequest, setShowRequest] = useState(false);

  function handleIFSC(v: string) {
    setIfscValue(v.toUpperCase());
    if (v.length === 11) {
      setIfscVerified(true);
    } else {
      setIfscVerified(false);
    }
  }

  function simulatePenny() {
    setPennyState("verifying");
    setTimeout(() => setPennyState("success"), 2500);
  }

  return (
    <Page
      title="Add New Employee"
      subtitle="Complete all steps to onboard a new team member."
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Add", href: "/employees/add" },
        { label: "Bank" },
      ]}
      maxWidth="1200px"
    >
      <div className="animate-fade-in mx-auto max-w-[720px] px-6 py-8">
        {/* Back */}
        <Link
          href="/employees"
          className="mb-5 inline-flex items-center gap-2 text-sm text-[#8899AA] no-underline transition-colors hover:text-white"
        >
          <ArrowLeft size={16} /> Back to Employees
        </Link>

        {/* Heading */}
        <h1 className="mb-1 text-2xl font-bold text-white">Add New Employee</h1>
        <p className="mb-8 text-sm text-[#8899AA]">
          Complete all steps to onboard a new team member.
        </p>

        {/* Step Progress */}
        <div className="mb-12 flex items-center">
          {[
            { num: 1, label: "Personal", status: "completed" },
            { num: 2, label: "Job", status: "completed" },
            { num: 3, label: "Salary", status: "completed" },
            { num: 4, label: "Statutory", status: "completed" },
            { num: 5, label: "Bank", status: "active" },
            { num: 6, label: "Docs", status: "pending" },
          ].map((step, i, arr) => (
            <div
              key={step.num}
              className="flex items-center"
              style={{ flex: i < arr.length - 1 ? 1 : "initial" }}
            >
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold transition-all ${step.status === "completed" ? "bg-[#00E5A0] text-[#060B14]" : step.status === "active" ? "bg-[#0066FF] text-white ring-4 ring-[#0066FF]/20" : "bg-[#1A2A3A] text-[#445566]"}`}
                >
                  {step.status === "completed" ? <Check size={14} /> : step.num}
                </div>
                <span
                  className={`absolute top-10 text-[11px] font-medium whitespace-nowrap ${step.status === "pending" ? "text-[#445566]" : "text-white"}`}
                >
                  {step.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div
                  className={`mx-3 mt-[-16px] h-0.5 flex-1 ${step.status === "completed" ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Form Card */}
        <div className="space-y-6 rounded-2xl border border-[#1A2A3A] bg-[#0D1928] p-8">
          <div>
            <h2 className="text-lg font-semibold text-white">Primary Salary Account</h2>
            <p className="mt-1 text-sm text-[#8899AA]">
              Bank account where monthly salary will be credited
            </p>
          </div>

          {/* Account Holder */}
          <div>
            <label className="mb-2 block text-[13px] text-[#8899AA]">
              Account Holder Name <span className="text-[#FF4444]">*</span>
            </label>
            <input
              defaultValue="Rahul Kumar Sharma"
              className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#0A1420] px-3 text-sm text-white transition-colors focus:border-[#00E5A0] focus:outline-none"
              id="page-80"
              aria-label="page-80"
            />
            <p className="mt-1 text-[11px] text-[#445566]">
              Pre-filled from personal info — edit if joining account
            </p>
          </div>

          {/* Account Number */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-[13px] text-[#8899AA]">
                Account Number <span className="text-[#FF4444]">*</span>
              </label>
              <input
                type="password"
                defaultValue="50100234567890"
                className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#0A1420] px-3 text-sm tracking-widest text-white transition-colors focus:border-[#00E5A0] focus:outline-none"
                id="page-89"
                aria-label="page-89"
              />
            </div>
            <div>
              <label className="mb-2 block text-[13px] text-[#8899AA]">
                Confirm Account Number <span className="text-[#FF4444]">*</span>
              </label>
              <input
                defaultValue="••••••••7890"
                className="h-10 w-full rounded-lg border border-[#00E5A0] bg-[#0A1420] px-3 text-sm tracking-widest text-white focus:outline-none"
                id="page-94"
                aria-label="page-94"
              />
              <p className="mt-1 flex items-center gap-1 text-[11px] text-[#00E5A0]">
                <CheckCircle2 size={11} /> Account numbers match
              </p>
            </div>
          </div>

          {/* Account Type */}
          <div>
            <label className="mb-3 block text-[13px] text-[#8899AA]">Account Type</label>
            <div className="flex gap-4">
              {["Savings", "Current"].map((type) => (
                <label key={type} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="acctype"
                    defaultChecked={type === "Savings"}
                    className="accent-[#00E5A0]"
                  />
                  <span className="text-sm text-white">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* IFSC */}
          <div>
            <label className="mb-2 block text-[13px] text-[#8899AA]">
              IFSC Code <span className="text-[#FF4444]">*</span>
            </label>
            <div className="relative">
              <input
                value={ifscValue}
                onChange={(e) => handleIFSC(e.target.value)}
                maxLength={11}
                className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#0A1420] px-3 pr-10 text-sm tracking-widest text-white uppercase transition-colors focus:border-[#00E5A0] focus:outline-none"
                id="page-117"
                aria-label="page-117"
              />
              {ifscVerified && (
                <CheckCircle2
                  size={16}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#0066FF]"
                />
              )}
            </div>

            {/* Bank auto-fill */}
            {ifscVerified && (
              <div className="mt-3 flex items-start gap-3 rounded-xl border border-[#0066FF]/30 bg-[#0066FF]/5 p-4">
                <Building2 size={18} className="mt-0.5 shrink-0 text-[#0066FF]" />
                <div>
                  <p className="text-sm font-semibold text-white">HDFC Bank</p>
                  <p className="text-[12px] text-[#8899AA]">
                    Andheri West Branch, Mumbai — 400058, Maharashtra
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#445566]">
                    MICR: 400240009 · RTGS Enabled · NEFT Enabled
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Penny Drop */}
          <div className="rounded-xl border border-[#1A2A3A] bg-[#0A1420] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#00E5A0]" />
                  <h4 className="text-sm font-semibold text-white">Penny Drop Verification</h4>
                </div>
                <p className="text-[12px] text-[#8899AA]">
                  We transfer ₹1 to verify this account is active and the name matches employee
                  records. Prevents salary disbursement failures.
                </p>
              </div>

              {pennyState === "idle" && (
                <Button variant="primary" onClick={simulatePenny}>
                  Verify Account
                </Button>
              )}
              {pennyState === "verifying" && (
                <div className="flex items-center gap-2 text-sm whitespace-nowrap text-[#FFB800]">
                  <Loader2 size={16} className="animate-spin" />
                  Transferring ₹1...
                </div>
              )}
              {pennyState === "success" && (
                <div className="flex items-center gap-2 text-sm whitespace-nowrap text-[#00E5A0]">
                  <CheckCircle2 size={16} />
                  Verified ✓
                </div>
              )}
              {pennyState === "fail" && (
                <div className="flex items-center gap-2 text-sm whitespace-nowrap text-[#FF4444]">
                  <AlertCircle size={16} />
                  Verification Failed
                </div>
              )}
            </div>

            {pennyState === "success" && (
              <div className="mt-3 border-t border-[#1A2A3A] pt-3 text-[12px] text-[#00E5A0]">
                ✅ Account holder confirmed: <strong>RAHUL KUMAR SHARMA</strong> — Name matches
                employee record
              </div>
            )}
            {pennyState === "fail" && (
              <div className="mt-3 border-t border-[#1A2A3A] pt-3 text-[12px] text-[#FF4444]">
                ❌ Account inactive or name mismatch — please check account details
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#1A2A3A]" />

          {/* Add Another Account / Request */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            <button className="flex items-center gap-2 text-sm text-[#0066FF] transition-colors hover:text-blue-400">
              <Plus size={16} />
              Add Another Account
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#445566]">Or request from employee</span>
              
              <button
                onClick={() => setShowRequest(!showRequest)}
                className="flex items-center gap-1.5 text-xs text-[#8899AA] underline transition-colors hover:text-white"
              >
                via Email / WhatsApp
              </button>
            </div>
          </div>

          {/* Request panel */}
          {showRequest && (
            <div className="animate-fade-in space-y-3 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
              <p className="text-sm font-medium text-white">
                Send bank details request link to employee
              </p>
              <div className="flex gap-3">
                
                <button className="flex h-9 items-center gap-2 rounded-lg bg-[#1A2A3A] px-4 text-sm text-[#00E5A0] transition-colors hover:bg-[#243040]">
                  <Phone size={14} /> WhatsApp
                </button>
                
                <button className="flex h-9 items-center gap-2 rounded-lg bg-[#1A2A3A] px-4 text-sm text-[#0066FF] transition-colors hover:bg-[#243040]">
                  <Mail size={14} /> Email
                </button>
              </div>
              <p className="text-[11px] text-[#8899AA]">
                Employee receives a secure link · Details auto-populate here once submitted · Link
                expires in 48 hrs
              </p>
            </div>
          )}
        </div>

        {/* Bottom action bar */}
        <div className="mt-8 flex items-center justify-between border-t border-[#1A2A3A] pt-6">
          <Link href="/employees/add/statutory">
            <Button variant="outline" size="lg">
              ← Back
            </Button>
          </Link>
          <div className="flex gap-4">
            
            <button className="h-11 bg-transparent px-6 text-sm text-[#8899AA] transition-colors hover:text-white">
              Save Draft
            </button>
            <Link href="/employees/add/documents">
              <Button variant="primary" size="lg">
                Next: Upload Documents →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}
