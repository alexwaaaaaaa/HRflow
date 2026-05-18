"use client";

import { Search, Key, Check, X, Shield, Users } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const USERS_DATA = [
  { user: "Meera Venkatesh", sub: "Super Admin", pr: true, run: true, grv: true, role: true, id: "EMP-0012" },
  { user: "Rahul Sharma", sub: "Finance Lead", pr: true, run: true, grv: false, role: false, id: "EMP-0045" },
  { user: "Sanjay Dutt", sub: "Legal Counsel (Custom)", pr: false, run: false, grv: true, role: false, id: "EMP-0078" },
  { user: "Aditi Krishnan", sub: "Manager", pr: false, run: false, grv: false, role: false, id: "EMP-0091" },
];

const ROLES = ["Super Admin", "HR Admin", "Finance Lead", "Manager", "Employee"];

export default function PermissionAuditPage() {
  return (
    <Page
      title="Access Rights Audit"
      subtitle="Review who has access to what. Ensure the principle of least privilege is enforced."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Permissions" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="secondary" icon={<Users size={16} aria-hidden="true" />}>
          Manage Roles
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Filter sidebar */}
        <div className="space-y-4 lg:col-span-1">
          <Card padding="md">
            <div className="relative mb-6">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search employee..."
                aria-label="Search employee"
                className="h-10 w-full rounded-lg border border-[#2A3A4A] bg-[#131B2B] pl-9 pr-4 text-sm text-white outline-none transition-colors focus:border-indigo-500"
              />
            </div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
              Filter by Base Role
            </h3>
            <fieldset>
              <legend className="sr-only">Filter by base role</legend>
              <div className="space-y-2">
                {ROLES.map((role) => (
                  <label key={role} className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-[#131B2B]">
                    <input type="checkbox" className="rounded border-[#3A4A5A] bg-[#1A2A3A] text-indigo-500" />
                    <span className="text-sm text-white">{role}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </Card>
        </div>

        {/* Audit table */}
        <Card padding="none" className="flex flex-col overflow-hidden lg:col-span-3">
          <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060D1A] px-5 py-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <Key size={18} className="text-[#556677]" aria-hidden="true" /> Effective Permissions Matrix
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" aria-label="Effective permissions matrix">
              <thead className="bg-[#131B2B] text-xs uppercase tracking-wider text-[#8899AA]">
                <tr>
                  <th className="sticky left-0 z-10 border-b border-[#1A2A3A] bg-[#131B2B] px-6 py-4 font-bold">User</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">View Payroll</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Run Payroll</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Manage Grievance</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Edit Roles</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2A3A]">
                {USERS_DATA.map((row, i) => (
                  <tr key={i} className="transition-colors hover:bg-[#1A2A3A]/50">
                    <td className="sticky left-0 border-r border-[#1A2A3A] bg-[#0A1420] px-6 py-4">
                      <div className="font-bold text-white">{row.user}</div>
                      <div className="mt-0.5 text-[10px] text-indigo-400">{row.sub}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.pr ? (
                        <Check size={16} className="mx-auto text-emerald-400" aria-label="Allowed" />
                      ) : (
                        <X size={16} className="mx-auto text-[#3A4A5A]" aria-label="Denied" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.run ? (
                        <Check size={16} className="mx-auto text-emerald-400" aria-label="Allowed" />
                      ) : (
                        <X size={16} className="mx-auto text-[#3A4A5A]" aria-label="Denied" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.grv ? (
                        <Check size={16} className="mx-auto text-emerald-400" aria-label="Allowed" />
                      ) : (
                        <X size={16} className="mx-auto text-[#3A4A5A]" aria-label="Denied" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.role ? (
                        <Shield size={16} className="mx-auto text-amber-400" aria-label="Admin only" />
                      ) : (
                        <X size={16} className="mx-auto text-[#3A4A5A]" aria-label="Denied" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/security/permissions/${row.id}`}
                        className="text-xs font-bold text-indigo-400 transition-colors hover:text-indigo-300"
                      >
                        View Details
                      </Link>
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
