"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Database } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const customFieldsSchema = z.object({
    bloodGroup: z.string().min(1, "Blood group is required"),
    emergencyContactRelation: z.string().min(1, "Emergency contact relation is required"),
    tShirtSize: z.string().min(1, "T-shirt size is required"),
});

type CustomFieldsForm = z.infer<typeof customFieldsSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const T_SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function CustomFieldsEmployeeFormPage() {
    const toast = useToast();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CustomFieldsForm>({
        resolver: zodResolver(customFieldsSchema),
        defaultValues: {
            bloodGroup: "O+",
            emergencyContactRelation: "Father",
            tShirtSize: "L",
        },
    });

    const onSubmit = async (_data: CustomFieldsForm) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 600));
        toast.show({ variant: "success", title: "Custom fields saved", description: "Employee custom fields have been updated." });
    };

    return (
        <Page
            title="Employee Custom Fields"
            subtitle="Preview how custom fields appear in the employee profile form."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Custom Fields", href: "/settings/custom-fields" },
                { label: "Employee" },
            ]}
            maxWidth="700px"
            actions={
                <Button variant="secondary" href="/settings/custom-fields">← Back</Button>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card padding="lg">
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <label htmlFor="bloodGroup" className="text-xs font-medium text-[#8899AA] flex items-center gap-2">
                                Blood Group <span className="text-red-400">*</span>
                                <span className="ml-auto text-[10px] text-[#445566] bg-[#1A2A3A] px-2 py-0.5 rounded">Dropdown</span>
                            </label>
                            <select
                                id="bloodGroup"
                                {...register("bloodGroup")}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                                aria-invalid={!!errors.bloodGroup}
                                aria-describedby={errors.bloodGroup ? "bloodGroup-error" : undefined}
                            >
                                {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
                            </select>
                            {errors.bloodGroup && (
                                <p id="bloodGroup-error" role="alert" className="text-xs text-red-400">{errors.bloodGroup.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="emergencyContactRelation" className="text-xs font-medium text-[#8899AA] flex items-center gap-2">
                                Emergency Contact Relation <span className="text-red-400">*</span>
                                <span className="ml-auto text-[10px] text-[#445566] bg-[#1A2A3A] px-2 py-0.5 rounded">Text</span>
                            </label>
                            <input
                                id="emergencyContactRelation"
                                type="text"
                                {...register("emergencyContactRelation")}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                                aria-invalid={!!errors.emergencyContactRelation}
                                aria-describedby={errors.emergencyContactRelation ? "ecr-error" : undefined}
                            />
                            {errors.emergencyContactRelation && (
                                <p id="ecr-error" role="alert" className="text-xs text-red-400">{errors.emergencyContactRelation.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="tShirtSize" className="text-xs font-medium text-[#8899AA] flex items-center gap-2">
                                T-Shirt Size
                                <span className="ml-auto text-[10px] text-[#445566] bg-[#1A2A3A] px-2 py-0.5 rounded">Dropdown</span>
                            </label>
                            <select
                                id="tShirtSize"
                                {...register("tShirtSize")}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                            >
                                {T_SHIRT_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </Card>

                <div className="mt-6 flex justify-end">
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        loadingText="Saving…"
                        icon={<Database size={16} aria-hidden="true" />}
                    >
                        Save Fields
                    </Button>
                </div>
            </form>
        </Page>
    );
}
