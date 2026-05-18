"use client";

import { useState } from "react";
import { BookOpen, Plus, Tag } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface GoalTemplate {
  id: number;
  title: string;
  category: string;
  dept: string;
  metric: string;
  difficulty: "easy" | "medium" | "hard";
  usageCount: number;
}

const GOALS: GoalTemplate[] = [
  { id: 1, title: "Increase quarterly revenue by X%", category: "Sales", dept: "Sales", metric: "Revenue ₹", difficulty: "medium", usageCount: 124 },
  { id: 2, title: "Achieve CSAT score above X%", category: "Customer", dept: "Support", metric: "CSAT %", difficulty: "medium", usageCount: 98 },
  { id: 3, title: "Complete specified certification", category: "Learning", dept: "All", metric: "Cert. Count", difficulty: "easy", usageCount: 215 },
  { id: 4, title: "Reduce ticket resolution time", category: "Ops", dept: "Engineering", metric: "Avg Hours", difficulty: "medium", usageCount: 67 },
  { id: 5, title: "Onboard X new clients per quarter", category: "Sales", dept: "Sales", metric: "Count", difficulty: "hard", usageCount: 45 },
  { id: 6, title: "Launch X marketing campaigns", category: "Mktg", dept: "Marketing", metric: "Count", difficulty: "medium", usageCount: 38 },
  { id: 7, title: "Reduce cost per acquisition by X%", category: "Finance", dept: "Finance", metric: "₹ CPA", difficulty: "hard", usageCount: 22 },
  { id: 8, title: "Mentor X junior team members", category: "Learning", dept: "All", metric: "Count", difficulty: "easy", usageCount: 189 },
];

const DIFF_VARIANT = {
  easy: "success",
  medium: "warning",
  hard: "danger",
} as const;

export default function GoalLibrary() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [added, setAdded] = useState<number[]>([]);

  const categories = ["All", ...Array.from(new Set(GOALS.map((g) => g.category)))];
  const filtered = GOALS.filter(
    (g) =>
      (filterCat === "All" || g.category === filterCat) &&
      g.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<GoalTemplate>[] = [
    {
      key: "goal",
      label: "Goal Template",
      render: (goal) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1A2A3A] flex items-center justify-center shrink-0">
            <BookOpen size={15} className="text-[#8899AA]" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-medium text-white">{goal.title}</p>
              <Badge variant={DIFF_VARIANT[goal.difficulty]}>{goal.difficulty}</Badge>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#445566]">
              <span>
                <Tag size={10} className="inline mr-0.5" aria-hidden="true" />
                {goal.category}
              </span>
              <span>·</span>
              <span>{goal.dept}</span>
              <span>·</span>
              <span>Metric: {goal.metric}</span>
              <span>·</span>
              <span>Used {goal.usageCount}×</span>
            </div>
          </div>
        </div>
      ),
      sortable: true,
      sortValue: (g) => g.title,
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (goal) => {
        const isAdded = added.includes(goal.id);
        return (
          <Button
            variant={isAdded ? "secondary" : "primary"}
            size="sm"
            icon={isAdded ? undefined : <Plus size={11} aria-hidden="true" />}
            onClick={() =>
              setAdded((prev) =>
                isAdded ? prev.filter((i) => i !== goal.id) : [...prev, goal.id]
              )
            }
          >
            {isAdded ? "✓ Added" : "Add to Cycle"}
          </Button>
        );
      },
    },
  ];

  return (
        <Page
      title="Goal Library"
      subtitle="Pre-defined goal templates for reuse across teams and cycles"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Goals", href: "/performance/goals/set" },
        { label: "Library" },
      ]}
      maxWidth="1100px"
      actions={
        <Button variant="secondary" icon={<Plus size={14} aria-hidden="true" />





}>
          Create Template
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Templates", value: GOALS.length },
          { label: "Most Used", value: "Certification" },
          { label: "Categories", value: categories.length - 1 },
        ].map((s) => (
          <Card key={s.label} padding="md" className="text-center">
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-[#8899AA]">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search goal templates..."
            aria-label="Search goal templates"
            className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
          />
        </div>
        <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter by category">
          {categories.map((c) => (
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
      </div>

      <Card padding="none">
        <DataTable<GoalTemplate>
          data={filtered}
          columns={columns}
          rowKey={(g) => g.id}
          aria-label="Goal library templates"
          emptyTitle="No templates found"
          emptyDescription="Try adjusting your search or category filter."
        />
      </Card>
    

        

        

        </Page>
    );
}
