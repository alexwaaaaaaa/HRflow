"use client";

import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const REPORTS = [
  { id: "dept-summary", title: "Department Rating Summary", desc: "Average ratings per dept, bell curve distribution", rows: 12, category: "Ratings" },
  { id: "emp-ratings", title: "Employee Final Ratings Export", desc: "All employee ratings with band and increment", rows: 512, category: "Ratings" },
  { id: "goal-completion", title: "Goal Completion Analysis", desc: "Goal achievement rate by dept and employee", rows: 420, category: "Goals" },
  { id: "pip-tracker", title: "PIP Tracker Report", desc: "Active/closed PIPs, durations, outcomes", rows: 4, category: "PIP" },
  { id: "promotions", title: "Promotion Summary", desc: "Approved promotions by dept and level jump", rows: 18, category: "Promo" },
  { id: "calibration-log", title: "Calibration Audit Log", desc: "Pre/post calibration rating changes with reasons", rows: 89, category: "Audit" },
  { id: "increment-dist", title: "Increment Distribution", desc: "Increment % distribution across pay grades & depts", rows: 512, category: "Comp" },
  { id: "cycle-completion", title: "Cycle Completion Rate", desc: "% employees who completed each review stage", rows: 1, category: "Cycle" },
];

const CATS = ["All", ...Array.from(new Set(REPORTS.map((r) => r.category)))];

export default function PMSReports() {
  const [filterCat, setFilterCat] = useState("All");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  function download(id: string) {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      setDone((p) => [...p, id]);
    }, 1500);
  }

  const filtered = filterCat === "All" ? REPORTS : REPORTS.filter((r) => r.category === filterCat);

  return (
        <Page
      title="PMS Reports"
      subtitle="Export performance data for analysis and compliance"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Reports" },
      ]}
      maxWidth="1100px"
      actions={
        <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />







}>
          Export All
        </Button>
      }
    >
      <div className="flex gap-2 mb-5 flex-wrap" role="group" aria-label="Filter by category">
        {CATS.map((c) => (
          <Button
            key={c}
            variant={filterCat === c ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilterCat(c)}
          >
            {c}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((r) => {
          const isDone = done.includes(r.id);
          const isLoading = downloading === r.id;
          return (
            <Card key={r.id} padding="md" className="hover:border-[#2A3A4A] transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#1A2A3A] flex items-center justify-center shrink-0">
                  <FileText size={15} className="text-[#8899AA]" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{r.title}</p>
                  <p className="text-[11px] text-[#8899AA] mt-0.5">{r.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="neutral">{r.category}</Badge>
                  <span className="text-[10px] text-[#445566]">{r.rows} rows</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={isDone ? "secondary" : "primary"}
                    size="sm"
                    icon={
                      isLoading ? (
                        <Loader2 size={11} className="animate-spin" aria-hidden="true" />
                      ) : (
                        <Download size={11} aria-hidden="true" />
                      )
                    }
                    disabled={isLoading}
                    onClick={() => download(r.id)}
                    aria-label={`Download ${r.title} as CSV`}
                  >
                    {isDone ? "✓ Downloaded" : "CSV"}
                  </Button>
                  <Button variant="secondary" size="sm" aria-label={`Download ${r.title} as XLSX`}>
                    XLSX
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    

        

        

            
        </Page>
    );
}
