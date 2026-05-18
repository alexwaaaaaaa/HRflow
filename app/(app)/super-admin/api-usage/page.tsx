"use client";

import { Network, AlertCircle, Code2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

interface ApiConsumer {
  id: string;
  org: string;
  app: string;
  vol: string;
  limitPct: number;
  limitLabel: string;
  end: string;
  warn?: boolean;
  err?: boolean;
}

const CONSUMERS: ApiConsumer[] = [
  { id: "c1", org: "TechCorp India", app: "app_8f991d", vol: "1.2M", limitPct: 95, limitLabel: "95%", end: "GET /v1/employees", warn: true },
  { id: "c2", org: "Zenith Logistics", app: "app_2x11cv", vol: "450K", limitPct: 45, limitLabel: "45%", end: "POST /v1/attendance/punch" },
  { id: "c3", org: "Global Finance Ltd", app: "app_9k88pl", vol: "320K", limitPct: 32, limitLabel: "32%", end: "GET /v1/payroll/slips" },
  { id: "c4", org: "Apex Media Group", app: "app_11mxcq", vol: "89K", limitPct: 100, limitLabel: "100%", end: "GET /v1/leaves", err: true },
];

const COLUMNS: Column<ApiConsumer>[] = [
  {
    key: "org",
    label: "Organization",
    render: (r) => <span className="text-sm font-bold text-white">{r.org}</span>,
    sortable: true,
    sortValue: (r) => r.org,
  },
  {
    key: "app",
    label: "OAuth App ID",
    render: (r) => (
      <div className="flex items-center gap-2 text-[#8899AA] font-mono text-xs">
        <Code2 size={12} aria-hidden="true" /> {r.app}
      </div>
    ),
  },
  {
    key: "vol",
    label: "Volume (24h)",
    render: (r) => <span className="text-white font-mono text-sm">{r.vol}</span>,
    sortable: true,
    sortValue: (r) => r.vol,
  },
  {
    key: "limit",
    label: "Rate Limit Quota",
    render: (r) => (
      <div className="flex items-center gap-2">
        <div className="w-24 h-1.5 bg-[#131B2B] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${r.err ? "bg-rose-500" : r.warn ? "bg-amber-500" : "bg-emerald-500"}`}
            style={{ width: r.limitLabel }}
          />
        </div>
        <span className={`text-xs font-bold ${r.err ? "text-rose-400" : r.warn ? "text-amber-400" : "text-emerald-400"}`}>
          {r.limitLabel}
        </span>
      </div>
    ),
  },
  {
    key: "end",
    label: "Top Endpoint",
    render: (r) => <span className="text-[#8899AA] font-mono text-xs">{r.end}</span>,
    hideOnMobile: true,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: (r) =>
      r.err ? (
        <Button variant="danger" size="sm">
          Throttle App
        </Button>
      ) : null,
  },
];

export default function APIUsagePage() {
  return (
    <Page
      title="Global API Traffic Control"
      subtitle="Monitor public B2B API usage, rate limit enforcement, and Webhook deliveries across all tenants."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "API Usage" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">2.4M</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Reqs (Last 24h)</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">99.9%</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Success Rate (2xx)</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-amber-400 mb-1">45K</div>
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Rate Limited (429)</div>
          </Card>
          <Card padding="md">
            <div className="flex justify-between items-start mb-1">
              <div className="text-3xl font-black text-rose-400">12</div>
              <AlertCircle size={20} className="text-rose-400" aria-hidden="true" />
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Failed Webhooks (5xx)</div>
          </Card>
        </div>

        {/* Heavy integrators table */}
        <Card padding="none">
          <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
            <Network size={18} className="text-[#556677]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white">Heavy Integrators (Top Consumers)</h2>
          </div>
          <div className="p-4">
            <DataTable<ApiConsumer>
              data={CONSUMERS}
              columns={COLUMNS}
              rowKey={(r) => r.id}
              searchable
              searchPlaceholder="Search Tenant/App..."
              aria-label="API consumers"
            />
          </div>
        </Card>
      </div>
    </Page>
  );
}
