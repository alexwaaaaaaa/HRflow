"use client";

import React from "react";
import { Calendar, AlertCircle, Clock, User, Activity } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { seededFloats } from "@/lib/random";

// ─── Seeded decorative values ────────────────────────────────────────────────

// Bar heights for the 10-month timeline (seeded, not random)
const BAR_HEIGHTS = seededFloats(5501, 10).map((v) => Math.round(20 + v * 70));

// ─── Data ────────────────────────────────────────────────────────────────────

const employee = {
  name: "Priya Desai",
  id: "EMP-055",
  role: "Senior Product Designer",
  dept: "Design",
  manager: "Ankit Patel",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LeavePatternDetailScreen() {
  return (
        <Page
      title={employee.name}
      subtitle={`${employee.id} · ${employee.role} · Manager: ${employee.manager}`}
      breadcrumbs={[
        { label: "AI", href: "/ai/leave-pattern" },
        { label: "Leave Pattern", href: "/ai/leave-pattern" },
        { label: employee.name },
      ]}
      maxWidth="1300px"
      actions={
        <Badge variant="warning">








          <AlertCircle size={12} aria-hidden="true" className="mr-1" /> Critical Burnout Risk
        </Badge>
      }
    >
      {/* Profile & Alert Banner */}
      <Card padding="lg" className="border-amber-500/30 mb-8 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
        />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-3xl text-[#8899AA]">
              <User size={36} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{employee.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#8899AA]">
                <span>{employee.id}</span>
                <span className="w-1 h-1 rounded-full bg-[#445566]" aria-hidden="true" />
                <span>{employee.role}</span>
                <span className="w-1 h-1 rounded-full bg-[#445566]" aria-hidden="true" />
                <span>
                  Manager: <span className="text-white">{employee.manager}</span>
                </span>
              </div>
            </div>
          </div>

          <Card padding="md" className="border-amber-500/20 flex items-center gap-4 text-left">
            <AlertCircle size={28} className="text-amber-500 shrink-0" aria-hidden="true" />
            <div>
              <div className="text-amber-500 font-bold mb-1">Critical Burnout Risk</div>
              <div className="text-sm text-[#8899AA]">0 PTO days taken in 10 months</div>
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Leave Balances Matrix */}
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-white mb-6">Leave Balances</h3>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#8899AA]">Privilege Leave (PL)</span>
                <span className="text-white font-medium">18 / 20</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={90}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Privilege leave usage"
                className="w-full bg-[#1A2A3A] rounded-full h-2"
              >
                <div className="bg-blue-500 h-2 rounded-full w-[90%]" />
              </div>
              <p className="text-xs text-amber-500 mt-2">Max accrual limit approaching</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#8899AA]">Sick Leave (SL)</span>
                <span className="text-white font-medium">6 / 8</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Sick leave usage"
                className="w-full bg-[#1A2A3A] rounded-full h-2"
              >
                <div className="bg-emerald-500 h-2 rounded-full w-[75%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#8899AA]">Comp Offs</span>
                <span className="text-white font-medium">4</span>
              </div>
              <p className="text-xs text-[#8899AA] mt-1">2 expiring in 14 days</p>
            </div>
          </div>
        </Card>

        {/* AI Analysis & Timeline */}
        <Card padding="lg" className="lg:col-span-2 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity size={18} className="text-amber-400" aria-hidden="true" /> Work Pattern
            Analysis
          </h3>

          <p className="text-[#8899AA] text-sm leading-relaxed mb-6">
            Kaarya AI has cross-referenced system logins, OKR updates, and leave records. Priya has
            maintained an average daily active time of{" "}
            <strong className="text-white">10.2 hours</strong> over the last quarter, significantly
            above the department average of 8.4 hours. Coupled with the lack of PTO, this creates an
            extremely high probability of imminent burnout leading to diminished productivity or
            attrition.
          </p>

          <Card padding="md" className="flex-1 relative">
            <div className="absolute top-5 right-5 text-[#445566] text-xs">10 Month Timeline</div>
            <div
              className="flex justify-between items-end h-[120px] pb-6 px-4 mt-8 border-b border-[#2A3A4A] relative"
              role="img"
              aria-label="10-month work intensity timeline showing increasing load"
            >
              {BAR_HEIGHTS.map((height, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <div
                    className={`w-8 rounded-t-sm transition-all duration-300 ${i > 6 ? "bg-amber-500/80 group-hover:bg-amber-400" : "bg-[#2A3A4A] group-hover:bg-[#445566]"}`}
                    style={{ height: `${height}px` }}
                  />
                  <span className="text-[10px] text-[#8899AA] font-mono">M{i + 1}</span>
                </div>
              ))}
              <div
                aria-hidden="true"
                className="absolute top-[40px] left-0 right-0 border-t border-dashed border-red-500/30"
              />
              <div
                aria-hidden="true"
                className="absolute top-[25px] right-2 text-[10px] text-red-500/50 uppercase tracking-widest"
              >
                Burnout Threshold
              </div>
            </div>
          </Card>
        </Card>
      </div>

      {/* Prescriptive Interventions */}
      <h3 className="text-lg font-semibold text-white mb-4">Recommended Interventions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="lg" className="border-emerald-500/30 hover:bg-[#131B2B] transition-colors cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 shrink-0">
              <Calendar size={18} aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-1">Mandatory Cool-down Block</h4>
              <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                Mandate a minimum 3-day continuous PTO block by the end of next month. Automate
                calendar blocking and out-of-office setup.
              </p>
              <Button size="sm">Propose to Manager</Button>
            </div>
          </div>
        </Card>

        <Card padding="lg" className="hover:bg-[#131B2B] transition-colors cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="bg-[#1A2A3A] p-2 rounded-lg text-[#8899AA] shrink-0">
              <Clock size={18} aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-1">Enforce Comp Off Usage</h4>
              <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                2 comp off days are expiring on Nov 15th. Auto-apply these to upcoming Fridays to
                create long weekends.
              </p>
              <Button variant="secondary" size="sm">
                Schedule Auto-Apply
              </Button>
            </div>
          </div>
        </Card>
      </div>
    

        

        

            
        </Page>
    );
}
