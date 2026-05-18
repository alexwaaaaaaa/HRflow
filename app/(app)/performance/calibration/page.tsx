"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, ZAxis, ResponsiveContainer } from "recharts";
import { Tooltip as RechartsTooltip } from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Employee {
  id: number;
  name: string;
  avatar: string;
  dept: string;
  role: string;
  selfRating: number;
  managerRating: number;
  proposedRating: number;
  calibratedRating: number | null;
  bell: "E" | "EE" | "ME" | "NI" | "U";
}

const EMPLOYEES: Employee[] = [
  { id: 1, name: "Anjali Singh", avatar: "AS", dept: "Sales", role: "Sales Exec", selfRating: 4.5, managerRating: 4.8, proposedRating: 4.8, calibratedRating: null, bell: "E" },
  { id: 2, name: "Rahul Sharma", avatar: "RS", dept: "Eng", role: "SWE", selfRating: 3.8, managerRating: 4.2, proposedRating: 4.2, calibratedRating: null, bell: "EE" },
  { id: 3, name: "Priya Kapoor", avatar: "PK", dept: "Mktg", role: "Mktg Lead", selfRating: 4.2, managerRating: 4.5, proposedRating: 4.5, calibratedRating: null, bell: "EE" },
  { id: 4, name: "Deepak Mehta", avatar: "DM", dept: "Fin", role: "Finance Analyst", selfRating: 3.2, managerRating: 3.6, proposedRating: 3.6, calibratedRating: null, bell: "ME" },
  { id: 5, name: "Suresh Rao", avatar: "SR", dept: "Ops", role: "Ops Manager", selfRating: 3.5, managerRating: 3.8, proposedRating: 3.8, calibratedRating: null, bell: "ME" },
  { id: 6, name: "Meena Reddy", avatar: "MR", dept: "HR", role: "HR BP", selfRating: 4.0, managerRating: 3.9, proposedRating: 3.9, calibratedRating: null, bell: "ME" },
  { id: 7, name: "Vikas Sharma", avatar: "VS", dept: "Sales", role: "Account Mgr", selfRating: 2.8, managerRating: 2.5, proposedRating: 2.5, calibratedRating: null, bell: "NI" },
  { id: 8, name: "Pooja Nair", avatar: "PN", dept: "Eng", role: "QA Lead", selfRating: 3.0, managerRating: 3.2, proposedRating: 3.2, calibratedRating: null, bell: "ME" },
];

const BELL_CONFIG = {
  E: { label: "Exceptional", color: "#00E5A0", target: "10%", variant: "success" as const },
  EE: { label: "Exceeds Exp.", color: "#0066FF", target: "20%", variant: "info" as const },
  ME: { label: "Meets Exp.", color: "#FFB800", target: "40%", variant: "warning" as const },
  NI: { label: "Needs Improvement", color: "#FF8C00", target: "20%", variant: "warning" as const },
  U: { label: "Unsatisfactory", color: "#FF4444", target: "10%", variant: "danger" as const },
};

function EmployeeCell({ emp }: { emp: Employee }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">
        {emp.avatar}
      </div>
      <div>
        <p className="font-medium text-white text-xs">{emp.name}</p>
        <p className="text-[10px] text-[#445566]">{emp.dept}</p>
      </div>
    </div>
  );
}

