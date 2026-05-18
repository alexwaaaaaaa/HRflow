"use client";

import { FileText, MoreVertical, Plus } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type FormStatus = "Active" | "Closed" | "Draft";

interface FormEntry {
    id: string;
    name: string;
    type: string;
    fields: number;
    responses: number;
    status: FormStatus;
    lastResponse: string;
}

const FORMS: FormEntry[] = [
    { id: "FRM-001", name: "Exit Interview Form", type: "Survey", fields: 15, responses: 42, status: "Active", lastResponse: "3 days ago" },
    { id: "FRM-002", name: "Probation Confirmation Checklist", type: "Checklist", fields: 8, responses: 120, status: "Active", lastResponse: "1 hr ago" },
    { id: "FRM-003", name: "Employee Satisfaction Survey Q4", type: "Survey", fields: 22, responses: 198, status: "Closed", lastResponse: "Dec 31, 2023" },
    { id: "FRM-004", name: "IT Asset Handover Form", type: "Submission", fields: 10, responses: 0, status: "Draft", lastResponse: "Never" },
];

const STATUS_VARIANT: Record<FormStatus, BadgeVariant> = {
    Active: "success",
    Closed: "neutral",
    Draft: "warning",
};

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function NameCell({ form }: { form: FormEntry }) {
    return (
        <div>
            <div className="text-white font-medium text-sm">{form.name}</div>
            <div className="text-[10px] text-[#445566] font-mono">{form.id}</div>
        </div>
    );
}

function ResponsesCell({ form }: { form: FormEntry }) {
    return (
        <Link href="/settings/forms/responses" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
            {form.responses}
        </Link>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<FormEntry>[] = [
    {
        key: "name",
        label: "Form Name",
        render: (f) => <NameCell form={f} />,
        sortable: true,
        sortValue: (f) => f.name,
    },
    {
        key: "type",
        label: "Type",
        render: (f) => <span className="text-sm text-[#8899AA]">{f.type}</span>,
        sortable: true,
        sortValue: (f) => f.type,
    },
    {
        key: "fields",
        label: "Fields",
        render: (f) => <span className="text-sm text-white">{f.fields}</span>,
        sortable: true,
        sortValue: (f) => f.fields,
    },
    {
        key: "responses",
        label: "Responses",
        render: (f) => <ResponsesCell form={f} />,
        sortable: true,
        sortValue: (f) => f.responses,
    },
    {
        key: "status",
        label: "Status",
        render: (f) => <Badge variant={STATUS_VARIANT[f.status]}>{f.status}</Badge>,
        sortable: true,
        sortValue: (f) => f.status,
    },
    {
        key: "actions",
        label: "",
        width: "w-16",
        align: "right",
        render: () => (
            <Button variant="ghost" size="sm" aria-label="More options" icon={<MoreVertical size={16} aria-hidden="true" />} />
        ),
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function FormBuilderPage() {
    return (
        <Page
            title="Form Builder"
            subtitle="Design custom forms for surveys, checklists, and data collection. Embed them in workflows or share via link."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Forms" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />}>Create Form</Button>
            }
        >
            <Card padding="none">
                <DataTable<FormEntry>
                    data={FORMS}
                    columns={COLUMNS}
                    rowKey={(f) => f.id}
                    searchable
                    searchPlaceholder="Search forms…"
                    aria-label="Form builder"
                    emptyTitle="No forms yet"
                    emptyDescription="Create your first form to get started."
                    emptyAction={
                        <Button size="sm" icon={<FileText size={14} aria-hidden="true" />}>Create Form</Button>
                    }
                />
            </Card>
        </Page>
    );
}
