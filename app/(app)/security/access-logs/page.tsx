"use client";

import { Database, Search, Download, Filter, Eye, PenTool, Trash2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const LOG_ROWS = [
  { time: "2026-10-24 14:05:12", user: "meera.v@company.com", act: "READ", actIcon: Eye, actColor: "text-sky-400", res: "grievance_case:GRV-2026-142", ip: "203.0.113.42", result: "ALLOW" },
  { time: "2026-10-24 13:42:01", user: "system_background", act: "UPDATE", actIcon: PenTool, actColor: "text-amber-400", res: "payroll_run:OCT-26", ip: "Internal", result: "ALLOW" },
  { time: "2026-10-24 11:15:33", user: "rajesh.k@company.com", act: "READ", actIcon: Eye, actColor: "text-sky-400", res: "employee_profile:all_salary_data", ip: "112.44.55.1", result: "DENY (403)" },
  { time: "2026-10-24 09:30:00", user: "admin.super@company.com", act: "DELETE", actIcon: Trash2, actColor: "text-rose-400", res: "employee_record:EMP-0012", ip: "192.168.1.1", result: "ALLOW" },
  { time: "2026-10-23 22:10:45", user: "ext.auditor@firm.com", act: "READ", actIcon: Eye, actColor: "text-sky-400", res: "compliance_report:Q3", ip: "198.51.100.2", result: "ALLOW" },
  { time: "2026-10-23 15:22:11", user: "sarah.j@company.com", act: "UPDATE", actIcon: PenTool, actColor: "text-amber-400", res: "settings:mfa_policy", ip: "10.0.0.5", result: "ALLOW" },
] as const;

export default function DataAccessLogPage() {
  return (
    <Page
      title="Data Access Audit Logs"
      subtitle="Comprehensive legally-binding trails of all operations on PII, financials, and company data."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Access Logs" },
      ]}
      maxWidth="1300px"
      actions={
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={<Filter size={16} aria-hidden="true" />}>
            Filter Event Type
          </Button>
          <Button icon={<Download size={16} aria-hidden="true" />}>Export to CSV</Button>
        </div>
      }
    >
      <Card padding="none" className="overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060D1A] px-4 py-4">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search resource, user, or IP..."
              aria-label="Search resource, user, or IP"
              className="h-9 w-80 rounded-lg border border-[#2A3A4A] bg-[#131B2B] pl-9 pr-4 text-sm text-white outline-none transition-colors focus:border-indigo-500"
            />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#556677]">
            Retention: 7 Years (Compliance Mode)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm" aria-label="Data access audit logs">
            <thead className="bg-[#0A1420] text-xs uppercase tracking-wider text-[#8899AA]">
              <tr>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Timestamp (UTC)</th>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Actor</th>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Action</th>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Resource</th>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Source IP</th>
                <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A2A3A] font-mono text-xs">
              {LOG_ROWS.map((row, i) => {
                const Icon = row.actIcon;
                return (
                  <tr key={i} className="cursor-default transition-colors hover:bg-[#131B2B]">
                    <td className="px-6 py-3 text-[#8899AA]">{row.time}</td>
                    <td className="px-6 py-3 text-[#CCDDEE]">{row.user}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className={row.actColor} aria-hidden="true" />
                        <span className="text-white">{row.act}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-indigo-300">{row.res}</td>
                    <td className="px-6 py-3 text-[#556677]">{row.ip}</td>
                    <td className="px-6 py-3">
                      <Badge variant={row.result.includes("ALLOW") ? "success" : "danger"}>
                        {row.result}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="ml-2 mt-4 flex items-center gap-2 text-xs text-[#556677]">
        <Database size={14} aria-hidden="true" />
        <p>Logs are immutable and write-once using WORM storage architecture to prevent tampering.</p>
      </div>
    </Page>
  );
}