export default function CalibrationScreen() {
  const [emps, setEmps] = useState(EMPLOYEES);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  function setBell(id: number, bell: Employee["bell"]) {
    setEmps((prev) =>
      prev.map((e) => (e.id === id ? { ...e, bell, calibratedRating: e.proposedRating } : e))
    );
  }

  function setCalibratedRating(id: number, r: number) {
    setEmps((prev) => prev.map((e) => (e.id === id ? { ...e, calibratedRating: r } : e)));
  }

  function lockCalibration() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setDone(true);
    }, 1800);
  }

  const dist = Object.keys(BELL_CONFIG).map((k) => ({
    key: k,
    count: emps.filter((e) => e.bell === k).length,
    color: BELL_CONFIG[k as keyof typeof BELL_CONFIG].color,
    label: BELL_CONFIG[k as keyof typeof BELL_CONFIG].label,
    target: BELL_CONFIG[k as keyof typeof BELL_CONFIG].target,
    variant: BELL_CONFIG[k as keyof typeof BELL_CONFIG].variant,
  }));

  const scatterData = emps.map((e) => ({
    x: e.managerRating,
    y: e.selfRating,
    z: 100,
    name: e.name,
    bell: e.bell,
  }));

  const columns: Column<Employee>[] = [
    {
      key: "employee",
      label: "Employee",
      render: (emp) => <EmployeeCell emp={emp} />,
      sortable: true,
      sortValue: (emp) => emp.name,
    },
    {
      key: "self",
      label: "Self",
      align: "center",
      render: (emp) => <span className="text-xs font-semibold text-[#8899AA]">{emp.selfRating.toFixed(1)}</span>,
    },
    {
      key: "manager",
      label: "Manager",
      align: "center",
      render: (emp) => <span className="text-xs font-semibold text-white">{emp.managerRating.toFixed(1)}</span>,
    },
    {
      key: "calibrated",
      label: "Calibrated",
      align: "center",
      render: (emp) => (
        <input
          type="number"
          min={1}
          max={5}
          step={0.1}
          defaultValue={emp.proposedRating.toFixed(1)}
          onChange={(e) => setCalibratedRating(emp.id, +e.target.value)}
          aria-label={`Calibrated rating for ${emp.name}`}
          className={`w-16 h-7 bg-[#060B14] border rounded-lg text-center text-xs text-white focus:outline-none focus:border-[#00E5A0] ${
            emp.calibratedRating !== null && Math.abs(emp.calibratedRating - emp.managerRating) > 0.5
              ? "border-[#FFB800]/50"
              : "border-[#1A2A3A]"
          }`}
        />
      ),
    },
    {
      key: "bell",
      label: "Bell Band",
      align: "center",
      render: (emp) => {
        const bellCfg = BELL_CONFIG[emp.bell];
        return (
          <select
            value={emp.bell}
            onChange={(e) => setBell(emp.id, e.target.value as Employee["bell"])}
            aria-label={`Bell band for ${emp.name}`}
            className="h-7 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-2 text-xs focus:outline-none focus:border-[#00E5A0]"
            style={{ color: bellCfg.color }}
          >
            {(Object.keys(BELL_CONFIG) as Array<keyof typeof BELL_CONFIG>).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        );
      },
    },
  ];

  return (
        <Page
      title="Rating Calibration"
      subtitle="HR-facilitated calibration session · FY 2024–25"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Calibration" },
      ]}
      maxWidth="1300px"
      actions={
        <Button
          variant={done ? "secondary" : "danger"}
          onClick={lockCalibration}
          disabled={saving || done}
          isLoading={saving}
          loadingText="Locking..."
          icon={done ? <CheckCircle2 size={14} aria-hidden="true" />





 : undefined}
        >
          {done ? "Calibration Locked" : "Lock Calibration"}
        </Button>
      }
    >
      {/* Bell curve distribution overview */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {dist.map((d) => (
          <Card key={d.key} padding="md" className="text-center">
            <div className="text-2xl font-bold text-white mb-0.5">{d.count}</div>
            <div className="text-[10px] font-medium mb-1" style={{ color: d.color }}>
              {d.label}
            </div>
            <div className="text-[9px] text-[#445566]">Target: {d.target}</div>
            <div className="h-1 rounded-full mt-2 mx-auto" style={{ width: "60%", background: d.color + "60" }} />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-6">
        {/* Employee table */}
        <Card padding="none">
          <DataTable<Employee>
            data={emps}
            columns={columns}
            rowKey={(e) => e.id}
            aria-label="Calibration employee ratings"
            emptyTitle="No employees"
          />
        </Card>

        {/* Scatter plot */}
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-3 text-white">Self vs Manager Rating</h3>
          <div className="h-[250px]">
            <ClientOnly>
              <ChartWrapper height="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="2 2" stroke="#1A2A3A" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      domain={[1, 5]}
                      name="Manager"
                      label={{ value: "Manager", position: "bottom", fill: "#8899AA", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8899AA", fontSize: 10 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      domain={[1, 5]}
                      name="Self"
                      label={{ value: "Self", angle: -90, position: "left", fill: "#8899AA", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8899AA", fontSize: 10 }}
                    />
                    <ZAxis range={[60, 60]} />
                    <RechartsTooltip
                      contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}
                    />
                    <Scatter data={scatterData}>
                      {scatterData.map((d, i) => (
                        <Cell key={i} fill={BELL_CONFIG[d.bell as keyof typeof BELL_CONFIG].color} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </ClientOnly>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(BELL_CONFIG).map(([k, v]) => (
              <span key={k} className="flex items-center gap-1 text-[10px] text-[#8899AA]">
                <span className="w-2 h-2 rounded-full" style={{ background: v.color }} />
                {k}
              </span>
            ))}
          </div>
        </Card>
      </div>
    

        

        

        </Page>
    );
}
