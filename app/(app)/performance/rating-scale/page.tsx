"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Star, CheckCircle2, GripVertical } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface RatingLevel {
  id: number;
  label: string;
  score: number;
  description: string;
  color: string;
  percentage: string;
}

const DEFAULT_SCALE: RatingLevel[] = [
  { id: 1, label: "Exceptional", score: 5, description: "Consistently exceeds all expectations. Role model performance.", color: "#00E5A0", percentage: "10%" },
  { id: 2, label: "Exceeds Expectations", score: 4, description: "Regularly surpasses goals. High impact contributor.", color: "#0066FF", percentage: "20%" },
  { id: 3, label: "Meets Expectations", score: 3, description: "Achieves most goals. Solid, reliable performance.", color: "#FFB800", percentage: "40%" },
  { id: 4, label: "Needs Improvement", score: 2, description: "Some gaps. Requires focused development.", color: "#FF8C00", percentage: "20%" },
  { id: 5, label: "Unsatisfactory", score: 1, description: "Consistently falls short. PIP may be initiated.", color: "#FF4444", percentage: "10%" },
];

export default function RatingScaleConfig() {
  const [scale, setScale] = useState<RatingLevel[]>(DEFAULT_SCALE);
  const [editId, setEditId] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  function updateLevel(id: number, field: keyof RatingLevel, value: string | number) {
    setScale((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  }

  function deleteLevel(id: number) {
    setScale((prev) => prev.filter((l) => l.id !== id));
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const totalPct = scale.reduce((s, l) => s + parseInt(l.percentage), 0);

  return (
        <Page
      title="Rating Scale Configuration"
      subtitle="Define performance rating levels and bell curve distribution"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Rating Scale" },
      ]}
      maxWidth="1000px"
      actions={
        <>






          <Button
            variant="secondary"
            icon={<Plus size={14} aria-hidden="true" />}
            onClick={() =>
              setScale((prev) => [
                ...prev,
                { id: Date.now(), label: "New Level", score: 0, description: "", color: "#8899AA", percentage: "0%" },
              ])
            }
          >
            Add Level
          </Button>
          <Button
            variant={saved ? "secondary" : "primary"}
            onClick={save}
            icon={saved ? <CheckCircle2 size={14} aria-hidden="true" /> : undefined}
          >
            {saved ? "Saved" : "Save Scale"}
          </Button>
        </>
      }
    >
      {/* Visual bar */}
      <Card padding="lg" className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Bell Curve Distribution Preview</h3>
          <Badge variant={totalPct === 100 ? "success" : "warning"}>
            Total: {totalPct}% {totalPct !== 100 ? "(should be 100%)" : "✓"}
          </Badge>
        </div>
        <div
          className="h-10 flex rounded-xl overflow-hidden gap-0.5"
          role="img"
          aria-label="Bell curve distribution preview"
        >
          {scale.map((l) => (
            <div
              key={l.id}
              className="flex items-center justify-center text-[10px] font-bold transition-all"
              style={{ width: l.percentage, background: l.color + "80", color: "#fff" }}
            >
              {parseInt(l.percentage) >= 15 ? l.percentage : ""}
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 flex-wrap">
          {scale.map((l) => (
            <span key={l.id} className="flex items-center gap-1.5 text-[11px] text-[#8899AA]">
              <span className="w-2.5 h-2.5 rounded" style={{ background: l.color }} aria-hidden="true" />
              {l.label} · {l.percentage}
            </span>
          ))}
        </div>
      </Card>

      {/* Scale levels */}
      <div className="space-y-3">
        {scale.map((level) => (
          <Card key={level.id} padding="none" className={editId === level.id ? "border-[#00E5A0]/40" : ""}>
            <div className="flex items-center gap-3 p-4">
              <GripVertical size={16} className="text-[#445566] cursor-grab shrink-0" aria-hidden="true" />
              {/* Star display */}
              <div className="flex gap-0.5 shrink-0" aria-label={`${level.score} stars`}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={14}
                    style={{
                      color: si < level.score ? level.color : "#1A2A3A",
                      fill: si < level.score ? level.color : "#1A2A3A",
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm" style={{ color: level.color }}>
                    {level.label}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded text-[#8899AA] bg-[#1A2A3A]">
                    {level.score}.0
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0A1420] text-[#445566]">
                    {level.percentage} of workforce
                  </span>
                </div>
                <p className="text-[11px] text-[#8899AA] mt-0.5 truncate">{level.description}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Edit2 size={13} aria-hidden="true" />}
                  aria-label={`Edit ${level.label}`}
                  onClick={() => setEditId(editId === level.id ? null : level.id)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Trash2 size={13} aria-hidden="true" />}
                  aria-label={`Delete ${level.label}`}
                  onClick={() => deleteLevel(level.id)}
                />
              </div>
            </div>

            {/* Inline edit */}
            {editId === level.id && (
              <div className="px-4 pb-4 pt-1 border-t border-[#1A2A3A] bg-[#0A1420]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label htmlFor={`label-${level.id}`} className="block text-xs text-[#8899AA] mb-1">
                      Label
                    </label>
                    <input
                      id={`label-${level.id}`}
                      value={level.label}
                      onChange={(e) => updateLevel(level.id, "label", e.target.value)}
                      className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                    />
                  </div>
                  <div>
                    <label htmlFor={`score-${level.id}`} className="block text-xs text-[#8899AA] mb-1">
                      Score (1–5)
                    </label>
                    <input
                      id={`score-${level.id}`}
                      type="number"
                      min={1}
                      max={5}
                      value={level.score}
                      onChange={(e) => updateLevel(level.id, "score", +e.target.value)}
                      className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                    />
                  </div>
                  <div>
                    <label htmlFor={`pct-${level.id}`} className="block text-xs text-[#8899AA] mb-1">
                      % Workforce
                    </label>
                    <input
                      id={`pct-${level.id}`}
                      value={level.percentage}
                      onChange={(e) => updateLevel(level.id, "percentage", e.target.value)}
                      className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`color-${level.id}`} className="block text-xs text-[#8899AA] mb-1">
                      Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        id={`color-${level.id}`}
                        value={level.color}
                        onChange={(e) => updateLevel(level.id, "color", e.target.value)}
                        className="h-9 w-12 rounded bg-transparent border-0 cursor-pointer"
                        aria-label="Pick color"
                      />
                      <input
                        value={level.color}
                        onChange={(e) => updateLevel(level.id, "color", e.target.value)}
                        aria-label="Color hex value"
                        className="flex-1 h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`desc-${level.id}`} className="block text-xs text-[#8899AA] mb-1">
                      Description
                    </label>
                    <input
                      id={`desc-${level.id}`}
                      value={level.description}
                      onChange={(e) => updateLevel(level.id, "description", e.target.value)}
                      className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    

        

        

        </Page>
    );
}
