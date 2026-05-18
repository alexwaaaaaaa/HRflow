"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Download } from "lucide-react";

// ─── Sub-components ───────────────────────────────────────────────────────────

interface YtdStatProps {
  label: string;
  val: string;
}

function YtdStat({ label, val }: YtdStatProps) {
  return (
    <div className="rounded-[14px] border border-[#1A2A3A] bg-[#0D1928] p-5">
      <div className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.04em] text-[#445566]">
        {label}
      </div>
      <div className="text-[22px] font-bold text-white">{val}</div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const YTD_STATS = [
  { label: "Gross Earned YTD", val: "₹10,80,153" },
  { label: "TDS Deducted YTD", val: "₹74,000" },
  { label: "PF Contributed (EE+ER)", val: "₹38,880" },
  { label: "Net Received YTD", val: "₹10,06,153" },
] as const;

const MONTHS = [
  { m: "Nov 2024", gross: "₹1,20,017", ded: "₹10,300", net: "₹1,09,717", status: "Processing" as const },
  { m: "Oct 2024", gross: "₹1,20,017", ded: "₹10,300", net: "₹1,09,717", status: "Disbursed" as const },
  { m: "Sep 2024", gross: "₹1,20,017", ded: "₹10,300", net: "₹1,09,717", status: "Disbursed" as const },
  { m: "Aug 2024", gross: "₹1,20,017", ded: "₹10,300", net: "₹1,09,717", status: "Disbursed" as const },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PayrollTab() {
  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {YTD_STATS.map((s) => (
          <YtdStat key={s.label} {...s} />
        ))}
      </div>

      <Card padding="none">
        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-6 py-4">
          <h3 className="text-sm font-semibold text-white">Payslip History</h3>
          <Button variant="ghost" size="sm" icon={<Download size={14} aria-hidden="true" />}>
            Download All (ZIP)
          </Button>
        </div>

        <div className="grid grid-cols-[1fr_130px_130px_130px_120px_100px] border-b border-[#1A2A3A] bg-[#0A1420] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.04em] text-[#445566]">
          {["Month", "Gross", "Deductions", "Net Pay", "Status", "Download"].map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>

        {MONTHS.map((row) => (
          <div
            key={row.m}
            className="grid grid-cols-[1fr_130px_130px_130px_120px_100px] items-center border-b border-[#0A1420] px-6 py-3.5 hover:bg-[#0A1420]"
          >
            <span className="text-sm text-white">{row.m}</span>
            <span className="text-sm text-white">{row.gross}</span>
            <span className="text-sm text-[#FF4444]">-{row.ded}</span>
            <span className="text-sm font-semibold text-[#00E5A0]">{row.net}</span>
            <Badge variant={row.status === "Disbursed" ? "success" : "warning"}>
              {row.status}
            </Badge>
            {row.status === "Disbursed" ? (
              <Button variant="ghost" size="sm" icon={<Download size={14} aria-hidden="true" />}>
                PDF
              </Button>
            ) : (
              <span className="text-[13px] text-[#445566]">—</span>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}
