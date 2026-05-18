"use client";

import { Key, Shield, AlertTriangle, Check, X } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const PAYROLL_PERMS = [
  { name: "View Salary CTC (All Employees)", val: true },
  { name: "Run Payroll Computations", val: true },
  { name: "Disburse Funds / Bank Integration", val: false },
  { name: "Modify Tax Declarations", val: true },
];

const GRIEVANCE_PERMS = [
  { name: "View All Pending Cases", val: true },
  { name: "View Unmasked PII in Cases", val: true },
  { name: "Draft Final Resolutions", val: true },
  { name: "Assign IC Members", val: true },
];

const SECURITY_PERMS = [
  { name: "Modify IP Whitelist", val: true },
  { name: "Execute Data Erasure (DPDP)", val: false },
  { name: "View Full Audit Logs", val: true },
  { name: "Change Data Masking Rules", val: false },
];

function PermSection({ title, perms }: { title: string; perms: { name: string; val: boolean }[] }) {
  return (
    <div className="p-6">
      <h3 className="mb-4 border-b border-[#1A2A3A] pb-2 text-sm font-bold uppercase tracking-wider text-white">
        Module: {title}
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {perms.map((perm) => (
          <div
            key={perm.name}
            className="flex items-center justify-between rounded-xl border border-[#2A3A4A] bg-[#131B2B] p-3"
          >
            <span className="text-sm text-[#8899AA]">{perm.name}</span>
            {perm.val ? (
              <Check size={16} className="text-emerald-400" aria-label="Allowed" />
            ) : (
              <X size={16} className="text-rose-400" aria-label="Denied" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PermissionAuditDetailPage({ params: _params }: { params: { id: string } }) {
  const defaultUser = "Meera Venkatesh (EMP-0012)";

  return (
        <Page
      title={defaultUser}
      subtitle="Detailed effective permissions matrix inherited from Base Roles and Custom Overrides."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Permissions", href: "/security/permissions" },
        { label: "Detail" },
      ]}
      maxWidth="1200px"
    >






      <div className="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-4">
        {/* User context */}
        <div className="space-y-6 lg:col-span-1">
          <Card padding="lg">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#1A2A3A] bg-[#131B2B] text-2xl font-bold text-[#556677]">
                MV
              </div>
              <h3 className="font-bold text-white">Meera Venkatesh</h3>
              <p className="text-xs text-[#8899AA]">meera.v@company.com</p>
            </div>

            <div className="space-y-4 border-t border-[#1A2A3A] pt-4">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-[#556677]">
                  Base Role Profiles
                </label>
                <div className="space-y-2">
                  <div className="rounded border border-indigo-500/20 bg-indigo-500/10 p-2 text-xs text-indigo-400">
                    HR Admin (Default)
                  </div>
                  <div className="rounded border border-[#2A3A4A] bg-[#131B2B] p-2 text-xs text-white">
                    IC Committee Member
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-[#556677]">
                  Custom Overrides Active
                </label>
                <div className="flex items-start gap-2 rounded border border-amber-500/20 bg-amber-500/10 p-2 text-xs text-amber-400">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Granted temporary &lsquo;Super Admin&rsquo; for Q3 Audit. Expires Oct 30, 2026.</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Permissions matrix */}
        <div className="space-y-6 lg:col-span-3">
          <Card padding="none" className="overflow-hidden">
            <div className="border-b border-[#1A2A3A] bg-[#060D1A] px-5 py-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <Key size={18} className="text-[#556677]" aria-hidden="true" /> Granular Access Control
              </h2>
              <div className="mt-2">
                <Badge variant="info">
                  <Shield size={12} aria-hidden="true" className="mr-1" /> Super Admin
                </Badge>
              </div>
            </div>
            <div className="divide-y divide-[#1A2A3A]">
              <PermSection title="Payroll Engine" perms={PAYROLL_PERMS} />
              <PermSection title="Grievance (POSH)" perms={GRIEVANCE_PERMS} />
              <PermSection title="Security & Configuration" perms={SECURITY_PERMS} />
            </div>
          </Card>
        </div>
      </div>
    

        

        

        </Page>
    );
}
