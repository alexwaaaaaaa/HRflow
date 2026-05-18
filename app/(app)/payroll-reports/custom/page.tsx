"use client";

import { useState } from "react";
import { Download, Plus, Columns, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

const ALL_FIELDS = [
    "Employee ID", "Full Name", "Department", "Designation", "Location", "Date of Joining", "PAN Card", "UAN Number",
    "Basic Salary", "HRA", "Special Allowance", "Gross Earnings", "PF Employee", "PF Employer", "Professional Tax", "TDS",
    "Total Deductions", "Net Payable", "Bank Account Number", "IFSC Code", "Bank Name",
] as const;

const DEFAULT_FIELDS = ["Employee ID", "Full Name", "Department", "Net Payable", "Bank Account Number", "IFSC Code"];

export default function CustomReportScreen() {
    const [fields, setFields] = useState<string[]>(DEFAULT_FIELDS);

    const available = ALL_FIELDS.filter((f) => !fields.includes(f));

    return (
        <Page
            title="Custom Report Builder"
            subtitle="Select specific payroll fields across all employees to generate tailored CSV output"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Reports", href: "/payroll-reports" },
                { label: "Custom" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Save size={14} aria-hidden="true" />}>Save Template</Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Generate Excel (342 Rows)</Button>
                </>
            }
        >
            <div className="grid md:grid-cols-4 gap-6 items-start">
                {/* Field Selector */}
                <Card padding="none" className="flex flex-col h-[600px]">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A]">
                        <h3 className="text-white font-bold text-sm flex items-center gap-2">
                            <Columns size={15} className="text-[#8899AA]" aria-hidden="true" /> Available Fields
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1" role="list" aria-label="Available fields to add">
                        {available.map((f) => (
                            <div key={f} role="listitem">
                                <button
                                    type="button"
                                    onClick={() => setFields((prev) => [...prev, f])}
                                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#8899AA] hover:bg-[#131B2B] hover:text-white transition-colors flex items-center justify-between group"
                                    aria-label={`Add ${f} to report`}
                                >
                                    {f}
                                    <Plus size={13} className="opacity-0 group-hover:opacity-100 text-[#00E5A0]" aria-hidden="true" />
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Selected Fields + Preview */}
                <div className="md:col-span-3 space-y-6">
                    <Card padding="lg">
                        <h3 className="text-white font-bold text-sm mb-4">Selected Columns (Order preserved in Excel)</h3>
                        <div className="flex flex-wrap gap-2" role="list" aria-label="Selected report columns">
                            {fields.map((f) => (
                                <div
                                    key={f}
                                    role="listitem"
                                    className="bg-purple-500/10 border border-purple-500/30 text-purple-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2"
                                >
                                    {f}
                                    <button
                                        type="button"
                                        onClick={() => setFields((prev) => prev.filter((x) => x !== f))}
                                        className="hover:text-white transition-colors"
                                        aria-label={`Remove ${f} from report`}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            {fields.length === 0 && (
                                <p className="text-[#8899AA] text-xs">No columns selected. Add fields from the left panel.</p>
                            )}
                        </div>
                    </Card>

                    <Card padding="none">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A]">
                            <h3 className="text-white font-bold text-sm">Data Preview (Top 2 Rows)</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm whitespace-nowrap" aria-label="Report data preview">
                                <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                                    <tr>
                                        {fields.map((f) => (
                                            <th key={f} scope="col" className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">{f}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A] text-white">
                                    {[0, 1].map((row) => (
                                        <tr key={row} className="hover:bg-[#131B2B]">
                                            {fields.map((f) => (
                                                <td key={f} className="px-5 py-3 opacity-60">Sample Data</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
