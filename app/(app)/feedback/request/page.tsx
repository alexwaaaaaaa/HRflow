"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, Trash2, Send } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ──────────────────────────────────────────────────────────────────

const requestSchema = z.object({
    from: z.string().min(1, "Select at least one reviewer"),
    message: z.string().min(5, "Message must be at least 5 characters"),
    dueDate: z.string().min(1, "Due date is required"),
});

type RequestFormValues = z.infer<typeof requestSchema>;

// ─── Static data ─────────────────────────────────────────────────────────────

interface Employee {
    name: string;
    role: string;
    dept: string;
    avatar: string;
}

const EMPLOYEES: Employee[] = [
    { name: "Ravi Kumar", role: "Eng Lead", dept: "Engineering", avatar: "RK" },
    { name: "Sneha Rao", role: "PM", dept: "Product", avatar: "SR" },
    { name: "Arjun Singh", role: "Marketing Head", dept: "Marketing", avatar: "AS" },
    { name: "Kavita Joshi", role: "HR Manager", dept: "HR", avatar: "KJ" },
    { name: "Rahul Gupta", role: "Ops Lead", dept: "Operations", avatar: "RG" },
    { name: "Nidhi Sharma", role: "Finance Lead", dept: "Finance", avatar: "NS" },
];

const TEMPLATES = [
    "360 Mid-Year Review",
    "Leadership Assessment",
    "Peer Review",
    "Manager Review",
    "Custom",
] as const;

type ReviewerType = "peer" | "manager" | "reportee";

interface Reviewer extends Employee {
    type: ReviewerType;
}

const TYPE_VARIANT: Record<ReviewerType, "info" | "success" | "warning"> = {
    peer: "info",
    manager: "success",
    reportee: "warning",
};

