"use client";

import React from "react";
import { Activity, AlertCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ClientOnly from "@/components/ui/ClientOnly";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
} from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";

const funnelForecast = [
  { stage: "Sourced", vol: 450, conv: 100 },
  { stage: "Screened", vol: 180, conv: 40 },
  { stage: "Interview", vol: 45, conv: 25 },
  { stage: "Offer", vol: 8, conv: 18 },
  { stage: "Hired", vol: 2, conv: 25 },
];

export default function HiringPredictionDetailPage() {
  return (
    <Page
      title="Staff Backend Engineer"
      subtitle="REQ-102 · Department: Engineering · Target Hires: 2"
      breadcrumbs={[
        { label: "AI", href: "/ai/hiring-prediction" },
        { label: "Hiring Prediction", href: "/ai/hiring-prediction" },
        { label: "REQ-102" },
      ]}
      maxWidth="1300px"
      actions={
        <Badge variant="danger">
          <AlertCircle size={12} aria-hidden="true" className="mr-1" /> High Risk
        </Badge>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Model Summary */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card padding="lg" className="border-blue-500/30 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />

            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 relative z-10">
              <Activity size={20} className="text-blue-400" aria-hidden="true" /> TTF Forecast &amp; Bottlenecks
            </h3>

            <div className="relative z-10">
              <p className="text-[#8899AA] text-sm leading-relaxed mb-6">
                Kaarya&apos;s predictive model estimates a{" "}
                <strong className="text-white">Time-to-Fill (TTF) of 58 days</strong>, exceeding
                the SLAs by 13 days. The primary bottleneck is detected at the{" "}
                <strong className="text-amber-500">Technical Interview</strong> stage, where
                historical pass rates for this hiring manager are 12% below the department average
                resulting in top-of-funnel decay.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card padding="md">
                  <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">
                    Predicted TTF
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    58 <span className="text-sm font-normal text-[#8899AA]">Days</span>
                  </div>
                </Card>
                <Card padding="md">
                  <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">
                    Offer Acceptance
                  </div>
                  <div className="text-2xl font-bold text-amber-500">62%</div>
                  <div className="text-[10px] text-amber-500/80 mt-1 uppercase tracking-wider">
                    -8% vs baseline
                  </div>
                </Card>
                <Card padding="md" className="col-span-2 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">
                      Optimal Sourcing Channel
                    </div>
                    <div className="text-lg font-bold text-emerald-400">Employee Referrals</div>
                  </div>
                  <div
                    aria-label="65% success probability"
                    className="w-12 h-12 rounded-full border-4 border-[#1A2A3A] border-t-emerald-400 flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-emerald-400">65%</span>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="flex flex-col min-h-[300px]">
            <h3 className="text-white font-semibold mb-6">Predicted Funnel Conversion</h3>
            <div className="flex-1 w-full min-h-[250px]">
              <ClientOnly>
                <ChartWrapper height="h-full">
                  <BarChart
                    data={funnelForecast}
                    layout="vertical"
                    margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1A2A3A" />
                    <XAxis
                      type="number"
                      stroke="#445566"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      dataKey="stage"
                      type="category"
                      stroke="#8899AA"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      width={80}
                    />
                    <RechartsTooltip
                      cursor={{ fill: "#1A2A3A" }}
                      contentStyle={{
                        backgroundColor: "#131B2B",
                        borderColor: "#2A3A4A",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="vol"
                      fill="#3b82f6"
                      barSize={24}
                      radius={[0, 4, 4, 0]}
                      name="Expected Candidates"
                    />
                  </BarChart>
                </ChartWrapper>
              </ClientOnly>
            </div>
          </Card>
        </div>

        {/* Prescriptive Panel */}
        <Card padding="none" className="flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b border-[#1A2A3A] shrink-0">
            <h3 className="text-lg font-semibold text-white">Prescriptive Interventions</h3>
            <p className="text-xs text-[#8899AA] mt-1">AI verified actions to optimize this req</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <Card padding="md" className="border-blue-500/30 hover:border-blue-500/50 transition-colors">
              <h4 className="text-white font-medium text-sm mb-2">Adjust Interview Panel</h4>
              <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                The current technical panel has a 12% lower pass rate than required to hit hiring
                targets based on top-of-funnel volume. Recommend substituting 1 reviewer.
              </p>
              <Button variant="secondary" size="sm" className="w-full text-blue-400">
                View Alternate Panelists
              </Button>
            </Card>

            <Card padding="md" className="border-amber-500/30 hover:border-amber-500/50 transition-colors">
              <h4 className="text-white font-medium text-sm mb-2">Compensation Realignment</h4>
              <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                Offer acceptance confidence is low (62%) due to recent market shifts. The current
                max budget of ₹45L is at the 40th percentile.
              </p>
              <Button variant="secondary" size="sm" className="w-full text-amber-500">
                Run Salary Benchmark
              </Button>
            </Card>

            <Card padding="md" className="border-emerald-500/30 hover:border-emerald-500/50 transition-colors">
              <h4 className="text-white font-medium text-sm mb-2">Boost Referral Bounty</h4>
              <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                Referrals are predicted to be the most viable channel (65% probability of success).
                Temporarily increasing the bounty by ₹50k can increase lead gen by 3x.
              </p>
              <Button variant="secondary" size="sm" className="w-full text-emerald-400">
                Approve Budget Increase
              </Button>
            </Card>
          </div>
        </Card>
      </div>
    </Page>
  );
}
