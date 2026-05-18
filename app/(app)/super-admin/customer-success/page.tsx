"use client";

import { MoreVertical } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type AccountStatus = "good" | "warn" | "err";

interface CsAccount {
  id: string;
  org: string;
  csm: string;
  score: number;
  onb: string;
  last: string;
  status: AccountStatus;
}

const ACCOUNTS: CsAccount[] = [
  { id: "a1", org: "TechCorp India", csm: "Meghna S.", score: 98, onb: "100% Completed", last: "2 days ago", status: "good" },
  { id: "a2", org: "Global Finance Ltd", csm: "Rahul V.", score: 85, onb: "100% Completed", last: "1 week ago", status: "good" },
  { id: "a3", org: "Zenith Logistics", csm: "Meghna S.", score: 62, onb: "Stalled at Payroll Setup", last: "3 weeks ago", status: "warn" },
  { id: "a4", org: "Sunset Technologies", csm: "Unassigned", score: 24, onb: "0% - Abandoned", last: "2 months ago", status: "err" },
];

const SCORE_VARIANT: Record<AccountStatus, "success" | "warning" | "danger"> = {
  good: "success",
  warn: "warning",
  err: "danger",
};

const COLUMNS: Column<CsAccount>[] = [
  {
    key: "org",
    label: "Organization",
    render: (r) => <span className="text-white font-bold">{r.org}</span>,
    sortable: true,
    sortValue: (r) => r.org,
  },
  {
    key: "csm",
    label: "CSM / AE Owner",
    render: (r) => (
      <div className="flex items-center gap-2 text-[#8899AA] text-xs font-bold">
        <div
          aria-hidden="true"
          className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[8px] uppercase"
        >
          {r.csm.substring(0, 2)}
        </div>
        {r.csm}
      </div>
    ),
  },
  {
    key: "score",
    label: "Health Score",
    render: (r) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-[#131B2B] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${r.status === "err" ? "bg-rose-500" : r.status === "warn" ? "bg-amber-500" : "bg-emerald-500"}`}
            style={{ width: `${r.score}%` }}
          />
        </div>
        <Badge variant={SCORE_VARIANT[r.status]}>{r.score}</Badge>
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.score,
  },
  {
    key: "onb",
    label: "Onboarding Status",
    render: (r) => <span className="text-[#8899AA] text-xs">{r.onb}</span>,
    hideOnMobile: true,
  },
  {
    key: "last",
    label: "Last Touch",
    render: (r) => <span className="text-[#556677] text-xs">{r.last}</span>,
    hideOnMobile: true,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: () => (
      <Button variant="ghost" size="sm" icon={<MoreVertical size={16} />} aria-label="More actions" />
    ),
  },
];

export default function CustomerSuccessPage() {
  return (
    <Page
      title="Customer Success Center"
      subtitle="Monitor workspace health scores, onboarding velocity, and enterprise account management."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Customer Success" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">92.4</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Avg Health Score (0-100)</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-indigo-400 mb-1">14 Days</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Time to First Value (TTFV)</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-amber-400 mb-1">28</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">At-Risk Accounts</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-emerald-400 mb-1">$2.1M</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Expansion Pipeline (ARR)</div>
          </Card>
        </div>

        {/* Accounts table */}
        <Card padding="none">
          <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap items-center justify-between gap-3 bg-[#060D1A]">
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">My Accounts</Button>
              <Button variant="secondary" size="sm">Show At-Risk Only</Button>
            </div>
          </div>
          <div className="p-4">
            <DataTable<CsAccount>
              data={ACCOUNTS}
              columns={COLUMNS}
              rowKey={(r) => r.id}
              searchable
              searchPlaceholder="Search accounts..."
              aria-label="Customer success accounts"
            />
          </div>
        </Card>
      </div>
    </Page>
  );
}
