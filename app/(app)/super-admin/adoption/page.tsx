"use client";

import { Rocket } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

interface AdoptionStat {
  label: string;
  val: string;
  trend: string;
}

interface FeatureRow {
  id: string;
  name: string;
  cat: string;
  orgs: number;
  emps: number;
  trend: number;
}

const KPI_STATS: AdoptionStat[] = [
  { label: "Core Payroll Enabled", val: "94%", trend: "+2%" },
  { label: "Using Custom Domains", val: "12%", trend: "+1.5%" },
  { label: "EWA (Insta-Pay) Active", val: "4%", trend: "+4%" },
  { label: "Mobile App Login (30d)", val: "82%", trend: "-1%" },
];

const FEATURES: FeatureRow[] = [
  { id: "f1", name: "Leave Application (Mobile)", cat: "Core", orgs: 98, emps: 85, trend: 1.2 },
  { id: "f2", name: "Automated Form 16", cat: "Payroll", orgs: 85, emps: 72, trend: 15.4 },
  { id: "f3", name: "Performance Appraisals", cat: "Talent", orgs: 42, emps: 38, trend: 4.5 },
  { id: "f4", name: "Pulse Surveys", cat: "Engagement", orgs: 28, emps: 15, trend: -2.1 },
  { id: "f5", name: "Earned Wage Access (EWA)", cat: "Fintek", orgs: 5, emps: 2, trend: 50.0 },
];

const COLUMNS: Column<FeatureRow>[] = [
  {
    key: "name",
    label: "Feature / Module Name",
    render: (r) => <span className="text-sm font-bold text-white">{r.name}</span>,
    sortable: true,
    sortValue: (r) => r.name,
  },
  {
    key: "cat",
    label: "Category",
    render: (r) => <Badge variant="neutral">{r.cat}</Badge>,
  },
  {
    key: "orgs",
    label: "Adoption (Active Orgs)",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-32 h-1.5 bg-[#131B2B] rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${r.orgs}%` }} />
        </div>
        <span className="text-xs font-bold text-white">{r.orgs}%</span>
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.orgs,
  },
  {
    key: "emps",
    label: "Adoption (Employees)",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-32 h-1.5 bg-[#131B2B] rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${r.emps}%` }} />
        </div>
        <span className="text-xs font-bold text-white">{r.emps}%</span>
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.emps,
  },
  {
    key: "trend",
    label: "Trend (90d)",
    align: "right",
    render: (r) => (
      <span className={`text-xs font-bold ${r.trend > 0 ? "text-emerald-400" : "text-rose-400"}`}>
        {r.trend > 0 ? "+" : ""}{r.trend}%
      </span>
    ),
    sortable: true,
    sortValue: (r) => r.trend,
  },
];

export default function FeatureAdoptionPage() {
  return (
    <Page
      title="Micro-Feature Adoption"
      subtitle="Measure penetration of specific platform capabilities (e.g., EWA, OKRs) across active tenants."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Feature Adoption" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_STATS.map((stat) => (
            <Card key={stat.label} padding="md">
              <div className="text-3xl font-black text-white mb-1 flex items-end gap-2">
                {stat.val}
                <span className={`text-[10px] font-bold pb-2 ${stat.trend.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Feature penetration table */}
        <Card padding="none">
          <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
            <Rocket size={18} className="text-indigo-400" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white">Feature Penetration Matrix</h2>
          </div>
          <div className="p-4">
            <DataTable<FeatureRow>
              data={FEATURES}
              columns={COLUMNS}
              rowKey={(r) => r.id}
              aria-label="Feature penetration matrix"
            />
          </div>
        </Card>
      </div>
    </Page>
  );
}
