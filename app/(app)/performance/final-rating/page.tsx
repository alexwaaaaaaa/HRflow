"use client";

import { useState } from "react";
import { Star, Download, Eye, Lock, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Employee {
  id: number;
  name: string;
  avatar: string;
  dept: string;
  role: string;
  kra: number;
  comp: number;
  final: number;
  band: string;
  increment: string;
  totalComp: string;
}

const EMPLOYEES: Employee[] = [
  { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", role: "Sales Executive", kra: 4.8, comp: 4.6, final: 4.7, band: "E", increment: "18%", totalComp: "₹18.2L" },
  { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", role: "Software Engineer", kra: 4.2, comp: 4.0, final: 4.1, band: "EE", increment: "12%", totalComp: "₹15.8L" },
  { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", role: "Marketing Lead", kra: 4.5, comp: 4.3, final: 4.4, band: "EE", increment: "14%", totalComp: "₹17.6L" },
  { id: 4, name: "Deepak Mehta", avatar: "DM", dept: "Finance", role: "Finance Analyst", kra: 3.6, comp: 3.4, final: 3.5, band: "ME", increment: "8%", totalComp: "₹11.2L" },
  { id: 5, name: "Vikas Sharma", avatar: "VS", dept: "Sales", role: "Account Manager", kra: 2.4, comp: 2.6, final: 2.5, band: "NI", increment: "0%", totalComp: "₹8.4L" },
];

const BAND_MAP = {
  E: { label: "Exceptional", variant: "success" as const },
  EE: { label: "Exceeds Exp.", variant: "info" as const },
  ME: { label: "Meets Exp.", variant: "warning" as const },
  NI: { label: "Needs Improvement", variant: "warning" as const },
  U: { label: "Unsatisfactory", variant: "danger" as const },
};

function EmployeeCell({ emp }: { emp: Employee }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">
        {emp.avatar}
      </div>
      <div>
        <p className="font-medium text-white">{emp.name}</p>
        <p className="text-[11px] text-[#445566]">{emp.role}</p>
      </div>
    </div>
  );
}

export default function FinalRating() {
  const [locked, setLocked] = useState(false);
  const [locking, setLocking] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);

  function handleLock() {
    setLocking(true);
    setTimeout(() => {
      setLocking(false);
      setLocked(true);
    }, 2000);
  }

  const columns: Column<Employee>[] = [
    {
      key: "employee",
      label: "Employee",
      render: (emp) => <EmployeeCell emp={emp} />,
      sortable: true,
      sortValue: (emp) => emp.name,
    },
    {
      key: "kra",
      label: "KRA Score",
      align: "center",
      render: (emp) => (
        <span>
          <span className="text-white font-semibold">{emp.kra.toFixed(1)}</span>
          <span className="text-[#445566] text-xs">/5</span>
        </span>
      ),
      sortable: true,
      sortValue: (emp) => emp.kra,
    },
    {
      key: "comp",
      label: "Competency",
      align: "center",
      render: (emp) => (
        <span>
          <span className="text-white font-semibold">{emp.comp.toFixed(1)}</span>
          <span className="text-[#445566] text-xs">/5</span>
        </span>
      ),
    },
    {
      key: "final",
      label: "Final Rating",
      align: "center",
      render: (emp) => (
        <div className="flex items-center justify-center gap-1">
          <Star size={14} style={{ color: "#FFB800", fill: "#FFB800" }} aria-hidden="true" />
          <span className="font-bold text-white">{emp.final.toFixed(1)}</span>
        </div>
      ),
      sortable: true,
      sortValue: (emp) => emp.final,
    },
    {
      key: "band",
      label: "Band",
      align: "center",
      render: (emp) => {
        const band = BAND_MAP[emp.band as keyof typeof BAND_MAP];
        return <Badge variant={band.variant}>{emp.band} · {band.label}</Badge>;
      },
    },
    {
      key: "increment",
      label: "Increment",
      align: "center",
      render: (emp) => (
        <span
          className={`font-bold ${+emp.increment.replace("%", "") > 0 ? "text-[#00E5A0]" : "text-[#FF4444]"}`}
        >
          ↑ {emp.increment}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (emp) => (
        <Button
          variant="secondary"
          size="sm"
          icon={<Eye size={11} aria-hidden="true" />}
          onClick={() => setSelected(emp === selected ? null : emp)}
          aria-label={`View ${emp.name} rating breakdown`}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Page
      title="Final Ratings"
      subtitle="Post-calibration final performance ratings · FY 2024–25"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Final Ratings" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
            Export
          </Button>
          <Button
            variant={locked ? "secondary" : "primary"}
            onClick={handleLock}
            disabled={locked || locking}
            isLoading={locking}
            loadingText="Locking..."
            icon={<Lock size={14} aria-hidden="true" />}
          >
            {locked ? "Ratings Locked" : "Lock & Publish"}
          </Button>
        </>
      }
    >
      {locked && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded-xl">
          <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
          <p className="text-sm text-[#00E5A0]">
            Final ratings locked and published. Letters can now be generated.
          </p>
        </div>
      )}

      <Card padding="none">
        <DataTable<Employee>
          data={EMPLOYEES}
          columns={columns}
          rowKey={(e) => e.id}
          aria-label="Final employee ratings"
          emptyTitle="No ratings"
        />
      </Card>

      {/* Detail panel */}
      {selected && (
        <Card padding="lg" className="mt-5">
          <h3 className="font-semibold mb-4 text-white">{selected.name} — Rating Breakdown</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "KRA Score", value: `${selected.kra.toFixed(1)} / 5` },
              { label: "Competency", value: `${selected.comp.toFixed(1)} / 5` },
              { label: "Final Rating", value: `${selected.final.toFixed(1)} / 5` },
              { label: "Increment", value: selected.increment },
            ].map((d) => (
              <div key={d.label} className="bg-[#0A1420] rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-white">{d.value}</p>
                <p className="text-xs text-[#8899AA]">{d.label}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </Page>
  );
}
