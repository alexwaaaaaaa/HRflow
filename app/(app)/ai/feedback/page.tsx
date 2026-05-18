"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Filter, Search, CheckCircle2, RotateCcw, MoreVertical, Clock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Types ───────────────────────────────────────────────────────────────────

type FeedbackStatus = "Needs Review" | "Resolved" | "Ignored";
type FeedbackRating = "positive" | "negative";

interface FeedbackLog {
  id: string;
  user: string;
  role: string;
  model: string;
  date: string;
  rating: FeedbackRating;
  fb: string;
  status: FeedbackStatus;
}

const FEEDBACK_LOGS: FeedbackLog[] = [
  { id: "FB-9021", user: "Anita C.", role: "HR Business Partner", model: "Attrition Predictor", date: "2 hrs ago", rating: "negative", fb: "Model flagged employee as high flight risk, but they just got promoted last month. Missing context?", status: "Needs Review" },
  { id: "FB-9020", user: "Vikram S.", role: "Recruiter", model: "Hiring Benchmark", date: "5 hrs ago", rating: "positive", fb: "Salary bands generated were perfectly aligned with recent industry changes. Closed candidate easily.", status: "Resolved" },
  { id: "FB-9019", user: "Priya R.", role: "Payroll Admin", model: "Document OCR", date: "Yesterday", rating: "negative", fb: "Failed to extract PAN number correctly from a perfectly legible scan. Extracted O as 0.", status: "Needs Review" },
  { id: "FB-9018", user: "System Auto", role: "Compliance Bot", model: "Policy Generator", date: "Oct 22", rating: "negative", fb: "Drafted policy tone was too casual for a legal document. Halting auto-publish pipeline.", status: "Resolved" },
];

const TABS: FeedbackStatus[] = ["Needs Review", "Resolved", "Ignored"];

// ─── Sub-components (module scope) ──────────────────────────────────────────

function FeedbackCard({ log }: { log: FeedbackLog }) {
  return (
    <Card padding="md" className="flex flex-col md:flex-row gap-6 relative">
      {/* Status bar */}
      <div
        className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-md ${log.rating === "positive" ? "bg-emerald-500" : "bg-rose-500"}`}
        aria-hidden="true"
      />

      <div className="w-full md:w-48 shrink-0 border-b border-[#1A2A3A] md:border-b-0 md:border-r md:pr-6 pb-4 md:pb-0">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`p-1.5 rounded-lg border ${
              log.rating === "positive"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            }`}
            aria-label={log.rating === "positive" ? "Positive feedback" : "Negative feedback"}
          >
            {log.rating === "positive" ? <ThumbsUp size={14} aria-hidden="true" /> : <ThumbsDown size={14} aria-hidden="true" />}
          </span>
          <span className="text-xs text-[#8899AA] font-mono">{log.id}</span>
        </div>
        <div className="text-sm font-semibold text-white truncate">{log.user}</div>
        <div className="text-xs text-[#8899AA] truncate mb-2">{log.role}</div>
        <div className="text-[10px] text-[#445566] flex items-center gap-1">
          <Clock size={10} aria-hidden="true" /> {log.date}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="neutral">Model: {log.model}</Badge>
          <div className="flex gap-2">
            {log.status === "Needs Review" ? (
              <Button variant="secondary" size="sm">Append to Fine-tune Array</Button>
            ) : (
              <Badge variant="success"><CheckCircle2 size={12} aria-hidden="true" className="inline mr-1" />Resolved</Badge>
            )}
            <button type="button" className="text-[#445566] hover:text-white" aria-label="More options">
              <MoreVertical size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
        <Card padding="sm" className="mt-auto">
          <p className="text-sm text-[#8899AA] italic">&ldquo;{log.fb}&rdquo;</p>
        </Card>
      </div>
    </Card>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AIFeedbackPage() {
  const [activeTab, setActiveTab] = useState<FeedbackStatus | "All Feedback">("All Feedback");

  const allTabs = ["All Feedback", ...TABS] as const;

  return (
    <Page
      title="AI Feedback Loop"
      subtitle="Monitor end-user ratings (RLHF) on AI-generated insights, documents, and chatbot responses."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Feedback" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Filter size={14} />}>Model Filter</Button>
          <Button icon={<RotateCcw size={14} />}>Batch Retrain (4)</Button>
        </>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card padding="md" className="border-teal-500/20">
          <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2">Global Satisfaction</div>
          <div className="text-3xl font-bold text-teal-400">94.2%</div>
          <div className="text-[10px] text-teal-500 mt-1 font-medium">+1.2% this week</div>
        </Card>
        <Card padding="md">
          <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <ThumbsUp size={14} className="text-emerald-400" aria-hidden="true" /> Positive Signals
          </div>
          <div className="text-2xl font-bold text-white">1,405</div>
        </Card>
        <Card padding="md">
          <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
            <ThumbsDown size={14} className="text-rose-400" aria-hidden="true" /> Improvement Areas
          </div>
          <div className="text-2xl font-bold text-white">82</div>
          <div className="text-[10px] text-rose-400 mt-1">Pending verification</div>
        </Card>
        <Card padding="md">
          <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2">Worst Performing Model</div>
          <div className="text-lg font-bold text-white mb-1">Document OCR</div>
          <Badge variant="danger">8.4% Error Rate</Badge>
        </Card>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex space-x-1 bg-[#1A2A3A] p-1 rounded-xl overflow-x-auto" role="tablist" aria-label="Feedback filter tabs">
          {allTabs.map((tab) => (
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
        <div className="bg-[#0D1928] border border-[#2A3A4A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-teal-500/50 transition-colors w-full md:w-64">
          <Search size={16} className="text-[#8899AA]" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search logs…"
            className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full"
            aria-label="Search feedback logs"
          />
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        {FEEDBACK_LOGS.map((log) => (
          <FeedbackCard key={log.id} log={log} />
        ))}
      </div>
    </Page>
  );
}
