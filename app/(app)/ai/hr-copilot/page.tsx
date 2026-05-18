"use client";

import { Sparkles, MousePointerClick, CheckCircle, Clock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Sub-components (module scope) ──────────────────────────────────────────

interface WorkflowItem {
  title: string;
  desc: string;
  active?: boolean;
}

const WORKFLOWS: WorkflowItem[] = [
  { title: "Offboarding Automation", desc: "Draft custom exit emails, revoke IT access across 12 apps, and schedule the FnF calculation for 3 departing employees.", active: true },
  { title: "Performance Review Prep", desc: "Summarize 360-feedback, sync OKR completion rates, and draft initial manager review templates for the Product team." },
  { title: "Compensation Correction", desc: "Identify 14 employees below the new L3 band minimums and draft batch increment proposals for CFO approval." },
  { title: "Compliance Audit Fixes", desc: "Generate missing Form 16s for the last financial year and email them to the 42 affected ex-employees." },
];

function WorkflowCard({ item }: { item: WorkflowItem }) {
  return (
    <div
      className={`p-4 rounded-xl cursor-pointer transition-colors relative ${
        item.active
          ? "bg-purple-500/10 border border-purple-500/30"
          : "hover:bg-[#131B2B] border border-transparent hover:border-[#2A3A4A]"
      }`}
    >
      {item.active && (
        <div className="absolute top-4 right-4 text-purple-400" aria-hidden="true">
          <Sparkles size={16} />
        </div>
      )}
      <h4 className="text-white font-medium text-sm mb-1 pr-6">{item.title}</h4>
      <p className="text-xs text-[#8899AA] leading-relaxed">{item.desc}</p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HRCopilotPage() {
  return (
    <Page
      title="HR Copilot"
      subtitle="Your intelligent co-pilot for automating complex HR workflows, drafting communications, and executing bulk actions instantly."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "HR Copilot" },
      ]}
      maxWidth="1300px"
    >
      <div className="flex gap-6 min-h-[600px]">
        {/* Left Panel: Scenarios */}
        <div className="w-1/3 flex flex-col shrink-0">
          <h3 className="text-lg font-semibold text-white mb-4">Suggested Workflows</h3>
          <Card padding="sm" className="flex-1 space-y-2">
            {WORKFLOWS.map((item) => (
              <WorkflowCard key={item.title} item={item} />
            ))}
          </Card>
        </div>

        {/* Right Panel: Execution Context */}
        <Card padding="none" className="flex-1 flex flex-col">
          <div className="p-6 border-b border-[#1A2A3A] shrink-0 bg-[#0D1928]">
            <h2 className="text-xl font-semibold text-white">Execution Plan: Offboarding Automation</h2>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="neutral">3 Employees</Badge>
              <Badge variant="warning">Requires Human Review</Badge>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle size={14} className="text-emerald-400" aria-hidden="true" />
                  </div>
                  <div className="w-px h-16 bg-[#2A3A4A] mx-auto mt-2" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="text-emerald-400 font-medium text-sm mb-2">Step 1: Draft Exit Communications</h4>
                  <Card padding="sm">
                    <p className="text-sm text-[#8899AA]">
                      Drafted 3 personalized farewell & exit interview emails based on employee tenure and role.{" "}
                      <button type="button" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                        Review Drafts
                      </button>
                    </p>
                  </Card>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                  <div className="w-px h-24 bg-[#2A3A4A] mx-auto mt-2" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="text-purple-400 font-medium text-sm mb-2">Step 2: IT Access Revocation Schedule</h4>
                  <Card padding="md" className="border-purple-500/30">
                    <p className="text-sm text-[#8899AA] mb-4">
                      Kaarya will automatically trigger Okta de-provisioning on their last working day at 5:00 PM IST.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {["Slack", "Google Workspace", "Jira", "+9 others"].map((app) => (
                        <Badge key={app} variant="neutral">{app}</Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center">
                    <span className="text-xs font-bold text-[#8899AA]">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-[#8899AA] font-medium text-sm mb-2">Step 3: FnF Calculation Trigger</h4>
                  <Card padding="md" className="opacity-50">
                    <div className="flex items-center gap-2 text-[#8899AA] text-sm">
                      <Clock size={16} aria-hidden="true" /> Pending Step 2 execution
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-[#1A2A3A] bg-[#0A1420] shrink-0 flex justify-end gap-3">
            <Button variant="secondary">Modify Plan</Button>
            <Button icon={<MousePointerClick size={16} />} iconRight>Approve & Execute</Button>
          </div>
        </Card>
      </div>
    </Page>
  );
}
