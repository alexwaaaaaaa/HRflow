"use client";

import { useState } from "react";
import { Download, Presentation, FileText, FileJson, Send } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardExportPage() {
    const [format, setFormat] = useState<"pptx" | "pdf">("pptx");

    return (
        <Page
            title="Presentations & Export"
            subtitle="Export complete dashboards to presentations or print-ready formats."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Export Tool" },
            ]}
            maxWidth="1280px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration panel */}
                <Card padding="lg" className="lg:col-span-1 border-t-4 border-t-indigo-500">
                    <h2 className="text-lg font-bold text-white mb-6">Export Settings</h2>

                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="export-dashboard"
                                className="block text-sm font-medium text-[#8899AA] mb-2"
                            >
                                Select Dashboard to Export
                            </label>
                            <select
                                id="export-dashboard"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
                            >
                                <option>Executive MIS Dashboard</option>
                                <option>HR Analytics (Strategic View)</option>
                                <option>Recruitment Funnel &amp; Pipeline</option>
                                <option>Attrition &amp; Retention Insights</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="export-period"
                                className="block text-sm font-medium text-[#8899AA] mb-2"
                            >
                                Data Period
                            </label>
                            <select
                                id="export-period"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
                            >
                                <option>Q4 2025 (Jan – Mar 2026)</option>
                                <option>Q3 2025 (Oct – Dec 2025)</option>
                                <option>MOM (Last 12 Months)</option>
                                <option>Custom Range</option>
                            </select>
                        </div>

                        <fieldset>
                            <legend className="block text-sm font-medium text-[#8899AA] mb-2">
                                Export Format
                            </legend>
                            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Export format">
                                <button
                                    type="button"
                                    onClick={() => setFormat("pptx")}
                                    aria-pressed={format === "pptx"}
                                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] ${
                                        format === "pptx"
                                            ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                                            : "bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA] hover:text-white hover:bg-[#2A3A4A]"
                                    }`}
                                >
                                    <Presentation size={24} aria-hidden="true" />
                                    <span className="text-xs font-bold">PPTX</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormat("pdf")}
                                    aria-pressed={format === "pdf"}
                                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] ${
                                        format === "pdf"
                                            ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                                            : "bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA] hover:text-white hover:bg-[#2A3A4A]"
                                    }`}
                                >
                                    <FileText size={24} aria-hidden="true" />
                                    <span className="text-xs font-bold">PDF (Print)</span>
                                </button>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="block text-sm font-medium text-[#8899AA] mb-2">Options</legend>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="rounded text-indigo-500 focus:ring-0 focus:ring-offset-0 bg-[#1A2A3A] border-[#2A3A4A]"
                                    />
                                    <span className="text-sm text-white group-hover:text-indigo-400 transition-colors">
                                        Include Data Summary Tables
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="rounded text-indigo-500 focus:ring-0 focus:ring-offset-0 bg-[#1A2A3A] border-[#2A3A4A]"
                                    />
                                    <span className="text-sm text-[#8899AA] group-hover:text-white transition-colors">
                                        Apply Company Brand Colors
                                    </span>
                                </label>
                            </div>
                        </fieldset>

                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <Button className="w-full" icon={<Download size={18} aria-hidden="true" />}>
                                Generate Export
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Preview panel */}
                <Card padding="lg" className="lg:col-span-2 flex flex-col items-center justify-center min-h-[500px]">
                    <div className="text-center max-w-sm">
                        <div className="w-20 h-20 bg-[#1A2A3A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-[#2A3A4A]">
                            <Presentation size={40} className="text-indigo-400 opacity-50" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Export Preview Generating</h3>
                        <p className="text-sm text-[#8899AA] leading-relaxed">
                            Select a dashboard and format to see a preview of how your export will look before
                            downloading.
                        </p>

                        <div className="mt-8 flex gap-3 text-left">
                            <div className="flex-1 p-3 bg-[#1A2A3A]/50 border border-[#2A3A4A] rounded-lg">
                                <FileJson size={20} className="text-emerald-400 mb-2" aria-hidden="true" />
                                <h4 className="text-xs font-bold text-white mb-1">Raw Data</h4>
                                <p className="text-[10px] text-[#8899AA]">
                                    Include raw JSON/CSV data underlying the charts.
                                </p>
                            </div>
                            <div className="flex-1 p-3 bg-[#1A2A3A]/50 border border-[#2A3A4A] rounded-lg">
                                <Send size={20} className="text-blue-400 mb-2" aria-hidden="true" />
                                <h4 className="text-xs font-bold text-white mb-1">Direct Share</h4>
                                <p className="text-[10px] text-[#8899AA]">
                                    Email the generated report directly to stakeholders.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
