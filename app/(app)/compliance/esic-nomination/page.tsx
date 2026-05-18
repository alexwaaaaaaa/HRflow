"use client";

import { useState } from "react";
import {
    Users,
    Plus,
    CheckCircle,
    Search,
    Save,
    Trash2,
    Edit2,
    UserPlus,
    Download,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Nominee {
    name: string;
    relation: string;
    dob: string;
    share: string;
    aadhaar: string;
}

interface Employee {
    name: string;
    emp: string;
    ipNum: string;
    nominees: Nominee[];
}

const EMPLOYEES: Employee[] = [
    {
        name: "Rahul Kumar Sharma",
        emp: "EMP-001",
        ipNum: "3112345678901",
        nominees: [
            { name: "Sunita Sharma", relation: "Spouse", dob: "15/06/1990", share: "60%", aadhaar: "****5678" },
            { name: "Rohan Sharma", relation: "Son", dob: "10/03/2015", share: "40%", aadhaar: "****1234" },
        ],
    },
    {
        name: "Priya Mehta",
        emp: "EMP-002",
        ipNum: "3112345678902",
        nominees: [
            { name: "Ramesh Mehta", relation: "Father", dob: "01/01/1958", share: "100%", aadhaar: "****9012" },
        ],
    },
];

// ─── Sub-components (module scope) ────────────────────────────────────────────
function NomineeCard({ nominee, editMode }: { nominee: Nominee; editMode: boolean }) {
    return (
        <div className={`rounded-xl border p-4 transition-all ${editMode ? "border-rose-500/20 bg-rose-500/5" : "border-[#1A2A3A] bg-[#060B14]"}`}>
            <div className="flex items-start justify-between">
                <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/20 text-xs font-black text-rose-400">
                        {nominee.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                        <div className="text-xs font-black text-white">{nominee.name}</div>
                        <div className="mt-0.5 text-[10px] text-slate-500">
                            {nominee.relation} • DOB: {nominee.dob} • Aadhaar: {nominee.aadhaar}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="danger">{nominee.share}</Badge>
                    {editMode && (
                        <>
                            <Button variant="ghost" size="sm" aria-label="Edit nominee" icon={<Edit2 size={13} aria-hidden="true" />} />
                            <Button variant="danger" size="sm" aria-label="Remove nominee" icon={<Trash2 size={13} aria-hidden="true" />} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ESICNomination() {
    const [selected, setSelected] = useState(0);
    const [editMode, setEditMode] = useState(false);

    const emp = EMPLOYEES[selected]!;

    return (
        <Page
            title="ESIC Nomination"
            subtitle="Manage nominee details for ESIC benefits (Form 1). Submit to ESIC portal for approval."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "ESIC Nomination" },
            ]}
            maxWidth="1280px"
            actions={
                <>






                    {editMode && (
                        <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                            Cancel
                        </Button>
                    )}
                    <Button
                        variant={editMode ? "primary" : "secondary"}
                        icon={editMode ? <Save size={16} aria-hidden="true" /> : <Edit2 size={16} aria-hidden="true" />}
                        onClick={() => setEditMode((e) => !e)}
                    >
                        {editMode ? "Save Nominations" : "Edit Nominations"}
                    </Button>
                </>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Employee list sidebar */}
                <div className="space-y-3 lg:col-span-1">
                    <div className="relative">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                        <input
                            className="w-full rounded-xl border border-[#1A2A3A] bg-[#0D1928] py-2 pl-8 pr-4 text-xs text-white outline-none placeholder-slate-600 focus:border-rose-500"
                            placeholder="Search employee..."
                            aria-label="Search employees"
                        />
                    </div>
                    {EMPLOYEES.map((e, i) => (
                        <button
                            key={e.emp}
                            onClick={() => setSelected(i)}
                            className={`w-full rounded-2xl border p-4 text-left transition-all ${selected === i ? "border-rose-500/30 bg-rose-500/10" : "border-[#1A2A3A] bg-[#0D1928] hover:border-slate-600"}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${selected === i ? "bg-rose-500/20 text-rose-400" : "bg-[#1A2A3A] text-slate-400"}`}>
                                    {e.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                </div>
                                <div>
                                    <div className="text-xs font-black text-white">{e.name}</div>
                                    <div className="text-[10px] text-slate-500">{e.emp} | IP: {e.ipNum.slice(-6)}</div>
                                </div>
                            </div>
                            <div className={`mt-2 flex items-center gap-1 text-[10px] font-bold ${e.nominees.length > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                                <CheckCircle size={10} aria-hidden="true" />
                                {e.nominees.length > 0 ? `${e.nominees.length} nominee(s) declared` : "Nomination pending"}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Nominees panel */}
                <div className="space-y-5 lg:col-span-2">
                    <Card padding="md">
                        <div className="mb-4 flex items-center justify-between border-b border-[#1A2A3A] pb-4">
                            <div>
                                <h2 className="text-sm font-black text-white">{emp.name}</h2>
                                <div className="mt-0.5 text-[10px] text-slate-500">{emp.emp} | IP No: {emp.ipNum}</div>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold">
                                <Users size={12} className="text-slate-400" aria-hidden="true" />
                                <span className="text-slate-300">{emp.nominees.length} nominees</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {emp.nominees.map((n, i) => (
                                <NomineeCard key={i} nominee={n} editMode={editMode} />
                            ))}
                            {editMode && (
                                <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#1A2A3A] p-4 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all hover:border-rose-500/30 hover:text-rose-400">
                                    <Plus size={14} aria-hidden="true" /> Add Nominee
                                </button>
                            )}
                        </div>

                        {/* Share validation */}
                        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                            <div className="flex gap-3">
                                <div
                                    className="h-2 w-24 overflow-hidden rounded-full border border-[#1A2A3A] bg-[#0D1928]"
                                    role="progressbar"
                                    aria-valuenow={100}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label="Share distribution: 100%"
                                >
                                    <div className="h-full w-full rounded-full bg-rose-500" />
                                </div>
                                <span className="text-[10px] font-black text-slate-400">Share Distribution: 100%</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500">
                                <CheckCircle size={11} aria-hidden="true" /> Valid
                            </div>
                        </div>
                    </Card>

                    {/* ESIC Form 1 */}
                    <Card padding="md" className="flex items-center justify-between">
                        <div>
                            <div className="text-xs font-black text-white">ESIC Form 1 - Declaration under ESI Act</div>
                            <div className="mt-0.5 text-[10px] text-slate-500">Download official Form 1 with nominee details pre-filled</div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<Download size={13} aria-hidden="true" />}
                            >
                                Download
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<UserPlus size={13} aria-hidden="true" />}
                            >
                                Submit to ESIC
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        

        

        

        </Page>
    );
}
