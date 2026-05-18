"use client";

import React, { useState } from "react";
import {
    Download,
    RefreshCw,
    FileArchive,
    ShieldCheck,
    CheckSquare,
    Mail,
    Settings2,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Form16BulkActions() {
    const [actioning, setActioning] = useState<string | null>(null);

    const handleAction = (type: string) => {
        setActioning(type);
        setTimeout(() => setActioning(null), 3000);
    };

    return (
        <Page
            title="Form 16 Bulk Actions"
            subtitle="Perform bulk operations on Form 16s for FY 2024-25"
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Form 16", href: "/tax/form-16" },
                { label: "Bulk Actions" },
            ]}
            maxWidth="900px"
        >
            <div className="space-y-6">
                {/* Bulk Generate */}
                <Card padding="lg" className="relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0066FF]/10 to-transparent pointer-events-none" aria-hidden="true" />
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <div className="w-12 h-12 bg-[#0066FF]/10 rounded-xl border border-[#0066FF]/20 flex items-center justify-center shrink-0 text-[#0066FF]">
                                <RefreshCw size={24} aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Bulk Generate &amp; Merge</h3>
                                <p className="text-sm text-[#8899AA] max-w-md">
                                    Merge TRACES Part A with System generated Part B and apply digital signature for all 380 ready
                                    employees.
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleAction("generate")}
                            disabled={actioning !== null}
                            isLoading={actioning === "generate"}
                            loadingText="Generating..."
                            icon={<ShieldCheck size={16} />}
                        >
                            Start Generation
                        </Button>
                    </div>
                </Card>

                {/* Bulk Download */}
                <Card padding="lg">
                    <div className="flex justify-between items-start">
                        <div className="flex space-x-4">
                            <div className="w-12 h-12 bg-[#FFB800]/10 rounded-xl border border-[#FFB800]/20 flex items-center justify-center shrink-0 text-[#FFB800]">
                                <FileArchive size={24} aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Download ZIP Archive</h3>
                                <p className="text-sm text-[#8899AA] max-w-md mb-4">
                                    Download a single ZIP file containing all 145 generated Form 16s.
                                </p>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" id="pwd-protect" defaultChecked className="accent-[#FFB800]" />
                                        <span className="text-xs text-[#8899AA]">Password protect individual PDFs (PAN based)</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" id="org-folders" defaultChecked className="accent-[#FFB800]" />
                                        <span className="text-xs text-[#8899AA]">Organize into department folders inside ZIP</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => handleAction("download")}
                            disabled={actioning !== null}
                            isLoading={actioning === "download"}
                            loadingText="Compressing..."
                            icon={<Download size={16} />}
                        >
                            Download ZIP
                        </Button>
                    </div>
                </Card>

                {/* Bulk Publish */}
                <Card padding="lg" className="relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#00E5A0]/10 to-transparent pointer-events-none" aria-hidden="true" />
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <div className="w-12 h-12 bg-[#00E5A0]/10 rounded-xl border border-[#00E5A0]/20 flex items-center justify-center shrink-0 text-[#00E5A0]">
                                <Mail size={24} aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Publish to Employees</h3>
                                <p className="text-sm text-[#8899AA] max-w-md">
                                    Make generated Form 16s available on employee portals and send email notifications.
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleAction("publish")}
                            disabled={actioning !== null}
                            isLoading={actioning === "publish"}
                            loadingText="Publishing..."
                            icon={<CheckSquare size={16} />}
                        >
                            Publish (145)
                        </Button>
                    </div>
                </Card>

                {/* Digital Signature Status */}
                <Card padding="md" className="border border-dashed border-[#2A3A4A] flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <ShieldCheck size={20} className="text-[#00E5A0]" aria-hidden="true" />
                        <div>
                            <div className="text-sm font-bold text-white">Digital Signature Set Up</div>
                            <div className="text-xs text-[#8899AA]">
                                Authorized Signatory: Amit Kumar (CFO) | Certificate valid till 2026
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" icon={<Settings2 size={12} />}>
                        Update Configuration
                    </Button>
                </Card>
            </div>
        </Page>
    );
}
