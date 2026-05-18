"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Play, Plus, Trash2, Filter, Layers } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Schema ───────────────────────────────────────────────────────────────────

const FIELD_TYPES = ["text", "number", "date", "boolean"] as const;
const AGGREGATIONS = ["none", "sum", "avg", "count", "min", "max"] as const;

const columnSchema = z.object({
    fieldName: z.string().min(1, "Field name required"),
    label: z.string().min(1, "Label required"),
    type: z.enum(FIELD_TYPES),
    aggregation: z.enum(AGGREGATIONS),
});

const builderSchema = z.object({
    dataset: z.string().min(1),
    groupBy: z.string(),
    sortBy: z.string(),
    sortDir: z.enum(["ASC", "DESC"]),
    columns: z.array(columnSchema).min(1, "Add at least one column"),
});

type BuilderForm = z.infer<typeof builderSchema>;

// ─── Static preview data ──────────────────────────────────────────────────────

const PREVIEW_ROWS = [
    { id: "EMP-1001", name: "Amit Kumar", dept: "Engineering", designation: "Frontend Developer" },
    { id: "EMP-1002", name: "Priya Singh", dept: "Engineering", designation: "Backend Developer" },
    { id: "EMP-1003", name: "Neha Sharma", dept: "Sales", designation: "Account Executive" },
    { id: "EMP-1004", name: "Rohan Gupta", dept: "Engineering", designation: "DevOps Engineer" },
    { id: "EMP-1005", name: "Karan Patel", dept: "Marketing", designation: "Growth Lead" },
];

