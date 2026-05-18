"use client";

import { Calendar, GripVertical, Hash, List, MoreVertical, Plus, ToggleLeft, ToggleRight, Type } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type FieldType = "Text" | "Number" | "Dropdown" | "Date";

interface CustomField {
    id: string;
    label: string;
    fieldType: FieldType;
    entity: string;
    required: boolean;
    active: boolean;
    options: string;
}

const FIELDS: CustomField[] = [
    { id: "CF-001", label: "Blood Group", fieldType: "Dropdown", entity: "Employee", required: true, active: true, options: "A+, A-, B+, B-, O+, O-, AB+, AB-" },
    { id: "CF-002", label: "Emergency Contact Relation", fieldType: "Text", entity: "Employee", required: true, active: true, options: "" },
    { id: "CF-003", label: "T-Shirt Size", fieldType: "Dropdown", entity: "Employee", required: false, active: true, options: "XS, S, M, L, XL, XXL" },
    { id: "CF-004", label: "Project Code", fieldType: "Text", entity: "Attendance", required: false, active: true, options: "" },
    { id: "CF-005", label: "Exit Interview Score", fieldType: "Number", entity: "Separation", required: false, active: false, options: "" },
];

const TYPE_ICONS: Record<FieldType, LucideIcon> = {
    Text: Type,
    Number: Hash,
    Dropdown: List,
    Date: Calendar,
};

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function LabelCell({ field }: { field: CustomField }) {
    return (
        <div>
            <div className="text-white font-medium text-sm">{field.label}</div>
            <div className="text-[10px] text-[#445566] font-mono">{field.id}</div>
        </div>
    );
}

function TypeCell({ fieldType }: { fieldType: FieldType }) {
    const Icon = TYPE_ICONS[fieldType];
    return (
        <span className="flex items-center gap-1.5 text-sm text-[#8899AA]">
            <Icon size={14} className="text-indigo-400" aria-hidden="true" /> {fieldType}
        </span>
    );
}

function ToggleCell({ active }: { active: boolean }) {
    return active
        ? <ToggleRight size={24} className="text-indigo-400 cursor-pointer" aria-label="Enabled" />
        : <ToggleLeft size={24} className="text-[#2A3A4A] cursor-pointer" aria-label="Disabled" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<CustomField>[] = [
    {
        key: "drag",
        label: "",
        width: "w-8",
        render: () => <GripVertical size={16} className="text-[#445566] cursor-grab" aria-hidden="true" />,
    },
    {
        key: "label",
        label: "Field Label",
        render: (f) => <LabelCell field={f} />,
        sortable: true,
        sortValue: (f) => f.label,
    },
    {
        key: "type",
        label: "Type",
        render: (f) => <TypeCell fieldType={f.fieldType} />,
        sortable: true,
        sortValue: (f) => f.fieldType,
    },
    {
        key: "entity",
        label: "Entity",
        render: (f) => <Badge variant="neutral">{f.entity}</Badge>,
        sortable: true,
        sortValue: (f) => f.entity,
    },
    {
        key: "required",
        label: "Required",
        render: (f) => <span className="text-sm text-[#8899AA]">{f.required ? "Yes" : "No"}</span>,
    },
    {
        key: "active",
        label: "Status",
        render: (f) => <ToggleCell active={f.active} />,
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

export default function CustomFieldsPage() {
    return (
        <Page
            title="Custom Fields"
            subtitle="Extend Kaarya's data model by adding custom fields to employees, leave, payroll, and other entities."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Custom Fields" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />}>Add Custom Field</Button>
            }
        >
            <Card padding="none">
                <DataTable<CustomField>
                    data={FIELDS}
                    columns={COLUMNS}
                    rowKey={(f) => f.id}
                    searchable
                    searchPlaceholder="Search fields…"
                    aria-label="Custom fields"
                    emptyTitle="No custom fields"
                    emptyDescription="Add custom fields to extend the data model."
                />
            </Card>
        </Page>
    );
}
