"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Download,
  Eye,
  AlertTriangle,
  Lock,
  Database,
  FileText,
  Trash2,
  Edit3,
  LogIn,
  LogOut,
  Settings,
  Filter,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

type Severity = "Critical" | "High" | "Medium" | "Low" | "Info";
type AuditStatus = "Success" | "Blocked" | "Throttled";

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  resource: string;
  details: string;
  severity: Severity;
  ip: string;
  status: AuditStatus;
  type: string;
  icon: React.ElementType;
}

const EVENT_TYPES = ["All", "Login", "Data Change", "Permission", "Export", "Delete", "Settings", "API"];
const SEVERITY_LEVELS = ["All", "Critical", "High", "Medium", "Low", "Info"];

const AUDIT_LOGS: AuditLog[] = [
  { id: "AUD-8821", timestamp: "10 Mar 2026, 08:02 AM", actor: "Priya Mehta", actorRole: "Super Admin", action: "Bulk Export", resource: "Employee Records", details: "Exported 1,247 employee records to CSV", severity: "High", ip: "103.21.45.12", status: "Success", type: "Export", icon: Download },
  { id: "AUD-8820", timestamp: "10 Mar 2026, 07:58 AM", actor: "Rahul Sharma", actorRole: "HR Admin", action: "Login", resource: "Auth System", details: "Successful 2FA login from new device (iPhone 15)", severity: "Medium", ip: "49.36.12.98", status: "Success", type: "Login", icon: LogIn },
  { id: "AUD-8819", timestamp: "10 Mar 2026, 07:45 AM", actor: "System Bot", actorRole: "Automation", action: "Salary Updated", resource: "Employee: EMP-0124", details: "CTC revised from ₹18L to ₹21L — Auto increment cycle", severity: "Critical", ip: "Internal", status: "Success", type: "Data Change", icon: Edit3 },
  { id: "AUD-8818", timestamp: "10 Mar 2026, 07:30 AM", actor: "Anil Kumar", actorRole: "Finance Admin", action: "Role Assigned", resource: "Payroll Module", details: "Granted \"Payroll Approver\" permission to Meena Joshi", severity: "High", ip: "122.167.10.44", status: "Success", type: "Permission", icon: Lock },
  { id: "AUD-8817", timestamp: "10 Mar 2026, 07:15 AM", actor: "Unknown", actorRole: "—", action: "Failed Login", resource: "Auth System", details: "5 consecutive failed login attempts — Account locked", severity: "Critical", ip: "185.220.101.34", status: "Blocked", type: "Login", icon: AlertTriangle },
  { id: "AUD-8816", timestamp: "10 Mar 2026, 06:50 AM", actor: "Priya Mehta", actorRole: "Super Admin", action: "Policy Deleted", resource: "Leave Policies", details: "Deleted \"Compensatory Leave Policy v1\" — replaced by v2", severity: "High", ip: "103.21.45.12", status: "Success", type: "Delete", icon: Trash2 },
  { id: "AUD-8815", timestamp: "10 Mar 2026, 06:30 AM", actor: "API Gateway", actorRole: "System", action: "API Rate Limit Hit", resource: "/api/v2/employees", details: "Rate limit exceeded — integration \"ZohoCRM\" throttled", severity: "Medium", ip: "34.100.20.1", status: "Throttled", type: "API", icon: Database },
  { id: "AUD-8814", timestamp: "10 Mar 2026, 06:10 AM", actor: "Karan Mehta", actorRole: "Manager", action: "Settings Changed", resource: "Attendance Policy", details: "Grace period changed from 10 min to 30 min — Bengaluru office", severity: "Low", ip: "117.55.12.9", status: "Success", type: "Settings", icon: Settings },
  { id: "AUD-8813", timestamp: "10 Mar 2026, 05:55 AM", actor: "Meena Joshi", actorRole: "HR Admin", action: "Document Accessed", resource: "Employee EMP-0087", details: "Viewed sensitive PAN card document — DPDP compliant access", severity: "Medium", ip: "103.5.8.22", status: "Success", type: "Data Change", icon: FileText },
  { id: "AUD-8812", timestamp: "10 Mar 2026, 05:40 AM", actor: "Priya Mehta", actorRole: "Super Admin", action: "Logout", resource: "Auth System", details: "Session ended after 4h 22m — normal logout", severity: "Info", ip: "103.21.45.12", status: "Success", type: "Login", icon: LogOut },
];

const SEVERITY_VARIANT: Record<Severity, "danger" | "warning" | "info" | "neutral"> = {
  Critical: "danger",
  High: "warning",
  Medium: "warning",
  Low: "info",
  Info: "neutral",
};

