"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ArrowUp } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const RECOMMENDATIONS = [
  { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", from: "Sales Executive", to: "Senior Sales Executive", reason: "Consistent top performance, 2 years in role, 4.7 rating", managerApproval: "approved", hrApproval: "pending" },
  { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", from: "SWE-II", to: "Senior SWE", reason: "Led 3 major product releases, excellent peer feedback", managerApproval: "approved", hrApproval: "pending" },
  { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", from: "Marketing Manager", to: "Senior Manager", reason: "Grew team by 4x, launched 2 successful campaigns", managerApproval: "pending", hrApproval: "not-started" },
];

const STATUS_VARIANT = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
  "not-started": "neutral",
} as const;

const STATUS_LABEL = {
  approved: "Approved",
  pending: "Pending",
  rejected: "Rejected",
  "not-started": "Not Started",
} as const;

export default function PromotionRecommendation() {
  const [recs, setRecs] = useState(RECOMMENDATIONS);
  const [approving, setApproving] = useState<number | null>(null);
  const [hrDone, setHrDone] = useState<number[]>([]);
  const [rejected, setRejected] = useState<number[]>([]);

  function hrApprove(id: number, action: "approved" | "rejected") {
    setApproving(id);
    setTimeout(() => {
      setApproving(null);
      setRecs((prev) => prev.map((r) => (r.id === id ? { ...r, hrApproval: action } : r)));
      if (action === "approved") setHrDone((p) => [...p, id]);
      else setRejected((p) => [...p, id]);
    }, 1500);
  }

  return (
        <Page
      title="Promotion Recommendations"
      subtitle="Manager-initiated promotion recommendations · FY 2024–25"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Promotion" },
      ]}
      maxWidth="1000px"
    >






      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Recommendations", value: recs.length },
          {
            label: "Approved",
            value: hrDone.length + recs.filter((r) => r.hrApproval === "approved" && !hrDone.includes(r.id)).length,
          },
          { label: "Pending HR Review", value: recs.filter((r) => r.hrApproval === "pending").length },
        ].map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-[#8899AA] mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-5">
        {recs.map((rec) => {
          const hrActed = hrDone.includes(rec.id) || rejected.includes(rec.id);
          const currentHrStatus = hrDone.includes(rec.id)
            ? "approved"
            : rejected.includes(rec.id)
            ? "rejected"
            : rec.hrApproval;

          return (
            <Card key={rec.id} padding="md">
              {/* Employee */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#1A2A3A] flex items-center justify-center text-base font-bold text-[#8899AA]">
                  {rec.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-base">{rec.name}</p>
                  <p className="text-xs text-[#8899AA]">{rec.dept}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#445566]">{rec.from}</span>
                    <ArrowUp size={12} className="text-[#00E5A0] rotate-45" aria-hidden="true" />
                    <span className="text-xs font-semibold text-[#00E5A0]">{rec.to}</span>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="bg-[#0A1420] rounded-xl p-3 mb-4">
                <p className="text-xs text-[#8899AA] mb-0.5">Manager&apos;s Recommendation</p>
                <p className="text-sm text-white">{rec.reason}</p>
              </div>

              {/* Approval chain */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#1A2A3A] flex items-center justify-center">
                    {rec.managerApproval === "approved" ? (
                      <CheckCircle2 size={14} className="text-[#00E5A0]" aria-hidden="true" />
                    ) : (
                      <span className="text-[10px] font-bold text-[#8899AA]">?</span>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] text-[#445566]">Manager</p>
                    <Badge variant={STATUS_VARIANT[rec.managerApproval as keyof typeof STATUS_VARIANT] ?? "neutral"}>
                      {STATUS_LABEL[rec.managerApproval as keyof typeof STATUS_LABEL] ?? rec.managerApproval}
                    </Badge>
                  </div>
                </div>
                <div className="flex-1 h-0.5 bg-[#1A2A3A]" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#1A2A3A] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#8899AA]">HR</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#445566]">HR</p>
                    <Badge variant={STATUS_VARIANT[currentHrStatus as keyof typeof STATUS_VARIANT] ?? "neutral"}>
                      {STATUS_LABEL[currentHrStatus as keyof typeof STATUS_LABEL] ?? currentHrStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* HR actions */}
              {rec.hrApproval === "pending" && !hrActed && rec.managerApproval === "approved" && (
                <div className="flex gap-3">
                  <Button
                    variant="danger"
                    className="flex-1"
                    icon={<XCircle size={15} aria-hidden="true" />}
                    disabled={approving === rec.id}
                    onClick={() => hrApprove(rec.id, "rejected")}
                  >
                    Reject
                  </Button>
                  <Button
                    className="flex-1"
                    icon={<CheckCircle2 size={15} aria-hidden="true" />}
                    disabled={approving === rec.id}
                    isLoading={approving === rec.id}
                    loadingText="Approving..."
                    onClick={() => hrApprove(rec.id, "approved")}
                  >
                    Approve Promotion
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    

        

        

        </Page>
    );
}
