"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Briefcase, Globe, MapPin, Plus, Shield, Sliders, Trash2, Upload } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const companySchema = z.object({
    legalName: z.string().min(2, "Legal name is required"),
    displayName: z.string().min(1, "Display name is required"),
    cin: z.string().optional(),
    incorporationDate: z.string().optional(),
    description: z.string().optional(),
    timezone: z.string().min(1, "Timezone is required"),
    currency: z.string().min(1, "Currency is required"),
    fiscalYearStart: z.string().min(1, "Fiscal year start is required"),
    language: z.string().min(1, "Language is required"),
});

type CompanyForm = z.infer<typeof companySchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const TABS = ["General Info", "Addresses", "Statutory Details", "Branding"] as const;
type Tab = (typeof TABS)[number];

const TAB_ICONS: Record<Tab, typeof Building2> = {
    "General Info": Building2,
    Addresses: MapPin,
    "Statutory Details": Shield,
    Branding: Globe,
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function TabNav({ active, onSelect }: { active: Tab; onSelect: (t: Tab) => void }) {
    return (
        <nav aria-label="Company settings sections">
            <ul className="flex flex-col gap-2">
                {TABS.map((tab) => {
                    const Icon = TAB_ICONS[tab];
                    return (
                        <li key={tab}>
                            <button
                                onClick={() => onSelect(tab)}
                                aria-current={active === tab ? "page" : undefined}
                                className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-sm font-medium ${
                                    active === tab
                                        ? "bg-[#1A2A3A] text-white border border-[#2A3A4A]"
                                        : "text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent"
                                }`}
                            >
                                <Icon size={18} className={active === tab ? "text-indigo-400" : ""} aria-hidden="true" />
                                {tab}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function CompanyProfileSettingsPage() {
    const [activeTab, setActiveTab] = useState<Tab>("General Info");
    const toast = useToast();

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<CompanyForm>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            legalName: "Kaarya Finserve Pvt. Ltd.",
            displayName: "Kaarya",
            cin: "U72900MH2023PTC345678",
            incorporationDate: "2020-04-15",
            description: "Kaarya is India's leading unified Workforce OS, powering intelligent HR and payroll for modern enterprises.",
            timezone: "Asia/Kolkata",
            currency: "INR",
            fiscalYearStart: "April",
            language: "en",
        },
    });

    const onSubmit = async (_data: CompanyForm) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 600));
        toast.show({ variant: "success", title: "Company profile saved", description: "Your changes have been applied." });
    };

    return (
        <Page
            title="Company Profile"
            subtitle="Manage your organization's core identity, legal entities, and operating locations."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Company" },
            ]}
            maxWidth="1200px"
            actions={
                <div className="flex gap-3">






                    <Button variant="secondary">Discard Changes</Button>
                    <Button
                        type="submit"
                        form="company-form"
                        isLoading={isSubmitting}
                        loadingText="Saving…"
                    >
                        Save Profile
                    </Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <TabNav active={activeTab} onSelect={setActiveTab} />
                </div>

                <div className="lg:col-span-3">
                    <Card padding="lg">
                        {activeTab === "General Info" && (
                            <form id="company-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                {/* Logo Upload */}
                                <div className="flex items-start gap-6 pb-6 border-b border-[#1A2A3A]">
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] flex items-center justify-center relative group overflow-hidden shrink-0">
                                        <div className="text-3xl font-bold text-white tracking-tighter">KF</div>
                                        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Upload size={20} className="text-white mb-1" aria-hidden="true" />
                                            <span className="text-[10px] text-white font-medium">Update Logo</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Company Logo</h3>
                                        <p className="text-xs text-[#8899AA] mb-3 max-w-sm">
                                            This logo will appear on reports, letters, and the employee portal. Recommended size: 256×256px (PNG/SVG).
                                        </p>
                                        <div className="flex gap-3">
                                            <Button variant="secondary" size="sm">Upload New</Button>
                                            <Button variant="danger" size="sm">Remove</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={control} name="legalName" label="Legal Company Name *" />
                                    <FormField control={control} name="displayName" label="Display Name (Platform)" />
                                    <FormField control={control} name="cin" label="Registration Number (CIN)" inputProps={{ className: "font-mono" }} />
                                    <FormField control={control} name="incorporationDate" label="Date of Incorporation" inputProps={{ type: "date" }} />
                                    <FormField control={control} name="timezone" label="Timezone" />
                                    <FormField control={control} name="currency" label="Currency" />
                                    <FormField control={control} name="fiscalYearStart" label="Fiscal Year Start" />
                                    <FormField control={control} name="language" label="Language" />
                                </div>

                                <FormField
                                    control={control}
                                    name="description"
                                    label="Corporate Description"
                                    inputProps={{ as: "textarea", rows: 4 } as never}
                                />
                            </form>
                        )}

                        {activeTab === "Addresses" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">Registered Locations</h2>
                                        <p className="text-xs text-[#8899AA] mt-1">Manage HQ and branch offices for tax and statutory compliance.</p>
                                    </div>
                                    <Button size="sm" icon={<Plus size={14} aria-hidden="true" />}>Add Location</Button>
                                </div>

                                <div className="space-y-4">
                                    <Card padding="md" className="hover:border-indigo-500/30 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
                                                    <Building2 size={18} aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-white font-medium text-sm">Corporate Headquarters</h3>
                                                        <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded">HQ</span>
                                                    </div>
                                                    <p className="text-xs text-[#8899AA] mt-0.5">Primary registration address</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" aria-label="Edit location" icon={<Sliders size={14} aria-hidden="true" />} />
                                        </div>
                                        <dl className="grid grid-cols-2 gap-4 text-sm p-4 bg-[#0A1420] rounded-lg border border-[#1A2A3A]">
                                            <div>
                                                <dt className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Address Line 1</dt>
                                                <dd className="text-white">Level 4, Innov8 Coworking</dd>
                                            </div>
                                            <div>
                                                <dt className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Address Line 2</dt>
                                                <dd className="text-white">Koramangala 1A Block</dd>
                                            </div>
                                            <div>
                                                <dt className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">City &amp; State</dt>
                                                <dd className="text-white">Bengaluru, Karnataka</dd>
                                            </div>
                                            <div>
                                                <dt className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">PIN / ZIP</dt>
                                                <dd className="text-white">560034</dd>
                                            </div>
                                        </dl>
                                    </Card>

                                    <Card padding="md" className="hover:border-indigo-500/30 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-[#1A2A3A] p-2 rounded-lg text-[#8899AA]">
                                                    <Briefcase size={18} aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-medium text-sm">Mumbai Regional Office</h3>
                                                    <p className="text-xs text-[#8899AA] mt-0.5">Branch</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" aria-label="Edit location" icon={<Sliders size={14} aria-hidden="true" />} />
                                                <Button variant="danger" size="sm" aria-label="Delete location" icon={<Trash2 size={14} aria-hidden="true" />} />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {activeTab === "Statutory Details" && (
                            <div className="flex flex-col items-center justify-center p-12 text-center">
                                <Shield size={48} className="text-[#2A3A4A] mb-4" aria-hidden="true" />
                                <h2 className="text-xl font-bold text-white mb-2">Statutory Identifiers</h2>
                                <p className="text-sm text-[#8899AA] max-w-sm mb-6">Manage PAN, TAN, GSTIN, and EPF registration numbers for Indian compliance.</p>
                                <Button>Configure Statutory Details</Button>
                            </div>
                        )}

                        {activeTab === "Branding" && (
                            <div className="flex flex-col items-center justify-center p-12 text-center">
                                <Globe size={48} className="text-[#2A3A4A] mb-4" aria-hidden="true" />
                                <h2 className="text-xl font-bold text-white mb-2">Branding Settings</h2>
                                <p className="text-sm text-[#8899AA] max-w-sm mb-6">Customize colors, fonts, and logos for the employee portal and generated documents.</p>
                                <Button>Configure Branding</Button>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        

        

        

        </Page>
    );
}
