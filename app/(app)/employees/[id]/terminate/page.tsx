"use client";

import { use, useState } from "react";
import { AlertTriangle, CalendarDays, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function TerminateEmployee({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const empId = resolvedParams.id;
  const [step, setStep] = useState(1);

  const handleInitiate = () => {
    // TODO: replace with real mutation
    setStep(2);
  };

  if (step === 2) {
    return (
      <Page
        title="Offboarding Initiated"
        breadcrumbs={[
          { label: "Employees", href: "/employees" },
          { label: "Rahul Sharma", href: `/employees/${empId}` },
          { label: "Terminate" },
        ]}
        maxWidth="800px"
      >
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(0,229,160,0.1)]">
            <CheckCircle2 size={40} className="text-[#00E5A0]" aria-hidden="true" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white">Offboarding Initiated</h2>
          <p className="mx-auto mb-8 max-w-[500px] text-[15px] text-[#8899AA]">
            Rahul Sharma is now serving notice period. Relevant departments have been notified for
            Asset Recovery and clearance. FnF computation is now unlocked.
          </p>
          <div className="flex gap-4">
            <Button variant="primary">View Clearance Checklist</Button>
            <Button variant="secondary" href={`/employees/${empId}`}>Back to Profile</Button>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page
      title="Terminate Employee"
      subtitle="Initiate offboarding & full-and-final settlement"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${empId}` },
        { label: "Terminate" },
      ]}
      maxWidth="800px"
    >
      {/* Employee mini card */}
      <Card padding="md" className="mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(255,68,68,0.1)] text-lg font-bold text-[#FF4444]"
          >
            RS
          </div>
          <div className="flex-1">
            <div className="text-base font-bold text-white">Rahul Kumar Sharma</div>
            <div className="mt-0.5 text-[13px] text-[#8899AA]">
              {empId} · Senior Software Engineer · Engineering
            </div>
          </div>
          <div className="text-right">
            <div className="mb-0.5 text-[11px] uppercase text-[#8899AA]">Notice Period</div>
            <div className="text-sm font-semibold text-white">60 Days</div>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <h3 className="mb-6 text-lg font-semibold text-white">Termination Details</h3>

        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="term-type" className="mb-1.5 block text-[13px] text-[#8899AA]">
              Termination Type *
            </label>
            <select
              id="term-type"
              className="h-11 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
            >
              <option>Resignation (Voluntary)</option>
              <option>Termination (Involuntary - Performance)</option>
              <option>Termination (Involuntary - Disciplinary)</option>
              <option>Absconding</option>
              <option>Retirement</option>
            </select>
          </div>
          <div>
            <label htmlFor="notice-type" className="mb-1.5 block text-[13px] text-[#8899AA]">
              Notice Provided
            </label>
            <select
              id="notice-type"
              className="h-11 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
            >
              <option>Yes - Serving full notice</option>
              <option>Yes - Notice buyout requested</option>
              <option>No (Immediate Termination)</option>
            </select>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 rounded-xl border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.05)] p-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="resign-date"
              className="mb-1.5 flex items-center gap-2 text-[13px] text-[#8899AA]"
            >
              <CalendarDays size={14} aria-hidden="true" /> Resignation Date *
            </label>
            <input
              id="resign-date"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="h-11 w-full rounded-lg border border-[#1A2A3A] bg-[#0A1420] px-3.5 text-sm text-white outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="lwd"
              className="mb-1.5 flex items-center gap-2 text-[13px] text-[#8899AA]"
            >
              <CalendarDays size={14} aria-hidden="true" /> Last Working Day *
            </label>
            <input
              id="lwd"
              type="date"
              defaultValue="2024-07-06"
              className="h-11 w-full rounded-lg border border-[#00E5A0] bg-[#0A1420] px-3.5 text-sm text-white outline-none"
            />
            <div className="mt-1.5 text-[11px] text-[#00E5A0]">
              (Auto-calculated: 60 days from Resignation Date)
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="term-reason" className="mb-1.5 block text-[13px] text-[#8899AA]">
            Reason / Remarks *
          </label>
          <textarea
            id="term-reason"
            rows={4}
            placeholder="Enter reason for leaving..."
            className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3.5 text-sm text-white outline-none"
          />
        </div>

        <div className="mb-8 flex items-start gap-3 rounded-xl border border-[rgba(255,184,0,0.2)] bg-[rgba(255,184,0,0.05)] p-4">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-[#FFB800]" aria-hidden="true" />
          <div className="text-[13px] leading-relaxed text-[#FFB800]">
            Employee&apos;s portal access will automatically be revoked on the Last Working Day at
            11:59 PM. Asset recovery and FnF tasks will be created immediately.
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="danger" onClick={handleInitiate}>
            Initiate Offboarding
          </Button>
        </div>
      </Card>
    </Page>
  );
}
