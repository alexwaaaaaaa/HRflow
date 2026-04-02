"use client";

import { Workflow, Plus, Play, Pause, Search, Settings2, MoreHorizontal } from "lucide-react";
import Button from "@/components/ui/Button";
import { useState } from "react";

// --- Types & Interfaces ---
interface WorkflowItem {
    id: string;
    title: string;
    description: string;
    status: "Active" | "Draft" | "Paused";
    lastRunAt: string;
    lastRunUser?: string;
    iconColor: string;
    iconBg: string;
}

// --- Mock Data ---
const DEFAULT_WORKFLOWS: WorkflowItem[] = [
    {
        id: "wf-001",
        title: "Standard Engineering Onboarding",
        description: "Triggered on 'New Hire' with department 'Engineering'. Provisions Google Workspace, GitHub Enterprise, Jira, Slack, and initiates MacBook Pro request.",
        status: "Active",
        lastRunAt: "2 hours ago",
        lastRunUser: "John Doe",
        iconColor: "text-[#0066FF]",
        iconBg: "bg-[#0066FF]/10 border-[#0066FF]/20"
    },
    {
        id: "wf-002",
        title: "Design Team Offboarding",
        description: "Triggered on 'Offboarding status'. Revokes Adobe CC, Figma, transfers Drive files to Manager, and generates IT Return notification.",
        status: "Active",
        lastRunAt: "3 days ago",
        lastRunUser: "Sarah Connor",
        iconColor: "text-[#8899AA]",
        iconBg: "bg-[#060B14] border-[#1A2A3A]"
    }
];

export default function ITProvisioningWorkflowScreen() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"Active" | "Drafts">("Active");

    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-7xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Provisioning Workflows</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Automate IT setups for onboarding, role changes, and offboarding</p>
                </div>
                <Button variant="primary" icon={<Plus size={16} />}>Create Workflow</Button>
            </header>

            {/* List Container */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm overflow-hidden" aria-labelledby="workflow-list-heading">
                <h2 id="workflow-list-heading" className="sr-only">Workflows List</h2>

                {/* Toolbar */}
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0A1420]/80 gap-4">
                    <nav className="flex gap-2" aria-label="Workflow Status Filters">
                        <Button
                            variant="secondary"
                            className={`h-9 px-4 transition-colors ${activeTab === 'Active' ? 'text-[#00E5A0] border-[#00E5A0]/30 bg-[#00E5A0]/10 shadow-[0_0_10px_rgba(0,229,160,0.1)] focus:ring-[#00E5A0]' : 'text-[#8899AA] border-transparent hover:border-[#1A2A3A]'}`}
                            onClick={() => setActiveTab('Active')}
                            aria-current={activeTab === 'Active' ? 'page' : undefined}
                        >
                            Active (12)
                        </Button>
                        <Button
                            variant="secondary"
                            className={`h-9 px-4 transition-colors ${activeTab === 'Drafts' ? 'text-[#00E5A0] border-[#00E5A0]/30 bg-[#00E5A0]/10 shadow-[0_0_10px_rgba(0,229,160,0.1)] focus:ring-[#00E5A0]' : 'text-[#8899AA] border-transparent hover:border-[#1A2A3A]'}`}
                            onClick={() => setActiveTab('Drafts')}
                            aria-current={activeTab === 'Drafts' ? 'page' : undefined}
                        >
                            Drafts (3)
                        </Button>
                    </nav>

                    <div className="relative w-full md:w-auto">
                        <label htmlFor="search-workflows" className="sr-only">Search workflows</label>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" size={16} aria-hidden="true" />
                        <input
                            id="search-workflows"
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search workflows..."
                            className="w-full md:w-72 h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg pl-9 pr-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all"
                        />
                    </div>
                </div>

                {/* Workflow Items List */}
                <ul className="divide-y divide-[#1A2A3A] m-0 p-0 list-none">
                    {DEFAULT_WORKFLOWS.map((workflow) => (
                        <li key={workflow.id} className="p-6 hover:bg-[#1A2A3A]/40 transition-colors group flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                            <div className="flex gap-4 md:gap-5 flex-grow">
                                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 mt-0.5 ${workflow.iconBg}`} aria-hidden="true">
                                    <Workflow size={24} className={workflow.iconColor} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1.5 leading-tight">{workflow.title}</h3>
                                    <p className="text-sm text-[#8899AA] max-w-3xl mb-3 leading-relaxed">
                                        {workflow.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs">
                                        <span className={`flex items-center gap-1.5 font-medium ${workflow.status === 'Active' ? 'text-[#00E5A0]' : 'text-[#FFB800]'}`}>
                                            {workflow.status === 'Active' ? <Play size={12} fill="currentColor" aria-hidden="true" /> : <Pause size={12} fill="currentColor" aria-hidden="true" />}
                                            {workflow.status} Workflow
                                        </span>
                                        <span className="text-[#445566]" aria-hidden="true">•</span>
                                        <span className="text-[#8899AA]">
                                            Last run: {workflow.lastRunAt} {workflow.lastRunUser && `(${workflow.lastRunUser})`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 w-full lg:w-auto justify-end ml-16 lg:ml-0 border-t border-[#1A2A3A] lg:border-t-0 pt-4 lg:pt-0">
                                <Button
                                    variant="secondary"
                                    className="h-9 w-9 !p-0 flex justify-center items-center rounded-lg hover:text-[#FFB800] hover:border-[#FFB800]/50 transition-colors group/pause"
                                    aria-label={`Pause ${workflow.title} workflow`}
                                    title="Pause Workflow"
                                >
                                    <Pause size={16} className="text-[#8899AA] group-hover/pause:text-[#FFB800]" />
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="h-9 w-9 !p-0 flex justify-center items-center rounded-lg hover:text-[#0066FF] hover:border-[#0066FF]/50 transition-colors group/settings"
                                    aria-label={`Settings for ${workflow.title}`}
                                    title="Workflow Settings"
                                >
                                    <Settings2 size={16} className="text-[#8899AA] group-hover/settings:text-[#0066FF]" />
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="h-9 w-9 !p-0 flex justify-center items-center rounded-lg hover:text-white hover:border-[#445566] transition-colors group/more"
                                    aria-label={`More options for ${workflow.title}`}
                                    title="More Options"
                                >
                                    <MoreHorizontal size={16} className="text-[#8899AA] group-hover/more:text-white" />
                                </Button>
                            </div>

                        </li>
                    ))}
                </ul>
            </section>

        </main>
    );
}
