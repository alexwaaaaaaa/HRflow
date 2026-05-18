"use client";

import React from "react";
import { BookMarked, CheckCircle, ExternalLink, Activity, Users, FileSignature, ShieldAlert } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function GazetteChangeDetailPage() {
  return (
    <Page
      title="Amendment to Minimum Wages Act (Karnataka)"
      subtitle="Ref: GAZ-2023-10-A · Published: Oct 15, 2023 · Effective Deadline: Nov 1, 2023"
      breadcrumbs={[
        { label: "AI", href: "/ai/gazette-monitor" },
        { label: "Gazette Monitor", href: "/ai/gazette-monitor" },
        { label: "GAZ-2023-10-A" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Badge variant="danger">High Impact</Badge>
          <Button variant="secondary" icon={<ExternalLink size={16} aria-hidden="true" />}>
            View Original PDF
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Summary & Source Text */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card padding="lg" className="border-indigo-500/30 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />

            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 relative z-10">
              <Activity size={20} className="text-indigo-400" aria-hidden="true" /> Kaarya Legal AI
              Synthesis
            </h3>

            <div className="relative z-10 space-y-4">
              <p className="text-[#8899AA] text-sm leading-relaxed">
                The Government of Karnataka has issued a gazette notification updating the basic
                Dearness Allowance (DA) by{" "}
                <strong className="text-emerald-400">₹450/month</strong> across all skill categories
                (Unskilled, Semi-skilled, Skilled, Highly Skilled) under the Minimum Wages Act,
                1948.
              </p>
              <p className="text-[#8899AA] text-sm leading-relaxed">
                This revision mandates an immediate corresponding increase in the gross salary
                structure to maintain statutory compliance. Failure to comply by the November payroll
                cycle will result in retrospective arrears calculation and potential spot-penalties
                during labor inspections.
              </p>

              <Card padding="md" className="mt-6">
                <h4 className="text-sm font-semibold text-white mb-3">Extracted Formula Changes</h4>
                <code className="block bg-[#0A1420] text-blue-400 p-3 rounded-lg text-xs font-mono border border-[#1A2A3A]">
                  NEW_VDA = OLD_VDA + (CPI_INCREASE * RATE_PER_POINT)
                  <br />
                  <span className="text-[#8899AA]">
                    {`// Approx ₹450 variance detected for base locations in Zone I`}
                  </span>
                </code>
              </Card>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="text-white font-semibold mb-4">Impacted Population</h3>
            <div className="flex items-center justify-between p-4 bg-[#131B2B] rounded-xl border border-[#2A3A4A] mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#1A2A3A] p-3 rounded-lg text-[#8899AA]">
                  <Users size={24} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="text-xs text-[#8899AA] uppercase tracking-wider font-semibold">
                    Affected Employees
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">Facility Management Staff</div>
                <div className="text-xs text-[#8899AA]">Location: Bangalore (Zone I)</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-500 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
              <ShieldAlert size={14} aria-hidden="true" className="shrink-0" />
              Financial impact estimated at ₹10,800/month across the pool.
            </div>
          </Card>
        </div>

        {/* Workflow & Actions */}
        <div className="flex flex-col gap-6">
          <Card padding="lg" className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[100px] -translate-y-8 translate-x-8 pointer-events-none"
            />

            <h3 className="text-lg font-semibold text-white mb-6">Execution Workflow</h3>

            <div className="relative pl-6 border-l-2 border-[#1A2A3A] space-y-8 pb-4">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] bg-indigo-500/20 border border-indigo-500 w-4 h-4 rounded-full flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                </span>
                <h5 className="text-sm font-medium text-white mb-1">
                  1. Review AI Impact Analysis
                </h5>
                <p className="text-xs text-[#8899AA] leading-relaxed">
                  Kaarya has identified 24 employees earning below the new required minimum.
                </p>
              </div>

              <div className="relative opacity-60">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full"
                />
                <h5 className="text-sm font-medium text-white mb-1">
                  2. Auto-Adjust Salary Structures
                </h5>
                <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                  Generate new salary breakdowns updating the VDA component by ₹450 for the
                  affected pool.
                </p>
                <Button
                  disabled
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  icon={<FileSignature size={14} aria-hidden="true" />}
                >
                  Generate Revisions
                </Button>
              </div>

              <div className="relative opacity-60">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full"
                />
                <h5 className="text-sm font-medium text-white mb-1">
                  3. Approval &amp; Payroll Sync
                </h5>
                <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                  Route the revised structures to Finance Head for 1-click approval and inject into
                  November payroll.
                </p>
                <Button
                  disabled
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  icon={<CheckCircle size={14} aria-hidden="true" />}
                >
                  Sync to Payroll
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-6 border-t border-[#1A2A3A]">
              <Button className="w-full">
                <BookMarked size={16} aria-hidden="true" className="mr-2" /> Start Workflow
              </Button>
            </div>
          </Card>

          <Card padding="md">
            <div className="text-xs text-[#8899AA] mb-2 uppercase tracking-wider font-semibold">
              Audit Trail
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-[#131B2B] p-2 rounded-lg border border-[#2A3A4A]">
                <span className="text-xs text-[#8899AA]">Oct 15, 08:30 AM</span>
                <span className="text-xs text-white">Parsed via Kaarya Bot</span>
              </div>
              <div className="flex justify-between items-center bg-[#131B2B] p-2 rounded-lg border border-[#2A3A4A]">
                <span className="text-xs text-[#8899AA]">Oct 15, 08:32 AM</span>
                <span className="text-xs text-indigo-400">Impact Analysis generated</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
