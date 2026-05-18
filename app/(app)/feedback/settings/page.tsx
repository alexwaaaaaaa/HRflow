"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Settings, Save, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SettingsToggle, SettingsSelect } from "@/components/ui/PolicyForm";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ──────────────────────────────────────────────────────────────────

const settingsSchema = z.object({
    reviewType: z.string().min(1),
    anonymity: z.string().min(1),
    minReviewers: z.string().min(1),
    selfReview: z.boolean(),
    managerApproval: z.boolean(),
    publicKudos: z.boolean(),
    continuousFeedback: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

// ─── Static data ─────────────────────────────────────────────────────────────

const REVIEW_TYPES = [
    "360 Mid-Year",
    "360 Annual",
    "Peer Review Only",
    "Manager Review Only",
    "Self Assessment",
];

const ANONYMITY_OPTIONS = [
    "Full Anonymity",
    "Attribute Reviewer Type Only",
    "No Anonymity",
];

const MIN_REVIEWERS = ["2", "3", "4", "5"];

const PURPLE = "#9D00FF";

interface PermissionRow {
    action: string;
    employee: boolean;
    manager: boolean;
    hr: boolean;
}

const PERMISSIONS: PermissionRow[] = [
    { action: "Request Feedback", employee: true, manager: true, hr: true },
    { action: "Give Feedback", employee: true, manager: true, hr: true },
    { action: "View Own 360 Report", employee: true, manager: true, hr: true },
    { action: "View Others' Reports", employee: false, manager: true, hr: true },
    { action: "Create Feedback Cycle", employee: false, manager: false, hr: true },
    { action: "Manage Kudos", employee: true, manager: true, hr: true },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedbackSettingsPage() {
    const toast = useToast();
    const [submitting, setSubmitting] = useState(false);

    const { control, handleSubmit } = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            reviewType: REVIEW_TYPES[0],
            anonymity: ANONYMITY_OPTIONS[0],
            minReviewers: "3",
            selfReview: true,
            managerApproval: true,
            publicKudos: true,
            continuousFeedback: true,
        },
    });

    const onSubmit = async (_data: SettingsFormValues) => {
        setSubmitting(true);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 1500));
            toast.show({
                variant: "success",
                title: "Settings saved",
                description: "360° feedback configuration updated successfully.",
            });
        } catch {
            toast.show({
                variant: "danger",
                title: "Save failed",
                description: "Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Page
            title="360° Feedback Settings"
            subtitle="Configure feedback cycles, anonymity, and feature toggles"
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "Settings" },
            ]}
            maxWidth="800px"
            actions={
                <Button
                    icon={<Save size={14} />}
                    type="submit"
                    form="feedback-settings-form"
                    isLoading={submitting}
                    loadingText="Saving…"
                >
                    Save Settings
                </Button>
            }
        >
            <form id="feedback-settings-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                {/* Review Configuration */}
                <Card padding="lg">
                    <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white">
                        <Settings size={15} className="text-[#9D00FF]" aria-hidden="true" />
                        Review Configuration
                    </h2>
                    <p className="mb-4 text-xs text-[#8899AA]">
                        Define how feedback cycles are structured.
                    </p>
                    <Controller
                        control={control}
                        name="reviewType"
                        render={({ field }) => (
                            <SettingsSelect
                                id="default-review-type"
                                label="Default Review Type"
                                value={field.value}
                                options={REVIEW_TYPES}
                                onChange={field.onChange}
                                accent={PURPLE}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="anonymity"
                        render={({ field }) => (
                            <SettingsSelect
                                id="anonymity-setting"
                                label="Reviewer Anonymity"
                                desc="Controls whether reviewer identity is visible to the recipient."
                                value={field.value}
                                options={ANONYMITY_OPTIONS}
                                onChange={field.onChange}
                                accent={PURPLE}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="minReviewers"
                        render={({ field }) => (
                            <SettingsSelect
                                id="min-reviewers"
                                label="Minimum Reviewers Required"
                                value={field.value}
                                options={MIN_REVIEWERS}
                                onChange={field.onChange}
                                accent={PURPLE}
                            />
                        )}
                    />
                </Card>

                {/* Feature Toggles */}
                <Card padding="lg">
                    <h2 className="mb-1 text-base font-semibold text-white">Feature Toggles</h2>
                    <p className="mb-4 text-xs text-[#8899AA]">
                        Enable or disable feedback features organization-wide.
                    </p>
                    <Controller
                        control={control}
                        name="selfReview"
                        render={({ field }) => (
                            <SettingsToggle
                                id="self-review"
                                label="Self-Assessment"
                                desc="Allow employees to rate themselves during 360 cycles"
                                on={field.value}
                                onChange={field.onChange}
                                accent={PURPLE}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="managerApproval"
                        render={({ field }) => (
                            <SettingsToggle
                                id="manager-approval"
                                label="Manager Reviewer Approval"
                                desc="Manager must approve reviewer list before cycle begins"
                                on={field.value}
                                onChange={field.onChange}
                                accent={PURPLE}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="publicKudos"
                        render={({ field }) => (
                            <SettingsToggle
                                id="public-kudos"
                                label="Public Kudos Wall"
                                desc="Make kudos visible to all employees"
                                on={field.value}
                                onChange={field.onChange}
                                accent={PURPLE}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="continuousFeedback"
                        render={({ field }) => (
                            <SettingsToggle
                                id="continuous-feedback"
                                label="Continuous Feedback"
                                desc="Allow employees to give/receive feedback outside formal cycles"
                                on={field.value}
                                onChange={field.onChange}
                                accent={PURPLE}
                            />
                        )}
                    />
                </Card>

                {/* Role Permissions */}
                <Card padding="none">
                    <div className="px-6 py-4 border-b border-[#1A2A3A]">
                        <h2 className="text-base font-semibold text-white">Role Permissions</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm" aria-label="360 Feedback permissions by role">
                            <thead>
                                <tr className="border-b border-[#1A2A3A] text-xs uppercase tracking-wider text-[#8899AA]">
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Action
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Employee
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Manager
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        HR Admin
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {PERMISSIONS.map((row) => (
                                    <tr
                                        key={row.action}
                                        className="transition-colors hover:bg-[#152336]"
                                    >
                                        <td className="px-6 py-3 text-white">{row.action}</td>
                                        <td className="px-6 py-3 text-center">
                                            {row.employee ? (
                                                <Badge variant="success">
                                                    <CheckCircle2 size={10} className="inline mr-1" aria-hidden="true" />
                                                    Yes
                                                </Badge>
                                            ) : (
                                                <span className="text-[#445566]">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            {row.manager ? (
                                                <Badge variant="success">
                                                    <CheckCircle2 size={10} className="inline mr-1" aria-hidden="true" />
                                                    Yes
                                                </Badge>
                                            ) : (
                                                <span className="text-[#445566]">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            {row.hr ? (
                                                <Badge variant="success">
                                                    <CheckCircle2 size={10} className="inline mr-1" aria-hidden="true" />
                                                    Yes
                                                </Badge>
                                            ) : (
                                                <span className="text-[#445566]">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </form>
        </Page>
    );
}
