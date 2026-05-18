"use client";

import { use, useState } from "react";
import { Download, Send } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function EmploymentVerification({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [type, setType] = useState<"current" | "experience">("current");
  const [showSalary, setShowSalary] = useState(false);

  const handleDownload = () => {
    // TODO: replace with real mutation
    alert("Downloading PDF (stub)");
  };

  return (
    <Page
      title="Employment Verification Letter"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${id}` },
        { label: "Employment Verification" },
      ]}
      maxWidth="1000px"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_500px]">
        {/* Left: Config */}
        <Card padding="md">
          <h3 className="mb-5 text-base font-semibold text-white">Letter Configuration</h3>

          <div className="mb-5">
            <div className="mb-2.5 text-[13px] text-[#8899AA]">Letter Type</div>
            <div className="flex flex-col gap-3">
              {[
                { val: "current" as const, label: "Current Employment Verification" },
                { val: "experience" as const, label: "Experience Certificate (Ex-Employee)" },
              ].map(({ val, label }) => (
                <label
                  key={val}
                  className="flex cursor-pointer items-start gap-2.5 rounded-[10px] border p-3 transition-colors"
                  style={{
                    // inline-style: dynamic selection color
                    background: type === val ? "rgba(0,229,160,0.05)" : "#060B14",
                    borderColor: type === val ? "#00E5A0" : "#1A2A3A",
                  }}
                >
                  <input
                    type="radio"
                    name="type"
                    value={val}
                    checked={type === val}
                    onChange={() => setType(val)}
                    className="mt-0.5 shrink-0 accent-[#00E5A0]"
                  />
                  <span className="text-[13px] leading-snug text-white">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="addressed-to" className="mb-1.5 block text-[13px] text-[#8899AA]">
                Addressed To (optional)
              </label>
              <input
                id="addressed-to"
                placeholder="e.g. The Visa Officer, US Embassy"
                className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-[13px] text-white outline-none"
              />
            </div>
            <div>
              <label htmlFor="as-on-date" className="mb-1.5 block text-[13px] text-[#8899AA]">
                As On Date
              </label>
              <input
                id="as-on-date"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
              />
            </div>

            <div className="rounded-[10px] border border-[#1A2A3A] bg-[#060B14] p-4">
              <div className="mb-3 text-[13px] font-semibold text-white">Include in Letter</div>
              <label className="mb-2.5 flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={showSalary}
                  onChange={(e) => setShowSalary(e.target.checked)}
                  className="accent-[#00E5A0]"
                />
                <span className="text-[13px] text-[#8899AA]">Current CTC (₹12,00,000)</span>
              </label>
              {["Designation & Department", "Date of Joining", "Employment Status"].map((l) => (
                <label key={l} className="mt-2.5 flex cursor-pointer items-center gap-2.5">
                  <input type="checkbox" defaultChecked className="accent-[#00E5A0]" />
                  <span className="text-[13px] text-[#8899AA]">{l}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              variant="primary"
              className="flex-1"
              icon={<Download size={16} aria-hidden="true" />}
              onClick={handleDownload}
            >
              Download PDF
            </Button>
            <Button variant="secondary" icon={<Send size={14} aria-hidden="true" />}>
              Email Employee
            </Button>
          </div>
        </Card>

        {/* Right: Letter preview */}
        <div
          className="rounded-xl p-[44px_36px] font-serif text-[13.5px] leading-[1.9] text-black shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          style={{ background: "#FFFFFF" }}
        >
          <div className="mb-8 flex items-start justify-between border-b-2 border-black pb-5">
            <div>
              <div className="text-2xl font-black">TechCorp</div>
              <div className="text-xs text-[#555]">Solutions Pvt. Ltd.</div>
            </div>
            <div className="text-right text-[11px] leading-relaxed text-[#555]">
              123 Tech Park, Bengaluru 560100
              <br />
              TAN: AAACT1234C | PAN: AAACT1234C
            </div>
          </div>

          <div className="mb-7 text-center text-[15px] font-bold underline">
            {type === "current" ? "TO WHOMSOEVER IT MAY CONCERN" : "EXPERIENCE CERTIFICATE"}
          </div>

          <div>
            Date:{" "}
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            <br />
            <br />
            This is to certify that <strong>Mr. Rahul Kumar Sharma</strong>{" "}
            {type === "current" ? "is employed" : "was employed"} with TechCorp Solutions Pvt. Ltd.
            as a <strong>Senior Software Engineer</strong> in the Engineering department since{" "}
            <strong>15th March 2022</strong>.
            {type === "current" && " He is currently a full-time employee in good standing."}
            {showSalary && (
              <>
                <br />
                <br />
                His current annual Cost to Company (CTC) is{" "}
                <strong>₹12,00,000/- (Rupees Twelve Lakhs Only)</strong>.
              </>
            )}
            <br />
            <br />
            This certificate is issued at the request of the employee and is valid for the purpose
            stated above.
          </div>

          <div className="mt-[60px]">
            <div className="mb-1.5 h-9 w-[200px] border-b border-dashed border-[#CCC]" />
            <div className="font-bold">Priya Mehta</div>
            <div className="text-xs text-[#555]">Authorized Signatory — HR</div>
          </div>
        </div>
      </div>
    </Page>
  );
}
