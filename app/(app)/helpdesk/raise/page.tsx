"use client";

import { useState, type FormEvent } from "react";
import { Server, Lightbulb, PenTool, Paperclip, Send } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

type Category = "IT" | "HR" | "Facilities";

const CATEGORY_OPTIONS: Array<{ id: Category; label: string; icon: typeof Server; color: string }> = [
    { id: "IT", label: "IT Support", icon: Server, color: "#33E6FF" },
    { id: "HR", label: "HR & Benefits", icon: Lightbulb, color: "#9D00FF" },
    { id: "Facilities", label: "Facilities", icon: PenTool, color: "#FFB020" },
];

const ISSUE_TYPES: Record<Category, string[]> = {
    IT: [
        "Hardware Issue / Need Replacement",
        "Software Access / License Request",
        "Network / VPN Connectivity",
        "Other IT Issue",
    ],
    HR: ["Payroll / Salary Inquiry", "Leave Management Query", "Benefits & Insurance"],
    Facilities: ["Desk Setup / Ergonomics", "Office Maintenance", "ID Card Issue"],
};

export default function RaiseTicketPage() {
    const toast = useToast();
    const [category, setCategory] = useState<Category>("IT");
    const [issueType, setIssueType] = useState(ISSUE_TYPES.IT[0]);
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [highPriority, setHighPriority] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const isValid = subject.trim().length >= 5 && description.trim().length >= 10;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        setSubmitting(true);
        try {
            await new Promise((r) => setTimeout(r, 600));
            toast.show({
                variant: "success",
                title: "Ticket raised",
                description: `Your ${category} request has been logged. SLA: 24 hours.`,
            });
            setSubject("");
            setDescription("");
            setHighPriority(false);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Page
            title="Raise a new request"
            subtitle="Provide details so the right helpdesk agents can assist you faster"
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "Raise" },
            ]}
            maxWidth="900px"
        >
            <Card padding="lg">
                <form onSubmit={handleSubmit} className="space-y-8" aria-label="Raise ticket">
                    {/* Step 1: Category */}
                    <fieldset>
                        <legend className="mb-3 block text-sm font-semibold text-[#8899AA]">
                            1. Select request category
                        </legend>
                        <div className="grid gap-4 sm:grid-cols-3">
                            {CATEGORY_OPTIONS.map((opt) => {
                                const active = category === opt.id;
                                const Icon = opt.icon;
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        role="radio"
                                        aria-checked={active}
                                        onClick={() => {
                                            setCategory(opt.id);
                                            setIssueType(ISSUE_TYPES[opt.id][0]);
                                        }}
                                        className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all"
                                        style={{
                                            background: active ? `${opt.color}1A` : "#1A2A3A",
                                            borderColor: active ? opt.color : "#2A3A4A",
                                            color: active ? opt.color : "#8899AA",
                                        }}
                                    >
                                        <Icon size={22} aria-hidden="true" />
                                        <span className="font-semibold">{opt.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>

                    {/* Step 2: Issue type */}
                    <div>
                        <label htmlFor="issue-type" className="mb-2 block text-sm font-semibold text-[#8899AA]">
                            2. Issue type
                        </label>
                        <select
                            id="issue-type"
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            className="w-full rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] px-4 py-3 text-white outline-none transition-colors focus:border-[#00e5a0]"
                        >
                            {ISSUE_TYPES[category].map((t) => (
                                <option key={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    {/* Step 3: Subject */}
                    <div>
                        <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-[#8899AA]">
                            3. Subject / summary <span className="text-[#FF4444]">*</span>
                        </label>
                        <input
                            id="subject"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Briefly state your issue…"
                            required
                            minLength={5}
                            className="w-full rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] px-4 py-3 text-white outline-none transition-colors focus:border-[#00e5a0]"
                        />
                    </div>

                    {/* Step 4: Description */}
                    <div>
                        <label htmlFor="description" className="mb-2 block text-sm font-semibold text-[#8899AA]">
                            4. Detailed description <span className="text-[#FF4444]">*</span>
                        </label>
                        <div className="overflow-hidden rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] transition-colors focus-within:border-[#00e5a0]">
                            <textarea
                                id="description"
                                rows={6}
                                minLength={10}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Provide as much context as possible. Steps to reproduce if it's a bug."
                                required
                                className="min-h-[120px] w-full resize-y bg-transparent p-4 text-white outline-none"
                            />
                            <div className="flex items-center justify-between border-t border-[#2A3A4A] bg-[#0A1420] p-3">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded border border-[#2A3A4A] bg-[#1A2A3A] px-2 py-1 text-sm text-[#8899AA] transition-colors hover:text-[#00e5a0]"
                                >
                                    <Paperclip size={14} aria-hidden="true" /> Attach files
                                </button>
                                <span className="text-xs text-[#445566]">Max total: 10 MB</span>
                            </div>
                        </div>
                    </div>

                    {/* Priority + actions */}
                    <div className="flex flex-col gap-4 border-t border-[#1A2A3A] pt-6 md:flex-row md:items-center md:justify-between">
                        <label className="group flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                checked={highPriority}
                                onChange={(e) => setHighPriority(e.target.checked)}
                                className="h-5 w-5 cursor-pointer rounded accent-[#FF4444]"
                            />
                            <span>
                                <span className="block text-sm font-semibold text-white transition-colors group-hover:text-[#FF4444]">
                                    Mark as high priority
                                </span>
                                <span className="block text-xs text-[#8899AA]">
                                    Use only if work is completely blocked.
                                </span>
                            </span>
                        </label>
                        <div className="flex gap-3">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={submitting}
                                loadingText="Submitting…"
                                disabled={!isValid}
                                icon={<Send size={14} />}
                            >
                                Submit request
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </Page>
    );
}
