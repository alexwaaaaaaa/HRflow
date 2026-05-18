"use client";

import { use, useState } from "react";
import { ShieldOff } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type SalaryType = "full" | "half" | "none";

const SALARY_OPTIONS: { val: SalaryType; label: string }[] = [
  { val: "full", label: "Full Pay" },
  { val: "half", label: "Half Pay" },
  { val: "none", label: "No Pay" },
];

export default function SuspendEmployee({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [salaryType, setSalaryType] = useState<SalaryType>("full");
  const [indefinite, setIndefinite] = useState(false);

  const handleSubmit = () => {
    // TODO: replace with real mutation
    alert("Employee suspended (stub)");
  };

  return (
    <Page
      title="Suspend Employee"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${id}` },
        { label: "Suspend" },
      ]}
      maxWidth="800px"
    >
      {/* Warning */}
      <div className="mb-7 flex items-start gap-3 rounded-xl border border-[rgba(255,68,68,0.3)] bg-[rgba(255,68,68,0.05)] p-5">
        <ShieldOff size={20} className="mt-0.5 shrink-0 text-[#FF4444]" aria-hidden="true" />
        <div>
          <div className="mb-1 text-sm font-semibold text-[#FF4444]">Employee will be suspended</div>
          <div className="text-[13px] leading-relaxed text-[#8899AA]">
            Suspension will restrict the employee&apos;s system access and mark their attendance
            days as &quot;Suspended&quot;. A suspension order will be sent to the employee via
            email.
          </div>
        </div>
      </div>

      <Card padding="md">
        <h3 className="mb-6 text-base font-semibold text-white">Suspension Details</h3>

        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="susp-type" className="mb-1.5 block text-[13px] text-[#8899AA]">
              Suspension Type *
            </label>
            <select
              id="susp-type"
              className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
            >
              <option>Pending Inquiry / Departmental</option>
              <option>Disciplinary Action</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="susp-start" className="mb-1.5 block text-[13px] text-[#8899AA]">
              Suspension Start Date *
            </label>
            <input
              id="susp-start"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-4 flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={indefinite}
              onChange={(e) => setIndefinite(e.target.checked)}
              className="accent-[#FF4444]"
            />
            <span className="text-sm text-white">Until further notice (no defined end date)</span>
          </label>
          {!indefinite && (
            <div>
              <label htmlFor="susp-end" className="mb-1.5 block text-[13px] text-[#8899AA]">
                Suspension End Date *
              </label>
              <input
                id="susp-end"
                type="date"
                defaultValue="2024-11-30"
                className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="mb-3 text-[13px] text-[#8899AA]">Salary During Suspension *</div>
          <div className="flex gap-3" role="group" aria-label="Salary during suspension">
            {SALARY_OPTIONS.map(({ val, label }) => (
              <button
                key={val}
                type="button"
                onClick={() => setSalaryType(val)}
                aria-pressed={salaryType === val}
                className="flex-1 rounded-[10px] border py-2.5 text-sm transition-colors"
                style={{
                  // inline-style: dynamic per-option color
                  background:
                    salaryType === val
                      ? val === "none"
                        ? "rgba(255,68,68,0.1)"
                        : "rgba(0,229,160,0.1)"
                      : "#060B14",
                  borderColor:
                    salaryType === val ? (val === "none" ? "#FF4444" : "#00E5A0") : "#1A2A3A",
                  color: salaryType === val ? "#FFFFFF" : "#8899AA",
                  fontWeight: salaryType === val ? 600 : 400,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="susp-reason" className="mb-1.5 block text-[13px] text-[#8899AA]">
            Reason *
          </label>
          <textarea
            id="susp-reason"
            rows={3}
            placeholder="State the reason for suspension..."
            className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3.5 text-sm text-white outline-none"
          />
        </div>

        <div className="mb-7 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input type="checkbox" defaultChecked className="accent-[#FF4444]" />
            <span className="text-[13px] text-[#8899AA]">
              Revoke system access (portal login, email) during suspension period
            </span>
          </label>
        </div>

        <Button variant="danger" className="w-full" onClick={handleSubmit}>
          Suspend Employee
        </Button>
      </Card>
    </Page>
  );
}
