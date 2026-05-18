"use client";

import Link from "next/link";
import { Users, UserPlus, UploadCloud, CheckCircle2, ShieldAlert, Trash2, Edit2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Dependent {
    id: string;
    name: string;
    relation: string;
    dob: string;
    gender: string;
    status: "Active" | "Pending Verification";
    cover: string;
}

const DEPENDENTS: Dependent[] = [
    { id: "DEP-01", name: "Rohan Sharma", relation: "Spouse", dob: "14 May 1990", gender: "Male", status: "Active", cover: "GMC, GTL Nominee" },
    { id: "DEP-02", name: "Aarav Sharma", relation: "Son", dob: "22 Aug 2018", gender: "Male", status: "Active", cover: "GMC" },
    { id: "DEP-03", name: "Suresh Sharma", relation: "Father-in-law", dob: "05 Jan 1960", gender: "Male", status: "Pending Verification", cover: "Voluntary Parents Cover" },
];

const COLUMNS: Column<Dependent>[] = [
    {
        key: "name", label: "Dependent Name", render: (d) => (
            <div>
                <div className="text-white font-medium">{d.name}</div>
                <div className="text-xs text-[#8899AA] mt-1 font-mono">{d.id}</div>
            </div>
        ),
    },
    {
        key: "relation", label: "Relationship / Gender", render: (d) => (
            <div>
                <span className="text-white bg-[#1A2A3A] px-2 py-1 rounded-md text-xs">{d.relation}</span>
                <div className="text-[#8899AA] text-xs mt-1">{d.gender}</div>
            </div>
        ),
    },
    { key: "dob", label: "Date of Birth", render: (d) => <span className="text-white">{d.dob}</span> },
    { key: "cover", label: "Active Coverage", render: (d) => <span className="text-indigo-400 font-medium">{d.cover}</span> },
    {
        key: "status", label: "KYC Status", align: "center",
        render: (d) => d.status === "Active"
            ? <Badge variant="success"><CheckCircle2 size={12} className="inline mr-1" aria-hidden="true" />Verified</Badge>
            : (
                <div className="flex flex-col items-center gap-1">
                    <Badge variant="warning">Pending KYC</Badge>
                    <Button variant="ghost" size="sm" icon={<UploadCloud size={12} />} className="text-pink-400 text-[10px]">Upload Aadhaar</Button>
                </div>
            ),
    },
    {
        key: "actions", label: "Actions", align: "right",
        render: (d) => (
            <div className="flex items-center justify-end gap-3 text-[#8899AA]">
                <Button variant="ghost" size="sm" aria-label={`Edit ${d.name}`} icon={<Edit2 size={16} />} />
                <Button variant="ghost" size="sm" aria-label={`Remove ${d.name}`} icon={<Trash2 size={16} />} className="hover:text-pink-400" />
            </div>
        ),
    },
];

export default function DependentManagementPage() {
    return (
        <Page
            title="Manage Dependents"
            subtitle="Add or remove family members covered under your employer insurance plans."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Insurance", href: "/finance/insurance/policy" },
                { label: "Dependents" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<UserPlus size={14} />}>Add Dependent</Button>
            }
        >
            <Card padding="none" className="mb-6">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center text-sm text-[#8899AA]">
                    <div className="flex items-center gap-2">
                        <Users size={16} aria-hidden="true" />
                        <span className="font-bold text-white">3</span> Family Members Registered
                    </div>
                </div>
                <div className="p-4">
                    <DataTable<Dependent>
                        data={DEPENDENTS}
                        columns={COLUMNS}
                        rowKey={(d) => d.id}
                        aria-label="Registered dependents"
                        emptyTitle="No dependents registered"
                        emptyDescription="Add a dependent to extend your insurance coverage."
                    />
                </div>
            </Card>

            {/* Note */}
            <div className="flex items-start gap-3 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm">
                <ShieldAlert size={20} className="text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                    <p className="text-indigo-400 font-bold mb-1">Addition/Deletion Rules</p>
                    <p className="text-[#8899AA]">
                        Dependents can only be added during the annual <strong>Open Enrollment Window</strong> (Oct 15 - Oct 31), except for specific life events (marriage, birth of a child) where additions are allowed within 30 days of the event via the{" "}
                        <Link href="/finance/insurance/endorsements" className="text-white underline decoration-dashed">Endorsements portal</Link>.
                    </p>
                </div>
            </div>
        </Page>
    );
}
