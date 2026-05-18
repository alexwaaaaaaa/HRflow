"use client";

import { use, useState } from "react";
import { TrendingUp, ArrowRight, UserCheck, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SalaryRevision({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [incrementType, setIncrementType] = useState<"Amount" | "%">("Amount");
  const [newCTC, setNewCTC] = useState(1380000);
  const currentCTC = 1200000;
  const diff = newCTC - currentCTC;
  const pct = ((diff / currentCTC) * 100).toFixed(1);

  const handleSubmit = () => {
    // TODO: replace with real mutation
    alert("Submitted for approval (stub)");
  };

  return (
    <Page
      title="Salary Revision"
      subtitle="Rahul Kumar Sharma · EMP-0848 · Senior Software Engineer (L3)"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${resolvedParams.id}` },
        { label: "Salary Revision" },
      ]}
      maxWidth="1000px"
    >
      {/* Employee mini card */}
      <Card padding="md" className="mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(0,102,255,0.15)] text-lg font-bold text-[#0066FF]"
          >
            RS
          </div>
          <div className="flex-1">
            <div className="text-base font-bold text-white">Rahul Kumar Sharma</div>
            <div className="mt-0.5 text-[13px] text-[#8899AA]">
              EMP-0848 · Senior Software Engineer (L3) · Engineering
            </div>
          </div>
          <div className="rounded-xl border border-[#1A2A3A] bg-[#0A1420] px-4 py-2.5 text-right">
            <div className="mb-0.5 text-[11px] uppercase text-[#8899AA]">Current CTC</div>
            <div className="text-lg font-bold text-[#00E5A0]">₹12,00,000</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left */}
        <div className="space-y-6">
          <Card padding="md">
            <h3 className="mb-5 text-base font-semibold text-white">Revision Details</h3>

            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="rev-type" className="mb-1.5 block text-xs text-[#8899AA]">
                  Revision Type *
                </label>
                <select
                  id="rev-type"
                  className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
                >
                  <option>Annual Increment</option>
                  <option>Promotion</option>
                  <option>Market Correction</option>
                </select>
              </div>
              <div>
                <label htmlFor="eff-date" className="mb-1.5 block text-xs text-[#8899AA]">
                  Effective Date *
                </label>
                <input
                  id="eff-date"
                  type="date"
                  defaultValue="2024-04-01"
                  className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
                />
              </div>
            </div>

            <div className="mb-5 flex gap-4" role="radiogroup" aria-label="Increment input type">
              {(["Amount", "%"] as const).map((v) => (
                <label key={v} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="inc"
                    checked={incrementType === v}
                    onChange={() => setIncrementType(v)}
                    className="accent-[#00E5A0]"
                  />
                  <span className="text-sm text-white">
                    {v === "Amount" ? "Enter New CTC" : "Enter % Increment"}
                  </span>
                </label>
              ))}
            </div>

            <div className="mb-5">
              <label htmlFor="ctc-input" className="mb-1.5 block text-xs text-[#8899AA]">
                {incrementType === "Amount" ? "New Annual CTC *" : "Increment % *"}
              </label>
              <div className="relative">
                <input
                  id="ctc-input"
                  type="number"
                  value={incrementType === "Amount" ? newCTC : pct}
                  onChange={(e) => {
                    if (incrementType === "Amount") setNewCTC(Number(e.target.value));
                    else setNewCTC(currentCTC * (1 + Number(e.target.value) / 100));
                  }}
                  className="h-12 w-full rounded-lg border border-[#00E5A0] bg-[#060B14] px-3.5 text-lg font-semibold text-white outline-none"
                />
                <div className="absolute right-3.5 top-3.5 text-sm text-[#8899AA]">
                  {incrementType === "Amount" ? "INR" : "%"}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[13px] text-[#00E5A0]">
                <TrendingUp size={14} aria-hidden="true" />
                Change: +₹{diff.toLocaleString("en-IN")} ({pct}%)
              </div>
            </div>

            <div className="rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
              <div className="mb-3 text-[13px] font-semibold text-white">Options</div>
              <label className="mb-2.5 flex cursor-pointer items-center gap-2.5">
                <input type="checkbox" defaultChecked className="accent-[#00E5A0]" />
                <span className="text-[13px] text-[#8899AA]">
                  Send revision letter to employee on approval
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-2.5">
                <input type="checkbox" defaultChecked className="accent-[#00E5A0]" />
                <span className="text-[13px] text-[#8899AA]">
                  Include arrears in next payroll (Effective date is in past)
                </span>
              </label>
            </div>
          </Card>

          <Card padding="md">
            <h3 className="mb-4 text-sm font-semibold text-white">Approval Chain</h3>
            <div className="flex flex-wrap items-center gap-4">
              {[
                { name: "Kavya Reddy", role: "Manager" },
                { name: "Priya Mehta", role: "HR" },
              ].map((person, i) => (
                <div key={person.name} className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5 rounded-full border border-[#1A2A3A] bg-[#0A1420] px-4 py-2">
                    <UserCheck size={14} className="text-[#00E5A0]" aria-hidden="true" />
                    <span className="text-[13px] text-white">{person.name} ({person.role})</span>
                  </div>
                  {i === 0 && <ArrowRight size={16} className="text-[#445566]" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right sticky summary */}
        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <Card padding="md">
            <h3 className="mb-4 text-base font-semibold text-white">Impact Summary</h3>
            {[
              { label: "Current CTC", value: `₹${currentCTC.toLocaleString("en-IN")}`, highlight: false },
              { label: "New CTC", value: `₹${newCTC.toLocaleString("en-IN")}`, highlight: true },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between border-b border-[#1A2A3A] py-3"
              >
                <span className="text-[13px] text-[#8899AA]">{row.label}</span>
                <span
                  className={`font-semibold ${row.highlight ? "text-lg text-[#00E5A0]" : "text-sm text-white"}`}
                >
                  {row.value}
                </span>
              </div>
            ))}
            <div className="flex justify-between border-b border-[#1A2A3A] py-3">
              <span className="text-[13px] text-[#8899AA]">Monthly Gross</span>
              <span className="text-sm text-white">
                ₹{Math.round(currentCTC / 12).toLocaleString("en-IN")} →{" "}
                ₹{Math.round(newCTC / 12).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-[rgba(0,229,160,0.2)] bg-[rgba(0,229,160,0.05)] p-3">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00E5A0]" aria-hidden="true" />
              <div className="text-xs leading-relaxed text-[#00E5A0]">
                L3 Band Range: ₹8L – ₹15L. The new CTC is within the allowed parity range.
              </div>
            </div>
          </Card>

          <Card padding="md">
            <Button
              variant="primary"
              className="w-full shadow-[0_0_20px_rgba(0,229,160,0.2)] hover:shadow-[0_0_30px_rgba(0,229,160,0.4)]"
              onClick={handleSubmit}
            >
              Submit for Approval
            </Button>
            <p className="mt-3 text-center text-[11px] text-[#445566]">
              This will trigger a workflow to the manager.
            </p>
          </Card>
        </div>
      </div>
    </Page>
  );
}
