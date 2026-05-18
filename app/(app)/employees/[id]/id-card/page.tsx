"use client";

import { use } from "react";
import { Printer, Download, Share2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";

export default function EmployeeIDCard({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const empId = resolvedParams.id;

  return (
    <Page
      title="Digital ID Card"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${empId}` },
        { label: "ID Card" },
      ]}
      maxWidth="1000px"
      actions={
        <>
          <Button variant="secondary" size="sm" icon={<Share2 size={14} aria-hidden="true" />}>
            Share via WhatsApp
          </Button>
          <Button variant="secondary" size="sm" icon={<Printer size={14} aria-hidden="true" />}>
            Print
          </Button>
          <Button variant="primary" size="sm" icon={<Download size={14} aria-hidden="true" />}>
            Download PDF
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Front */}
        <div>
          <div className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.05em] text-[#8899AA]">
            Front Side
          </div>
          <div
            className="relative mx-auto h-[500px] w-[340px] overflow-hidden rounded-[20px] border border-[#1A2A3A] shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            style={{ background: "linear-gradient(145deg, #0A1420 0%, #060B14 100%)" }}
          >
            {/* Top banner */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 z-0 h-[100px] scale-x-[1.3] rounded-b-[50%] bg-[#0066FF]"
            />

            <div className="relative z-10 flex h-full flex-col items-center p-6 text-center">
              <div className="mb-8 text-xl font-extrabold tracking-[0.02em] text-white">
                TechCorp
              </div>

              <div className="mb-6 h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-[#060B14] bg-[#0D1928]">
                {/* codemod-skip: img-needs-dimensions — avatar from external URL, no intrinsic dimensions */}
                {/* inline-style: avatar circle requires exact pixel dimensions for border-radius */}
                <div
                  className="h-full w-full rounded-full bg-[rgba(0,102,255,0.2)]"
                  aria-label="Employee avatar"
                  role="img"
                />
              </div>

              <div className="mb-1 text-2xl font-bold text-white">Rahul Sharma</div>
              <div className="mb-0.5 text-sm font-semibold text-[#00E5A0]">
                Senior Software Engineer
              </div>
              <div className="mb-6 text-[13px] text-[#8899AA]">Engineering</div>

              <div className="mt-auto flex items-center gap-4">
                <div className="border-r border-[#1A2A3A] pr-4 text-right">
                  <div className="text-[10px] uppercase text-[#8899AA]">Employee ID</div>
                  <div className="font-mono text-lg font-bold text-white">{empId}</div>
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase text-[#8899AA]">Blood Group</div>
                  <div className="text-lg font-bold text-[#FF4444]">O+</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div>
          <div className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.05em] text-[#8899AA]">
            Reverse Side
          </div>
          <div
            className="relative mx-auto flex h-[500px] w-[340px] flex-col rounded-[20px] border border-[#1A2A3A] bg-[#0D1928] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="mb-8 text-center text-[11px] leading-relaxed text-white">
              This card is the property of TechCorp Solutions Pvt Ltd.
              <br />
              If found, please return to:
              <br />
              <span className="text-[#8899AA]">123 Tech Park, Tower A, Bengaluru, 560100</span>
            </div>

            <div className="mb-6 border-b border-[#1A2A3A] pb-6">
              <div className="mb-1 text-[10px] uppercase text-[#8899AA]">Emergency Contact</div>
              <div className="text-sm font-semibold text-white">Sunita Sharma (Mother)</div>
              <div className="text-sm text-white">+91 98765 43210</div>
            </div>

            <div className="mb-auto">
              <div className="mb-1 text-[10px] uppercase text-[#8899AA]">Date of Issue</div>
              <div className="mb-3 text-sm font-semibold text-white">15 Nov 2024</div>
              <div className="mb-1 text-[10px] uppercase text-[#8899AA]">Valid Until</div>
              <div className="text-sm font-semibold text-white">31 Dec 2028</div>
            </div>

            {/* Barcode area */}
            <div
              aria-hidden="true"
              className="flex h-[60px] flex-col items-center rounded bg-white p-1"
            >
              <div
                className="w-[90%] flex-1"
                style={{
                  // inline-style: CSS repeating-linear-gradient barcode — cannot express in Tailwind
                  background:
                    "repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 5px, #000 5px, #000 9px, transparent 9px, transparent 11px)",
                }}
              />
              <div className="mt-0.5 font-mono text-[10px] text-black">{empId}</div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
