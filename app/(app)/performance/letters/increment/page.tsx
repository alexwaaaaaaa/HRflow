"use client";

import { useState } from "react";
import { Download, Send, BarChart3, TrendingUp, Loader2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const EMPLOYEES = [
  { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", role: "Sales Exec", ctcOld: "₹12.2L", increment: 18, ctcNew: "₹14.4L", status: "draft" },
  { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", role: "SWE", ctcOld: "₹14.1L", increment: 12, ctcNew: "₹15.8L", status: "sent" },
  { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", role: "Mktg Lead", ctcOld: "₹15.4L", increment: 14, ctcNew: "₹17.6L", status: "draft" },
  { id: 4, name: "Deepak Mehta", avatar: "DM", dept: "Finance", role: "Finance Analyst", ctcOld: "₹10.4L", increment: 8, ctcNew: "₹11.2L", status: "draft" },
];

function letterBody(emp: (typeof EMPLOYEES)[0]) {
  return `Dear ${emp.name},

We are pleased to communicate your revised compensation effective 01 April 2025.

Previous CTC:   ${emp.ctcOld} per annum
Increment (%):  ${emp.increment}%
Revised CTC:    ${emp.ctcNew} per annum

This revision reflects our appreciation of your outstanding performance in FY 2024–25.

Please sign and return the acknowledgement copy.

HR Department
HRFlow India Pvt. Ltd.`;
}

export default function IncrementLetter() {
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

  return (
    <Page
      title="Increment Letters"
      subtitle="CTC revision letters · Effective 01 April 2025"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Letters", href: "/performance/letters/appraisal" },
        { label: "Increment" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
            Bulk Export
          </Button>
          <Button
            icon={<Send size={14} aria-hidden="true" />}
            onClick={() =>
              EMPLOYEES.filter((e) => e.status === "draft" && !sent.includes(e.id)).forEach((e) =>
                sendLetter(e.id)
              )
            }
          >
            Send All
          </Button>
        </>
      }
    >
      {/* Average increment banner */}
      <Card padding="md" className="mb-6 border-[#0066FF]/20 bg-gradient-to-r from-[#0066FF]/5 to-[#00E5A0]/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp size={24} className="text-[#00E5A0]" aria-hidden="true" />
            <div>
              <p className="text-lg font-bold text-white">Avg Increment: 13%</p>
              <p className="text-xs text-[#8899AA]">vs 9% national average · FY 2024–25</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">₹38.2L</p>
            <p className="text-xs text-[#445566]">Total CTC impact across cohort</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-3">
          {EMPLOYEES.map((emp) => {
            const isSent = sent.includes(emp.id) || emp.status === "sent";
            return (
              <div
                key={emp.id}
                onClick={() => setSelected(emp === selected ? null : emp)}
                className={`bg-[#0D1928] border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:border-[#2A3A4A] ${
                  selected?.id === emp.id ? "border-[#0066FF]/50" : "border-[#1A2A3A]"
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={selected?.id === emp.id}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(emp === selected ? null : emp);
                  }
                }}
              >
                <div className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">
                  {emp.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm">{emp.name}</p>
                  <p className="text-[11px] text-[#8899AA]">
                    {emp.ctcOld} →{" "}
                    <span className="text-[#00E5A0] font-semibold">{emp.ctcNew}</span> · ↑{emp.increment}%
                  </p>
                </div>
                <Badge variant={isSent ? "success" : "warning"}>{isSent ? "Sent" : "Draft"}</Badge>
                {!isSent && (
                  <Button
                    size="sm"
                    icon={
                      sending === emp.id ? (
                        <Loader2 size={11} className="animate-spin" aria-hidden="true" />
                      ) : (
                        <Send size={11} aria-hidden="true" />
                      )
                    }
                    disabled={sending === emp.id}
                    aria-label={`Send increment letter to ${emp.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      sendLetter(emp.id);
                    }}
                  >
                    Send
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="w-full lg:w-[380px] shrink-0">
          {selected ? (
            <Card padding="md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Letter Preview</h3>
                <Button variant="secondary" size="sm" icon={<Download size={11} aria-hidden="true" />}>
                  PDF
                </Button>
              </div>
              <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-5 text-[11px] text-[#8899AA] leading-relaxed whitespace-pre-line font-mono">
                {letterBody(selected)}
              </div>
            </Card>
          ) : (
            <Card padding="lg" className="h-64 flex flex-col items-center justify-center text-center">
              <BarChart3 size={36} className="text-[#445566] mx-auto mb-3" aria-hidden="true" />
              <p className="text-sm text-[#8899AA]">Click an employee to preview their increment letter</p>
            </Card>
          )}
        </div>
      </div>
    </Page>
  );
}
