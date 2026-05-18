"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Upload,
  UserPlus,
  Eye,
  Edit2,
  IndianRupee,
  FileText,
  AlertTriangle,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

type EmployeeStatus =
  | "Active"
  | "Probation"
  | "Notice Period"
  | "On Leave"
  | "Inactive"
  | "Contract";

interface Employee {
  id: string;
  name: string;
  initials: string;
  dept: string;
  designation: string;
  status: EmployeeStatus;
  doj: string;
  ctc: string;
}

const STATUS_VARIANT: Record<
  EmployeeStatus,
  "success" | "warning" | "info" | "neutral" | "danger" | "purple"
> = {
  Active: "success",
  Probation: "warning",
  "Notice Period": "info",
  "On Leave": "neutral",
  Inactive: "danger",
  Contract: "purple",
};

const DEPT_COLORS: Record<string, string> = {
  Engineering: "#60a5fa",
  Product: "#a78bfa",
  "Human Resources": "#00E5A0",
  Finance: "#FFB800",
  Sales: "#fb923c",
  Operations: "#38bdf8",
  Legal: "#f87171",
  Admin: "#8899AA",
  Marketing: "#e879f9",
};

const EMPLOYEES: Employee[] = [
  {
    id: "EMP001",
    name: "Rahul Sharma",
    initials: "RS",
    dept: "Engineering",
    designation: "Senior Software Engineer",
    status: "Active",
    doj: "01/06/2021",
    ctc: "₹18,00,000",
  },
  {
    id: "EMP002",
    name: "Priya Singh",
    initials: "PS",
    dept: "Product",
    designation: "Product Manager",
    status: "Probation",
    doj: "01/11/2024",
    ctc: "₹22,00,000",
  },
  {
    id: "EMP003",
    name: "Karan Mehta",
    initials: "KM",
    dept: "Engineering",
    designation: "Engineering Manager",
    status: "Notice Period",
    doj: "15/03/2019",
    ctc: "₹42,00,000",
  },
  {
    id: "EMP004",
    name: "Anita Kumar",
    initials: "AK",
    dept: "Human Resources",
    designation: "HR Business Partner",
    status: "Active",
    doj: "10/07/2020",
    ctc: "₹14,50,000",
  },
  {
    id: "EMP005",
    name: "Vikram Singh",
    initials: "VS",
    dept: "Sales",
    designation: "Sales Manager",
    status: "Active",
    doj: "22/01/2022",
    ctc: "₹16,00,000",
  },
  {
    id: "EMP006",
    name: "Sneha Rao",
    initials: "SR",
    dept: "Marketing",
    designation: "Marketing Lead",
    status: "Active",
    doj: "08/11/2024",
    ctc: "₹15,00,000",
  },
  {
    id: "EMP007",
    name: "Rohan Desai",
    initials: "RD",
    dept: "Finance",
    designation: "Finance Analyst",
    status: "Active",
    doj: "14/04/2022",
    ctc: "₹13,20,000",
  },
  {
    id: "EMP008",
    name: "Kavya Reddy",
    initials: "KR",
    dept: "Engineering",
    designation: "Software Engineer",
    status: "Active",
    doj: "03/07/2023",
    ctc: "₹12,00,000",
  },
  {
    id: "EMP009",
    name: "Arjun Nair",
    initials: "AN",
    dept: "Operations",
    designation: "Operations Head",
    status: "Active",
    doj: "11/09/2020",
    ctc: "₹24,00,000",
  },
  {
    id: "EMP010",
    name: "Pooja Patel",
    initials: "PP",
    dept: "Human Resources",
    designation: "HR Executive",
    status: "On Leave",
    doj: "20/03/2021",
    ctc: "₹8,50,000",
  },
  {
    id: "EMP011",
    name: "Suresh Kumar",
    initials: "SK",
    dept: "Operations",
    designation: "Operations Analyst",
    status: "Active",
    doj: "17/02/2022",
    ctc: "₹10,80,000",
  },
  {
    id: "EMP012",
    name: "Meera Iyer",
    initials: "MI",
    dept: "Engineering",
    designation: "DevOps Engineer",
    status: "Active",
    doj: "05/06/2023",
    ctc: "₹16,50,000",
  },
];

function Avatar({ initials, dept }: { initials: string; dept: string }) {
  const color = DEPT_COLORS[dept] ?? "#0066FF";
  return (
    <div
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold select-none"
      style={{
        background: `${color}20`,
        border: `1.5px solid ${color}40`,
        color,
      }}
    >
      {initials}
    </div>
  );
}

