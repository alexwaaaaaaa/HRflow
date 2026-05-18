"use client";
import React, { useState } from 'react';
import { Edit2, Trash2, ToggleLeft, ToggleRight, PlusCircle, Info } from 'lucide-react';
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

const INITIAL_COMPONENTS = [
    { name: 'HRA (House Rent Allowance)', maxPct: '50% of Basic (Metro), 40% (Non-metro)', taxExempt: true, active: true, section: 'Sec 10(13A)', mandatory: true },
    { name: 'LTA (Leave Travel Allowance)', maxPct: '₹50,000 annual limit', taxExempt: true, active: true, section: 'Sec 10(5)', mandatory: false },
    { name: 'Medical Reimbursement', maxPct: '₹15,000 annual', taxExempt: true, active: true, section: 'Sec 17(2)', mandatory: false },
    { name: 'Vehicle Maintenance Allowance', maxPct: '₹1,800/mo (< 1600cc)', taxExempt: true, active: true, section: 'Rule 3(2)', mandatory: false },
    { name: 'Books & Periodicals', maxPct: '₹1,000/month', taxExempt: true, active: true, section: 'Income Tax Rules', mandatory: false },
    { name: 'NPS Self-Contribution (80CCD1B)', maxPct: '₹50,000 additional', taxExempt: true, active: true, section: 'Sec 80CCD(1B)', mandatory: false },
    { name: 'Special Allowance (Taxable Residual)', maxPct: 'Remaining FBP pool', taxExempt: false, active: true, section: 'Fully Taxable', mandatory: true },
];

type Comp = typeof INITIAL_COMPONENTS[number];

export default function FBPComponentSetup() {
    const [comps, setComps] = useState(INITIAL_COMPONENTS);
    const toggle = (i: number) => setComps(prev => prev.map((c, idx) => idx === i ? { ...c, active: !c.active } : c));

    const columns: Column<Comp>[] = [
        {
            key: 'component',
            label: 'Component',
            render: (comp) => (
                <div>
                    <div className="text-white font-semibold text-xs">{comp.name}</div>
                    {comp.mandatory && <span className="text-[10px] text-purple-400 font-bold">Mandatory</span>}
                </div>
            ),
        },
        {
            key: 'limit',
            label: 'Limit / Rule',
            render: (comp) => <span className="text-[#AABBCC] text-xs max-w-48 block">{comp.maxPct}</span>,
        },
        {
            key: 'section',
            label: 'Section',
            render: (comp) => <span className="text-xs text-indigo-400 font-mono">{comp.section}</span>,
        },
        {
            key: 'taxExempt',
            label: 'Tax Exempt',
            align: 'center',
            render: (comp) => (
                <Badge variant={comp.taxExempt ? 'success' : 'warning'}>
                    {comp.taxExempt ? 'Exempt' : 'Taxable'}
                </Badge>
            ),
        },
        {
            key: 'active',
            label: 'Active',
            align: 'center',
            render: (comp, i) => (
                <button
                    onClick={() => !comp.mandatory && toggle(i)}
                    aria-label={`Toggle ${comp.name}`}
                    className={comp.mandatory ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
                    type="button"
                >
                    {comp.active
                        ? <ToggleRight size={22} className="text-purple-400" aria-hidden="true" />
                        : <ToggleLeft size={22} className="text-[#2A3A4A]" aria-hidden="true" />
                    }
                </button>
            ),
        },
        {
            key: 'actions',
            label: 'Actions',
            align: 'right',
            render: (comp) => (
                <div className="flex items-center gap-2 justify-end">
                    <Button variant="ghost" size="sm" aria-label={`Edit ${comp.name}`}>
                        <Edit2 size={14} aria-hidden="true" />
                    </Button>
                    {!comp.mandatory && (
                        <Button variant="ghost" size="sm" aria-label={`Delete ${comp.name}`}>
                            <Trash2 size={14} aria-hidden="true" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Page
            title="FBP Component Setup"
            subtitle="Configure which salary components employees can allocate their FBP pool to"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "FBP", href: "/fbp/dashboard" },
                { label: "Setup", href: "/fbp/setup" },
            ]}
            actions={
                <Button variant="primary" size="md">
                    <PlusCircle size={16} aria-hidden="true" /> Add Component
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4 flex gap-3">
                    <Info size={15} className="text-purple-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="text-[#AABBCC] text-xs leading-relaxed">
                        Components marked as Mandatory cannot be toggled off by employees. Tax-exempt components reduce the employee&apos;s tax liability when bills are submitted. Special Allowance is always mandatory as the residual absorber.
                    </div>
                </div>

                <DataTable
                    data={comps}
                    columns={columns}
                    rowKey={(comp) => comp.name}
                    aria-label="FBP Components"
                />

                <div className="flex justify-start">
                    <Button variant="primary" size="md">
                        Save Component Configuration
                    </Button>
                </div>
            </div>
        </Page>
    );
}
