"use client";

import { Laptop, Clock, AlertTriangle, Play, CheckCircle2, Siren } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function IncidentDetailPage({ params: _params }: { params: { id: string } }) {
  const defaultId = "INC-2026-089";

  return (
    <Page
      title={`Lost Corporate Laptop (${defaultId})`}
      subtitle="Incident response tracking and automated playbook execution."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Incidents", href: "/security/incidents" },
        { label: defaultId },
      ]}
      maxWidth="1200px"
      actions={
        <div className="flex items-center gap-3">
          <Button variant="secondary">Assign Owner</Button>
          <Button>Mark Resolved</Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-1">
          <Card padding="lg">
            <h3 className="mb-4 border-b border-[#1A2A3A] pb-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
              Incident Metadata
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-[#556677]">Reported By</label>
                <div className="text-sm font-medium text-white">Aditi Krishnan (VP Eng)</div>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-[#556677]">Time of Report</label>
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <Clock size={14} className="text-[#8899AA]" aria-hidden="true" /> Oct 24, 2026 - 14:30 IST
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-[#556677]">Severity</label>
                <div className="flex items-center gap-2 text-sm font-bold text-rose-400">
                  <AlertTriangle size={14} aria-hidden="true" /> High Risk (Hardware)
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-[#556677]">Status</label>
                <Badge variant="info">
                  <Siren size={12} aria-hidden="true" className="mr-1" /> Investigating
                </Badge>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="mb-4 flex items-center gap-2 border-b border-[#1A2A3A] pb-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
              <Laptop size={16} aria-hidden="true" /> Compromised Asset
            </h3>
            <div className="rounded-xl border border-[#2A3A4A] bg-[#131B2B] p-4">
              <div className="mb-1 font-bold text-white">MacBook Pro 16&quot; (M2)</div>
              <div className="mb-4 font-mono text-xs text-[#8899AA]">SN: F02F3A99XLK</div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-2">
                  <span className="text-[#556677]">MDM Status</span>
                  <span className="font-bold text-white">Unreachable (Offline)</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-2">
                  <span className="text-[#556677]">FileVault Encryption</span>
                  <span className="font-bold text-emerald-400">Verified ON</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#556677]">Assigned User</span>
                  <span className="text-right font-bold text-white">Ravi K. (EMP-1022)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Playbook */}
          <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" aria-hidden="true" />
            <h3 className="relative z-10 mb-2 flex items-center gap-2 text-lg font-bold text-white">
              <Play size={18} className="text-indigo-400" aria-hidden="true" /> Security Response Playbook
            </h3>
            <p className="relative z-10 mb-6 text-sm text-[#8899AA]">
              Automated steps initiated based on the &ldquo;Hardware Loss&rdquo; SOAR playbook.
            </p>
            <div className="relative z-10 space-y-3">
              {[
                { done: true, label: "Force logout user EMP-1022 from all active web sessions", note: "Auto-executed" },
                { done: true, label: "Invoke MDM remote wipe command (Pending device check-in)", note: "Queued by MDM" },
                { done: false, label: "Revoke VPN and internal CA certificates", action: "Run Action" },
                { done: false, label: "File First Information Report (FIR) / Police report", action: "Mark Done" },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-xl border p-4 ${
                    step.done ? "border-emerald-500/20 bg-[#0A1420]" : "border-[#2A3A4A] bg-[#131B2B]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {step.done ? (
                      <CheckCircle2 size={18} className="text-emerald-500" aria-hidden="true" />
                    ) : (
                      <div className="h-4 w-4 shrink-0 rounded-full border-2 border-[#556677]" aria-hidden="true" />
                    )}
                    <span className={`text-sm font-medium ${step.done ? "text-emerald-400" : "text-white"}`}>
                      {step.label}
                    </span>
                  </div>
                  {step.note && (
                    <span className="text-[10px] font-bold uppercase text-[#556677]">{step.note}</span>
                  )}
                  {step.action && (
                    <button className="text-xs font-bold text-indigo-400 transition-colors hover:text-indigo-300">
                      {step.action}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Investigation notes */}
          <Card padding="none" className="overflow-hidden">
            <div className="border-b border-[#1A2A3A] bg-[#060D1A] px-5 py-5">
              <h3 className="text-lg font-bold text-white">Investigation Notes</h3>
            </div>
            <div className="space-y-6 p-6">
              <div className="relative">
                <label htmlFor="incident-note" className="sr-only">Add investigation note</label>
                <textarea
                  id="incident-note"
                  className="h-[100px] w-full resize-none rounded-xl border border-[#2A3A4A] bg-[#131B2B] p-4 text-sm text-white outline-none transition-colors focus:border-indigo-500"
                  placeholder="Add notes, updates, or attach incident proofs..."
                />
                <Button size="sm" className="absolute bottom-3 right-3">Post Note</Button>
              </div>

              <div className="ml-2 mt-8 space-y-6 border-l-2 border-[#1A2A3A] pl-6">
                <div className="relative">
                  <div className="absolute -left-[31px] bg-[#0A1420] p-1">
                    <div className="h-3 w-3 rounded-full bg-[#2A3A4A]" aria-hidden="true" />
                  </div>
                  <div className="mb-1 text-xs font-bold uppercase text-[#556677]">Oct 24, 2026 - 15:10 IST</div>
                  <div className="rounded-xl border border-[#2A3A4A] bg-[#131B2B] p-4">
                    <p className="mb-2 text-sm text-white">
                      User reported leaving laptop in an Uber. Attempted to track via Find My Mac, but device is completely offline. Encryption is confirmed active.
                    </p>
                    <div className="text-xs text-[#8899AA]">- Sanjay (Security Ops)</div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] bg-[#0A1420] p-1">
                    <div className="h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.5)]" aria-hidden="true" />
                  </div>
                  <div className="mb-1 text-xs font-bold uppercase text-[#556677]">Oct 24, 2026 - 14:30 IST</div>
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                    <p className="text-sm font-bold text-rose-400">Incident Declared</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
