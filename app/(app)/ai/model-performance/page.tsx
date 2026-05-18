"use client";

import { Activity, FileJson, Zap, Server, BarChart2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import { seededFloats } from "@/lib/random";
import { AreaChart, Area } from "recharts";

// ─── Static data ────────────────────────────────────────────────────────────

const LATENCY_DATA = [
  { time: "08:00", ms: 142 }, { time: "09:00", ms: 155 },
  { time: "10:00", ms: 198 }, { time: "11:00", ms: 220 },
  { time: "12:00", ms: 180 }, { time: "13:00", ms: 145 },
];

interface ModelRow {
  model: string;
  version: string;
  accuracy: number;
}

const ACCURACY_DATA: ModelRow[] = [
  { model: "Document AI (OCR)", version: "v4.2.0", accuracy: 99.2 },
  { model: "Attrition Predictor", version: "v4.2.1", accuracy: 94.5 },
  { model: "NL Query Intent", version: "v4.2.2", accuracy: 96.8 },
  { model: "Compensation Opt", version: "v4.2.3", accuracy: 91.2 },
  { model: "Gazette Parser", version: "v4.2.4", accuracy: 98.1 },
];

// Seeded decorative accuracy bar widths
const ACC_SEEDS = seededFloats(7009, ACCURACY_DATA.length);

const MODEL_COLUMNS: Column<ModelRow>[] = [
  {
    key: "model",
    label: "Model Name",
    render: (m) => <div className="text-sm font-medium text-white">{m.model}</div>,
    sortable: true,
    sortValue: (m) => m.model,
  },
  {
    key: "version",
    label: "Version",
    render: (m) => <span className="text-xs text-[#8899AA] font-mono">{m.version}</span>,
  },
  {
    key: "accuracy",
    label: "Accuracy / F1 Score",
    render: (m, i) => (
      <div className="flex items-center gap-3">
        <div
          role="progressbar"
          aria-valuenow={m.accuracy}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${m.model} accuracy`}
          className="w-16 bg-[#1A2A3A] h-1.5 rounded-full overflow-hidden"
        >
          <div
            className="bg-indigo-500 h-full rounded-full"
            style={{ width: `${ACC_SEEDS[i] !== undefined ? m.accuracy : m.accuracy}%` }}
          />
        </div>
        <span className="text-sm font-bold text-white">{m.accuracy}%</span>
      </div>
    ),
    sortable: true,
    sortValue: (m) => m.accuracy,
  },
  {
    key: "validation",
    label: "Validation Data",
    render: () => <span className="text-xs text-[#8899AA]">Auto-sampled (24h)</span>,
  },
  {
    key: "status",
    label: "",
    align: "right",
    render: () => <Badge variant="success">Active</Badge>,
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AIModelPerformancePage() {
  return (
    <Page
      title="AI Model Performance"
      subtitle="Technical observability dashboard for Kaarya's embedded machine learning models, inference latency, and prediction accuracy drift."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Model Performance" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="secondary" icon={<FileJson size={14} />}>Download Logs</Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Global Metrics Sidebar */}
        <div className="flex flex-col gap-6">
          <Card padding="md">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={16} className="text-emerald-400" aria-hidden="true" />
              <h3 className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider">System Status</h3>
            </div>
            <div className="text-xl font-bold text-white mb-3">All Models Operational</div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" /> 99.99% Uptime (MTD)
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-3 mb-2">
              <Activity size={16} className="text-blue-400" aria-hidden="true" />
              <h3 className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider">Inference Latency</h3>
            </div>
            <div className="text-2xl font-bold text-white">142 <span className="text-sm font-normal text-[#8899AA]">ms</span></div>
            <div className="h-16 mt-4 -ml-4 -mb-2">
              <ClientOnly>
                <ChartWrapper height="h-full">
                  <AreaChart data={LATENCY_DATA}>
                    <Area type="monotone" dataKey="ms" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ChartWrapper>
              </ClientOnly>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-3 mb-2">
              <Server size={16} className="text-purple-400" aria-hidden="true" />
              <h3 className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider">API Requests (24h)</h3>
            </div>
            <div className="text-2xl font-bold text-white">124.5k</div>
            <div className="text-xs text-[#8899AA] mt-2">+12% vs prior day</div>
          </Card>
        </div>

        {/* Model Registry */}
        <Card padding="none" className="lg:col-span-3 flex flex-col">
          <div className="px-6 py-5 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <BarChart2 size={18} className="text-[#8899AA]" aria-hidden="true" /> Model Registry & Accuracy
            </h3>
            <Badge variant="success">No active drift detected</Badge>
          </div>
          <DataTable<ModelRow>
            data={ACCURACY_DATA}
            columns={MODEL_COLUMNS}
            rowKey={(m) => m.model}
            aria-label="AI model registry and accuracy"
          />
        </Card>
      </div>

      {/* Decorative seeded values (hidden) */}
      <div className="sr-only" aria-hidden="true">
        {ACC_SEEDS.map((v, i) => <span key={i}>{v}</span>)}
      </div>
    </Page>
  );
}
