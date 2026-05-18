"use client";

import { UserMinus, TrendingDown, MessageSquareX } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

interface ChurnRow {
  id: string;
  org: string;
  mrr: string;
  time: string;
  reason: string;
}

interface ChurnReason {
  id: string;
  name: string;
  pct: number;
}

const CHURN_REASONS: ChurnReason[] = [
  { id: "r1", name: "Missing Features / Integrations", pct: 45 },
  { id: "r2", name: "Switched to Cheaper Alternative", pct: 28 },
  { id: "r3", name: "Company Downsizing / Out of Business", pct: 15 },
  { id: "r4", name: "Poor Onboarding Experience", pct: 8 },
  { id: "r5", name: "Technical / Performance Issues", pct: 4 },
];

const CANCELLATIONS: ChurnRow[] = [
  { id: "c1", org: "StartUp XYZ Pvt Ltd", mrr: "$450", time: "14 Months", reason: "We needed deeper integration with Jira for time tracking. Moving to another vendor." },
  { id: "c2", org: "Local Retailers Corp", mrr: "$1,200", time: "6 Months", reason: "System was too complex for our blue-collar workforce." },
  { id: "c3", org: "Tech Innovators", mrr: "$800", time: "2 Years", reason: "Company acquired, consolidating HR systems onto parent company's platform Workday." },
  { id: "c4", org: "Sunset Bakery", mrr: "$150", time: "3 Months", reason: "Downsizing staff, no longer need an HR system." },
];

const COLUMNS: Column<ChurnRow>[] = [
  {
    key: "org",
    label: "Organization",
    render: (r) => <span className="text-white font-bold">{r.org}</span>,
    sortable: true,
    sortValue: (r) => r.org,
  },
  {
    key: "mrr",
    label: "Lost MRR",
    render: (r) => <span className="text-rose-400 font-mono font-bold text-xs">{r.mrr}</span>,
  },
  {
    key: "time",
    label: "Tenure",
    render: (r) => <span className="text-[#8899AA] text-xs">{r.time}</span>,
  },
  {
    key: "reason",
    label: "Exit Survey Note",
    render: (r) => (
      <div className="flex items-start gap-2 max-w-xs whitespace-normal line-clamp-2 text-xs text-[#556677] italic">
        <MessageSquareX size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
        &ldquo;{r.reason}&rdquo;
      </div>
    ),
  },
];

export default function ChurnPage() {
  return (
    <Page
      title="Customer Churn Diagnostics"
      subtitle="Analyze off-boarding telemetry, cancellation reasons, and lost ARR."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Churn" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="text-3xl font-black text-rose-400 mb-1">1.2%</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Logo Churn (MoM)</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-rose-400 mb-1 flex items-center gap-2">
              $14.5K <TrendingDown size={14} aria-hidden="true" />
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Gross MRR Churn</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-emerald-400 mb-1">-2.4%</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Net MRR Churn (Negative is good)</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">8 Months</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Avg Lifetime of Churned (LTV)</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cancellation reasons */}
          <Card padding="lg">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#1A2A3A] pb-4 mb-6">
              Primary Defection Drivers (YTD)
            </h2>
            <div className="space-y-6">
              {CHURN_REASONS.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between text-sm font-bold text-white mb-2">
                    <span>{item.name}</span>
                    <span className="text-[#8899AA]">{item.pct}%</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={item.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.name}: ${item.pct}%`}
                    className="h-1.5 w-full bg-[#131B2B] rounded-full overflow-hidden"
                  >
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent cancellations table */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
                <UserMinus size={18} className="text-rose-400" aria-hidden="true" />
                <h2 className="text-lg font-bold text-white">Recent Cancellations</h2>
              </div>
              <div className="p-4">
                <DataTable<ChurnRow>
                  data={CANCELLATIONS}
                  columns={COLUMNS}
                  rowKey={(r) => r.id}
                  aria-label="Recent cancellations"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
}
