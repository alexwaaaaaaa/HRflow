"use client";

import { ShieldCheck, CheckCircle, AlertTriangle, FileText, CheckSquare, Settings2, ShieldAlert } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Health breakdown items ──────────────────────────────────────────────────

const HEALTH_ITEMS = [
  { label: "Labor Law (State/Central)", icon: FileText, pct: 98, variant: "success" as const, note: null },
  { label: "Payroll Submissions (PF/ESI)", icon: CheckSquare, pct: 85, variant: "warning" as const, note: "1 Missing Integration Detected" },
  { label: "External Vendor Compliance", icon: ShieldAlert, pct: 76, variant: "danger" as const, note: "3 Visa Expiries Active" },
];

const PROGRESS_COLORS: Record<string, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ComplianceAIPage() {
  return (
    <Page
      title="AI Compliance Audit"
      subtitle="Continuous scanning of company policies against active employment contracts, payroll configurations, and recent gazette updates."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Compliance" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Settings2 size={14} />}>Audit Configurations</Button>
          <Button icon={<ShieldCheck size={14} />}>Run Full Scan</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score & Factors */}
        <div className="flex flex-col gap-6">
          {/* Score Donut */}
          <Card padding="lg" className="border-emerald-500/30 flex flex-col items-center text-center">
            <div className="text-[#8899AA] text-sm font-semibold uppercase tracking-widest mb-4">Overall Compliance Health</div>
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" aria-hidden="true">
                <circle cx="96" cy="96" r="88" stroke="#1A2A3A" strokeWidth="12" fill="none" />
                <circle cx="96" cy="96" r="88" stroke="#10b981" strokeWidth="12" fill="none" strokeDasharray="552.92" strokeDashoffset="55.29" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white">92</span>
                <span className="text-emerald-400 text-sm font-bold mt-1">/ 100</span>
              </div>
            </div>
            <p className="text-[#8899AA] text-xs leading-relaxed max-w-[200px]">
              Based on real-time statutory limits, policy configurations, and 4,402 active employee records.
            </p>
          </Card>

          {/* Health Breakdown */}
          <Card padding="lg">
            <h3 className="text-white font-semibold mb-6">Health Breakdown</h3>
            <div className="space-y-6">
              {HEALTH_ITEMS.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#8899AA] flex items-center gap-2">
                      <item.icon size={14} aria-hidden="true" /> {item.label}
                    </span>
                    <Badge variant={item.variant}>{item.pct}%</Badge>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={item.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={item.label}
                    className="w-full bg-[#1A2A3A] rounded-full h-1.5"
                  >
                    <div className={`${PROGRESS_COLORS[item.variant]} h-1.5 rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                  {item.note && (
                    <p className={`text-[10px] mt-1 uppercase tracking-wider font-semibold ${item.variant === "warning" ? "text-amber-500/80" : "text-red-400"}`}>
                      {item.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Audit Items */}
        <Card padding="none" className="lg:col-span-2 flex flex-col">
          <div className="px-6 py-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
            <h3 className="text-white font-semibold flex items-center gap-2">
              Detected Audit Flags
              <span className="bg-[#1A2A3A] text-[#8899AA] text-xs px-2 py-0.5 rounded ml-2">4 Active</span>
            </h3>
            <Badge variant="danger" dot>1 Critical</Badge>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Critical */}
            <Card padding="md" className="border-red-500/30 hover:border-red-500/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/10 text-red-400 p-2 rounded-lg">
                    <AlertTriangle size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Vendor Contract Violations (Visas)</h4>
                    <p className="text-xs text-[#8899AA] mt-0.5">Category: Vendor Management • Relates to ANM-902</p>
                  </div>
                </div>
                <Badge variant="danger">Critical Risk</Badge>
              </div>
              <div className="bg-[#0A1420] border border-[#2A3A4A] p-4 rounded-lg text-sm text-[#8899AA] leading-relaxed">
                AI has cross-referenced active IT contractors against Section 14 of the Foreigners Act.{" "}
                <strong className="text-white">3 individuals</strong> have expired Right-to-Work documentation while remaining active on vendor payroll API feeds.
                <div className="mt-3">
                  <Button variant="secondary" size="sm" href="/ai/anomaly-detection/ANM-902">View Anomaly</Button>
                </div>
              </div>
            </Card>

            {/* Medium */}
            <Card padding="md" className="border-amber-500/30 hover:border-amber-500/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 text-amber-500 p-2 rounded-lg">
                    <FileText size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Missing Form-11 (EPFO) Direct API Sync</h4>
                    <p className="text-xs text-[#8899AA] mt-0.5">Category: Payroll Integrations • Relates to GAZ-2023-09-C</p>
                  </div>
                </div>
                <Badge variant="warning">Medium Risk</Badge>
              </div>
              <div className="bg-[#0A1420] border border-[#2A3A4A] p-4 rounded-lg text-sm text-[#8899AA] leading-relaxed">
                A recently gazetted mandate requires native API submission for Form 11. Our current integration relies on scheduled batch CSV uploads which will be deprecated by Dec 31, 2023.
              </div>
            </Card>

            {/* Resolved */}
            <Card padding="md" className="border-emerald-500/30 opacity-60">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg">
                    <CheckCircle size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium line-through">Professional Tax Slabs Update (Maharashtra)</h4>
                    <p className="text-xs text-[#8899AA] mt-0.5">Auto-Actioned by Kaarya Payroll Engine on Sep 28</p>
                  </div>
                </div>
                <Badge variant="success">Resolved</Badge>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </Page>
  );
}
