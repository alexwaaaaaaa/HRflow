"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ArrowUp, Clock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PROMOTIONS = [
  { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", from: "Sales Executive", to: "Senior Sales Executive", manager: "Rajesh Kumar", managerApproval: "approved", hrApproval: "approved", status: "approved", date: "01 Apr 2025" },
  { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", from: "SWE-II", to: "Senior SWE", manager: "Priya Nair", managerApproval: "approved", hrApproval: "pending", status: "pending", date: "01 Apr 2025" },
  { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", from: "Marketing Manager", to: "Senior Manager", manager: "Suresh Rao", managerApproval: "pending", hrApproval: "not-start", status: "pending", date: "01 Apr 2025" },
];

const STATUS_VARIANT = {
  approved: "success",
  pending: "warning",
  "not-start": "neutral",
  rejected: "danger",
} as const;

const STATUS_LABEL = {
  approved: "Approved",
  pending: "Pending",
  "not-start": "Not Started",
  rejected: "Rejected",
} as const;

export default function PromotionApproval() {
  const [promos, setPromos] = useState(PROMOTIONS);
  const [approving, setApproving] = useState<{ id: number; action: string } | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [rejected, setRejected] = useState<number[]>([]);
  const [filter, setFilter] = useState("all");

  function decide(id: number, action: "approved" | "rejected") {
    setApproving({ id, action });
    setTimeout(() => {
      setApproving(null);
      if (action === "approved") setDone((p) => [...p, id]);
      else setRejected((p) => [...p, id]);
      setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, hrApproval: action } : p)));
    }, 1600);
  }

  const filtered = promos.filter((p) => {
    if (filter === "approved") return done.includes(p.id) || p.hrApproval === "approved";
    if (filter === "pending") return !done.includes(p.id) && !rejected.includes(p.id) && p.hrApproval === "pending";
    return true;
  });

  const approvedCount =
    done.length + promos.filter((p) => p.hrApproval === "approved" && !done.includes(p.id)).length;
  const pendingCount = promos.filter(
    (p) => p.hrApproval === "pending" && !done.includes(p.id) && !rejected.includes(p.id)
  ).length;

  return (
        <Page
      title="Promotion Approvals"
      subtitle="Senior HR / Leadership sign-off on promotions"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Promotion", href: "/performance/promotion/recommend" },
        { label: "Approvals" },
      ]}
      maxWidth="1000px"
      actions={
        <div className="flex items-center gap-2 px-3 py-2 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl">






          <Clock size={14} className="text-[#FFB800]" aria-hidden="true" />
          <span className="text-sm font-bold text-[#FFB800]">{pendingCount} pending</span>
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: promos.length },
          { label: "Approved", value: approvedCount },
          { label: "Pending", value: pendingCount },
        ].map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-[#8899AA]">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 mb-5" role="group" aria-label="Filter promotions">
        {["all", "pending", "approved"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((promo) => {
          const isApproved = done.includes(promo.id) || promo.hrApproval === "approved";
          const isRejected = rejected.includes(promo.id);
          const isApproving = approving?.id === promo.id;

          return (
            <Card key={promo.id} padding="md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#1A2A3A] flex items-center justify-center text-base font-bold text-[#8899AA] shrink-0">
                  {promo.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-white">{promo.name}</p>
                    {isApproved && (
                      <CheckCircle2 size={15} className="text-[#00E5A0]" aria-hidden="true" />
                    )}
                    {isRejected && (
                      <XCircle size={15} className="text-[#FF4444]" aria-hidden="true" />
                    )}
                  </div>
                  <p className="text-xs text-[#8899AA]">
                    {promo.dept} · Manager: {promo.manager}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-[#445566]">{promo.from}</span>
                    <ArrowUp size={11} className="text-[#00E5A0] rotate-45" aria-hidden="true" />
                    <span className="text-[#00E5A0] font-semibold">{promo.to}</span>
                  </div>
                </div>
              </div>

              {/* Approval chain */}
              <div className="flex items-center justify-between mb-4 px-2">
                {[
                  { label: "Manager", status: promo.managerApproval },
                  {
                    label: "HR",
                    status: isApproved ? "approved" : isRejected ? "rejected" : promo.hrApproval,
                  },
                ].map((step, i) => {
                  const variant = STATUS_VARIANT[step.status as keyof typeof STATUS_VARIANT] ?? "neutral";
                  return (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">
                          {step.status === "approved" ? "✓" : step.label[0]}
                        </div>
                        <p className="text-[10px] text-[#445566]">{step.label}</p>
                        <Badge variant={variant}>
                          {STATUS_LABEL[step.status as keyof typeof STATUS_LABEL] ?? step.status}
                        </Badge>
                      </div>
                      {i === 0 && <div className="flex-1 h-0.5 mx-3 bg-[#1A2A3A]" aria-hidden="true" />}
                    </div>
                  );
                })}
              </div>

              {promo.hrApproval === "pending" && !isApproved && !isRejected && (
                <div className="flex gap-3">
                  <Button
                    variant="danger"
                    className="flex-1"
                    icon={<XCircle size={15} aria-hidden="true" />}
                    disabled={!!isApproving}
                    onClick={() => decide(promo.id, "rejected")}
                  >
                    Reject
                  </Button>
                  <Button
                    className="flex-1"
                    icon={<CheckCircle2 size={15} aria-hidden="true" />}
                    disabled={!!isApproving}
                    isLoading={isApproving && approving?.action === "approved"}
                    loadingText="Approving..."
                    onClick={() => decide(promo.id, "approved")}
                  >
                    Approve
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
