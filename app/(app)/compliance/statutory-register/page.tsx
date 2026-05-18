"use client";

import {
    FileOutput,
    Printer,
    CheckCircle,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface RegisterCard {
    id: string;
    form: string;
    name: string;
    act: string;
    status: "ready" | "pending";
}

const REGISTERS: RegisterCard[] = [
    { id: "r1", form: "Form I", name: "Register of Fines", act: "Payment of Wages Act, 1936", status: "ready" },
    { id: "r2", form: "Form II", name: "Register of Deductions", act: "Payment of Wages Act, 1936", status: "ready" },
    { id: "r3", form: "Form IV", name: "Muster Roll / Attendance", act: "Minimum Wages Act, 1948", status: "ready" },
    { id: "r4", form: "Form XI", name: "Register of Loans", act: "Maharashtra S&E Rules", status: "pending" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StatutoryRegisters() {
    return (
        <Page
            title="Statutory Registers"
            subtitle="Generate and maintain mandatory central and state-level labour law registers."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Statutory Register" },
            ]}
            maxWidth="1280px"
        >
            <Card padding="lg">
                <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Master Register Directory</h2>
                    <div className="flex w-full gap-4 md:w-auto">
                        <div className="relative flex-1 md:w-48">
                            <select
                                className="w-full appearance-none rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-2.5 text-xs font-bold text-white outline-none focus:border-blue-500"
                                aria-label="Select state"
                            >
                                <option>Maharashtra</option>
                                <option>Karnataka</option>
                                <option>Central Act</option>
                            </select>
                        </div>
                        <div className="relative flex-1 md:w-48">
                            <select
                                className="w-full appearance-none rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-2.5 text-xs font-bold text-white outline-none focus:border-blue-500"
                                aria-label="Select period"
                            >
                                <option>March 2024</option>
                                <option>Q4 2023-24</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {REGISTERS.map((reg) => (
                        <div
                            key={reg.id}
                            className={`group rounded-2xl border p-5 transition-all ${
                                reg.status === "ready"
                                    ? "border-[#1A2A3A] bg-[#060B14] hover:border-blue-500/30"
                                    : "border-rose-500/20 bg-[#060B14]"
                            }`}
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <h3 className="text-2xl font-black text-white">{reg.form}</h3>
                                {reg.status === "ready" ? (
                                    <Badge variant="success">
                                        <CheckCircle size={10} aria-hidden="true" /> Data Ready
                                    </Badge>
                                ) : (
                                    <Badge variant="danger">Pending Data</Badge>
                                )}
                            </div>
                            <div className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-300">{reg.name}</div>
                            <p className="mb-6 text-[10px] font-medium italic text-slate-500">{reg.act}</p>

                            {reg.status === "ready" ? (
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        icon={<FileOutput size={14} aria-hidden="true" />}
                                    >
                                        PDF
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        icon={<Printer size={14} aria-hidden="true" />}
                                    >
                                        Print
                                    </Button>
                                </div>
                            ) : (
                                <Button variant="danger" size="sm" className="w-full">Sync Missing Data</Button>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </Page>
    );
}
