"use client";

import { useState } from "react";
import { Megaphone, MessageSquare, Send, Users, Eye } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

type BroadcastType = "feature" | "maintenance" | "outage";

const TYPE_LABELS: Record<BroadcastType, string> = {
  feature: "Feature Release",
  maintenance: "Maintenance Alert",
  outage: "Critical Outage",
};

const TYPE_VARIANT: Record<BroadcastType, "info" | "warning" | "danger"> = {
  feature: "info",
  maintenance: "warning",
  outage: "danger",
};

interface HistoryItem {
  id: string;
  title: string;
  body: string;
  audience: string;
  views: string;
  date: string;
  type: BroadcastType;
}

const HISTORY: HistoryItem[] = [
  {
    id: "b1",
    title: "Scheduled Maintenance: Payroll DB Migration",
    body: "We will be performing scheduled database optimizations. Payroll operations may be delayed between 02:00 AM - 04:00 AM IST.",
    audience: "Finance Leads",
    views: "3,412 Views",
    date: "Yesterday",
    type: "maintenance",
  },
  {
    id: "b2",
    title: "Critical: Bank API Outage Incident",
    body: "Our partner bank is experiencing downtime. Neobank disbursements and instant withdrawals are temporarily paused. Teams are investigating.",
    audience: "GLOBAL BROADCAST (ALL)",
    views: "945K Views",
    date: "Oct 20, 2026",
    type: "outage",
  },
];

export default function PlatformAnnouncementsPage() {
  const [broadcastType, setBroadcastType] = useState<BroadcastType>("feature");

  return (
    <Page
      title="Platform Broadcasts"
      subtitle="Push in-app notifications, downtime alerts, or feature releases to organization Admins or ALL employees."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Announcements" },
      ]}
      maxWidth="1100px"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Composer */}
        <Card padding="lg">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
            <Megaphone size={18} className="text-indigo-400" aria-hidden="true" />
            Compose Broadcast
          </h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="audience" className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">
                Target Audience
              </label>
              <select
                id="audience"
                className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white text-sm rounded-lg p-2.5 outline-none focus:border-indigo-500"
              >
                <option>Organization Instance Admins Only</option>
                <option>All HR Admins (Global)</option>
                <option>Finance Leads (Global)</option>
                <option>All Active Employees (Force Global Broadcast)</option>
              </select>
            </div>

            <fieldset>
              <legend className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block mb-2">
                Broadcast Type
              </legend>
              <div className="flex gap-2" role="radiogroup" aria-label="Broadcast type">
                {(["feature", "maintenance", "outage"] as BroadcastType[]).map((t) => (
                  <label
                    key={t}
                    className={`flex-1 rounded-lg p-2 text-center text-xs font-bold cursor-pointer transition-colors border ${
                      broadcastType === t
                        ? t === "feature"
                          ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-400"
                          : t === "maintenance"
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                          : "bg-rose-500/20 border-rose-500/40 text-rose-400"
                        : "bg-[#131B2B] border-[#2A3A4A] text-[#8899AA] hover:text-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="broadcastType"
                      value={t}
                      checked={broadcastType === t}
                      onChange={() => setBroadcastType(t)}
                      className="sr-only"
                    />
                    {TYPE_LABELS[t]}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-1">
              <label htmlFor="message-body" className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">
                Message Body
              </label>
              <textarea
                id="message-body"
                className="w-full h-32 bg-[#131B2B] border border-[#2A3A4A] text-white rounded-xl p-3 text-sm resize-none outline-none focus:border-indigo-500"
                placeholder="Write broadcast message..."
                defaultValue="🚀 We're excited to launch AI Performance Reviews to all tenants today! Check your admin settings to enable."
              />
            </div>

            <Button variant="primary" icon={<Send size={16} />} className="w-full justify-center mt-4">
              Push Transmission
            </Button>
          </div>
        </Card>

        {/* Broadcast History */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <MessageSquare size={16} className="text-[#556677]" aria-hidden="true" />
            Recent Transmissions
          </h2>

          <Card padding="none">
            <div className="divide-y divide-[#1A2A3A]">
              {HISTORY.map((item) => (
                <div key={item.id} className="p-5 hover:bg-[#131B2B] transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={TYPE_VARIANT[item.type]} dot />
                      <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    </div>
                    <span className="text-xs text-[#556677] font-mono shrink-0 ml-2">{item.date}</span>
                  </div>
                  <p className="text-xs text-[#8899AA] mb-3 line-clamp-2">{item.body}</p>
                  <div className="flex items-center gap-4 text-xs font-bold text-[#556677]">
                    <span className="flex items-center gap-1">
                      <Users size={12} aria-hidden="true" /> {item.audience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} aria-hidden="true" /> {item.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
