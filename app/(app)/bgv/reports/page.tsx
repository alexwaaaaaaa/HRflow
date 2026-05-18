"use client";

import {
  Download,
  ChevronRight,
  PieChart as PieChartIcon,
  BarChart2,
  Activity,
  UserCheck,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const REPORTS = [
  {
    id: "RPT-01",
    title: "Overall TAT Analysis",
    desc: "Turnaround time breakdown by vendor and check type.",
    Icon: Activity,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    id: "RPT-02",
    title: "Discrepancy Trends",
    desc: "Common failure points (e.g., Education vs Employment).",
    Icon: PieChartIcon,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    id: "RPT-03",
    title: "Vendor SLA Compliance",
    desc: "Metrics on vendor performance against agreed SLAs.",
    Icon: BarChart2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    id: "RPT-04",
    title: "Compliance Audit Log",
    desc: "Historical log of all BGV clearances and overrides.",
    Icon: UserCheck,
    color: "text-[#0066FF]",
    bg: "bg-[#0066FF]/10",
    border: "border-[#0066FF]/20",
  },
] as const;

export default function BGVReportsPage() {
  return (
    <Page
      title="BGV Reports & Extracts"
      subtitle="Generate detailed reports and analytics for background verifications."
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Reports" },
      ]}
      maxWidth="1200px"
      actions={
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={<PieChartIcon size={16} aria-hidden="true" />} href="/bgv/analytics">
            Go to Analytics
          </Button>
          <Button variant="secondary" href="/bgv/reports/cost">
            View Cost Report
          </Button>
        </div>
      }
    >
      <div className="space-y-10">
        {/* Report cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REPORTS.map((rpt) => {
            const Icon = rpt.Icon;
            return (
              <Card key={rpt.id} padding="md" className="group relative cursor-pointer overflow-hidden hover:border-[#2A3A4A]">
                <div
                  className={`absolute right-0 top-0 h-16 w-16 rounded-bl-full border-b border-l opacity-10 blur-xl transition-all group-hover:blur-2xl ${rpt.bg} ${rpt.border}`}
                  aria-hidden="true"
                />
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg border opacity-30 transition-opacity group-hover:opacity-100 ${rpt.bg} ${rpt.border}`}
                >
                  <Icon className={rpt.color} size={24} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-bold text-white transition-colors group-hover:text-[#0066FF]">
                  {rpt.title}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-[#8899AA]">{rpt.desc}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-[#0066FF]">
                  Generate <ChevronRight size={16} aria-hidden="true" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Custom report builder */}
        <Card padding="lg" className="border-l-4 border-l-[#00E5A0]">
          <h2 className="mb-1 text-lg font-bold text-white">Custom Data Extract</h2>
          <p className="mb-6 text-sm text-[#8899AA]">
            Create a highly customized CSV report based on specific data points.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#556677]">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  aria-label="Start date"
                  className="rounded border border-[#1A2A3A] bg-[#060B14] px-3 py-2 text-sm text-slate-300 outline-none focus:border-[#0066FF]"
                />
                <input
                  type="date"
                  aria-label="End date"
                  className="rounded border border-[#1A2A3A] bg-[#060B14] px-3 py-2 text-sm text-slate-300 outline-none focus:border-[#0066FF]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="vendor-select" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#556677]">
                Vendors
              </label>
              <select
                id="vendor-select"
                className="w-full rounded border border-[#1A2A3A] bg-[#060B14] px-3 py-2 text-sm text-slate-300 outline-none focus:border-[#0066FF]"
              >
                <option>All Vendors</option>
                <option>FirstAdvantage</option>
                <option>Checkr</option>
              </select>
            </div>
            <div>
              <label htmlFor="status-select" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#556677]">
                Status
              </label>
              <select
                id="status-select"
                className="w-full rounded border border-[#1A2A3A] bg-[#060B14] px-3 py-2 text-sm text-slate-300 outline-none focus:border-[#0066FF]"
              >
                <option>All Statuses</option>
                <option>Clear</option>
                <option>Discrepancy</option>
                <option>Failed</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-[#1A2A3A] pt-6">
            <Button icon={<Download size={18} aria-hidden="true" />}>
              Generate CSV Dump
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  );
}
