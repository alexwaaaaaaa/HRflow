"use client";

import { FileText, ShieldCheck, Download, Calendar, Activity } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const REPORT_HISTORY = [
  { type: "SOC 2 Access Log Dump", period: "Sep 2026", by: "System Auto", date: "Oct 01, 2026" },
  { type: "DPDP Remediation Check", period: "Q3 2026", by: "Sanjay Dutt", date: "Sep 30, 2026" },
  { type: "ISO Asset Inventory", period: "2026 Snapshot", by: "Aditi Krishnan", date: "Aug 15, 2026" },
  { type: "Monthly Penetration Test Summary", period: "Jul 2026", by: "Security Vendor API", date: "Aug 01, 2026" },
];

export default function SecurityReportsPage() {
  return (
    <Page
      title="Compliance & Security Reports"
      subtitle="Generate automated audit summaries for SOC2, ISO 27001, and DPDP compliance."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Reports" },
      ]}
      maxWidth="1300px"
      actions={
        <Button>Generate Custom Report</Button>
      }
    >
      <div className="space-y-8">
        {/* Report cards */}
        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
          {/* SOC2 */}
          <Card padding="lg" className="group flex h-full flex-col hover:border-[#2A3A4A]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400">
              <ShieldCheck size={24} aria-hidden="true" />
            </div>
            <h2 className="mb-2 text-lg font-bold text-white">SOC 2 Type II Summary</h2>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-[#8899AA]">
              Aggregated access logs, change management trails, and incident response metrics mapped to TSC criteria (Security &amp; Confidentiality).
            </p>
            <div className="mt-auto flex items-center justify-between border-t border-[#1A2A3A] pt-4">
              <div className="font-mono text-xs text-[#556677]">Auto-updates Weekly</div>
              <button className="flex items-center gap-2 text-sm font-bold text-sky-400 transition-colors hover:text-sky-300">
                <Download size={16} aria-hidden="true" /> PDF
              </button>
            </div>
          </Card>

          {/* ISO 27001 */}
          <Card padding="lg" className="group flex h-full flex-col hover:border-[#2A3A4A]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <FileText size={24} aria-hidden="true" />
            </div>
            <h2 className="mb-2 text-lg font-bold text-white">ISO 27001 ISMS Output</h2>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-[#8899AA]">
              Information Security Management System documentation including risk assessments, asset inventory, and controls mapping.
            </p>
            <div className="mt-auto flex items-center justify-between border-t border-[#1A2A3A] pt-4">
              <div className="font-mono text-xs text-[#556677]">Quarterly Export</div>
              <button className="flex items-center gap-2 text-sm font-bold text-indigo-400 transition-colors hover:text-indigo-300">
                <Download size={16} aria-hidden="true" /> PDF
              </button>
            </div>
          </Card>

          {/* DPDP */}
          <Card padding="lg" className="group relative flex h-full flex-col overflow-hidden border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:border-emerald-500/50">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <Activity size={24} aria-hidden="true" />
            </div>
            <h2 className="relative z-10 mb-2 text-lg font-bold text-white">DPDP Act Readiness</h2>
            <p className="relative z-10 mb-6 flex-1 text-sm leading-relaxed text-[#8899AA]">
              Consent status matrix, data breach log (within 72 hours protocol), and data deletion tracking for independent auditors.
            </p>
            <div className="relative z-10 mt-auto flex items-center justify-between border-t border-[#1A2A3A] pt-4">
              <div className="font-mono text-xs text-emerald-500/70">Required by CERT-In</div>
              <button className="flex items-center gap-2 text-sm font-bold text-emerald-400 transition-colors hover:text-emerald-300">
                <Download size={16} aria-hidden="true" /> Export (CSV)
              </button>
            </div>
          </Card>
        </div>

        {/* Report history */}
        <Card padding="none" className="overflow-hidden">
          <div className="border-b border-[#1A2A3A] bg-[#060D1A] px-5 py-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <Calendar size={18} className="text-[#556677]" aria-hidden="true" /> Report Generation History
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" aria-label="Report generation history">
              <thead className="bg-[#0A1420] text-xs uppercase tracking-wider text-[#8899AA]">
                <tr>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Report Type</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Period Covered</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Generated By</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Date</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 text-right font-bold">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2A3A]">
                {REPORT_HISTORY.map((row, i) => (
                  <tr key={i} className="group transition-colors hover:bg-[#131B2B]">
                    <td className="px-6 py-4 font-medium text-white">{row.type}</td>
                    <td className="px-6 py-4 text-[#8899AA]">{row.period}</td>
                    <td className="px-6 py-4 text-[#556677]">{row.by}</td>
                    <td className="px-6 py-4 text-[#8899AA]">{row.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="ml-auto text-indigo-400 transition-colors hover:text-white"
                        aria-label={`Download ${row.type}`}
                      >
                        <Download size={18} aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Page>
  );
}
