"use client";

import React, { useState } from "react";
import {
    FileText,
    CheckCircle2,
    Download,
    RefreshCw,
    Search,
    Eye,
    ShieldCheck,
    Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function FilterBtn({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                active
                    ? "bg-[#1A2A3A] border-[#2A3A4A] text-white"
                    : "bg-transparent border-transparent text-[#8899AA] hover:text-[#c8d8e8]"
            }`}
        >
            {label}
        </button>
    );
}

export default function Form16Generation() {
    const router = useRouter();
    const [generating, setGenerating] = useState<string | null>(null);

    const handleGenerate = (empId: string) => {
        setGenerating(empId);
        setTimeout(() => {
            setGenerating(null);
        }, 2000);
    };

    return (
        <Page
            title="Form 16 Generation — FY 2024-25"
            subtitle="Generate, merge and publish Form 16 (Part A & Part B) for your employees."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Form 16" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={16} />}>
                        Import Part A (TRACES)
                    </Button>
                    <Button onClick={() => router.push("/tax/form-16/bulk")}>Bulk Actions</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Status Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card padding="md" className="flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#8899AA] font-semibold mb-1 uppercase tracking-wider">Total Eligible</div>
                            <div className="text-2xl font-black text-white">412</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[#8899AA]">
                            <FileText size={20} aria-hidden="true" />
                        </div>
                    </Card>
                    <Card padding="md" className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#00E5A0] font-semibold mb-1 uppercase tracking-wider">Part A Uploaded</div>
                            <div className="text-2xl font-black text-[#00E5A0]">380</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#00E5A0]/10 flex items-center justify-center text-[#00E5A0]">
                            <CheckCircle2 size={20} aria-hidden="true" />
                        </div>
                    </Card>
                    <Card padding="md" className="bg-[#0066FF]/5 border border-[#0066FF]/20 flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#0066FF] font-semibold mb-1 uppercase tracking-wider">Generated</div>
                            <div className="text-2xl font-black text-[#0066FF]">145</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF]">
                            <RefreshCw size={20} aria-hidden="true" />
                        </div>
                    </Card>
                    <Card padding="md" className="bg-[#FFB800]/5 border border-[#FFB800]/20 flex items-center justify-between">
                        <div>
                            <div className="text-xs text-[#FFB800] font-semibold mb-1 uppercase tracking-wider">Published to Emp</div>
                            <div className="text-2xl font-black text-[#FFB800]">12</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#FFB800]/10 flex items-center justify-center text-[#FFB800]">
                            <Mail size={20} aria-hidden="true" />
                        </div>
                    </Card>
                </div>

                {/* Table Area */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="flex space-x-2">
                            <FilterBtn label="All" active />
                            <FilterBtn label="Ready to Generate" />
                            <FilterBtn label="Generated" />
                            <FilterBtn label="Missing Part A" />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Name or PAN..."
                                aria-label="Search employees"
                                className="bg-[#060B14] border border-[#1A2A3A] px-4 py-1.5 pl-9 rounded-lg text-sm text-white focus:outline-none focus:border-[#0066FF] w-64"
                            />
                            <Search size={16} className="absolute left-3 top-2.5 text-[#8899AA]" aria-hidden="true" />
                        </div>
                    </div>

                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1A2A3A] text-xs font-bold text-[#8899AA] uppercase tracking-wider bg-[#060B14]">
                        <div className="col-span-3">Employee</div>
                        <div className="col-span-2">PAN Number</div>
                        <div className="col-span-1 text-center">Part A</div>
                        <div className="col-span-1 text-center">Part B</div>
                        <div className="col-span-2 text-center">Digital Sign</div>
                        <div className="col-span-3 text-right">Action</div>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {/* Ready to generate */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors">
                            <div className="col-span-3 flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white" aria-hidden="true">
                                    AM
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white line-clamp-1">Arjun Mehta</div>
                                    <div className="text-xs text-[#8899AA]">EMP001</div>
                                </div>
                            </div>
                            <div className="col-span-2 font-mono text-sm text-[#c8d8e8]">ASDFG1234H</div>
                            <div className="col-span-1 flex justify-center">
                                <Badge variant="success">Uploaded</Badge>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <Badge variant="success">Ready</Badge>
                            </div>
                            <div className="col-span-2 flex justify-center text-xs text-[#8899AA]">Pending Gen</div>
                            <div className="col-span-3 flex justify-end">
                                <Button
                                    onClick={() => handleGenerate("EMP001")}
                                    disabled={generating !== null}
                                    isLoading={generating === "EMP001"}
                                    loadingText="Generating..."
                                    size="sm"
                                >
                                    Generate + Sign
                                </Button>
                            </div>
                        </div>

                        {/* Missing Part A */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors">
                            <div className="col-span-3 flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white" aria-hidden="true">
                                    KI
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white line-clamp-1">Kavya Iyer</div>
                                    <div className="text-xs text-[#8899AA]">EMP004</div>
                                </div>
                            </div>
                            <div className="col-span-2 font-mono text-sm text-[#c8d8e8]">ZXCVB0987K</div>
                            <div className="col-span-1 flex justify-center">
                                <Badge variant="danger">Missing</Badge>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <Badge variant="success">Ready</Badge>
                            </div>
                            <div className="col-span-2 flex justify-center text-xs text-[#8899AA]">Blocked</div>
                            <div className="col-span-3 flex justify-end">
                                <Button disabled size="sm" variant="secondary">
                                    Generate + Sign
                                </Button>
                            </div>
                        </div>

                        {/* Generated */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-[#00E5A0]/5 hover:bg-[#00E5A0]/10 transition-colors border-l-2 border-[#00E5A0]">
                            <div className="col-span-3 flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white" aria-hidden="true">
                                    SR
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white line-clamp-1">Suresh Roy</div>
                                    <div className="text-xs text-[#8899AA]">EMP015</div>
                                </div>
                            </div>
                            <div className="col-span-2 font-mono text-sm text-[#c8d8e8]">QWERT5678L</div>
                            <div className="col-span-1 flex justify-center">
                                <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                            </div>
                            <div className="col-span-2 flex justify-center text-xs text-[#00E5A0] font-bold items-center gap-1">
                                <ShieldCheck size={14} aria-hidden="true" /> Signed
                            </div>
                            <div className="col-span-3 flex justify-end space-x-2">
                                <Button variant="ghost" size="sm" aria-label="Email Suresh Roy Form 16">
                                    <Mail size={16} aria-hidden="true" />
                                </Button>
                                <Button variant="ghost" size="sm" aria-label="Preview Suresh Roy Form 16">
                                    <Eye size={16} aria-hidden="true" />
                                </Button>
                                <Button variant="ghost" size="sm" aria-label="Download Suresh Roy Form 16">
                                    <Download size={16} aria-hidden="true" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
