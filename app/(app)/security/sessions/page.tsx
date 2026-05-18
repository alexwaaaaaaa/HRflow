"use client";

import { Activity, Search, Filter, Monitor, Smartphone, Globe, XCircle, AlertTriangle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const SESSIONS = [
  { user: "Meera Venkatesh", email: "meera.v@company.com", device: "MacBook Pro", os: "macOS Sonoma", browser: "Chrome 120.0", ip: "203.0.113.42", loc: "Bangalore, IN", time: "Active Now", current: true, DeviceIcon: Monitor, iconColor: "text-emerald-400", warning: false },
  { user: "Rajesh Kumar", email: "rajesh.k@company.com", device: "Windows PC", os: "Windows 11", browser: "Edge 119.0", ip: "112.44.55.1", loc: "Delhi, IN", time: "2 hours ago", current: false, DeviceIcon: Monitor, iconColor: "text-[#556677]", warning: false },
  { user: "Sanjay Dutt", email: "sanjay.d@company.com", device: "iPhone 14 Pro", os: "iOS 17.2", browser: "Kaarya Mobile App", ip: "45.22.11.9", loc: "Mumbai, IN", time: "5 hours ago", current: false, DeviceIcon: Smartphone, iconColor: "text-[#556677]", warning: false },
  { user: "Guest External", email: "ext.auditor@firm.com", device: "Unknown Linux", os: "Linux", browser: "Firefox 115.0", ip: "198.51.100.2", loc: "Reston, US", time: "1 day ago", current: false, DeviceIcon: Globe, iconColor: "text-amber-400", warning: true },
  { user: "Priya Sharma", email: "head.sales@company.com", device: "iPad Air", os: "iPadOS 17", browser: "Safari 17.0", ip: "203.0.113.10", loc: "Bangalore, IN", time: "2 days ago", current: false, DeviceIcon: Smartphone, iconColor: "text-[#556677]", warning: false },
];

export default function ActiveSessionsPage() {
  return (
    <Page
      title="Active Sessions"
      subtitle="Monitor and revoke currently active logins across the workspace."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Sessions" },
      ]}
      maxWidth="1300px"
      actions={
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={<Filter size={16} aria-hidden="true" />}>
            Filter Devices
          </Button>
          <Button variant="danger" icon={<XCircle size={16} aria-hidden="true" />}>
            Revoke All Sessions
          </Button>
        </div>
      }
    >
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060D1A] px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search user or IP..."
                aria-label="Search user or IP"
                className="h-9 w-64 rounded-lg border border-[#2A3A4A] bg-[#131B2B] pl-9 pr-4 text-sm text-white outline-none transition-colors focus:border-indigo-500"
              />
            </div>
            <span className="text-xs font-bold text-[#556677]">412 Active</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm" aria-label="Active sessions">
            <thead className="bg-[#0A1420] text-xs uppercase tracking-wider text-[#8899AA]">
              <tr>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">User</th>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Device / Browser</th>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">IP &amp; Location</th>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Login Time</th>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Status</th>
                <th className="border-b border-[#1A2A3A] px-6 py-4 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A2A3A]">
              {SESSIONS.map((row, i) => {
                const DeviceIcon = row.DeviceIcon;
                return (
                  <tr key={i} className="group transition-colors hover:bg-[#131B2B]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-xs font-bold text-white">
                          {row.user.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{row.user}</div>
                          <div className="text-xs text-[#556677]">{row.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <DeviceIcon size={18} className={row.iconColor} aria-hidden="true" />
                        <div>
                          <div className="font-medium text-white">
                            {row.device}{" "}
                            <span className="text-xs text-[#8899AA]">({row.os})</span>
                          </div>
                          <div className="text-xs text-[#556677]">{row.browser}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {row.warning && (
                          <AlertTriangle size={14} className="text-amber-400" aria-hidden="true" />
                        )}
                        <div>
                          <div className="font-mono text-sm text-white">{row.ip}</div>
                          <div className="text-xs text-[#556677]">{row.loc}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#8899AA]">{row.time}</td>
                    <td className="px-6 py-4">
                      {row.current ? (
                        <Badge variant="success">Current Session</Badge>
                      ) : (
                        <Badge variant="neutral">
                          <Activity size={10} aria-hidden="true" className="mr-1" /> Active
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!row.current && (
                        <button className="rounded-lg px-3 py-1.5 text-xs font-bold text-rose-400 opacity-0 transition-colors hover:bg-rose-500/20 hover:text-white group-hover:opacity-100">
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#1A2A3A] bg-[#060D1A] px-4 py-4">
          <div className="text-xs text-[#556677]">Showing 1–5 of 412</div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" disabled>Prev</Button>
            <Button variant="secondary" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </Page>
  );
}
