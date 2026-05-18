"use client";

import { useState } from "react";
import { Database, Search, CheckCircle2, AlertTriangle, ShieldCheck, RotateCw } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Types ───────────────────────────────────────────────────────────────────

type LogStatus = "Indexed" | "Quarantined";

interface DataLog {
  id: string;
  source: string;
  records: string;
  piiRedacted: boolean;
  date: string;
  status: LogStatus;
}

const DATA_LOGS: DataLog[] = [
  { id: "LOG-4092", source: "Recruiting (ATS)", records: "14,020", piiRedacted: true, date: "Oct 24, 2023", status: "Indexed" },
  { id: "LOG-4091", source: "Helpdesk Tickets", records: "2,805", piiRedacted: true, date: "Oct 23, 2023", status: "Indexed" },
  { id: "LOG-4090", source: "Performance Reviews", records: "850", piiRedacted: false, date: "Oct 22, 2023", status: "Quarantined" },
  { id: "LOG-4089", source: "Exit Interviews", records: "112", piiRedacted: true, date: "Oct 21, 2023", status: "Indexed" },
];

const TABS = ["Anonymized Logs", "Excluded PII", "Model Feedback Corpus", "Synthetic Data Gen"] as const;
type TabType = (typeof TABS)[number];

const LOG_COLUMNS: Column<DataLog>[] = [
  {
    key: "id",
    label: "Batch ID",
    render: (l) => <div className="text-sm font-medium text-white font-mono">{l.id}</div>,
    sortable: true,
    sortValue: (l) => l.id,
  },
  {
    key: "source",
    label: "Data Source",
    render: (l) => <span className="text-sm text-[#8899AA]">{l.source}</span>,
  },
  {
    key: "records",
    label: "Record Count",
    render: (l) => <span className="text-sm text-white font-medium">{l.records}</span>,
  },
  {
    key: "date",
    label: "Ingestion Date",
    render: (l) => <span className="text-sm text-[#8899AA]">{l.date}</span>,
  },
  {
    key: "pii",
    label: "PII Redaction",
    render: (l) =>
      l.piiRedacted ? (
        <Badge variant="info"><ShieldCheck size={12} aria-hidden="true" className="inline mr-1" />Passed</Badge>
      ) : (
        <Badge variant="danger"><AlertTriangle size={12} aria-hidden="true" className="inline mr-1" />Failed Check</Badge>
      ),
  },
  {
    key: "status",
    label: "",
    align: "right",
    render: (l) =>
      l.status === "Indexed" ? (
        <Badge variant="success"><CheckCircle2 size={12} aria-hidden="true" className="inline mr-1" />Indexed</Badge>
      ) : (
        <div className="flex justify-end gap-2">
          <Button variant="danger" size="sm">Purge</Button>
          <Button variant="secondary" size="sm">Run Masking script</Button>
        </div>
      ),
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AITrainingDataPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Anonymized Logs");

  return (
    <Page
      title="Training Data Vault"
      subtitle="Manage the specific proprietary datasets used to fine-tune Kaarya's embedded LLMs and prediction models. Includes automated PII stripping."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Training Data" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<ShieldCheck size={14} />}>Compliance Audit</Button>
          <Button icon={<RotateCw size={14} />}>Sync Datalake</Button>
        </>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card padding="md">
          <div className="flex items-center gap-4">
            <div className="bg-[#1A2A3A] p-3 rounded-xl border border-[#2A3A4A] text-[#8899AA]">
              <Database size={24} aria-hidden="true" />
            </div>
            <div>
              <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-1">Total Clean Records</div>
              <div className="text-2xl font-bold text-white">1.8M</div>
            </div>
          </div>
        </Card>

        <Card padding="md" className="border-cyan-500/20">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 text-cyan-400">
              <ShieldCheck size={24} aria-hidden="true" />
            </div>
            <div>
              <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-1">Automatically Redacted</div>
              <div className="text-2xl font-bold text-cyan-400">45.2k</div>
              <div className="text-[10px] text-cyan-500 mt-1 font-medium">Names, SSNs, Salaries</div>
            </div>
          </div>
        </Card>

        <Card padding="md" className="md:col-span-2 border-red-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-red-500 shrink-0">
                <AlertTriangle size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-1">Quarantine Alert: Performance Reviews</div>
                <div className="text-[#8899AA] text-xs leading-relaxed max-w-sm">
                  Batch LOG-4090 bypassed the PII redactor. It contains un-anonymized manager feedback. Data is isolated from model training.
                </div>
              </div>
            </div>
            <Button variant="danger" size="sm">Review</Button>
          </div>
        </Card>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex space-x-1 bg-[#1A2A3A] p-1 rounded-xl overflow-x-auto" role="tablist" aria-label="Training data filter tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-[#0D1928] text-white shadow shadow-black/20"
                  : "text-[#8899AA] hover:text-white hover:bg-[#2A3A4A]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bg-[#0D1928] border border-[#2A3A4A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-cyan-500/50 transition-colors w-full md:w-64">
          <Search size={16} className="text-[#8899AA]" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search batch ID or source…"
            className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full"
            aria-label="Search training data batches"
          />
        </div>
      </div>

      {/* Data Table */}
      <Card padding="none">
        <DataTable<DataLog>
          data={DATA_LOGS}
          columns={LOG_COLUMNS}
          rowKey={(l) => l.id}
          aria-label="Training data vault"
        />
      </Card>
    </Page>
  );
}
