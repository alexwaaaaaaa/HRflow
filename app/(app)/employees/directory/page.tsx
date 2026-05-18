"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Phone, Mail, MessageCircle, Grid2X2, List } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Department {
  name: string;
  count: number;
}

interface DirEmployee {
  id: string;
  name: string;
  desig: string;
  dept: string;
  loc: string;
  online: boolean;
  color: string;
}

const DEPARTMENTS: Department[] = [
  { name: "All", count: 847 },
  { name: "Engineering", count: 320 },
  { name: "Sales", count: 180 },
  { name: "Operations", count: 172 },
  { name: "Marketing", count: 95 },
  { name: "HR", count: 42 },
  { name: "Finance", count: 38 },
];

const EMPLOYEES: DirEmployee[] = [
  {
    id: "EMP-0001",
    name: "Priya Mehta",
    desig: "HR Manager",
    dept: "HR",
    loc: "Mumbai",
    online: true,
    color: "#7C3AED",
  },
  {
    id: "EMP-0002",
    name: "Rohan Desai",
    desig: "Finance Manager",
    dept: "Finance",
    loc: "Mumbai",
    online: false,
    color: "#0066FF",
  },
  {
    id: "EMP-0003",
    name: "Rahul Sharma",
    desig: "Sr. Software Engineer",
    dept: "Engineering",
    loc: "Pune",
    online: true,
    color: "#00E5A0",
  },
  {
    id: "EMP-0004",
    name: "Ananya Patel",
    desig: "Product Manager",
    dept: "Product",
    loc: "Bengaluru",
    online: true,
    color: "#F59E0B",
  },
  {
    id: "EMP-0005",
    name: "Vikram Singh",
    desig: "Sales Manager",
    dept: "Sales",
    loc: "Delhi",
    online: false,
    color: "#EF4444",
  },
  {
    id: "EMP-0006",
    name: "Kavya Reddy",
    desig: "Tech Lead",
    dept: "Engineering",
    loc: "Bengaluru",
    online: true,
    color: "#06B6D4",
  },
  {
    id: "EMP-0007",
    name: "Suresh Nair",
    desig: "Ops Executive",
    dept: "Operations",
    loc: "Chennai",
    online: false,
    color: "#8B5CF6",
  },
  {
    id: "EMP-0008",
    name: "Pooja Iyer",
    desig: "Marketing Lead",
    dept: "Marketing",
    loc: "Mumbai",
    online: true,
    color: "#EC4899",
  },
  {
    id: "EMP-0009",
    name: "Amit Kumar",
    desig: "Sales Executive",
    dept: "Sales",
    loc: "Delhi",
    online: false,
    color: "#10B981",
  },
  {
    id: "EMP-0010",
    name: "Sneha Rao",
    desig: "Software Engineer",
    dept: "Engineering",
    loc: "Hyderabad",
    online: true,
    color: "#F97316",
  },
  {
    id: "EMP-0011",
    name: "Karan Mehta",
    desig: "Staff SWE",
    dept: "Engineering",
    loc: "Bengaluru",
    online: true,
    color: "#6366F1",
  },
  {
    id: "EMP-0012",
    name: "Divya Nair",
    desig: "UX Designer",
    dept: "Product",
    loc: "Pune",
    online: false,
    color: "#14B8A6",
  },
];

