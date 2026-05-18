"use client";

import React from "react";
import { Sparkles, Download, Share2, AlertTriangle, ChevronRight, TrendingDown, Users } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Types ───────────────────────────────────────────────────────────────────

interface QueryResult {
  id: string;
  name: string;
  role: string;
  dept: string;
  salary: string;
  percentile: string;
  risk: string;
  riskReason: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const queryTerm =
  "Show me all L4 Engineers with salaries below the 50th percentile who have a high flight risk.";

const results: QueryResult[] = [
  { id: "EMP-1204", name: "Rahul Sharma", role: "SDE II (L4)", dept: "Engineering", salary: "₹ 22L", percentile: "42nd", risk: "High (88%)", riskReason: "Compensation vs. Peers" },
  { id: "EMP-1822", name: "Aisha Gupta", role: "SDE II (L4)", dept: "Engineering", salary: "₹ 21.5L", percentile: "38th", risk: "High (92%)", riskReason: "No promo in 2.5 yrs" },
  { id: "EMP-0931", name: "Vikram Singh", role: "SDE II (L4)", dept: "Engineering", salary: "₹ 23L", percentile: "48th", risk: "Medium (65%)", riskReason: "Manager Change" },
  { id: "EMP-2144", name: "Neha Reddy", role: "SDE II (L4)", dept: "Engineering", salary: "₹ 20L", percentile: "31st", risk: "Critical (95%)", riskReason: "Offer from Competitor" },
];

// ─── Sub-components (module scope) ──────────────────────────────────────────

function RiskBadge({ risk }: { risk: string }) {
  const isCritical = risk.includes("Critical");
  const isHigh = risk.includes("High");
  if (isCritical) return <Badge variant="danger"><AlertTriangle size={12} aria-hidden="true" className="mr-1" />{risk}</Badge>;
  if (isHigh) return <Badge variant="warning"><AlertTriangle size={12} aria-hidden="true" className="mr-1" />{risk}</Badge>;
  return <Badge variant="neutral">{risk}</Badge>;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NLQueryResultsPage() {
  return (
    <Page
      title="Query Results"
      subtitle="Natural Language HR Query · 4 matches found"
      breadcrumbs={[
        { label: "AI", href: "/ai/nl-query" },
        { label: "NL Query", href: "/ai/nl-query" },
        { label: "Results" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Share2 size={16} aria-hidden="true" />}>
            Share
          </Button>
          <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>
            Export
          </Button>
        </>
      }
    >
      {/* Query Summary & AI Analysis */}
      <Card padding="lg" className="border-indigo-500/30 mb-8 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"
        />

        <div className="relative z-10 flex gap-4">
          <div className="mt-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-2 rounded-xl border border-indigo-500/30 shrink-0">
            <Sparkles size={24} className="text-indigo-400" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col mb-4">
              <span className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-1">
                Your Query
              </span>
              <h2 className="text-xl font-medium text-white">&ldquo;{queryTerm}&rdquo;</h2>
            </div>

            <Card padding="md" className="mb-6">
              <h3 className="text-sm font-semibold text-indigo-400 mb-2">Kaarya AI Synthesis</h3>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-4">
                I found <strong className="text-white">4 employees</strong> matching your criteria.
                The primary driver for their flight risk is the internal salary band disparity
                compared to the current market median (₹26L for L4 SDEs). Immediate intervention is
                recommended for <strong className="text-red-400">Neha Reddy</strong> and{" "}
                <strong className="text-red-400">Aisha Gupta</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">
                  <TrendingDown size={14} aria-hidden="true" className="mr-1" /> ₹3.5L Avg below
                  market
                </Badge>
                <Badge variant="danger">
                  <AlertTriangle size={14} aria-hidden="true" className="mr-1" /> 85% Avg Flight
                  Risk
                </Badge>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button size="sm">Generate Compensation Plan</Button>
              <Button variant="secondary" size="sm">
                Refine Results
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card padding="none" className="overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-[#1A2A3A] flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users size={18} className="text-[#8899AA]" aria-hidden="true" /> Data Results
          </h3>
          <Badge variant="neutral">{results.length} Matches</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" aria-label="Query results">
            <thead>
              <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Employee</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Role / Dept</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Current CTC</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Band Percentile</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Flight Risk</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase">Primary Driver</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A2A3A]">
              {results.map((r) => (
                <tr key={r.id} className="hover:bg-[#131B2B] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{r.name}</span>
                      <span className="text-xs text-[#8899AA]">{r.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-[#8899AA]">{r.role}</span>
                      <span className="text-xs text-[#445566]">{r.dept}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{r.salary}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                      {r.percentile}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <RiskBadge risk={r.risk} />
                  </td>
                  <td className="px-6 py-4 text-sm text-[#8899AA]">{r.riskReason}</td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`View details for ${r.name}`}
                      icon={<ChevronRight size={18} aria-hidden="true" />}
                      className="text-[#8899AA] group-hover:text-indigo-400 hover:bg-indigo-500/10"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Contextual Prompts */}
      <div>
        <span className="text-sm font-medium text-[#445566] mb-3 block">Follow-up Queries</span>
        <div className="flex flex-wrap gap-2">
          {[
            "How does this compare to Product Managers?",
            "What is the financial impact of replacing these 4 engineers?",
            "Draft a retention email for managers to send to these employees.",
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="text-xs text-[#8899AA] bg-[#0D1928] border border-[#1A2A3A] px-3 py-1.5 rounded-full hover:border-[#2A3A4A] hover:text-white transition-colors cursor-pointer"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>
    </Page>
  );
}
