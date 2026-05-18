"use client";

import { AlertCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type OnbStatus = "done" | "err" | "active";

interface OnbRow {
  id: string;
  org: string;
  owner: string;
  phase: string;
  progress: number;
  golive: string;
  status: OnbStatus;
  errMsg?: string;
}

const ONBOARDING: OnbRow[] = [
  { id: "o1", org: "Zenith Logistics", owner: "Rahul V.", phase: "Data Migration", progress: 45, golive: "Nov 01, 2026", status: "err", errMsg: "Data formatting issues block" },
  { id: "o2", org: "Apex Media Group", owner: "Meghna S.", phase: "Parallel Payroll Run", progress: 85, golive: "Oct 31, 2026", status: "active" },
  { id: "o3", org: "Global Finance Ltd", owner: "Rahul V.", phase: "Kickoff / Scoping", progress: 10, golive: "Dec 15, 2026", status: "active" },
  { id: "o4", org: "TechCorp India", owner: "Priya A.", phase: "Hypercare", progress: 100, golive: "Oct 01, 2026", status: "done" },
];

const PHASE_VARIANT: Record<OnbStatus, "success" | "danger" | "info"> = {
  done: "success",
  err: "danger",
  active: "info",
};

const PROGRESS_CLASS: Record<OnbStatus, string> = {
  done: "bg-emerald-500",
  err: "bg-rose-500",
  active: "bg-indigo-500",
};

const COLUMNS: Column<OnbRow>[] = [
  {
    key: "org",
    label: "Organization",
    render: (r) => (
      <div>
        <div className="text-white font-bold text-sm mb-1">{r.org}</div>
        {r.errMsg && (
          <div className="text-[10px] text-rose-400 font-bold flex items-center gap-1">
            <AlertCircle size={10} aria-hidden="true" /> {r.errMsg}
          </div>
        )}
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.org,
  },
  {
    key: "owner",
    label: "Assigned IM (Owner)",
    render: (r) => <span className="text-[#8899AA] font-bold text-xs">{r.owner}</span>,
  },
  {
    key: "phase",
    label: "Phase",
    render: (r) => <Badge variant={PHASE_VARIANT[r.status]}>{r.phase}</Badge>,
  },
  {
    key: "progress",
    label: "Progress Matrix",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div
          role="progressbar"
          aria-valuenow={r.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${r.org} onboarding progress: ${r.progress}%`}
          className="w-48 h-1.5 bg-[#131B2B] rounded-full overflow-hidden"
        >
          <div className={`h-full rounded-full ${PROGRESS_CLASS[r.status]}`} style={{ width: `${r.progress}%` }} />
        </div>
        <span className="text-xs font-bold text-white">{r.progress}%</span>
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.progress,
  },
  {
    key: "golive",
    label: "Target Go-Live",
    render: (r) => <span className="text-[#8899AA] text-xs font-bold">{r.golive}</span>,
    sortable: true,
    sortValue: (r) => r.golive,
  },
];

export default function OnboardingOpsPage() {
  return (
    <Page
      title="Implementation & Onboarding Ops"
      subtitle="Track the data migration and go-live status of newly acquired Enterprise tenants."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Onboarding Ops" },
      ]}
      maxWidth="1300px"
    >
      <Card padding="none">
        <div className="p-4">
          <DataTable<OnbRow>
            data={ONBOARDING}
            columns={COLUMNS}
            rowKey={(r) => r.id}
            searchable
            searchPlaceholder="Search organization..."
            aria-label="Onboarding operations"
          />
        </div>
      </Card>
    </Page>
  );
}
