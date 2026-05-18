"use client";

import { useState } from "react";
import { Pencil, Trash2, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Designation { id: number; name: string; code: string; dept: string; grade: string; type: string }
interface Grade { id: number; name: string; ctc: string; exp: string }

const DESIGNATIONS: Designation[] = [
    { id: 1, name: "Junior Software Engineer", code: "JSE", dept: "Engineering", grade: "L1", type: "Full-time" },
    { id: 2, name: "Software Engineer", code: "SE", dept: "Engineering", grade: "L2", type: "Full-time" },
    { id: 3, name: "Senior Software Engineer", code: "SSE", dept: "Engineering", grade: "L3", type: "Full-time" },
    { id: 4, name: "Tech Lead", code: "TL", dept: "Engineering", grade: "L4", type: "Full-time" },
    { id: 5, name: "Engineering Manager", code: "EM", dept: "Engineering", grade: "L5", type: "Full-time" },
    { id: 6, name: "Product Manager", code: "PM", dept: "Product", grade: "L4", type: "Full-time" },
    { id: 7, name: "HR Executive", code: "HRE", dept: "HR", grade: "L2", type: "Full-time" },
    { id: 8, name: "HR Manager", code: "HRM", dept: "HR", grade: "L4", type: "Full-time" },
    { id: 9, name: "Sales Executive", code: "SE2", dept: "Sales", grade: "L2", type: "Full-time" },
    { id: 10, name: "Sales Manager", code: "SM", dept: "Sales", grade: "L4", type: "Full-time" },
];

const GRADES: Grade[] = [
    { id: 1, name: "L1", ctc: "₹2L to ₹4L", exp: "0-1 years" },
    { id: 2, name: "L2", ctc: "₹4L to ₹8L", exp: "1-3 years" },
    { id: 3, name: "L3", ctc: "₹8L to ₹15L", exp: "3-6 years" },
    { id: 4, name: "L4", ctc: "₹15L to ₹25L", exp: "6-10 years" },
    { id: 5, name: "L5", ctc: "₹25L to ₹40L", exp: "10-15 years" },
    { id: 6, name: "L6", ctc: "₹40L to ₹70L", exp: "15+ years" },
    { id: 7, name: "L7", ctc: "₹70L to ₹1Cr", exp: "20+ years" },
    { id: 8, name: "L8", ctc: "₹1Cr+", exp: "CXO level" },
];

const DESIGNATION_COLUMNS: Column<Designation>[] = [
    { key: "name", label: "Designation", render: (r) => <span className="text-sm text-white">{r.name}</span> },
    { key: "code", label: "Code", render: (r) => <span className="text-sm text-[#8899AA]">{r.code}</span> },
    { key: "dept", label: "Department", render: (r) => <span className="text-sm text-white">{r.dept}</span> },
    { key: "grade", label: "Grade", render: (r) => <span className="text-sm text-[#00E5A0] font-medium">{r.grade}</span> },
    { key: "type", label: "Type", render: (r) => <span className="text-sm text-[#8899AA]">{r.type}</span> },
    {
        key: "id", label: "",
        render: (r) => (
            <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0" aria-label={`Edit ${r.name}`}><Pencil size={14} aria-hidden="true" /></Button>
                <Button variant="danger" size="sm" className="w-8 h-8 p-0" aria-label={`Delete ${r.name}`}><Trash2 size={14} aria-hidden="true" /></Button>
            </div>
        ),
    },
];

const GRADE_COLUMNS: Column<Grade>[] = [
    { key: "name", label: "Grade", render: (r) => <span className="text-sm font-medium text-[#00E5A0]">{r.name}</span> },
    { key: "ctc", label: "CTC Band", render: (r) => <span className="text-sm text-white">{r.ctc}</span> },
    { key: "exp", label: "Experience", render: (r) => <span className="text-sm text-[#8899AA]">{r.exp}</span> },
    {
        key: "id", label: "Vis",
        render: (_r, idx) => (
            <div className="w-full h-1.5 bg-[#1A2A3A] rounded flex overflow-hidden">
                <div className="bg-[#00E5A0]" style={{ width: `${((idx ?? 0) + 1) * 12}%`, marginLeft: `${(idx ?? 0) * 5}%` }} />
            </div>
        ),
    },
    {
        key: "name", label: "",
        render: (r) => (
            <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0" aria-label={`Edit ${r.name}`}><Pencil size={14} aria-hidden="true" /></Button>
                <Button variant="danger" size="sm" className="w-8 h-8 p-0" aria-label={`Delete ${r.name}`}><Trash2 size={14} aria-hidden="true" /></Button>
            </div>
        ),
    },
];

export default function DesignationsPage() {
    const [tab, setTab] = useState<"designations" | "grades">("designations");

    return (
        <div className="px-16 py-12 animate-fade-in">
            <h2 className="text-2xl font-semibold text-white m-0">Designations &amp; Grades</h2>
            <p className="text-sm text-[#8899AA] mt-1">Define job titles and salary grades for your organization.</p>

            {/* Tabs */}
            <div className="flex border-b border-[#1A2A3A] mt-6 mb-8" role="tablist">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTab("designations")}
                    className="pb-3 px-4 rounded-none border-0 border-b-2 transition-colors"
                    style={{ borderBottomColor: tab === "designations" ? "#00E5A0" : "transparent", color: tab === "designations" ? "#00E5A0" : "#8899AA" }}
                    role="tab"
                    aria-selected={tab === "designations"}
                    aria-controls="designations-panel"
                >
                    Designations
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTab("grades")}
                    className="pb-3 px-4 rounded-none border-0 border-b-2 transition-colors"
                    style={{ borderBottomColor: tab === "grades" ? "#00E5A0" : "transparent", color: tab === "grades" ? "#00E5A0" : "#8899AA" }}
                    role="tab"
                    aria-selected={tab === "grades"}
                    aria-controls="grades-panel"
                >
                    Grades / Bands
                </Button>
            </div>

            <div className="flex gap-8 max-w-[1200px]">
                {/* LEFT Form */}
                <div className="w-[340px] flex-shrink-0">
                    <Card variant="default" padding="md">
                        {tab === "designations" ? (
                            <div className="flex flex-col gap-4 animate-fade-in" id="designations-panel" role="tabpanel">
                                <Input label="Designation Name *" placeholder="Senior Software Engineer" />
                                <Input label="Designation Code" placeholder="SSE" />
                                <div>
                                    <label htmlFor="desig-dept" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Department *</label>
                                    <select id="desig-dept" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                                        <option>Engineering</option><option>Product</option><option>HR</option><option>Sales</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="desig-grade" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Grade Level</label>
                                    <select id="desig-grade" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                                        {GRADES.map(g => <option key={g.id}>{g.name}</option>)}
                                    </select>
                                </div>

                                <fieldset>
                                    <legend className="block text-xs font-medium text-[#9ca3af] mb-1.5">Employment Type</legend>
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                        {["Full-time", "Part-time", "Contract", "Intern"].map(t => (
                                            <label key={t} className="flex items-center gap-2 text-[13px] text-white cursor-pointer">
                                                <input type="checkbox" defaultChecked={t === "Full-time"} className="accent-[#00E5A0]" /> {t}
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>

                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-white">Can approve leaves?</span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="relative w-9 h-5 p-0 border-0 rounded-full bg-[#00E5A0]"
                                        aria-pressed={true}
                                        aria-label="Toggle leave approval permission"
                                    >
                                        <span className="absolute top-0.5 left-[18px] w-4 h-4 rounded-full bg-white" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white">Is manager level?</span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="relative w-9 h-5 p-0 border-0 rounded-full bg-[#1A2A3A]"
                                        aria-pressed={false}
                                        aria-label="Toggle manager level"
                                    >
                                        <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white" />
                                    </Button>
                                </div>

                                <Button className="w-full mt-4">Add Designation</Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 animate-fade-in" id="grades-panel" role="tabpanel">
                                <Input label="Grade Name *" placeholder="Level 3 (L3)" />
                                <Input label="Grade Code *" placeholder="L3" />
                                <Input label="Min CTC (₹)" type="number" placeholder="8,00,000" />
                                <Input label="Max CTC (₹)" type="number" placeholder="15,00,000" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Min Exp (yrs)" type="number" placeholder="3" />
                                    <Input label="Max Exp (yrs)" type="number" placeholder="6" />
                                </div>
                                <Button className="w-full mt-4">Add Grade</Button>
                            </div>
                        )}
                    </Card>
                </div>

                {/* RIGHT Table */}
                <div className="flex-1 min-w-0">
                    {tab === "designations" ? (
                        <div className="animate-fade-in">
                            <DataTable<Designation>
                                data={DESIGNATIONS}
                                columns={DESIGNATION_COLUMNS}
                                rowKey={(r) => r.id.toString()}
                                aria-label="Designations"
                                emptyTitle="No designations"
                                emptyDescription="Add your first designation using the form."
                            />
                            <Button variant="ghost" size="sm" className="mt-4">
                                <Download size={16} aria-hidden="true" /> Import Designations
                            </Button>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <DataTable<Grade>
                                data={GRADES}
                                columns={GRADE_COLUMNS}
                                rowKey={(r) => r.id.toString()}
                                aria-label="Salary grades"
                                emptyTitle="No grades"
                                emptyDescription="Add your first grade using the form."
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
