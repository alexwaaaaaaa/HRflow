"use client";

import {
    CheckCircle,
    Download,
    AlertCircle,
    MapPin,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LWFScreen() {
    return (
        <Page
            title="Labour Welfare Fund (LWF)"
            subtitle="Manage semi-annual / annual LWF deductions and remittances."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "LWF" },
            ]}
            maxWidth="1280px"
            actions={
                <Button variant="outline" size="sm">FY 2023-24</Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Active remittances */}
                <div className="space-y-6 lg:col-span-2">
                    <div className="flex items-center gap-4">
                        <h2 className="text-sm font-black uppercase tracking-widest text-white">Upcoming Deadlines</h2>
                        <Badge variant="danger">Action Required</Badge>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Maharashtra LWF */}
                        <Card padding="lg" className="border-pink-500/30">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-pink-500" aria-hidden="true" />
                                    <h3 className="text-lg font-black uppercase tracking-widest text-white">Maharashtra</h3>
                                </div>
                                <div className="text-right text-[10px] font-black uppercase tracking-widest text-pink-500">
                                    <div>Jun Period</div>
                                    <div className="text-slate-400">Due: 15 Jul</div>
                                </div>
                            </div>

                            <div className="mb-6 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                                <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-3 text-xs">
                                    <span className="font-bold text-slate-400">Employee Shr (₹12 x 35)</span>
                                    <span className="font-bold tabular-nums text-slate-300">₹420</span>
                                </div>
                                <div className="flex items-center justify-between pt-3 text-xs">
                                    <span className="font-bold text-slate-400">Employer Shr (₹36 x 35)</span>
                                    <span className="font-bold tabular-nums text-slate-300">₹1,260</span>
                                </div>
                                <div className="mt-4 flex items-center justify-between border-t-2 border-[#1A2A3A] pt-3">
                                    <span className="font-black uppercase tracking-widest text-pink-500">Total Liability</span>
                                    <span className="text-xl font-black tracking-tighter tabular-nums text-pink-500">₹1,680</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="primary" className="flex-1">Pay via MahaLWF</Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    aria-label="Download LWF challan"
                                    icon={<Download size={14} aria-hidden="true" />}
                                />
                            </div>
                        </Card>

                        {/* Telangana LWF */}
                        <Card padding="lg">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-emerald-500" aria-hidden="true" />
                                    <h3 className="text-lg font-black uppercase tracking-widest text-slate-200">Telangana</h3>
                                </div>
                                <div className="text-right text-[10px] font-black uppercase tracking-widest text-emerald-500">
                                    <div>Annual Filer</div>
                                    <div className="text-slate-500">Dec Period</div>
                                </div>
                            </div>

                            <div className="mb-6 flex h-[160px] flex-col items-center justify-center rounded-xl border border-dashed border-[#1A2A3A] bg-[#060B14]/50">
                                <CheckCircle size={24} className="mb-2 text-[#1A2A3A]" aria-hidden="true" />
                                <p className="px-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                    Paid on 10 Jan 2024
                                </p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-3"
                                    icon={<Download size={10} aria-hidden="true" />}
                                >
                                    View Receipt
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Policy brief sidebar */}
                <div className="space-y-6">
                    <Card padding="md" className="relative mt-10">
                        <div className="absolute right-6 top-0 -translate-y-1/2 rounded-full border border-[#1A2A3A] bg-[#060B14] p-3 shadow-lg">
                            <AlertCircle size={20} className="text-pink-500" aria-hidden="true" />
                        </div>
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                            LWF Complexity
                        </h3>
                        <p className="mb-4 text-[10px] font-medium italic leading-relaxed text-slate-400">
                            Labour Welfare Fund varies significantly by state. Some states deduct in June/Dec, others only in Dec.
                            Contribution ratios (Employer:Employee) also differ widely.
                        </p>
                        <div className="space-y-3">
                            {[
                                { state: "Karnataka", rate: "₹20 : ₹40 (Dec)" },
                                { state: "Maharashtra", rate: "₹12 : ₹36 (Jun, Dec)" },
                            ].map((r) => (
                                <div key={r.state} className="flex justify-between rounded-lg border border-[#1A2A3A] bg-[#060B14] p-2 text-[10px]">
                                    <span className="font-bold text-slate-500">{r.state}</span>
                                    <span className="font-black text-slate-300">{r.rate}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
