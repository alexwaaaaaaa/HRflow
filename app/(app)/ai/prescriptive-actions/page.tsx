"use client";

import { useState } from "react";
import { TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, PlayCircle, Clock, Zap } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Types ───────────────────────────────────────────────────────────────────

type ActionTab = "All" | "High Impact" | "Urgent Risks" | "Automation Ready";
const TABS: ActionTab[] = ["All", "High Impact", "Urgent Risks", "Automation Ready"];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PrescriptiveActionsPage() {
  const [activeTab, setActiveTab] = useState<ActionTab>("All");

  return (
    <Page
      title="Prescriptive AI Actions"
      subtitle="A prioritized queue of AI-generated strategic interventions across your organization, ranked by estimated business ROI and urgency."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Prescriptive Actions" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary">Action History</Button>
          <Button icon={<PlayCircle size={14} />}>Auto-Execute Batch (3)</Button>
        </>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card padding="md" className="border-amber-500/20">
          <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2">Potential Value Unlock</div>
          <div className="text-2xl font-bold text-amber-400">₹3.2 Cr</div>
          <div className="text-[10px] text-[#8899AA] mt-1">Estimated ROI if top 5 actions taken</div>
        </Card>
        <Card padding="md">
          <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2">Pending Interventions</div>
          <div className="text-2xl font-bold text-white">12</div>
          <div className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
            <AlertTriangle size={12} aria-hidden="true" /> 2 Critical Risks Mitigations
          </div>
        </Card>
        <Card padding="md">
          <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2">Auto-Executed (MTD)</div>
          <div className="text-2xl font-bold text-white">45</div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 size={12} aria-hidden="true" /> Workflows finalized autonomously
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex space-x-1 bg-[#1A2A3A] p-1 rounded-xl overflow-x-auto" role="tablist" aria-label="Action filter tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-[#0D1928] text-white shadow shadow-black/20"
                  : "text-[#8899AA] hover:text-white hover:bg-[#2A3A4A]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Action Cards */}
      <div className="space-y-4">
        {/* High ROI Action */}
        <Card padding="lg" className="border-amber-500/30 hover:border-amber-500/50 transition-all cursor-pointer">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="warning"><TrendingUp size={12} aria-hidden="true" className="inline mr-1" />High ROI</Badge>
                <span className="text-xs text-[#8899AA] font-mono flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" /> Gen: 2 hrs ago
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Launch Mid-Cycle Retention Adjustments (Engineering)</h3>
              <p className="text-sm text-[#8899AA] leading-relaxed max-w-3xl mb-4">
                Kaarya models indicate a 35% probability of losing 5 key Senior Engineers to competitors within 60 days due to market comp drift. AI has drafted a targeted ₹12L RSU grant strategy.
              </p>
              <div className="flex flex-wrap gap-4 text-xs">
                <span className="text-emerald-400 font-medium">ROI: Prevents ~₹1.5Cr in replacement costs</span>
                <span className="hidden md:inline-block w-px h-4 bg-[#2A3A4A]" aria-hidden="true" />
                <span className="text-white">Affected: 5 Employees</span>
                <span className="hidden md:inline-block w-px h-4 bg-[#2A3A4A]" aria-hidden="true" />
                <span className="text-white">Budget Required: Zero (Equity Pool)</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center md:items-end w-full md:w-56 shrink-0 border-t border-[#1A2A3A] pt-4 md:border-t-0 md:pt-0">
              <Button variant="secondary" className="w-full">Review Grant Details</Button>
              <Button className="w-full" iconRight={<ChevronRight size={16} />}>Approve Execution</Button>
            </div>
          </div>
        </Card>

        {/* Auto-Executable Action */}
        <Card padding="lg" className="hover:border-blue-500/40 transition-all cursor-pointer">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="info"><Zap size={12} aria-hidden="true" className="inline mr-1" />Auto-Executable</Badge>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Shift Recruitment Budget for &quot;Staff Product Manager&quot;</h3>
              <p className="text-sm text-[#8899AA] leading-relaxed max-w-3xl mb-4">
                The current sourcing channel (LinkedIn Ads) is yielding poor conversion (1.2%). The model recommends rebudgeting ₹50k to targeted Employee Referral Bounties to hit TTF goals.
              </p>
              <div className="flex flex-wrap gap-4 text-xs">
                <span className="text-emerald-400 font-medium">+15% TTF Confidence Boost</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center md:items-end w-full md:w-56 shrink-0 border-t border-[#1A2A3A] pt-4 md:border-t-0 md:pt-0">
              <Button variant="secondary" className="w-full">Accept AI Automation</Button>
            </div>
          </div>
        </Card>

        {/* Compliance Action */}
        <Card padding="lg" className="hover:border-rose-500/40 transition-all cursor-pointer">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="danger"><AlertTriangle size={12} aria-hidden="true" className="inline mr-1" />Compliance Risk</Badge>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Update Leave Policy: Karnataka Gazette Compliance</h3>
              <p className="text-sm text-[#8899AA] leading-relaxed max-w-3xl mb-4">
                Recent state gazette mandates an additional 2 days of casual leave. Your current engine configuration is out of date. AI has pre-staged the policy patch for review.
              </p>
            </div>
            <div className="flex flex-col gap-3 justify-center md:items-end w-full md:w-56 shrink-0 border-t border-[#1A2A3A] pt-4 md:border-t-0 md:pt-0">
              <Button variant="secondary" className="w-full">Review Policy Diff</Button>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
