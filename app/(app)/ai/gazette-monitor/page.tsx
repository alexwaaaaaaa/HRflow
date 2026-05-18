"use client";

import { useState } from "react";
import { BookMarked, Search, Filter, AlertCircle, Calendar, ArrowRight, Download, CheckCircle, Scale } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

type GazetteStatus = "Pending Review" | "Actioned" | "Resolved" | "Archived";
type GazetteImpact = "High" | "Medium" | "Low";

interface GazetteUpdate {
  id: string;
  title: string;
  date: string;
  category: string;
  impact: GazetteImpact;
  status: GazetteStatus;
  aiSummary: string;
  deadline: string;
}

const UPDATES: GazetteUpdate[] = [
  { id: "GAZ-2023-10-A", title: "Amendment to Minimum Wages Act (Karnataka)", date: "Oct 15, 2023", category: "Minimum Wage", impact: "High", status: "Pending Review", aiSummary: "Basic DA updated by ₹450/month across all skill categories. Affects 24 employees in the generic staff pool.", deadline: "Nov 1, 2023" },
  { id: "GAZ-2023-09-C", title: "EPFO Form 11 Digital Integration Mandate", date: "Sep 28, 2023", category: "PF & Compliance", impact: "Medium", status: "Actioned", aiSummary: "New API mandate for Form 11 submissions natively. Kaarya Engineering has scheduled the patch.", deadline: "Dec 31, 2023" },
  { id: "GAZ-2023-09-B", title: "Revision of Professional Tax Slabs (Maharashtra)", date: "Sep 12, 2023", category: "Taxation", impact: "High", status: "Resolved", aiSummary: "PT deduction exemption limit raised for women employees up to ₹25,000 CTC.", deadline: "Oct 1, 2023" },
  { id: "GAZ-2023-08-A", title: "Changes to Maternity Benefit Act Notifications", date: "Aug 04, 2023", category: "Labor Law", impact: "Low", status: "Resolved", aiSummary: "Clarification on work-from-home provisions post-maternity leave.", deadline: "Self-regulatory" },
];

const STATUS_BADGE: Record<GazetteStatus, { variant: "warning" | "info" | "success" | "neutral"; icon: React.ElementType; label: string }> = {
  "Pending Review": { variant: "warning", icon: AlertCircle, label: "Pending Review" },
  Actioned: { variant: "info", icon: ArrowRight, label: "Auto-Actioned" },
  Resolved: { variant: "success", icon: CheckCircle, label: "Resolved" },
  Archived: { variant: "neutral", icon: BookMarked, label: "Archived" },
};

const TABS = ["All Updates", "Action Required", "Resolved", "Archived"] as const;
type TabType = (typeof TABS)[number];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GazetteMonitorPage() {
  const [activeTab, setActiveTab] = useState<TabType>("All Updates");

  return (
    <Page
      title="Gazette & Law Monitor"
      subtitle="AI scans state and central government gazettes daily to detect labor law amendments, PF/ESI changes, and tax updates affecting your workforce."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Gazette Monitor" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="secondary" icon={<Download size={14} />}>Export Audit Log</Button>
      }
    >
      {/* Smart Summary */}
      <Card padding="lg" className="mb-6 border-l-4 border-indigo-500 rounded-l-none">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-500/10 p-2 rounded-lg shrink-0 mt-1">
            <Scale size={20} className="text-indigo-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Pending Compliance Updates</h3>
            <p className="text-[#8899AA] text-sm leading-relaxed mb-3">
              You have <strong className="text-amber-500">1 High Impact</strong> gazette notification pending review. This change to the Karnataka Minimum Wages Act requires payroll validation before the end of the month.
            </p>
            <Button icon={<ArrowRight size={14} />} iconRight href="/ai/gazette-monitor/GAZ-2023-10-A">Review Recommendation</Button>
          </div>
        </div>
      </Card>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex space-x-1 bg-[#1A2A3A] p-1 rounded-xl" role="tablist" aria-label="Gazette filter tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-[#0D1928] text-white shadow shadow-black/20"
                  : "text-[#8899AA] hover:text-white hover:bg-[#2A3A4A]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="bg-[#0D1928] border border-[#2A3A4A] rounded-xl flex items-center px-3 py-2 flex-1 md:w-64 focus-within:border-indigo-500 transition-colors">
            <Search size={16} className="text-[#8899AA]" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search gazettes…"
              className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full placeholder:text-[#445566]"
              aria-label="Search gazette updates"
            />
          </div>
          <Button variant="secondary" icon={<Filter size={16} />} aria-label="Filter" />
        </div>
      </div>

      {/* Updates List */}
      <div className="space-y-4">
        {UPDATES.map((update) => {
          const statusInfo = STATUS_BADGE[update.status];
          const StatusIcon = statusInfo.icon;
          return (
            <Link href={`/ai/gazette-monitor/${update.id}`} key={update.id} className="block">
              <Card padding="lg" className={`hover:border-indigo-500/40 transition-all relative ${update.status === "Pending Review" ? "border-amber-500/30" : ""}`}>
                {update.status === "Pending Review" && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-amber-500/80 rounded-r-2xl" aria-hidden="true" />
                )}
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white hover:text-indigo-400 transition-colors">{update.title}</h3>
                      {update.impact === "High" && <Badge variant="danger">High Impact</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#8899AA] mb-4">
                      <span className="flex items-center gap-1"><Calendar size={14} aria-hidden="true" /> {update.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#445566]" aria-hidden="true" />
                      <span>{update.category}</span>
                      <span className="w-1 h-1 rounded-full bg-[#445566]" aria-hidden="true" />
                      <span className="font-mono">{update.id}</span>
                    </div>
                    <Card padding="sm">
                      <h4 className="text-xs font-semibold text-indigo-400 mb-1 uppercase tracking-wider">AI Summary</h4>
                      <p className="text-sm text-[#8899AA] leading-relaxed">{update.aiSummary}</p>
                    </Card>
                  </div>
                  <div className="md:w-64 flex flex-col items-end justify-between shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-[#8899AA] mb-1">Effective Deadline</div>
                      <div className="text-sm font-medium text-white">{update.deadline}</div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Badge variant={statusInfo.variant}>
                        <StatusIcon size={14} aria-hidden="true" className="inline mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
