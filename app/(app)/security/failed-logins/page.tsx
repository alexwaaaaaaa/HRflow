"use client";

import { ShieldAlert, Download, AlertTriangle, Fingerprint, MapPin, Search } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const LOG_ROWS = [
  { time: "10 mins ago", email: "admin@company.com", ip: "45.22.11.9", loc: "Moscow, RU", reason: "Invalid Password", status: "Locked", threat: true },
  { time: "12 mins ago", email: "admin@company.com", ip: "45.22.11.9", loc: "Moscow, RU", reason: "Invalid Password", status: "Active", threat: false },
  { time: "1 hour ago", email: "sarah.j@company.com", ip: "112.44.55.1", loc: "London, UK", reason: "MFA Failed", status: "Active", threat: false },
  { time: "3 hours ago", email: "unknown_user@company.com", ip: "10.0.0.4", loc: "Bangalore, IN", reason: "User not found", status: "N/A", threat: false },
  { time: "Yesterday", email: "finance@company.com", ip: "198.51.100.2", loc: "Reston, US", reason: "Suspicious IP Blocked", status: "Active", threat: true },
] as const;

export default function FailedLoginsPage() {
  return (
    <Page
      title="Failed Login Attempts"
      subtitle="Review denied access logs to detect brute-force attacks and locked accounts."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Failed Logins" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>
          Export Logs
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Quick stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
            <div className="rounded-lg bg-rose-500/10 p-3 text-rose-400">
              <ShieldAlert size={24} aria-hidden="true" />
            </div>
            <div>
              <div className="text-2xl font-black text-rose-400">124</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">Failed (Last 24h)</div>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] p-4">
            <div className="rounded-lg bg-[#131B2B] p-3 text-[#556677]">
              <Fingerprint size={24} aria-hidden="true" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">4</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">Accounts Locked</div>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] p-4">
            <div className="rounded-lg bg-[#131B2B] p-3 text-[#556677]">
              <MapPin size={24} aria-hidden="true" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">45.22.11.9</div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Top Offending IP</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <Card padding="none" className="overflow-hidden">
          <div className="flex items-center border-b border-[#1A2A3A] bg-[#060D1A] px-4 py-4">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search logs..."
                aria-label="Search failed login logs"
                className="h-9 w-64 rounded-lg border border-[#2A3A4A] bg-[#131B2B] pl-9 pr-4 text-sm text-white outline-none transition-colors focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" aria-label="Failed login attempts">
              <thead className="bg-[#0A1420] text-xs uppercase tracking-wider text-[#8899AA]">
                <tr>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Time</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Attempted Email</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">IP &amp; Location</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Reason</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Account Status</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2A3A]">
                {LOG_ROWS.map((row, i) => (
                  <tr key={i} className="group transition-colors hover:bg-[#131B2B]">
                    <td className="px-6 py-4 text-[#8899AA]">{row.time}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-medium text-white">
                        {row.threat && <AlertTriangle size={14} className="text-rose-400" aria-hidden="true" />}
                        {row.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs text-white">{row.ip}</div>
                      <div className={`text-xs ${row.threat ? "font-bold text-rose-400" : "text-[#556677]"}`}>
                        {row.loc}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#CCDDEE]">{row.reason}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={row.status === "Locked" ? "danger" : row.status === "Active" ? "neutral" : "neutral"}
                      >
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-400 opacity-0 transition-colors hover:text-white group-hover:opacity-100">
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Page>
  );
}
