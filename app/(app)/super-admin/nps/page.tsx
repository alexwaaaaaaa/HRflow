"use client";

import { Smile, MessageSquareQuote } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

interface NpsItem {
  id: string;
  org: string;
  role: string;
  score: number;
  quote: string;
  type: "Promoter" | "Detractor";
}

const NPS_ITEMS: NpsItem[] = [
  { id: "n1", org: "TechCorp India", role: "Employee", score: 10, quote: "The instant payroll withdrawal (EWA) is a lifesaver. UI is so smooth compared to our old system.", type: "Promoter" },
  { id: "n2", org: "Zenith Logistics", role: "HR Admin", score: 9, quote: "Payroll engine ran 400 employees in 2 seconds. Incredible.", type: "Promoter" },
  { id: "n3", org: "Sunset Technologies", role: "Line Manager", score: 4, quote: "I can't figure out how to approve leaves in bulk from the mobile view. Buttons overlap.", type: "Detractor" },
  { id: "n4", org: "Global Finance", role: "Ops Lead", score: 6, quote: "System is fine but reporting could be better when exporting to CSV.", type: "Detractor" },
];

export default function NpsPage() {
  return (
    <Page
      title="Net Promoter Score (NPS) Data"
      subtitle="Aggregated end-user satisfaction metrics across the Kaarya HRFlow ecosystem."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "NPS" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-6">
        {/* NPS overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="lg" className="flex flex-col items-center justify-center min-h-[200px] border-b-4 border-b-emerald-500">
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Platform Global NPS</div>
            <div className="text-6xl font-black text-white">+64</div>
            <div className="text-xs text-emerald-400 mt-2 font-bold flex items-center gap-1">
              <Smile size={14} aria-hidden="true" /> Excellent Benchmark
            </div>
          </Card>

          <div className="md:col-span-2 grid grid-cols-3 gap-4">
            <Card padding="md" className="flex flex-col justify-center">
              <div className="text-3xl font-black text-emerald-400 mb-1">72%</div>
              <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Promoters (9-10)</div>
            </Card>
            <Card padding="md" className="flex flex-col justify-center">
              <div className="text-3xl font-black text-white mb-1">20%</div>
              <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Passives (7-8)</div>
            </Card>
            <Card padding="md" className="flex flex-col justify-center">
              <div className="text-3xl font-black text-rose-400 mb-1">8%</div>
              <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Detractors (0-6)</div>
            </Card>
          </div>
        </div>

        {/* Qualitative feedback */}
        <Card padding="none">
          <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#060D1A]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquareQuote size={18} className="text-[#556677]" aria-hidden="true" /> Recent Qualitative Feedback
            </h2>
            <div className="flex items-center gap-2">
              <label htmlFor="nps-filter" className="text-xs font-bold text-[#556677] uppercase">Filter:</label>
              <select
                id="nps-filter"
                className="bg-[#131B2B] border border-[#2A3A4A] text-white text-xs font-bold rounded-lg px-3 py-2 outline-none cursor-pointer"
              >
                <option>Detractors Only</option>
                <option>Promoters Only</option>
                <option>All Feedback</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-[#1A2A3A]">
            {NPS_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`p-5 hover:bg-[#131B2B] transition-colors flex flex-col md:flex-row gap-6 ${item.type === "Detractor" ? "bg-rose-500/5" : ""}`}
              >
                <div className="shrink-0 flex flex-col items-center justify-center bg-[#131B2B] border border-[#2A3A4A] w-16 h-16 rounded-xl">
                  <span className={`text-2xl font-black ${item.score > 8 ? "text-emerald-400" : item.score < 7 ? "text-rose-400" : "text-white"}`}>
                    {item.score}
                  </span>
                  <span className="text-[8px] text-[#556677] uppercase font-bold tracking-wider">/ 10</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium italic mb-2">&ldquo;{item.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#8899AA] font-bold">{item.org}</span>
                    <span className="text-[#3A4A5A]">|</span>
                    <span className="text-[#556677]">{item.role}</span>
                    <Badge variant={item.type === "Promoter" ? "success" : "danger"}>{item.type}</Badge>
                  </div>
                </div>
                {item.type === "Detractor" && (
                  <div className="shrink-0 pt-2 md:pt-0">
                    <Button variant="secondary" size="sm">Create Jira Issue</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Page>
  );
}
