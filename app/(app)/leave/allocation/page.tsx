"use client";

import { Save, List } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface AllocationRow {
    id: string;
    name: string;
    doj: string;
    base: number;
}

const ROWS: AllocationRow[] = [
    { id: "E101", name: "Kabir Das", doj: "01 Nov 2024", base: 1.25 },
    { id: "E103", name: "Neha Sharma", doj: "15 Nov 2024", base: 0.5 },
    { id: "E104", name: "John Doe", doj: "15 Nov 2024", base: 0.5 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LeaveAllocationPage() {
    return (
        <Page
            title="Bulk Leave Allocation"
            subtitle="Allocate or reset leave quotas for multiple employees simultaneously"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Allocation" },
            ]}
            maxWidth="1100px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>
                    Commit Allocations
                </Button>
            }
        >
            <div className="grid gap-6 lg:grid-cols-4">
                {/* Setup panel */}
                <Card padding="md" className="h-max space-y-6 lg:col-span-1">
                    <div className="space-y-2">
                        <label htmlFor="target-group" className="block text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                            Target Group
                        </label>
                        <select
                            id="target-group"
                            className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-2.5 text-sm font-bold text-white outline-none focus:border-[#0066FF]"
                        >
                            <option>New Joiners (Nov)</option>
                            <option>Engineering Dept</option>
                            <option>All Active Employees</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="leave-type-alloc" className="block text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                            Leave Type
                        </label>
                        <select
                            id="leave-type-alloc"
                            className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-2.5 text-sm font-bold text-white outline-none focus:border-[#0066FF]"
                        >
                            <option>Privilege Leave (EL)</option>
                            <option>Casual Leave (CL)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">Action Default</p>
                        <div
                            role="group"
                            aria-label="Allocation action"
                            className="flex rounded-lg border border-[#1A2A3A] bg-[#060B14] p-1 text-center text-xs font-bold"
                        >
                            {/* raw-button: tab-style toggle inside a role=group, not a standalone action */}
                            <button
                                type="button"
                                className="flex-1 rounded py-1.5 bg-[#1A2A3A] text-white"
                                aria-pressed="true"
                            >
                                Prorate
                            </button>
                            {/* raw-button: tab-style toggle inside a role=group, not a standalone action */}
                            <button
                                type="button"
                                className="flex-1 py-1.5 text-[#556677] transition-colors hover:text-white"
                                aria-pressed="false"
                            >
                                Full Quota
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Data grid */}
                <Card padding="none" className="lg:col-span-3">
                    <CardHeader className="border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                        <CardTitle className="flex items-center gap-2">
                            <List size={16} className="text-[#8899AA]" aria-hidden="true" />
                            {ROWS.length} Employees Selected
                        </CardTitle>
                    </CardHeader>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm" aria-label="Leave allocation grid">
                            <thead className="border-b border-[#1A2A3A] bg-[#0A1420]">
                                <tr>
                                    <th scope="col" className="w-10 px-6 py-4">
                                        <input type="checkbox" defaultChecked aria-label="Select all" className="accent-[#0066FF]" />
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#8899AA]">Employee</th>
                                    <th scope="col" className="w-32 px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#8899AA]">DOJ</th>
                                    <th scope="col" className="w-40 px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#0066FF]">New Credit (EL)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {ROWS.map((row) => (
                                    <tr key={row.id} className="bg-[#060B14] transition-colors hover:bg-[#1A2A3A]/30">
                                        <td className="px-6 py-4">
                                            <input type="checkbox" defaultChecked aria-label={`Select ${row.name}`} className="accent-[#0066FF]" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-base font-bold text-white">{row.name}</p>
                                            <p className="text-xs text-[#8899AA]">{row.id}</p>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-[#8899AA]">{row.doj}</td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                step="0.5"
                                                defaultValue={row.base}
                                                aria-label={`New credit for ${row.name}`}
                                                className="w-full rounded border border-[#2A3A4A] bg-[#0D1928] p-2 text-center font-black text-[#00E5A0] outline-none focus:border-[#00E5A0]"
                                            />
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
