"use client";

import { useState } from "react";
import { ArrowUp, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PROMOTIONS = [
  { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", from: "Sales Executive", to: "Senior Sales Executive", effectiveDate: "01 Apr 2025", status: "approved" },
  { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", from: "SWE-II", to: "Senior SWE", effectiveDate: "01 Apr 2025", status: "approved" },
];

function promotionLetter(p: (typeof PROMOTIONS)[0]) {
  return `Dear ${p.name},

We are delighted to inform you of your promotion, effective ${p.effectiveDate}.

Previous Title: ${p.from}
New Title:      ${p.to}
Department:     ${p.dept}

This promotion recognises your consistent high performance, leadership, and contributions to the team's success.

Your revised compensation package will be shared separately via the Increment Letter.

Congratulations and best wishes for continued success!

HR Department
HRFlow India Pvt. Ltd.`;
}

export default function PromotionLetter() {
  const [selected, setSelected] = useState<(typeof PROMOTIONS)[0] | null>(null);
  const [sending, setSending] = useState<number | null>(null);
  const [sent, setSent] = useState<number[]>([]);

  function sendLetter(id: number) {
    setSending(id);
    setTimeout(() => {
      setSending(null);
      setSent((p) => [...p, id]);
    }, 1500);
  }

  return (
    <Page
      title="Promotion Letters"
      subtitle="Issue formal promotion letters to eligible employees"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Promotion", href: "/performance/promotion/recommend" },
        { label: "Letters" },
      ]}
      maxWidth="1200px"
      actions={
        <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
          Bulk Export
        </Button>
      }
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-3">
          {PROMOTIONS.map((p) => {
            const isSent = sent.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => setSelected(p === selected ? null : p)}
                className={`bg-[#0D1928] border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:border-[#2A3A4A] ${
                  selected?.id === p.id ? "border-[#00E5A0]/50" : "border-[#1A2A3A]"
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={selected?.id === p.id}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(p === selected ? null : p);
                  }
                }}
              >
                <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[11px] font-bold text-[#8899AA] shrink-0">
                  {p.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{p.name}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8899AA]">
                    <span>{p.from}</span>
                    <ArrowUp size={11} className="text-[#00E5A0] rotate-45" aria-hidden="true" />
                    <span className="text-[#00E5A0] font-medium">{p.to}</span>
                  </div>
                  <p className="text-[10px] text-[#445566]">Effective {p.effectiveDate}</p>
                </div>
                <Badge variant={isSent ? "success" : "warning"}>{isSent ? "Sent" : "Draft"}</Badge>
                {!isSent && (
                  <Button
                    size="sm"
                    disabled={sending === p.id}
                    isLoading={sending === p.id}
                    aria-label={`Send promotion letter to ${p.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      sendLetter(p.id);
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
                {promotionLetter(selected)}
              </div>
            </Card>
          ) : (
            <Card padding="lg" className="h-64 flex flex-col items-center justify-center text-center">
              <ArrowUp size={36} className="text-[#445566] mx-auto mb-3" aria-hidden="true" />
              <p className="text-sm text-[#8899AA]">Select an employee to preview their promotion letter</p>
            </Card>
          )}
        </div>
      </div>
    </Page>
  );
}