const COLUMNS: Column<Employee>[] = [
  {
    key: "employee",
    label: "Employee",
    render: (emp) => (
      <Link href={`/employees/${emp.id}`} className="group/emp flex items-center gap-3">
        <Avatar initials={emp.initials} dept={emp.dept} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white transition-colors group-hover/emp:text-[#00E5A0]">
            {emp.name}
          </p>
          <p className="text-xs text-[#7a8fa6]">{emp.id}</p>
        </div>
      </Link>
    ),
    sortable: true,
    sortValue: (e) => e.name,
  },
  {
    key: "designation",
    label: "Designation",
    render: (e) => <span className="text-sm text-white">{e.designation}</span>,
    sortable: true,
    sortValue: (e) => e.designation,
  },
  {
    key: "dept",
    label: "Department",
    render: (e) => (
      <span className="inline-flex rounded-md bg-[#1A2A3A] px-2.5 py-0.5 text-xs text-[#8899AA]">
        {e.dept}
      </span>
    ),
    sortable: true,
    sortValue: (e) => e.dept,
  },
  {
    key: "status",
    label: "Status",
    render: (e) => <Badge variant={STATUS_VARIANT[e.status]}>{e.status}</Badge>,
  },
  {
    key: "doj",
    label: "Joined",
    render: (e) => <span className="text-sm text-[#8899AA]">{e.doj}</span>,
    sortable: true,
    sortValue: (e) => e.doj,
    hideOnMobile: true,
  },
  {
    key: "ctc",
    label: "CTC",
    render: (e) => <span className="text-sm font-medium text-white">{e.ctc}</span>,
    sortable: true,
    sortValue: (e) => parseFloat(e.ctc.replace(/[^0-9]/g, "")),
    hideOnMobile: true,
    align: "right",
  },
  {
    key: "actions",
    label: "",
    render: (e) => <RowActions emp={e} />,
    align: "right",
  },
];

function RowActions({ emp }: { emp: Employee }) {
  const [open, setOpen] = useState(false);
  const items = [
    { icon: Eye, label: "View Profile", href: `/employees/${emp.id}` },
    { icon: Edit2, label: "Edit", href: `/employees/${emp.id}/edit` },
    { icon: IndianRupee, label: "Salary Revision", href: `/employees/${emp.id}/salary-revision` },
    { icon: FileText, label: "Generate Payslip", href: `/payroll/payslips/bulk?emp=${emp.id}` },
    { icon: AlertTriangle, label: "Issue Warning", href: `/employees/${emp.id}/warning-letter` },
  ];
  return (
    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      {/* raw-button: icon-only dropdown trigger — DataTable action menu requires native button */}
      <button
        type="button"
        aria-label={`Actions for ${emp.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent transition-colors hover:border-[#445566] hover:bg-[#1A2A3A]"
      >
        <MoreHorizontal size={16} className="text-[#8899AA]" aria-hidden="true" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute top-10 right-0 z-50 min-w-[210px] rounded-xl border border-[#1A2A3A] bg-[#0D1928] py-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          {items.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              role="menuitem"
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#1A2A3A]"
            >
              <Icon size={14} className="text-[#8899AA]" aria-hidden="true" /> {label}
            </Link>
          ))}
          <div className="my-1 border-t border-[#1A2A3A]" aria-hidden="true" />
          <Link
            role="menuitem"
            href={`/employees/${emp.id}/terminate`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#FF4444] transition-colors hover:bg-[#FF4444]/10"
          >
            <Trash2 size={14} aria-hidden="true" /> Terminate
          </Link>
        </div>
      )}
    </div>
  );
}

export default function EmployeesPage() {
  return (
        <Page
      title="Employees"
      subtitle={`${EMPLOYEES.length} loaded · 1,247 total`}
      breadcrumbs={[{ label: "Employees" }]}
      maxWidth="1400px"
      actions={
        <>






          <Link href="/employees/import">
            <Button variant="secondary" icon={<Upload size={14} />}>
              Bulk import
            </Button>
          </Link>
          <Button variant="ghost" icon={<Download size={14} />}>
            Export
          </Button>
          <Button icon={<UserPlus size={14} />} href="/employees/add">Add employee</Button>
        </>
      }
    >
      <DataTable<Employee>
        data={EMPLOYEES}
        columns={COLUMNS}
        rowKey={(e) => e.id}
        searchable
        searchPlaceholder="Search by name, EMP ID, designation…"
        emptyTitle="No employees match"
        emptyDescription="Try a different search or filter."
        aria-label="Employees"
      />
    

        

        

        </Page>
    );
}
