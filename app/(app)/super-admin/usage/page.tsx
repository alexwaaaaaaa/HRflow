"use client";

import { Globe2, Layers } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

interface ModuleUsage {
  id: string;
  name: string;
  usage: number;
}

const MODULE_USAGE: ModuleUsage[] = [
  { id: "m1", name: "Core HR & Employee DB", usage: 100 },
  { id: "m2", name: "Leave & Attendance", usage: 94 },
  { id: "m3", name: "Payroll Engine", usage: 82 },
  { id: "m4", name: "Performance Management", usage: 45 },
  { id: "m5", name: "Expense Management", usage: 38 },
  { id: "m6", name: "Onboarding & BGV", usage: 22 },
];

export default function UsagePage() {
  return (
    <Page
      title="Product Usage Analytics"
      subtitle="Track Monthly Active Users (MAU), session times, and feature adoption across tenants."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Usage" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-6">
        {/* Real-time KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="lg">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
              <Badge variant="info">Live Now</Badge>
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2 mt-2">Concurrent Active Sessions</div>
            <div className="text-5xl font-black text-white">42,891</div>
          </Card>
          <Card padding="lg">
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Monthly Active Employees (MAU)</div>
            <div className="text-4xl font-black text-white flex items-end gap-2">
              980K <span className="text-sm font-bold text-emerald-400 pb-1.5">+12%</span>
            </div>
          </Card>
          <Card padding="lg">
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Avg Daily Session Time</div>
            <div className="text-4xl font-black text-white">12m 45s</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Module adoption */}
          <Card padding="lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Layers size={18} className="text-[#556677]" aria-hidden="true" /> Module Utilization (Active Workspaces)
            </h3>
            <div className="space-y-6">
              {MODULE_USAGE.map((mod) => (
                <div key={mod.id}>
                  <div className="flex justify-between text-sm font-bold text-white mb-2">
                    <span>{mod.name}</span>
                    <span>{mod.usage}%</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={mod.usage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${mod.name}: ${mod.usage}%`}
                    className="h-2 w-full bg-[#131B2B] rounded-full overflow-hidden"
                  >
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${mod.usage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Geographic traffic */}
          <Card padding="lg" className="flex flex-col items-center justify-center relative">
            <div className="absolute top-6 left-6 font-bold text-white flex items-center gap-2">
              <Globe2 size={18} className="text-[#556677]" aria-hidden="true" /> Regional Traffic Map
            </div>
            <div className="text-center">
              <Globe2 size={64} className="text-[#2A3A4A] mx-auto mb-4" aria-hidden="true" />
              <span className="text-[#556677] text-sm font-bold uppercase tracking-widest">Geographical Visualization Area</span>
              <div className="mt-8 space-y-2 text-sm text-[#8899AA] text-left">
                <div className="flex justify-between w-48 mx-auto">
                  <span className="text-white font-bold">India</span> 85%
                </div>
                <div className="flex justify-between w-48 mx-auto">
                  <span className="text-white font-bold">UAE</span> 8%
                </div>
                <div className="flex justify-between w-48 mx-auto">
                  <span className="text-white font-bold">USA</span> 5%
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
