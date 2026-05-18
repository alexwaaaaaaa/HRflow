"use client";

import { Search, Filter, AlertTriangle, ShieldAlert, RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";

const MONITORING_DATA = [
  { name: "Week 1", alerts: 2 },
  { name: "Week 2", alerts: 5 },
  { name: "Week 3", alerts: 1 },
  { name: "Week 4", alerts: 8 },
  { name: "Week 5", alerts: 3 },
];

type Severity = "Critical" | "High" | "Medium" | "Low";
type AlertStatus = "New" | "Investigating" | "Resolved";

interface MonitoringAlert {
  id: string;
  emp: string;
  role: string;
  type: string;
  severity: Severity;
  date: string;
  status: AlertStatus;
}

const ALERTS: MonitoringAlert[] = [
  { id: "CM-09", emp: "Vikram Batra", role: "Security Analyst", type: "Court Record Update", severity: "Critical", date: "2 hrs ago", status: "New" },
  { id: "CM-08", emp: "Anita Desai", role: "Finance Dir", type: "Credit Score Drop (CIBIL)", severity: "Medium", date: "1 day ago", status: "Investigating" },
  { id: "CM-07", emp: "Rahul Sharma", role: "SDE II", type: "Database Match (Watchlist)", severity: "High", date: "3 days ago", status: "New" },
  { id: "CM-06", emp: "Priya Patel", role: "Product Mgr", type: "Address Verification Resync", severity: "Low", date: "1 week ago", status: "Resolved" },
];

const SEVERITY_VARIANT: Record<Severity, "danger" | "warning" | "info" | "success"> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "success",
};

const STATUS_VARIANT: Record<AlertStatus, "danger" | "warning" | "success"> = {
  New: "danger",
  Investigating: "warning",
  Resolved: "success",
};

const COLUMNS: Column<MonitoringAlert>[] = [
  {
    key: "id",
    label: "Alert ID",
    render: (r) => <span className="font-mono text-sm text-[#8899AA]">{r.id}</span>,
  },
  {
    key: "employee",
    label: "Employee",
    render: (r) => (
      <div>
        <p className="text-sm font-bold text-white">{r.emp}</p>
        <p className="text-xs text-[#556677]">{r.role}</p>
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.emp,
  },
  {
    key: "type",
    label: "Alert Type",
    render: (r) => <span className="text-sm font-medium text-slate-300">{r.type}</span>,
  },
  {
    key: "severity",
    label: "Severity",
    align: "center",
    render: (r) => <Badge variant={SEVERITY_VARIANT[r.severity]}>{r.severity}</Badge>,
  },
  {
    key: "date",
    label: "Date",
    render: (r) => <span className="text-sm text-[#8899AA]">{r.date}</span>,
    hideOnMobile: true,
  },
  {
    key: "status",
    label: "Status",
    align: "center",
    render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: () => (
      <Button variant="secondary" size="sm">
        Review Case
      </Button>
    ),
  },
];

export default function ContinuousMonitoringPage() {
  return (
    <Page
      title="Continuous Monitoring"
      subtitle="Real-time risk alerts for active employees via continuous background screening."
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Monitoring" },
      ]}
      maxWidth="1200px"
      actions={
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded border border-dashed border-[#1A2A3A] bg-[#0A1420] px-3 py-1.5 text-xs text-[#556677]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00E5A0]" aria-hidden="true" />
            Monitoring Active
          </span>
          <Button variant="secondary" size="sm" icon={<RefreshCw size={18} aria-hidden="true" />} aria-label="Refresh monitoring data" />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats + Chart */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <Card padding="md">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-[#8899AA]">
                <ShieldAlert size={16} aria-hidden="true" /> Monitored Employees
              </div>
              <div className="mb-2 text-3xl font-bold text-white">342</div>
              <div className="text-xs text-[#00E5A0]">+12 enrolled this month</div>
            </Card>
            <Card padding="md" className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full border-b border-l border-rose-500/20 bg-rose-500/10" aria-hidden="true" />
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-[#8899AA]">
                <AlertTriangle size={16} className="text-rose-500" aria-hidden="true" /> Active Alerts
              </div>
              <div className="mb-2 text-3xl font-bold text-white">14</div>
              <div className="text-xs text-rose-500">3 critical requiring action</div>
            </Card>
          </div>

          <Card padding="lg" className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Alerts Generated (Rolling 30 Days)
              </h3>
              <select
                className="rounded border border-[#1A2A3A] bg-[#060B14] px-2 py-1 text-xs text-white outline-none transition-colors focus:border-[#0066FF]"
                aria-label="Filter alert type"
              >
                <option>All Types</option>
                <option>Criminal</option>
                <option>Financial</option>
              </select>
            </div>
            <div className="h-40">
              <ChartWrapper height="h-full">
                <LineChart data={MONITORING_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                  <XAxis dataKey="name" stroke="#556677" tick={{ fill: "#8899AA", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#556677" tick={{ fill: "#8899AA", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#0A1420", borderColor: "#1A2A3A", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                    cursor={{ stroke: "#2A3A4A" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="alerts"
                    stroke="#F43F5E"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#060B14", stroke: "#F43F5E" }}
                    activeDot={{ r: 6 }}
                    name="Alerts"
                  />
                </LineChart>
              </ChartWrapper>
            </div>
          </Card>
        </div>

        {/* Alerts table */}
        <Card padding="none">
          <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0D1928] px-4 py-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Recent Monitoring Alerts
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search employee..."
                  aria-label="Search employee"
                  className="h-8 w-48 rounded border border-[#1A2A3A] bg-[#060B14] pl-8 pr-3 text-sm text-white outline-none transition-colors focus:border-[#0066FF]"
                />
              </div>
              <Button variant="secondary" size="sm" icon={<Filter size={16} aria-hidden="true" />} aria-label="Filter alerts" />
            </div>
          </div>
          <div className="p-4">
            <DataTable<MonitoringAlert>
              data={ALERTS}
              columns={COLUMNS}
              rowKey={(r) => r.id}
              aria-label="Monitoring alerts"
            />
          </div>
        </Card>
      </div>
    </Page>
  );
}
