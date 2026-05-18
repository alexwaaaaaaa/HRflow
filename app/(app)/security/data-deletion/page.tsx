"use client";

import { Trash2, AlertTriangle, UserX, Clock, CheckCircle2, XCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function DataDeletionRequestPage() {
  return (
    <Page
      title="Right to be Forgotten (Data Erasure)"
      subtitle="Review applications from separated employees to permanently purge their PII."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Data Deletion" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-8">
        {/* Compliance warning */}
        <div className="flex items-start gap-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
          <AlertTriangle size={24} className="mt-1 shrink-0 text-rose-400" aria-hidden="true" />
          <div>
            <h3 className="mb-2 font-bold text-rose-400">Legal Hold Restrictions Apply</h3>
            <p className="max-w-4xl text-sm leading-relaxed text-[#8899AA]">
              Before approving personal data erasure under the DPDP Act, ensure no legal holds exist. Basic employment records (Tax, PF, Compliance) MUST be retained for statutory periods (usually 7–8 years) regardless of erasure requests. Only non-essential PII (photos, biometric data, personal emergency contacts) will be permanently deleted or irreversibly anonymized.
            </p>
          </div>
        </div>

        {/* Pending requests */}
        <div>
          <h3 className="mb-4 border-b border-[#1A2A3A] pb-2 text-sm font-bold uppercase tracking-wider text-white">
            Pending Approvals
          </h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Request 1 — clear to purge */}
            <Card padding="lg">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#131B2B] text-[#556677]">
                    <UserX size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Vikram Singh</h4>
                    <div className="text-sm text-[#8899AA]">EMP-2041 • Separated: Aug 2025</div>
                  </div>
                </div>
                <Badge variant="warning">
                  <Clock size={12} aria-hidden="true" className="mr-1" /> Due in 4 Days
                </Badge>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-3 text-sm">
                  <span className="text-[#8899AA]">Statutory Hold Check</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <CheckCircle2 size={14} aria-hidden="true" /> Clear to Purge
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-3 text-sm">
                  <span className="text-[#8899AA]">Active Grievances</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <CheckCircle2 size={14} aria-hidden="true" /> None Found
                  </span>
                </div>
                <div className="rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-3 text-sm text-[#8899AA]">
                  <span className="mb-1 block font-bold text-white">Data to be deleted:</span>
                  Biometric templates, Profile photos, Unstructured personal files, Non-statutory emergency contacts, App usage telemetry.
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="danger" className="flex-1" icon={<Trash2 size={16} aria-hidden="true" />}>
                  Execute Purge
                </Button>
                <Button variant="secondary" className="flex-1">
                  Reject Request
                </Button>
              </div>
            </Card>

            {/* Request 2 — blocked */}
            <Card padding="lg" className="border-rose-500/30">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#131B2B] text-[#556677]">
                    <UserX size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Anita Desai</h4>
                    <div className="text-sm text-[#8899AA]">EMP-1092 • Separated: Jan 2026</div>
                  </div>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-sm">
                  <span className="text-[#8899AA]">Statutory Hold Check</span>
                  <span className="flex items-center gap-1 font-bold text-rose-400">
                    <XCircle size={14} aria-hidden="true" /> Blocked
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-3 text-sm">
                  <span className="text-[#8899AA]">Active Grievances</span>
                  <span className="flex items-center gap-1 font-bold text-rose-400">
                    <XCircle size={14} aria-hidden="true" /> GRV-2026-112 (Open)
                  </span>
                </div>
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3 text-sm text-rose-300">
                  Deletion cannot proceed. A legal hold is currently placed until the grievance case is closed.
                </div>
              </div>

              <Button variant="secondary" className="w-full">
                Reject (Inform due to hold)
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
}
