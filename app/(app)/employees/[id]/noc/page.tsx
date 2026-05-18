"use client";

import { use, useState } from "react";
import { Download, Send } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NOCLetter({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const empId = resolvedParams.id;
  const [type, setType] = useState<"current" | "experience">("current");

  const handleDownload = () => {
    // TODO: replace with real mutation
    alert("Downloading PDF (stub)");
  };

  return (
    <Page
      title="No Objection Certificate (NOC)"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${empId}` },
        { label: "NOC" },
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
            NO OBJECTION CERTIFICATE
          </div>

          <div className="mb-10 text-[15px] leading-[2]">
            TO WHOMSOEVER IT MAY CONCERN
            <br />
            <br />
            This is to certify that <strong>Mr. Rahul Sharma</strong> (Employee ID: {empId}) is a
            permanent employee of TechCorp Solutions Pvt Ltd, working as a{" "}
            <strong>Senior Software Engineer</strong> since{" "}
            <strong>15th November 2021</strong>.
            <br />
            <br />
            He has applied for a Tourist/Business Visa to visit{" "}
            <strong>United States of America</strong> during his approved annual leave from{" "}
            <strong>10th May 2024</strong> to <strong>25th May 2024</strong>.
            <br />
            <br />
            The company has <strong>no objection</strong> to Mr. Sharma traveling abroad during
            this period. He will resume his duties with our firm on{" "}
            <strong>27th May 2024</strong>. All expenses during this trip will be borne by the
            employee.
            <br />
            <br />
            This certificate is issued at the specific request of the employee for the purpose of
            the visa application.
          </div>

          <div className="mt-[100px] flex items-end justify-between">
            <div>
              <div className="mb-2">
                For <strong>TechCorp Solutions Pvt Ltd</strong>
              </div>
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

        {/* Sidebar controls */}
        <Card padding="md">
          <h3 className="mb-4 text-sm font-semibold text-white">Certificate Options</h3>
          <div className="space-y-4">
            <div>
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

            <div>
              <label htmlFor="noc-purpose" className="mb-1.5 block text-xs text-[#8899AA]">
                Purpose of NOC
              </label>
              <select
                id="noc-purpose"
                className="h-9.5 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3 text-[13px] text-white outline-none"
              >
                <option>Visa / Travel Abroad</option>
                <option>Higher Education (Evening / Dist.)</option>
                <option>Part-time Internship</option>
                <option>General Purpose</option>
              </select>
            </div>

            <div>
              <label htmlFor="destination" className="mb-1.5 block text-xs text-[#8899AA]">
                Destination Country (Travel NOC only)
              </label>
              <input
                id="destination"
                defaultValue="United States of America"
                className="h-9.5 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3 text-[13px] text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="leave-start" className="mb-1.5 block text-xs text-[#8899AA]">
                  Leave Start
                </label>
                <input
                  id="leave-start"
                  type="date"
                  defaultValue="2024-05-10"
                  className="h-9.5 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-2.5 text-[13px] text-white outline-none"
                />
              </div>
              <div>
                <label htmlFor="leave-end" className="mb-1.5 block text-xs text-[#8899AA]">
                  Leave End
                </label>
                <input
                  id="leave-end"
                  type="date"
                  defaultValue="2024-05-25"
                  className="h-9.5 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-2.5 text-[13px] text-white outline-none"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
