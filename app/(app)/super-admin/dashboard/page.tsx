"use client";

import Link from "next/link";
import { Server, Activity, Users, Building2, TrendingUp, DollarSign, AlertTriangle, ShieldCheck, Zap } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";

// migrated: immersive-ui

const NODE_LOAD_CLASSES: Record<string, string> = {
  ok: "bg-indigo-500",
  warn: "bg-amber-500",
};

const NODE_BORDER_CLASSES: Record<string, string> = {
  ok: "bg-[#131B2B] border-[#2A3A4A]",
  warn: "bg-amber-500/5 border-amber-500/20",
};

export default function SuperAdminDashboardPage() {
  return (
    <Page
      title="Titan Dashboard"
      subtitle="Platform overview across all organizations, nodes, and revenues."
      maxWidth="1300px"
      actions={
        <div className="flex items-center gap-2 bg-[#131B2B] border border-[#2A3A4A] px-4 py-2 rounded-lg text-xs font-bold text-white">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          Live Updates
        </div>
      }
    >
      <div className="space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md">
            <p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Total Organizations</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-white">4,281</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 pb-1">
                <TrendingUp size={12} aria-hidden="true" /> +42 this week
              </span>
            </div>
          </Card>
          <Card padding="md">
            <p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Total Employees Managed</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-white">1.14M</span>
              <span className="text-xs font-bold text-emerald-400 pb-1">+12k MRR net</span>
            </div>
          </Card>
          <Card padding="md">
            <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">Annual Recurring Revenue</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-white">$14.2M</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 pb-1">
                <TrendingUp size={12} aria-hidden="true" /> 24% YOY
              </span>
            </div>
          </Card>
          <Card padding="md">
            <p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Avg API Latency (p99)</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-white">42ms</span>
              <span className="text-xs font-bold text-emerald-400 pb-1">Stable</span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Infrastructure Status */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Server size={18} className="text-[#7a8fa6]" aria-hidden="true" /> Infrastructure Status
                </h2>
                <Link href="/super-admin/health" className="text-xs font-bold text-indigo-400 hover:text-white transition-colors">
                  View Grafana
                </Link>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Core API Nodes", stat: "48 / 48 Online", load: "32%", loadNum: 32, status: "ok" },
                  { name: "Payroll Workers", stat: "128 / 128 Online", load: "68%", loadNum: 68, status: "ok" },
                  { name: "DB Read Replicas", stat: "12 / 12 Online", load: "45%", loadNum: 45, status: "ok" },
                  { name: "Search Elastic", stat: "High Memory", load: "92%", loadNum: 92, status: "warn" },
                ].map((node) => (
                  <div key={node.name} className={`border rounded-xl p-4 ${NODE_BORDER_CLASSES[node.status]}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-2 h-2 rounded-full ${node.status === "ok" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">{node.name}</h3>
                    <div className={`text-xs font-mono font-bold mb-3 ${node.status === "warn" ? "text-amber-400" : "text-[#8899AA]"}`}>
                      {node.stat}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[#7a8fa6] font-bold uppercase">
                        <span>Load</span>
                        <span>{node.load}</span>
                      </div>
                      <div
                        role="progressbar"
                        aria-valuenow={node.loadNum}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${node.name} load: ${node.load}`}
                        className="h-1.5 w-full bg-[#0A1420] rounded-full overflow-hidden"
                      >
                        <div
                          className={`h-full rounded-full ${NODE_LOAD_CLASSES[node.status]}`}
                          style={{ width: node.load }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Global Alerts */}
          <Card padding="none">
            <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A]">
              <h2 className="text-lg font-bold text-white">Global Alerts</h2>
            </div>
            <div className="p-2 space-y-1">
              <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="text-white font-bold text-sm">ElasticSearch High Memory</h4>
                  <p className="text-xs text-[#8899AA] mt-1">
                    Cluster ap-south-1 experiencing high JVM heap usage. Auto-scale triggered.
                  </p>
                  <div className="text-[10px] text-[#7a8fa6] mt-2 font-mono">12 mins ago</div>
                </div>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl flex items-start gap-3">
                <Zap size={18} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="text-white font-bold text-sm">API Rate Limit Approaching</h4>
                  <p className="text-xs text-[#8899AA] mt-1">
                    Org: &ldquo;TechCorp India&rdquo; hitting 90% of dedicated tier limit.
                  </p>
                  <div className="text-[10px] text-[#7a8fa6] mt-2 font-mono">1 hour ago</div>
                </div>
              </div>
              <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck size={18} className="text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="text-white font-bold text-sm">SOC 2 Audit Dump Ready</h4>
                  <p className="text-xs text-[#8899AA] mt-1">
                    Monthly compliance snapshot generated across 4,281 tenants.
                  </p>
                  <div className="text-[10px] text-[#7a8fa6] mt-2 font-mono">System • Today</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick nav icons (decorative) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: "Organizations", href: "/super-admin/organizations", icon: Building2 },
            { label: "Revenue", href: "/super-admin/revenue", icon: DollarSign },
            { label: "Usage", href: "/super-admin/usage", icon: Activity },
            { label: "Users", href: "/super-admin/organizations", icon: Users },
            { label: "Health", href: "/super-admin/health", icon: Server },
            { label: "Audits", href: "/super-admin/audits", icon: ShieldCheck },
            { label: "Billing", href: "/super-admin/billing", icon: TrendingUp },
            { label: "Support", href: "/super-admin/support", icon: AlertTriangle },
          ].map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#0A1420] border border-[#1A2A3A] hover:border-[#2A3A4A] transition-colors text-center"
            >
              <Icon size={20} className="text-[#7a8fa6]" aria-hidden="true" />
              <span className="text-[10px] font-bold text-[#8899AA] uppercase tracking-wider">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </Page>
  );
}
