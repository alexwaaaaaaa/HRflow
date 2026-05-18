"use client";

import React from "react";
import { AlertTriangle, ShieldCheck, Activity, Cpu } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AffectedEmployee {
  id: string;
  name: string;
  role: string;
  visaExpiry: string;
  status: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const affectedEmployees: AffectedEmployee[] = [
  { id: "V-8942", name: "James Wilson", role: "DevOps Lead", visaExpiry: "Oct 14, 2023 (Expired)", status: "Active (Warning)" },
  { id: "V-8945", name: "Maria Garcia", role: "Data Engineer", visaExpiry: "Oct 14, 2023 (Expired)", status: "Active (Warning)" },
  { id: "V-9102", name: "Chen Wei", role: "Frontend Dev", visaExpiry: "Oct 15, 2023 (Expired)", status: "Active (Warning)" },
];

const columns: Column<AffectedEmployee>[] = [
  { key: "id", label: "Vendor Emp ID", render: (r) => <span className="font-medium text-white">{r.id}</span> },
  { key: "name", label: "Name", render: (r) => <span className="text-[#8899AA]">{r.name}</span> },
  { key: "role", label: "Project / Role", render: (r) => <span className="text-[#8899AA]">{r.role}</span> },
  { key: "visaExpiry", label: "Visa Expiry Date", render: (r) => <span className="text-red-400 font-medium">{r.visaExpiry}</span> },
  {
    key: "status",
    label: "Access Status",
    render: () => (
      <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" /> Active (Warning)
      </span>
    ),
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AnomalyDetailPage() {
  return (
    <Page
      title="Alert ID: ANM-902"
      subtitle="Detected: Today at 08:42 AM IST · Category: Compliance / Right-to-Work"
      breadcrumbs={[
        { label: "AI", href: "/ai/anomaly-detection" },
        { label: "Anomaly Detection", href: "/ai/anomaly-detection" },
        { label: "ANM-902" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary">Ignore Anomaly</Button>
          <Button variant="danger" icon={<ShieldCheck size={16} aria-hidden="true" />} iconRight>
            Resolve &amp; Fix
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        {/* AI Root Cause Analysis */}
        <Card padding="lg" className="border-red-500/20 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"
          />

          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 relative z-10">
            <Cpu size={20} className="text-red-400" aria-hidden="true" /> AI Root Cause Analysis
          </h3>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-[#8899AA] text-sm leading-relaxed mb-6">
                Kaarya AI&apos;s compliance scanning agent has detected{" "}
                <strong className="text-white">3 active IT contractors</strong> currently scheduled
                on active payroll whose Indian Work Visas expired within the last 48 hours. The
                system failed to trigger the standard 30-day auto-renewal workflow due to a missing
                manager mapping in the external Vendor Management System (VMS) integration.
              </p>

              <div className="flex flex-col gap-3">
                <Card padding="md" className="flex items-start gap-4">
                  <Activity size={18} className="text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">Compliance Violation Risk</h4>
                    <p className="text-xs text-[#8899AA] leading-relaxed">
                      Allowing expired visa workers to remain active poses severe statutory penalties
                      under Section 14 of the Foreigners Act. Maximum penalty estimate: ₹15L + legal
                      action.
                    </p>
                  </div>
                </Card>
                <Card padding="md" className="border-amber-500/30 flex items-start gap-4">
                  <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">System Integration Failure</h4>
                    <p className="text-xs text-[#8899AA] leading-relaxed">
                      The API sync from &apos;VendorForce (VMS)&apos; silently dropped the{" "}
                      <code>manager_id</code> payload on Oct 1st, causing the auto-alert workflow to
                      dead-letter without notification.
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Meta Data Panel */}
            <Card padding="md" className="flex flex-col gap-4">
              <div>
                <div className="text-xs text-[#445566] uppercase tracking-wider mb-1 font-semibold">
                  Model Confidence
                </div>
                <div className="text-3xl font-bold text-emerald-400 font-mono">99.4%</div>
              </div>
              <div className="w-full h-px bg-[#1A2A3A]" />
              <div>
                <div className="text-xs text-[#445566] uppercase tracking-wider mb-1 font-semibold">
                  Affected Entities
                </div>
                <div className="text-xl font-bold text-white mb-2">3 Employees</div>
                <div className="flex -space-x-2" aria-label="Affected employees">
                  {["AB", "CD", "EF"].map((init) => (
                    <div
                      key={init}
                      aria-hidden="true"
                      className="w-8 h-8 rounded-full border-2 border-[#0A1420] bg-gradient-to-br from-[#1A2A3A] to-[#2A3A4A] flex items-center justify-center text-xs font-bold text-[#8899AA]"
                    >
                      {init}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-px bg-[#1A2A3A]" />
              <div>
                <div className="text-xs text-[#445566] uppercase tracking-wider mb-1 font-semibold">
                  Status
                </div>
                <Badge variant="danger" dot>
                  Active Violation
                </Badge>
              </div>
            </Card>
          </div>
        </Card>

        {/* Automation Remedies */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Recommended Prescriptive Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card padding="lg" className="border-red-500/40 hover:bg-[#131B2B] transition-colors relative overflow-hidden group">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-[100px] -translate-y-8 translate-x-8 transition-transform group-hover:scale-150"
              />
              <div className="flex justify-between items-start mb-2 relative z-10">
                <h4 className="text-white font-medium text-sm flex items-center gap-2">
                  <div
                    aria-hidden="true"
                    className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold text-white shadow shadow-red-500/50"
                  >
                    1
                  </div>
                  Suspend Payroll &amp; Access (API Trigger)
                </h4>
                <Badge variant="danger">Critical First Step</Badge>
              </div>
              <p className="text-[#8899AA] text-xs leading-relaxed mb-4 relative z-10">
                Instant suspension of IT access via Okta and halting upcoming pay cycle deposits
                until documentation is provided and verified.
              </p>
              <Button variant="danger" size="sm" className="w-full relative z-10">
                Execute Suspension Automation
              </Button>
            </Card>

            <Card padding="lg" className="border-blue-500/30 hover:bg-[#131B2B] transition-colors relative overflow-hidden group">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] -translate-y-8 translate-x-8 transition-transform group-hover:scale-150"
              />
              <div className="flex justify-between items-start mb-2 relative z-10">
                <h4 className="text-white font-medium text-sm flex items-center gap-2">
                  <div
                    aria-hidden="true"
                    className="w-4 h-4 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]"
                  >
                    2
                  </div>
                  Draft Emergency Vendor Comms
                </h4>
              </div>
              <p className="text-[#8899AA] text-xs leading-relaxed mb-4 relative z-10">
                Kaarya AI has prepared a formal notice to the VMS vendor regarding the SLA breach
                and requesting immediate document upload.
              </p>
              <Button size="sm" className="w-full relative z-10">
                Review &amp; Send Comm
              </Button>
            </Card>
          </div>
        </div>

        {/* Affected Records */}
        <DataTable
          data={affectedEmployees}
          columns={columns}
          rowKey={(r) => r.id}
          aria-label="Affected employee records"
        />
      </div>
    </Page>
  );
}
