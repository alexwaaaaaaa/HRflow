"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Building2,
    Ticket,
    Scale,
    Save,
    Shield,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";

// ─── Schema ───────────────────────────────────────────────────────────────────
const settingsSchema = z.object({
    legalName: z.string().min(3, "Legal name must be at least 3 characters"),
    incorporationDate: z.string().min(1, "Incorporation date is required"),
    registeredAddress: z.string().min(10, "Address must be at least 10 characters"),
    pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format (e.g. AABCT1234H)"),
    tan: z.string().min(10, "TAN must be 10 characters").max(10, "TAN must be 10 characters"),
    gstin: z.string().min(15, "GSTIN must be 15 characters").max(15, "GSTIN must be 15 characters"),
    lin: z.string().min(10, "LIN must be 10 digits").max(10, "LIN must be 10 digits"),
    shramSuvidha: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { label: "Master Entity", icon: Building2, active: true },
    { label: "Registrations", icon: Ticket, active: false },
    { label: "Labour Acts", icon: Scale, active: false },
    { label: "Audit Trail", icon: Shield, active: false },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ComplianceSettings() {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            legalName: "TechCorp Solutions Private Limited",
            incorporationDate: "2018-04-01",
            registeredAddress: "Building 5, Mindspace IT Park, Airoli, Navi Mumbai, Maharashtra - 400708",
            pan: "AABCT1234H",
            tan: "MUMA12999B",
            gstin: "27AABCT1234H1Z5",
            lin: "1899201088",
            shramSuvidha: true,
        },
    });

    const onSubmit = async (_values: SettingsFormValues) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 1000));
    };

    return (
        <Page
            title="Compliance Settings"
            subtitle="Configure global establishment identities, LIN, PAN, TAN, and master policies."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Settings" },
            ]}
            maxWidth="1000px"
            actions={
                <Button
                    type="submit"
                    form="compliance-settings-form"
                    variant="primary"
                    isLoading={isSubmitting}
                    loadingText="Saving..."
                    icon={<Save size={16} aria-hidden="true" />}
                >
                    Save Configuration
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                {/* Navigation */}
                <div className="space-y-2 md:col-span-3">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.label}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-black uppercase tracking-widest transition-all ${
                                    item.active
                                        ? "bg-[#1A2A3A] text-white"
                                        : "text-slate-400 hover:bg-[#1A2A3A]/50 hover:text-white"
                                }`}
                            >
                                <Icon size={16} className={item.active ? "text-blue-500" : ""} aria-hidden="true" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                {/* Form */}
                <div className="space-y-8 md:col-span-9">
                    <form id="compliance-settings-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Organization master data */}
                        <Card padding="md" className="mb-8">
                            <h2 className="mb-6 border-b border-[#1A2A3A] pb-4 text-lg font-black tracking-tight text-white">
                                Organization Master Data
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <FormField
                                    control={control}
                                    name="legalName"
                                    label="Legal Entity Name"
                                    inputProps={{ placeholder: "TechCorp Solutions Private Limited" }}
                                />
                                <div className="space-y-2">
                                    <label htmlFor="incorporationDate" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Date of Incorporation
                                    </label>
                                    <input
                                        id="incorporationDate"
                                        type="date"
                                        {...register("incorporationDate")}
                                        className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-bold text-slate-300 outline-none [color-scheme:dark] focus:border-blue-500"
                                        aria-invalid={!!errors.incorporationDate}
                                    />
                                    {errors.incorporationDate && (
                                        <p className="text-xs text-rose-500" role="alert">{errors.incorporationDate.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label htmlFor="registeredAddress" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Registered Address
                                    </label>
                                    <textarea
                                        id="registeredAddress"
                                        rows={2}
                                        {...register("registeredAddress")}
                                        className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-sm font-bold text-slate-300 outline-none focus:border-blue-500"
                                        aria-invalid={!!errors.registeredAddress}
                                    />
                                    {errors.registeredAddress && (
                                        <p className="text-xs text-rose-500" role="alert">{errors.registeredAddress.message}</p>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Tax & statutory identifiers */}
                        <Card padding="md">
                            <h2 className="mb-6 border-b border-[#1A2A3A] pb-4 text-lg font-black tracking-tight text-white">
                                Tax &amp; Statutory Identifiers
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <FormField
                                    control={control}
                                    name="pan"
                                    label="Company PAN"
                                    inputProps={{ placeholder: "AABCT1234H", className: "uppercase" }}
                                />
                                <FormField
                                    control={control}
                                    name="tan"
                                    label="Master TAN"
                                    inputProps={{ placeholder: "MUMA12999B", className: "uppercase" }}
                                />
                                <FormField
                                    control={control}
                                    name="gstin"
                                    label="GSTIN (Head Office)"
                                    inputProps={{ placeholder: "27AABCT1234H1Z5", className: "uppercase" }}
                                />
                                <div className="flex items-center gap-3 pt-6">
                                    <input
                                        type="checkbox"
                                        id="shramSuvidha"
                                        {...register("shramSuvidha")}
                                        className="h-4 w-4 rounded border-[#1A2A3A] bg-[#060B14] text-blue-500 focus:ring-0"
                                    />
                                    <label htmlFor="shramSuvidha" className="cursor-pointer text-sm font-bold text-slate-300">
                                        Linked with Shram Suvidha Portal
                                    </label>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <FormField
                                        control={control}
                                        name="lin"
                                        label="Labour Identification Number (LIN)"
                                        inputProps={{ placeholder: "1899201088" }}
                                    />
                                </div>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
        </Page>
    );
}
