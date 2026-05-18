"use client";

import { Server, Cpu, Database, Network, AlertCircle, ArrowUpRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

export default function PlatformHealthPage() {
  return (
    <Page
      title="Infrastructure Telemetry"
      subtitle="Deep-dive into microservices, databases, and network latency."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Health" },
      ]}
      maxWidth="1300px"
      actions={<Badge variant="success" dot>99.99% Uptime</Badge>}
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { stat: "42ms", label: "Global API Latency (p99)", icon: Network, err: false },
            { stat: "1.2TB / 5TB", label: "Primary DB Storage", icon: Database, err: false },
            { stat: "1,204", label: "Active Webhook Queues", icon: Server, err: false },
            { stat: "92%", label: "ElasticSearch Heap", icon: Cpu, err: true },
          ].map((item) => (
            <Card key={item.label} padding="md">
              <div className={`text-3xl font-black mb-1 ${item.err ? "text-amber-400" : "text-white"}`}>{item.stat}</div>
              <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider flex items-center justify-between">
                {item.label}
                {item.err && <AlertCircle size={14} className="text-amber-400" aria-label="Warning" />}
              </div>
            </Card>
          ))}
        </div>

        {/* Service mesh topology */}
        <Card padding="none">
          <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Service Mesh Topology</h2>
            <button
              type="button"
              className="text-xs text-indigo-400 font-bold flex items-center gap-1 hover:text-white transition-colors"
            >
              View Datadog APM <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>
          <div className="p-8 h-80 flex items-center justify-center relative overflow-hidden">
            <div className="relative w-full max-w-[600px] h-[200px]">
              {/* Gateway */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 bg-[#131B2B] border border-indigo-500/30 rounded-xl p-3 text-center z-10">
                <div className="font-bold text-white text-sm mb-1">API Gateway</div>
                <div className="text-[10px] text-emerald-400">12ms • 45k req/s</div>
              </div>
              {/* Auth Service */}
              <div className="absolute top-0 left-1/3 -translate-x-1/2 w-32 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 text-center z-10">
                <div className="font-bold text-white text-sm mb-1">Auth Service</div>
                <div className="text-[10px] text-emerald-400">8ms</div>
              </div>
              {/* Payroll Core */}
              <div className="absolute bottom-0 left-1/3 -translate-x-1/2 w-32 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 text-center z-10">
                <div className="font-bold text-white text-sm mb-1">Payroll Core</div>
                <div className="text-[10px] text-emerald-400">84ms</div>
              </div>
              {/* Postgres */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-32 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 text-center z-10">
                <div className="font-bold text-white text-sm mb-1">Primary DB</div>
                <div className="text-[10px] text-[#556677]">PostgreSQL 15</div>
              </div>
              {/* Search */}
              <div className="absolute top-0 right-1/4 w-32 bg-[#131B2B] border border-amber-500/50 rounded-xl p-3 text-center z-10">
                <div className="font-bold text-amber-400 text-sm mb-1">Search Nodes</div>
                <div className="text-[10px] text-amber-400">High JVM Heap</div>
              </div>
              {/* SVG Lines */}
              <svg className="absolute inset-0 w-full h-full -z-10" aria-hidden="true">
                <path d="M 128 100 L 200 50" stroke="#3A4A5A" strokeWidth="2" fill="none" />
                <path d="M 128 100 L 200 150" stroke="#3A4A5A" strokeWidth="2" fill="none" />
                <path d="M 200 50 L 400 50" stroke="#3A4A5A" strokeWidth="2" fill="none" />
                <path d="M 200 150 L 472 100" stroke="#3A4A5A" strokeWidth="2" fill="none" />
                <path d="M 200 50 L 472 100" stroke="#3A4A5A" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
