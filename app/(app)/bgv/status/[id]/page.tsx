"use client";

import {
  Download,
  ShieldCheck,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Building2,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type CheckStatus = "Clear" | "Discrepancy" | "Failed" | "In Progress";

interface Check {
  title: string;
  status: CheckStatus;
  date: string;
  file: string | null;
  note?: string;
}

const CHECKS: Check[] = [
  { title: "Identity Verification (PAN)", status: "Clear", date: "08 Nov 2024", file: "PAN_Verification.pdf" },
  { title: "Identity Verification (Aadhaar)", status: "Clear", date: "08 Nov 2024", file: "UIDAI_Check.pdf" },
  { title: "Address Check (Current)", status: "Clear", date: "10 Nov 2024", file: "Address_Physical_Visit.pdf" },
  { title: "Address Check (Permanent)", status: "Clear", date: "11 Nov 2024", file: "Address_Postal.pdf" },
  {
    title: "Highest Education (B.Tech)",
    status: "Discrepancy",
    date: "12 Nov 2024",
    file: "Edu_Check_Report.pdf",
    note: "University name mismatch on provisional certificate.",
  },
  { title: "Previous Employment 1", status: "In Progress", date: "-", file: null },
  { title: "Criminal/Court Record", status: "In Progress", date: "-", file: null },
];

const _STATUS_VARIANT: Record<CheckStatus, "success" | "warning" | "danger" | "neutral"> = {
  Clear: "success",
  Discrepancy: "warning",
  Failed: "danger",
  "In Progress": "neutral",
};

function StatusIcon({ status }: { status: CheckStatus }) {
  if (status === "Clear") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#00E5A0]/30 bg-[#00E5A0]/10 text-[#00E5A0]">
        <CheckCircle2 size={16} aria-hidden="true" />
      </div>
    );
  }
  if (status === "Discrepancy") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500">
        <AlertTriangle size={16} aria-hidden="true" />
      </div>
    );
  }
  if (status === "Failed") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-500">
        <XCircle size={16} aria-hidden="true" />
      </div>
    );
  }
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-[#8899AA]">
      <Clock size={16} aria-hidden="true" />
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 text-sm">
      <div className="mt-0.5 shrink-0 text-[#556677]" aria-hidden="true">{icon}</div>
      <div>
        <div className="mb-0.5 text-xs text-[#556677]">{label}</div>
        <div className="font-medium text-white">{value}</div>
      </div>
    </div>
  );
}

export default function BGVDetailPage() {
  return (
    <Page
      title="BGV Detail — Rahul Sharma"
      subtitle="BGV ID: BGC-2024-089 · Role: SDE II"
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Status", href: "/bgv/status" },
        { label: "BGC-2024-089" },
      ]}
      maxWidth="1100px"
      actions={
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>
            Download Full Report
          </Button>
          <Button>Request Clarification</Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 md:col-span-1">
          {/* Overall progress */}
          <Card padding="lg">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#8899AA]">
              Overall Progress
            </h3>
            <div className="mb-2 flex items-end gap-2">
              <span className="text-3xl font-black leading-none text-white">
                65<span className="text-xl">%</span>
              </span>
              <span className="pb-1 text-sm font-medium text-[#8899AA]">Completed</span>
            </div>
            <div
              className="mb-6 h-2 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
              role="progressbar"
              aria-valuenow={65}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="BGV completion progress"
            >
              <div className="h-full rounded-full bg-amber-500" style={{ width: "65%" }} />
            </div>
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-xs text-[#556677]">Vendor</div>
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-[#1A2A3A]">
                    <ShieldCheck size={12} className="text-[#0066FF]" aria-hidden="true" />
                  </div>
                  FirstAdvantage
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs text-[#556677]">Initiated On</div>
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <Calendar size={14} className="text-[#8899AA]" aria-hidden="true" /> 05 Nov 2024
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs text-[#556677]">Target ETA</div>
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <Clock size={14} className="text-[#8899AA]" aria-hidden="true" /> 15 Nov 2024 (3 days remaining)
                </div>
              </div>
            </div>
          </Card>

          {/* Candidate details */}
          <Card padding="none">
            <div className="border-b border-[#1A2A3A] bg-[#0D1928] px-4 py-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8899AA]">
                Submitted Details
              </h3>
            </div>
            <div className="space-y-4 p-5">
              <InfoItem icon={<Mail size={16} />} label="Email" value="rahul.s@example.com" />
              <InfoItem icon={<Phone size={16} />} label="Phone" value="+91 98765 43210" />
              <InfoItem icon={<MapPin size={16} />} label="Current Address" value="A-102, Skyline Apts, HSR Layout, Bangalore - 560102" />
              <InfoItem icon={<GraduationCap size={16} />} label="Highest Edu" value="B.Tech (CS), NIT Trichy (2020)" />
              <InfoItem icon={<Building2 size={16} />} label="Last Employer" value="TechNova Solutions (2 yrs)" />
            </div>
          </Card>
        </div>

        {/* Right column — checks */}
        <div className="md:col-span-2">
          <Card padding="none" className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0D1928] px-5 py-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8899AA]">
                Verification Breakdown
              </h3>
              <Badge variant="neutral">7 Components</Badge>
            </div>
            <div className="divide-y divide-[#1A2A3A]">
              {CHECKS.map((chk) => (
                <div
                  key={chk.title}
                  className={`p-5 transition-colors hover:bg-[#1A2A3A]/30 ${chk.status === "Discrepancy" ? "bg-amber-500/5" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <StatusIcon status={chk.status} />
                      <div>
                        <h4 className="mb-1 text-base font-bold text-white">{chk.title}</h4>
                        {chk.status === "Discrepancy" && chk.note && (
                          <div className="mb-3 mt-2 flex gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-500">
                            <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                            <p>{chk.note}</p>
                          </div>
                        )}
                        <div className="mt-2 flex items-center gap-4">
                          <span className="text-xs text-[#556677]">Updated: {chk.date}</span>
                          {chk.file && (
                            <button className="flex items-center gap-1.5 text-xs font-semibold text-[#0066FF] hover:underline">
                              <FileText size={14} aria-hidden="true" /> View Report
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {chk.status === "Discrepancy" && (
                      <div className="flex shrink-0 flex-col gap-2">
                        <Button variant="secondary" size="sm">Override (Accept)</Button>
                        <Button variant="danger" size="sm">Mark Failed</Button>
                      </div>
                    )}
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
