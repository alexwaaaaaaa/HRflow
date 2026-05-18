"use client";

import { Code, Copy, Eye, Plus } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type LetterStatus = "Active" | "Draft";

interface LetterTemplate {
    id: string;
    name: string;
    category: string;
    status: LetterStatus;
    variables: number;
    lastUsed: string;
}

const TEMPLATES: LetterTemplate[] = [
    { id: "LTR-001", name: "Offer Letter (Standard)", category: "Recruitment", status: "Active", variables: 14, lastUsed: "2 days ago" },
    { id: "LTR-002", name: "Appointment Letter", category: "Onboarding", status: "Active", variables: 18, lastUsed: "Yesterday" },
    { id: "LTR-003", name: "Experience Certificate", category: "Separation", status: "Active", variables: 9, lastUsed: "1 week ago" },
    { id: "LTR-004", name: "Salary Revision Letter", category: "Compensation", status: "Active", variables: 12, lastUsed: "3 days ago" },
    { id: "LTR-005", name: "Relieving Letter", category: "Separation", status: "Draft", variables: 8, lastUsed: "Never" },
];

const STATUS_VARIANT: Record<LetterStatus, BadgeVariant> = {
    Active: "success",
    Draft: "warning",
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function TemplateCard({ tpl }: { tpl: LetterTemplate }) {
    return (
        <Card padding="md" className="hover:border-[#2A3A4A] transition-all hover:shadow-lg group">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-white font-semibold text-sm group-hover:text-indigo-400 transition-colors">{tpl.name}</h3>
                    <span className="text-[10px] text-[#445566] font-mono">{tpl.id}</span>
                </div>
                <Badge variant={STATUS_VARIANT[tpl.status]}>{tpl.status}</Badge>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <Badge variant="neutral">{tpl.category}</Badge>
                <span className="text-[10px] text-[#445566] flex items-center gap-1">
                    <Code size={10} aria-hidden="true" /> {tpl.variables} variables
                </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[#1A2A3A] text-xs text-[#8899AA]">
                <span>Last used: {tpl.lastUsed}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="/settings/templates/letters/preview">
                        <Button variant="secondary" size="sm" aria-label="Preview template" icon={<Eye size={12} aria-hidden="true" />} />
                    </Link>
                    <Button variant="secondary" size="sm" aria-label="Duplicate template" icon={<Copy size={12} aria-hidden="true" />} />
                </div>
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LetterTemplateBuilderPage() {
    return (
        <Page
            title="Letter Templates"
            subtitle="Design professional letter templates with dynamic merge fields. Auto-generated from employee and company data."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Templates" },
                { label: "Letters" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />}>Create Template</Button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {TEMPLATES.map((tpl) => (
                    <TemplateCard key={tpl.id} tpl={tpl} />
                ))}
            </div>
        </Page>
    );
}
