"use client";

import { useState, useRef, useCallback } from "react";
import { Building2, Landmark, Receipt, FileText, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";

// ─── Types & static data ──────────────────────────────────────────────────────

type TabId = "basic" | "compliance" | "payroll" | "branding";

interface Tab {
    id: TabId;
    icon: React.ElementType;
    label: string;
}

const TABS: Tab[] = [
    { id: "basic", icon: Building2, label: "Basic Info" },
    { id: "compliance", icon: Landmark, label: "Statutory & Tax" },
    { id: "payroll", icon: Receipt, label: "Payroll Overrides" },
    { id: "branding", icon: FileText, label: "Brand & Documents" },
];

// ─── Sub-components (module scope) ───────────────────────────────────────────

function FieldRow({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label htmlFor={htmlFor} className="block text-xs font-semibold uppercase tracking-wider text-[#7a8fa6]">
                {label}
            </label>
            {children}
        </div>
    );
}

const inputCls =
    "w-full rounded-xl border border-[#2A3A4A] bg-[#0D1928] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#4f46e5]";

function ToggleRow({
    id,
    title,
    description,
    active,
}: {
    id: string;
    title: string;
    description: string;
    active: boolean;
}) {
    return (
        <div
            className={`relative flex items-center justify-between overflow-hidden rounded-xl border p-4 ${
                active ? "border-[#4f46e5]/50" : "border-[#2A3A4A]"
            } bg-[#0D1928]`}
        >
            {active && <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#4f46e5]" aria-hidden="true" />}
            <div className="ml-2">
                <p className="text-sm font-bold text-white">{title}</p>
                <p className={`mt-0.5 text-xs ${active ? "text-[#818cf8]" : "text-[#556677]"}`}>{description}</p>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={active}
                aria-label={title}
                id={id}
                className={`relative h-6 w-12 shrink-0 rounded-full transition-colors ${
                    active ? "bg-[#4f46e5]" : "bg-[#1A2A3A]"
                }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        active ? "right-1 translate-x-0" : "left-1"
                    }`}
                />
            </button>
        </div>
    );
}

// ─── Entity Switcher — aria-label + keyboard navigation ──────────────────────

interface EntityOption {
    id: string;
    name: string;
    type: string;
}

const ENTITY_OPTIONS: EntityOption[] = [
    { id: "ENT-001", name: "Acme Technologies Pvt Ltd", type: "Parent" },
    { id: "ENT-002", name: "Acme Retail Solutions", type: "Subsidiary" },
    { id: "ENT-003", name: "Acme Logistics India", type: "Subsidiary" },
    { id: "ENT-004", name: "Acme Global Ventures LLC", type: "Foreign Sub" },
];

function EntitySwitcher({
    selected,
    onChange,
}: {
    selected: EntityOption;
    onChange: (e: EntityOption) => void;
}) {
    const listRef = useRef<HTMLUListElement>(null);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLUListElement>) => {
            const items = listRef.current?.querySelectorAll<HTMLButtonElement>("[role='option']");
            if (!items) return;
            const arr = Array.from(items);
            const focused = document.activeElement as HTMLButtonElement;
            const idx = arr.indexOf(focused);

            if (e.key === "ArrowDown") {
                e.preventDefault();
                arr[(idx + 1) % arr.length]?.focus();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                arr[(idx - 1 + arr.length) % arr.length]?.focus();
            } else if (e.key === "Home") {
                e.preventDefault();
                arr[0]?.focus();
            } else if (e.key === "End") {
                e.preventDefault();
                arr[arr.length - 1]?.focus();
            }
        },
        []
    );

    return (
        <nav aria-label="Entity switcher">
            <ul
                ref={listRef}
                role="listbox"
                aria-label="Select entity to configure"
                aria-activedescendant={`entity-option-${selected.id}`}
                onKeyDown={handleKeyDown}
                className="space-y-1 p-2"
            >
                {ENTITY_OPTIONS.map((entity) => {
                    const active = entity.id === selected.id;
                    return (
                        <li key={entity.id} role="presentation">
                            <button
                                id={`entity-option-${entity.id}`}
                                role="option"
                                aria-selected={active}
                                aria-label={`${entity.name} (${entity.type})`}
                                onClick={() => onChange(entity)}
                                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors ${
                                    active
                                        ? "border-[#2A3A4A] bg-[#0D1928] text-white"
                                        : "border-transparent text-[#8899AA] hover:bg-[#0D1928]/50 hover:text-white"
                                }`}
                            >
                                <Building2
                                    size={16}
                                    aria-hidden="true"
                                    className={active ? "text-[#818cf8]" : "text-[#556677]"}
                                />
                                <div className="min-w-0">
                                    <p className="truncate">{entity.name}</p>
                                    <p className="text-[10px] font-normal text-[#556677]">{entity.type}</p>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

// ─── Tab panels ───────────────────────────────────────────────────────────────

function BasicInfoPanel() {
    return (
        <div className="space-y-6">
            <h2 className="border-b border-[#1A2A3A] pb-3 text-lg font-bold text-white">Company Details</h2>
            <div className="grid gap-6 md:grid-cols-2">
                <FieldRow label="Legal Entity Name" htmlFor="legalName">
                    <input id="legalName" type="text" defaultValue="Acme Retail Solutions" className={inputCls} />
                </FieldRow>
                <FieldRow label="Entity Type" htmlFor="entityType">
                    <select id="entityType" className={inputCls}>
                        <option>Parent</option>
                        <option>Subsidiary</option>
                    </select>
                </FieldRow>
                <div className="md:col-span-2">
                    <FieldRow label="Registered Address" htmlFor="address">
                        <textarea
                            id="address"
                            rows={3}
                            defaultValue="12, High Street, Andheri West, Mumbai, Maharashtra 400053"
                            className={`${inputCls} resize-none`}
                        />
                    </FieldRow>
                </div>
            </div>
        </div>
    );
}

function CompliancePanel() {
    return (
        <div className="space-y-6">
            <h2 className="border-b border-[#1A2A3A] pb-3 text-lg font-bold text-white">Statutory Registrations</h2>
            <div className="grid gap-6 md:grid-cols-2">
                <FieldRow label="Corporate PAN" htmlFor="pan">
                    <input id="pan" type="text" defaultValue="ABCDE1234F" className={`${inputCls} uppercase`} />
                </FieldRow>
                <FieldRow label="Corporate TAN" htmlFor="tan">
                    <input id="tan" type="text" defaultValue="MUMA12345B" className={`${inputCls} uppercase`} />
                </FieldRow>
                <FieldRow label="PF Establishment Code" htmlFor="pfCode">
                    <input id="pfCode" type="text" defaultValue="MHBAN0001234000" className={`${inputCls} uppercase`} />
                </FieldRow>
                <FieldRow label="ESI Employer Code" htmlFor="esiCode">
                    <input id="esiCode" type="text" defaultValue="31001234560000101" className={`${inputCls} uppercase`} />
                </FieldRow>
            </div>
        </div>
    );
}

function PayrollPanel() {
    return (
        <div className="space-y-6">
            <h2 className="border-b border-[#1A2A3A] pb-3 text-lg font-bold text-white">Payroll System Overrides</h2>
            <p className="max-w-xl text-sm text-[#8899AA]">
                By default, this entity inherits payroll setup from the parent. Toggle switches below to break
                inheritance and create custom rules for this entity.
            </p>
            <div className="space-y-4">
                <ToggleRow
                    id="customPayComponents"
                    title="Custom Pay Components (Salary Structure)"
                    description="Entity uses same CTC architecture as parent."
                    active={false}
                />
                <ToggleRow
                    id="customPayslip"
                    title="Custom Payslip Template"
                    description="Overridden. This entity issues its own branded payslips."
                    active={true}
                />
            </div>
        </div>
    );
}

function BrandingPanel() {
    return (
        <div className="space-y-6">
            <h2 className="border-b border-[#1A2A3A] pb-3 text-lg font-bold text-white">Entity Branding</h2>
            <div className="flex items-start gap-8">
                <div>
                    <label
                        htmlFor="logo-upload"
                        className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2A3A4A] bg-[#0D1928] text-[#556677] transition-colors hover:border-[#4f46e5]"
                    >
                        <span className="px-4 text-center text-xs font-bold">Upload Logo (PNG)</span>
                        <input id="logo-upload" type="file" accept="image/png" className="sr-only" />
                    </label>
                    <p className="mt-2 text-center text-xs text-[#8899AA]">White background</p>
                </div>
                <div className="flex-1 space-y-4">
                    <FieldRow label="Primary Color Hex" htmlFor="primaryColor">
                        <div className="flex gap-2">
                            <div className="h-10 w-10 rounded border border-[#2A3A4A] bg-[#3B82F6]" aria-hidden="true" />
                            <input
                                id="primaryColor"
                                type="text"
                                defaultValue="#3B82F6"
                                className="w-32 rounded-xl border border-[#2A3A4A] bg-[#0D1928] px-4 py-2 text-sm text-white outline-none focus:border-[#4f46e5]"
                            />
                        </div>
                    </FieldRow>
                </div>
            </div>
        </div>
    );
}

const TAB_PANELS: Record<TabId, React.ReactNode> = {
    basic: <BasicInfoPanel />,
    compliance: <CompliancePanel />,
    payroll: <PayrollPanel />,
    branding: <BrandingPanel />,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EntitySettingsPage() {
    const [activeTab, setActiveTab] = useState<TabId>("basic");
    const [selectedEntity, setSelectedEntity] = useState<EntityOption>(ENTITY_OPTIONS[1]!);

    const handleTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const tabs = TABS.map((t) => t.id);
        const idx = tabs.indexOf(activeTab);
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveTab(tabs[(idx + 1) % tabs.length]!);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveTab(tabs[(idx - 1 + tabs.length) % tabs.length]!);
        }
    };

    return (
        <Page
            title={selectedEntity.name}
            subtitle="Manage entity-specific configurations, compliance details, and override behaviors"
            breadcrumbs={[
                { label: "Multi-Entity", href: "/multi-entity/list" },
                { label: "Settings" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Save size={14} />







}>Save Changes</Button>
            }
        >
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
                {/* Entity switcher sidebar */}
                <div className="w-full shrink-0 overflow-hidden rounded-2xl border border-[#1A2A3A] bg-[#060D1A] md:w-64">
                    <div className="border-b border-[#1A2A3A] px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#556677]">
                            Select Entity
                        </p>
                    </div>
                    <EntitySwitcher selected={selectedEntity} onChange={setSelectedEntity} />
                </div>

                {/* Settings tabs + content */}
                <div className="flex flex-1 flex-col gap-0 overflow-hidden rounded-2xl border border-[#1A2A3A]">
                    {/* Tab list */}
                    <div
                        role="tablist"
                        aria-label="Entity settings sections"
                        aria-orientation="vertical"
                        onKeyDown={handleTabKeyDown}
                        className="flex flex-wrap gap-1 border-b border-[#1A2A3A] bg-[#060D1A] p-2"
                    >
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    role="tab"
                                    id={`tab-${tab.id}`}
                                    aria-selected={active}
                                    aria-controls={`panel-${tab.id}`}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors ${
                                        active
                                            ? "border-[#2A3A4A] bg-[#0D1928] text-white"
                                            : "border-transparent text-[#8899AA] hover:bg-[#0D1928]/50 hover:text-white"
                                    }`}
                                >
                                    <Icon
                                        size={16}
                                        aria-hidden="true"
                                        className={active ? "text-[#818cf8]" : "text-[#556677]"}
                                    />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab panel */}
                    <div
                        role="tabpanel"
                        id={`panel-${activeTab}`}
                        aria-labelledby={`tab-${activeTab}`}
                        className="min-h-[500px] bg-[#060D1A] p-8"
                    >
                        {TAB_PANELS[activeTab]}
                    </div>
                </div>
            </div>
        

        

        

            
        </Page>
    );
}
