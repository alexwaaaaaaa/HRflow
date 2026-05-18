"use client";

import { use, useState } from "react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const INCIDENTS = [
  "Attendance irregularity",
  "Insubordination",
  "Misconduct",
  "Poor performance",
  "Policy violation",
  "Other",
] as const;

const LEVELS = [
  "Verbal Warning (1st)",
  "Written Warning (1st)",
  "Written Warning (2nd)",
  "Final Warning",
] as const;

type Level = (typeof LEVELS)[number];
type Incident = (typeof INCIDENTS)[number];

export default function WarningLetter({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [incident, setIncident] = useState<Incident>(INCIDENTS[0]);
  const [level, setLevel] = useState<Level>(LEVELS[0]);
  const [desc, setDesc] = useState("");
  const [improvement, setImprovement] = useState("");

  const handleIssue = () => {
    // TODO: replace with real mutation
    alert("Warning letter issued (stub)");
  };

  return (
    <Page
      title="Warning Letter"
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Rahul Sharma", href: `/employees/${id}` },
        { label: "Warning Letter" },
      ]}
      maxWidth="1100px"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
        {/* Left: Form */}
        <div className="space-y-5">
          <Card padding="md">
            <h3 className="mb-5 text-base font-semibold text-white">Incident Details</h3>

            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="inc-type" className="mb-1.5 block text-[13px] text-[#8899AA]">
                  Incident Type *
                </label>
                <select
                  id="inc-type"
                  value={incident}
                  onChange={(e) => setIncident(e.target.value as Incident)}
                  className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
                >
                  {INCIDENTS.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="inc-date" className="mb-1.5 block text-[13px] text-[#8899AA]">
                  Incident Date *
                </label>
                <input
                  id="inc-date"
                  type="date"
                  defaultValue="2024-11-10"
                  className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
                />
              </div>
            </div>

            <div className="mb-5">
              <div className="mb-2 text-[13px] text-[#8899AA]">Warning Level *</div>
              <div
                className="flex flex-wrap gap-2.5"
                role="group"
                aria-label="Warning level selection"
              >
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLevel(l)}
                    aria-pressed={level === l}
                    className="rounded-lg border px-3.5 py-2 text-[13px] transition-colors"
                    style={{
                      // inline-style: dynamic per-level selection color
                      background: level === l ? "rgba(255,68,68,0.1)" : "#060B14",
                      borderColor: level === l ? "#FF4444" : "#1A2A3A",
                      color: level === l ? "#FF4444" : "#8899AA",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="inc-desc" className="mb-1.5 block text-[13px] text-[#8899AA]">
                Incident Description *{" "}
                <span className="text-[#445566]">(min 50 chars)</span>
              </label>
              <textarea
                id="inc-desc"
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Describe what happened, when and how..."
                className="w-full resize-none rounded-lg border p-3.5 text-sm text-white outline-none"
                style={{
                  // inline-style: dynamic validation border color
                  background: "#060B14",
                  borderColor: desc.length > 0 && desc.length < 50 ? "#FF4444" : "#1A2A3A",
                }}
                aria-invalid={desc.length > 0 && desc.length < 50}
                aria-describedby={desc.length > 0 && desc.length < 50 ? "desc-error" : undefined}
              />
              {desc.length > 0 && desc.length < 50 && (
                <p id="desc-error" role="alert" className="mt-1 text-xs text-[#FF4444]">
                  Minimum 50 characters required ({desc.length}/50)
                </p>
              )}
            </div>

            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="improvement" className="mb-1.5 block text-[13px] text-[#8899AA]">
                  Expected Improvement
                </label>
                <textarea
                  id="improvement"
                  rows={3}
                  value={improvement}
                  onChange={(e) => setImprovement(e.target.value)}
                  placeholder="What should the employee do differently..."
                  className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3.5 text-[13px] text-white outline-none"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="imp-deadline" className="mb-1.5 block text-[13px] text-[#8899AA]">
                    Improvement Deadline
                  </label>
                  <input
                    id="imp-deadline"
                    type="date"
                    defaultValue="2024-12-10"
                    className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="witness" className="mb-1.5 block text-[13px] text-[#8899AA]">
                    Witnessed By (optional)
                  </label>
                  <input
                    id="witness"
                    placeholder="Search employee..."
                    className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3.5 text-[13px] text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="danger" className="flex-1" onClick={handleIssue}>
                Generate &amp; Issue Warning Letter
              </Button>
              <Button variant="secondary">Save Draft</Button>
            </div>
          </Card>

          <Card padding="md">
            <h3 className="mb-3 text-sm font-semibold text-white">Previous Warnings</h3>
            <div className="py-5 text-center text-[13px] text-[#8899AA]">
              No previous warnings on record ✅
            </div>
          </Card>
        </div>

        {/* Right: Letter preview */}
        <div
          className="rounded-xl p-10 font-serif text-[13px] leading-[1.8] text-black shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          style={{ background: "#FFFFFF" }}
        >
          <div className="mb-1 text-xl font-black tracking-tight">TechCorp</div>
          <div className="mb-6 border-b border-[#CCC] pb-4 text-xs text-[#666]">
            Solutions Pvt. Ltd. · 123 Tech Park, Bengaluru
          </div>
          <div className="mb-6 text-center font-bold underline">{level.toUpperCase()}</div>
          <div className="mb-4">
            Date:{" "}
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="mb-4">
            <strong>To,</strong>
            <br />
            Rahul Kumar Sharma
            <br />
            Sr. Software Engineer, Engineering
          </div>
          <div className="mb-4">
            <strong>
              Subject: {level} — {incident}
            </strong>
          </div>
          <div className="mb-4">
            This is to bring to your notice that on the date of incident, your conduct regarding{" "}
            <strong>{incident.toLowerCase()}</strong> was found to be in violation of company
            policy.
          </div>
          <div className="mb-4">{desc || "[Incident description will appear here...]"}</div>
          <div className="mb-4">
            You are expected to: {improvement || "[Improvement expectations will appear here...]"}
          </div>
          <div className="mt-10">
            <div className="mb-1 h-10 w-[200px] border-b border-dashed border-[#CCC]" />
            <div>Priya Mehta, HR Manager</div>
          </div>
        </div>
      </div>
    </Page>
  );
}
