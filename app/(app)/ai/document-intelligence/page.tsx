"use client";

import { useState } from "react";
import { FileText, Search, UploadCloud, ShieldCheck, CheckCircle2, AlertTriangle, Filter, Cpu } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import { seededFloats } from "@/lib/random";

// ─── Static data ────────────────────────────────────────────────────────────

type DocStatus = "Validated" | "Flagged" | "Failed";

interface DocRow {
  id: string;
  type: string;
  emp: string;
  score: number;
  status: DocStatus;
  time: string;
  issues: string[];
}

const DOCUMENTS: DocRow[] = [
  { id: "DOC-1004", type: "Offer Letter", emp: "Sneha Rao", score: 100, status: "Validated", time: "10 mins ago", issues: [] },
  { id: "DOC-1003", type: "NDA", emp: "Vikram Singh", score: 98, status: "Validated", time: "1 hr ago", issues: [] },
  { id: "DOC-1002", type: "Form 16", emp: "Arif Khan", score: 65, status: "Flagged", time: "3 hrs ago", issues: ["Mismatched PAN formatting", "Missing Employer Seal"] },
  { id: "DOC-1001", type: "Relieving Letter", emp: "Neha Gupta", score: 40, status: "Failed", time: "5 hrs ago", issues: ["Suspected Digital Tampering", "Invalid Company Registry"] },
];

// Seeded confidence bar widths
const CONF_SEEDS = seededFloats(7005, DOCUMENTS.length);

const SCORE_VARIANT: Record<string, "success" | "warning" | "danger"> = {
  Validated: "success",
  Flagged: "warning",
  Failed: "danger",
};

const DOC_COLUMNS: Column<DocRow>[] = [
  {
    key: "doc",
    label: "Document (ID)",
    render: (d) => (
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <FileText size={16} className="text-[#445566]" aria-hidden="true" />
          {d.type}
        </div>
        <div className="text-xs text-[#8899AA] font-mono mt-1 ml-6">{d.id}</div>
      </div>
    ),
    sortable: true,
    sortValue: (d) => d.type,
  },
  {
    key: "emp",
    label: "Employee",
    render: (d) => <span className="text-sm text-[#8899AA]">{d.emp}</span>,
  },
  {
    key: "score",
    label: "Confidence Score",
    render: (d, i) => (
      <div className="flex items-center gap-3">
        <div
          role="progressbar"
          aria-valuenow={d.score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Confidence score for ${d.type}`}
          className="w-16 bg-[#1A2A3A] h-1.5 rounded-full overflow-hidden"
        >
          <div
            className={`h-full ${d.score > 90 ? "bg-emerald-500" : d.score > 60 ? "bg-amber-500" : "bg-red-500"}`}
            style={{ width: `${CONF_SEEDS[i] !== undefined ? d.score : d.score}%` }}
          />
        </div>
        <Badge variant={SCORE_VARIANT[d.status]}>{d.score}%</Badge>
      </div>
    ),
    sortable: true,
    sortValue: (d) => d.score,
  },
  {
    key: "status",
    label: "Status / Issues",
    render: (d) =>
      d.status === "Validated" ? (
        <Badge variant="success">Processed</Badge>
      ) : (
        <div className="flex flex-col gap-1.5">
          <Badge variant={SCORE_VARIANT[d.status]}>{d.status}</Badge>
          <div className="text-xs text-[#8899AA] flex flex-col gap-0.5">
            {d.issues.map((iss, j) => <span key={j}>• {iss}</span>)}
          </div>
        </div>
      ),
  },
  {
    key: "action",
    label: "",
    align: "right",
    render: (d) =>
      d.status === "Validated" ? (
        <Button variant="secondary" size="sm">View Data</Button>
      ) : (
        <Button variant="danger" size="sm" href="/ai/document-ai">Manual Review</Button>
      ),
  },
];

const TABS = ["All Scans", "Failed Validation", "Pending Signatures", "Completed"] as const;
type TabType = (typeof TABS)[number];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DocumentIntelligencePage() {
  const [activeTab, setActiveTab] = useState<TabType>("All Scans");

  return (
        <Page
      title="Document Intelligence"
      subtitle="AI-powered OCR and verification engine for onboarding docs, tax forms, and compliance records. Auto-detects fraud and missing signatures."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Document Intelligence" },
      ]}
      maxWidth="1300px"
      actions={
        <>






          <Button variant="secondary" icon={<ShieldCheck size={14} />}>Train V2 Model</Button>
          <Button icon={<UploadCloud size={14} />}>Batch Upload Scans</Button>
        </>
      }
    >
      {/* Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card padding="md">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#1A2A3A] p-2 rounded-lg text-emerald-400">
              <CheckCircle2 size={18} aria-hidden="true" />
            </div>
            <h3 className="text-[#8899AA] text-sm font-medium">Auto-Validated (MTD)</h3>
          </div>
          <div className="text-3xl font-bold text-white">2,845</div>
          <div className="text-xs text-emerald-400 mt-2 font-medium">94% Automation Rate</div>
        </Card>

        <Card padding="md" className="border-red-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg text-red-400">
              <AlertTriangle size={18} aria-hidden="true" />
            </div>
            <h3 className="text-[#8899AA] text-sm font-medium">Fraud Detected</h3>
          </div>
          <div className="text-3xl font-bold text-red-400">14</div>
          <div className="text-xs text-red-500/80 mt-2 font-medium uppercase tracking-widest">+3 since yesterday</div>
        </Card>

        <Card padding="lg" className="lg:col-span-2 border-fuchsia-500/30 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Cpu size={20} className="text-fuchsia-400" aria-hidden="true" /> Parsing Engine Live
            </h3>
            <p className="text-[#8899AA] text-sm leading-relaxed max-w-md">
              Processing queue: <strong>42 documents remaining</strong>. Current extraction confidence averaging 99.1%.
            </p>
          </div>
          <div
            role="progressbar"
            aria-valuenow={99}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Parsing engine confidence"
            className="w-24 h-24 rounded-full border-[6px] border-[#1A2A3A] border-t-fuchsia-500 border-r-fuchsia-500 flex items-center justify-center animate-spin-slow shrink-0"
          >
            <div className="w-20 h-20 rounded-full border-[2px] border-[#2A3A4A] flex items-center justify-center bg-[#0D1928]">
              <span className="text-fuchsia-400 font-bold text-xl">99%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex space-x-1 bg-[#1A2A3A] p-1 rounded-xl" role="tablist" aria-label="Document filter tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-[#0D1928] text-white shadow shadow-black/20"
                  : "text-[#8899AA] hover:text-white hover:bg-[#2A3A4A]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="bg-[#0D1928] border border-[#2A3A4A] rounded-xl flex items-center px-3 py-2 flex-1 md:w-64 focus-within:border-fuchsia-500 transition-colors">
            <Search size={16} className="text-[#8899AA]" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search employee or ID…"
              className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full placeholder:text-[#445566]"
              aria-label="Search documents"
            />
          </div>
          <Button variant="secondary" icon={<Filter size={16} />} aria-label="Filter documents" />
        </div>
      </div>

      {/* Document Table */}
      <Card padding="none">
        <DataTable<DocRow>
          data={DOCUMENTS}
          columns={DOC_COLUMNS}
          rowKey={(d) => d.id}
          aria-label="Document intelligence queue"
        />
      </Card>

      {/* Decorative seeded values (hidden) */}
      <div className="sr-only" aria-hidden="true">
        {CONF_SEEDS.map((v, i) => <span key={i}>{v}</span>)}
      </div>
    

        

        

        </Page>
    );
}
