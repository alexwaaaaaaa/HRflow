"use client";

import { Star, Users, UserCheck, GitBranch, ArrowRight } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const REVIEW_TYPES = [
  {
    href: "/performance/reviews/self",
    title: "Self Review",
    desc: "Complete your own appraisal — goals, competencies, and reflections",
    icon: UserCheck,
    status: "Open",
    statusVariant: "success" as const,
  },
  {
    href: "/performance/reviews/manager",
    title: "Manager Review",
    desc: "Review your team members — 4 pending reviews this cycle",
    icon: Users,
    status: "4 Pending",
    statusVariant: "warning" as const,
  },
  {
    href: "/performance/reviews/mid-year",
    title: "Mid-Year Review",
    desc: "H1 check-in conversations and goal progress updates",
    icon: GitBranch,
    status: "Upcoming",
    statusVariant: "purple" as const,
  },
  {
    href: "/performance/reviews/skip-level",
    title: "Skip-Level Review",
    desc: "Grandir level review — L+2 manager inputs for senior employees",
    icon: Star,
    status: "Closed",
    statusVariant: "danger" as const,
  },
];

export default function ReviewsIndexPage() {
  return (
    <Page
      title="Performance Reviews"
      subtitle="FY 2025-26 Annual Review Cycle — Deadline: Apr 30, 2026"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Reviews" },
      ]}
      maxWidth="1100px"
    >
      {/* Cycle progress */}
      <Card padding="md" className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-bold text-sm">Overall Completion</span>
          <span className="text-[#556677] text-xs">68 / 248 employees</span>
        </div>
        <div
          className="h-3 bg-[#1A2A3A] rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={27}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Overall review completion"
        >
          <div className="h-full bg-[#FFB800] rounded-full" style={{ width: "27%" }} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[#FFB800] text-xs font-bold">27% complete</span>
          <span className="text-[#556677] text-xs">51 days remaining</span>
        </div>
      </Card>

      {/* Review type cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REVIEW_TYPES.map((r) => {
          const Icon = r.icon;
          return (
            <Link
              key={r.href}
              href={r.href}
              className="group bg-[#0A1420] border border-[#1A2A3A] hover:border-[#2A3A4A] rounded-2xl p-6 transition-all hover:bg-[#0D1928]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#1A2A3A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon size={20} className="text-[#8899AA]" aria-hidden="true" />
                </div>
                <Badge variant={r.statusVariant}>{r.status}</Badge>
              </div>
              <h3 className="text-white font-bold mb-1">{r.title}</h3>
              <p className="text-[#8899AA] text-sm mb-4">{r.desc}</p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#8899AA]">
                Open{" "}
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
