"use client";

import { TrendingUp, Download, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import ClientOnly from "@/components/ui/ClientOnly";
import ChartWrapper from "@/components/ui/ChartWrapper";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const HISTORY_DATA = [
  { year: "2021", ctc: 1200000 },
  { year: "2022", ctc: 1320000 },
  { year: "2023", ctc: 1500000 },
  { year: "2024", ctc: 1800000 },
];

const REVISIONS = [
  { date: "01 Oct 2024", prev: "₹15,00,000", newCTC: "₹18,00,000", pct: "+20%", type: "Promotion", reason: "Promoted to Sr. SE", status: "Active", c: "#00E5A0" },
  { date: "01 Oct 2023", prev: "₹13,20,000", newCTC: "₹15,00,000", pct: "+13.6%", type: "Annual Appraisal", reason: "Performance Cycle 22-23", status: "Past", c: "#0066FF" },
  { date: "01 Oct 2022", prev: "₹12,00,000", newCTC: "₹13,20,000", pct: "+10%", type: "Annual Appraisal", reason: "Performance Cycle 21-22", status: "Past", c: "#0066FF" },
  { date: "01 Jun 2021", prev: "—", newCTC: "₹12,00,000", pct: "—", type: "Joining", reason: "Initial CTC at joining", status: "Past", c: "#8899AA" },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

interface RevisionCardProps {
  date: string;
  prev: string;
  newCTC: string;
  pct: string;
  type: string;
  reason: string;
  status: string;
  c: string;
}

function RevisionCard({ date, prev, newCTC, pct, type, reason, status, c }: RevisionCardProps) {
  const isActive = status === "Active";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1A2A3A] bg-[#0D1928] p-6">
      {isActive && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-1 bg-[#00E5A0]"
        />
      )}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span className="text-[13px] font-medium text-[#8899AA]">
              Effective Date: {date}
            </span>
            <span
              className="rounded px-2 py-0.5 text-[11px] font-semibold"
              style={{ background: `${c}15`, color: c }}
            >
              {type}
            </span>
            {isActive && (
              <span className="rounded bg-[#00E5A0] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#060B14]">
                CURRENT
              </span>
            )}
          </div>
          <h3 className="text-base text-white">{reason}</h3>
        </div>
        <Button variant="ghost" size="sm">
          View Letter
        </Button>
      </div>

      <div className="grid grid-cols-[1fr_1fr_100px] items-center gap-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] px-5 py-4">
        <div>
          <div className="mb-1 text-[11px] text-[#8899AA]">Previous CTC</div>
          <div
            className="text-base"
            style={{
              textDecoration: prev !== "—" ? "line-through" : "none",
              color: prev !== "—" ? "#8899AA" : "#FFFFFF",
            }}
          >
            {prev}
          </div>
        </div>
        <div>
          <div className="mb-1 text-[11px] text-[#8899AA]">Revised CTC</div>
          <div
            className="text-xl font-bold"
            style={{ color: isActive ? "#00E5A0" : "#FFFFFF" }}
          >
            {newCTC}
          </div>
        </div>
        <div className="text-right">
          <div className="mb-1 text-[11px] text-[#8899AA]">Growth</div>
          <div
            className="flex items-center justify-end gap-1 text-base font-semibold"
            style={{ color: pct.startsWith("+") ? "#00E5A0" : "#445566" }}
          >
            {pct.startsWith("+") && <TrendingUp size={14} aria-hidden="true" />}
            {pct}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SalaryHistoryPage({ params }: { params: { id: string } }) {
  return (
    <Page
      title="Salary Revision History"
      subtitle="Rahul Kumar Sharma (EMP001)"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${params.id}/job-and-salary` },
        { label: "Salary History" },
      ]}
      maxWidth="1000px"
      actions={
        <Button variant="secondary" size="sm" icon={<Download size={14} aria-hidden="true" />}>
          Export Letter History
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        {/* Left: Revisions */}
        <div className="space-y-4">
          {REVISIONS.map((rev) => (
            <RevisionCard key={rev.date} {...rev} />
          ))}
        </div>

        {/* Right: Chart */}
        <div>
          <Card padding="md">
            <h3 className="mb-5 text-sm font-semibold text-white">Salary Growth Overview</h3>
            <ClientOnly>
              <ChartWrapper height="h-[200px]">
                <BarChart
                  data={HISTORY_DATA}
                  margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#8899AA", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#8899AA", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`}
                  />
                  <Tooltip
                    formatter={(v: unknown) => [
                      `₹${((v as number) / 100000).toFixed(1)}L`,
                      "CTC",
                    ]}
                    contentStyle={{
                      background: "#0D1928",
                      border: "1px solid #1A2A3A",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="ctc" fill="#0066FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartWrapper>
            </ClientOnly>
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-[rgba(0,102,255,0.1)] bg-[rgba(0,102,255,0.05)] p-3 text-xs text-[#8899AA]">
              <Info size={14} className="mt-0.5 shrink-0 text-[#0066FF]" aria-hidden="true" />
              <span>
                Total CTC growth since joining:{" "}
                <strong className="text-white">50%</strong> (from ₹12L to ₹18L over 3.5 years).
              </span>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