const STATUS_VARIANT: Record<AuditStatus, "success" | "danger" | "warning"> = {
  Success: "success",
  Blocked: "danger",
  Throttled: "warning",
};

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filtered = AUDIT_LOGS.filter((log) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      log.actor.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.id.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q);
    const matchesType = selectedType === "All" || log.type === selectedType;
    const matchesSeverity = selectedSeverity === "All" || log.severity === selectedSeverity;
    return matchesSearch && matchesType && matchesSeverity;
  });

  return (
    <Page
      title="Platform Audit Logs"
      subtitle="Immutable, cryptographically-signed trail of every user action, system event, and data change across all tenants."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Audit Logs" },
      ]}
      maxWidth="1400px"
      actions={
        <>
          <Button variant="secondary" icon={<Filter size={16} />}>
            Advanced Filters
          </Button>
          <Button variant="primary" icon={<Download size={16} />}>
            Export SOC2 Log
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Events (24h)", value: "8,821", color: "text-white", sub: "+12% from yesterday" },
            { label: "Critical Alerts", value: "2", color: "text-rose-400", sub: "Requires attention" },
            { label: "Unique Actors", value: "47", color: "text-indigo-400", sub: "Across all roles" },
            { label: "Blocked Attempts", value: "12", color: "text-orange-400", sub: "Auto-blocked by WAF" },
          ].map((stat) => (
            <Card key={stat.label} padding="md">
              <div className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-[10px] text-[#445566]">{stat.sub}</div>
            </Card>
          ))}
        </div>

        {/* Filter + Table */}
        <Card padding="none">
          {/* Toolbar */}
          <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-3 items-center bg-[#060D1A]">
            <div className="relative flex-1 min-w-[220px]">
              <input
                type="search"
                placeholder="Search by actor, action, event ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search audit logs"
                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-4 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by event type">
              {EVENT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  aria-pressed={selectedType === type}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedType === type
                      ? "bg-indigo-600 text-white"
                      : "bg-[#131B2B] text-[#8899AA] hover:text-white border border-[#2A3A4A]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div>
              <label htmlFor="severity-filter" className="sr-only">Filter by severity</label>
              <select
                id="severity-filter"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none cursor-pointer"
              >
                {SEVERITY_LEVELS.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Severities" : s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap" aria-label="Audit logs">
              <thead className="bg-[#060D1A] text-[#8899AA] text-xs uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Event ID</th>
                  <th scope="col" className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Timestamp</th>
                  <th scope="col" className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Actor</th>
                  <th scope="col" className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Action</th>
                  <th scope="col" className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Resource</th>
                  <th scope="col" className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Severity</th>
                  <th scope="col" className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Status</th>
                  <th scope="col" className="px-5 py-4 font-bold border-b border-[#1A2A3A] text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2A3A]">
                {filtered.map((log) => {
                  const Icon = log.icon;
                  const isExpanded = expandedRow === log.id;
                  return (
                    <>
                      <tr
                        key={log.id}
                        className="hover:bg-[#131B2B] transition-colors group cursor-pointer"
                        onClick={() => setExpandedRow(isExpanded ? null : log.id)}
                      >
                        <td className="px-5 py-4">
                          <span className="font-mono text-xs text-[#8899AA]">{log.id}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-white text-xs font-medium">{log.timestamp}</div>
                          <div className="text-[#556677] text-[10px] font-mono">{log.ip}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div
                              aria-hidden="true"
                              className="w-7 h-7 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-400 shrink-0"
                            >
                              {log.actor.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </div>
                            <div>
                              <div className="text-white font-semibold text-xs">{log.actor}</div>
                              <div className="text-[#556677] text-[10px]">{log.actorRole}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Icon size={13} className="text-[#8899AA] shrink-0" aria-hidden="true" />
                            <span className="text-white font-semibold text-xs">{log.action}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[#8899AA] text-xs">{log.resource}</span>
                        </td>
                        <td className="px-5 py-4">
                          <Badge variant={SEVERITY_VARIANT[log.severity]}>{log.severity}</Badge>
                        </td>
                        <td className="px-5 py-4">
                          <Badge variant={STATUS_VARIANT[log.status]}>{log.status}</Badge>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Eye size={13} />}
                            aria-label={`${isExpanded ? "Collapse" : "Expand"} details for ${log.id}`}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {isExpanded ? "Collapse" : "Expand"}
                          </Button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${log.id}-expanded`} className="bg-indigo-500/5 border-b border-[#1A2A3A]">
                          <td colSpan={8} className="px-8 py-4">
                            <div className="flex flex-wrap gap-6">
                              <div>
                                <div className="text-[10px] text-[#556677] uppercase font-bold mb-1">Full Details</div>
                                <div className="text-sm text-white">{log.details}</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-[#556677] uppercase font-bold mb-1">IP Address</div>
                                <div className="text-sm text-indigo-400 font-mono">{log.ip}</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-[#556677] uppercase font-bold mb-1">Event Type</div>
                                <div className="text-sm text-white">{log.type}</div>
                              </div>
                              <Button variant="secondary" size="sm" className="ml-auto self-start">
                                Download Raw JSON
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-[#8899AA]">
                <ShieldCheck size={36} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
                <p className="font-semibold">No audit events match your filters</p>
                <p className="text-xs mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
            <span className="text-xs text-[#556677]">Append-only ledger. Cryptographically signed. Cannot be altered.</span>
          </div>
        </Card>
      </div>
    </Page>
  );
}
