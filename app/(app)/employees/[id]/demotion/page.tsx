"use client";

import { use, useState } from "react";
import { TrendingDown, AlertTriangle, UserCheck, ArrowRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DemotionScreen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [newCtc, setNewCtc] = useState(850000);
  const currentCtc = 1200000;
  const diff = newCtc - currentCtc;
  const pct = ((diff / currentCtc) * 100).toFixed(1);

  const handleSubmit = () => {
    // TODO: replace with real mutation
    alert("Demotion submitted for approval (stub)");
  };

  return (
    <Page
      title="Demotion"
      subtitle="Initiate a grade, designation, or compensation demotion for this employee"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${id}` },
        { label: "Demotion" },
      ]}
      maxWidth="1000px"
    >
      {/* Warning */}
      <div className="mb-7 flex items-start gap-3 rounded-xl border border-[rgba(255,68,68,0.2)] bg-[rgba(255,68,68,0.05)] p-4">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#FF4444]" aria-hidden="true" />
        <div className="text-[13px] leading-relaxed text-[#FF4444]">
          This is a sensitive action requiring{" "}
          <strong>Manager + HR Head + MD approval</strong>. A demotion letter will be generated and
          sent to the employee upon final approval.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left */}
        <div className="space-y-6">
          <Card padding="md">
            <h3 className="mb-5 text-base font-semibold text-white">
              New Position &amp; Compensation
            </h3>

            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="dem-reason" className="mb-1.5 block text-[13px] text-[#8899AA]">
                  Demotion Reason *
                </label>
                <select
                  id="dem-reason"
                  className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
                >
                  <option>Performance Issues</option>
                  <option>Disciplinary Action</option>
                  <option>Restructuring</option>
                  <option>Voluntary (Employee Request)</option>
                </select>
              </div>
              <div>
                <label htmlFor="dem-date" className="mb-1.5 block text-[13px] text-[#8899AA]">
                  Effective Date *
                </label>
                <input
                  id="dem-date"
                  type="date"
                  defaultValue="2024-12-01"
                  className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
                />
              </div>
            </div>

            {/* Before → After */}
            <div className="mb-5 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-5">
              <div className="mb-3.5 text-xs font-semibold uppercase text-[#8899AA]">
                Position Change
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="rounded-[10px] bg-[#0D1928] p-3.5">
                  <div className="mb-1 text-[11px] text-[#8899AA]">CURRENT</div>
                  <div className="text-sm font-semibold text-white">Sr. Software Engineer</div>
                  <div className="text-xs text-[#8899AA]">Grade L3</div>
                </div>
                <ArrowRight size={20} className="text-[#FF4444]" aria-hidden="true" />
                <div>
                  <div className="mb-2 text-[11px] font-semibold uppercase text-[#FF4444]">
                    NEW (Demoted)
                  </div>
                  <select
                    id="new-designation"
                    aria-label="New designation"
                    className="mb-2 h-9.5 w-full rounded-lg border border-[#FF4444] bg-[#0D1928] px-3 text-[13px] text-white outline-none"
                  >
                    <option>Software Engineer</option>
                    <option>Junior Software Engineer</option>
                  </select>
                  <select
                    id="new-grade"
                    aria-label="New grade"
                    className="h-9.5 w-full rounded-lg border border-[#FF4444] bg-[#0D1928] px-3 text-[13px] text-white outline-none"
                  >
                    <option>Grade L2</option>
                    <option>Grade L1</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="new-ctc" className="mb-1.5 block text-[13px] text-[#8899AA]">
                New Annual CTC *
              </label>
              <input
                id="new-ctc"
                type="number"
                value={newCtc}
                onChange={(e) => setNewCtc(Number(e.target.value))}
                className="h-12 w-full rounded-lg border border-[#FF4444] bg-[#060B14] px-3.5 text-lg font-bold text-white outline-none"
              />
              <div className="mt-2 flex items-center gap-1.5 text-[13px] text-[#FF4444]">
                <TrendingDown size={14} aria-hidden="true" />
                Change: {pct}% (₹{Math.abs(diff).toLocaleString("en-IN")} reduction)
              </div>
            </div>

            <div>
              <label htmlFor="dem-notes" className="mb-1.5 block text-[13px] text-[#8899AA]">
                Supporting Notes / Evidence *
              </label>
              <textarea
                id="dem-notes"
                rows={4}
                placeholder="Provide context, PIP history, documented warnings, or other supporting reasons..."
                className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3.5 text-sm text-white outline-none"
              />
            </div>
          </Card>

          <Card padding="md">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Approval Chain (3 levels required)
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {[
                { name: "Kavya Reddy", role: "Manager" },
                { name: "Priya Mehta", role: "HR Head" },
                { name: "Rajat Shah", role: "MD" },
              ].map((person, i) => (
                <div key={person.name} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-[#1A2A3A] bg-[#0A1420] px-4 py-2.5">
                    <UserCheck size={14} className="text-[#8899AA]" aria-hidden="true" />
                    <div>
                      <div className="text-[13px] font-semibold text-white">{person.name}</div>
                      <div className="text-[11px] text-[#445566]">{person.role}</div>
                    </div>
                  </div>
                  {i < 2 && <ArrowRight size={14} className="text-[#445566]" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </Card>

          <Button variant="danger" className="w-full" onClick={handleSubmit}>
            Submit Demotion for Approval
          </Button>
        </div>

        {/* Right summary */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Card padding="md">
            <h3 className="mb-4 text-sm font-semibold text-white">Impact Summary</h3>
            {[
              { l: "Grade", old: "L3", newV: "L2" },
              { l: "Designation", old: "Sr. SWE", newV: "Software Engineer" },
            ].map((r) => (
              <div
                key={r.l}
                className="flex justify-between border-b border-[#1A2A3A] py-2.5 text-[13px]"
              >
                <span className="text-[#8899AA]">{r.l}</span>
                <span className="text-white">
                  {r.old} → <span className="text-[#FF4444]">{r.newV}</span>
                </span>
              </div>
            ))}
            <div className="flex justify-between border-b border-[#1A2A3A] py-2.5 text-[13px]">
              <span className="text-[#8899AA]">CTC</span>
              <span>
                ₹{(currentCtc / 100000).toFixed(1)}L →{" "}
                <span className="font-bold text-[#FF4444]">₹{(newCtc / 100000).toFixed(1)}L</span>
              </span>
            </div>
            <div className="flex items-center gap-2 py-3.5 text-sm font-bold text-[#FF4444]">
              <TrendingDown size={16} aria-hidden="true" />
              {pct}% reduction (₹{Math.abs(diff).toLocaleString("en-IN")}/yr)
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
