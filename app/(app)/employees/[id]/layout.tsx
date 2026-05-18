"use client";

import { use } from "react";
import { Edit2, ChevronDown, MoreHorizontal, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const TABS = [
  { name: "Overview", path: "" },
  { name: "Job & Salary", path: "/job-and-salary" },
  { name: "Documents", path: "/documents" },
  { name: "Attendance", path: "/attendance" },
  { name: "Leave", path: "/leave" },
  { name: "Payroll", path: "/payroll" },
  { name: "Performance", path: "/performance" },
  { name: "Timeline", path: "/timeline" },
] as const;

const PROFILE = {
  name: "Rahul Kumar Sharma",
  initials: "RK",
  id: "EMP001",
  designation: "Senior Software Engineer",
  dept: "Engineering",
  status: "Active",
  doj: "01/06/2021",
  manager: "Karan Mehta",
  location: "Bengaluru",
  grade: "L3",
};

interface MetaPillProps {
  label: string;
  value: string;
}

function MetaPill({ label, value }: MetaPillProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#7a8fa6]">
      <span className="text-[#445566]">{label}:</span>
      <span className="text-white">{value}</span>
    </span>
  );
}

interface TabLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

function TabLink({ href, label, isActive }: TabLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? "border-[#00E5A0] text-white"
          : "border-transparent text-[#7a8fa6] hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function EmployeeProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const pathname = usePathname();
  const basePath = `/employees/${resolvedParams.id}`;

  return (
    <Page
      title={PROFILE.name}
      subtitle={`${PROFILE.designation} · ${PROFILE.dept}`}
      breadcrumbs={[{ label: "Employees", href: "/employees" }, { label: PROFILE.name }]}
      maxWidth="1400px"
      actions={
        <>
          <Link href={`${basePath}/edit`}>
            <Button variant="secondary" size="sm" icon={<Edit2 size={14} aria-hidden="true" />}>
              Edit
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="sm"
            icon={<FileText size={14} aria-hidden="true" />}
            iconRight={<ChevronDown size={13} aria-hidden="true" />}
          >
            Generate documents
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="More actions"
            icon={<MoreHorizontal size={16} aria-hidden="true" />}
          />
        </>
      }
    >
      <div className="animate-fade-in space-y-6">
        {/* Profile Summary Card */}
        <Card padding="md">
          <div className="flex flex-wrap items-center gap-5">
            <div
              aria-hidden="true"
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[3px] border-[#00E5A0] bg-[rgba(0,102,255,0.15)] text-[26px] font-bold text-[#0066FF] select-none"
            >
              {PROFILE.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-base font-semibold text-white">{PROFILE.id}</span>
                <Badge variant="success">{PROFILE.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <MetaPill label="Joined" value={PROFILE.doj} />
                <MetaPill label="Manager" value={PROFILE.manager} />
                <MetaPill label="Location" value={PROFILE.location} />
                <MetaPill label="Grade" value={PROFILE.grade} />
              </div>
            </div>
          </div>
        </Card>

        {/* Tab nav */}
        <nav aria-label="Profile sections" className="overflow-x-auto border-b border-[#1A2A3A]">
          <div className="flex min-w-max gap-1">
            {TABS.map((tab) => {
              const targetPath = `${basePath}${tab.path}`;
              const isActive =
                pathname === targetPath || (tab.path === "" && pathname === basePath);
              return (
                <TabLink key={tab.name} href={targetPath} label={tab.name} isActive={isActive} />
              );
            })}
          </div>
        </nav>

        {/* Tab content */}
        <div className="animate-fade-in">{children}</div>
      </div>
    </Page>
  );
}
