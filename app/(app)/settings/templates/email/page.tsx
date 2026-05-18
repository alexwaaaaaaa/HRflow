"use client";

import { useState } from "react";
import { Code, Edit2, Eye, Filter, Plus, Save, Send } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type TemplateStatus = "Active" | "Draft";

interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    status: TemplateStatus;
    category: string;
    lastUpdated: string;
}

const CATEGORIES = ["Onboarding", "Leave & Attendance", "Payroll", "Performance", "System Alerts"];

const TEMPLATES: EmailTemplate[] = [
    { id: "TPL-ONB-01", name: "Welcome Email (New Hire)", subject: "Welcome to Kaarya, {{first_name}}! 🚀", status: "Active", category: "Onboarding", lastUpdated: "2 days ago" },
    { id: "TPL-ONB-02", name: "IT Provisioning Request", subject: "Action Required: IT Setup for {{full_name}}", status: "Active", category: "Onboarding", lastUpdated: "1 month ago" },
    { id: "TPL-ONB-03", name: "Manager Introduction", subject: "Your new team member is joining soon", status: "Draft", category: "Onboarding", lastUpdated: "Just now" },
];

const STATUS_VARIANT: Record<TemplateStatus, BadgeVariant> = {
    Active: "success",
    Draft: "warning",
};

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function NameCell({ tpl }: { tpl: EmailTemplate }) {
    return (
        <div className="flex flex-col">
            <span className="text-white font-medium text-sm mb-1">{tpl.name}</span>
            <span className="text-xs text-[#445566] font-mono">{tpl.id}</span>
        </div>
    );
}

function SubjectCell({ subject }: { subject: string }) {
    return (
        <div className="text-sm text-[#8899AA] truncate max-w-[250px]" title={subject}>
            {subject.split(/(\{\{.*?\}\})/).map((part, i) =>
                part.startsWith("{{")
                    ? <span key={i} className="text-indigo-400 bg-indigo-500/10 px-1 rounded font-mono text-[10px]">{part}</span>
                    : part
            )}
        </div>
    );
}

function ActionsCell() {
    return (
        <div className="flex gap-2">
            <Button variant="secondary" size="sm" aria-label="Edit template" icon={<Edit2 size={14} aria-hidden="true" />} />
            <Button variant="secondary" size="sm" aria-label="Preview template" icon={<Eye size={14} aria-hidden="true" />} />
            <Button variant="secondary" size="sm" aria-label="Send test" icon={<Send size={14} aria-hidden="true" />} />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<EmailTemplate>[] = [
    {
        key: "name",
        label: "Template Name",
        render: (tpl) => <NameCell tpl={tpl} />,
        sortable: true,
        sortValue: (tpl) => tpl.name,
    },
    {
        key: "subject",
        label: "Subject Line",
        render: (tpl) => <SubjectCell subject={tpl.subject} />,
    },
    {
        key: "status",
        label: "Status",
        render: (tpl) => <Badge variant={STATUS_VARIANT[tpl.status]}>{tpl.status}</Badge>,
        sortable: true,
        sortValue: (tpl) => tpl.status,
    },
    {
        key: "actions",
        label: "Actions",
        render: () => <ActionsCell />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function EmailTemplateSettingsPage() {
    const [activeCategory, setActiveCategory] = useState("Onboarding");

    return (
        <Page
            title="Email Templates"
            subtitle="Design and manage system-generated email communications with dynamic variables."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Templates" },
                { label: "Email" },
            ]}
            maxWidth="1300px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />







}>Create Template</Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Categories Sidebar */}
                <nav aria-label="Template categories" className="lg:col-span-1">
                    <h3 className="text-xs font-semibold text-[#445566] uppercase tracking-wider mb-2 px-2">Categories</h3>
                    <ul className="flex flex-col gap-2">
                        {CATEGORIES.map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => setActiveCategory(cat)}
                                    aria-current={activeCategory === cat ? "page" : undefined}
                                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors text-sm font-medium ${
                                        activeCategory === cat
                                            ? "bg-[#1A2A3A] text-white border border-[#2A3A4A]"
                                            : "text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent"
                                    }`}
                                >
                                    {cat}
                                    {cat === "Onboarding" && (
                                        <span className="bg-[#0A1420] text-[#8899AA] px-2 py-0.5 rounded text-xs border border-[#1A2A3A]">3</span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Templates Area */}
                <div className="lg:col-span-3 space-y-4">
                    <Card padding="none">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#131B2B] flex justify-between items-center">
                            <h2 className="text-white font-medium">{activeCategory} Templates</h2>
                            <Button variant="secondary" size="sm" icon={<Filter size={14} aria-hidden="true" />}>Filter List</Button>
                        </div>
                        <DataTable<EmailTemplate>
                            data={TEMPLATES}
                            columns={COLUMNS}
                            rowKey={(tpl) => tpl.id}
                            aria-label={`${activeCategory} email templates`}
                            emptyTitle="No templates"
                            emptyDescription="Create your first template for this category."
                        />
                    </Card>

                    {/* Editor Split View */}
                    <Card padding="none">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#131B2B] flex justify-between items-center">
                            <div>
                                <span className="text-white text-sm font-medium">Quick Editor: Welcome Email (New Hire)</span>
                                <p className="text-[#445566] text-xs mt-0.5">Supports HTML and Liquid templating</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="secondary" size="sm" icon={<Code size={14} aria-hidden="true" />}>HTML Snippets</Button>
                                <Button size="sm" icon={<Save size={14} aria-hidden="true" />}>Save Draft</Button>
                            </div>
                        </div>
                        <div className="h-48 bg-[#0A1420] p-4 font-mono text-xs text-[#8899AA] overflow-y-auto leading-relaxed">
                            <span className="text-pink-400">&lt;div</span> <span className="text-yellow-400">className</span>=<span className="text-green-400">&quot;welcome-container&quot;</span><span className="text-pink-400">&gt;</span><br />
                            &nbsp;&nbsp;<span className="text-pink-400">&lt;h1&gt;</span>Welcome aboard, <span className="text-indigo-400 bg-indigo-500/10 px-1 rounded">{"{{first_name}}"}</span>!<span className="text-pink-400">&lt;/h1&gt;</span><br />
                            &nbsp;&nbsp;<span className="text-pink-400">&lt;p&gt;</span>We are thrilled to have you join the <span className="text-indigo-400 bg-indigo-500/10 px-1 rounded">{"{{department_name}}"}</span> team.<span className="text-pink-400">&lt;/p&gt;</span><br />
                            <span className="text-pink-400">&lt;/div&gt;</span>
                        </div>
                    </Card>
                </div>
            </div>
        

        

        

            
        </Page>
    );
}
