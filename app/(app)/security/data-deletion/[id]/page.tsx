"use client";

import { Trash2, ShieldAlert, CheckCircle2, CircleDashed, FileText, UserX } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";

export default function DataDeletionStatusPage({ params: _params }: { params: { id: string } }) {
  const defaultUser = "Vikram Singh (EMP-2041)";

  return (
    <Page
      title="Erasure Execution Protocol"
      subtitle={`Live tracking of automated dataset purging for ${defaultUser}.`}
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Data Deletion", href: "/security/data-deletion" },
        { label: "Execution" },
      ]}
      maxWidth="900px"
    >
      <Card padding="lg" className="relative overflow-hidden shadow-2xl">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-rose-500/5 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-rose-500/30 bg-rose-500/10 text-rose-400">
            <Trash2 size={32} aria-hidden="true" />
          </div>
          <div>
            <h2 className="mb-1 text-xl font-bold text-white">Purge Sequence in Progress</h2>
            <p className="text-sm text-[#8899AA]">Initiated by Meera Venkatesh (DPO) on Oct 24, 2026 - 16:30 IST.</p>
          </div>
        </div>

        <ol className="relative z-10 space-y-8" aria-label="Purge sequence steps">
          {/* Step 1 */}
          <li className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={16} aria-hidden="true" />
              </div>
              <div className="mb-2 mt-2 h-full w-0.5 bg-[#1A2A3A]" aria-hidden="true" />
            </div>
            <div className="pb-8">
              <h3 className="mb-1 text-lg font-bold text-white">Pre-flight: Statutory Check</h3>
              <p className="mb-3 text-sm text-[#8899AA]">
                Verified no active litigation or POSH grievances exist. Basic payroll info locked in WORM archive for 7 years.
              </p>
              <div className="rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-3 font-mono text-xs text-emerald-400">
                status = CLEARED; lock_applied_to_payroll = TRUE;
              </div>
            </div>
          </li>

          {/* Step 2 */}
          <li className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={16} aria-hidden="true" />
              </div>
              <div className="mb-2 mt-2 h-full w-0.5 bg-[#1A2A3A]" aria-hidden="true" />
            </div>
            <div className="pb-8">
              <h3 className="mb-1 text-lg font-bold text-white">Phase 1: Secure Wipe Biometrics</h3>
              <p className="mb-3 text-sm text-[#8899AA]">
                API call to access control hardware to delete facial/fingerprint templates.
              </p>
              <div className="space-y-1 rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-3 font-mono text-xs text-emerald-400">
                <div>[200 OK] Hardware Gateway HQ_BLR_01 deletion confirmed.</div>
                <div>[200 OK] Local cache purged.</div>
              </div>
            </div>
          </li>

          {/* Step 3 — active */}
          <li className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-indigo-500/50 bg-indigo-500/20 text-indigo-400">
                <CircleDashed size={16} className="animate-spin" aria-hidden="true" />
              </div>
              <div className="mb-2 mt-2 h-full w-0.5 bg-[#1A2A3A]" aria-hidden="true" />
            </div>
            <div className="pb-8">
              <h3 className="mb-1 text-lg font-bold text-white">Phase 2: Purge Unstructured PII</h3>
              <p className="mb-3 text-sm text-[#8899AA]">
                Locating and scrubbing profile photos, chat logs, loose documents, and survey metadata.
              </p>
              <div className="space-y-3 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-white">
                    <FileText size={14} className="text-[#556677]" aria-hidden="true" /> S3 Bucket Scan (Resumes, Docs)
                  </span>
                  <span className="font-bold text-indigo-400">Scanning... 64%</span>
                </div>
                <div
                  className="h-1 w-full overflow-hidden rounded-full bg-[#0A1420]"
                  role="progressbar"
                  aria-valuenow={64}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="S3 scan progress"
                >
                  <div className="h-full w-[64%] rounded-full bg-indigo-500" />
                </div>
              </div>
            </div>
          </li>

          {/* Step 4 — pending */}
          <li className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#1A2A3A] bg-[#131B2B] text-[#556677]">
              <UserX size={16} aria-hidden="true" />
            </div>
            <div>
              <h3 className="mb-1 text-lg font-bold text-[#8899AA]">Phase 3: Deep Obfuscation</h3>
              <p className="text-sm text-[#556677]">
                Irreversibly hash application IDs in BI data warehouses to preserve statistical integrity while removing personal association.
              </p>
            </div>
          </li>
        </ol>

        <div className="mt-10 border-t border-[#1A2A3A] pt-6 text-center">
          <p className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#556677]">
            <ShieldAlert size={14} aria-hidden="true" /> This action cannot be paused or stopped once initiated.
          </p>
        </div>
      </Card>
    </Page>
  );
}
