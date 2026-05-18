"use client";

import { useState } from "react";
import { Plus, Edit2, ChevronDown, ChevronUp, Star } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const COMPETENCIES = [
  {
    id: 1,
    name: "Communication",
    description: "Clearly articulates ideas verbally and in writing",
    levels: [
      { rating: 1, label: "Basic", desc: "Struggles to articulate ideas clearly" },
      { rating: 2, label: "Developing", desc: "Communicates adequately in familiar situations" },
      { rating: 3, label: "Proficient", desc: "Communicates effectively in most situations" },
      { rating: 4, label: "Advanced", desc: "Adapts communication style to audience and context" },
      { rating: 5, label: "Expert", desc: "Inspires through communication; influences at org level" },
    ],
  },
  {
    id: 2,
    name: "Problem Solving",
    description: "Analyzes complex issues and develops innovative solutions",
    levels: [
      { rating: 1, label: "Basic", desc: "Struggles with ambiguous problems" },
      { rating: 2, label: "Developing", desc: "Resolves standard problems with guidance" },
      { rating: 3, label: "Proficient", desc: "Independently solves most problems" },
      { rating: 4, label: "Advanced", desc: "Solves complex multi-stakeholder problems" },
      { rating: 5, label: "Expert", desc: "Creates frameworks that prevent systemic problems" },
    ],
  },
  {
    id: 3,
    name: "Leadership",
    description: "Inspires and guides individuals toward goals",
    levels: [
      { rating: 1, label: "Basic", desc: "Follows directions without leading others" },
      { rating: 2, label: "Developing", desc: "Occasionally takes initiative" },
      { rating: 3, label: "Proficient", desc: "Leads small teams effectively" },
      { rating: 4, label: "Advanced", desc: "Drives org-wide change and develops others" },
      { rating: 5, label: "Expert", desc: "Shapes organizational culture and strategy" },
    ],
  },
];

function CompetencyLevelCard({ level }: { level: { rating: number; label: string; desc: string } }) {
  return (
    <div className="bg-[#0A1420] rounded-xl p-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        {Array.from({ length: level.rating }).map((_, i) => (
          <Star key={i} size={10} style={{ color: "#FFB800", fill: "#FFB800" }} aria-hidden="true" />
        ))}
      </div>
      <p className="text-xs font-semibold text-white mb-1">{level.label}</p>
      <p className="text-[10px] text-[#8899AA] leading-relaxed">{level.desc}</p>
    </div>
  );
}

export default function CompetencyFramework() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
        <Page
      title="Competency Framework"
      subtitle="Define behavioural competencies and proficiency levels"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Competency" },
      ]}
      maxWidth="1000px"
      actions={
        <Button variant="secondary" icon={<Plus size={14} aria-hidden="true" />





}>
          Add Competency
        </Button>
      }
    >
      <div className="space-y-4">
        {COMPETENCIES.map((comp) => {
          const expanded = expandedId === comp.id;
          return (
            <Card key={comp.id} padding="none">
              <div
                className="flex items-center gap-4 p-5 cursor-pointer hover:bg-[#1A2A3A]/30 transition-colors"
                onClick={() => setExpandedId(expanded ? null : comp.id)}
                role="button"
                aria-expanded={expanded}
                aria-controls={`comp-panel-${comp.id}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedId(expanded ? null : comp.id);
                  }
                }}
              >
                <div className="flex-1">
                  <p className="font-semibold text-white">{comp.name}</p>
                  <p className="text-xs text-[#8899AA] mt-0.5">{comp.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Edit2 size={13} aria-hidden="true" />}
                    aria-label={`Edit ${comp.name}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {expanded ? (
                    <ChevronUp size={15} className="text-[#445566]" aria-hidden="true" />
                  ) : (
                    <ChevronDown size={15} className="text-[#445566]" aria-hidden="true" />
                  )}
                </div>
              </div>
              {expanded && (
                <div
                  id={`comp-panel-${comp.id}`}
                  role="region"
                  aria-labelledby={`comp-heading-${comp.id}`}
                  className="px-5 pb-5 border-t border-[#1A2A3A]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-4">
                    {comp.levels.map((lv) => (
                      <CompetencyLevelCard key={lv.rating} level={lv} />
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    

        

        

        </Page>
    );
}
