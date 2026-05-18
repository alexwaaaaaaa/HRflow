"use client";

import { Laptop, Monitor, Smartphone, Server, Receipt, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

// ─── Schema ──────────────────────────────────────────────────────────────────

const addAssetSchema = z.object({
    name: z.string().min(2, "Asset name is required"),
    category: z.enum(["Laptop", "Monitor", "Mobile", "Server"]),
    brand: z.string().optional(),
    model: z.string().optional(),
    serial: z.string().min(3, "Serial number is required"),
    location: z.string().min(1, "Location is required"),
    vendor: z.string().optional(),
    purchaseDate: z.string().optional(),
    price: z.string().optional(),
    warrantyEnds: z.string().optional(),
});

type AddAssetForm = z.infer<typeof addAssetSchema>;

// ─── Static data ─────────────────────────────────────────────────────────────

const CATEGORIES = [
    { name: "Laptop" as const, icon: Laptop },
    { name: "Monitor" as const, icon: Monitor },
    { name: "Mobile" as const, icon: Smartphone },
    { name: "Server" as const, icon: Server },
];

const LOCATIONS = ["HQ (New York)", "London Office", "Remote (Unassigned)"] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AddAssetPage() {
    const toast = useToast();
    const { control, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm<AddAssetForm>({
        resolver: zodResolver(addAssetSchema),
        defaultValues: {
            name: "",
            category: "Laptop",
            brand: "",
            model: "",
            serial: "",
            location: "HQ (New York)",
            vendor: "",
            purchaseDate: "",
            price: "",
            warrantyEnds: "",
        },
    });

    // eslint-disable-next-line react-hooks/incompatible-library -- RHF watch() is intentional here; category drives UI-only category selector
    const selectedCategory = watch("category");

    const onSubmit = async (_data: AddAssetForm) => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 700));
        toast.show({ variant: "success", title: "Asset added", description: "The new asset has been registered in the inventory." });
    };

    return (
        <Page
            title="Add New Asset"
            subtitle="Register a new hardware asset into the IT inventory"
            breadcrumbs={[
                { label: "IT", href: "/it/dashboard" },
                { label: "Assets", href: "/it/assets" },
                { label: "Add Asset" },
            ]}
            maxWidth="1100px"
            actions={
                <Link href="/it/assets">
                    <Button variant="outline" icon={<ArrowLeft size={14} aria-hidden="true" />}>
                        Back to Assets
                    </Button>
                </Link>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" aria-label="Add new asset form">
                {/* Category selection */}
                <Card padding="lg">
                    <h3 className="mb-4 font-bold text-white">Asset Type</h3>
                    <fieldset>
                        <legend className="sr-only">Select asset category</legend>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                const active = selectedCategory === cat.name;
                                return (
                                    <Button
                                        key={cat.name}
                                        type="button"
                                        variant={active ? "secondary" : "ghost"}
                                        aria-pressed={active}
                                        onClick={() => setValue("category", cat.name)}
                                        className={`flex flex-col items-center justify-center rounded-2xl p-6 h-auto ${active ? "border-[#33E6FF] text-[#33E6FF]" : ""}`}
                                    >
                                        <Icon size={32} className="mb-3" aria-hidden="true" />
                                        <span className="text-sm font-bold uppercase tracking-wide">{cat.name}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    </fieldset>
                </Card>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Primary details */}
                    <Card padding="lg">
                        <h3 className="mb-6 flex items-center gap-2 font-bold text-white">
                            <Laptop size={18} className="text-[#33E6FF]" aria-hidden="true" />
                            Primary Details
                        </h3>
                        <div className="space-y-4">
                            <FormField
                                control={control}
                                name="name"
                                label="Asset Name"
                                inputProps={{ placeholder: "e.g. MacBook Pro 16 M2", required: true }}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={control}
                                    name="brand"
                                    label="Brand"
                                    inputProps={{ placeholder: "e.g. Apple" }}
                                />
                                <FormField
                                    control={control}
                                    name="model"
                                    label="Model"
                                    inputProps={{ placeholder: "e.g. A2485" }}
                                />
                            </div>
                            <FormField
                                control={control}
                                name="serial"
                                label="Serial Number / Asset Tag"
                                inputProps={{ placeholder: "e.g. C02F8XYZMD6T", className: "font-mono uppercase", required: true }}
                            />

                            {/* Location select */}
                            <Controller
                                control={control}
                                name="location"
                                render={({ field }) => (
                                    <div className="space-y-1.5">
                                        <label htmlFor="asset-location" className="block text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                                            Location
                                        </label>
                                        <select
                                            id="asset-location"
                                            {...field}
                                            className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3 text-sm text-white outline-none transition-colors focus:border-[#00e5a0]"
                                        >
                                            {LOCATIONS.map((l) => (
                                                <option key={l} value={l}>{l}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            />
                        </div>
                    </Card>

                    {/* Purchase & warranty */}
                    <Card padding="lg">
                        <h3 className="mb-6 flex items-center gap-2 font-bold text-white">
                            <Receipt size={18} className="text-[#00e5a0]" aria-hidden="true" />
                            Purchase &amp; Warranty
                        </h3>
                        <div className="space-y-4">
                            <FormField
                                control={control}
                                name="vendor"
                                label="Vendor"
                                inputProps={{ placeholder: "e.g. CDW, Apple Business" }}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={control}
                                    name="purchaseDate"
                                    label="Purchase Date"
                                    inputProps={{ type: "date" }}
                                />
                                <FormField
                                    control={control}
                                    name="price"
                                    label="Purchase Price ($)"
                                    inputProps={{ type: "number", placeholder: "0.00" }}
                                />
                            </div>

                            <h3 className="mt-6 flex items-center gap-2 font-bold text-white">
                                <ShieldCheck size={18} className="text-[#f59e0b]" aria-hidden="true" />
                                Warranty Details
                            </h3>
                            <FormField
                                control={control}
                                name="warrantyEnds"
                                label="Warranty Expiration"
                                inputProps={{ type: "date" }}
                            />
                        </div>
                    </Card>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 border-t border-[#1A2A3A] pt-6">
                    <Button variant="outline" href="/it/assets">Cancel</Button>
                    <Button type="submit" isLoading={isSubmitting} loadingText="Saving…">
                        Save Asset
                    </Button>
                </div>
            </form>
        </Page>
    );
}
