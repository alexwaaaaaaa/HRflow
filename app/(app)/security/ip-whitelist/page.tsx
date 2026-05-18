"use client";

import { useState } from "react";
import { Globe, Plus, Trash2, Edit2, ShieldCheck, ShieldOff, AlertCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const WHITELIST = [
  { ip: "192.168.1.0/24", desc: "Bangalore HQ Office (Main)", by: "System Admin" },
  { ip: "10.0.0.0/8", desc: "Corporate VPN Range", by: "Meera V. (HR)" },
  { ip: "45.22.11.9", desc: "CEO Home Office (Static)", by: "System Admin" },
  { ip: "198.51.100.2", desc: "External Vendor API Gateway", by: "Aditi K. (Eng)" },
];

export default function IPWhitelistPage() {
  const [strictMode, setStrictMode] = useState(true);

  return (
    <Page
      title="IP Whitelist Management"
      subtitle="Restrict workspace access to verified corporate networks and VPNs."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "IP Whitelist" },
      ]}
      maxWidth="1200px"
      actions={
        <Button icon={<Plus size={16} aria-hidden="true" />}>Add IP / Subnet</Button>
      }
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Control panel */}
        <div className="space-y-6 md:col-span-1">
          <Card padding="lg" className="relative overflow-hidden">
            <div
              className={`pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl transition-colors ${strictMode ? "bg-emerald-500/10" : "bg-rose-500/10"}`}
              aria-hidden="true"
            />
            <div className="relative z-10 mb-6 flex items-start gap-4">
              <div
                className={`rounded-xl border p-3 ${strictMode ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-rose-500/20 bg-rose-500/10 text-rose-400"}`}
              >
                {strictMode ? <ShieldCheck size={24} aria-hidden="true" /> : <ShieldOff size={24} aria-hidden="true" />}
              </div>
              <div>
                <h2 className="mb-1 text-lg font-bold text-white">Strict Enforcement</h2>
                <p className="text-xs text-[#8899AA]">Block all non-whitelisted IPs</p>
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-between rounded-xl border border-[#2A3A4A] bg-[#131B2B] p-4">
              <span className="text-sm font-bold text-white">Status</span>
              <button
                role="switch"
                aria-checked={strictMode}
                onClick={() => setStrictMode(!strictMode)}
                className={`relative h-6 w-12 rounded-full transition-colors ${strictMode ? "bg-emerald-500" : "bg-[#2A3A4A]"}`}
              >
                <div
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${strictMode ? "left-7" : "left-1"}`}
                />
                <span className="sr-only">{strictMode ? "Strict mode enabled" : "Strict mode disabled"}</span>
              </button>
            </div>
          </Card>

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-indigo-400">
              <AlertCircle size={16} aria-hidden="true" /> VPN Note
            </h3>
            <p className="text-xs leading-relaxed text-[#8899AA]">
              Employees working remotely must connect to the corporate VPN (10.0.0.0/8) to access HRFlow, unless their home IP is explicitly bypassed.
            </p>
          </div>
        </div>

        {/* Whitelist table */}
        <Card padding="none" className="flex flex-col overflow-hidden md:col-span-2">
          <div className="border-b border-[#1A2A3A] bg-[#060D1A] px-5 py-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <Globe size={18} className="text-[#556677]" aria-hidden="true" /> Allowed Networks
            </h2>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm" aria-label="IP whitelist">
              <thead className="bg-[#0A1420] text-xs uppercase tracking-wider text-[#8899AA]">
                <tr>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">IP / CIDR Block</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Description</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Added By</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2A3A] font-mono">
                {WHITELIST.map((row, i) => (
                  <tr key={i} className="group transition-colors hover:bg-[#131B2B]">
                    <td className="px-6 py-4 font-bold text-emerald-400">{row.ip}</td>
                    <td className="px-6 py-4 font-sans text-sm text-white">{row.desc}</td>
                    <td className="px-6 py-4 text-xs text-[#556677]">{row.by}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          className="text-[#8899AA] transition-colors hover:text-indigo-400"
                          aria-label={`Edit ${row.ip}`}
                        >
                          <Edit2 size={16} aria-hidden="true" />
                        </button>
                        <button
                          className="text-[#8899AA] transition-colors hover:text-rose-400"
                          aria-label={`Delete ${row.ip}`}
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
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
