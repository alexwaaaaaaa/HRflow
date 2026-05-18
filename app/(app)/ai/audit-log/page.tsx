"use client";

import {
  Filter,
  DownloadCloud,
  AlertTriangle,
  ArrowRight,
  User as UserIcon,
  Calendar,
  Activity,
  CheckCircle2,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static data ────────────────────────────────────────────────────────────

interface LogRow {
  id: string;
  time: string;
  user: string;
  action: string;
  target: string;
  status: string;
  risk: "Critical" | "High" | "Medium" | "Low";
}

const LOGS: LogRow[] = [
  { id: "ADT-9042", time: "10:42 AM", user: "System (AI Core)", action: "Salary Benchmarking Adjust", target: "Offer Req REQ-102", status: "Auto-Executed", risk: "Low" },
  { id: "ADT-9041", time: "09:15 AM", user: "Vikram S. (Recruiter)", action: "Override AI Prediction", target: "Candidate: Jane Doe", status: "Manual Override", risk: "Medium" },
  { id: "ADT-9040", time: "Yesterday", user: "Priya R. (HR Admin)", action: "Batch Approve OCR Data", target: "Payroll Batch (145 records)", status: "Approved", risk: "High" },
  { id: "ADT-9039", time: "Yesterday", user: "System (AI Core)", action: "Detect Flight Risk", target: "Aditi Sharma (Eng)", status: "Alert Generated", risk: "Low" },
  { id: "ADT-9038", time: "Oct 24", user: "Administrator", action: "Update AI Model Weights", target: "Attrition Prediction", status: "Config Changed", risk: "Critical" },
];

const RISK_VARIANT: Record<string, "danger" | "warning" | "info" | "neutral" | "purple"> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "neutral",
};

const LOG_COLUMNS: Column<LogRow>[] = [
  {
    key: "event",
    label: "Event ID / Time",
    render: (l) => (
      <div>
        <div className="text-sm font-medium text-white font-mono">{l.id}</div>
        <div className="text-xs text-[#8899AA] mt-1 flex items-center gap-1">
          <Calendar size={10} aria-hidden="true" /> {l.time}
        </div>
      </div>
    ),
    sortable: true,
    sortValue: (l) => l.id,
  },
  {
    key: "actor",
    label: "Actor",
    render: (l) => (
      <div className="text-sm text-white flex items-center gap-2">
        {l.user.includes("System") ? (
          <Activity size={14} className="text-violet-400" aria-hidden="true" />
        ) : (
          <UserIcon size={14} className="text-[#8899AA]" aria-hidden="true" />
        )}
        {l.user}
      </div>
    ),
  },
  {
    key: "action",
    label: "Action Taken",
    render: (l) => <span className="text-sm text-[#8899AA]">{l.action}</span>,
  },
  {
    key: "target",
    label: "Target Resource",
    render: (l) => <span className="text-sm text-white font-medium">{l.target}</span>,
  },
  {
    key: "outcome",
    label: "Outcome",
    render: (l) => (
      <div className="flex items-center gap-1.5">
        {l.risk === "Critical" ? (
          <AlertTriangle size={12} aria-hidden="true" />
        ) : l.status === "Manual Override" ? (
          <UserIcon size={12} aria-hidden="true" />
        ) : (
          <CheckCircle2 size={12} aria-hidden="true" />
        )}
        <Badge variant={l.status === "Manual Override" ? "purple" : RISK_VARIANT[l.risk]}>{l.status}</Badge>
      </div>
    ),
  },
  {
    key: "details",
    label: "",
    align: "right",
    render: () => (
      <Button variant="secondary" size="sm" iconRight={<ArrowRight size={12} />}>
        View Playback
      </Button>
    ),
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AIAuditLogPage() {
  return (
    <Page
      title="AI Audit Trail"
      subtitle="Immutable ledger of all AI-driven decisions, autonomous actions, and human overrides for compliance and traceability."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Audit Log" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Filter size={14} />}>Advanced Filter</Button>
          <Button icon={<DownloadCloud size={14} />}>Export to CSV</Button>
        </>
      }
    >
      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card padding="md">
          <div className="flex items-center gap-4">
            <div className="bg-[#1A2A3A] p-3 rounded-xl border border-[#2A3A4A] text-[#8899AA]">
              <Activity size={24} aria-hidden="true" />
            </div>
            <div>
              <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-1">Total AI Actions (MTD)</div>
              <div className="text-2xl font-bold text-white">4,802</div>
            </div>
          </div>
        </Card>

        <Card padding="md" className="border-violet-500/20">
          <div className="flex items-center gap-4">
            <div className="bg-violet-500/10 p-3 rounded-xl border border-violet-500/20 text-violet-400">
              <UserIcon size={24} aria-hidden="true" />
            </div>
            <div>
              <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-1">Human Overrides</div>
              <div className="text-2xl font-bold text-violet-400">1.4%</div>
              <div className="text-[10px] text-violet-500 mt-1 font-medium">-0.2% vs last month</div>
            </div>
          </div>
        </Card>

        <Card padding="md" className="md:col-span-2 border-amber-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-500 shrink-0">
                <AlertTriangle size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-1">Unusual Activity Detected</div>
                <div className="text-[#8899AA] text-xs leading-relaxed max-w-sm">
                  Elevated rate of manual overrides on the Attrition Prediction model by Engineering Managers in the last 48 hours. Suggests model drift.
                </div>
              </div>
            </div>
            <Button variant="secondary" size="sm">Investigate</Button>
          </div>
        </Card>
      </div>

      {/* Audit Table */}
      <Card padding="none">
        <DataTable<LogRow>
          data={LOGS}
          columns={LOG_COLUMNS}
          rowKey={(l) => l.id}
          searchable
          searchPlaceholder="Search by event ID, user, or resource…"
          aria-label="AI audit trail"
        />
      </Card>
    </Page>
  );
}
