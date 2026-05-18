"use client";

import { File, Download, UploadCloud, Folder, Search, CheckCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DocumentItem {
  name: string;
  category: string;
  date: string;
  size: string;
  verified: boolean;
}

interface CategoryItem {
  name: string;
  count: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: CategoryItem[] = [
  { name: "Identity & Verification", count: 4 },
  { name: "Onboarding Letters", count: 2 },
  { name: "Prior Experience", count: 3 },
  { name: "Tax & Compliance", count: 5 },
];

const DOCUMENTS: DocumentItem[] = [
  { name: "Aadhaar Card.pdf", category: "Identity", date: "01 Jun 2021", size: "1.2 MB", verified: true },
  { name: "PAN Card.pdf", category: "Identity", date: "01 Jun 2021", size: "0.8 MB", verified: true },
  { name: "Offer Letter signed.pdf", category: "Onboarding", date: "15 May 2021", size: "2.1 MB", verified: true },
  { name: "Form 16 - FY23.pdf", category: "Tax", date: "10 May 2024", size: "3.5 MB", verified: false },
  { name: "Relieving Letter - Previous.pdf", category: "Experience", date: "05 Jun 2021", size: "1.1 MB", verified: true },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FolderButtonProps {
  label: string;
  count: number;
  active?: boolean;
  icon?: React.ReactNode;
}

function FolderButton({ label, count, active, icon }: FolderButtonProps) {
  return (
    <button
      type="button"
      className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2.5 text-[13px] transition-colors ${
        active
          ? "bg-[#1A2A3A] text-white"
          : "bg-transparent text-[#8899AA] hover:bg-[#0D1928] hover:text-white"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon ?? <Folder size={16} aria-hidden="true" />}
        {label}
      </span>
      <span className="rounded-xl bg-[#0D1928] px-2 py-0.5 text-[11px]">{count}</span>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocumentsTab() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="w-full max-w-[300px]">
          <Input
            id="doc-search"
            label="Search documents"
            placeholder="Search employee documents..."
            leftElement={<Search size={16} aria-hidden="true" />}
          />
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" icon={<Download size={14} aria-hidden="true" />}>
            Download All (.zip)
          </Button>
          <Button variant="primary" size="sm" icon={<UploadCloud size={16} aria-hidden="true" />}>
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.05em] text-[#8899AA]">
            Vault Folders
          </div>
          <div className="flex flex-col gap-1">
            <FolderButton
              label="All Documents"
              count={14}
              active
              icon={<Folder size={16} className="text-[#00E5A0]" aria-hidden="true" />}
            />
            {CATEGORIES.map((c) => (
              <FolderButton key={c.name} label={c.name} count={c.count} />
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.06)] p-5 text-center">
            <UploadCloud size={24} className="mx-auto mb-3 text-[#00E5A0]" aria-hidden="true" />
            <div className="mb-1 text-[13px] text-white">Drag &amp; Drop files</div>
            <div className="text-[11px] text-[#8899AA]">PDF, JPG, PNG up to 10MB</div>
          </div>
        </div>

        {/* Document list */}
        <Card padding="none">
          <div className="grid grid-cols-[1fr_140px_120px_100px_80px] border-b border-[#1A2A3A] bg-[#0A1420] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.04em] text-[#445566]">
            <span>Document Name</span>
            <span>Category</span>
            <span>Added On</span>
            <span>Size</span>
            <span className="text-right">Actions</span>
          </div>

          {DOCUMENTS.map((doc, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_140px_120px_100px_80px] items-center border-b border-[#0A1420] px-6 py-4 hover:bg-[#0A1420]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(0,102,255,0.1)] text-[#0066FF]">
                  <File size={16} aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    {doc.name}
                    {doc.verified && (
                      <CheckCircle size={12} className="text-[#00E5A0]" aria-hidden="true" />
                    )}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#445566]">Click to preview</div>
                </div>
              </div>
              <span className="text-[13px] text-[#8899AA]">{doc.category}</span>
              <span className="text-[13px] text-[#8899AA]">{doc.date}</span>
              <span className="text-[13px] text-[#8899AA]">{doc.size}</span>
              <div className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Download ${doc.name}`}
                  icon={<Download size={16} aria-hidden="true" />}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
