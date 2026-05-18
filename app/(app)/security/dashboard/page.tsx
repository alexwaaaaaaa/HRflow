"use client";

import {
  ShieldCheck,
  ShieldAlert,
  Activity,
  Server,
  Users,
  Key,
  AlertTriangle,
  Fingerprint,
  Lock,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type EventStatus = "Blocked" | "Warning" | "Info";

const STATUS_VARIANT: Record<EventStatus, "danger" | "warning" | "neutral"> = {
  Blocked: "danger",
  Warning: "warning",
  Info: "neutral",
};

const RECENT_EVENTS = [
  { icon: AlertTriangle, iconColor: "text-rose-400", event: "Multiple Failed Logins", user: "rajesh.k@company.com", time: "2 mins ago", ip: "45.22.11.9", loc: "Mumbai, IN", status: "Blocked" as EventStatus },
  { icon: Lock, iconColor: "text-indigo-400", event: "MFA Disabled", user: "admin.super@company.com", time: "1 hr ago", ip: "192.168.1.1", loc: "Internal Network", status: "Warning" as EventStatus },
  { icon: Server, iconColor: "text-sky-400", event: "Bulk Export (Payroll Data)", user: "finance.lead@company.com", time: "3 hrs ago", ip: "10.0.0.4", loc: "Bangalore, IN", status: "Info" as EventStatus },
  { icon: Fingerprint, iconColor: "text-[#556677]", event: "New Device Login", user: "sarah.j@company.com", time: "5 hrs ago", ip: "112.44.55.1", loc: "London, UK", status: "Info" as EventStatus },
  { icon: Users, iconColor: "text-emerald-400", event: "Role Escalation", user: "System Admin", time: "Yesterday", ip: "10.0.0.1", loc: "Internal Network", status: "Info" as EventStatus },
];

export default function SecurityDashboardPage() {
  return (
    <Page
      title="Security Command Center"
      subtitle="Monitor workspace security posture, access logs, and DPDP compliance in real-time."
      breadcrumbs={[{ label: "Security", href: "/security/dashboard" }, { label: "Dashboard" }]}
      maxWidth="1300px"
      actions={
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={<Lock size={16} aria-hidden="true" />}>
            Enforce MFA All
          </Button>
          <Button icon={<ShieldCheck size={16} aria-hidden="true" />} href="/security/reports">
            Security Report
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card padding="md" className="group relative overflow-hidden hover:border-[#2A3A4A]">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-colors group-hover:bg-emerald-500/10" aria-hidden="true" />
            <div className="relative z-10 mb-4 flex items-start justify-between">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-emerald-400">
                <ShieldCheck size={20} aria-hidden="true" />
              </div>
              <Badge variant="success">Healthy</Badge>
            </div>
            <div className="relative z-10 mb-1 text-3xl font-black text-white">
              98<span className="ml-1 text-xl text-[#556677]">%</span>
            </div>
            <div className="relative z-10 text-sm font-medium text-[#8899AA]">Security Score</div>
          </Card>

          <Card padding="md" className="group relative overflow-hidden hover:border-[#2A3A4A]">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-sky-500/5 blur-2xl transition-colors group-hover:bg-sky-500/10" aria-hidden="true" />
            <div className="relative z-10 mb-4">
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-2.5 text-sky-400 w-fit">
                <Activity size={20} aria-hidden="true" />
              </div>
            </div>
            <div className="relative z-10 mb-1 text-3xl font-black text-white">412</div>
            <div className="relative z-10 text-sm font-medium text-[#8899AA]">Active Sessions</div>
          </Card>

          <Card padding="md" className="group relative overflow-hidden hover:border-[#2A3A4A]">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-500/5 blur-2xl transition-colors group-hover:bg-indigo-500/10" aria-hidden="true" />
            <div className="relative z-10 mb-4">
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-2.5 text-indigo-400 w-fit">
                <Key size={20} aria-hidden="true" />
              </div>
            </div>
            <div className="relative z-10 mb-1 text-3xl font-black text-white">24</div>
            <div className="relative z-10 text-sm font-medium text-[#8899AA]">API Keys Active</div>
          </Card>

          <Card padding="md" className="group relative overflow-hidden hover:border-rose-500/30">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-rose-500/5 blur-2xl transition-colors group-hover:bg-rose-500/10" aria-hidden="true" />
            <div className="relative z-10 mb-4 flex items-start justify-between">
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-2.5 text-rose-400">
                <ShieldAlert size={20} aria-hidden="true" />
              </div>
              <Badge variant="danger">Action Req</Badge>
            </div>
            <div className="relative z-10 mb-1 text-3xl font-black text-white">3</div>
            <div className="relative z-10 text-sm font-medium text-[#8899AA]">Open Incidents</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent events */}
          <Card padding="none" className="flex flex-col overflow-hidden lg:col-span-2">
            <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060D1A] px-5 py-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <Fingerprint size={18} className="text-[#556677]" aria-hidden="true" /> Recent Events
              </h2>
              <Link href="/security/access-logs" className="text-sm font-bold text-indigo-400 transition-colors hover:text-indigo-300">
                View All Logs
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" aria-label="Recent security events">
                <tbody className="divide-y divide-[#1A2A3A]">
                  {RECENT_EVENTS.map((log, i) => {
                    const Icon = log.icon;
                    return (
                      <tr key={i} className="transition-colors hover:bg-[#131B2B]">
                        <td className="w-12 px-6 py-4">
                          <Icon size={16} className={log.iconColor} aria-hidden="true" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{log.event}</div>
                          <div className="text-xs text-[#556677]">{log.user}</div>
                        </td>
                        <td className="px-6 py-4 text-[#8899AA]">{log.time}</td>
                        <td className="px-6 py-4">
                          <div className="font-mono text-xs text-white">{log.ip}</div>
                          <div className="text-xs text-[#556677]">{log.loc}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Badge variant={STATUS_VARIANT[log.status]}>{log.status}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Right panel */}
          <div className="space-y-6">
            {/* DPDP snapshot */}
            <Card padding="md" className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl" aria-hidden="true" />
              <h3 className="relative z-10 mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                Privacy &amp; DPDP Act 2023
              </h3>
              <div className="relative z-10 space-y-3">
                {[
                  { label: "Consent Flags", sub: "99.8% Coverage", subColor: "text-emerald-400", href: "/security/dpdp" },
                  { label: "Data Deletion Requests", sub: "2 Pending Approval", subColor: "text-amber-400", href: "/security/data-deletion" },
                  { label: "Data Masking Rules", sub: "14 Active Policies", subColor: "text-[#8899AA]", href: "/security/masking" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex cursor-pointer items-center justify-between rounded-xl border border-[#2A3A4A] bg-[#131B2B] p-3 transition-colors hover:border-[#3A4A5A]"
                  >
                    <div>
                      <div className="mb-0.5 text-sm font-bold text-white">{item.label}</div>
                      <div className={`text-xs ${item.subColor}`}>{item.sub}</div>
                    </div>
                    <ChevronRight size={16} className="text-[#556677] transition-colors group-hover:text-white" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </Card>

            {/* Global access map */}
            <Card padding="md" className="relative flex h-48 flex-col items-center justify-center overflow-hidden">
              <div className="relative z-10 text-center">
                <Server size={32} className="mx-auto mb-3 text-[#2A3A4A]" aria-hidden="true" />
                <h3 className="mb-1 text-sm font-bold text-white">Global Access Map</h3>
                <p className="text-xs text-[#556677]">Only internal network and IN/US IPs permitted.</p>
                <Link href="/security/ip-whitelist" className="mt-2 inline-block text-xs font-bold text-indigo-400 transition-colors hover:text-indigo-300">
                  Manage IP Whitelist
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
}
