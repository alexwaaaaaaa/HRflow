"use client";

import { UserPlus, Gift, TrendingUp, UploadCloud, CheckCircle2, Clock, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import FormField from "@/components/ui/FormField";
import DataTable, { type Column } from "@/components/ui/DataTable";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Schema (Tier 2 form)
// ─────────────────────────────────────────────────────────────────────────────

const referralSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email required"),
    jobId: z.string().min(1, "Please select a job"),
    relationship: z.string().optional(),
});

type ReferralValues = z.infer<typeof referralSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

type ReferralStatus = "pending" | "paid";
type ReferralStage = "Interview" | "Hired" | "Screening";

interface Referral {
    id: number;
    name: string;
    role: string;
    stage: ReferralStage;
    date: string;
    bonus: string;
    status: ReferralStatus;
}

const MY_REFERRALS: Referral[] = [
    { id: 1, name: "Sneha Reddy", role: "Product Manager", stage: "Interview", date: "12 Mar 2025", bonus: "₹ 50,000", status: "pending" },
    { id: 2, name: "Karan Johar", role: "UX Designer", stage: "Hired", date: "01 Feb 2025", bonus: "₹ 40,000", status: "paid" },
    { id: 3, name: "Varun Dhawan", role: "Backend Engineer", stage: "Screening", date: "15 Mar 2025", bonus: "₹ 50,000", status: "pending" },
];

const STAGE_VARIANT: Record<ReferralStage, "purple" | "success" | "info"> = {
    Interview: "purple",
    Hired: "success",
    Screening: "info",
};

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function ReferralNameCell({ row }: { row: Referral }) {
    return (
        <div className="flex items-center gap-3">
            <div
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2A3A] text-sm font-bold text-white"
            >
                {row.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
                <p className="font-bold text-white">{row.name}</p>
                <p className="text-xs text-[#8899AA]">{row.role}</p>
            </div>
        </div>
    );
}

function ReferralStatusCell({ row }: { row: Referral }) {
    if (row.status === "paid") {
        return (
            <div className="flex items-center gap-1.5 rounded-lg bg-[#00E5A0]/10 px-3 py-1.5 text-xs font-bold text-[#00E5A0]">
                <CheckCircle2 size={14} aria-hidden="true" /> Bonus Paid
            </div>
        );
    }
    if (row.stage === "Hired") {
        return (
            <div className="flex items-center gap-1.5 rounded-lg bg-[#FFB800]/10 px-3 py-1.5 text-xs font-bold text-[#FFB800]">
                <Clock size={14} aria-hidden="true" /> Pending (90-day)
            </div>
        );
    }
    return <Badge variant="neutral">In Progress</Badge>;
}