const TYPE_BUTTON_CLASS: Record<ReviewerType, string> = {
    peer: "text-[#0066FF] border-[#0066FF]/40 bg-[#0066FF]/10 hover:bg-[#0066FF]/20",
    manager: "text-[#00E5A0] border-[#00E5A0]/40 bg-[#00E5A0]/10 hover:bg-[#00E5A0]/20",
    reportee: "text-[#FFB800] border-[#FFB800]/40 bg-[#FFB800]/10 hover:bg-[#FFB800]/20",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RequestFeedbackPage() {
    const toast = useToast();
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Reviewer[]>([]);
    const [template, setTemplate] = useState<string>(TEMPLATES[0]);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RequestFormValues>({
        resolver: zodResolver(requestSchema),
        defaultValues: {
            from: "",
            message: "",
            dueDate: "2025-03-20",
        },
    });

    const filtered = EMPLOYEES.filter(
        (e) =>
            e.name.toLowerCase().includes(search.toLowerCase()) &&
            !selected.find((s) => s.name === e.name)
    );

    const addReviewer = (emp: Employee, type: ReviewerType) => {
        setSelected((prev) => [...prev, { ...emp, type }]);
        setSearch("");
    };

    const removeReviewer = (name: string) =>
        setSelected((prev) => prev.filter((s) => s.name !== name));

    const onSubmit = async (_data: RequestFormValues) => {
        if (selected.length === 0) {
            toast.show({ variant: "danger", title: "No reviewers selected", description: "Add at least one reviewer." });
            return;
        }
        setSubmitting(true);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 1500));
            toast.show({
                variant: "success",
                title: "Requests sent",
                description: `Feedback requests sent to ${selected.length} reviewer${selected.length > 1 ? "s" : ""}.`,
            });
            setSelected([]);
            reset();
        } catch {
            toast.show({ variant: "danger", title: "Failed to send", description: "Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Page
            title="Request 360° Feedback"
            subtitle="Select reviewers and configure your feedback request"
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "Request Feedback" },
            ]}
            maxWidth="800px"
            actions={
                <Button
                    icon={<Send size={14} />}
                    disabled={selected.length === 0}
                    isLoading={submitting}
                    loadingText="Sending…"
                    type="submit"
                    form="request-form"
                >
                    Send Requests ({selected.length})
                </Button>
            }
        >
            <form id="request-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                {/* Template + Due Date */}
                <Card padding="lg">
                    <h2 className="text-base font-semibold text-white mb-4">Request Configuration</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="feedback-template"
                                className="block text-xs font-semibold text-[#8899AA] mb-1.5"
                            >
                                Feedback Template
                            </label>
                            <select
                                id="feedback-template"
                                value={template}
                                onChange={(e) => setTemplate(e.target.value)}
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#9D00FF] appearance-none cursor-pointer"
                            >
                                {TEMPLATES.map((t) => (
                                    <option key={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="due-date"
                                className="block text-xs font-semibold text-[#8899AA] mb-1.5"
                            >
                                Due Date
                            </label>
                            <input
                                id="due-date"
                                type="date"
                                {...register("dueDate")}
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#9D00FF] [color-scheme:dark]"
                            />
                            {errors.dueDate && (
                                <p className="mt-1 text-xs text-[#FF4444]" role="alert">
                                    {errors.dueDate.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Message */}
                    <div className="mt-4">
                        <label
                            htmlFor="request-message"
                            className="block text-xs font-semibold text-[#8899AA] mb-1.5"
                        >
                            Message to Reviewers
                        </label>
                        <textarea
                            id="request-message"
                            rows={3}
                            {...register("message")}
                            placeholder="Add a personal note to your reviewers…"
                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF] resize-none"
                        />
                        {errors.message && (
                            <p className="mt-1 text-xs text-[#FF4444]" role="alert">
                                {errors.message.message}
                            </p>
                        )}
                    </div>
                </Card>

                {/* Selected Reviewers */}
                {selected.length > 0 && (
                    <Card padding="md">
                        <h2 className="text-sm font-semibold text-white mb-3">
                            Selected Reviewers ({selected.length})
                        </h2>
                        <ul role="list" className="space-y-2">
                            {selected.map((r) => (
                                <li
                                    key={r.name}
                                    className="flex items-center gap-3 bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3"
                                >
                                    <div
                                        className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA]"
                                        aria-hidden="true"
                                    >
                                        {r.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white">{r.name}</p>
                                        <p className="text-[11px] text-[#8899AA]">
                                            {r.role} · {r.dept}
                                        </p>
                                    </div>
                                    <Badge variant={TYPE_VARIANT[r.type]}>{r.type}</Badge>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        icon={<Trash2 size={14} />}
                                        aria-label={`Remove ${r.name}`}
                                        onClick={() => removeReviewer(r.name)}
                                        type="button"
                                    />
                                </li>
                            ))}
                        </ul>
                    </Card>
                )}

                {/* Add Reviewers */}
                <Card padding="md">
                    <h2 className="text-sm font-semibold text-white mb-3">Add Reviewers</h2>
                    <div className="relative mb-3">
                        <Search
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]"
                            aria-hidden="true"
                        />
                        <label htmlFor="reviewer-search" className="sr-only">
                            Search employees
                        </label>
                        <input
                            id="reviewer-search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search employees to add…"
                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#9D00FF]"
                        />
                    </div>
                    <ul role="list" className="space-y-2">
                        {filtered.map((emp) => (
                            <li
                                key={emp.name}
                                className="flex items-center gap-3 bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3"
                            >
                                <div
                                    className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA]"
                                    aria-hidden="true"
                                >
                                    {emp.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white">{emp.name}</p>
                                    <p className="text-[11px] text-[#8899AA]">
                                        {emp.role} · {emp.dept}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    {(["peer", "manager", "reportee"] as const).map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => addReviewer(emp, t)}
                                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border capitalize transition-colors ${TYPE_BUTTON_CLASS[t]}`}
                                            aria-label={`Add ${emp.name} as ${t}`}
                                        >
                                            + {t}
                                        </button>
                                    ))}
                                </div>
                            </li>
                        ))}
                        {filtered.length === 0 && search.length > 0 && (
                            <li className="text-center py-4 text-xs text-[#445566]">
                                No employees found for &ldquo;{search}&rdquo;
                            </li>
                        )}
                    </ul>
                </Card>
            </form>
        </Page>
    );
}
