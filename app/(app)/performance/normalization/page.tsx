"use client";

import { useState } from "react";
import { Sliders, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Employee {
  id: number;
  name: string;
  dept: string;
  rawRating: number;
  normalizedRating: number;
  band: string;
}

const EMPLOYEES: Employee[] = [
  { id: 1, name: "Anjali Singh", dept: "Sales", rawRating: 4.8, normalizedRating: 4.7, band: "E" },
  { id: 2, name: "Rahul Sharma", dept: "Eng", rawRating: 4.2, normalizedRating: 4.1, band: "EE" },
  { id: 3, name: "Priya Kapoor", dept: "Mktg", rawRating: 4.5, normalizedRating: 4.4, band: "EE" },
  { id: 4, name: "Deepak Mehta", dept: "Finance", rawRating: 3.8, normalizedRating: 3.6, band: "ME" },
  { id: 5, name: "Vikas Sharma", dept: "Sales", rawRating: 2.5, normalizedRating: 2.5, band: "NI" },
  { id: 6, name: "Meena Reddy", dept: "HR", rawRating: 4.0, normalizedRating: 3.9, band: "ME" },
];

const BAND_VARIANT = {
  E: "success",
  EE: "info",
  ME: "warning",
  NI: "warning",
  U: "danger",
} as const;

export default function RatingNormalization() {
  const [emps, setEmps] = useState(EMPLOYEES);
  const [factor, setFactor] = useState(0);
  const [dept, setDept] = useState("All");
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const depts = ["All", ...Array.from(new Set(EMPLOYEES.map((e) => e.dept)))];

  function applyNorm() {
    setLoading(true);
    setTimeout(() => {
      setEmps((prev) =>
        prev.map((e) => {
          if (dept !== "All" && e.dept !== dept) return e;
          const nr = Math.min(5, Math.max(1, parseFloat((e.rawRating + factor).toFixed(1))));
          const band =
            nr >= 4.5 ? "E" : nr >= 3.8 ? "EE" : nr >= 2.8 ? "ME" : nr >= 2.0 ? "NI" : "U";
          return { ...e, normalizedRating: nr, band };
        })
      );
      setLoading(false);
      setApplied(true);
    }, 1500);
  }

  const columns: Column<Employee>[] = [
    {
      key: "employee",
      label: "Employee",
      render: (emp) => (
        <div>
          <p className="font-medium text-white">{emp.name}</p>
          <p className="text-[11px] text-[#445566]">{emp.dept}</p>
        </div>
      ),
      sortable: true,
      sortValue: (emp) => emp.name,
    },
    {
      key: "raw",
      label: "Raw Rating",
      align: "center",
      render: (emp) => <span className="text-white">{emp.rawRating.toFixed(1)}</span>,
      sortable: true,
      sortValue: (emp) => emp.rawRating,
    },
    {
      key: "normalized",
      label: "Normalized",
      align: "center",
      render: (emp) => <span className="font-bold text-white">{emp.normalizedRating.toFixed(1)}</span>,
      sortable: true,
      sortValue: (emp) => emp.normalizedRating,
    },
    {
      key: "change",
      label: "Change",
      align: "center",
      render: (emp) => {
        const delta = emp.normalizedRating - emp.rawRating;
        return (
          <span
            className="text-xs font-semibold"
            style={{
              color: delta > 0 ? "#00E5A0" : delta < 0 ? "#FF4444" : "#445566",
            }}
          >
            {delta > 0 ? `+${delta.toFixed(2)}` : delta < 0 ? delta.toFixed(2) : "—"}
          </span>
        );
      },
    },
    {
      key: "band",
      label: "Band",
      align: "center",
      render: (emp) => (
        <Badge variant={BAND_VARIANT[emp.band as keyof typeof BAND_VARIANT] ?? "neutral"}>
          {emp.band}
        </Badge>
      ),
    },
  ];

  return (
        <Page
      title="Rating Normalization"
      subtitle="Apply statistical adjustments to align ratings across departments"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Normalization" },
      ]}
      maxWidth="1100px"
    >






      {/* Controls */}
      <Card padding="lg" className="mb-6">
        <h3 className="font-semibold mb-4 text-sm text-white">Normalization Controls</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dept-select" className="block text-xs text-[#8899AA] mb-2">
              Department
            </label>
            <select
              id="dept-select"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
            >
              {depts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="factor-range" className="block text-xs text-[#8899AA] mb-2">
              Adjustment Factor: {factor > 0 ? `+${factor}` : factor}
            </label>
            <input
              id="factor-range"
              type="range"
              min={-0.5}
              max={0.5}
              step={0.05}
              value={factor}
              onChange={(e) => setFactor(+e.target.value)}
              className="w-full accent-[#00E5A0]"
              aria-label="Adjustment factor"
            />
            <div className="flex justify-between text-[10px] text-[#445566] mt-1">
              <span>-0.5</span>
              <span>0</span>
              <span>+0.5</span>
            </div>
          </div>
          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={applyNorm}
              disabled={loading}
              isLoading={loading}
              loadingText="Applying..."
              icon={<Sliders size={14} aria-hidden="true" />}
            >
              Apply Normalization
            </Button>
          </div>
        </div>
        {applied && (
          <div className="mt-3 flex items-center gap-2 text-xs text-[#00E5A0]">
            <CheckCircle2 size={13} aria-hidden="true" /> Normalization applied — verify changes below before
            saving
          </div>
        )}
      </Card>

      <Card padding="none">
        <DataTable<Employee>
          data={emps}
          columns={columns}
          rowKey={(e) => e.id}
          aria-label="Employee rating normalization"
          emptyTitle="No employees"
        />
      </Card>
    

        

        

        </Page>
    );
}
