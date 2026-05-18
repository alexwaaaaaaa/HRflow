"use client";

import { Settings, Save, Check } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Schema (Tier 2 form — 4–10 fields)
// ─────────────────────────────────────────────────────────────────────────────

const okrSettingsSchema = z.object({
    checkinCadence: z.enum(["Weekly", "Bi-weekly", "Monthly"]),
    scoringScale: z.enum(["0–100%", "Milestones", "Binary (Done/Not Done)"]),
    defaultVisibility: z.enum(["Everyone", "Managers Only", "Owner Only"]),
    checkinReminders: z.boolean(),
    cascadingEnabled: z.boolean(),
    autoClose: z.boolean(),
    cycleStartMonth: z.string().min(1, "Cycle start month is required"),
    maxKeyResults: z.string().min(1, "Max key results is required"),
});

type OkrSettingsValues = z.infer<typeof okrSettingsSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const CADENCES = ["Weekly", "Bi-weekly", "Monthly"] as const;
const SCALES = ["0–100%", "Milestones", "Binary (Done/Not Done)"] as const;
const VISIBILITIES = ["Everyone", "Managers Only", "Owner Only"] as const;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;
const MAX_KR_OPTIONS = ["3", "5", "7", "10"] as const;

const PERMISSIONS: ReadonlyArray<readonly [string, boolean, boolean, boolean]> = [
    ["Create OKRs", true, true, true],
    ["Edit OKRs", true, true, true],
    ["Delete OKRs", false, true, true],
    ["Approve OKRs", false, true, true],
    ["View All Dept OKRs", false, false, true],
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function ToggleRow({
    id,
    label,
    checked,
    onChange,
}: {
    id: string;
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-[#1A2A3A] last:border-b-0">
            <label htmlFor={id} className="text-sm text-white cursor-pointer">{label}</label>
            <button
                type="button"
                id={id}
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] ${
                    checked ? "bg-[#00e5a0]" : "bg-[#1A2A3A]"
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        checked ? "translate-x-6" : "translate-x-1"
                    }`}
                />
            </button>
        </div>
    );
}

function SelectRow({
    id,
    label,
    value,
    options,
    onChange,
}: {
    id: string;
    label: string;
    value: string;
    options: readonly string[];
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-[#1A2A3A] last:border-b-0">
            <label htmlFor={id} className="text-sm text-white">{label}</label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-[#0A1420] border border-[#1A2A3A] text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00e5a0] appearance-none cursor-pointer min-w-[160px]"
            >
                {options.map((o) => <option key={o}>{o}</option>)}
            </select>
        </div>
    );
}

function PermissionCell({ allowed }: { allowed: boolean }) {
    if (allowed) {
        return (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#00E5A0]/10" aria-label="Allowed">
                <Check size={12} className="text-[#00E5A0]" aria-hidden="true" />
            </span>
        );
    }
    return <span className="text-[#445566] text-sm" aria-label="Not allowed">—</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OKRSettingsPage() {
    const toast = useToast();

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<OkrSettingsValues>({
        resolver: zodResolver(okrSettingsSchema),
        defaultValues: {
            checkinCadence: "Weekly",
            scoringScale: "0–100%",
            defaultVisibility: "Everyone",
            checkinReminders: true,
            cascadingEnabled: true,
            autoClose: true,
            cycleStartMonth: "January",
            maxKeyResults: "5",
        },
    });

    const onSubmit = async (_data: OkrSettingsValues) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 1000));
        toast.show({
            variant: "success",
            title: "Settings saved",
            description: "OKR settings have been updated successfully.",
        });
    };

    return (
        <Page
            title="OKR Settings"
            subtitle="Configure OKR cycles, scoring, and permissions"
            breadcrumbs={[
                { label: "OKRs", href: "/okr/dashboard" },
                { label: "Settings" },
            ]}
            maxWidth="800px"
            actions={
                <Button
                    type="submit"
                    form="okr-settings-form"
                    isLoading={isSubmitting}
                    loadingText="Saving…"
                    icon={<Save size={14} />





}
                >
                    Save Settings
                </Button>
            }
        >
            <form id="okr-settings-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

                {/* Cycle Configuration */}
                <Card padding="lg">
                    <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white" id="cycle-config-heading">
                        <Settings size={16} className="text-[#00E5A0]" aria-hidden="true" /> Cycle Configuration
                    </h2>
                    <p className="mb-4 text-xs text-[#8899AA]">
                        Control how OKR cycles are managed across the organization.
                    </p>

                    <Controller
                        control={control}
                        name="checkinCadence"
                        render={({ field }) => (
                            <SelectRow
                                id="checkin-cadence"
                                label="Check-in Cadence"
                                value={field.value}
                                options={CADENCES}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="scoringScale"
                        render={({ field }) => (
                            <SelectRow
                                id="scoring-scale"
                                label="Scoring Scale"
                                value={field.value}
                                options={SCALES}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="defaultVisibility"
                        render={({ field }) => (
                            <SelectRow
                                id="okr-visibility"
                                label="Default Visibility"
                                value={field.value}
                                options={VISIBILITIES}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="cycleStartMonth"
                        render={({ field }) => (
                            <SelectRow
                                id="cycle-start-month"
                                label="Cycle Start Month"
                                value={field.value}
                                options={MONTHS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="maxKeyResults"
                        render={({ field }) => (
                            <SelectRow
                                id="max-key-results"
                                label="Max Key Results per Objective"
                                value={field.value}
                                options={MAX_KR_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </Card>

                {/* Behavior Settings */}
                <Card padding="lg">
                    <h2 className="mb-1 text-base font-semibold text-white" id="behavior-heading">
                        Behavior Settings
                    </h2>
                    <p className="mb-4 text-xs text-[#8899AA]">
                        Automation and notification preferences.
                    </p>

                    <Controller
                        control={control}
                        name="checkinReminders"
                        render={({ field }) => (
                            <ToggleRow
                                id="checkin-reminders"
                                label="Send check-in reminders to OKR owners"
                                checked={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="cascadingEnabled"
                        render={({ field }) => (
                            <ToggleRow
                                id="cascading-enabled"
                                label="Enable cascading alignment from Company → Dept → Team"
                                checked={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="autoClose"
                        render={({ field }) => (
                            <ToggleRow
                                id="auto-close"
                                label="Auto-close OKRs at end of cycle with final score"
                                checked={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </Card>

                {/* Permissions */}
                <Card padding="lg">
                    <h2 className="mb-4 text-base font-semibold text-white" id="permissions-heading">
                        Permissions
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm" aria-label="OKR permissions by role">
                            <thead>
                                <tr className="border-b border-[#1A2A3A] text-xs uppercase tracking-wider text-[#8899AA]">
                                    <th scope="col" className="py-2 text-left">Action</th>
                                    <th scope="col" className="py-2 text-center">Employee</th>
                                    <th scope="col" className="py-2 text-center">Manager</th>
                                    <th scope="col" className="py-2 text-center">HR Admin</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {PERMISSIONS.map(([action, emp, mgr, hr]) => (
                                    <tr key={action} className="transition-colors hover:bg-[#152336]">
                                        <td className="py-3 text-white">{action}</td>
                                        <td className="py-3 text-center"><PermissionCell allowed={emp} /></td>
                                        <td className="py-3 text-center"><PermissionCell allowed={mgr} /></td>
                                        <td className="py-3 text-center"><PermissionCell allowed={hr} /></td>
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