export default function EmployeeDirectoryPage() {
  const [activeDept, setActiveDept] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () =>
      EMPLOYEES.filter(
        (e) =>
          (activeDept === "All" || e.dept === activeDept) &&
          (e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.desig.toLowerCase().includes(search.toLowerCase()))
      ),
    [activeDept, search]
  );

  return (
    <Page
      title="Employee directory"
      subtitle={`${EMPLOYEES.length} loaded · find and connect with your team`}
      breadcrumbs={[{ label: "Employees", href: "/employees" }, { label: "Directory" }]}
      maxWidth="1300px"
      actions={
        <div className="flex gap-1" role="group" aria-label="View mode">
          <Button
            variant={view === "grid" ? "ghost" : "secondary"}
            size="sm"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            icon={<Grid2X2 size={14} />}
          >
            Grid
          </Button>
          <Button
            variant={view === "list" ? "ghost" : "secondary"}
            size="sm"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            icon={<List size={14} />}
          >
            List
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        {/* Department sidebar */}
        <Card padding="none" className="lg:sticky lg:top-24 lg:self-start">
          <p className="px-4 pt-4 pb-3 text-[10px] font-semibold tracking-wider text-[#445566] uppercase">
            Department
          </p>
          <ul className="pb-3" role="listbox" aria-label="Filter by department">
            {DEPARTMENTS.map((d) => {
              const active = activeDept === d.name;
              return (
                <li key={d.name}>
                  
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => setActiveDept(d.name)}
                    className={`flex w-full items-center justify-between border-l-2 px-4 py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "border-[#00e5a0] bg-[rgba(0,229,160,0.05)] text-[#00e5a0]"
                        : "border-transparent text-[#8899AA] hover:bg-[rgba(255,255,255,0.02)] hover:text-white"
                    }`}
                  >
                    <span>{d.name}</span>
                    <span className="text-xs text-[#445566]">{d.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        <div>
          {/* Search */}
          <div className="relative mb-5">
            <Search
              size={14}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#8899AA]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or designation…"
              aria-label="Search directory"
              className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#0D1928] pr-3 pl-9 text-sm text-white transition-colors outline-none focus:border-[#00e5a0]"
            />
          </div>

          {filtered.length === 0 ? (
            <Card padding="lg" className="text-center text-sm text-[#7a8fa6]">
              No employees match this search.
            </Card>
          ) : view === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((emp) => (
                <Card
                  key={emp.id}
                  className="relative overflow-hidden transition-colors hover:border-[#445566]"
                >
                  <span
                    aria-label={emp.online ? "Online" : "Offline"}
                    className="absolute top-4 right-4 h-2 w-2 rounded-full"
                    style={{ background: emp.online ? "#00e5a0" : "#445566" }}
                  />
                  <div
                    className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold"
                    aria-hidden="true"
                    style={{ background: `${emp.color}20`, color: emp.color }}
                  >
                    {emp.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">{emp.name}</p>
                    <p className="mt-0.5 text-xs text-[#8899AA]">{emp.desig}</p>
                    <p className="mt-2 inline-flex items-center gap-1 text-xs text-[#445566]">
                      <MapPin size={11} aria-hidden="true" /> {emp.loc}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-3 border-t border-[#1A2A3A] pt-3">
                    <Link
                      href={`/employees/${emp.id}`}
                      className="text-xs font-semibold text-[#00e5a0] hover:underline"
                    >
                      Profile
                    </Link>
                    
                    <button
                      type="button"
                      aria-label={`Call ${emp.name}`}
                      className="text-[#8899AA] transition-colors hover:text-white"
                    >
                      <Phone size={14} aria-hidden="true" />
                    </button>
                    
                    <button
                      type="button"
                      aria-label={`Email ${emp.name}`}
                      className="text-[#8899AA] transition-colors hover:text-white"
                    >
                      <Mail size={14} aria-hidden="true" />
                    </button>
                    
                    <button
                      type="button"
                      aria-label={`Message ${emp.name} on WhatsApp`}
                      className="text-[#8899AA] transition-colors hover:text-white"
                    >
                      <MessageCircle size={14} aria-hidden="true" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card padding="none">
              <ul className="divide-y divide-[#1A2A3A]">
                {filtered.map((emp) => (
                  <li key={emp.id}>
                    <Link
                      href={`/employees/${emp.id}`}
                      className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#1A2A3A]"
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                        aria-hidden="true"
                        style={{ background: `${emp.color}20`, color: emp.color }}
                      >
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white">{emp.name}</p>
                        <p className="text-xs text-[#8899AA]">
                          {emp.desig} · {emp.dept}
                        </p>
                      </div>
                      <span className="hidden items-center gap-1 text-xs text-[#445566] sm:inline-flex">
                        <MapPin size={11} aria-hidden="true" />
                        {emp.loc}
                      </span>
                      <span
                        aria-label={emp.online ? "Online" : "Offline"}
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{
                          background: emp.online ? "#00e5a0" : "#445566",
                        }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </Page>
  );
}