const FIELD_GROUPS = [
    {
        label: "Personal Info",
        fields: ["Employee ID", "Full Name", "Gender", "Date of Birth"],
        defaultChecked: ["Employee ID", "Full Name"],
    },
    {
        label: "Work Info",
        fields: ["Department", "Designation", "Location", "Reporting Manager", "Date of Join"],
        defaultChecked: ["Department", "Designation"],
    },
    {
        label: "Compensation",
        fields: ["Annual CTC", "Basic Salary", "Gross Salary", "Bank Account"],
        defaultChecked: [],
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomReportBuilderPage() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<BuilderForm>({
        resolver: zodResolver(builderSchema),
        defaultValues: {
            dataset: "Employee Master Data",
            groupBy: "Department",
            sortBy: "Employee ID",
            sortDir: "ASC",
            columns: [
                { fieldName: "employee_id", label: "Employee ID", type: "text", aggregation: "none" },
                { fieldName: "full_name", label: "Full Name", type: "text", aggregation: "none" },
                { fieldName: "department", label: "Department", type: "text", aggregation: "none" },
                { fieldName: "designation", label: "Designation", type: "text", aggregation: "none" },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "columns" });

    const onSubmit = (_data: BuilderForm) => {
        // TODO: replace with real report generation mutation
    };

    return (
        <Page
            title="Custom Report Builder"
            subtitle="Select datasets, configure columns, apply filters, and preview results."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Custom Builder" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<Save size={14} aria-hidden="true" />}
                        type="button"
                    >
                        Save Configuration
                    </Button>
                    <Button
                        icon={<Play size={14} aria-hidden="true" />}
                        type="submit"
                        form="builder-form"
                    >
                        Run Report
                    </Button>
                </>
            }
        >
            <form id="builder-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Dataset & Fields */}
                    <div className="lg:col-span-3">
                        <Card padding="none" className="flex flex-col">
                            <div className="p-4 border-b border-[#1A2A3A]">
                                <h2 className="text-sm font-bold text-white mb-3">1. Select Dataset</h2>
                                <label htmlFor="dataset" className="sr-only">
                                    Dataset
                                </label>
                                <select
                                    id="dataset"
                                    {...register("dataset")}
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:border-[#00e5a0] focus:outline-none"
                                >
                                    <option>Employee Master Data</option>
                                    <option>Payroll Register (Monthly)</option>
                                    <option>Time &amp; Attendance Logs</option>
                                    <option>Leave Transactions</option>
                                </select>
                            </div>

                            <div className="p-4 overflow-y-auto">
                                <h2 className="text-sm font-bold text-white mb-3">2. Data Fields</h2>
                                <div className="space-y-4">
                                    {FIELD_GROUPS.map((group) => (
                                        <fieldset key={group.label}>
                                            <legend className="text-xs font-medium text-[#8899AA] uppercase tracking-wider mb-2">
                                                {group.label}
                                            </legend>
                                            <div className="space-y-2">
                                                {group.fields.map((field) => (
                                                    <label
                                                        key={field}
                                                        className="flex items-center gap-3 cursor-pointer group"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            defaultChecked={group.defaultChecked.includes(field)}
                                                            className="rounded text-indigo-500 focus:ring-0 focus:ring-offset-0 bg-[#1A2A3A] border-[#2A3A4A]"
                                                            aria-label={field}
                                                        />
                                                        <span className="text-sm text-white group-hover:text-indigo-400 transition-colors">
                                                            {field}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </fieldset>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Middle: Columns + Filters */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Dynamic columns (useFieldArray) */}
                        <Card padding="lg">
                            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Layers size={16} className="text-indigo-400" aria-hidden="true" />
                                3. Report Columns
                            </h2>

                            {errors.columns && (
                                <p className="text-xs text-pink-400 mb-3" role="alert">
                                    {errors.columns.message ?? errors.columns.root?.message}
                                </p>
                            )}

                            <div className="space-y-3" role="list" aria-label="Report columns">
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        role="listitem"
                                        className="p-3 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg space-y-2"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-medium text-indigo-400">
                                                Column {index + 1}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                type="button"
                                                aria-label={`Remove column ${index + 1}`}
                                                onClick={() => remove(index)}
                                            >
                                                <Trash2 size={12} aria-hidden="true" />
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label
                                                    htmlFor={`col-field-${index}`}
                                                    className="block text-[10px] text-[#8899AA] mb-1"
                                                >
                                                    Field name
                                                </label>
                                                <input
                                                    id={`col-field-${index}`}
                                                    {...register(`columns.${index}.fieldName`)}
                                                    className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-2 py-1.5 text-xs focus:border-[#00e5a0] focus:outline-none"
                                                    aria-invalid={!!errors.columns?.[index]?.fieldName}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`col-label-${index}`}
                                                    className="block text-[10px] text-[#8899AA] mb-1"
                                                >
                                                    Label
                                                </label>
                                                <input
                                                    id={`col-label-${index}`}
                                                    {...register(`columns.${index}.label`)}
                                                    className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-2 py-1.5 text-xs focus:border-[#00e5a0] focus:outline-none"
                                                    aria-invalid={!!errors.columns?.[index]?.label}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label
                                                    htmlFor={`col-type-${index}`}
                                                    className="block text-[10px] text-[#8899AA] mb-1"
                                                >
                                                    Type
                                                </label>
                                                <select
                                                    id={`col-type-${index}`}
                                                    {...register(`columns.${index}.type`)}
                                                    className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-2 py-1.5 text-xs focus:border-[#00e5a0] focus:outline-none"
                                                >
                                                    {FIELD_TYPES.map((t) => (
                                                        <option key={t} value={t}>
                                                            {t}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`col-agg-${index}`}
                                                    className="block text-[10px] text-[#8899AA] mb-1"
                                                >
                                                    Aggregation
                                                </label>
                                                <select
                                                    id={`col-agg-${index}`}
                                                    {...register(`columns.${index}.aggregation`)}
                                                    className="w-full bg-[#0B1221] border border-[#2A3A4A] text-white rounded px-2 py-1.5 text-xs focus:border-[#00e5a0] focus:outline-none"
                                                >
                                                    {AGGREGATIONS.map((a) => (
                                                        <option key={a} value={a}>
                                                            {a}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                className="w-full mt-3"
                                icon={<Plus size={12} aria-hidden="true" />}
                                onClick={() =>
                                    append({
                                        fieldName: "",
                                        label: "",
                                        type: "text",
                                        aggregation: "none",
                                    })
                                }
                            >
                                Add Column
                            </Button>
                        </Card>

                        {/* Filters & Grouping */}
                        <Card padding="lg">
                            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Filter size={16} className="text-emerald-400" aria-hidden="true" />
                                4. Grouping &amp; Sorting
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <label htmlFor="groupBy" className="block text-xs text-[#8899AA] mb-1">
                                        Group By (Rows)
                                    </label>
                                    <select
                                        id="groupBy"
                                        {...register("groupBy")}
                                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded px-2 py-1.5 text-xs focus:border-amber-500 focus:outline-none"
                                    >
                                        <option>Department</option>
                                        <option>Location</option>
                                        <option>None</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="sortBy" className="block text-xs text-[#8899AA] mb-1">
                                        Sort By
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            id="sortBy"
                                            {...register("sortBy")}
                                            className="flex-1 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded px-2 py-1.5 text-xs focus:border-amber-500 focus:outline-none"
                                        >
                                            <option>Employee ID</option>
                                            <option>Date of Join</option>
                                            <option>Full Name</option>
                                        </select>
                                        <label htmlFor="sortDir" className="sr-only">
                                            Sort direction
                                        </label>
                                        <select
                                            id="sortDir"
                                            {...register("sortDir")}
                                            className="w-20 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded px-2 py-1.5 text-xs focus:border-amber-500 focus:outline-none"
                                        >
                                            <option value="ASC">ASC</option>
                                            <option value="DESC">DESC</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right: Preview */}
                    <div className="lg:col-span-5">
                        <Card padding="lg" className="flex flex-col h-full">
                            <div className="flex justify-between items-center mb-4 border-b border-[#1A2A3A] pb-4">
                                <h2 className="text-sm font-bold text-white">5. Live Data Preview</h2>
                                <span className="text-xs font-mono text-[#8899AA] bg-[#1A2A3A] px-2 py-1 rounded">
                                    Showing top 5 rows
                                </span>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-[#1A2A3A] bg-[#0B1221]">
                                <table
                                    className="w-full text-left border-collapse whitespace-nowrap text-sm"
                                    aria-label="Report preview"
                                >
                                    <thead>
                                        <tr className="bg-[#1A2A3A] text-indigo-300 text-xs">
                                            <th scope="col" className="p-3 font-medium border-b border-r border-[#2A3A4A]">
                                                Employee ID
                                            </th>
                                            <th scope="col" className="p-3 font-medium border-b border-r border-[#2A3A4A]">
                                                Full Name
                                            </th>
                                            <th scope="col" className="p-3 font-medium border-b border-r border-[#2A3A4A]">
                                                Department
                                            </th>
                                            <th scope="col" className="p-3 font-medium border-b border-[#2A3A4A]">
                                                Designation
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A] text-[#8899AA]">
                                        {PREVIEW_ROWS.map((row) => (
                                            <tr key={row.id}>
                                                <td className="p-3 border-r border-[#1A2A3A]">{row.id}</td>
                                                <td className="p-3 border-r border-[#1A2A3A]">{row.name}</td>
                                                <td className="p-3 border-r border-[#1A2A3A]">{row.dept}</td>
                                                <td className="p-3">{row.designation}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
            </form>
        </Page>
    );
}
