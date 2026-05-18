"use client";

import { useState } from "react";
import { Shield, Briefcase, Plus, Trash2, Edit2, AlertTriangle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Policy {
  id: string;
  name: string;
  roles: string;
  vendor: string;
  package: string;
  checks: string[];
  active: boolean;
}

const POLICIES: Policy[] = [
  {
    id: "POL-01",
    name: "Standard Employee Policy",
    roles: "All Except Leadership/Finance",
    vendor: "FirstAdvantage",
    package: "Standard Package",
    checks: ["ID", "Address (Current)", "Education (Highest)"],
    active: true,
  },
  {
    id: "POL-02",
    name: "Leadership Policy",
    roles: "Director, VP, CXO",
    vendor: "FirstAdvantage",
    package: "Executive Package",
    checks: ["ID", "Address (Current, Perm)", "Education", "Employment (Last 3)", "Criminal", "Directorship"],
    active: true,
  },
  {
    id: "POL-03",
    name: "Finance / Infosec Policy",
    roles: "Finance, Security, IT Admins",
    vendor: "Checkr",
    package: "Comprehensive",
    checks: ["ID", "Address", "Education", "Employment", "Criminal", "Credit Check"],
    active: false,
  },
];

function ToggleSetting({
  label,
  desc,
  active,
}: {
  label: string;
  desc: string;
  active: boolean;
}) {
  const [on, setOn] = useState(active);
  const id = `toggle-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label htmlFor={id} className="cursor-pointer text-sm font-bold text-white">
          {label}
        </label>
        <p className="mt-1 text-[11px] leading-tight text-[#556677]">{desc}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={`relative mt-1 h-5 w-10 shrink-0 rounded-full transition-colors ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`}
        />
        <span className="sr-only">{on ? "Enabled" : "Disabled"}</span>
      </button>
    </div>
  );
}

export default function BGVPolicySetupPage() {
  return (
    <Page
      title="BGV Policy Setup"
      subtitle="Define rules for automated background verification based on roles and departments."
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Settings" },
        { label: "Policy" },
      ]}
      maxWidth="1200px"
      actions={
        <Button icon={<Plus size={16} aria-hidden="true" />}>Create Policy</Button>
      }
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Policy list */}
        <div className="space-y-4 md:col-span-2">
          {POLICIES.map((pol) => (
            <Card
              key={pol.id}
              padding="md"
              className={pol.active ? "" : "opacity-60"}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-lg p-2 ${pol.active ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "bg-[#1A2A3A] text-[#556677]"}`}
                  >
                    <Shield size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                      {pol.name}
                      {pol.active && <Badge variant="success">Active</Badge>}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-[#8899AA]">
                      <Briefcase size={12} aria-hidden="true" /> Applies to:{" "}
                      <span className="font-medium text-white">{pol.roles}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" icon={<Edit2 size={16} aria-hidden="true" />} aria-label={`Edit ${pol.name}`} />
                  <Button variant="ghost" size="sm" icon={<Trash2 size={16} aria-hidden="true" />} aria-label={`Delete ${pol.name}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3">
                <div>
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#556677]">
                    Default Vendor &amp; Package
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {pol.vendor} ({pol.package})
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#556677]">
                    Required Checks
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pol.checks.map((c) => (
                      <span
                        key={c}
                        className="rounded border border-[#2A3A4A] bg-[#1A2A3A] px-1.5 py-0.5 text-[10px] text-slate-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Global settings */}
        <div className="space-y-6">
          <Card padding="none">
            <div className="border-b border-[#1A2A3A] bg-[#0D1928] px-4 py-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Global Settings</h3>
            </div>
            <div className="space-y-5 p-5">
              <ToggleSetting
                label="Auto-Initiate on Offer Acceptance"
                desc="Automatically trigger BGV based on role policy when offer is marked accepted."
                active={true}
              />
              <ToggleSetting
                label="Require BGV Clearance for Onboarding"
                desc="Block joining date generation until BGV is marked as Clear or Conditionally Clear."
                active={true}
              />
              <ToggleSetting
                label="Notify Candidate on Initiation"
                desc="Send standard welcome email from HR platform before vendor reaches out."
                active={false}
              />
            </div>
          </Card>

          <div className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-500">
            <AlertTriangle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <span className="mb-1 inline-block font-bold">Configuration Warning</span>
              <p className="text-xs leading-relaxed text-amber-500/80">
                &ldquo;Finance / Infosec Policy&rdquo; is currently inactive. System will fall back to &ldquo;Standard Employee Policy&rdquo; for those roles until overridden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
