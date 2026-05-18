"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Edit2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const EMPLOYEES = [
  { id: 1, name: "Rahul Sharma", dept: "Eng", managerRating: 3.8, finalRating: 3.8, overrideReason: "" },
  { id: 2, name: "Vikas Sharma", dept: "Sales", managerRating: 2.5, finalRating: 2.5, overrideReason: "" },
  { id: 3, name: "Anjali Singh", dept: "Sales", managerRating: 4.8, finalRating: 4.8, overrideReason: "" },
];

export default function HROverride() {
  const [emps, setEmps] = useState(
    EMPLOYEES.map((e) => ({ ...e, overrideRating: e.finalRating, dirty: false }))
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateOverride(id: number, val: number) {
    setEmps((prev) =>
      prev.map((e) => (e.id === id ? { ...e, overrideRating: val, dirty: val !== e.managerRating } : e))
    );
    setSaved(false);
  }

  function updateReason(id: number, reason: string) {
    setEmps((prev) => prev.map((e) => (e.id === id ? { ...e, overrideReason: reason } : e)));
  }

  const overrides = emps.filter((e) => e.dirty);

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1600);
  }

  return (
        <Page
      title="HR Override"
      subtitle="HR can override manager ratings post-calibration with documented reason"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "HR Override" },
      ]}
      maxWidth="1000px"
    >






      <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-xl">
        <AlertTriangle size={15} className="text-[#FFB800] shrink-0" aria-hidden="true" />
        <p className="text-sm text-[#FFB800]">
          Overrides are logged in the audit trail with timestamp and HR ID. All changes require a documented
          justification.
        </p>
      </div>

      <div className="space-y-4">
        {emps.map((emp) => (
          <Card key={emp.id} padding="md" className={emp.dirty ? "border-[#9B59B6]/40" : ""}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-white">{emp.name}</p>
                <p className="text-xs text-[#445566]">{emp.dept}</p>
              </div>
              {emp.dirty && (
                <Badge variant="purple">
                  <Edit2 size={10} aria-hidden="true" className="mr-1" /> Overridden
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-[#8899AA] mb-1">Manager Rating (Final)</label>
                <div className="h-10 bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-3 flex items-center text-sm text-white">
                  {emp.managerRating.toFixed(1)}
                </div>
              </div>
              <div>
                <label htmlFor={`override-${emp.id}`} className="block text-xs text-[#8899AA] mb-1">
                  HR Override Rating
                </label>
                <input
                  id={`override-${emp.id}`}
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  value={emp.overrideRating}
                  onChange={(e) => updateOverride(emp.id, +e.target.value)}
                  className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#9B59B6] transition-colors"
                />
              </div>
            </div>
            {emp.dirty && (
              <div>
                <label htmlFor={`reason-${emp.id}`} className="block text-xs text-[#8899AA] mb-1.5">
                  Override Justification (required) *
                </label>
                <textarea
                  id={`reason-${emp.id}`}
                  rows={2}
                  value={emp.overrideReason}
                  onChange={(e) => updateReason(emp.id, e.target.value)}
                  placeholder="Document the business reason for this override..."
                  className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#9B59B6] resize-none"
                />
              </div>
            )}
          </Card>
        ))}
      </div>

      {overrides.length > 0 && (
        <Button
          className="mt-6 w-full"
          variant={saved ? "secondary" : "primary"}
          onClick={handleSave}
          disabled={saving || overrides.some((e) => !e.overrideReason)}
          isLoading={saving}
          loadingText="Saving Overrides..."
          icon={saved ? <CheckCircle2 size={16} aria-hidden="true" /> : undefined}
        >
          {saved
            ? "Overrides Saved"
            : `Save ${overrides.length} Override${overrides.length > 1 ? "s" : ""}`}
        </Button>
      )}
    

        

        

        </Page>
    );
}
