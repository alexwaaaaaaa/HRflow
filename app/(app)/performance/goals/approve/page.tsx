"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock, ChevronRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface GoalRequest {
  id: number;
  emp: string;
  avatar: string;
  dept: string;
  goals: number;
  totalWeight: number;
  submittedOn: string;
  status: "pending" | "approved" | "rejected";
  flagged: boolean;
}

const REQUESTS: GoalRequest[] = [
  { id: 1, emp: "Anjali Singh", avatar: "AS", dept: "Sales", goals: 5, totalWeight: 100, submittedOn: "01 Apr 2025", status: "pending", flagged: false },
  { id: 2, emp: "Rahul Sharma", avatar: "RS", dept: "Engineering", goals: 4, totalWeight: 95, submittedOn: "01 Apr 2025", status: "pending", flagged: true },
  { id: 3, emp: "Priya Kapoor", avatar: "PK", dept: "Marketing", goals: 5, totalWeight: 100, submittedOn: "02 Apr 2025", status: "approved", flagged: false },
  { id: 4, emp: "Vikas Sharma", avatar: "VS", dept: "Sales", goals: 3, totalWeight: 80, submittedOn: "02 Apr 2025", status: "pending", flagged: true },
  { id: 5, emp: "Meena Reddy", avatar: "MR", dept: "HR", goals: 4, totalWeight: 100, submittedOn: "03 Apr 2025", status: "rejected", flagged: false },
  { id: 6, emp: "Deepak Mehta", avatar: "DM", dept: "Finance", goals: 5, totalWeight: 100, submittedOn: "03 Apr 2025", status: "pending", flagged: false },
];

const STATUS_VARIANT = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
} as const;

const STATUS_LABEL = {
  pending: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
} as const;

function EmployeeCell({ req }: { req: GoalRequest }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA] shrink-0">
        {req.avatar}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-white text-sm">{req.emp}</p>
          {req.flagged && <Badge variant="warning">⚠ Weight ≠ 100%</Badge>}
        </div>
        <p className="text-xs text-[#8899AA]">
          {req.dept} · {req.goals} goals · Total weight: {req.totalWeight}% · Submitted {req.submittedOn}
        </p>
      </div>
    </div>
  );
}

export default function GoalApprovalManager() {
  const [requests, setRequests] = useState(REQUESTS);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  function decide(id: number, action: "approved" | "rejected") {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: action } : r)));
    setActiveId(null);
    setComment("");
  }

  const filtered = requests.filter(
    (r) =>
      (filter === "all" || r.status === filter) &&
      r.emp.toLowerCase().includes(search.toLowerCase())
  );

  const pending = requests.filter((r) => r.status === "pending").length;

  return (
        <Page
      title="Goal Approvals"
      subtitle="Review and approve team goals for FY 2024–25"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Goals", href: "/performance/goals/set" },
        { label: "Approvals" },
      ]}
      maxWidth="1000px"
      actions={
        <div className="flex items-center gap-2 px-3 py-2 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl">






          <Clock size={14} className="text-[#FFB800]" aria-hidden="true" />
          <span className="text-sm font-bold text-[#FFB800]">{pending} pending</span>
        </div>
      }
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee..."
            aria-label="Search employees"
            className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
          />
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter by status">
          {["all", "pending", "approved", "rejected"].map((s) => (
            <Button
              key={s}
              variant={filter === s ? "primary" : "secondary"}
              size="sm"
              onClick={() => setFilter(s)}
            >
              {s === "all"
                ? `All (${requests.length})`
                : `${s.charAt(0).toUpperCase() + s.slice(1)} (${requests.filter((r) => r.status === s).length})`}
            </Button>
          ))}
        </div>
      </div>

      {/* Request cards */}
      <div className="space-y-4">
        {filtered.map((req) => {
          const isOpen = activeId === req.id;
          return (
            <Card key={req.id} padding="none" className={req.flagged ? "border-[#FFB800]/30" : ""}>
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <EmployeeCell req={req} />
                  </div>
                  <Badge variant={STATUS_VARIANT[req.status]}>{STATUS_LABEL[req.status]}</Badge>
                  {req.status === "pending" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      iconRight={<ChevronRight size={14} aria-hidden="true" />}
                      onClick={() => setActiveId(isOpen ? null : req.id)}
                      aria-expanded={isOpen}
                    >
                      Review
                    </Button>
                  )}
                  {req.status !== "pending" && (
                    <Button variant="ghost" size="sm" iconRight={<ChevronRight size={14} aria-hidden="true" />}>
                      View
                    </Button>
                  )}
                </div>
              </div>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 border-t border-[#1A2A3A]">
                  <div className="bg-[#0A1420] rounded-xl p-4 mb-4 mt-3">
                    <p className="text-xs text-[#8899AA] mb-2">Sample Goal from {req.emp}</p>
                    <div className="space-y-2">
                      {[
                        "Achieve ₹1.2 Cr quarterly revenue (W: 30%)",
                        "Maintain CSAT > 95% (W: 25%)",
                        "Complete AWS certification (W: 20%)",
                      ].map((g) => (
                        <div key={g} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                          <p className="text-xs text-white">{g}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`comment-${req.id}`} className="block text-xs text-[#8899AA] mb-1.5">
                      Comment (optional)
                    </label>
                    <textarea
                      id={`comment-${req.id}`}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={2}
                      placeholder="Add feedback for the employee..."
                      className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="danger"
                      className="flex-1"
                      icon={<XCircle size={15} aria-hidden="true" />}
                      onClick={() => decide(req.id, "rejected")}
                    >
                      Request Revision
                    </Button>
                    <Button
                      className="flex-1"
                      icon={<CheckCircle2 size={15} aria-hidden="true" />}
                      onClick={() => decide(req.id, "approved")}
                    >
                      Approve Goals
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#445566]">No requests found</div>
        )}
      </div>
    

        

        

        </Page>
    );
}
