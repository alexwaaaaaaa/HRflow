"use client";

import { Scale, Calendar, AlertTriangle, Plus, FileText, Globe } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

export default function LawsPage() {
  return (
    <Page
      title="Tax & Statutory Updates Master"
      subtitle="Deploy changes to tax slabs, minimum wage laws, or PF rules globally to all tenants."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Laws" },
      ]}
      maxWidth="1100px"
      actions={
        <Button variant="primary" icon={<Plus size={16} />}>
          Draft New Rule Override
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Global Rules */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Scale size={16} className="text-[#556677]" aria-hidden="true" /> Upcoming/Active Legislative Rollouts
          </h2>

          {/* Active rule */}
          <Card padding="lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Badge variant="success">Active</Badge>
                <h3 className="text-white font-bold text-lg">Union Budget 2026: Tax Slabs (New Regime)</h3>
              </div>
            </div>
            <p className="text-sm text-[#8899AA] leading-relaxed mb-4">
              Global update to the core payroll engine modifying the New Regime income tax brackets. Applied to all India-region tenants.
            </p>
            <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg text-xs font-mono text-emerald-400 mb-4 overflow-x-auto">
              PATCH /engine/tax_rules/gov_india_new_regime_2026
            </div>
            <div className="flex justify-between items-center text-xs text-[#556677] border-t border-[#1A2A3A] pt-4">
              <span className="flex items-center gap-1">
                <Globe size={14} aria-hidden="true" /> Region: India
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} aria-hidden="true" /> Effective: April 1, 2026
              </span>
            </div>
          </Card>

          {/* Scheduled rule */}
          <Card padding="lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Badge variant="warning">
                  <AlertTriangle size={10} className="inline mr-1" aria-hidden="true" />
                  Scheduled
                </Badge>
                <h3 className="text-white font-bold text-lg">Revised Minimum Wage (Karnataka)</h3>
              </div>
            </div>
            <p className="text-sm text-[#8899AA] leading-relaxed mb-4">
              Updates the validation thresholds for compliance reports for all organizations registered with Karnataka state as their primary operating location.
            </p>
            <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg text-xs font-mono text-amber-400/80 mb-4 overflow-x-auto">
              PENDING DEPLOY (Awaiting QA Signoff)
            </div>
            <div className="flex justify-between items-center text-xs text-[#556677] border-t border-[#1A2A3A] pt-4">
              <span className="flex items-center gap-1">
                <Globe size={14} aria-hidden="true" /> Region: Karnataka (State)
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} aria-hidden="true" /> Effective: Jan 1, 2027
              </span>
            </div>
          </Card>
        </div>

        {/* Validation Sandboxes */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText size={16} className="text-[#556677]" aria-hidden="true" /> Validation Sandboxes
          </h2>

          <Card padding="lg">
            <p className="text-sm text-[#8899AA] leading-relaxed mb-6">
              Before deploying statutory logic changes to production, they must be run through the Shadow Simulation engine against anonymized payloads to detect adverse payroll anomalies.
            </p>

            <div className="space-y-4">
              <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">EPF Contribution Cap Lift (Draft)</div>
                  <div className="text-xs text-[#556677] mt-1">Simulating across 500k employee profiles...</div>
                </div>
                <div
                  className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin shrink-0"
                  aria-label="Simulation in progress"
                  role="status"
                />
              </div>
              <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">Professional Tax Slabs (Maharashtra - 2026)</div>
                  <div className="text-xs text-emerald-400 mt-1">Simulation Pass: 100% Match</div>
                </div>
                <Button variant="primary" size="sm">
                  Push to Prod
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
