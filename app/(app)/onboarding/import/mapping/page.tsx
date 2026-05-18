"use client";
import React, { useState } from "react";
import { Database, ArrowRight, AlertTriangle, Check, Search, ChevronRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const MAPPING_ROWS = [
    { keka: "Employee_Number", kaarya: "Employee ID", status: "mapped", conf: 100 },
    { keka: "First_Name", kaarya: "First Name", status: "mapped", conf: 100 },
    { keka: "Family_Name", kaarya: "Last Name", status: "mapped", conf: 92 },
    { keka: "Join_Date", kaarya: "Date of Joining", status: "mapped", conf: 85 },
    { keka: "UAN_Num", kaarya: "UAN", status: "mapped", conf: 95 },
    { keka: "Designation_Desc", kaarya: "Job Title", status: "mapped", conf: 75 },
    { keka: "Cost_Center_Code", kaarya: "-- Select Field --", status: "unmapped", conf: 0 },
    { keka: "Custom_Field_BloodGroup", kaarya: "Blood Group", status: "mapped", conf: 88 },
    { keka: "Supervisor_EmpID", kaarya: "Manager ID", status: "review", conf: 45 },
] as const;

const SAMPLE_VALUES: Record<number, string> = {
    0: "e.g. EMP-001",
    1: "e.g. Rahul",
    2: "e.g. Sharma",
    3: "e.g. 24-Oct-2022",
};

export default function DataMappingScreen() {
    const [_search, _setSearch] = useState("");

    return (
        <Page
            title="Map Your Data"
            subtitle="Kaarya AI has auto-mapped 42 out of 45 columns from your file. Please review the highlighted fields below."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Data Mapping", href: "/onboarding/import/mapping" },
            ]}
            actions={
                <>
                    <Button variant="secondary">Save Draft</Button>
                    <Button href="/onboarding/import/validation">
                        Run Validation <ArrowRight size={16} aria-hidden="true" />
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* File info banner */}
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#131B2B] rounded-lg border border-[#2A3A4A] flex items-center justify-center text-indigo-400">
                            <Database size={20} aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">employees_export_q3.csv</h3>
                            <p className="text-[#8899AA] text-xs font-mono mt-0.5">45 columns • 1,248 rows • 2.4 MB</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="success">42 Mapped</Badge>
                        <Badge variant="warning">1 Review</Badge>
                        <Badge variant="danger">2 Unmapped</Badge>
                    </div>
                </div>

                {/* Mapping Table */}
                <Card padding="none" className="overflow-hidden flex flex-col" style={{ height: "600px" }}>
                    {/* Table Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" size={16} aria-hidden="true" />
                            <label htmlFor="mapping-search" className="sr-only">Search columns</label>
                            <input
                                id="mapping-search"
                                type="text"
                                placeholder="Search columns..."
                                className="w-64 pl-9 pr-3 py-2 bg-[#131B2B] border border-[#2A3A4A] rounded-lg text-sm text-white focus:border-indigo-500 outline-none"
                            />
                        </div>
                        <label htmlFor="mapping-filter" className="sr-only">Filter columns</label>
                        <select
                            id="mapping-filter"
                            className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg text-sm text-white p-2 outline-none w-48 appearance-none"
                        >
                            <option>All Columns (45)</option>
                            <option>Unmapped (2)</option>
                            <option>Needs Review (1)</option>
                        </select>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#0A1420] border-b border-[#1A2A3A] sticky top-0 z-10 shadow-sm text-[#8899AA] text-xs uppercase tracking-wider">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-bold w-5/12">Source File Column</th>
                                    <th scope="col" className="px-6 py-4 font-bold w-1/12 text-center"></th>
                                    <th scope="col" className="px-6 py-4 font-bold w-5/12">Kaarya Field</th>
                                    <th scope="col" className="px-6 py-4 font-bold w-1/12 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {MAPPING_ROWS.map((row, i) => (
                                    <tr
                                        key={row.keka}
                                        className={`group ${
                                            row.status === "unmapped"
                                                ? "bg-rose-500/5 hover:bg-rose-500/10"
                                                : row.status === "review"
                                                ? "bg-amber-500/5 hover:bg-amber-500/10"
                                                : "hover:bg-[#131B2B]"
                                        } transition-colors`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-white bg-[#060D1A] px-2 py-1 rounded border border-[#2A3A4A] w-fit">
                                                    {row.keka}
                                                </span>
                                                <span className="text-xs text-[#556677] truncate max-w-xs">
                                                    {SAMPLE_VALUES[i] ?? ""}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <ChevronRight
                                                size={20}
                                                className={row.status === "mapped" ? "text-emerald-500/50" : "text-[#2A3A4A]"}
                                                aria-hidden="true"
                                            />
                                        </td>

                                        <td className="px-6 py-4">
                                            <label htmlFor={`field-select-${i}`} className="sr-only">
                                                Map {row.keka} to Kaarya field
                                            </label>
                                            <select
                                                id={`field-select-${i}`}
                                                className={`w-full p-2.5 rounded-lg border text-sm outline-none transition-colors ${
                                                    row.status === "mapped"
                                                        ? "bg-[#131B2B] border-[#2A3A4A] text-white focus:border-indigo-500"
                                                        : row.status === "review"
                                                        ? "bg-amber-500/10 border-amber-500/50 text-amber-200 focus:border-amber-400"
                                                        : "bg-rose-500/10 border-rose-500/50 text-rose-200 focus:border-rose-400"
                                                }`}
                                                defaultValue={row.kaarya}
                                            >
                                                <option>{row.kaarya}</option>
                                                {row.status !== "mapped" && (
                                                    <option value="create_custom">Create Custom Field...</option>
                                                )}
                                                {row.status !== "mapped" && (
                                                    <option value="ignore">Ignore Column</option>
                                                )}
                                            </select>
                                            {row.status === "review" && (
                                                <div className="flex items-start gap-1.5 mt-2 text-xs text-amber-500">
                                                    <AlertTriangle size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                                                    <span>Multiple matches found. Did you mean &quot;Reporting Manager&quot;?</span>
                                                </div>
                                            )}
                                            {row.status === "mapped" && row.conf < 100 && (
                                                <div className="flex items-center text-[10px] text-emerald-500 mt-1 font-bold">
                                                    Auto-mapped ({row.conf}% match)
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {row.status === "mapped" ? (
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto">
                                                    <Check size={16} aria-hidden="true" />
                                                </div>
                                            ) : row.status === "review" ? (
                                                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mx-auto">
                                                    <AlertTriangle size={16} aria-hidden="true" />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full border-2 border-dashed border-rose-500/30 flex items-center justify-center mx-auto" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
