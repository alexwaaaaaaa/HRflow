"use client";

import { useState } from "react";
import {
    Search, Filter, Download, Upload, UserPlus, ChevronDown,
    MoreHorizontal, Eye, Edit2, IndianRupee, FileText, AlertTriangle,
    Trash2, Check, Grid3x3, List, LayoutList, ChevronRight, X
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

// ─── Types ────────────────────────────────────────────────────────────────────
type EmployeeStatus = "Active" | "Probation" | "Notice Period" | "On Leave" | "Inactive" | "Contract";

type Employee = {
    id: string;
    name: string;
    initials: string;
    dept: string;
    designation: string;
    status: EmployeeStatus;
    doj: string;
    ctc: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<EmployeeStatus, string> = {
    "Active": "bg-[#00E5A0]/10 text-[#00E5A0]",
    "Probation": "bg-[#FFB800]/10 text-[#FFB800]",
    "Notice Period": "bg-[#0066FF]/10 text-[#0066FF]",
    "On Leave": "bg-[#8899AA]/10 text-[#8899AA]",
    "Inactive": "bg-[#FF4444]/10 text-[#FF4444]",
    "Contract": "bg-[#66A3FF]/10 text-[#66A3FF]",
};

const DEPT_COLORS: Record<string, string> = {
    Engineering: "#0066FF", Product: "#8B5CF6", "Human Resources": "#00E5A0",
    Finance: "#FFB800", Sales: "#FF7A00", Operations: "#00C2FF",
    Legal: "#FF4444", Admin: "#8899AA", Marketing: "#E040FB",
};

const EMPLOYEES: Employee[] = [
    { id: "EMP001", name: "Rahul Sharma", initials: "RS", dept: "Engineering", designation: "Senior Software Engineer", status: "Active", doj: "01/06/2021", ctc: "₹18,00,000" },
    { id: "EMP002", name: "Priya Singh", initials: "PS", dept: "Product", designation: "Product Manager", status: "Probation", doj: "01/11/2024", ctc: "₹22,00,000" },
    { id: "EMP003", name: "Karan Mehta", initials: "KM", dept: "Engineering", designation: "Engineering Manager", status: "Notice Period", doj: "15/03/2019", ctc: "₹42,00,000" },
    { id: "EMP004", name: "Anita Kumar", initials: "AK", dept: "Human Resources", designation: "HR Business Partner", status: "Active", doj: "10/07/2020", ctc: "₹14,50,000" },
    { id: "EMP005", name: "Vikram Singh", initials: "VS", dept: "Sales", designation: "Sales Manager", status: "Active", doj: "22/01/2022", ctc: "₹16,00,000" },
    { id: "EMP006", name: "Sneha Rao", initials: "SR", dept: "Marketing", designation: "Marketing Lead", status: "Active", doj: "08/11/2024", ctc: "₹15,00,000" },
    { id: "EMP007", name: "Rohan Desai", initials: "RD", dept: "Finance", designation: "Finance Analyst", status: "Active", doj: "14/04/2022", ctc: "₹13,20,000" },
    { id: "EMP008", name: "Kavya Reddy", initials: "KR", dept: "Engineering", designation: "Software Engineer", status: "Active", doj: "03/07/2023", ctc: "₹12,00,000" },
    { id: "EMP009", name: "Arjun Nair", initials: "AN", dept: "Operations", designation: "Operations Head", status: "Active", doj: "11/09/2020", ctc: "₹24,00,000" },
    { id: "EMP010", name: "Pooja Patel", initials: "PP", dept: "Human Resources", designation: "HR Executive", status: "On Leave", doj: "20/03/2021", ctc: "₹8,50,000" },
    { id: "EMP011", name: "Suresh Kumar", initials: "SK", dept: "Operations", designation: "Operations Analyst", status: "Active", doj: "17/02/2022", ctc: "₹10,80,000" },
    { id: "EMP012", name: "Meera Iyer", initials: "MI", dept: "Engineering", designation: "DevOps Engineer", status: "Active", doj: "05/06/2023", ctc: "₹16,50,000" },
    { id: "EMP013", name: "Rajesh Gupta", initials: "RG", dept: "Finance", designation: "CFO", status: "Active", doj: "01/01/2019", ctc: "₹85,00,000" },
    { id: "EMP014", name: "Divya Sharma", initials: "DS", dept: "Legal", designation: "Legal Counsel", status: "Active", doj: "12/08/2021", ctc: "₹20,00,000" },
    { id: "EMP015", name: "Anil Verma", initials: "AV", dept: "Sales", designation: "Sales Executive", status: "Contract", doj: "01/10/2024", ctc: "₹9,60,000" },
];

const SAVED_VIEWS = [
    { label: "All Employees", count: 1247 },
    { label: "On Probation", count: 9 },
    { label: "High Attrition Risk", count: 3 },
    { label: "Joining This Month", count: 12 },
    { label: "Salary Due Revision", count: 47 },
    { label: "On Notice Period", count: 8 },
];

const FILTER_OPTIONS = [
    { label: "Department", opts: ["All Departments", "Engineering", "Product", "HR", "Finance", "Sales", "Operations"] },
    { label: "Status", opts: ["All Status", "Active", "Probation", "Notice Period", "On Leave", "Inactive", "Contract"] },
    { label: "Employment Type", opts: ["All Types", "Full-Time", "Part-Time", "Contract", "Intern"] },
    { label: "Grade", opts: ["All Grades", "L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"] },
    { label: "Location", opts: ["All Locations", "Mumbai", "Bengaluru", "Hyderabad", "Delhi NCR", "Pune"] },
];

const TABLE_COLS = ["Employee", "Designation", "Department", "Status", "Date of Joining", "CTC", "Actions"];

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: EmployeeStatus }) {
    return (
        <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-semibold ${STATUS_STYLES[status]}`}>
            {status}
        </span>
    );
}

function DeptBadge({ dept }: { dept: string }) {
    return (
        <span className="inline-flex px-2.5 py-0.5 rounded-md text-xs bg-[#1A2A3A] text-[#8899AA]">
            {dept}
        </span>
    );
}

function Avatar({ initials, dept }: { initials: string; dept: string }) {
    const color = DEPT_COLORS[dept] ?? "#0066FF";
    return (
        <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 select-none"
            style={{ background: `${color}20`, border: `1.5px solid ${color}40`, color }}
            aria-hidden="true"
        >
            {initials}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EmployeeList() {
    const [search, setSearch] = useState("");
    const [selectedView, setSelectedView] = useState(0);
    const [showViewDropdown, setShowViewDropdown] = useState(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [openKebab, setOpenKebab] = useState<string | null>(null);

    const filtered = EMPLOYEES.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.id.toLowerCase().includes(search.toLowerCase()) ||
        e.designation.toLowerCase().includes(search.toLowerCase())
    );

    const allSelected = selectedRows.length === filtered.length && filtered.length > 0;

    const toggleRow = (id: string) =>
        setSelectedRows(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const toggleAll = () =>
        setSelectedRows(allSelected ? [] : filtered.map(e => e.id));

    const closeAll = () => { setOpenKebab(null); setShowViewDropdown(false); };

    return (
        <main className="px-8 py-6 pb-24 animate-fade-in min-h-screen" onClick={closeAll}>

            {/* ── Page Header ─────────────────────────────────────────── */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                <div>
                    <nav className="text-sm text-[#8899AA] mb-2">
                        <span>Employees</span>
                    </nav>
                    <h1 className="text-3xl font-bold text-white m-0 leading-tight tracking-tight">Employees</h1>
                    <p className="text-sm text-[#8899AA] mt-1">
                        1,247 total&nbsp;•&nbsp;1,230 active&nbsp;•&nbsp;8 on notice&nbsp;•&nbsp;9 on probation
                    </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <Link href="/employees/import">
                        <Button variant="secondary" icon={<Upload size={15} aria-hidden="true" />}>Bulk Import</Button>
                    </Link>
                    <Button variant="ghost" className="border border-[#1A2A3A] text-[#8899AA] hover:text-white" icon={<Download size={15} aria-hidden="true" />}>
                        Export
                    </Button>
                    <Link href="/employees/add">
                        <Button icon={<UserPlus size={15} aria-hidden="true" />}>Add Employee</Button>
                    </Link>
                </div>
            </header>

            {/* ── Toolbar ─────────────────────────────────────────────── */}
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Search */}
                    <div className="relative">
                        <label htmlFor="emp-search" className="sr-only">Search employees</label>
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566] pointer-events-none" aria-hidden="true" />
                        <input
                            id="emp-search"
                            type="search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search name, EMP ID, email, phone..."
                            className="w-72 h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-lg pl-9 pr-9 text-sm text-white outline-none focus:border-[#00E5A0] focus:ring-1 focus:ring-[#00E5A0]/50 transition-all placeholder-[#445566]"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#445566] hover:text-white transition-colors"
                                aria-label="Clear search"
                            >
                                <X size={14} aria-hidden="true" />
                            </button>
                        )}
                    </div>

                    {/* Filters toggle */}
                    <button
                        onClick={e => { e.stopPropagation(); setShowFilters(v => !v); }}
                        className={`h-10 px-4 rounded-lg text-sm flex items-center gap-2 border transition-all ${showFilters ? "bg-[#00E5A0]/10 border-[#00E5A0] text-[#00E5A0]" : "bg-[#1A2A3A] border-[#1A2A3A] text-white hover:border-[#445566]"}`}
                        aria-pressed={showFilters}
                        aria-expanded={showFilters}
                    >
                        <Filter size={14} aria-hidden="true" /> Filters
                    </button>

                    {/* Saved Views dropdown */}
                    <div className="relative" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setShowViewDropdown(v => !v)}
                            className="h-10 px-4 bg-[#1A2A3A] border border-[#1A2A3A] hover:border-[#445566] rounded-lg text-sm text-white flex items-center gap-2 transition-all"
                            aria-haspopup="listbox"
                            aria-expanded={showViewDropdown}
                        >
                            {SAVED_VIEWS[selectedView].label} <ChevronDown size={13} aria-hidden="true" />
                        </button>
                        {showViewDropdown && (
                            <div
                                role="listbox"
                                aria-label="Saved views"
                                className="absolute top-12 left-0 z-50 bg-[#0D1928] border border-[#1A2A3A] rounded-xl py-1.5 min-w-[220px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                            >
                                {SAVED_VIEWS.map((v, i) => (
                                    <button
                                        key={i}
                                        role="option"
                                        aria-selected={selectedView === i}
                                        onClick={() => { setSelectedView(i); setShowViewDropdown(false); }}
                                        className={`w-full px-4 py-2.5 text-left text-sm flex justify-between items-center transition-colors hover:bg-[#1A2A3A] ${selectedView === i ? "text-[#00E5A0] bg-[#00E5A0]/05" : "text-white"}`}
                                    >
                                        <span>{v.label}</span>
                                        <span className="text-xs text-[#445566]">({v.count.toLocaleString()})</span>
                                    </button>
                                ))}
                                <div className="border-t border-[#1A2A3A] my-1" />
                                <button className="w-full px-4 py-2.5 text-left text-sm text-[#0066FF] hover:bg-[#1A2A3A] transition-colors">
                                    + Save Current View...
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* View mode switcher */}
                <div className="flex items-center gap-1" role="group" aria-label="View mode">
                    {[
                        { icon: List, label: "List view", active: true },
                        { icon: Grid3x3, label: "Grid view", active: false },
                        { icon: LayoutList, label: "Kanban view", active: false },
                    ].map(({ icon: Icon, label, active }) => (
                        <button
                            key={label}
                            className={`p-2 rounded-lg border transition-all ${active ? "bg-[#1A2A3A] border-[#1A2A3A] text-[#00E5A0]" : "border-transparent text-[#445566] hover:text-white"}`}
                            aria-label={label}
                            aria-pressed={active}
                        >
                            <Icon size={16} aria-hidden="true" />
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Filter Panel ────────────────────────────────────────── */}
            {showFilters && (
                <div className="flex flex-wrap gap-4 items-end p-4 bg-[#0D1928] border border-[#1A2A3A] rounded-xl mb-4">
                    {FILTER_OPTIONS.map(({ label, opts }) => (
                        <div key={label} className="flex flex-col gap-1.5">
                            <label htmlFor={`filter-${label}`} className="text-[10px] font-semibold text-[#445566] uppercase tracking-wide">{label}</label>
                            <select
                                id={`filter-${label}`}
                                className="h-9 px-3 bg-[#0A1420] border border-[#1A2A3A] rounded-lg text-sm text-white outline-none focus:border-[#00E5A0] transition-all cursor-pointer appearance-none pr-8"
                            >
                                {opts.map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                    ))}
                    <button className="h-9 px-4 bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded-lg text-sm text-[#00E5A0] hover:bg-[#00E5A0]/20 transition-colors">
                        Apply Filters
                    </button>
                    <button className="h-9 px-3 text-sm text-[#8899AA] hover:text-white transition-colors">Reset</button>
                </div>
            )}

            {/* ── Table ───────────────────────────────────────────────── */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-sm" aria-label="Employee list">
                {/* Table header */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                <th scope="col" className="w-11 px-4 py-3">
                                    <button
                                        onClick={toggleAll}
                                        className="w-4.5 h-4.5 rounded flex items-center justify-center transition-all"
                                        style={{
                                            width: 18, height: 18, borderRadius: 4,
                                            border: `1.5px solid ${allSelected ? "#00E5A0" : "#445566"}`,
                                            background: allSelected ? "#00E5A0" : "transparent",
                                        }}
                                        aria-label={allSelected ? "Deselect all employees" : "Select all employees"}
                                        aria-checked={allSelected}
                                        role="checkbox"
                                    >
                                        {allSelected && <Check size={11} color="#060B14" aria-hidden="true" />}
                                    </button>
                                </th>
                                {TABLE_COLS.map(col => (
                                    <th
                                        key={col}
                                        scope="col"
                                        className="px-4 py-3 text-left text-[11px] font-semibold text-[#8899AA] uppercase tracking-wider hover:text-white cursor-pointer select-none transition-colors"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {filtered.map(emp => {
                                const isSelected = selectedRows.includes(emp.id);
                                return (
                                    <tr
                                        key={emp.id}
                                        className={`transition-all hover:bg-[#1A2A3A]/40 cursor-pointer ${isSelected ? "bg-[#00E5A0]/[0.04]" : ""}`}
                                        style={{ borderLeft: `3px solid ${isSelected ? "#00E5A0" : "transparent"}` }}
                                    >
                                        {/* Checkbox */}
                                        <td className="px-4 py-4 w-11">
                                            <button
                                                onClick={e => { e.stopPropagation(); toggleRow(emp.id); }}
                                                className="flex items-center justify-center transition-all"
                                                style={{
                                                    width: 18, height: 18, borderRadius: 4,
                                                    border: `1.5px solid ${isSelected ? "#00E5A0" : "#445566"}`,
                                                    background: isSelected ? "#00E5A0" : "transparent",
                                                }}
                                                aria-label={`Select ${emp.name}`}
                                                aria-checked={isSelected}
                                                role="checkbox"
                                            >
                                                {isSelected && <Check size={11} color="#060B14" aria-hidden="true" />}
                                            </button>
                                        </td>

                                        {/* Employee */}
                                        <td className="px-4 py-4">
                                            <Link href={`/employees/${emp.id}`} className="flex items-center gap-3 no-underline group/emp">
                                                <Avatar initials={emp.initials} dept={emp.dept} />
                                                <div>
                                                    <div className="text-sm font-semibold text-white group-hover/emp:text-[#00E5A0] transition-colors leading-tight">{emp.name}</div>
                                                    <div className="text-xs text-[#445566] mt-0.5">{emp.id}</div>
                                                </div>
                                            </Link>
                                        </td>

                                        {/* Designation */}
                                        <td className="px-4 py-4 text-sm text-white">{emp.designation}</td>

                                        {/* Dept */}
                                        <td className="px-4 py-4"><DeptBadge dept={emp.dept} /></td>

                                        {/* Status */}
                                        <td className="px-4 py-4"><StatusBadge status={emp.status} /></td>

                                        {/* DOJ */}
                                        <td className="px-4 py-4 text-sm text-[#8899AA]">{emp.doj}</td>

                                        {/* CTC */}
                                        <td className="px-4 py-4 text-sm text-white font-medium">{emp.ctc}</td>

                                        {/* Actions (kebab) */}
                                        <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenKebab(openKebab === emp.id ? null : emp.id)}
                                                    className="w-8 h-8 rounded-lg border border-transparent hover:bg-[#1A2A3A] hover:border-[#445566] flex items-center justify-center transition-all"
                                                    aria-label={`Actions for ${emp.name}`}
                                                    aria-haspopup="menu"
                                                    aria-expanded={openKebab === emp.id}
                                                >
                                                    <MoreHorizontal size={16} className="text-[#8899AA]" aria-hidden="true" />
                                                </button>

                                                {openKebab === emp.id && (
                                                    <div
                                                        role="menu"
                                                        className="absolute right-0 top-10 z-50 bg-[#0D1928] border border-[#1A2A3A] rounded-xl py-1 min-w-[210px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                                                    >
                                                        {[
                                                            { icon: Eye, label: "View Profile", href: `/employees/${emp.id}` },
                                                            { icon: Edit2, label: "Edit Employee", href: `/employees/${emp.id}/edit` },
                                                            { icon: IndianRupee, label: "Salary Revision", href: `/employees/${emp.id}/salary-revision` },
                                                            { icon: FileText, label: "Generate Payslip", href: `/payroll/payslips/bulk?emp=${emp.id}` },
                                                            { icon: AlertTriangle, label: "Issue Warning Letter", href: `/employees/${emp.id}/warning-letter` },
                                                        ].map(({ icon: Icon, label, href }) => (
                                                            <Link
                                                                key={label}
                                                                href={href}
                                                                role="menuitem"
                                                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white hover:bg-[#1A2A3A] transition-colors no-underline"
                                                            >
                                                                <Icon size={14} className="text-[#8899AA]" aria-hidden="true" /> {label}
                                                            </Link>
                                                        ))}
                                                        <div className="border-t border-[#1A2A3A] my-1" />
                                                        <Link
                                                            href={`/employees/${emp.id}/terminate`}
                                                            role="menuitem"
                                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#FF4444] hover:bg-[#FF4444]/10 transition-colors w-full no-underline"
                                                        >
                                                            <Trash2 size={14} aria-hidden="true" /> Terminate Employee
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ── Pagination ──────────────────────────────────────────── */}
            <nav className="flex items-center justify-between mt-4 flex-wrap gap-4" aria-label="Pagination">
                <span className="text-sm text-[#8899AA]">
                    Showing 1–{filtered.length} of 1,247 employees
                </span>
                <div className="flex items-center gap-1.5">
                    {[1, 2, 3, "…", 25].map((p, i) => (
                        <button
                            key={i}
                            className={`w-9 h-9 rounded-lg text-sm border transition-all ${p === 1 ? "bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30" : "border-transparent text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white"}`}
                            aria-label={typeof p === "number" ? `Page ${p}` : "More pages"}
                            aria-current={p === 1 ? "page" : undefined}
                        >
                            {p}
                        </button>
                    ))}
                    <button className="w-9 h-9 rounded-lg bg-[#1A2A3A] border border-[#1A2A3A] hover:border-[#445566] flex items-center justify-center transition-all" aria-label="Next page">
                        <ChevronRight size={16} className="text-[#8899AA]" aria-hidden="true" />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#8899AA]">Per page:</span>
                    {[25, 50, 100].map(n => (
                        <button
                            key={n}
                            className={`h-8 px-2.5 rounded-md text-sm border transition-all ${n === 25 ? "bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30" : "border-transparent text-[#8899AA] hover:text-white"}`}
                        >
                            {n}
                        </button>
                    ))}
                </div>
            </nav>

            {/* ── Bulk Action Bar ─────────────────────────────────────── */}
            <div
                role="toolbar"
                aria-label="Bulk actions"
                className={`fixed bottom-0 left-60 right-0 bg-[#0A1420] border-t border-[#1A2A3A] px-8 py-4 flex items-center justify-between transition-transform duration-300 z-50 ${selectedRows.length > 0 ? "translate-y-0" : "translate-y-full"}`}
            >
                <div className="flex items-center gap-4">
                    <div className="px-3 py-1.5 bg-[#00E5A0]/10 text-[#00E5A0] rounded-lg text-sm font-semibold">
                        {selectedRows.length} employee{selectedRows.length !== 1 ? "s" : ""} selected
                    </div>
                    <span className="text-sm text-[#8899AA]">Choose a bulk action</span>
                </div>
                <div className="flex gap-2.5">
                    {["Bulk Payslip", "Bulk Export", "Assign Shift", "Send Message"].map(action => (
                        <button key={action} className="h-9 px-4 bg-[#1A2A3A] border border-[#1A2A3A] hover:border-[#445566] rounded-lg text-sm text-white transition-all">
                            {action}
                        </button>
                    ))}
                    <button className="h-9 px-4 bg-[#FF4444]/10 border border-[#FF4444]/30 hover:bg-[#FF4444]/20 rounded-lg text-sm text-[#FF4444] transition-all">
                        Bulk Terminate
                    </button>
                    <button onClick={() => setSelectedRows([])} className="h-9 px-3 text-sm text-[#8899AA] hover:text-white transition-colors">
                        Deselect All
                    </button>
                </div>
            </div>
        </main>
    );
}
