"use client";

import { use, useState } from "react";
import { UserPlus, History, CheckCircle2, Copy } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function RehireEmployee({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const empId = resolvedParams.id;
  const [step, setStep] = useState(1);

  const handleConfirm = () => {
    // TODO: replace with real mutation
    setStep(2);
  };

  if (step === 2) {
    return (
      <Page
        title="Employee Rehired Successfully!"
        breadcrumbs={[
          { label: "Employees", href: "/employees" },
          { label: "Rahul Sharma", href: `/employees/${empId}` },
          { label: "Rehire" },
        ]}
        maxWidth="800px"
      >
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(0,229,160,0.1)]">
            <CheckCircle2 size={40} className="text-[#00E5A0]" aria-hidden="true" />
          </div>
          <p className="mx-auto mb-8 max-w-[500px] text-[15px] text-[#8899AA]">
            Rahul Sharma&apos;s profile has been activated with effect from 1st Sep 2024. Welcome
            email and portal access credentials have been dispatched.
          </p>
          <Button variant="primary" href={`/employees/${empId}`}>Go to Active Profile</Button>
        </div>
      </Page>
    );
  }

  return (
    <Page
      title="Rehire Employee"
      subtitle="Restore a past employee profile with new compensation and job details."
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${empId}` },
        { label: "Rehire" },
      ]}
      maxWidth="800px"
    >
      {/* Employee mini card */}
      <Card padding="md" className="mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A2A3A] text-lg font-bold text-[#8899AA]"
          >
            RS
          </div>
          <div className="flex-1">
            <div className="text-base font-bold text-white">Rahul Kumar Sharma</div>
            <div className="mt-0.5 text-[13px] text-[#8899AA]">{empId} · EX-EMPLOYEE</div>
          </div>
          <div className="text-right">
            <div className="mb-0.5 text-[11px] uppercase text-[#8899AA]">Previous Tenure</div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <History size={14} aria-hidden="true" /> 2.5 Years
            </div>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <h3 className="mb-6 text-lg font-semibold text-white">New Employment Details</h3>

        <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl border border-[rgba(0,229,160,0.2)] bg-[rgba(0,229,160,0.05)] p-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rejoin-date" className="mb-1.5 block text-[13px] text-[#8899AA]">
              Rejoin Date *
            </label>
            <input
              id="rejoin-date"
              type="date"
              defaultValue="2024-09-01"
              className="h-11 w-full rounded-lg border border-[#00E5A0] bg-[#060B14] px-3.5 text-sm text-white outline-none"
            />
          </div>
          <div>
            <label htmlFor="emp-id-setting" className="mb-1.5 block text-[13px] text-[#8899AA]">
              Employee ID Settings
            </label>
            <select
              id="emp-id-setting"
              className="h-11 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
            >
              <option>Keep Old ID ({empId})</option>
              <option>Generate New ID</option>
            </select>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-[13px] text-[#8899AA]">
              New Designation *
              <button
                type="button"
                className="flex items-center gap-1 text-[11px] text-[#0066FF] hover:underline"
              >
                <Copy size={12} aria-hidden="true" /> Same as before
              </button>
            </div>
            <select
              id="new-desig"
              aria-label="New designation"
              className="h-11 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
            >
              <option>Engineering Manager</option>
              <option>Staff Software Engineer</option>
              <option>Senior Software Engineer</option>
            </select>
          </div>
          <div>
            <label htmlFor="new-dept" className="mb-1.5 block text-[13px] text-[#8899AA]">
              New Department *
            </label>
            <select
              id="new-dept"
              className="h-11 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
            >
              <option>Engineering</option>
            </select>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="new-ctc" className="mb-1.5 block text-[13px] text-[#8899AA]">
              New Annual CTC (₹) *
            </label>
            <input
              id="new-ctc"
              type="number"
              defaultValue="2400000"
              className="h-11 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-base font-semibold text-white outline-none"
            />
            <div className="mt-1.5 text-xs text-[#8899AA]">(Previous CTC: ₹18,00,000)</div>
          </div>
          <div>
            <label htmlFor="new-manager" className="mb-1.5 block text-[13px] text-[#8899AA]">
              Reporting Manager
            </label>
            <select
              id="new-manager"
              className="h-11 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
            >
              <option>Kavya Reddy</option>
              <option>Anil Kumar</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="primary"
            icon={<UserPlus size={18} aria-hidden="true" />}
            onClick={handleConfirm}
          >
            Confirm Rehire
          </Button>
        </div>
      </Card>
    </Page>
  );
}
