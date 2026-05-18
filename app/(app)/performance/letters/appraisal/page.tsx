"use client";

import { useState } from "react";
import { Download, Send, Eye, Loader2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const EMPLOYEES = [
  { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", role: "Sales Executive", rating: 4.7, band: "Exceptional", increment: "18%", effectiveDate: "01 Apr 2025", status: "draft" },
  { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", role: "Software Engineer", rating: 4.1, band: "Exceeds Exp.", increment: "12%", effectiveDate: "01 Apr 2025", status: "sent" },
  { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", role: "Marketing Lead", rating: 4.4, band: "Exceeds Exp.", increment: "14%", effectiveDate: "01 Apr 2025", status: "draft" },
  { id: 4, name: "Deepak Mehta", avatar: "DM", dept: "Finance", role: "Finance Analyst", rating: 3.5, band: "Meets Exp.", increment: "8%", effectiveDate: "01 Apr 2025", status: "sent" },
];

function letterTemplate(emp: (typeof EMPLOYEES)[0]) {
  return `Dear ${emp.name},

We are pleased to share your performance appraisal for FY 2024–25.

Your final performance rating: ${emp.rating.toFixed(1)} / 5.0 (${emp.band})

Based on your exceptional contributions, your revised CTC will reflect an increment of ${emp.increment}, effective ${emp.effectiveDate}.

Your dedication, commitment, and contributions have been integral to the team's success this year. 
We look forward to your continued growth and success at HRFlow.

Warm Regards,
HR Department
HRFlow India Pvt. Ltd.`;
}

function EmployeeRow({
  emp,
  isSent,
  isSelected,
  isSending,
  onSelect,
  onSend,
}: {
  emp: (typeof EMPLOYEES)[0];
  isSent: boolean;
  isSelected: boolean;
  isSending: boolean;
  onSelect: () => void;
  onSend: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={`bg-[#0D1928] border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:border-[#2A3A4A] ${
        isSelected ? "border-[#0066FF]/50" : "border-[#1A2A3A]"
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={isSelected}
    >
      <div className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">
        {emp.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white text-sm">{emp.name}</p>
        <p className="text-[11px] text-[#8899AA]">
          {emp.role} · ⭐ {emp.rating} · ↑{emp.increment}
        </p>
      </div>
      <Badge variant={isSent ? "success" : "warning"}>{isSent ? "Sent" : "Draft"}</Badge>
      <div className="flex gap-1.5 shrink-0">
        <Button
          variant="secondary"
          size="sm"
          icon={<Eye size={13} aria-hidden="true" />}
          aria-label={`Preview ${emp.name}'s letter`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        />
        {!isSent && (
          <Button
            size="sm"
            icon={isSending ? <Loader2 size={11} className="animate-spin" aria-hidden="true" /> : <Send size={11} aria-hidden="true" />}
            disabled={isSending}
            aria-label={`Send letter to ${emp.name}`}
            onClick={onSend}
          >
            Send
          </Button>
        )}
      </div>
    </div>
  );
}

export default function AppraisalLetter() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<(typeof EMPLOYEES)[0] | null>(null);
  const [sending, setSending] = useState<number | null>(null);
  const [sent, setSent] = useState<number[]>([]);

  function sendLetter(id: number) {
    setSending(id);
    setTimeout(() => {
      setSending(null);
      setSent((p) => [...p, id]);
    }, 1800);
  }

  const filtered = EMPLOYEES.filter(
    (e) =>
      (statusFilter === "all" ||
        (statusFilter === "sent" && (sent.includes(e.id) || e.status === "sent")) ||
        (statusFilter === "draft" && !sent.includes(e.id) && e.status === "draft")) &&
      e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page
      title="Appraisal Letters"
      subtitle="Generate and send performance appraisal letters · FY 2024–25"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Letters", href: "/performance/letters/appraisal" },
        { label: "Appraisal" },
      ]}
      maxWidth="1300px"
      actions={
        <Button icon={<Send size={14} aria-hidden="true" />}>Send All Pending</Button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Letters", value: EMPLOYEES.length },
          { label: "Sent", value: sent.length + EMPLOYEES.filter((e) => e.status === "sent").length },
          { label: "Pending", value: EMPLOYEES.filter((e) => e.status === "draft" && !sent.includes(e.id)).length },
        ].map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-[#8899AA]">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* List */}
        <div className="flex-1">
          <div className="flex gap-3 mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              aria-label="Search employees"
              className="flex-1 h-9 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
            />
            <div className="flex gap-2" role="group" aria-label="Filter by status">
              {["all", "draft", "sent"].map((f) => (
                <Button
                  key={f}
                  variant={statusFilter === f ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setStatusFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((emp) => {
              const isSent = sent.includes(emp.id) || emp.status === "sent";
              return (
                <EmployeeRow
                  key={emp.id}
                  emp={emp}
                  isSent={isSent}
                  isSelected={selected?.id === emp.id}
                  isSending={sending === emp.id}
                  onSelect={() => setSelected(emp === selected ? null : emp)}
                  onSend={(e) => {
                    e.stopPropagation();
                    sendLetter(emp.id);
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div className="w-full lg:w-[380px] shrink-0">
          {selected ? (
            <Card padding="md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Letter Preview</h3>
                <Button variant="secondary" size="sm" icon={<Download size={11} aria-hidden="true" />}>
                  PDF
                </Button>
              </div>
              <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-5 text-[12px] text-[#8899AA] leading-relaxed whitespace-pre-line font-mono">
                {letterTemplate(selected)}
              </div>
            </Card>
          ) : (
            <Card padding="lg" className="h-64 flex flex-col items-center justify-center text-center">
              <Eye size={36} className="text-[#445566] mx-auto mb-3" aria-hidden="true" />
              <p className="text-sm text-[#8899AA]">Click an employee to preview their letter</p>
            </Card>
          )}
        </div>
      </div>
    </Page>
  );
}