const COLUMNS: Column<Referral>[] = [
    {
        key: "name",
        label: "Candidate",
        render: (r) => <ReferralNameCell row={r} />,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "stage",
        label: "Stage",
        align: "center",
        render: (r) => <Badge variant={STAGE_VARIANT[r.stage]}>{r.stage}</Badge>,
    },
    {
        key: "bonus",
        label: "Potential Bonus",
        align: "right",
        render: (r) => <span className="font-bold text-[#00E5A0]">{r.bonus}</span>,
    },
    {
        key: "status",
        label: "Bonus Status",
        align: "right",
        render: (r) => <ReferralStatusCell row={r} />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function EmployeeReferralPortal() {
    const toast = useToast();

    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<ReferralValues>({
        resolver: zodResolver(referralSchema),
        defaultValues: { firstName: "", lastName: "", email: "", jobId: "", relationship: "" },
    });

    const onSubmit = async (_data: ReferralValues) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 1000));
        toast.show({
            variant: "success",
            title: "Referral submitted",
            description: "Your referral has been submitted successfully.",
        });
        reset();
    };

    return (
        <Page
            title="Employee Referral Portal"
            subtitle="Refer great talent, help us grow, and earn rewards!"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Referrals" },
            ]}
            maxWidth="1200px"
        >






            {/* Quick Stats */}
            <dl className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card padding="lg" className="relative overflow-hidden bg-gradient-to-br from-[#0066FF] to-[#0A1420]">
                    <UserPlus
                        size={48}
                        className="absolute -bottom-2 -right-2 text-white/5 transition-transform group-hover:scale-110"
                        aria-hidden="true"
                    />
                    <dt className="mb-2 text-sm font-medium text-white/80">Total Referrals</dt>
                    <dd className="text-4xl font-black text-white">8</dd>
                </Card>
                <Card padding="lg" className="relative overflow-hidden bg-gradient-to-br from-[#00E5A0] to-[#0A1420]">
                    <TrendingUp
                        size={48}
                        className="absolute -bottom-2 -right-2 text-[#060B14]/10"
                        aria-hidden="true"
                    />
                    <dt className="mb-2 text-sm font-medium text-[#060B14]/70">Successful Hires</dt>
                    <dd className="text-4xl font-black text-[#060B14]">2</dd>
                </Card>
                <Card padding="lg" className="relative overflow-hidden bg-gradient-to-br from-[#FFB800] to-[#0A1420]">
                    <Gift
                        size={48}
                        className="absolute -bottom-2 -right-2 text-[#060B14]/10"
                        aria-hidden="true"
                    />
                    <dt className="mb-2 text-sm font-medium text-[#060B14]/70">Total Bonus Earned</dt>
                    <dd className="text-4xl font-black text-[#060B14]">₹ 80,000</dd>
                </Card>
            </dl>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Submit New Referral Form */}
                <Card padding="lg">
                    <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
                        <Plus size={20} className="text-[#00E5A0]" aria-hidden="true" /> Submit a New Referral
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} aria-label="Submit referral" className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={control} name="firstName" label="First Name" />
                            <FormField control={control} name="lastName" label="Last Name" />
                        </div>
                        <FormField
                            control={control}
                            name="email"
                            label="Email Address"
                            inputProps={{ type: "email" }}
                        />
                        <div>
                            <label htmlFor="job-select" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                Applying For (Select Job)
                            </label>
                            <select
                                id="job-select"
                                className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-3 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                            >
                                <option value="">Select a job…</option>
                                <option>Senior Frontend Engineer (₹ 50,000 Bonus)</option>
                                <option>Product Marketing Manager (₹ 40,000 Bonus)</option>
                                <option>Backend DevOps Lead (₹ 75,000 Bonus)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="resume-upload" className="mb-1.5 block text-xs font-medium text-[#8899AA]">
                                Upload Resume
                            </label>
                            <label
                                htmlFor="resume-upload"
                                className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#1A2A3A] bg-[#060B14] transition-colors hover:border-[#0066FF]"
                            >
                                <UploadCloud size={20} className="mb-2 text-[#445566]" aria-hidden="true" />
                                <span className="text-xs font-medium text-[#8899AA]">
                                    Drag &amp; Drop or Browse (PDF, DOCX)
                                </span>
                                <input id="resume-upload" type="file" accept=".pdf,.docx" className="sr-only" />
                            </label>
                        </div>
                        <FormField
                            control={control}
                            name="relationship"
                            label="How do you know them? (Optional)"
                            inputProps={{ placeholder: "e.g. Former colleague, friend…" }}
                        />
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            loadingText="Submitting…"
                            className="mt-2 w-full justify-center"
                        >
                            Submit Referral
                        </Button>
                    </form>
                </Card>

                {/* My Referrals Tracking */}
                <Card padding="none">
                    <div className="border-b border-[#1A2A3A] p-4">
                        <h3 className="font-bold text-lg text-white">My Referrals</h3>
                    </div>
                    <DataTable<Referral>
                        data={MY_REFERRALS}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search referrals…"
                        aria-label="My referrals"
                        emptyTitle="No referrals yet"
                        emptyDescription="Submit your first referral using the form on the left."
                    />
                </Card>
            </div>
        

        

        

        </Page>
    );
}
