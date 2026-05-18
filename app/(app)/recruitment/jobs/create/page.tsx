"use client";

import { useState } from "react";
import { Globe, Eye, Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Schema (Tier 2 form — basic info fields)
// ─────────────────────────────────────────────────────────────────────────────

const createJobSchema = z.object({
    title: z.string().min(3, "Job title must be at least 3 characters"),
    department: z.string().min(1, "Department is required"),
    hiringManager: z.string().min(1, "Hiring manager is required"),
    jobType: z.string().min(1, "Job type is required"),
    workplaceType: z.string().min(1, "Workplace type is required"),
});

type CreateJobValues = z.infer<typeof createJobSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

interface PublishOption {
    name: string;
    desc: string;
    active: boolean;
}

const PUBLISH_OPTIONS: PublishOption[] = [
    { name: "Internal Job Board", desc: "Visible to employees", active: true },
    { name: "Careers Page", desc: "Visible externally", active: true },
    { name: "LinkedIn Jobs", desc: "Auto-syndicate via API", active: false },
    { name: "Naukri.com", desc: "Auto-syndicate via API", active: false },
];

const SKILL_TAGS = ["React.js", "TypeScript", "3+ YOE", "System Design"];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function CreateJobScreen() {
    const toast = useToast();
    const [published, setPublished] = useState(false);

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<CreateJobValues>({
        resolver: zodResolver(createJobSchema),
        defaultValues: {
            title: "",
            department: "Engineering",
            hiringManager: "Priya Nair",
            jobType: "Full-time",
            workplaceType: "Hybrid",
        },
    });

    const onSubmit = async (_data: CreateJobValues) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 1500));
        setPublished(true);
        toast.show({
            variant: "success",
            title: "Job published",
            description: "Your job posting is now live on the careers page.",
        });
    };

    if (published) {
        return (
            <Page
                title="Job Published"
                breadcrumbs={[
                    { label: "Recruitment", href: "/recruitment/dashboard" },
                    { label: "Jobs", href: "/recruitment/jobs" },
                    { label: "Published" },
                ]}
                maxWidth="600px"
            >
                <Card padding="lg" className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#00E5A0]/30 bg-[#00E5A0]/20">
                        <Globe size={28} className="text-[#00E5A0]" aria-hidden="true" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-white">Job Published Successfully!</h2>
                    <p className="mb-6 text-sm text-[#8899AA]">
                        Senior Frontend Engineer role is now live on your careers page and syndicated to
                        LinkedIn &amp; Indeed.
                    </p>
                    <div className="flex justify-center gap-3">
                        <Button variant="secondary">View Live Posting</Button>
                        <Button>Go to Job Pipeline</Button>
                    </div>
                </Card>
            </Page>
        );
    }

    return (
        <Page
            title="Create Job Posting"
            subtitle="Draft a new requisition and publish to job boards"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Jobs", href: "/recruitment/jobs" },
                { label: "Create" },
            ]}
            maxWidth="900px"
            actions={
                <>
                    <Button variant="secondary">Save Draft</Button>
                    <Button
                        icon={isSubmitting ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <Globe size={14} aria-hidden="true" />}
                        isLoading={isSubmitting}
                        loadingText="Publishing…"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Publish Job
                    </Button>
                </>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} aria-label="Create job posting">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Info */}
                        <Card padding="lg">
                            <h3 className="mb-4 text-sm font-semibold text-white">Basic Information</h3>
                            <div className="space-y-4">
                                <FormField
                                    control={control}
                                    name="title"
                                    label="Job Title *"
                                    inputProps={{ placeholder: "e.g. Senior Frontend Engineer" }}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="department" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                            Department *
                                        </label>
                                        <select
                                            id="department"
                                            className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                                        >
                                            <option>Engineering</option>
                                            <option>Sales</option>
                                            <option>Marketing</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="hiring-manager" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                            Hiring Manager *
                                        </label>
                                        <select
                                            id="hiring-manager"
                                            className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                                        >
                                            <option>Priya Nair</option>
                                            <option>Rajesh Kumar</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="job-type" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                            Job Type
                                        </label>
                                        <select
                                            id="job-type"
                                            className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                                        >
                                            <option>Full-time</option>
                                            <option>Contract</option>
                                            <option>Internship</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="workplace-type" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                            Workplace Type
                                        </label>
                                        <select
                                            id="workplace-type"
                                            className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                                        >
                                            <option>Hybrid</option>
                                            <option>On-site</option>
                                            <option>Remote</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Job Description — Tier 3: rich-text fallback */}
                        <Card padding="lg">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-white">Job Description</h3>
                                <Button variant="outline" size="sm">AI Generate ✨</Button>
                            </div>
                            {/* TODO: replace with rich-text editor */}
                            <div className="mb-4 overflow-hidden rounded-xl border border-[#1A2A3A] bg-[#0A1420]">
                                <div className="flex items-center gap-1 border-b border-[#1A2A3A] p-1.5">
                                    {["B", "I", "U", "List", "Link"].map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            className="rounded px-2 py-1 text-xs text-[#8899AA] transition-colors hover:bg-[#1A2A3A]"
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    id="job-description"
                                    aria-label="Job description"
                                    rows={8}
                                    placeholder="Write the job description, responsibilities, and requirements here…"
                                    className="w-full resize-none bg-transparent p-4 text-sm text-white placeholder-[#445566] focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {SKILL_TAGS.map((tag) => (
                                    <div
                                        key={tag}
                                        className="flex items-center gap-1 rounded-lg bg-[#1A2A3A] px-2.5 py-1.5 text-xs text-white"
                                    >
                                        {tag}{" "}
                                        <button
                                            type="button"
                                            aria-label={`Remove ${tag} tag`}
                                            className="ml-1 text-[#8899AA] hover:text-[#FF4444]"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    icon={<Plus size={12} aria-hidden="true" />}
                                >
                                    Add Skill Tag
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        {/* Publishing options */}
                        <Card padding="lg">
                            <h3 className="mb-4 text-sm font-semibold text-white">Publishing options</h3>
                            <div className="space-y-4">
                                {PUBLISH_OPTIONS.map((opt) => (
                                    <div key={opt.name} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-white">{opt.name}</p>
                                            <p className="text-[10px] text-[#445566]">{opt.desc}</p>
                                        </div>
                                        <div
                                            className={`flex h-5 w-9 cursor-pointer items-center rounded-full px-0.5 transition-colors ${
                                                opt.active ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"
                                            }`}
                                            role="switch"
                                            aria-checked={opt.active}
                                            aria-label={opt.name}
                                        >
                                            <div
                                                className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                                                    opt.active ? "translate-x-4" : "translate-x-0"
                                                }`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Preview widget */}
                        <Card padding="lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A2A3A]">
                                <Eye size={20} className="text-[#8899AA]" aria-hidden="true" />
                            </div>
                            <h4 className="mb-2 font-bold text-white">How it looks</h4>
                            <p className="mb-4 text-xs text-[#8899AA]">
                                Preview the job posting exactly as candidates will see it across different
                                platforms.
                            </p>
                            <Button variant="outline" size="sm" className="w-full justify-center">
                                Open Preview
                            </Button>
                        </Card>
                    </div>
                </div>
            </form>
        </Page>
    );
}
