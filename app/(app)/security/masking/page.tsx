"use client";

import { useState } from "react";
import { EyeOff, AlertCircle, Save, Check } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DataMaskingRulesPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Page
      title="Data Masking Policies"
      subtitle="Configure how Highly Sensitive Personal Data (HSPD) is obfuscated in the UI and exports."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Masking" },
      ]}
      maxWidth="1100px"
      actions={
        <Button
          onClick={handleSave}
          icon={saved ? <Check size={16} aria-hidden="true" /> : <Save size={16} aria-hidden="true" />}
        >
          {saved ? "Saved" : "Save Policies"}
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Info banner */}
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 md:flex-row md:items-center">
          <div className="shrink-0 rounded-xl border border-sky-500/20 bg-sky-500/10 p-3 text-sky-400">
            <EyeOff size={24} aria-hidden="true" />
          </div>
          <div>
            <h3 className="mb-1 font-bold text-sky-400">Zero-Trust Obfuscation Mode Active</h3>
            <p className="text-sm leading-relaxed text-[#8899AA]">
              By default, data is masked as <code className="rounded bg-[#131B2B] px-1 py-0.5 text-xs">XXXX-XXXX-1234</code>. Only users with Explicit Unmask permission (Base Role: HR Admin, Finance Lead) can click to reveal the true value. Access logs will record every unmask action.
            </p>
          </div>
        </div>

        {/* Rules matrix */}
        <Card padding="none" className="overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" aria-label="Data masking rules">
              <thead className="bg-[#060D1A] text-xs uppercase tracking-wider text-[#8899AA]">
                <tr>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Data Field</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Masking Pattern</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Authorized to Unmask</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 text-right font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2A3A]">
                {/* Aadhaar / SSN */}
                <tr className="transition-colors hover:bg-[#131B2B]">
                  <td className="px-6 py-5">
                    <div className="mb-0.5 font-bold text-white">Government ID (Aadhaar/PAN/SSN)</div>
                    <div className="text-[10px] uppercase tracking-wider text-[#556677]">Onboarding / DPDP</div>
                  </td>
                  <td className="px-6 py-5">
                    <label htmlFor="mask-gov-id" className="sr-only">Masking pattern for Government ID</label>
                    <select
                      id="mask-gov-id"
                      className="rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-2 text-sm text-white outline-none focus:border-indigo-500"
                    >
                      <option>Show Last 4 (XXXX-XXXX-1234)</option>
                      <option>Fully Masked (XXXXXXXXXXXX)</option>
                      <option>Unmasked for All</option>
                    </select>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-1 text-[10px] font-bold uppercase text-[#8899AA]">HR Admin</span>
                      <span className="rounded border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-1 text-[10px] font-bold uppercase text-[#8899AA]">Finance Lead</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      className="relative ml-auto h-5 w-10 cursor-pointer rounded-full bg-emerald-500"
                      role="switch"
                      aria-checked={true}
                      aria-label="Government ID masking enabled"
                    >
                      <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-white" />
                    </button>
                  </td>
                </tr>

                {/* Bank Account */}
                <tr className="transition-colors hover:bg-[#131B2B]">
                  <td className="px-6 py-5">
                    <div className="mb-0.5 font-bold text-white">Bank Account Number</div>
                    <div className="text-[10px] uppercase tracking-wider text-[#556677]">Payroll</div>
                  </td>
                  <td className="px-6 py-5">
                    <label htmlFor="mask-bank" className="sr-only">Masking pattern for Bank Account</label>
                    <select
                      id="mask-bank"
                      className="rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-2 text-sm text-white outline-none focus:border-indigo-500"
                    >
                      <option>Show Last 4 (*******1234)</option>
                      <option>Fully Masked (***********)</option>
                    </select>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-1 text-[10px] font-bold uppercase text-[#8899AA]">Finance Lead</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      className="relative ml-auto h-5 w-10 cursor-pointer rounded-full bg-emerald-500"
                      role="switch"
                      aria-checked={true}
                      aria-label="Bank account masking enabled"
                    >
                      <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-white" />
                    </button>
                  </td>
                </tr>

                {/* Salary */}
                <tr className="transition-colors hover:bg-[#131B2B]">
                  <td className="px-6 py-5">
                    <div className="mb-0.5 font-bold text-white">Salary CTC / Take-home</div>
                    <div className="text-[10px] uppercase tracking-wider text-[#556677]">Directory / Profile</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-2 text-sm text-[#8899AA] opacity-70">
                      Hidden (Requires specific permission scope)
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                      <AlertCircle size={12} aria-hidden="true" /> Hardcoded Rule
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-1 text-[10px] font-bold uppercase text-[#8899AA]">Manager (Direct Reports Only)</span>
                      <span className="rounded border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-1 text-[10px] font-bold uppercase text-[#8899AA]">Finance Lead</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div
                      className="relative ml-auto h-5 w-10 cursor-not-allowed rounded-full bg-[#2A3A4A] opacity-50"
                      aria-label="Salary masking locked (hardcoded)"
                    >
                      <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-gray-400" />
                    </div>
                  </td>
                </tr>

                {/* Grievance */}
                <tr className="transition-colors hover:bg-[#131B2B]">
                  <td className="px-6 py-5">
                    <div className="mb-0.5 font-bold text-white">Grievance / POSH Case Files</div>
                    <div className="text-[10px] uppercase tracking-wider text-[#556677]">Compliance</div>
                  </td>
                  <td className="px-6 py-5">
                    <label htmlFor="mask-grievance" className="sr-only">Masking pattern for Grievance files</label>
                    <select
                      id="mask-grievance"
                      className="rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-2 text-sm text-white outline-none focus:border-indigo-500"
                    >
                      <option>Completely Redacted to Non-IC</option>
                    </select>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-1 text-[10px] font-bold uppercase text-indigo-400">IC Committee Only</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      className="relative ml-auto h-5 w-10 cursor-pointer rounded-full bg-emerald-500"
                      role="switch"
                      aria-checked={true}
                      aria-label="Grievance masking enabled"
                    >
                      <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-white" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Page>
  );
}
