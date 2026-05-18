"use client";

import { Download, Layers, ShieldCheck, Calculator, Info } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

interface ComponentGroup {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    iconColor: string;
    iconBg: string;
    title: string;
    items: { name: string; tag: string; tagColor: string; desc: string }[];
}

const COMPONENT_GROUPS: ComponentGroup[] = [
    {
        icon: Layers,
        iconColor: "text-[#0066FF]",
        iconBg: "bg-[#0066FF]/10",
        title: "Fixed Earnings (Core)",
        items: [
            { name: "Basic Salary", tag: "Formula", tagColor: "text-[#8899AA] bg-[#1A2A3A]", desc: "50% of annual CTC" },
            { name: "House Rent Allowance", tag: "Formula", tagColor: "text-[#8899AA] bg-[#1A2A3A]", desc: "50% of Basic Salary" },
            { name: "Special Allowance", tag: "Balancing", tagColor: "text-[#FFB800] bg-[#FFB800]/10", desc: "Absorbs remainder of Gross" },
        ],
    },
    {
        icon: Calculator,
        iconColor: "text-[#00E5A0]",
        iconBg: "bg-[#00E5A0]/10",
        title: "Variable & FBP",
        items: [
            { name: "LTA (Leave Travel)", tag: "FBP", tagColor: "text-[#8899AA] bg-[#1A2A3A]", desc: "Max ₹40,000 /yr (Tax Ex)" },
            { name: "Internet Allowance", tag: "Fixed Claim", tagColor: "text-[#8899AA] bg-[#1A2A3A]", desc: "₹1,500 /mo fixed" },
            { name: "Variable Pay (Bonus)", tag: "Performance", tagColor: "text-white bg-[#1A2A3A]", desc: "Target % input by Manager" },
        ],
    },
    {
        icon: ShieldCheck,
        iconColor: "text-[#FF4444]",
        iconBg: "bg-[#FF4444]/10",
        title: "Deductions & Stat.",
        items: [
            { name: "Provident Fund (PF)", tag: "Statutory", tagColor: "text-[#FF4444] bg-[#FF4444]/10", desc: "12% of Basic (Restricted 1.5L)" },
            { name: "Professional Tax (PT)", tag: "Statutory", tagColor: "text-[#FF4444] bg-[#FF4444]/10", desc: "State Slab Mapping" },
            { name: "Income Tax (TDS)", tag: "Statutory", tagColor: "text-[#FF4444] bg-[#FF4444]/10", desc: "Projected from Annual CTC" },
        ],
    },
];

export default function ComponentMasterMap() {
    return (
        <Page
            title="Component Master Map"
            subtitle="Visualization of all active earnings, deductions, and statutory mappings."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Components", href: "/payroll-settings/components" },
                { label: "Master Map" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>Export Map</Button>
                    <Button href="/payroll-settings/components">Manage Components</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COMPONENT_GROUPS.map((group) => (
                    <Card key={group.title} padding="none">
                        <div className="flex items-center gap-3 px-5 py-4 bg-[#0A1420] border-b border-[#1A2A3A]">
                            <div className={`w-8 h-8 rounded-lg ${group.iconBg} flex items-center justify-center`} aria-hidden="true">
                                <group.icon size={15} className={group.iconColor} />
                            </div>
                            <h2 className="text-sm font-semibold text-white">{group.title}</h2>
                        </div>
                        <ul className="p-5 space-y-4" role="list">
                            {group.items.map((item) => (
                                <li key={item.name} className="pb-4 border-b border-dashed border-[#1A2A3A] last:border-b-0 last:pb-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-semibold text-white">{item.name}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${item.tagColor}`}>{item.tag}</span>
                                    </div>
                                    <p className="text-xs text-[#8899AA]">{item.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#1A2A3A]/20 border border-[#1A2A3A] rounded-xl" aria-label="Component map information">
                <Info size={16} className="text-[#8899AA] shrink-0" aria-hidden="true" />
                <p className="text-sm text-[#c8d8e8] leading-relaxed">
                    Modifying &quot;Balancing&quot; components automatically adjusts other variables to preserve the Gross CTC amount.
                </p>
            </div>
        </Page>
    );
}
