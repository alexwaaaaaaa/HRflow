"use client";

import { use } from "react";
import { AlertTriangle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ShowCauseNotice({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const handleIssue = () => {
    // TODO: replace with real mutation
    alert("Show cause notice issued (stub)");
  };

  return (
    <Page
      title="Show Cause Notice"
      subtitle="Issue a formal notice requiring the employee to explain their conduct"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${id}` },
        { label: "Show Cause Notice" },
      ]}
      maxWidth="900px"
    >
      {/* Status tracker */}
      <div className="mb-8 flex flex-wrap items-center gap-0">
        {[
          { label: "Notice Issued" },
          { label: "Response Received" },
          { label: "Reviewed" },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex items-center gap-2 rounded-full border border-[#1A2A3A] bg-[#0D1928] px-4 py-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1A2A3A] text-[11px] font-bold text-[#8899AA]">
                {i + 1}
              </div>
              <span className="text-[13px] text-white">{s.label}</span>
            </div>
            {i < 2 && <div className="h-0.5 w-7 bg-[#1A2A3A]" aria-hidden="true" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Notice form */}
        <Card padding="md">
          <h3 className="mb-5 text-base font-semibold text-white">Notice Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="scn-subject" className="mb-1.5 block text-[13px] text-[#8899AA]">
                Subject / Allegation *
              </label>
              <input
                id="scn-subject"
                placeholder="e.g. Unauthorized absence from 5th to 8th November 2024"
                className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-[13px] text-white outline-none"
              />
            </div>
            <div>
              <label htmlFor="scn-body" className="mb-1.5 block text-[13px] text-[#8899AA]">
                Body of Notice *
              </label>
              <textarea
                id="scn-body"
                rows={5}
                defaultValue="You are hereby required to submit written explanation for your conduct related to the alleged misconduct. Your explanation must be submitted within the stipulated time."
                className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3.5 text-[13px] text-white outline-none"
              />
            </div>
            <div>
              <label htmlFor="scn-deadline" className="mb-1.5 block text-[13px] text-[#8899AA]">
                Response Deadline *
              </label>
              <input
                id="scn-deadline"
                type="date"
                defaultValue="2024-11-25"
                className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
              />
            </div>
          </div>
          <Button variant="danger" className="mt-6 w-full" onClick={handleIssue}>
            Issue Notice to Employee
          </Button>
        </Card>

        {/* Right: Response */}
        <div className="space-y-5">
          <Card padding="md">
            <h3 className="mb-4 text-base font-semibold text-white">Employee Response</h3>
            <div className="mb-4 min-h-[100px] rounded-xl border border-[#1A2A3A] bg-[#060B14] p-5">
              <div className="text-[13px] italic text-[#445566]">
                No response submitted yet. Response is due by 25/11/2024.
              </div>
            </div>
            <div>
              <label htmlFor="hr-review" className="mb-1.5 block text-[13px] text-[#8899AA]">
                HR Review / Outcome
              </label>
              <textarea
                id="hr-review"
                rows={3}
                placeholder="After receiving employee response, add your remarks and outcome here..."
                className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3.5 text-[13px] text-white outline-none"
              />
            </div>
          </Card>

          <div className="flex items-start gap-3 rounded-xl border border-[rgba(255,68,68,0.2)] bg-[rgba(255,68,68,0.05)] p-4">
            <AlertTriangle size={18} className="shrink-0 text-[#FF4444]" aria-hidden="true" />
            <div className="text-[13px] leading-relaxed text-[#FF4444]">
              Failure to respond by the deadline may result in further disciplinary action including
              termination.
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
