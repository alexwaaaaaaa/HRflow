"use client";

import { Map, AlertCircle, CalendarClock, Target, Compass } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

export default function RoadmapPage() {
  return (
    <Page
      title="Product Roadmap & R&D"
      subtitle="Strategic visibility into upcoming engineering cycles, beta programs, and sun-setting modules."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Roadmap" },
      ]}
      maxWidth="1300px"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Now */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Target size={16} className="text-emerald-400" aria-hidden="true" /> Q4 2026 (Now)
          </h2>

          <Card padding="lg">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-white font-bold text-lg">AI Resume Parsing</h3>
              <Badge variant="success">GA Rollout</Badge>
            </div>
            <p className="text-xs text-[#8899AA] mb-4">Rolling out to 100% of tenants on Growth and Enterprise tiers.</p>
            <div
              role="progressbar"
              aria-valuenow={85}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="AI Resume Parsing deployment: 85%"
              className="h-1.5 w-full bg-[#131B2B] rounded-full overflow-hidden"
            >
              <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
            </div>
            <div className="text-[10px] text-emerald-400 font-bold mt-2 text-right">85% Deployed</div>
          </Card>

          <Card padding="lg" className="opacity-80">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-white font-bold text-lg">Earned Wage Access (EWA)</h3>
              <Badge variant="info">Beta</Badge>
            </div>
            <p className="text-xs text-[#8899AA]">Beta integrations with YesBank and ICICI live. Testing disbursement concurrency.</p>
          </Card>
        </div>

        {/* Next */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Compass size={16} className="text-indigo-400" aria-hidden="true" /> Q1 2027 (Next)
          </h2>

          <Card padding="lg">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-white font-bold text-lg">Global Payroll Expansion</h3>
            </div>
            <p className="text-xs text-[#8899AA]">Adding statutory logic compliance for UAE (WPS) and Singapore (CPF).</p>
          </Card>

          <Card padding="lg">
            <div className="flex items-start gap-2 mb-3">
              <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <h3 className="text-amber-400 font-bold text-lg">Sun-setting V1 API</h3>
            </div>
            <p className="text-xs text-[#8899AA]">Deprecation of legacy REST endpoints. Forcing migration to GraphQL V2 layer.</p>
          </Card>
        </div>

        {/* Later */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CalendarClock size={16} className="text-[#556677]" aria-hidden="true" /> 2027+ (Beyond)
          </h2>

          <div className="bg-[#131B2B] border border-[#2A3A4A] border-dashed rounded-2xl p-5 text-center flex flex-col items-center justify-center opacity-70 min-h-[150px]">
            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center mb-3">
              <Map size={18} className="text-[#556677]" aria-hidden="true" />
            </div>
            <div className="text-sm font-bold text-white mb-1">Corporate Cards Integration</div>
            <div className="text-xs text-[#556677]">Native spending ledgers</div>
          </div>
        </div>
      </div>
    </Page>
  );
}
