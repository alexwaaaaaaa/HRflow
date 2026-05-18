"use client";

import { useState } from "react";
import { Plus, Filter, Edit3, Trash2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

type Difficulty = "Easy" | "Medium" | "Hard";

interface Question {
    id: number;
    title: string;
    cat: string;
    hard: Difficulty;
    used: number;
}

const DIFF_VARIANT: Record<Difficulty, "success" | "warning" | "danger"> = {
    Easy: "success",
    Medium: "warning",
    Hard: "danger",
};

const CATEGORIES = ["React", "System Design", "Behavioral", "Algorithms", "Leadership"];

const QUESTIONS: Question[] = [
    { id: 1, title: "Explain the Virtual DOM and Reconciliation process in React.", cat: "React", hard: "Medium", used: 145 },
    { id: 2, title: "Design a URL shortener service like Bitly.", cat: "System Design", hard: "Hard", used: 89 },
    { id: 3, title: "Tell me about a time you failed and how you handled it.", cat: "Behavioral", hard: "Easy", used: 312 },
    { id: 4, title: "How do you manage cross-team dependencies and resolve technical disagreements?", cat: "Leadership", hard: "Medium", used: 45 },
    { id: 5, title: "Reverse a linked list in O(1) space complexity.", cat: "Algorithms", hard: "Medium", used: 210 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function ActionsCell({ row }: { row: Question }) {
    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                variant="ghost"
                size="sm"
                icon={<Edit3 size={14} aria-hidden="true" />}
                aria-label={`Edit question: ${row.title}`}
            />
            <Button
                variant="danger"
                size="sm"
                icon={<Trash2 size={14} aria-hidden="true" />}
                aria-label={`Delete question: ${row.title}`}
            />
        </div>
    );
}

const COLUMNS: Column<Question>[] = [
    {
        key: "title",
        label: "Question",
        render: (q) => <p className="font-medium text-white">{q.title}</p>,
        sortable: true,
        sortValue: (q) => q.title,
    },
    {
        key: "cat",
        label: "Category",
        render: (q) => (
            <span className="rounded bg-[#1A2A3A] px-2.5 py-1 text-xs text-white">{q.cat}</span>
        ),
        hideOnMobile: true,
    },
    {
        key: "hard",
        label: "Difficulty",
        align: "center",
        render: (q) => <Badge variant={DIFF_VARIANT[q.hard]}>{q.hard}</Badge>,
    },
    {
        key: "used",
        label: "Usage Count",
        align: "center",
        render: (q) => <span className="text-xs font-semibold text-white">{q.used} times</span>,
        sortable: true,
        sortValue: (q) => q.used,
        hideOnMobile: true,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (q) => <ActionsCell row={q} />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function InterviewQuestionBank() {
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const filtered =
        activeCategory === "All"
            ? QUESTIONS
            : QUESTIONS.filter((q) => q.cat === activeCategory);

    return (
        <Page
            title="Interview Question Bank"
            subtitle="Standardize interviews with a centralized repository of approved questions"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Interviews", href: "/recruitment/interviews" },
                { label: "Question Bank" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={14} aria-hidden="true" />}>Add Question</Button>
            }
        >
            {/* Category filters */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
                <div
                    role="tablist"
                    aria-label="Filter by category"
                    className="flex flex-wrap gap-2"
                >
                    {["All", ...CATEGORIES].map((c) => {
                        const active = activeCategory === c;
                        return (
                            <button
                                key={c}
                                role="tab"
                                aria-selected={active}
                                onClick={() => setActiveCategory(c)}
                                className={`h-10 rounded-xl border px-4 text-xs font-semibold transition-all ${
                                    active
                                        ? "border-[#0066FF] bg-[#0066FF] text-white"
                                        : "border-[#1A2A3A] bg-[#0D1928] text-[#8899AA] hover:border-[#2A3A4A]"
                                }`}
                            >
                                {c}
                            </button>
                        );
                    })}
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    icon={<Filter size={14} aria-hidden="true" />}
                    className="ml-auto"
                >
                    Filters
                </Button>
            </div>

            <Card padding="none">
                <DataTable<Question>
                    data={filtered}
                    columns={COLUMNS}
                    rowKey={(q) => q.id}
                    searchable
                    searchPlaceholder="Search questions…"
                    aria-label="Interview question bank"
                    emptyTitle="No questions found"
                    emptyDescription="No questions match your current filters."
                />
            </Card>
        </Page>
    );
}
