"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Clock, Mailbox } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const digestSchema = z.object({
    enabled: z.boolean(),
    frequency: z.enum(["daily", "weekly"]),
    deliveryTime: z.string().min(1, "Delivery time is required"),
});

type DigestForm = z.infer<typeof digestSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function DigestEmailSetupPage() {
    const toast = useToast();

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<DigestForm>({
        resolver: zodResolver(digestSchema),
        defaultValues: { enabled: true, frequency: "daily", deliveryTime: "09:00" },
    });

    const onSubmit = async (_data: DigestForm) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 500));
        toast.show({ variant: "success", title: "Digest settings saved" });
    };

    return (
        <Page
            title="Digest Email Configuration"
            subtitle="Batch non-urgent notifications into a single daily or weekly summary email."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Notifications", href: "/settings/notifications" },
                { label: "Digest" },
            ]}
            maxWidth="700px"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card padding="lg">
                    <div className="space-y-6">
                        {/* Enable toggle */}
                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <span className="text-white font-medium text-sm">Enable Digest Emails</span>
                                <p className="text-xs text-[#556677] mt-1">Turn off to send everything instantly (not recommended for large teams).</p>
                            </div>
                            <div className="relative shrink-0 ml-4">
                                <input type="checkbox" {...register("enabled")} className="sr-only peer" />
                                <div className="w-11 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 border border-[#2A3A4A] transition-colors" />
                            </div>
                        </label>

                        <div className="border-t border-[#1A2A3A] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="frequency" className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Frequency</label>
                                <select
                                    id="frequency"
                                    {...register("frequency")}
                                    className="w-full bg-[#060D1A] border border-[#1A2A3A] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500"
                                >
                                    <option value="daily">Daily Digest</option>
                                    <option value="weekly">Weekly Digest</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="deliveryTime" className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Delivery Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" size={16} aria-hidden="true" />
                                    <select
                                        id="deliveryTime"
                                        {...register("deliveryTime")}
                                        className="w-full pl-10 pr-3 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-white text-sm outline-none focus:border-amber-500"
                                    >
                                        <option value="08:00">08:00 AM</option>
                                        <option value="09:00">09:00 AM</option>
                                        <option value="17:00">05:00 PM</option>
                                        <option value="18:00">06:00 PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[#1A2A3A] pt-6 flex justify-end">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Saving…"
                                icon={<Mailbox size={16} aria-hidden="true" />}
                            >
                                Save Setup
                            </Button>
                        </div>
                    </div>
                </Card>
            </form>
        </Page>
    );
}
