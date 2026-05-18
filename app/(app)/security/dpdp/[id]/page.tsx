"use client";

import { Download, Calendar, History } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const CONSENTS = [
  { name: "Core HR Operations", desc: "Payroll, Taxes, PF, Basic ID", status: "Granted", date: "Mar 10, 2025" },
  { name: "Biometric Attendance", desc: "Face ID & Fingerprint scanners", status: "Granted", date: "Mar 10, 2025" },
  { name: "AI / Copilot Processing", desc: "Using chat data to train internal AI models", status: "Opted Out", date: "Sep 01, 2026" },
] as const;

export default function DPDPConsentDetailPage({ params: _params }: { params: { id: string } }) {
  const defaultUser = "Fatima Sheikh (EMP-0214)";

  return (
    <Page
      title="Data Principal Profile"
      subtitle={`Review granular consent agreements and metadata tracking for ${defaultUser}.`}
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "DPDP", href: "/security/dpdp" },
        { label: "Profile" },
      ]}
      maxWidth="1100px"
      actions={
        <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>
          Export Consent Blob
        </Button>
      }
    >
      <div className="space-y-8">
        {/* Consent status cards */}
        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3">
          {CONSENTS.map((c) => (
            <Card
              key={c.name}
              padding="lg"
              className={c.status === "Opted Out" ? "border-amber-500/20 bg-amber-500/5" : ""}
            >
              <h3 className={`mb-1 font-bold ${c.status === "Opted Out" ? "text-amber-400" : "text-white"}`}>
                {c.name}
              </h3>
              <p className="mb-4 h-8 text-xs text-[#8899AA]">{c.desc}</p>
              <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-4">
                <Badge variant={c.status === "Granted" ? "success" : "warning"}>{c.status}</Badge>
                <span className="flex items-center gap-1 text-xs text-[#556677]">
                  <Calendar size={12} aria-hidden="true" /> {c.date}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Consent audit trail */}
        <Card padding="none" className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060D1A] px-5 py-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <History size={18} className="text-[#556677]" aria-hidden="true" /> Irrefutable Consent Audit Trail
            </h2>
            <div className="font-mono text-[10px] uppercase text-[#556677]">WORM Secured</div>
          </div>

          <div className="space-y-8 p-6">
            {/* Event 1 */}
            <div className="relative border-l-2 border-[#1A2A3A] pl-6">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-indigo-500 ring-4 ring-[#0A1420]" aria-hidden="true" />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Consent Modified: Opt-Out AI Processing</span>
                  <span className="rounded bg-[#1A2A3A] px-2 py-0.5 font-mono text-[10px] text-[#8899AA]">
                    HASH: 8f4a2b99X
                  </span>
                </div>
                <span className="mt-1 block text-xs text-[#556677]">Sep 01, 2026 - 10:14:22 UTC</span>
              </div>
              <div className="space-y-1 rounded-xl border border-[#2A3A4A] bg-[#131B2B] p-4 font-mono text-xs text-[#8899AA]">
                <div>device_uuid: &quot;ios-app-17.2-a98f&quot;</div>
                <div>ip_address: &quot;112.44.55.1&quot;</div>
                <div>action: &quot;USER_INTERFACE_TOGGLE&quot;</div>
                <div>previous_state: &quot;GRANTED&quot;</div>
                <div className="text-indigo-400">new_state: &quot;REVOKED&quot;</div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="relative border-l-2 border-[#1A2A3A] pl-6">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-[#0A1420]" aria-hidden="true" />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Initial Consent Granted (Onboarding)</span>
                  <span className="rounded bg-[#1A2A3A] px-2 py-0.5 font-mono text-[10px] text-[#8899AA]">
                    HASH: 3c9d1a88Z
                  </span>
                </div>
                <span className="mt-1 block text-xs text-[#556677]">Mar 10, 2025 - 09:00:15 UTC</span>
              </div>
              <div className="space-y-1 rounded-xl border border-[#2A3A4A] bg-[#131B2B] p-4 font-mono text-xs text-[#8899AA]">
                <div>device_uuid: &quot;web-chrome-mac-111&quot;</div>
                <div>ip_address: &quot;192.168.1.45&quot;</div>
                <div>action: &quot;ONBOARDING_ELECTRONIC_SIGNATURE&quot;</div>
                <div className="text-emerald-400">granted_scopes: [&quot;core_hr&quot;, &quot;biometric&quot;, &quot;ai_copilot&quot;]</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
