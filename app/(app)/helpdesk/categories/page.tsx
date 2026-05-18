"use client";
import { useState } from "react";
import {
    FolderTree, Plus, Settings, Search,
    ChevronRight, Edit2, Trash2, Users, CornerDownRight,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PARENT_CATEGORIES = ["IT Support", "HR & Payroll", "Facilities", "Legal & Compliance", "Finance"];

const SUB_CATEGORIES = [
    { name: "Hardware Issue", assignee: "IT Assets Team" },
    { name: "Software License", assignee: "Amit Verma (Direct)" },
    { name: "Network / VPN", assignee: "Network Admin Team" },
];

export default function HelpdeskCategorySetupPage() {
    const [activeCategory, setActiveCategory] = useState("IT Support");

    return (
        <Page
            title="Helpdesk Categories & Routing"
            subtitle="Configure ticket categories, assign default agents, and set up auto-routing rules."
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "Categories" },
            ]}
            maxWidth="1400px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />}>
                    New Category
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Categories Sidebar */}
                <div className="space-y-4 lg:col-span-1">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]"
                            size={16}
                            aria-hidden="true"
                        />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            aria-label="Search categories"
                            className="w-full rounded-xl border border-[#1A2A3A] bg-[#0F1C2E] py-2 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-[#33E6FF]"
                        />
                    </div>

                    <Card padding="none">
                        <div className="border-b border-[#1A2A3A] bg-[#152336] p-4">
                            <h3 className="text-sm font-bold text-white">Parent Categories</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {PARENT_CATEGORIES.map((cat) => {
                                const isActive = activeCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setActiveCategory(cat)}
                                        className={`flex w-full items-center justify-between border-l-2 p-4 transition-colors ${
                                            isActive
                                                ? "border-l-[#33E6FF] bg-[#1A2A3A]"
                                                : "border-l-transparent hover:bg-[#1A2A3A]/50"
                                        }`}
                                    >
                                        <span
                                            className={`text-sm font-semibold ${
                                                isActive ? "text-white" : "text-[#8899AA]"
                                            }`}
                                        >
                                            {cat}
                                        </span>
                                        <ChevronRight
                                            size={16}
                                            className={isActive ? "text-[#33E6FF]" : "text-[#445566]"}
                                            aria-hidden="true"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                {/* Configuration Canvas */}
                <div className="lg:col-span-3">
                    {activeCategory === "IT Support" ? (
                        <Card padding="none">
                            {/* Category Details */}
                            <div className="flex items-start justify-between border-b border-[#1A2A3A] p-8">
                                <div>
                                    <div className="mb-2 flex items-center gap-3">
                                        <h2 className="text-2xl font-bold text-white">IT Support</h2>
                                        <Badge variant="success">Active</Badge>
                                    </div>
                                    <p className="text-sm text-[#8899AA]">
                                        Hardware, software access, network issues, and general tech support.
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        aria-label="Edit IT Support category"
                                        className="rounded-lg border border-[#2A3A4A] p-2 text-[#8899AA] transition-colors hover:text-white"
                                    >
                                        <Edit2 size={16} aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Delete IT Support category"
                                        className="rounded-lg border border-[#2A3A4A] p-2 text-[#8899AA] transition-colors hover:text-[#FF4444]"
                                    >
                                        <Trash2 size={16} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-8 p-8">
                                {/* Default Assignments */}
                                <section>
                                    <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                        <Users size={16} aria-hidden="true" /> Default Assignments
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] p-4">
                                            <label
                                                htmlFor="assignee-group"
                                                className="mb-2 block text-xs font-medium text-[#8899AA]"
                                            >
                                                Default Assignee Group
                                            </label>
                                            <select
                                                id="assignee-group"
                                                className="w-full rounded-lg border border-[#2A3A4A] bg-[#0A1420] px-3 py-2 text-sm text-white outline-none focus:border-[#33E6FF]"
                                            >
                                                <option>IT L1 Support Desk</option>
                                                <option>IT L2 Advanced</option>
                                                <option>Network Admin Team</option>
                                            </select>
                                        </div>
                                        <div className="rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] p-4">
                                            <label
                                                htmlFor="sla-policy"
                                                className="mb-2 block text-xs font-medium text-[#8899AA]"
                                            >
                                                Auto-apply SLA Policy
                                            </label>
                                            <select
                                                id="sla-policy"
                                                className="w-full rounded-lg border border-[#2A3A4A] bg-[#0A1420] px-3 py-2 text-sm text-white outline-none focus:border-[#33E6FF]"
                                            >
                                                <option>Standard 8h Resolution</option>
                                                <option>Critical 2h Resolution</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                {/* Sub-categories */}
                                <section>
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                            <FolderTree size={16} aria-hidden="true" /> Sub-Categories
                                        </h3>
                                        <button
                                            type="button"
                                            className="flex items-center gap-1 text-sm font-semibold text-[#33E6FF] hover:underline"
                                        >
                                            <Plus size={14} aria-hidden="true" /> Add Sub-category
                                        </button>
                                    </div>
                                    <div className="overflow-hidden rounded-xl border border-[#1A2A3A] bg-[#0A1420]">
                                        <table className="w-full border-collapse text-left">
                                            <thead>
                                                <tr className="bg-[#1A2A3A] text-xs font-medium uppercase tracking-wider text-[#8899AA]">
                                                    <th scope="col" className="p-3">Name</th>
                                                    <th scope="col" className="p-3">Specific Assignee</th>
                                                    <th scope="col" className="p-3 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#1A2A3A] text-sm text-white">
                                                {SUB_CATEGORIES.map((sub) => (
                                                    <tr
                                                        key={sub.name}
                                                        className="transition-colors hover:bg-[#1A2A3A]/30"
                                                    >
                                                        <td className="flex items-center gap-2 p-3">
                                                            <CornerDownRight
                                                                size={14}
                                                                className="text-[#445566]"
                                                                aria-hidden="true"
                                                            />
                                                            <span className="font-semibold">{sub.name}</span>
                                                        </td>
                                                        <td className="p-3 text-[#8899AA]">{sub.assignee}</td>
                                                        <td className="p-3 text-right">
                                                            <button
                                                                type="button"
                                                                aria-label={`Edit ${sub.name}`}
                                                                className="text-[#445566] transition-colors hover:text-white"
                                                            >
                                                                <Edit2 size={14} aria-hidden="true" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                                {/* Auto-Routing Rules */}
                                <section>
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                            <Settings size={16} aria-hidden="true" /> Keyword Auto-Routing
                                        </h3>
                                        <button
                                            type="button"
                                            className="flex items-center gap-1 text-sm font-semibold text-[#00E5A0] hover:underline"
                                        >
                                            <Plus size={14} aria-hidden="true" /> Add Rule
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] p-4">
                                        <div className="flex-1">
                                            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-white">
                                                If description contains{" "}
                                                <span className="rounded border border-[#33E6FF]/20 bg-[#33E6FF]/10 px-2 py-0.5 text-[#33E6FF]">
                                                    &apos;Jira&apos;, &apos;Confluence&apos;, &apos;Figma&apos;
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[#8899AA]">
                                                Then route to{" "}
                                                <span className="rounded border border-[#2A3A4A] bg-[#0A1420] px-2 py-0.5 text-white">
                                                    Software License
                                                </span>{" "}
                                                sub-category
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            aria-label="Delete routing rule"
                                            className="text-[#445566] transition-colors hover:text-[#FF4444]"
                                        >
                                            <Trash2 size={16} aria-hidden="true" />
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </Card>
                    ) : (
                        <Card padding="lg">
                            <div className="flex flex-col items-center justify-center py-12 text-center text-[#445566]">
                                <FolderTree size={64} className="mb-4 opacity-20" aria-hidden="true" />
                                <h2 className="mb-2 text-xl font-medium text-white">
                                    {activeCategory} Category Selected
                                </h2>
                                <p className="text-sm">
                                    Mock view. Functionality mimics the IT Support configuration panel.
                                </p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </Page>
    );
}
