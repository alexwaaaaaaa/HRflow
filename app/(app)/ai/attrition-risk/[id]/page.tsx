"use client";

import React from "react";
import { Sparkles, AlertTriangle, TrendingDown, Calendar, Activity, ChevronDown } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const employee = {
  name: "Neha Reddy",
  role: "SDE II",
  dept: "Engineering",
  manager: "Rahul Sharma",
  tenure: "2 yrs 8 mos",
  riskScore: 95,
};

export default function AttritionDetailScreen() {
  return (
    <Page
      title={employee.name}
      subtitle={`${employee.role} · ${employee.dept} · Tenure: ${employee.tenure}`}
      breadcrumbs={[
        { label: "AI", href: "/ai/attrition-risk" },
        { label: "Attrition Risk", href: "/ai/attrition-risk" },
        { label: employee.name },
      ]}
      maxWidth="1300px"
      actions={
        <Badge variant="danger">
          <AlertTriangle size={12} aria-hidden="true" className="mr-1" /> Critical Risk
        </Badge>
      }
    >
      {/* Profile Header */}
      <Card padding="lg" className="mb-8 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
        />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div
              aria-hidden="true"
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] flex items-center justify-center text-2xl font-bold text-white shadow-xl"
            >
              NR
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-3">
                {employee.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#8899AA]">
                <span>{employee.role}</span>
                <span className="w-1 h-1 rounded-full bg-[#445566]" aria-hidden="true" />
                <span>{employee.dept}</span>
                <span className="w-1 h-1 rounded-full bg-[#445566]" aria-hidden="true" />
                <span>
                  Tenure: <span className="text-white">{employee.tenure}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end relative z-10">
            <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">
              Flight Risk Score
            </div>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600 mb-2">
              {employee.riskScore}
              <span className="text-2xl">%</span>
            </div>
            <div className="text-xs font-semibold text-red-500/80 tracking-widest uppercase animate-pulse">
              Immediate Action Required
            </div>
          </div>
        </div>
      </Card>

      {/* AI Diagnosis */}
      <Card padding="lg" className="border-red-500/20 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-red-400" aria-hidden="true" /> AI Diagnosis Summary
        </h3>
        <p className="text-[#8899AA] text-sm leading-relaxed mb-6">
          Kaarya AI has flagged <strong className="text-white">Neha Reddy</strong> with a 95%
          probability of attrition within the next 30 days. The primary drivers are compounding
          factors of below-market compensation and apparent stagnation in role progression compared
          to peer cohorts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card padding="md" className="border-red-500/30 text-center">
            <div className="bg-red-500/10 text-red-400 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingDown size={18} aria-hidden="true" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">Compensation Gap</h4>
            <p className="text-xs text-[#8899AA] px-2">
              Currently at ₹20L, which is 31st percentile. Market median is ₹26L.
            </p>
            <div className="mt-3 inline-block bg-red-500/10 px-2 py-1 rounded text-red-400 text-xs font-bold font-mono">
              +45% Impact
            </div>
          </Card>

          <Card padding="md" className="border-amber-500/30 text-center">
            <div className="bg-amber-500/10 text-amber-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity size={18} aria-hidden="true" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">Stagnation (2.8 Yrs)</h4>
            <p className="text-xs text-[#8899AA] px-2">
              No promotion or significant role change since joining 32 months ago.
            </p>
            <div className="mt-3 inline-block bg-amber-500/10 px-2 py-1 rounded text-amber-500 text-xs font-bold font-mono">
              +30% Impact
            </div>
          </Card>

          <Card padding="md" className="border-yellow-500/30 text-center">
            <div className="bg-yellow-500/10 text-yellow-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar size={18} aria-hidden="true" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">Leave Pattern Anomaly</h4>
            <p className="text-xs text-[#8899AA] px-2">
              Took 4 half-days last month, historically non-typical. (Possible interviews)
            </p>
            <div className="mt-3 inline-block bg-yellow-500/10 px-2 py-1 rounded text-yellow-500 text-xs font-bold font-mono">
              +20% Impact
            </div>
          </Card>
        </div>
      </Card>

      {/* Prescriptive Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Actions Panel */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Recommended Interventions</h3>
          <div className="space-y-4">
            <Card padding="lg" className="border-indigo-500/40 relative overflow-hidden group">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[100px] -translate-y-8 translate-x-8 transition-transform group-hover:scale-150"
              />
              <div className="flex justify-between items-start mb-2 relative z-10">
                <h4 className="text-white font-medium text-sm">
                  Deploy Retention Bonus / Correction
                </h4>
                <Badge variant="info">Highest Success Rate</Badge>
              </div>
              <p className="text-[#8899AA] text-xs leading-relaxed mb-4 relative z-10">
                Propose an immediate mid-cycle salary correction of ₹4.5L to bring compensation to
                the 48th percentile. Kaarya estimates a{" "}
                <span className="text-emerald-400 font-medium">78% probability</span> of retention
                if activated within 48 hrs.
              </p>
              <Button size="sm" className="relative z-10">
                Generate Approval Workflow
              </Button>
            </Card>

            <Card padding="lg" className="hover:border-[#2A3A4A] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium text-sm">Schedule Stay Interview</h4>
              </div>
              <p className="text-[#8899AA] text-xs leading-relaxed mb-4">
                Draft an empathetic meeting invite for Neha&apos;s manager, Rahul Sharma,
                prioritizing career growth discussions.
              </p>
              <Button variant="secondary" size="sm">
                Draft Manager Email
              </Button>
            </Card>
          </div>
        </div>

        {/* Timeline Context */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
            Historical Context
            <Button variant="ghost" size="sm" icon={<ChevronDown size={14} />} iconRight>
              Last 12 Months
            </Button>
          </h3>
          <Card padding="lg">
            <div className="relative pl-6 border-l-2 border-[#1A2A3A] space-y-6">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full"
                />
                <div className="text-xs text-[#8899AA] mb-1">Last Month (Oct 2023)</div>
                <h5 className="text-sm font-medium text-white">Unusual Leave Pattern</h5>
                <p className="text-xs text-[#445566] mt-1">
                  4 intermittent half-days requested within 2 weeks.
                </p>
              </div>

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] bg-red-500/20 border border-red-500/50 w-4 h-4 rounded-full flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                </span>
                <div className="text-xs text-[#8899AA] mb-1">Q3 Review (Sep 2023)</div>
                <h5 className="text-sm font-medium text-white">Sentiment Drop</h5>
                <p className="text-xs text-[#445566] mt-1">
                  Self-review sentiment scored 3.8/10 (down from 7.2 in Q2). Mentioned &quot;limited
                  scope for technical leadership.&quot;
                </p>
              </div>

              <div className="relative opacity-60">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full"
                />
                <div className="text-xs text-[#8899AA] mb-1">Annual Cycle (Jan 2023)</div>
                <h5 className="text-sm font-medium text-white">Missed Promotion Window</h5>
                <p className="text-xs text-[#445566] mt-1">
                  Passed over for SDE III due to budget constraints, despite &quot;Exceeds
                  Expectations&quot; rating.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
