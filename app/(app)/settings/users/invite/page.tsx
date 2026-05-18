"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Plus, Send, Shield, Trash2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const inviteSchema = z.object({
    invites: z.array(
        z.object({
            email: z.string().min(1, "Email is required"),
            role: z.string().min(1, "Role is required"),
        })
    ).min(1),
});

type InviteForm = z.infer<typeof inviteSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const ROLES = ["Super Admin", "HR Admin", "Payroll Admin", "Manager", "Employee"];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function InviteUserPage() {
    const toast = useToast();

    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<InviteForm>({
        resolver: zodResolver(inviteSchema),
        defaultValues: { invites: [{ email: "", role: "Employee" }] },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "invites" });

    const onSubmit = async (data: InviteForm) => {
        const validCount = data.invites.filter((i) => i.email.includes("@")).length;
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 700));
        toast.show({
            variant: "success",
            title: "Invitations sent",
            description: `${validCount} invitation${validCount === 1 ? "" : "s"} sent successfully.`,
        });
    };

    return (
        <Page
            title="Invite Users"
            subtitle="Send email invitations. Invitees will receive a link to set up their Kaarya account with the assigned role."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Users", href: "/settings/users" },
                { label: "Invite" },
            ]}
            maxWidth="700px"
            actions={
                <Button variant="secondary" href="/settings/users">← Back to Users</Button>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card padding="lg">
                    <div className="space-y-4">
                        {fields.map((field, idx) => (
                            <div key={field.id} className="flex items-start gap-3">
                                <div className="flex-1 relative">
                                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                                    <input
                                        type="email"
                                        placeholder="colleague@company.com"
                                        {...register(`invites.${idx}.email`)}
                                        aria-label={`Email for invite ${idx + 1}`}
                                        aria-invalid={!!errors.invites?.[idx]?.email}
                                        className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                                    />
                                    {errors.invites?.[idx]?.email && (
                                        <p role="alert" className="text-xs text-red-400 mt-1">{errors.invites[idx]?.email?.message}</p>
                                    )}
                                </div>
                                <div className="w-48 relative">
                                    <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                                    <select
                                        {...register(`invites.${idx}.role`)}
                                        aria-label={`Role for invite ${idx + 1}`}
                                        className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                                    >
                                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                {fields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="danger"
                                        size="sm"
                                        aria-label={`Remove invite ${idx + 1}`}
                                        onClick={() => remove(idx)}
                                        icon={<Trash2 size={16} aria-hidden="true" />}
                                    />
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => append({ email: "", role: "Employee" })}
                            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1.5 mt-2"
                        >
                            <Plus size={16} aria-hidden="true" /> Add another invite
                        </button>
                    </div>
                </Card>

                <div className="mt-6 flex justify-between items-center">
                    <p className="text-xs text-[#445566]">
                        {fields.length} invite{fields.length === 1 ? "" : "s"} ready to send
                    </p>
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        loadingText="Sending…"
                        icon={<Send size={16} aria-hidden="true" />}
                    >
                        Send Invitations
                    </Button>
                </div>
            </form>
        </Page>
    );
}
