"use client";

import { FileCheck, Download, Search, AlertCircle, ShieldEllipsis } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const CONSENT_ROWS = [
  { name: "Aditi Krishnan", role: "VP Engineering", core: true, bio: true, ai: true, date: "Oct 01, 2026", renewal: false, withdrawn: false },
  { name: "Rahul Varma", role: "SDE II", core: true, bio: true, ai: false, date: "Sep 15, 2026", renewal: false, withdrawn: false },
  { name: "Fatima Sheikh", role: "Product Manager", core: true, bio: true, ai: true, date: "Mar 10, 2025", renewal: true, withdrawn: false },
  { name: "John Doe", role: "Ex-Employee", core: false, bio: false, ai: false, date: "Jan 05, 2026", renewal: false, withdrawn: true },
];

function ConsentBadge({ granted }: { granted: boolean }) {
  return granted ? (
    <Badge variant="success">Granted</Badge>
  ) : (
    <Badge variant="danger">Revoked</Badge>
  );
}

export default function DPDPConsentPage() {
  return (
    <Page
      title="DPDP Act Privacy & Consent"
      subtitle="Manage Digital Personal Data Protection (DPDP) Act 2023 compliance and Data Principal registries."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "DPDP" },
      ]}
      maxWidth="1300px"
      actions={
        <Button icon={<Download size={16} aria-hidden="true" />}>Audit Export</Button>
      }
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card padding="md">
            <div className="mb-1 text-3xl font-black text-emerald-400">99.8%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">Active Consents</div>
          </Card>
          <Card padding="md">
            <div className="mb-1 text-3xl font-black text-amber-400">12</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">Pending Renewal</div>
          </Card>
          <Card padding="md">
            <div className="mb-1 text-3xl font-black text-rose-400">3</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">Withdrawn</div>
          </Card>
          <Card padding="md" className="border-indigo-500/20 bg-indigo-500/10">
            <div className="mb-2 flex items-start justify-between">
              <ShieldEllipsis size={24} className="text-indigo-400" aria-hidden="true" />
              <Badge variant="info">DPO</Badge>
            </div>
            <div className="mb-1 text-sm font-bold text-white">Data Protection Officer</div>
            <div className="text-xs text-[#8899AA]">Sanjay Dutt (Legal)</div>
          </Card>
        </div>

        {/* Consent table */}
        <Card padding="none" className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[#1A2A3A] bg-[#060D1A] px-4 py-4 md:flex-row md:items-center md:justify-between">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search Data Principal (Employee)..."
                aria-label="Search Data Principal"
                className="h-9 w-80 rounded-lg border border-[#2A3A4A] bg-[#131B2B] pl-9 pr-4 text-sm text-white outline-none transition-colors focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">Select All</Button>
              <Button variant="secondary" size="sm">Request Renewals</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" aria-label="DPDP consent registry">
              <thead className="bg-[#0A1420] text-xs uppercase tracking-wider text-[#8899AA]">
                <tr>
                  <th className="w-10 border-b border-[#1A2A3A] p-4">
                    <input type="checkbox" className="rounded border-[#3A4A5A] bg-[#131B2B] text-indigo-500 focus:ring-indigo-500" aria-label="Select all" />
                  </th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Data Principal</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Core HR Ops</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Biometric (Time)</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">AI Processing</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Last Updated</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 text-right font-bold">View Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2A3A]">
                {CONSENT_ROWS.map((row, i) => (
                  <tr key={i} className="group transition-colors hover:bg-[#131B2B]">
                    <td className="p-4">
                      <input type="checkbox" className="rounded border-[#3A4A5A] bg-[#1A2A3A] text-indigo-500 focus:ring-indigo-500" aria-label={`Select ${row.name}`} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-white">
                        {row.name}
                        {row.renewal && (
                          <AlertCircle size={14} className="text-amber-400" aria-label="Renewal overdue" />
                        )}
                      </div>
                      <div className="text-xs text-[#556677]">{row.role}</div>
                    </td>
                    <td className="px-6 py-4">
                      <ConsentBadge granted={row.core} />
                    </td>
                    <td className="px-6 py-4">
                      <ConsentBadge granted={row.bio} />
                    </td>
                    <td className="px-6 py-4">
                      {row.ai ? (
                        <Badge variant="success">Granted</Badge>
                      ) : (
                        <Badge variant="warning">Opt-Out</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#8899AA]">{row.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="ml-auto text-indigo-400 transition-colors hover:text-white"
                        aria-label={`View consent proof for ${row.name}`}
                      >
                        <FileCheck size={18} aria-hidden="true" />
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
