"use client";

import { Calendar, Info, AlertTriangle, Save, Lock, Smartphone, DatabaseZap } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type AccessStatus = "Revoked" | "Active (Monitor)";

const ACCESS_ITEMS: { label: string; icon: typeof Lock; status: AccessStatus }[] = [
    { label: "VPN & Remote Access", icon: Lock, status: "Revoked" },
    { label: "Official Mobile Number", icon: Smartphone, status: "Active (Monitor)" },
    { label: "Cloud Repositories", icon: DatabaseZap, status: "Revoked" },
];

const STATUS_VARIANT: Record<AccessStatus, "danger" | "warning"> = {
    Revoked: "danger",
    "Active (Monitor)": "warning",
};

export default function GardenLeave() {
    return (
        <Page
            title="Garden Leave Protocol"
            subtitle="Enforce non-compete periods with restricted access."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Garden Leave" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
                {/* Configuration & Access */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="lg">
                        <div className="mb-6 flex items-center gap-4 border-b border-[#1A2A3A] pb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] text-2xl font-black text-emerald-400">
                                BR
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-black text-white">Bharat Ramaswami</h2>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Director · High Frequency Trading
                                </p>
                            </div>
                            <Badge variant="danger">High Sensitivity Case</Badge>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {/* Temporal Bound */}
                            <div className="space-y-4">
                                <h3 className="border-l-4 border-emerald-500 pl-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Temporal Bound
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="commencement-date" className="text-[10px] font-bold uppercase text-[#445566]">
                                            Commencement Date
                                        </label>
                                        <div className="relative">
                                            <Calendar size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" aria-hidden="true" />
                                            <input
                                                id="commencement-date"
                                                type="date"
                                                defaultValue="2024-03-20"
                                                className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] py-3 pl-10 pr-4 font-semibold text-white outline-none focus:border-[#00e5a0]"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="termination-date" className="text-[10px] font-bold uppercase text-[#445566]">
                                            Termination (LWD)
                                        </label>
                                        <div className="relative">
                                            <Calendar size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" aria-hidden="true" />
                                            <input
                                                id="termination-date"
                                                type="date"
                                                defaultValue="2024-09-20"
                                                className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] py-3 pl-10 pr-4 font-semibold text-white outline-none focus:border-[#00e5a0]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Access Restrictions */}
                            <div className="space-y-4">
                                <h3 className="border-l-4 border-rose-500 pl-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Access Restrictions
                                </h3>
                                <ul className="space-y-3" role="list">
                                    {ACCESS_ITEMS.map((item) => (
                                        <li
                                            key={item.label}
                                            className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 transition-colors hover:border-blue-500/20"
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon size={16} className="text-[#445566]" aria-hidden="true" />
                                                <span className="text-xs font-semibold text-[#8899AA]">{item.label}</span>
                                            </div>
                                            <Badge variant={STATUS_VARIANT[item.status]}>{item.status}</Badge>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                            <Info size={18} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                            <p className="text-xs text-[#8899AA]">
                                Garden Leave implies the employee remains on payroll but must not perform work duties or
                                access company facilities. Full salary benefits apply unless otherwise specified in the
                                separation agreement.
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Summary & Action */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg" variant="elevated">
                        <h2 className="mb-6 text-center text-sm font-black uppercase tracking-widest text-white">
                            Payout Projection
                        </h2>
                        <dl className="space-y-4 border-t border-[#1A2A3A] pt-4">
                            <div className="flex justify-between text-xs font-semibold">
                                <dt className="text-[#445566]">Fixed Monthly Gross</dt>
                                <dd className="tabular-nums text-white">₹8,50,000.00</dd>
                            </div>
                            <div className="flex justify-between text-xs font-semibold">
                                <dt className="text-[#445566]">Duration (Months)</dt>
                                <dd className="tabular-nums text-white">06</dd>
                            </div>
                            <div className="my-2 h-px bg-[#1A2A3A]" />
                            <div className="text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                    Est. Garden Period Payout
                                </p>
                                <p className="mt-1 text-3xl font-black tabular-nums text-white">₹51,00,000.00</p>
                            </div>
                        </dl>
                        <Button
                            variant="outline"
                            icon={<Save size={16} aria-hidden="true" />}
                            className="mt-6 w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                        >
                            Initialize Protocol
                        </Button>
                        <p className="mt-3 text-center text-[9px] text-[#445566]">
                            * Payout subject to strict non-compete compliance
                        </p>
                    </Card>

                    <div className="flex items-start gap-3 rounded-2xl border-l-4 border-l-amber-500 border border-amber-500/20 bg-amber-500/5 p-4">
                        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                        <div>
                            <p className="mb-1 text-xs font-black uppercase tracking-widest text-amber-400">
                                Legal Compliance
                            </p>
                            <p className="text-[11px] text-[#8899AA]">
                                "Ensure Garden Leave clause is explicitly signed in the annexure. Access revocation must be
                                logged with timestamp for audit trails."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
